import React from 'react';

export const VisualIllustration: React.FC<{ className?: string }> = ({ className = '' }) => {
  return (
    <div className={`relative w-full max-w-lg mx-auto ${className}`}>
      {/* Glow backdrop */}
      <div className="absolute -inset-1 rounded-3xl bg-gradient-to-r from-amber-500 via-orange-500 to-indigo-600 opacity-30 blur-xl"></div>
      
      {/* SVG Civic Graphic */}
      <svg 
        viewBox="0 0 600 400" 
        className="relative w-full h-auto rounded-2xl bg-slate-900/90 border border-slate-700/80 p-6 shadow-2xl"
        fill="none" 
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* Background Grid Pattern */}
        <defs>
          <pattern id="grid" width="30" height="30" patternUnits="userSpaceOnUse">
            <path d="M 30 0 L 0 0 0 30" fill="none" stroke="rgba(255,255,255,0.05)" strokeWidth="1"/>
          </pattern>
          <linearGradient id="primaryGlow" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#f59e0b" />
            <stop offset="100%" stopColor="#6366f1" />
          </linearGradient>
        </defs>
        <rect width="100%" height="100%" fill="url(#grid)" />

        {/* Node 1: Citizen Input (Mic & Mobile) */}
        <g transform="translate(60, 160)">
          <rect width="120" height="150" rx="16" fill="#1e293b" stroke="#f59e0b" strokeWidth="2" />
          <circle cx="60" cy="55" r="28" fill="#f59e0b" fillOpacity="0.2" stroke="#f59e0b" strokeWidth="2" />
          {/* Mic Icon */}
          <path d="M54 45v14a6 6 0 0 0 12 0V45a6 6 0 0 0-12 0z" fill="#f59e0b"/>
          <path d="M48 56a12 12 0 0 0 24 0M60 68v8" stroke="#f59e0b" strokeWidth="2.5" strokeLinecap="round"/>
          <text x="60" y="115" textAnchor="middle" fill="#ffffff" fontSize="13" fontWeight="bold">Citizen Speech</text>
          <text x="60" y="132" textAnchor="middle" fill="#94a3b8" fontSize="10">EN | TA | HI</text>
        </g>

        {/* Connecting Data Line 1 */}
        <path d="M 180 235 C 230 235, 230 200, 270 200" stroke="#f59e0b" strokeWidth="3" strokeDasharray="6 6" className="animate-pulse" />

        {/* Node 2: AI Classification Brain Engine */}
        <g transform="translate(240, 120)">
          <rect width="140" height="160" rx="20" fill="#0f172a" stroke="#6366f1" strokeWidth="2.5" />
          <circle cx="70" cy="60" r="32" fill="#6366f1" fillOpacity="0.2" stroke="#818cf8" strokeWidth="2" />
          {/* AI Symbol */}
          <path d="M60 50h20M70 40v20M58 70l24-20" stroke="#818cf8" strokeWidth="3" strokeLinecap="round"/>
          <text x="70" y="118" textAnchor="middle" fill="#818cf8" fontSize="14" fontWeight="black">AI NAVIGATOR</text>
          <text x="70" y="136" textAnchor="middle" fill="#cbd5e1" fontSize="10">Dept Mapping & Priority</text>
        </g>

        {/* Connecting Data Line 2 */}
        <path d="M 380 200 C 420 200, 420 235, 460 235" stroke="#10b981" strokeWidth="3" strokeDasharray="6 6" />

        {/* Node 3: Government Portal & Resolution */}
        <g transform="translate(420, 160)">
          <rect width="120" height="150" rx="16" fill="#1e293b" stroke="#10b981" strokeWidth="2" />
          <circle cx="60" cy="55" r="28" fill="#10b981" fillOpacity="0.2" stroke="#10b981" strokeWidth="2" />
          {/* Government Building Icon */}
          <path d="M48 65h24M60 42l16 12H44l16-12zM52 54v11M60 54v11M68 54v11" stroke="#10b981" strokeWidth="2" strokeLinecap="round"/>
          <text x="60" y="115" textAnchor="middle" fill="#ffffff" fontSize="13" fontWeight="bold">Gov Portal</text>
          <text x="60" y="132" textAnchor="middle" fill="#10b981" fontSize="10">Auto-Assigned</text>
        </g>

        {/* Top Decorative Banner */}
        <rect x="150" y="30" width="300" height="40" rx="12" fill="#1e293b" stroke="#334155" />
        <circle cx="175" cy="50" r="5" fill="#f59e0b" />
        <circle cx="195" cy="50" r="5" fill="#10b981" />
        <circle cx="215" cy="50" r="5" fill="#6366f1" />
        <text x="320" y="55" textAnchor="middle" fill="#f8fafc" fontSize="12" fontWeight="bold">JANCONNECT CIVIC ENGINE</text>
      </svg>
    </div>
  );
};
