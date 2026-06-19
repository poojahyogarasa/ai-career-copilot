"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import AppSidebar from "@/components/layout/app-sidebar";
import { useResume } from "@/context/ResumeContext";

export default function SkillGapAnalysis() {
  const {
  resumeText,
  jobDescription,
  setTargetRole,
} = useResume();


 const [targetRole, setLocalTargetRole] = useState("");
  const [analysis, setAnalysis] = useState<any>(null);
const [loading, setLoading] = useState(false);
  
const analyzeSkills = async () => {
    if (!resumeText) {
  alert("Please upload a resume first.");
  return;
}

if (!jobDescription) {
  alert(
    "Please analyze a job description first in Job Matcher."
  );
  return;
}

  setLoading(true);

  try {

    const response = await fetch(
      "/api/skill-gap-analysis",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
  resumeText,
  targetRole,
  jobDescription,
}),
      }
    );

    const result = await response.json();

    if (result.success) {

  setAnalysis(result.data);

  setTargetRole(targetRole);

}

  } catch (error) {
    console.error(error);
  }

  setLoading(false);
};

  return (
    <div className="flex min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-blue-950 text-white">

      <AppSidebar />

      <main className="flex-1 p-8">

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-7xl mx-auto"
        >

          <h1 className="text-5xl font-bold mb-3">
            🎯 Skill Gap Analysis
          </h1>

          <p className="text-slate-400 mb-8">
            Analyze your readiness for a target career and discover missing skills.
          </p>

<div className="grid md:grid-cols-3 gap-6 mb-8">

  <motion.div
  whileHover={{
    y: -5,
    scale: 1.02,
  }}
  className="
  bg-gradient-to-br
  from-white/10
  to-white/5
  border
  border-white/10
  rounded-2xl
  p-6
  backdrop-blur-xl
  transition-all
  hover:border-cyan-400/30
"
>

  <p className="text-slate-400">
    Matched Skills
  </p>

  <h2 className="text-4xl font-bold text-cyan-400 mt-2">
    {analysis?.matchedSkills?.length || 0}
  </h2>

</motion.div>

  <motion.div
  whileHover={{
    y: -5,
    scale: 1.02,
  }}
  className="
    bg-white/5
    border
    border-white/10
    rounded-2xl
    p-6
    backdrop-blur-xl
    transition-all
  "
>

  <p className="text-slate-400">
    Missing Skills
  </p>

    <h2 className="text-4xl font-bold text-red-400 mt-2">
    {analysis?.missingSkills?.length || 0}
  </h2>

</motion.div>

<motion.div
  whileHover={{
    y: -5,
    scale: 1.02,
  }}
  className="
    bg-gradient-to-br
    from-white/10
    to-white/5
    border
    border-white/10
    rounded-2xl
    p-6
    backdrop-blur-xl
    transition-all
    hover:border-green-400/30
  "
>
  <p className="text-slate-400">
    Career Readiness
  </p>

  <h2 className="text-4xl font-bold text-green-400 mt-2">
    {analysis?.careerReadiness || 0}%
  </h2>

</motion.div>

</div>
          <div className="bg-white/5 border border-white/10 rounded-3xl p-8 backdrop-blur-xl">

            <input
  type="text"
  placeholder="Enter your target career (e.g. QA Engineer, AI Engineer, Data Engineer)"
  value={targetRole}
  onChange={(e) => setLocalTargetRole(e.target.value)}
  className="
    w-full
    rounded-xl
    bg-slate-900
    border
    border-slate-700
    p-4
    mb-6
  "
/>
            <motion.button
  whileHover={{
    scale: 1.05,
  }}
  whileTap={{
    scale: 0.95,
  }}
  onClick={analyzeSkills}
  disabled={!jobDescription || loading}
  className={`
    px-6 py-3 rounded-xl transition
    ${
      !jobDescription
        ? "bg-slate-600 cursor-not-allowed"
        : "bg-blue-600 hover:bg-blue-700"
    }
  `}
>
  {loading
  ? "Analyzing..."
  : "Analyze Career Gap"}
</motion.button>
          </div>

          {analysis && (
  <motion.div
  initial={{ opacity: 0 }}
  animate={{ opacity: 1 }}
  transition={{ staggerChildren: 0.15 }}
  className="mt-8 space-y-6"
>

    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      whileHover={{ scale: 1.01 }}
      className="
        relative
        overflow-hidden
        bg-white/5
        border
        border-cyan-500/20
        rounded-3xl
        p-8
        backdrop-blur-xl
      "
    >
      <div
        className="
          absolute
          inset-0
          bg-cyan-500/5
          blur-3xl
          pointer-events-none
        "
      />

      <h2 className="text-2xl font-bold text-center mb-8">
        🎯 Career Readiness
      </h2>

      <div className="flex justify-center">
        <div className="relative w-52 h-52">

          <svg
            className="w-52 h-52 rotate-[-90deg]"
            viewBox="0 0 200 200"
          >
           <motion.circle
  cx="100"
  cy="100"
  r="80"
  stroke="#22c55e"
  strokeWidth="15"
  fill="none"
  strokeLinecap="round"
  strokeDasharray={502}
  initial={{ strokeDashoffset: 502 }}
  animate={{
    strokeDashoffset:
      502 - (502 * analysis.careerReadiness) / 100,
  }}
  transition={{
    duration: 1.5,
    ease: "easeOut",
  }}
/>
          </svg>

          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <span className="text-5xl font-bold text-green-400">
              {analysis.careerReadiness}%
            </span>

            <span className="text-slate-400 mt-2">
              Match Score
            </span>
          </div>

        </div>
      </div>

      <div className="text-center mt-6">
        <span className="px-4 py-2 rounded-full bg-green-500/20 text-green-400 font-medium">
          {analysis.careerReadiness >= 80
            ? "Excellent Match"
            : analysis.careerReadiness >= 60
            ? "Good Match"
            : analysis.careerReadiness >= 40
            ? "Moderate Match"
            : "Needs Improvement"}
        </span>
      </div>

    </motion.div>

    <motion.div
      whileHover={{ y: -3 }}
      className="
  bg-gradient-to-br
  from-white/10
  to-white/5
  border
  border-white/10
  rounded-3xl
  p-6
  backdrop-blur-xl
"
    >
      <h2 className="text-2xl font-bold text-blue-400 mb-5">
        🤖 AI Recommendations
      </h2>

      <div className="flex flex-wrap gap-3">
  {analysis.missingSkills.map(
    (skill: string, index: number) => (
      <div
        key={index}
        className="
          px-4
          py-2
          rounded-xl
          bg-red-500/10
          border
          border-red-500/20
          text-red-300
        "
      >
        {skill}
      </div>
    )
  )}
</div>

      <div className="mt-6 pt-4 border-t border-white/10">
        {analysis.estimatedLearningTime}
      </div>

        </motion.div>

    {analysis.strengths?.length > 0 && (
      <motion.div
        whileHover={{ y: -3 }}
        className="
          bg-gradient-to-br
          from-white/10
          to-white/5
          border
          border-white/10
          rounded-3xl
          p-6
          backdrop-blur-xl
        "
      >
        <h2 className="text-2xl font-bold text-green-400 mb-5">
          🏆 Strengths
        </h2>

        <div className="flex flex-wrap gap-3">
          {analysis.strengths.map(
            (item: string, index: number) => (
              <div
                key={index}
                className="
                  px-4
                  py-2
                  rounded-xl
                  bg-green-500/10
                  border
                  border-green-500/20
                  text-green-300
                "
              >
                {item}
              </div>
            )
          )}
        </div>
      </motion.div>
    )}

    <motion.div
      whileHover={{ y: -3 }}
      className="
  bg-gradient-to-br
  from-white/10
  to-white/5
  border
  border-white/10
  rounded-3xl
  p-6
  backdrop-blur-xl
"
    >
      <h2 className="text-2xl font-bold text-cyan-400 mb-6">
        📈 Learning Roadmap
      </h2>
      <div className="space-y-4">

        {analysis.learningRoadmap.map(
          (step: any, index: number) => (
            <motion.div
              key={index}
              whileHover={{ scale: 1.01 }}
              className="
  bg-white/5
  border
  border-white/10
  rounded-2xl
  p-5
  transition-all
  hover:border-cyan-400/40
  hover:shadow-lg
  hover:shadow-cyan-500/10
"
            >
              <div className="flex justify-between items-center mb-3">

                <h3 className="text-cyan-400 font-bold text-lg">
                  {step.level}
                </h3>

                <span className="text-slate-400 text-sm">
                  {step.duration}
                </span>

              </div>

              <ul className="list-disc ml-6 space-y-1">
                {step.topics?.map(
                  (topic: string, i: number) => (
                    <li key={i}>{topic}</li>
                  )
                )}
              </ul>

            </motion.div>
          )
        )}

      </div>

    </motion.div>

  </motion.div>
)}

</motion.div>

</main>

</div>
);
}