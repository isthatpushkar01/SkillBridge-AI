import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { TPOProfile, ApprovalRequest, StudentProfile, RecruiterProfile, MPCollege } from '../../types';
import confetti from 'canvas-confetti';
import { CandidateComparisonEngine } from '../modules/CandidateComparisonEngine';
import { InstitutionProfileModule } from './modules/InstitutionProfileModule';
import { EmployabilityAnalyticsModule } from './modules/EmployabilityAnalyticsModule';
import { JobManagementModule } from './modules/JobManagementModule';
import { AssessmentManagementModule } from './modules/AssessmentManagementModule';
import { ReportsModule } from './modules/ReportsModule';
import { EventsWorkshopsModule } from './modules/EventsWorkshopsModule';
import { NotificationsCenterModule } from './modules/NotificationsCenterModule';
import { TPOSettingsModule } from './modules/TPOSettingsModule';
import {
  Award,
  BarChart3,
  BookOpen,
  Briefcase,
  Building,
  Calendar,
  CheckCircle,
  CheckCircle2,
  ChevronRight,
  Clock,
  Download,
  Eye,
  FileCheck2,
  FileText,
  Filter,
  GraduationCap,
  Layers,
  MapPin,
  MessageSquare,
  PieChart,
  School,
  Search,
  Settings,
  Shield,
  Sliders,
  Sparkles,
  Target,
  TrendingUp,
  UserCheck,
  Users,
  X,
  XCircle,
} from 'lucide-react';

export const TPODashboard: React.FC = () => {
  const {
    currentUser,
    activeModule,
    setActiveModule,
    students,
    recruiters,
    colleges,
    jobs,
    approvalRequests,
    approveRequest,
    rejectRequest,
    requestMoreInfo,
    addInternalRemarks,
  } = useApp();

  const tpo = currentUser as TPOProfile;

  // Approval Center Sub-tab State
  const [approvalTab, setApprovalTab] = useState<
    'student' | 'recruiter' | 'docs' | 'pending' | 'approved' | 'rejected' | 'suspended' | 'history'
  >('pending');

  // Modal inspection state for Approval Request
  const [selectedRequest, setSelectedRequest] = useState<ApprovalRequest | null>(null);
  const [remarksInput, setRemarksInput] = useState('');
  const [rejectionReasonInput, setRejectionReasonInput] = useState('');
  const [showRejectModal, setShowRejectModal] = useState(false);
  const [showInfoModal, setShowInfoModal] = useState(false);
  const [moreInfoInput, setMoreInfoInput] = useState('');

  // Student Management Filter State
  const [studentSearch, setStudentSearch] = useState('');
  const [selectedBranch, setSelectedBranch] = useState('All');
  const [minCgpa, setMinCgpa] = useState<number>(0);
  const [minScore, setMinScore] = useState<number>(0);

  // MP Network District Filter State
  const [selectedDistrict, setSelectedDistrict] = useState<string>('All');
  const [selectedCollegeOnMap, setSelectedCollegeOnMap] = useState<MPCollege | null>(null);

  // Student Profile Inspector Modal
  const [inspectedStudent, setInspectedStudent] = useState<StudentProfile | null>(null);

  const handleApprove = (reqId: string) => {
    approveRequest(reqId, remarksInput);
    confetti({
      particleCount: 75,
      spread: 60,
      origin: { y: 0.6 },
    });
    setSelectedRequest(null);
    setRemarksInput('');
  };

  const handleRejectConfirm = () => {
    if (!selectedRequest || !rejectionReasonInput.trim()) return;
    rejectRequest(selectedRequest.id, rejectionReasonInput);
    setShowRejectModal(false);
    setSelectedRequest(null);
    setRejectionReasonInput('');
  };

  const handleRequestInfoConfirm = () => {
    if (!selectedRequest || !moreInfoInput.trim()) return;
    requestMoreInfo(selectedRequest.id, moreInfoInput);
    setShowInfoModal(false);
    setMoreInfoInput('');
  };

  // Filter approval requests based on active tab
  const getFilteredRequests = () => {
    switch (approvalTab) {
      case 'student':
        return approvalRequests.filter((r) => r.applicantRole === 'student');
      case 'recruiter':
        return approvalRequests.filter((r) => r.applicantRole === 'recruiter');
      case 'approved':
        return approvalRequests.filter((r) => r.status === 'approved');
      case 'rejected':
        return approvalRequests.filter((r) => r.status === 'rejected');
      case 'suspended':
        return approvalRequests.filter((r) => r.status === 'suspended');
      case 'history':
        return approvalRequests;
      case 'docs':
        return approvalRequests.filter((r) => r.documents && r.documents.length > 0);
      case 'pending':
      default:
        return approvalRequests.filter((r) => r.status === 'pending_approval');
    }
  };

  const filteredRequests = getFilteredRequests();

  // Filter students for Student Management
  const filteredStudents = students.filter((s) => {
    const matchesSearch =
      s.name.toLowerCase().includes(studentSearch.toLowerCase()) ||
      s.enrollmentNo.toLowerCase().includes(studentSearch.toLowerCase());
    const matchesBranch = selectedBranch === 'All' || s.branch.includes(selectedBranch);
    const matchesCgpa = s.cgpa >= minCgpa;
    const matchesScore = s.employabilityScore >= minScore;
    return matchesSearch && matchesBranch && matchesCgpa && matchesScore;
  });

  return (
    <div className="space-y-6">
      {/* CANDIDATE COMPARISON MATRIX (INSTITUTIONAL PERMISSIONS) */}
      {activeModule === 'candidate-comparison' && (
        <CandidateComparisonEngine onBack={() => setActiveModule('overview')} />
      )}

      {/* 1. DASHBOARD OVERVIEW */}
      {activeModule === 'overview' && (
        <div className="space-y-6">
          {/* Welcome Banner */}
          <div className="neu-extruded p-6 sm:p-8 rounded-3xl">
            <div className="flex flex-wrap items-center justify-between gap-4">
              <div>
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full neu-inset text-xs font-bold text-[#7138E8]">
                  <School className="w-3.5 h-3.5 text-[#E75ACF]" />
                  <span>{tpo.institutionName || 'RGPV State University'}</span>
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
                </div>
                <h1 className="text-2xl sm:text-3xl font-extrabold font-display text-[#21163B] mt-2">
                  Welcome, {tpo.name}
                </h1>
                <p className="text-xs sm:text-sm text-[#5F5675]">
                  {tpo.designation} • {tpo.district} District Campus Hub
                </p>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => setActiveModule('approvals')}
                  className="btn-kinetic px-5 py-2.5 rounded-xl text-xs font-bold flex items-center gap-2 cursor-pointer shadow-md"
                >
                  <CheckCircle className="w-4 h-4" />
                  <span>Open Approval Center</span>
                </button>
              </div>
            </div>

            {/* Placement KPI Tiles */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6">
              <div className="neu-inset p-4 rounded-2xl text-center">
                <span className="text-[11px] text-[#5F5675] block">Batch Placement Rate</span>
                <span className="text-2xl font-extrabold font-display text-emerald-600">84.6%</span>
                <span className="text-[10px] text-emerald-700 font-semibold block mt-0.5">+6.4% YoY Growth</span>
              </div>
              <div className="neu-inset p-4 rounded-2xl text-center">
                <span className="text-[11px] text-[#5F5675] block">Enrolled Candidates</span>
                <span className="text-2xl font-extrabold font-display text-[#7138E8]">8,400</span>
                <span className="text-[10px] text-purple-700 font-semibold block mt-0.5">Verified Profiles</span>
              </div>
              <div className="neu-inset p-4 rounded-2xl text-center">
                <span className="text-[11px] text-[#5F5675] block">Average Package</span>
                <span className="text-2xl font-extrabold font-display text-[#21163B]">₹8.4 LPA</span>
                <span className="text-[10px] text-indigo-700 font-semibold block mt-0.5">Highest: ₹32 LPA</span>
              </div>
              <div className="neu-inset p-4 rounded-2xl text-center">
                <span className="text-[11px] text-[#5F5675] block">Pending Approvals</span>
                <span className="text-2xl font-extrabold font-display text-amber-600">
                  {approvalRequests.filter((r) => r.status === 'pending_approval').length}
                </span>
                <span className="text-[10px] text-amber-700 font-semibold block mt-0.5">Action Required</span>
              </div>
            </div>
          </div>

          {/* Quick Shortcuts */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div
              onClick={() => setActiveModule('approvals')}
              className="neu-extruded p-5 rounded-2xl cursor-pointer hover:border-purple-300 transition-all flex items-center justify-between"
            >
              <div>
                <h3 className="font-bold text-sm text-[#21163B] font-display">Student Approval Center</h3>
                <p className="text-[11px] text-[#5F5675] mt-0.5">Verify student & recruiter credentials</p>
              </div>
              <span className="w-8 h-8 rounded-xl bg-amber-100 text-amber-700 flex items-center justify-center font-bold text-xs">
                {approvalRequests.filter((r) => r.status === 'pending_approval').length}
              </span>
            </div>

            <div
              onClick={() => setActiveModule('mp-network')}
              className="neu-extruded p-5 rounded-2xl cursor-pointer hover:border-purple-300 transition-all flex items-center justify-between"
            >
              <div>
                <h3 className="font-bold text-sm text-[#21163B] font-display">MP College Network</h3>
                <p className="text-[11px] text-[#5F5675] mt-0.5">Coordinate pooled drives across MP</p>
              </div>
              <span className="w-8 h-8 rounded-xl bg-purple-100 text-[#7138E8] flex items-center justify-center font-bold text-xs">
                {colleges.length}
              </span>
            </div>

            <div
              onClick={() => setActiveModule('students')}
              className="neu-extruded p-5 rounded-2xl cursor-pointer hover:border-purple-300 transition-all flex items-center justify-between"
            >
              <div>
                <h3 className="font-bold text-sm text-[#21163B] font-display">Student Management</h3>
                <p className="text-[11px] text-[#5F5675] mt-0.5">Filter by branch, CGPA, and test score</p>
              </div>
              <span className="w-8 h-8 rounded-xl bg-emerald-100 text-emerald-700 flex items-center justify-center font-bold text-xs">
                {students.length}
              </span>
            </div>
          </div>
        </div>
      )}

      {/* 2. CENTRALIZED STUDENT APPROVAL CENTER (CRITICAL CORE WORKFLOW) */}
      {activeModule === 'approvals' && (
        <div className="neu-extruded p-6 sm:p-8 rounded-3xl space-y-6">
          <div className="flex flex-wrap items-center justify-between gap-4 pb-4 border-b border-purple-200/60">
            <div>
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full neu-inset text-xs font-bold text-[#7138E8]">
                <Shield className="w-3.5 h-3.5" />
                <span>Central Governance Matrix</span>
              </div>
              <h2 className="text-2xl font-bold font-display text-[#21163B] mt-1.5">
                Centralized Approval Center
              </h2>
              <p className="text-xs text-[#5F5675]">
                Validate institutional registrations, verify academic marksheets, and activate role dashboard credentials.
              </p>
            </div>

            <div className="text-right">
              <span className="text-xs font-bold text-[#7138E8] bg-purple-100 px-3 py-1.5 rounded-xl border border-purple-200">
                {approvalRequests.filter((r) => r.status === 'pending_approval').length} Pending Decisions
              </span>
            </div>
          </div>

          {/* 8 Tab Navigation per prompt requirements */}
          <div className="flex flex-wrap gap-1.5 p-1.5 neu-inset rounded-2xl text-xs font-bold">
            <button
              onClick={() => setApprovalTab('pending')}
              className={`px-3 py-2 rounded-xl transition-all cursor-pointer ${
                approvalTab === 'pending' ? 'btn-kinetic text-white shadow-xs' : 'text-[#5F5675] hover:text-[#21163B]'
              }`}
            >
              Pending Approvals ({approvalRequests.filter((r) => r.status === 'pending_approval').length})
            </button>
            <button
              onClick={() => setApprovalTab('student')}
              className={`px-3 py-2 rounded-xl transition-all cursor-pointer ${
                approvalTab === 'student' ? 'btn-kinetic text-white shadow-xs' : 'text-[#5F5675] hover:text-[#21163B]'
              }`}
            >
              Student Requests
            </button>
            <button
              onClick={() => setApprovalTab('recruiter')}
              className={`px-3 py-2 rounded-xl transition-all cursor-pointer ${
                approvalTab === 'recruiter' ? 'btn-kinetic text-white shadow-xs' : 'text-[#5F5675] hover:text-[#21163B]'
              }`}
            >
              Recruiter Requests
            </button>
            <button
              onClick={() => setApprovalTab('docs')}
              className={`px-3 py-2 rounded-xl transition-all cursor-pointer ${
                approvalTab === 'docs' ? 'btn-kinetic text-white shadow-xs' : 'text-[#5F5675] hover:text-[#21163B]'
              }`}
            >
              Document Verification
            </button>
            <button
              onClick={() => setApprovalTab('approved')}
              className={`px-3 py-2 rounded-xl transition-all cursor-pointer ${
                approvalTab === 'approved' ? 'btn-kinetic text-white shadow-xs' : 'text-[#5F5675] hover:text-[#21163B]'
              }`}
            >
              Approved Accounts
            </button>
            <button
              onClick={() => setApprovalTab('rejected')}
              className={`px-3 py-2 rounded-xl transition-all cursor-pointer ${
                approvalTab === 'rejected' ? 'btn-kinetic text-white shadow-xs' : 'text-[#5F5675] hover:text-[#21163B]'
              }`}
            >
              Rejected Accounts
            </button>
            <button
              onClick={() => setApprovalTab('suspended')}
              className={`px-3 py-2 rounded-xl transition-all cursor-pointer ${
                approvalTab === 'suspended' ? 'btn-kinetic text-white shadow-xs' : 'text-[#5F5675] hover:text-[#21163B]'
              }`}
            >
              Suspended Accounts
            </button>
            <button
              onClick={() => setApprovalTab('history')}
              className={`px-3 py-2 rounded-xl transition-all cursor-pointer ${
                approvalTab === 'history' ? 'btn-kinetic text-white shadow-xs' : 'text-[#5F5675] hover:text-[#21163B]'
              }`}
            >
              Approval History
            </button>
          </div>

          {/* Requests Table */}
          <div className="overflow-x-auto">
            {filteredRequests.length === 0 ? (
              <div className="p-8 text-center neu-inset rounded-2xl text-xs text-[#5F5675]">
                No applications matching this status.
              </div>
            ) : (
              <table className="w-full text-left text-xs">
                <thead>
                  <tr className="border-b border-purple-200/60 text-[#5F5675] font-semibold">
                    <th className="py-3 px-3">Applicant Name</th>
                    <th className="py-3 px-3">Role</th>
                    <th className="py-3 px-3">Organization / Institute</th>
                    <th className="py-3 px-3">Requested At</th>
                    <th className="py-3 px-3">Documents</th>
                    <th className="py-3 px-3">Status</th>
                    <th className="py-3 px-3 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-purple-100">
                  {filteredRequests.map((req) => (
                    <tr key={req.id} className="hover:bg-purple-50/50 transition-colors">
                      <td className="py-3 px-3 font-bold text-[#21163B]">
                        {req.applicantName}
                        <span className="block text-[10px] text-[#5F5675] font-normal">{req.applicantEmail}</span>
                      </td>
                      <td className="py-3 px-3">
                        <span className="capitalize px-2 py-0.5 rounded-full text-[10px] font-bold bg-purple-100 text-[#7138E8]">
                          {req.applicantRole}
                        </span>
                      </td>
                      <td className="py-3 px-3 text-[#21163B] font-medium max-w-[200px] truncate">
                        {req.organizationOrCollege}
                      </td>
                      <td className="py-3 px-3 text-[#5F5675] whitespace-nowrap">
                        {new Date(req.requestedAt).toLocaleDateString()}
                      </td>
                      <td className="py-3 px-3">
                        <span className="text-[11px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-md border border-emerald-200">
                          {req.documents.length} Files
                        </span>
                      </td>
                      <td className="py-3 px-3">
                        <span
                          className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                            req.status === 'approved'
                              ? 'bg-emerald-100 text-emerald-800'
                              : req.status === 'rejected'
                              ? 'bg-rose-100 text-rose-800'
                              : 'bg-amber-100 text-amber-800'
                          }`}
                        >
                          {req.status}
                        </span>
                      </td>
                      <td className="py-3 px-3 text-right">
                        <button
                          onClick={() => {
                            setSelectedRequest(req);
                            setRemarksInput(req.remarks || '');
                          }}
                          className="btn-kinetic px-3 py-1.5 rounded-xl text-xs font-bold cursor-pointer"
                        >
                          Review & Decide
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        </div>
      )}

      {/* 3. STUDENT MANAGEMENT */}
      {activeModule === 'students' && (
        <div className="neu-extruded p-6 sm:p-8 rounded-3xl space-y-6">
          <div className="flex flex-wrap items-center justify-between gap-4 pb-4 border-b border-purple-200/60">
            <div>
              <h2 className="text-xl font-bold font-display text-[#21163B]">Student Directory & Records</h2>
              <p className="text-xs text-[#5F5675]">Granular multi-factor candidate filtering with verified resume review</p>
            </div>
            <span className="text-xs font-bold text-[#7138E8] bg-purple-100 px-3 py-1 rounded-full">
              {filteredStudents.length} Students Listed
            </span>
          </div>

          {/* Filters Bar */}
          <div className="grid grid-cols-1 sm:grid-cols-4 gap-3 p-3 neu-inset rounded-2xl text-xs">
            <div>
              <label className="block text-[11px] font-semibold text-[#5F5675] mb-1">Search Student / ID</label>
              <input
                type="text"
                placeholder="Name or Enrollment No..."
                value={studentSearch}
                onChange={(e) => setStudentSearch(e.target.value)}
                className="neu-input w-full px-3 py-1.5 rounded-xl"
              />
            </div>

            <div>
              <label className="block text-[11px] font-semibold text-[#5F5675] mb-1">Branch</label>
              <select
                value={selectedBranch}
                onChange={(e) => setSelectedBranch(e.target.value)}
                className="neu-input w-full px-3 py-1.5 rounded-xl"
              >
                <option value="All">All Branches</option>
                <option value="Computer Science">Computer Science</option>
                <option value="Information Technology">Information Technology</option>
                <option value="Electronics">Electronics & Comm</option>
              </select>
            </div>

            <div>
              <label className="block text-[11px] font-semibold text-[#5F5675] mb-1">Min CGPA: {minCgpa}</label>
              <input
                type="range"
                min="0"
                max="9.5"
                step="0.5"
                value={minCgpa}
                onChange={(e) => setMinCgpa(Number(e.target.value))}
                className="w-full accent-[#7138E8]"
              />
            </div>

            <div>
              <label className="block text-[11px] font-semibold text-[#5F5675] mb-1">Min Employability: {minScore}</label>
              <input
                type="range"
                min="0"
                max="90"
                step="5"
                value={minScore}
                onChange={(e) => setMinScore(Number(e.target.value))}
                className="w-full accent-[#7138E8]"
              />
            </div>
          </div>

          {/* Students Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredStudents.map((st) => (
              <div key={st.id} className="neu-extruded p-5 rounded-2xl flex flex-col justify-between space-y-3">
                <div>
                  <div className="flex items-center space-x-3">
                    <img src={st.avatar} alt={st.name} className="w-11 h-11 rounded-xl object-cover border border-white" />
                    <div>
                      <h4 className="font-bold text-sm text-[#21163B] font-display">{st.name}</h4>
                      <p className="text-[11px] text-[#5F5675]">{st.enrollmentNo}</p>
                    </div>
                  </div>

                  <p className="text-xs text-[#5F5675] mt-2 font-medium">{st.branch}</p>

                  <div className="grid grid-cols-2 gap-2 mt-3 neu-inset p-2 rounded-xl text-center text-xs">
                    <div>
                      <span className="text-[10px] text-[#5F5675] block">CGPA</span>
                      <span className="font-bold text-[#21163B]">{st.cgpa.toFixed(2)}</span>
                    </div>
                    <div>
                      <span className="text-[10px] text-[#5F5675] block">Employability</span>
                      <span className="font-bold text-[#7138E8]">{st.employabilityScore}/100</span>
                    </div>
                  </div>
                </div>

                <div className="pt-2 border-t border-purple-100 flex items-center justify-between">
                  <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                    st.status === 'approved' ? 'bg-emerald-100 text-emerald-800' : 'bg-amber-100 text-amber-800'
                  }`}>
                    {st.status}
                  </span>
                  <button
                    onClick={() => setInspectedStudent(st)}
                    className="btn-tactile px-3 py-1.5 rounded-xl text-xs font-semibold cursor-pointer"
                  >
                    View Full Profile
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* 4. RECRUITER MANAGEMENT */}
      {activeModule === 'recruiters' && (
        <div className="neu-extruded p-6 sm:p-8 rounded-3xl space-y-6">
          <h2 className="text-xl font-bold font-display text-[#21163B]">Corporate Recruiting Partners</h2>
          <p className="text-xs text-[#5F5675]">Approved enterprise recruiters authorized to conduct campus recruitment.</p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {recruiters.map((rec) => (
              <div key={rec.id} className="neu-extruded p-5 rounded-2xl space-y-3">
                <div className="flex items-center space-x-3">
                  <img src={rec.avatar} alt={rec.name} className="w-11 h-11 rounded-xl object-cover border border-white" />
                  <div>
                    <h4 className="font-bold text-sm text-[#21163B] font-display">{rec.companyName}</h4>
                    <p className="text-[11px] text-[#5F5675]">{rec.name} ({rec.designation})</p>
                  </div>
                </div>
                <div className="neu-inset p-2.5 rounded-xl text-xs space-y-1">
                  <div className="flex justify-between">
                    <span className="text-[#5F5675]">Industry:</span>
                    <span className="font-bold text-[#21163B]">{rec.industry}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-[#5F5675]">Packages:</span>
                    <span className="font-bold text-emerald-700">{rec.activeHiringPackages}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* 6. MP COLLEGE NETWORK (INTERACTIVE MAP & DISTRICT FILTERING) */}
      {activeModule === 'mp-network' && (
        <div className="neu-extruded p-6 sm:p-8 rounded-3xl space-y-6">
          <div className="flex flex-wrap items-center justify-between gap-4 pb-4 border-b border-purple-200/60">
            <div>
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full neu-inset text-xs font-bold text-[#7138E8]">
                <MapPin className="w-3.5 h-3.5 text-[#E75ACF]" />
                <span>State Institutional Grid</span>
              </div>
              <h2 className="text-2xl font-bold font-display text-[#21163B] mt-1.5">
                Madhya Pradesh College Network
              </h2>
              <p className="text-xs text-[#5F5675]">
                Interactive mapping of engineering & technology institutions across all 52 districts of MP.
              </p>
            </div>

            {/* District Filter Pill Bar */}
            <div className="flex items-center gap-2">
              <span className="text-xs font-semibold text-[#5F5675]">District:</span>
              <select
                value={selectedDistrict}
                onChange={(e) => setSelectedDistrict(e.target.value)}
                className="neu-input px-3 py-1.5 text-xs rounded-xl"
              >
                <option value="All">All Districts</option>
                <option value="Bhopal">Bhopal</option>
                <option value="Indore">Indore</option>
                <option value="Jabalpur">Jabalpur</option>
                <option value="Gwalior">Gwalior</option>
                <option value="Ujjain">Ujjain</option>
                <option value="Vidisha">Vidisha</option>
                <option value="Rewa">Rewa</option>
              </select>
            </div>
          </div>

          {/* Interactive Visual Map Representation */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
            <div className="lg:col-span-7 neu-inset p-5 rounded-3xl space-y-4">
              <div className="flex justify-between items-center text-xs font-bold text-[#7138E8]">
                <span>Interactive MP Spatial Map</span>
                <span className="text-[10px] bg-white/80 px-2 py-0.5 rounded-md border border-purple-200">
                  Click Marker to View College
                </span>
              </div>

              {/* Styled SVG Map of Madhya Pradesh Hubs */}
              <div className="relative w-full h-80 rounded-2xl bg-gradient-to-br from-[#E9DFFF] to-[#F3F0FF] border border-white flex items-center justify-center overflow-hidden">
                <svg viewBox="0 0 500 320" className="w-full h-full">
                  {/* MP State approximate abstract contour */}
                  <path
                    d="M 60 140 Q 120 70 240 60 Q 340 40 430 110 Q 460 190 380 250 Q 280 290 160 260 Q 70 220 60 140 Z"
                    fill="#DDD2FA"
                    stroke="#BBA6F4"
                    strokeWidth="2"
                    strokeDasharray="4 2"
                  />

                  {/* Connecting inter-district drive highways */}
                  <line x1="160" y1="180" x2="220" y2="170" stroke="#7138E8" strokeWidth="2" strokeOpacity="0.5" />
                  <line x1="220" y1="170" x2="330" y2="190" stroke="#7138E8" strokeWidth="2" strokeOpacity="0.5" />
                  <line x1="220" y1="170" x2="260" y2="90" stroke="#7138E8" strokeWidth="2" strokeOpacity="0.5" />

                  {/* College Pins */}
                  {colleges.map((col, idx) => {
                    // Map lat/long to svg coords
                    const x = ((col.lng - 75.0) / 7.0) * 400 + 70;
                    const y = (-(col.lat - 26.5) / 4.0) * 260 + 50;
                    const isSelected = selectedCollegeOnMap?.id === col.id;

                    return (
                      <g
                        key={col.id}
                        transform={`translate(${x}, ${y})`}
                        onClick={() => setSelectedCollegeOnMap(col)}
                        className="cursor-pointer group"
                      >
                        <circle
                          r={isSelected ? 10 : 7}
                          fill={isSelected ? '#E75ACF' : '#7138E8'}
                          stroke="#FFFFFF"
                          strokeWidth="2"
                          className="transition-all"
                        />
                        <text
                          y="-10"
                          textAnchor="middle"
                          fill="#21163B"
                          fontSize="10"
                          fontWeight="bold"
                          className="pointer-events-none"
                        >
                          {col.district}
                        </text>
                      </g>
                    );
                  })}
                </svg>
              </div>
            </div>

            {/* Selected College Detail Card */}
            <div className="lg:col-span-5 space-y-4">
              {selectedCollegeOnMap ? (
                <div className="neu-extruded p-5 rounded-2xl space-y-3">
                  <span className="text-[10px] font-bold text-[#7138E8] uppercase tracking-wider bg-purple-100 px-2 py-0.5 rounded-full">
                    {selectedCollegeOnMap.district} Hub
                  </span>
                  <h3 className="font-bold text-base text-[#21163B] font-display">
                    {selectedCollegeOnMap.name}
                  </h3>
                  <div className="neu-inset p-3 rounded-xl text-xs space-y-1.5">
                    <div className="flex justify-between">
                      <span className="text-[#5F5675]">TPO Officer:</span>
                      <span className="font-bold text-[#21163B]">{selectedCollegeOnMap.tpoName}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-[#5F5675]">Contact Email:</span>
                      <span className="font-bold text-[#7138E8]">{selectedCollegeOnMap.tpoEmail}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-[#5F5675]">Students Enrolled:</span>
                      <span className="font-bold text-[#21163B]">{selectedCollegeOnMap.studentCount.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-[#5F5675]">Placement Rate:</span>
                      <span className="font-bold text-emerald-600">{selectedCollegeOnMap.placementRate}%</span>
                    </div>
                  </div>

                  <div className="pt-2">
                    <span className="text-[11px] font-semibold text-[#5F5675] block mb-1">Top Recruiters:</span>
                    <div className="flex flex-wrap gap-1">
                      {selectedCollegeOnMap.topRecruiters.map((r, i) => (
                        <span key={i} className="text-[10px] bg-white px-2 py-0.5 rounded-md border border-purple-200">
                          {r}
                        </span>
                      ))}
                    </div>
                  </div>

                  <button className="w-full btn-kinetic py-2 rounded-xl text-xs font-bold cursor-pointer mt-2">
                    Coordinate Pooled Campus Drive
                  </button>
                </div>
              ) : (
                <div className="neu-flat p-6 rounded-2xl text-center text-xs text-[#5F5675]">
                  Click any district marker on the interactive map to inspect institutional placement stats and TPO contact coordinates.
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* 5. INSTITUTION PROFILE MODULE */}
      {activeModule === 'institution' && <InstitutionProfileModule />}

      {/* 7. SKILL ANALYTICS & 8. EMPLOYABILITY ANALYTICS */}
      {(activeModule === 'skill-analytics' || activeModule === 'employability-analytics') && (
        <EmployabilityAnalyticsModule />
      )}

      {/* 9. PLACEMENT MANAGEMENT, 10. JOB MANAGEMENT & 11. CAMPUS DRIVES */}
      {(activeModule === 'placements' ||
        activeModule === 'job-management' ||
        activeModule === 'campus-drives') && <JobManagementModule />}

      {/* 12. ASSESSMENT MANAGEMENT */}
      {activeModule === 'assessments-admin' && <AssessmentManagementModule />}

      {/* 13. REPORTS */}
      {activeModule === 'reports' && <ReportsModule />}

      {/* 14. EVENTS & WORKSHOPS */}
      {activeModule === 'events' && <EventsWorkshopsModule />}

      {/* 15. NOTIFICATIONS */}
      {activeModule === 'notifications' && <NotificationsCenterModule />}

      {/* 16. SETTINGS */}
      {activeModule === 'settings' && <TPOSettingsModule />}

      {/* MODAL: Central Approval Request Reviewer */}
      {selectedRequest && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-xs">
          <div className="w-full max-w-xl neu-floating rounded-3xl p-6 sm:p-8 space-y-5 bg-[#F3F0FF] max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-start pb-3 border-b border-purple-200/60">
              <div>
                <span className="text-[10px] font-bold text-[#7138E8] uppercase tracking-wider bg-purple-100 px-2 py-0.5 rounded-full">
                  {selectedRequest.applicantRole} Application
                </span>
                <h3 className="text-xl font-bold font-display text-[#21163B] mt-1">
                  {selectedRequest.applicantName}
                </h3>
                <p className="text-xs text-[#5F5675]">{selectedRequest.organizationOrCollege}</p>
              </div>
              <button
                onClick={() => setSelectedRequest(null)}
                className="p-1 rounded-lg text-[#5F5675] hover:text-[#21163B] cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Submitted Application Data */}
            <div className="neu-inset p-4 rounded-2xl text-xs space-y-2">
              <h4 className="font-bold text-[#21163B]">Submitted Credentials</h4>
              {Object.entries(selectedRequest.details || {}).map(([key, val]) => (
                <div key={key} className="flex justify-between">
                  <span className="text-[#5F5675] capitalize">{key.replace(/([A-Z])/g, ' $1')}:</span>
                  <span className="font-bold text-[#21163B] truncate max-w-[280px]">{String(val)}</span>
                </div>
              ))}
            </div>

            {/* Document Review List */}
            <div>
              <h4 className="text-xs font-bold text-[#21163B] mb-2">Verified Documents Attached:</h4>
              <div className="space-y-2">
                {selectedRequest.documents.map((doc, idx) => (
                  <div key={idx} className="p-3 rounded-xl neu-flat flex items-center justify-between text-xs">
                    <span className="font-medium text-[#21163B] flex items-center gap-1.5">
                      <FileText className="w-3.5 h-3.5 text-[#7138E8]" />
                      {doc.name}
                    </span>
                    <span className="text-[11px] font-bold text-[#7138E8] cursor-pointer hover:underline">
                      View Document
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Officer Remarks Input */}
            <div>
              <label className="block text-xs font-semibold text-[#21163B] mb-1">
                Internal Remarks / Audit Note:
              </label>
              <input
                type="text"
                placeholder="e.g. Marksheet verified against university database. Approved."
                value={remarksInput}
                onChange={(e) => setRemarksInput(e.target.value)}
                className="neu-input w-full px-3 py-2 text-xs rounded-xl"
              />
            </div>

            {/* Action Buttons */}
            <div className="flex flex-wrap items-center justify-between gap-2 pt-2 border-t border-purple-200/60">
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setShowRejectModal(true)}
                  className="px-3.5 py-2 rounded-xl text-xs font-bold bg-rose-100 text-rose-800 hover:bg-rose-200 transition-colors cursor-pointer"
                >
                  Reject Application
                </button>
                <button
                  onClick={() => setShowInfoModal(true)}
                  className="px-3.5 py-2 rounded-xl text-xs font-bold bg-amber-100 text-amber-800 hover:bg-amber-200 transition-colors cursor-pointer"
                >
                  Request Info
                </button>
              </div>

              <button
                onClick={() => handleApprove(selectedRequest.id)}
                className="btn-kinetic px-6 py-2 rounded-xl text-xs font-bold flex items-center gap-1.5 cursor-pointer shadow-md"
              >
                <CheckCircle className="w-4 h-4" />
                <span>Approve & Activate Account</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Rejection Reason Dialog */}
      {showRejectModal && (
        <div className="fixed inset-0 z-60 flex items-center justify-center p-4 bg-black/50">
          <div className="w-full max-w-md neu-floating rounded-3xl p-6 space-y-4 bg-[#F3F0FF]">
            <h3 className="font-bold text-sm text-rose-700">Specify Rejection Reason</h3>
            <p className="text-xs text-[#5F5675]">
              This reason will be recorded in the audit log and notified to the applicant.
            </p>
            <textarea
              rows={3}
              value={rejectionReasonInput}
              onChange={(e) => setRejectionReasonInput(e.target.value)}
              placeholder="e.g. Missing semester 6 marksheet or invalid college registration number."
              className="neu-input w-full p-3 text-xs rounded-xl"
            ></textarea>
            <div className="flex justify-end gap-2">
              <button
                onClick={() => setShowRejectModal(false)}
                className="btn-tactile px-3 py-1.5 text-xs rounded-xl"
              >
                Cancel
              </button>
              <button
                onClick={handleRejectConfirm}
                className="px-4 py-1.5 rounded-xl text-xs font-bold bg-rose-600 text-white cursor-pointer"
              >
                Confirm Rejection
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Request Info Dialog */}
      {showInfoModal && (
        <div className="fixed inset-0 z-60 flex items-center justify-center p-4 bg-black/50">
          <div className="w-full max-w-md neu-floating rounded-3xl p-6 space-y-4 bg-[#F3F0FF]">
            <h3 className="font-bold text-sm text-amber-800">Request Additional Information</h3>
            <textarea
              rows={3}
              value={moreInfoInput}
              onChange={(e) => setMoreInfoInput(e.target.value)}
              placeholder="e.g. Please upload your latest verified AICTE approval letter."
              className="neu-input w-full p-3 text-xs rounded-xl"
            ></textarea>
            <div className="flex justify-end gap-2">
              <button onClick={() => setShowInfoModal(false)} className="btn-tactile px-3 py-1.5 text-xs rounded-xl">
                Cancel
              </button>
              <button
                onClick={handleRequestInfoConfirm}
                className="btn-kinetic px-4 py-1.5 rounded-xl text-xs font-bold cursor-pointer"
              >
                Send Request to Applicant
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Inspected Student Modal */}
      {inspectedStudent && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-xs">
          <div className="w-full max-w-lg neu-floating rounded-3xl p-6 space-y-4 bg-[#F3F0FF]">
            <div className="flex justify-between items-center pb-3 border-b border-purple-200">
              <h3 className="font-bold text-base text-[#21163B] font-display">{inspectedStudent.name}</h3>
              <button onClick={() => setInspectedStudent(null)} className="cursor-pointer">
                <X className="w-5 h-5 text-[#5F5675]" />
              </button>
            </div>
            <div className="neu-inset p-3 rounded-xl text-xs space-y-1">
              <div>College: <strong>{inspectedStudent.college}</strong></div>
              <div>Branch: <strong>{inspectedStudent.branch}</strong></div>
              <div>CGPA: <strong>{inspectedStudent.cgpa}</strong></div>
              <div>Employability Readiness: <strong className="text-[#7138E8]">{inspectedStudent.employabilityScore}/100</strong></div>
            </div>
            <button
              onClick={() => setInspectedStudent(null)}
              className="w-full btn-kinetic py-2 rounded-xl text-xs font-bold cursor-pointer"
            >
              Close Record
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
