import Groq from "groq-sdk";
import { NextResponse } from "next/server";

const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY,
});

export async function POST(req: Request) {
  try {

    const {
  resumeText,
  targetRole,
  jobDescription,
} = await req.json();
if (!jobDescription && !targetRole) {
  return NextResponse.json({
    success: false,
    error:
      "Please provide either a target role or a job description.",
  });
}
    const completion =
      await groq.chat.completions.create({
        model: "llama-3.3-70b-versatile",
        messages: [
          {
            role: "user",
            content: `
You are an expert ATS Specialist,
Career Coach, and Technical Recruiter.

Analyze the candidate's resume against the provided job description.

If a job description is provided:
- Use ONLY the job description to determine required skills.
- Ignore the targetRole when identifying skill gaps.

If no job description is provided:
- Use the targetRole to infer industry-standard skills and requirements.

Compare the resume against those requirements.

matchedSkills must come from skills found in both the resume and requirements.

missingSkills must come from skills found in the requirements but not in the resume.

Do not invent requirements unrelated to the job description or target role.

Compare the candidate's resume with the job requirements.

Calculate:
- careerReadiness based on skill overlap
- matchedSkills found in both resume and job description
- missingSkills required by the job but not found in the resume

The learning roadmap must be personalized to close the identified skill gaps.
- learningRoadmap must contain exactly 3 stages:
  Beginner, Intermediate, Advanced.
- Each stage must contain:
  level, topics, duration.
- topics must be an array of strings.
- matchedSkills and missingSkills must be based on the requirements source being used (Job Description or targetRole).
- Do not invent skills that are not mentioned in the resume or job description.

Resume:
${resumeText}

Target Career:
${targetRole}

Job Description:
${jobDescription}


IMPORTANT:

If Job Description is provided:

- Extract required skills ONLY from the Job Description.
- matchedSkills = skills found in BOTH resume and Job Description.
- missingSkills = skills found in Job Description but NOT found in resume.
- Do not infer extra skills.

If Job Description is NOT provided:

- Use the targetRole to determine industry-standard skills.
- matchedSkills = skills found in BOTH resume and target role requirements.
- missingSkills = skills required for the target role but not found in the resume.

Do not add unrelated skills.
Do not duplicate skills.

CRITICAL RULE:

If Job Description exists:

IGNORE targetRole completely.

Do not infer any additional skills from the role.

Use ONLY skills explicitly found in the Job Description.

IMPORTANT:

If Job Description exists:

- matchedSkills must come only from skills found in both the resume and the Job Description.
- missingSkills must come only from skills found in the Job Description but not in the resume.

Recommendations and learningRoadmap should focus primarily on helping the candidate learn the missingSkills.

Do not introduce technologies unrelated to the Job Description.

The roadmap may include prerequisite concepts that are directly relevant to learning the missing skills.

Do not add TCP/IP, DNS, HTTP, Networking,
or any other inferred skills unless they
appear in the Job Description.

Return ONLY valid JSON.

{
  "careerReadiness": 0,
  "matchedSkills": [],
  "missingSkills": [],
  "strengths": [],
  "recommendations": [],
  "learningRoadmap": [
  {
    "level": "",
    "topics": [],
    "duration": ""
  }
],
  "estimatedLearningTime": ""
}

Rules:
- careerReadiness must be between 0 and 100.
- Evaluate the resume against the target career.
- Do not require an exact job description.
- Generate realistic career guidance.
- learningRoadmap should be ordered from beginner to advanced.
- matchedSkills should contain skills already possessed by the candidate.
- missingSkills should contain important missing skills.
- strengths should contain candidate strengths.
- recommendations should contain practical improvement suggestions.
- learningRoadmap should contain ordered learning steps.
- estimatedLearningTime should be realistic.
- Return JSON only.
- No markdown.
- No explanations.
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

let parsed;

try {

  parsed = JSON.parse(cleanedText);

  parsed.matchedSkills =
    Array.isArray(parsed.matchedSkills)
      ? parsed.matchedSkills
      : [];

  parsed.missingSkills =
    Array.isArray(parsed.missingSkills)
      ? parsed.missingSkills
      : [];

  parsed.strengths =
    Array.isArray(parsed.strengths)
      ? parsed.strengths
      : [];

  parsed.recommendations =
    Array.isArray(parsed.recommendations)
      ? parsed.recommendations
      : [];

  parsed.learningRoadmap =
    Array.isArray(parsed.learningRoadmap)
      ? parsed.learningRoadmap
      : [];

  parsed.estimatedLearningTime =
    parsed.estimatedLearningTime || "";

} catch {

  console.error(
    "INVALID JSON:",
    cleanedText
  );

  return NextResponse.json({
    success: false,
    error: "AI returned invalid JSON",
  });

}

const matched =
  parsed.matchedSkills?.length || 0;

const missing =
  parsed.missingSkills?.length || 0;

parsed.careerReadiness =
  matched + missing > 0
    ? Math.round(
        (matched / (matched + missing)) * 100
      )
    : 0;

console.log(
  "CAREER READINESS:",
  parsed.careerReadiness
);
console.log("MATCHED:", matched);
console.log("MISSING:", missing);
console.log("FINAL READINESS:", parsed.careerReadiness);
    return NextResponse.json({
  success: true,
  data: parsed,
});
  } catch (error: any) {

    console.error(
      "SKILL GAP ANALYSIS ERROR:"
    );

    console.error(error);

    return NextResponse.json({
      success: false,
      error:
        error?.message ||
        "Unknown error",
    });
  }
}