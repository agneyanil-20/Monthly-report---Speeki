import { GoogleGenAI } from "@google/genai";
import { DASHBOARD_DATA } from "../constants";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

const SYSTEM_INSTRUCTION = `
You are an AI analyst for Speeki AI's social media performance dashboard for November 2025.
You have access to the following JSON data representing performance across Instagram, YouTube, and Facebook.
Your job is to answer user questions based STRICTLY on this data.
Keep answers concise, professional, and data-driven.
If the answer requires comparing two numbers, do the math.
If you don't know the answer from the data, say so.

Data:
${JSON.stringify(DASHBOARD_DATA)}
`;

export const sendMessageToGemini = async (message: string, history: {role: string, parts: {text: string}[]}[] = []) => {
  try {
    const chat = ai.chats.create({
      model: 'gemini-2.5-flash',
      config: {
        systemInstruction: SYSTEM_INSTRUCTION,
      },
      history: history, 
    });

    const result = await chat.sendMessage({ message });
    return result.text;
  } catch (error) {
    console.error("Gemini API Error:", error);
    return "Sorry, I encountered an error analyzing the data.";
  }
};