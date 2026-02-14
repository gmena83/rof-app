"use client";

import { useState } from "react";
import Link from "next/link";
import Sidebar from "@/components/Sidebar";
import styles from "./opportunities.module.css";

/* ─── Mock Data ─── */
const MOCK_OPPORTUNITIES = [
    {
        id: "1",
        name: "DOE Solar Energy Innovation Grant",
        source: "energy.gov",
        deadline: "2026-04-15",
        priority: 5,
        status: "new",
        summary: "Funding for next-gen solar cell efficiency research.",
    },
    {
        id: "2",
        name: "CleanTech Open Western Region",
        source: "cleantechopen.org",
        deadline: "2026-03-30",
        priority: 5,
        status: "applied",
        summary: "Accelerator program with non-dilutive funding prize.",
    },
    {
        id: "3",
        name: "SunShot Initiative – Series B",
        source: "energy.gov",
        deadline: "2026-05-01",
        priority: 4,
        status: "new",
        summary: "Commercialization support for solar software startups.",
    },
    {
        id: "4",
        name: "California Energy Commission EPIC",
        source: "energy.ca.gov",
        deadline: "2026-03-20",
        priority: 4,
        status: "new",
        summary: "Grant for energy storage integration pilot projects.",
    },
    {
        id: "5",
        name: "ARPA-E SCALEUP Award",
        source: "arpa-e.energy.gov",
        deadline: "2026-06-10",
        priority: 3,
        status: "new",
        summary: "Scale-up funding for proven high-impact technologies.",
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

export default function OpportunitiesPage() {
    const [filter, setFilter] = useState("all");

    const filtered = MOCK_OPPORTUNITIES.filter(
        (o) => filter === "all" || o.status === filter
    );

    return (
        <div className={styles.layout}>
            <Sidebar stats={{ total: 5, pending: 4, applied: 1 }} />

            <div className={`${styles.main} animate-fade-in`}>
                <div className={`${styles.header} animate-slide-up`}>
                    <div>
                        <h1>All Opportunities</h1>
                        <p className="text-muted">
                            Manage and track your funding pipeline.
                        </p>
                    </div>
                    <Link href="/dashboard" className="btn btn-secondary btn-sm">
                        ← Back to Dashboard
                    </Link>
                </div>

                {/* Filters */}
                <div className={`${styles.filters} animate-slide-up animate-delay-1`}>
                    {["all", "new", "applied", "won", "lost"].map((s) => (
                        <button
                            key={s}
                            className={`${styles.filterBtn} ${filter === s ? styles.activeFilter : ""
                                }`}
                            onClick={() => setFilter(s)}
                        >
                            {s.charAt(0).toUpperCase() + s.slice(1)}
                        </button>
                    ))}
                </div>

                {/* List */}
                <div className={`${styles.list} animate-slide-up animate-delay-2`}>
                    {filtered.length === 0 ? (
                        <div className={styles.emptyState}>
                            <span style={{ fontSize: "2rem" }}>📭</span>
                            <p>No opportunities found for this filter.</p>
                        </div>
                    ) : (
                        filtered.map((opp) => (
                            <div key={opp.id} className={styles.card}>
                                <div className={styles.cardHeader}>
                                    <div className={styles.topRow}>
                                        <span className={statusBadge(opp.status)}>{opp.status}</span>
                                        <span className="text-muted" style={{ fontSize: "0.85rem" }}>
                                            Deadline: <strong>{opp.deadline}</strong>
                                        </span>
                                    </div>
                                    <Link href={`/opportunities/${opp.id}`} className={styles.titleLink}>
                                        <h3>{opp.name}</h3>
                                    </Link>
                                    <p className={styles.source}>{opp.source}</p>
                                </div>

                                <div className={styles.cardBody}>
                                    <p className={styles.summary}>{opp.summary}</p>
                                </div>

                                <div className={styles.cardFooter}>
                                    <div className="priority-stars">
                                        {[1, 2, 3, 4, 5].map((n) => (
                                            <span key={n} className={`star ${n <= opp.priority ? "active" : ""}`}>
                                                ★
                                            </span>
                                        ))}
                                    </div>
                                    <Link href={`/opportunities/${opp.id}`} className="btn btn-secondary btn-sm">
                                        View Details
                                    </Link>
                                </div>
                            </div>
                        ))
                    )}
                </div>
            </div>
        </div>
    );
}
