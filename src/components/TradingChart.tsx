
import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Area, AreaChart } from 'recharts';

const data = [
  { time: '09:00', value: 100000, pnl: 0 },
  { time: '10:00', value: 101200, pnl: 1200 },
  { time: '11:00', value: 99800, pnl: -200 },
  { time: '12:00', value: 102500, pnl: 2500 },
  { time: '13:00', value: 104200, pnl: 4200 },
  { time: '14:00', value: 103100, pnl: 3100 },
  { time: '15:00', value: 105800, pnl: 5800 },
  { time: '16:00', value: 107200, pnl: 7200 },
  { time: '17:00', value: 106500, pnl: 6500 },
  { time: '18:00', value: 108900, pnl: 8900 },
  { time: '19:00', value: 112400, pnl: 12400 },
];

export const TradingChart = () => {
  return (
    <div className="w-full h-64 sm:h-80">
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart data={data}>
          <defs>
            <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.3}/>
              <stop offset="95%" stopColor="#3b82f6" stopOpacity={0}/>
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" stroke="#475569" />
          <XAxis 
            dataKey="time" 
            axisLine={false}
            tickLine={false}
            tick={{ fill: '#94a3b8', fontSize: 10 }}
            interval="preserveStartEnd"
          />
          <YAxis 
            axisLine={false}
            tickLine={false}
            tick={{ fill: '#94a3b8', fontSize: 10 }}
            tickFormatter={(value) => `$${(value / 1000).toFixed(0)}k`}
            width={40}
          />
          <Tooltip 
            contentStyle={{
              backgroundColor: '#1e293b',
              border: '1px solid #475569',
              borderRadius: '8px',
              color: '#f1f5f9',
              fontSize: '12px'
            }}
            formatter={(value, name) => [
              `$${Number(value).toLocaleString()}`,
              name === 'value' ? 'Portfolio Wert' : 'P&L'
            ]}
          />
          <Area
            type="monotone"
            dataKey="value"
            stroke="#3b82f6"
            strokeWidth={2}
            fillOpacity={1}
            fill="url(#colorValue)"
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
};
