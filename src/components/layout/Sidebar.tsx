import React from 'react';
import { useApp } from '../../context/AppContext';
import {
  LayoutDashboard,
  UserCheck,
  FileCheck2,
  Award,
  Compass,
  Briefcase,
  Layers,
  Sparkles,
  BarChart3,
  Calendar,
  CheckCircle,
  Clock,
  Code2,
  Cpu,
  GraduationCap,
  HelpCircle,
  History,
  KeyRound,
  MapPin,
  MessageSquare,
  Microscope,
  Network,
  PieChart,
  School,
  Settings,
  Shield,
  Sliders,
  Target,
  TrendingUp,
  Users,
  Zap,
  BookOpen,
  FileText,
  Building,
  Activity,
  Server,
  UserPlus,
} from 'lucide-react';

interface SidebarProps {
  isOpen: boolean;
  onClose?: () => void;
}

interface SidebarItem {
  id: string;
  label: string;
  icon: React.ComponentType<{ className?: string }>;
  badge?: string;
  badgeColor?: string;
}

export const Sidebar: React.FC<SidebarProps> = ({ isOpen, onClose }) => {
  const { currentRole, activeModule, setActiveModule, approvalRequests } = useApp();

  const pendingApprovalsCount = approvalRequests.filter((r) => r.status === 'pending_approval').length;

  // Student Modules
  const studentItems: SidebarItem[] = [
    { id: 'overview', label: 'Dashboard Overview', icon: LayoutDashboard },
    { id: 'profile', label: 'My Profile', icon: UserCheck },
    { id: 'passport', label: 'Digital Skill Passport', icon: FileCheck2, badge: 'Verified' },
    { id: 'assessment', label: 'AI Diagnostic & Coding IDE', icon: Target, badge: 'Proctored IDE' },
    { id: 'mock-interview', label: 'AI Mock Interview Studio', icon: Cpu, badge: 'Dr. Elena' },
    { id: 'employability', label: 'Employability Score', icon: Award },
    { id: 'roadmap', label: 'AI Career Roadmap', icon: Compass },
    { id: 'gap-analysis', label: 'Skill Gap Analysis', icon: Microscope },
    { id: 'jobs', label: 'Jobs and Internships', icon: Briefcase },
    { id: 'recommendations', label: 'Job Recommendations', icon: Sparkles },
    { id: 'applications', label: 'Applications Tracking', icon: Clock },
    { id: 'certificates', label: 'Certificates', icon: Award },
    { id: 'projects', label: 'Projects & Portfolio', icon: Code2 },
    { id: 'learning-missions', label: 'Learning Missions', icon: BookOpen },
    { id: 'events', label: 'Events & Hackathons', icon: Calendar },
    { id: 'accessibility', label: 'Accessibility Support', icon: Sliders },
    { id: 'notifications', label: 'Notifications', icon: MessageSquare },
    { id: 'settings', label: 'Settings', icon: Settings },
  ];

  // TPO Modules
  const tpoItems: SidebarItem[] = [
    { id: 'overview', label: 'Dashboard Overview', icon: LayoutDashboard },
    {
      id: 'approvals',
      label: 'Student Approval Center',
      icon: CheckCircle,
      badge: pendingApprovalsCount > 0 ? `${pendingApprovalsCount} Pending` : undefined,
      badgeColor: 'bg-amber-500 text-white',
    },
    { id: 'candidate-comparison', label: 'Candidate Comparison Matrix', icon: Sparkles, badge: 'AI Engine' },
    { id: 'students', label: 'Student Management', icon: Users },
    { id: 'recruiters', label: 'Recruiter Management', icon: Building },
    { id: 'institution', label: 'Institution Profile', icon: School },
    { id: 'mp-network', label: 'MP College Network', icon: MapPin, badge: 'Indore/Bhopal' },
    { id: 'skill-analytics', label: 'Skill Analytics', icon: BarChart3 },
    { id: 'employability-analytics', label: 'Employability Analytics', icon: PieChart },
    { id: 'placements', label: 'Placement Management', icon: TrendingUp },
    { id: 'job-management', label: 'Job Management', icon: Briefcase },
    { id: 'campus-drives', label: 'Campus Drives', icon: Calendar },
    { id: 'assessments-admin', label: 'Assessment Management', icon: Target, badge: 'Go / K8s' },
    { id: 'reports', label: 'Reports', icon: FileText },
    { id: 'events', label: 'Events & Workshops', icon: Calendar },
    { id: 'notifications', label: 'Notifications', icon: MessageSquare },
    { id: 'settings', label: 'Settings', icon: Settings },
  ];

  // Recruiter Modules
  const recruiterItems: SidebarItem[] = [
    { id: 'overview', label: 'Dashboard Overview', icon: LayoutDashboard },
    { id: 'candidate-comparison', label: 'Candidate Comparison Matrix', icon: Sparkles, badge: '3 Active' },
    { id: 'company-profile', label: 'Company Profile', icon: Building },
    { id: 'talent', label: 'Find Talent', icon: Users },
    { id: 'ai-matching', label: 'AI Talent Matching', icon: Cpu, badge: 'AI Match' },
    { id: 'post-job', label: 'Post Jobs', icon: Briefcase },
    { id: 'internships', label: 'Internship Opportunities', icon: Target },
    { id: 'applications-funnel', label: 'Applications Pipeline', icon: Layers },
    { id: 'shortlisted', label: 'Shortlisted Candidates', icon: UserCheck },
    { id: 'skill-search', label: 'Skill-Based Search', icon: Code2 },
    { id: 'campus-recruitment', label: 'Campus Recruitment', icon: School },
    { id: 'interviews', label: 'Interview Management', icon: Calendar },
    { id: 'hiring-analytics', label: 'Hiring Analytics', icon: BarChart3 },
    { id: 'notifications', label: 'Notifications', icon: MessageSquare },
    { id: 'settings', label: 'Settings', icon: Settings },
  ];

  // Administration Modules
  const adminItems: SidebarItem[] = [
    { id: 'directorate-governance', label: 'MP Directorate Governance', icon: Shield, badge: 'MP-01 Root' },
    { id: 'overview', label: 'Platform Overview', icon: LayoutDashboard },
    { id: 'tpo-verification', label: 'TPO Verification & Accreditation', icon: CheckCircle, badge: 'Action Req' },
    { id: 'institutions', label: 'Institution Management', icon: School },
    { id: 'users', label: 'User Management', icon: Users },
    { id: 'permissions', label: 'Role & Permissions (RBAC)', icon: KeyRound },
    { id: 'oversight', label: 'Approval Oversight', icon: Shield },
    { id: 'global-analytics', label: 'Global Analytics', icon: BarChart3 },
    { id: 'platform-config', label: 'Platform Configuration', icon: Sliders },
    { id: 'ai-config', label: 'AI Configuration', icon: Cpu },
    { id: 'content', label: 'Content Management', icon: FileText },
    { id: 'audit-logs', label: 'Immutable Audit Ledger', icon: History },
    { id: 'security', label: 'Security & Access', icon: Shield },
    { id: 'notifications-admin', label: 'Notification Management', icon: MessageSquare },
    { id: 'system-health', label: 'System Health', icon: Activity },
    { id: 'support', label: 'Support Management', icon: HelpCircle },
  ];

  let items = studentItems;
  if (currentRole === 'tpo') items = tpoItems;
  else if (currentRole === 'recruiter') items = recruiterItems;
  else if (currentRole === 'admin') items = adminItems;

  return (
    <>
      {/* Mobile Backdrop */}
      {isOpen && (
        <div
          onClick={onClose}
          className="fixed inset-0 bg-black/30 backdrop-blur-xs z-30 lg:hidden"
        />
      )}

      {/* Tactile Sidebar */}
      <aside
        className={`fixed top-18 bottom-0 left-0 z-30 w-72 bg-[#F3F0FF] border-r border-white/80 p-3 overflow-y-auto transition-transform duration-300 ease-in-out lg:translate-x-0 ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
        style={{
          boxShadow: '4px 0 16px rgba(113, 56, 232, 0.05)',
        }}
      >
        {/* Role Header Banner in Sidebar */}
        <div className="mb-3 p-3 rounded-2xl neu-inset text-xs">
          <div className="flex items-center justify-between">
            <span className="font-bold text-[#21163B] font-display uppercase tracking-wider text-[11px]">
              {currentRole} Portal
            </span>
            <span className="text-[10px] font-semibold text-[#7138E8] bg-white/80 px-2 py-0.5 rounded-full border border-purple-200">
              {items.length} Modules
            </span>
          </div>
          <p className="text-[10px] text-[#5F5675] mt-1">
            SkillBridge AI Unified Placement Ecosystem
          </p>
        </div>

        {/* Navigation Items */}
        <nav className="space-y-1.5">
          {items.map((item) => {
            const Icon = item.icon;
            const isActive = activeModule === item.id;
            return (
              <button
                key={item.id}
                onClick={() => {
                  setActiveModule(item.id);
                  onClose?.();
                }}
                className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-semibold font-display transition-all cursor-pointer ${
                  isActive
                    ? 'btn-kinetic text-white shadow-md'
                    : 'neu-extruded-sm text-[#21163B] hover:text-[#7138E8] hover:bg-white/80'
                }`}
              >
                <div className="flex items-center space-x-2.5 truncate">
                  <Icon className={`w-4 h-4 shrink-0 ${isActive ? 'text-white' : 'text-[#7138E8]'}`} />
                  <span className="truncate">{item.label}</span>
                </div>
                {item.badge && (
                  <span
                    className={`text-[10px] font-bold px-2 py-0.5 rounded-full shrink-0 ${
                      item.badgeColor
                        ? item.badgeColor
                        : isActive
                        ? 'bg-white/20 text-white'
                        : 'bg-purple-100 text-[#7138E8] border border-purple-200'
                    }`}
                  >
                    {item.badge}
                  </span>
                )}
              </button>
            );
          })}
        </nav>
      </aside>
    </>
  );
};
