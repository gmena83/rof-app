"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import styles from "./Navbar.module.css";

const NAV_LINKS = [
    { href: "/dashboard", label: "Dashboard" },
    { href: "/opportunities", label: "Opportunities" },
    { href: "/settings", label: "Settings" },
];

export default function Navbar() {
    const pathname = usePathname();

    return (
        <header className={styles.header}>
            <div className={styles.inner}>
                <Link href="/" className={styles.logo}>
                    <span className={styles.logoIcon}>☀️</span>
                    <span className={styles.logoText}>Raya Opportunity Finder</span>
                </Link>

                <nav className={styles.nav}>
                    {NAV_LINKS.map((link) => (
                        <Link
                            key={link.href}
                            href={link.href}
                            className={`${styles.navLink} ${pathname.startsWith(link.href) ? styles.active : ""
                                }`}
                        >
                            {link.label}
                        </Link>
                    ))}
                </nav>

                <div className={styles.actions}>
                    <Link href="/login" className="btn btn-primary btn-sm">
                        Sign In
                    </Link>
                </div>
            </div>
        </header>
    );
}
