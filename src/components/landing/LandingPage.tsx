import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { RadialEmployabilityMeter } from '../common/RadialEmployabilityMeter';
import {
  GraduationCap,
  Building2,
  Briefcase,
  ShieldCheck,
  Sparkles,
  ArrowRight,
  CheckCircle2,
  Lock,
  Layers,
  MapPin,
  Compass,
  FileCheck2,
  Award,
  Users,
  Cpu,
  ChevronRight,
  TrendingUp,
} from 'lucide-react';
import { UserRole } from '../../types';

export const LandingPage: React.FC = () => {
  const { navigateTo, quickLoginAs, colleges } = useApp();

  // Interactive Employability calculator demo for the landing page
  const [techSkill, setTechSkill] = useState(28); // /30
  const [commSkill, setCommSkill] = useState(18); // /20
  const [probSolving, setProbSolving] = useState(18); // /20
  const [domainKnowledge, setDomainKnowledge] = useState(13); // /15
  const [projectEvidence, setProjectEvidence] = useState(12); // /15

  const calculatedScore = techSkill + commSkill + probSolving + domainKnowledge + projectEvidence;

  return (
    <div className="space-y-16 pb-20">
      {/* Hero Section */}
      <section className="relative pt-10 sm:pt-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full neu-inset text-xs font-bold text-[#7138E8]">
            <Sparkles className="w-4 h-4 text-[#E75ACF]" />
            <span>Madhya Pradesh Unified Placement Ecosystem</span>
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
          </div>

          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold font-display text-[#21163B] tracking-tight leading-tight">
            Bridging Skills. <br className="hidden sm:inline" />
            <span className="bg-gradient-to-r from-[#7138E8] via-[#963DF5] to-[#E75ACF] bg-clip-text text-transparent">
              Empowering Careers.
            </span>
          </h1>

          <p className="text-base sm:text-lg text-[#5F5675] max-w-2xl mx-auto leading-relaxed">
            The next-generation tactile AI placement ecosystem connecting students, Training & Placement
            Officers, and recruiters with verified skill passports and cryptographic employability proof.
          </p>

          {/* Call to action buttons */}
          <div className="flex flex-wrap items-center justify-center gap-3 pt-3">
            <button
              onClick={() => navigateTo('register')}
              className="btn-kinetic px-6 py-3.5 rounded-2xl text-sm font-bold flex items-center gap-2 cursor-pointer shadow-lg"
            >
              <Sparkles className="w-4 h-4" />
              Get Started with SkillBridge
              <ArrowRight className="w-4 h-4" />
            </button>
            <button
              onClick={() => navigateTo('login')}
              className="btn-tactile px-6 py-3.5 rounded-2xl text-sm font-bold cursor-pointer"
            >
              Sign In to Your Role
            </button>
          </div>

          {/* Quick Ecosystem Tester shortcut note */}
          <p className="text-xs text-[#5F5675] pt-1">
            Looking to evaluate quickly? Use the top <span className="font-bold text-[#7138E8]">Ecosystem Tester toolbar</span> to preview any role instantly.
          </p>
        </div>

        {/* Live Metrics Row (Tactile extruded cards) */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-12">
          <div className="neu-extruded p-5 rounded-2xl text-center">
            <div className="text-2xl sm:text-3xl font-extrabold font-display text-[#7138E8]">8,400+</div>
            <div className="text-xs font-semibold text-[#5F5675] mt-1">Verified Students</div>
            <div className="text-[10px] text-emerald-600 font-bold mt-0.5">RGPV, SGSITS & MANIT</div>
          </div>
          <div className="neu-extruded p-5 rounded-2xl text-center">
            <div className="text-2xl sm:text-3xl font-extrabold font-display text-[#963DF5]">142+</div>
            <div className="text-xs font-semibold text-[#5F5675] mt-1">Recruiting Partners</div>
            <div className="text-[10px] text-purple-600 font-bold mt-0.5">TCS, Amazon, Persistent</div>
          </div>
          <div className="neu-extruded p-5 rounded-2xl text-center">
            <div className="text-2xl sm:text-3xl font-extrabold font-display text-[#E75ACF]">84.6%</div>
            <div className="text-xs font-semibold text-[#5F5675] mt-1">Average Placement Rate</div>
            <div className="text-[10px] text-emerald-600 font-bold mt-0.5">Across MP Technical Hubs</div>
          </div>
          <div className="neu-extruded p-5 rounded-2xl text-center">
            <div className="text-2xl sm:text-3xl font-extrabold font-display text-[#21163B]">₹8.4 LPA</div>
            <div className="text-xs font-semibold text-[#5F5675] mt-1">Average CTC Package</div>
            <div className="text-[10px] text-indigo-600 font-bold mt-0.5">Highest: ₹32.0 LPA (AWS)</div>
          </div>
        </div>
      </section>

      {/* 4 Roles Ecosystem Architecture */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-10">
          <h2 className="text-2xl sm:text-3xl font-bold font-display text-[#21163B]">
            One Platform. Four Roles. One Verified Ecosystem.
          </h2>
          <p className="text-xs sm:text-sm text-[#5F5675] mt-2">
            Each role operates within a strictly authorized, cryptographic workflow governed by central TPO and Administration approval.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {/* Student Card */}
          <div className="neu-extruded p-6 rounded-2xl flex flex-col justify-between transition-transform hover:-translate-y-1">
            <div>
              <div className="w-12 h-12 rounded-xl bg-purple-100 flex items-center justify-center text-[#7138E8] mb-4 border border-purple-200">
                <GraduationCap className="w-6 h-6" />
              </div>
              <h3 className="font-bold font-display text-lg text-[#21163B]">Students</h3>
              <p className="text-xs text-[#5F5675] mt-2 leading-relaxed">
                Build a tamper-proof Digital Skill Passport, take AI skill assessments, track employability readiness /100, and receive AI-matched campus job opportunities.
              </p>
              <div className="mt-4 space-y-1 text-[11px] text-[#21163B] font-medium">
                <div className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                  <span>Verified Skill Credentials</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                  <span>AI Mock Interview Engine</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                  <span>Direct Campus Applications</span>
                </div>
              </div>
            </div>
            <button
              onClick={() => quickLoginAs('student', 'approved')}
              className="mt-6 w-full btn-tactile py-2.5 rounded-xl text-xs font-bold flex items-center justify-center gap-1.5 cursor-pointer"
            >
              <span>Explore Student Portal</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* TPO Card */}
          <div className="neu-extruded p-6 rounded-2xl flex flex-col justify-between transition-transform hover:-translate-y-1">
            <div>
              <div className="w-12 h-12 rounded-xl bg-indigo-100 flex items-center justify-center text-indigo-600 mb-4 border border-indigo-200">
                <Building2 className="w-6 h-6" />
              </div>
              <h3 className="font-bold font-display text-lg text-[#21163B]">TPO Cell</h3>
              <p className="text-xs text-[#5F5675] mt-2 leading-relaxed">
                Centralized Student & Recruiter Approval Center, branch-wise employability analytics, schedule campus recruitment drives, and connect with MP college network.
              </p>
              <div className="mt-4 space-y-1 text-[11px] text-[#21163B] font-medium">
                <div className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                  <span>Central Approval Center</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                  <span>MP College Network Map</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                  <span>NIRF & NAAC Placement Reports</span>
                </div>
              </div>
            </div>
            <button
              onClick={() => quickLoginAs('tpo')}
              className="mt-6 w-full btn-tactile py-2.5 rounded-xl text-xs font-bold flex items-center justify-center gap-1.5 cursor-pointer"
            >
              <span>Explore TPO Portal</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Recruiter Card */}
          <div className="neu-extruded p-6 rounded-2xl flex flex-col justify-between transition-transform hover:-translate-y-1">
            <div>
              <div className="w-12 h-12 rounded-xl bg-violet-100 flex items-center justify-center text-violet-600 mb-4 border border-violet-200">
                <Briefcase className="w-6 h-6" />
              </div>
              <h3 className="font-bold font-display text-lg text-[#21163B]">Recruiters</h3>
              <p className="text-xs text-[#5F5675] mt-2 leading-relaxed">
                Zero resume inflation. Discover pre-verified candidates with authenticated code evidence, filter by CGPA and skill test scores, and manage hiring pipelines.
              </p>
              <div className="mt-4 space-y-1 text-[11px] text-[#21163B] font-medium">
                <div className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                  <span>AI Talent Matching Engine</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                  <span>Skill-Based Candidate Search</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                  <span>End-to-End Interview Funnel</span>
                </div>
              </div>
            </div>
            <button
              onClick={() => quickLoginAs('recruiter', 'approved')}
              className="mt-6 w-full btn-tactile py-2.5 rounded-xl text-xs font-bold flex items-center justify-center gap-1.5 cursor-pointer"
            >
              <span>Explore Recruiter Portal</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Admin Card */}
          <div className="neu-extruded p-6 rounded-2xl flex flex-col justify-between transition-transform hover:-translate-y-1">
            <div>
              <div className="w-12 h-12 rounded-xl bg-emerald-100 flex items-center justify-center text-emerald-600 mb-4 border border-emerald-200">
                <ShieldCheck className="w-6 h-6" />
              </div>
              <h3 className="font-bold font-display text-lg text-[#21163B]">Administration</h3>
              <p className="text-xs text-[#5F5675] mt-2 leading-relaxed">
                Directorate of Technical Education oversight. Authorize college TPOs, monitor institution compliance, inspect tamper-proof audit logs, and configure AI scoring models.
              </p>
              <div className="mt-4 space-y-1 text-[11px] text-[#21163B] font-medium">
                <div className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                  <span>TPO & Institution Verification</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                  <span>State-wide Placement Heatmaps</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                  <span>Security & Audit Log Monitoring</span>
                </div>
              </div>
            </div>
            <button
              onClick={() => quickLoginAs('admin')}
              className="mt-6 w-full btn-tactile py-2.5 rounded-xl text-xs font-bold flex items-center justify-center gap-1.5 cursor-pointer"
            >
              <span>Explore Admin Portal</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </section>

      {/* Interactive Employability Score Simulator Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="neu-extruded p-8 sm:p-10 rounded-3xl">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-7 space-y-4">
              <div className="inline-flex items-center gap-1.5 text-xs font-bold text-[#7138E8] bg-purple-100 px-3 py-1 rounded-full">
                <Award className="w-3.5 h-3.5" />
                <span>Tactile Employability Intelligence</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-bold font-display text-[#21163B]">
                How SkillBridge Calculates Employability /100
              </h2>
              <p className="text-xs sm:text-sm text-[#5F5675] leading-relaxed">
                Rather than relying on self-reported resumes, our multi-dimensional model computes readiness across 5 verified criteria calibrated against industry benchmarks in Madhya Pradesh:
              </p>

              {/* Interactive Sliders */}
              <div className="space-y-3 pt-2">
                <div>
                  <div className="flex justify-between text-xs font-semibold text-[#21163B] mb-1">
                    <span>Technical Proficiency (MCQs + Coding Sandbox)</span>
                    <span className="text-[#7138E8] font-bold">{techSkill} / 30 pts</span>
                  </div>
                  <input
                    type="range"
                    min="10"
                    max="30"
                    value={techSkill}
                    onChange={(e) => setTechSkill(Number(e.target.value))}
                    className="w-full accent-[#7138E8] cursor-pointer"
                  />
                </div>

                <div>
                  <div className="flex justify-between text-xs font-semibold text-[#21163B] mb-1">
                    <span>Communication & Articulation (AI Mock Interviews)</span>
                    <span className="text-[#963DF5] font-bold">{commSkill} / 20 pts</span>
                  </div>
                  <input
                    type="range"
                    min="8"
                    max="20"
                    value={commSkill}
                    onChange={(e) => setCommSkill(Number(e.target.value))}
                    className="w-full accent-[#963DF5] cursor-pointer"
                  />
                </div>

                <div>
                  <div className="flex justify-between text-xs font-semibold text-[#21163B] mb-1">
                    <span>Problem Solving & Algorithmic Rigor</span>
                    <span className="text-[#E75ACF] font-bold">{probSolving} / 20 pts</span>
                  </div>
                  <input
                    type="range"
                    min="8"
                    max="20"
                    value={probSolving}
                    onChange={(e) => setProbSolving(Number(e.target.value))}
                    className="w-full accent-[#E75ACF] cursor-pointer"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <div className="flex justify-between text-xs font-semibold text-[#21163B] mb-1">
                      <span>Domain Knowledge</span>
                      <span className="text-[#7138E8] font-bold">{domainKnowledge} / 15</span>
                    </div>
                    <input
                      type="range"
                      min="5"
                      max="15"
                      value={domainKnowledge}
                      onChange={(e) => setDomainKnowledge(Number(e.target.value))}
                      className="w-full accent-[#7138E8] cursor-pointer"
                    />
                  </div>
                  <div>
                    <div className="flex justify-between text-xs font-semibold text-[#21163B] mb-1">
                      <span>Project Evidence</span>
                      <span className="text-[#7138E8] font-bold">{projectEvidence} / 15</span>
                    </div>
                    <input
                      type="range"
                      min="5"
                      max="15"
                      value={projectEvidence}
                      onChange={(e) => setProjectEvidence(Number(e.target.value))}
                      className="w-full accent-[#7138E8] cursor-pointer"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Live Radial Meter Display */}
            <div className="lg:col-span-5 flex flex-col items-center justify-center p-6 neu-inset rounded-2xl">
              <RadialEmployabilityMeter
                score={calculatedScore}
                size={180}
                label="Simulated Employability Readiness"
                subLabel="Adjust sliders to witness dynamic readiness grading"
              />
              <div className="mt-4 text-center">
                <span className="text-xs font-bold text-[#7138E8] bg-white/90 px-3 py-1 rounded-full border border-purple-200">
                  {calculatedScore >= 85
                    ? 'Tier-1 High Hiring Probability (88%+)'
                    : calculatedScore >= 70
                    ? 'Target Campus Ready (75% conversion)'
                    : 'Needs Assessment Preparation'}
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Madhya Pradesh Technical Education Network Teaser */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-8">
          <div className="inline-flex items-center gap-1.5 text-xs font-bold text-[#7138E8] bg-purple-100 px-3 py-1 rounded-full">
            <MapPin className="w-3.5 h-3.5 text-[#E75ACF]" />
            <span>Regional Academic Corridor</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold font-display text-[#21163B] mt-2">
            Participating Madhya Pradesh Institutions
          </h2>
          <p className="text-xs sm:text-sm text-[#5F5675] mt-1">
            Seamlessly coordinating pooled placement drives and verified talent discovery across all 52 districts.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {colleges.slice(0, 4).map((college) => (
            <div key={college.id} className="neu-extruded p-4 rounded-xl flex flex-col justify-between">
              <div>
                <span className="text-[10px] font-bold text-[#7138E8] uppercase tracking-wider bg-purple-100 px-2 py-0.5 rounded-full">
                  {college.district} District
                </span>
                <h4 className="font-bold text-sm text-[#21163B] font-display mt-2 line-clamp-2">
                  {college.name}
                </h4>
                <p className="text-xs text-[#5F5675] mt-1">
                  {college.studentCount.toLocaleString()} Students Enrolled
                </p>
              </div>
              <div className="mt-4 pt-3 border-t border-purple-200/50 flex items-center justify-between text-xs">
                <span className="text-[#5F5675]">Placement Rate</span>
                <span className="font-bold text-emerald-600">{college.placementRate}%</span>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};
