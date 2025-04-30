// test.js
import axios from 'axios';

const API_KEY = 'AIzaSyAQ1WH5l0I88HGEVxfEL7XVbS1dYEtZp5M';
const MODEL_NAME = 'models/gemini-1.5-pro-latest';
const API_URL = `https://generativelanguage.googleapis.com/v1beta/${MODEL_NAME}:generateContent?key=${API_KEY}`;

async function predictFocusOrDistraction(domain) {
  try {
    const prompt = `Is "${domain}" generally a focus site or a distraction site? Answer ONLY one word: Focus or Distraction.`;

    const response = await axios.post(API_URL, {
      contents: [
        {
          parts: [
            { text: prompt }
          ]
        }
      ]
    });

    const text = response.data.candidates?.[0]?.content?.parts?.[0]?.text?.trim();
    console.log(`Prediction for ${domain}:`, text);

  } catch (error) {
    console.error('Gemini API Error:', error.response?.data || error.message);
  }
}

// Example usage
predictFocusOrDistraction('reddit.com');
