import React, { useState } from 'react';
import {
  Calendar,
  Users,
  Award,
  Sparkles,
  QrCode,
  Download,
  Plus,
  Clock,
  MapPin,
  CheckCircle2,
  ExternalLink,
  Search,
  Camera,
  Shield,
  FileCheck2,
  ChevronRight,
} from 'lucide-react';
import confetti from 'canvas-confetti';

interface EventItem {
  id: string;
  title: string;
  organizer: string;
  category: string;
  date: string;
  time: string;
  venue: string;
  capacity: number;
  registered: number;
  status: 'Upcoming' | 'Live Now' | 'Completed';
  speaker: string;
  speakerRole: string;
}

export const EventsWorkshopsModule: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [scannerActive, setScannerActive] = useState(false);
  const [lastScannedStudent, setLastScannedStudent] = useState<string | null>(null);

  // Form State
  const [newTitle, setNewTitle] = useState('');
  const [newOrganizer, setNewOrganizer] = useState('');
  const [newCategory, setNewCategory] = useState('Technical Workshop');
  const [newDate, setNewDate] = useState('2024-12-05');
  const [newVenue, setNewVenue] = useState('Main Auditorium / Virtual');
  const [newSpeaker, setNewSpeaker] = useState('');

  const [events, setEvents] = useState<EventItem[]>([
    {
      id: 'ev-1',
      title: 'Cloud Native Microservices Architecture & Kubernetes Workshop',
      organizer: 'CloudScale Labs Inc',
      category: 'Technical Workshop',
      date: '22 Nov 2024',
      time: '10:00 AM - 04:00 PM IST',
      venue: 'UIT-RGPV AI Auditorium & Hybrid Stream',
      capacity: 240,
      registered: 218,
      status: 'Live Now',
      speaker: 'Priya Malhotra',
      speakerRole: 'Principal Cloud Architect, CloudScale Labs',
    },
    {
      id: 'ev-2',
      title: 'High-Throughput Streaming & Distributed Go Systems Masterclass',
      organizer: 'RedPanda Data',
      category: 'Industry Masterclass',
      date: '26 Nov 2024',
      time: '02:00 PM - 05:30 PM IST',
      venue: 'Virtual Keynote Stream',
      capacity: 300,
      registered: 284,
      status: 'Upcoming',
      speaker: 'Alex Rivera',
      speakerRole: 'Staff Systems Engineer, RedPanda',
    },
    {
      id: 'ev-3',
      title: 'BRIDGIE Placement Masterclass: Acoustic Fluency & HR Confidence',
      organizer: 'SkillBridge Directorate',
      category: 'Soft Skills & Mock Sessions',
      date: '02 Dec 2024',
      time: '11:00 AM - 01:00 PM IST',
      venue: 'Smart Placement Studio (Room 402)',
      capacity: 150,
      registered: 142,
      status: 'Upcoming',
      speaker: 'Dr. Elena Rostova',
      speakerRole: 'Director of AI Behavioral Assessment',
    },
    {
      id: 'ev-4',
      title: 'Madhya Pradesh State Tech Hackathon 2024',
      organizer: 'DTE & MP Higher Education',
      category: 'Hackathon',
      date: '15 Dec 2024',
      time: '36-Hour Continuous Sprint',
      venue: 'Bhopal State Nodal Innovation Center',
      capacity: 500,
      registered: 460,
      status: 'Upcoming',
      speaker: 'State Directorate Panel',
      speakerRole: 'Government of Madhya Pradesh',
    },
  ]);

  const handleCreateEvent = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle) return;
    const item: EventItem = {
      id: `ev-${Date.now()}`,
      title: newTitle,
      organizer: newOrganizer || 'UIT-RGPV Placement Cell',
      category: newCategory,
      date: newDate,
      time: '10:00 AM - 01:00 PM IST',
      venue: newVenue,
      capacity: 200,
      registered: 1,
      status: 'Upcoming',
      speaker: newSpeaker || 'Guest Speaker',
      speakerRole: 'Industry Specialist',
    };
    setEvents([item, ...events]);
    setShowCreateModal(false);
    confetti({ particleCount: 60, spread: 60, origin: { y: 0.6 } });
    setNewTitle('');
    setNewOrganizer('');
  };

  const handleSimulateScan = () => {
    setScannerActive(true);
    setTimeout(() => {
      setLastScannedStudent('Ayush Sharma (0101CS211048) — Verified Attendance');
      setScannerActive(false);
      confetti({ particleCount: 40, spread: 50 });
    }, 1000);
  };

  const filteredEvents = events.filter((ev) => {
    if (selectedCategory === 'All') return true;
    return ev.category.toLowerCase().includes(selectedCategory.toLowerCase());
  });

  return (
    <div className="space-y-6">
      {/* HEADER SECTION */}
      <div className="neu-extruded p-6 sm:p-8 rounded-3xl">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full neu-inset text-xs font-bold text-[#7138E8]">
              <Calendar className="w-3.5 h-3.5" />
              <span>State Directorate Campus Engagements</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold font-display text-[#21163B] mt-2">
              Events & Workshops
            </h1>
            <p className="text-xs sm:text-sm text-[#5F5675]">
              Manage technical hackathons, industry masterclasses, recruiter campus visits and training workshops.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => {
                alert('Exporting verified attendance log & cryptographic certification docket.');
              }}
              className="btn-tactile px-4 py-2.5 rounded-xl text-xs font-bold flex items-center gap-2 cursor-pointer"
            >
              <Download className="w-4 h-4 text-[#7138E8]" />
              <span>Export Roster</span>
            </button>
            <button
              onClick={() => setShowCreateModal(true)}
              className="btn-kinetic px-5 py-2.5 rounded-xl text-xs font-bold flex items-center gap-2 cursor-pointer shadow-md"
            >
              <Plus className="w-4 h-4" />
              <span>Create New Event</span>
            </button>
          </div>
        </div>

        {/* 6 TOP KPI CARDS */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 mt-6 pt-5 border-t border-purple-200/60">
          <div className="neu-inset p-3.5 rounded-2xl text-center">
            <div className="flex items-center justify-center gap-1 text-[11px] text-[#5F5675]">
              <Calendar className="w-3.5 h-3.5 text-[#7138E8]" />
              <span>TOTAL EVENTS</span>
            </div>
            <span className="text-2xl font-extrabold font-display text-[#21163B] block mt-1">28</span>
            <span className="text-[10px] text-[#5F5675]">Conducted this AY</span>
          </div>

          <div className="neu-inset p-3.5 rounded-2xl text-center border-b-2 border-[#7138E8]">
            <div className="flex items-center justify-center gap-1 text-[11px] text-[#5F5675]">
              <Clock className="w-3.5 h-3.5 text-purple-600" />
              <span>UPCOMING</span>
            </div>
            <span className="text-2xl font-extrabold font-display text-[#7138E8] block mt-1">6</span>
            <span className="text-[10px] text-purple-700 font-semibold">Scheduled this month</span>
          </div>

          <div className="neu-inset p-3.5 rounded-2xl text-center">
            <div className="flex items-center justify-center gap-1 text-[11px] text-[#5F5675]">
              <Users className="w-3.5 h-3.5 text-[#963DF5]" />
              <span>REGISTRATIONS</span>
            </div>
            <span className="text-2xl font-extrabold font-display text-[#21163B] block mt-1">2,480</span>
            <span className="text-[10px] text-[#5F5675]">Cumulative attendance</span>
          </div>

          <div className="neu-inset p-3.5 rounded-2xl text-center">
            <div className="flex items-center justify-center gap-1 text-[11px] text-[#5F5675]">
              <Sparkles className="w-3.5 h-3.5 text-[#E75ACF]" />
              <span>INDUSTRY EXPERTS</span>
            </div>
            <span className="text-2xl font-extrabold font-display text-[#21163B] block mt-1">34</span>
            <span className="text-[10px] text-[#5F5675]">Invited guest speakers</span>
          </div>

          <div className="neu-inset p-3.5 rounded-2xl text-center border-b-2 border-emerald-500">
            <div className="flex items-center justify-center gap-1 text-[11px] text-[#5F5675]">
              <Award className="w-3.5 h-3.5 text-emerald-600" />
              <span>CERTIFICATES</span>
            </div>
            <span className="text-2xl font-extrabold font-display text-emerald-600 block mt-1">1,840</span>
            <span className="text-[10px] text-emerald-700 font-semibold">State attested e-certs</span>
          </div>

          <div className="neu-inset p-3.5 rounded-2xl text-center">
            <div className="flex items-center justify-center gap-1 text-[11px] text-[#5F5675]">
              <CheckCircle2 className="w-3.5 h-3.5 text-indigo-600" />
              <span>ENGAGEMENT</span>
            </div>
            <span className="text-2xl font-extrabold font-display text-indigo-600 block mt-1">94.2%</span>
            <span className="text-[10px] text-[#5F5675]">Student feedback rating</span>
          </div>
        </div>
      </div>

      {/* CATEGORY FILTER CHIPS */}
      <div className="neu-extruded p-4 sm:p-5 rounded-2xl">
        <div className="flex flex-wrap items-center gap-2 text-xs font-bold">
          <span className="text-[#5F5675] mr-1">Filter Events:</span>
          {[
            { id: 'All', label: 'All (28)' },
            { id: 'Technical Workshop', label: 'Technical Workshops (10)' },
            { id: 'Hackathon', label: 'Hackathons (4)' },
            { id: 'Industry Masterclass', label: 'Industry Masterclasses (6)' },
            { id: 'Soft Skills', label: 'Soft Skills & Mock Sessions (3)' },
          ].map((cat) => (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              className={`px-3 py-1.5 rounded-xl cursor-pointer transition-all ${
                selectedCategory === cat.id ? 'btn-kinetic text-white shadow-xs' : 'neu-inset text-[#5F5675]'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>
      </div>

      {/* EVENT CARDS & LIVE QR ATTENDANCE TERMINAL (2-COLUMN GRID) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
        {/* Left Column: Event Cards Grid */}
        <div className="lg:col-span-7 space-y-4">
          {filteredEvents.map((ev) => (
            <div key={ev.id} className="neu-extruded p-5 sm:p-6 rounded-3xl space-y-3">
              <div className="flex flex-wrap items-start justify-between gap-2">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] font-bold text-[#7138E8] bg-purple-100 px-2 py-0.5 rounded-md">
                      {ev.category}
                    </span>
                    <span className="text-[10px] text-[#5F5675] font-semibold">{ev.organizer}</span>
                  </div>
                  <h3 className="font-bold text-base text-[#21163B] font-display mt-1.5">
                    {ev.title}
                  </h3>
                </div>

                <span
                  className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold ${
                    ev.status === 'Live Now'
                      ? 'bg-emerald-100 text-emerald-800 border border-emerald-300'
                      : 'bg-purple-100 text-[#7138E8]'
                  }`}
                >
                  {ev.status}
                </span>
              </div>

              {/* Event Metadata */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 p-3 rounded-xl neu-inset text-xs">
                <div className="flex items-center gap-2">
                  <Calendar className="w-3.5 h-3.5 text-[#7138E8]" />
                  <span>{ev.date} • {ev.time}</span>
                </div>
                <div className="flex items-center gap-2">
                  <MapPin className="w-3.5 h-3.5 text-[#7138E8]" />
                  <span className="truncate">{ev.venue}</span>
                </div>
              </div>

              {/* Speaker & Capacity */}
              <div className="flex flex-wrap items-center justify-between text-xs pt-2 border-t border-purple-100 gap-2">
                <div>
                  <span className="text-[10px] text-[#5F5675] block">Featured Speaker</span>
                  <strong className="text-[#21163B]">{ev.speaker}</strong>
                  <span className="text-[10px] text-[#5F5675] block">{ev.speakerRole}</span>
                </div>

                <div className="text-right">
                  <span className="text-[10px] text-[#5F5675] block">Attendance Intake</span>
                  <strong className="text-[#7138E8]">{ev.registered} / {ev.capacity}</strong>
                  <div className="w-24 bg-[#E9DFFF] h-1.5 rounded-full mt-1 overflow-hidden">
                    <div
                      className="bg-[#7138E8] h-full"
                      style={{ width: `${(ev.registered / ev.capacity) * 100}%` }}
                    ></div>
                  </div>
                </div>
              </div>

              <div className="pt-2 flex justify-end gap-2">
                <button
                  onClick={() => alert(`Issuing state e-certificates for ${ev.title}`)}
                  className="btn-tactile px-3 py-1.5 rounded-xl text-xs font-semibold cursor-pointer"
                >
                  Issue Certificates
                </button>
                <button
                  onClick={() => alert(`Viewing live attendance ledger for ${ev.title}`)}
                  className="btn-kinetic px-4 py-1.5 rounded-xl text-xs font-bold cursor-pointer"
                >
                  View Roster
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Right Column: Live QR Attendance Terminal Engine */}
        <div className="lg:col-span-5 neu-extruded p-6 sm:p-7 rounded-3xl flex flex-col justify-between space-y-4">
          <div>
            <div className="flex items-center justify-between pb-3 border-b border-purple-200/60">
              <div className="flex items-center gap-2">
                <QrCode className="w-5 h-5 text-[#7138E8]" />
                <h3 className="font-bold text-base text-[#21163B] font-display">
                  Live QR Attendance Terminal
                </h3>
              </div>
              <span className="text-[10px] font-mono text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-md border border-emerald-200">
                Optical Sensor Online
              </span>
            </div>
            <p className="text-xs text-[#5F5675] mt-1">
              Real-time student check-in terminal with instant verification seal for state workshop compliance.
            </p>

            {/* Simulated Camera Viewfinder */}
            <div className="mt-4 p-5 rounded-2xl bg-[#21163B] text-white flex flex-col items-center justify-center relative overflow-hidden h-52">
              <div className="w-32 h-32 border-2 border-dashed border-[#E75ACF] rounded-2xl flex items-center justify-center relative">
                <QrCode className="w-16 h-16 text-purple-300 opacity-60" />
                <div className="absolute inset-x-0 top-0 h-0.5 bg-gradient-to-r from-transparent via-[#E75ACF] to-transparent animate-pulse"></div>
              </div>
              <span className="text-[11px] text-purple-200 mt-2 font-mono">
                {scannerActive ? 'Scanning Digital Skill Passport...' : 'Align Student QR Code within reticle'}
              </span>
            </div>

            {/* Last Scanned Status */}
            {lastScannedStudent && (
              <div className="mt-3 p-3 rounded-xl bg-emerald-50 border border-emerald-200 text-xs text-emerald-800 flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                <span className="font-semibold">{lastScannedStudent}</span>
              </div>
            )}
          </div>

          <div className="space-y-2">
            <button
              onClick={handleSimulateScan}
              disabled={scannerActive}
              className="w-full btn-kinetic py-2.5 rounded-xl text-xs font-bold flex items-center justify-center gap-2 cursor-pointer shadow-md disabled:opacity-75"
            >
              <Camera className="w-4 h-4" />
              <span>{scannerActive ? 'Verifying Optical Stream...' : 'Simulate Candidate QR Scan'}</span>
            </button>
            <span className="text-[10px] text-center text-[#5F5675] block">
              Cryptographically verified with SHA-256 state ledger token.
            </span>
          </div>
        </div>
      </div>

      {/* CREATE EVENT DRAWER / MODAL */}
      {showCreateModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-xs">
          <div className="w-full max-w-lg neu-floating rounded-3xl p-6 space-y-4 bg-[#F3F0FF]">
            <div className="flex justify-between items-center pb-3 border-b border-purple-200">
              <h3 className="font-bold text-base text-[#21163B] font-display">
                Schedule New Campus Engagement Event
              </h3>
              <button onClick={() => setShowCreateModal(false)} className="cursor-pointer text-[#5F5675]">✕</button>
            </div>

            <form onSubmit={handleCreateEvent} className="space-y-3 text-xs">
              <div>
                <label className="block font-semibold mb-1 text-[#21163B]">Event Title</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Distributed Consensus Algorithms Workshop"
                  value={newTitle}
                  onChange={(e) => setNewTitle(e.target.value)}
                  className="neu-input w-full px-3 py-2 rounded-xl"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold mb-1 text-[#21163B]">Category</label>
                  <select
                    value={newCategory}
                    onChange={(e) => setNewCategory(e.target.value)}
                    className="neu-input w-full px-3 py-2 rounded-xl"
                  >
                    <option value="Technical Workshop">Technical Workshop</option>
                    <option value="Industry Masterclass">Industry Masterclass</option>
                    <option value="Hackathon">Hackathon</option>
                    <option value="Soft Skills & Mock Sessions">Soft Skills & Mock Sessions</option>
                  </select>
                </div>
                <div>
                  <label className="block font-semibold mb-1 text-[#21163B]">Date</label>
                  <input
                    type="date"
                    value={newDate}
                    onChange={(e) => setNewDate(e.target.value)}
                    className="neu-input w-full px-3 py-2 rounded-xl"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold mb-1 text-[#21163B]">Organizer / Partner</label>
                  <input
                    type="text"
                    placeholder="e.g. Google Cloud / IEEE Student Branch"
                    value={newOrganizer}
                    onChange={(e) => setNewOrganizer(e.target.value)}
                    className="neu-input w-full px-3 py-2 rounded-xl"
                  />
                </div>
                <div>
                  <label className="block font-semibold mb-1 text-[#21163B]">Featured Speaker</label>
                  <input
                    type="text"
                    placeholder="e.g. Senior Tech Lead"
                    value={newSpeaker}
                    onChange={(e) => setNewSpeaker(e.target.value)}
                    className="neu-input w-full px-3 py-2 rounded-xl"
                  />
                </div>
              </div>

              <div>
                <label className="block font-semibold mb-1 text-[#21163B]">Venue / Location</label>
                <input
                  type="text"
                  value={newVenue}
                  onChange={(e) => setNewVenue(e.target.value)}
                  className="neu-input w-full px-3 py-2 rounded-xl"
                />
              </div>

              <button
                type="submit"
                className="w-full btn-kinetic py-2.5 rounded-xl font-bold cursor-pointer mt-2"
              >
                Publish & Dispatch Invitations
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
