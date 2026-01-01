"use client"

import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from "recharts"

const data = [
  { month: "Jan", newMembers: 45, renewals: 32 },
  { month: "Feb", newMembers: 52, renewals: 38 },
  { month: "Mar", newMembers: 48, renewals: 35 },
  { month: "Apr", newMembers: 61, renewals: 42 },
  { month: "May", newMembers: 68, renewals: 45 },
  { month: "Jun", newMembers: 75, renewals: 48 },
]

export function MembershipChart() {
  return (
    <div className="rounded-lg border border-orange-500/20 bg-black/40 p-6">
      <div className="mb-4 flex items-center gap-2">
        <svg className="h-5 w-5 text-orange-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
        </svg>
        <h3 className="text-lg font-semibold text-white">Membership Growth</h3>
      </div>
      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" stroke="#333" />
          <XAxis dataKey="month" stroke="#666" />
          <YAxis stroke="#666" />
          <Tooltip
            contentStyle={{
              backgroundColor: "#000",
              border: "1px solid #333",
              borderRadius: "8px",
              color: "#fff",
            }}
          />
          <Legend />
          <Line type="monotone" dataKey="newMembers" stroke="#f97316" strokeWidth={2} name="New Members" />
          <Line type="monotone" dataKey="renewals" stroke="#06b6d4" strokeWidth={2} name="Renewals" />
        </LineChart>
      </ResponsiveContainer>
    </div>
  )
}
