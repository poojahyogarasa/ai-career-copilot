"use client";

import { useState, useCallback } from "react";
import { useResume } from "@/context/ResumeContext";
import { useDropzone } from "react-dropzone";
import AppSidebar from "@/components/layout/app-sidebar";
import { motion } from "framer-motion";
import { extractTextFromPDF } from "@/lib/resume-parser";

export default function ResumeAnalyzer() {
  const {
  resumeText,
  setResumeText,

  skills,
  setSkills,

  skillsCount,
  setSkillsCount,

  atsScore,
  setAtsScore,

  resumeScore,
  setResumeScore,

  strengths,
  setStrengths,

  missingSkills,
  setMissingSkills,

  careerReadiness,
  setCareerReadiness,

  bestRole,
  setBestRole,
} = useResume();
 
  const [fileName, setFileName] = useState("");
  const [uploaded, setUploaded] = useState(false);
  const [loading, setLoading] = useState(false);

  const onDrop = useCallback(async (acceptedFiles: File[]) => {

  if (acceptedFiles.length > 0) {

    const file = acceptedFiles[0];

    setFileName(file.name);

    try {

  setLoading(true);

  const text = await extractTextFromPDF(file);
  console.log(text);

      const response = await fetch(
  "/api/analyze-resume",
  {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      resumeText: text,
    }),
  }
);

const aiResult = await response.json();
console.log("AI RESULT:", aiResult);
console.log("FULL ANALYSIS:", aiResult.data);
if (!aiResult.success) {
  console.error("AI ERROR:", aiResult.error);
}


if (aiResult.success) {

  const analysis = aiResult.data;
  setSkills(analysis.skills || []);
setSkillsCount(
  analysis.skills?.length || 0
);

  setAtsScore(analysis.atsScore);
  setResumeScore(analysis.resumeScore);
  setStrengths(analysis.strengths);
  setMissingSkills(analysis.missingSkills);
  setCareerReadiness(analysis.careerReadiness);
  setBestRole(analysis.bestRole);

  console.log("AI SKILLS:");

  setResumeText(text);
  setUploaded(true);
  setLoading(false);
}
} catch (error) {
  console.error(error);
  setLoading(false);
}
}

}, []);
const {
  getRootProps,
  getInputProps,
  isDragActive,
} = useDropzone({
  onDrop,
  accept: {
    "application/pdf": [".pdf"],
    "application/vnd.openxmlformats-officedocument.wordprocessingml.document": [".docx"],
  },
});

  return (
    <div className="flex min-h-screen text-white bg-gradient-to-br from-slate-950 via-slate-900 to-blue-950">

      <AppSidebar />

      <main className="flex-1 p-8">

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >

          <div className="flex items-center gap-4 mb-4">

  <div className="
    h-16 w-16
    rounded-2xl
    bg-blue-500/20
    flex items-center justify-center
    text-3xl
  ">
    🤖
  </div>

  <div>
    <h1 className="text-5xl font-bold">
      AI Resume Analyzer
    </h1>

    <p className="text-slate-400">
      Smart ATS Optimization & Career Intelligence
    </p>
  </div>

</div>

          <p className="text-slate-400 text-lg mb-10">
            Upload your resume and let AI analyze your skills,
            ATS score, strengths, weaknesses, and career readiness.
          </p>

          <div
            {...getRootProps()}
            className={`
  group
  relative
  overflow-hidden
  border-2
  border-dashed
  border-cyan-500/20
  rounded-3xl
  p-20
  text-center
  cursor-pointer
  bg-white/5
  backdrop-blur-xl
  transition-all
  duration-500
  hover:border-cyan-400
  hover:shadow-[0_0_50px_rgba(6,182,212,0.25)]
`}
          >

            <div
  className="
    absolute
    inset-0
    bg-gradient-to-br
    from-cyan-500/5
    via-transparent
    to-blue-500/5
    opacity-0
    group-hover:opacity-100
    transition
    duration-500
  "
/>

            

            <input {...getInputProps()} />

            <div className="space-y-4">

              <motion.div
  className="text-7xl"
  animate={{
    y: [0, -10, 0],
  }}
  transition={{
    repeat: Infinity,
    duration: 2,
  }}
>
  📄
</motion.div>

              <h2 className="text-3xl font-bold">
                Drag & Drop Resume Here
              </h2>

              <p className="text-slate-400">
                PDF and DOCX files supported
              </p>
              <p className="text-blue-400 text-sm">
  Powered by AI Resume Intelligence
</p>

              <button
                type="button"
                className="
  mt-6
  px-8
  py-4
  rounded-2xl
  bg-gradient-to-r
  from-cyan-500
  to-blue-500
  font-semibold
  text-white
  shadow-lg
  shadow-cyan-500/30
  hover:scale-105
  transition-all
"
              >
                Choose File
              </button>

            </div>

          </div>

         {loading && (

  <div className="
    mt-6
    p-6
    rounded-2xl
    bg-blue-500/10
    border
    border-blue-500/20
    backdrop-blur-xl
  ">

    <div className="animate-pulse">

      <h3 className="text-xl font-bold text-blue-400">
        🤖 AI Analyzing Resume...
      </h3>

      <p className="text-slate-400 mt-2">
        Extracting skills, calculating ATS score and generating recommendations...
      </p>

    </div>

  </div>

)}

{uploaded && !loading && (

  <div className="mt-6 p-4 rounded-xl bg-green-500/10 border border-green-500/20">

    <p className="text-green-400 font-semibold">
      ✓ Resume Uploaded Successfully
    </p>

    <p className="text-slate-300 mt-2">
      {fileName}
    </p>

  </div>

)}

    {/* Score Cards */}
<div className="grid md:grid-cols-3 gap-6 mt-10">

  {/* ATS Score */}
  <motion.div
    whileHover={{ y: -8 }}
    className="
      group
      relative
      overflow-hidden
      rounded-3xl
      border border-green-500/20
      bg-white/5
      backdrop-blur-xl
      p-6
      transition-all
      duration-300
      hover:shadow-[0_0_40px_rgba(34,197,94,0.25)]
    "
  >

    <div className="absolute inset-0 bg-gradient-to-br from-green-500/5 to-transparent opacity-0 group-hover:opacity-100 transition" />

    <div className="relative z-10">

      <div className="flex justify-between items-center mb-4">

        <p className="text-slate-400">
          ATS Score
        </p>

        <span className="text-2xl">
          📈
        </span>

      </div>

      <div className="w-full bg-white/10 rounded-full h-3 mb-4">
        <div
          className="bg-green-500 h-3 rounded-full transition-all duration-1000"
          style={{ width: `${atsScore}%` }}
        />
      </div>

      <h2 className="text-5xl font-bold text-green-400">
        {uploaded ? `${atsScore}%` : "--"}
      </h2>

      <p className="text-green-400 text-sm mt-2">
        ATS Optimization
      </p>

    </div>

  </motion.div>

  {/* Skills */}
  <motion.div
    whileHover={{ y: -8 }}
    className="
      group
      relative
      overflow-hidden
      rounded-3xl
      border border-cyan-500/20
      bg-white/5
      backdrop-blur-xl
      p-6
      transition-all
      duration-300
      hover:shadow-[0_0_40px_rgba(6,182,212,0.25)]
    "
  >

    <div className="relative z-10">

      <div className="flex justify-between items-center mb-4">

        <p className="text-slate-400">
          Skills Detected
        </p>

        <span className="text-2xl">
          🧠
        </span>

      </div>

      <h2 className="text-5xl font-bold text-cyan-400">
        {uploaded ? skillsCount : "--"}
      </h2>

      <p className="text-cyan-400 text-sm mt-2">
        Technical Skills
      </p>

    </div>

  </motion.div>

  {/* Resume Score */}
  <motion.div
    whileHover={{ y: -8 }}
    className="
      group
      relative
      overflow-hidden
      rounded-3xl
      border border-blue-500/20
      bg-white/5
      backdrop-blur-xl
      p-6
      transition-all
      duration-300
      hover:shadow-[0_0_40px_rgba(59,130,246,0.25)]
    "
  >

    <div className="relative z-10">

      <div className="flex justify-between items-center mb-4">

        <p className="text-slate-400">
          Resume Score
        </p>

        <span className="text-2xl">
          📄
        </span>

      </div>

      <div className="w-full bg-white/10 rounded-full h-3 mb-4">
        <div
          className="bg-blue-500 h-3 rounded-full transition-all duration-1000"
          style={{ width: `${resumeScore}%` }}
        />
      </div>

      <h2 className="text-5xl font-bold text-blue-400">
        {uploaded ? `${resumeScore}%` : "--"}
      </h2>

      <p className="text-blue-400 text-sm mt-2">
        Resume Quality
      </p>

    </div>

  </motion.div>

</div>

{/* Skills Section */}
{skills.length > 0 && (

  <div className="mt-8 w-full bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-6">

    <h2 className="text-2xl font-bold mb-4">
      Skills Detected
    </h2>

    <div className="flex flex-wrap gap-3">

      {skills.map((skill) => (

        <motion.span
  key={skill}
  initial={{
    opacity: 0,
    scale: 0.8,
  }}
  animate={{
    opacity: 1,
    scale: 1,
  }}
  whileHover={{
    scale: 1.08,
    y: -2,
  }}
  className="
    px-4
    py-2
    rounded-xl
    bg-blue-500/20
    border
    border-blue-500/30
    hover:border-cyan-400
    hover:bg-cyan-500/20
    transition-all
    duration-300
    cursor-default
  "
>
  {skill}
</motion.span>

      ))}

    </div>

  </div>

)}
{/* AI Analysis */}
{uploaded && (

  <div className="grid md:grid-cols-3 gap-6 mt-8">

    {/* Strengths */}
    <motion.div
      whileHover={{ y: -5 }}
      className="
        bg-green-500/10
        border border-green-500/20
        rounded-3xl
        p-6
        backdrop-blur-xl
      "
    >

      <div className="text-3xl mb-4">
        💪
      </div>

      <h3 className="text-xl font-bold text-green-400 mb-4">
        Strengths
      </h3>

      <div className="space-y-2">

        {strengths.map((item) => (
          <div
            key={item}
            className="text-slate-300"
          >
            ✓ {item}
          </div>
        ))}

      </div>

    </motion.div>

    {/* Missing Skills */}
    <motion.div
      whileHover={{ y: -5 }}
      className="
        bg-yellow-500/10
        border border-yellow-500/20
        rounded-3xl
        p-6
        backdrop-blur-xl
      "
    >

      <div className="text-3xl mb-4">
        ⚠️
      </div>

      <h3 className="text-xl font-bold text-yellow-400 mb-4">
        Missing Skills
      </h3>

      <div className="space-y-2">

        {missingSkills.map((item) => (
          <div
            key={item}
            className="text-slate-300"
          >
            • {item}
          </div>
        ))}

      </div>

    </motion.div>

    {/* Career Readiness */}
    <motion.div
      whileHover={{ y: -5 }}
      className="
        bg-blue-500/10
        border border-blue-500/20
        rounded-3xl
        p-6
        backdrop-blur-xl
      "
    >

      <div className="text-3xl mb-4">
        🚀
      </div>

      <h3 className="text-xl font-bold text-blue-400 mb-4">
        Career Readiness
      </h3>

      <div className="text-5xl font-bold text-white">
        {careerReadiness}
      </div>

      <p className="text-slate-300 mt-3">
        AI Generated Readiness Score
      </p>

    </motion.div>

  </div>

)}

{uploaded && (

  <motion.div
  initial={{ opacity: 0, y: 30 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.6 }}
  className="
  hover:border-cyan-400/40
hover:shadow-[0_0_50px_rgba(6,182,212,0.25)]
transition-all
duration-300
    mt-8
    relative
    overflow-hidden
    rounded-3xl
    border
    border-cyan-500/20
    bg-gradient-to-r
    from-blue-900/40
    via-cyan-900/20
    to-purple-900/30
    backdrop-blur-xl
    p-8

    hover:border-cyan-400/40
    hover:shadow-[0_0_50px_rgba(6,182,212,0.25)]
    transition-all
    duration-300
  "
>

    <div className="absolute inset-0 bg-cyan-500/5 animate-pulse" />

    <div className="relative z-10 flex items-center justify-between gap-10">

      <div>

        <p className="text-cyan-400 font-semibold mb-2">
          🎯 Recommended Career Path
        </p>

        <motion.h2
  initial={{ opacity: 0, x: -20 }}
  animate={{ opacity: 1, x: 0 }}
  transition={{ duration: 0.8 }}
  className="text-5xl font-bold text-white"
>
  {bestRole}
</motion.h2>

        <p className="text-slate-300 mt-3">
          Based on resume skills, ATS score,
          strengths, missing technologies and
          career readiness analysis.
        </p>

      </div>

      <motion.div
  animate={{
    y: [0, -10, 0],
    rotate: [0, 5, 0],
  }}
  transition={{
    repeat: Infinity,
    duration: 3,
  }}
  className="text-8xl opacity-80"
>
  🚀
</motion.div>

    </div>

  </motion.div>

)}

        </motion.div>

      </main>

    </div>
  );

}
