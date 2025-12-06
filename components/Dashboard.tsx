import React from 'react';
import { FileText, Upload, TrendingUp, Clock, ChevronRight } from 'lucide-react';

interface DashboardProps {
  uploadedJD: File | null;
  uploadedResumes: File[];
  onJDUpload: (file: File) => void;
  onResumeUpload: (files: File[]) => void;
  onStartAnalysis: () => void;
}

const Dashboard: React.FC<DashboardProps> = ({ 
  uploadedJD, 
  uploadedResumes, 
  onJDUpload, 
  onResumeUpload, 
  onStartAnalysis 
}) => {
  const isReady = uploadedJD && uploadedResumes.length > 0;

  return (
    <div className="flex-grow max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-10 animate-fade-in">
      
      <div className="grid lg:grid-cols-3 gap-8 h-full">
        
        {/* Main Upload Area */}
        <div className="lg:col-span-2 space-y-8">
          <div>
            <h2 className="text-3xl font-bold text-slate-900">New Screening Campaign</h2>
            <p className="text-slate-500 mt-2">Upload your requirements and candidates to get started.</p>
          </div>

          <div className="bg-white rounded-3xl shadow-sm border border-slate-200 p-8 sm:p-10">
            <div className="space-y-8">
              
              {/* JD Section */}
              <div className="group">
                <div className="flex justify-between items-center mb-3">
                  <label className="text-sm font-bold uppercase tracking-wider text-slate-500">
                    Step 1: Job Description
                  </label>
                  {uploadedJD && <span className="text-xs font-medium text-green-600 bg-green-50 px-2 py-1 rounded-full">Completed</span>}
                </div>
                
                <div className={`relative border-2 border-dashed rounded-2xl p-8 transition-all duration-200 text-center cursor-pointer overflow-hidden
                  ${uploadedJD 
                    ? 'border-indigo-500 bg-indigo-50/20' 
                    : 'border-slate-300 hover:border-indigo-400 hover:bg-slate-50'}`}
                >
                  <input 
                    type="file" 
                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
                    onChange={(e) => e.target.files?.[0] && onJDUpload(e.target.files[0])}
                    accept=".pdf,.doc,.docx,.txt"
                  />
                  <div className="flex flex-col items-center relative z-0">
                    <div className={`h-16 w-16 rounded-2xl flex items-center justify-center mb-4 transition-colors duration-200
                      ${uploadedJD ? 'bg-indigo-100 text-indigo-600' : 'bg-slate-100 text-slate-400 group-hover:text-indigo-500 group-hover:bg-indigo-50'}`}>
                      <FileText className="h-8 w-8" />
                    </div>
                    <p className="text-lg font-semibold text-slate-900">
                      {uploadedJD ? uploadedJD.name : 'Upload Job Description'}
                    </p>
                    <p className="text-sm text-slate-500 mt-2">
                      {uploadedJD 
                        ? `${(uploadedJD.size / 1024).toFixed(1)} KB`
                        : 'Drag & drop or click to browse (PDF, DOCX)'}
                    </p>
                  </div>
                </div>
              </div>

              {/* Resume Section */}
              <div className="group">
                 <div className="flex justify-between items-center mb-3">
                  <label className="text-sm font-bold uppercase tracking-wider text-slate-500">
                    Step 2: Candidate Resumes
                  </label>
                  {uploadedResumes.length > 0 && <span className="text-xs font-medium text-green-600 bg-green-50 px-2 py-1 rounded-full">{uploadedResumes.length} Files</span>}
                </div>

                <div className={`relative border-2 border-dashed rounded-2xl p-8 transition-all duration-200 text-center cursor-pointer overflow-hidden
                  ${uploadedResumes.length > 0
                    ? 'border-indigo-500 bg-indigo-50/20' 
                    : 'border-slate-300 hover:border-indigo-400 hover:bg-slate-50'}`}
                >
                  <input 
                    type="file" 
                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
                    onChange={(e) => e.target.files && onResumeUpload(Array.from(e.target.files))}
                    multiple
                    accept=".pdf,.doc,.docx"
                  />
                  <div className="flex flex-col items-center relative z-0">
                     <div className={`h-16 w-16 rounded-2xl flex items-center justify-center mb-4 transition-colors duration-200
                      ${uploadedResumes.length > 0 ? 'bg-indigo-100 text-indigo-600' : 'bg-slate-100 text-slate-400 group-hover:text-indigo-500 group-hover:bg-indigo-50'}`}>
                      <Upload className="h-8 w-8" />
                    </div>
                    <p className="text-lg font-semibold text-slate-900">
                      {uploadedResumes.length > 0 
                        ? `${uploadedResumes.length} resumes ready` 
                        : 'Upload Resumes (Bulk)'}
                    </p>
                    <p className="text-sm text-slate-500 mt-2">
                       {uploadedResumes.length > 0 
                        ? 'Click to add more'
                        : 'Drag multiple PDFs here to screen a batch'}
                    </p>
                  </div>
                </div>
              </div>

              {/* Action Button */}
              <button
                onClick={onStartAnalysis}
                disabled={!isReady}
                className={`w-full py-5 rounded-xl font-bold text-lg flex items-center justify-center space-x-3 transition-all duration-300 transform
                  ${isReady 
                    ? 'bg-indigo-600 text-white shadow-xl shadow-indigo-200 hover:bg-indigo-700 hover:-translate-y-1' 
                    : 'bg-slate-100 text-slate-400 cursor-not-allowed'}`}
              >
                <TrendingUp className="h-6 w-6" />
                <span>Start AI Analysis</span>
              </button>

            </div>
          </div>
        </div>

        {/* Sidebar History */}
        <div className="space-y-6">
          <div>
            <h2 className="text-xl font-bold text-slate-900">Recent Campaigns</h2>
          </div>
          
          <div className="space-y-4">
            {[
              { title: 'Senior Frontend Dev', date: '2 hours ago', count: 47, status: 'Completed' },
              { title: 'Backend Engineer', date: 'Yesterday', count: 32, status: 'Completed' },
              { title: 'Product Designer', date: 'Nov 20', count: 18, status: 'Archived' },
            ].map((item, idx) => (
              <div key={idx} className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm hover:shadow-md transition-all cursor-pointer group">
                <div className="flex justify-between items-start mb-2">
                  <h3 className="font-bold text-slate-900 group-hover:text-indigo-600 transition-colors">{item.title}</h3>
                  <ChevronRight className="h-5 w-5 text-slate-300 group-hover:text-indigo-600" />
                </div>
                <div className="flex items-center text-xs text-slate-500 mb-4">
                  <Clock className="h-3 w-3 mr-1" />
                  {item.date}
                </div>
                <div className="flex items-center justify-between">
                  <span className="bg-slate-100 text-slate-600 text-xs font-semibold px-2.5 py-1 rounded-md">{item.count} Candidates</span>
                  <span className="text-xs font-medium text-slate-400">{item.status}</span>
                </div>
              </div>
            ))}
          </div>

          <div className="bg-indigo-900 rounded-2xl p-6 text-white relative overflow-hidden">
             <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-700 rounded-full blur-3xl transform translate-x-10 -translate-y-10"></div>
             <h3 className="font-bold text-lg mb-2 relative z-10">Upgrade to Pro</h3>
             <p className="text-indigo-200 text-sm mb-4 relative z-10">Unlock unlimited screenings and advanced export features.</p>
             <button className="w-full py-2 bg-white/10 hover:bg-white/20 backdrop-blur-md rounded-lg text-sm font-semibold transition-colors">
               View Plans
             </button>
          </div>
        </div>

      </div>
    </div>
  );
};

export default Dashboard;