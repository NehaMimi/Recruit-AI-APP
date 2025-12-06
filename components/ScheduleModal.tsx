import React, { useState, useEffect } from 'react';
import { X, Mail, Send, Calendar, Clock, Edit3 } from 'lucide-react';
import { Candidate } from '../types';
import { EMAIL_TEMPLATE } from '../constants';

interface ScheduleModalProps {
  candidate: Candidate;
  onClose: () => void;
}

const ScheduleModal: React.FC<ScheduleModalProps> = ({ candidate, onClose }) => {
  const [draft, setDraft] = useState('');
  const [isSending, setIsSending] = useState(false);

  useEffect(() => {
    // Extract company name from current role string like "Senior Dev @ Google"
    const company = candidate.currentRole.includes('@') 
      ? candidate.currentRole.split('@')[1].trim() 
      : '';
    
    setDraft(EMAIL_TEMPLATE(candidate.name, 'Frontend Developer', company));
  }, [candidate]);

  const handleSend = () => {
    setIsSending(true);
    setTimeout(() => {
      setIsSending(false);
      onClose();
      // In a real app, this would trigger a toast notification
      alert(`Invitation sent to ${candidate.email}`);
    }, 1500);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-fade-in">
      <div className="bg-white w-full max-w-2xl rounded-2xl shadow-2xl flex flex-col animate-slide-up">
        
        <div className="p-5 border-b border-slate-100 flex justify-between items-center bg-indigo-50/50 rounded-t-2xl">
          <h2 className="text-lg font-bold text-slate-900 flex items-center gap-2">
            <Mail className="w-5 h-5 text-indigo-600" /> 
            Compose Invitation
          </h2>
          <button onClick={onClose} className="text-slate-400 hover:text-slate-600">
            <X className="w-6 h-6" />
          </button>
        </div>

        <div className="p-6">
          <div className="mb-4 flex items-center gap-2 text-sm text-slate-500 bg-slate-50 p-3 rounded-lg border border-slate-100">
            <span className="font-semibold text-slate-700">To:</span> 
            <span className="bg-white px-2 py-0.5 rounded border border-slate-200 flex items-center gap-1">
              {candidate.name} &lt;{candidate.email}&gt;
            </span>
          </div>

          <div className="relative group">
            <label className="block text-xs font-bold text-slate-500 uppercase tracking-wide mb-2 flex justify-between">
              <span>AI Draft</span>
              <span className="flex items-center gap-1 text-indigo-600 cursor-pointer hover:underline">
                <Edit3 className="w-3 h-3" /> Edit Mode
              </span>
            </label>
            <textarea 
              value={draft}
              onChange={(e) => setDraft(e.target.value)}
              className="w-full h-80 p-5 border border-slate-300 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 text-sm leading-relaxed text-slate-800 font-mono resize-none shadow-inner"
              spellCheck={false}
            />
          </div>

          <div className="mt-4 flex gap-3 overflow-x-auto pb-2">
            <Chip icon={<Calendar className="w-3 h-3" />} text="Synced with G-Cal" />
            <Chip icon={<Clock className="w-3 h-3" />} text="30 min slot" />
            <Chip icon={<Clock className="w-3 h-3" />} text="Auto-reminder" />
          </div>
        </div>

        <div className="p-5 border-t border-slate-100 flex justify-between items-center bg-slate-50 rounded-b-2xl">
          <button 
            onClick={onClose}
            className="px-6 py-2.5 rounded-xl border border-slate-300 text-slate-600 font-semibold hover:bg-slate-100"
          >
            Discard
          </button>
          <button 
            onClick={handleSend}
            disabled={isSending}
            className={`px-8 py-2.5 rounded-xl bg-indigo-600 text-white font-bold shadow-lg shadow-indigo-200 flex items-center gap-2 transition-all
              ${isSending ? 'opacity-75 cursor-wait' : 'hover:bg-indigo-700 hover:-translate-y-0.5'}`}
          >
            {isSending ? 'Sending...' : (
              <>
                <Send className="w-4 h-4" /> Send Invitation
              </>
            )}
          </button>
        </div>

      </div>
    </div>
  );
};

const Chip = ({ icon, text }: { icon: React.ReactNode, text: string }) => (
  <div className="flex items-center gap-1.5 px-3 py-1.5 bg-indigo-50 text-indigo-700 rounded-lg text-xs font-medium border border-indigo-100 whitespace-nowrap">
    {icon} {text}
  </div>
);

export default ScheduleModal;