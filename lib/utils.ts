import { GoogleGenerativeAI } from '@google/generative-ai';

export const linkRegex = /(https?:\/\/[^\s]+)/g;

export function extractLink(text: string) {
  const matches = text.match(linkRegex);
  const str = matches ? matches[0] : null;
  return str; // Return the first match or null if no link is found
}

export async function generateSummary( newsLink: string) {
  try {
    const response = await fetch('https://r.jina.ai/' + newsLink);

    if (!response.ok) {
      throw new Error(`Scraping API error! Status: ${response.status}`);
    }

    const data = await response.text();

    const newdata = await geminiAi(data);
    return newdata;
  } catch (error) {
    console.error('Error scraping and summarizing:', error);
  }
}

export async function geminiAi(data: string) {
  const genAI = new GoogleGenerativeAI(process.env.GOOGLE_API_KEY as string);
  const model = genAI.getGenerativeModel({
    model: 'gemini-1.5-flash',
  });
  const result = await model.generateContent([
    'Please provide a detailed summary of the following article, making sure to preserve the original image links within the summary. Keep the summary concise and focused on the main points of the article, but ensure that all important topic and image links are included in the summary',
    data,
  ]);
  const newdata = result.response.text();
  return newdata;
}
