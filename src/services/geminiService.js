import config from '../config/index.js';

const GEMINI_API_URL = 'https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent';

// IMPORTANT: Gemini must ONLY rephrase final responses. 
// Do NOT pass raw user input here, and do NOT allow Gemini to generate logic.
export async function rephrase(text) {
  const apiKey = config.gemini.apiKey;
  
  if (!apiKey) {
    return text;
  }

  try {
    const response = await fetch(`${GEMINI_API_URL}?key=${apiKey}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        system_instruction: { parts: [{ text: "You are a strict conversational text formatter. Rephrase the input sentence slightly to sound natural. IMPORTANT: Output ONLY the raw rephrased sentence. Do NOT provide options. Do NOT include phrases like 'Here is an option' or 'How about'. Do NOT include quotes." }] },
        contents: [{ parts: [{ text }] }],
        generationConfig: { temperature: 0.3 }
      })
    });

    if (!response.ok) throw new Error("Gemini API error");

    const data = await response.json();
    return data?.candidates?.[0]?.content?.parts?.[0]?.text?.trim() || text;
  } catch (error) {
    console.error("Gemini Error:", error);
    return text;
  }
}
