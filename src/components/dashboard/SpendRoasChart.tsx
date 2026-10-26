'use client';

import React from 'react';
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
} from 'recharts';

interface SpendRoasChartProps {
  data: { month: string; spend: number; roas: string }[];
}

export default function SpendRoasChart({ data }: SpendRoasChartProps) {
  return (
    <div className="h-56 w-full pt-1">
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart data={data} margin={{ top: 10, right: 10, left: -15, bottom: 0 }}>
          <defs>
            <linearGradient id="brandSpendGrad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#7456F1" stopOpacity={0.2} />
              <stop offset="100%" stopColor="#7456F1" stopOpacity={0.0} />
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#F4F4F5" />
          <XAxis dataKey="month" stroke="#71717A" fontSize={11} tickLine={false} axisLine={false} />
          <YAxis
            stroke="#71717A"
            fontSize={11}
            tickLine={false}
            axisLine={false}
            tickFormatter={(val) => `₹${val / 1000}k`}
          />
          <Tooltip
            formatter={(val: any, name: any, item: any) => [
              `₹${Number(val).toLocaleString('en-IN')} (ROAS: ${item.payload.roas})`,
              'Monthly Spend',
            ]}
            contentStyle={{
              backgroundColor: '#17171C',
              borderRadius: '8px',
              border: 'none',
              color: '#FFFFFF',
              fontSize: '12px',
              fontWeight: '600',
            }}
          />
          <Area
            type="monotone"
            dataKey="spend"
            stroke="#7456F1"
            strokeWidth={2.5}
            fill="url(#brandSpendGrad)"
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}
