import React, { useState } from 'react';
import {
  Settings,
  Shield,
  Sliders,
  Bell,
  Lock,
  KeyRound,
  FileText,
  Save,
  CheckCircle2,
  AlertTriangle,
  Building,
  User,
  Mail,
  Phone,
  RotateCcw,
} from 'lucide-react';
import confetti from 'canvas-confetti';

export const TPOSettingsModule: React.FC = () => {
  // Section A: Profile
  const [officerName, setOfficerName] = useState('Dr. Sudhir K. Verma');
  const [officerEmail, setOfficerEmail] = useState('dr.skverma@uitrgpv.ac.in');
  const [officerPhone, setOfficerPhone] = useState('+91 94250 12891');
  const [officeRoom, setOfficeRoom] = useState('Administrative Block, Room 204');

  // Section B: Placement Gates
  const [minCgpaGate, setMinCgpaGate] = useState(7.5);
  const [maxBacklogsAllowed, setMaxBacklogsAllowed] = useState(0);
  const [minAssessmentScore, setMinAssessmentScore] = useState(75);
  const [internshipDuration, setInternshipDuration] = useState(6);
  const [allowPooledDrives, setAllowPooledDrives] = useState(true);
  const [autoVerifyMarksheets, setAutoVerifyMarksheets] = useState(true);

  // Section C: Notifications
  const [notifyRecruiterReg, setNotifyRecruiterReg] = useState(true);
  const [notifyEmergencySms, setNotifyEmergencySms] = useState(true);
  const [notifyDailyDigest, setNotifyDailyDigest] = useState(true);
  const [notifyWeeklyDte, setNotifyWeeklyDte] = useState(true);

  // Section E: Security
  const [sessionTimeout, setSessionTimeout] = useState('30 mins');
  const [emergencyLock, setEmergencyLock] = useState(false);

  // Feedback State
  const [savedSuccess, setSavedSuccess] = useState(false);

  const handleSaveSettings = (e: React.FormEvent) => {
    e.preventDefault();
    setSavedSuccess(true);
    confetti({ particleCount: 50, spread: 60, origin: { y: 0.7 } });
    setTimeout(() => setSavedSuccess(false), 3500);
  };

  return (
    <div className="space-y-6">
      {/* HEADER SECTION */}
      <div className="neu-extruded p-6 sm:p-8 rounded-3xl">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full neu-inset text-xs font-bold text-[#7138E8]">
              <Settings className="w-3.5 h-3.5" />
              <span>TPO Institutional Configuration Gateway</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold font-display text-[#21163B] mt-2">
              Settings & Policy Governance
            </h1>
            <p className="text-xs sm:text-sm text-[#5F5675]">
              Manage institution parameters, placement criteria gates, notification routing, and statutory credentials.
            </p>
          </div>

          <button
            onClick={handleSaveSettings}
            className="btn-kinetic px-6 py-2.5 rounded-xl text-xs font-bold flex items-center gap-2 cursor-pointer shadow-md"
          >
            <Save className="w-4 h-4" />
            <span>Save All Policies</span>
          </button>
        </div>
      </div>

      {savedSuccess && (
        <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-200 text-xs text-emerald-800 flex items-center gap-3">
          <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
          <span className="font-bold">
            Institutional placement parameters and statutory settings updated and synchronized with State Nodal Grid.
          </span>
        </div>
      )}

      <form onSubmit={handleSaveSettings} className="space-y-6">
        {/* SECTION A: ACCOUNT PROFILE SETTINGS */}
        <div className="neu-extruded p-6 sm:p-7 rounded-3xl space-y-4">
          <div className="flex items-center gap-2 pb-3 border-b border-purple-200/60">
            <User className="w-4 h-4 text-[#7138E8]" />
            <h3 className="font-bold text-base text-[#21163B] font-display">
              Section A: Account Profile Settings
            </h3>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 text-xs">
            <div>
              <label className="block font-semibold mb-1 text-[#5F5675]">TPO Officer Name</label>
              <input
                type="text"
                value={officerName}
                onChange={(e) => setOfficerName(e.target.value)}
                className="neu-input w-full px-3 py-2 rounded-xl"
              />
            </div>
            <div>
              <label className="block font-semibold mb-1 text-[#5F5675]">Official Email</label>
              <input
                type="email"
                value={officerEmail}
                onChange={(e) => setOfficerEmail(e.target.value)}
                className="neu-input w-full px-3 py-2 rounded-xl"
              />
            </div>
            <div>
              <label className="block font-semibold mb-1 text-[#5F5675]">Direct Contact Number</label>
              <input
                type="tel"
                value={officerPhone}
                onChange={(e) => setOfficerPhone(e.target.value)}
                className="neu-input w-full px-3 py-2 rounded-xl"
              />
            </div>
            <div>
              <label className="block font-semibold mb-1 text-[#5F5675]">Office Cabin / Room</label>
              <input
                type="text"
                value={officeRoom}
                onChange={(e) => setOfficeRoom(e.target.value)}
                className="neu-input w-full px-3 py-2 rounded-xl"
              />
            </div>
          </div>
        </div>

        {/* SECTION B: INSTITUTIONAL PREFERENCES & PLACEMENT GATES */}
        <div className="neu-extruded p-6 sm:p-7 rounded-3xl space-y-4">
          <div className="flex items-center gap-2 pb-3 border-b border-purple-200/60">
            <Sliders className="w-4 h-4 text-[#7138E8]" />
            <h3 className="font-bold text-base text-[#21163B] font-display">
              Section B: Institutional Preferences & Placement Gates
            </h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
            {/* Minimum CGPA Slider */}
            <div className="neu-inset p-4 rounded-2xl space-y-2">
              <div className="flex justify-between items-center font-bold">
                <span>Minimum Placement Eligibility CGPA</span>
                <span className="text-[#7138E8] text-sm">{minCgpaGate.toFixed(1)}</span>
              </div>
              <input
                type="range"
                min="6.0"
                max="9.0"
                step="0.1"
                value={minCgpaGate}
                onChange={(e) => setMinCgpaGate(Number(e.target.value))}
                className="w-full accent-[#7138E8]"
              />
              <span className="text-[10px] text-[#5F5675] block">
                Students below {minCgpaGate.toFixed(1)} are filtered out of corporate campus drives.
              </span>
            </div>

            {/* Minimum Assessment Score Slider */}
            <div className="neu-inset p-4 rounded-2xl space-y-2">
              <div className="flex justify-between items-center font-bold">
                <span>Minimum Assessment Readiness Threshold</span>
                <span className="text-[#7138E8] text-sm">{minAssessmentScore} / 100</span>
              </div>
              <input
                type="range"
                min="65"
                max="85"
                step="1"
                value={minAssessmentScore}
                onChange={(e) => setMinAssessmentScore(Number(e.target.value))}
                className="w-full accent-[#7138E8]"
              />
              <span className="text-[10px] text-[#5F5675] block">
                Requires passing proctored sandbox coding evaluation with {minAssessmentScore}%+.
              </span>
            </div>
          </div>

          {/* Additional Gate Controls */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 text-xs">
            <div className="neu-inset p-3.5 rounded-2xl">
              <span className="font-semibold text-[#5F5675] block mb-1">Max Active Backlogs</span>
              <select
                value={maxBacklogsAllowed}
                onChange={(e) => setMaxBacklogsAllowed(Number(e.target.value))}
                className="neu-input w-full px-2.5 py-1.5 rounded-xl"
              >
                <option value={0}>0 Backlogs (Strict Zero)</option>
                <option value={1}>1 Allowed Backlog</option>
                <option value={2}>2 Allowed Backlogs</option>
              </select>
            </div>

            <div className="neu-inset p-3.5 rounded-2xl">
              <span className="font-semibold text-[#5F5675] block mb-1">Mandatory Internship Duration</span>
              <select
                value={internshipDuration}
                onChange={(e) => setInternshipDuration(Number(e.target.value))}
                className="neu-input w-full px-2.5 py-1.5 rounded-xl"
              >
                <option value={6}>6 Months (RGPV Standard)</option>
                <option value={3}>3 Months</option>
                <option value={12}>1 Year Full-Stack</option>
              </select>
            </div>

            <div className="neu-inset p-3.5 rounded-2xl flex items-center justify-between">
              <div>
                <span className="font-bold text-[#21163B] block">Allow Pooled Drives</span>
                <span className="text-[10px] text-[#5F5675]">Share drives across MP Hubs</span>
              </div>
              <input
                type="checkbox"
                checked={allowPooledDrives}
                onChange={(e) => setAllowPooledDrives(e.target.checked)}
                className="w-4 h-4 accent-[#7138E8]"
              />
            </div>

            <div className="neu-inset p-3.5 rounded-2xl flex items-center justify-between">
              <div>
                <span className="font-bold text-[#21163B] block">Auto-Verify Marksheets</span>
                <span className="text-[10px] text-[#5F5675]">Via RGPV DigiLocker API</span>
              </div>
              <input
                type="checkbox"
                checked={autoVerifyMarksheets}
                onChange={(e) => setAutoVerifyMarksheets(e.target.checked)}
                className="w-4 h-4 accent-[#7138E8]"
              />
            </div>
          </div>
        </div>

        {/* SECTION C: NOTIFICATIONS & DISPATCH */}
        <div className="neu-extruded p-6 sm:p-7 rounded-3xl space-y-4">
          <div className="flex items-center gap-2 pb-3 border-b border-purple-200/60">
            <Bell className="w-4 h-4 text-[#7138E8]" />
            <h3 className="font-bold text-base text-[#21163B] font-display">
              Section C: Notifications & Communication Dispatch
            </h3>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
            <div className="neu-inset p-3.5 rounded-2xl flex items-center justify-between">
              <div>
                <span className="font-bold text-[#21163B] block">Recruiter Drive Alerts</span>
                <span className="text-[10px] text-[#5F5675]">Immediate email notification when new requisition is posted</span>
              </div>
              <input
                type="checkbox"
                checked={notifyRecruiterReg}
                onChange={(e) => setNotifyRecruiterReg(e.target.checked)}
                className="w-4 h-4 accent-[#7138E8]"
              />
            </div>

            <div className="neu-inset p-3.5 rounded-2xl flex items-center justify-between">
              <div>
                <span className="font-bold text-[#21163B] block">Emergency Placement SMS</span>
                <span className="text-[10px] text-[#5F5675]">Instant text dispatch for last-minute venue or round changes</span>
              </div>
              <input
                type="checkbox"
                checked={notifyEmergencySms}
                onChange={(e) => setNotifyEmergencySms(e.target.checked)}
                className="w-4 h-4 accent-[#7138E8]"
              />
            </div>

            <div className="neu-inset p-3.5 rounded-2xl flex items-center justify-between">
              <div>
                <span className="font-bold text-[#21163B] block">Daily Student Assessment Digest</span>
                <span className="text-[10px] text-[#5F5675]">Evening summary of all proctored scores & flags</span>
              </div>
              <input
                type="checkbox"
                checked={notifyDailyDigest}
                onChange={(e) => setNotifyDailyDigest(e.target.checked)}
                className="w-4 h-4 accent-[#7138E8]"
              />
            </div>

            <div className="neu-inset p-3.5 rounded-2xl flex items-center justify-between">
              <div>
                <span className="font-bold text-[#21163B] block">Weekly DTE Compliance Reports</span>
                <span className="text-[10px] text-[#5F5675]">Automated transmission of Placement Criterion 5.2</span>
              </div>
              <input
                type="checkbox"
                checked={notifyWeeklyDte}
                onChange={(e) => setNotifyWeeklyDte(e.target.checked)}
                className="w-4 h-4 accent-[#7138E8]"
              />
            </div>
          </div>
        </div>

        {/* SECTION D: SOVEREIGN NODAL RBAC & STATUTORY AUTHORITY */}
        <div className="neu-extruded p-6 sm:p-7 rounded-3xl space-y-4">
          <div className="flex items-center gap-2 pb-3 border-b border-purple-200/60">
            <KeyRound className="w-4 h-4 text-[#7138E8]" />
            <h3 className="font-bold text-base text-[#21163B] font-display">
              Section D: Sovereign Nodal RBAC & Statutory Authority
            </h3>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
            <div className="neu-inset p-3.5 rounded-2xl">
              <span className="text-[10px] text-[#5F5675] uppercase block font-bold">Directorate Node ID</span>
              <span className="font-mono text-xs font-bold text-[#7138E8] mt-1 block">#NODAL-UIT-MP01-KEY</span>
              <span className="text-[10px] text-emerald-700 font-semibold block mt-0.5">Active & Cryptographically Synced</span>
            </div>

            <div className="neu-inset p-3.5 rounded-2xl">
              <span className="text-[10px] text-[#5F5675] uppercase block font-bold">Gazette Notification Ref</span>
              <span className="font-mono text-xs font-bold text-[#21163B] mt-1 block">MP-GAZ-2024-Q3-89</span>
              <span className="text-[10px] text-[#5F5675] block mt-0.5">Government of Madhya Pradesh</span>
            </div>

            <div className="neu-inset p-3.5 rounded-2xl">
              <span className="text-[10px] text-[#5F5675] uppercase block font-bold">AISHE Code Binding</span>
              <span className="font-mono text-xs font-bold text-[#21163B] mt-1 block">C-33719</span>
              <span className="text-[10px] text-[#5F5675] block mt-0.5">Ministry of Education Reg.</span>
            </div>
          </div>

          <div className="pt-2 text-right">
            <button
              type="button"
              onClick={() => {
                confetti({ particleCount: 30, spread: 45 });
                alert('Nodal Cryptographic Key re-validated against Directorate Root Node MP-01.');
              }}
              className="text-xs font-bold text-[#7138E8] hover:underline cursor-pointer"
            >
              Re-validate Cryptographic Nodal Key →
            </button>
          </div>
        </div>

        {/* SECTION E: SECURITY & TWO-FACTOR AUTHENTICATION */}
        <div className="neu-extruded p-6 sm:p-7 rounded-3xl space-y-4">
          <div className="flex items-center gap-2 pb-3 border-b border-purple-200/60">
            <Lock className="w-4 h-4 text-[#7138E8]" />
            <h3 className="font-bold text-base text-[#21163B] font-display">
              Section E: Security & Access Lockdown
            </h3>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
            <div className="neu-inset p-3.5 rounded-2xl">
              <span className="text-[10px] text-[#5F5675] block font-bold">2FA Multi-Factor Authentication</span>
              <span className="font-bold text-emerald-700 block mt-1">Enabled (Hardware Token)</span>
              <span className="text-[10px] text-[#5F5675] block mt-0.5">Yubikey / MP State DSC Token</span>
            </div>

            <div className="neu-inset p-3.5 rounded-2xl">
              <span className="text-[10px] text-[#5F5675] block font-bold">Idle Session Timeout</span>
              <select
                value={sessionTimeout}
                onChange={(e) => setSessionTimeout(e.target.value)}
                className="neu-input w-full px-2.5 py-1 rounded-xl text-xs mt-1"
              >
                <option value="15 mins">15 Minutes</option>
                <option value="30 mins">30 Minutes (Recommended)</option>
                <option value="60 mins">60 Minutes</option>
              </select>
            </div>

            <div className="neu-inset p-3.5 rounded-2xl flex items-center justify-between border border-rose-200">
              <div>
                <span className="font-bold text-rose-800 block">Emergency Platform Lock</span>
                <span className="text-[10px] text-rose-600">Freezes student credential updates</span>
              </div>
              <input
                type="checkbox"
                checked={emergencyLock}
                onChange={(e) => {
                  setEmergencyLock(e.target.checked);
                  if (e.target.checked) {
                    alert('Emergency Platform Lock ENGAGED: Student score modifications and drive applications are now frozen.');
                  }
                }}
                className="w-4 h-4 accent-rose-600"
              />
            </div>
          </div>
        </div>

        {/* SECTION F: DATA GOVERNANCE & STATUTORY PRIVACY */}
        <div className="neu-extruded p-6 sm:p-7 rounded-3xl space-y-4">
          <div className="flex items-center gap-2 pb-3 border-b border-purple-200/60">
            <FileText className="w-4 h-4 text-[#7138E8]" />
            <h3 className="font-bold text-base text-[#21163B] font-display">
              Section F: Data Governance & Statutory Privacy (DPDP Act 2023)
            </h3>
          </div>

          <div className="neu-inset p-4 rounded-2xl text-xs space-y-2">
            <div className="flex justify-between items-center">
              <span className="font-bold text-[#21163B]">Digital Personal Data Protection Act 2023:</span>
              <span className="text-emerald-700 font-bold bg-emerald-50 px-2 py-0.5 rounded-md border border-emerald-200">
                100% Compliant
              </span>
            </div>
            <p className="text-[#5F5675] leading-relaxed">
              Student marks, biometric gaze telemetry, and interview video streams are stored with AES-256 encryption within the MP State Data Center (SDC Bhopal) and purged according to statutory UGC guidelines.
            </p>
          </div>

          <div className="pt-2 flex flex-wrap items-center justify-between gap-3 text-xs">
            <span className="text-[#5F5675]">Student Data Retention Policy: <strong>5 Years Post-Graduation</strong></span>
            <button
              type="button"
              onClick={() => alert('Exporting Complete Institutional Audit Docket (DPDP Act Compliance Certification).')}
              className="btn-tactile px-3.5 py-1.5 rounded-xl font-bold text-[#7138E8] cursor-pointer"
            >
              Export Statutory Audit Docket
            </button>
          </div>
        </div>

        {/* BOTTOM SAVE BAR */}
        <div className="neu-extruded p-5 rounded-3xl flex items-center justify-between">
          <span className="text-xs text-[#5F5675]">
            Changes are cryptographically signed with TPO DSC token #MP-TPO-AUTH-8821.
          </span>
          <button
            type="submit"
            className="btn-kinetic px-6 py-2.5 rounded-xl text-xs font-bold cursor-pointer shadow-md"
          >
            Save All Policies
          </button>
        </div>
      </form>
    </div>
  );
};
