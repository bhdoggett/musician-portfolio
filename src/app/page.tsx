import Link from "next/link";
import styles from "./page.module.css";

export default function Home() {
  return (
    <div className={styles.page}>
      <main className={styles.main}>
        <div className={styles.intro}>
          <h1>Welcome</h1>
          <p>
            A collection of musical works exploring faith, worship, and the
            depths of God's love.
          </p>
        </div>

        <div className={styles.ctas}>
          <Link
            href="/discography"
            className={`btn btn-primary ${styles.primary}`}
          >
            View Discography
          </Link>
        </div>
      </main>
    </div>
  );
}
