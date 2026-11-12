import React, { useState } from 'react';
import {
  FileText,
  Download,
  Calendar,
  Filter,
  CheckCircle2,
  Printer,
  FileSpreadsheet,
  Layers,
  Award,
  Shield,
  TrendingUp,
  Clock,
  Sparkles,
  ExternalLink,
  ChevronRight,
  Maximize2,
  RotateCcw,
} from 'lucide-react';
import confetti from 'canvas-confetti';

interface ReportCatalogItem {
  id: string;
  title: string;
  badge: string;
  badgeClass: string;
  subtext: string;
  complianceTag: string;
}

interface ReportHistoryItem {
  id: string;
  name: string;
  hash: string;
  size: string;
  timestamp: string;
  generatedBy: string;
  attestation: 'Verified' | 'Internal Cleared';
}

export const ReportsModule: React.FC = () => {
  const [selectedAcademicYear, setSelectedAcademicYear] = useState('2024-2025');
  const [selectedBranch, setSelectedBranch] = useState('All Departments (CSE, IT, ECE, ME, CE)');
  const [selectedCohort, setSelectedCohort] = useState('2025 Passing Out Batch');
  const [selectedFormat, setSelectedFormat] = useState<'pdf' | 'excel' | 'csv'>('pdf');
  const [activeCatalogItem, setActiveCatalogItem] = useState('Annual Campus Placement & Conversion');
  const [isGenerating, setIsGenerating] = useState(false);

  const reportCatalogs: ReportCatalogItem[] = [
    {
      id: 'rep-1',
      title: 'Student Registration & Onboarding Report',
      badge: '100% Onboarded',
      badgeClass: 'bg-emerald-100 text-emerald-800',
      subtext: '580 Students, 100% Onboarded',
      complianceTag: 'Daily Sync',
    },
    {
      id: 'rep-2',
      title: 'Student Verification & Nodal Clearance Dossier',
      badge: '16 Pending',
      badgeClass: 'bg-amber-100 text-amber-800',
      subtext: '564 Verified, 16 Pending',
      complianceTag: 'State Attested',
    },
    {
      id: 'rep-3',
      title: 'AI Employability Diagnostic Scorecard',
      badge: 'Avg 78.4',
      badgeClass: 'bg-purple-100 text-[#7138E8]',
      subtext: "Batch '25, Avg 78.4 Score",
      complianceTag: '6-Axis AI Metric',
    },
    {
      id: 'rep-4',
      title: 'Skill Assessment & Proctoring Integrity Audit',
      badge: '0.4% Glitch',
      badgeClass: 'bg-emerald-100 text-emerald-800',
      subtext: '418 Tests, 0.4% Glitch',
      complianceTag: 'ISO Certified',
    },
    {
      id: 'rep-5',
      title: 'Annual Campus Placement & Conversion',
      badge: '84.6% Placed',
      badgeClass: 'bg-purple-100 text-[#7138E8]',
      subtext: '84.6% Placed, ₹18.5 LPA Max',
      complianceTag: 'Flagship Report',
    },
    {
      id: 'rep-6',
      title: 'Job Application & Shortlisting Funnel Report',
      badge: '1,420 Funnel',
      badgeClass: 'bg-indigo-100 text-indigo-800',
      subtext: '1,420 Applications Tracked',
      complianceTag: 'Funnel Stats',
    },
    {
      id: 'rep-7',
      title: 'Recruiter Engagement & Drive Participation Audit',
      badge: '18 Partners',
      badgeClass: 'bg-purple-100 text-[#7138E8]',
      subtext: '18 Recruiter Partners Active',
      complianceTag: 'Corporate Tie-ups',
    },
    {
      id: 'rep-8',
      title: 'Campus Drive Execution & Offers Issued',
      badge: '29 Drives',
      badgeClass: 'bg-indigo-100 text-indigo-800',
      subtext: '29 Concluded Drives, 312 Shortlists',
      complianceTag: 'Direct Letters',
    },
    {
      id: 'rep-9',
      title: '6-Month Mandatory Internship Clearance',
      badge: '142 NOCs',
      badgeClass: 'bg-emerald-100 text-emerald-800',
      subtext: '142 NOCs Issued & Logged',
      complianceTag: 'RGPV Compliant',
    },
    {
      id: 'rep-10',
      title: 'Events, Hackathons & Technical Workshops',
      badge: '24 Conducted',
      badgeClass: 'bg-purple-100 text-[#7138E8]',
      subtext: '24 Conducted with Industry',
      complianceTag: 'IEEE/CSI Audited',
    },
    {
      id: 'rep-11',
      title: 'Department-Wise Placement Performance',
      badge: '5 Branches',
      badgeClass: 'bg-indigo-100 text-indigo-800',
      subtext: 'CSE, IT, ECE, ME, CE Comparison',
      complianceTag: 'Relative Delta',
    },
    {
      id: 'rep-12',
      title: 'Institutional Annual NAAC & AICTE Accreditation',
      badge: 'Criterion 5.2',
      badgeClass: 'bg-purple-100 text-[#7138E8]',
      subtext: 'Autonomous Quality Dossier',
      complianceTag: 'Statutory Return',
    },
  ];

  const reportHistory: ReportHistoryItem[] = [
    {
      id: 'rh-1',
      name: 'Annual_Employability_Audit_AY24.pdf',
      hash: '8f9c...43b2',
      size: '4.8 MB',
      timestamp: '18 Nov 2024',
      generatedBy: 'Dr. S. K. Verma',
      attestation: 'Verified',
    },
    {
      id: 'rh-2',
      name: 'NAAC_Placement_Criterion_5.2.pdf',
      hash: '2e1d...91aa',
      size: '12.2 MB',
      timestamp: '14 Nov 2024',
      generatedBy: 'Dr. S. K. Verma',
      attestation: 'Verified',
    },
    {
      id: 'rh-3',
      name: 'Recruiter_Requisition_Triage_Q3.xlsx',
      hash: '54c0...8721',
      size: '1.1 MB',
      timestamp: '08 Nov 2024',
      generatedBy: 'Placement Cell',
      attestation: 'Internal Cleared',
    },
    {
      id: 'rh-4',
      name: 'Student_NOC_Internship_Summary.pdf',
      hash: 'a93b...38fe',
      size: '2.4 MB',
      timestamp: '01 Nov 2024',
      generatedBy: 'Dr. S. K. Verma',
      attestation: 'Verified',
    },
  ];

  const handleApplyParameters = () => {
    setIsGenerating(true);
    setTimeout(() => {
      setIsGenerating(false);
      confetti({ particleCount: 50, spread: 60, origin: { y: 0.6 } });
    }, 700);
  };

  const handleDownload = (format: string) => {
    confetti({ particleCount: 40, spread: 50 });
    alert(`Downloading signed institutional docket: ${activeCatalogItem} in ${format.toUpperCase()} format (SHA-256 Verified).`);
  };

  return (
    <div className="space-y-6">
      {/* HEADER SECTION */}
      <div className="neu-extruded p-6 sm:p-8 rounded-3xl">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full neu-inset text-xs font-bold text-[#7138E8]">
              <span>TPO MODULE 05</span>
              <span>•</span>
              <span>State Sovereign Audited</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold font-display text-[#21163B] mt-2">
              Institutional Reports
            </h1>
            <p className="text-xs sm:text-sm text-[#5F5675]">
              Generate comprehensive academic, employability and placement performance reports with state verification.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-xs font-bold text-[#7138E8] bg-purple-100 px-3.5 py-2 rounded-xl border border-purple-200 flex items-center gap-2">
              <Shield className="w-4 h-4 text-[#7138E8]" />
              <span>STATE ATTESTATION STATUS: Ledger Signed (MP01)</span>
            </span>
          </div>
        </div>
      </div>

      {/* REPORT CATEGORIES DIRECTORY (12 CATALOGS GRID) */}
      <div className="neu-extruded p-6 sm:p-7 rounded-3xl space-y-4">
        <div className="flex flex-wrap items-center justify-between gap-2 pb-3 border-b border-purple-200/60">
          <div className="flex items-center gap-2">
            <h3 className="font-bold text-lg text-[#21163B] font-display">Report Categories Directory</h3>
            <span className="text-[10px] font-bold text-[#7138E8] bg-purple-100 px-2 py-0.5 rounded-md">
              12 Catalogs Available
            </span>
          </div>
          <button
            onClick={() => alert('Audit Matrix: 100% of generated institutional reports comply with AICTE / NBA Criterion 5.2.')}
            className="text-xs font-bold text-[#7138E8] hover:underline cursor-pointer"
          >
            Audit Matrix View →
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3.5">
          {reportCatalogs.map((cat) => {
            const isSelected = activeCatalogItem === cat.title;
            return (
              <div
                key={cat.id}
                onClick={() => setActiveCatalogItem(cat.title)}
                className={`p-4 rounded-2xl flex flex-col justify-between space-y-3 cursor-pointer transition-all ${
                  isSelected
                    ? 'neu-inset border border-[#7138E8] bg-white'
                    : 'neu-extruded-sm hover:border-purple-300'
                }`}
              >
                <div>
                  <div className="flex items-center justify-between">
                    <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${cat.badgeClass}`}>
                      {cat.badge}
                    </span>
                    <span className="text-[10px] text-[#5F5675] font-semibold">{cat.complianceTag}</span>
                  </div>
                  <h4 className="font-bold text-xs text-[#21163B] font-display mt-2.5 line-clamp-2">
                    {cat.title}
                  </h4>
                  <p className="text-[10px] text-[#5F5675] mt-1">{cat.subtext}</p>
                </div>

                <div className="pt-2 flex items-center justify-between text-[11px] font-bold text-[#7138E8]">
                  <span>Generate Docket</span>
                  <ChevronRight className="w-3.5 h-3.5" />
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* MULTI-DIMENSIONAL REPORT GENERATOR & FILTERS */}
      <div className="neu-extruded p-6 sm:p-7 rounded-3xl space-y-4">
        <div className="flex flex-wrap items-center justify-between gap-3 pb-3 border-b border-purple-200/60">
          <div>
            <h3 className="font-bold text-base text-[#21163B] font-display">
              Multi-Dimensional Report Generator & Filters
            </h3>
            <p className="text-xs text-[#5F5675]">
              Configure dynamic parameters to synthesize sovereign cryptographically-stamped institutional records.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => {
                setSelectedAcademicYear('2024-2025');
                setSelectedBranch('All Departments (CSE, IT, ECE, ME, CE)');
                setSelectedCohort('2025 Passing Out Batch');
              }}
              className="btn-tactile px-3 py-1.5 rounded-xl text-xs font-semibold cursor-pointer"
            >
              Reset Filters
            </button>
            <button
              onClick={handleApplyParameters}
              className="btn-kinetic px-4 py-1.5 rounded-xl text-xs font-bold cursor-pointer shadow-md"
            >
              Apply Parameters
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 text-xs">
          <div>
            <label className="block font-semibold mb-1 text-[#5F5675]">Academic Year</label>
            <select
              value={selectedAcademicYear}
              onChange={(e) => setSelectedAcademicYear(e.target.value)}
              className="neu-input w-full px-3 py-2 rounded-xl"
            >
              <option value="2024-2025">2024–2025</option>
              <option value="2023-2024">2023–2024</option>
              <option value="2022-2023">2022–2023</option>
            </select>
          </div>

          <div>
            <label className="block font-semibold mb-1 text-[#5F5675]">Department / Branch</label>
            <select
              value={selectedBranch}
              onChange={(e) => setSelectedBranch(e.target.value)}
              className="neu-input w-full px-3 py-2 rounded-xl"
            >
              <option value="All Departments (CSE, IT, ECE, ME, CE)">All Departments (CSE, IT, ECE, ME, CE)</option>
              <option value="CSE">Computer Science & Engineering</option>
              <option value="IT">Information Technology</option>
              <option value="ECE">Electronics & Communication</option>
              <option value="ME">Mechanical Engineering</option>
              <option value="CE">Civil Engineering</option>
            </select>
          </div>

          <div>
            <label className="block font-semibold mb-1 text-[#5F5675]">Graduation Cohort</label>
            <select
              value={selectedCohort}
              onChange={(e) => setSelectedCohort(e.target.value)}
              className="neu-input w-full px-3 py-2 rounded-xl"
            >
              <option value="2025 Passing Out Batch">2025 Passing Out Batch</option>
              <option value="2024 Passing Out Batch">2024 Passing Out Batch</option>
              <option value="2026 Pre-Final Cohort">2026 Pre-Final Cohort</option>
            </select>
          </div>

          <div>
            <label className="block font-semibold mb-1 text-[#5F5675]">Date Range</label>
            <input
              type="text"
              readOnly
              value="01 Jul 2024 — 30 Nov 2024"
              className="neu-input w-full px-3 py-2 rounded-xl cursor-default"
            />
          </div>
        </div>

        {/* Export Format Selector */}
        <div className="flex flex-wrap items-center justify-between gap-3 pt-3 border-t border-purple-100 text-xs">
          <div className="flex items-center gap-2">
            <span className="text-[#5F5675] font-semibold">EXPORT FORMAT:</span>
            <div className="flex gap-1.5">
              <button
                onClick={() => setSelectedFormat('pdf')}
                className={`px-3 py-1.5 rounded-xl font-bold cursor-pointer transition-all ${
                  selectedFormat === 'pdf' ? 'btn-kinetic text-white shadow-xs' : 'neu-inset text-[#5F5675]'
                }`}
              >
                PDF (Cryptographically Signed)
              </button>
              <button
                onClick={() => setSelectedFormat('excel')}
                className={`px-3 py-1.5 rounded-xl font-bold cursor-pointer transition-all ${
                  selectedFormat === 'excel' ? 'btn-kinetic text-white shadow-xs' : 'neu-inset text-[#5F5675]'
                }`}
              >
                Excel (.xlsx)
              </button>
              <button
                onClick={() => setSelectedFormat('csv')}
                className={`px-3 py-1.5 rounded-xl font-bold cursor-pointer transition-all ${
                  selectedFormat === 'csv' ? 'btn-kinetic text-white shadow-xs' : 'neu-inset text-[#5F5675]'
                }`}
              >
                CSV
              </button>
              <button
                onClick={() => window.print()}
                className="px-3 py-1.5 rounded-xl neu-inset font-bold text-[#5F5675] hover:text-[#21163B] cursor-pointer flex items-center gap-1"
              >
                <Printer className="w-3.5 h-3.5" />
                <span>Print Preview</span>
              </button>
            </div>
          </div>

          <span className="text-[11px] font-mono text-[#5F5675]">
            DTE Encryption: Active SHA-256
          </span>
        </div>
      </div>

      {/* LIVE DOCUMENT PREVIEW PANE */}
      <div className="neu-extruded p-6 sm:p-8 rounded-3xl space-y-5 bg-white border border-purple-100">
        <div className="flex flex-wrap items-center justify-between gap-3 pb-3 border-b border-purple-200/60">
          <div className="flex items-center gap-2">
            <h3 className="font-bold text-base text-[#21163B] font-display">Live Document Preview Pane</h3>
            <span className="text-[10px] text-[#5F5675] font-mono">
              Institutional Placement Performance Report AY 2024-25
            </span>
          </div>

          <div className="flex items-center gap-2 text-xs">
            <span className="font-mono text-[#5F5675]">100%</span>
            <button
              onClick={() => alert('Maximized High-Resolution Inspection Mode')}
              className="p-1 rounded-lg neu-inset text-[#5F5675] hover:text-[#7138E8] cursor-pointer"
            >
              <Maximize2 className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* The Printable Official Docket Document Preview */}
        <div className="p-6 sm:p-8 rounded-2xl bg-[#FEFCFF] border border-purple-200/70 space-y-6 text-xs shadow-xs">
          {/* Institution Header Block */}
          <div className="flex flex-wrap items-start justify-between gap-4 pb-4 border-b-2 border-purple-300">
            <div className="flex items-start gap-3">
              <div className="w-12 h-12 rounded-2xl bg-purple-100 p-2 flex items-center justify-center shrink-0 border border-purple-200">
                <img src="/skillbridge-icon.svg" alt="RGPV" className="w-9 h-9 object-contain" />
              </div>
              <div>
                <h2 className="text-base sm:text-lg font-bold font-display text-[#21163B] tracking-tight">
                  UNIVERSITY INSTITUTE OF TECHNOLOGY (UIT–RGPV)
                </h2>
                <p className="text-[11px] text-[#5F5675]">
                  Rajiv Gandhi Proudyogiki Vishwavidyalaya, Airport Road, Bhopal, MP - 462033
                </p>
                <span className="text-[10px] font-bold text-[#7138E8]">
                  Autonomous State University of Madhya Pradesh
                </span>
              </div>
            </div>

            <div className="text-right">
              <span className="text-[10px] font-bold uppercase tracking-wider text-purple-800 bg-purple-50 px-2.5 py-1 rounded-md border border-purple-200 block">
                SKILLBRIDGE AI DIRECTORATE STATE NODAL CLEARANCE
              </span>
              <span className="text-[10px] font-mono text-[#5F5675] block mt-1">
                AUTH #MP-HE-0918-BPL
              </span>
            </div>
          </div>

          {/* Title Banner */}
          <div className="text-center py-2 bg-purple-50/60 rounded-xl border border-purple-100">
            <span className="text-[10px] font-bold uppercase tracking-wider text-[#7138E8] block">
              OFFICIAL EXECUTIVE PERFORMANCE DOCKET
            </span>
            <h3 className="text-xl font-extrabold font-display text-[#21163B] mt-0.5">
              Institutional Placement Performance Report AY 2024–25
            </h3>
            <p className="text-[10px] text-[#5F5675] mt-0.5">
              Formulated in compliance with AICTE / NAAC Quality Assurance Manual Criterion 5.2.1
            </p>
          </div>

          {/* Metadata Row */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 p-3 rounded-xl bg-purple-50/40 text-[11px]">
            <div>
              <span className="text-[#5F5675]">Generated on:</span> <strong>18 Nov 2024</strong>
            </div>
            <div>
              <span className="text-[#5F5675]">Generated by:</span> <strong>Dr. S. K. Verma (Head TPO)</strong>
            </div>
            <div className="sm:text-right font-mono">
              <span className="text-[#5F5675]">State Directorate Key:</span> <strong className="text-[#7138E8]">#NODAL-UIT-MP01-KEY</strong>
            </div>
          </div>

          {/* Key Metrics Strip */}
          <div className="grid grid-cols-2 sm:grid-cols-5 gap-3 text-center">
            <div className="p-3 rounded-xl bg-purple-50/50 border border-purple-100">
              <span className="text-[10px] text-[#5F5675] uppercase block">TOTAL ELIGIBLE</span>
              <span className="text-xl font-extrabold text-[#21163B]">580</span>
              <span className="text-[9px] text-[#5F5675] block">Final Year Batch</span>
            </div>
            <div className="p-3 rounded-xl bg-purple-50/50 border border-purple-100">
              <span className="text-[10px] text-[#5F5675] uppercase block">TOTAL OFFERS</span>
              <span className="text-xl font-extrabold text-[#7138E8]">491</span>
              <span className="text-[9px] text-[#5F5675] block">1.18 per placed</span>
            </div>
            <div className="p-3 rounded-xl bg-emerald-50 border border-emerald-200">
              <span className="text-[10px] text-emerald-800 uppercase font-bold block">PLACED</span>
              <span className="text-xl font-extrabold text-emerald-600">84.6%</span>
              <span className="text-[9px] text-emerald-700 font-bold block">+5.2% vs AY23</span>
            </div>
            <div className="p-3 rounded-xl bg-purple-50/50 border border-purple-100">
              <span className="text-[10px] text-[#5F5675] uppercase block">HIGHEST PACKAGE</span>
              <span className="text-xl font-extrabold text-[#21163B]">₹22.0 LPA</span>
              <span className="text-[9px] text-[#5F5675] block">Tier-1 Cloud Corp</span>
            </div>
            <div className="p-3 rounded-xl bg-purple-50/50 border border-purple-100">
              <span className="text-[10px] text-[#5F5675] uppercase block">MEDIAN PACKAGE</span>
              <span className="text-xl font-extrabold text-[#7138E8]">₹8.4 LPA</span>
              <span className="text-[9px] text-[#5F5675] block">State Benchmark 5.2</span>
            </div>
          </div>

          {/* Branch-Wise Placement Conversion Performance Index */}
          <div className="space-y-2.5 pt-2">
            <div className="flex justify-between items-center">
              <span className="font-bold text-xs text-[#21163B]">
                Branch-Wise Placement Conversion Performance Index
              </span>
              <span className="text-[10px] text-[#5F5675]">Verified by State AI Model</span>
            </div>

            {[
              { name: 'Computer Science & Engineering (CSE)', pct: 88.2, count: '142/161 Students' },
              { name: 'Information Technology (IT)', pct: 86.4, count: '95/110 Students' },
              { name: 'Electronics & Communication (ECE)', pct: 79.1, count: '87/110 Students' },
              { name: 'Mechanical Engineering (ME)', pct: 68.3, count: '69/101 Students' },
              { name: 'Civil Engineering (CE)', pct: 64.0, count: '62/97 Students' },
            ].map((br, idx) => (
              <div key={idx} className="space-y-1">
                <div className="flex justify-between text-[11px] font-semibold">
                  <span className="text-[#21163B]">{br.name}</span>
                  <span className="text-[#7138E8]">{br.pct}% ({br.count})</span>
                </div>
                <div className="w-full bg-[#E9DFFF] h-2 rounded-full overflow-hidden">
                  <div className="bg-[#7138E8] h-full rounded-full" style={{ width: `${br.pct}%` }}></div>
                </div>
              </div>
            ))}
          </div>

          {/* Dual Attestation Signatures Block */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-5 border-t border-purple-200">
            <div className="neu-inset p-3.5 rounded-xl text-xs space-y-1">
              <div className="flex items-center gap-2 text-[#7138E8] font-bold">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                <span>E-SIGN VERIFIED</span>
              </div>
              <strong className="text-[#21163B] block">Dr. S. K. Verma</strong>
              <span className="text-[10px] text-[#5F5675] block">
                Head, Training & Placement Cell • UIT-RGPV Bhopal
              </span>
              <span className="text-[9px] font-mono text-[#5F5675] block">
                SHA256: 082e...1aef
              </span>
            </div>

            <div className="neu-inset p-3.5 rounded-xl text-xs space-y-1 border border-purple-300">
              <div className="flex items-center gap-2 text-purple-800 font-bold">
                <Shield className="w-4 h-4 text-[#7138E8]" />
                <span>GAZETTE SIGNED</span>
              </div>
              <strong className="text-[#21163B] block">
                Directorate of Technical Education MP
              </strong>
              <span className="text-[10px] text-[#5F5675] block">
                Sovereign Central Education Ledger
              </span>
              <span className="text-[9px] font-mono text-[#7138E8] block">
                SOVEREIGN-AUDIT-PASS-2024
              </span>
            </div>
          </div>
        </div>

        {/* DIRECT DOCKET DISPATCH BUTTONS */}
        <div className="pt-2 flex flex-wrap items-center justify-between gap-3 border-t border-purple-200/60 text-xs">
          <div>
            <span className="font-bold text-[#21163B] block">Direct Docket Dispatch</span>
            <span className="text-[10px] text-[#5F5675]">Download or transmit verified records directly to state databases.</span>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <button
              onClick={() => handleDownload('pdf')}
              className="btn-kinetic px-4 py-2 rounded-xl font-bold flex items-center gap-1.5 cursor-pointer shadow-md"
            >
              <Download className="w-4 h-4" />
              <span>Download PDF (Signed)</span>
            </button>
            <button
              onClick={() => handleDownload('excel')}
              className="btn-tactile px-3 py-2 rounded-xl font-bold text-[#7138E8] flex items-center gap-1.5 cursor-pointer"
            >
              <FileSpreadsheet className="w-4 h-4" />
              <span>Export Excel</span>
            </button>
            <button
              onClick={() => handleDownload('csv')}
              className="btn-tactile px-3 py-2 rounded-xl font-bold text-[#7138E8] flex items-center gap-1.5 cursor-pointer"
            >
              <FileText className="w-4 h-4" />
              <span>Export CSV</span>
            </button>
            <button
              onClick={() => window.print()}
              className="btn-tactile px-3 py-2 rounded-xl font-bold text-[#5F5675] flex items-center gap-1.5 cursor-pointer"
            >
              <Printer className="w-4 h-4" />
              <span>Print Official Docket</span>
            </button>
          </div>
        </div>
      </div>

      {/* REPORT GENERATION HISTORY */}
      <div className="neu-extruded p-6 sm:p-7 rounded-3xl space-y-4">
        <div className="flex flex-wrap items-center justify-between gap-3 pb-3 border-b border-purple-200/60">
          <div>
            <h3 className="font-bold text-lg text-[#21163B] font-display">Report Generation History</h3>
            <span className="text-[10px] font-mono text-[#5F5675]">State Sovereign Ledger</span>
          </div>
          <button
            onClick={() => alert('Immutable audit log: 48 historical dockets verified against MP State Secretariat Root Key.')}
            className="text-xs font-bold text-[#7138E8] hover:underline cursor-pointer"
          >
            View Full Cryptographic Audit ↗
          </button>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-purple-200/60 text-[#5F5675] font-semibold uppercase text-[10px]">
                <th className="py-3 px-3">Report Document Name</th>
                <th className="py-3 px-3">File Size</th>
                <th className="py-3 px-3">Timestamp</th>
                <th className="py-3 px-3">Generated By</th>
                <th className="py-3 px-3">Attestation</th>
                <th className="py-3 px-3 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-purple-100">
              {reportHistory.map((item) => (
                <tr key={item.id} className="hover:bg-purple-50/50 transition-colors">
                  <td className="py-3 px-3">
                    <strong className="text-[#21163B] font-bold block">{item.name}</strong>
                    <span className="text-[10px] text-[#5F5675] font-mono">HASH: {item.hash}</span>
                  </td>
                  <td className="py-3 px-3 text-[#5F5675] font-semibold">{item.size}</td>
                  <td className="py-3 px-3 text-[#5F5675]">{item.timestamp}</td>
                  <td className="py-3 px-3 font-semibold text-[#21163B]">{item.generatedBy}</td>
                  <td className="py-3 px-3">
                    <span
                      className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold ${
                        item.attestation === 'Verified'
                          ? 'bg-emerald-100 text-emerald-800'
                          : 'bg-purple-100 text-[#7138E8]'
                      }`}
                    >
                      <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                      {item.attestation}
                    </span>
                  </td>
                  <td className="py-3 px-3 text-right">
                    <div className="inline-flex items-center gap-2">
                      <button
                        onClick={() => handleDownload('pdf')}
                        className="text-xs font-bold text-[#7138E8] hover:underline cursor-pointer"
                      >
                        Download
                      </button>
                      <button
                        onClick={() => alert(`Verified SHA-256 block hash for ${item.name}: Authenticity validated by Directorate Root MP-01.`)}
                        className="text-xs font-bold text-[#5F5675] hover:underline cursor-pointer"
                      >
                        Verify
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="pt-3 border-t border-purple-100 flex items-center justify-between text-xs text-[#5F5675]">
          <span>Showing 4 of 48 historical generated dockets</span>
          <div className="flex items-center gap-1">
            <button className="px-2 py-0.5 rounded neu-inset text-xs font-semibold cursor-pointer">Previous</button>
            <button className="px-2.5 py-0.5 rounded btn-kinetic text-white text-xs font-bold">1</button>
            <button className="px-2.5 py-0.5 rounded neu-inset text-xs font-semibold cursor-pointer">2</button>
            <button className="px-2 py-0.5 rounded neu-inset text-xs font-semibold cursor-pointer">Next</button>
          </div>
        </div>
      </div>
    </div>
  );
};
