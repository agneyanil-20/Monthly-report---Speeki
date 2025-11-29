import React, { useState, useEffect } from 'react';
import { DASHBOARD_DATA } from './constants';
import { Platform, MetricView, AccountData } from './types';
import StatCard from './components/StatCard';
import { SimplePieChart, SimpleBarChart } from './components/Charts';
import ChatWidget from './components/ChatWidget';

const App: React.FC = () => {
  const [platform, setPlatform] = useState<Platform>(Platform.INSTAGRAM);
  const [view, setView] = useState<MetricView>(MetricView.OVERVIEW);
  const [accountIndex, setAccountIndex] = useState(0);

  const currentPlatformData = DASHBOARD_DATA[platform];
  // Ensure we always have a valid account, defaulting to the first one if index is out of bounds
  const currentAccount = currentPlatformData.accounts[accountIndex] || currentPlatformData.accounts[0];

  // Reset account index when platform changes to avoid index out of bounds
  useEffect(() => {
    setAccountIndex(0);
  }, [platform]);

  // Helper to render stats based on view and platform
  const renderStats = (account: AccountData) => {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <StatCard 
          label="Total Followers" 
          value={account.metrics.followers} 
          trend={account.metrics.followersGrowth} 
          color="pink"
        />
        <StatCard 
          label="Reach / Views" 
          value={account.metrics.reach || 0} 
          trend={account.metrics.reachGrowth} 
          color="green"
        />
        <StatCard 
          label="Interactions/Engage" 
          value={account.metrics.engagement || 0} 
          trend={account.metrics.engagementGrowth}
          color="blue" 
        />
         {account.metrics.profileVisits && (
            <StatCard 
            label="Profile Visits" 
            value={account.metrics.profileVisits} 
            color="purple" 
            />
         )}
      </div>
    );
  };

  const renderContent = () => {
    const account = currentAccount;
    
    return (
      <div className="space-y-12 animate-in fade-in duration-500">
          <div key={account.name} className="border border-white/10 rounded-2xl p-6 bg-brand-card/50 backdrop-blur-sm animate-in slide-in-from-bottom-4 fade-in duration-500">
            <div className="flex items-center gap-3 mb-6 border-b border-white/5 pb-4">
                <div className="w-2 h-8 bg-brand-neonPink rounded-full"></div>
                <h2 className="text-2xl font-bold font-mono text-white">
                {account.name}
                </h2>
            </div>

            {/* Always show top-level stats */}
            {renderStats(account)}

            {/* Dynamic View Section */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              
              {/* Left Col: Audience/Demographics (If available) */}
              {(view === MetricView.AUDIENCE || view === MetricView.OVERVIEW) && account.audience && (
                <div className="lg:col-span-1 space-y-6">
                  {account.audience.followerSplit && (
                    <div className="bg-black/20 p-4 rounded-xl border border-white/5">
                      <h3 className="text-sm font-mono text-gray-400 mb-4 uppercase">Follower Ratio</h3>
                      <SimplePieChart data={account.audience.followerSplit} />
                    </div>
                  )}
                  {account.audience.countries && (
                    <div className="bg-black/20 p-4 rounded-xl border border-white/5">
                      <h3 className="text-sm font-mono text-gray-400 mb-4 uppercase">Top Countries</h3>
                      <SimpleBarChart data={account.audience.countries} color="#bd00ff" />
                    </div>
                  )}
                </div>
              )}

              {/* Middle/Right Col: Top Content & Cities */}
              <div className={`${(view === MetricView.AUDIENCE || view === MetricView.OVERVIEW) && account.audience ? 'lg:col-span-2' : 'lg:col-span-3'} space-y-6`}>
                
                {/* Cities Chart if Audience View */}
                {(view === MetricView.AUDIENCE || view === MetricView.OVERVIEW) && account.audience?.cities && (
                   <div className="bg-black/20 p-4 rounded-xl border border-white/5">
                      <h3 className="text-sm font-mono text-gray-400 mb-4 uppercase">Top Cities</h3>
                      <div className="h-64">
                         <SimpleBarChart data={account.audience.cities} color="#ccff00" />
                      </div>
                   </div>
                )}

                {/* Content List if Views/Interaction View */}
                {(view === MetricView.VIEWS || view === MetricView.INTERACTIONS || view === MetricView.OVERVIEW) && account.content && (
                  <div className="bg-black/20 p-4 rounded-xl border border-white/5">
                    <h3 className="text-sm font-mono text-gray-400 mb-4 uppercase">Top Performing Content</h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                      {account.content.topPosts.map((post, pIdx) => (
                        <div key={pIdx} className="bg-white/5 p-4 rounded-lg hover:bg-white/10 transition-colors border border-white/5">
                          <div className="flex justify-between items-start mb-2">
                             <div className="w-8 h-8 bg-gradient-to-br from-brand-neonPink to-purple-600 rounded flex items-center justify-center text-xs font-bold">
                               #{pIdx + 1}
                             </div>
                             <span className="text-xs bg-black/40 px-2 py-1 rounded text-gray-400">{post.subtitle}</span>
                          </div>
                          <h4 className="font-medium text-sm truncate mb-1" title={post.title}>{post.title}</h4>
                          <p className="text-brand-neonGreen font-mono font-bold">{post.value.toLocaleString()}</p>
                          <p className="text-[10px] text-gray-500 uppercase tracking-wider">Views/Impressions</p>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-brand-dark text-white font-sans selection:bg-brand-neonPink selection:text-white pb-20">
      
      {/* Header */}
      <header className="sticky top-0 z-30 bg-brand-dark/80 backdrop-blur-md border-b border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            <div className="flex items-center gap-3">
              <div>
                <h1 className="text-xl font-bold tracking-tight font-mono">cntrl m</h1>
                <p className="text-[10px] text-gray-400 uppercase tracking-widest">Monthly Report • Nov 2025</p>
              </div>
            </div>
            
            {/* Desktop Platform Nav */}
            <div className="hidden md:flex gap-2 p-1 bg-white/5 rounded-full border border-white/10">
              {Object.values(Platform).map((p) => (
                <button
                  key={p}
                  onClick={() => setPlatform(p)}
                  className={`px-6 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                    platform === p 
                      ? 'bg-brand-neonPink text-white shadow-[0_0_15px_rgba(255,0,127,0.4)]' 
                      : 'text-gray-400 hover:text-white hover:bg-white/5'
                  }`}
                >
                  {p}
                </button>
              ))}
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Platform Nav */}
      <div className="md:hidden p-4 border-b border-white/10 bg-brand-dark">
         <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
            {Object.values(Platform).map((p) => (
                <button
                  key={p}
                  onClick={() => setPlatform(p)}
                  className={`px-4 py-2 rounded-full text-xs font-medium whitespace-nowrap transition-all ${
                    platform === p 
                      ? 'bg-brand-neonPink text-white' 
                      : 'bg-white/5 text-gray-400'
                  }`}
                >
                  {p}
                </button>
              ))}
         </div>
      </div>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        
        {/* Account Selection Tabs - Show if > 1 account */}
        {currentPlatformData.accounts.length > 1 && (
            <div className="flex flex-wrap gap-3 mb-8">
                {currentPlatformData.accounts.map((acc, index) => (
                    <button
                        key={index}
                        onClick={() => setAccountIndex(index)}
                        className={`px-5 py-2.5 rounded-lg text-sm font-bold uppercase tracking-wide transition-all duration-300 border ${
                            accountIndex === index
                            ? 'bg-white text-black border-white shadow-[0_0_15px_rgba(255,255,255,0.3)] transform scale-105'
                            : 'bg-transparent text-gray-500 border-white/10 hover:border-white/30 hover:text-gray-300'
                        }`}
                    >
                        {acc.name}
                    </button>
                ))}
            </div>
        )}

        {/* Metric View Tabs (Inside Details) */}
        <div className="flex flex-wrap gap-4 mb-8 border-b border-white/10 pb-1">
          {Object.values(MetricView).map((v) => (
            <button
              key={v}
              onClick={() => setView(v)}
              className={`flex items-center gap-2 px-4 py-2 border-b-2 text-sm font-mono uppercase tracking-wider transition-colors relative top-[2px] ${
                view === v 
                  ? 'border-brand-neonBlue text-brand-neonBlue' 
                  : 'border-transparent text-gray-500 hover:text-gray-300'
              }`}
            >
              {v === MetricView.VIEWS && (
                 <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" /></svg>
              )}
              {v === MetricView.INTERACTIONS && (
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" /></svg>
              )}
              {v}
            </button>
          ))}
        </div>

        {renderContent()}

      </main>

      <ChatWidget />
    </div>
  );
};

export default App;