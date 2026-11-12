import React, { useState } from 'react';
import {
  School,
  Building,
  GraduationCap,
  Users,
  Award,
  TrendingUp,
  MapPin,
  Mail,
  Phone,
  Shield,
  ShieldCheck,
  FileText,
  Download,
  Eye,
  RefreshCw,
  Plus,
  Edit2,
  Power,
  ExternalLink,
  CheckCircle2,
  Clock,
  Sparkles,
} from 'lucide-react';
import confetti from 'canvas-confetti';

interface Department {
  code: string;
  name: string;
  tagline: string;
  programs: string[];
  enrolled: number;
  coordinator: string;
  role: string;
  status: 'Active' | 'Under Review';
}

interface VaultDoc {
  id: string;
  title: string;
  size: string;
  sha: string;
  verified: boolean;
  type: string;
}

export const InstitutionProfileModule: React.FC = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [showAddDeptModal, setShowAddDeptModal] = useState(false);
  const [showDocPreview, setShowDocPreview] = useState<VaultDoc | null>(null);
  const [saveSuccessNotice, setSaveSuccessNotice] = useState(false);

  // Departments State
  const [departments, setDepartments] = useState<Department[]>([
    {
      code: '01',
      name: 'Computer Science & Engg',
      tagline: 'CSE • Center of AI Excellence',
      programs: ['B.Tech', 'M.Tech'],
      enrolled: 240,
      coordinator: 'Dr. R. Sharma',
      role: 'Professor & Coord',
      status: 'Active',
    },
    {
      code: '02',
      name: 'Information Technology',
      tagline: 'IT • Cloud Systems Laboratory',
      programs: ['B.Tech'],
      enrolled: 120,
      coordinator: 'Prof. A. Mehta',
      role: 'Assoc. Professor',
      status: 'Active',
    },
    {
      code: '03',
      name: 'Electronics & Comm (ECE)',
      tagline: 'ECE • VLSI & Embedded Systems',
      programs: ['B.Tech'],
      enrolled: 180,
      coordinator: 'Dr. M. K. Sen',
      role: 'Professor',
      status: 'Active',
    },
    {
      code: '04',
      name: 'Mechanical Engg (ME)',
      tagline: 'ME • Automation & Robotics',
      programs: ['B.Tech'],
      enrolled: 120,
      coordinator: 'Prof. V. Patel',
      role: 'Assoc. Professor',
      status: 'Active',
    },
    {
      code: '05',
      name: 'Civil Engg (CE)',
      tagline: 'CE • Structural Infrastructure',
      programs: ['B.Tech'],
      enrolled: 90,
      coordinator: 'Dr. K. Dixit',
      role: 'Professor',
      status: 'Active',
    },
  ]);

  const [newDeptName, setNewDeptName] = useState('');
  const [newDeptCode, setNewDeptCode] = useState('');
  const [newDeptCoord, setNewDeptCoord] = useState('');
  const [newDeptEnrolled, setNewDeptEnrolled] = useState(60);

  // Document Vault State
  const [vaultDocs, setVaultDocs] = useState<VaultDoc[]>([
    {
      id: 'doc-1',
      title: 'Institutional Registration Certificate',
      size: '2.4 MB',
      sha: '9e2a...c01f',
      verified: true,
      type: 'Registration',
    },
    {
      id: 'doc-2',
      title: "NAAC 'A+' Accreditation Certificate",
      size: '4.1 MB',
      sha: '4f11...db98',
      verified: true,
      type: 'Accreditation',
    },
    {
      id: 'doc-3',
      title: 'AICTE Extension of Approval 2024-25',
      size: '1.8 MB',
      sha: '7a82...30ae',
      verified: true,
      type: 'Statutory Approval',
    },
    {
      id: 'doc-4',
      title: 'TPO Appointment & Authority Letter',
      size: '850 KB',
      sha: '3c5a...80fa',
      verified: true,
      type: 'Authority Letter',
    },
  ]);

  const handleAddDept = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newDeptName) return;
    setDepartments((prev) => [
      ...prev,
      {
        code: newDeptCode || `0${prev.length + 1}`,
        name: newDeptName,
        tagline: `${newDeptName} • Academic Department`,
        programs: ['B.Tech'],
        enrolled: newDeptEnrolled,
        coordinator: newDeptCoord || 'Dr. Department Head',
        role: 'Professor',
        status: 'Active',
      },
    ]);
    setShowAddDeptModal(false);
    setNewDeptName('');
    setNewDeptCode('');
    setNewDeptCoord('');
  };

  const handleSaveChanges = () => {
    setSaveSuccessNotice(true);
    confetti({ particleCount: 50, spread: 55, origin: { y: 0.7 } });
    setTimeout(() => setSaveSuccessNotice(false), 4000);
  };

  return (
    <div className="space-y-6">
      {/* HEADER BAR */}
      <div className="neu-extruded p-6 sm:p-8 rounded-3xl">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full neu-inset text-xs font-bold text-[#7138E8]">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
              <span>State Nodal Authority Verified</span>
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold font-display text-[#21163B] mt-2">
              Institutional Profile
            </h1>
            <p className="text-xs sm:text-sm text-[#5F5675]">
              Manage institutional information, academic departments, accreditation and placement authority.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => {
                alert('Sovereign Institutional Audit Log: All 142 AICTE records, NAAC A+ credentials and TPO signature dockets are cryptographically synchronized with MP State Data Center.');
              }}
              className="btn-tactile px-4 py-2.5 rounded-xl text-xs font-bold flex items-center gap-2 cursor-pointer"
            >
              <FileText className="w-4 h-4 text-[#7138E8]" />
              <span>Audit Logs</span>
            </button>
            <button
              onClick={() => setIsEditing(!isEditing)}
              className="btn-kinetic px-5 py-2.5 rounded-xl text-xs font-bold flex items-center gap-2 cursor-pointer shadow-md"
            >
              <Edit2 className="w-4 h-4" />
              <span>{isEditing ? 'Close Editing' : 'Edit Profile'}</span>
            </button>
          </div>
        </div>

        {/* EXECUTIVE METRICS OVERVIEW (AY 2024-25) */}
        <div className="mt-6 pt-5 border-t border-purple-200/60">
          <div className="flex items-center justify-between mb-3">
            <span className="text-[11px] font-bold text-[#5F5675] uppercase tracking-wider">
              EXECUTIVE METRICS OVERVIEW (AY 2024-25)
            </span>
            <span className="text-[10px] text-[#5F5675] flex items-center gap-1 font-mono">
              <Clock className="w-3 h-3" /> Synced 12 mins ago
            </span>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
            <div className="neu-inset p-3.5 rounded-2xl text-center">
              <div className="flex items-center justify-center gap-1 text-[11px] text-[#5F5675]">
                <Users className="w-3.5 h-3.5 text-[#7138E8]" />
                <span>Total Students</span>
              </div>
              <span className="text-2xl font-extrabold font-display text-[#21163B] block mt-1">1,840</span>
              <span className="text-[10px] text-[#7138E8] font-semibold">+4.2% YoY intake</span>
            </div>

            <div className="neu-inset p-3.5 rounded-2xl text-center">
              <div className="flex items-center justify-center gap-1 text-[11px] text-[#5F5675]">
                <Building className="w-3.5 h-3.5 text-[#963DF5]" />
                <span>Departments</span>
              </div>
              <span className="text-2xl font-extrabold font-display text-[#21163B] block mt-1">{departments.length}</span>
              <span className="text-[10px] text-[#5F5675] font-semibold">5 B.Tech • 2 M.Tech</span>
            </div>

            <div className="neu-inset p-3.5 rounded-2xl text-center">
              <div className="flex items-center justify-center gap-1 text-[11px] text-[#5F5675]">
                <GraduationCap className="w-3.5 h-3.5 text-[#E75ACF]" />
                <span>Total Faculty</span>
              </div>
              <span className="text-2xl font-extrabold font-display text-[#21163B] block mt-1">142</span>
              <span className="text-[10px] text-[#5F5675] font-semibold">1:13 Faculty-Student</span>
            </div>

            <div className="neu-inset p-3.5 rounded-2xl text-center">
              <div className="flex items-center justify-center gap-1 text-[11px] text-[#5F5675]">
                <Award className="w-3.5 h-3.5 text-violet-600" />
                <span>Eligible Placement</span>
              </div>
              <span className="text-2xl font-extrabold font-display text-[#7138E8] block mt-1">580</span>
              <span className="text-[10px] text-purple-700 font-semibold">Final year cohorts</span>
            </div>

            <div className="neu-inset p-3.5 rounded-2xl text-center border-b-2 border-[#7138E8]">
              <div className="flex items-center justify-center gap-1 text-[11px] text-[#5F5675]">
                <CheckCircle2 className="w-3.5 h-3.5 text-purple-600" />
                <span>Verified Students</span>
              </div>
              <span className="text-2xl font-extrabold font-display text-[#7138E8] block mt-1">564</span>
              <span className="text-[10px] text-[#7138E8] font-bold">(97.2%)</span>
            </div>

            <div className="neu-inset p-3.5 rounded-2xl text-center border-b-2 border-emerald-500">
              <div className="flex items-center justify-center gap-1 text-[11px] text-[#5F5675]">
                <TrendingUp className="w-3.5 h-3.5 text-emerald-600" />
                <span>Placement Rate</span>
              </div>
              <span className="text-2xl font-extrabold font-display text-emerald-600 block mt-1">84.6%</span>
              <span className="text-[10px] text-emerald-700 font-bold">491 Placed / 580</span>
            </div>
          </div>
        </div>
      </div>

      {/* INSTITUTION DETAILS & CONTACT DOSSIER (2-COLUMN GRID) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
        {/* Left Column: University Institute of Technology Overview */}
        <div className="lg:col-span-8 neu-extruded p-6 sm:p-7 rounded-3xl flex flex-col justify-between space-y-5">
          <div>
            <div className="flex flex-wrap items-center justify-between gap-2">
              <div className="flex items-center gap-2">
                <span className="text-[10px] font-bold text-[#7138E8] bg-purple-100 px-2.5 py-0.5 rounded-full border border-purple-200 uppercase">
                  Autonomous State University
                </span>
                <span className="text-[10px] font-semibold text-[#5F5675]">Estd: 1986</span>
              </div>
              <span className="text-[10px] font-mono font-bold text-[#7138E8] bg-white/80 px-2.5 py-0.5 rounded-md border border-purple-200">
                #INST-MP-UIT-01
              </span>
            </div>

            <div className="flex items-start gap-4 mt-4">
              <div className="w-16 h-16 rounded-2xl neu-inset p-2 flex items-center justify-center shrink-0 border border-white">
                <img
                  src="/skillbridge-icon.svg"
                  alt="UIT-RGPV Crest"
                  className="w-12 h-12 object-contain"
                />
              </div>
              <div>
                <h2 className="text-xl sm:text-2xl font-bold font-display text-[#21163B]">
                  University Institute of Technology, RGPV (UIT-RGPV) Bhopal
                </h2>
                <p className="text-xs text-[#5F5675] mt-0.5 font-medium">
                  Affiliated to Rajiv Gandhi Proudyogiki Vishwavidyalaya, Bhopal
                </p>
              </div>
            </div>

            {/* 4 Inset Accreditation Blocks */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-5">
              <div className="neu-inset p-3 rounded-2xl">
                <span className="text-[10px] font-bold text-[#5F5675] uppercase block">NAAC STATUS</span>
                <div className="flex items-baseline gap-1 mt-1">
                  <span className="text-xl font-extrabold text-[#7138E8]">A+</span>
                  <span className="text-[11px] text-[#5F5675]">(CGPA 3.42)</span>
                </div>
                <span className="text-[10px] text-[#5F5675] block mt-0.5">Cycle 3 Accreditation</span>
              </div>

              <div className="neu-inset p-3 rounded-2xl">
                <span className="text-[10px] font-bold text-[#5F5675] uppercase block">NBA ACCREDITATION</span>
                <div className="flex items-center gap-1 mt-1 text-emerald-700 font-extrabold text-base">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                  <span>Tier-1</span>
                </div>
                <span className="text-[10px] text-[#5F5675] block mt-0.5">Valid for CSE, IT, ECE</span>
              </div>

              <div className="neu-inset p-3 rounded-2xl">
                <span className="text-[10px] font-bold text-[#5F5675] uppercase block">AISHE CODE</span>
                <span className="text-base font-extrabold font-mono text-[#21163B] block mt-1">C-33719</span>
                <span className="text-[10px] text-[#5F5675] block mt-0.5">Ministry of Education Reg.</span>
              </div>

              <div className="neu-inset p-3 rounded-2xl">
                <span className="text-[10px] font-bold text-[#5F5675] uppercase block">DIGITAL PORTAL</span>
                <span className="text-xs font-bold text-[#7138E8] block mt-1 truncate">uitrgpv.ac.in</span>
                <span className="text-[10px] text-emerald-700 font-semibold block mt-0.5">SSL Active & Secured</span>
              </div>
            </div>
          </div>

          <div className="pt-3 border-t border-purple-100 flex flex-wrap items-center justify-between text-xs gap-2">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
              <span className="text-[#5F5675]">Registration Status:</span>
              <strong className="text-[#21163B]">Verified State Nodal Authority</strong>
            </div>
            <div className="text-[11px] font-mono text-[#5F5675]">
              Directorate Key: <span className="font-bold text-[#7138E8]">NODAL-UIT-MP01-KEY</span>
            </div>
          </div>
        </div>

        {/* Right Column: Contact Dossier State MP */}
        <div className="lg:col-span-4 neu-extruded p-6 sm:p-7 rounded-3xl flex flex-col justify-between space-y-4">
          <div>
            <div className="flex items-center justify-between pb-3 border-b border-purple-200/60">
              <div className="flex items-center gap-2">
                <School className="w-4 h-4 text-[#7138E8]" />
                <h3 className="font-bold text-base text-[#21163B] font-display">Contact Dossier</h3>
              </div>
              <span className="text-[10px] font-bold text-[#7138E8] bg-purple-100 px-2 py-0.5 rounded-full">
                State MP
              </span>
            </div>

            <div className="space-y-3.5 mt-4 text-xs">
              <div className="flex items-start gap-2.5">
                <div className="w-8 h-8 rounded-xl neu-inset flex items-center justify-center shrink-0 text-[#7138E8]">
                  <Mail className="w-4 h-4" />
                </div>
                <div>
                  <span className="text-[10px] text-[#5F5675] block">Official TPO Email</span>
                  <span className="font-bold text-[#21163B] select-all">tpo@uitrgpv.ac.in</span>
                </div>
              </div>

              <div className="flex items-start gap-2.5">
                <div className="w-8 h-8 rounded-xl neu-inset flex items-center justify-center shrink-0 text-[#7138E8]">
                  <Phone className="w-4 h-4" />
                </div>
                <div>
                  <span className="text-[10px] text-[#5F5675] block">Direct EPABX Lines</span>
                  <span className="font-bold text-[#21163B]">+91 755 2678812 | +91 755 2678813</span>
                </div>
              </div>

              <div className="flex items-start gap-2.5">
                <div className="w-8 h-8 rounded-xl neu-inset flex items-center justify-center shrink-0 text-[#7138E8]">
                  <MapPin className="w-4 h-4" />
                </div>
                <div>
                  <span className="text-[10px] text-[#5F5675] block">Campus Geolocation</span>
                  <p className="font-medium text-[#21163B] text-[11px] leading-relaxed">
                    Airport Bypass Road, Gandhi Nagar, Bhopal, Madhya Pradesh, PIN: 462033
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="pt-3 border-t border-purple-100 flex items-center justify-between">
            <span className="text-[11px] text-[#5F5675] font-semibold">Bhopal, MP, India</span>
            <button
              onClick={() => {
                alert('Campus Geo-Fence Coordinates: Lat 23.3101° N, Lng 77.3622° E (UIT-RGPV Nodal Campus). High-speed campus proctoring geofence active.');
              }}
              className="btn-tactile px-3 py-1.5 rounded-xl text-xs font-bold text-[#7138E8] flex items-center gap-1.5 cursor-pointer"
            >
              <MapPin className="w-3.5 h-3.5" />
              <span>View Geo-Fence</span>
            </button>
          </div>
        </div>
      </div>

      {/* TPO EXECUTIVE AUTHORITY BANNER */}
      <div className="neu-extruded p-5 sm:p-6 rounded-3xl">
        <div className="flex flex-wrap items-center justify-between gap-4 pb-3 border-b border-purple-200/60">
          <div className="flex items-center gap-2">
            <Shield className="w-5 h-5 text-[#7138E8]" />
            <div>
              <h3 className="font-bold text-base text-[#21163B] font-display">TPO Executive Authority</h3>
              <p className="text-[11px] text-[#5F5675]">Gazetted Placement Officer credentials and statutory state delegation</p>
            </div>
          </div>
          <span className="text-[11px] font-bold text-emerald-700 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200 flex items-center gap-1.5">
            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
            <span>MP Higher Education Gazetted Seal Verified</span>
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mt-4 items-center">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-[#7138E8] to-[#E75ACF] p-0.5 text-white flex items-center justify-center font-bold font-display shadow-md">
              <span className="text-lg">SV</span>
            </div>
            <div>
              <h4 className="font-bold text-sm text-[#21163B]">Dr. Sudhir K. Verma</h4>
              <p className="text-[11px] font-semibold text-[#7138E8]">Head — Training & Placement Officer</p>
              <span className="text-[10px] text-[#5F5675]">UIT-RGPV Directorate Node</span>
            </div>
          </div>

          <div className="neu-inset p-3 rounded-xl text-xs">
            <span className="text-[10px] text-[#5F5675] block">AUTHORIZED EMAIL</span>
            <span className="font-bold text-[#21163B]">dr.skverma@uitrgpv.ac.in</span>
            <span className="text-[10px] text-[#5F5675] block mt-0.5">+91 94250 12891</span>
          </div>

          <div className="neu-inset p-3 rounded-xl text-xs">
            <span className="text-[10px] text-[#5F5675] block">STATUTORY ORDER</span>
            <span className="font-bold text-[#7138E8] font-mono">#MP-TPO-AUTH-8821</span>
            <span className="text-[10px] text-[#5F5675] block mt-0.5">Issued by Principal Secretary, Tech Edu</span>
          </div>

          <div className="text-right">
            <button
              onClick={() => {
                alert('Gazetted Authority Letter Ref: #MP-TPO-AUTH-8821\nOfficer: Dr. Sudhir K. Verma\nSHA-256: 3c5a71829e92ffbb80fa128472910\nCryptographic status: Validated by Government of Madhya Pradesh.');
              }}
              className="btn-kinetic px-4 py-2 rounded-xl text-xs font-bold inline-flex items-center gap-2 cursor-pointer shadow-sm"
            >
              <Eye className="w-4 h-4" />
              <span>View Authorization Letter</span>
            </button>
            <span className="text-[9px] text-[#5F5675] block mt-1">Cryptographic SHA-256 Verified</span>
          </div>
        </div>
      </div>

      {/* ACADEMIC DEPARTMENTS TABLE */}
      <div className="neu-extruded p-6 sm:p-7 rounded-3xl space-y-4">
        <div className="flex flex-wrap items-center justify-between gap-3 pb-3 border-b border-purple-200/60">
          <div>
            <h3 className="font-bold text-lg text-[#21163B] font-display">Academic Departments</h3>
            <p className="text-xs text-[#5F5675]">
              Manage active technical departments, approved student intakes, and faculty coordinators.
            </p>
          </div>
          <button
            onClick={() => setShowAddDeptModal(true)}
            className="btn-kinetic px-4 py-2 rounded-xl text-xs font-bold flex items-center gap-1.5 cursor-pointer shadow-md"
          >
            <Plus className="w-4 h-4" />
            <span>Add Department</span>
          </button>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-purple-200/60 text-[#5F5675] font-semibold uppercase text-[10px]">
                <th className="py-3 px-3">Dept Code</th>
                <th className="py-3 px-3">Department Name</th>
                <th className="py-3 px-3">Programs</th>
                <th className="py-3 px-3">Enrolled Students</th>
                <th className="py-3 px-3">Faculty Coordinator</th>
                <th className="py-3 px-3">Status</th>
                <th className="py-3 px-3 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-purple-100">
              {departments.map((dept) => (
                <tr key={dept.code} className="hover:bg-purple-50/50 transition-colors">
                  <td className="py-3 px-3 font-mono font-bold text-[#7138E8]">{dept.code}</td>
                  <td className="py-3 px-3">
                    <span className="font-bold text-[#21163B] block">{dept.name}</span>
                    <span className="text-[10px] text-[#5F5675]">{dept.tagline}</span>
                  </td>
                  <td className="py-3 px-3">
                    <div className="flex gap-1">
                      {dept.programs.map((p, i) => (
                        <span
                          key={i}
                          className="bg-purple-100 text-[#7138E8] font-bold text-[10px] px-2 py-0.5 rounded-md"
                        >
                          {p}
                        </span>
                      ))}
                    </div>
                  </td>
                  <td className="py-3 px-3">
                    <strong className="text-[#21163B] font-bold">{dept.enrolled}</strong>
                    <span className="text-[10px] text-[#5F5675] ml-1">students</span>
                  </td>
                  <td className="py-3 px-3">
                    <span className="font-bold text-[#21163B] block">{dept.coordinator}</span>
                    <span className="text-[10px] text-[#5F5675]">{dept.role}</span>
                  </td>
                  <td className="py-3 px-3">
                    <span className="inline-flex items-center gap-1.5 bg-emerald-50 text-emerald-800 font-bold text-[10px] px-2.5 py-0.5 rounded-full border border-emerald-200">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
                      {dept.status}
                    </span>
                  </td>
                  <td className="py-3 px-3 text-right">
                    <div className="inline-flex items-center gap-1.5">
                      <button
                        onClick={() => alert(`Editing details for ${dept.name}`)}
                        className="p-1.5 rounded-lg neu-inset text-[#5F5675] hover:text-[#7138E8] cursor-pointer"
                        title="Edit Department"
                      >
                        <Edit2 className="w-3.5 h-3.5" />
                      </button>
                      <button
                        onClick={() => {
                          setDepartments((prev) =>
                            prev.map((d) =>
                              d.code === dept.code
                                ? { ...d, status: d.status === 'Active' ? 'Under Review' : 'Active' }
                                : d
                            )
                          );
                        }}
                        className="p-1.5 rounded-lg neu-inset text-[#5F5675] hover:text-rose-600 cursor-pointer"
                        title="Toggle Status"
                      >
                        <Power className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* DOCUMENT MANAGEMENT VAULT */}
      <div className="neu-extruded p-6 sm:p-7 rounded-3xl space-y-4">
        <div className="flex flex-wrap items-center justify-between gap-3 pb-3 border-b border-purple-200/60">
          <div className="flex items-center gap-2">
            <FileText className="w-5 h-5 text-[#7138E8]" />
            <div>
              <h3 className="font-bold text-lg text-[#21163B] font-display">Document Management Vault</h3>
              <p className="text-xs text-[#5F5675]">
                Statutory certificates, state accreditations, and cryptographically verified PDF credentials
              </p>
            </div>
          </div>
          <button
            onClick={() => {
              alert('Immutable Document Trail: 4 certificates verified by State Nodal Root MP-01. SHA-256 block hash synchronized.');
            }}
            className="btn-tactile px-3.5 py-1.5 rounded-xl text-xs font-bold text-[#7138E8] flex items-center gap-1.5 cursor-pointer"
          >
            <Eye className="w-3.5 h-3.5" />
            <span>View Audit Trail</span>
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {vaultDocs.map((doc) => (
            <div key={doc.id} className="neu-extruded p-4 rounded-2xl flex flex-col justify-between space-y-3">
              <div>
                <div className="flex items-center justify-between mb-2">
                  <div className="w-8 h-8 rounded-xl bg-rose-100 text-rose-700 flex items-center justify-center font-bold text-[10px]">
                    PDF
                  </div>
                  <span className="text-[10px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200 flex items-center gap-1">
                    <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                    Verified
                  </span>
                </div>

                <h4 className="font-bold text-xs text-[#21163B] font-display line-clamp-2">{doc.title}</h4>
                <p className="text-[10px] text-[#5F5675] mt-1">PDF • {doc.size}</p>
                <span className="text-[9px] font-mono text-[#5F5675] block mt-0.5">SHA-256: {doc.sha}</span>
              </div>

              <div className="grid grid-cols-3 gap-1 pt-2 border-t border-purple-100 text-[10px]">
                <button
                  onClick={() => setShowDocPreview(doc)}
                  className="p-1.5 rounded-lg neu-inset text-center font-bold text-[#7138E8] hover:bg-white cursor-pointer"
                >
                  Preview
                </button>
                <button
                  onClick={() => alert(`Downloading verified copy of ${doc.title}`)}
                  className="p-1.5 rounded-lg neu-inset text-center font-semibold text-[#5F5675] hover:text-[#21163B] cursor-pointer"
                  title="Download"
                >
                  <Download className="w-3 h-3 mx-auto" />
                </button>
                <button
                  onClick={() => alert(`Replace Document: Please upload an official gazetted PDF signed with state DSC token.`)}
                  className="p-1.5 rounded-lg neu-inset text-center font-semibold text-[#5F5675] hover:text-[#21163B] cursor-pointer"
                  title="Replace"
                >
                  <RefreshCw className="w-3 h-3 mx-auto" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* STATE NODAL VERIFICATION FOOTER BANNER */}
      <div className="neu-extruded p-5 sm:p-6 rounded-3xl flex flex-wrap items-center justify-between gap-4 bg-gradient-to-r from-purple-50/50 to-white/60">
        <div className="flex items-start gap-3">
          <div className="w-10 h-10 rounded-xl bg-purple-600 text-white flex items-center justify-center shrink-0 shadow-md">
            <ShieldCheck className="w-6 h-6" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h4 className="font-bold text-sm text-[#21163B] font-display">State Nodal Verification Active</h4>
              <span className="text-[10px] font-mono font-bold bg-emerald-100 text-emerald-800 px-2 py-0.5 rounded-md">
                Node #INST-MP-UIT-01
              </span>
            </div>
            <p className="text-xs text-[#5F5675] mt-0.5 max-w-2xl">
              Last Verified: <strong>14 Nov 2024</strong> by Directorate of Technical Education MP under sovereign verification reference{' '}
              <span className="font-mono text-[#7138E8]">#DTE-MP-VERIF-9912</span>. Institutional placement authorizations are valid for the Academic Session 2024-2025.
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() => setIsEditing(true)}
            className="btn-tactile px-4 py-2 rounded-xl text-xs font-bold cursor-pointer"
          >
            Edit Profile
          </button>
          <button
            onClick={handleSaveChanges}
            className="btn-kinetic px-6 py-2 rounded-xl text-xs font-bold cursor-pointer shadow-md"
          >
            Save Changes
          </button>
        </div>
      </div>

      {/* SUCCESS TOAST NOTIFICATION */}
      {saveSuccessNotice && (
        <div className="fixed bottom-6 right-6 z-50 neu-floating p-4 rounded-2xl bg-white border border-emerald-200 flex items-center gap-3 shadow-xl">
          <CheckCircle2 className="w-5 h-5 text-emerald-600" />
          <span className="text-xs font-bold text-[#21163B]">
            Institutional Profile & Credentials Synchronized with State Nodal Grid
          </span>
        </div>
      )}

      {/* ADD DEPARTMENT MODAL */}
      {showAddDeptModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-xs">
          <div className="w-full max-w-md neu-floating rounded-3xl p-6 space-y-4 bg-[#F3F0FF]">
            <div className="flex justify-between items-center pb-3 border-b border-purple-200">
              <h3 className="font-bold text-base text-[#21163B] font-display">Add Academic Department</h3>
              <button onClick={() => setShowAddDeptModal(false)} className="cursor-pointer text-[#5F5675]">✕</button>
            </div>
            <form onSubmit={handleAddDept} className="space-y-3 text-xs">
              <div>
                <label className="block font-semibold mb-1">Department Name</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Artificial Intelligence & Data Science"
                  value={newDeptName}
                  onChange={(e) => setNewDeptName(e.target.value)}
                  className="neu-input w-full px-3 py-2 rounded-xl"
                />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold mb-1">Dept Code</label>
                  <input
                    type="text"
                    placeholder="e.g. 06"
                    value={newDeptCode}
                    onChange={(e) => setNewDeptCode(e.target.value)}
                    className="neu-input w-full px-3 py-2 rounded-xl"
                  />
                </div>
                <div>
                  <label className="block font-semibold mb-1">Enrolled Intake</label>
                  <input
                    type="number"
                    value={newDeptEnrolled}
                    onChange={(e) => setNewDeptEnrolled(Number(e.target.value))}
                    className="neu-input w-full px-3 py-2 rounded-xl"
                  />
                </div>
              </div>
              <div>
                <label className="block font-semibold mb-1">Faculty Coordinator</label>
                <input
                  type="text"
                  placeholder="e.g. Dr. Sunita Chouhan"
                  value={newDeptCoord}
                  onChange={(e) => setNewDeptCoord(e.target.value)}
                  className="neu-input w-full px-3 py-2 rounded-xl"
                />
              </div>
              <button
                type="submit"
                className="w-full btn-kinetic py-2.5 rounded-xl font-bold cursor-pointer mt-2"
              >
                Register Department
              </button>
            </form>
          </div>
        </div>
      )}

      {/* DOC PREVIEW MODAL */}
      {showDocPreview && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-xs">
          <div className="w-full max-w-lg neu-floating rounded-3xl p-6 space-y-4 bg-[#F3F0FF]">
            <div className="flex justify-between items-center pb-3 border-b border-purple-200">
              <h3 className="font-bold text-sm text-[#21163B] font-display">{showDocPreview.title}</h3>
              <button onClick={() => setShowDocPreview(null)} className="cursor-pointer text-[#5F5675]">✕</button>
            </div>
            <div className="neu-inset p-4 rounded-2xl text-xs space-y-2">
              <div className="flex justify-between">
                <span className="text-[#5F5675]">Classification:</span>
                <span className="font-bold text-[#21163B]">{showDocPreview.type}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-[#5F5675]">Cryptographic Hash:</span>
                <span className="font-mono text-[#7138E8]">{showDocPreview.sha}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-[#5F5675]">State Ledger Status:</span>
                <span className="font-bold text-emerald-600">Attested by MP-HED Root</span>
              </div>
            </div>
            <div className="h-40 neu-flat rounded-2xl flex flex-col items-center justify-center text-center p-4">
              <FileText className="w-10 h-10 text-[#7138E8] mb-2" />
              <span className="text-xs font-bold text-[#21163B]">{showDocPreview.title}</span>
              <span className="text-[11px] text-[#5F5675] mt-1">Official Digital Stamp Verified by MP Directorate</span>
            </div>
            <button
              onClick={() => setShowDocPreview(null)}
              className="w-full btn-kinetic py-2 rounded-xl text-xs font-bold cursor-pointer"
            >
              Close Document
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
