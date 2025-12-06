import React, { useState, useEffect } from 'react';
import { AppScreen, Candidate } from './types';
import { MOCK_CANDIDATES } from './constants';
import LandingPage from './components/LandingPage';
import Dashboard from './components/Dashboard';
import ProcessingScreen from './components/ProcessingScreen';
import ResultsScreen from './components/ResultsScreen';
import CandidateModal from './components/CandidateModal';
import ScheduleModal from './components/ScheduleModal';
import Header from './components/Header';

const App: React.FC = () => {
  const [currentScreen, setCurrentScreen] = useState<AppScreen>('landing');
  const [uploadedJD, setUploadedJD] = useState<File | null>(null);
  const [uploadedResumes, setUploadedResumes] = useState<File[]>([]);
  const [candidates, setCandidates] = useState<Candidate[]>([]);
  const [selectedCandidate, setSelectedCandidate] = useState<Candidate | null>(null);
  const [showScheduleModal, setShowScheduleModal] = useState(false);
  const [emailDraftCandidate, setEmailDraftCandidate] = useState<Candidate | null>(null);
  const [processingLog, setProcessingLog] = useState<string>('Initializing...');
  const [processingProgress, setProcessingProgress] = useState<number>(0);

  // --- Actions ---

  const handleJDUpload = (file: File) => {
    setUploadedJD(file);
  };

  const handleResumeUpload = (files: File[]) => {
    setUploadedResumes(prev => [...prev, ...files]);
  };

  const startAnalysis = async () => {
    // In a real app, we would read the files here and send text to Gemini.
    // Since we can't easily parse PDFs client-side without heavy libs, we simulate the flow.
    setCurrentScreen('processing');
    setProcessingProgress(0);
    setProcessingLog('Uploading documents to secure enclave...');

    // Simulation Loop
    const steps = [
      { p: 10, log: 'Extracting text from Job Description...' },
      { p: 30, log: `Parsing ${uploadedResumes.length || 3} candidate resumes...` },
      { p: 50, log: 'Identifying key skills and experience gaps...' },
      { p: 70, log: 'Analyzing cultural fit indicators...' },
      { p: 90, log: 'Generating candidate rankings and summaries...' },
      { p: 100, log: 'Finalizing results...' }
    ];

    let stepIndex = 0;
    
    const interval = setInterval(() => {
      if (stepIndex >= steps.length) {
        clearInterval(interval);
        setCandidates(MOCK_CANDIDATES);
        setTimeout(() => setCurrentScreen('results'), 500);
        return;
      }

      const step = steps[stepIndex];
      setProcessingProgress(step.p);
      setProcessingLog(step.log);
      stepIndex++;
    }, 800);
  };

  const handleCandidateClick = (candidate: Candidate) => {
    setSelectedCandidate(candidate);
  };

  const handleScheduleClick = (candidate: Candidate) => {
    setSelectedCandidate(null); // Close detail modal if open
    setEmailDraftCandidate(candidate);
    setShowScheduleModal(true);
  };

  const resetFlow = () => {
    setUploadedJD(null);
    setUploadedResumes([]);
    setCandidates([]);
    setCurrentScreen('dashboard');
  };

  // --- Render ---

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 text-slate-900 font-sans">
      <Header 
        currentScreen={currentScreen} 
        onNavigate={(screen) => setCurrentScreen(screen)} 
      />
      
      <main className="flex-grow flex flex-col">
        {currentScreen === 'landing' && (
          <LandingPage onGetStarted={() => setCurrentScreen('dashboard')} />
        )}
        
        {currentScreen === 'dashboard' && (
          <Dashboard 
            uploadedJD={uploadedJD}
            uploadedResumes={uploadedResumes}
            onJDUpload={handleJDUpload}
            onResumeUpload={handleResumeUpload}
            onStartAnalysis={startAnalysis}
          />
        )}

        {currentScreen === 'processing' && (
          <ProcessingScreen 
            progress={processingProgress}
            log={processingLog}
          />
        )}

        {currentScreen === 'results' && (
          <ResultsScreen 
            candidates={candidates}
            onCandidateSelect={handleCandidateClick}
            onScheduleSelect={handleScheduleClick}
            onBack={resetFlow}
          />
        )}
      </main>

      {/* Modals */}
      {selectedCandidate && (
        <CandidateModal 
          candidate={selectedCandidate} 
          onClose={() => setSelectedCandidate(null)}
          onSchedule={() => handleScheduleClick(selectedCandidate)}
        />
      )}

      {showScheduleModal && emailDraftCandidate && (
        <ScheduleModal 
          candidate={emailDraftCandidate}
          onClose={() => setShowScheduleModal(false)}
        />
      )}
    </div>
  );
};

export default App;