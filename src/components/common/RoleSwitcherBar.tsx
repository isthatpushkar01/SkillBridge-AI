import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { ShieldCheck, GraduationCap, Building2, Briefcase, Eye, ChevronRight, Sparkles, CheckCircle2 } from 'lucide-react';
import { UserRole } from '../../types';

export const RoleSwitcherBar: React.FC = () => {
  const { currentRole, currentUser, quickLoginAs, navigateTo, currentRoute, setActiveModule } = useApp();
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <div className="sticky top-0 z-50 w-full bg-[#E9DFFF]/90 backdrop-blur-md border-b border-purple-200/60 shadow-xs px-3 py-1.5 transition-all text-xs">
      <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-2">
        <div className="flex items-center space-x-2">
          <span className="flex items-center gap-1 font-bold text-[#7138E8] bg-white/80 px-2 py-0.5 rounded-md border border-purple-200 shadow-2xs font-display">
            <Sparkles className="w-3.5 h-3.5 text-[#E75ACF]" />
            Ecosystem Tester
          </span>
          <span className="text-[#5F5675] hidden sm:inline">Active View:</span>
          <span className="font-bold text-[#21163B] capitalize flex items-center gap-1 bg-purple-100/80 px-2 py-0.5 rounded-md border border-purple-200/50">
            {currentRole === 'public' ? 'Public Landing' : `${currentRole} (${currentUser?.name?.split(' ')[0] || currentRole})`}
            {currentUser?.status === 'pending_approval' && (
              <span className="text-[10px] bg-amber-200 text-amber-900 px-1 rounded-sm font-semibold">
                Pending Approval
              </span>
            )}
          </span>
        </div>

        {/* Quick Jump Buttons */}
        <div className="flex items-center gap-1.5 overflow-x-auto py-0.5 scrollbar-none">
          <button
            onClick={() => quickLoginAs('public' as UserRole)}
            className={`px-2 py-1 rounded-lg font-medium transition-all flex items-center gap-1 cursor-pointer ${
              currentRole === 'public'
                ? 'bg-[#7138E8] text-white shadow-xs font-semibold'
                : 'bg-white/80 text-[#21163B] hover:bg-white hover:text-[#7138E8] border border-purple-100'
            }`}
          >
            <Eye className="w-3 h-3" />
            <span className="hidden md:inline">Public</span> Home
          </button>

          <button
            onClick={() => quickLoginAs('student', 'approved')}
            className={`px-2 py-1 rounded-lg font-medium transition-all flex items-center gap-1 cursor-pointer ${
              currentRole === 'student' && currentUser?.status === 'approved'
                ? 'bg-[#7138E8] text-white shadow-xs font-semibold'
                : 'bg-white/80 text-[#21163B] hover:bg-white hover:text-[#7138E8] border border-purple-100'
            }`}
          >
            <GraduationCap className="w-3 h-3 text-purple-600" />
            Student (Approved)
          </button>

          <button
            onClick={() => quickLoginAs('student', 'pending')}
            className={`px-2 py-1 rounded-lg font-medium transition-all flex items-center gap-1 cursor-pointer ${
              currentRole === 'student' && currentUser?.status === 'pending_approval'
                ? 'bg-amber-600 text-white shadow-xs font-semibold'
                : 'bg-amber-50 text-amber-900 hover:bg-amber-100 border border-amber-200'
            }`}
          >
            <span className="w-1.5 h-1.5 rounded-full bg-amber-500 animate-pulse"></span>
            Student (Pending)
          </button>

          <button
            onClick={() => quickLoginAs('tpo')}
            className={`px-2 py-1 rounded-lg font-medium transition-all flex items-center gap-1 cursor-pointer ${
              currentRole === 'tpo'
                ? 'bg-[#7138E8] text-white shadow-xs font-semibold'
                : 'bg-white/80 text-[#21163B] hover:bg-white hover:text-[#7138E8] border border-purple-100'
            }`}
          >
            <Building2 className="w-3 h-3 text-indigo-600" />
            TPO (Approvals)
          </button>

          <button
            onClick={() => quickLoginAs('recruiter', 'approved')}
            className={`px-2 py-1 rounded-lg font-medium transition-all flex items-center gap-1 cursor-pointer ${
              currentRole === 'recruiter' && currentUser?.status === 'approved'
                ? 'bg-[#7138E8] text-white shadow-xs font-semibold'
                : 'bg-white/80 text-[#21163B] hover:bg-white hover:text-[#7138E8] border border-purple-100'
            }`}
          >
            <Briefcase className="w-3 h-3 text-violet-600" />
            Recruiter (Hiring)
          </button>

          <button
            onClick={() => quickLoginAs('admin')}
            className={`px-2 py-1 rounded-lg font-medium transition-all flex items-center gap-1 cursor-pointer ${
              currentRole === 'admin'
                ? 'bg-[#7138E8] text-white shadow-xs font-semibold'
                : 'bg-white/80 text-[#21163B] hover:bg-white hover:text-[#7138E8] border border-purple-100'
            }`}
          >
            <ShieldCheck className="w-3 h-3 text-emerald-600" />
            Administration
          </button>

          <div className="hidden lg:block h-4 w-px bg-purple-300 mx-1"></div>

          {/* Direct Advanced Modules Jumpers */}
          <button
            onClick={() => {
              quickLoginAs('student', 'approved');
              setActiveModule('assessment');
            }}
            className="px-2 py-1 rounded-lg text-[11px] font-bold bg-purple-200/80 hover:bg-purple-300 text-purple-900 border border-purple-300 transition-all cursor-pointer flex items-center gap-1"
            title="Launch Proctored Go Ingress Diagnostic Simulator"
          >
            <span>🎯 Diagnostic IDE</span>
          </button>

          <button
            onClick={() => {
              quickLoginAs('recruiter', 'approved');
              setActiveModule('candidate-comparison');
            }}
            className="px-2 py-1 rounded-lg text-[11px] font-bold bg-purple-200/80 hover:bg-purple-300 text-purple-900 border border-purple-300 transition-all cursor-pointer flex items-center gap-1"
            title="Launch 3-Candidate Comparison Matrix & Radar"
          >
            <span>⚡ Comparison Engine</span>
          </button>

          <button
            onClick={() => {
              quickLoginAs('student', 'approved');
              setActiveModule('mock-interview');
            }}
            className="px-2 py-1 rounded-lg text-[11px] font-bold bg-purple-200/80 hover:bg-purple-300 text-purple-900 border border-purple-300 transition-all cursor-pointer flex items-center gap-1"
            title="Launch Dr. Elena Mock Interview Studio"
          >
            <span>🎙️ AI Mock Studio</span>
          </button>

          <button
            onClick={() => {
              quickLoginAs('admin');
              setActiveModule('directorate-governance');
            }}
            className="px-2 py-1 rounded-lg text-[11px] font-bold bg-purple-200/80 hover:bg-purple-300 text-purple-900 border border-purple-300 transition-all cursor-pointer flex items-center gap-1"
            title="Launch MP Higher Education Directorate Sovereign Command"
          >
            <span>🏛️ Directorate Command</span>
          </button>
        </div>
      </div>
    </div>
  );
};
