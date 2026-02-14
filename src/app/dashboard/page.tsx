"use client";

import Link from "next/link";
import Sidebar from "@/components/Sidebar";
import styles from "./dashboard.module.css";

/* ─── Mock data (will be replaced by Supabase queries) ─── */
const STATS = [
    { label: "Total Opportunities", value: 5, icon: "🔍", color: "#ffd700" },
    { label: "Pending Review", value: 4, icon: "⏳", color: "#ff6347" }, // 4 New/Pending
    { label: "Applied", value: 1, icon: "📤", color: "#3cb371" }, // 1 Applied (CleanTech)
    { label: "Funded", value: 0, icon: "🏆", color: "#ffd700" },
];

const MOCK_OPPORTUNITIES = [
    {
        id: "1",
        name: "DOE Solar Energy Innovation Grant",
        source: "energy.gov - Office of Energy Efficiency",
        deadline: "2026-04-15",
        priority: 5,
        status: "new",
    },
    {
        id: "2",
        name: "CleanTech Open Western Region",
        source: "cleantechopen.org",
        deadline: "2026-03-30",
        priority: 5, // Bumped priority
        status: "applied",
    },
    {
        id: "3",
        name: "SunShot Initiative – Series B",
        source: "energy.gov",
        deadline: "2026-05-01",
        priority: 4,
        status: "new",
    },
    {
        id: "4",
        name: "California Energy Commission EPIC",
        source: "energy.ca.gov",
        deadline: "2026-03-20",
        priority: 4,
        status: "new",
    },
    {
        id: "5",
        name: "ARPA-E SCALEUP Award",
        source: "arpa-e.energy.gov",
        deadline: "2026-06-10",
        priority: 3,
        status: "new",
    },
];

function statusBadge(status: string) {
    const map: Record<string, string> = {
        new: "badge-new",
        applied: "badge-applied",
        won: "badge-won",
        lost: "badge-lost",
        pending: "badge-pending",
    };
    return `badge ${map[status] || "badge-pending"}`;
}

function renderStars(count: number) {
    return (
        <span className="priority-stars">
            {[1, 2, 3, 4, 5].map((n) => (
                <span key={n} className={`star ${n <= count ? "active" : ""}`}>
                    ★
                </span>
            ))}
        </span>
    );
}

export default function DashboardPage() {
    return (
        <div className={styles.layout}>
            <Sidebar stats={{ total: 5, pending: 4, applied: 1 }} />

            <div className={`${styles.main} animate-fade-in`}>
                <div className={`${styles.header} animate-slide-up`}>
                    <div>
                        <h1>Dashboard</h1>
                        <p className="text-muted">
                            Welcome back! Here&apos;s your funding opportunity overview.
                        </p>
                    </div>
                    <button className="btn btn-primary">🔍 Run Weekly Search</button>
                </div>

                {/* Stats cards */}
                <div className={`${styles.statsGrid} animate-slide-up animate-delay-1`}>
                    {STATS.map((stat) => (
                        <div className="card" key={stat.label}>
                            <div className={styles.statIcon} style={{ background: stat.color + "22" }}>
                                <span>{stat.icon}</span>
                            </div>
                            <span className={styles.statValue}>{stat.value}</span>
                            <span className={styles.statLabel}>{stat.label}</span>
                        </div>
                    ))}
                </div>

                {/* Recent opportunities */}
                <div className={`${styles.section} animate-slide-up animate-delay-2`}>
                    <div className={styles.sectionHeader}>
                        <h2>Recent Opportunities</h2>
                        <Link href="/opportunities" className="btn btn-secondary btn-sm">
                            View All →
                        </Link>
                    </div>

                    <div className={styles.table}>
                        <div className={styles.tableHeader}>
                            <span>Opportunity</span>
                            <span>Source</span>
                            <span>Deadline</span>
                            <span>Priority</span>
                            <span>Status</span>
                            <span></span>
                        </div>
                        {MOCK_OPPORTUNITIES.map((opp) => (
                            <div className={styles.tableRow} key={opp.id}>
                                <span className={styles.oppName}>{opp.name}</span>
                                <span className="text-muted">{opp.source}</span>
                                <span>{opp.deadline}</span>
                                <span>{renderStars(opp.priority)}</span>
                                <span>
                                    <span className={statusBadge(opp.status)}>{opp.status}</span>
                                </span>
                                <span>
                                    <Link href={`/opportunities/${opp.id}`} className="btn btn-secondary btn-sm">
                                        View
                                    </Link>
                                </span>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Quick actions */}
                <div className={`${styles.section} animate-slide-up animate-delay-3`}>
                    <h2>Quick Actions</h2>
                    <div className={styles.actions}>
                        <button className="btn btn-accent">📊 Open Google Sheet</button>
                        <button className="btn btn-secondary">📁 Open Google Drive</button>
                        <button className="btn btn-secondary">📧 Send Weekly Report</button>
                    </div>
                </div>
            </div>
        </div>
    );
}
