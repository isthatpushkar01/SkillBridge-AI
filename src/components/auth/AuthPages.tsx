import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { SkillBridgeLogo } from '../common/SkillBridgeLogo';
import {
  GraduationCap,
  Building2,
  Briefcase,
  ShieldCheck,
  Sparkles,
  ArrowRight,
  CheckCircle,
  Clock,
  AlertCircle,
  Upload,
  Lock,
  Mail,
  Phone,
  Building,
  School,
  FileText,
  User,
  KeyRound,
  ExternalLink,
} from 'lucide-react';
import { UserRole } from '../../types';

export const LoginPage: React.FC = () => {
  const { login, navigateTo, quickLoginAs } = useApp();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState<UserRole>('student');
  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    const success = login(email, role);
    if (!success) {
      setError('Invalid credentials or unauthorized account. Please check your role and email.');
    }
  };

  const handleDemoFill = (selectedRole: UserRole) => {
    setRole(selectedRole);
    if (selectedRole === 'student') {
      setEmail('aarav.sharma@rgpv.ac.in');
      setPassword('password123');
    } else if (selectedRole === 'tpo') {
      setEmail('tpo.director@rgpv.ac.in');
      setPassword('password123');
    } else if (selectedRole === 'recruiter') {
      setEmail('ananya.deshmukh@tcs-campus.com');
      setPassword('password123');
    } else if (selectedRole === 'admin') {
      setEmail('director.dte@mp.gov.in');
      setPassword('password123');
    }
  };

  return (
    <div className="max-w-md mx-auto my-8 sm:my-12 px-4">
      <div className="neu-extruded p-6 sm:p-8 rounded-3xl space-y-6">
        <div className="text-center space-y-3">
          <div className="flex justify-center">
            <SkillBridgeLogo size="md" />
          </div>
          <h2 className="text-xl font-bold font-display text-[#21163B]">
            Sign In to SkillBridge AI
          </h2>
          <p className="text-xs text-[#5F5675]">
            Access your role-authorized placement ecosystem portal
          </p>
        </div>

        {/* 1-Click Demo Credential Quick Selector */}
        <div className="neu-inset p-3 rounded-2xl space-y-2">
          <span className="text-[11px] font-bold text-[#7138E8] block text-center">
            ⚡ Quick Demo Autofill (Select Role):
          </span>
          <div className="grid grid-cols-2 gap-2 text-xs">
            <button
              type="button"
              onClick={() => handleDemoFill('student')}
              className={`p-2 rounded-xl font-semibold flex items-center justify-center gap-1.5 cursor-pointer transition-all ${
                role === 'student' ? 'btn-kinetic text-white' : 'bg-white text-[#21163B] border border-purple-200'
              }`}
            >
              <GraduationCap className="w-3.5 h-3.5" />
              Student
            </button>
            <button
              type="button"
              onClick={() => handleDemoFill('tpo')}
              className={`p-2 rounded-xl font-semibold flex items-center justify-center gap-1.5 cursor-pointer transition-all ${
                role === 'tpo' ? 'btn-kinetic text-white' : 'bg-white text-[#21163B] border border-purple-200'
              }`}
            >
              <Building2 className="w-3.5 h-3.5" />
              TPO Officer
            </button>
            <button
              type="button"
              onClick={() => handleDemoFill('recruiter')}
              className={`p-2 rounded-xl font-semibold flex items-center justify-center gap-1.5 cursor-pointer transition-all ${
                role === 'recruiter' ? 'btn-kinetic text-white' : 'bg-white text-[#21163B] border border-purple-200'
              }`}
            >
              <Briefcase className="w-3.5 h-3.5" />
              Recruiter
            </button>
            <button
              type="button"
              onClick={() => handleDemoFill('admin')}
              className={`p-2 rounded-xl font-semibold flex items-center justify-center gap-1.5 cursor-pointer transition-all ${
                role === 'admin' ? 'btn-kinetic text-white' : 'bg-white text-[#21163B] border border-purple-200'
              }`}
            >
              <ShieldCheck className="w-3.5 h-3.5" />
              Administration
            </button>
          </div>
        </div>

        {error && (
          <div className="flex items-center gap-2 p-3 rounded-xl bg-rose-100/90 text-rose-800 text-xs border border-rose-200">
            <AlertCircle className="w-4 h-4 shrink-0" />
            <span>{error}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-semibold text-[#21163B] mb-1">
              Authorized Email Address
            </label>
            <div className="relative">
              <Mail className="w-4 h-4 text-[#5F5675] absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="name@college.ac.in or company.com"
                className="neu-input w-full pl-10 pr-3 py-2.5 text-xs rounded-xl focus:outline-none"
              />
            </div>
          </div>

          <div>
            <div className="flex justify-between items-center mb-1">
              <label className="text-xs font-semibold text-[#21163B]">Password</label>
              <button
                type="button"
                onClick={() => navigateTo('forgot-password')}
                className="text-[11px] text-[#7138E8] hover:underline font-semibold cursor-pointer"
              >
                Forgot Password?
              </button>
            </div>
            <div className="relative">
              <Lock className="w-4 h-4 text-[#5F5675] absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••••••"
                className="neu-input w-full pl-10 pr-3 py-2.5 text-xs rounded-xl focus:outline-none"
              />
            </div>
          </div>

          <button
            type="submit"
            className="w-full btn-kinetic py-3 rounded-xl text-xs font-bold flex items-center justify-center gap-2 cursor-pointer shadow-md mt-2"
          >
            <span>Sign In to {role.toUpperCase()} Portal</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </form>

        <div className="text-center pt-2 border-t border-purple-200/60">
          <p className="text-xs text-[#5F5675]">
            New to SkillBridge AI?{' '}
            <button
              onClick={() => navigateTo('register')}
              className="text-[#7138E8] font-bold hover:underline cursor-pointer"
            >
              Create Role Account
            </button>
          </p>
        </div>
      </div>
    </div>
  );
};

export const RegistrationHub: React.FC = () => {
  const {
    registerStudent,
    registerTPO,
    registerRecruiter,
    registerAdmin,
    navigateTo,
  } = useApp();

  const [activeTab, setActiveTab] = useState<'student' | 'tpo' | 'recruiter' | 'admin'>('student');
  const [loading, setLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  // Student Form State
  const [studentForm, setStudentForm] = useState({
    name: '',
    email: '',
    phone: '',
    password: '',
    college: 'Rajiv Gandhi Proudyogiki Vishwavidyalaya (RGPV Bhopal)',
    university: 'RGPV State University',
    state: 'Madhya Pradesh',
    city: 'Bhopal',
    course: 'B.Tech',
    branch: 'Computer Science and Engineering',
    academicYear: 'Final Year (4th)',
    graduationYear: 2026,
    enrollmentNo: '',
    cgpa: 8.5,
    linkedIn: '',
    github: '',
    primarySkill: 'React & TypeScript',
    resumeFileName: 'My_Resume.pdf',
  });

  // TPO Form State
  const [tpoForm, setTpoForm] = useState({
    name: '',
    email: '',
    phone: '',
    institutionName: '',
    institutionRegistrationNo: '',
    designation: 'Head of Training & Placement',
    department: 'Central Placement Cell',
    collegeWebsite: '',
    collegeAddress: '',
    district: 'Bhopal',
    naacAccreditation: 'A+ Grade',
    password: '',
  });

  // Recruiter Form State
  const [recruiterForm, setRecruiterForm] = useState({
    name: '',
    email: '',
    phone: '',
    companyName: '',
    companyWebsite: '',
    industry: 'Software & Technology Services',
    designation: 'Lead University Recruiter',
    companyAddress: 'Indore, Madhya Pradesh',
    hiringDomain: 'Full Stack & AI Systems',
    salaryRange: '7.5 LPA - 14 LPA',
    password: '',
  });

  // Admin Form State
  const [adminForm, setAdminForm] = useState({
    name: '',
    email: '',
    phone: '',
    designation: 'Assistant Director',
    organization: 'Directorate of Technical Education, MP',
    invitationCode: 'MP-GOV-SECRET-2026',
    password: '',
  });

  const handleStudentSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setErrorMessage('');
    const res = await registerStudent(studentForm);
    setLoading(false);
    if (res.success) {
      navigateTo('verify-email');
    } else {
      setErrorMessage(res.message);
    }
  };

  const handleTPOSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setErrorMessage('');
    const res = await registerTPO(tpoForm);
    setLoading(false);
    if (res.success) {
      navigateTo('pending-approval');
    } else {
      setErrorMessage(res.message);
    }
  };

  const handleRecruiterSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setErrorMessage('');
    const res = await registerRecruiter(recruiterForm);
    setLoading(false);
    if (res.success) {
      navigateTo('pending-approval');
    } else {
      setErrorMessage(res.message);
    }
  };

  const handleAdminSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setErrorMessage('');
    const res = await registerAdmin(adminForm, adminForm.invitationCode);
    setLoading(false);
    if (!res.success) {
      setErrorMessage(res.message);
    }
  };

  return (
    <div className="max-w-3xl mx-auto my-8 sm:my-12 px-4">
      <div className="neu-extruded p-6 sm:p-10 rounded-3xl space-y-6">
        <div className="text-center space-y-3">
          <div className="flex justify-center">
            <SkillBridgeLogo size="md" />
          </div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full neu-inset text-xs font-bold text-[#7138E8]">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Multi-Role Verification Gateway</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold font-display text-[#21163B]">
            Register with SkillBridge AI
          </h2>
          <p className="text-xs sm:text-sm text-[#5F5675]">
            Select your institution or enterprise role to initiate authorized onboarding
          </p>
        </div>

        {/* 4 Tabs */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 p-1.5 neu-inset rounded-2xl">
          <button
            onClick={() => setActiveTab('student')}
            className={`py-2 px-3 rounded-xl text-xs font-bold flex items-center justify-center gap-1.5 cursor-pointer transition-all ${
              activeTab === 'student' ? 'btn-kinetic text-white shadow-xs' : 'text-[#5F5675] hover:text-[#21163B]'
            }`}
          >
            <GraduationCap className="w-3.5 h-3.5" />
            Student
          </button>
          <button
            onClick={() => setActiveTab('tpo')}
            className={`py-2 px-3 rounded-xl text-xs font-bold flex items-center justify-center gap-1.5 cursor-pointer transition-all ${
              activeTab === 'tpo' ? 'btn-kinetic text-white shadow-xs' : 'text-[#5F5675] hover:text-[#21163B]'
            }`}
          >
            <Building2 className="w-3.5 h-3.5" />
            TPO Cell
          </button>
          <button
            onClick={() => setActiveTab('recruiter')}
            className={`py-2 px-3 rounded-xl text-xs font-bold flex items-center justify-center gap-1.5 cursor-pointer transition-all ${
              activeTab === 'recruiter' ? 'btn-kinetic text-white shadow-xs' : 'text-[#5F5675] hover:text-[#21163B]'
            }`}
          >
            <Briefcase className="w-3.5 h-3.5" />
            Recruiter
          </button>
          <button
            onClick={() => setActiveTab('admin')}
            className={`py-2 px-3 rounded-xl text-xs font-bold flex items-center justify-center gap-1.5 cursor-pointer transition-all ${
              activeTab === 'admin' ? 'btn-kinetic text-white shadow-xs' : 'text-[#5F5675] hover:text-[#21163B]'
            }`}
          >
            <ShieldCheck className="w-3.5 h-3.5" />
            Admin
          </button>
        </div>

        {errorMessage && (
          <div className="p-3 rounded-xl bg-rose-100 text-rose-800 text-xs border border-rose-200">
            {errorMessage}
          </div>
        )}

        {/* Tab 1: Student Registration */}
        {activeTab === 'student' && (
          <form onSubmit={handleStudentSubmit} className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-[#21163B] mb-1">Full Name</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Aarav Sharma"
                  value={studentForm.name}
                  onChange={(e) => setStudentForm({ ...studentForm, name: e.target.value })}
                  className="neu-input w-full px-3 py-2 text-xs rounded-xl"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-[#21163B] mb-1">Student Email</label>
                <input
                  type="email"
                  required
                  placeholder="aarav@college.ac.in"
                  value={studentForm.email}
                  onChange={(e) => setStudentForm({ ...studentForm, email: e.target.value })}
                  className="neu-input w-full px-3 py-2 text-xs rounded-xl"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-[#21163B] mb-1">Phone Number</label>
                <input
                  type="tel"
                  required
                  placeholder="+91 98260 12345"
                  value={studentForm.phone}
                  onChange={(e) => setStudentForm({ ...studentForm, phone: e.target.value })}
                  className="neu-input w-full px-3 py-2 text-xs rounded-xl"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-[#21163B] mb-1">Password</label>
                <input
                  type="password"
                  required
                  placeholder="••••••••"
                  value={studentForm.password}
                  onChange={(e) => setStudentForm({ ...studentForm, password: e.target.value })}
                  className="neu-input w-full px-3 py-2 text-xs rounded-xl"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-[#21163B] mb-1">College / Institute</label>
                <select
                  value={studentForm.college}
                  onChange={(e) => setStudentForm({ ...studentForm, college: e.target.value })}
                  className="neu-input w-full px-3 py-2 text-xs rounded-xl"
                >
                  <option value="Rajiv Gandhi Proudyogiki Vishwavidyalaya (RGPV Bhopal)">RGPV Bhopal</option>
                  <option value="Shri Govindram Seksaria Institute of Tech & Science (SGSITS Indore)">SGSITS Indore</option>
                  <option value="Maulana Azad National Institute of Technology (MANIT Bhopal)">MANIT Bhopal</option>
                  <option value="Madhav Institute of Technology and Science (MITS Gwalior)">MITS Gwalior</option>
                  <option value="Jabalpur Engineering College (JEC Jabalpur)">JEC Jabalpur</option>
                </select>
              </div>
              <div>
                <label className="block text-xs font-semibold text-[#21163B] mb-1">Course & Branch</label>
                <input
                  type="text"
                  required
                  placeholder="B.Tech Computer Science"
                  value={studentForm.branch}
                  onChange={(e) => setStudentForm({ ...studentForm, branch: e.target.value })}
                  className="neu-input w-full px-3 py-2 text-xs rounded-xl"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-[#21163B] mb-1">Enrollment Number</label>
                <input
                  type="text"
                  required
                  placeholder="0101CS221045"
                  value={studentForm.enrollmentNo}
                  onChange={(e) => setStudentForm({ ...studentForm, enrollmentNo: e.target.value })}
                  className="neu-input w-full px-3 py-2 text-xs rounded-xl"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-[#21163B] mb-1">Current CGPA</label>
                <input
                  type="number"
                  step="0.01"
                  min="0"
                  max="10"
                  required
                  placeholder="8.5"
                  value={studentForm.cgpa}
                  onChange={(e) => setStudentForm({ ...studentForm, cgpa: Number(e.target.value) })}
                  className="neu-input w-full px-3 py-2 text-xs rounded-xl"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-[#21163B] mb-1">LinkedIn Profile</label>
                <input
                  type="url"
                  placeholder="https://linkedin.com/in/username"
                  value={studentForm.linkedIn}
                  onChange={(e) => setStudentForm({ ...studentForm, linkedIn: e.target.value })}
                  className="neu-input w-full px-3 py-2 text-xs rounded-xl"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-[#21163B] mb-1">GitHub Profile</label>
                <input
                  type="url"
                  placeholder="https://github.com/username"
                  value={studentForm.github}
                  onChange={(e) => setStudentForm({ ...studentForm, github: e.target.value })}
                  className="neu-input w-full px-3 py-2 text-xs rounded-xl"
                />
              </div>
            </div>

            {/* Resume Upload Box */}
            <div className="p-4 rounded-2xl border-2 border-dashed border-purple-300 text-center bg-purple-50/50">
              <Upload className="w-6 h-6 text-[#7138E8] mx-auto mb-1" />
              <p className="text-xs font-semibold text-[#21163B]">Upload Official Academic Resume (PDF)</p>
              <p className="text-[10px] text-[#5F5675]">Required for TPO document verification</p>
              <span className="inline-block mt-2 text-[11px] font-bold text-[#7138E8] bg-white px-2.5 py-1 rounded-md border border-purple-200">
                {studentForm.resumeFileName} (Attached)
              </span>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full btn-kinetic py-3 rounded-xl text-xs font-bold flex items-center justify-center gap-2 cursor-pointer shadow-md"
            >
              <span>Submit Student Registration</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </form>
        )}

        {/* Tab 2: TPO Registration */}
        {activeTab === 'tpo' && (
          <form onSubmit={handleTPOSubmit} className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-[#21163B] mb-1">TPO Officer Full Name</label>
                <input
                  type="text"
                  required
                  placeholder="Dr. Ramesh Kulkarni"
                  value={tpoForm.name}
                  onChange={(e) => setTpoForm({ ...tpoForm, name: e.target.value })}
                  className="neu-input w-full px-3 py-2 text-xs rounded-xl"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-[#21163B] mb-1">Official Institutional Email</label>
                <input
                  type="email"
                  required
                  placeholder="tpo.director@rgpv.ac.in"
                  value={tpoForm.email}
                  onChange={(e) => setTpoForm({ ...tpoForm, email: e.target.value })}
                  className="neu-input w-full px-3 py-2 text-xs rounded-xl"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-[#21163B] mb-1">Institution Name</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Government Engineering College, Ujjain"
                  value={tpoForm.institutionName}
                  onChange={(e) => setTpoForm({ ...tpoForm, institutionName: e.target.value })}
                  className="neu-input w-full px-3 py-2 text-xs rounded-xl"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-[#21163B] mb-1">Institution AISHE / Reg No.</label>
                <input
                  type="text"
                  required
                  placeholder="MP-ENG-UEC-1966"
                  value={tpoForm.institutionRegistrationNo}
                  onChange={(e) => setTpoForm({ ...tpoForm, institutionRegistrationNo: e.target.value })}
                  className="neu-input w-full px-3 py-2 text-xs rounded-xl"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-[#21163B] mb-1">Designation</label>
                <input
                  type="text"
                  required
                  placeholder="Head of Placements"
                  value={tpoForm.designation}
                  onChange={(e) => setTpoForm({ ...tpoForm, designation: e.target.value })}
                  className="neu-input w-full px-3 py-2 text-xs rounded-xl"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-[#21163B] mb-1">District (MP)</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Bhopal, Indore, Jabalpur, Gwalior"
                  value={tpoForm.district}
                  onChange={(e) => setTpoForm({ ...tpoForm, district: e.target.value })}
                  className="neu-input w-full px-3 py-2 text-xs rounded-xl"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-[#21163B] mb-1">College Website</label>
                <input
                  type="url"
                  required
                  placeholder="https://www.college.ac.in"
                  value={tpoForm.collegeWebsite}
                  onChange={(e) => setTpoForm({ ...tpoForm, collegeWebsite: e.target.value })}
                  className="neu-input w-full px-3 py-2 text-xs rounded-xl"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-[#21163B] mb-1">Official Password</label>
                <input
                  type="password"
                  required
                  placeholder="••••••••"
                  value={tpoForm.password}
                  onChange={(e) => setTpoForm({ ...tpoForm, password: e.target.value })}
                  className="neu-input w-full px-3 py-2 text-xs rounded-xl"
                />
              </div>
            </div>

            <div className="p-3 neu-inset rounded-xl text-xs text-[#5F5675]">
              🛡️ Note: TPO registrations are submitted to the MP Directorate of Technical Education for authorization before dashboard activation.
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full btn-kinetic py-3 rounded-xl text-xs font-bold flex items-center justify-center gap-2 cursor-pointer shadow-md"
            >
              <span>Submit TPO Institutional Request</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </form>
        )}

        {/* Tab 3: Recruiter Registration */}
        {activeTab === 'recruiter' && (
          <form onSubmit={handleRecruiterSubmit} className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-[#21163B] mb-1">Recruiter Full Name</label>
                <input
                  type="text"
                  required
                  placeholder="Ananya Deshmukh"
                  value={recruiterForm.name}
                  onChange={(e) => setRecruiterForm({ ...recruiterForm, name: e.target.value })}
                  className="neu-input w-full px-3 py-2 text-xs rounded-xl"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-[#21163B] mb-1">Official Corporate Email</label>
                <input
                  type="email"
                  required
                  placeholder="ananya@company.com"
                  value={recruiterForm.email}
                  onChange={(e) => setRecruiterForm({ ...recruiterForm, email: e.target.value })}
                  className="neu-input w-full px-3 py-2 text-xs rounded-xl"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-[#21163B] mb-1">Company / Organization Name</label>
                <input
                  type="text"
                  required
                  placeholder="Tata Consultancy Services"
                  value={recruiterForm.companyName}
                  onChange={(e) => setRecruiterForm({ ...recruiterForm, companyName: e.target.value })}
                  className="neu-input w-full px-3 py-2 text-xs rounded-xl"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-[#21163B] mb-1">Company Website</label>
                <input
                  type="url"
                  required
                  placeholder="https://www.company.com"
                  value={recruiterForm.companyWebsite}
                  onChange={(e) => setRecruiterForm({ ...recruiterForm, companyWebsite: e.target.value })}
                  className="neu-input w-full px-3 py-2 text-xs rounded-xl"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-[#21163B] mb-1">Industry</label>
                <input
                  type="text"
                  required
                  placeholder="IT & Software Development"
                  value={recruiterForm.industry}
                  onChange={(e) => setRecruiterForm({ ...recruiterForm, industry: e.target.value })}
                  className="neu-input w-full px-3 py-2 text-xs rounded-xl"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-[#21163B] mb-1">Hiring Domain</label>
                <input
                  type="text"
                  required
                  placeholder="Fullstack SDE, AI/ML, Cloud"
                  value={recruiterForm.hiringDomain}
                  onChange={(e) => setRecruiterForm({ ...recruiterForm, hiringDomain: e.target.value })}
                  className="neu-input w-full px-3 py-2 text-xs rounded-xl"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full btn-kinetic py-3 rounded-xl text-xs font-bold flex items-center justify-center gap-2 cursor-pointer shadow-md"
            >
              <span>Submit Recruiter Registration</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </form>
        )}

        {/* Tab 4: Admin Registration (Controlled Invite Code) */}
        {activeTab === 'admin' && (
          <form onSubmit={handleAdminSubmit} className="space-y-4">
            <div className="p-3 rounded-xl bg-amber-50 border border-amber-200 text-xs text-amber-900">
              🔒 Controlled Onboarding: Administration requires a state government invitation authorization code.
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-[#21163B] mb-1">Officer Name</label>
                <input
                  type="text"
                  required
                  placeholder="Dr. Arvind Gupta"
                  value={adminForm.name}
                  onChange={(e) => setAdminForm({ ...adminForm, name: e.target.value })}
                  className="neu-input w-full px-3 py-2 text-xs rounded-xl"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-[#21163B] mb-1">Gov Official Email</label>
                <input
                  type="email"
                  required
                  placeholder="director.dte@mp.gov.in"
                  value={adminForm.email}
                  onChange={(e) => setAdminForm({ ...adminForm, email: e.target.value })}
                  className="neu-input w-full px-3 py-2 text-xs rounded-xl"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-[#21163B] mb-1">Organization</label>
                <input
                  type="text"
                  required
                  value={adminForm.organization}
                  onChange={(e) => setAdminForm({ ...adminForm, organization: e.target.value })}
                  className="neu-input w-full px-3 py-2 text-xs rounded-xl"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-[#21163B] mb-1">Invitation Code</label>
                <input
                  type="text"
                  required
                  value={adminForm.invitationCode}
                  onChange={(e) => setAdminForm({ ...adminForm, invitationCode: e.target.value })}
                  className="neu-input w-full px-3 py-2 text-xs rounded-xl font-mono text-[#7138E8] font-bold"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full btn-kinetic py-3 rounded-xl text-xs font-bold flex items-center justify-center gap-2 cursor-pointer shadow-md"
            >
              <span>Verify & Activate Administration Access</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </form>
        )}
      </div>
    </div>
  );
};

export const EmailVerificationPage: React.FC = () => {
  const { verifyEmail, currentUser, navigateTo } = useApp();
  const [code, setCode] = useState('123456');
  const [error, setError] = useState('');

  const handleVerify = (e: React.FormEvent) => {
    e.preventDefault();
    const success = verifyEmail(code);
    if (!success) {
      setError('Please enter a 6-digit confirmation code (e.g. 123456).');
    }
  };

  return (
    <div className="max-w-md mx-auto my-12 px-4">
      <div className="neu-extruded p-8 rounded-3xl text-center space-y-6">
        <div className="w-14 h-14 rounded-2xl mx-auto flex items-center justify-center bg-purple-100 text-[#7138E8] neu-extruded-sm">
          <Mail className="w-7 h-7" />
        </div>
        <div>
          <h2 className="text-2xl font-bold font-display text-[#21163B]">
            Verify Your Institutional Email
          </h2>
          <p className="text-xs text-[#5F5675] mt-1">
            We sent a 6-digit cryptographic verification code to:
          </p>
          <span className="font-bold text-xs text-[#7138E8]">
            {currentUser?.email || 'student@rgpv.ac.in'}
          </span>
        </div>

        {error && (
          <div className="p-2.5 rounded-xl bg-rose-100 text-rose-800 text-xs">
            {error}
          </div>
        )}

        <form onSubmit={handleVerify} className="space-y-4">
          <div>
            <input
              type="text"
              maxLength={6}
              value={code}
              onChange={(e) => setCode(e.target.value)}
              className="neu-input text-center text-xl font-bold font-mono tracking-widest py-3 w-48 mx-auto rounded-xl block"
            />
            <span className="text-[10px] text-[#5F5675] mt-1 block">
              (Demo code: 123456 prefilled for testing)
            </span>
          </div>

          <button
            type="submit"
            className="w-full btn-kinetic py-3 rounded-xl text-xs font-bold flex items-center justify-center gap-2 cursor-pointer shadow-md"
          >
            <CheckCircle className="w-4 h-4" />
            <span>Verify & Proceed to Approval Status</span>
          </button>
        </form>
      </div>
    </div>
  );
};

export const PendingApprovalPage: React.FC = () => {
  const { currentUser, simulateInstantApproval, navigateTo } = useApp();

  return (
    <div className="max-w-xl mx-auto my-10 px-4">
      <div className="neu-extruded p-8 rounded-3xl text-center space-y-6">
        <div className="w-16 h-16 rounded-3xl mx-auto flex items-center justify-center bg-amber-100 text-amber-600 border border-amber-200">
          <Clock className="w-8 h-8 animate-spin-slow" />
        </div>

        <div>
          <span className="inline-block px-3 py-1 rounded-full text-xs font-bold bg-amber-100 text-amber-800 border border-amber-300 mb-2">
            Status: Pending Central Verification
          </span>
          <h2 className="text-2xl font-bold font-display text-[#21163B]">
            Application Under Review
          </h2>
          <p className="text-xs sm:text-sm text-[#5F5675] mt-2 leading-relaxed">
            Your registration as a{' '}
            <span className="font-bold text-[#7138E8] uppercase">{currentUser?.role || 'student'}</span> has
            been received. To ensure strict ecosystem integrity, accounts are validated by the authorized
            college Training & Placement Officer (TPO) or State Directorate.
          </p>
        </div>

        {/* Verification Summary Card */}
        <div className="neu-inset p-4 rounded-2xl text-left text-xs space-y-2">
          <div className="flex justify-between">
            <span className="text-[#5F5675]">Applicant:</span>
            <span className="font-bold text-[#21163B]">{currentUser?.name}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-[#5F5675]">Email:</span>
            <span className="font-bold text-[#21163B]">{currentUser?.email}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-[#5F5675]">Assigned Reviewer:</span>
            <span className="font-bold text-[#7138E8]">
              {currentUser?.role === 'tpo' ? 'MP Directorate of Tech Ed' : 'Central TPO Placement Cell'}
            </span>
          </div>
          <div className="flex justify-between">
            <span className="text-[#5F5675]">Documents Submitted:</span>
            <span className="font-bold text-emerald-700">Marksheet / Resume (3 Files)</span>
          </div>
        </div>

        {/* Quick Testing Helper: Instant Simulation */}
        <div className="p-4 rounded-2xl bg-purple-50/80 border border-purple-200 space-y-2">
          <span className="text-xs font-bold text-[#7138E8] flex items-center justify-center gap-1">
            <Sparkles className="w-3.5 h-3.5" />
            Evaluation Bypass Trigger:
          </span>
          <p className="text-[11px] text-[#5F5675]">
            As a reviewer or TPO tester, you can simulate instantaneous approval of this account to immediately unlock the full dashboard!
          </p>
          <button
            onClick={() => currentUser && simulateInstantApproval(currentUser.id)}
            className="w-full btn-kinetic py-2.5 rounded-xl text-xs font-bold flex items-center justify-center gap-2 cursor-pointer shadow-md"
          >
            <CheckCircle className="w-4 h-4" />
            <span>Simulate Instant Approval & Launch Dashboard</span>
          </button>
        </div>

        <div>
          <button
            onClick={() => navigateTo('home')}
            className="btn-tactile px-5 py-2 rounded-xl text-xs font-bold cursor-pointer"
          >
            Back to Public Home
          </button>
        </div>
      </div>
    </div>
  );
};
