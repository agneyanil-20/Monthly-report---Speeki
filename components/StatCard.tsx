import React from 'react';

interface StatCardProps {
  label: string;
  value: string | number;
  trend?: string;
  subLabel?: string;
  color?: 'pink' | 'green' | 'blue' | 'purple';
}

const StatCard: React.FC<StatCardProps> = ({ label, value, trend, subLabel, color = 'pink' }) => {
  const colorClasses = {
    pink: 'text-brand-neonPink border-brand-neonPink',
    green: 'text-brand-neonGreen border-brand-neonGreen',
    blue: 'text-brand-neonBlue border-brand-neonBlue',
    purple: 'text-brand-neonPurple border-brand-neonPurple',
  };

  const bgClasses = {
    pink: 'bg-brand-neonPink/5',
    green: 'bg-brand-neonGreen/5',
    blue: 'bg-brand-neonBlue/5',
    purple: 'bg-brand-neonPurple/5',
  };

  return (
    <div className={`p-6 rounded-xl border border-white/10 ${bgClasses[color]} transition-all hover:border-opacity-50 duration-300 relative overflow-hidden group`}>
       {/* Background decorative blob */}
      <div className={`absolute -right-4 -top-4 w-24 h-24 bg-gradient-to-br from-transparent to-current opacity-10 rounded-full blur-xl group-hover:opacity-20 transition-opacity ${colorClasses[color]}`}></div>
      
      <h3 className="text-gray-400 text-sm font-mono tracking-wider uppercase mb-2">{label}</h3>
      <div className="flex items-baseline gap-2">
        <span className={`text-3xl md:text-4xl font-bold font-sans ${colorClasses[color].split(' ')[0]}`}>
          {typeof value === 'number' ? value.toLocaleString() : value}
        </span>
        {trend && (
          <span className={`text-xs font-mono px-2 py-1 rounded bg-black/30 ${trend.startsWith('+') ? 'text-green-400' : 'text-red-400'}`}>
            {trend}
          </span>
        )}
      </div>
      {subLabel && <p className="text-xs text-gray-500 mt-2 font-mono">{subLabel}</p>}
    </div>
  );
};

export default StatCard;