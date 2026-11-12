import React, { useState, useEffect } from 'react';
import { useApp } from '../../context/AppContext';
import confetti from 'canvas-confetti';
import {
  Shield,
  Clock,
  CheckCircle,
  Play,
  RotateCcw,
  Sparkles,
  Award,
  Terminal,
  Cpu,
  Eye,
  Sliders,
  ChevronRight,
  HelpCircle,
  ExternalLink,
  Lock,
  Maximize2,
  FileCode,
  AlertTriangle,
  Flame,
  Check,
  X,
} from 'lucide-react';

interface DiagnosticAssessmentStudioProps {
  onBack?: () => void;
}

export const DiagnosticAssessmentStudio: React.FC<DiagnosticAssessmentStudioProps> = ({ onBack }) => {
  const { currentUser, updateStudentProfile } = useApp();

  // Active File Tab
  const [activeTab, setActiveTab] = useState<'ingress_controller.go' | 'Dockerfile' | 'service_spec.yaml'>('ingress_controller.go');
  const [selectedLang, setSelectedLang] = useState('Go 1.22 (Alpine)');
  
  // Timer State (counts down from 40:04)
  const [timeLeft, setTimeLeft] = useState(2404); // in seconds
  const [isTimerRunning, setIsTimerRunning] = useState(true);

  // Editor code content
  const initialCode = `package ingress

import (
    "crypto/tls"
    "net/http"
    "sync/atomic"
    "golang.org/x/time/rate"
)

// IngressProxy routes mTLS payloads & strips cluster secrets
type IngressController struct {
    limiter   *rate.Limiter
    tlsConfig *tls.Config
    activeOps uint64
}

func NewController(r rate.Limit, b int) *IngressController {
    return &IngressController{
        limiter: rate.NewLimiter(r, b),
    }
}

func (c *IngressController) ServeHTTP(w http.ResponseWriter, req *http.Request) {
    if !c.limiter.Allow() {
        http.Error(w, "429 Rate Quota Exceeded (1000 RPS Cap)", http.StatusTooManyRequests)
        return
    }

    atomic.AddUint64(&c.activeOps, 1)
    req.Header.Del("X-Cluster-Identity") // Security Ingress Strip
    
    // Validate mTLS Client certificate chain
    if req.TLS == nil || len(req.TLS.PeerCertificates) == 0 {
        // Enforce fallback validation
    }

    w.WriteHeader(http.StatusOK)
    w.Write([]byte("Ingress Handshake Verified OK"))
}`;

  const dockerfileCode = `# Multi-stage hardened alpine image for MP-01 Cluster
FROM golang:1.22-alpine AS builder
WORKDIR /app
COPY go.mod go.sum ./
RUN go mod download
COPY . .
RUN CGO_ENABLED=0 GOOS=linux go build -ldflags="-s -w" -o ingress-proxy .

FROM alpine:3.19
RUN apk --no-cache add ca-certificates tzdata
USER 10001:10001
COPY --from=builder /app/ingress-proxy /usr/local/bin/ingress-proxy
EXPOSE 8443
ENTRYPOINT ["/usr/local/bin/ingress-proxy"]`;

  const yamlCode = `apiVersion: networking.k8s.io/v1
kind: Ingress
metadata:
  name: secured-edge-ingress
  namespace: mp-rgpv-cloud
  annotations:
    cert-manager.io/cluster-issuer: "letsencrypt-prod"
    nginx.ingress.kubernetes.io/ssl-redirect: "true"
    nginx.ingress.kubernetes.io/limit-rps: "1000"
spec:
  tls:
  - hosts:
    - edge.mp.skillbridge.ac.in
    secretName: edge-tls-certs
  rules:
  - host: edge.mp.skillbridge.ac.in
    http:
      paths:
      - path: /
        pathType: Prefix
        backend:
          service:
            name: telemetry-broker-svc
            port:
              number: 8443`;

  const [code, setCode] = useState(initialCode);
  const [consoleTab, setConsoleTab] = useState<'tests' | 'stdout' | 'memory'>('tests');
  const [isRunningTests, setIsRunningTests] = useState(false);
  const [testRunCount, setTestRunCount] = useState(1);
  const [showProctorLog, setShowProctorLog] = useState(false);
  const [showSubmissionSuccess, setShowSubmissionSuccess] = useState(false);
  const [hintsUsed, setHintsUsed] = useState(1);
  const [hintMessage, setHintMessage] = useState<string | null>(null);

  useEffect(() => {
    if (!isTimerRunning) return;
    const interval = setInterval(() => {
      setTimeLeft((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);
    return () => clearInterval(interval);
  }, [isTimerRunning]);

  const formatTimer = (secs: number) => {
    const mins = Math.floor(secs / 60);
    const remainderSecs = secs % 60;
    return `${mins.toString().padStart(2, '0')}:${remainderSecs.toString().padStart(2, '0')}`;
  };

  const handleRunTests = () => {
    setIsRunningTests(true);
    setTimeout(() => {
      setIsRunningTests(false);
      setTestRunCount((prev) => prev + 1);
    }, 1200);
  };

  const handleSubmit = () => {
    confetti({
      particleCount: 80,
      spread: 70,
      origin: { y: 0.6 },
    });
    setShowSubmissionSuccess(true);
  };

  const handleRequestHint = () => {
    if (hintsUsed < 2) {
      setHintsUsed((prev) => prev + 1);
      setHintMessage('Hint: Check req.TLS.PeerCertificates[0].Subject to verify the MP Higher Ed root CA!');
    }
  };

  return (
    <div className="w-full space-y-4 animate-in fade-in duration-300">
      {/* 1. SECURE PROCTOR HEADER BAR */}
      <div className="bg-[#FAF7FF] border border-purple-200/80 rounded-2xl p-3 sm:p-4 neu-extruded shadow-sm">
        <div className="flex flex-wrap items-center justify-between gap-3">
          {/* Identity & Proctored Node */}
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-[#7138E8] to-[#963DF5] flex items-center justify-center text-white font-black text-sm shadow-sm">
                SB
              </div>
              <div>
                <div className="flex items-center gap-1.5">
                  <span className="font-extrabold text-sm font-display text-[#21163B] tracking-tight">
                    SkillBridge <span className="text-[#7138E8]">AI</span>
                  </span>
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-purple-100 text-[#7138E8] border border-purple-200">
                    PROCTOR v4.2
                  </span>
                </div>
                <div className="text-[10px] text-[#5F5675] flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
                  Secure Assessment Node MP-01 • UIT-RGPV Bhopal
                </div>
              </div>
            </div>

            <div className="hidden md:block h-7 w-px bg-purple-200 mx-1"></div>

            {/* Candidate Metadata Tag */}
            <div className="hidden lg:flex items-center gap-2 px-3 py-1.5 rounded-xl neu-inset text-xs">
              <span className="font-bold text-[#21163B]">
                {currentUser?.name || 'Ayush Sharma'}
              </span>
              <span className="text-[#5F5675] font-mono text-[11px]">0101CS211048</span>
              <span className="text-[10px] font-semibold text-[#7138E8] bg-white px-2 py-0.5 rounded-md border border-purple-200">
                B.Tech CSE (Cloud Specialization)
              </span>
            </div>
          </div>

          {/* Real-Time Proctoring Telemetry Badges & Timer */}
          <div className="flex items-center gap-2.5">
            {/* Countdown Timer */}
            <div className="flex items-center gap-2 px-3.5 py-1.5 rounded-xl neu-inset border border-purple-200/60">
              <Clock className="w-4 h-4 text-[#7138E8] animate-spin" style={{ animationDuration: '8s' }} />
              <div>
                <span className="font-mono font-bold text-sm text-[#21163B] tracking-wider">
                  {formatTimer(timeLeft)}
                </span>
                <span className="text-[9px] font-bold text-[#5F5675] ml-1 uppercase">60M TOTAL</span>
              </div>
            </div>

            {/* Telemetry Status */}
            <div className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-[11px] font-semibold">
              <CheckCircle className="w-3.5 h-3.5 text-emerald-600" />
              <span>Biometric & Telemetry OK</span>
              <span className="text-[10px] font-mono text-emerald-600 ml-1">Gaze: 0.0°</span>
            </div>

            {/* Proctor Log Button */}
            <button
              onClick={() => setShowProctorLog(true)}
              className="px-3 py-1.5 rounded-xl neu-flat hover:neu-inset text-xs font-semibold text-[#21163B] flex items-center gap-1.5 cursor-pointer"
            >
              <Eye className="w-3.5 h-3.5 text-[#7138E8]" />
              <span className="hidden sm:inline">Proctor Log</span>
            </button>

            {/* Run Tests Button */}
            <button
              onClick={handleRunTests}
              disabled={isRunningTests}
              className="px-3.5 py-1.5 rounded-xl btn-tactile text-xs font-bold flex items-center gap-1.5 cursor-pointer disabled:opacity-50"
            >
              <Play className={`w-3.5 h-3.5 fill-current text-[#7138E8] ${isRunningTests ? 'animate-spin' : ''}`} />
              <span>{isRunningTests ? 'Executing...' : 'Run Tests'}</span>
            </button>

            {/* Submit & Stamp Button */}
            <button
              onClick={handleSubmit}
              className="px-4 py-1.5 rounded-xl btn-kinetic text-xs font-bold flex items-center gap-1.5 cursor-pointer text-white shadow-sm"
            >
              <Lock className="w-3.5 h-3.5" />
              <span>Submit & Stamp</span>
            </button>
          </div>
        </div>

        {/* Subheader info strip */}
        <div className="mt-2.5 pt-2 border-t border-purple-100 flex flex-wrap items-center justify-between text-[11px] text-[#5F5675] gap-2">
          <div className="flex items-center gap-2">
            <span className="font-semibold text-[#7138E8]">
              Diagnostic #402: Microservices Ingress & Docker Security
            </span>
            <span>•</span>
            <span className="font-mono text-[10px]">Session Nonce: #MP-RGPV-SEC-9921</span>
            <span>•</span>
            <span className="text-emerald-700 font-semibold flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
              Keystroke Dynamics Synchronized
            </span>
          </div>
          <div>
            Target Benchmark: <span className="font-semibold text-[#21163B]">TCS Digital & CloudScale Labs Approved</span>
          </div>
        </div>
      </div>

      {/* 2. MAIN 3-COLUMN WORKBENCH */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
        {/* COLUMN 1: TASK SPECIFICATION & REQUIREMENTS (3 cols) */}
        <div className="lg:col-span-3 space-y-4">
          <div className="neu-extruded rounded-2xl p-4 bg-white/60 space-y-3.5 border border-purple-100">
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-bold uppercase tracking-wider text-[#7138E8] bg-purple-100 px-2 py-0.5 rounded-md">
                TASK 1 OF 2
              </span>
              <div className="flex items-center gap-1.5">
                <span className="text-[10px] font-bold text-rose-600 bg-rose-50 px-2 py-0.5 rounded-md border border-rose-200">
                  Hard
                </span>
                <span className="text-[10px] font-bold text-[#5F5675]">150 Pts</span>
              </div>
            </div>

            <h3 className="font-bold text-sm font-display text-[#21163B] leading-tight">
              Implement High-Availability TLS Ingress Controller with Rate Limiting
            </h3>

            {/* Evaluation Competency Weights */}
            <div className="p-3 rounded-xl neu-inset space-y-2">
              <span className="text-[10px] font-bold text-[#5F5675] uppercase tracking-wider block">
                Evaluation Competency Weights
              </span>
              <div className="space-y-1.5 text-xs">
                <div className="flex justify-between items-center">
                  <span className="text-[#21163B] text-[11px]">Docker & Reverse Proxy</span>
                  <span className="font-bold text-[#7138E8] text-[11px]">40%</span>
                </div>
                <div className="w-full bg-purple-100 h-1.5 rounded-full overflow-hidden">
                  <div className="bg-[#7138E8] h-full rounded-full" style={{ width: '40%' }}></div>
                </div>

                <div className="flex justify-between items-center">
                  <span className="text-[#21163B] text-[11px]">Kubernetes Ingress Spec</span>
                  <span className="font-bold text-[#7138E8] text-[11px]">35%</span>
                </div>
                <div className="w-full bg-purple-100 h-1.5 rounded-full overflow-hidden">
                  <div className="bg-[#7138E8] h-full rounded-full" style={{ width: '35%' }}></div>
                </div>

                <div className="flex justify-between items-center">
                  <span className="text-[#21163B] text-[11px]">TLS Cert-Manager & Security</span>
                  <span className="font-bold text-[#7138E8] text-[11px]">25%</span>
                </div>
                <div className="w-full bg-purple-100 h-1.5 rounded-full overflow-hidden">
                  <div className="bg-[#7138E8] h-full rounded-full" style={{ width: '25%' }}></div>
                </div>
              </div>
            </div>

            {/* Performance Constraints */}
            <div className="grid grid-cols-3 gap-2 text-center">
              <div className="neu-flat p-2 rounded-xl">
                <span className="text-[9px] uppercase font-bold text-[#5F5675] block">MAX MEM</span>
                <span className="text-xs font-black text-[#21163B]">256 MB</span>
              </div>
              <div className="neu-flat p-2 rounded-xl">
                <span className="text-[9px] uppercase font-bold text-[#5F5675] block">LATENCY SLA</span>
                <span className="text-xs font-black text-[#21163B]">&lt; 45ms</span>
              </div>
              <div className="neu-flat p-2 rounded-xl">
                <span className="text-[9px] uppercase font-bold text-[#5F5675] block">VULNERABILITIES</span>
                <span className="text-xs font-black text-emerald-600">0 Allowed</span>
              </div>
            </div>

            {/* Specification Body */}
            <div className="space-y-2 text-xs text-[#5F5675] leading-relaxed">
              <div className="font-bold text-[#21163B] flex items-center gap-1.5 uppercase tracking-wide text-[11px]">
                <FileCode className="w-3.5 h-3.5 text-[#7138E8]" />
                Architectural Specification
              </div>
              <p>
                You are tasked with engineering a production-grade ingress reverse-proxy handler in <strong className="text-[#21163B]">Go 1.22</strong>. The service must mediate incoming public traffic into isolated service mesh workloads while enforcing strict operational guarantees.
              </p>
              <ul className="space-y-1.5 pl-1">
                <li className="flex items-start gap-1.5">
                  <CheckCircle className="w-3.5 h-3.5 text-purple-600 shrink-0 mt-0.5" />
                  <span><strong>Mutual TLS (mTLS):</strong> Terminate client certificates using SNI routing, validating validity period against local trusted CA pool.</span>
                </li>
                <li className="flex items-start gap-1.5">
                  <CheckCircle className="w-3.5 h-3.5 text-purple-600 shrink-0 mt-0.5" />
                  <span><strong>Sliding Window Limiter:</strong> Enforce an atomic rate limiter capped strictly at 1,000 requests/sec per client IP with burst buffers.</span>
                </li>
                <li className="flex items-start gap-1.5">
                  <CheckCircle className="w-3.5 h-3.5 text-purple-600 shrink-0 mt-0.5" />
                  <span><strong>Zero Leakage Header Stripping:</strong> Strip internal headers (<code className="bg-purple-100 px-1 rounded text-[#7138E8]">X-Cluster-Identity</code>, <code className="bg-purple-100 px-1 rounded text-[#7138E8]">X-Forwarded-Secret</code>) before forwarding.</span>
                </li>
              </ul>
            </div>

            {/* Test Vectors Summary */}
            <div className="pt-2 border-t border-purple-100 space-y-1.5">
              <div className="flex items-center justify-between text-[11px]">
                <span className="font-bold text-[#21163B]">TEST VECTORS (4 TOTAL)</span>
                <span className="font-bold text-emerald-600">3 Passed</span>
              </div>
              <div className="space-y-1 text-[11px]">
                <div className="flex items-center justify-between p-1.5 rounded-lg bg-emerald-50/60 border border-emerald-100">
                  <span className="text-emerald-900 flex items-center gap-1.5">
                    <Check className="w-3 h-3 text-emerald-600" />
                    Case 1: Standard Ingress Route
                  </span>
                  <span className="font-mono text-[10px] text-emerald-700">12ms</span>
                </div>
                <div className="flex items-center justify-between p-1.5 rounded-lg bg-emerald-50/60 border border-emerald-100">
                  <span className="text-emerald-900 flex items-center gap-1.5">
                    <Check className="w-3 h-3 text-emerald-600" />
                    Case 2: Sliding Window Limiter (1000 RPS)
                  </span>
                  <span className="font-mono text-[10px] text-emerald-700">9ms</span>
                </div>
                <div className="flex items-center justify-between p-1.5 rounded-lg bg-emerald-50/60 border border-emerald-100">
                  <span className="text-emerald-900 flex items-center gap-1.5">
                    <Check className="w-3 h-3 text-emerald-600" />
                    Case 3: Zero Header Leakage Strip
                  </span>
                  <span className="font-mono text-[10px] text-emerald-700">1ms</span>
                </div>
                <div className="flex items-center justify-between p-1.5 rounded-lg bg-amber-50/60 border border-amber-200">
                  <span className="text-amber-900 flex items-center gap-1.5">
                    <Clock className="w-3 h-3 text-amber-600" />
                    Case 4: Mutual TLS Client Cert Validation
                  </span>
                  <span className="font-mono text-[10px] text-amber-700">Pending</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* COLUMN 2: CODE EDITOR & CONSOLE (6 cols) */}
        <div className="lg:col-span-6 space-y-3 flex flex-col">
          {/* File Tabs & Language Selector */}
          <div className="flex flex-wrap items-center justify-between gap-2 bg-[#20153A] p-2 rounded-t-2xl text-white">
            <div className="flex items-center space-x-1">
              <button
                onClick={() => {
                  setActiveTab('ingress_controller.go');
                  setCode(initialCode);
                }}
                className={`px-3 py-1.5 rounded-lg text-xs font-mono font-medium flex items-center gap-2 transition-colors cursor-pointer ${
                  activeTab === 'ingress_controller.go'
                    ? 'bg-[#352A50] text-[#E5D8FF] border-b-2 border-[#7138E8]'
                    : 'text-gray-400 hover:text-white hover:bg-white/5'
                }`}
              >
                <span className="w-2 h-2 rounded-full bg-cyan-400"></span>
                ingress_controller.go
                <span className="text-[10px] text-gray-400">×</span>
              </button>
              <button
                onClick={() => {
                  setActiveTab('Dockerfile');
                  setCode(dockerfileCode);
                }}
                className={`px-3 py-1.5 rounded-lg text-xs font-mono font-medium flex items-center gap-2 transition-colors cursor-pointer ${
                  activeTab === 'Dockerfile'
                    ? 'bg-[#352A50] text-[#E5D8FF] border-b-2 border-[#7138E8]'
                    : 'text-gray-400 hover:text-white hover:bg-white/5'
                }`}
              >
                <span className="w-2 h-2 rounded-full bg-blue-400"></span>
                Dockerfile
              </button>
              <button
                onClick={() => {
                  setActiveTab('service_spec.yaml');
                  setCode(yamlCode);
                }}
                className={`px-3 py-1.5 rounded-lg text-xs font-mono font-medium flex items-center gap-2 transition-colors cursor-pointer ${
                  activeTab === 'service_spec.yaml'
                    ? 'bg-[#352A50] text-[#E5D8FF] border-b-2 border-[#7138E8]'
                    : 'text-gray-400 hover:text-white hover:bg-white/5'
                }`}
              >
                <span className="w-2 h-2 rounded-full bg-amber-400"></span>
                service_spec.yaml
              </button>
            </div>

            {/* Language Selector Dropdown */}
            <div className="flex items-center gap-2 pr-1">
              <select
                value={selectedLang}
                onChange={(e) => setSelectedLang(e.target.value)}
                className="bg-[#352A50] text-purple-200 text-xs px-2.5 py-1 rounded-lg border border-purple-800/60 focus:outline-none cursor-pointer"
              >
                <option value="Go 1.22 (Alpine)">Go 1.22 (Alpine)</option>
                <option value="Python 3.12 (FastAPI)">Python 3.12 (FastAPI)</option>
                <option value="Rust 1.76 (Tokio)">Rust 1.76 (Tokio)</option>
                <option value="Node.js 20 (Express/TS)">Node.js 20 (TS)</option>
              </select>
              <button
                onClick={() => setCode(initialCode)}
                title="Reset Starter Code"
                className="p-1 rounded hover:bg-white/10 text-gray-400 hover:text-white cursor-pointer"
              >
                <RotateCcw className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          {/* Interactive Code Editor Well with Syntax Highlighting styling */}
          <div className="relative bg-[#1A112C] rounded-b-xl border border-[#352A50] overflow-hidden flex flex-col font-mono text-xs">
            {/* Watermark in background */}
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-5 select-none text-white text-3xl font-black rotate-[-15deg]">
              PROCTORED ASSIGNMENT • #MP-RGPV-SEC-9921
            </div>

            <div className="flex flex-1 min-h-[380px] max-h-[460px] overflow-auto p-4 leading-relaxed text-purple-100">
              <textarea
                value={code}
                onChange={(e) => setCode(e.target.value)}
                spellCheck={false}
                className="w-full h-full bg-transparent resize-none focus:outline-none font-mono text-xs leading-relaxed text-gray-200 selection:bg-purple-600/40"
                style={{
                  tabSize: 4,
                  lineHeight: '1.6',
                }}
              />
            </div>

            {/* Editor Bottom Status Bar */}
            <div className="bg-[#120B20] px-3 py-1.5 border-t border-[#352A50] flex items-center justify-between text-[11px] text-gray-400 font-mono">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-emerald-400"></span>
                <span>Compiled cleanly (Go 1.22.4)</span>
                <span>•</span>
                <span>UTF-8</span>
                <span>•</span>
                <span>Tab Size: 4</span>
              </div>
              <div>Ln 23, Col 18</div>
            </div>
          </div>

          {/* Interactive Execution Console Drawer */}
          <div className="neu-extruded rounded-2xl p-3.5 bg-white/70 space-y-2 border border-purple-100">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <button
                  onClick={() => setConsoleTab('tests')}
                  className={`px-3 py-1 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                    consoleTab === 'tests' ? 'neu-inset text-[#7138E8]' : 'text-[#5F5675] hover:text-[#21163B]'
                  }`}
                >
                  Test Results (3/4 Passing)
                </button>
                <button
                  onClick={() => setConsoleTab('stdout')}
                  className={`px-3 py-1 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                    consoleTab === 'stdout' ? 'neu-inset text-[#7138E8]' : 'text-[#5F5675] hover:text-[#21163B]'
                  }`}
                >
                  Compiler Stdout
                </button>
                <button
                  onClick={() => setConsoleTab('memory')}
                  className={`px-3 py-1 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                    consoleTab === 'memory' ? 'neu-inset text-[#7138E8]' : 'text-[#5F5675] hover:text-[#21163B]'
                  }`}
                >
                  Memory Profiler
                </button>
              </div>

              <div className="flex items-center gap-2 text-[11px]">
                <span className="text-[#5F5675]">Avg Exec: <strong className="text-[#21163B]">12.4ms</strong></span>
                <span className="font-bold text-emerald-700 bg-emerald-100 px-2 py-0.5 rounded-full">
                  PASS 75%
                </span>
              </div>
            </div>

            {/* Console Output Pane */}
            <div className="bg-[#120B20] text-gray-200 p-3 rounded-xl font-mono text-xs space-y-1 overflow-x-auto min-h-[120px]">
              {consoleTab === 'tests' && (
                <>
                  <div className="text-emerald-400 flex items-center justify-between">
                    <span>=== RUN   TestIngressStandardRouting</span>
                    <span className="text-gray-500 text-[10px]">0.002s [PASS]</span>
                  </div>
                  <div className="text-emerald-400 flex items-center justify-between">
                    <span>=== RUN   TestSlidingWindowRateLimiter_1000RPS</span>
                    <span className="text-gray-500 text-[10px]">0.009s [PASS]</span>
                  </div>
                  <div className="text-emerald-400 flex items-center justify-between">
                    <span>=== RUN   TestHeaderStrippingXClusterIdentity</span>
                    <span className="text-gray-500 text-[10px]">0.001s [PASS]</span>
                  </div>
                  <div className="text-amber-400 flex items-center justify-between">
                    <span>=== RUN   TestMutualTLSClientCertValidation</span>
                    <span className="text-amber-300 font-bold text-[10px]">[WAITING TLS HANDSHAKE HOOK]</span>
                  </div>
                </>
              )}

              {consoleTab === 'stdout' && (
                <div className="text-gray-400 text-[11px] leading-relaxed space-y-0.5">
                  <p className="text-purple-300">&gt; go test -v -race -cover ./ingress/...</p>
                  <p>?   github.com/skillbridge/ingress/test/fixtures [no test files]</p>
                  <p>ok  github.com/skillbridge/ingress/pkg/controller 0.012s coverage: 88.4% of statements</p>
                  <p className="text-cyan-300">[INFO] Rate Limiter initialized with burst capacity 200 tokens.</p>
                </div>
              )}

              {consoleTab === 'memory' && (
                <div className="text-[11px] space-y-1">
                  <div className="flex justify-between text-gray-300">
                    <span>Heap Allocated:</span>
                    <span className="text-cyan-400 font-bold">14.2 MB / 256 MB Max</span>
                  </div>
                  <div className="w-full bg-gray-800 h-2 rounded-full overflow-hidden">
                    <div className="bg-cyan-400 h-full rounded-full" style={{ width: '15%' }}></div>
                  </div>
                  <p className="text-emerald-400 text-[10px]">0 Memory Leaks detected in Goroutine stack profiler.</p>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* COLUMN 3: PROCTOR FEED, CO-PILOT & PROJECTED SCORE (3 cols) */}
        <div className="lg:col-span-3 space-y-4">
          {/* Live Proctor Feed Widget */}
          <div className="neu-extruded rounded-2xl p-3.5 bg-white/70 space-y-2 border border-purple-100">
            <div className="flex items-center justify-between text-xs">
              <span className="font-bold text-[#21163B] flex items-center gap-1.5">
                <Eye className="w-3.5 h-3.5 text-rose-500 animate-pulse" />
                Live Proctor Feed
              </span>
              <span className="text-[10px] font-bold text-emerald-700 bg-emerald-100 px-2 py-0.5 rounded-full">
                99.4% Matched
              </span>
            </div>

            {/* Webcam Mock Viewfinder with Gaze Overlay */}
            <div className="relative rounded-xl overflow-hidden aspect-video bg-gray-900 border border-purple-200 flex items-center justify-center">
              <img
                src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=500&auto=format&fit=crop&q=80"
                alt="Proctored Candidate"
                className="w-full h-full object-cover filter contrast-105"
              />

              {/* Holographic facial bounding box */}
              <div className="absolute inset-4 border border-emerald-400/80 rounded-lg pointer-events-none">
                <div className="absolute -top-2 left-2 bg-emerald-600 text-white text-[8px] font-mono font-bold px-1 rounded">
                  EYE TRACK: CENTER
                </div>
                <div className="absolute top-1 right-1 text-[8px] font-mono text-emerald-300">
                  1 PERSON
                </div>
              </div>

              {/* Bottom HUD */}
              <div className="absolute bottom-1 left-2 right-2 flex justify-between text-[8px] font-mono text-white/90 bg-black/60 px-2 py-0.5 rounded backdrop-blur-xs">
                <span>MIC: 14dB (SILENT)</span>
                <span className="text-emerald-300 font-bold">VERIFIED</span>
              </div>
            </div>

            {/* Anti-Cheat Telemetry Pills */}
            <div className="grid grid-cols-3 gap-1.5 text-center text-[10px]">
              <div className="p-1 rounded-lg neu-flat">
                <span className="text-[#5F5675] text-[8px] block uppercase">FULL SCREEN</span>
                <span className="font-bold text-emerald-700">LOCKED</span>
              </div>
              <div className="p-1 rounded-lg neu-flat">
                <span className="text-[#5F5675] text-[8px] block uppercase">TAB SWITCH</span>
                <span className="font-bold text-emerald-700">0 / 3</span>
              </div>
              <div className="p-1 rounded-lg neu-flat">
                <span className="text-[#5F5675] text-[8px] block uppercase">EXT MONITOR</span>
                <span className="font-bold text-emerald-700">NONE</span>
              </div>
            </div>
          </div>

          {/* BRIDGIE Co-Pilot Architecture Agent */}
          <div className="neu-extruded rounded-2xl p-4 bg-white/70 space-y-3 border border-purple-100">
            <div className="flex items-center gap-2">
              <div className="w-7 h-7 rounded-lg bg-gradient-to-tr from-[#7138E8] to-[#E75ACF] flex items-center justify-center text-white text-xs font-bold shadow-xs">
                <Sparkles className="w-4 h-4" />
              </div>
              <div>
                <span className="font-bold text-xs font-display text-[#21163B] block">BRIDGIE Co-Pilot</span>
                <span className="text-[10px] text-[#5F5675]">Diagnostic Architecture Agent</span>
              </div>
              <span className="ml-auto w-2 h-2 rounded-full bg-emerald-500"></span>
            </div>

            <div className="p-3 rounded-xl neu-inset text-xs text-[#21163B] leading-relaxed">
              <p className="italic text-[11px]">
                &quot;I&apos;ve analyzed your ingress handler on line 28. Your rate limiter allows traffic, but your <code className="text-[#7138E8] font-bold">c.activeOps</code> increment is safe.&quot;
              </p>
              <p className="mt-1.5 text-[10px] text-[#5F5675]">
                Remember: For test vector 3 (mTLS), ensure your handler extracts peer certificates from <code className="text-[#7138E8]">req.TLS.PeerCertificates</code> before returning HTTP 200.
              </p>
            </div>

            {hintMessage && (
              <div className="p-2.5 rounded-xl bg-amber-50 border border-amber-200 text-amber-900 text-xs animate-in fade-in">
                {hintMessage}
              </div>
            )}

            <div className="space-y-1.5 pt-1">
              <button
                onClick={handleRequestHint}
                disabled={hintsUsed >= 2}
                className="w-full py-2 px-3 rounded-xl neu-flat hover:neu-inset text-xs font-semibold text-[#7138E8] flex items-center justify-between cursor-pointer disabled:opacity-50"
              >
                <span className="flex items-center gap-1.5">
                  <HelpCircle className="w-3.5 h-3.5" />
                  Request Ingress Hint
                </span>
                <span className="text-[10px] font-mono text-[#5F5675]">{hintsUsed}/2 Used (-0.5 pts)</span>
              </button>

              <button
                onClick={() => setConsoleTab('memory')}
                className="w-full py-2 px-3 rounded-xl neu-flat hover:neu-inset text-xs font-semibold text-[#21163B] flex items-center justify-between cursor-pointer"
              >
                <span className="flex items-center gap-1.5">
                  <Cpu className="w-3.5 h-3.5 text-purple-600" />
                  Explain Memory Allocation
                </span>
                <ChevronRight className="w-3.5 h-3.5 text-[#5F5675]" />
              </button>
            </div>
          </div>

          {/* PROJECTED VALIDATION SCORE */}
          <div className="neu-extruded rounded-2xl p-4 bg-white/70 space-y-3 border border-purple-100">
            <div className="flex items-center justify-between text-xs">
              <span className="font-bold text-[#21163B]">PROJECTED VALIDATION SCORE</span>
              <Award className="w-4 h-4 text-[#7138E8]" />
            </div>

            {/* Radial Dial Simulation */}
            <div className="flex items-center gap-4">
              <div className="relative w-20 h-20 rounded-full flex items-center justify-center neu-inset shrink-0">
                <div
                  className="w-16 h-16 rounded-full flex items-center justify-center text-center font-black text-lg font-display text-[#7138E8] neu-extruded"
                >
                  92.1
                </div>
              </div>
              <div className="space-y-1 text-xs">
                <span className="font-bold text-[#21163B] block">Target Score: 92.1 / 100</span>
                <p className="text-[10px] text-[#5F5675] leading-tight">
                  Qualified for <strong className="text-[#7138E8]">UIT-RGPV Level-3 Cloud Stamp</strong> and direct TPO fast-track queue.
                </p>
              </div>
            </div>

            <div className="space-y-1.5 pt-1 text-[11px]">
              <div className="flex justify-between text-[#5F5675]">
                <span>Docker Containerization</span>
                <span className="font-bold text-[#21163B]">94%</span>
              </div>
              <div className="w-full bg-purple-100 h-1.5 rounded-full overflow-hidden">
                <div className="bg-[#7138E8] h-full rounded-full" style={{ width: '94%' }}></div>
              </div>

              <div className="flex justify-between text-[#5F5675]">
                <span>Ingress Security Standard</span>
                <span className="font-bold text-[#21163B]">90%</span>
              </div>
              <div className="w-full bg-purple-100 h-1.5 rounded-full overflow-hidden">
                <div className="bg-[#7138E8] h-full rounded-full" style={{ width: '90%' }}></div>
              </div>
            </div>

            <div className="pt-2 text-[10px] text-[#5F5675] flex items-center gap-1 border-t border-purple-100">
              <Lock className="w-3 h-3 text-purple-600" />
              Passport Ledger Stamp Ready upon submission
            </div>
          </div>
        </div>
      </div>

      {/* 3. AUDIT & SOVEREIGN FOOTER STRIP */}
      <div className="p-3 rounded-xl bg-purple-100/50 border border-purple-200/50 flex flex-wrap items-center justify-between text-[11px] text-[#5F5675] gap-2">
        <div className="flex items-center gap-2">
          <Shield className="w-3.5 h-3.5 text-[#7138E8]" />
          <span>SkillBridge AI Secure Assessment Node MP-01</span>
          <span>•</span>
          <span>AICTE & NAAC Compliant</span>
          <span>•</span>
          <span className="font-mono text-[10px]">SHA-256 Ledger Hash: 4e8f9a...3b21</span>
        </div>
        <div className="flex items-center gap-3">
          <span className="flex items-center gap-1">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
            Auto-Saved 12s ago
          </span>
          <span>Latency: 16ms to State Secretariat SDC Bhopal</span>
        </div>
      </div>

      {/* MODAL: PROCTOR LOG */}
      {showProctorLog && (
        <div className="fixed inset-0 z-50 bg-black/40 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-[#F3F0FF] rounded-3xl p-6 max-w-lg w-full neu-floating space-y-4 border border-white">
            <div className="flex items-center justify-between border-b border-purple-200 pb-3">
              <div className="flex items-center gap-2">
                <Shield className="w-5 h-5 text-[#7138E8]" />
                <h3 className="font-bold text-base font-display text-[#21163B]">
                  Real-Time Biometric & Anti-Cheat Audit Log
                </h3>
              </div>
              <button
                onClick={() => setShowProctorLog(false)}
                className="p-1 rounded-lg neu-flat hover:text-[#7138E8] cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="space-y-2 max-h-72 overflow-y-auto text-xs">
              <div className="p-2.5 rounded-xl neu-flat flex items-center justify-between">
                <div>
                  <span className="font-bold text-[#21163B]">Biometric Mesh Verified</span>
                  <p className="text-[10px] text-[#5F5675]">Candidate matched against DigiLocker Aadhaar ID photo</p>
                </div>
                <span className="text-[10px] font-mono text-emerald-700">10:00:12</span>
              </div>
              <div className="p-2.5 rounded-xl neu-flat flex items-center justify-between">
                <div>
                  <span className="font-bold text-[#21163B]">Browser Lock Enforced</span>
                  <p className="text-[10px] text-[#5F5675]">Fullscreen mode locked, secondary monitor check: None</p>
                </div>
                <span className="text-[10px] font-mono text-emerald-700">10:00:15</span>
              </div>
              <div className="p-2.5 rounded-xl neu-flat flex items-center justify-between">
                <div>
                  <span className="font-bold text-[#21163B]">Keystroke Cadence Calibrated</span>
                  <p className="text-[10px] text-[#5F5675]">Typing rhythm profile aligned with historical practice sets</p>
                </div>
                <span className="text-[10px] font-mono text-emerald-700">10:05:30</span>
              </div>
              <div className="p-2.5 rounded-xl neu-flat flex items-center justify-between">
                <div>
                  <span className="font-bold text-emerald-700">Test Vector 1 & 2 Passed</span>
                  <p className="text-[10px] text-[#5F5675]">Standard Ingress & Rate Limiter validated in sandbox</p>
                </div>
                <span className="text-[10px] font-mono text-emerald-700">10:14:22</span>
              </div>
            </div>

            <button
              onClick={() => setShowProctorLog(false)}
              className="w-full py-2.5 rounded-xl btn-kinetic font-bold text-xs cursor-pointer text-white"
            >
              Close Audit Log
            </button>
          </div>
        </div>
      )}

      {/* MODAL: SUBMISSION SUCCESS */}
      {showSubmissionSuccess && (
        <div className="fixed inset-0 z-50 bg-black/40 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-[#F3F0FF] rounded-3xl p-6 sm:p-8 max-w-md w-full neu-floating space-y-4 text-center border border-white">
            <div className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-[#7138E8] to-[#E75ACF] mx-auto flex items-center justify-center text-white shadow-md">
              <Award className="w-8 h-8" />
            </div>

            <h3 className="text-xl font-bold font-display text-[#21163B]">
              Assessment Submitted & Stamped!
            </h3>

            <p className="text-xs text-[#5F5675] leading-relaxed">
              Congratulations! Your test execution score of <strong className="text-[#7138E8]">92.1/100</strong> has been permanently notarized onto the MP Higher Education Sovereign Ledger.
            </p>

            <div className="p-3 rounded-2xl neu-inset text-left space-y-1.5 text-xs">
              <div className="flex justify-between">
                <span className="text-[#5F5675]">Candidate:</span>
                <span className="font-bold text-[#21163B]">{currentUser?.name || 'Ayush Sharma'}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-[#5F5675]">Digital Passport Stamp:</span>
                <span className="font-bold text-purple-700">#MP-RGPV-CLOUD-L3</span>
              </div>
              <div className="flex justify-between">
                <span className="text-[#5F5675]">Ledger Block Hash:</span>
                <span className="font-mono text-[10px] text-gray-600">8c4f92...9921b</span>
              </div>
            </div>

            <div className="pt-2 flex gap-3">
              <button
                onClick={() => {
                  setShowSubmissionSuccess(false);
                  onBack?.();
                }}
                className="flex-1 py-2.5 rounded-xl btn-kinetic font-bold text-xs cursor-pointer text-white"
              >
                Return to Dashboard
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
