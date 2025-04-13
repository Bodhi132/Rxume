"use client";
import styles from './page.module.scss'
import Index from './components/LandingParallax';
import { MdKeyboardDoubleArrowDown } from "react-icons/md";
import Image from 'next/image';
import Footer from './components/Footer';

export default function Home() {

  return (
    <div className="min-h-screen bg-yellow-100 bg-[radial-gradient(#444_1px,transparent_1px)] bg-[length:10px_10px]">
      <div className="flex flex-col justify-center items-center p-10 font-comic">
        <Image src="/images/rxume-logo.png" alt="Rxume Logo" width={300} height={300} />

        <div className="text-center mt-8 space-y-6">
          <h1 className="text-6xl md:text-8xl text-red-600 font-bold drop-shadow-[3px_3px_0_#000] skew-y-1">
            Build Smarter Resumes
          </h1>
          <h2 className="text-4xl md:text-5xl text-black font-bold opacity-80 drop-shadow-[2px_2px_0_#000] -rotate-1">
            Tailored for Every Job
          </h2>

          <div className="mt-12 flex flex-col items-center gap-3">
            <h3 className="text-xl md:text-2xl font-bold opacity-80 text-black drop-shadow-[1px_1px_0_#000]">Get started now</h3>
            <MdKeyboardDoubleArrowDown className="text-5xl text-black animate-bounce" />
          </div>
        </div>
      </div>
      <main className={styles.main}>
        <Index />
      </main>
      <Footer />
    </div>
  );
}
