"use client";

import {
  createContext,
  useContext,
  useState,
  ReactNode,
  useEffect,
} from "react";

type ResumeContextType = {
  jobDescription: string;
  setJobDescription: (value: string) => void;

  resumeText: string;
  setResumeText: (value: string) => void;

  skills: string[];
  setSkills: (value: string[]) => void;

  skillsCount: number;
  setSkillsCount: (value: number) => void;

  atsScore: number;
  setAtsScore: (value: number) => void;

  resumeScore: number;
  setResumeScore: (value: number) => void;

  matchScore: number;
  setMatchScore: (value: number) => void;

  interviewReadiness: number;
  setInterviewReadiness: (value: number) => void;

  strengths: string[];
  setStrengths: (value: string[]) => void;

  missingSkills: string[];
  setMissingSkills: (value: string[]) => void;

  careerReadiness: number;
  setCareerReadiness: (value: number) => void;

  bestRole: string;
  setBestRole: (value: string) => void;

   targetRole: string;
setTargetRole: (value: string) => void;

  resetAnalysis: () => void;
};

const ResumeContext =
  createContext<ResumeContextType | null>(null);

export function ResumeProvider({
  children,
}: {
  children: ReactNode;
}) {

  const [resumeText, setResumeText] =
    useState("");

  const [skills, setSkills] =
    useState<string[]>([]);

  const [skillsCount, setSkillsCount] =
    useState(0);

  const [atsScore, setAtsScore] =
    useState(0);

  const [resumeScore, setResumeScore] =
    useState(0);

  const [matchScore, setMatchScore] =
    useState(0);

  const [
    interviewReadiness,
    setInterviewReadiness,
  ] = useState(0);

  const [strengths, setStrengths] =
    useState<string[]>([]);

  const [missingSkills, setMissingSkills] =
    useState<string[]>([]);

  const [
    careerReadiness,
    setCareerReadiness,
  ] = useState(0);

  const [bestRole, setBestRole] =
    useState("");

    const [targetRole, setTargetRole] =
  useState("");

  const [
    jobDescription,
    setJobDescription,
  ] = useState("");

  const resetAnalysis = () => {
  
  setTargetRole("");
  
  setResumeText("");

  setSkills([]);

  setSkillsCount(0);

  setAtsScore(0);

  setResumeScore(0);

  setMatchScore(0);

  setInterviewReadiness(0);

  setStrengths([]);

  setMissingSkills([]);

  setCareerReadiness(0);

  setBestRole("");

  setJobDescription("");

  localStorage.removeItem("resumeContext");

};

  // Load saved data
  useEffect(() => {

    const saved =
      localStorage.getItem("resumeContext");

    if (!saved) return;

    try {

      const data = JSON.parse(saved);

      setResumeText(data.resumeText || "");

      setSkills(data.skills || []);

      setSkillsCount(
        data.skillsCount || 0
      );

      setAtsScore(
        data.atsScore || 0
      );

      setResumeScore(
        data.resumeScore || 0
      );

      setMatchScore(
        data.matchScore || 0
      );

      setInterviewReadiness(
        data.interviewReadiness || 0
      );

      setStrengths(
        data.strengths || []
      );

      setMissingSkills(
        data.missingSkills || []
      );

      setCareerReadiness(
        data.careerReadiness || 0
      );

      setBestRole(
        data.bestRole || ""
      );

      setTargetRole(
  data.targetRole || ""
);

      setJobDescription(
        data.jobDescription || ""
      );

    } catch (error) {

      console.error(
        "Failed to load ResumeContext:",
        error
      );

    }

  }, []);

  // Save data automatically
  useEffect(() => {

    localStorage.setItem(
      "resumeContext",
      JSON.stringify({
        resumeText,
        skills,
        skillsCount,
        atsScore,
        resumeScore,
        matchScore,
        interviewReadiness,
        strengths,
        missingSkills,
        careerReadiness,
        bestRole,
        targetRole,
        jobDescription,
      })
    );

  }, [
    resumeText,
    skills,
    skillsCount,
    atsScore,
    resumeScore,
    matchScore,
    interviewReadiness,
    strengths,
    missingSkills,
    careerReadiness,
    bestRole,
    targetRole,
    jobDescription,
  ]);

  return (
    <ResumeContext.Provider
      value={{
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

        matchScore,
        setMatchScore,

        interviewReadiness,
        setInterviewReadiness,

        strengths,
        setStrengths,

        missingSkills,
        setMissingSkills,

        careerReadiness,
        setCareerReadiness,

        bestRole,
setBestRole,

targetRole,
setTargetRole,

jobDescription,
setJobDescription,

resetAnalysis,
      }}
    >
      {children}
    </ResumeContext.Provider>
  );
}

export function useResume() {

  const context =
    useContext(ResumeContext);

  if (!context) {

    throw new Error(
      "useResume must be used inside ResumeProvider"
    );

  }

  return context;
}