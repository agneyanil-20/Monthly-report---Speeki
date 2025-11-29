import React from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, Legend } from 'recharts';
import { ChartDataPoint } from '../types';

interface SimplePieChartProps {
  data: ChartDataPoint[];
  title?: string;
}

export const SimplePieChart: React.FC<SimplePieChartProps> = ({ data, title }) => {
  return (
    <div className="h-64 w-full relative">
       {title && <h4 className="text-center text-sm font-mono text-gray-400 mb-2">{title}</h4>}
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            innerRadius={60}
            outerRadius={80}
            paddingAngle={5}
            dataKey="value"
          >
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={entry.fill || (index % 2 === 0 ? '#ff007f' : '#ccff00')} stroke="none" />
            ))}
          </Pie>
          <Tooltip 
            contentStyle={{ backgroundColor: '#0f0f11', borderColor: '#333', borderRadius: '8px', fontFamily: 'monospace' }}
            itemStyle={{ color: '#fff' }}
          />
          <Legend verticalAlign="bottom" height={36} wrapperStyle={{ fontFamily: 'monospace', fontSize: '12px' }}/>
        </PieChart>
      </ResponsiveContainer>
      {/* Center Text overlay if needed */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <span className="text-xs text-gray-600 font-mono mt-[-20px]">Ratio</span>
      </div>
    </div>
  );
};

interface SimpleBarChartProps {
  data: ChartDataPoint[];
  color?: string;
  title?: string;
}

export const SimpleBarChart: React.FC<SimpleBarChartProps> = ({ data, color = '#00f3ff', title }) => {
  return (
    <div className="h-64 w-full">
        {title && <h4 className="text-center text-sm font-mono text-gray-400 mb-2">{title}</h4>}
      <ResponsiveContainer width="100%" height="100%">
        <BarChart
          data={data}
          layout="vertical"
          margin={{ top: 5, right: 30, left: 40, bottom: 5 }}
        >
          <XAxis type="number" hide />
          <YAxis 
            dataKey="name" 
            type="category" 
            width={80} 
            tick={{ fill: '#9ca3af', fontSize: 10, fontFamily: 'monospace' }} 
            axisLine={false}
            tickLine={false}
          />
          <Tooltip 
             cursor={{fill: 'transparent'}}
             contentStyle={{ backgroundColor: '#0f0f11', borderColor: '#333', borderRadius: '8px', fontFamily: 'monospace' }}
             itemStyle={{ color }}
          />
          <Bar dataKey="value" fill={color} radius={[0, 4, 4, 0]} barSize={20} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};