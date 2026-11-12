import React, { useState } from 'react';
import {
  Briefcase,
  Building,
  CheckCircle2,
  Clock,
  Download,
  Filter,
  Layers,
  MapPin,
  Plus,
  Search,
  Sparkles,
  TrendingUp,
  Users,
  Eye,
  SlidersHorizontal,
  Check,
  X,
  Shield,
  FileCheck2,
} from 'lucide-react';
import confetti from 'canvas-confetti';

interface JobPostingItem {
  id: string;
  company: string;
  title: string;
  location: string;
  packageRange: string;
  applicantsCount: number;
  eligibleCount: number;
  minCgpa: number;
  minScore: number;
  branches: string[];
  status: 'Active' | 'Pending Approval' | 'Shortlisting' | 'Interview Rounds' | 'Completed';
  matchTier: 'Elite Match' | 'High Match' | 'Standard Match';
  postedDate: string;
}

export const JobManagementModule: React.FC = () => {
  const [activeTab, setActiveTab] = useState<
    'all' | 'active' | 'pending' | 'shortlisting' | 'interview' | 'completed'
  >('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedJobForDetail, setSelectedJobForDetail] = useState<JobPostingItem | null>(null);
  const [showCreateJobDrawer, setShowCreateJobDrawer] = useState(false);
  const [showEligibilityEngine, setShowEligibilityEngine] = useState(false);

  // New Job Form State
  const [newTitle, setNewTitle] = useState('');
  const [newCompany, setNewCompany] = useState('');
  const [newPackage, setNewPackage] = useState('12 - 16 LPA');
  const [newLocation, setNewLocation] = useState('Indore, MP / Hybrid');
  const [newMinCgpa, setNewMinCgpa] = useState(7.5);
  const [newMinScore, setNewMinScore] = useState(75);

  const [jobList, setJobList] = useState<JobPostingItem[]>([
    {
      id: 'job-1',
      company: 'CloudScale Labs Inc',
      title: 'Cloud Systems & Distributed Backend Engineer',
      location: 'Pune / Bengaluru / Hybrid',
      packageRange: '₹18.0 - 24.0 LPA',
      applicantsCount: 184,
      eligibleCount: 142,
      minCgpa: 8.0,
      minScore: 85,
      branches: ['CSE', 'IT'],
      status: 'Shortlisting',
      matchTier: 'High Match',
      postedDate: '12 Nov 2024',
    },
    {
      id: 'job-2',
      company: 'RedPanda Data',
      title: 'Distributed Systems SRE & Go Engineer',
      location: 'Remote / Bhopal Hub',
      packageRange: '₹22.0 LPA',
      applicantsCount: 142,
      eligibleCount: 96,
      minCgpa: 8.2,
      minScore: 88,
      branches: ['CSE'],
      status: 'Active',
      matchTier: 'Elite Match',
      postedDate: '10 Nov 2024',
    },
    {
      id: 'job-3',
      company: 'Persistent Systems',
      title: 'Cloud Security Analyst & DevOps Associate',
      location: 'Indore / Pune',
      packageRange: '₹9.5 LPA',
      applicantsCount: 96,
      eligibleCount: 88,
      minCgpa: 7.5,
      minScore: 75,
      branches: ['CSE', 'IT', 'ECE'],
      status: 'Interview Rounds',
      matchTier: 'Standard Match',
      postedDate: '06 Nov 2024',
    },
    {
      id: 'job-4',
      company: 'Infosys Springboard',
      title: 'Systems Associate (Specialist Programmer)',
      location: 'PAN India',
      packageRange: '₹4.5 - 7.2 LPA',
      applicantsCount: 380,
      eligibleCount: 310,
      minCgpa: 7.0,
      minScore: 70,
      branches: ['CSE', 'IT', 'ECE', 'ME', 'CE'],
      status: 'Active',
      matchTier: 'Standard Match',
      postedDate: '01 Nov 2024',
    },
    {
      id: 'job-5',
      company: 'TCS Digital',
      title: 'Systems Engineer Digital (Full Stack AI)',
      location: 'Indore / Gandhinagar',
      packageRange: '₹7.0 - 9.0 LPA',
      applicantsCount: 240,
      eligibleCount: 215,
      minCgpa: 7.5,
      minScore: 78,
      branches: ['CSE', 'IT'],
      status: 'Pending Approval',
      matchTier: 'High Match',
      postedDate: '14 Nov 2024',
    },
  ]);

  const handleCreateJobSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle || !newCompany) return;
    const newEntry: JobPostingItem = {
      id: `job-${Date.now()}`,
      company: newCompany,
      title: newTitle,
      location: newLocation,
      packageRange: newPackage,
      applicantsCount: 0,
      eligibleCount: 120,
      minCgpa: newMinCgpa,
      minScore: newMinScore,
      branches: ['CSE', 'IT'],
      status: 'Active',
      matchTier: 'High Match',
      postedDate: 'Today',
    };
    setJobList([newEntry, ...jobList]);
    setShowCreateJobDrawer(false);
    confetti({ particleCount: 60, spread: 60, origin: { y: 0.6 } });
    setNewTitle('');
    setNewCompany('');
  };

  const handleApproveJob = (jobId: string) => {
    setJobList((prev) =>
      prev.map((j) => (j.id === jobId ? { ...j, status: 'Active' } : j))
    );
    confetti({ particleCount: 40, spread: 50 });
  };

  const filteredJobs = jobList.filter((j) => {
    const matchesSearch =
      j.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      j.company.toLowerCase().includes(searchQuery.toLowerCase());
    if (activeTab === 'active') return matchesSearch && j.status === 'Active';
    if (activeTab === 'pending') return matchesSearch && j.status === 'Pending Approval';
    if (activeTab === 'shortlisting') return matchesSearch && j.status === 'Shortlisting';
    if (activeTab === 'interview') return matchesSearch && j.status === 'Interview Rounds';
    if (activeTab === 'completed') return matchesSearch && j.status === 'Completed';
    return matchesSearch;
  });

  return (
    <div className="space-y-6">
      {/* HEADER SECTION */}
      <div className="neu-extruded p-6 sm:p-8 rounded-3xl">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full neu-inset text-xs font-bold text-[#7138E8]">
              <Shield className="w-3.5 h-3.5" />
              <span>State Directorate Nodal Approval Gateway</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold font-display text-[#21163B] mt-2">
              Job Management
            </h1>
            <p className="text-xs sm:text-sm text-[#5F5675]">
              Manage campus placement job postings, recruiter requisitions, student eligibility filters and AI matching.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => {
                alert('Exporting verified campus placement pipeline to Excel (.xlsx) and Signed State Directorate PDF.');
              }}
              className="btn-tactile px-4 py-2.5 rounded-xl text-xs font-bold flex items-center gap-2 cursor-pointer"
            >
              <Download className="w-4 h-4 text-[#7138E8]" />
              <span>Export Pipeline</span>
            </button>
            <button
              onClick={() => setShowCreateJobDrawer(true)}
              className="btn-kinetic px-5 py-2.5 rounded-xl text-xs font-bold flex items-center gap-2 cursor-pointer shadow-md"
            >
              <Plus className="w-4 h-4" />
              <span>Post New Opportunity</span>
            </button>
          </div>
        </div>

        {/* 6 TOP KPI TILES */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 mt-6 pt-5 border-t border-purple-200/60">
          <div className="neu-inset p-3.5 rounded-2xl text-center">
            <div className="flex items-center justify-center gap-1 text-[11px] text-[#5F5675]">
              <Briefcase className="w-3.5 h-3.5 text-[#7138E8]" />
              <span>TOTAL POSTINGS</span>
            </div>
            <span className="text-2xl font-extrabold font-display text-[#21163B] block mt-1">42</span>
            <span className="text-[10px] text-[#5F5675]">AY 2024-25</span>
          </div>

          <div className="neu-inset p-3.5 rounded-2xl text-center">
            <div className="flex items-center justify-center gap-1 text-[11px] text-[#5F5675]">
              <Building className="w-3.5 h-3.5 text-purple-600" />
              <span>ACTIVE DRIVES</span>
            </div>
            <span className="text-2xl font-extrabold font-display text-[#7138E8] block mt-1">14</span>
            <span className="text-[10px] text-purple-700 font-semibold">Live Applications</span>
          </div>

          <div className="neu-inset p-3.5 rounded-2xl text-center">
            <div className="flex items-center justify-center gap-1 text-[11px] text-[#5F5675]">
              <Users className="w-3.5 h-3.5 text-[#963DF5]" />
              <span>APPLICATIONS</span>
            </div>
            <span className="text-2xl font-extrabold font-display text-[#21163B] block mt-1">1,420</span>
            <span className="text-[10px] text-[#5F5675]">Processed via AI</span>
          </div>

          <div className="neu-inset p-3.5 rounded-2xl text-center border-b-2 border-emerald-500">
            <div className="flex items-center justify-center gap-1 text-[11px] text-[#5F5675]">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
              <span>OFFERS RELEASED</span>
            </div>
            <span className="text-2xl font-extrabold font-display text-emerald-600 block mt-1">312</span>
            <span className="text-[10px] text-emerald-700 font-semibold">Verified Letters</span>
          </div>

          <div className="neu-inset p-3.5 rounded-2xl text-center">
            <div className="flex items-center justify-center gap-1 text-[11px] text-[#5F5675]">
              <TrendingUp className="w-3.5 h-3.5 text-[#E75ACF]" />
              <span>AVG PACKAGE</span>
            </div>
            <span className="text-2xl font-extrabold font-display text-[#21163B] block mt-1">₹9.8 LPA</span>
            <span className="text-[10px] text-purple-700 font-semibold">Across Active Drives</span>
          </div>

          <div className="neu-inset p-3.5 rounded-2xl text-center">
            <div className="flex items-center justify-center gap-1 text-[11px] text-[#5F5675]">
              <FileCheck2 className="w-3.5 h-3.5 text-indigo-600" />
              <span>VERIFICATION SLA</span>
            </div>
            <span className="text-2xl font-extrabold font-display text-indigo-600 block mt-1">100%</span>
            <span className="text-[10px] text-[#5F5675]">All AICTE/DTE Validated</span>
          </div>
        </div>
      </div>

      {/* TABS & SEARCH */}
      <div className="neu-extruded p-6 sm:p-7 rounded-3xl space-y-5">
        <div className="flex flex-wrap items-center justify-between gap-3 pb-3 border-b border-purple-200/60">
          {/* Segmented Filter Buttons */}
          <div className="flex flex-wrap gap-1 p-1 neu-inset rounded-2xl text-xs font-bold">
            <button
              onClick={() => setActiveTab('all')}
              className={`px-3 py-1.5 rounded-xl cursor-pointer transition-all ${
                activeTab === 'all' ? 'btn-kinetic text-white shadow-xs' : 'text-[#5F5675]'
              }`}
            >
              All Postings ({jobList.length})
            </button>
            <button
              onClick={() => setActiveTab('active')}
              className={`px-3 py-1.5 rounded-xl cursor-pointer transition-all ${
                activeTab === 'active' ? 'btn-kinetic text-white shadow-xs' : 'text-[#5F5675]'
              }`}
            >
              Active Drives (14)
            </button>
            <button
              onClick={() => setActiveTab('pending')}
              className={`px-3 py-1.5 rounded-xl cursor-pointer transition-all ${
                activeTab === 'pending' ? 'btn-kinetic text-white shadow-xs' : 'text-[#5F5675]'
              }`}
            >
              Pending TPO Approval (5)
            </button>
            <button
              onClick={() => setActiveTab('shortlisting')}
              className={`px-3 py-1.5 rounded-xl cursor-pointer transition-all ${
                activeTab === 'shortlisting' ? 'btn-kinetic text-white shadow-xs' : 'text-[#5F5675]'
              }`}
            >
              Shortlisting Phase (8)
            </button>
            <button
              onClick={() => setActiveTab('interview')}
              className={`px-3 py-1.5 rounded-xl cursor-pointer transition-all ${
                activeTab === 'interview' ? 'btn-kinetic text-white shadow-xs' : 'text-[#5F5675]'
              }`}
            >
              Interview Rounds (6)
            </button>
            <button
              onClick={() => setActiveTab('completed')}
              className={`px-3 py-1.5 rounded-xl cursor-pointer transition-all ${
                activeTab === 'completed' ? 'btn-kinetic text-white shadow-xs' : 'text-[#5F5675]'
              }`}
            >
              Completed (9)
            </button>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setShowEligibilityEngine(!showEligibilityEngine)}
              className="btn-tactile px-3 py-1.5 rounded-xl text-xs font-bold text-[#7138E8] flex items-center gap-1.5 cursor-pointer"
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>AI Matching Engine</span>
            </button>
          </div>
        </div>

        {/* AI Eligibility Matching Drawer Box if active */}
        {showEligibilityEngine && (
          <div className="neu-inset p-4 rounded-2xl text-xs space-y-3 border border-purple-200">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 font-bold text-[#21163B]">
                <Sparkles className="w-4 h-4 text-[#E75ACF]" />
                <span>Autonomous Candidate Eligibility & Shortlisting Matcher</span>
              </div>
              <span className="text-[10px] font-mono font-bold text-[#7138E8] bg-white px-2 py-0.5 rounded-md">
                Algorithm: v4.8-Matching
              </span>
            </div>
            <p className="text-[#5F5675] leading-relaxed">
              Dynamically matches candidate digital skill passports against recruiter JDs. Enforces zero backlogs, minimum verified CGPA, and proctored coding benchmark &gt;80% without manual spreadsheet triaging.
            </p>
          </div>
        )}

        {/* Search Bar */}
        <div className="relative">
          <Search className="w-4 h-4 absolute left-3 top-2.5 text-[#5F5675]" />
          <input
            type="text"
            placeholder="Search opportunity by title, company name, skill keywords..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="neu-input w-full pl-9 pr-4 py-2 rounded-xl text-xs"
          />
        </div>

        {/* Job Listings Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-purple-200/60 text-[#5F5675] font-semibold uppercase text-[10px]">
                <th className="py-3 px-3">Opportunity & Company</th>
                <th className="py-3 px-3">Package CTC</th>
                <th className="py-3 px-3">Location</th>
                <th className="py-3 px-3">Eligibility Gates</th>
                <th className="py-3 px-3">Applicants Funnel</th>
                <th className="py-3 px-3">Status</th>
                <th className="py-3 px-3 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-purple-100">
              {filteredJobs.map((job) => (
                <tr key={job.id} className="hover:bg-purple-50/50 transition-colors">
                  <td className="py-3 px-3">
                    <strong className="text-[#21163B] font-bold text-sm block font-display">
                      {job.title}
                    </strong>
                    <div className="flex items-center gap-2 mt-0.5">
                      <span className="text-[#7138E8] font-semibold text-xs">{job.company}</span>
                      <span className="text-[10px] text-[#5F5675]">• Posted {job.postedDate}</span>
                    </div>
                  </td>
                  <td className="py-3 px-3 font-extrabold text-emerald-700">{job.packageRange}</td>
                  <td className="py-3 px-3 text-[#5F5675]">
                    <div className="flex items-center gap-1">
                      <MapPin className="w-3 h-3 text-[#7138E8]" />
                      <span>{job.location}</span>
                    </div>
                  </td>
                  <td className="py-3 px-3">
                    <div className="space-y-0.5 text-[10px]">
                      <div className="text-[#5F5675]">
                        Min CGPA: <strong className="text-[#21163B]">{job.minCgpa}</strong> | Score: <strong className="text-[#7138E8]">{job.minScore}+</strong>
                      </div>
                      <div className="flex gap-1">
                        {job.branches.map((b, i) => (
                          <span key={i} className="bg-purple-100 text-[#7138E8] px-1.5 py-0.2 rounded font-bold">
                            {b}
                          </span>
                        ))}
                      </div>
                    </div>
                  </td>
                  <td className="py-3 px-3">
                    <div className="text-xs">
                      <strong className="text-[#7138E8]">{job.applicantsCount}</strong>
                      <span className="text-[#5F5675] text-[10px]"> / {job.eligibleCount} eligible</span>
                    </div>
                    <span className="text-[9px] font-bold text-emerald-700 bg-emerald-50 px-1.5 py-0.2 rounded border border-emerald-200 mt-0.5 inline-block">
                      {job.matchTier}
                    </span>
                  </td>
                  <td className="py-3 px-3">
                    <span
                      className={`inline-block px-2.5 py-0.5 rounded-full text-[10px] font-bold ${
                        job.status === 'Active'
                          ? 'bg-emerald-100 text-emerald-800'
                          : job.status === 'Pending Approval'
                          ? 'bg-amber-100 text-amber-800'
                          : job.status === 'Shortlisting'
                          ? 'bg-purple-100 text-[#7138E8]'
                          : 'bg-indigo-100 text-indigo-800'
                      }`}
                    >
                      {job.status}
                    </span>
                  </td>
                  <td className="py-3 px-3 text-right">
                    <div className="inline-flex items-center gap-1.5">
                      {job.status === 'Pending Approval' ? (
                        <button
                          onClick={() => handleApproveJob(job.id)}
                          className="btn-kinetic px-2.5 py-1 rounded-lg text-[10px] font-bold cursor-pointer"
                        >
                          Approve Drive
                        </button>
                      ) : (
                        <button
                          onClick={() => setSelectedJobForDetail(job)}
                          className="btn-tactile px-2.5 py-1 rounded-lg text-[10px] font-bold text-[#7138E8] cursor-pointer"
                        >
                          View Details
                        </button>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* CREATE OPPORTUNITY SLIDE-OVER / MODAL */}
      {showCreateJobDrawer && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-xs">
          <div className="w-full max-w-lg neu-floating rounded-3xl p-6 space-y-4 bg-[#F3F0FF] max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center pb-3 border-b border-purple-200">
              <h3 className="font-bold text-base text-[#21163B] font-display">
                Post New Campus Placement Opportunity
              </h3>
              <button onClick={() => setShowCreateJobDrawer(false)} className="cursor-pointer text-[#5F5675]">
                ✕
              </button>
            </div>

            <form onSubmit={handleCreateJobSubmit} className="space-y-3 text-xs">
              <div>
                <label className="block font-semibold mb-1">Company Name</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Amazon Web Services"
                  value={newCompany}
                  onChange={(e) => setNewCompany(e.target.value)}
                  className="neu-input w-full px-3 py-2 rounded-xl"
                />
              </div>

              <div>
                <label className="block font-semibold mb-1">Role Title</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Cloud Support Associate / SDE-1"
                  value={newTitle}
                  onChange={(e) => setNewTitle(e.target.value)}
                  className="neu-input w-full px-3 py-2 rounded-xl"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold mb-1">Package CTC</label>
                  <input
                    type="text"
                    value={newPackage}
                    onChange={(e) => setNewPackage(e.target.value)}
                    className="neu-input w-full px-3 py-2 rounded-xl"
                  />
                </div>
                <div>
                  <label className="block font-semibold mb-1">Location</label>
                  <input
                    type="text"
                    value={newLocation}
                    onChange={(e) => setNewLocation(e.target.value)}
                    className="neu-input w-full px-3 py-2 rounded-xl"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold mb-1">Min CGPA Gate</label>
                  <input
                    type="number"
                    step="0.1"
                    value={newMinCgpa}
                    onChange={(e) => setNewMinCgpa(Number(e.target.value))}
                    className="neu-input w-full px-3 py-2 rounded-xl"
                  />
                </div>
                <div>
                  <label className="block font-semibold mb-1">Min Assessment Score</label>
                  <input
                    type="number"
                    value={newMinScore}
                    onChange={(e) => setNewMinScore(Number(e.target.value))}
                    className="neu-input w-full px-3 py-2 rounded-xl"
                  />
                </div>
              </div>

              <button
                type="submit"
                className="w-full btn-kinetic py-2.5 rounded-xl font-bold cursor-pointer mt-2"
              >
                Publish Campus Drive Opportunity
              </button>
            </form>
          </div>
        </div>
      )}

      {/* JOB DETAIL MODAL */}
      {selectedJobForDetail && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-xs">
          <div className="w-full max-w-lg neu-floating rounded-3xl p-6 space-y-4 bg-[#F3F0FF]">
            <div className="flex justify-between items-center pb-3 border-b border-purple-200">
              <div>
                <span className="text-[10px] font-bold text-[#7138E8] bg-purple-100 px-2 py-0.5 rounded-md">
                  {selectedJobForDetail.company}
                </span>
                <h3 className="font-bold text-base text-[#21163B] font-display mt-1">
                  {selectedJobForDetail.title}
                </h3>
              </div>
              <button onClick={() => setSelectedJobForDetail(null)} className="cursor-pointer text-[#5F5675]">
                ✕
              </button>
            </div>

            <div className="grid grid-cols-2 gap-2 text-xs">
              <div className="neu-inset p-3 rounded-xl text-center">
                <span className="text-[10px] text-[#5F5675] block">Compensation Package</span>
                <strong className="text-emerald-700 font-bold">{selectedJobForDetail.packageRange}</strong>
              </div>
              <div className="neu-inset p-3 rounded-xl text-center">
                <span className="text-[10px] text-[#5F5675] block">Job Location</span>
                <strong className="text-[#21163B] font-bold">{selectedJobForDetail.location}</strong>
              </div>
              <div className="neu-inset p-3 rounded-xl text-center">
                <span className="text-[10px] text-[#5F5675] block">Registered Candidates</span>
                <strong className="text-[#7138E8] font-bold">{selectedJobForDetail.applicantsCount}</strong>
              </div>
              <div className="neu-inset p-3 rounded-xl text-center">
                <span className="text-[10px] text-[#5F5675] block">Eligible Talent Pool</span>
                <strong className="text-[#21163B] font-bold">{selectedJobForDetail.eligibleCount}</strong>
              </div>
            </div>

            <div className="neu-flat p-3 rounded-xl text-xs space-y-1">
              <span className="font-bold text-[#21163B]">Recruiter Contact Coordinates:</span>
              <p className="text-[#5F5675]">Validated via MCA ROC & State Directorate MoU agreement.</p>
            </div>

            <button
              onClick={() => setSelectedJobForDetail(null)}
              className="w-full btn-kinetic py-2 rounded-xl text-xs font-bold cursor-pointer"
            >
              Close Opportunity Summary
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
