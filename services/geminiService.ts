import { GoogleGenAI, Type } from "@google/genai";
import { Candidate } from '../types';

/**
 * This service handles interactions with the Gemini API.
 * In a real-world scenario, you would pass the file contents (base64 or text)
 * to these functions.
 */

// Initialize Gemini
// Note: In this demo environment, process.env.API_KEY might not be set.
// The app falls back to mock data if this initialization or call fails.
let ai: GoogleGenAI | null = null;
if (process.env.API_KEY) {
  ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
}

export const analyzeCandidateWithGemini = async (
  jdText: string, 
  resumeText: string
): Promise<Candidate | null> => {
  if (!ai) {
    console.warn("Gemini API Key not found. Returning mock data path.");
    return null;
  }

  try {
    const prompt = `
      You are an expert technical recruiter. Analyze the following candidate resume against the provided Job Description.
      
      Job Description:
      ${jdText}

      Resume:
      ${resumeText}

      Return a JSON object with the following structure:
      {
        "name": string,
        "email": string,
        "phone": string,
        "score": number (0-100),
        "experience": string,
        "education": string,
        "location": string,
        "currentRole": string,
        "skills": string[],
        "strengths": string (summary),
        "gaps": string (summary),
        "recommendation": string,
        "status": "recommended" | "maybe" | "rejected",
        "culturalFit": number (0-100),
        "technicalScore": number (0-100),
        "experienceScore": number (0-100)
      }
    `;

    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            name: { type: Type.STRING },
            email: { type: Type.STRING },
            phone: { type: Type.STRING },
            score: { type: Type.NUMBER },
            experience: { type: Type.STRING },
            education: { type: Type.STRING },
            location: { type: Type.STRING },
            currentRole: { type: Type.STRING },
            skills: { type: Type.ARRAY, items: { type: Type.STRING } },
            strengths: { type: Type.STRING },
            gaps: { type: Type.STRING },
            recommendation: { type: Type.STRING },
            status: { type: Type.STRING, enum: ["recommended", "maybe", "rejected"] },
            culturalFit: { type: Type.NUMBER },
            technicalScore: { type: Type.NUMBER },
            experienceScore: { type: Type.NUMBER },
          },
          required: ["name", "score", "status", "recommendation"]
        }
      }
    });

    if (response.text) {
      return JSON.parse(response.text) as Candidate;
    }
    return null;

  } catch (error) {
    console.error("Error analyzing candidate with Gemini:", error);
    return null;
  }
};
