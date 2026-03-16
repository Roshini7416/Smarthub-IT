import React from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const TempChart = ({ data }) => {
    return (
        <div style={{ 
            backgroundColor: '#0b1120', 
            padding: '20px', 
            borderRadius: '12px', 
            marginTop: '30px',
            border: '1px solid #1e293b'
        }}>
            <h3 style={{ color: '#94a3b8', fontSize: '12px', marginBottom: '20px', letterSpacing: '1px' }}>
                CONSUMPTION_HISTORY
            </h3>
            <ResponsiveContainer width="100%" height={300}>
                <AreaChart data={data}>
                    <defs>
                        <linearGradient id="colorCyan" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor="#22d3ee" stopOpacity={0.3}/>
                            <stop offset="95%" stopColor="#22d3ee" stopOpacity={0}/>
                        </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" vertical={false} />
                    <XAxis 
                        dataKey="recorded_at" 
                        stroke="#64748b" 
                        fontSize={12} 
                        tickLine={false} 
                        axisLine={false} 
                    />
                    <YAxis 
                        stroke="#64748b" 
                        fontSize={12} 
                        tickLine={false} 
                        axisLine={false} 
                    />
                    <Tooltip 
                        contentStyle={{ backgroundColor: '#1e293b', border: 'none', borderRadius: '8px', color: '#fff' }}
                        itemStyle={{ color: '#22d3ee' }}
                    />
                    <Area 
                        type="monotone" 
                        dataKey="temp_value" 
                        stroke="#22d3ee" 
                        strokeWidth={3} 
                        fillOpacity={1} 
                        fill="url(#colorCyan)" 
                    />
                </AreaChart>
            </ResponsiveContainer>
        </div>
    );
};

export default TempChart;