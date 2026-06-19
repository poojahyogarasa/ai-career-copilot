"use client";
import { useResume } from "@/context/ResumeContext";
import { useState } from "react";
import { motion } from "framer-motion";
import AppSidebar from "@/components/layout/app-sidebar";

export default function JobMatcher() {

const {
  resumeText,
  jobDescription,
  setJobDescription,
  matchScore,
  setMatchScore,
} = useResume();

const [matchedSkills, setMatchedSkills] = useState<string[]>([]);

const [missingSkills, setMissingSkills] = useState<string[]>([]);

const [analyzed, setAnalyzed] = useState(false);
const analyzeJob = async () => {

  if (!resumeText) {
    alert("Please upload a resume first.");
    return;
  }

  const response = await fetch(
    "/api/job-match",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        resumeText,
        jobDescription,
      }),
    }
  );

  const result = await response.json();

  if (result.success) {

    setMatchScore(result.data.matchScore);

    setMatchedSkills(
      result.data.matchedSkills
    );

    setMissingSkills(
      result.data.missingSkills
    );

    setAnalyzed(true);
  }
};

  return (
    <div className="flex min-h-screen text-white bg-gradient-to-br from-slate-950 via-slate-900 to-blue-950">

      <AppSidebar />

      <main className="flex-1 p-8">

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >

          {/* Header */}

          <div className="flex items-center gap-4 mb-4">

            <div className="
              h-16
              w-16
              rounded-2xl
              bg-blue-500/20
              flex
              items-center
              justify-center
              text-3xl
            ">
              🎯
            </div>

            <div>

              <h1 className="text-5xl font-bold">
                Job Matcher
              </h1>

              <p className="text-slate-400">
                Skills Compared against job requirements
              </p>

            </div>

          </div>

          <p className="text-slate-400 text-lg mb-10">
            Paste a job description and let AI identify your match score,
            strengths, missing skills and learning recommendations.
          </p>

          {/* Job Description Input */}

          <div className="
            bg-white/5
            backdrop-blur-xl
            border
            border-white/10
            rounded-3xl
            p-6
          ">

            <h2 className="text-2xl font-bold mb-4">
              Job Description
            </h2>

            <div className="relative">

  <textarea
    value={jobDescription}
    onChange={(e) => setJobDescription(e.target.value)}
    placeholder="Paste the job description here..."
    className="
      w-full
      h-72
      bg-slate-950/30
      border
      border-cyan-500/20
      rounded-2xl
      p-6
      text-white
      resize-none
      outline-none
      transition-all
      focus:border-cyan-400
      focus:shadow-[0_0_30px_rgba(6,182,212,0.2)]
    "
  />

  <div
    className="
      absolute
      top-4
      right-4
      text-xs
      text-slate-400
      bg-black/20
      px-3
      py-1
      rounded-lg
    "
  >
    {jobDescription.length} chars
  </div>

</div>

           <div className="flex gap-4 mt-6">

  <button
    onClick={analyzeJob}
    className="
      px-8
      py-4
      rounded-xl
      bg-gradient-to-r
      from-cyan-500
      to-blue-600
      hover:scale-105
      transition-all
      font-semibold
      shadow-lg
      shadow-cyan-500/20
    "
  >
    ⚡ Analyze Job Match
  </button>

  <button
    onClick={() => setJobDescription("")}
    className="
      px-6
      py-4
      rounded-xl
      border
      border-white/10
      bg-white/5
      hover:bg-white/10
      transition
    "
  >
    🗑 Clear
  </button>

</div>
{analyzed && (

  <div className="mt-8 space-y-6">

    <div
  className="
    relative
    overflow-hidden
    rounded-3xl
    border border-white/10
    bg-white/5
    backdrop-blur-xl
    p-8
  "
>

  <div
    className="
      absolute
      top-0
      right-0
      w-64
      h-64
      bg-green-500/10
      blur-[100px]
      rounded-full
    "
  />

  <div className="relative z-10">

    <div className="flex items-center justify-between mb-6">

      <div>

        <p className="text-slate-400">
          AI Match Score
        </p>

        <h2 className="text-6xl font-bold text-green-400 mt-2">
          {matchScore}%
        </h2>

      </div>

      <div className="text-6xl">
        🎯
      </div>

    </div>

    <div className="w-full bg-white/10 rounded-full h-4">

      <motion.div
        initial={{ width: 0 }}
        animate={{ width: `${matchScore}%` }}
        transition={{ duration: 1.2 }}
        className="
          h-4
          rounded-full
          bg-gradient-to-r
          from-green-400
          to-cyan-400
        "
      />

    </div>

    <p className="text-slate-400 mt-4">

      {matchScore >= 80
        ? "Excellent match for this role"
        : matchScore >= 60
        ? "Good match with some skill gaps"
        : "Needs additional skills"}

    </p>

  </div>

</div>

    <div className="grid md:grid-cols-2 gap-6">

      <div className="bg-white/5 border border-white/10 rounded-2xl p-6">

        <h3 className="text-xl font-bold text-green-400 mb-4">
          Matched Skills
        </h3>

        <div className="flex flex-wrap gap-2">

          {matchedSkills.map((skill, index) => (

  <span
    key={`${skill}-${index}`}
    className="
      px-3 py-2
      rounded-xl
      bg-green-500/10
      border
      border-green-500/20
      text-green-300
      text-sm
      font-medium
      hover:scale-105
      transition-all
    "
  >
    ✓ {skill}
  </span>

))}

        </div>

      </div>

      <div className="bg-white/5 border border-white/10 rounded-2xl p-6">

        <h3 className="text-xl font-bold text-red-400 mb-4">
          Missing Skills
        </h3>

        <div className="flex flex-wrap gap-2">

          {missingSkills.map((skill, index) => (

  <span
    key={`${skill}-${index}`}
    className="
      px-3 py-2
      rounded-xl
      bg-red-500/10
      border
      border-red-500/20
      text-red-300
      text-sm
      font-medium
      hover:scale-105
      transition-all
    "
  >
    ✗ {skill}
  </span>

))}

        </div>

      </div>

    </div>

  </div>

)}

          </div>

        </motion.div>

      </main>

    </div>
  );
}