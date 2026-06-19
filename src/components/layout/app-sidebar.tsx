"use client";

import Link from "next/link";
import {
  LayoutDashboard,
  FileText,
  Briefcase,
  Brain,
  MessageSquare,
  Settings,
  Target,
} from "lucide-react";

export default function AppSidebar() {

  const items = [
    {
      icon: LayoutDashboard,
      label: "Dashboard",
      href: "/",
    },
    {
      icon: FileText,
      label: "Resume Analyzer",
      href: "/resume-analyzer",
    },
    {
      icon: Briefcase,
      label: "Job Matcher",
      href: "/job-matcher",
    },
    
    {
  icon: Target,
  label: "Skill Gap Analysis",
  href: "/skill-gap-analysis",
},
    {
      icon: MessageSquare,
      label: "Interview Prep",
      href: "/interview-prep",
    },
    {
      icon: Settings,
      label: "Settings",
      href: "/settings",
    },
  ];

  return (
    <aside className="w-64 bg-slate-900 border-r border-slate-800 p-6">

      <h2 className="text-2xl font-bold text-white mb-8">
        AI Copilot
      </h2>

      <nav className="space-y-2">

        {items.map((item) => {

          const Icon = item.icon;

          return (

            <Link
              key={item.label}
              href={item.href}
            >

              <div
                className="
                  flex
                  items-center
                  gap-3
                  px-4
                  py-3
                  rounded-xl
                  text-slate-300
                  hover:bg-slate-800
                  hover:text-white
                  transition
                  cursor-pointer
                "
              >
                <Icon size={18} />
                {item.label}
              </div>

            </Link>

          );

        })}

      </nav>

    </aside>
  );
}