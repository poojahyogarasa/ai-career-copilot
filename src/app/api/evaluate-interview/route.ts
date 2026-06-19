import Groq from "groq-sdk";
import { NextResponse } from "next/server";

const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY,
});

export async function POST(req: Request) {
  try {
    const {
      questions,
      answers,
      role,
      difficulty,
    } = await req.json();

    const qaText = questions
      .map(
        (q: string, i: number) =>
          `Question ${i + 1}: ${q}
Answer: ${answers[i] || "No Answer"}`
      )
      .join("\n\n");

    const completion =
      await groq.chat.completions.create({
        model: "llama-3.3-70b-versatile",

        messages: [
          {
            role: "user",
            content: `
You are an expert technical interviewer.

Evaluate the interview answers.

Role: ${role}
Difficulty: ${difficulty}

${qaText}

IMPORTANT:
Return ONLY raw JSON.
Do not use markdown.
Do not use \`\`\`json.
Do not add explanations.

{
  "score": 75,
  "strengths": [
    "strength 1",
    "strength 2"
  ],
  "weaknesses": [
    "weakness 1",
    "weakness 2"
  ],
  "tips": [
    "tip 1",
    "tip 2"
  ]
}
`,
          },
        ],
      });

    const text =
      completion.choices[0]?.message?.content || "";

    console.log("RAW RESPONSE:");
    console.log(text);

    const cleanedText = text
      .replace(/```json/g, "")
      .replace(/```/g, "")
      .trim();

    console.log("CLEANED RESPONSE:");
    console.log(cleanedText);

    return NextResponse.json(
      JSON.parse(cleanedText)
    );

  } catch (error) {
    console.error(error);

    return NextResponse.json({
      score: 0,
      strengths: [],
      weaknesses: [],
      tips: [],
    });
  }
}