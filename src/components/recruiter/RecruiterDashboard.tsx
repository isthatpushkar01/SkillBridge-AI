import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { RecruiterProfile, Application, ApplicationStage, StudentProfile } from '../../types';
import confetti from 'canvas-confetti';
import { CandidateComparisonEngine } from '../modules/CandidateComparisonEngine';
import {
  Award,
  BarChart3,
  Briefcase,
  Building,
  Calendar,
  CheckCircle2,
  ChevronRight,
  Clock,
  Code2,
  Cpu,
  ExternalLink,
  Eye,
  Filter,
  GraduationCap,
  Layers,
  MapPin,
  MessageSquare,
  Plus,
  School,
  Search,
  Settings,
  Shield,
  Sparkles,
  Target,
  TrendingUp,
  UserCheck,
  Users,
  X,
} from 'lucide-react';

export const RecruiterDashboard: React.FC = () => {
  const {
    currentUser,
    activeModule,
    setActiveModule,
    students,
    jobs,
    applications,
    updateApplicationStage,
    postNewJob,
    colleges,
  } = useApp();

  const recruiter = currentUser as RecruiterProfile;

  // Search & Filter State in Find Talent
  const [skillQuery, setSkillQuery] = useState('');
  const [minCgpa, setMinCgpa] = useState<number>(7.5);
  const [minScore, setMinScore] = useState<number>(75);
  const [selectedStudentForCompare, setSelectedStudentForCompare] = useState<StudentProfile | null>(null);

  // New Job Modal State
  const [showPostJobModal, setShowPostJobModal] = useState(false);
  const [newJobForm, setNewJobForm] = useState({
    title: '',
    location: 'Indore, MP / Hybrid',
    salary: '8.5 - 12 LPA',
    type: 'Full-time' as const,
    minCgpa: 7.5,
    requiredSkills: 'TypeScript & React, Node.js, PostgreSQL',
    preferredSkills: 'Docker, AWS',
    description: '',
    deadline: '2026-12-31',
    eligibleBranches: ['Computer Science and Engineering', 'Information Technology'],
  });

  // Schedule Interview State
  const [selectedAppForInterview, setSelectedAppForInterview] = useState<Application | null>(null);
  const [interviewDateInput, setInterviewDateInput] = useState('2026-11-20T10:00');
  const [interviewNotesInput, setInterviewNotesInput] = useState('');

  const handleCreateJob = (e: React.FormEvent) => {
    e.preventDefault();
    postNewJob({
      ...newJobForm,
      requiredSkills: newJobForm.requiredSkills.split(',').map((s) => s.trim()),
      preferredSkills: newJobForm.preferredSkills.split(',').map((s) => s.trim()),
    });
    confetti({ particleCount: 60, spread: 60, origin: { y: 0.6 } });
    setShowPostJobModal(false);
  };

  const handleStageChange = (appId: string, newStage: ApplicationStage) => {
    updateApplicationStage(appId, newStage);
  };

  const handleScheduleInterview = () => {
    if (!selectedAppForInterview) return;
    updateApplicationStage(
      selectedAppForInterview.id,
      'Interview Scheduled',
      interviewNotesInput || 'Scheduled for technical assessment round.',
      interviewDateInput
    );
    setSelectedAppForInterview(null);
  };

  const pipelineStages: ApplicationStage[] = [
    'Received',
    'Under Review',
    'Shortlisted',
    'Interview Scheduled',
    'Selected',
    'Rejected',
  ];

  // Candidates filtered for talent search
  const verifiedCandidates = students.filter((s) => {
    const matchesCgpa = s.cgpa >= minCgpa;
    const matchesScore = s.employabilityScore >= minScore;
    const matchesSkill =
      !skillQuery ||
      s.verifiedSkills.some((sk) => sk.name.toLowerCase().includes(skillQuery.toLowerCase()));
    return matchesCgpa && matchesScore && matchesSkill;
  });

  return (
    <div className="space-y-6">
      {/* 2. CANDIDATE COMPARISON MATRIX (ADVANCED AI MODULE) */}
      {activeModule === 'candidate-comparison' && (
        <CandidateComparisonEngine onBack={() => setActiveModule('overview')} />
      )}

      {/* 1. DASHBOARD OVERVIEW */}
      {activeModule === 'overview' && (
        <div className="space-y-6">
          <div className="neu-extruded p-6 sm:p-8 rounded-3xl">
            <div className="flex flex-wrap items-center justify-between gap-4">
              <div>
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full neu-inset text-xs font-bold text-[#7138E8]">
                  <Building className="w-3.5 h-3.5 text-[#E75ACF]" />
                  <span>{recruiter?.companyName || 'Tata Consultancy Services'}</span>
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
                </div>
                <h1 className="text-2xl sm:text-3xl font-extrabold font-display text-[#21163B] mt-2">
                  Welcome, {recruiter?.name || 'Recruiter'}
                </h1>
                <p className="text-xs sm:text-sm text-[#5F5675]">
                  {recruiter?.designation} • {recruiter?.hiringDomain}
                </p>
              </div>

              <button
                onClick={() => setShowPostJobModal(true)}
                className="btn-kinetic px-5 py-2.5 rounded-xl text-xs font-bold flex items-center gap-2 cursor-pointer shadow-md"
              >
                <Plus className="w-4 h-4" />
                <span>Post New Campus Job</span>
              </button>
            </div>

            {/* Recruiter Metrics */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6">
              <div className="neu-inset p-4 rounded-2xl text-center">
                <span className="text-[11px] text-[#5F5675] block">Active Job Drives</span>
                <span className="text-2xl font-extrabold font-display text-[#7138E8]">
                  {jobs.filter((j) => j.recruiterId === recruiter.id || j.company.includes('TCS')).length}
                </span>
                <span className="text-[10px] text-purple-700 font-semibold block mt-0.5">Indore Hub</span>
              </div>
              <div className="neu-inset p-4 rounded-2xl text-center">
                <span className="text-[11px] text-[#5F5675] block">Candidates in Funnel</span>
                <span className="text-2xl font-extrabold font-display text-emerald-600">
                  {applications.length}
                </span>
                <span className="text-[10px] text-emerald-700 font-semibold block mt-0.5">Pre-verified</span>
              </div>
              <div className="neu-inset p-4 rounded-2xl text-center">
                <span className="text-[11px] text-[#5F5675] block">Interview Conversion</span>
                <span className="text-2xl font-extrabold font-display text-[#21163B]">78.4%</span>
                <span className="text-[10px] text-indigo-700 font-semibold block mt-0.5">High Quality Ratio</span>
              </div>
              <div className="neu-inset p-4 rounded-2xl text-center">
                <span className="text-[11px] text-[#5F5675] block">Partner MP Colleges</span>
                <span className="text-2xl font-extrabold font-display text-violet-600">{colleges.length}</span>
                <span className="text-[10px] text-violet-700 font-semibold block mt-0.5">State-wide</span>
              </div>
            </div>
          </div>

          {/* Quick Shortcuts */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div
              onClick={() => setActiveModule('talent')}
              className="neu-extruded p-5 rounded-2xl cursor-pointer hover:border-purple-300 transition-all flex items-center justify-between"
            >
              <div>
                <h3 className="font-bold text-sm text-[#21163B] font-display">Find Verified Talent</h3>
                <p className="text-[11px] text-[#5F5675] mt-0.5">Search by cryptographic skill proofs</p>
              </div>
              <Users className="w-5 h-5 text-[#7138E8]" />
            </div>

            <div
              onClick={() => setActiveModule('applications-funnel')}
              className="neu-extruded p-5 rounded-2xl cursor-pointer hover:border-purple-300 transition-all flex items-center justify-between"
            >
              <div>
                <h3 className="font-bold text-sm text-[#21163B] font-display">Applications Pipeline</h3>
                <p className="text-[11px] text-[#5F5675] mt-0.5">Manage candidate stages</p>
              </div>
              <Layers className="w-5 h-5 text-[#963DF5]" />
            </div>

            <div
              onClick={() => setActiveModule('ai-matching')}
              className="neu-extruded p-5 rounded-2xl cursor-pointer hover:border-purple-300 transition-all flex items-center justify-between"
            >
              <div>
                <h3 className="font-bold text-sm text-[#21163B] font-display">AI Talent Matching</h3>
                <p className="text-[11px] text-[#5F5675] mt-0.5">Predictive hiring conversion</p>
              </div>
              <Sparkles className="w-5 h-5 text-[#E75ACF]" />
            </div>
          </div>
        </div>
      )}

      {/* 3. FIND TALENT & 4. AI TALENT MATCHING & 9. SKILL-BASED SEARCH */}
      {(activeModule === 'talent' || activeModule === 'ai-matching' || activeModule === 'skill-search') && (
        <div className="neu-extruded p-6 sm:p-8 rounded-3xl space-y-6">
          <div className="flex flex-wrap items-center justify-between gap-4 pb-4 border-b border-purple-200/60">
            <div>
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full neu-inset text-xs font-bold text-[#7138E8]">
                <Sparkles className="w-3.5 h-3.5 text-[#E75ACF]" />
                <span>Zero Resume Inflation Search</span>
              </div>
              <h2 className="text-2xl font-bold font-display text-[#21163B] mt-1.5">
                AI Talent Matching & Verified Candidate Discovery
              </h2>
              <p className="text-xs text-[#5F5675]">
                Candidate scores and code repositories are verified via SHA-256 proof hashes. Recruiters cannot alter student scores.
              </p>
            </div>
            <span className="text-xs font-bold text-[#7138E8] bg-purple-100 px-3 py-1 rounded-full">
              {verifiedCandidates.length} Matched Profiles
            </span>
          </div>

          {/* Granular Candidate Filters */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 p-3 neu-inset rounded-2xl text-xs">
            <div>
              <label className="block text-[11px] font-semibold text-[#5F5675] mb-1">Skill Keyword</label>
              <input
                type="text"
                placeholder="e.g. React, Python, PostgreSQL..."
                value={skillQuery}
                onChange={(e) => setSkillQuery(e.target.value)}
                className="neu-input w-full px-3 py-1.5 rounded-xl"
              />
            </div>
            <div>
              <label className="block text-[11px] font-semibold text-[#5F5675] mb-1">Minimum CGPA: {minCgpa}</label>
              <input
                type="range"
                min="6.0"
                max="9.5"
                step="0.5"
                value={minCgpa}
                onChange={(e) => setMinCgpa(Number(e.target.value))}
                className="w-full accent-[#7138E8]"
              />
            </div>
            <div>
              <label className="block text-[11px] font-semibold text-[#5F5675] mb-1">
                Min Employability Readiness: {minScore}/100
              </label>
              <input
                type="range"
                min="60"
                max="95"
                step="5"
                value={minScore}
                onChange={(e) => setMinScore(Number(e.target.value))}
                className="w-full accent-[#7138E8]"
              />
            </div>
          </div>

          {/* Candidate Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {verifiedCandidates.map((cand) => (
              <div key={cand.id} className="neu-extruded p-5 rounded-2xl flex flex-col justify-between space-y-3">
                <div>
                  <div className="flex items-center space-x-3">
                    <img src={cand.avatar} alt={cand.name} className="w-12 h-12 rounded-xl object-cover border border-white" />
                    <div>
                      <h4 className="font-bold text-sm text-[#21163B] font-display">{cand.name}</h4>
                      <p className="text-[11px] text-[#5F5675]">{cand.college.split('(')[0]}</p>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-2 mt-3 neu-inset p-2 rounded-xl text-center text-xs">
                    <div>
                      <span className="text-[10px] text-[#5F5675] block">CGPA</span>
                      <span className="font-bold text-[#21163B]">{cand.cgpa.toFixed(2)}</span>
                    </div>
                    <div>
                      <span className="text-[10px] text-[#5F5675] block">Employability</span>
                      <span className="font-bold text-[#7138E8]">{cand.employabilityScore}/100</span>
                    </div>
                  </div>

                  <div className="mt-3">
                    <span className="text-[10px] font-semibold text-[#5F5675] block mb-1">Verified Skills:</span>
                    <div className="flex flex-wrap gap-1">
                      {cand.verifiedSkills.slice(0, 3).map((sk, idx) => (
                        <span key={idx} className="text-[10px] bg-white text-purple-900 px-2 py-0.5 rounded-md border border-purple-200">
                          {sk.name} ({sk.score})
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="pt-2 border-t border-purple-100 flex items-center justify-between">
                  <span className="text-[10px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-md">
                    Proof: Verified
                  </span>
                  <button
                    onClick={() => setSelectedStudentForCompare(cand)}
                    className="btn-kinetic px-3 py-1.5 rounded-xl text-xs font-bold cursor-pointer"
                  >
                    Compare Skills
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* 7. APPLICATIONS PIPELINE (INTERACTIVE KANBAN) */}
      {(activeModule === 'applications-funnel' || activeModule === 'shortlisted') && (
        <div className="neu-extruded p-6 sm:p-8 rounded-3xl space-y-6">
          <div className="flex flex-wrap items-center justify-between gap-4 pb-4 border-b border-purple-200/60">
            <div>
              <h2 className="text-xl font-bold font-display text-[#21163B]">Recruitment Funnel Pipeline</h2>
              <p className="text-xs text-[#5F5675]">Progress candidates across stages or schedule technical interview rounds</p>
            </div>
            <span className="text-xs font-bold text-[#7138E8] bg-purple-100 px-3 py-1 rounded-full">
              {applications.length} Applications Total
            </span>
          </div>

          {/* Multi-Column Stage Funnel */}
          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-6 gap-3 overflow-x-auto pb-2">
            {pipelineStages.map((stage) => {
              const stageApps = applications.filter((a) => a.stage === stage);
              return (
                <div key={stage} className="neu-inset p-3 rounded-2xl min-w-[200px] flex flex-col space-y-2">
                  <div className="flex justify-between items-center pb-2 border-b border-purple-200/50">
                    <span className="text-xs font-bold text-[#21163B] font-display">{stage}</span>
                    <span className="text-[10px] font-bold bg-white text-[#7138E8] px-1.5 py-0.5 rounded-full border border-purple-200">
                      {stageApps.length}
                    </span>
                  </div>

                  <div className="space-y-2 flex-1">
                    {stageApps.map((app) => (
                      <div key={app.id} className="p-3 rounded-xl neu-flat space-y-2 text-xs">
                        <div className="font-bold text-[#21163B]">{app.studentName}</div>
                        <div className="text-[11px] text-[#5F5675]">{app.studentCollege.split('(')[0]}</div>
                        <div className="flex justify-between text-[11px]">
                          <span className="text-[#5F5675]">Score:</span>
                          <span className="font-bold text-[#7138E8]">{app.studentEmployabilityScore}/100</span>
                        </div>

                        {/* Stage Progress Dropdown */}
                        <select
                          value={app.stage}
                          onChange={(e) => handleStageChange(app.id, e.target.value as ApplicationStage)}
                          className="w-full text-[10px] neu-input px-2 py-1 rounded-lg cursor-pointer"
                        >
                          {pipelineStages.map((s) => (
                            <option key={s} value={s}>{s}</option>
                          ))}
                        </select>

                        {app.stage === 'Shortlisted' && (
                          <button
                            onClick={() => setSelectedAppForInterview(app)}
                            className="w-full mt-1 btn-kinetic py-1 text-[10px] font-bold rounded-lg cursor-pointer"
                          >
                            Schedule Interview
                          </button>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* 8. COMPANY PROFILE */}
      {activeModule === 'company-profile' && (
        <div className="neu-extruded p-6 sm:p-8 rounded-3xl space-y-6">
          <div className="flex flex-wrap items-center justify-between gap-4 pb-4 border-b border-purple-200/60">
            <div>
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full neu-inset text-xs font-bold text-[#7138E8]">
                <Shield className="w-3.5 h-3.5" />
                <span>Verified Enterprise Partner</span>
              </div>
              <h2 className="text-2xl font-bold font-display text-[#21163B] mt-1.5">
                {recruiter.companyName} Corporate Profile
              </h2>
              <p className="text-xs text-[#5F5675]">
                Corporate identity, hiring credentials, and authorized technical university tie-ups.
              </p>
            </div>
            <span className="text-xs font-bold text-emerald-800 bg-emerald-100 px-3 py-1 rounded-full border border-emerald-300">
              ROC CIN Verified: U72900MP2018PTC
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
            <div className="neu-inset p-4 rounded-2xl space-y-2">
              <span className="text-[10px] text-[#5F5675] font-bold block uppercase">Recruiter Lead</span>
              <strong className="text-sm text-[#21163B] block">{recruiter.name}</strong>
              <span className="text-[#7138E8] font-semibold">{recruiter.designation}</span>
              <span className="text-[10px] text-[#5F5675] block mt-1">{recruiter.email}</span>
            </div>

            <div className="neu-inset p-4 rounded-2xl space-y-2">
              <span className="text-[10px] text-[#5F5675] font-bold block uppercase">Hiring Domain</span>
              <strong className="text-sm text-[#21163B] block">{recruiter.hiringDomain}</strong>
              <span className="text-[10px] text-[#5F5675]">Industry: {recruiter.industry}</span>
              <span className="text-[10px] text-emerald-700 font-bold block mt-1">Tier-1 Package Authorized</span>
            </div>

            <div className="neu-inset p-4 rounded-2xl space-y-2">
              <span className="text-[10px] text-[#5F5675] font-bold block uppercase">Active Package CTC</span>
              <strong className="text-sm text-emerald-700 block">{recruiter.activeHiringPackages}</strong>
              <span className="text-[10px] text-[#5F5675]">Placement Drives: {jobs.length} Active</span>
            </div>
          </div>
        </div>
      )}

      {/* 9. POST JOB VIEW (FULL PAGE) */}
      {activeModule === 'post-job' && (
        <div className="neu-extruded p-6 sm:p-8 rounded-3xl space-y-6">
          <div className="flex flex-wrap items-center justify-between gap-4 pb-4 border-b border-purple-200/60">
            <div>
              <h2 className="text-2xl font-bold font-display text-[#21163B]">
                Create Campus Placement Requisition
              </h2>
              <p className="text-xs text-[#5F5675]">
                Publish a job requisition across affiliated Madhya Pradesh engineering colleges.
              </p>
            </div>
          </div>

          <form onSubmit={handleCreateJob} className="space-y-4 max-w-2xl text-xs">
            <div>
              <label className="block font-semibold mb-1 text-[#21163B]">Job Title *</label>
              <input
                type="text"
                required
                placeholder="e.g. SDE-1 Full Stack (React / Node / Go)"
                value={newJobForm.title}
                onChange={(e) => setNewJobForm({ ...newJobForm, title: e.target.value })}
                className="neu-input w-full px-3 py-2 rounded-xl"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block font-semibold mb-1 text-[#21163B]">Package CTC (LPA) *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. 10.0 - 14.5 LPA"
                  value={newJobForm.salary}
                  onChange={(e) => setNewJobForm({ ...newJobForm, salary: e.target.value })}
                  className="neu-input w-full px-3 py-2 rounded-xl"
                />
              </div>
              <div>
                <label className="block font-semibold mb-1 text-[#21163B]">Campus Location *</label>
                <input
                  type="text"
                  required
                  value={newJobForm.location}
                  onChange={(e) => setNewJobForm({ ...newJobForm, location: e.target.value })}
                  className="neu-input w-full px-3 py-2 rounded-xl"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block font-semibold mb-1 text-[#21163B]">Required Skills</label>
                <input
                  type="text"
                  required
                  value={newJobForm.requiredSkills}
                  onChange={(e) => setNewJobForm({ ...newJobForm, requiredSkills: e.target.value })}
                  className="neu-input w-full px-3 py-2 rounded-xl"
                />
              </div>
              <div>
                <label className="block font-semibold mb-1 text-[#21163B]">Minimum CGPA Gate</label>
                <input
                  type="number"
                  step="0.1"
                  required
                  value={newJobForm.minCgpa}
                  onChange={(e) => setNewJobForm({ ...newJobForm, minCgpa: Number(e.target.value) })}
                  className="neu-input w-full px-3 py-2 rounded-xl"
                />
              </div>
            </div>

            <div>
              <label className="block font-semibold mb-1 text-[#21163B]">Job Description & Objectives</label>
              <textarea
                rows={3}
                required
                placeholder="Describe key responsibilities and technical expectations..."
                value={newJobForm.description}
                onChange={(e) => setNewJobForm({ ...newJobForm, description: e.target.value })}
                className="neu-input w-full p-3 rounded-xl"
              ></textarea>
            </div>

            <button
              type="submit"
              className="btn-kinetic px-6 py-2.5 rounded-xl font-bold cursor-pointer shadow-md"
            >
              Publish Job Drive to Student Portal
            </button>
          </form>
        </div>
      )}

      {/* 10. INTERNSHIP OPPORTUNITIES */}
      {activeModule === 'internships' && (
        <div className="neu-extruded p-6 sm:p-8 rounded-3xl space-y-6">
          <div className="flex flex-wrap items-center justify-between gap-4 pb-4 border-b border-purple-200/60">
            <div>
              <h2 className="text-2xl font-bold font-display text-[#21163B]">
                6-Month Pre-Placement Internships
              </h2>
              <p className="text-xs text-[#5F5675]">
                Offer 6-month capstone semester internships with full-time conversion guarantees.
              </p>
            </div>
            <button
              onClick={() => setShowPostJobModal(true)}
              className="btn-kinetic px-4 py-2 rounded-xl text-xs font-bold cursor-pointer"
            >
              Post Internship Slot
            </button>
          </div>

          <div className="space-y-3">
            {jobs.map((j) => (
              <div key={j.id} className="neu-flat p-4 rounded-2xl flex flex-wrap items-center justify-between gap-3 text-xs">
                <div>
                  <strong className="text-sm text-[#21163B] font-bold block">{j.title} (Internship + PPO)</strong>
                  <span className="text-[#5F5675]">Stipend: ₹35,000 / month • PPO CTC: {j.salary}</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-[10px] font-bold text-emerald-800 bg-emerald-100 px-2 py-0.5 rounded-full">
                    {j.applicantsCount} Applicants
                  </span>
                  <button
                    onClick={() => setActiveModule('applications-funnel')}
                    className="btn-tactile px-3 py-1.5 rounded-xl font-semibold cursor-pointer"
                  >
                    Manage Funnel
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* 11. CAMPUS RECRUITMENT */}
      {activeModule === 'campus-recruitment' && (
        <div className="neu-extruded p-6 sm:p-8 rounded-3xl space-y-6">
          <div className="flex flex-wrap items-center justify-between gap-4 pb-4 border-b border-purple-200/60">
            <div>
              <h2 className="text-2xl font-bold font-display text-[#21163B]">
                Pooled Campus Recruitment Drives
              </h2>
              <p className="text-xs text-[#5F5675]">
                Schedule centralized placement drives across Bhopal, Indore, Jabalpur and Gwalior nodal clusters.
              </p>
            </div>
            <span className="text-xs font-bold text-[#7138E8] bg-purple-100 px-3 py-1 rounded-full">
              {colleges.length} MP Technical Institutions Connected
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 text-xs">
            {colleges.map((col) => (
              <div key={col.id} className="neu-extruded p-4 rounded-2xl space-y-2">
                <span className="text-[10px] font-bold text-[#7138E8] uppercase bg-purple-100 px-2 py-0.5 rounded-full">
                  {col.district} District Node
                </span>
                <h4 className="font-bold text-sm text-[#21163B] font-display">{col.name}</h4>
                <div className="neu-inset p-2.5 rounded-xl space-y-1 text-[11px]">
                  <div>TPO Head: <strong>{col.tpoName}</strong></div>
                  <div>Placement Conversion: <strong className="text-emerald-700">{col.placementRate}%</strong></div>
                  <div>Final Year Candidates: <strong>{col.studentCount.toLocaleString()}</strong></div>
                </div>
                <button
                  onClick={() => alert(`Initiating pooled campus drive requisition for ${col.name}`)}
                  className="w-full btn-kinetic py-1.5 rounded-xl text-[11px] font-bold cursor-pointer"
                >
                  Schedule Campus Drive
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* 12. INTERVIEWS */}
      {activeModule === 'interviews' && (
        <div className="neu-extruded p-6 sm:p-8 rounded-3xl space-y-6">
          <div className="flex flex-wrap items-center justify-between gap-4 pb-4 border-b border-purple-200/60">
            <div>
              <h2 className="text-2xl font-bold font-display text-[#21163B]">
                Technical Interview Sessions
              </h2>
              <p className="text-xs text-[#5F5675]">
                Conduct live proctored coding rounds and record standardized rubric ratings.
              </p>
            </div>
          </div>

          <div className="space-y-3">
            {applications
              .filter((a) => a.stage === 'Interview Scheduled' || a.stage === 'Shortlisted')
              .map((app) => (
                <div key={app.id} className="neu-flat p-4 rounded-2xl flex flex-wrap items-center justify-between gap-3 text-xs">
                  <div>
                    <strong className="text-sm text-[#21163B] font-bold block">{app.studentName}</strong>
                    <span className="text-[#5F5675]">{app.studentCollege.split('(')[0]} • {app.jobTitle}</span>
                    <span className="text-[10px] text-[#7138E8] block mt-0.5 font-bold">
                      Employability Index: {app.studentEmployabilityScore}/100
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => alert(`Launching interview sandbox for ${app.studentName}`)}
                      className="btn-kinetic px-3 py-1.5 rounded-xl font-bold cursor-pointer"
                    >
                      Enter Interview Room
                    </button>
                    <button
                      onClick={() => handleStageChange(app.id, 'Selected')}
                      className="px-3 py-1.5 rounded-xl font-bold bg-emerald-600 text-white cursor-pointer"
                    >
                      Make Offer
                    </button>
                  </div>
                </div>
              ))}
          </div>
        </div>
      )}

      {/* 13. HIRING ANALYTICS */}
      {activeModule === 'hiring-analytics' && (
        <div className="neu-extruded p-6 sm:p-8 rounded-3xl space-y-6">
          <h2 className="text-2xl font-bold font-display text-[#21163B]">
            Hiring Analytics & Conversion Funnel
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="neu-inset p-4 rounded-2xl text-center">
              <span className="text-xs text-[#5F5675] block">Total Applications</span>
              <span className="text-2xl font-bold text-[#7138E8] block mt-1">{applications.length}</span>
            </div>
            <div className="neu-inset p-4 rounded-2xl text-center">
              <span className="text-xs text-[#5F5675] block">Shortlist Ratio</span>
              <span className="text-2xl font-bold text-emerald-600 block mt-1">68.4%</span>
            </div>
            <div className="neu-inset p-4 rounded-2xl text-center">
              <span className="text-xs text-[#5F5675] block">Offer Conversion</span>
              <span className="text-2xl font-bold text-purple-600 block mt-1">34.2%</span>
            </div>
            <div className="neu-inset p-4 rounded-2xl text-center">
              <span className="text-xs text-[#5F5675] block">Avg Time-to-Offer</span>
              <span className="text-2xl font-bold text-[#21163B] block mt-1">4.2 Days</span>
            </div>
          </div>
        </div>
      )}

      {/* 14. RECRUITER NOTIFICATIONS */}
      {activeModule === 'notifications' && (
        <div className="neu-extruded p-6 sm:p-8 rounded-3xl space-y-6">
          <h2 className="text-2xl font-bold font-display text-[#21163B]">
            Recruiter Alerts & Institutional Notices
          </h2>
          <div className="space-y-3 text-xs">
            <div className="p-4 rounded-2xl neu-flat space-y-1">
              <div className="flex justify-between font-bold text-[#21163B]">
                <span>TPO Authority Clearance Approved</span>
                <span className="text-[#5F5675]">Today, 10:15 AM</span>
              </div>
              <p className="text-[#5F5675]">UIT-RGPV Bhopal confirmed your campus drive slot for 22 Nov 2024.</p>
            </div>
            <div className="p-4 rounded-2xl neu-flat space-y-1">
              <div className="flex justify-between font-bold text-[#21163B]">
                <span>38 New Verified Applications Received</span>
                <span className="text-[#5F5675]">Yesterday</span>
              </div>
              <p className="text-[#5F5675]">Candidates from SGSITS Indore submitted pre-screened portfolios.</p>
            </div>
          </div>
        </div>
      )}

      {/* 15. RECRUITER SETTINGS */}
      {activeModule === 'settings' && (
        <div className="neu-extruded p-6 sm:p-8 rounded-3xl space-y-6">
          <h2 className="text-2xl font-bold font-display text-[#21163B]">
            Recruiter Preferences & ATS Integrations
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
            <div className="neu-inset p-4 rounded-2xl space-y-2">
              <span className="font-bold text-[#21163B] block">Enterprise ATS Sync</span>
              <p className="text-[#5F5675]">Sync candidate profiles directly with Greenhouse, Workday or Lever.</p>
              <button
                onClick={() => alert('ATS Webhook configuration connected.')}
                className="btn-kinetic px-3 py-1.5 rounded-xl font-bold cursor-pointer"
              >
                Connect ATS Webhook
              </button>
            </div>

            <div className="neu-inset p-4 rounded-2xl space-y-2">
              <span className="font-bold text-[#21163B] block">Two-Factor Security</span>
              <p className="text-[#5F5675]">Enterprise SSO via Google Workspace / Okta.</p>
              <span className="text-emerald-700 font-bold block">✓ SSO Authentication Active</span>
            </div>
          </div>
        </div>
      )}

      {/* 5. POST JOBS MODAL */}
      {showPostJobModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-xs">
          <div className="w-full max-w-lg neu-floating rounded-3xl p-6 sm:p-8 space-y-4 bg-[#F3F0FF] max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center pb-3 border-b border-purple-200">
              <h3 className="font-bold text-lg text-[#21163B] font-display">Post Campus Recruitment Drive</h3>
              <button onClick={() => setShowPostJobModal(false)} className="cursor-pointer">
                <X className="w-5 h-5 text-[#5F5675]" />
              </button>
            </div>

            <form onSubmit={handleCreateJob} className="space-y-3 text-xs">
              <div>
                <label className="block font-semibold mb-1">Job Title</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. SDE-1 Full Stack (React / Node)"
                  value={newJobForm.title}
                  onChange={(e) => setNewJobForm({ ...newJobForm, title: e.target.value })}
                  className="neu-input w-full px-3 py-2 rounded-xl"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold mb-1">Package CTC</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. 8.5 - 12 LPA"
                    value={newJobForm.salary}
                    onChange={(e) => setNewJobForm({ ...newJobForm, salary: e.target.value })}
                    className="neu-input w-full px-3 py-2 rounded-xl"
                  />
                </div>
                <div>
                  <label className="block font-semibold mb-1">Location</label>
                  <input
                    type="text"
                    required
                    placeholder="Indore / Hybrid"
                    value={newJobForm.location}
                    onChange={(e) => setNewJobForm({ ...newJobForm, location: e.target.value })}
                    className="neu-input w-full px-3 py-2 rounded-xl"
                  />
                </div>
              </div>

              <div>
                <label className="block font-semibold mb-1">Required Skills (Comma separated)</label>
                <input
                  type="text"
                  required
                  placeholder="TypeScript & React, Node.js, SQL"
                  value={newJobForm.requiredSkills}
                  onChange={(e) => setNewJobForm({ ...newJobForm, requiredSkills: e.target.value })}
                  className="neu-input w-full px-3 py-2 rounded-xl"
                />
              </div>

              <div>
                <label className="block font-semibold mb-1">Minimum CGPA Eligibility</label>
                <input
                  type="number"
                  step="0.1"
                  required
                  value={newJobForm.minCgpa}
                  onChange={(e) => setNewJobForm({ ...newJobForm, minCgpa: Number(e.target.value) })}
                  className="neu-input w-full px-3 py-2 rounded-xl"
                />
              </div>

              <div>
                <label className="block font-semibold mb-1">Role Description</label>
                <textarea
                  rows={3}
                  required
                  placeholder="Outline responsibilities and project expectations..."
                  value={newJobForm.description}
                  onChange={(e) => setNewJobForm({ ...newJobForm, description: e.target.value })}
                  className="neu-input w-full p-2.5 rounded-xl"
                ></textarea>
              </div>

              <button
                type="submit"
                className="w-full btn-kinetic py-2.5 rounded-xl font-bold cursor-pointer shadow-md mt-2"
              >
                Publish Job Drive to Student Portal
              </button>
            </form>
          </div>
        </div>
      )}

      {/* SCHEDULE INTERVIEW MODAL */}
      {selectedAppForInterview && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-xs">
          <div className="w-full max-w-md neu-floating rounded-3xl p-6 space-y-4 bg-[#F3F0FF]">
            <div className="flex justify-between items-center pb-3 border-b border-purple-200">
              <h3 className="font-bold text-base text-[#21163B] font-display">Schedule Interview</h3>
              <button onClick={() => setSelectedAppForInterview(null)} className="cursor-pointer">
                <X className="w-5 h-5 text-[#5F5675]" />
              </button>
            </div>
            <p className="text-xs text-[#5F5675]">
              Candidate: <strong>{selectedAppForInterview.studentName}</strong> ({selectedAppForInterview.jobTitle})
            </p>
            <div className="space-y-3 text-xs">
              <div>
                <label className="block font-semibold mb-1">Date and Time (IST)</label>
                <input
                  type="datetime-local"
                  value={interviewDateInput}
                  onChange={(e) => setInterviewDateInput(e.target.value)}
                  className="neu-input w-full px-3 py-2 rounded-xl"
                />
              </div>
              <div>
                <label className="block font-semibold mb-1">Recruiter Notes / Instructions</label>
                <textarea
                  rows={2}
                  value={interviewNotesInput}
                  onChange={(e) => setInterviewNotesInput(e.target.value)}
                  placeholder="Round 2 System Architecture & Coding session via Google Meet."
                  className="neu-input w-full p-2.5 rounded-xl"
                ></textarea>
              </div>
              <button
                onClick={handleScheduleInterview}
                className="w-full btn-kinetic py-2 rounded-xl font-bold cursor-pointer"
              >
                Confirm & Dispatch Interview Invitation
              </button>
            </div>
          </div>
        </div>
      )}

      {/* COMPARE SKILLS MODAL */}
      {selectedStudentForCompare && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-xs">
          <div className="w-full max-w-lg neu-floating rounded-3xl p-6 space-y-4 bg-[#F3F0FF]">
            <div className="flex justify-between items-center pb-3 border-b border-purple-200">
              <h3 className="font-bold text-base text-[#21163B] font-display">
                Cryptographic Skill Comparison: {selectedStudentForCompare.name}
              </h3>
              <button onClick={() => setSelectedStudentForCompare(null)} className="cursor-pointer">
                <X className="w-5 h-5 text-[#5F5675]" />
              </button>
            </div>
            <div className="space-y-2 max-h-72 overflow-y-auto">
              {selectedStudentForCompare.verifiedSkills.map((sk, idx) => (
                <div key={idx} className="p-3 rounded-xl neu-flat flex justify-between items-center text-xs">
                  <div>
                    <span className="font-bold text-[#21163B]">{sk.name}</span>
                    <span className="text-[10px] text-[#5F5675] block font-mono">{sk.proofHash}</span>
                  </div>
                  <span className="font-bold text-[#7138E8] bg-white px-2 py-1 rounded-md border border-purple-200">
                    {sk.score}/100 ({sk.level})
                  </span>
                </div>
              ))}
            </div>
            <button
              onClick={() => setSelectedStudentForCompare(null)}
              className="w-full btn-kinetic py-2 rounded-xl text-xs font-bold cursor-pointer"
            >
              Close Comparison
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
