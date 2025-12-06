import React from 'react';
import { X, Mail, Phone, MapPin, Download, ExternalLink, Calendar } from 'lucide-react';
import { Candidate } from '../types';
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, Cell, CartesianGrid } from 'recharts';

interface CandidateModalProps {
  candidate: Candidate;
  onClose: () => void;
  onSchedule: () => void;
}

const CandidateModal: React.FC<CandidateModalProps> = ({ candidate, onClose, onSchedule }) => {
  
  const chartData = [
    { name: 'Technical', score: candidate.technicalScore, fill: '#4f46e5' }, // indigo-600
    { name: 'Experience', score: candidate.experienceScore, fill: '#0ea5e9' }, // sky-500
    { name: 'Cultural', score: candidate.culturalFit, fill: '#8b5cf6' }, // violet-500
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-fade-in">
      <div className="bg-white w-full max-w-4xl max-h-[90vh] rounded-2xl shadow-2xl flex flex-col overflow-hidden animate-zoom-in">
        
        {/* Header */}
        <div className="p-6 border-b border-slate-100 bg-slate-50 flex justify-between items-start">
          <div className="flex items-center gap-5">
            <div className="h-20 w-20 rounded-full bg-white border-2 border-slate-200 flex items-center justify-center text-2xl font-bold text-indigo-600 shadow-sm">
              {candidate.name.split(' ').map(n => n[0]).join('')}
            </div>
            <div>
              <h2 className="text-2xl font-bold text-slate-900">{candidate.name}</h2>
              <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-sm text-slate-600 mt-2">
                <span className="flex items-center gap-1.5"><Mail className="w-4 h-4" /> {candidate.email}</span>
                <span className="flex items-center gap-1.5"><Phone className="w-4 h-4" /> {candidate.phone}</span>
                <span className="flex items-center gap-1.5"><MapPin className="w-4 h-4" /> {candidate.location}</span>
              </div>
            </div>
          </div>
          <button 
            onClick={onClose}
            className="p-2 hover:bg-slate-200 rounded-full transition-colors text-slate-400 hover:text-slate-600"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-8">
          
          <div className="grid md:grid-cols-2 gap-8">
            
            {/* Left Column: Analysis */}
            <div className="space-y-6">
              
              <div className="bg-indigo-50 rounded-xl p-5 border border-indigo-100">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm font-bold text-indigo-900 uppercase tracking-wide">Overall Match</span>
                  <span className="text-3xl font-extrabold text-indigo-600">{candidate.score}/100</span>
                </div>
                <p className="text-sm text-indigo-800 leading-relaxed font-medium">
                  {candidate.recommendation}
                </p>
              </div>

              <div>
                <h3 className="text-lg font-bold text-slate-900 mb-3">Key Strengths</h3>
                <ul className="space-y-2">
                  {candidate.strengths.split(',').map((item, i) => (
                    <li key={i} className="flex items-start gap-2 text-sm text-slate-600">
                      <div className="mt-1 h-1.5 w-1.5 rounded-full bg-green-500 shrink-0"></div>
                      {item.trim()}
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <h3 className="text-lg font-bold text-slate-900 mb-3">Potential Concerns</h3>
                <div className="bg-amber-50 p-4 rounded-xl border border-amber-100">
                   <ul className="space-y-2">
                    {candidate.gaps ? candidate.gaps.split(',').map((item, i) => (
                      <li key={i} className="flex items-start gap-2 text-sm text-slate-700">
                        <div className="mt-1 h-1.5 w-1.5 rounded-full bg-amber-500 shrink-0"></div>
                        {item.trim()}
                      </li>
                    )) : <li className="text-sm text-slate-500">No major concerns identified.</li>}
                  </ul>
                </div>
              </div>

              <div>
                <h3 className="text-lg font-bold text-slate-900 mb-3">Technical Skills</h3>
                <div className="flex flex-wrap gap-2">
                  {candidate.skills.map((skill, i) => (
                    <span key={i} className="px-3 py-1 bg-slate-100 text-slate-700 text-xs font-semibold rounded-md border border-slate-200">
                      {skill}
                    </span>
                  ))}
                </div>
              </div>

            </div>

            {/* Right Column: Data Vis & Actions */}
            <div className="flex flex-col gap-6">
              
              <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-6">
                <h3 className="text-sm font-bold text-slate-500 uppercase tracking-wider mb-6">Score Breakdown</h3>
                <div className="h-64 w-full">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={chartData} layout="vertical" margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                      <CartesianGrid strokeDasharray="3 3" horizontal={false} stroke="#e2e8f0" />
                      <XAxis type="number" domain={[0, 100]} hide />
                      <YAxis dataKey="name" type="category" width={80} tick={{fontSize: 12, fill: '#64748b'}} />
                      <Tooltip 
                        cursor={{fill: 'transparent'}}
                        contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                      />
                      <Bar dataKey="score" radius={[0, 4, 4, 0]} barSize={24}>
                        {chartData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.fill} />
                        ))}
                      </Bar>
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </div>

              <div className="bg-slate-50 rounded-xl p-6 border border-slate-100 space-y-4">
                <h3 className="text-sm font-bold text-slate-900">Application Meta</h3>
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <span className="text-slate-500 block text-xs">Education</span>
                    <span className="font-medium text-slate-800">{candidate.education}</span>
                  </div>
                   <div>
                    <span className="text-slate-500 block text-xs">Current Role</span>
                    <span className="font-medium text-slate-800">{candidate.currentRole}</span>
                  </div>
                   <div>
                    <span className="text-slate-500 block text-xs">Experience</span>
                    <span className="font-medium text-slate-800">{candidate.experience}</span>
                  </div>
                </div>
              </div>

            </div>

          </div>

        </div>

        {/* Footer */}
        <div className="p-6 border-t border-slate-100 flex justify-end gap-3 bg-white">
          <button className="px-5 py-2.5 rounded-xl border border-slate-300 text-slate-700 font-semibold hover:bg-slate-50 flex items-center gap-2">
            <Download className="w-4 h-4" /> Resume PDF
          </button>
          <button className="px-5 py-2.5 rounded-xl border border-slate-300 text-slate-700 font-semibold hover:bg-slate-50 flex items-center gap-2">
            <ExternalLink className="w-4 h-4" /> LinkedIn
          </button>
          <button 
            onClick={onSchedule}
            className="px-6 py-2.5 rounded-xl bg-indigo-600 text-white font-bold hover:bg-indigo-700 shadow-md shadow-indigo-200 flex items-center gap-2"
          >
            <Calendar className="w-4 h-4" /> Schedule Interview
          </button>
        </div>

      </div>
    </div>
  );
};

export default CandidateModal;