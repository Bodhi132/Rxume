"use client";
import styles from './page.module.scss'
import Index from './components/LandingParallax';

export default function Home() {

  return (
    <main className={styles.main}>
      <Index/>
    </main>
  );
}
