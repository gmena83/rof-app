"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";
import styles from "./login.module.css";

export default function LoginPage() {
    const router = useRouter();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    async function handleSubmit(e: React.FormEvent) {
        e.preventDefault();
        setError("");
        setLoading(true);

        try {
            const { error: authError } = await supabase.auth.signInWithPassword({
                email,
                password,
            });
            if (authError) {
                setError(authError.message);
            } else {
                router.push("/dashboard");
            }
        } catch {
            setError("An unexpected error occurred. Please try again.");
        } finally {
            setLoading(false);
        }
    }

    return (
        <div className={styles.wrapper}>
            <div className={styles.card}>
                <div className={styles.header}>
                    <span className={styles.icon}>☀️</span>
                    <h1>Welcome Back</h1>
                    <p className="text-muted">Sign in to your Raya Opportunity Finder account</p>
                </div>

                {error && <div className={styles.error}>{error}</div>}

                <form onSubmit={handleSubmit} className={styles.form}>
                    <div>
                        <label className="label" htmlFor="email">Email</label>
                        <input
                            id="email"
                            type="email"
                            className="input"
                            placeholder="meghan@rayapower.com"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                    </div>
                    <div>
                        <label className="label" htmlFor="password">Password</label>
                        <input
                            id="password"
                            type="password"
                            className="input"
                            placeholder="••••••••"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                    </div>
                    <button type="submit" className="btn btn-primary btn-lg" disabled={loading} style={{ width: "100%" }}>
                        {loading ? "Signing in…" : "Sign In"}
                    </button>
                </form>

                <p className={styles.footer}>
                    Don&apos;t have an account?{" "}
                    <Link href="/register" className={styles.link}>Create one</Link>
                </p>
            </div>
        </div>
    );
}
