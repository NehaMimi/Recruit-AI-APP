import React, { useState } from 'react';
import { ChevronLeft, Mail, Briefcase, Users, CheckCircle, AlertCircle, XCircle } from 'lucide-react';
import { Candidate, ScreeningStatus } from '../types';

interface ResultsScreenProps {
  candidates: Candidate[];
  onCandidateSelect: (candidate: Candidate) => void;
  onScheduleSelect: (candidate: Candidate) => void;
  onBack: () => void;
}

const ResultsScreen: React.FC<ResultsScreenProps> = ({ candidates, onCandidateSelect, onScheduleSelect, onBack }) => {
  const [filter, setFilter] = useState<ScreeningStatus | 'all'>('all');

  const filteredCandidates = filter === 'all' 
    ? candidates 
    : candidates.filter(c => c.status === filter);

  const getStatusColor = (status: ScreeningStatus) => {
    switch(status) {
      case 'recommended': return 'border-l-4 border-l-green-500';
      case 'maybe': return 'border-l-4 border-l-amber-500';
      case 'rejected': return 'border-l-4 border-l-red-500 opacity-75 grayscale-[0.5]';
    }
  };

  const getScoreColor = (score: number) => {
    if (score >= 80) return 'text-green-600';
    if (score >= 60) return 'text-amber-600';
    return 'text-red-600';
  };

  return (
    <div className="flex-grow max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 animate-fade-in">
      
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4">
        <div className="flex items-center space-x-4">
          <button 
            onClick={onBack}
            className="p-2 hover:bg-slate-200 rounded-full transition-colors"
          >
            <ChevronLeft className="h-6 w-6 text-slate-600" />
          </button>
          <div>
            <h2 className="text-2xl font-bold text-slate-900">Campaign Results</h2>
            <p className="text-sm text-slate-500">{candidates.length} candidates analyzed • Sorted by Relevance</p>
          </div>
        </div>

        {/* Filter Controls */}
        <div className="flex p-1 bg-white rounded-xl border border-slate-200 shadow-sm">
          {(['all', 'recommended', 'maybe', 'rejected'] as const).map(status => (
            <button
              key={status}
              onClick={() => setFilter(status)}
              className={`px-4 py-2 rounded-lg text-sm font-semibold capitalize transition-all
                ${filter === status 
                  ? 'bg-indigo-600 text-white shadow-sm' 
                  : 'text-slate-500 hover:bg-slate-50 hover:text-slate-900'}`}
            >
              {status} 
              <span className={`ml-2 text-xs py-0.5 px-1.5 rounded-full ${filter === status ? 'bg-indigo-500 text-white' : 'bg-slate-100 text-slate-600'}`}>
                {status === 'all' ? candidates.length : candidates.filter(c => c.status === status).length}
              </span>
            </button>
          ))}
        </div>
      </div>

      {/* Candidate List */}
      <div className="space-y-4 pb-12">
        {filteredCandidates.map((candidate) => (
          <div 
            key={candidate.id}
            className={`bg-white rounded-xl shadow-sm hover:shadow-md transition-all p-6 ${getStatusColor(candidate.status)} relative overflow-hidden group`}
          >
            <div className="flex flex-col lg:flex-row justify-between gap-6 relative z-10">
              
              {/* Left Info */}
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-2">
                  <h3 className="text-xl font-bold text-slate-900">{candidate.name}</h3>
                  <Badge status={candidate.status} />
                </div>
                
                <div className="flex flex-wrap items-center gap-4 text-sm text-slate-500 mb-5">
                  <span className="flex items-center"><Briefcase className="w-4 h-4 mr-1.5"/> {candidate.experience}</span>
                  <span className="hidden sm:inline">•</span>
                  <span className="flex items-center"><Users className="w-4 h-4 mr-1.5"/> {candidate.education}</span>
                  <span className="hidden sm:inline">•</span>
                  <span className="text-indigo-600 font-medium bg-indigo-50 px-2 py-0.5 rounded">{candidate.currentRole}</span>
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                  <div className="bg-slate-50 p-4 rounded-xl border border-slate-100">
                    <p className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">Strengths</p>
                    <p className="text-sm text-slate-700 leading-relaxed">{candidate.strengths}</p>
                  </div>
                  {candidate.status !== 'recommended' && (
                    <div className="bg-amber-50/50 p-4 rounded-xl border border-amber-100/50">
                      <p className="text-xs font-bold text-amber-600/70 uppercase tracking-wider mb-2">Concerns</p>
                      <p className="text-sm text-slate-700 leading-relaxed">{candidate.gaps}</p>
                    </div>
                  )}
                </div>
              </div>

              {/* Right Score & Actions */}
              <div className="flex flex-row lg:flex-col items-center lg:items-end justify-between lg:w-48 gap-6 lg:border-l lg:border-slate-100 lg:pl-6">
                <div className="text-right">
                  <div className={`text-5xl font-extrabold ${getScoreColor(candidate.score)} tracking-tight`}>
                    {candidate.score}
                  </div>
                  <p className="text-xs text-slate-400 font-bold uppercase tracking-wider mt-1 text-right">Match Score</p>
                </div>
                
                <div className="flex flex-col w-full gap-2">
                  <button 
                    onClick={() => onCandidateSelect(candidate)}
                    className="w-full px-4 py-2.5 text-sm font-semibold text-slate-700 bg-white border border-slate-300 hover:bg-slate-50 rounded-lg transition-colors shadow-sm"
                  >
                    View Details
                  </button>
                  {candidate.status !== 'rejected' && (
                    <button 
                      onClick={() => onScheduleSelect(candidate)}
                      className="w-full px-4 py-2.5 text-sm font-semibold text-white bg-indigo-600 hover:bg-indigo-700 rounded-lg shadow-sm transition-colors flex items-center justify-center gap-2"
                    >
                      <Mail className="w-4 h-4" /> Schedule
                    </button>
                  )}
                </div>
              </div>

            </div>

            {/* AI Reasoning Footer */}
            <div className="mt-5 pt-4 border-t border-slate-100 flex items-start gap-2.5">
              <div className="mt-0.5">
                {candidate.status === 'recommended' 
                  ? <CheckCircle className="w-4 h-4 text-green-600" /> 
                  : <AlertCircle className="w-4 h-4 text-amber-500" />}
              </div>
              <p className="text-sm text-slate-600">
                <span className="font-bold text-slate-900 mr-1">AI Reasoning:</span> 
                {candidate.recommendation}
              </p>
            </div>

          </div>
        ))}
      </div>
    </div>
  );
};

const Badge = ({ status }: { status: ScreeningStatus }) => {
  const styles = {
    recommended: "bg-green-100 text-green-700 border-green-200",
    maybe: "bg-amber-100 text-amber-700 border-amber-200",
    rejected: "bg-red-100 text-red-700 border-red-200"
  };

  return (
    <span className={`text-xs font-bold px-2.5 py-0.5 rounded-full border uppercase tracking-wide ${styles[status]}`}>
      {status}
    </span>
  );
};

export default ResultsScreen;