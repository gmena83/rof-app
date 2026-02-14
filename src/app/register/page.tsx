"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";
import styles from "../login/login.module.css";

export default function RegisterPage() {
    const router = useRouter();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirm, setConfirm] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    async function handleSubmit(e: React.FormEvent) {
        e.preventDefault();
        setError("");

        if (password !== confirm) {
            setError("Passwords do not match.");
            return;
        }

        setLoading(true);

        try {
            const { error: authError } = await supabase.auth.signUp({
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
                    <h1>Create Account</h1>
                    <p className="text-muted">
                        Join Raya Opportunity Finder and start discovering funding
                    </p>
                </div>

                {error && <div className={styles.error}>{error}</div>}

                <form onSubmit={handleSubmit} className={styles.form}>
                    <div>
                        <label className="label" htmlFor="email">Email</label>
                        <input
                            id="email"
                            type="email"
                            className="input"
                            placeholder="you@company.com"
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
                            minLength={6}
                        />
                    </div>
                    <div>
                        <label className="label" htmlFor="confirm">Confirm Password</label>
                        <input
                            id="confirm"
                            type="password"
                            className="input"
                            placeholder="••••••••"
                            value={confirm}
                            onChange={(e) => setConfirm(e.target.value)}
                            required
                            minLength={6}
                        />
                    </div>
                    <button
                        type="submit"
                        className="btn btn-primary btn-lg"
                        disabled={loading}
                        style={{ width: "100%" }}
                    >
                        {loading ? "Creating account…" : "Create Account"}
                    </button>
                </form>

                <p className={styles.footer}>
                    Already have an account?{" "}
                    <Link href="/login" className={styles.link}>Sign in</Link>
                </p>
            </div>
        </div>
    );
}
