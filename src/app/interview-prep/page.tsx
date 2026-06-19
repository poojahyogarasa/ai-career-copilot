"use client";
// import Webcam from "react-webcam";
import { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import AppSidebar from "@/components/layout/app-sidebar";
import { useResume } from "@/context/ResumeContext";

export default function InterviewPrep() {
  
  const [interviewFinished, setInterviewFinished] = useState(false);
  const [score, setScore] = useState(0);
  const [strengths, setStrengths] = useState<string[]>([]);
  const [weaknesses, setWeaknesses] = useState<string[]>([]);
  const [tips, setTips] = useState<string[]>([]);
  const [history, setHistory] = useState<any[]>([]);
  const [answer, setAnswer] = useState("");
  const [isRecording, setIsRecording] = useState(false);
  const [answers, setAnswers] = useState<string[]>([]);
  const [timeLeft, setTimeLeft] = useState(120);
  const [interviewStarted, setInterviewStarted] = useState(false);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const {
  interviewReadiness,
  setInterviewReadiness,
  targetRole,
  resumeScore,
  matchScore,
  careerReadiness,
} = useResume();
  const [difficulty, setDifficulty] = useState("Easy");
  const [questions, setQuestions] = useState<string[]>([]);
  const [recognition, setRecognition] =
  useState<any>(null);
  

  useEffect(() => {

  const savedHistory = JSON.parse(
    localStorage.getItem("interviewHistory") || "[]"
  );

  setHistory(savedHistory);

}, []);
  
  const stopRecording = () => {

  if (recognition) {
    recognition.stop();
  }

  setIsRecording(false);

};
  const startRecording = () => {

  const SpeechRecognition =
    (window as any).SpeechRecognition ||
    (window as any).webkitSpeechRecognition;

  if (!SpeechRecognition) {
    alert("Speech Recognition not supported");
    return;
  }

  const recognitionInstance = new SpeechRecognition();

  recognitionInstance.lang = "en-US";
recognitionInstance.continuous = true;
recognitionInstance.interimResults = true;

setRecognition(recognitionInstance);

  setIsRecording(true);

  recognitionInstance.start();

  recognitionInstance.onresult = (event: any) => {

  let transcript = "";

  for (
    let i = 0;
    i < event.results.length;
    i++
  ) {
    transcript +=
      event.results[i][0].transcript + " ";
  }

  setAnswer(transcript);
};

  recognitionInstance.onend = () => {

  if (isRecording) {
    recognitionInstance.start();
  }

};

};

  useEffect(() => {

  if (!interviewStarted || questions.length === 0) return;

  const timer = setInterval(() => {

    setTimeLeft((prev) => {

      if (prev <= 1) {

  if (currentQuestion < questions.length - 1) {

    const nextQuestion = currentQuestion + 1;

    setCurrentQuestion(nextQuestion);

    setAnswer(
      answers[nextQuestion] || ""
    );

    return difficulty === "Easy"
      ? 120
      : difficulty === "Medium"
      ? 180
      : 300;
  }

  clearInterval(timer);

  return 0;
}
      return prev - 1;

    });

  }, 1000);

  return () => clearInterval(timer);

}, [
  interviewStarted,
  currentQuestion,
  questions.length,
  difficulty,
  answers
]);

  const generateQuestions = async () => {

  try {

    setInterviewFinished(false);
    setScore(0);
    setAnswers([]);
    setAnswer("");

    setCurrentQuestion(0);
    setInterviewStarted(true);

    if (difficulty === "Easy") {
      setTimeLeft(120);
    }
    else if (difficulty === "Medium") {
      setTimeLeft(180);
    }
    else {
      setTimeLeft(300);
    }

    const response = await fetch("/api/interview", {
      
  method: "POST",
  headers: {
    "Content-Type": "application/json",
  },
  
  body: JSON.stringify({
  role: targetRole,
  difficulty,
})
});

const data = await response.json();

if (!data.success) {
  alert(data.message);
  return;
}

setQuestions(data.questions);
  } catch (error) {

    console.error(error);

  }

};
  return (
    <div className="flex min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-blue-950 text-white">

      <AppSidebar />

      <main className="flex-1 p-8">

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-5xl mx-auto"
        >

          <h1 className="text-5xl font-bold mb-3">
            🎤 Interview Prep
          </h1>

          <p className="text-slate-400 mb-8">
            Practice interview questions based on your target role.
          </p>

{/* ADD HERE */}

<div className="grid md:grid-cols-3 gap-6 mb-8">

  <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
    <p className="text-slate-400">Questions</p>
    <h2 className="text-4xl font-bold text-cyan-400 mt-2">
      {questions.length}
    </h2>
  </div>

  <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
  <p className="text-slate-400">
    Target Role
  </p>

  <h2 className="text-3xl font-bold text-green-400 mt-2">
    {targetRole}
  </h2>
</div>

  <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
    <p className="text-slate-400">Difficulty</p>
    <h2 className="text-xl font-bold text-orange-400 mt-2">
      {difficulty}
    </h2>
  </div>

</div>

<div className="flex items-end gap-4 mt-6">

  <div className="w-64">
    <label className="block mb-2 text-slate-400">
      Difficulty
    </label>

    <select
      value={difficulty}
      onChange={(e) => setDifficulty(e.target.value)}
      className="w-full bg-slate-900 border border-slate-700 rounded-xl p-3"
    >
      <option>Easy</option>
      <option>Medium</option>
      <option>Hard</option>
    </select>
  </div>

  <button
    onClick={generateQuestions}
    className="px-6 py-3 rounded-xl bg-blue-600 hover:bg-blue-700"
  >
    Generate Questions
  </button>

</div>

  {interviewFinished && (

<div className="mt-8 bg-white/5 border border-white/10 rounded-3xl p-8">

  <h2 className="text-3xl font-bold mb-4">
    🎉 Interview Completed
  </h2>

  <div className="grid md:grid-cols-3 gap-6 mt-8">

  {/* Strengths */}
  <div className="rounded-2xl border border-green-500/20 bg-green-500/10 p-6">

    <h3 className="text-green-400 text-xl font-bold mb-4">
      💪 Strengths
    </h3>

    <ul className="space-y-3">
  {strengths.length > 0 ? (
    strengths.map((item, index) => (
      <li key={index}>
        ✅ {item}
      </li>
    ))
  ) : (
    <li>
      No strengths identified.
    </li>
  )}
</ul>

  </div>

  {/* Weaknesses */}
  <div className="rounded-2xl border border-red-500/20 bg-red-500/10 p-6">

    <h3 className="text-red-400 text-xl font-bold mb-4">
      ⚠️ Areas for Improvement
    </h3>

    <ul className="space-y-3">
  {weaknesses.length > 0 ? (
    weaknesses.map((item, index) => (
      <li key={index}>
        🔸 {item}
      </li>
    ))
  ) : (
    <li>
      No improvement areas identified.
    </li>
  )}
</ul>

  </div>

  {/* Recommendations */}
  <div className="rounded-2xl border border-cyan-500/20 bg-cyan-500/10 p-6">

    <h3 className="text-cyan-400 text-xl font-bold mb-4">
      🚀 Recommendations
    </h3>

    <ul className="space-y-3">
  {tips.length > 0 ? (
    tips.map((item, index) => (
      <li key={index}>
        💡 {item}
      </li>
    ))
  ) : (
    <li>
      No recommendations available.
    </li>
  )}
</ul>

  </div>

</div>

  <div className="grid md:grid-cols-4 gap-4 mb-8">

  <div className="rounded-xl bg-white/5 p-4">
  <p className="text-slate-400">Target Role</p>
  <p className="font-bold">
    {targetRole || "Not Selected"}
  </p>
</div>

  <div className="rounded-xl bg-white/5 p-4">
    <p className="text-slate-400">Difficulty</p>
    <p className="font-bold">{difficulty}</p>
  </div>

  <div className="rounded-xl bg-white/5 p-4">
  <p className="text-slate-400">Questions</p>
  <p className="font-bold">
    {questions.length > 0
      ? questions.length
      : "-"}
  </p>
</div>

  <div className="rounded-xl bg-white/5 p-4">
    <p className="text-slate-400">Score</p>
    <p className="font-bold text-cyan-400">
      {score}%
    </p>
  </div>

</div>

  <p className="mt-2">
    Status:
    {score >= 70
      ? " Passed ✅"
      : " Needs Improvement ⚠️"}
  </p>

</div>

)}

{interviewFinished && (

<div className="mt-8 bg-white/5 border border-white/10 rounded-3xl p-8">

  <h2 className="text-2xl font-bold text-center mb-6">
    🎯 Interview Readiness Score
  </h2>
{history.length > 0 && (

<div className="mt-8 bg-white/5 border border-white/10 rounded-3xl p-8">

  <h2 className="text-3xl font-bold mb-6">
    📊 Interview History
  </h2>

  <div className="space-y-4">

    {history.map((item, index) => (

      <div
        key={index}
        className="flex justify-between items-center bg-slate-900/50 p-4 rounded-xl"
      >

        <div>

          <p className="font-semibold">
            {item.targetRole}
          </p>

          <p className="text-sm text-slate-400">
            {item.date}
          </p>

        </div>

        <div>

          <span className="mr-4">
            {item.difficulty}
          </span>

          <span className="text-cyan-400 font-bold">
            {item.score}%
          </span>

        </div>

      </div>

    ))}

  </div>

</div>

)}

  <div className="text-center">

    <h1 className="text-6xl font-bold text-green-400">
  {Math.round(score)}%
</h1>

    <p className="mt-4 text-slate-300">
      {score >= 70
        ? "Ready for Interviews ✅"
        : "Needs More Practice ⚠️"}
    </p>

  </div>

</div>

)}

{questions.length > 0 && !interviewFinished && (

  

  <div className="mt-8 space-y-6">

    <div className="bg-white/5 border border-white/10 rounded-3xl p-8">

      <h2 className="text-2xl font-bold text-center mb-6">
        🎯 Interview Readiness Score
      </h2>

      <div className="flex justify-center">

        <div className="relative w-52 h-52">

          <svg
            className="w-52 h-52 rotate-[-90deg]"
            viewBox="0 0 200 200"
          >
            <circle
              cx="100"
              cy="100"
              r="80"
              stroke="#1e293b"
              strokeWidth="15"
              fill="none"
            />

            <circle
              cx="100"
              cy="100"
              r="80"
              stroke="#22c55e"
              strokeWidth="15"
              fill="none"
              strokeLinecap="round"
              strokeDasharray={502}
              strokeDashoffset={502 - (502 * score) / 100}
            />
          </svg>

          <div className="absolute inset-0 flex flex-col items-center justify-center">

            <span className="text-5xl font-bold text-green-400">
              {score}%
            </span>

            <span className="text-slate-400">
              Readiness
            </span>

          </div>

        </div>

      </div>

      <div className="text-center mt-4">

        <span
  className={`px-4 py-2 rounded-full ${
    score >= 70
      ? "bg-green-500/20 text-green-400"
      : "bg-red-500/20 text-red-400"
  }`}
>
  {score >= 70
    ? "Ready for Interviews"
    : "Needs Practice"}
</span>

      </div>

    </div>

    <div className="bg-white/5 border border-white/10 rounded-3xl p-6">

  <h2 className="text-2xl font-bold text-cyan-400 mb-5">
    💡 Interview Best Practices
  </h2>

  <div className="space-y-3 text-slate-300">

    <p>✅ Use the STAR method when answering behavioral questions.</p>

    <p>✅ Explain your projects with problem → solution → outcome.</p>

    <p>✅ Mention GitHub repositories and live demos.</p>

    <p>✅ Highlight AI Career Copilot and Weapon Detection projects.</p>

    <p>✅ Focus on confidence and clear communication.</p>

  </div>

</div>

    <div className="space-y-4">

              <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
<div className="flex gap-3 mb-4">
  

</div>
              <p className="text-red-400 font-bold mb-3">
  ⏱ {Math.floor(timeLeft / 60)}:
  {(timeLeft % 60).toString().padStart(2, "0")}
</p>

  <h3 className="text-cyan-400 font-bold text-xl mb-4">
    Question {currentQuestion + 1} of {questions.length}
  </h3>
<p className="text-lg">
  {questions[currentQuestion]}
</p>

<div className="flex gap-3 mb-4">

  <button
    onClick={startRecording}
    disabled={isRecording}
    className="px-4 py-2 rounded-lg bg-green-600 hover:bg-green-700 disabled:opacity-50"
  >
    🎤 Start Recording
  </button>

  <button
    onClick={stopRecording}
    disabled={!isRecording}
    className="px-4 py-2 rounded-lg bg-red-600 hover:bg-red-700 disabled:opacity-50"
  >
    🛑 Stop Recording
  </button>

</div>

<textarea
  rows={6}
  value={answer}
  onChange={(e) => setAnswer(e.target.value)}
  placeholder="Type your answer here..."
  className="w-full mt-6 bg-slate-900 border border-slate-700 rounded-xl p-4"
/>
</div>

<div className="flex justify-between">

  <button
  onClick={() => {

    const updatedAnswers = [...answers];

    updatedAnswers[currentQuestion] = answer;

    setAnswers(updatedAnswers);

    const previousQuestion = Math.max(
      currentQuestion - 1,
      0
    );

    setCurrentQuestion(previousQuestion);

    setAnswer(
      updatedAnswers[previousQuestion] || ""
    );
  }}
  disabled={currentQuestion === 0}
  className="px-6 py-3 rounded-xl bg-slate-700 disabled:opacity-50"
>
  ← Previous
</button>

  {currentQuestion === questions.length - 1 ? (

  <button
 onClick={async () => {

  if (!answer.trim()) {
  alert("Please answer the question before finishing.");
  return;
}

  const updatedAnswers = [...answers];

  updatedAnswers[currentQuestion] = answer;

  setAnswers(updatedAnswers);

  const response = await fetch(
    "/api/evaluate-interview",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
  questions,
  answers: updatedAnswers,
  role: targetRole,
  difficulty,
})
    }
  );

  const result = await response.json();

setScore(result.score);

setInterviewReadiness(
  result.score
);

setStrengths(result.strengths);

setWeaknesses(result.weaknesses);

setTips(result.tips);

const historyItem = {
  date: new Date().toLocaleDateString(),
  targetRole: targetRole,
  difficulty,
  score: result.score,
};

const existingHistory = JSON.parse(
  localStorage.getItem("interviewHistory") || "[]"
);

existingHistory.unshift(historyItem);

const trimmedHistory =
  existingHistory.slice(0, 20);

localStorage.setItem(
  "interviewHistory",
  JSON.stringify(trimmedHistory)
);

setHistory(trimmedHistory);

setInterviewFinished(true);

}}
  className="px-6 py-3 rounded-xl bg-green-600 hover:bg-green-700"
>
  Finish Interview
</button>

) : (

  <button
    onClick={() => {

      const updatedAnswers = [...answers];

      updatedAnswers[currentQuestion] = answer;

      setAnswers(updatedAnswers);

      const nextQuestion = currentQuestion + 1;

if (nextQuestion < questions.length) {

  setCurrentQuestion(nextQuestion);

  setAnswer(
    updatedAnswers[nextQuestion] || ""
  );

}

    }}
    className="px-6 py-3 rounded-xl bg-blue-600 hover:bg-blue-700"
  >
    Next →
  </button>

)}
</div>

                  </div>

    </div>

  )}

        </motion.div>

      </main>

    </div>
  );
}