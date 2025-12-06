import React from 'react';
import { Upload, TrendingUp, CheckCircle, ArrowRight, PlayCircle } from 'lucide-react';

interface LandingPageProps {
  onGetStarted: () => void;
}

const LandingPage: React.FC<LandingPageProps> = ({ onGetStarted }) => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white pt-24 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center animate-fade-in">
        
        {/* Badge */}
        <div className="inline-flex items-center px-4 py-2 rounded-full bg-indigo-50 border border-indigo-100 text-indigo-700 font-medium text-sm mb-8 animate-slide-up">
          <span className="flex h-2 w-2 rounded-full bg-indigo-600 mr-2"></span>
          New: Gemini 2.5 Flash Integration
        </div>

        {/* Hero Text */}
        <h1 className="text-5xl md:text-7xl font-extrabold text-slate-900 tracking-tight mb-8 leading-tight animate-slide-up" style={{ animationDelay: '0.1s' }}>
          Stop Drowning in Resumes.<br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-purple-600">
            Let AI Screen for You.
          </span>
        </h1>
        
        <p className="text-xl text-slate-500 max-w-2xl mx-auto mb-12 leading-relaxed animate-slide-up" style={{ animationDelay: '0.2s' }}>
          Upload job descriptions and bulk resumes. Our intelligent agent parses, scores, and ranks candidates in seconds—saving you 15+ hours per week.
        </p>
        
        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row justify-center items-center space-y-4 sm:space-y-0 sm:space-x-6 mb-20 animate-slide-up" style={{ animationDelay: '0.3s' }}>
          <button 
            onClick={onGetStarted}
            className="px-8 py-4 bg-indigo-600 text-white rounded-2xl font-bold text-lg shadow-xl shadow-indigo-200 hover:bg-indigo-700 hover:scale-105 transition-all flex items-center group"
          >
            Start Free Screening
            <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
          </button>
          <button className="px-8 py-4 bg-white text-slate-700 border border-slate-200 rounded-2xl font-bold text-lg hover:bg-slate-50 hover:border-slate-300 transition-all flex items-center">
            <PlayCircle className="mr-2 h-5 w-5 text-slate-400" />
            Watch Demo
          </button>
        </div>

        {/* Feature Grid */}
        <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto text-left animate-slide-up" style={{ animationDelay: '0.4s' }}>
          <FeatureCard 
            icon={<Upload className="h-6 w-6 text-indigo-600" />}
            title="Bulk Upload"
            description="Drag & drop 50+ resumes at once. We handle PDF, DOCX, and TXT formats effortlessly."
          />
          <FeatureCard 
            icon={<TrendingUp className="h-6 w-6 text-purple-600" />}
            title="Intelligent Scoring"
            description="Candidates are ranked by technical fit, experience, and cultural alignment with your JD."
          />
          <FeatureCard 
            icon={<CheckCircle className="h-6 w-6 text-teal-600" />}
            title="Instant Decisions"
            description="Get a clear 'Recommended', 'Maybe', or 'Reject' status with detailed AI reasoning."
          />
        </div>
      </div>
      
      {/* Decorative Background Elements */}
      <div className="fixed top-0 left-0 -z-10 w-full h-full overflow-hidden pointer-events-none">
        <div className="absolute top-0 right-0 w-1/2 h-1/2 bg-indigo-50/50 rounded-full blur-3xl transform translate-x-1/3 -translate-y-1/4"></div>
        <div className="absolute bottom-0 left-0 w-1/3 h-1/3 bg-purple-50/50 rounded-full blur-3xl transform -translate-x-1/4 translate-y-1/4"></div>
      </div>
    </div>
  );
};

const FeatureCard = ({ icon, title, description }: { icon: React.ReactNode, title: string, description: string }) => (
  <div className="bg-white p-8 rounded-2xl border border-slate-100 shadow-sm hover:shadow-md transition-shadow">
    <div className="bg-slate-50 w-14 h-14 rounded-xl flex items-center justify-center mb-6 border border-slate-100">
      {icon}
    </div>
    <h3 className="font-bold text-lg text-slate-900 mb-3">{title}</h3>
    <p className="text-slate-500 leading-relaxed">{description}</p>
  </div>
);

export default LandingPage;