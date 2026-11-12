import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import {
  Sparkles,
  ShieldCheck,
  Award,
  Layers,
  MapPin,
  GraduationCap,
  Building2,
  Briefcase,
  CheckCircle2,
  Lock,
  ArrowRight,
  Mail,
} from 'lucide-react';

export const FeaturesPage: React.FC = () => {
  const { navigateTo } = useApp();

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-12">
      <div className="text-center max-w-3xl mx-auto space-y-3">
        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full neu-inset text-xs font-bold text-[#7138E8]">
          <Sparkles className="w-3.5 h-3.5 text-[#E75ACF]" />
          Tactile Architecture & Verification
        </span>
        <h1 className="text-3xl sm:text-4xl font-extrabold font-display text-[#21163B]">
          Ecosystem Features & Capabilities
        </h1>
        <p className="text-xs sm:text-sm text-[#5F5675] leading-relaxed">
          Engineered to eradicate resume inflation, streamline institutional approvals, and give recruiters mathematically validated candidate readiness scores.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="neu-extruded p-6 rounded-2xl space-y-3">
          <div className="w-12 h-12 rounded-xl bg-purple-100 flex items-center justify-center text-[#7138E8]">
            <Award className="w-6 h-6" />
          </div>
          <h3 className="font-bold text-lg text-[#21163B] font-display">
            Multi-Vector Employability Meter
          </h3>
          <p className="text-xs text-[#5F5675] leading-relaxed">
            Evaluates technical skills, problem solving, articulation, domain knowledge, and project proof to produce a trustworthy readiness score /100.
          </p>
        </div>

        <div className="neu-extruded p-6 rounded-2xl space-y-3">
          <div className="w-12 h-12 rounded-xl bg-indigo-100 flex items-center justify-center text-indigo-600">
            <ShieldCheck className="w-6 h-6" />
          </div>
          <h3 className="font-bold text-lg text-[#21163B] font-display">
            Centralized Governance Matrix
          </h3>
          <p className="text-xs text-[#5F5675] leading-relaxed">
            Three-tier cryptographic authorization: Students require TPO approval, Recruiters require campus vetting, and TPOs require State DTE certification.
          </p>
        </div>

        <div className="neu-extruded p-6 rounded-2xl space-y-3">
          <div className="w-12 h-12 rounded-xl bg-violet-100 flex items-center justify-center text-violet-600">
            <MapPin className="w-6 h-6" />
          </div>
          <h3 className="font-bold text-lg text-[#21163B] font-display">
            Madhya Pradesh College Grid
          </h3>
          <p className="text-xs text-[#5F5675] leading-relaxed">
            Coordinates pooled recruitment drives across Bhopal, Indore, Jabalpur, and Gwalior, opening tier-1 opportunities to regional talent.
          </p>
        </div>
      </div>
    </div>
  );
};

export const PlatformModulesPage: React.FC = () => {
  const { navigateTo, quickLoginAs } = useApp();

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-12">
      <div className="text-center max-w-3xl mx-auto space-y-3">
        <h1 className="text-3xl sm:text-4xl font-extrabold font-display text-[#21163B]">
          Complete Platform Modules Breakdown
        </h1>
        <p className="text-xs sm:text-sm text-[#5F5675]">
          A tightly connected suite of 63 specialized modules distributed across the 4 authorized roles.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="neu-extruded p-6 rounded-2xl space-y-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-purple-100 flex items-center justify-center text-[#7138E8]">
              <GraduationCap className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-bold text-base font-display text-[#21163B]">Student Suite (18 Modules)</h3>
              <p className="text-xs text-[#5F5675]">Empowering career trajectory and skill verification</p>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-2 text-xs">
            {[
              'Dashboard Overview',
              'My Profile',
              'Digital Skill Passport',
              'Skill Assessment Engine',
              'Employability Score',
              'AI Career Roadmap',
              'Skill Gap Analysis',
              'Jobs & Internships',
              'Job Recommendations',
              'Applications Tracking',
              'AI Mock Interviews',
              'Certificates',
              'Projects & Portfolio',
              'Learning Missions',
              'Events & Hackathons',
              'Accessibility Support',
              'Notifications',
              'Settings',
            ].map((m, idx) => (
              <div key={idx} className="p-2 rounded-lg neu-inset text-[#21163B] font-medium flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                <span className="truncate">{m}</span>
              </div>
            ))}
          </div>
          <button
            onClick={() => quickLoginAs('student', 'approved')}
            className="w-full btn-kinetic py-2.5 rounded-xl text-xs font-bold cursor-pointer"
          >
            Launch Student Portal
          </button>
        </div>

        <div className="neu-extruded p-6 rounded-2xl space-y-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-indigo-100 flex items-center justify-center text-indigo-600">
              <Building2 className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-bold text-base font-display text-[#21163B]">TPO Officer Suite (16 Modules)</h3>
              <p className="text-xs text-[#5F5675]">Institutional governance & placement intelligence</p>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-2 text-xs">
            {[
              'Dashboard Overview',
              'Student Approval Center',
              'Student Management',
              'Recruiter Management',
              'Institution Profile',
              'MP College Network',
              'Skill Analytics',
              'Employability Analytics',
              'Placement Management',
              'Job Management',
              'Campus Drives',
              'Assessment Management',
              'Reports',
              'Events & Workshops',
              'Notifications',
              'Settings',
            ].map((m, idx) => (
              <div key={idx} className="p-2 rounded-lg neu-inset text-[#21163B] font-medium flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-indigo-600 shrink-0" />
                <span className="truncate">{m}</span>
              </div>
            ))}
          </div>
          <button
            onClick={() => quickLoginAs('tpo')}
            className="w-full btn-kinetic py-2.5 rounded-xl text-xs font-bold cursor-pointer"
          >
            Launch TPO Portal
          </button>
        </div>
      </div>
    </div>
  );
};

export const AboutPage: React.FC = () => {
  return (
    <div className="max-w-4xl mx-auto px-4 py-12 space-y-8">
      <div className="neu-extruded p-8 sm:p-10 rounded-3xl space-y-4">
        <span className="text-xs font-bold text-[#7138E8] uppercase tracking-wider bg-purple-100 px-3 py-1 rounded-full">
          Madhya Pradesh Technical Education Mission
        </span>
        <h1 className="text-3xl sm:text-4xl font-extrabold font-display text-[#21163B]">
          About SkillBridge AI
        </h1>
        <p className="text-xs sm:text-sm text-[#5F5675] leading-relaxed">
          SkillBridge AI was conceived as a unified, state-wide technological bridge between universities,
          placement officers, and corporate recruiters in Madhya Pradesh. By shifting from unverified paper resumes
          to proctored, cryptographically backed digital passports, SkillBridge AI ensures that merit, technical
          skill, and communication readiness are objectively rewarded.
        </p>

        <div className="pt-4 grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs font-semibold">
          <div className="neu-inset p-4 rounded-2xl">
            <h4 className="font-bold text-sm text-[#21163B] font-display mb-1">Directorate Alignment</h4>
            <p className="text-[#5F5675]">
              Directly complies with MP Higher & Technical Education digital placement standards.
            </p>
          </div>
          <div className="neu-inset p-4 rounded-2xl">
            <h4 className="font-bold text-sm text-[#21163B] font-display mb-1">Tactile Human-AI Interface</h4>
            <p className="text-[#5F5675]">
              Built with tactile neumorphism and Bridgie AI assistance to deliver an ergonomic, accessible experience.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export const ForgotPasswordPage: React.FC = () => {
  const { navigateTo } = useApp();
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);

  return (
    <div className="max-w-md mx-auto my-12 px-4">
      <div className="neu-extruded p-8 rounded-3xl text-center space-y-6">
        <div className="w-14 h-14 rounded-2xl mx-auto flex items-center justify-center bg-purple-100 text-[#7138E8]">
          <Lock className="w-7 h-7" />
        </div>
        <div>
          <h2 className="text-2xl font-bold font-display text-[#21163B]">Reset Your Password</h2>
          <p className="text-xs text-[#5F5675] mt-1">
            Enter your registered institutional or corporate email address
          </p>
        </div>

        {submitted ? (
          <div className="p-4 rounded-2xl bg-emerald-100 text-emerald-800 text-xs space-y-2">
            <p className="font-bold">Password Reset Link Dispatched!</p>
            <p className="text-[11px]">Check your inbox for a secure token to reset your credentials.</p>
            <button
              onClick={() => navigateTo('login')}
              className="mt-2 btn-kinetic px-4 py-1.5 rounded-xl text-xs font-bold cursor-pointer"
            >
              Return to Login
            </button>
          </div>
        ) : (
          <form
            onSubmit={(e) => {
              e.preventDefault();
              setSubmitted(true);
            }}
            className="space-y-4"
          >
            <div className="relative">
              <Mail className="w-4 h-4 text-[#5F5675] absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="name@college.ac.in"
                className="neu-input w-full pl-10 pr-3 py-2.5 text-xs rounded-xl"
              />
            </div>
            <button
              type="submit"
              className="w-full btn-kinetic py-2.5 rounded-xl text-xs font-bold cursor-pointer shadow-md"
            >
              Send Password Reset Instructions
            </button>
          </form>
        )}
      </div>
    </div>
  );
};
