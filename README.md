# 🚀 AI Career Copilot

An AI-powered career development platform designed to help job seekers analyze resumes, match job opportunities, identify skill gaps, and prepare for interviews using Large Language Models (LLMs).

Built with **Next.js, TypeScript, Tailwind CSS, Framer Motion, and Groq AI**, AI Career Copilot provides intelligent career guidance through a modern and interactive user experience.

---

## 🌟 Features

### 📄 AI Resume Analyzer
- Upload PDF resumes
- Automatic resume text extraction
- ATS compatibility analysis
- Resume strength assessment
- Missing skills detection
- Career readiness evaluation
- Best-fit role recommendations

### 🎯 AI Job Matcher
- Compare resumes against job descriptions
- AI-generated match percentage
- Identify matched skills
- Detect missing skills
- Personalized improvement recommendations

### 📈 Skill Gap Analysis
- Evaluate career readiness
- Identify skill gaps
- Generate personalized learning roadmaps
- Beginner → Intermediate → Advanced learning paths
- Estimated learning timelines

### 🎤 AI Interview Preparation
- Generate role-specific interview questions
- Multiple difficulty levels
- Timed interview sessions
- AI-powered answer evaluation
- Strength and weakness analysis
- Personalized improvement tips

### ⚙️ User Settings
- Personalized profile settings
- Theme preferences
- Persistent local storage support

---

## 🖼️ Application Screenshots

### Dashboard

![Dashboard](public/dashboard.png)

---

### Resume Analyzer

![Resume Analyzer](public/resume-analyzer.png)

---

### Job Matcher

![Job Matcher](public/job-matcher.png)

---

### Skill Gap Analysis

![Skill Gap Analysis](public/skill-gap-analysis.png)

---

### Interview Preparation

![Interview Preparation](public/interview-prep.png)

---

## 🏗️ System Architecture

```text
User
 │
 ▼
Next.js Frontend
 │
 ├── Resume Analyzer
 ├── Job Matcher
 ├── Skill Gap Analysis
 └── Interview Prep
 │
 ▼
Next.js API Routes
 │
 ▼
Groq AI (Llama 3.3 70B)
 │
 ▼
AI Analysis & Recommendations
```

---

## 🛠️ Tech Stack

### Frontend
- Next.js 15
- TypeScript
- Tailwind CSS
- Framer Motion
- ShadCN UI
- Recharts

### Backend & AI
- Next.js API Routes
- Groq Cloud API
- Llama 3.3 70B Versatile

### Resume Processing
- PDF.js
- Custom Resume Parser

### State Management
- React Context API
- Local Storage

### Development Tools
- Git
- GitHub
- VS Code

---

## 📂 Project Structure

```text
src/
│
├── app/
│   ├── api/
│   ├── resume-analyzer/
│   ├── job-matcher/
│   ├── skill-gap-analysis/
│   ├── interview-prep/
│   └── settings/
│
├── components/
│   ├── layout/
│   └── ui/
│
├── context/
│
├── hooks/
│
└── lib/
```

---

## 🚀 Installation

### Clone Repository

```bash
git clone https://github.com/poojahyogarasa/ai-career-copilot.git
```

### Navigate to Project Folder

```bash
cd ai-career-copilot
```

### Install Dependencies

```bash
npm install
```

### Configure Environment Variables

Create a `.env.local` file:

```env
GROQ_API_KEY=YOUR_GROQ_API_KEY
```

### Run Development Server

```bash
npm run dev
```

Open:

```text
http://localhost:3000
```

---

## 💡 Skills Demonstrated

- AI Application Development
- Large Language Model Integration
- Full-Stack Web Development
- TypeScript Development
- Next.js Application Architecture
- REST API Development
- State Management
- Responsive UI Design
- Prompt Engineering
- Career Intelligence Systems

---

## 🔮 Future Enhancements

- AI Career Chat Assistant
- Resume Version Tracking
- LinkedIn Profile Analysis
- AI Cover Letter Generator
- Voice-Based Interview Simulation
- Multi-Language Support
- Real-Time Job Recommendations
- Authentication System
- Cloud Database Integration
- Vercel Deployment

---

## 👩‍💻 Author

**Poojah Yogarasa**

Final-Year Computer Engineering Undergraduate  
University of Jaffna

- GitHub: https://github.com/poojahyogarasa
- LinkedIn: https://www.linkedin.com/in/poojah-yogarasa/

---

## ⭐ Project Impact

AI Career Copilot was developed to help students and job seekers make informed career decisions through AI-driven insights, resume evaluation, skill gap identification, and interview preparation.

The platform combines modern web technologies with Large Language Models to create an intelligent career development assistant that enhances employability and career readiness.
