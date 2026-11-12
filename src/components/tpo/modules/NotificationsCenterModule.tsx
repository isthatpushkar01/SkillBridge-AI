import React, { useState } from 'react';
import {
  MessageSquare,
  Send,
  Bell,
  CheckCircle2,
  AlertTriangle,
  Radio,
  Users,
  Smartphone,
  Mail,
  Clock,
  Sparkles,
  ShieldAlert,
} from 'lucide-react';
import confetti from 'canvas-confetti';

interface BroadcastLogItem {
  id: string;
  title: string;
  audience: string;
  channels: string[];
  sentCount: number;
  deliveryRate: string;
  readRate: string;
  timestamp: string;
  priority: 'Normal' | 'Important' | 'Emergency';
}

export const NotificationsCenterModule: React.FC = () => {
  const [targetAudience, setTargetAudience] = useState('Final Year 2025 Cohort');
  const [priorityTier, setPriorityTier] = useState<'Normal' | 'Important' | 'Emergency'>('Important');
  const [broadcastTitle, setBroadcastTitle] = useState('');
  const [broadcastBody, setBroadcastBody] = useState('');
  const [channelPush, setChannelPush] = useState(true);
  const [channelEmail, setChannelEmail] = useState(true);
  const [channelSms, setChannelSms] = useState(false);

  const [broadcastLogs, setBroadcastLogs] = useState<BroadcastLogItem[]>([
    {
      id: 'bc-1',
      title: 'CloudScale Labs Campus Drive Shortlisting Released',
      audience: 'CSE & IT Batch 2025',
      channels: ['In-App', 'Email', 'SMS'],
      sentCount: 240,
      deliveryRate: '99.4%',
      readRate: '96.2%',
      timestamp: 'Today, 09:30 AM',
      priority: 'Important',
    },
    {
      id: 'bc-2',
      title: 'Mandatory AICTE Nodal Marksheet Upload Deadline',
      audience: 'All Registered Students (580)',
      channels: ['In-App', 'Email'],
      sentCount: 580,
      deliveryRate: '98.8%',
      readRate: '92.5%',
      timestamp: '16 Nov 2024',
      priority: 'Important',
    },
    {
      id: 'bc-3',
      title: 'RedPanda Data Distributed Systems Masterclass Access Link',
      audience: 'Enrolled Workshop Candidates',
      channels: ['In-App', 'Email'],
      sentCount: 284,
      deliveryRate: '99.1%',
      readRate: '94.8%',
      timestamp: '14 Nov 2024',
      priority: 'Normal',
    },
  ]);

  const handleSendBroadcast = (e: React.FormEvent) => {
    e.preventDefault();
    if (!broadcastTitle || !broadcastBody) return;
    const channels = [];
    if (channelPush) channels.push('In-App');
    if (channelEmail) channels.push('Email');
    if (channelSms) channels.push('SMS');

    const newLog: BroadcastLogItem = {
      id: `bc-${Date.now()}`,
      title: broadcastTitle,
      audience: targetAudience,
      channels,
      sentCount: targetAudience.includes('All') ? 580 : 240,
      deliveryRate: '99.8%',
      readRate: '88.4%',
      timestamp: 'Just now',
      priority: priorityTier,
    };

    setBroadcastLogs([newLog, ...broadcastLogs]);
    confetti({ particleCount: 60, spread: 60, origin: { y: 0.6 } });
    alert(`Broadcast dispatched to ${newLog.sentCount} candidates across ${channels.join(', ')}.`);
    setBroadcastTitle('');
    setBroadcastBody('');
  };

  return (
    <div className="space-y-6">
      {/* HEADER SECTION */}
      <div className="neu-extruded p-6 sm:p-8 rounded-3xl">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full neu-inset text-xs font-bold text-[#7138E8]">
              <Radio className="w-3.5 h-3.5" />
              <span>Institutional Gateway Dispatch Center</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold font-display text-[#21163B] mt-2">
              Notifications & Communication
            </h1>
            <p className="text-xs sm:text-sm text-[#5F5675]">
              Targeted multi-channel announcements to students, recruiters, and academic departments.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => {
                setPriorityTier('Emergency');
                setBroadcastTitle('URGENT: Placement Schedule Alteration');
                setBroadcastBody('Dear {student_name}, due to university schedule shifts, tomorrow\'s technical assessment will commence at 11:00 AM IST.');
              }}
              className="px-4 py-2.5 rounded-xl text-xs font-bold bg-rose-100 text-rose-800 hover:bg-rose-200 transition-colors flex items-center gap-2 cursor-pointer border border-rose-300"
            >
              <AlertTriangle className="w-4 h-4 text-rose-600" />
              <span>Draft Emergency Alert</span>
            </button>
          </div>
        </div>

        {/* 4 TOP KPI CARDS */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-6 pt-5 border-t border-purple-200/60">
          <div className="neu-inset p-3.5 rounded-2xl text-center">
            <div className="flex items-center justify-center gap-1 text-[11px] text-[#5F5675]">
              <Send className="w-3.5 h-3.5 text-[#7138E8]" />
              <span>TOTAL BROADCASTS</span>
            </div>
            <span className="text-2xl font-extrabold font-display text-[#21163B] block mt-1">142</span>
            <span className="text-[10px] text-[#5F5675]">AY 2024-25</span>
          </div>

          <div className="neu-inset p-3.5 rounded-2xl text-center border-b-2 border-emerald-500">
            <div className="flex items-center justify-center gap-1 text-[11px] text-[#5F5675]">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
              <span>OPEN RATE</span>
            </div>
            <span className="text-2xl font-extrabold font-display text-emerald-600 block mt-1">94.8%</span>
            <span className="text-[10px] text-emerald-700 font-semibold">SMS & Push Delivery</span>
          </div>

          <div className="neu-inset p-3.5 rounded-2xl text-center">
            <div className="flex items-center justify-center gap-1 text-[11px] text-[#5F5675]">
              <Radio className="w-3.5 h-3.5 text-purple-600" />
              <span>ACTIVE CHANNELS</span>
            </div>
            <span className="text-2xl font-extrabold font-display text-[#7138E8] block mt-1">4</span>
            <span className="text-[10px] text-[#5F5675]">Portal, Email, SMS, Web</span>
          </div>

          <div className="neu-inset p-3.5 rounded-2xl text-center">
            <div className="flex items-center justify-center gap-1 text-[11px] text-[#5F5675]">
              <ShieldAlert className="w-3.5 h-3.5 text-indigo-600" />
              <span>URGENT FLAGS</span>
            </div>
            <span className="text-2xl font-extrabold font-display text-indigo-600 block mt-1">0</span>
            <span className="text-[10px] text-[#5F5675]">No systemic bottlenecks</span>
          </div>
        </div>
      </div>

      {/* COMPOSE NOTIFICATION FORM */}
      <div className="neu-extruded p-6 sm:p-8 rounded-3xl space-y-5">
        <div className="flex items-center justify-between pb-3 border-b border-purple-200/60">
          <div className="flex items-center gap-2">
            <div className="w-9 h-9 rounded-xl bg-purple-600 text-white flex items-center justify-center shadow-md">
              <MessageSquare className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-bold text-lg text-[#21163B] font-display">
                Compose Institutional Notification
              </h3>
              <p className="text-xs text-[#5F5675]">
                Transmit verified academic or recruitment directives to targeted student cohorts.
              </p>
            </div>
          </div>
        </div>

        <form onSubmit={handleSendBroadcast} className="space-y-4 text-xs">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block font-semibold mb-1 text-[#21163B]">Target Audience *</label>
              <select
                value={targetAudience}
                onChange={(e) => setTargetAudience(e.target.value)}
                className="neu-input w-full px-3 py-2 rounded-xl"
              >
                <option value="Final Year 2025 Cohort">Final Year 2025 Cohort (580 Students)</option>
                <option value="CSE & IT Departments">CSE & IT Departments (360 Students)</option>
                <option value="Eligible Candidates >7.5 CGPA">Eligible Candidates &gt;7.5 CGPA (418 Students)</option>
                <option value="Recruiter Network">Registered Campus Recruiters (18 Companies)</option>
                <option value="All Campus Students">All Registered Students (1,840 Students)</option>
              </select>
            </div>

            <div>
              <label className="block font-semibold mb-1 text-[#21163B]">Priority Tier *</label>
              <div className="flex gap-2">
                {(['Normal', 'Important', 'Emergency'] as const).map((p) => (
                  <button
                    type="button"
                    key={p}
                    onClick={() => setPriorityTier(p)}
                    className={`flex-1 py-2 rounded-xl font-bold cursor-pointer transition-all ${
                      priorityTier === p
                        ? p === 'Emergency'
                          ? 'bg-rose-600 text-white shadow-xs'
                          : 'btn-kinetic text-white shadow-xs'
                        : 'neu-inset text-[#5F5675]'
                    }`}
                  >
                    {p}
                  </button>
                ))}
              </div>
            </div>
          </div>

          <div>
            <label className="block font-semibold mb-1 text-[#21163B]">Notification Title *</label>
            <input
              type="text"
              required
              placeholder="e.g. Schedule Announced: Technical Assessment Round for CloudScale Labs"
              value={broadcastTitle}
              onChange={(e) => setBroadcastTitle(e.target.value)}
              className="neu-input w-full px-3 py-2 rounded-xl"
            />
          </div>

          <div>
            <div className="flex justify-between items-center mb-1">
              <label className="block font-semibold text-[#21163B]">Message Body *</label>
              <span className="text-[10px] text-[#5F5675]">
                Tokens: <code className="text-[#7138E8]">{'{student_name}'}</code>, <code className="text-[#7138E8]">{'{drive_name}'}</code>, <code className="text-[#7138E8]">{'{deadline}'}</code>
              </span>
            </div>
            <textarea
              rows={4}
              required
              placeholder="Dear {student_name}, your eligibility for {drive_name} has been verified by the TPO Directorate. Please ensure your proctored assessment setup is complete prior to {deadline}."
              value={broadcastBody}
              onChange={(e) => setBroadcastBody(e.target.value)}
              className="neu-input w-full p-3 rounded-xl leading-relaxed"
            ></textarea>
          </div>

          {/* Delivery Channels */}
          <div className="p-3.5 neu-inset rounded-2xl flex flex-wrap items-center justify-between gap-3">
            <span className="font-bold text-[#21163B]">Transmission Channels:</span>
            <div className="flex items-center gap-4">
              <label className="flex items-center gap-1.5 cursor-pointer">
                <input
                  type="checkbox"
                  checked={channelPush}
                  onChange={(e) => setChannelPush(e.target.checked)}
                  className="w-4 h-4 accent-[#7138E8]"
                />
                <span>In-App Push</span>
              </label>
              <label className="flex items-center gap-1.5 cursor-pointer">
                <input
                  type="checkbox"
                  checked={channelEmail}
                  onChange={(e) => setChannelEmail(e.target.checked)}
                  className="w-4 h-4 accent-[#7138E8]"
                />
                <span>Email Digest</span>
              </label>
              <label className="flex items-center gap-1.5 cursor-pointer">
                <input
                  type="checkbox"
                  checked={channelSms}
                  onChange={(e) => setChannelSms(e.target.checked)}
                  className="w-4 h-4 accent-[#7138E8]"
                />
                <span>SMS Nodal Alert</span>
              </label>
            </div>
          </div>

          <div className="pt-2 flex justify-end gap-3">
            <button
              type="button"
              onClick={() => alert('Template saved to Institutional Dispatch Templates.')}
              className="btn-tactile px-4 py-2 rounded-xl font-bold cursor-pointer"
            >
              Save as Template
            </button>
            <button
              type="submit"
              className="btn-kinetic px-6 py-2.5 rounded-xl font-bold flex items-center gap-2 cursor-pointer shadow-md"
            >
              <Send className="w-4 h-4" />
              <span>Send Broadcast Now</span>
            </button>
          </div>
        </form>
      </div>

      {/* BROADCAST HISTORY & TELEMETRY TABLE */}
      <div className="neu-extruded p-6 sm:p-7 rounded-3xl space-y-4">
        <h3 className="font-bold text-lg text-[#21163B] font-display pb-3 border-b border-purple-200/60">
          Broadcast History & Delivery Telemetry
        </h3>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-purple-200/60 text-[#5F5675] font-semibold uppercase text-[10px]">
                <th className="py-3 px-3">Subject / Title</th>
                <th className="py-3 px-3">Target Audience</th>
                <th className="py-3 px-3">Channels</th>
                <th className="py-3 px-3">Sent Count</th>
                <th className="py-3 px-3">Delivery Rate</th>
                <th className="py-3 px-3">Read Rate</th>
                <th className="py-3 px-3 text-right">Timestamp</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-purple-100">
              {broadcastLogs.map((log) => (
                <tr key={log.id} className="hover:bg-purple-50/50 transition-colors">
                  <td className="py-3 px-3">
                    <strong className="text-[#21163B] font-bold block">{log.title}</strong>
                    <span
                      className={`inline-block text-[9px] font-bold px-1.5 py-0.2 rounded mt-0.5 ${
                        log.priority === 'Emergency'
                          ? 'bg-rose-100 text-rose-800'
                          : 'bg-purple-100 text-[#7138E8]'
                      }`}
                    >
                      {log.priority}
                    </span>
                  </td>
                  <td className="py-3 px-3 text-[#5F5675] font-medium">{log.audience}</td>
                  <td className="py-3 px-3">
                    <div className="flex gap-1">
                      {log.channels.map((ch, i) => (
                        <span key={i} className="bg-purple-50 text-[#7138E8] px-1.5 py-0.2 rounded text-[10px]">
                          {ch}
                        </span>
                      ))}
                    </div>
                  </td>
                  <td className="py-3 px-3 font-bold text-[#21163B]">{log.sentCount}</td>
                  <td className="py-3 px-3 font-bold text-emerald-700">{log.deliveryRate}</td>
                  <td className="py-3 px-3 font-bold text-purple-700">{log.readRate}</td>
                  <td className="py-3 px-3 text-right text-[#5F5675]">{log.timestamp}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
