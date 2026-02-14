"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import styles from "./Sidebar.module.css";

const MENU_ITEMS = [
    { href: "/dashboard", label: "Dashboard", icon: "📊" },
    { href: "/opportunities", label: "Opportunities", icon: "🔍" },
    { href: "/opportunities?status=applied", label: "Applied", icon: "📤" },
    { href: "/opportunities?status=won", label: "Won", icon: "🏆" },
    { href: "/settings", label: "Settings", icon: "⚙️" },
];

interface SidebarProps {
    stats?: { total: number; pending: number; applied: number };
}

export default function Sidebar({ stats }: SidebarProps) {
    const pathname = usePathname();
    const [collapsed, setCollapsed] = useState(false);

    return (
        <aside className={`${styles.sidebar} ${collapsed ? styles.collapsed : ""}`}>
            <button
                className={styles.toggle}
                onClick={() => setCollapsed(!collapsed)}
                title={collapsed ? "Expand" : "Collapse"}
            >
                {collapsed ? "»" : "«"}
            </button>

            <nav className={styles.nav}>
                {MENU_ITEMS.map((item) => (
                    <Link
                        key={item.href}
                        href={item.href}
                        className={`${styles.item} ${pathname === item.href.split("?")[0] ? styles.active : ""
                            }`}
                    >
                        <span className={styles.icon}>{item.icon}</span>
                        {!collapsed && <span className={styles.label}>{item.label}</span>}
                    </Link>
                ))}
            </nav>

            {!collapsed && stats && (
                <div className={styles.stats}>
                    <div className={styles.stat}>
                        <span className={styles.statValue}>{stats.total}</span>
                        <span className={styles.statLabel}>Total</span>
                    </div>
                    <div className={styles.stat}>
                        <span className={styles.statValue}>{stats.pending}</span>
                        <span className={styles.statLabel}>Pending</span>
                    </div>
                    <div className={styles.stat}>
                        <span className={styles.statValue}>{stats.applied}</span>
                        <span className={styles.statLabel}>Applied</span>
                    </div>
                </div>
            )}
        </aside>
    );
}
