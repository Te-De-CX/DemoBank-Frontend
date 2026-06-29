"use client";

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { Transaction } from "@/types";

export function SpendingChart({ transactions }: { transactions: Transaction[] }) {
  // Group by month (simplified)
  const monthlyData: Record<string, number> = {};
  transactions?.forEach((t) => {
    const month = new Date(t.created_at).toLocaleString("default", { month: "short" });
    monthlyData[month] = (monthlyData[month] || 0) + t.amount;
  });

  const data = Object.entries(monthlyData).map(([name, amount]) => ({
    name,
    amount,
  }));

  return (
    <div className="glass-card p-4">
      <h3 className="text-lg font-semibold mb-4">Monthly Spending</h3>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Bar dataKey="amount" fill="hsl(var(--primary))" radius={[4, 4, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}