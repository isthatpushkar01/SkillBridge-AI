import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { AdminProfile, MPCollege, UserBase } from '../../types';
import confetti from 'canvas-confetti';
import { StateDirectorateGovernance } from '../modules/StateDirectorateGovernance';
import {
  Activity,
  Award,
  BarChart3,
  CheckCircle,
  Clock,
  Cpu,
  FileText,
  HelpCircle,
  History,
  KeyRound,
  Layers,
  MapPin,
  MessageSquare,
  School,
  Search,
  Server,
  Settings,
  Shield,
  ShieldAlert,
  ShieldCheck,
  Sliders,
  Sparkles,
  TrendingUp,
  UserCheck,
  Users,
  X,
  XCircle,
} from 'lucide-react';

export const AdminDashboard: React.FC = () => {
  const {
    currentUser,
    activeModule,
    setActiveModule,
    students,
    tpos,
    recruiters,
    colleges,
    approvalRequests,
    auditLogs,
    approveRequest,
    rejectRequest,
  } = useApp();

  const admin = currentUser as AdminProfile;

  // Global User Filter State
  const [userRoleFilter, setUserRoleFilter] = useState<string>('all');
  const [userSearchQuery, setUserSearchQuery] = useState('');

  // AI Configuration State
  const [technicalWeight, setTechnicalWeight] = useState(30);
  const [commWeight, setCommWeight] = useState(20);
  const [problemSolvingWeight, setProblemSolvingWeight] = useState(20);
  const [domainWeight, setDomainWeight] = useState(15);
  const [projectWeight, setProjectWeight] = useState(15);
  const [aiSavedFeedback, setAiSavedFeedback] = useState(false);

  const handleSaveAiConfig = (e: React.FormEvent) => {
    e.preventDefault();
    setAiSavedFeedback(true);
    setTimeout(() => setAiSavedFeedback(false), 3000);
  };

  // Combine users for User Management
  const allUsers: UserBase[] = [
    ...students.map((s) => ({ ...s, roleTag: 'Student' })),
    ...tpos.map((t) => ({ ...t, roleTag: 'TPO Officer' })),
    ...recruiters.map((r) => ({ ...r, roleTag: 'Recruiter' })),
  ];

  const filteredUsers = allUsers.filter((u) => {
    const matchesRole = userRoleFilter === 'all' || u.role === userRoleFilter;
    const matchesSearch =
      u.name.toLowerCase().includes(userSearchQuery.toLowerCase()) ||
      u.email.toLowerCase().includes(userSearchQuery.toLowerCase());
    return matchesRole && matchesSearch;
  });

  return (
    <div className="space-y-6">
      {/* 0. STATE DIRECTORATE GOVERNANCE (ADVANCED MODULE 1) */}
      {(activeModule === 'directorate-governance' || activeModule === 'overview') && (
        <StateDirectorateGovernance onBack={() => setActiveModule('overview')} />
      )}

      {/* 1. PLATFORM OVERVIEW EXTENDED */}
      {activeModule === 'overview-legacy' && (
        <div className="space-y-6">
          <div className="neu-extruded p-6 sm:p-8 rounded-3xl">
            <div className="flex flex-wrap items-center justify-between gap-4">
              <div>
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full neu-inset text-xs font-bold text-[#7138E8]">
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                  <span>State Administration & Governance Directorate</span>
                </div>
                <h1 className="text-2xl sm:text-3xl font-extrabold font-display text-[#21163B] mt-2">
                  {admin?.name || 'Director of Technical Education'}
                </h1>
                <p className="text-xs sm:text-sm text-[#5F5675]">
                  {admin?.designation} • {admin?.organization}
                </p>
              </div>

              <div className="flex items-center gap-2">
                <span className="text-xs font-bold text-emerald-700 bg-emerald-100 px-3 py-1.5 rounded-xl border border-emerald-300">
                  System Health: 99.98% Active
                </span>
              </div>
            </div>

            {/* Platform Stats Row */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6">
              <div className="neu-inset p-4 rounded-2xl text-center">
                <span className="text-[11px] text-[#5F5675] block">Registered Institutions</span>
                <span className="text-2xl font-extrabold font-display text-[#7138E8]">{colleges.length}</span>
                <span className="text-[10px] text-purple-700 font-semibold block mt-0.5">MP Technical Grid</span>
              </div>
              <div className="neu-inset p-4 rounded-2xl text-center">
                <span className="text-[11px] text-[#5F5675] block">Total Student Tally</span>
                <span className="text-2xl font-extrabold font-display text-emerald-600">8,400+</span>
                <span className="text-[10px] text-emerald-700 font-semibold block mt-0.5">Verified Passports</span>
              </div>
              <div className="neu-inset p-4 rounded-2xl text-center">
                <span className="text-[11px] text-[#5F5675] block">TPO Verifications Pending</span>
                <span className="text-2xl font-extrabold font-display text-amber-600">
                  {approvalRequests.filter((r) => r.applicantRole === 'tpo' && r.status === 'pending_approval').length}
                </span>
                <span className="text-[10px] text-amber-700 font-semibold block mt-0.5">AICTE Review</span>
              </div>
              <div className="neu-inset p-4 rounded-2xl text-center">
                <span className="text-[11px] text-[#5F5675] block">Audit Log Entries</span>
                <span className="text-2xl font-extrabold font-display text-[#21163B]">{auditLogs.length}</span>
                <span className="text-[10px] text-indigo-700 font-semibold block mt-0.5">Zero Anomalies</span>
              </div>
            </div>
          </div>

          {/* Quick Shortcuts */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div
              onClick={() => setActiveModule('tpo-verification')}
              className="neu-extruded p-5 rounded-2xl cursor-pointer hover:border-purple-300 transition-all flex items-center justify-between"
            >
              <div>
                <h3 className="font-bold text-sm text-[#21163B] font-display">TPO Verification</h3>
                <p className="text-[11px] text-[#5F5675] mt-0.5">Authorize college placement officers</p>
              </div>
              <School className="w-5 h-5 text-[#7138E8]" />
            </div>

            <div
              onClick={() => setActiveModule('audit-logs')}
              className="neu-extruded p-5 rounded-2xl cursor-pointer hover:border-purple-300 transition-all flex items-center justify-between"
            >
              <div>
                <h3 className="font-bold text-sm text-[#21163B] font-display">Platform Audit Logs</h3>
                <p className="text-[11px] text-[#5F5675] mt-0.5">Inspect security events</p>
              </div>
              <History className="w-5 h-5 text-indigo-600" />
            </div>

            <div
              onClick={() => setActiveModule('ai-config')}
              className="neu-extruded p-5 rounded-2xl cursor-pointer hover:border-purple-300 transition-all flex items-center justify-between"
            >
              <div>
                <h3 className="font-bold text-sm text-[#21163B] font-display">AI Scoring Config</h3>
                <p className="text-[11px] text-[#5F5675] mt-0.5">Calibrate employability model</p>
              </div>
              <Cpu className="w-5 h-5 text-[#E75ACF]" />
            </div>
          </div>
        </div>
      )}

      {/* 2. TPO VERIFICATION */}
      {activeModule === 'tpo-verification' && (
        <div className="neu-extruded p-6 sm:p-8 rounded-3xl space-y-6">
          <div className="flex justify-between items-center pb-4 border-b border-purple-200/60">
            <div>
              <h2 className="text-xl font-bold font-display text-[#21163B]">Institutional TPO Authorizations</h2>
              <p className="text-xs text-[#5F5675]">Verify college registration credentials against AICTE & state records</p>
            </div>
          </div>

          <div className="space-y-4">
            {approvalRequests
              .filter((r) => r.applicantRole === 'tpo')
              .map((req) => (
                <div key={req.id} className="p-5 rounded-2xl neu-flat space-y-3">
                  <div className="flex flex-wrap justify-between items-start gap-2">
                    <div>
                      <h4 className="font-bold text-base text-[#21163B] font-display">{req.applicantName}</h4>
                      <p className="text-xs text-[#5F5675] font-semibold">{req.organizationOrCollege}</p>
                      <span className="text-[11px] text-[#7138E8]">{req.applicantEmail}</span>
                    </div>
                    <span className={`text-[10px] font-bold px-2.5 py-1 rounded-full ${
                      req.status === 'approved' ? 'bg-emerald-100 text-emerald-800' : 'bg-amber-100 text-amber-800'
                    }`}>
                      {req.status}
                    </span>
                  </div>

                  <div className="flex items-center gap-2 pt-2 border-t border-purple-100">
                    <button
                      onClick={() => approveRequest(req.id, 'AICTE credential verified by DTE Director.')}
                      className="btn-kinetic px-4 py-1.5 rounded-xl text-xs font-bold cursor-pointer"
                    >
                      Authorize Institutional Authority
                    </button>
                    <button
                      onClick={() => rejectRequest(req.id, 'Insufficient institution accreditation documents.')}
                      className="px-3 py-1.5 rounded-xl text-xs font-semibold bg-rose-100 text-rose-800 hover:bg-rose-200 cursor-pointer"
                    >
                      Reject
                    </button>
                  </div>
                </div>
              ))}
          </div>
        </div>
      )}

      {/* 3. INSTITUTION MANAGEMENT */}
      {activeModule === 'institutions' && (
        <div className="neu-extruded p-6 sm:p-8 rounded-3xl space-y-6">
          <h2 className="text-xl font-bold font-display text-[#21163B]">Registered MP Institutions</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {colleges.map((col) => (
              <div key={col.id} className="neu-extruded p-5 rounded-2xl space-y-2">
                <span className="text-[10px] font-bold text-[#7138E8] uppercase bg-purple-100 px-2 py-0.5 rounded-full">
                  {col.district} District
                </span>
                <h4 className="font-bold text-sm text-[#21163B] font-display">{col.name}</h4>
                <div className="neu-inset p-2 rounded-xl text-xs space-y-1">
                  <div>TPO: <strong>{col.tpoName}</strong></div>
                  <div>Placement Rate: <strong className="text-emerald-600">{col.placementRate}%</strong></div>
                  <div>Students: <strong>{col.studentCount.toLocaleString()}</strong></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* 4. USER MANAGEMENT */}
      {activeModule === 'users' && (
        <div className="neu-extruded p-6 sm:p-8 rounded-3xl space-y-6">
          <div className="flex flex-wrap items-center justify-between gap-4 pb-4 border-b border-purple-200/60">
            <div>
              <h2 className="text-xl font-bold font-display text-[#21163B]">Platform User Directory</h2>
              <p className="text-xs text-[#5F5675]">Global multi-role user directory with permission enforcement</p>
            </div>
            <div className="flex items-center gap-2">
              <select
                value={userRoleFilter}
                onChange={(e) => setUserRoleFilter(e.target.value)}
                className="neu-input px-3 py-1.5 text-xs rounded-xl"
              >
                <option value="all">All Roles</option>
                <option value="student">Students</option>
                <option value="tpo">TPO Officers</option>
                <option value="recruiter">Recruiters</option>
              </select>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead>
                <tr className="border-b border-purple-200/60 text-[#5F5675] font-semibold">
                  <th className="py-2.5 px-3">Name</th>
                  <th className="py-2.5 px-3">Email</th>
                  <th className="py-2.5 px-3">Role</th>
                  <th className="py-2.5 px-3">Status</th>
                  <th className="py-2.5 px-3 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-purple-100">
                {filteredUsers.map((u) => (
                  <tr key={u.id} className="hover:bg-purple-50/50">
                    <td className="py-2.5 px-3 font-bold text-[#21163B]">{u.name}</td>
                    <td className="py-2.5 px-3 text-[#5F5675]">{u.email}</td>
                    <td className="py-2.5 px-3">
                      <span className="capitalize px-2 py-0.5 rounded-full text-[10px] font-bold bg-purple-100 text-[#7138E8]">
                        {u.role}
                      </span>
                    </td>
                    <td className="py-2.5 px-3">
                      <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                        u.status === 'approved' ? 'bg-emerald-100 text-emerald-800' : 'bg-amber-100 text-amber-800'
                      }`}>
                        {u.status}
                      </span>
                    </td>
                    <td className="py-2.5 px-3 text-right">
                      <button className="text-[11px] font-bold text-[#7138E8] hover:underline cursor-pointer">
                        Manage Access
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* 9. AI CONFIGURATION */}
      {activeModule === 'ai-config' && (
        <div className="neu-extruded p-6 sm:p-8 rounded-3xl space-y-6">
          <div className="flex justify-between items-center pb-4 border-b border-purple-200/60">
            <div>
              <h2 className="text-xl font-bold font-display text-[#21163B]">AI Employability Model Tuning</h2>
              <p className="text-xs text-[#5F5675]">Adjust neural scoring weights across the 5 evaluation dimensions</p>
            </div>
            {aiSavedFeedback && (
              <span className="text-xs font-bold text-emerald-700 bg-emerald-100 px-3 py-1 rounded-xl">
                ✓ Model Weights Updated Successfully
              </span>
            )}
          </div>

          <form onSubmit={handleSaveAiConfig} className="space-y-4 max-w-xl text-xs">
            <div>
              <div className="flex justify-between mb-1 font-semibold">
                <span>Technical Proficiency Weight</span>
                <span className="font-bold text-[#7138E8]">{technicalWeight}%</span>
              </div>
              <input
                type="range"
                min="20"
                max="50"
                value={technicalWeight}
                onChange={(e) => setTechnicalWeight(Number(e.target.value))}
                className="w-full accent-[#7138E8]"
              />
            </div>

            <div>
              <div className="flex justify-between mb-1 font-semibold">
                <span>Communication & Verbal Articulation Weight</span>
                <span className="font-bold text-[#963DF5]">{commWeight}%</span>
              </div>
              <input
                type="range"
                min="10"
                max="30"
                value={commWeight}
                onChange={(e) => setCommWeight(Number(e.target.value))}
                className="w-full accent-[#963DF5]"
              />
            </div>

            <div>
              <div className="flex justify-between mb-1 font-semibold">
                <span>Problem Solving & Algorithms Weight</span>
                <span className="font-bold text-[#E75ACF]">{problemSolvingWeight}%</span>
              </div>
              <input
                type="range"
                min="10"
                max="30"
                value={problemSolvingWeight}
                onChange={(e) => setProblemSolvingWeight(Number(e.target.value))}
                className="w-full accent-[#E75ACF]"
              />
            </div>

            <button
              type="submit"
              className="btn-kinetic px-6 py-2.5 rounded-xl font-bold cursor-pointer shadow-md mt-4"
            >
              Commit & Deploy AI Weights
            </button>
          </form>
        </div>
      )}

      {/* 11. AUDIT LOGS */}
      {activeModule === 'audit-logs' && (
        <div className="neu-extruded p-6 sm:p-8 rounded-3xl space-y-6">
          <div className="flex justify-between items-center pb-4 border-b border-purple-200/60">
            <div>
              <h2 className="text-xl font-bold font-display text-[#21163B]">Security & Platform Audit Logs</h2>
              <p className="text-xs text-[#5F5675]">Cryptographically timestamped audit trail of all role actions and approvals</p>
            </div>
          </div>

          <div className="space-y-3">
            {auditLogs.map((log) => (
              <div key={log.id} className="p-4 rounded-xl neu-flat text-xs space-y-1">
                <div className="flex flex-wrap justify-between items-center">
                  <div className="flex items-center gap-2">
                    <span className="font-mono text-[10px] font-bold text-[#7138E8] bg-purple-100 px-2 py-0.5 rounded-md">
                      {log.action}
                    </span>
                    <span className="font-bold text-[#21163B]">{log.performedBy}</span>
                  </div>
                  <span className="text-[10px] text-[#5F5675]">
                    {new Date(log.timestamp).toLocaleString()} • {log.ipAddress}
                  </span>
                </div>
                <p className="text-[#5F5675] leading-relaxed">{log.details}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* 12. ROLE & PERMISSIONS (RBAC) */}
      {activeModule === 'permissions' && (
        <div className="neu-extruded p-6 sm:p-8 rounded-3xl space-y-6">
          <h2 className="text-xl font-bold font-display text-[#21163B]">RBAC & Cross-Role Permission Governance</h2>
          <p className="text-xs text-[#5F5675]">Zero-trust policy enforcement across 4 sovereign system tiers (Student, TPO, Recruiter, State Admin).</p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
            <div className="neu-inset p-4 rounded-2xl space-y-2">
              <span className="font-bold text-[#7138E8] block">Candidate / Student Tier</span>
              <p className="text-[#5F5675]">Identity Anchor: APAAR / ABC ID & Roll Number. Allowed to create verified skill dossier, accept invites. Cannot self-promote or alter verified scores.</p>
            </div>
            <div className="neu-inset p-4 rounded-2xl space-y-2">
              <span className="font-bold text-purple-700 block">Enterprise Recruiter Tier</span>
              <p className="text-[#5F5675]">Identity Anchor: ROC CIN & GST. Allowed to post on-campus drives, view blinded talent readiness metrics. Zero direct messaging without clearance.</p>
            </div>
            <div className="neu-inset p-4 rounded-2xl space-y-2">
              <span className="font-bold text-amber-700 block">Institutional TPO Tier</span>
              <p className="text-[#5F5675]">Identity Anchor: Gazetted Dept of Tech Ed Token. Allowed to batch sign-off cohort passports, confirm campus drives. AISHE Locked.</p>
            </div>
            <div className="neu-inset p-4 rounded-2xl space-y-2">
              <span className="font-bold text-emerald-700 block">Sovereign State Admin Tier</span>
              <p className="text-[#5F5675]">Identity Anchor: MP-HED Root Ledger Private Key. Full state telemetry, TPO onboarding accreditation, revoke rogue nodes.</p>
            </div>
          </div>
        </div>
      )}

      {/* 13. APPROVAL OVERSIGHT */}
      {activeModule === 'oversight' && (
        <div className="neu-extruded p-6 sm:p-8 rounded-3xl space-y-6">
          <h2 className="text-xl font-bold font-display text-[#21163B]">Approval Oversight Center</h2>
          <p className="text-xs text-[#5F5675]">Supervisory dashboard of all pending and approved applications across institutions.</p>
          <div className="neu-inset p-4 rounded-2xl text-xs space-y-2">
            <div className="flex justify-between">
              <span>Total Applications Processed:</span>
              <strong className="text-[#7138E8]">{approvalRequests.length}</strong>
            </div>
            <div className="flex justify-between">
              <span>Pending Action:</span>
              <strong className="text-amber-700">{approvalRequests.filter((r) => r.status === 'pending_approval').length}</strong>
            </div>
            <div className="flex justify-between">
              <span>Approved Credentials:</span>
              <strong className="text-emerald-700">{approvalRequests.filter((r) => r.status === 'approved').length}</strong>
            </div>
          </div>
        </div>
      )}

      {/* 14. GLOBAL ANALYTICS */}
      {activeModule === 'global-analytics' && (
        <div className="neu-extruded p-6 sm:p-8 rounded-3xl space-y-6">
          <h2 className="text-xl font-bold font-display text-[#21163B]">Statewide Placement & Skill Analytics</h2>
          <p className="text-xs text-[#5F5675]">Aggregate telemetry across 184 technical institutions and 52 districts in MP.</p>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="neu-inset p-4 rounded-2xl text-center">
              <span className="text-xs text-[#5F5675] block">Total Talent Pool</span>
              <span className="text-2xl font-bold text-[#7138E8] block mt-1">45,280</span>
            </div>
            <div className="neu-inset p-4 rounded-2xl text-center">
              <span className="text-xs text-[#5F5675] block">Avg Readiness Score</span>
              <span className="text-2xl font-bold text-emerald-600 block mt-1">78.6 / 100</span>
            </div>
            <div className="neu-inset p-4 rounded-2xl text-center">
              <span className="text-xs text-[#5F5675] block">Placement Rate</span>
              <span className="text-2xl font-bold text-purple-600 block mt-1">82.4%</span>
            </div>
            <div className="neu-inset p-4 rounded-2xl text-center">
              <span className="text-xs text-[#5F5675] block">Ledger Integrity</span>
              <span className="text-2xl font-bold text-indigo-600 block mt-1">99.98%</span>
            </div>
          </div>
        </div>
      )}

      {/* 15. PLATFORM CONFIG, CONTENT, SECURITY, NOTIFICATIONS, SYSTEM HEALTH, SUPPORT */}
      {(activeModule === 'platform-config' ||
        activeModule === 'content' ||
        activeModule === 'security' ||
        activeModule === 'notifications-admin' ||
        activeModule === 'system-health' ||
        activeModule === 'support') && (
        <div className="neu-extruded p-6 sm:p-8 rounded-3xl space-y-6">
          <div className="flex justify-between items-center pb-3 border-b border-purple-200/60">
            <div>
              <h2 className="text-xl font-bold font-display text-[#21163B] capitalize">
                {activeModule.replace('-', ' ')}
              </h2>
              <p className="text-xs text-[#5F5675]">Sovereign state administration & system governance utilities.</p>
            </div>
            <span className="text-xs font-bold text-emerald-700 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200">
              Active • MP State Data Center Verified
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
            <div className="neu-inset p-4 rounded-2xl space-y-2">
              <strong className="text-sm text-[#21163B] block">Operational Telemetry</strong>
              <p className="text-[#5F5675]">
                Node status: Synchronized with SDC Bhopal. Zero cryptographic tampering detected in the past 72h.
              </p>
              <div className="pt-2">
                <button
                  onClick={() => alert(`Executed configuration refresh for ${activeModule}.`)}
                  className="btn-kinetic px-4 py-1.5 rounded-xl font-bold cursor-pointer"
                >
                  Apply Configuration
                </button>
              </div>
            </div>

            <div className="neu-inset p-4 rounded-2xl space-y-2">
              <strong className="text-sm text-[#21163B] block">Security Guardrails</strong>
              <p className="text-[#5F5675]">
                Hardware security token: Yubikey / MP DSC enforced. IP allowlisting active for Secretariat CIDR blocks.
              </p>
              <span className="text-[10px] text-emerald-700 font-bold block">✓ ISO/IEC 27001 Certified Infrastructure</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
