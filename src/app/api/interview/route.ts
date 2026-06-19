import Groq from "groq-sdk";
import { NextResponse } from "next/server";

const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY,
});

export async function POST(req: Request) {
  try {
    const { role, difficulty } = await req.json();

    const completion = await groq.chat.completions.create({
      model: "llama-3.3-70b-versatile",

      messages: [
        {
          role: "user",
          content: `
You are an expert technical interviewer.

Generate exactly 5 unique interview questions.

Role: ${role}
Difficulty: ${difficulty}

Rules:
- Return only questions
- One question per line
- No numbering
- No answers
`,
        },
      ],
    });

    const text =
      completion.choices[0]?.message?.content || "";

    return NextResponse.json({
      success: true,
      questions: text
        .split("\n")
        .filter((q) => q.trim() !== ""),
    });

  } catch (error: any) {
    console.error("FULL ERROR:", error);

    return NextResponse.json({
      success: false,
      message: String(error),
    });
  }
}