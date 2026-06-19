import Groq from "groq-sdk";
import { NextResponse } from "next/server";

const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY,
});

export async function POST(req: Request) {
  try {
    const {
      resumeText,
      jobDescription,
    } = await req.json();

    const completion =
      await groq.chat.completions.create({
        model: "llama-3.3-70b-versatile",
        messages: [
          {
            role: "user",
            content: `
You are an ATS and Recruitment Expert.

Compare the resume with the job description.

Resume:
${resumeText}

Job Description:
${jobDescription}

Return ONLY valid JSON.

{
  "matchScore": 0,
  "matchedSkills": [],
  "missingSkills": []
}

Rules:
- matchScore must be between 0 and 100.
- matchedSkills must contain only matching skills.
- missingSkills must contain important missing skills.
- Return JSON only.
`,
          },
        ],
      });

    const rawText =
      completion.choices[0].message.content || "{}";

    const cleanedText = rawText
      .replace(/```json/g, "")
      .replace(/```/g, "")
      .trim();

    console.log(cleanedText);

    return NextResponse.json({
      success: true,
      data: JSON.parse(cleanedText),
    });

  } catch (error: any) {

    console.error("JOB MATCH ERROR:");
    console.error(error);

    return NextResponse.json({
      success: false,
      error: error?.message || "Unknown error",
    });
  }
}