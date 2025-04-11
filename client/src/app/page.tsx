"use client";
import styles from './page.module.scss'
import Index from './components/LandingParallax';
import { MdKeyboardDoubleArrowDown } from "react-icons/md";
import Image from 'next/image';

export default function Home() {

  return (
    <div className=' bg-white scroll-smooth'>
      <div className='flex flex-col justify-center items-center'>
        <Image src="/images/rxume-logo.png" alt="Rxume Logo" width={500} height={500} />
        <div className='flex flex-col justify-center items-center gap-4'>
          <h1 className='text-8xl font-bold'>Build Smarter Resumes</h1>
          <h1 className='text-5xl font-bold opacity-75'>Tailored for Every Job</h1>
          <div className='flex flex-col justify-center items-center mt-9'>
            <h1 className='text-xl font-bold opacity-75'>Get started now</h1>
              <MdKeyboardDoubleArrowDown className='text-4xl animate-bounce mt-6' />
          </div>
        </div>
      </div>
      <main className={styles.main}>
        <Index />
      </main>
    </div>
  );
}
