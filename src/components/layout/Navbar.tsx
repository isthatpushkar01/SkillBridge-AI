import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { SkillBridgeLogo } from '../common/SkillBridgeLogo';
import {
  Bell,
  Search,
  User,
  LogOut,
  ChevronDown,
  Shield,
  GraduationCap,
  Building2,
  Briefcase,
  Layers,
  Sparkles,
  Menu,
  X,
  ExternalLink,
} from 'lucide-react';

interface NavbarProps {
  onToggleSidebar?: () => void;
  isSidebarOpen?: boolean;
}

export const Navbar: React.FC<NavbarProps> = ({ onToggleSidebar, isSidebarOpen }) => {
  const {
    currentUser,
    currentRole,
    currentRoute,
    navigateTo,
    logout,
    notifications,
    markNotificationAsRead,
  } = useApp();

  const [showNotifications, setShowNotifications] = useState(false);
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const unreadCount = notifications.filter((n) => !n.read).length;

  const getRoleIcon = (role: string) => {
    switch (role) {
      case 'student':
        return <GraduationCap className="w-4 h-4 text-purple-600" />;
      case 'tpo':
        return <Building2 className="w-4 h-4 text-indigo-600" />;
      case 'recruiter':
        return <Briefcase className="w-4 h-4 text-violet-600" />;
      case 'admin':
        return <Shield className="w-4 h-4 text-emerald-600" />;
      default:
        return <Sparkles className="w-4 h-4 text-[#7138E8]" />;
    }
  };

  return (
    <header className="sticky top-0 z-40 w-full bg-[#F3F0FF]/95 backdrop-blur-md border-b border-white/60 transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-18">
          {/* Left: Brand & Mobile Sidebar Toggle */}
          <div className="flex items-center space-x-3">
            {currentRole !== 'public' && onToggleSidebar && (
              <button
                onClick={onToggleSidebar}
                className="p-2 rounded-xl neu-extruded-sm lg:hidden hover:text-[#7138E8] transition-colors cursor-pointer"
                aria-label="Toggle Navigation Sidebar"
              >
                {isSidebarOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </button>
            )}

            {/* Official Brand Logo */}
            <div
              onClick={() => (currentRole === 'public' ? navigateTo('home') : navigateTo('dashboard', 'overview'))}
              className="cursor-pointer group"
            >
              <SkillBridgeLogo size="md" />
            </div>
          </div>

          {/* Center: Public Links or Global Search */}
          <div className="hidden md:flex items-center space-x-1 lg:space-x-2">
            {currentRole === 'public' ? (
              <nav className="flex items-center space-x-1 font-display font-medium text-sm text-[#21163B]">
                <button
                  onClick={() => navigateTo('home')}
                  className={`px-3 py-2 rounded-xl transition-all cursor-pointer ${
                    currentRoute === 'home' ? 'neu-inset text-[#7138E8] font-bold' : 'hover:text-[#7138E8]'
                  }`}
                >
                  Home
                </button>
                <button
                  onClick={() => navigateTo('features')}
                  className={`px-3 py-2 rounded-xl transition-all cursor-pointer ${
                    currentRoute === 'features' ? 'neu-inset text-[#7138E8] font-bold' : 'hover:text-[#7138E8]'
                  }`}
                >
                  Features
                </button>
                <button
                  onClick={() => navigateTo('modules')}
                  className={`px-3 py-2 rounded-xl transition-all cursor-pointer ${
                    currentRoute === 'modules' ? 'neu-inset text-[#7138E8] font-bold' : 'hover:text-[#7138E8]'
                  }`}
                >
                  Platform Modules
                </button>
                <button
                  onClick={() => navigateTo('about')}
                  className={`px-3 py-2 rounded-xl transition-all cursor-pointer ${
                    currentRoute === 'about' ? 'neu-inset text-[#7138E8] font-bold' : 'hover:text-[#7138E8]'
                  }`}
                >
                  About Ecosystem
                </button>
              </nav>
            ) : (
              <div className="relative w-64 lg:w-80">
                <Search className="w-4 h-4 text-[#5F5675] absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  placeholder={`Search ${currentRole} records, skills, drives...`}
                  className="neu-input w-full pl-9 pr-4 py-2 text-xs rounded-xl focus:outline-none"
                />
              </div>
            )}
          </div>

          {/* Right: Actions / Auth / Profile */}
          <div className="flex items-center space-x-3">
            {currentRole === 'public' ? (
              <div className="flex items-center space-x-2">
                <button
                  onClick={() => navigateTo('login')}
                  className="btn-tactile px-4 py-2 text-xs rounded-xl cursor-pointer"
                >
                  Login
                </button>
                <button
                  onClick={() => navigateTo('register')}
                  className="btn-kinetic px-4 py-2 text-xs rounded-xl cursor-pointer flex items-center gap-1.5"
                >
                  <Sparkles className="w-3.5 h-3.5" />
                  Get Started
                </button>
              </div>
            ) : (
              <div className="flex items-center space-x-3">
                {/* Notifications Popover Trigger */}
                <div className="relative">
                  <button
                    onClick={() => {
                      setShowNotifications(!showNotifications);
                      setShowProfileMenu(false);
                    }}
                    className="p-2.5 rounded-xl neu-extruded-sm text-[#21163B] hover:text-[#7138E8] transition-all cursor-pointer relative"
                    aria-label="View Notifications"
                  >
                    <Bell className="w-4 h-4" />
                    {unreadCount > 0 && (
                      <span className="absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-[#E75ACF] text-white text-[9px] font-bold shadow-xs">
                        {unreadCount}
                      </span>
                    )}
                  </button>

                  {/* Notifications Popover Dropdown */}
                  {showNotifications && (
                    <div className="absolute right-0 mt-3 w-80 sm:w-96 rounded-2xl glass-panel neu-floating p-4 z-50 animate-in fade-in slide-in-from-top-2 duration-200">
                      <div className="flex items-center justify-between pb-3 border-b border-purple-200/60">
                        <span className="font-bold text-sm font-display text-[#21163B]">
                          Notifications ({unreadCount} unread)
                        </span>
                        <span className="text-[11px] text-[#7138E8] font-semibold cursor-pointer hover:underline">
                          Mark all as read
                        </span>
                      </div>
                      <div className="mt-2 max-h-72 overflow-y-auto space-y-2">
                        {notifications.length === 0 ? (
                          <p className="text-xs text-[#5F5675] py-4 text-center">No notifications</p>
                        ) : (
                          notifications.map((n) => (
                            <div
                              key={n.id}
                              onClick={() => markNotificationAsRead(n.id)}
                              className={`p-2.5 rounded-xl text-xs cursor-pointer transition-colors ${
                                n.read ? 'neu-flat hover:bg-white/60' : 'neu-inset'
                              }`}
                            >
                              <div className="flex items-center justify-between">
                                <span className="font-semibold text-[#21163B]">{n.title}</span>
                                <span className="text-[10px] text-[#5F5675]">{n.timestamp}</span>
                              </div>
                              <p className="text-[#5F5675] text-[11px] mt-1 leading-relaxed">
                                {n.message}
                              </p>
                            </div>
                          ))
                        )}
                      </div>
                    </div>
                  )}
                </div>

                {/* Profile Pill Trigger */}
                <div className="relative">
                  <button
                    onClick={() => {
                      setShowProfileMenu(!showProfileMenu);
                      setShowNotifications(false);
                    }}
                    className="flex items-center space-x-2 p-1.5 pr-3 rounded-xl neu-extruded-sm hover:border-purple-300 transition-all cursor-pointer"
                  >
                    <div className="w-8 h-8 rounded-lg overflow-hidden bg-purple-100 flex items-center justify-center border border-white">
                      {currentUser?.avatar ? (
                        <img
                          src={currentUser.avatar}
                          alt={currentUser.name}
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        getRoleIcon(currentRole)
                      )}
                    </div>
                    <div className="text-left hidden sm:block">
                      <p className="text-xs font-bold text-[#21163B] font-display leading-tight truncate max-w-[120px]">
                        {currentUser?.name || 'Authorized User'}
                      </p>
                      <p className="text-[10px] font-semibold text-[#7138E8] uppercase tracking-wider">
                        {currentRole}
                      </p>
                    </div>
                    <ChevronDown className="w-3.5 h-3.5 text-[#5F5675]" />
                  </button>

                  {/* Profile Menu Dropdown */}
                  {showProfileMenu && (
                    <div className="absolute right-0 mt-3 w-60 rounded-2xl glass-panel neu-floating p-2 z-50 animate-in fade-in slide-in-from-top-2 duration-200">
                      <div className="px-3 py-2 border-b border-purple-200/60 mb-1">
                        <p className="text-xs font-bold text-[#21163B] font-display">
                          {currentUser?.name}
                        </p>
                        <p className="text-[11px] text-[#5F5675] truncate">{currentUser?.email}</p>
                        <span className="inline-block mt-1 text-[10px] font-bold text-[#7138E8] bg-purple-100 px-2 py-0.5 rounded-full">
                          Status: {currentUser?.status || 'approved'}
                        </span>
                      </div>

                      <button
                        onClick={() => {
                          navigateTo('dashboard', 'profile');
                          setShowProfileMenu(false);
                        }}
                        className="w-full flex items-center gap-2.5 px-3 py-2 text-xs text-[#21163B] hover:text-[#7138E8] hover:bg-white/80 rounded-xl transition-colors cursor-pointer"
                      >
                        <User className="w-4 h-4 text-purple-600" />
                        My Profile
                      </button>

                      <button
                        onClick={() => {
                          navigateTo('dashboard', 'settings');
                          setShowProfileMenu(false);
                        }}
                        className="w-full flex items-center gap-2.5 px-3 py-2 text-xs text-[#21163B] hover:text-[#7138E8] hover:bg-white/80 rounded-xl transition-colors cursor-pointer"
                      >
                        <Shield className="w-4 h-4 text-indigo-600" />
                        Settings & Privacy
                      </button>

                      <div className="border-t border-purple-200/60 my-1"></div>

                      <button
                        onClick={() => {
                          logout();
                          setShowProfileMenu(false);
                        }}
                        className="w-full flex items-center gap-2.5 px-3 py-2 text-xs text-rose-600 hover:bg-rose-50 rounded-xl transition-colors cursor-pointer font-semibold"
                      >
                        <LogOut className="w-4 h-4" />
                        Sign Out
                      </button>
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};
