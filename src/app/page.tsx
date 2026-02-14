import Link from "next/link";
import styles from "./page.module.css";

export default function Home() {
  return (
    <div className={styles.hero}>
      {/* Decorative sun rays */}
      <div className={styles.rays} />

      <div className={styles.content}>
        <span className={styles.badge}>☀️ Funding Made Simple</span>
        <h1 className={styles.title}>
          Discover Solar Funding
          <br />
          <span className={styles.highlight}>Opportunities, Automatically</span>
        </h1>
        <p className={styles.subtitle}>
          The Raya Opportunity Finder automates your search for grants,
          investments, and funding programs. Get weekly curated opportunities,
          comprehensive documentation, and tailored application guidance — all in
          one place.
        </p>
        <div className={styles.ctas}>
          <Link href="/login" className="btn btn-primary btn-lg">
            Get Started →
          </Link>
          <Link href="/dashboard" className="btn btn-secondary btn-lg">
            View Dashboard
          </Link>
        </div>

        {/* Feature highlights */}
        <div className={styles.features}>
          <div className={styles.feature}>
            <span className={styles.featureIcon}>🔍</span>
            <h3>Weekly Research</h3>
            <p>Automated discovery across grant databases, investment platforms, and government programs.</p>
          </div>
          <div className={styles.feature}>
            <span className={styles.featureIcon}>📋</span>
            <h3>Smart Documentation</h3>
            <p>Legal docs, past winners, social media activity — gathered and organized automatically.</p>
          </div>
          <div className={styles.feature}>
            <span className={styles.featureIcon}>✍️</span>
            <h3>Application Assistance</h3>
            <p>Tailored suggestions that match your company profile and communication style.</p>
          </div>
          <div className={styles.feature}>
            <span className={styles.featureIcon}>📊</span>
            <h3>Progress Tracking</h3>
            <p>Google Sheets integration keeps every deadline, status, and outcome at your fingertips.</p>
          </div>
        </div>
      </div>
    </div>
  );
}
