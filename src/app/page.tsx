"use client";
import { useResume } from "@/context/ResumeContext";
import Link from "next/link";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import CountUp from "react-countup";
import AppSidebar from "@/components/layout/app-sidebar";

export default function Home() {


  
  const {
  resumeScore,
  matchScore,
  skills,
  interviewReadiness,
  resetAnalysis,
} = useResume();

  const [userName, setUserName] = useState("User");

  const stats = [
  {
    title: "Resume Score",
    value: resumeScore,
    icon: "📄",
    color: "text-cyan-400",
    subtitle: "AI Analysis",
  },
  {
    title: "Job Match",
    value: matchScore,
    icon: "🎯",
    color: "text-green-400",
    subtitle: "Job Compatibility",
  },
  {
    title: "Skills Detected",
    value: skills.length,
    icon: "🧠",
    color: "text-purple-400",
    subtitle: "Resume Skills",
  },
  {
    title: "Interview Readiness",
    value: interviewReadiness,
    icon: "🎤",
    color: "text-orange-400",
    subtitle: "Preparation Score",
  },
];

useEffect(() => {
  const saved = localStorage.getItem("userSettings");

  if (saved) {
    const settings = JSON.parse(saved);
    setUserName(settings.name || "User");
  }
}, []);

  return (
    <div className="flex min-h-screen text-white bg-gradient-to-br from-slate-950 via-slate-900 to-blue-950">
      
      <AppSidebar />

      <main className="flex-1 p-8">

<motion.div
  initial={{ opacity: 0, y: 30 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.6 }}
  className="mb-10 relative"
>

  <div
    className="
      absolute
      top-20
      right-20
      w-96
      h-96
      bg-cyan-500/10
      blur-[120px]
      rounded-full
      pointer-events-none
    "
  />

  <div
    className="
      relative
      overflow-hidden
      rounded-3xl
      border border-white/10
      bg-white/5
      backdrop-blur-2xl
      p-10
      shadow-[0_0_80px_rgba(6,182,212,0.15)]
    "
  >

    <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/10 via-blue-500/5 to-purple-500/10" />

    <div className="relative z-10">

      <p className="text-cyan-400 font-semibold text-lg mb-3">
        Welcome Back, {userName} 👋
      </p>

      <h1
        className="
          text-6xl
          md:text-7xl
          font-extrabold
          leading-tight
          bg-gradient-to-r
          from-white
          via-cyan-200
          to-cyan-400
          bg-clip-text
          text-transparent
          mb-6
        "
      >
        AI Career
        <br />
        Copilot
      </h1>

      <p className="text-slate-300 text-xl max-w-2xl mb-8">
        Analyze your resume, discover skill gaps,
        prepare for interviews, and accelerate your
        career growth with AI-powered insights.
      </p>

      <button
        onClick={() => {
          const confirmed = window.confirm(
            "Start a new analysis? This will clear all current results."
          );

          if (confirmed) {
            resetAnalysis();
          }
        }}
        className="
          px-6
          py-3
          rounded-xl
          bg-cyan-500
          hover:bg-cyan-400
          transition
          font-semibold
          shadow-lg
          shadow-cyan-500/30
        "
      >
        Start New Analysis
      </button>

    </div>

  </div>

</motion.div>

        <div className="grid md:grid-cols-2 xl:grid-cols-4 gap-6 mt-8">

  {stats.map((stat, index) => (

  <motion.div
    key={index}
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{
      delay: index * 0.1,
    }}
    className="
      group
      relative
      overflow-hidden
      rounded-3xl
      border border-white/10
      bg-white/5
      backdrop-blur-xl
      p-6
      transition-all
      duration-300
      hover:scale-105
      hover:border-cyan-400/40
      hover:shadow-[0_0_40px_rgba(6,182,212,0.25)]
    "
  >

    <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/5 to-transparent opacity-0 group-hover:opacity-100 transition" />

    <div className="relative z-10">

      <div className="flex justify-between items-center mb-4">

        <p className="text-slate-400">
          {stat.title}
        </p>

        <span className="text-2xl">
          {stat.icon}
        </span>

      </div>

      <h2 className={`text-5xl font-bold ${stat.color}`}>
  <CountUp
    end={Number(stat.value) || 0}
    duration={2}
  />
</h2>

      <p className="text-slate-400 text-sm mt-2">
        {stat.subtitle}
      </p>

    </div>

  </motion.div>

))}

        </div>

      </main>

    </div>
  );
}