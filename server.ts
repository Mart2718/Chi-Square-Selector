import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI } from "@google/genai";
import dotenv from "dotenv";

dotenv.config();

const app = express();
const PORT = 3000;

app.use(express.json());

// Helper to get Gemini client
function getGeminiClient() {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey || apiKey === "MY_GEMINI_API_KEY") {
    return null;
  }
  return new GoogleGenAI({ apiKey });
}

// API Endpoint to analyze custom word problems
app.post("/api/analyze-problem", async (req, res) => {
  try {
    const { problemText } = req.body;
    if (!problemText || typeof problemText !== "string") {
      return res.status(400).json({ error: "Please provide problemText string." });
    }

    const ai = getGeminiClient();
    if (!ai) {
      // Fallback rule-based analysis if Gemini key not set
      return res.json({
        isAiGenerated: false,
        analysis: fallbackAnalyze(problemText),
        message: "Analyzed using statistics heuristic engine."
      });
    }

    const prompt = `You are an expert statistics tutor. Analyze the following statistics word problem and determine whether a Chi-Square Goodness-of-Fit Test OR a Chi-Square Test for Independence is required.

Problem Text:
"${problemText}"

Return ONLY a JSON object with the following structure:
{
  "testType": "Goodness-of-Fit" OR "Independence",
  "numVariables": 1 OR 2,
  "variable1": {
    "name": "Name of primary variable",
    "categories": ["Category A", "Category B", ...]
  },
  "variable2": {
    "name": "Name of secondary variable (or 'None')",
    "categories": ["Category 1", "Category 2"] (or null)
  },
  "expectedDistribution": "Description of expected proportions if Goodness-of-Fit (e.g. 'Equal 25% each' or 'Mendelian 9:3:3:1' or 'National baseline'), or 'N/A' if Independence",
  "keyTriggerWords": ["word1", "phrase2"],
  "nullHypothesis": "H0 statement",
  "altHypothesis": "Ha statement",
  "degreesOfFreedomFormula": "e.g. df = k - 1 or df = (r - 1)(c - 1)",
  "explanation": "Clear, concise 2-3 sentence explanation targeting why this is Goodness of Fit vs Independence specifically highlighting how the variables were identified."
}`;

    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: prompt,
      config: {
        responseMimeType: "application/json"
      }
    });

    const text = response.text || "{}";
    const parsed = JSON.parse(text);
    return res.json({
      isAiGenerated: true,
      analysis: parsed
    });
  } catch (err: any) {
    console.error("Error analyzing problem with Gemini:", err);
    // Fallback to rule engine
    return res.json({
      isAiGenerated: false,
      analysis: fallbackAnalyze(req.body.problemText || ""),
      message: "Fallback heuristic analysis executed."
    });
  }
});

// Helper for offline / fallback analysis
function fallbackAnalyze(text: string) {
  const lower = text.toLowerCase();
  
  const hasIndependenceTriggers = 
    lower.includes("independent") || 
    lower.includes("association") || 
    lower.includes("associated") || 
    lower.includes("relationship") || 
    lower.includes("depends") || 
    lower.includes("contingency") ||
    lower.includes("two-way") ||
    lower.includes("two variables");

  const hasGofTriggers = 
    lower.includes("fit") || 
    lower.includes("expected proportion") || 
    lower.includes("equally distributed") || 
    lower.includes("equal preference") || 
    lower.includes("ratio") || 
    lower.includes("claim") || 
    lower.includes("uniform");

  const isIndependence = hasIndependenceTriggers && !hasGofTriggers;

  if (isIndependence) {
    return {
      testType: "Independence",
      numVariables: 2,
      variable1: {
        name: "First Categorical Factor (e.g., Row variable)",
        categories: ["Group 1", "Group 2"]
      },
      variable2: {
        name: "Second Categorical Factor (e.g., Column variable)",
        categories: ["Option A", "Option B"]
      },
      expectedDistribution: "N/A (Uses expected counts formula: (Row Total * Col Total) / Grand Total)",
      keyTriggerWords: ["associated", "relationship", "independent", "two-way grid"],
      nullHypothesis: "H0: Variable 1 and Variable 2 are independent (not associated).",
      altHypothesis: "Ha: Variable 1 and Variable 2 are dependent (associated).",
      degreesOfFreedomFormula: "df = (r - 1)(c - 1)",
      explanation: "This scenario measures TWO categorical attributes for each subject in the sample and tests if there is a relationship or association between them in a contingency table."
    };
  } else {
    return {
      testType: "Goodness-of-Fit",
      numVariables: 1,
      variable1: {
        name: "Categorical Attribute (e.g., Color, Preference, Day)",
        categories: ["Category 1", "Category 2", "Category 3"]
      },
      variable2: {
        name: "None",
        categories: null
      },
      expectedDistribution: "Specified theoretical percentages or equal proportions (1/k)",
      keyTriggerWords: ["equally distributed", "expected distribution", "fits ratio", "single categorical variable"],
      nullHypothesis: "H0: The sample distribution matches the specified expected distribution.",
      altHypothesis: "Ha: The sample distribution differs significantly from the expected distribution.",
      degreesOfFreedomFormula: "df = k - 1 (where k = number of categories)",
      explanation: "This scenario measures ONE categorical variable across a sample and compares the observed category counts against a known or claimed expected distribution."
    };
  }
}

// API Endpoint to generate custom practice problems
app.post("/api/generate-problem", async (req, res) => {
  try {
    const { category, difficulty } = req.body;
    const ai = getGeminiClient();

    if (!ai) {
      return res.status(503).json({ error: "Gemini API key not configured." });
    }

    const prompt = `Generate a realistic statistics word problem for testing Chi-Square test selection.
Topic domain: ${category || "general statistics"}
Difficulty: ${difficulty || "medium"}

Randomly choose whether to make it a Chi-Square Goodness-of-Fit OR Chi-Square Test for Independence.

Return JSON:
{
  "id": "gen_${Date.now()}",
  "title": "Short descriptive title",
  "domain": "${category || "General"}",
  "difficulty": "${difficulty || "medium"}",
  "problemText": "Full paragraph word problem...",
  "question": "Which Chi-Square test should the researcher conduct?",
  "correctAnswer": "Goodness-of-Fit" OR "Independence",
  "numVariables": 1 OR 2,
  "variable1": "Name of variable 1",
  "variable2": "Name of variable 2 or None",
  "keyClues": ["clue 1", "clue 2"],
  "explanation": "Detailed step-by-step breakdown explaining why this specific test is correct and how to identify the variables."
}`;

    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: prompt,
      config: {
        responseMimeType: "application/json"
      }
    });

    const parsed = JSON.parse(response.text || "{}");
    return res.json({ problem: parsed });
  } catch (err: any) {
    console.error("Error generating problem:", err);
    return res.status(500).json({ error: "Failed to generate AI problem." });
  }
});

async function startServer() {
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Chi-Square Selector App running on http://0.0.0.0:${PORT}`);
  });
}

startServer();
