// utils/predictFocusStatus.js
import axios from 'axios';

const GEMINI_API_KEY = 'AIzaSyAQ1WH5l0I88HGEVxfEL7XVbS1dYEtZp5M';
const GEMINI_API_URL = 'https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-pro-latest:generateContent';

export async function predictFocusStatus(domain) {
  if (!domain) return "Unknown";

  try {
    const response = await axios.post(`${GEMINI_API_URL}?key=${GEMINI_API_KEY}`, {
      contents: [
        {
          parts: [
            {
              text: `Is the domain "${domain}" a focus site or a distraction site? Respond with only one word: "Focus" or "Distraction".`
            }
          ]
        }
      ]
    });

    const prediction = response.data.candidates?.[0]?.content?.parts?.[0]?.text?.trim();

    if (prediction === "Focus" || prediction === "Distraction") {
      return prediction;
    } else {
      return "Unknown";
    }
  } catch (error) {
    console.error('Prediction error:', error.response?.data || error.message);
    return "Unknown";
  }
}
