import React, { useState, useRef, useEffect } from 'react';
import { useApp } from '../../context/AppContext';
import { Bot, Sparkles, X, Send, ChevronDown, Lightbulb, MessageSquare, ArrowRight } from 'lucide-react';

interface ChatMessage {
  id: string;
  sender: 'bridgie' | 'user';
  text: string;
  time: string;
  actionPrompt?: string;
  actionModule?: string;
}

export const BridgieAssistant: React.FC = () => {
  const { currentRole, currentUser, students, jobs, approvalRequests, navigateTo } = useApp();
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Default greeting based on role
  useEffect(() => {
    let initialGreeting = '';
    if (currentRole === 'student') {
      const studentName = currentUser?.name?.split(' ')[0] || 'Aarav';
      initialGreeting = `Namaste ${studentName}! I'm Bridgie AI, your personal placement mentor. Your current Employability Score is ${
        (currentUser as any)?.employabilityScore || 89
      }/100. Would you like career roadmap guidance, mock interview prep, or to explore new TCS & AWS job openings?`;
    } else if (currentRole === 'tpo') {
      const pendingCount = approvalRequests.filter((r) => r.status === 'pending_approval').length;
      initialGreeting = `Greetings Officer. I am Bridgie AI, your Institutional Placement Assistant. You currently have ${pendingCount} pending approvals requiring verification. I can also generate batch skill gap reports for MP university drives.`;
    } else if (currentRole === 'recruiter') {
      initialGreeting = `Hello! I'm Bridgie AI. I can assist you with AI Talent Matching across 8,400+ verified engineering students from MP colleges like RGPV and SGSITS, and rank candidates based on verified skill proof hashes.`;
    } else if (currentRole === 'admin') {
      initialGreeting = `State Administration Monitor online. Bridgie AI is analyzing placement compliance across 52 MP districts. 8 colleges active, zero security anomalies detected today.`;
    } else {
      initialGreeting = `Welcome to SkillBridge AI! I am Bridgie, your companion across the Madhya Pradesh Placement Ecosystem. How can I assist you with student, TPO, or recruiter onboarding today?`;
    }

    setMessages([
      {
        id: 'msg-init',
        sender: 'bridgie',
        text: initialGreeting,
        time: 'Just now',
      },
    ]);
  }, [currentRole, currentUser]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    if (isOpen) {
      scrollToBottom();
    }
  }, [messages, isOpen]);

  // Suggested quick prompts per role
  const getSuggestions = () => {
    switch (currentRole) {
      case 'student':
        return [
          { label: 'How can I reach 95+ score?', query: 'How can I improve my Employability Score to 95+?' },
          { label: 'Top jobs matching my profile', query: 'Show me jobs matching my verified TypeScript and DSA skills' },
          { label: 'Practice Mock Interview', query: 'Start an AI mock interview for Full Stack SDE-1' },
          { label: 'Skill Gap for Cloud Architect', query: 'What are my skill gaps for AWS Cloud Architect role?' },
        ];
      case 'tpo':
        return [
          { label: 'Pending Approvals Summary', query: 'Which students and recruiters are currently waiting for approval?' },
          { label: 'Campus Skill Analytics', query: 'What are the top 3 weak skills in the 2026 CS branch?' },
          { label: 'Indore & Bhopal Drives', query: 'Show upcoming campus drives and student eligibility' },
        ];
      case 'recruiter':
        return [
          { label: 'Candidates with React >85', query: 'Find verified candidates with React score > 85 and CGPA > 8.0' },
          { label: 'AI Talent Match algorithm', query: 'Explain how Skill Match % differs from Hiring Probability' },
          { label: 'Post a New Job Drive', query: 'Help me draft a Campus Hiring drive for Indore campus' },
        ];
      case 'admin':
        return [
          { label: 'State-wide Placement Overview', query: 'What is the average placement rate across MP colleges?' },
          { label: 'Audit Log Check', query: 'Are there any flagged access attempts in the last 24 hours?' },
        ];
      default:
        return [
          { label: 'How does SkillBridge AI work?', query: 'Explain the 4-role verification ecosystem' },
          { label: 'Explore MP College Network', query: 'Show me the participating Madhya Pradesh colleges' },
        ];
    }
  };

  const handleSend = (userText: string) => {
    if (!userText.trim()) return;

    const newMsg: ChatMessage = {
      id: `user-${Date.now()}`,
      sender: 'user',
      text: userText,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    setMessages((prev) => [...prev, newMsg]);
    setInput('');
    setIsTyping(true);

    // Generate intelligent role-aware reply
    setTimeout(() => {
      let botResponse = '';
      let actionModule: string | undefined = undefined;
      const q = userText.toLowerCase();

      if (currentRole === 'student') {
        if (q.includes('improve') || q.includes('score') || q.includes('95')) {
          botResponse = `To boost your score from 89 to 95+: 
1. Complete the 'Cloud Systems & DevOps' assessment (estimated +4 pts).
2. Take an AI Mock Interview round on System Design (+3 pts in Technical Communication).
3. Link live deployment URL to your KisanMandee project (+2 pts in Project Evidence).`;
          actionModule = 'assessment';
        } else if (q.includes('job') || q.includes('matching') || q.includes('tcs') || q.includes('aws')) {
          botResponse = `Based on your verified skills in TypeScript, React, and PostgreSQL, you have a 94% Skill Match with TCS Digital (Indore) and 82% with AWS Cloud Support! Both are actively accepting 2026 batch applications.`;
          actionModule = 'jobs';
        } else if (q.includes('mock interview') || q.includes('interview')) {
          botResponse = `I have loaded the Full Stack SDE-1 Interview Module for you. We will practice questions on React 19 concurrent features, microservices, and system architecture with real-time vocal/text feedback!`;
          actionModule = 'mock-interview';
        } else if (q.includes('gap') || q.includes('cloud')) {
          botResponse = `For AWS Cloud Architect, your gap analysis shows missing verified evidence in Docker & Kubernetes clustering and Infrastructure as Code (Terraform). You can take our targeted micro-course in Learning Missions!`;
          actionModule = 'gap-analysis';
        } else {
          botResponse = `Understood! I've noted that. I can also help you export your cryptographically verifiable Skill Passport with SHA-verified credentials for recruiters.`;
          actionModule = 'passport';
        }
      } else if (currentRole === 'tpo') {
        if (q.includes('pending') || q.includes('approval')) {
          botResponse = `You currently have student request from Rohan Verma (MANIT, CGPA 8.45) and recruiter verification from Indore AI Labs (Crystal IT Park) pending. You can inspect their marksheets and MCA registration in the Central Student Approval Center.`;
          actionModule = 'approvals';
        } else if (q.includes('skill') || q.includes('analytics') || q.includes('weak')) {
          botResponse = `Campus analytics indicate 88% proficiency in core DSA, but 42% gap in Cloud Deployment and Docker. We recommend scheduling an AWS/GCP campus workshop before the upcoming January recruitment wave.`;
          actionModule = 'skill-analytics';
        } else {
          botResponse = `Analyzing institutional records for ${currentUser?.name || 'TPO Cell'}. All current student profiles are synchronized with the MP DTE placement repository.`;
          actionModule = 'students';
        }
      } else if (currentRole === 'recruiter') {
        if (q.includes('react') || q.includes('candidates') || q.includes('85')) {
          botResponse = `Found 12 verified candidates meeting your criteria across RGPV and SGSITS! Top candidate: Aarav Sharma (RGPV, 8.84 CGPA, React score 92/100, Employability 89) and Priya Patel (SGSITS, 9.12 CGPA, Employability 94).`;
          actionModule = 'talent';
        } else if (q.includes('probability') || q.includes('match') || q.includes('algorithm')) {
          botResponse = `Skill Match % measures direct keyword and test score alignment with your job description. Hiring Probability % additionally weights past batch interview conversion rates, communication score, and project code verifications.`;
          actionModule = 'talent';
        } else {
          botResponse = `Your company profile is active. You can browse verified students with zero resume inflation because all test scores are cryptographically bound.`;
          actionModule = 'talent';
        }
      } else if (currentRole === 'admin') {
        botResponse = `Platform Overview: 8 leading institutions onboarded, average placement readiness across MP engineering students is currently at 76.4%, up 8.2% year-over-year. Security audit status: ALL GREEN.`;
        actionModule = 'overview';
      } else {
        botResponse = `SkillBridge AI provides a unified, verified employability gateway for engineering colleges in Madhya Pradesh. Feel free to explore the Student, TPO, or Recruiter dashboards using the tester toolbar above!`;
      }

      setIsTyping(false);
      setMessages((prev) => [
        ...prev,
        {
          id: `bot-${Date.now()}`,
          sender: 'bridgie',
          text: botResponse,
          time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          actionModule,
        },
      ]);
    }, 650);
  };

  return (
    <>
      {/* Floating Mascot Button */}
      <div className="fixed bottom-6 right-6 z-50">
        {!isOpen && (
          <div className="relative group">
            {/* Thought bubble teaser on hover / load */}
            <div className="absolute -top-11 right-0 hidden group-hover:flex items-center gap-1.5 bg-white/95 text-[#21163B] text-xs font-semibold px-3 py-1.5 rounded-xl neu-extruded-sm whitespace-nowrap shadow-md pointer-events-none border border-purple-200">
              <Sparkles className="w-3.5 h-3.5 text-[#E75ACF]" />
              <span>Ask Bridgie AI for {currentRole === 'public' ? 'guidance' : currentRole + ' insights'}</span>
            </div>

            <button
              onClick={() => setIsOpen(true)}
              className="relative flex items-center justify-center w-14 h-14 rounded-full cursor-pointer transition-transform duration-200 hover:scale-105 active:scale-95"
              style={{
                background: 'linear-gradient(135deg, #7138E8 0%, #963DF5 50%, #E75ACF 100%)',
                boxShadow: '-4px -4px 12px rgba(255, 255, 255, 0.9), 6px 6px 20px rgba(113, 56, 232, 0.45)',
                border: '2px solid rgba(255, 255, 255, 0.85)',
              }}
              aria-label="Open Bridgie AI Assistant"
            >
              {/* Mascot Face Icon */}
              <div className="flex flex-col items-center justify-center text-white">
                <Bot className="w-7 h-7 drop-shadow-md animate-bounce-subtle" />
              </div>

              {/* Online pulse dot */}
              <span className="absolute top-0 right-0 flex h-3.5 w-3.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-3.5 w-3.5 bg-emerald-500 border-2 border-white"></span>
              </span>
            </button>
          </div>
        )}

        {/* Expanded Chat Drawer */}
        {isOpen && (
          <div
            className="w-[90vw] sm:w-[380px] md:w-[420px] h-[540px] flex flex-col rounded-2xl overflow-hidden glass-panel neu-floating transition-all duration-300"
            style={{
              backgroundColor: '#F3F0FF',
            }}
          >
            {/* Header */}
            <div className="flex items-center justify-between px-4 py-3 bg-gradient-to-r from-[#7138E8] via-[#963DF5] to-[#E75ACF] text-white shadow-xs">
              <div className="flex items-center space-x-2.5">
                <div className="w-9 h-9 rounded-full bg-white/20 backdrop-blur-xs flex items-center justify-center border border-white/40">
                  <Bot className="w-5 h-5 text-white" />
                </div>
                <div>
                  <div className="flex items-center gap-1.5 font-bold font-display text-sm tracking-wide">
                    <span>BRIDGIE AI</span>
                    <span className="text-[10px] bg-white/20 px-1.5 py-0.2 rounded-full font-normal uppercase">
                      {currentRole} Mode
                    </span>
                  </div>
                  <p className="text-[11px] text-purple-100 flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-300 animate-pulse"></span>
                    Verified Employability Intelligence
                  </p>
                </div>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="p-1 rounded-lg text-white/80 hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Messages Area */}
            <div className="flex-1 overflow-y-auto p-4 space-y-3">
              {messages.map((msg) => (
                <div
                  key={msg.id}
                  className={`flex flex-col ${msg.sender === 'user' ? 'items-end' : 'items-start'}`}
                >
                  <div
                    className={`max-w-[85%] rounded-2xl px-3.5 py-2.5 text-xs ${
                      msg.sender === 'user'
                        ? 'btn-kinetic text-white rounded-br-xs'
                        : 'neu-extruded text-[#21163B] rounded-bl-xs'
                    }`}
                  >
                    <p className="whitespace-pre-line leading-relaxed">{msg.text}</p>
                    {msg.actionModule && (
                      <button
                        onClick={() => {
                          navigateTo('dashboard', msg.actionModule);
                          setIsOpen(false);
                        }}
                        className="mt-2.5 flex items-center gap-1 text-[11px] font-bold text-[#7138E8] bg-white/90 hover:bg-white px-2.5 py-1 rounded-lg shadow-2xs cursor-pointer border border-purple-200 transition-transform active:scale-95"
                      >
                        <span>Open {msg.actionModule.replace('-', ' ')}</span>
                        <ArrowRight className="w-3 h-3" />
                      </button>
                    )}
                  </div>
                  <span className="text-[10px] text-[#5F5675] mt-1 px-1">{msg.time}</span>
                </div>
              ))}

              {isTyping && (
                <div className="flex items-center space-x-1.5 neu-extruded-sm px-3 py-2 rounded-2xl w-20">
                  <span className="w-1.5 h-1.5 bg-[#7138E8] rounded-full animate-bounce"></span>
                  <span className="w-1.5 h-1.5 bg-[#963DF5] rounded-full animate-bounce [animation-delay:0.2s]"></span>
                  <span className="w-1.5 h-1.5 bg-[#E75ACF] rounded-full animate-bounce [animation-delay:0.4s]"></span>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Suggestions Chips */}
            <div className="px-3 py-2 bg-[#E9DFFF]/60 border-t border-purple-200/50">
              <div className="flex items-center gap-1 text-[10px] font-semibold text-[#5F5675] mb-1.5">
                <Lightbulb className="w-3 h-3 text-[#E75ACF]" />
                <span>Suggested for you:</span>
              </div>
              <div className="flex flex-wrap gap-1.5">
                {getSuggestions().map((s, idx) => (
                  <button
                    key={idx}
                    onClick={() => handleSend(s.query)}
                    className="text-[11px] bg-white hover:bg-purple-50 text-[#21163B] hover:text-[#7138E8] px-2.5 py-1 rounded-full border border-purple-200 shadow-2xs transition-all cursor-pointer truncate max-w-full"
                  >
                    {s.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Input Footer */}
            <div className="p-3 bg-[#F3F0FF] border-t border-purple-200/60 flex items-center gap-2">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSend(input)}
                placeholder={`Ask Bridgie AI about ${currentRole}...`}
                className="flex-1 neu-input px-3.5 py-2 text-xs rounded-xl focus:outline-none"
              />
              <button
                onClick={() => handleSend(input)}
                disabled={!input.trim()}
                className="btn-kinetic p-2 rounded-xl disabled:opacity-50 cursor-pointer shadow-xs"
              >
                <Send className="w-4 h-4 text-white" />
              </button>
            </div>
          </div>
        )}
      </div>
    </>
  );
};
