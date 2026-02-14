"use client";

import { use } from "react";
import Link from "next/link";
import Sidebar from "@/components/Sidebar";
import styles from "./opportunityDisplay.module.css";
import { useState } from "react";

/* ─── Mock Data ─── */
const MOCK_OPPS: Record<string, any> = {
    // Default fallback for ID 1 and others
    default: {
        id: "1",
        name: "DOE Solar Energy Innovation Grant",
        source: "US Department of Energy (energy.gov)",
        deadline: "2026-04-15",
        priority: 5,
        status: "new",
        description: `The Solar Energy Innovation Grant is designed to accelerate the development of next-generation photovoltaic technologies.`,
        requirements: ["Must be a US-based entity.", "TRL 3-5.", "Concept paper due 30 days prior."],
        driveLink: "#",
        suggestions: ["Revise Executive Summary for scalability focus."],
    },
    // Rich data for CleanTech (ID 2)
    "2": {
        id: "2",
        name: "CleanTech Open Western Region",
        source: "cleantechopen.org",
        deadline: "2026-03-30",
        priority: 5,
        status: "applied",
        description: `
      CleanTech Open is the world's largest clean technology accelerator program. 
      The Western Region program provides intensive mentoring, training, and access to investors. 
      Raya Power is targeting the "Energy Generation" track.

      **Key Benefits:**
      - Access to 50+ mentors
      - Investor Connect events
      - $75k Grand Prize interaction
    `,
        requirements: [
            "Early-stage cleantech startup.",
            "Less than $10M in external funding.",
            "Incorporated in the US.",
            "At least 2 team members committed to the program.",
        ],
        driveLink: "#",
        suggestions: [
            "Highlight the 'Raya Home' pilot data in the 'Market Traction' section.",
            "Emphasize Nicole's previous exit in the Team bios.",
            "Ensure the pitch deck uses the 2026 updated financial projections.",
        ],
        // Documents for the mock Drive view
        documents: [
            { name: "Application_Draft_v3.pdf", type: "pdf", size: "2.4 MB", date: "2026-02-12" },
            { name: "Financial_Projections_2026.xlsx", type: "sheet", size: "1.1 MB", date: "2026-02-10" },
            { name: "CleanTech_Pitch_Deck.pptx", type: "slide", size: "14 MB", date: "2026-02-11" },
            { name: "Market_Research_Report.docx", type: "doc", size: "850 KB", date: "2026-02-08" },
        ],
        // Tracking info for mock Sheets view
        tracking: {
            status: "Submitted",
            dateApplied: "2026-02-13",
            nextStep: "Regional Finals (May 2026)",
            owner: "Meghan",
        },
    },
};

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

export default function OpportunityDetailPage({
    params,
}: {
    params: Promise<{ id: string }>;
}) {
    const resolvedParams = use(params);
    const opp = MOCK_OPPS[resolvedParams.id] || MOCK_OPPS.default;
    const isCleanTech = resolvedParams.id === "2";

    const [activeTab, setActiveTab] = useState("overview");

    return (
        <div className={styles.layout}>
            <Sidebar />

            <div className={`${styles.main} animate-fade-in`}>
                {/* Breadcrumb */}
                <div className={styles.nav}>
                    <Link href="/opportunities" className={styles.backLink}>
                        ← Back to Opportunities
                    </Link>
                </div>

                {/* Header */}
                <div className={`${styles.header} animate-slide-up`}>
                    <div>
                        <div className={styles.metaRow}>
                            <span className={statusBadge(opp.status)}>{opp.status}</span>
                            <span className="priority-stars">
                                {[1, 2, 3, 4, 5].map((n) => (
                                    <span key={n} className={`star ${n <= opp.priority ? "active" : ""}`}>
                                        ★
                                    </span>
                                ))}
                            </span>
                        </div>
                        <h1>{opp.name}</h1>
                        <p className="text-muted">{opp.source}</p>
                    </div>
                    <div className={styles.actions}>
                        <a href="#" className="btn btn-primary">
                            📁 Open Drive Folder
                        </a>
                        <button className="btn btn-secondary">📝 Edit Notes</button>
                    </div>
                </div>

                {/* Rich Tabs for Demo */}
                {isCleanTech && (
                    <div className={`${styles.tabs} animate-slide-up animate-delay-1`}>
                        <button
                            className={`${styles.tab} ${activeTab === "overview" ? styles.activeTab : ""}`}
                            onClick={() => setActiveTab("overview")}
                        >
                            Overview
                        </button>
                        <button
                            className={`${styles.tab} ${activeTab === "documents" ? styles.activeTab : ""}`}
                            onClick={() => setActiveTab("documents")}
                        >
                            Documents (4)
                        </button>
                        <button
                            className={`${styles.tab} ${activeTab === "tracking" ? styles.activeTab : ""}`}
                            onClick={() => setActiveTab("tracking")}
                        >
                            Tracking
                        </button>
                    </div>
                )}

                <div className={`${styles.grid} animate-slide-up animate-delay-2`}>
                    {/* LEFT COL */}
                    <div className={styles.leftCol}>
                        {activeTab === "overview" && (
                            <>
                                <div className="card mb-3 animate-fade-in">
                                    <h3>Description</h3>
                                    <p className={styles.description}>{opp.description}</p>
                                </div>

                                <div className="card animate-fade-in">
                                    <h3>Requirements & Eligibility</h3>
                                    <ul className={styles.reqList}>
                                        {opp.requirements.map((req: string, i: number) => (
                                            <li key={i}>{req}</li>
                                        ))}
                                    </ul>
                                </div>
                            </>
                        )}

                        {/* MOCK DRIVE VIEW */}
                        {activeTab === "documents" && (
                            <div className="card animate-fade-in">
                                <div className={styles.driveHeader}>
                                    <h3>📁 Google Drive / Raya Power / {opp.name}</h3>
                                </div>
                                <div className={styles.fileList}>
                                    {opp.documents?.map((doc: any, i: number) => (
                                        <div key={i} className={styles.fileRow}>
                                            <span className={styles.fileIcon}>
                                                {doc.type === "pdf" ? "📕" : doc.type === "sheet" ? "📊" : doc.type === "slide" ? "📙" : "📄"}
                                            </span>
                                            <div className={styles.fileInfo}>
                                                <div className={styles.fileName}>{doc.name}</div>
                                                <div className={styles.fileMeta}>
                                                    {doc.size} • Last modified {doc.date}
                                                </div>
                                            </div>
                                            <button className="btn btn-sm btn-secondary">Open</button>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}

                        {/* MOCK SHEETS VIEW */}
                        {activeTab === "tracking" && (
                            <div className="card animate-fade-in">
                                <div className={styles.sheetHeader}>
                                    <h3>📊 Internal Tracking Sheet</h3>
                                    <span className="badge badge-applied">Live Sync</span>
                                </div>
                                <div className={styles.sheetContainer}>
                                    <table className={styles.sheetTable}>
                                        <thead>
                                            <tr>
                                                <th>Status</th>
                                                <th>Date Applied</th>
                                                <th>Owner</th>
                                                <th>Next Step</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            <tr>
                                                <td>
                                                    <span className={styles.sheetCellStatus}>{opp.tracking?.status}</span>
                                                </td>
                                                <td>{opp.tracking?.dateApplied}</td>
                                                <td>{opp.tracking?.owner}</td>
                                                <td>{opp.tracking?.nextStep}</td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        )}
                    </div>

                    {/* RIGHT COL (Always visible) */}
                    <div className={styles.rightCol}>
                        <div className={`card ${styles.aiCard} mb-3`}>
                            <div className={styles.aiHeader}>
                                <span style={{ fontSize: "1.2rem" }}>✨</span>
                                <h3>AI Suggestions</h3>
                            </div>
                            <ul className={styles.suggestionList}>
                                {opp.suggestions.map((s: string, i: number) => (
                                    <li key={i}>{s}</li>
                                ))}
                            </ul>
                            <button className="btn btn-sm btn-secondary" style={{ width: "100%", marginTop: "12px" }}>
                                Generate New Suggestion
                            </button>
                        </div>

                        <div className="card">
                            <h3>Key Dates</h3>
                            <div className={styles.dateItem}>
                                <span className={styles.dateLabel}>Deadline</span>
                                <span className={styles.dateValue} style={{ color: "#d97706" }}>
                                    {opp.deadline}
                                </span>
                            </div>
                            <div className={styles.dateItem}>
                                <span className={styles.dateLabel}>Internal Review</span>
                                <span className={styles.dateValue}>2026-03-25</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
