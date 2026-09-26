import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { LandingPage } from './pages/LandingPage';
import { SubmitComplaintPage } from './pages/SubmitComplaintPage';
import { ReviewComplaintPage } from './pages/ReviewComplaintPage';
import { SuccessPage } from './pages/SuccessPage';
import { TrackComplaintPage } from './pages/TrackComplaintPage';
import { HistoryPage } from './pages/HistoryPage';
import { DashboardPage } from './pages/DashboardPage';
import { GovernmentMapPage } from './pages/GovernmentMapPage';
import { HelpPage } from './pages/HelpPage';
import { AccessibilityPage } from './pages/AccessibilityPage';
import { useAccessibility } from './hooks/useAccessibility';

export const App: React.FC = () => {
  // Initialize accessibility DOM side-effects
  useAccessibility();

  return (
    <Router>
      <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans selection:bg-amber-500 selection:text-slate-950">
        <Header />
        
        <main className="flex-1">
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/submit" element={<SubmitComplaintPage />} />
            <Route path="/review" element={<ReviewComplaintPage />} />
            <Route path="/success/:id" element={<SuccessPage />} />
            <Route path="/track" element={<TrackComplaintPage />} />
            <Route path="/track/:id" element={<TrackComplaintPage />} />
            <Route path="/history" element={<HistoryPage />} />
            <Route path="/dashboard" element={<DashboardPage />} />
            <Route path="/government" element={<GovernmentMapPage />} />
            <Route path="/gov-map" element={<GovernmentMapPage />} />
            <Route path="/map" element={<GovernmentMapPage />} />
            <Route path="/help" element={<HelpPage />} />
            <Route path="/accessibility" element={<AccessibilityPage />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </main>

        <Footer />
      </div>
    </Router>
  );
};

export default App;
