import React, { useState } from 'react';
import { AppProvider, useApp } from './context/AppContext';
import { Navbar } from './components/layout/Navbar';
import { Sidebar } from './components/layout/Sidebar';
import { RoleSwitcherBar } from './components/common/RoleSwitcherBar';
import { BridgieAssistant } from './components/common/BridgieAssistant';
import { LandingPage } from './components/landing/LandingPage';
import {
  FeaturesPage,
  PlatformModulesPage,
  AboutPage,
  ForgotPasswordPage,
} from './components/landing/PublicPages';
import {
  LoginPage,
  RegistrationHub,
  EmailVerificationPage,
  PendingApprovalPage,
} from './components/auth/AuthPages';
import { StudentDashboard } from './components/student/StudentDashboard';
import { TPODashboard } from './components/tpo/TPODashboard';
import { RecruiterDashboard } from './components/recruiter/RecruiterDashboard';
import { AdminDashboard } from './components/admin/AdminDashboard';
import { SkillBridgeLogo } from './components/common/SkillBridgeLogo';
import { Layers } from 'lucide-react';

const AppContent: React.FC = () => {
  const { currentRole, currentRoute, currentUser } = useApp();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  // Determine which page or dashboard view to render
  const renderContent = () => {
    // If pending approval or email verification
    if (currentUser && currentUser.status === 'pending_approval') {
      return <PendingApprovalPage />;
    }
    if (currentUser && currentUser.status === 'pending_email') {
      return <EmailVerificationPage />;
    }

    // Public / Auth routes
    if (currentRoute === 'home') return <LandingPage />;
    if (currentRoute === 'features') return <FeaturesPage />;
    if (currentRoute === 'modules') return <PlatformModulesPage />;
    if (currentRoute === 'about') return <AboutPage />;
    if (currentRoute === 'login') return <LoginPage />;
    if (currentRoute === 'register') return <RegistrationHub />;
    if (currentRoute === 'forgot-password') return <ForgotPasswordPage />;
    if (currentRoute === 'verify-email') return <EmailVerificationPage />;
    if (currentRoute === 'pending-approval') return <PendingApprovalPage />;

    // Authenticated Role Dashboards
    if (currentRole === 'student') return <StudentDashboard />;
    if (currentRole === 'tpo') return <TPODashboard />;
    if (currentRole === 'recruiter') return <RecruiterDashboard />;
    if (currentRole === 'admin') return <AdminDashboard />;

    // Default to Landing Page
    return <LandingPage />;
  };

  const isDashboardView =
    currentUser &&
    currentUser.status === 'approved' &&
    currentRole !== 'public' &&
    !['home', 'features', 'modules', 'about', 'login', 'register', 'forgot-password'].includes(currentRoute);

  return (
    <div className="min-h-screen flex flex-col bg-[#F3F0FF] text-[#21163B]">
      {/* Ecosystem Tester Toolbar */}
      <RoleSwitcherBar />

      {/* Global Tactile Navbar */}
      <Navbar
        onToggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)}
        isSidebarOpen={isSidebarOpen}
      />

      {/* Main Container */}
      <div className="flex-1 flex w-full">
        {/* Role Sidebar (Rendered only in authenticated dashboard views) */}
        {isDashboardView && (
          <Sidebar
            isOpen={isSidebarOpen}
            onClose={() => setIsSidebarOpen(false)}
          />
        )}

        {/* Dynamic Content Pane */}
        <main
          className={`flex-1 transition-all duration-300 w-full ${
            isDashboardView ? 'lg:pl-72 p-4 sm:p-6 lg:p-8 max-w-7xl' : 'w-full'
          }`}
        >
          {renderContent()}
        </main>
      </div>

      {/* Public Footer */}
      {!isDashboardView && (
        <footer className="w-full bg-[#E9DFFF]/70 border-t border-purple-200/60 py-8 px-4 text-xs text-[#5F5675]">
          <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <SkillBridgeLogo size="sm" />
              <span className="hidden sm:inline text-[11px] text-[#5F5675]">• Unified Tactile Placement Ecosystem</span>
            </div>
            <div>
              Madhya Pradesh Technical & Higher Education Placement Ecosystem © 2026. All rights reserved.
            </div>
          </div>
        </footer>
      )}

      {/* Bridgie AI Assistant Mascot Widget (available globally across all pages!) */}
      <BridgieAssistant />
    </div>
  );
};

export default function App() {
  return (
    <AppProvider>
      <AppContent />
    </AppProvider>
  );
}
