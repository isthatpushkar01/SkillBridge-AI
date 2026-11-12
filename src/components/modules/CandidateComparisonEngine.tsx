import React, { useState } from 'react';
import confetti from 'canvas-confetti';
import {
  Sparkles,
  Award,
  CheckCircle,
  FileText,
  Share2,
  Lock,
  ChevronRight,
  Shield,
  Layers,
  ArrowRight,
  Download,
  Calendar,
  Building,
  GraduationCap,
  ExternalLink,
  Code2,
  Cpu,
  Eye,
  TrendingUp,
  X,
} from 'lucide-react';

interface CandidateComparisonEngineProps {
  onBack?: () => void;
}

export const CandidateComparisonEngine: React.FC<CandidateComparisonEngineProps> = ({ onBack }) => {
  const [viewMode, setViewMode] = useState<'expanded' | 'telemetry'>('expanded');
  const [modalAction, setModalAction] = useState<string | null>(null);
  const [selectedCandidateForDetail, setSelectedCandidateForDetail] = useState<string | null>(null);

  // Weights configuration
  const [weights, setWeights] = useState({
    codeRigor: 35,
    sysArch: 30,
    telemetry: 20,
    gpa: 15,
  });

  const handleAction = (candidateName: string, actionType: string) => {
    confetti({
      particleCount: 50,
      spread: 60,
      origin: { y: 0.7 },
    });
    setModalAction(`${actionType} initiated for ${candidateName}. An automated calendar invite and interview packet have been dispatched.`);
  };

  return (
    <div className="w-full space-y-5 animate-in fade-in duration-300">
      {/* 1. TOP BREADCRUMB & UTILITY HEADER */}
      <div className="flex flex-wrap items-center justify-between gap-3 bg-[#FAF7FF] p-3 sm:p-4 rounded-2xl neu-extruded border border-purple-200/80">
        <div className="flex items-center space-x-2 text-xs text-[#5F5675]">
          <span className="hover:text-[#7138E8] cursor-pointer">Talent Discovery</span>
          <ChevronRight className="w-3.5 h-3.5" />
          <span className="hover:text-[#7138E8] cursor-pointer">Active Drives</span>
          <ChevronRight className="w-3.5 h-3.5" />
          <span className="hover:text-[#7138E8] cursor-pointer">Q4 2026 University Drive</span>
          <ChevronRight className="w-3.5 h-3.5" />
          <span className="font-bold text-[#7138E8]">Side-by-Side Comparison</span>
        </div>

        <div className="flex items-center space-x-2">
          <button
            onClick={() => setModalAction('Exporting Multi-Dossier PDF packet containing verified cryptographic transcripts and code telemetry for all 3 candidates.')}
            className="px-3 py-1.5 rounded-xl neu-flat hover:neu-inset text-xs font-semibold text-[#21163B] flex items-center gap-1.5 cursor-pointer"
          >
            <Download className="w-3.5 h-3.5 text-[#7138E8]" />
            <span>Export Multi-Dossier PDF</span>
          </button>
          <button
            onClick={() => setModalAction('Shared active comparison workspace link with Senior Hiring Panel members.')}
            className="px-3 py-1.5 rounded-xl neu-flat hover:neu-inset text-xs font-semibold text-[#21163B] flex items-center gap-1.5 cursor-pointer"
          >
            <Share2 className="w-3.5 h-3.5 text-[#7138E8]" />
            <span>Share with Hiring Panel</span>
          </button>
          <button
            onClick={() => setModalAction('Snapshot state locked with timestamp and SHA-256 sovereign hash.')}
            className="px-3.5 py-1.5 rounded-xl btn-kinetic text-xs font-bold text-white flex items-center gap-1.5 cursor-pointer"
          >
            <Lock className="w-3.5 h-3.5" />
            <span>Lock Snapshot</span>
          </button>
        </div>
      </div>

      {/* 2. TARGET ROLE BENCHMARK HERO CARD */}
      <div className="neu-extruded rounded-2xl p-5 bg-white/70 space-y-3 border border-purple-100">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-[#7138E8]"></span>
              <h2 className="text-lg font-bold font-display text-[#21163B]">
                Target Role: Cloud Infrastructure & Distributed Backend Engineer
              </h2>
            </div>
            <p className="text-xs text-[#5F5675]">
              Evaluating side-by-side benchmark vectors against tier-1 institute production-readiness criteria.
            </p>
          </div>

          {/* Benchmark Weight Chips */}
          <div className="flex flex-wrap items-center gap-2 text-xs">
            <span className="neu-inset px-2.5 py-1 rounded-xl text-[#21163B] font-medium text-[11px]">
              Code Rigor: <strong className="text-[#7138E8]">{weights.codeRigor}%</strong>
            </span>
            <span className="neu-inset px-2.5 py-1 rounded-xl text-[#21163B] font-medium text-[11px]">
              Sys Arch: <strong className="text-[#7138E8]">{weights.sysArch}%</strong>
            </span>
            <span className="neu-inset px-2.5 py-1 rounded-xl text-[#21163B] font-medium text-[11px]">
              Telemetry: <strong className="text-[#7138E8]">{weights.telemetry}%</strong>
            </span>
            <span className="neu-inset px-2.5 py-1 rounded-xl text-[#21163B] font-medium text-[11px]">
              GPA: <strong className="text-[#7138E8]">{weights.gpa}%</strong>
            </span>
            <button
              onClick={() => setModalAction('Weight configuration editor opened. Adjust vector weights dynamically.')}
              className="p-1 rounded-lg neu-flat hover:text-[#7138E8] text-[#5F5675] cursor-pointer"
              title="Add or Adjust Vector Weight"
            >
              +
            </button>
          </div>
        </div>
      </div>

      {/* 3. THREE-CANDIDATE COMPARISON CARDS */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* CANDIDATE 1: AYUSH SHARMA */}
        <div className="neu-extruded rounded-2xl p-4 sm:p-5 bg-white/70 space-y-4 border border-purple-100 flex flex-col justify-between relative overflow-hidden">
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-bold text-emerald-800 bg-emerald-100 px-2 py-0.5 rounded-full flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-600"></span>
                Slot 1: Leading Match
              </span>
              <span className="w-6 h-6 rounded-full bg-[#7138E8] text-white flex items-center justify-center text-[10px] font-bold">
                L3
              </span>
            </div>

            {/* Candidate Header */}
            <div className="flex items-center gap-3">
              <img
                src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200&auto=format&fit=crop&q=80"
                alt="Ayush Sharma"
                className="w-12 h-12 rounded-xl object-cover border-2 border-purple-300"
              />
              <div>
                <div className="flex items-center gap-1.5">
                  <h3 className="font-bold text-sm font-display text-[#21163B]">Ayush Sharma</h3>
                  <CheckCircle className="w-3.5 h-3.5 text-[#7138E8]" />
                </div>
                <p className="text-[11px] text-[#5F5675]">UIT-RGPV Bhopal</p>
                <div className="flex items-center gap-2 text-[10px] font-semibold text-[#7138E8] mt-0.5">
                  <span>B.Tech CSE &apos;25</span>
                  <span className="bg-purple-100 px-1.5 py-0.2 rounded font-mono">CGPA 8.84</span>
                </div>
              </div>
            </div>

            {/* Score Badges */}
            <div className="grid grid-cols-2 gap-2 text-center pt-1">
              <div className="p-2.5 rounded-xl neu-inset">
                <span className="text-[9px] uppercase font-bold text-[#5F5675] block">OVERALL SKILL MATCH</span>
                <span className="text-xl font-black font-display text-[#7138E8]">94%</span>
                <span className="text-[9px] font-bold text-emerald-700 block mt-0.5">Exceeded</span>
              </div>
              <div className="p-2.5 rounded-xl neu-inset">
                <span className="text-[9px] uppercase font-bold text-[#5F5675] block">EMPLOYABILITY INDEX</span>
                <span className="text-xl font-black font-display text-[#21163B]">88.4</span>
                <span className="text-[9px] text-[#5F5675] block mt-0.5">/100</span>
              </div>
            </div>

            {/* Clearance Hash */}
            <div className="p-2 rounded-xl bg-purple-50/70 border border-purple-100 text-[10px] text-[#5F5675] flex items-center justify-between">
              <span>TPO Verified Stamp:</span>
              <span className="font-mono font-bold text-purple-700">#MP-RGPV-9921</span>
            </div>
          </div>

          {/* Action CTAs */}
          <div className="space-y-2 pt-2">
            <button
              onClick={() => handleAction('Ayush Sharma', 'Fast-Track to Final Partner Interview')}
              className="w-full py-2 px-3 rounded-xl btn-kinetic font-bold text-xs text-white flex items-center justify-center gap-1.5 cursor-pointer shadow-sm"
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>Fast-Track to Final Partner</span>
            </button>
            <button
              onClick={() => handleAction('Ayush Sharma', 'Schedule System Design Interview')}
              className="w-full py-2 px-3 rounded-xl neu-flat hover:neu-inset font-semibold text-xs text-[#21163B] flex items-center justify-center gap-1.5 cursor-pointer"
            >
              <Calendar className="w-3.5 h-3.5 text-[#7138E8]" />
              <span>Schedule System Design</span>
            </button>
          </div>
        </div>

        {/* CANDIDATE 2: ANANYA MISHRA */}
        <div className="neu-extruded rounded-2xl p-4 sm:p-5 bg-white/70 space-y-4 border border-purple-100 flex flex-col justify-between relative overflow-hidden">
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-bold text-indigo-800 bg-indigo-100 px-2 py-0.5 rounded-full flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-indigo-600"></span>
                Slot 2: Top DSA Rigor
              </span>
              <span className="w-6 h-6 rounded-full bg-indigo-600 text-white flex items-center justify-center text-[10px] font-bold">
                HE
              </span>
            </div>

            {/* Candidate Header */}
            <div className="flex items-center gap-3">
              <img
                src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200&auto=format&fit=crop&q=80"
                alt="Ananya Mishra"
                className="w-12 h-12 rounded-xl object-cover border-2 border-indigo-300"
              />
              <div>
                <div className="flex items-center gap-1.5">
                  <h3 className="font-bold text-sm font-display text-[#21163B]">Ananya Mishra</h3>
                  <CheckCircle className="w-3.5 h-3.5 text-indigo-600" />
                </div>
                <p className="text-[11px] text-[#5F5675]">UIT-RGPV Bhopal</p>
                <div className="flex items-center gap-2 text-[10px] font-semibold text-indigo-700 mt-0.5">
                  <span>B.Tech IT &apos;25</span>
                  <span className="bg-indigo-100 px-1.5 py-0.2 rounded font-mono">CGPA 9.12</span>
                </div>
              </div>
            </div>

            {/* Score Badges */}
            <div className="grid grid-cols-2 gap-2 text-center pt-1">
              <div className="p-2.5 rounded-xl neu-inset">
                <span className="text-[9px] uppercase font-bold text-[#5F5675] block">OVERALL SKILL MATCH</span>
                <span className="text-xl font-black font-display text-indigo-700">91%</span>
                <span className="text-[9px] font-bold text-indigo-800 block mt-0.5">99th% DSA</span>
              </div>
              <div className="p-2.5 rounded-xl neu-inset">
                <span className="text-[9px] uppercase font-bold text-[#5F5675] block">EMPLOYABILITY INDEX</span>
                <span className="text-xl font-black font-display text-[#21163B]">92.1</span>
                <span className="text-[9px] text-[#5F5675] block mt-0.5">/100</span>
              </div>
            </div>

            {/* Clearance Hash */}
            <div className="p-2 rounded-xl bg-indigo-50/70 border border-indigo-100 text-[10px] text-[#5F5675] flex items-center justify-between">
              <span>State Nodal Clearance:</span>
              <span className="font-mono font-bold text-indigo-700">#MP-RGPV-4412</span>
            </div>
          </div>

          {/* Action CTAs */}
          <div className="space-y-2 pt-2">
            <button
              onClick={() => handleAction('Ananya Mishra', 'Expedite Offer Round')}
              className="w-full py-2 px-3 rounded-xl bg-gradient-to-r from-indigo-600 to-violet-700 hover:brightness-105 font-bold text-xs text-white flex items-center justify-center gap-1.5 cursor-pointer shadow-sm transition-all"
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>Expedite Offer Round</span>
            </button>
            <button
              onClick={() => handleAction('Ananya Mishra', 'Schedule Cultural Fit Interview')}
              className="w-full py-2 px-3 rounded-xl neu-flat hover:neu-inset font-semibold text-xs text-[#21163B] flex items-center justify-center gap-1.5 cursor-pointer"
            >
              <Calendar className="w-3.5 h-3.5 text-indigo-600" />
              <span>Schedule Cultural Fit</span>
            </button>
          </div>
        </div>

        {/* CANDIDATE 3: ROHAN DESHMUKH */}
        <div className="neu-extruded rounded-2xl p-4 sm:p-5 bg-white/70 space-y-4 border border-purple-100 flex flex-col justify-between relative overflow-hidden">
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-bold text-purple-800 bg-purple-100 px-2 py-0.5 rounded-full flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-purple-600"></span>
                Slot 3: DevOps / IaC
              </span>
              <span className="w-6 h-6 rounded-full bg-purple-800 text-white flex items-center justify-center text-[10px] font-bold">
                SE
              </span>
            </div>

            {/* Candidate Header */}
            <div className="flex items-center gap-3">
              <img
                src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&auto=format&fit=crop&q=80"
                alt="Rohan Deshmukh"
                className="w-12 h-12 rounded-xl object-cover border-2 border-purple-300"
              />
              <div>
                <div className="flex items-center gap-1.5">
                  <h3 className="font-bold text-sm font-display text-[#21163B]">Rohan Deshmukh</h3>
                  <CheckCircle className="w-3.5 h-3.5 text-purple-700" />
                </div>
                <p className="text-[11px] text-[#5F5675]">SGSITS Indore</p>
                <div className="flex items-center gap-2 text-[10px] font-semibold text-purple-700 mt-0.5">
                  <span>B.Tech CSE &apos;25</span>
                  <span className="bg-purple-100 px-1.5 py-0.2 rounded font-mono">CGPA 8.65</span>
                </div>
              </div>
            </div>

            {/* Score Badges */}
            <div className="grid grid-cols-2 gap-2 text-center pt-1">
              <div className="p-2.5 rounded-xl neu-inset">
                <span className="text-[9px] uppercase font-bold text-[#5F5675] block">OVERALL SKILL MATCH</span>
                <span className="text-xl font-black font-display text-purple-800">88%</span>
                <span className="text-[9px] font-bold text-purple-700 block mt-0.5">IaC Helm Focus</span>
              </div>
              <div className="p-2.5 rounded-xl neu-inset">
                <span className="text-[9px] uppercase font-bold text-[#5F5675] block">EMPLOYABILITY INDEX</span>
                <span className="text-xl font-black font-display text-[#21163B]">86.8</span>
                <span className="text-[9px] text-[#5F5675] block mt-0.5">/100</span>
              </div>
            </div>

            {/* Clearance Hash */}
            <div className="p-2 rounded-xl bg-purple-50/70 border border-purple-100 text-[10px] text-[#5F5675] flex items-center justify-between">
              <span>SGSITS Nodal Verified:</span>
              <span className="font-mono font-bold text-purple-700">#MP-SGSITS-7721</span>
            </div>
          </div>

          {/* Action CTAs */}
          <div className="space-y-2 pt-2">
            <button
              onClick={() => handleAction('Rohan Deshmukh', 'Shortlist for DevOps Specialist Role')}
              className="w-full py-2 px-3 rounded-xl bg-purple-700 hover:bg-purple-800 font-bold text-xs text-white flex items-center justify-center gap-1.5 cursor-pointer shadow-sm transition-all"
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>Shortlist for DevOps Specialist</span>
            </button>
            <button
              onClick={() => handleAction('Rohan Deshmukh', 'View Sandbox Telemetry & Profiler')}
              className="w-full py-2 px-3 rounded-xl neu-flat hover:neu-inset font-semibold text-xs text-[#21163B] flex items-center justify-center gap-1.5 cursor-pointer"
            >
              <Eye className="w-3.5 h-3.5 text-purple-700" />
              <span>View Sandbox Telemetry</span>
            </button>
          </div>
        </div>
      </div>

      {/* 4. 5-VECTOR COMPETENCY OVERLAY & BRIDGIE NEURAL SYNTHESIS */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
        {/* Left: 5-Vector Radar SVG Visualization (4 cols) */}
        <div className="lg:col-span-4 neu-extruded rounded-2xl p-5 bg-white/70 space-y-3 border border-purple-100 flex flex-col justify-between">
          <div className="flex items-center justify-between">
            <span className="font-bold text-xs font-display text-[#21163B]">
              5-Vector Competency Overlay
            </span>
            <Layers className="w-4 h-4 text-[#7138E8]" />
          </div>

          {/* SVG Radar Chart Overlay */}
          <div className="relative aspect-square max-w-[280px] mx-auto flex items-center justify-center">
            <svg viewBox="0 0 300 300" className="w-full h-full">
              {/* Web concentric polygons */}
              {[120, 90, 60, 30].map((radius, i) => {
                const points = [0, 1, 2, 3, 4]
                  .map((idx) => {
                    const angle = (idx * 2 * Math.PI) / 5 - Math.PI / 2;
                    return `${150 + radius * Math.cos(angle)},${150 + radius * Math.sin(angle)}`;
                  })
                  .join(' ');
                return (
                  <polygon
                    key={i}
                    points={points}
                    fill="none"
                    stroke="#D9CEEE"
                    strokeWidth="1.2"
                    strokeDasharray={i === 0 ? 'none' : '3 3'}
                  />
                );
              })}

              {/* Axis lines */}
              {[0, 1, 2, 3, 4].map((idx) => {
                const angle = (idx * 2 * Math.PI) / 5 - Math.PI / 2;
                return (
                  <line
                    key={idx}
                    x1="150"
                    y1="150"
                    x2={150 + 120 * Math.cos(angle)}
                    y2={150 + 120 * Math.sin(angle)}
                    stroke="#D9CEEE"
                    strokeWidth="1.2"
                  />
                );
              })}

              {/* Ayush Sharma Polygon (Purple) */}
              <polygon
                points="150,42 254,122 222,234 82,238 46,126"
                fill="rgba(113, 56, 232, 0.25)"
                stroke="#7138E8"
                strokeWidth="2.5"
              />

              {/* Ananya Mishra Polygon (Fuchsia) */}
              <polygon
                points="150,58 262,118 206,242 96,220 54,136"
                fill="rgba(217, 70, 239, 0.20)"
                stroke="#D946EF"
                strokeWidth="2"
              />

              {/* Rohan Deshmukh Polygon (Slate/Gray) */}
              <polygon
                points="150,50 240,132 230,222 74,244 50,140"
                fill="rgba(71, 85, 105, 0.15)"
                stroke="#64748B"
                strokeWidth="1.5"
                strokeDasharray="4 2"
              />

              {/* Radar Corner Labels */}
              <text x="150" y="20" textAnchor="middle" fontSize="10" fontWeight="bold" fill="#21163B">Cloud & K8s</text>
              <text x="270" y="125" textAnchor="start" fontSize="10" fontWeight="bold" fill="#21163B">Messaging</text>
              <text x="225" y="270" textAnchor="middle" fontSize="10" fontWeight="bold" fill="#21163B">Telemetry</text>
              <text x="75" y="270" textAnchor="middle" fontSize="10" fontWeight="bold" fill="#21163B">DSA Rigor</text>
              <text x="30" y="125" textAnchor="end" fontSize="10" fontWeight="bold" fill="#21163B">mTLS Sec</text>
            </svg>
          </div>

          {/* Legend */}
          <div className="flex items-center justify-center space-x-4 text-[11px] pt-1 border-t border-purple-100">
            <span className="flex items-center gap-1.5 font-semibold text-[#7138E8]">
              <span className="w-2.5 h-2.5 rounded-full bg-[#7138E8]"></span>
              Ayush
            </span>
            <span className="flex items-center gap-1.5 font-semibold text-[#D946EF]">
              <span className="w-2.5 h-2.5 rounded-full bg-[#D946EF]"></span>
              Ananya
            </span>
            <span className="flex items-center gap-1.5 font-semibold text-slate-600">
              <span className="w-2.5 h-2.5 rounded-full bg-slate-500"></span>
              Rohan
            </span>
          </div>
        </div>

        {/* Right: BRIDGIE AI Neural Recruiter Synthesis (8 cols) */}
        <div className="lg:col-span-8 neu-extruded rounded-2xl p-5 bg-white/70 space-y-4 border border-purple-100 flex flex-col justify-between">
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="w-7 h-7 rounded-lg bg-gradient-to-tr from-[#7138E8] to-[#E75ACF] flex items-center justify-center text-white">
                  <Sparkles className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="font-bold text-xs font-display text-[#21163B]">
                    BRIDGIE AI Neural Recruiter Synthesis
                  </h3>
                  <span className="text-[10px] text-[#5F5675]">Autonomous Multi-Vector Candidate Evaluator</span>
                </div>
              </div>

              <div className="flex items-center gap-1.5 text-[11px] text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-full border border-emerald-200 font-semibold">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
                Confidence: 97.4%
              </div>
            </div>

            {/* Executive Synthesis Recommendation Box */}
            <div className="p-4 rounded-xl neu-inset space-y-2 text-xs text-[#21163B] leading-relaxed">
              <p>
                <strong className="text-[#7138E8]">Synthesis Recommendation:</strong>{' '}
                Ayush Sharma leads in live container orchestration and microservice throughput under adversarial load. Ananya Mishra excels significantly in low-latency event systems (Kafka/gRPC) and holds the top algorithmic solve index (99th percentile). Rohan Deshmukh is optimal for Terraform DevOps pipelines and zero-downtime deployment pipelines.
              </p>

              {/* Candidate Highlights Pills */}
              <div className="flex flex-wrap gap-2 pt-1 text-[11px]">
                <span className="neu-flat px-2.5 py-1 rounded-lg text-purple-900 font-semibold">
                  Ayush: 0 Memory Leaks in Go Live Pod
                </span>
                <span className="neu-flat px-2.5 py-1 rounded-lg text-indigo-900 font-semibold">
                  Ananya: 9.8ms execution time (Fastest)
                </span>
                <span className="neu-flat px-2.5 py-1 rounded-lg text-slate-800 font-semibold">
                  Rohan: Dual Blue/Green Automation Cert
                </span>
              </div>
            </div>
          </div>

          {/* Footer Metadata */}
          <div className="flex flex-wrap items-center justify-between text-[11px] text-[#5F5675] pt-2 border-t border-purple-100 gap-2">
            <span>Deterministic Scoring Algorithm v4.8 • SHA-256 Ledger Synchronized</span>
            <button
              onClick={() => setModalAction('Displaying raw telemetry waveforms and memory allocation charts for sandbox runs.')}
              className="text-[#7138E8] font-semibold hover:underline flex items-center gap-1 cursor-pointer"
            >
              <span>View Raw Telemetry Graphs</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>

      {/* 5. MULTI-VECTOR DIAGNOSTIC MATRIX */}
      <div className="neu-extruded rounded-2xl p-5 bg-white/70 space-y-5 border border-purple-100">
        <div className="flex flex-wrap items-center justify-between gap-3 border-b border-purple-100 pb-3">
          <div>
            <h3 className="text-base font-bold font-display text-[#21163B]">
              Multi-Vector Diagnostic Matrix
            </h3>
            <p className="text-xs text-[#5F5675]">
              Side-by-side granular breakdown across 4 primary technical & behavioral evaluation horizons.
            </p>
          </div>

          <div className="flex items-center gap-2 text-xs">
            <span className="text-[#5F5675]">View mode:</span>
            <button
              onClick={() => setViewMode('expanded')}
              className={`px-3 py-1 rounded-xl font-bold cursor-pointer transition-all ${
                viewMode === 'expanded' ? 'neu-inset text-[#7138E8]' : 'text-[#5F5675] hover:text-[#21163B]'
              }`}
            >
              Expanded
            </button>
            <button
              onClick={() => setViewMode('telemetry')}
              className={`px-3 py-1 rounded-xl font-bold cursor-pointer transition-all ${
                viewMode === 'telemetry' ? 'neu-inset text-[#7138E8]' : 'text-[#5F5675] hover:text-[#21163B]'
              }`}
            >
              Telemetry Raw
            </button>
          </div>
        </div>

        {/* SECTION 1: CORE TECHNICAL COMPETENCY & CODE RIGOR (35%) */}
        <div className="space-y-3">
          <div className="flex items-center justify-between text-xs font-bold text-[#21163B]">
            <span className="flex items-center gap-2">
              <Code2 className="w-4 h-4 text-[#7138E8]" />
              1. Core Technical Competency & Code Rigor
            </span>
            <span className="text-[#7138E8] bg-purple-100 px-2 py-0.5 rounded-full text-[10px]">
              Weight: 35%
            </span>
          </div>

          {/* Row: Cloud & Containers */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-3 p-3 rounded-xl neu-flat items-center text-xs">
            <div>
              <span className="font-bold text-[#21163B] block">Cloud & Containers</span>
              <span className="text-[10px] text-[#5F5675]">Docker, K8s, Ingress Config</span>
            </div>
            <div className="space-y-1">
              <div className="flex justify-between items-center text-[11px]">
                <span className="font-bold text-[#7138E8]">94%</span>
                <span className="text-[10px] bg-purple-100 text-[#7138E8] px-1.5 rounded">Live Container</span>
              </div>
              <div className="w-full bg-purple-100 h-1.5 rounded-full overflow-hidden">
                <div className="bg-[#7138E8] h-full rounded-full" style={{ width: '94%' }}></div>
              </div>
              <span className="text-[10px] text-[#5F5675] block">Zero pod thrashing under load</span>
            </div>
            <div className="space-y-1">
              <div className="flex justify-between items-center text-[11px]">
                <span className="font-bold text-indigo-700">82%</span>
                <span className="text-[10px] bg-indigo-100 text-indigo-700 px-1.5 rounded">Standard Deploy</span>
              </div>
              <div className="w-full bg-purple-100 h-1.5 rounded-full overflow-hidden">
                <div className="bg-indigo-600 h-full rounded-full" style={{ width: '82%' }}></div>
              </div>
              <span className="text-[10px] text-[#5F5675] block">Basic helm templates passed</span>
            </div>
            <div className="space-y-1">
              <div className="flex justify-between items-center text-[11px]">
                <span className="font-bold text-slate-800">89%</span>
                <span className="text-[10px] bg-purple-100 text-purple-700 px-1.5 rounded">IaC Helm Focus</span>
              </div>
              <div className="w-full bg-purple-100 h-1.5 rounded-full overflow-hidden">
                <div className="bg-purple-700 h-full rounded-full" style={{ width: '89%' }}></div>
              </div>
              <span className="text-[10px] text-[#5F5675] block">Modular Terraform configs</span>
            </div>
          </div>

          {/* Row: Distributed Concurrency */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-3 p-3 rounded-xl neu-flat items-center text-xs">
            <div>
              <span className="font-bold text-[#21163B] block">Distributed Concurrency</span>
              <span className="text-[10px] text-[#5F5675]">mTLS, Deadlock, Messaging</span>
            </div>
            <div className="space-y-1">
              <div className="flex justify-between items-center text-[11px]">
                <span className="font-bold text-[#7138E8]">89%</span>
                <span className="text-[10px] text-[#5F5675]">mTLS & Rate Limiting</span>
              </div>
              <div className="w-full bg-purple-100 h-1.5 rounded-full overflow-hidden">
                <div className="bg-[#7138E8] h-full rounded-full" style={{ width: '89%' }}></div>
              </div>
              <span className="text-[10px] text-[#5F5675] block">Implemented token-bucket limiter</span>
            </div>
            <div className="space-y-1">
              <div className="flex justify-between items-center text-[11px]">
                <span className="font-bold text-indigo-700">93%</span>
                <span className="text-[10px] text-indigo-700 font-bold">Kafka Event-Driven</span>
              </div>
              <div className="w-full bg-purple-100 h-1.5 rounded-full overflow-hidden">
                <div className="bg-indigo-600 h-full rounded-full" style={{ width: '93%' }}></div>
              </div>
              <span className="text-[10px] text-[#5F5675] block">Exactly-once consumer group</span>
            </div>
            <div className="space-y-1">
              <div className="flex justify-between items-center text-[11px]">
                <span className="font-bold text-slate-800">84%</span>
                <span className="text-[10px] text-[#5F5675]">Worker Queues</span>
              </div>
              <div className="w-full bg-purple-100 h-1.5 rounded-full overflow-hidden">
                <div className="bg-purple-700 h-full rounded-full" style={{ width: '84%' }}></div>
              </div>
              <span className="text-[10px] text-[#5F5675] block">Redis async background tasks</span>
            </div>
          </div>

          {/* Row: Backend Microservices */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-3 p-3 rounded-xl neu-flat items-center text-xs">
            <div>
              <span className="font-bold text-[#21163B] block">Backend Microservices</span>
              <span className="text-[10px] text-[#5F5675]">gRPC, Protobuf, REST</span>
            </div>
            <div className="space-y-1">
              <div className="flex justify-between items-center text-[11px]">
                <span className="font-bold text-[#7138E8]">92%</span>
                <span className="text-[10px] text-[#5F5675]">Go & FastAPI Services</span>
              </div>
              <span className="text-[10px] text-[#5F5675] block">Structured logging with OpenTelemetry</span>
            </div>
            <div className="space-y-1">
              <div className="flex justify-between items-center text-[11px]">
                <span className="font-bold text-indigo-700">94%</span>
                <span className="text-[10px] text-[#5F5675]">Go & High-throughput gRPC</span>
              </div>
              <span className="text-[10px] text-[#5F5675] block">Protobuf schema validation strict</span>
            </div>
            <div className="space-y-1">
              <div className="flex justify-between items-center text-[11px]">
                <span className="font-bold text-slate-800">85%</span>
                <span className="text-[10px] text-[#5F5675]">Python & FastAPI</span>
              </div>
              <span className="text-[10px] text-[#5F5675] block">SQLAlchemy async ORM setup</span>
            </div>
          </div>

          {/* Row: Algorithms & DSA */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-3 p-3 rounded-xl neu-flat items-center text-xs">
            <div>
              <span className="font-bold text-[#21163B] block">Algorithms & DSA</span>
              <span className="text-[10px] text-[#5F5675]">Complexity, Graphs, DP</span>
            </div>
            <div className="space-y-1">
              <div className="flex justify-between items-center text-[11px]">
                <span className="font-bold text-[#7138E8]">88%</span>
              </div>
              <span className="text-[10px] text-[#5F5675] block">Graph Traversal & BFS</span>
            </div>
            <div className="space-y-1">
              <div className="flex justify-between items-center text-[11px]">
                <span className="font-bold text-indigo-700">95% (99th Percentile)</span>
              </div>
              <span className="text-[10px] text-indigo-700 font-semibold block">LeetCode/CodeChef Master</span>
            </div>
            <div className="space-y-1">
              <div className="flex justify-between items-center text-[11px]">
                <span className="font-bold text-slate-800">86%</span>
              </div>
              <span className="text-[10px] text-[#5F5675] block">Tree Algorithms & Heaps</span>
            </div>
          </div>
        </div>

        {/* SECTION 2: PROCTORED DIAGNOSTIC TELEMETRY & INTEGRITY (20%) */}
        <div className="space-y-3 pt-3 border-t border-purple-100">
          <div className="flex items-center justify-between text-xs font-bold text-[#21163B]">
            <span className="flex items-center gap-2">
              <Shield className="w-4 h-4 text-[#7138E8]" />
              2. Proctored Diagnostic Telemetry & Integrity
            </span>
            <span className="text-[#7138E8] bg-purple-100 px-2 py-0.5 rounded-full text-[10px]">
              Weight: 20%
            </span>
          </div>

          {/* Row: Execution & Memory */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-3 p-3 rounded-xl neu-flat items-center text-xs">
            <div>
              <span className="font-bold text-[#21163B] block">Execution & Memory</span>
              <span className="text-[10px] text-[#5F5675]">Sandbox runtime profiler</span>
            </div>
            <div className="space-y-0.5">
              <div className="font-bold text-[#21163B]">12.4ms avg</div>
              <div className="text-[10px] text-emerald-700">0 Leaks Detected</div>
              <div className="text-[10px] text-[#5F5675]">Alloc: 14.2 MB peak</div>
            </div>
            <div className="space-y-0.5">
              <div className="font-bold text-indigo-700">9.8ms avg</div>
              <div className="text-[10px] text-emerald-700">0 Leaks Detected</div>
              <div className="text-[10px] text-indigo-700 font-semibold">Alloc: 8.6 MB peak [Optimum]</div>
            </div>
            <div className="space-y-0.5">
              <div className="font-bold text-slate-800">16.2ms avg</div>
              <div className="text-[10px] text-emerald-700">0 Leaks Detected</div>
              <div className="text-[10px] text-[#5F5675]">Alloc: 18.9 MB peak</div>
            </div>
          </div>

          {/* Row: Biometrics & Gaze Match */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-3 p-3 rounded-xl neu-flat items-center text-xs">
            <div>
              <span className="font-bold text-[#21163B] block">Biometrics & Gaze Match</span>
              <span className="text-[10px] text-[#5F5675]">AI Proctor Telemetry</span>
            </div>
            <div className="space-y-0.5">
              <span className="font-bold text-emerald-700 flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
                99.4% Match
              </span>
              <span className="text-[10px] text-[#5F5675] block">Single screen lock strict</span>
            </div>
            <div className="space-y-0.5">
              <span className="font-bold text-emerald-700 flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
                99.8% Match
              </span>
              <span className="text-[10px] text-[#5F5675] block">Flawless gaze sync</span>
            </div>
            <div className="space-y-0.5">
              <span className="font-bold text-emerald-700 flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
                98.9% Match
              </span>
              <span className="text-[10px] text-[#5F5675] block">Single webcam jitter cleared</span>
            </div>
          </div>

          {/* Keystroke Dynamics Verification Strip */}
          <div className="p-2 rounded-xl bg-purple-50/70 border border-purple-100 text-[11px] text-[#5F5675] flex items-center justify-between">
            <span className="flex items-center gap-1.5">
              <Lock className="w-3.5 h-3.5 text-purple-600" />
              Keystroke Dynamics & Nonce Verification:
            </span>
            <span className="font-mono font-bold text-purple-700">
              All 3 Synchronized on State Educational Blockchain #MP-NODAL-SHA256
            </span>
          </div>
        </div>

        {/* SECTION 3: AI CO-PILOT COLLABORATION (15%) */}
        <div className="space-y-3 pt-3 border-t border-purple-100">
          <div className="flex items-center justify-between text-xs font-bold text-[#21163B]">
            <span className="flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-[#7138E8]" />
              3. AI Co-Pilot Collaboration & Problem Solving
            </span>
            <span className="text-[#7138E8] bg-purple-100 px-2 py-0.5 rounded-full text-[10px]">
              Weight: 15%
            </span>
          </div>

          {/* Row: BRIDGIE Help */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-3 p-3 rounded-xl neu-flat items-center text-xs">
            <div>
              <span className="font-bold text-[#21163B] block">BRIDGIE Co-Pilot Help</span>
              <span className="text-[10px] text-[#5F5675]">Autonomous resolution SLA</span>
            </div>
            <div>
              <span className="font-bold text-[#7138E8] block">1 Hint Requested</span>
              <span className="text-[10px] text-[#5F5675]">Autonomous edge-case fix</span>
            </div>
            <div>
              <span className="font-bold text-emerald-700 block">0 Hints (Zero Assistance)</span>
              <span className="text-[10px] font-semibold text-emerald-800">100% Self-Solved</span>
            </div>
            <div>
              <span className="font-bold text-slate-800 block">2 Hints Requested</span>
              <span className="text-[10px] text-[#5F5675]">Syntax syntax-lookup only</span>
            </div>
          </div>

          {/* Row: Code Explainability */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-3 p-3 rounded-xl neu-flat items-center text-xs">
            <div>
              <span className="font-bold text-[#21163B] block">Code Explainability</span>
              <span className="text-[10px] text-[#5F5675]">Comments & Docstrings</span>
            </div>
            <div>
              <span className="font-bold text-[#7138E8] block">92%</span>
              <span className="text-[10px] text-[#5F5675]">Clean docstrings & architecture summary</span>
            </div>
            <div>
              <span className="font-bold text-indigo-700 block">96%</span>
              <span className="text-[10px] text-[#5F5675]">Exemplary markdown specification</span>
            </div>
            <div>
              <span className="font-bold text-slate-800 block">88%</span>
              <span className="text-[10px] text-[#5F5675]">Clear inline annotations</span>
            </div>
          </div>
        </div>

        {/* SECTION 4: INSTITUTIONAL CLEARANCE & AVAILABILITY */}
        <div className="space-y-3 pt-3 border-t border-purple-100">
          <div className="flex items-center justify-between text-xs font-bold text-[#21163B]">
            <span className="flex items-center gap-2">
              <Building className="w-4 h-4 text-[#7138E8]" />
              4. Institutional Clearance & Availability
            </span>
            <span className="text-purple-700 bg-purple-100 px-2 py-0.5 rounded-full text-[10px]">
              Institutional
            </span>
          </div>

          {/* Row: TPO Clearance SLA */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-3 p-3 rounded-xl neu-flat items-center text-xs">
            <div>
              <span className="font-bold text-[#21163B] block">TPO Clearance SLA</span>
              <span className="text-[10px] text-[#5F5675]">Campus Nodal Status</span>
            </div>
            <div>
              <span className="font-bold text-emerald-700 flex items-center gap-1">
                <CheckCircle className="w-3.5 h-3.5" />
                Cleared (RGPV TPO)
              </span>
              <span className="text-[10px] text-[#5F5675]">NOC Issued for 6-Month Intern</span>
            </div>
            <div>
              <span className="font-bold text-emerald-700 flex items-center gap-1">
                <CheckCircle className="w-3.5 h-3.5" />
                Cleared (RGPV TPO)
              </span>
              <span className="text-[10px] text-[#5F5675]">Aadhaar eKYC Verified</span>
            </div>
            <div>
              <span className="font-bold text-emerald-700 flex items-center gap-1">
                <CheckCircle className="w-3.5 h-3.5" />
                Cleared (SGSITS TPO)
              </span>
              <span className="text-[10px] text-[#5F5675]">Autonomous Clearance Complete</span>
            </div>
          </div>

          {/* Row: Joining Availability */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-3 p-3 rounded-xl neu-flat items-center text-xs">
            <div>
              <span className="font-bold text-[#21163B] block">Joining Availability</span>
              <span className="text-[10px] text-[#5F5675]">Earliest onboard date</span>
            </div>
            <div>
              <span className="font-bold text-[#7138E8] block">Immediate: 6-Month (Jan 2027)</span>
              <span className="text-[10px] text-[#5F5675]">Full-time conversion July 2027</span>
            </div>
            <div>
              <span className="font-bold text-indigo-700 block">Immediate (Jan 2027)</span>
              <span className="text-[10px] text-[#5F5675]">Full-time conversion July 2027</span>
            </div>
            <div>
              <span className="font-bold text-slate-800 block">Feb 2027 Onboarding</span>
              <span className="text-[10px] text-[#5F5675]">Semester thesis project aligned</span>
            </div>
          </div>
        </div>
      </div>

      {/* 6. SOVEREIGN REGULATORY FOOTER */}
      <div className="p-3.5 rounded-xl bg-purple-100/50 border border-purple-200/50 flex flex-wrap items-center justify-between text-[11px] text-[#5F5675] gap-3">
        <div className="flex flex-wrap items-center gap-3">
          <span className="flex items-center gap-1 font-semibold text-[#7138E8]">
            <Shield className="w-3.5 h-3.5" />
            Verified Higher Education Partner Consortium
          </span>
          <span>•</span>
          <span>AICTE Compliant</span>
          <span>•</span>
          <span>NAAC &apos;A++&apos; Accredited Institutions</span>
        </div>
        <div className="flex flex-wrap items-center gap-3">
          <span className="font-mono text-[10px]">Multi-Candidate Hash: 9f82...c71d</span>
          <span>•</span>
          <span>Data Governance & DPOP Act 2023 Compliant</span>
          <span>•</span>
          <span className="font-semibold text-emerald-800">MP Higher Education Nodal Authority Approved</span>
        </div>
      </div>

      {/* MODAL: ACTIONS FEEDBACK */}
      {modalAction && (
        <div className="fixed inset-0 z-50 bg-black/40 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-[#F3F0FF] rounded-3xl p-6 sm:p-7 max-w-md w-full neu-floating space-y-4 border border-white text-center">
            <div className="w-14 h-14 rounded-2xl bg-gradient-to-tr from-[#7138E8] to-[#E75ACF] mx-auto flex items-center justify-center text-white shadow-md">
              <Sparkles className="w-7 h-7" />
            </div>

            <h3 className="text-lg font-bold font-display text-[#21163B]">
              Action Dispatched Successfully
            </h3>

            <p className="text-xs text-[#5F5675] leading-relaxed">
              {modalAction}
            </p>

            <button
              onClick={() => setModalAction(null)}
              className="w-full py-2.5 rounded-xl btn-kinetic font-bold text-xs cursor-pointer text-white"
            >
              Continue Review
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
