import React, { useState } from 'react';
import {
  PieChart,
  BarChart3,
  TrendingUp,
  Award,
  AlertTriangle,
  Zap,
  Download,
  Filter,
  Search,
  CheckCircle2,
  ChevronRight,
  ExternalLink,
  Users,
  Activity,
  Layers,
  Sparkles,
  ArrowUpRight,
  BookOpen,
  Cpu,
} from 'lucide-react';
import confetti from 'canvas-confetti';

interface StudentRosterItem {
  id: string;
  name: string;
  rollNo: string;
  avatarInitials: string;
  avatarBg: string;
  branch: string;
  cgpa: number;
  techScore: number;
  softSkill: number;
  employabilityScore: number;
  statusBenchmark: string;
  benchmarkColor: string;
}

export const EmployabilityAnalyticsModule: React.FC = () => {
  const [selectedBranchFilter, setSelectedBranchFilter] = useState('All');
  const [selectedReadinessTier, setSelectedReadinessTier] = useState('All');
  const [searchRoster, setSearchRoster] = useState('');
  const [activeRosterPage, setActiveRosterPage] = useState(1);
  const [selectedCandidateModal, setSelectedCandidateModal] = useState<StudentRosterItem | null>(null);
  const [auditRunning, setAuditRunning] = useState(false);

  // Student Roster Data
  const rosterData: StudentRosterItem[] = [
    {
      id: 'st-1',
      name: 'Ayush Sharma',
      rollNo: '0101CS211048',
      avatarInitials: 'AS',
      avatarBg: 'bg-purple-100 text-[#7138E8]',
      branch: 'CSE',
      cgpa: 8.84,
      techScore: 94,
      softSkill: 89,
      employabilityScore: 88.4,
      statusBenchmark: 'Placement Ready (Level 3)',
      benchmarkColor: 'bg-emerald-100 text-emerald-800 border-emerald-300',
    },
    {
      id: 'st-2',
      name: 'Ananya Mishra',
      rollNo: '0101IT211019',
      avatarInitials: 'AM',
      avatarBg: 'bg-violet-100 text-[#963DF5]',
      branch: 'IT',
      cgpa: 9.12,
      techScore: 91,
      softSkill: 94,
      employabilityScore: 92.1,
      statusBenchmark: 'Placement Ready (Elite)',
      benchmarkColor: 'bg-purple-100 text-[#7138E8] border-purple-300',
    },
    {
      id: 'st-3',
      name: 'Rohan Deshmukh',
      rollNo: '0101CS211082',
      avatarInitials: 'RD',
      avatarBg: 'bg-indigo-100 text-indigo-700',
      branch: 'CSE',
      cgpa: 8.65,
      techScore: 88,
      softSkill: 86,
      employabilityScore: 86.8,
      statusBenchmark: 'Placement Ready',
      benchmarkColor: 'bg-emerald-100 text-emerald-800 border-emerald-300',
    },
    {
      id: 'st-4',
      name: 'Priya Saxena',
      rollNo: '0101EC211054',
      avatarInitials: 'PS',
      avatarBg: 'bg-amber-100 text-amber-800',
      branch: 'ECE',
      cgpa: 7.92,
      techScore: 72,
      softSkill: 76,
      employabilityScore: 73.5,
      statusBenchmark: 'Moderate Readiness',
      benchmarkColor: 'bg-amber-100 text-amber-800 border-amber-300',
    },
    {
      id: 'st-5',
      name: 'Vikas Verma',
      rollNo: '0101ME211099',
      avatarInitials: 'VV',
      avatarBg: 'bg-rose-100 text-rose-800',
      branch: 'ME',
      cgpa: 7.41,
      techScore: 64,
      softSkill: 61,
      employabilityScore: 62.0,
      statusBenchmark: 'Needs Improvement',
      benchmarkColor: 'bg-rose-100 text-rose-800 border-rose-300',
    },
  ];

  const filteredRoster = rosterData.filter((cand) => {
    const matchesBranch = selectedBranchFilter === 'All' || cand.branch === selectedBranchFilter;
    const matchesTier =
      selectedReadinessTier === 'All' ||
      (selectedReadinessTier === 'Ready' && cand.employabilityScore >= 75) ||
      (selectedReadinessTier === 'Moderate' && cand.employabilityScore >= 60 && cand.employabilityScore < 75) ||
      (selectedReadinessTier === 'NeedsWork' && cand.employabilityScore < 60);
    const matchesSearch =
      cand.name.toLowerCase().includes(searchRoster.toLowerCase()) ||
      cand.rollNo.toLowerCase().includes(searchRoster.toLowerCase());
    return matchesBranch && matchesTier && matchesSearch;
  });

  const handleRunBridgieAudit = () => {
    setAuditRunning(true);
    setTimeout(() => {
      setAuditRunning(false);
      confetti({ particleCount: 65, spread: 60, origin: { y: 0.6 } });
      alert('BRIDGIE AI Audit Complete: 512 candidate skill portfolios scanned across 11 industry competencies. 3 new remediation bootcamps recommended.');
    }, 1200);
  };

  return (
    <div className="space-y-6">
      {/* HEADER SECTION */}
      <div className="neu-extruded p-6 sm:p-8 rounded-3xl">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full neu-inset text-xs font-bold text-[#7138E8]">
              <span>TPO MODULE 2</span>
              <span>•</span>
              <span>UIT-RGPV Batch 2024-25</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold font-display text-[#21163B] mt-2">
              Employability Analytics
            </h1>
            <p className="text-xs sm:text-sm text-[#5F5675]">
              Understand student career readiness through evidence-based AI employability intelligence.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => {
                alert('Exporting official Directorate of Technical Education (DTE) MP Employability Audit Docket in encrypted PDF & CSV format.');
              }}
              className="btn-tactile px-4 py-2.5 rounded-xl text-xs font-bold flex items-center gap-2 cursor-pointer"
            >
              <Download className="w-4 h-4 text-[#7138E8]" />
              <span>Export DTE Report</span>
            </button>
            <button
              onClick={handleRunBridgieAudit}
              disabled={auditRunning}
              className="btn-kinetic px-5 py-2.5 rounded-xl text-xs font-bold flex items-center gap-2 cursor-pointer shadow-md disabled:opacity-75"
            >
              <Sparkles className="w-4 h-4" />
              <span>{auditRunning ? 'Running Neural Audit...' : 'Run BRIDGIE Audit'}</span>
            </button>
          </div>
        </div>

        {/* 6 TOP KPI CARDS */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 mt-6 pt-5 border-t border-purple-200/60">
          <div className="neu-inset p-3.5 rounded-2xl text-center">
            <div className="flex items-center justify-center gap-1 text-[11px] text-[#5F5675]">
              <Users className="w-3.5 h-3.5 text-[#7138E8]" />
              <span>TOTAL ENROLLED</span>
            </div>
            <span className="text-2xl font-extrabold font-display text-[#21163B] block mt-1">580</span>
            <span className="text-[10px] text-[#5F5675] font-semibold">Placement Eligible Batch '25</span>
            <span className="text-[9px] text-emerald-700 font-bold block mt-0.5">100% Onboarded ✓</span>
          </div>

          <div className="neu-inset p-3.5 rounded-2xl text-center">
            <div className="flex items-center justify-center gap-1 text-[11px] text-[#5F5675]">
              <BarChart3 className="w-3.5 h-3.5 text-[#963DF5]" />
              <span>ASSESSMENTS</span>
            </div>
            <span className="text-2xl font-extrabold font-display text-[#7138E8] block mt-1">512</span>
            <span className="text-[10px] text-[#5F5675] font-semibold">88.3% Completion Rate</span>
            <div className="w-full bg-white/80 h-1.5 rounded-full mt-1.5 overflow-hidden">
              <div className="bg-[#7138E8] h-full" style={{ width: '88.3%' }}></div>
            </div>
          </div>

          <div className="neu-inset p-3.5 rounded-2xl text-center border-b-2 border-emerald-500">
            <div className="flex items-center justify-center gap-1 text-[11px] text-[#5F5675]">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
              <span>PLACEMENT READY</span>
            </div>
            <span className="text-2xl font-extrabold font-display text-emerald-600 block mt-1">418</span>
            <span className="text-[10px] text-[#5F5675] font-semibold">72.1% High Tier Benchmark</span>
            <span className="text-[9px] text-emerald-700 font-bold block mt-0.5">Target: &gt;70% Met OPTIMAL</span>
          </div>

          <div className="neu-inset p-3.5 rounded-2xl text-center">
            <div className="flex items-center justify-center gap-1 text-[11px] text-[#5F5675]">
              <Award className="w-3.5 h-3.5 text-purple-600" />
              <span>AVG SCORE</span>
            </div>
            <span className="text-2xl font-extrabold font-display text-[#21163B] block mt-1">
              78.4<span className="text-xs font-normal text-[#5F5675]">/100</span>
            </span>
            <span className="text-[10px] text-[#5F5675] font-semibold">Evidence-based Index</span>
            <div className="w-full bg-white/80 h-1.5 rounded-full mt-1.5 overflow-hidden">
              <div className="bg-purple-600 h-full" style={{ width: '78.4%' }}></div>
            </div>
          </div>

          <div className="neu-inset p-3.5 rounded-2xl text-center">
            <div className="flex items-center justify-center gap-1 text-[11px] text-[#5F5675]">
              <AlertTriangle className="w-3.5 h-3.5 text-amber-600" />
              <span>SKILL GAPS</span>
            </div>
            <span className="text-2xl font-extrabold font-display text-amber-600 block mt-1">164</span>
            <span className="text-[10px] text-[#5F5675] font-semibold">Critical Skill Gaps</span>
            <span className="text-[9px] text-amber-700 font-bold block mt-0.5">Awaiting Fixes</span>
          </div>

          <div className="neu-inset p-3.5 rounded-2xl text-center">
            <div className="flex items-center justify-center gap-1 text-[11px] text-[#5F5675]">
              <Zap className="w-3.5 h-3.5 text-rose-600" />
              <span>INTERVENTION</span>
            </div>
            <span className="text-2xl font-extrabold font-display text-[#7138E8] block mt-1">68</span>
            <span className="text-[10px] text-[#5F5675] font-semibold">Bootcamps Assigned</span>
            <span className="text-[9px] text-purple-700 font-bold block mt-0.5">3 Cohorts Live</span>
          </div>
        </div>
      </div>

      {/* SECTION 1: SCORE DISTRIBUTION & BRIDGIE AI INSIGHTS */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
        {/* Left Column: Employability Score Distribution */}
        <div className="lg:col-span-7 neu-extruded p-6 sm:p-7 rounded-3xl flex flex-col justify-between space-y-4">
          <div>
            <div className="flex items-center justify-between pb-3 border-b border-purple-200/60">
              <h3 className="font-bold text-base text-[#21163B] font-display">
                Employability Score Distribution
              </h3>
              <span className="text-[10px] font-mono font-bold text-[#7138E8] bg-purple-100 px-2 py-0.5 rounded-md">
                N = 512 Evaluated
              </span>
            </div>
            <p className="text-xs text-[#5F5675] mt-1">
              Percentile breakdown across verified assessment tiers.
            </p>

            <div className="space-y-3 mt-4 text-xs">
              <div>
                <div className="flex justify-between font-semibold mb-1">
                  <span className="flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-emerald-500"></span>
                    <span>90–100: Excellent Readiness</span>
                  </span>
                  <span className="text-[#21163B] font-bold">74 students (14.5%)</span>
                </div>
                <div className="w-full bg-[#E9DFFF] h-2.5 rounded-full overflow-hidden">
                  <div className="bg-emerald-500 h-full rounded-full" style={{ width: '14.5%' }}></div>
                </div>
              </div>

              <div>
                <div className="flex justify-between font-semibold mb-1">
                  <span className="flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-[#7138E8]"></span>
                    <span>75–89: High Readiness</span>
                  </span>
                  <span className="text-[#21163B] font-bold">218 students (42.6%)</span>
                </div>
                <div className="w-full bg-[#E9DFFF] h-2.5 rounded-full overflow-hidden">
                  <div className="bg-[#7138E8] h-full rounded-full" style={{ width: '42.6%' }}></div>
                </div>
              </div>

              <div>
                <div className="flex justify-between font-semibold mb-1">
                  <span className="flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-purple-400"></span>
                    <span>60–74: Moderate Readiness</span>
                  </span>
                  <span className="text-[#21163B] font-bold">126 students (24.6%)</span>
                </div>
                <div className="w-full bg-[#E9DFFF] h-2.5 rounded-full overflow-hidden">
                  <div className="bg-purple-400 h-full rounded-full" style={{ width: '24.6%' }}></div>
                </div>
              </div>

              <div>
                <div className="flex justify-between font-semibold mb-1">
                  <span className="flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-amber-500"></span>
                    <span>40–59: Developing</span>
                  </span>
                  <span className="text-[#21163B] font-bold">66 students (12.9%)</span>
                </div>
                <div className="w-full bg-[#E9DFFF] h-2.5 rounded-full overflow-hidden">
                  <div className="bg-amber-500 h-full rounded-full" style={{ width: '12.9%' }}></div>
                </div>
              </div>

              <div>
                <div className="flex justify-between font-semibold mb-1">
                  <span className="flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-rose-500"></span>
                    <span>Below 40: Needs Improvement</span>
                  </span>
                  <span className="text-[#21163B] font-bold">28 students (5.4%)</span>
                </div>
                <div className="w-full bg-[#E9DFFF] h-2.5 rounded-full overflow-hidden">
                  <div className="bg-rose-500 h-full rounded-full" style={{ width: '5.4%' }}></div>
                </div>
              </div>
            </div>
          </div>

          <p className="text-[10px] text-[#5F5675] pt-3 border-t border-purple-100 italic leading-relaxed">
            Note: Score represents an explainable diagnostic readiness index computed from verified repository code quality, real-time live coding sandboxes, and behavioral vocal cadence, not a guaranteed job probability.
          </p>
        </div>

        {/* Right Column: BRIDGIE AI Insights */}
        <div className="lg:col-span-5 neu-extruded p-6 sm:p-7 rounded-3xl flex flex-col justify-between space-y-4">
          <div>
            <div className="flex items-center justify-between pb-3 border-b border-purple-200/60">
              <div className="flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-[#E75ACF]" />
                <h3 className="font-bold text-base text-[#21163B] font-display">BRIDGIE AI Insights</h3>
              </div>
              <span className="text-[10px] font-bold text-emerald-700 bg-emerald-50 px-2.5 py-0.5 rounded-full border border-emerald-200 uppercase">
                Real-Time
              </span>
            </div>
            <p className="text-xs text-[#5F5675] mt-1">
              Autonomous institutional analysis & prescriptive remediation alerts.
            </p>

            <div className="space-y-3 mt-4 text-xs">
              <div className="neu-inset p-3.5 rounded-2xl space-y-1">
                <div className="flex items-center gap-1.5 text-emerald-700 font-bold text-[11px]">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  <span>NATIONAL BENCHMARK LEAD</span>
                </div>
                <p className="text-[#21163B] text-[11px] leading-relaxed">
                  "Python & Microservices competency is exceptional in CSE/IT (92nd percentile nationally)."
                </p>
              </div>

              <div className="neu-inset p-3.5 rounded-2xl space-y-1">
                <div className="flex items-center gap-1.5 text-amber-800 font-bold text-[11px]">
                  <AlertTriangle className="w-3.5 h-3.5 text-amber-600" />
                  <span>ACOUSTIC HESITATION DETECTED</span>
                </div>
                <p className="text-[#21163B] text-[11px] leading-relaxed">
                  "Acoustic communication scores in non-CS branches show hesitation in behavioral interview simulations. Recommend 4-week BRIDGIE Voice Simulator workshop."
                </p>
              </div>

              <div className="neu-inset p-3.5 rounded-2xl space-y-1">
                <div className="flex items-center gap-1.5 text-purple-700 font-bold text-[11px]">
                  <Award className="w-3.5 h-3.5" />
                  <span>DIGITAL SKILL PASSPORT</span>
                </div>
                <p className="text-[#21163B] text-[11px] leading-relaxed">
                  "14 students have pending Docker container proof in Digital Skill Passport."
                </p>
              </div>
            </div>
          </div>

          <button
            onClick={() => {
              confetti({ particleCount: 50, spread: 50, origin: { y: 0.7 } });
              alert('Triggered 3 Batch Remediation Tasks:\n1. Auto-enrolled 14 students into Docker sandbox.\n2. Dispatched BRIDGIE Voice Simulator invites to ME/CE.\n3. Updated student readiness digests.');
            }}
            className="w-full btn-kinetic py-2.5 rounded-xl text-xs font-bold flex items-center justify-center gap-2 cursor-pointer shadow-md mt-2"
          >
            <Zap className="w-4 h-4" />
            <span>Trigger Recommended Batch Actions</span>
          </button>
        </div>
      </div>

      {/* SECTION 2: BRANCH-WISE ANALYTICS COHORTS */}
      <div className="neu-extruded p-6 sm:p-7 rounded-3xl space-y-4">
        <div className="flex flex-wrap items-center justify-between gap-3 pb-3 border-b border-purple-200/60">
          <div>
            <h3 className="font-bold text-lg text-[#21163B] font-display">Branch-Wise Analytics Cohorts</h3>
            <p className="text-xs text-[#5F5675]">
              Comparative performance, assessment coverage, and readiness metrics across departments.
            </p>
          </div>
          <div className="flex items-center gap-2 text-xs">
            <span className="text-[#5F5675] font-semibold">Filter View:</span>
            <select
              value={selectedBranchFilter}
              onChange={(e) => setSelectedBranchFilter(e.target.value)}
              className="neu-input px-3 py-1.5 rounded-xl text-xs"
            >
              <option value="All">All Engineering Branches</option>
              <option value="CSE">Computer Science</option>
              <option value="IT">Information Technology</option>
              <option value="ECE">Electronics & Comm</option>
              <option value="ME">Mechanical Engg</option>
              <option value="CE">Civil Engg</option>
            </select>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3.5">
          {/* CSE */}
          <div className="neu-inset p-4 rounded-2xl flex flex-col justify-between space-y-3">
            <div>
              <div className="flex items-center justify-between">
                <span className="font-bold text-xs bg-purple-100 text-[#7138E8] px-2 py-0.5 rounded-md">CSE</span>
                <span className="text-[10px] text-[#5F5675]">240 Students</span>
              </div>
              <h4 className="font-bold text-sm text-[#21163B] mt-2">Computer Science</h4>

              <div className="grid grid-cols-2 gap-2 mt-3 p-2 rounded-xl bg-white/70 text-center text-xs">
                <div>
                  <span className="text-[9px] text-[#5F5675] block">Avg Score</span>
                  <span className="font-bold text-[#7138E8]">82.6 / 100</span>
                </div>
                <div>
                  <span className="text-[9px] text-[#5F5675] block">Completion</span>
                  <span className="font-bold text-[#21163B]">94%</span>
                </div>
              </div>

              <div className="mt-2 text-xs">
                <div className="flex justify-between text-[11px] mb-1">
                  <span className="text-[#5F5675]">Readiness:</span>
                  <strong className="text-emerald-600">86%</strong>
                </div>
                <div className="w-full bg-white h-1.5 rounded-full overflow-hidden">
                  <div className="bg-emerald-500 h-full" style={{ width: '86%' }}></div>
                </div>
              </div>
            </div>

            <span className="text-[10px] text-center font-bold text-emerald-800 bg-emerald-50 py-1 rounded-lg border border-emerald-200">
              High Tier Benchmark
            </span>
          </div>

          {/* IT */}
          <div className="neu-inset p-4 rounded-2xl flex flex-col justify-between space-y-3">
            <div>
              <div className="flex items-center justify-between">
                <span className="font-bold text-xs bg-purple-100 text-[#7138E8] px-2 py-0.5 rounded-md">IT</span>
                <span className="text-[10px] text-[#5F5675]">120 Students</span>
              </div>
              <h4 className="font-bold text-sm text-[#21163B] mt-2">Information Technology</h4>

              <div className="grid grid-cols-2 gap-2 mt-3 p-2 rounded-xl bg-white/70 text-center text-xs">
                <div>
                  <span className="text-[9px] text-[#5F5675] block">Avg Score</span>
                  <span className="font-bold text-[#7138E8]">80.2 / 100</span>
                </div>
                <div>
                  <span className="text-[9px] text-[#5F5675] block">Completion</span>
                  <span className="font-bold text-[#21163B]">91%</span>
                </div>
              </div>

              <div className="mt-2 text-xs">
                <div className="flex justify-between text-[11px] mb-1">
                  <span className="text-[#5F5675]">Readiness:</span>
                  <strong className="text-emerald-600">81%</strong>
                </div>
                <div className="w-full bg-white h-1.5 rounded-full overflow-hidden">
                  <div className="bg-emerald-500 h-full" style={{ width: '81%' }}></div>
                </div>
              </div>
            </div>

            <span className="text-[10px] text-center font-bold text-purple-800 bg-purple-50 py-1 rounded-lg border border-purple-200">
              Placement Ready
            </span>
          </div>

          {/* ECE */}
          <div className="neu-inset p-4 rounded-2xl flex flex-col justify-between space-y-3">
            <div>
              <div className="flex items-center justify-between">
                <span className="font-bold text-xs bg-purple-100 text-[#7138E8] px-2 py-0.5 rounded-md">ECE</span>
                <span className="text-[10px] text-[#5F5675]">180 Students</span>
              </div>
              <h4 className="font-bold text-sm text-[#21163B] mt-2">Electronics & Comm</h4>

              <div className="grid grid-cols-2 gap-2 mt-3 p-2 rounded-xl bg-white/70 text-center text-xs">
                <div>
                  <span className="text-[9px] text-[#5F5675] block">Avg Score</span>
                  <span className="font-bold text-[#7138E8]">74.8 / 100</span>
                </div>
                <div>
                  <span className="text-[9px] text-[#5F5675] block">Completion</span>
                  <span className="font-bold text-[#21163B]">84%</span>
                </div>
              </div>

              <div className="mt-2 text-xs">
                <div className="flex justify-between text-[11px] mb-1">
                  <span className="text-[#5F5675]">Readiness:</span>
                  <strong className="text-indigo-600">69%</strong>
                </div>
                <div className="w-full bg-white h-1.5 rounded-full overflow-hidden">
                  <div className="bg-indigo-500 h-full" style={{ width: '69%' }}></div>
                </div>
              </div>
            </div>

            <span className="text-[10px] text-center font-bold text-indigo-800 bg-indigo-50 py-1 rounded-lg border border-indigo-200">
              Moderate Readiness
            </span>
          </div>

          {/* ME */}
          <div className="neu-inset p-4 rounded-2xl flex flex-col justify-between space-y-3">
            <div>
              <div className="flex items-center justify-between">
                <span className="font-bold text-xs bg-purple-100 text-[#7138E8] px-2 py-0.5 rounded-md">ME</span>
                <span className="text-[10px] text-[#5F5675]">120 Students</span>
              </div>
              <h4 className="font-bold text-sm text-[#21163B] mt-2">Mechanical Engg</h4>

              <div className="grid grid-cols-2 gap-2 mt-3 p-2 rounded-xl bg-white/70 text-center text-xs">
                <div>
                  <span className="text-[9px] text-[#5F5675] block">Avg Score</span>
                  <span className="font-bold text-[#7138E8]">71.2 / 100</span>
                </div>
                <div>
                  <span className="text-[9px] text-[#5F5675] block">Completion</span>
                  <span className="font-bold text-[#21163B]">79%</span>
                </div>
              </div>

              <div className="mt-2 text-xs">
                <div className="flex justify-between text-[11px] mb-1">
                  <span className="text-[#5F5675]">Readiness:</span>
                  <strong className="text-amber-600">61%</strong>
                </div>
                <div className="w-full bg-white h-1.5 rounded-full overflow-hidden">
                  <div className="bg-amber-500 h-full" style={{ width: '61%' }}></div>
                </div>
              </div>
            </div>

            <span className="text-[10px] text-center font-bold text-amber-800 bg-amber-50 py-1 rounded-lg border border-amber-200">
              Intervention Cohort
            </span>
          </div>

          {/* CE */}
          <div className="neu-inset p-4 rounded-2xl flex flex-col justify-between space-y-3">
            <div>
              <div className="flex items-center justify-between">
                <span className="font-bold text-xs bg-purple-100 text-[#7138E8] px-2 py-0.5 rounded-md">CE</span>
                <span className="text-[10px] text-[#5F5675]">90 Students</span>
              </div>
              <h4 className="font-bold text-sm text-[#21163B] mt-2">Civil Engg</h4>

              <div className="grid grid-cols-2 gap-2 mt-3 p-2 rounded-xl bg-white/70 text-center text-xs">
                <div>
                  <span className="text-[9px] text-[#5F5675] block">Avg Score</span>
                  <span className="font-bold text-[#7138E8]">68.5 / 100</span>
                </div>
                <div>
                  <span className="text-[9px] text-[#5F5675] block">Completion</span>
                  <span className="font-bold text-[#21163B]">73%</span>
                </div>
              </div>

              <div className="mt-2 text-xs">
                <div className="flex justify-between text-[11px] mb-1">
                  <span className="text-[#5F5675]">Readiness:</span>
                  <strong className="text-rose-600">54%</strong>
                </div>
                <div className="w-full bg-white h-1.5 rounded-full overflow-hidden">
                  <div className="bg-rose-500 h-full" style={{ width: '54%' }}></div>
                </div>
              </div>
            </div>

            <span className="text-[10px] text-center font-bold text-rose-800 bg-rose-50 py-1 rounded-lg border border-rose-200">
              Intervention Required
            </span>
          </div>
        </div>
      </div>

      {/* SECTION 3: 11-SKILL INDUSTRY MATRIX & SKILL GAP INTERVENTIONS */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
        {/* Left Column: 11-Skill Industry Matrix */}
        <div className="lg:col-span-7 neu-extruded p-6 sm:p-7 rounded-3xl flex flex-col justify-between space-y-4">
          <div>
            <div className="flex items-center justify-between pb-3 border-b border-purple-200/60">
              <h3 className="font-bold text-base text-[#21163B] font-display">11-Skill Industry Matrix</h3>
              <span className="text-[10px] text-[#5F5675] font-mono">Aggregated from 5,632 Code Submissions</span>
            </div>
            <p className="text-xs text-[#5F5675] mt-1">
              Autonomous telemetry & benchmarked industry proficiency.
            </p>

            <div className="space-y-2.5 mt-4 text-xs">
              {[
                { name: 'Cloud Computing (AWS/Docker/K8s)', val: 76, color: 'bg-[#7138E8]' },
                { name: 'Data Structures & Algorithms', val: 84, color: 'bg-emerald-500' },
                { name: 'Go & Backend Microservices', val: 72, color: 'bg-[#7138E8]' },
                { name: 'Python & Data Science', val: 81, color: 'bg-emerald-500' },
                { name: 'React & Frontend Architecture', val: 79, color: 'bg-[#7138E8]' },
                { name: 'SQL & Distributed Databases', val: 88, color: 'bg-emerald-500' },
                { name: 'Communication & Verbal Cadence', val: 68, color: 'bg-amber-500', isGap: true },
                { name: 'Behavioral & Crisis Composure', val: 74, color: 'bg-[#7138E8]' },
                { name: 'Problem Solving & Concurrency', val: 77, color: 'bg-[#7138E8]' },
              ].map((skill, idx) => (
                <div key={idx}>
                  <div className="flex justify-between items-center mb-1 font-semibold text-[11px]">
                    <span className="flex items-center gap-2">
                      <span className="text-[#21163B]">{skill.name}</span>
                      {skill.isGap && (
                        <span className="text-[9px] font-bold bg-amber-100 text-amber-800 px-1.5 py-0.2 rounded-sm">
                          GAP
                        </span>
                      )}
                    </span>
                    <span className="font-bold text-[#7138E8]">{skill.val}%</span>
                  </div>
                  <div className="w-full bg-[#E9DFFF] h-2 rounded-full overflow-hidden">
                    <div className={`${skill.color} h-full rounded-full`} style={{ width: `${skill.val}%` }}></div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="pt-3 border-t border-purple-100 text-right">
            <button
              onClick={() => alert('Opening Full 11-Vector Vector Space Matrix: Shows radar analysis for AWS, DSA, Go, Python, React, SQL, Vocal Cadence, Crisis Composure, Concurrency, Git Ops, System Design.')}
              className="text-xs font-bold text-[#7138E8] hover:underline inline-flex items-center gap-1 cursor-pointer"
            >
              <span>View Full 11-Vector Matrix</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* Right Column: Skill Gap Interventions */}
        <div className="lg:col-span-5 neu-extruded p-6 sm:p-7 rounded-3xl flex flex-col justify-between space-y-4">
          <div>
            <div className="flex items-center justify-between pb-3 border-b border-purple-200/60">
              <h3 className="font-bold text-base text-[#21163B] font-display">Skill Gap Interventions</h3>
              <Zap className="w-4 h-4 text-amber-600" />
            </div>
            <p className="text-xs text-[#5F5675] mt-1">
              Required industry standard vs current batch telemetry.
            </p>

            <div className="space-y-3.5 mt-4 text-xs">
              {/* Critical Gap */}
              <div className="neu-inset p-4 rounded-2xl space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-mono font-bold text-rose-700 bg-rose-50 px-2 py-0.5 rounded-md border border-rose-200">
                    -18% INDUSTRY DELTA
                  </span>
                  <span className="text-[10px] font-bold text-rose-700 uppercase">Critical</span>
                </div>
                <h4 className="font-bold text-xs text-[#21163B]">
                  Ingress Traffic Architecture & Microservice Failure Recovery
                </h4>
                <div className="flex justify-between text-[11px] text-[#5F5675]">
                  <span>Industry: <strong>85%</strong></span>
                  <span>Cohort: <strong className="text-rose-600">67%</strong></span>
                </div>
                <div className="pt-2 flex items-center justify-between border-t border-purple-200/40">
                  <span className="text-[10px] text-[#5F5675]">Action: Deploy System Design Studio Bootcamp</span>
                  <button
                    onClick={() => {
                      confetti({ particleCount: 30, spread: 45 });
                      alert('Assigned System Design Studio Bootcamp to 124 students in CSE/IT.');
                    }}
                    className="btn-kinetic px-3 py-1 rounded-lg text-[10px] font-bold cursor-pointer"
                  >
                    Assign
                  </button>
                </div>
              </div>

              {/* Priority Gap */}
              <div className="neu-inset p-4 rounded-2xl space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-mono font-bold text-amber-700 bg-amber-50 px-2 py-0.5 rounded-md border border-amber-200">
                    -24% INDUSTRY DELTA
                  </span>
                  <span className="text-[10px] font-bold text-amber-700 uppercase">Priority</span>
                </div>
                <h4 className="font-bold text-xs text-[#21163B]">
                  Communication & Fluency (ME & CE Cohorts)
                </h4>
                <div className="flex justify-between text-[11px] text-[#5F5675]">
                  <span>Industry: <strong>80%</strong></span>
                  <span>Cohort: <strong className="text-amber-600">56%</strong></span>
                </div>
                <div className="pt-2 flex items-center justify-between border-t border-purple-200/40">
                  <span className="text-[10px] text-[#5F5675]">Action: Assign BRIDGIE Behavioral Simulator Level-2</span>
                  <button
                    onClick={() => {
                      confetti({ particleCount: 30, spread: 45 });
                      alert('Assigned BRIDGIE Behavioral Simulator Level-2 to 148 students in ME & CE.');
                    }}
                    className="btn-kinetic px-3 py-1 rounded-lg text-[10px] font-bold cursor-pointer"
                  >
                    Assign
                  </button>
                </div>
              </div>
            </div>
          </div>

          <div className="p-3 neu-flat rounded-2xl flex items-center justify-between text-xs">
            <span className="text-[11px] text-[#5F5675]">Autonomous Scheduling:</span>
            <span className="text-[10px] font-bold text-emerald-700 bg-emerald-50 px-2.5 py-0.5 rounded-full border border-emerald-200 flex items-center gap-1">
              <CheckCircle2 className="w-3 h-3 text-emerald-600" />
              Auto-Sync with Academic Timetable Active
            </span>
          </div>
        </div>
      </div>

      {/* SECTION 4: STUDENT READINESS DIAGNOSTIC ROSTER */}
      <div className="neu-extruded p-6 sm:p-7 rounded-3xl space-y-4">
        <div className="flex flex-wrap items-center justify-between gap-4 pb-3 border-b border-purple-200/60">
          <div>
            <h3 className="font-bold text-lg text-[#21163B] font-display">Student Readiness Diagnostic Roster</h3>
            <p className="text-xs text-[#5F5675]">
              Granular candidate evaluation indices, technical scorecards, and verifiable credentials.
            </p>
          </div>

          {/* Filters Bar */}
          <div className="flex flex-wrap items-center gap-2 text-xs">
            <div className="flex items-center gap-1.5">
              <span className="text-[#5F5675]">Branch:</span>
              <select
                value={selectedBranchFilter}
                onChange={(e) => setSelectedBranchFilter(e.target.value)}
                className="neu-input px-2.5 py-1 rounded-xl text-xs"
              >
                <option value="All">All</option>
                <option value="CSE">CSE</option>
                <option value="IT">IT</option>
                <option value="ECE">ECE</option>
                <option value="ME">ME</option>
                <option value="CE">CE</option>
              </select>
            </div>

            <div className="flex items-center gap-1.5">
              <span className="text-[#5F5675]">Batch:</span>
              <span className="neu-inset px-2.5 py-1 rounded-xl font-bold text-[#7138E8]">2024-25</span>
            </div>

            <div className="flex items-center gap-1.5">
              <span className="text-[#5F5675]">Readiness:</span>
              <select
                value={selectedReadinessTier}
                onChange={(e) => setSelectedReadinessTier(e.target.value)}
                className="neu-input px-2.5 py-1 rounded-xl text-xs"
              >
                <option value="All">All Tiers</option>
                <option value="Ready">Placement Ready (&gt;75)</option>
                <option value="Moderate">Moderate (60-74)</option>
                <option value="NeedsWork">Needs Work (&lt;60)</option>
              </select>
            </div>
          </div>
        </div>

        {/* Filter / Search Input */}
        <div className="relative">
          <Search className="w-4 h-4 absolute left-3 top-2.5 text-[#5F5675]" />
          <input
            type="text"
            placeholder="Filter roster by student name, roll number, or skill tag..."
            value={searchRoster}
            onChange={(e) => setSearchRoster(e.target.value)}
            className="neu-input w-full pl-9 pr-4 py-2 rounded-xl text-xs"
          />
        </div>

        {/* Roster Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-purple-200/60 text-[#5F5675] font-semibold uppercase text-[10px]">
                <th className="py-3 px-3">Student Profile & Roll No</th>
                <th className="py-3 px-3">Branch</th>
                <th className="py-3 px-3">CGPA</th>
                <th className="py-3 px-3">Tech Score</th>
                <th className="py-3 px-3">Soft Skill</th>
                <th className="py-3 px-3">Employability Score</th>
                <th className="py-3 px-3">Status Benchmark</th>
                <th className="py-3 px-3 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-purple-100">
              {filteredRoster.map((cand) => (
                <tr key={cand.id} className="hover:bg-purple-50/50 transition-colors">
                  <td className="py-3 px-3">
                    <div className="flex items-center gap-2.5">
                      <div
                        className={`w-8 h-8 rounded-xl ${cand.avatarBg} flex items-center justify-center font-bold text-xs`}
                      >
                        {cand.avatarInitials}
                      </div>
                      <div>
                        <strong className="text-[#21163B] block">{cand.name}</strong>
                        <span className="text-[10px] text-[#5F5675] font-mono">Roll: {cand.rollNo}</span>
                      </div>
                    </div>
                  </td>
                  <td className="py-3 px-3">
                    <span className="font-bold text-[#7138E8]">{cand.branch}</span>
                  </td>
                  <td className="py-3 px-3 font-bold text-[#21163B]">{cand.cgpa.toFixed(2)}</td>
                  <td className="py-3 px-3">
                    <span className="font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-md border border-emerald-200">
                      {cand.techScore}%
                    </span>
                  </td>
                  <td className="py-3 px-3">
                    <span className="font-bold text-purple-700 bg-purple-50 px-2 py-0.5 rounded-md border border-purple-200">
                      {cand.softSkill}%
                    </span>
                  </td>
                  <td className="py-3 px-3">
                    <strong className="text-base text-[#7138E8] font-extrabold">{cand.employabilityScore}</strong>
                    <span className="text-[10px] text-[#5F5675]"> / 100</span>
                  </td>
                  <td className="py-3 px-3">
                    <span
                      className={`inline-block px-2.5 py-0.5 rounded-full text-[10px] font-bold border ${cand.benchmarkColor}`}
                    >
                      {cand.statusBenchmark}
                    </span>
                  </td>
                  <td className="py-3 px-3 text-right">
                    <button
                      onClick={() => setSelectedCandidateModal(cand)}
                      className="text-xs font-bold text-[#7138E8] hover:underline cursor-pointer"
                    >
                      View Profile
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination Bar */}
        <div className="pt-3 border-t border-purple-100 flex flex-wrap items-center justify-between text-xs gap-2">
          <span className="text-[#5F5675]">
            Showing 5 of 512 Evaluated Candidates (Batch 2024-25)
          </span>

          <div className="flex items-center gap-1">
            <button
              onClick={() => setActiveRosterPage((p) => Math.max(1, p - 1))}
              className="px-2.5 py-1 rounded-lg neu-inset text-xs font-bold cursor-pointer"
            >
              ‹
            </button>
            <button
              onClick={() => setActiveRosterPage(1)}
              className={`px-3 py-1 rounded-lg text-xs font-bold ${
                activeRosterPage === 1 ? 'btn-kinetic text-white' : 'neu-inset'
              }`}
            >
              1
            </button>
            <button
              onClick={() => setActiveRosterPage(2)}
              className={`px-3 py-1 rounded-lg text-xs font-bold ${
                activeRosterPage === 2 ? 'btn-kinetic text-white' : 'neu-inset'
              }`}
            >
              2
            </button>
            <button
              onClick={() => setActiveRosterPage(3)}
              className={`px-3 py-1 rounded-lg text-xs font-bold ${
                activeRosterPage === 3 ? 'btn-kinetic text-white' : 'neu-inset'
              }`}
            >
              3
            </button>
            <span className="px-2 text-[#5F5675]">...</span>
            <button
              onClick={() => setActiveRosterPage(51)}
              className={`px-3 py-1 rounded-lg text-xs font-bold ${
                activeRosterPage === 51 ? 'btn-kinetic text-white' : 'neu-inset'
              }`}
            >
              51
            </button>
            <button
              onClick={() => setActiveRosterPage((p) => Math.min(51, p + 1))}
              className="px-2.5 py-1 rounded-lg neu-inset text-xs font-bold cursor-pointer"
            >
              ›
            </button>
          </div>
        </div>
      </div>

      {/* FOOTER NODAL CREDENTIAL */}
      <div className="p-4 neu-flat rounded-2xl flex flex-wrap items-center justify-between text-xs text-[#5F5675] gap-2">
        <div className="flex items-center gap-2">
          <CheckCircle2 className="w-4 h-4 text-[#7138E8]" />
          <span>Cryptographic Ledger Node #MP-UIT-BPL-0487 — Directorate Verified</span>
        </div>
        <span>SkillBridge AI Directorate Sovereign Platform © 2025. All Rights Reserved.</span>
      </div>

      {/* STUDENT PROFILE POPUP MODAL */}
      {selectedCandidateModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-xs">
          <div className="w-full max-w-lg neu-floating rounded-3xl p-6 space-y-4 bg-[#F3F0FF]">
            <div className="flex justify-between items-center pb-3 border-b border-purple-200">
              <div className="flex items-center gap-3">
                <div
                  className={`w-10 h-10 rounded-2xl ${selectedCandidateModal.avatarBg} flex items-center justify-center font-bold text-sm`}
                >
                  {selectedCandidateModal.avatarInitials}
                </div>
                <div>
                  <h3 className="font-bold text-base text-[#21163B] font-display">
                    {selectedCandidateModal.name}
                  </h3>
                  <p className="text-[11px] text-[#5F5675]">Roll No: {selectedCandidateModal.rollNo}</p>
                </div>
              </div>
              <button
                onClick={() => setSelectedCandidateModal(null)}
                className="cursor-pointer text-[#5F5675]"
              >
                ✕
              </button>
            </div>

            <div className="grid grid-cols-2 gap-3 text-xs">
              <div className="neu-inset p-3 rounded-xl text-center">
                <span className="text-[10px] text-[#5F5675] block">Branch</span>
                <strong className="text-sm text-[#7138E8]">{selectedCandidateModal.branch}</strong>
              </div>
              <div className="neu-inset p-3 rounded-xl text-center">
                <span className="text-[10px] text-[#5F5675] block">Academic CGPA</span>
                <strong className="text-sm text-[#21163B]">{selectedCandidateModal.cgpa.toFixed(2)}</strong>
              </div>
              <div className="neu-inset p-3 rounded-xl text-center">
                <span className="text-[10px] text-[#5F5675] block">Proctored Tech Score</span>
                <strong className="text-sm text-emerald-600">{selectedCandidateModal.techScore}%</strong>
              </div>
              <div className="neu-inset p-3 rounded-xl text-center">
                <span className="text-[10px] text-[#5F5675] block">Soft Skill Cadence</span>
                <strong className="text-sm text-purple-600">{selectedCandidateModal.softSkill}%</strong>
              </div>
            </div>

            <div className="neu-flat p-4 rounded-2xl space-y-2 text-xs">
              <span className="text-[11px] font-bold text-[#21163B]">Verified Competency Proof:</span>
              <p className="text-[#5F5675] text-[11px] leading-relaxed">
                Passed proctored tests in Distributed Systems & Go Microservices with 0 gaze diversion flags. Docker container deployment repository verified with SHA-256 integrity hash.
              </p>
            </div>

            <button
              onClick={() => setSelectedCandidateModal(null)}
              className="w-full btn-kinetic py-2 rounded-xl text-xs font-bold cursor-pointer"
            >
              Close Dossier
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
