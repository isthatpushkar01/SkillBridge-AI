import React, { useState } from 'react';
import {
  Target,
  Sparkles,
  Download,
  Plus,
  Search,
  Filter,
  CheckCircle2,
  Clock,
  AlertTriangle,
  Play,
  Eye,
  Sliders,
  Shield,
  Video,
  FileCode,
  Layers,
  ChevronRight,
  UserCheck,
} from 'lucide-react';
import confetti from 'canvas-confetti';

interface CatalogItem {
  id: string;
  name: string;
  category: string;
  difficulty: string;
  difficultyClass: string;
  questions: number;
  duration: number;
  assignedCohort: string;
  enrolledTotal: number;
  completedTotal: number;
  status: 'Live Active' | 'Completed' | 'Starts Tomorrow';
  statusColor: string;
}

export const AssessmentManagementModule: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchCatalogQuery, setSearchCatalogQuery] = useState('');
  const [showInterceptModal, setShowInterceptModal] = useState<string | null>(null);

  // New Assessment Form State
  const [newTitle, setNewTitle] = useState('Distributed Systems & Cloud Microservices Benchmark');
  const [newCategory, setNewCategory] = useState('Cloud & Distributed Systems');
  const [newDifficulty, setNewDifficulty] = useState('Advanced (Level 3)');
  const [newQuestions, setNewQuestions] = useState(15);
  const [newDuration, setNewDuration] = useState(90);
  const [newMaxMarks, setNewMaxMarks] = useState(100);
  const [newPassingMarks, setNewPassingMarks] = useState(65);
  const [negativeMarking, setNegativeMarking] = useState(true);
  const [aiProctoring, setAiProctoring] = useState(true);
  const [selectedBranches, setSelectedBranches] = useState<string[]>(['CSE', 'IT', 'ECE']);

  const catalogItems: CatalogItem[] = [
    {
      id: 'ASMT-2025-0891',
      name: 'Distributed Systems & Cloud Microservices Benchmark',
      category: 'Cloud Computing',
      difficulty: 'Advanced (Level 3)',
      difficultyClass: 'bg-rose-100 text-rose-800',
      questions: 18,
      duration: 90,
      assignedCohort: "CSE, IT Batch '25 (240 Students)",
      enrolledTotal: 240,
      completedTotal: 211,
      status: 'Live Active',
      statusColor: 'bg-emerald-100 text-emerald-800',
    },
    {
      id: 'ASMT-2025-0840',
      name: 'Advanced DSA & Graph Concurrency Diagnostic',
      category: 'Algorithms & DSA',
      difficulty: 'Hard',
      difficultyClass: 'bg-purple-100 text-[#7138E8]',
      questions: 12,
      duration: 120,
      assignedCohort: "CSE Batch '25 (180 Students)",
      enrolledTotal: 180,
      completedTotal: 169,
      status: 'Completed',
      statusColor: 'bg-indigo-100 text-indigo-800',
    },
    {
      id: 'ASMT-2025-0776',
      name: 'Core Backend Engineering & Go Microservices',
      category: 'Programming',
      difficulty: 'Intermediate',
      difficultyClass: 'bg-indigo-100 text-indigo-800',
      questions: 15,
      duration: 60,
      assignedCohort: "IT, CSE Batch '25 (220 Students)",
      enrolledTotal: 220,
      completedTotal: 180,
      status: 'Live Active',
      statusColor: 'bg-emerald-100 text-emerald-800',
    },
    {
      id: 'ASMT-2025-0612',
      name: 'BRIDGIE Acoustic Fluency & Crisis Composure',
      category: 'Communication',
      difficulty: 'Adaptive',
      difficultyClass: 'bg-amber-100 text-amber-800',
      questions: 5,
      duration: 30,
      assignedCohort: 'All Placement Eligible (580 Students)',
      enrolledTotal: 580,
      completedTotal: 412,
      status: 'Live Active',
      statusColor: 'bg-emerald-100 text-emerald-800',
    },
    {
      id: 'ASMT-2025-0551',
      name: 'Embedded Systems & RTOS Diagnostics',
      category: 'Domain-Based',
      difficulty: 'Intermediate',
      difficultyClass: 'bg-indigo-100 text-indigo-800',
      questions: 20,
      duration: 75,
      assignedCohort: "ECE, ME Batch '25 (150 Students)",
      enrolledTotal: 150,
      completedTotal: 0,
      status: 'Starts Tomorrow',
      statusColor: 'bg-purple-100 text-[#7138E8]',
    },
  ];

  const handlePublishAssessment = (e: React.FormEvent) => {
    e.preventDefault();
    confetti({ particleCount: 75, spread: 60, origin: { y: 0.6 } });
    alert(`Assessment "${newTitle}" scheduled and dispatched across ${selectedBranches.join(', ')} batches with AI gaze lock proctoring.`);
  };

  const filteredCatalog = catalogItems.filter((item) => {
    const matchesSearch =
      item.name.toLowerCase().includes(searchCatalogQuery.toLowerCase()) ||
      item.id.toLowerCase().includes(searchCatalogQuery.toLowerCase());
    const matchesCat =
      selectedCategory === 'All' ||
      item.category.toLowerCase().includes(selectedCategory.toLowerCase());
    return matchesSearch && matchesCat;
  });

  return (
    <div className="space-y-6">
      {/* HEADER SECTION */}
      <div className="neu-extruded p-6 sm:p-8 rounded-3xl">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full neu-inset text-xs font-bold text-[#7138E8]">
              <span>Module 4 — Assessment Execution</span>
              <span>•</span>
              <span className="flex items-center gap-1 text-emerald-700">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
                AI Gaze & Sandboxed Execution Active
              </span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold font-display text-[#21163B] mt-2">
              Assessment Management
            </h1>
            <p className="text-xs sm:text-sm text-[#5F5675]">
              Create, assign, monitor and evaluate student skill assessments with AI proctoring.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => {
                alert('Exporting Assessment Performance Roster (PDF & CSV) with verification hashes.');
              }}
              className="btn-tactile px-4 py-2.5 rounded-xl text-xs font-bold flex items-center gap-2 cursor-pointer"
            >
              <Download className="w-4 h-4 text-[#7138E8]" />
              <span>Export Roster</span>
            </button>
            <a
              href="#create-assessment-section"
              className="btn-kinetic px-5 py-2.5 rounded-xl text-xs font-bold flex items-center gap-2 cursor-pointer shadow-md"
            >
              <Plus className="w-4 h-4" />
              <span>Create New Assessment</span>
            </a>
          </div>
        </div>

        {/* 6 TOP KPI CARDS */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 mt-6 pt-5 border-t border-purple-200/60">
          <div className="neu-inset p-3.5 rounded-2xl text-center">
            <div className="flex items-center justify-center gap-1 text-[11px] text-[#5F5675]">
              <Target className="w-3.5 h-3.5 text-[#7138E8]" />
              <span>TOTAL ASSESSMENTS</span>
            </div>
            <span className="text-2xl font-extrabold font-display text-[#21163B] block mt-1">36</span>
            <span className="text-[10px] text-[#7138E8] font-semibold">+4 this semester</span>
          </div>

          <div className="neu-inset p-3.5 rounded-2xl text-center border-b-2 border-[#7138E8]">
            <div className="flex items-center justify-center gap-1 text-[11px] text-[#5F5675]">
              <Play className="w-3.5 h-3.5 text-purple-600" />
              <span>ACTIVE ASSESSMENTS</span>
            </div>
            <span className="text-2xl font-extrabold font-display text-[#7138E8] block mt-1">8</span>
            <span className="text-[10px] text-[#5F5675] font-semibold">Live Testing Sessions</span>
            <span className="text-[9px] text-[#7138E8] font-bold block mt-0.5">820 Students Engaged</span>
          </div>

          <div className="neu-inset p-3.5 rounded-2xl text-center">
            <div className="flex items-center justify-center gap-1 text-[11px] text-[#5F5675]">
              <Clock className="w-3.5 h-3.5 text-indigo-600" />
              <span>SCHEDULED</span>
            </div>
            <span className="text-2xl font-extrabold font-display text-[#21163B] block mt-1">12</span>
            <span className="text-[10px] text-[#5F5675] font-semibold">Upcoming Drives</span>
            <span className="text-[9px] text-purple-700 font-bold block mt-0.5">Next starts tomorrow</span>
          </div>

          <div className="neu-inset p-3.5 rounded-2xl text-center border-b-2 border-emerald-500">
            <div className="flex items-center justify-center gap-1 text-[11px] text-[#5F5675]">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
              <span>COMPLETED EVALS</span>
            </div>
            <span className="text-2xl font-extrabold font-display text-emerald-600 block mt-1">418</span>
            <span className="text-[10px] text-[#5F5675] font-semibold">Submissions</span>
            <span className="text-[9px] text-emerald-700 font-bold block mt-0.5">96% verified accuracy</span>
          </div>

          <div className="neu-inset p-3.5 rounded-2xl text-center">
            <div className="flex items-center justify-center gap-1 text-[11px] text-[#5F5675]">
              <Layers className="w-3.5 h-3.5 text-amber-600" />
              <span>PENDING AI EVALS</span>
            </div>
            <span className="text-2xl font-extrabold font-display text-amber-600 block mt-1">14</span>
            <span className="text-[10px] text-[#5F5675] font-semibold">Code Verifications</span>
            <span className="text-[9px] text-amber-700 font-bold block mt-0.5">Est. resolution: 6 mins</span>
          </div>

          <div className="neu-inset p-3.5 rounded-2xl text-center">
            <div className="flex items-center justify-center gap-1 text-[11px] text-[#5F5675]">
              <Sparkles className="w-3.5 h-3.5 text-[#E75ACF]" />
              <span>AVG SCORE</span>
            </div>
            <span className="text-2xl font-extrabold font-display text-[#21163B] block mt-1">
              78.6<span className="text-xs font-normal text-[#5F5675]">/100</span>
            </span>
            <span className="text-[10px] text-[#5F5675] font-semibold">Directorate Baseline</span>
            <span className="text-[9px] text-emerald-700 font-bold block mt-0.5">+3.2% vs Q2</span>
          </div>
        </div>
      </div>

      {/* CATEGORY FILTER CHIPS */}
      <div className="neu-extruded p-4 sm:p-5 rounded-2xl">
        <div className="flex flex-wrap items-center gap-2 text-xs font-bold">
          <span className="text-[#5F5675] mr-1">Categories:</span>
          {[
            { id: 'All', label: 'All (36)' },
            { id: 'Programming', label: 'Programming (12)' },
            { id: 'DSA', label: 'Data Structures & Algorithms (8)' },
            { id: 'Web', label: 'Web Development (5)' },
            { id: 'AI', label: 'AI & Machine Learning (4)' },
            { id: 'Database', label: 'Database Management (3)' },
            { id: 'Cloud', label: 'Cloud & DevOps (4)' },
            { id: 'Communication', label: 'Communication & Behavioral (5)' },
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

      {/* STATE ASSESSMENT CATALOG TABLE */}
      <div className="neu-extruded p-6 sm:p-7 rounded-3xl space-y-4">
        <div className="flex flex-wrap items-center justify-between gap-3 pb-3 border-b border-purple-200/60">
          <div>
            <h3 className="font-bold text-lg text-[#21163B] font-display">State Assessment Catalog</h3>
            <p className="text-xs text-[#5F5675]">Live telemetry and cohort execution metrics across affiliated institutions.</p>
          </div>

          <div className="relative">
            <Search className="w-3.5 h-3.5 absolute left-3 top-2.5 text-[#5F5675]" />
            <input
              type="text"
              placeholder="Filter cohort or title..."
              value={searchCatalogQuery}
              onChange={(e) => setSearchCatalogQuery(e.target.value)}
              className="neu-input pl-8 pr-3 py-1.5 rounded-xl text-xs"
            />
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-purple-200/60 text-[#5F5675] font-semibold uppercase text-[10px]">
                <th className="py-3 px-3">Assessment Name</th>
                <th className="py-3 px-3">Category</th>
                <th className="py-3 px-3">Difficulty</th>
                <th className="py-3 px-3">Questions</th>
                <th className="py-3 px-3">Duration</th>
                <th className="py-3 px-3">Assigned Cohort</th>
                <th className="py-3 px-3">Completion Rate</th>
                <th className="py-3 px-3">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-purple-100">
              {filteredCatalog.map((item) => {
                const pct = Math.round((item.completedTotal / item.enrolledTotal) * 100);
                return (
                  <tr key={item.id} className="hover:bg-purple-50/50 transition-colors">
                    <td className="py-3 px-3">
                      <strong className="text-[#21163B] font-bold block">{item.name}</strong>
                      <span className="text-[10px] text-[#5F5675] font-mono">ID: {item.id}</span>
                    </td>
                    <td className="py-3 px-3 text-[#5F5675] font-medium">{item.category}</td>
                    <td className="py-3 px-3">
                      <span className={`px-2 py-0.5 rounded-md text-[10px] font-bold ${item.difficultyClass}`}>
                        {item.difficulty}
                      </span>
                    </td>
                    <td className="py-3 px-3 font-semibold text-[#21163B]">{item.questions} Questions</td>
                    <td className="py-3 px-3 font-semibold text-[#5F5675]">{item.duration} mins</td>
                    <td className="py-3 px-3 text-[#5F5675] max-w-[200px] truncate">{item.assignedCohort}</td>
                    <td className="py-3 px-3">
                      <div className="flex items-center gap-2">
                        <div className="w-20 bg-[#E9DFFF] h-1.5 rounded-full overflow-hidden">
                          <div className="bg-[#7138E8] h-full" style={{ width: `${pct}%` }}></div>
                        </div>
                        <span className="font-bold text-[#7138E8]">{pct}%</span>
                      </div>
                      <span className="text-[9px] text-[#5F5675]">
                        {item.completedTotal}/{item.enrolledTotal}
                      </span>
                    </td>
                    <td className="py-3 px-3">
                      <span
                        className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-bold ${item.statusColor}`}
                      >
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
                        {item.status}
                      </span>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* LIVE ASSESSMENT MONITORING HUD & QUESTION POOL MATRIX (2-COLUMN GRID) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
        {/* Left Column: Live Assessment Monitoring HUD */}
        <div className="lg:col-span-7 neu-extruded p-6 sm:p-7 rounded-3xl flex flex-col justify-between space-y-4">
          <div>
            <div className="flex items-center justify-between pb-3 border-b border-purple-200/60">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse"></span>
                <h3 className="font-bold text-base text-[#21163B] font-display">Live Assessment Monitoring HUD</h3>
              </div>
              <span className="text-[10px] font-bold text-[#7138E8] bg-purple-100 px-2 py-0.5 rounded-md">
                Active Feed: Distributed Systems
              </span>
            </div>

            <div className="space-y-3 mt-4 text-xs">
              {/* Ayush Sharma */}
              <div className="neu-inset p-3.5 rounded-2xl flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-xl bg-purple-100 text-[#7138E8] flex items-center justify-center font-bold text-xs">
                    AS
                  </div>
                  <div>
                    <strong className="text-[#21163B] block">Ayush Sharma</strong>
                    <span className="text-[10px] text-[#5F5675]">Question 4/5 (Diagramming) • Live Stream Active</span>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="text-right text-[10px]">
                    <span className="text-emerald-700 font-bold block">Gaze Lock: 98%</span>
                    <span className="text-[#5F5675]">Flags: 0 detected</span>
                  </div>
                  <span className="px-2 py-1 rounded-lg bg-emerald-500 text-white font-bold text-[10px] flex items-center gap-1">
                    <Video className="w-3 h-3" /> Live
                  </span>
                </div>
              </div>

              {/* Ananya Mishra */}
              <div className="neu-inset p-3.5 rounded-2xl flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-xl bg-violet-100 text-[#963DF5] flex items-center justify-center font-bold text-xs">
                    AM
                  </div>
                  <div>
                    <strong className="text-[#21163B] block">Ananya Mishra</strong>
                    <span className="text-[10px] text-[#5F5675]">Question 5/5 (Completed) • Integrity: Flawless</span>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="text-right text-[10px]">
                    <span className="text-[#7138E8] font-bold block">Score: 95/100</span>
                    <span className="text-[#5F5675]">Submitted 3m ago</span>
                  </div>
                  <span className="px-2 py-1 rounded-lg bg-purple-100 text-[#7138E8] font-bold text-[10px]">
                    Verified
                  </span>
                </div>
              </div>

              {/* Rohan Deshmukh */}
              <div className="neu-inset p-3.5 rounded-2xl flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-xl bg-indigo-100 text-indigo-700 flex items-center justify-center font-bold text-xs">
                    RD
                  </div>
                  <div>
                    <strong className="text-[#21163B] block">Rohan Deshmukh</strong>
                    <span className="text-[10px] text-[#5F5675]">Question 3/5 (Coding) • Sandbox Go Runner Active</span>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="text-right text-[10px]">
                    <span className="text-emerald-700 font-bold block">Gaze Lock: 96%</span>
                    <span className="text-[#5F5675]">Flags: 0 detected</span>
                  </div>
                  <span className="px-2 py-1 rounded-lg bg-emerald-100 text-emerald-800 font-bold text-[10px]">
                    Active
                  </span>
                </div>
              </div>

              {/* Vikram Solanki (Alert Flag) */}
              <div className="neu-inset p-3.5 rounded-2xl flex items-center justify-between border border-rose-200">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-xl bg-rose-100 text-rose-700 flex items-center justify-center font-bold text-xs">
                    VS
                  </div>
                  <div>
                    <strong className="text-[#21163B] block">Vikram Solanki</strong>
                    <span className="text-[10px] text-rose-700 font-semibold">
                      Question 2/5 • Dual Face Detected (Under Review)
                    </span>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => setShowInterceptModal('Vikram Solanki')}
                    className="px-2.5 py-1 rounded-lg bg-rose-600 text-white font-bold text-[10px] cursor-pointer"
                  >
                    Intercept
                  </button>
                  <button
                    onClick={() => alert('Feed placed on hold. AI proctor audit recording synchronized with MP state server.')}
                    className="px-2.5 py-1 rounded-lg bg-white text-[#5F5675] font-bold text-[10px] border border-purple-200 cursor-pointer"
                  >
                    Hold Feed
                  </button>
                </div>
              </div>
            </div>
          </div>

          <div className="pt-3 border-t border-purple-100 flex flex-wrap items-center justify-between text-[11px] text-[#5F5675] gap-2">
            <span>WebRTC Stream Latency: <strong className="text-[#7138E8]">42ms</strong></span>
            <span>Keystroke Rhythm Model: <strong className="text-emerald-600">Synchronized</strong></span>
            <button
              onClick={() => alert('Expanded 24-feed proctoring grid with biometric gaze vectors.')}
              className="text-[#7138E8] font-bold hover:underline cursor-pointer"
            >
              Expand Full Screen Grid →
            </button>
          </div>
        </div>

        {/* Right Column: Question Pool Matrix */}
        <div className="lg:col-span-5 neu-extruded p-6 sm:p-7 rounded-3xl flex flex-col justify-between space-y-4">
          <div>
            <div className="flex items-center justify-between pb-3 border-b border-purple-200/60">
              <h3 className="font-bold text-base text-[#21163B] font-display">Question Pool Matrix</h3>
              <span className="text-[10px] font-mono text-[#5F5675]">640 Available Items</span>
            </div>
            <p className="text-xs text-[#5F5675] mt-1">
              Select or generate dynamic adaptive question blocks using SkillBridge Multi-Modal Prompts.
            </p>

            <div className="space-y-2 mt-4 text-xs">
              {[
                { title: 'Multiple Choice Questions (MCQ)', desc: 'Automated single/multi select • 220 items' },
                { title: 'Live Coding Sandboxes', desc: 'Go, Python, Java, C++ Compiler • 160 items' },
                { title: 'Scenario Incident Triage', desc: 'Real-time mock outage troubleshooting • 90 items' },
                { title: 'System Design Whiteboard', desc: 'Distributed architecture diagrams • 85 items' },
                { title: 'Acoustic Behavioral Prompts', desc: 'BRIDGIE Speech & tone analysis • 85 items' },
              ].map((pool, idx) => (
                <div
                  key={idx}
                  onClick={() => alert(`Opening Question Pool: ${pool.title}`)}
                  className="p-3 rounded-xl neu-flat hover:bg-white transition-all cursor-pointer flex items-center justify-between"
                >
                  <div>
                    <h4 className="font-bold text-xs text-[#21163B]">{pool.title}</h4>
                    <span className="text-[10px] text-[#5F5675]">{pool.desc}</span>
                  </div>
                  <ChevronRight className="w-4 h-4 text-[#7138E8]" />
                </div>
              ))}
            </div>
          </div>

          <button
            onClick={() => alert('Create Custom Rubric Question: Define test vectors, test cases, and proctoring constraints.')}
            className="w-full btn-tactile py-2 rounded-xl text-xs font-bold text-[#7138E8] flex items-center justify-center gap-1.5 cursor-pointer mt-2"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>Create Custom Rubric Question</span>
          </button>
        </div>
      </div>

      {/* DIAGNOSTIC PERFORMANCE & RUBRIC INSIGHTS */}
      <div className="neu-extruded p-6 sm:p-7 rounded-3xl space-y-4">
        <div className="flex flex-wrap items-center justify-between gap-3 pb-3 border-b border-purple-200/60">
          <div>
            <span className="text-[10px] font-bold uppercase tracking-wider text-[#7138E8] bg-purple-100 px-2 py-0.5 rounded-md">
              Batch Intelligence Analytics
            </span>
            <h3 className="font-bold text-lg text-[#21163B] font-display mt-1">
              Diagnostic Performance & Rubric Insights
            </h3>
            <p className="text-xs text-[#5F5675]">Continuous AI evaluation aggregate for UIT-RGPV cohort assessments.</p>
          </div>

          <div className="flex items-center gap-4 text-xs font-bold">
            <div className="neu-inset px-3 py-1.5 rounded-xl text-center">
              <span className="text-[10px] text-[#5F5675] block">PASS PERCENTAGE</span>
              <span className="text-emerald-600 text-sm">79.4%</span>
            </div>
            <div className="neu-inset px-3 py-1.5 rounded-xl text-center">
              <span className="text-[10px] text-[#5F5675] block">HIGHEST SCORE</span>
              <span className="text-[#7138E8] text-sm">98 / 100</span>
            </div>
            <div className="neu-inset px-3 py-1.5 rounded-xl text-center">
              <span className="text-[10px] text-[#5F5675] block">LOWEST SCORE</span>
              <span className="text-amber-700 text-sm">44 / 100</span>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* Critical Weak Areas Identified */}
          <div className="neu-inset p-4 rounded-2xl space-y-2.5 text-xs">
            <div className="flex items-center gap-1.5 font-bold text-rose-800">
              <AlertTriangle className="w-4 h-4 text-rose-600" />
              <span>Critical Weak Areas Identified</span>
            </div>
            <p className="text-[11px] text-[#5F5675]">
              SkillBridge neural grading identified systemic friction across 3 key engineering competencies in the current senior cohort:
            </p>
            <ul className="space-y-1.5 text-[11px] text-[#21163B]">
              <li className="flex items-start gap-1.5">
                <span className="text-rose-600 font-bold">•</span>
                <span><strong>Ingress failure recovery:</strong> 42% failed circuit-breaker recovery simulation in Go.</span>
              </li>
              <li className="flex items-start gap-1.5">
                <span className="text-amber-600 font-bold">•</span>
                <span><strong>Redis cluster caching:</strong> Cache stampede mitigation was omitted by 56% of candidates.</span>
              </li>
              <li className="flex items-start gap-1.5">
                <span className="text-[#7138E8] font-bold">•</span>
                <span><strong>Network partition resiliency:</strong> CAP theorem partitioning logic failed unit mocks.</span>
              </li>
            </ul>
            <div className="pt-2 text-right">
              <button
                onClick={() => alert('Remediation lab pushed to 184 students with personalized micro-learning paths.')}
                className="text-xs font-bold text-[#7138E8] hover:underline cursor-pointer"
              >
                Push Remediation Lab →
              </button>
            </div>
          </div>

          {/* Score Distribution Curve */}
          <div className="neu-inset p-4 rounded-2xl space-y-2 text-xs flex flex-col justify-between">
            <div>
              <div className="flex justify-between items-center mb-2">
                <span className="font-bold text-[#21163B]">Score Distribution Curve</span>
                <span className="text-[10px] font-mono text-[#5F5675]">N = 418</span>
              </div>
              <div className="h-28 flex items-end justify-between gap-1 pt-4 px-2">
                {[
                  { range: '0-40', height: '15%', count: 18 },
                  { range: '41-60', height: '35%', count: 68 },
                  { range: '61-75', height: '70%', count: 140 },
                  { range: '76-90', height: '95%', count: 154, highlight: true },
                  { range: '91-100', height: '30%', count: 38 },
                ].map((bar, i) => (
                  <div key={i} className="flex-1 flex flex-col items-center gap-1 h-full justify-end">
                    <span className="text-[9px] font-bold text-[#5F5675]">{bar.count}</span>
                    <div
                      className={`w-full rounded-t-md transition-all ${
                        bar.highlight ? 'bg-gradient-to-t from-[#7138E8] to-[#E75ACF]' : 'bg-purple-300'
                      }`}
                      style={{ height: bar.height }}
                    ></div>
                    <span className="text-[8px] text-[#5F5675] font-mono">{bar.range}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="flex justify-between text-[10px] text-[#5F5675] pt-2 border-t border-purple-200">
              <span>Median: <strong>81.2 pts</strong></span>
              <span>Std Dev: <strong>± 7.4</strong></span>
            </div>
          </div>

          {/* Directorate Readiness Hub */}
          <div className="neu-inset p-4 rounded-2xl space-y-2 text-xs flex flex-col items-center justify-between text-center">
            <div>
              <span className="font-bold text-[#21163B] block">Directorate Readiness Hub</span>
              <p className="text-[10px] text-[#5F5675]">State technical benchmarks clearance</p>
            </div>

            <div className="relative w-28 h-28 flex items-center justify-center my-1">
              <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
                <circle cx="50" cy="50" r="40" stroke="#DDD2FA" strokeWidth="8" fill="transparent" />
                <circle
                  cx="50"
                  cy="50"
                  r="40"
                  stroke="#7138E8"
                  strokeWidth="8"
                  strokeDasharray="251.2"
                  strokeDashoffset="52.7"
                  strokeLinecap="round"
                  fill="transparent"
                />
              </svg>
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <span className="text-xl font-extrabold text-[#7138E8]">79%</span>
                <span className="text-[8px] text-[#5F5675] uppercase font-bold">Placement Ready</span>
              </div>
            </div>

            <div>
              <span className="text-[11px] font-bold text-[#21163B] block">332 / 418 Students</span>
              <span className="text-[10px] text-[#5F5675]">crossed sovereign benchmark</span>
            </div>

            <button
              onClick={() => alert('Opening Detailed Cohort Matrix: View student by student readiness indicators.')}
              className="text-[10px] font-bold text-[#7138E8] hover:underline cursor-pointer"
            >
              View Detailed Cohort Matrix →
            </button>
          </div>
        </div>
      </div>

      {/* CREATE NEW PROCTORED ASSESSMENT FORM SECTION */}
      <div id="create-assessment-section" className="neu-extruded p-6 sm:p-8 rounded-3xl space-y-5">
        <div className="flex flex-wrap items-center justify-between gap-3 pb-3 border-b border-purple-200/60">
          <div className="flex items-center gap-2">
            <div className="w-9 h-9 rounded-xl bg-purple-600 text-white flex items-center justify-center shadow-md">
              <Target className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-bold text-lg text-[#21163B] font-display">Create New Proctored Assessment</h3>
              <p className="text-xs text-[#5F5675]">Design, configure anti-cheat policies, and assign candidate cohorts.</p>
            </div>
          </div>
          <span className="text-[10px] font-mono font-bold text-[#7138E8] bg-purple-100 px-2.5 py-1 rounded-md">
            Directorate Sandbox v4.2
          </span>
        </div>

        <form onSubmit={handlePublishAssessment} className="space-y-4 text-xs">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block font-semibold mb-1 text-[#21163B]">Assessment Title *</label>
              <input
                type="text"
                required
                value={newTitle}
                onChange={(e) => setNewTitle(e.target.value)}
                className="neu-input w-full px-3 py-2 rounded-xl"
              />
            </div>

            <div>
              <label className="block font-semibold mb-1 text-[#21163B]">Category *</label>
              <select
                value={newCategory}
                onChange={(e) => setNewCategory(e.target.value)}
                className="neu-input w-full px-3 py-2 rounded-xl"
              >
                <option value="Cloud & Distributed Systems">Cloud & Distributed Systems</option>
                <option value="Algorithms & DSA">Algorithms & Data Structures</option>
                <option value="Core Backend Engineering">Core Backend Engineering</option>
                <option value="Artificial Intelligence & ML">Artificial Intelligence & ML</option>
                <option value="Behavioral & Acoustic Fluency">Behavioral & Acoustic Fluency</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            <div>
              <label className="block font-semibold mb-1 text-[#21163B]">Difficulty Level</label>
              <select
                value={newDifficulty}
                onChange={(e) => setNewDifficulty(e.target.value)}
                className="neu-input w-full px-3 py-2 rounded-xl"
              >
                <option value="Beginner">Beginner (Level 1)</option>
                <option value="Intermediate">Intermediate (Level 2)</option>
                <option value="Advanced (Level 3)">Advanced (Level 3)</option>
                <option value="Adaptive">Adaptive (Dynamic)</option>
              </select>
            </div>

            <div>
              <label className="block font-semibold mb-1 text-[#21163B]">Total Questions</label>
              <input
                type="number"
                value={newQuestions}
                onChange={(e) => setNewQuestions(Number(e.target.value))}
                className="neu-input w-full px-3 py-2 rounded-xl"
              />
            </div>

            <div>
              <label className="block font-semibold mb-1 text-[#21163B]">Duration (Minutes)</label>
              <input
                type="number"
                value={newDuration}
                onChange={(e) => setNewDuration(Number(e.target.value))}
                className="neu-input w-full px-3 py-2 rounded-xl"
              />
            </div>

            <div>
              <label className="block font-semibold mb-1 text-[#21163B]">Max Marks / Passing</label>
              <div className="flex items-center gap-1">
                <input
                  type="number"
                  value={newMaxMarks}
                  onChange={(e) => setNewMaxMarks(Number(e.target.value))}
                  className="neu-input w-full px-2 py-2 rounded-xl text-center"
                />
                <span className="text-[#5F5675]">/</span>
                <input
                  type="number"
                  value={newPassingMarks}
                  onChange={(e) => setNewPassingMarks(Number(e.target.value))}
                  className="neu-input w-full px-2 py-2 rounded-xl text-center"
                />
              </div>
            </div>
          </div>

          {/* Schedule Window & Cohorts */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block font-semibold mb-1 text-[#21163B]">Start & End Schedule Window</label>
              <div className="grid grid-cols-2 gap-2">
                <input
                  type="datetime-local"
                  defaultValue="2024-10-28T10:00"
                  className="neu-input w-full px-2.5 py-1.5 rounded-xl text-xs"
                />
                <input
                  type="datetime-local"
                  defaultValue="2024-10-28T18:00"
                  className="neu-input w-full px-2.5 py-1.5 rounded-xl text-xs"
                />
              </div>
            </div>

            <div>
              <label className="block font-semibold mb-1 text-[#21163B]">Eligible Branches / Cohorts</label>
              <div className="flex flex-wrap gap-1.5 p-1 neu-inset rounded-xl">
                {['CSE', 'IT', 'ECE', 'ME', 'CE'].map((branch) => {
                  const isChecked = selectedBranches.includes(branch);
                  return (
                    <button
                      type="button"
                      key={branch}
                      onClick={() => {
                        setSelectedBranches((prev) =>
                          isChecked ? prev.filter((b) => b !== branch) : [...prev, branch]
                        );
                      }}
                      className={`px-3 py-1 rounded-lg text-xs font-bold cursor-pointer transition-all ${
                        isChecked ? 'bg-[#7138E8] text-white shadow-xs' : 'bg-white text-[#5F5675]'
                      }`}
                    >
                      {branch} {isChecked ? '✓' : '+'}
                    </button>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Toggles */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-4 neu-inset rounded-2xl">
            <div className="flex items-center justify-between">
              <div>
                <span className="font-bold text-[#21163B] block">Negative Marking</span>
                <span className="text-[10px] text-[#5F5675]">Deduct -0.25 pts per incorrect sandbox run or MCQ</span>
              </div>
              <input
                type="checkbox"
                checked={negativeMarking}
                onChange={(e) => setNegativeMarking(e.target.checked)}
                className="w-4 h-4 accent-[#7138E8] cursor-pointer"
              />
            </div>

            <div className="flex items-center justify-between">
              <div>
                <span className="font-bold text-[#21163B] block">AI Proctoring Engine</span>
                <span className="text-[10px] text-[#5F5675]">Gaze Lock (95%+), WebRTC Streams, Keystroke Dynamics</span>
              </div>
              <input
                type="checkbox"
                checked={aiProctoring}
                onChange={(e) => setAiProctoring(e.target.checked)}
                className="w-4 h-4 accent-[#7138E8] cursor-pointer"
              />
            </div>
          </div>

          {/* Action buttons */}
          <div className="flex flex-wrap items-center justify-between gap-3 pt-3 border-t border-purple-200/60">
            <button
              type="button"
              onClick={() => alert('Draft assessment saved to Institutional Staging Vault.')}
              className="btn-tactile px-5 py-2.5 rounded-xl text-xs font-bold cursor-pointer"
            >
              Save Draft
            </button>

            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => alert('Opening Question Management Pool: Link specific DSA & System Design problem sets.')}
                className="btn-tactile px-4 py-2.5 rounded-xl text-xs font-bold text-[#7138E8] cursor-pointer"
              >
                Question Management Pool
              </button>
              <button
                type="submit"
                className="btn-kinetic px-6 py-2.5 rounded-xl text-xs font-bold cursor-pointer shadow-md"
              >
                Publish & Schedule Assessment
              </button>
            </div>
          </div>
        </form>
      </div>

      {/* INTERCEPT MODAL */}
      {showInterceptModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-xs">
          <div className="w-full max-w-md neu-floating rounded-3xl p-6 space-y-4 bg-[#F3F0FF]">
            <div className="flex justify-between items-center pb-3 border-b border-purple-200">
              <h3 className="font-bold text-sm text-rose-700">Live Proctor Intervention</h3>
              <button onClick={() => setShowInterceptModal(null)} className="cursor-pointer text-[#5F5675]">✕</button>
            </div>
            <p className="text-xs text-[#5F5675]">
              Initiating immediate two-way video proctor audio channel with candidate <strong>{showInterceptModal}</strong>.
            </p>
            <div className="neu-inset p-3 rounded-xl text-xs space-y-1">
              <div>Incident: <strong>Dual Face Detected in Viewport</strong></div>
              <div>Duration: <strong>14.2s consecutive</strong></div>
              <div>Action: Issue formal warning or void active test attempt.</div>
            </div>
            <div className="flex justify-end gap-2">
              <button
                onClick={() => setShowInterceptModal(null)}
                className="btn-tactile px-3 py-1.5 text-xs rounded-xl cursor-pointer"
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  alert(`Issued verbal compliance warning to ${showInterceptModal}. Timer paused for 60s.`);
                  setShowInterceptModal(null);
                }}
                className="px-4 py-1.5 rounded-xl text-xs font-bold bg-rose-600 text-white cursor-pointer"
              >
                Send Warning
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
