"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import AppSidebar from "@/components/layout/app-sidebar";

export default function SettingsPage() {

const [name, setName] = useState("");
const [email, setEmail] = useState("");
const [saved, setSaved] = useState(false);
const saveSettings = () => {

  localStorage.setItem(
  "userSettings",
  JSON.stringify({
    name,
    email,
  })
);

 setSaved(true);

setTimeout(() => {
  setSaved(false);
}, 3000);


};

useEffect(() => {

  const saved = localStorage.getItem("userSettings");

  if (saved) {

    const settings = JSON.parse(saved);

    setName(settings.name || "");
    setEmail(settings.email || "");
  }

}, []);


  return (
    <div className="flex min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-blue-950 text-white">

      <AppSidebar />

      <main className="flex-1 p-8">

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-5xl mx-auto"
        >

          <h1 className="text-4xl font-bold mb-8">
            ⚙️ Settings
          </h1>

          <div className="grid md:grid-cols-2 gap-6">

            <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-6">
              <h2 className="text-xl font-semibold mb-4">
                👤 Profile
              </h2>

              <div className="space-y-3">
                <input
  type="text"
  placeholder="Full Name"
  value={name}
  onChange={(e) => setName(e.target.value)}
  className="w-full p-3 rounded-xl bg-slate-900 border border-slate-700"
/>

                <input
  type="email"
  placeholder="Email"
  value={email}
  onChange={(e) => setEmail(e.target.value)}
  className="w-full p-3 rounded-xl bg-slate-900 border border-slate-700"
/>


              </div>
            </div>

          </div>

          <button
  onClick={saveSettings}
  className="mt-8 px-6 py-3 rounded-xl bg-cyan-500 hover:bg-cyan-600 transition"
>
            Save Settings
          </button>

          {saved && (
  <p className="mt-4 text-green-400 font-semibold">
    ✅ Settings Saved Successfully!
  </p>
)}

        </motion.div>

      </main>

    </div>
  );
}