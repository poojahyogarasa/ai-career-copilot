import Groq from "groq-sdk";
import { NextResponse } from "next/server";

const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY,
});

export async function POST(req: Request) {
  try {
    const { resumeText } = await req.json();

    const completion =
      await groq.chat.completions.create({
        model: "llama-3.3-70b-versatile",
        messages: [
          {
            role: "user",
            content: `
You are an expert ATS Resume Analyzer.

Analyze this resume:

${resumeText}

Analyze this resume realistically.

ATS Score Guidelines:

90-100:
Excellent resume with strong skills,
projects, education, certifications,
and ATS formatting.

75-89:
Good resume with minor gaps.

60-74:
Average resume with noticeable gaps.

40-59:
Weak resume with several missing areas.

0-39:
Poor resume lacking key qualifications.

Be realistic.

Do NOT give extremely low scores
unless the resume is genuinely weak.

Evaluate:
- Education
- Skills
- Projects
- Experience
- Certifications
- ATS Friendliness

Extract ALL technical skills found in the resume.

Include:
- Programming Languages
- Frameworks
- Libraries
- Databases
- Testing Tools
- Methodologies
- Cloud Technologies
- AI/ML Tools
- DevOps Tools

Do not invent skills.
Only return skills explicitly mentioned in the resume.

Return ONLY valid raw JSON.
Do not use markdown.
Do not use code blocks.
Do not include explanations.

Include:
- Programming languages
- Frameworks
- Libraries
- Databases
- Testing tools
- Methodologies
- Cloud technologies
- AI/ML tools
- DevOps tools

Do not miss skills.
{
  "atsScore": 0,
  "resumeScore": 0,
  "skills": [],
  "strengths": [],
  "missingSkills": [],
  "recommendations": [],
  "careerReadiness": "",
  "bestRole": ""
}
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
  console.error("RESUME ANALYZER ERROR:");
  console.error(error);

  return NextResponse.json({
    success: false,
    error: error?.message || "Unknown error",
  });
}
}