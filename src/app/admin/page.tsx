"use client";

import { PieChart, Pie, Cell, BarChart, Bar, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer } from "recharts";
import styles from "./page.module.css";
import { Users, TrendingUp, AlertTriangle, Store } from "lucide-react";

export default function AdminDashboard() {
  const allergyData = [
    { name: "Milk", value: 400 },
    { name: "Peanut", value: 300 },
    { name: "Egg", value: 300 },
    { name: "Gluten", value: 200 },
  ];
  const COLORS = ["#f97316", "#ef4444", "#f59e0b", "#10b981"];

  const revenueData = [
    { name: "Mon", revenue: 4000 },
    { name: "Tue", revenue: 3000 },
    { name: "Wed", revenue: 5000 },
    { name: "Thu", revenue: 4500 },
    { name: "Fri", revenue: 7000 },
    { name: "Sat", revenue: 9000 },
    { name: "Sun", revenue: 8500 },
  ];

  return (
    <main className={`container ${styles.main}`}>
      <h1 className="heading-2" style={{ marginBottom: "2rem" }}>Admin Dashboard</h1>

      <div className={styles.statsGrid}>
        <div className={`glass-panel ${styles.statCard}`}>
          <div className={styles.iconBox} style={{ background: "var(--primary-light)", color: "var(--primary)" }}>
            <Users size={24} />
          </div>
          <div>
            <p className="text-muted">Total Users</p>
            <h3>12,450</h3>
          </div>
        </div>
        <div className={`glass-panel ${styles.statCard}`}>
          <div className={styles.iconBox} style={{ background: "rgba(16, 185, 129, 0.1)", color: "var(--secondary)" }}>
            <TrendingUp size={24} />
          </div>
          <div>
            <p className="text-muted">Total Orders</p>
            <h3>45,210</h3>
          </div>
        </div>
        <div className={`glass-panel ${styles.statCard}`}>
          <div className={styles.iconBox} style={{ background: "rgba(239, 68, 68, 0.1)", color: "var(--danger)" }}>
            <AlertTriangle size={24} />
          </div>
          <div>
            <p className="text-muted">Allergy Alerts Avoided</p>
            <h3>8,390</h3>
          </div>
        </div>
        <div className={`glass-panel ${styles.statCard}`}>
          <div className={styles.iconBox} style={{ background: "rgba(245, 158, 11, 0.1)", color: "var(--warning)" }}>
            <Store size={24} />
          </div>
          <div>
            <p className="text-muted">Active Restaurants</p>
            <h3>154</h3>
          </div>
        </div>
      </div>

      <div className={styles.chartsGrid}>
        <div className={`glass-panel ${styles.chartContainer}`}>
          <h3 className="heading-3" style={{ marginBottom: "1rem" }}>Most Common Allergies</h3>
          <div style={{ width: "100%", height: 300 }}>
            <ResponsiveContainer>
              <PieChart>
                <Pie
                  data={allergyData}
                  innerRadius={60}
                  outerRadius={100}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {allergyData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className={`glass-panel ${styles.chartContainer}`}>
          <h3 className="heading-3" style={{ marginBottom: "1rem" }}>Weekly Revenue</h3>
          <div style={{ width: "100%", height: 300 }}>
            <ResponsiveContainer>
              <BarChart data={revenueData}>
                <XAxis dataKey="name" stroke="var(--muted)" />
                <YAxis stroke="var(--muted)" />
                <Tooltip cursor={{ fill: "var(--muted-bg)" }} />
                <Bar dataKey="revenue" fill="var(--primary)" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </main>
  );
}
