import React, { useState, useEffect } from 'react';
import { useApp } from '../../context/AppContext';
import confetti from 'canvas-confetti';
import {
  Mic,
  MicOff,
  Video,
  VideoOff,
  Sparkles,
  Award,
  CheckCircle,
  Clock,
  Shield,
  Eye,
  Volume2,
  ChevronRight,
  Send,
  MessageSquare,
  AlertCircle,
  Check,
  RefreshCw,
  Terminal,
  Activity,
  Layers,
  ArrowRight,
  HelpCircle,
} from 'lucide-react';

interface MockInterviewStudioProps {
  onBack?: () => void;
}

export const MockInterviewStudio: React.FC<MockInterviewStudioProps> = ({ onBack }) => {
  const { currentUser } = useApp();

  const [activeStep, setActiveStep] = useState(2); // 0: Sys Check, 1: Diagnostic, 2: System Design, 3: Behavioral, 4: Rubric
  const [isMicOn, setIsMicOn] = useState(true);
  const [isVideoOn, setIsVideoOn] = useState(true);
  const [isAiSpeaking, setIsAiSpeaking] = useState(true);
  const [timeLeft, setTimeLeft] = useState(1458); // 24:18
  const [wpm, setWpm] = useState(138);
  const [fillerCount, setFillerCount] = useState(2);
  const [userSpeechInput, setUserSpeechInput] = useState(
    "To handle 50,000 TPS idempotently, I would deploy a horizontally scaled Kafka cluster with partitioned consumer groups. Each payment payload generates a deterministic UUIDv4 idempotency key validated against a distributed Redis Redlock cache with a 24-hour TTL before database commit. For partition rebalancing and avoiding split-brain, we enforce Raft consensus with etcd lease renewals..."
  );
  const [detectedKeywords, setDetectedKeywords] = useState([
    { word: 'Kafka Partitions', pts: '+18 pts' },
    { word: 'Redis Redlock', pts: '+22 pts' },
    { word: 'Raft consensus', pts: '+20 pts' },
    { word: 'Idempotency Key', pts: '+15 pts' },
  ]);
  const [coPilotTip, setCoPilotTip] = useState(
    "Elena is probing your consensus understanding. Good job mentioning Raft and Redis Redlock! Next, emphasize DLQ (Dead Letter Queue) processing for failed ledger writes."
  );
  const [isInterviewFinished, setIsInterviewFinished] = useState(false);

  // Stepper titles
  const steps = [
    'System Verification',
    'Core Diagnostic',
    'System Design & Architecture',
    'Behavioral Alignment',
    'Rubric Synthesis',
  ];

  // Timer countdown
  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  // Format timer
  const formatTimer = (secs: number) => {
    const m = Math.floor(secs / 60);
    const s = secs % 60;
    return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

  const handleNextQuestion = () => {
    if (activeStep < 4) {
      setActiveStep((prev) => prev + 1);
      setIsAiSpeaking(true);
      setTimeout(() => setIsAiSpeaking(false), 3000);
    } else {
      handleCompleteInterview();
    }
  };

  const handleCompleteInterview = () => {
    confetti({
      particleCount: 90,
      spread: 70,
      origin: { y: 0.6 },
    });
    setIsInterviewFinished(true);
  };

  return (
    <div className="w-full space-y-4 animate-in fade-in duration-300">
      {/* 1. SECURE SIMULATION HEADER BAR */}
      <div className="bg-[#FAF7FF] border border-purple-200/80 rounded-2xl p-3 sm:p-4 neu-extruded shadow-sm">
        <div className="flex flex-wrap items-center justify-between gap-3">
          {/* Node Identity */}
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-[#7138E8] to-[#E75ACF] flex items-center justify-center text-white font-black text-sm shadow-sm">
              AI
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="font-extrabold text-sm font-display text-[#21163B] tracking-tight">
                  SkillBridge <span className="text-[#7138E8]">AI Interview Studio</span>
                </span>
                <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-purple-100 text-[#7138E8] border border-purple-200">
                  PROCTOR v4.2
                </span>
              </div>
              <div className="text-[10px] text-[#5F5675]">
                Node SIM-AI-409 • Distributed Systems & Cloud Architecture Simulation
              </div>
            </div>
          </div>

          {/* Stepper Progress Indicator */}
          <div className="hidden xl:flex items-center space-x-1.5 text-[11px]">
            {steps.map((st, idx) => (
              <div
                key={st}
                className={`flex items-center gap-1.5 px-2.5 py-1 rounded-xl transition-all ${
                  idx === activeStep
                    ? 'btn-kinetic text-white font-bold shadow-xs'
                    : idx < activeStep
                    ? 'bg-purple-100 text-[#7138E8] font-semibold'
                    : 'text-[#5F5675] opacity-60'
                }`}
              >
                <span>{idx + 1}.</span>
                <span>{st}</span>
                {idx < activeStep && <Check className="w-3 h-3 text-[#7138E8]" />}
              </div>
            ))}
          </div>

          {/* Controls & Timer */}
          <div className="flex items-center gap-2">
            <div className="flex items-center gap-2 px-3 py-1.5 rounded-xl neu-inset border border-purple-200/60 font-mono text-xs font-bold text-[#21163B]">
              <Clock className="w-3.5 h-3.5 text-[#7138E8]" />
              <span>{formatTimer(timeLeft)}</span>
              <span className="text-[9px] text-[#5F5675]">/ 45M</span>
            </div>

            <button
              onClick={() => setIsMicOn(!isMicOn)}
              className={`p-2 rounded-xl transition-all cursor-pointer ${
                isMicOn ? 'neu-flat text-[#7138E8]' : 'bg-rose-100 text-rose-600'
              }`}
              title={isMicOn ? 'Mute Microphone' : 'Unmute Microphone'}
            >
              {isMicOn ? <Mic className="w-4 h-4" /> : <MicOff className="w-4 h-4" />}
            </button>

            <button
              onClick={() => setIsVideoOn(!isVideoOn)}
              className={`p-2 rounded-xl transition-all cursor-pointer ${
                isVideoOn ? 'neu-flat text-[#7138E8]' : 'bg-rose-100 text-rose-600'
              }`}
              title={isVideoOn ? 'Disable Camera' : 'Enable Camera'}
            >
              {isVideoOn ? <Video className="w-4 h-4" /> : <VideoOff className="w-4 h-4" />}
            </button>

            <button
              onClick={handleNextQuestion}
              className="px-3.5 py-1.5 rounded-xl btn-kinetic text-xs font-bold text-white flex items-center gap-1.5 cursor-pointer shadow-xs"
            >
              <span>Next Question</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>

      {/* 2. MAIN INTERVIEW STAGE & TELEMETRY */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
        {/* LEFT / CENTER: AI HOLOGRAPHIC EVALUATOR & TRANSCRIPT (8 cols) */}
        <div className="lg:col-span-8 space-y-4">
          {/* AI Evaluator Avatar Stage */}
          <div className="neu-extruded rounded-2xl p-5 bg-white/70 space-y-4 border border-purple-100 relative overflow-hidden">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-[#7138E8] to-[#963DF5] flex items-center justify-center text-white shadow-md relative">
                  <Sparkles className="w-6 h-6 animate-pulse" />
                  <span className="absolute -top-1 -right-1 w-3 h-3 rounded-full bg-emerald-500 border-2 border-white"></span>
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="font-bold text-sm font-display text-[#21163B]">
                      Dr. Elena Rostova
                    </h3>
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-purple-100 text-[#7138E8]">
                      AI Technical Evaluator
                    </span>
                  </div>
                  <p className="text-[11px] text-[#5F5675]">
                    Autonomous Technical Evaluator & Distributed Systems Specialist
                  </p>
                </div>
              </div>

              {/* Audio Waveform Visualizer */}
              <div className="flex items-center gap-1 p-2 rounded-xl neu-inset h-8">
                {[12, 24, 16, 28, 14, 22, 30, 18, 26, 12].map((height, i) => (
                  <span
                    key={i}
                    className={`w-1 rounded-full transition-all duration-200 ${
                      isAiSpeaking ? 'bg-[#7138E8] animate-pulse' : 'bg-purple-300'
                    }`}
                    style={{
                      height: isAiSpeaking ? `${(height / 30) * 100}%` : '20%',
                      animationDelay: `${i * 100}ms`,
                    }}
                  ></span>
                ))}
                <span className="text-[9px] font-mono text-[#7138E8] ml-2">
                  {isAiSpeaking ? 'SPEAKING' : 'LISTENING'}
                </span>
              </div>
            </div>

            {/* Current Evaluator Question Prompter */}
            <div className="p-4 rounded-xl neu-inset space-y-2 border border-purple-200/50">
              <div className="flex items-center justify-between text-[11px]">
                <span className="font-bold text-[#7138E8] uppercase tracking-wider">
                  Question 3 of 5 • System Design & Concurrency
                </span>
                <span className="text-[#5F5675] font-mono">Weight: 30 Pts</span>
              </div>
              <p className="text-sm font-semibold text-[#21163B] leading-relaxed">
                &quot;Walk me through how you would architect an idempotent payment ingestion pipeline handling 50,000 TPS with Kafka and Redis. How do you mitigate split-brain scenarios in partition rebalancing?&quot;
              </p>
            </div>

            {/* Candidate Real-time Speech-to-Text Transcription Stream */}
            <div className="space-y-2">
              <div className="flex items-center justify-between text-xs">
                <span className="font-bold text-[#21163B] flex items-center gap-1.5">
                  <Terminal className="w-3.5 h-3.5 text-[#7138E8]" />
                  Candidate Live Speech-to-Text Stream
                </span>
                <span className="text-[10px] text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full font-semibold">
                  Live STT Synchronized (0.12s latency)
                </span>
              </div>

              <div className="p-4 rounded-xl neu-flat text-xs text-[#21163B] leading-relaxed relative min-h-[100px]">
                <textarea
                  value={userSpeechInput}
                  onChange={(e) => setUserSpeechInput(e.target.value)}
                  className="w-full bg-transparent resize-none focus:outline-none text-xs leading-relaxed text-[#21163B]"
                  rows={4}
                />
              </div>

              {/* Detected Technical Keywords Chips with Real-Time Bonus */}
              <div className="flex flex-wrap items-center gap-2 pt-1 text-xs">
                <span className="text-[11px] font-bold text-[#5F5675]">Keywords Scored:</span>
                {detectedKeywords.map((kw, i) => (
                  <span
                    key={i}
                    className="neu-inset px-2.5 py-1 rounded-xl text-[#21163B] text-[11px] flex items-center gap-1.5"
                  >
                    <CheckCircle className="w-3 h-3 text-purple-600" />
                    <strong>{kw.word}</strong>
                    <span className="text-emerald-700 font-bold font-mono text-[10px]">{kw.pts}</span>
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* RIGHT COLUMN: CANDIDATE PROCTOR WEBCAM & TELEMETRY (4 cols) */}
        <div className="lg:col-span-4 space-y-4">
          {/* Candidate Webcam Feed */}
          <div className="neu-extruded rounded-2xl p-3.5 bg-white/70 space-y-2 border border-purple-100">
            <div className="flex items-center justify-between text-xs">
              <span className="font-bold text-[#21163B] flex items-center gap-1.5">
                <Eye className="w-3.5 h-3.5 text-purple-600" />
                Live Candidate HUD
              </span>
              <span className="text-[10px] font-bold text-emerald-700 bg-emerald-100 px-2 py-0.5 rounded-full">
                99.4% Matched
              </span>
            </div>

            <div className="relative rounded-xl overflow-hidden aspect-video bg-gray-900 border border-purple-200 flex items-center justify-center">
              {isVideoOn ? (
                <img
                  src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=500&auto=format&fit=crop&q=80"
                  alt="Candidate Webcam"
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="text-gray-400 text-xs">Video Feed Paused</div>
              )}

              {/* Holographic facial bounding box */}
              {isVideoOn && (
                <div className="absolute inset-4 border border-emerald-400/80 rounded-lg pointer-events-none">
                  <div className="absolute -top-2 left-2 bg-emerald-600 text-white text-[8px] font-mono font-bold px-1 rounded">
                    GAZE: CENTER
                  </div>
                </div>
              )}

              {/* Bottom mic overlay */}
              <div className="absolute bottom-1 left-2 right-2 flex justify-between text-[8px] font-mono text-white/90 bg-black/60 px-2 py-0.5 rounded backdrop-blur-xs">
                <span>AUDIO: {isMicOn ? 'ACTIVE' : 'MUTED'}</span>
                <span className="text-emerald-300 font-bold">1 PERSON VERIFIED</span>
              </div>
            </div>

            {/* Speech Cadence Metrics */}
            <div className="grid grid-cols-2 gap-2 text-center text-xs pt-1">
              <div className="neu-inset p-2 rounded-xl">
                <span className="text-[9px] uppercase font-bold text-[#5F5675] block">SPEAKING SPEED</span>
                <span className="text-base font-black font-display text-[#7138E8]">{wpm} WPM</span>
                <span className="text-[9px] text-emerald-700 block">Optimal Range</span>
              </div>
              <div className="neu-inset p-2 rounded-xl">
                <span className="text-[9px] uppercase font-bold text-[#5F5675] block">FILLER WORDS</span>
                <span className="text-base font-black font-display text-[#21163B]">{fillerCount}</span>
                <span className="text-[9px] text-[#5F5675] block">Low Hesitation</span>
              </div>
            </div>
          </div>

          {/* Real-Time Rubric Scoring */}
          <div className="neu-extruded rounded-2xl p-4 bg-white/70 space-y-3 border border-purple-100">
            <div className="flex items-center justify-between text-xs">
              <span className="font-bold text-[#21163B]">REAL-TIME RUBRIC AGGREGATE</span>
              <Award className="w-4 h-4 text-[#7138E8]" />
            </div>

            <div className="flex items-center gap-3">
              <div className="w-14 h-14 rounded-full flex items-center justify-center font-black text-lg font-display text-[#7138E8] neu-inset shrink-0">
                91.2
              </div>
              <div>
                <span className="font-bold text-xs text-[#21163B] block">Benchmark: Tier-1 SDE</span>
                <p className="text-[10px] text-[#5F5675]">
                  Qualifies for accelerated direct technical loop at partner firms.
                </p>
              </div>
            </div>

            <div className="space-y-1.5 text-[11px] pt-1">
              <div className="flex justify-between text-[#5F5675]">
                <span>System Architecture Rigor</span>
                <span className="font-bold text-[#21163B]">94%</span>
              </div>
              <div className="w-full bg-purple-100 h-1.5 rounded-full overflow-hidden">
                <div className="bg-[#7138E8] h-full rounded-full" style={{ width: '94%' }}></div>
              </div>

              <div className="flex justify-between text-[#5F5675]">
                <span>Algorithmic Depth</span>
                <span className="font-bold text-[#21163B]">92%</span>
              </div>
              <div className="w-full bg-purple-100 h-1.5 rounded-full overflow-hidden">
                <div className="bg-[#7138E8] h-full rounded-full" style={{ width: '92%' }}></div>
              </div>

              <div className="flex justify-between text-[#5F5675]">
                <span>Articulation & Cadence</span>
                <span className="font-bold text-[#21163B]">89%</span>
              </div>
              <div className="w-full bg-purple-100 h-1.5 rounded-full overflow-hidden">
                <div className="bg-[#7138E8] h-full rounded-full" style={{ width: '89%' }}></div>
              </div>
            </div>
          </div>

          {/* BRIDGIE Co-Pilot Live Whisper */}
          <div className="neu-extruded rounded-2xl p-4 bg-white/70 space-y-2.5 border border-purple-100">
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 rounded-lg bg-gradient-to-tr from-[#7138E8] to-[#E75ACF] flex items-center justify-center text-white text-xs font-bold">
                <Sparkles className="w-3.5 h-3.5" />
              </div>
              <span className="font-bold text-xs font-display text-[#21163B]">BRIDGIE Whisper</span>
            </div>

            <div className="p-3 rounded-xl neu-inset text-[11px] text-[#21163B] leading-relaxed">
              {coPilotTip}
            </div>

            <button
              onClick={() => {
                setCoPilotTip("Tip: When discussing Kafka partition rebalancing, mention Cooperative Sticky Assignor to avoid stop-the-world pauses!");
              }}
              className="w-full py-1.5 px-3 rounded-xl neu-flat hover:neu-inset text-xs font-semibold text-[#7138E8] flex items-center justify-center gap-1.5 cursor-pointer"
            >
              <HelpCircle className="w-3.5 h-3.5" />
              <span>Request Next Whisper Hint</span>
            </button>
          </div>
        </div>
      </div>

      {/* 3. FOOTER REGULATORY STRIP */}
      <div className="p-3 rounded-xl bg-purple-100/50 border border-purple-200/50 flex flex-wrap items-center justify-between text-[11px] text-[#5F5675] gap-2">
        <div className="flex items-center gap-2">
          <Shield className="w-3.5 h-3.5 text-[#7138E8]" />
          <span>AICTE & NAAC Standardized Rubric Engine</span>
          <span>•</span>
          <span>Audio Stream Encrypted AES-256</span>
          <span>•</span>
          <span>Candidate Nonce #SIM-409-LIVE</span>
        </div>
        <div>
          Autonomous Proctor Authority: State Technical Directorate MP
        </div>
      </div>

      {/* MODAL: INTERVIEW COMPLETE */}
      {isInterviewFinished && (
        <div className="fixed inset-0 z-50 bg-black/40 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-[#F3F0FF] rounded-3xl p-6 sm:p-8 max-w-md w-full neu-floating space-y-4 text-center border border-white">
            <div className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-[#7138E8] to-[#E75ACF] mx-auto flex items-center justify-center text-white shadow-md">
              <Award className="w-8 h-8" />
            </div>

            <h3 className="text-xl font-bold font-display text-[#21163B]">
              Mock Interview Completed!
            </h3>

            <p className="text-xs text-[#5F5675] leading-relaxed">
              Dr. Elena Rostova has compiled your technical evaluation. Overall Score: <strong className="text-[#7138E8]">91.2/100</strong>.
            </p>

            <div className="p-3.5 rounded-2xl neu-inset text-left space-y-1.5 text-xs">
              <div className="flex justify-between">
                <span className="text-[#5F5675]">System Design Rigor:</span>
                <span className="font-bold text-[#21163B]">94% (Exceptional)</span>
              </div>
              <div className="flex justify-between">
                <span className="text-[#5F5675]">Speech Cadence:</span>
                <span className="font-bold text-[#21163B]">138 WPM (Optimal)</span>
              </div>
              <div className="flex justify-between">
                <span className="text-[#5F5675]">Digital Passport Stamp:</span>
                <span className="font-mono text-purple-700 font-bold">#MP-INTERVIEW-PASSED</span>
              </div>
            </div>

            <button
              onClick={() => {
                setIsInterviewFinished(false);
                onBack?.();
              }}
              className="w-full py-2.5 rounded-xl btn-kinetic font-bold text-xs cursor-pointer text-white"
            >
              Back to Dashboard
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
