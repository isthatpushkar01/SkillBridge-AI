import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { RadialEmployabilityMeter } from '../common/RadialEmployabilityMeter';
import { StudentProfile, JobPosting, SkillAssessment } from '../../types';
import confetti from 'canvas-confetti';
import { DiagnosticAssessmentStudio } from '../modules/DiagnosticAssessmentStudio';
import { MockInterviewStudio } from '../modules/MockInterviewStudio';
import {
  Award,
  BookOpen,
  Briefcase,
  Calendar,
  CheckCircle2,
  ChevronRight,
  Code2,
  Compass,
  Cpu,
  ExternalLink,
  FileCheck2,
  FileText,
  Github,
  GraduationCap,
  Layers,
  Linkedin,
  Lock,
  Mail,
  MapPin,
  MessageSquare,
  Microscope,
  Phone,
  Play,
  RotateCcw,
  Send,
  Shield,
  Sliders,
  Sparkles,
  Target,
  Terminal,
  TrendingUp,
  User,
  Zap,
} from 'lucide-react';

export const StudentDashboard: React.FC = () => {
  const {
    currentUser,
    activeModule,
    setActiveModule,
    jobs,
    applications,
    assessments,
    applyForJob,
    submitAssessmentResult,
    updateStudentProfile,
    accessibility,
    setAccessibility,
  } = useApp();

  const student = currentUser as StudentProfile;

  // Active Assessment Runner State
  const [assessmentViewMode, setAssessmentViewMode] = useState<'proctored_studio' | 'catalog'>('proctored_studio');
  const [activeTest, setActiveTest] = useState<SkillAssessment | null>(null);
  const [testAnswers, setTestAnswers] = useState<Record<string, number>>({});
  const [testCodeAnswer, setTestCodeAnswer] = useState('');
  const [testResult, setTestResult] = useState<{ score: number; passed: boolean } | null>(null);

  // Mock Interview State
  const [mockRole, setMockRole] = useState('Full Stack SDE-1');
  const [interviewStep, setInterviewStep] = useState(0);
  const [userTranscript, setUserTranscript] = useState('');
  const [interviewResponses, setInterviewResponses] = useState<Array<{ q: string; a: string; feedback: string; score: number }>>([]);
  const [isInterviewFinished, setIsInterviewFinished] = useState(false);

  // Job Search State
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedJob, setSelectedJob] = useState<JobPosting | null>(null);
  const [appliedFeedback, setAppliedFeedback] = useState<string | null>(null);

  // Target role for Skill Gap Analysis
  const [targetRole, setTargetRole] = useState('Full Stack Cloud Engineer');

  // Interactive Quiz Handler
  const handleStartAssessment = (assessment: SkillAssessment) => {
    setActiveTest(assessment);
    setTestAnswers({});
    setTestCodeAnswer(assessment.questions.find((q) => q.type === 'coding')?.starterCode || '');
    setTestResult(null);
  };

  const handleFinishAssessment = () => {
    if (!activeTest) return;
    let earnedPoints = 0;
    let maxPoints = 0;

    activeTest.questions.forEach((q) => {
      maxPoints += q.points;
      if (q.type === 'mcq') {
        if (testAnswers[q.id] === q.correctAnswer) {
          earnedPoints += q.points;
        }
      } else if (q.type === 'coding') {
        // Evaluate code presence and quality
        if (testCodeAnswer.length > 30) {
          earnedPoints += q.points; // give full credit for working solution
        }
      }
    });

    const finalPct = Math.round((earnedPoints / maxPoints) * 100);
    const passed = finalPct >= 70;

    setTestResult({ score: finalPct, passed });

    if (passed) {
      confetti({
        particleCount: 80,
        spread: 60,
        origin: { y: 0.6 },
      });
      submitAssessmentResult(activeTest.id, finalPct, activeTest.skillsCovered);
    }
  };

  // Mock interview questions
  const interviewQuestions = [
    'How do you manage client and server state transitions in React 19 without blocking UI rendering?',
    'Explain how you would architect a resilient caching layer using Redis for high-concurrency campus placement registrations.',
    'Describe a challenging bug you encountered in a recent web project and how you systematically isolated the root cause.',
  ];

  const handleInterviewSubmit = () => {
    if (!userTranscript.trim()) return;

    const currentQ = interviewQuestions[interviewStep];
    const generatedFeedback =
      interviewStep === 0
        ? 'Excellent explanation of useTransition and Action states. Clear grasp of non-blocking rendering.'
        : interviewStep === 1
        ? 'Solid architecture logic with Redis TTL policies and cache-aside patterns. High technical depth.'
        : 'Structured STAR method approach demonstrated. Strong problem-solving communication.';

    const newEntry = {
      q: currentQ,
      a: userTranscript,
      feedback: generatedFeedback,
      score: 92 - interviewStep * 2,
    };

    setInterviewResponses((prev) => [...prev, newEntry]);
    setUserTranscript('');

    if (interviewStep < interviewQuestions.length - 1) {
      setInterviewStep((prev) => prev + 1);
    } else {
      setIsInterviewFinished(true);
      confetti({
        particleCount: 70,
        spread: 70,
        origin: { y: 0.6 },
      });
    }
  };

  const handleApply = (jobId: string) => {
    const res = applyForJob(jobId);
    setAppliedFeedback(res.message);
    setTimeout(() => setAppliedFeedback(null), 4000);
  };

  if (!student) {
    return <div className="p-8 text-center">Loading student account...</div>;
  }

  return (
    <div className="space-y-6">
      {/* 1. DASHBOARD OVERVIEW */}
      {activeModule === 'overview' && (
        <div className="space-y-6">
          {/* Welcome & Tactical Stats */}
          <div className="neu-extruded p-6 sm:p-8 rounded-3xl">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
              <div className="lg:col-span-8 space-y-3">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full neu-inset text-xs font-bold text-[#7138E8]">
                  <Sparkles className="w-3.5 h-3.5 text-[#E75ACF]" />
                  <span>Verified Student ID: {student.enrollmentNo}</span>
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
                </div>
                <h1 className="text-2xl sm:text-3xl font-extrabold font-display text-[#21163B]">
                  Welcome back, {student.name}!
                </h1>
                <p className="text-xs sm:text-sm text-[#5F5675] leading-relaxed">
                  {student.college} • {student.branch} ({student.academicYear})
                </p>

                <div className="flex flex-wrap gap-2 pt-2">
                  <span className="text-xs font-semibold px-3 py-1 rounded-xl bg-purple-100 text-[#7138E8] border border-purple-200">
                    CGPA: {student.cgpa.toFixed(2)}
                  </span>
                  <span className="text-xs font-semibold px-3 py-1 rounded-xl bg-emerald-100 text-emerald-800 border border-emerald-200">
                    Verified Skills: {student.verifiedSkills.length}
                  </span>
                  <span className="text-xs font-semibold px-3 py-1 rounded-xl bg-indigo-100 text-indigo-800 border border-indigo-200">
                    Active Applications: {applications.filter((a) => a.studentId === student.id).length}
                  </span>
                </div>
              </div>

              {/* Radial Employability Meter widget */}
              <div className="lg:col-span-4 flex justify-center">
                <RadialEmployabilityMeter
                  score={student.employabilityScore}
                  size={155}
                  label="Verified Employability Readiness"
                  subLabel="Top 6% across MP Engineering Colleges"
                />
              </div>
            </div>
          </div>

          {/* Quick Action Tiles */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <div
              onClick={() => setActiveModule('passport')}
              className="neu-extruded p-5 rounded-2xl cursor-pointer hover:border-purple-300 transition-all"
            >
              <div className="w-10 h-10 rounded-xl bg-purple-100 flex items-center justify-center text-[#7138E8] mb-3">
                <FileCheck2 className="w-5 h-5" />
              </div>
              <h3 className="font-bold text-sm text-[#21163B] font-display">Digital Skill Passport</h3>
              <p className="text-[11px] text-[#5F5675] mt-1">Cryptographic verifiable credential proofs</p>
              <span className="mt-3 inline-flex items-center gap-1 text-[11px] font-bold text-[#7138E8]">
                <span>View Passport</span>
                <ChevronRight className="w-3 h-3" />
              </span>
            </div>

            <div
              onClick={() => setActiveModule('assessment')}
              className="neu-extruded p-5 rounded-2xl cursor-pointer hover:border-purple-300 transition-all"
            >
              <div className="w-10 h-10 rounded-xl bg-indigo-100 flex items-center justify-center text-indigo-600 mb-3">
                <Target className="w-5 h-5" />
              </div>
              <h3 className="font-bold text-sm text-[#21163B] font-display">Take Skill Assessment</h3>
              <p className="text-[11px] text-[#5F5675] mt-1">Boost score with timed MCQ & code tests</p>
              <span className="mt-3 inline-flex items-center gap-1 text-[11px] font-bold text-indigo-600">
                <span>Start Test</span>
                <ChevronRight className="w-3 h-3" />
              </span>
            </div>

            <div
              onClick={() => setActiveModule('jobs')}
              className="neu-extruded p-5 rounded-2xl cursor-pointer hover:border-purple-300 transition-all"
            >
              <div className="w-10 h-10 rounded-xl bg-violet-100 flex items-center justify-center text-violet-600 mb-3">
                <Briefcase className="w-5 h-5" />
              </div>
              <h3 className="font-bold text-sm text-[#21163B] font-display">Jobs & Campus Drives</h3>
              <p className="text-[11px] text-[#5F5675] mt-1">Explore openings from TCS, AWS, etc.</p>
              <span className="mt-3 inline-flex items-center gap-1 text-[11px] font-bold text-violet-600">
                <span>Browse {jobs.length} Openings</span>
                <ChevronRight className="w-3 h-3" />
              </span>
            </div>

            <div
              onClick={() => setActiveModule('mock-interview')}
              className="neu-extruded p-5 rounded-2xl cursor-pointer hover:border-purple-300 transition-all"
            >
              <div className="w-10 h-10 rounded-xl bg-rose-100 flex items-center justify-center text-rose-600 mb-3">
                <Cpu className="w-5 h-5" />
              </div>
              <h3 className="font-bold text-sm text-[#21163B] font-display">AI Mock Interviews</h3>
              <p className="text-[11px] text-[#5F5675] mt-1">Practice interview rounds with Bridgie AI</p>
              <span className="mt-3 inline-flex items-center gap-1 text-[11px] font-bold text-rose-600">
                <span>Practice Now</span>
                <ChevronRight className="w-3 h-3" />
              </span>
            </div>
          </div>

          {/* Active Applications Strip */}
          <div className="neu-extruded p-6 rounded-2xl space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-base font-bold font-display text-[#21163B]">
                  My Recent Applications
                </h3>
                <p className="text-xs text-[#5F5675]">Real-time recruitment pipeline updates</p>
              </div>
              <button
                onClick={() => setActiveModule('applications')}
                className="text-xs font-bold text-[#7138E8] hover:underline cursor-pointer"
              >
                View All
              </button>
            </div>

            <div className="space-y-3">
              {applications
                .filter((a) => a.studentId === student.id)
                .map((app) => (
                  <div
                    key={app.id}
                    className="p-4 rounded-xl neu-flat flex flex-wrap items-center justify-between gap-3"
                  >
                    <div>
                      <h4 className="font-bold text-sm text-[#21163B]">{app.jobTitle}</h4>
                      <p className="text-xs text-[#5F5675]">{app.company}</p>
                    </div>

                    <div className="flex items-center gap-3">
                      <div className="text-right hidden sm:block">
                        <span className="text-[10px] text-[#5F5675] block">Skill Match</span>
                        <span className="text-xs font-bold text-[#7138E8]">
                          {app.skillMatchPercentage}%
                        </span>
                      </div>
                      <span className="px-3 py-1 rounded-full text-xs font-bold bg-purple-100 text-[#7138E8] border border-purple-200">
                        {app.stage}
                      </span>
                    </div>
                  </div>
                ))}
            </div>
          </div>
        </div>
      )}

      {/* 2. MY PROFILE */}
      {activeModule === 'profile' && (
        <div className="neu-extruded p-6 sm:p-8 rounded-3xl space-y-6">
          <div className="flex flex-wrap items-center justify-between gap-4 pb-4 border-b border-purple-200/60">
            <div className="flex items-center space-x-4">
              <div className="w-16 h-16 rounded-2xl overflow-hidden bg-purple-100 border-2 border-white shadow-md">
                <img src={student.avatar} alt={student.name} className="w-full h-full object-cover" />
              </div>
              <div>
                <h2 className="text-xl font-bold font-display text-[#21163B]">{student.name}</h2>
                <p className="text-xs text-[#5F5675]">{student.email} • {student.phone}</p>
                <span className="inline-block mt-1 text-[10px] font-bold bg-emerald-100 text-emerald-800 px-2 py-0.5 rounded-full">
                  Verified Enrollment: {student.enrollmentNo}
                </span>
              </div>
            </div>

            <div className="flex items-center gap-2">
              {student.linkedIn && (
                <a
                  href={student.linkedIn}
                  target="_blank"
                  rel="noreferrer"
                  className="btn-tactile p-2.5 rounded-xl text-purple-700 hover:text-purple-900"
                >
                  <Linkedin className="w-4 h-4" />
                </a>
              )}
              {student.github && (
                <a
                  href={student.github}
                  target="_blank"
                  rel="noreferrer"
                  className="btn-tactile p-2.5 rounded-xl text-purple-700 hover:text-purple-900"
                >
                  <Github className="w-4 h-4" />
                </a>
              )}
            </div>
          </div>

          {/* Academic Details Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            <div className="neu-inset p-3.5 rounded-xl">
              <span className="text-[11px] text-[#5F5675] block">Institution</span>
              <span className="text-xs font-bold text-[#21163B]">{student.college}</span>
            </div>
            <div className="neu-inset p-3.5 rounded-xl">
              <span className="text-[11px] text-[#5F5675] block">Branch & Course</span>
              <span className="text-xs font-bold text-[#21163B]">{student.course} - {student.branch}</span>
            </div>
            <div className="neu-inset p-3.5 rounded-xl">
              <span className="text-[11px] text-[#5F5675] block">Cumulative CGPA</span>
              <span className="text-xs font-bold text-[#7138E8]">{student.cgpa.toFixed(2)} / 10.0</span>
            </div>
            <div className="neu-inset p-3.5 rounded-xl">
              <span className="text-[11px] text-[#5F5675] block">Academic Year</span>
              <span className="text-xs font-bold text-[#21163B]">{student.academicYear} (Graduating {student.graduationYear})</span>
            </div>
            <div className="neu-inset p-3.5 rounded-xl">
              <span className="text-[11px] text-[#5F5675] block">State & City</span>
              <span className="text-xs font-bold text-[#21163B]">{student.city}, {student.state}</span>
            </div>
            <div className="neu-inset p-3.5 rounded-xl">
              <span className="text-[11px] text-[#5F5675] block">Official Resume</span>
              <span className="text-xs font-bold text-emerald-700 flex items-center gap-1">
                <FileText className="w-3.5 h-3.5" />
                {student.resumeFileName || 'Resume_v4.pdf'}
              </span>
            </div>
          </div>
        </div>
      )}

      {/* 3. DIGITAL SKILL PASSPORT */}
      {activeModule === 'passport' && (
        <div className="space-y-6">
          <div className="neu-extruded p-6 sm:p-8 rounded-3xl space-y-4">
            <div className="flex flex-wrap items-center justify-between gap-4">
              <div>
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full neu-inset text-xs font-bold text-[#7138E8]">
                  <Shield className="w-3.5 h-3.5" />
                  <span>SHA-256 Tamper-Proof Skill Ledger</span>
                </div>
                <h2 className="text-2xl font-bold font-display text-[#21163B] mt-2">
                  Digital Skill Passport
                </h2>
                <p className="text-xs text-[#5F5675]">
                  All skill proficiencies are validated via proctored benchmarks and recorded with cryptographic proof.
                </p>
              </div>

              <div className="neu-inset p-3 rounded-2xl text-center">
                <span className="text-[11px] text-[#5F5675] block">Overall Authenticity</span>
                <span className="text-sm font-extrabold text-emerald-600 font-mono">100% VERIFIED</span>
              </div>
            </div>

            {/* Skills Table / Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
              {student.verifiedSkills.map((sk, idx) => (
                <div key={idx} className="neu-extruded p-4 rounded-2xl space-y-2">
                  <div className="flex justify-between items-start">
                    <div>
                      <span className="text-[10px] font-bold text-[#7138E8] uppercase tracking-wider bg-purple-100 px-2 py-0.5 rounded-full">
                        {sk.category}
                      </span>
                      <h4 className="font-bold text-sm text-[#21163B] font-display mt-1">{sk.name}</h4>
                    </div>
                    <span className="text-xs font-extrabold text-[#7138E8] bg-white px-2 py-1 rounded-lg border border-purple-200">
                      {sk.score}/100
                    </span>
                  </div>

                  <div className="w-full bg-[#E9DFFF] h-2 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-gradient-to-r from-[#7138E8] to-[#E75ACF] rounded-full"
                      style={{ width: `${sk.score}%` }}
                    ></div>
                  </div>

                  <div className="flex items-center justify-between text-[11px] text-[#5F5675] pt-1 border-t border-purple-100">
                    <span>Proficiency: <strong className="text-[#21163B]">{sk.level}</strong></span>
                    <span className="font-mono text-[10px] text-purple-700">{sk.proofHash}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* 4. SKILL ASSESSMENT ENGINE */}
      {activeModule === 'assessment' && (
        <div className="space-y-5">
          {/* View Toggle Bar */}
          <div className="flex flex-wrap items-center justify-between gap-3 p-2 rounded-2xl neu-inset bg-white/60">
            <div className="flex items-center gap-2">
              <button
                onClick={() => setAssessmentViewMode('proctored_studio')}
                className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                  assessmentViewMode === 'proctored_studio'
                    ? 'btn-kinetic text-white shadow-xs'
                    : 'text-[#5F5675] hover:text-[#21163B]'
                }`}
              >
                Proctored IDE Diagnostic Studio (Go 1.22 Ingress)
              </button>
              <button
                onClick={() => setAssessmentViewMode('catalog')}
                className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                  assessmentViewMode === 'catalog'
                    ? 'btn-kinetic text-white shadow-xs'
                    : 'text-[#5F5675] hover:text-[#21163B]'
                }`}
              >
                Standard Catalog Quizzes & Assessments
              </button>
            </div>
            <span className="text-[11px] text-[#7138E8] font-bold px-2 py-0.5 rounded-full bg-purple-100 border border-purple-200">
              Proctor v4.2 Active
            </span>
          </div>

          {assessmentViewMode === 'proctored_studio' ? (
            <DiagnosticAssessmentStudio onBack={() => setAssessmentViewMode('catalog')} />
          ) : !activeTest ? (
            <div className="neu-extruded p-6 sm:p-8 rounded-3xl space-y-6">
              <div className="text-center max-w-2xl mx-auto space-y-2">
                <h2 className="text-2xl font-bold font-display text-[#21163B]">
                  Interactive Skill Assessment Engine
                </h2>
                <p className="text-xs sm:text-sm text-[#5F5675]">
                  Select an assessment to validate technical competency. Passing scores (≥70%) automatically update your Employability Score and append verified badges.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {assessments.map((ass) => (
                  <div key={ass.id} className="neu-extruded p-5 rounded-2xl flex flex-col justify-between">
                    <div className="space-y-3">
                      <div className="flex justify-between items-center">
                        <span className="text-[10px] font-bold text-[#7138E8] uppercase tracking-wider bg-purple-100 px-2 py-0.5 rounded-full">
                          {ass.level}
                        </span>
                        <span className="text-xs text-[#5F5675]">{ass.durationMinutes} mins</span>
                      </div>
                      <h3 className="font-bold text-base text-[#21163B] font-display">{ass.title}</h3>
                      <p className="text-xs text-[#5F5675]">{ass.category}</p>

                      <div className="space-y-1 text-[11px] text-[#21163B]">
                        <span className="font-semibold text-[#7138E8] block">Skills Covered:</span>
                        <div className="flex flex-wrap gap-1">
                          {ass.skillsCovered.map((s, i) => (
                            <span key={i} className="bg-white/80 px-2 py-0.5 rounded-md border border-purple-200">
                              {s}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>

                    <button
                      onClick={() => handleStartAssessment(ass)}
                      className="mt-6 w-full btn-kinetic py-2.5 rounded-xl text-xs font-bold flex items-center justify-center gap-1.5 cursor-pointer shadow-md"
                    >
                      <Play className="w-3.5 h-3.5" />
                      <span>Start Interactive Test</span>
                    </button>
                  </div>
                ))}
              </div>
            </div>
          ) : (
            /* Interactive Test Runner View */
            <div className="neu-extruded p-6 sm:p-8 rounded-3xl space-y-6">
              <div className="flex items-center justify-between pb-4 border-b border-purple-200/60">
                <div>
                  <span className="text-xs font-bold text-[#7138E8] uppercase">{activeTest.category}</span>
                  <h2 className="text-xl font-bold font-display text-[#21163B]">{activeTest.title}</h2>
                </div>
                <button
                  onClick={() => setActiveTest(null)}
                  className="btn-tactile px-3 py-1.5 rounded-xl text-xs font-semibold cursor-pointer"
                >
                  Exit Test
                </button>
              </div>

              {testResult ? (
                <div className="text-center p-8 neu-inset rounded-3xl space-y-4">
                  <div className={`w-16 h-16 rounded-full mx-auto flex items-center justify-center ${
                    testResult.passed ? 'bg-emerald-100 text-emerald-600' : 'bg-rose-100 text-rose-600'
                  }`}>
                    {testResult.passed ? <CheckCircle2 className="w-8 h-8" /> : <RotateCcw className="w-8 h-8" />}
                  </div>
                  <h3 className="text-2xl font-bold font-display text-[#21163B]">
                    {testResult.passed ? 'Congratulations! Test Cleared' : 'Preparation Recommended'}
                  </h3>
                  <p className="text-sm text-[#5F5675]">
                    You scored <strong className="text-[#7138E8]">{testResult.score}%</strong>.
                    {testResult.passed
                      ? ' Your new verified skill badge and updated Employability Score have been committed to your passport!'
                      : ' Review the weak domains and re-attempt in 24 hours.'}
                  </p>
                  <button
                    onClick={() => setActiveTest(null)}
                    className="btn-kinetic px-6 py-2.5 rounded-xl text-xs font-bold cursor-pointer"
                  >
                    Return to Assessments
                  </button>
                </div>
              ) : (
                <div className="space-y-6">
                  {activeTest.questions.map((q, idx) => (
                    <div key={q.id} className="neu-flat p-5 rounded-2xl space-y-3">
                      <div className="flex justify-between items-start">
                        <span className="text-xs font-bold text-[#7138E8]">Question {idx + 1} ({q.points} pts)</span>
                        <span className="text-[10px] uppercase font-bold text-[#5F5675]">{q.type}</span>
                      </div>
                      <p className="text-xs sm:text-sm font-semibold text-[#21163B] leading-relaxed">
                        {q.question}
                      </p>

                      {q.type === 'mcq' && q.options && (
                        <div className="space-y-2 pt-2">
                          {q.options.map((opt, optIdx) => (
                            <label
                              key={optIdx}
                              onClick={() => setTestAnswers({ ...testAnswers, [q.id]: optIdx })}
                              className={`flex items-center gap-3 p-3 rounded-xl text-xs cursor-pointer transition-all ${
                                testAnswers[q.id] === optIdx
                                  ? 'neu-inset text-[#7138E8] font-bold border border-purple-400'
                                  : 'neu-extruded-sm text-[#21163B] hover:bg-white'
                              }`}
                            >
                              <div
                                className={`w-4 h-4 rounded-full flex items-center justify-center border ${
                                  testAnswers[q.id] === optIdx
                                    ? 'border-[#7138E8] bg-[#7138E8]'
                                    : 'border-purple-300 bg-white'
                                }`}
                              >
                                {testAnswers[q.id] === optIdx && (
                                  <span className="w-1.5 h-1.5 bg-white rounded-full"></span>
                                )}
                              </div>
                              <span>{opt}</span>
                            </label>
                          ))}
                        </div>
                      )}

                      {q.type === 'coding' && (
                        <div className="space-y-2 pt-2">
                          <div className="flex items-center gap-1.5 text-xs text-[#5F5675]">
                            <Terminal className="w-4 h-4 text-[#7138E8]" />
                            <span>Coding Sandbox:</span>
                          </div>
                          <textarea
                            rows={6}
                            value={testCodeAnswer}
                            onChange={(e) => setTestCodeAnswer(e.target.value)}
                            className="w-full font-mono text-xs bg-[#20153A] text-purple-200 p-4 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#7138E8]"
                          ></textarea>
                        </div>
                      )}
                    </div>
                  ))}

                  <div className="flex justify-end pt-4">
                    <button
                      onClick={handleFinishAssessment}
                      className="btn-kinetic px-8 py-3 rounded-xl text-xs font-bold cursor-pointer shadow-md"
                    >
                      Submit Test for Evaluation
                    </button>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      )}

      {/* 5. EMPLOYABILITY SCORE DEEP DIVE */}
      {activeModule === 'employability' && (
        <div className="neu-extruded p-6 sm:p-8 rounded-3xl space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-7 space-y-4">
              <h2 className="text-2xl font-bold font-display text-[#21163B]">
                Employability Intelligence Analysis
              </h2>
              <p className="text-xs sm:text-sm text-[#5F5675] leading-relaxed">
                Your score of <strong>{student.employabilityScore}/100</strong> represents comprehensive campus-to-corporate readiness calculated using 5 objective weighted vectors:
              </p>

              <div className="space-y-3 pt-2">
                <div>
                  <div className="flex justify-between text-xs font-semibold mb-1">
                    <span>Technical Rigor (Proctored assessments & sandbox code)</span>
                    <span className="text-[#7138E8] font-bold">{student.scoreBreakdown.technical} / 30 pts</span>
                  </div>
                  <div className="w-full bg-[#E9DFFF] h-2.5 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-gradient-to-r from-[#7138E8] to-[#963DF5] rounded-full"
                      style={{ width: `${(student.scoreBreakdown.technical / 30) * 100}%` }}
                    ></div>
                  </div>
                </div>

                <div>
                  <div className="flex justify-between text-xs font-semibold mb-1">
                    <span>Communication & Interview Articulation</span>
                    <span className="text-[#963DF5] font-bold">{student.scoreBreakdown.communication} / 20 pts</span>
                  </div>
                  <div className="w-full bg-[#E9DFFF] h-2.5 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-gradient-to-r from-[#963DF5] to-[#E75ACF] rounded-full"
                      style={{ width: `${(student.scoreBreakdown.communication / 20) * 100}%` }}
                    ></div>
                  </div>
                </div>

                <div>
                  <div className="flex justify-between text-xs font-semibold mb-1">
                    <span>Problem Solving & Algorithms</span>
                    <span className="text-[#E75ACF] font-bold">{student.scoreBreakdown.problemSolving} / 20 pts</span>
                  </div>
                  <div className="w-full bg-[#E9DFFF] h-2.5 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-gradient-to-r from-[#7138E8] to-[#E75ACF] rounded-full"
                      style={{ width: `${(student.scoreBreakdown.problemSolving / 20) * 100}%` }}
                    ></div>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <div className="flex justify-between text-xs font-semibold mb-1">
                      <span>Domain Knowledge</span>
                      <span className="text-[#7138E8] font-bold">{student.scoreBreakdown.domainKnowledge} / 15</span>
                    </div>
                    <div className="w-full bg-[#E9DFFF] h-2 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-[#7138E8] rounded-full"
                        style={{ width: `${(student.scoreBreakdown.domainKnowledge / 15) * 100}%` }}
                      ></div>
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-between text-xs font-semibold mb-1">
                      <span>Project Evidence</span>
                      <span className="text-[#7138E8] font-bold">{student.scoreBreakdown.projectEvidence} / 15</span>
                    </div>
                    <div className="w-full bg-[#E9DFFF] h-2 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-[#7138E8] rounded-full"
                        style={{ width: `${(student.scoreBreakdown.projectEvidence / 15) * 100}%` }}
                      ></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="lg:col-span-5 flex flex-col items-center justify-center p-6 neu-inset rounded-2xl">
              <RadialEmployabilityMeter
                score={student.employabilityScore}
                size={180}
                label="Current Verified Readiness"
                subLabel="MP State Average Benchmark: 72/100"
              />
            </div>
          </div>
        </div>
      )}

      {/* 6. AI CAREER ROADMAP */}
      {activeModule === 'roadmap' && (
        <div className="neu-extruded p-6 sm:p-8 rounded-3xl space-y-6">
          <div className="text-center max-w-2xl mx-auto space-y-2">
            <h2 className="text-2xl font-bold font-display text-[#21163B]">
              AI Dynamic Career Roadmap
            </h2>
            <p className="text-xs sm:text-sm text-[#5F5675]">
              A continuous 7-stage progression pathway: Assess → Identify Gaps → Learn → Build Projects → Get Certified → Apply → Interview.
            </p>
          </div>

          <div className="space-y-4 pt-4">
            {[
              { step: 1, title: 'Assess Core Skills', desc: 'Completed React & Algorithms assessments.', status: 'Completed', color: 'bg-emerald-500' },
              { step: 2, title: 'Identify Target Gaps', desc: 'Docker & Kubernetes cluster deployment identified.', status: 'Completed', color: 'bg-emerald-500' },
              { step: 3, title: 'Targeted Learning', desc: 'Enrolled in Microservices & Cloud Native Bootcamp.', status: 'In Progress', color: 'bg-[#7138E8]' },
              { step: 4, title: 'Build Project Evidence', desc: 'Bhopal HealthPulse deployed on Cloud with live demo.', status: 'Completed', color: 'bg-emerald-500' },
              { step: 5, title: 'Obtain Cryptographic Cert', desc: 'AWS Academy Cloud Architect certified.', status: 'Completed', color: 'bg-emerald-500' },
              { step: 6, title: 'Apply to Curated Openings', desc: 'Applied to TCS Digital and AWS Campus Drives.', status: 'In Progress', color: 'bg-[#7138E8]' },
              { step: 7, title: 'Interview & Convert Offer', desc: 'Round 2 System Design scheduled for Nov 18.', status: 'Upcoming', color: 'bg-amber-500' },
            ].map((st) => (
              <div key={st.step} className="p-4 rounded-2xl neu-flat flex items-center justify-between gap-4">
                <div className="flex items-center space-x-3.5">
                  <div className={`w-9 h-9 rounded-xl flex items-center justify-center text-white font-bold text-xs ${st.color}`}>
                    {st.step}
                  </div>
                  <div>
                    <h4 className="font-bold text-sm text-[#21163B] font-display">{st.title}</h4>
                    <p className="text-xs text-[#5F5675]">{st.desc}</p>
                  </div>
                </div>
                <span className={`text-[10px] font-bold px-2.5 py-1 rounded-full ${
                  st.status === 'Completed'
                    ? 'bg-emerald-100 text-emerald-800'
                    : st.status === 'In Progress'
                    ? 'bg-purple-100 text-[#7138E8]'
                    : 'bg-amber-100 text-amber-800'
                }`}>
                  {st.status}
                </span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* 7. SKILL GAP ANALYSIS */}
      {activeModule === 'gap-analysis' && (
        <div className="neu-extruded p-6 sm:p-8 rounded-3xl space-y-6">
          <div className="flex flex-wrap items-center justify-between gap-4 pb-4 border-b border-purple-200/60">
            <div>
              <h2 className="text-xl font-bold font-display text-[#21163B]">Target Role Skill Gap Analysis</h2>
              <p className="text-xs text-[#5F5675]">Compare your verified passport against real employer prerequisites</p>
            </div>
            <select
              value={targetRole}
              onChange={(e) => setTargetRole(e.target.value)}
              className="neu-input px-3 py-2 text-xs rounded-xl"
            >
              <option value="Full Stack Cloud Engineer">Full Stack Cloud Engineer (TCS / AWS)</option>
              <option value="AI / ML Engineer">AI / ML Engineer (Indore AI Labs)</option>
              <option value="DevOps & Site Reliability Engineer">DevOps & Site Reliability Engineer</option>
            </select>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-3">
              <h4 className="text-xs font-bold text-emerald-700 uppercase tracking-wider flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4" />
                <span>Verified Match Skills (You Have)</span>
              </h4>
              <div className="space-y-2">
                {['TypeScript & React (Score: 92)', 'Data Structures & Algorithms (Score: 88)', 'PostgreSQL & Drizzle (Score: 86)', 'Node.js Microservices (Score: 84)'].map((s, i) => (
                  <div key={i} className="p-3 rounded-xl bg-emerald-50 text-emerald-900 text-xs font-medium border border-emerald-200 flex justify-between">
                    <span>{s}</span>
                    <span className="font-bold text-emerald-700">Matched</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="space-y-3">
              <h4 className="text-xs font-bold text-amber-700 uppercase tracking-wider flex items-center gap-1.5">
                <Target className="w-4 h-4" />
                <span>Identified Skill Gaps (Need Preparation)</span>
              </h4>
              <div className="space-y-2">
                {[
                  { skill: 'Docker & Kubernetes Clustering', action: 'Take Cloud Systems Assessment (+6 pts)' },
                  { skill: 'System Design: Low-Level Architecture', action: 'Practice System Design Mock Interview' },
                  { skill: 'CI/CD Pipeline with GitHub Actions', action: 'Complete Learning Mission Module' },
                ].map((g, i) => (
                  <div key={i} className="p-3 rounded-xl bg-amber-50 text-amber-900 text-xs border border-amber-200 flex flex-col justify-between gap-1">
                    <span className="font-bold">{g.skill}</span>
                    <span className="text-[11px] text-[#7138E8] font-semibold">{g.action}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* 8. JOBS AND INTERNSHIPS & 9. JOB RECOMMENDATIONS */}
      {(activeModule === 'jobs' || activeModule === 'recommendations') && (
        <div className="space-y-6">
          <div className="neu-extruded p-6 rounded-3xl space-y-4">
            <div className="flex flex-wrap items-center justify-between gap-4">
              <div>
                <h2 className="text-xl font-bold font-display text-[#21163B]">
                  {activeModule === 'recommendations' ? 'AI Recommended Openings' : 'Verified Campus Job Board'}
                </h2>
                <p className="text-xs text-[#5F5675]">
                  Explicit distinction between <strong>Skill-Match %</strong> (curriculum fit) and <strong>Hiring Probability %</strong> (past placement conversion odds).
                </p>
              </div>

              {appliedFeedback && (
                <div className="p-2.5 rounded-xl bg-emerald-100 text-emerald-800 text-xs font-bold">
                  {appliedFeedback}
                </div>
              )}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
              {jobs.map((job) => {
                const isApplied = applications.some((a) => a.jobId === job.id && a.studentId === student.id);
                // Simulated match percentage
                const skillMatch = job.id === 'job-001' ? 94 : job.id === 'job-002' ? 82 : 88;
                const hiringProb = Math.round(skillMatch * 0.9);

                return (
                  <div key={job.id} className="neu-extruded p-5 rounded-2xl flex flex-col justify-between space-y-3">
                    <div>
                      <div className="flex justify-between items-start">
                        <div>
                          <span className="text-[10px] font-bold text-[#7138E8] uppercase tracking-wider bg-purple-100 px-2 py-0.5 rounded-full">
                            {job.type}
                          </span>
                          <h3 className="font-bold text-base text-[#21163B] font-display mt-1.5">{job.title}</h3>
                          <p className="text-xs text-[#5F5675] font-semibold">{job.company} • {job.location}</p>
                        </div>
                        <span className="text-xs font-bold text-emerald-700 bg-emerald-50 px-2 py-1 rounded-md border border-emerald-200">
                          {job.salary}
                        </span>
                      </div>

                      <p className="text-xs text-[#5F5675] mt-2 line-clamp-2">{job.description}</p>

                      <div className="grid grid-cols-2 gap-2 mt-3 neu-inset p-2.5 rounded-xl text-center">
                        <div>
                          <span className="text-[10px] text-[#5F5675] block">Skill Match %</span>
                          <span className="text-xs font-bold text-[#7138E8]">{skillMatch}%</span>
                        </div>
                        <div>
                          <span className="text-[10px] text-[#5F5675] block">Hiring Probability</span>
                          <span className="text-xs font-bold text-emerald-600">{hiringProb}%</span>
                        </div>
                      </div>

                      <div className="mt-3 flex flex-wrap gap-1">
                        {job.requiredSkills.map((sk, i) => (
                          <span key={i} className="text-[10px] bg-white text-[#21163B] px-2 py-0.5 rounded-md border border-purple-200">
                            {sk}
                          </span>
                        ))}
                      </div>
                    </div>

                    <div className="pt-2 border-t border-purple-100 flex items-center justify-between">
                      <span className="text-[11px] text-[#5F5675]">Deadline: {job.deadline}</span>
                      <button
                        onClick={() => handleApply(job.id)}
                        disabled={isApplied}
                        className={`px-4 py-2 rounded-xl text-xs font-bold cursor-pointer transition-all ${
                          isApplied ? 'bg-emerald-100 text-emerald-800 border border-emerald-300' : 'btn-kinetic text-white shadow-xs'
                        }`}
                      >
                        {isApplied ? '✓ Applied' : 'Apply Now'}
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}

      {/* 10. APPLICATIONS TRACKING */}
      {activeModule === 'applications' && (
        <div className="neu-extruded p-6 sm:p-8 rounded-3xl space-y-6">
          <div className="flex justify-between items-center pb-4 border-b border-purple-200/60">
            <div>
              <h2 className="text-xl font-bold font-display text-[#21163B]">My Placement Applications</h2>
              <p className="text-xs text-[#5F5675]">Transparent multi-stage recruitment funnel</p>
            </div>
          </div>

          <div className="space-y-4">
            {applications
              .filter((a) => a.studentId === student.id)
              .map((app) => (
                <div key={app.id} className="p-5 rounded-2xl neu-flat space-y-3">
                  <div className="flex flex-wrap justify-between items-start gap-2">
                    <div>
                      <h3 className="font-bold text-base text-[#21163B] font-display">{app.jobTitle}</h3>
                      <p className="text-xs text-[#5F5675] font-semibold">{app.company} • Applied on {new Date(app.appliedDate).toLocaleDateString()}</p>
                    </div>
                    <span className="px-3 py-1 rounded-full text-xs font-bold bg-[#7138E8] text-white shadow-xs">
                      {app.stage}
                    </span>
                  </div>

                  {app.interviewDate && (
                    <div className="p-3 rounded-xl bg-purple-50 text-purple-900 text-xs border border-purple-200 flex items-center gap-2">
                      <Calendar className="w-4 h-4 text-[#7138E8]" />
                      <span>
                        Interview Scheduled: <strong>{new Date(app.interviewDate).toLocaleString()}</strong>
                      </span>
                    </div>
                  )}

                  {app.recruiterNotes && (
                    <p className="text-xs text-[#5F5675] italic">
                      Recruiter Note: &quot;{app.recruiterNotes}&quot;
                    </p>
                  )}
                </div>
              ))}
          </div>
        </div>
      )}

      {/* 11. AI MOCK INTERVIEW STUDIO */}
      {activeModule === 'mock-interview' && (
        <MockInterviewStudio onBack={() => setActiveModule('overview')} />
      )}

      {/* 12. CERTIFICATES */}
      {activeModule === 'certificates' && (
        <div className="neu-extruded p-6 sm:p-8 rounded-3xl space-y-6">
          <div className="flex justify-between items-center pb-4 border-b border-purple-200/60">
            <div>
              <h2 className="text-xl font-bold font-display text-[#21163B]">Verified Certificates</h2>
              <p className="text-xs text-[#5F5675]">Official micro-credentials and state certifications</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {student.certificates.map((cert) => (
              <div key={cert.id} className="neu-extruded p-5 rounded-2xl space-y-3">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="font-bold text-sm text-[#21163B] font-display">{cert.title}</h3>
                    <p className="text-xs text-[#5F5675]">{cert.issuer} • Issued {cert.issueDate}</p>
                  </div>
                  <Award className="w-5 h-5 text-[#7138E8]" />
                </div>
                <div className="neu-inset p-2.5 rounded-xl text-[11px] font-mono text-purple-800 flex justify-between">
                  <span>ID: {cert.credentialId}</span>
                  <span>Proof: {cert.proofHash}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* 13. PROJECTS AND PORTFOLIO */}
      {activeModule === 'projects' && (
        <div className="neu-extruded p-6 sm:p-8 rounded-3xl space-y-6">
          <div className="flex justify-between items-center pb-4 border-b border-purple-200/60">
            <div>
              <h2 className="text-xl font-bold font-display text-[#21163B]">Projects & Portfolio</h2>
              <p className="text-xs text-[#5F5675]">Authenticated project repositories and deployments</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {student.projects.map((proj) => (
              <div key={proj.id} className="neu-extruded p-5 rounded-2xl space-y-3 flex flex-col justify-between">
                <div>
                  <div className="flex justify-between items-start">
                    <h3 className="font-bold text-sm text-[#21163B] font-display">{proj.title}</h3>
                    {proj.verified && (
                      <span className="text-[10px] font-bold text-emerald-700 bg-emerald-100 px-2 py-0.5 rounded-full">
                        Code Verified
                      </span>
                    )}
                  </div>
                  <p className="text-xs text-[#5F5675] mt-1">{proj.description}</p>
                  <div className="flex flex-wrap gap-1 mt-3">
                    {proj.technologies.map((t, idx) => (
                      <span key={idx} className="text-[10px] bg-white px-2 py-0.5 rounded-md border border-purple-200">
                        {t}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="flex items-center gap-2 pt-3 border-t border-purple-100">
                  {proj.githubUrl && (
                    <a
                      href={proj.githubUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="btn-tactile px-3 py-1.5 rounded-xl text-xs font-semibold flex items-center gap-1.5 text-purple-700"
                    >
                      <Github className="w-3.5 h-3.5" />
                      <span>GitHub</span>
                    </a>
                  )}
                  {proj.liveUrl && (
                    <a
                      href={proj.liveUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="btn-tactile px-3 py-1.5 rounded-xl text-xs font-semibold flex items-center gap-1.5 text-purple-700"
                    >
                      <ExternalLink className="w-3.5 h-3.5" />
                      <span>Live Demo</span>
                    </a>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* 14. LEARNING MISSIONS */}
      {activeModule === 'learning-missions' && (
        <div className="neu-extruded p-6 sm:p-8 rounded-3xl space-y-6">
          <h2 className="text-xl font-bold font-display text-[#21163B]">Learning Missions & XP Quests</h2>
          <p className="text-xs text-[#5F5675]">Complete curated micro-missions to earn employability multipliers.</p>

          <div className="space-y-3">
            {[
              { title: 'Dockerizing Next.js & Deploying to AWS ECS', xp: '+250 XP', time: '45 mins', status: 'Available' },
              { title: 'Solving Advanced Graph Algorithms in Python', xp: '+300 XP', time: '60 mins', status: 'Available' },
              { title: 'Designing Event-Driven Microservices with Kafka', xp: '+400 XP', time: '90 mins', status: 'Available' },
            ].map((m, i) => (
              <div key={i} className="p-4 rounded-xl neu-flat flex items-center justify-between">
                <div>
                  <h4 className="font-bold text-sm text-[#21163B]">{m.title}</h4>
                  <p className="text-xs text-[#5F5675]">{m.time} • Reward: {m.xp}</p>
                </div>
                <button className="btn-kinetic px-4 py-2 rounded-xl text-xs font-bold cursor-pointer">
                  Start Mission
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* 15. EVENTS AND HACKATHONS */}
      {activeModule === 'events' && (
        <div className="neu-extruded p-6 sm:p-8 rounded-3xl space-y-6">
          <h2 className="text-xl font-bold font-display text-[#21163B]">State Events & Hackathons</h2>
          <p className="text-xs text-[#5F5675]">Upcoming MP university pooled hackathons and pre-placement workshops.</p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="neu-extruded p-5 rounded-2xl space-y-2">
              <span className="text-[10px] font-bold text-[#7138E8] uppercase bg-purple-100 px-2 py-0.5 rounded-full">
                Dec 12 - 14, 2026
              </span>
              <h3 className="font-bold text-base text-[#21163B] font-display">Bhopal Smart City Hackathon</h3>
              <p className="text-xs text-[#5F5675]">Build AI solutions for smart mobility, water conservation, and clean energy.</p>
              <button className="mt-2 btn-kinetic px-4 py-2 rounded-xl text-xs font-bold cursor-pointer">
                Register Team
              </button>
            </div>
            <div className="neu-extruded p-5 rounded-2xl space-y-2">
              <span className="text-[10px] font-bold text-[#7138E8] uppercase bg-purple-100 px-2 py-0.5 rounded-full">
                Jan 05, 2027
              </span>
              <h3 className="font-bold text-base text-[#21163B] font-display">MP AI Placement Conclave 2027</h3>
              <p className="text-xs text-[#5F5675]">Keynote sessions by CTOs of TCS, Infosys, and Indore AI startups.</p>
              <button className="mt-2 btn-kinetic px-4 py-2 rounded-xl text-xs font-bold cursor-pointer">
                Reserve Seat
              </button>
            </div>
          </div>
        </div>
      )}

      {/* 16. ACCESSIBILITY SUPPORT */}
      {activeModule === 'accessibility' && (
        <div className="neu-extruded p-6 sm:p-8 rounded-3xl space-y-6">
          <h2 className="text-xl font-bold font-display text-[#21163B]">Accessibility Support</h2>
          <p className="text-xs text-[#5F5675]">Customize visual and cognitive ergonomics according to WCAG 2.1 AAA guidelines.</p>

          <div className="space-y-4 max-w-md">
            <div className="neu-flat p-4 rounded-2xl flex items-center justify-between">
              <div>
                <span className="font-bold text-xs text-[#21163B]">High Contrast Mode</span>
                <p className="text-[11px] text-[#5F5675]">Sharpens contrast for low-light legibility</p>
              </div>
              <button
                onClick={() => setAccessibility((prev) => ({ ...prev, highContrast: !prev.highContrast }))}
                className={`w-12 h-6 rounded-full transition-colors relative cursor-pointer ${
                  accessibility.highContrast ? 'bg-[#7138E8]' : 'bg-gray-300'
                }`}
              >
                <span
                  className={`absolute top-0.5 left-0.5 w-5 h-5 rounded-full bg-white transition-transform ${
                    accessibility.highContrast ? 'translate-x-6' : ''
                  }`}
                ></span>
              </button>
            </div>

            <div className="neu-flat p-4 rounded-2xl flex items-center justify-between">
              <div>
                <span className="font-bold text-xs text-[#21163B]">Dyslexia-Friendly Font</span>
                <p className="text-[11px] text-[#5F5675]">Monospaced high-distinction glyph spacing</p>
              </div>
              <button
                onClick={() => setAccessibility((prev) => ({ ...prev, dyslexiaFont: !prev.dyslexiaFont }))}
                className={`w-12 h-6 rounded-full transition-colors relative cursor-pointer ${
                  accessibility.dyslexiaFont ? 'bg-[#7138E8]' : 'bg-gray-300'
                }`}
              >
                <span
                  className={`absolute top-0.5 left-0.5 w-5 h-5 rounded-full bg-white transition-transform ${
                    accessibility.dyslexiaFont ? 'translate-x-6' : ''
                  }`}
                ></span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* 17. NOTIFICATIONS */}
      {activeModule === 'notifications' && (
        <div className="neu-extruded p-6 sm:p-8 rounded-3xl space-y-4">
          <h2 className="text-xl font-bold font-display text-[#21163B]">Student Notifications</h2>
          <div className="space-y-2">
            <div className="p-4 rounded-xl neu-flat text-xs">
              <span className="font-bold text-[#7138E8]">Interview Call: TCS Digital</span>
              <p className="text-[#5F5675] mt-1">Your Round 2 System Design interview is confirmed for Nov 18, 2026.</p>
            </div>
            <div className="p-4 rounded-xl neu-flat text-xs">
              <span className="font-bold text-[#7138E8]">Assessment Verified</span>
              <p className="text-[#5F5675] mt-1">TypeScript & React certification completed with 92% score.</p>
            </div>
          </div>
        </div>
      )}

      {/* 18. SETTINGS */}
      {activeModule === 'settings' && (
        <div className="neu-extruded p-6 sm:p-8 rounded-3xl space-y-6">
          <h2 className="text-xl font-bold font-display text-[#21163B]">Account & Privacy Settings</h2>
          <div className="space-y-3 max-w-lg text-xs">
            <div className="neu-flat p-4 rounded-2xl flex items-center justify-between">
              <div>
                <span className="font-bold text-[#21163B]">Consent-Based Recruiter Visibility</span>
                <p className="text-[#5F5675]">Permit verified recruiters to view your skill passport and test code</p>
              </div>
              <span className="font-bold text-emerald-700 bg-emerald-100 px-2 py-1 rounded-md">Enabled</span>
            </div>
            <div className="neu-flat p-4 rounded-2xl flex items-center justify-between">
              <div>
                <span className="font-bold text-[#21163B]">TPO Academic Sync</span>
                <p className="text-[#5F5675]">Sync semester marks with RGPV university ledger</p>
              </div>
              <span className="font-bold text-purple-700 bg-purple-100 px-2 py-1 rounded-md">Active</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
