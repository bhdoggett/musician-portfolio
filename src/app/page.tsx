import Link from "next/link";
import styles from "./page.module.css";
import { NavBar } from "../components/NavBar/NavBar";

export default function Home() {
  return (
    <div>
      <NavBar />
      <main className={styles.main}>
        <div className={styles.intro}>
          <h1>Ben Doggett</h1>
          <p></p>
        </div>

        <div className={styles.ctas}>
          <Link
            href="/discography"
            className={`btn btn-primary ${styles.primary}`}
          >
            Releases
          </Link>
          <Link
            href="/reminisce"
            className={`btn btn-primary ${styles.primary}`}
          >
            Reminisce
          </Link>
        </div>
      </main>
    </div>
  );
}
