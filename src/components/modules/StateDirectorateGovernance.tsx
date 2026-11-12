import React, { useState } from 'react';
import confetti from 'canvas-confetti';
import {
  Shield,
  Building,
  School,
  CheckCircle,
  AlertTriangle,
  Lock,
  Unlock,
  KeyRound,
  History,
  MapPin,
  TrendingUp,
  Users,
  Search,
  Filter,
  RefreshCw,
  FileText,
  ChevronRight,
  Sparkles,
  ExternalLink,
  Award,
  Clock,
  Layers,
} from 'lucide-react';

interface StateDirectorateGovernanceProps {
  onBack?: () => void;
}

export const StateDirectorateGovernance: React.FC<StateDirectorateGovernanceProps> = ({ onBack }) => {
  const [activeTab, setActiveTab] = useState<'overview' | 'clusters' | 'tpo-accreditation' | 'rbac' | 'audit'>('overview');
  const [isEmergencyLockActive, setIsEmergencyLockActive] = useState(false);
  const [modalFeedback, setModalFeedback] = useState<string | null>(null);

  // Regional clusters data
  const clusters = [
    {
      id: 'cluster-01',
      name: 'Bhopal Nodal Cluster-01',
      headquarters: 'UIT-RGPV Bhopal',
      institutions: 48,
      students: 34200,
      accreditationRate: '92.4%',
      status: 'Active',
      tposAccredited: 46,
      topColleges: ['UIT-RGPV', 'MANIT Bhopal', 'LNCT University', 'Oriental College of Tech'],
    },
    {
      id: 'cluster-02',
      name: 'Indore Nodal Cluster-02',
      headquarters: 'SGSITS Indore',
      institutions: 42,
      students: 29800,
      accreditationRate: '94.1%',
      status: 'Active',
      tposAccredited: 41,
      topColleges: ['SGSITS Indore', 'IET-DAVV', 'Medi-Caps University', 'Acropolis Institute'],
    },
    {
      id: 'cluster-03',
      name: 'Jabalpur Nodal Cluster-03',
      headquarters: 'JEC Jabalpur',
      institutions: 32,
      students: 18500,
      accreditationRate: '88.6%',
      status: 'Active',
      tposAccredited: 30,
      topColleges: ['JEC Jabalpur', 'IIITDM Jabalpur', 'Gyan Ganga College', 'Hitkarini College'],
    },
    {
      id: 'cluster-04',
      name: 'Gwalior Nodal Cluster-04',
      headquarters: 'MITS Gwalior',
      institutions: 34,
      students: 16900,
      accreditationRate: '90.2%',
      status: 'Active',
      tposAccredited: 33,
      topColleges: ['MITS Gwalior', 'ABV-IIITM Gwalior', 'ITM University', 'RJIT Tekanpur'],
    },
    {
      id: 'cluster-05',
      name: 'Rewa Nodal Cluster-05',
      headquarters: 'REC Rewa',
      institutions: 28,
      students: 12400,
      accreditationRate: '86.5%',
      status: 'Active',
      tposAccredited: 25,
      topColleges: ['REC Rewa', 'APSU Rewa', 'Jawaharlal Nehru College', 'Vindhya Institute'],
    },
  ];

  // TPO Accreditation Center List
  const [tpoList, setTpoList] = useState([
    {
      id: 'TPO-RGPV-01',
      name: 'Dr. Sudhir Agrawal',
      college: 'UIT-RGPV Bhopal',
      email: 'tpo.uit@rgpv.ac.in',
      cluster: 'Bhopal-01',
      status: 'Accredited',
      authorityExpiry: 'Dec 2027',
      studentsManaged: 3840,
    },
    {
      id: 'TPO-SGSITS-02',
      name: 'Prof. Anirudh Mehta',
      college: 'SGSITS Indore',
      email: 'placements@sgsits.ac.in',
      cluster: 'Indore-02',
      status: 'Accredited',
      authorityExpiry: 'Dec 2027',
      studentsManaged: 3120,
    },
    {
      id: 'TPO-MITS-03',
      name: 'Dr. Manish Dixit',
      college: 'MITS Gwalior',
      email: 'tpo@mitsgwalior.in',
      cluster: 'Gwalior-04',
      status: 'Accredited',
      authorityExpiry: 'Nov 2027',
      studentsManaged: 2450,
    },
    {
      id: 'TPO-JEC-04',
      name: 'Dr. Archana Shukla',
      college: 'JEC Jabalpur',
      email: 'tpo.jec@mp.gov.in',
      cluster: 'Jabalpur-03',
      status: 'Verification Pending',
      authorityExpiry: 'Pending',
      studentsManaged: 1890,
    },
  ]);

  // Immutable Audit Ledger records
  const auditLogs = [
    {
      block: 49201,
      timestamp: 'Today 10:42:18 IST',
      actor: 'DIRECTORATE-ROOT #01',
      action: 'TPO_ACCREDITATION_CONFIRMED',
      target: 'TPO-SGSITS-02 (Prof. Anirudh Mehta)',
      hash: '9f82a17b...4e21',
      status: 'VERIFIED ON SOVEREIGN CHAIN',
    },
    {
      block: 49200,
      timestamp: 'Today 10:35:09 IST',
      actor: 'NODE-MP-01 AUTOMATION',
      action: 'PASSPORT_STAMP_BATCH_MINTED',
      target: 'UIT-RGPV 142 B.Tech Students Level-3 Cloud',
      hash: '3e11f88c...b920',
      status: 'VERIFIED ON SOVEREIGN CHAIN',
    },
    {
      block: 49199,
      timestamp: 'Today 09:12:44 IST',
      actor: 'SYS-MONITOR-SDC',
      action: 'REGIONAL_ROUTING_HEALTH_CHECK',
      target: 'Bhopal & Indore Cluster Latency: 14ms',
      hash: '7c40d21e...55a2',
      status: 'VERIFIED ON SOVEREIGN CHAIN',
    },
    {
      block: 49198,
      timestamp: 'Yesterday 18:22:10 IST',
      actor: 'ADMIN-SECURITY-AGENT',
      action: 'CROSS_ROLE_RBAC_AUDIT_CYCLE',
      target: 'Zero privilege leaks detected across 184 nodes',
      hash: '1b899a2f...33e4',
      status: 'VERIFIED ON SOVEREIGN CHAIN',
    },
  ];

  const handleToggleEmergencyLock = () => {
    setIsEmergencyLockActive(!isEmergencyLockActive);
    setModalFeedback(
      !isEmergencyLockActive
        ? 'EMERGENCY PROTOCOL ENGAGED: State-wide student registrations and recruiter data exports paused pending directorate re-authentication.'
        : 'Sovereign security lock cleared. Normal platform governance resumed.'
    );
  };

  const handleAccreditTpo = (id: string) => {
    setTpoList((prev) =>
      prev.map((t) => (t.id === id ? { ...t, status: 'Accredited', authorityExpiry: 'Dec 2027' } : t))
    );
    confetti({
      particleCount: 50,
      spread: 60,
    });
    setModalFeedback(`Institutional authority accreditation confirmed for ${id}. Cryptographic signing key generated.`);
  };

  return (
    <div className="w-full space-y-5 animate-in fade-in duration-300">
      {/* 1. STATE DIRECTORATE SOVEREIGN HEADER BAR */}
      <div className="bg-[#FAF7FF] border border-purple-200/80 rounded-2xl p-4 sm:p-5 neu-extruded shadow-sm">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-[#7138E8] to-[#21163B] flex items-center justify-center text-white shadow-md">
              <Shield className="w-6 h-6 text-purple-200" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-lg font-bold font-display text-[#21163B]">
                  Madhya Pradesh Technical & Higher Education Directorate
                </h1>
                <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 border border-emerald-200">
                  NODE MP-01 ROOT
                </span>
              </div>
              <p className="text-xs text-[#5F5675]">
                State Command Node • 184 Engineering & Polytechnic Institutions • AICTE & NAAC Sovereign Oversight
              </p>
            </div>
          </div>

          {/* Right Action buttons & Emergency Toggle */}
          <div className="flex items-center gap-2.5">
            <button
              onClick={handleToggleEmergencyLock}
              className={`px-3.5 py-2 rounded-xl text-xs font-bold flex items-center gap-1.5 cursor-pointer transition-all ${
                isEmergencyLockActive
                  ? 'bg-rose-600 text-white shadow-md animate-pulse'
                  : 'neu-flat hover:neu-inset text-rose-700'
              }`}
            >
              {isEmergencyLockActive ? <Lock className="w-4 h-4" /> : <Unlock className="w-4 h-4" />}
              <span>{isEmergencyLockActive ? 'Emergency Lockdown Active' : 'Emergency Lock'}</span>
            </button>

            <button
              onClick={() => {
                confetti({ particleCount: 40 });
                setModalFeedback('State-wide placement compliance report generated & certified by MP Directorate of Technical Education.');
              }}
              className="px-4 py-2 rounded-xl btn-kinetic text-xs font-bold text-white flex items-center gap-1.5 cursor-pointer shadow-sm"
            >
              <FileText className="w-3.5 h-3.5" />
              <span>State Audit Report</span>
            </button>
          </div>
        </div>

        {/* Directorate Metrics Summary Bar */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-4 pt-3 border-t border-purple-100">
          <div className="neu-flat p-2.5 rounded-xl">
            <span className="text-[10px] font-bold text-[#5F5675] uppercase block">AFFILIATED INSTITUTIONS</span>
            <span className="text-lg font-black font-display text-[#21163B]">184 Colleges</span>
            <span className="text-[10px] text-emerald-700 block mt-0.5">100% Nodal Verified</span>
          </div>

          <div className="neu-flat p-2.5 rounded-xl">
            <span className="text-[10px] font-bold text-[#5F5675] uppercase block">TOTAL ENROLLED STUDENTS</span>
            <span className="text-lg font-black font-display text-[#7138E8]">111,800 Active</span>
            <span className="text-[10px] text-[#5F5675] block mt-0.5">Across 5 Nodal Clusters</span>
          </div>

          <div className="neu-flat p-2.5 rounded-xl">
            <span className="text-[10px] font-bold text-[#5F5675] uppercase block">ACCREDITED TPO OFFICERS</span>
            <span className="text-lg font-black font-display text-indigo-700">175 Officers</span>
            <span className="text-[10px] text-indigo-800 font-semibold block mt-0.5">9 Pending Renewal</span>
          </div>

          <div className="neu-flat p-2.5 rounded-xl">
            <span className="text-[10px] font-bold text-[#5F5675] uppercase block">IMMUTABLE BLOCK HEIGHT</span>
            <span className="text-lg font-black font-display font-mono text-[#21163B]">#49,201</span>
            <span className="text-[10px] text-emerald-700 block mt-0.5">Zero Tamper State</span>
          </div>
        </div>
      </div>

      {/* 2. TABBED GOVERNANCE PANELS */}
      <div className="flex flex-wrap items-center gap-2 p-1.5 rounded-2xl neu-inset bg-white/60">
        <button
          onClick={() => setActiveTab('overview')}
          className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
            activeTab === 'overview' ? 'btn-kinetic text-white shadow-xs' : 'text-[#5F5675] hover:text-[#21163B]'
          }`}
        >
          Regional & Nodal Clusters (5)
        </button>
        <button
          onClick={() => setActiveTab('tpo-accreditation')}
          className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
            activeTab === 'tpo-accreditation' ? 'btn-kinetic text-white shadow-xs' : 'text-[#5F5675] hover:text-[#21163B]'
          }`}
        >
          TPO Accreditation Center
        </button>
        <button
          onClick={() => setActiveTab('rbac')}
          className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
            activeTab === 'rbac' ? 'btn-kinetic text-white shadow-xs' : 'text-[#5F5675] hover:text-[#21163B]'
          }`}
        >
          Cross-Role RBAC Matrix
        </button>
        <button
          onClick={() => setActiveTab('audit')}
          className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
            activeTab === 'audit' ? 'btn-kinetic text-white shadow-xs' : 'text-[#5F5675] hover:text-[#21163B]'
          }`}
        >
          Immutable Sovereign Audit Ledger
        </button>
      </div>

      {/* TAB CONTENT 1: REGIONAL & NODAL CLUSTERS */}
      {activeTab === 'overview' && (
        <div className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {clusters.map((c) => (
              <div
                key={c.id}
                className="neu-extruded rounded-2xl p-5 bg-white/70 space-y-3.5 border border-purple-100 flex flex-col justify-between"
              >
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-bold text-[#7138E8] bg-purple-100 px-2 py-0.5 rounded-full uppercase">
                      {c.id}
                    </span>
                    <span className="text-[10px] font-bold text-emerald-700 bg-emerald-100 px-2 py-0.5 rounded-full flex items-center gap-1">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-600"></span>
                      {c.status}
                    </span>
                  </div>

                  <h3 className="font-bold text-base font-display text-[#21163B]">
                    {c.name}
                  </h3>
                  <p className="text-xs text-[#5F5675] flex items-center gap-1">
                    <MapPin className="w-3.5 h-3.5 text-[#7138E8]" />
                    Nodal Hub: <strong className="text-[#21163B]">{c.headquarters}</strong>
                  </p>

                  <div className="grid grid-cols-2 gap-2 text-center text-xs pt-2">
                    <div className="neu-inset p-2 rounded-xl">
                      <span className="text-[9px] uppercase font-bold text-[#5F5675] block">INSTITUTIONS</span>
                      <span className="text-sm font-black text-[#21163B]">{c.institutions}</span>
                    </div>
                    <div className="neu-inset p-2 rounded-xl">
                      <span className="text-[9px] uppercase font-bold text-[#5F5675] block">STUDENTS</span>
                      <span className="text-sm font-black text-[#7138E8]">{c.students.toLocaleString()}</span>
                    </div>
                  </div>

                  {/* Top Affiliated Colleges */}
                  <div className="space-y-1 pt-1 text-[11px]">
                    <span className="font-semibold text-[#5F5675] block text-[10px] uppercase">
                      Top Affiliated Nodes:
                    </span>
                    <div className="flex flex-wrap gap-1">
                      {c.topColleges.map((col, idx) => (
                        <span key={idx} className="neu-flat px-2 py-0.5 rounded-md text-[#21163B] text-[10px]">
                          {col}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="pt-3 border-t border-purple-100 flex items-center justify-between text-xs">
                  <span className="text-[#5F5675]">Accreditation: <strong className="text-emerald-700">{c.accreditationRate}</strong></span>
                  <button
                    onClick={() => setModalFeedback(`Inspecting telemetry and compliance dossier for ${c.name}.`)}
                    className="text-[#7138E8] font-bold hover:underline flex items-center gap-1 cursor-pointer"
                  >
                    <span>Cluster Hub</span>
                    <ChevronRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB CONTENT 2: TPO ACCREDITATION CENTER */}
      {activeTab === 'tpo-accreditation' && (
        <div className="neu-extruded rounded-2xl p-5 bg-white/70 space-y-4 border border-purple-100">
          <div className="flex flex-wrap items-center justify-between gap-3 border-b border-purple-100 pb-3">
            <div>
              <h3 className="text-base font-bold font-display text-[#21163B]">
                Institutional TPO Accreditation Center
              </h3>
              <p className="text-xs text-[#5F5675]">
                Issue, monitor, or revoke institutional authority keys for Training & Placement Officers.
              </p>
            </div>

            <span className="text-xs text-[#7138E8] font-bold bg-purple-100 px-3 py-1 rounded-xl">
              175 Active / 4 Pending Verification
            </span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead>
                <tr className="border-b border-purple-200/60 text-[#5F5675] text-[11px] uppercase">
                  <th className="pb-3 font-semibold">TPO Officer & ID</th>
                  <th className="pb-3 font-semibold">Institutional Affiliation</th>
                  <th className="pb-3 font-semibold">Cluster</th>
                  <th className="pb-3 font-semibold">Authority Expiry</th>
                  <th className="pb-3 font-semibold">Students Managed</th>
                  <th className="pb-3 font-semibold">Accreditation Status</th>
                  <th className="pb-3 font-semibold text-right">Directorate Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-purple-100">
                {tpoList.map((tpo) => (
                  <tr key={tpo.id} className="hover:bg-purple-50/50 transition-colors">
                    <td className="py-3 font-bold text-[#21163B]">
                      <div>{tpo.name}</div>
                      <div className="text-[10px] font-mono text-purple-700">{tpo.id}</div>
                    </td>
                    <td className="py-3 text-[#21163B]">
                      <div>{tpo.college}</div>
                      <div className="text-[10px] text-[#5F5675]">{tpo.email}</div>
                    </td>
                    <td className="py-3">
                      <span className="neu-flat px-2 py-0.5 rounded-md text-[10px] font-semibold text-[#21163B]">
                        {tpo.cluster}
                      </span>
                    </td>
                    <td className="py-3 font-mono text-[11px] text-[#5F5675]">{tpo.authorityExpiry}</td>
                    <td className="py-3 font-bold text-[#21163B]">{tpo.studentsManaged.toLocaleString()}</td>
                    <td className="py-3">
                      <span
                        className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                          tpo.status === 'Accredited'
                            ? 'bg-emerald-100 text-emerald-800'
                            : 'bg-amber-100 text-amber-800'
                        }`}
                      >
                        {tpo.status}
                      </span>
                    </td>
                    <td className="py-3 text-right">
                      {tpo.status === 'Accredited' ? (
                        <button
                          onClick={() => setModalFeedback(`Institutional signing authority refreshed for ${tpo.name}.`)}
                          className="px-2.5 py-1 rounded-lg neu-flat hover:neu-inset text-[11px] font-semibold text-[#7138E8] cursor-pointer"
                        >
                          Audit Clearance
                        </button>
                      ) : (
                        <button
                          onClick={() => handleAccreditTpo(tpo.id)}
                          className="px-3 py-1 rounded-lg btn-kinetic text-[11px] font-bold text-white cursor-pointer shadow-xs"
                        >
                          Accredit TPO
                        </button>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* TAB CONTENT 3: CROSS-ROLE RBAC MATRIX */}
      {activeTab === 'rbac' && (
        <div className="neu-extruded rounded-2xl p-5 bg-white/70 space-y-4 border border-purple-100">
          <div className="border-b border-purple-100 pb-3">
            <h3 className="text-base font-bold font-display text-[#21163B]">
              Cross-Role Permission Matrix & Boundary Enforcement
            </h3>
            <p className="text-xs text-[#5F5675]">
              Strictly enforced zero-trust permission boundaries across State Directorate, College TPO, Recruiter, and Student.
            </p>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead>
                <tr className="border-b border-purple-200/60 text-[#5F5675] text-[11px] uppercase">
                  <th className="pb-3 font-semibold">Capability Horizon</th>
                  <th className="pb-3 font-semibold text-center">State Admin</th>
                  <th className="pb-3 font-semibold text-center">College TPO</th>
                  <th className="pb-3 font-semibold text-center">Corporate Recruiter</th>
                  <th className="pb-3 font-semibold text-center">Enrolled Student</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-purple-100 text-[11px]">
                <tr className="hover:bg-purple-50/50">
                  <td className="py-3 font-semibold text-[#21163B]">
                    Institutional Authority & Accreditation
                  </td>
                  <td className="py-3 text-center text-emerald-600 font-bold">Full Access</td>
                  <td className="py-3 text-center text-rose-500 font-bold">No Access</td>
                  <td className="py-3 text-center text-rose-500 font-bold">No Access</td>
                  <td className="py-3 text-center text-rose-500 font-bold">No Access</td>
                </tr>

                <tr className="hover:bg-purple-50/50">
                  <td className="py-3 font-semibold text-[#21163B]">
                    Student Approval & NOC Issuance
                  </td>
                  <td className="py-3 text-center text-purple-600 font-bold">Oversight Only</td>
                  <td className="py-3 text-center text-emerald-600 font-bold">College Scope</td>
                  <td className="py-3 text-center text-rose-500 font-bold">No Access</td>
                  <td className="py-3 text-center text-rose-500 font-bold">Self-Request</td>
                </tr>

                <tr className="hover:bg-purple-50/50">
                  <td className="py-3 font-semibold text-[#21163B]">
                    AI Candidate Comparison Engine
                  </td>
                  <td className="py-3 text-center text-purple-600 font-bold">Full Visibility</td>
                  <td className="py-3 text-center text-emerald-600 font-bold">Institutional Pool</td>
                  <td className="py-3 text-center text-emerald-600 font-bold">Full Workspace</td>
                  <td className="py-3 text-center text-rose-500 font-bold">No Access</td>
                </tr>

                <tr className="hover:bg-purple-50/50">
                  <td className="py-3 font-semibold text-[#21163B]">
                    Skill Passport Digital Ledger Stamping
                  </td>
                  <td className="py-3 text-center text-emerald-600 font-bold">State Key Sign</td>
                  <td className="py-3 text-center text-emerald-600 font-bold">Nodal Counter-Sign</td>
                  <td className="py-3 text-center text-purple-600 font-bold">Verify Signature</td>
                  <td className="py-3 text-center text-purple-600 font-bold">Possess & Share</td>
                </tr>

                <tr className="hover:bg-purple-50/50">
                  <td className="py-3 font-semibold text-[#21163B]">
                    Proctored Code Sandbox & IDE Telemetry
                  </td>
                  <td className="py-3 text-center text-purple-600 font-bold">Full Audit</td>
                  <td className="py-3 text-center text-purple-600 font-bold">Cluster Summary</td>
                  <td className="py-3 text-center text-emerald-600 font-bold">Applicant Dumps</td>
                  <td className="py-3 text-center text-emerald-600 font-bold">Execute Code</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* TAB CONTENT 4: IMMUTABLE AUDIT LEDGER */}
      {activeTab === 'audit' && (
        <div className="neu-extruded rounded-2xl p-5 bg-white/70 space-y-4 border border-purple-100">
          <div className="flex flex-wrap items-center justify-between gap-3 border-b border-purple-100 pb-3">
            <div>
              <h3 className="text-base font-bold font-display text-[#21163B]">
                Immutable Sovereign Audit Ledger
              </h3>
              <p className="text-xs text-[#5F5675]">
                Tamper-evident administrative events cryptographic trail synchronized with State Data Centre Bhopal.
              </p>
            </div>

            <button
              onClick={() => {
                confetti({ particleCount: 30 });
                setModalFeedback('Ledger merkle root re-verified across all 5 regional clusters. Zero discrepancies.');
              }}
              className="px-3 py-1.5 rounded-xl neu-flat hover:neu-inset text-xs font-semibold text-[#7138E8] flex items-center gap-1.5 cursor-pointer"
            >
              <RefreshCw className="w-3.5 h-3.5" />
              <span>Verify Merkle Root</span>
            </button>
          </div>

          <div className="space-y-2.5">
            {auditLogs.map((log) => (
              <div
                key={log.block}
                className="p-3.5 rounded-xl neu-flat space-y-1.5 text-xs border border-purple-100"
              >
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <div className="flex items-center gap-2">
                    <span className="font-mono font-bold text-purple-800 bg-purple-100 px-2 py-0.5 rounded text-[11px]">
                      BLOCK #{log.block}
                    </span>
                    <span className="font-bold text-[#21163B]">{log.action}</span>
                  </div>
                  <span className="text-[10px] text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full font-semibold">
                    {log.status}
                  </span>
                </div>

                <div className="text-[11px] text-[#5F5675]">
                  Actor: <strong className="text-[#21163B]">{log.actor}</strong> • Target:{' '}
                  <span className="text-purple-900 font-semibold">{log.target}</span>
                </div>

                <div className="flex items-center justify-between text-[10px] text-[#5F5675] font-mono pt-1 border-t border-purple-100/60">
                  <span>SHA-256 Hash: {log.hash}</span>
                  <span>{log.timestamp}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* MODAL FEEDBACK */}
      {modalFeedback && (
        <div className="fixed inset-0 z-50 bg-black/40 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-[#F3F0FF] rounded-3xl p-6 sm:p-7 max-w-md w-full neu-floating space-y-4 border border-white text-center">
            <div className="w-14 h-14 rounded-2xl bg-gradient-to-tr from-[#7138E8] to-[#21163B] mx-auto flex items-center justify-center text-white shadow-md">
              <Shield className="w-7 h-7" />
            </div>

            <h3 className="text-lg font-bold font-display text-[#21163B]">
              State Directorate Command
            </h3>

            <p className="text-xs text-[#5F5675] leading-relaxed">
              {modalFeedback}
            </p>

            <button
              onClick={() => setModalFeedback(null)}
              className="w-full py-2.5 rounded-xl btn-kinetic font-bold text-xs cursor-pointer text-white"
            >
              Acknowledge
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
