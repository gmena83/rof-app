import styles from "./Footer.module.css";

export default function Footer() {
    return (
        <footer className={styles.footer}>
            <div className={styles.inner}>
                <p className={styles.copy}>
                    &copy; {new Date().getFullYear()} Raya Opportunity Finder &mdash; Powered
                    by{" "}
                    <a
                        href="https://rayapower.com"
                        target="_blank"
                        rel="noopener noreferrer"
                        className={styles.link}
                    >
                        Raya Power
                    </a>
                </p>
                <p className={styles.tagline}>Solar that works for you.</p>
            </div>
        </footer>
    );
}
