"use client"
import React from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { usePathname } from 'next/navigation';
import { FaFileSignature } from "react-icons/fa6";
import { GiUpgrade } from "react-icons/gi";
import { SiGoogleanalytics } from "react-icons/si";

const Sidebar = () => {

    const pathname = usePathname()

    return (
        <div className='lg:w-64 md:w-56 sm:w-48 w-40 h-screen flex flex-col items-center bg-white rounded-r-3xl sticky top-0'>
            <h1 className=' w-4/5 h-1/5 flex justify-center items-center'>
                <Image src="/images/rxume-logo.png" alt="Logo" width={200} height={200} className=''/>
            </h1>
            <nav className='w-4/5 flex flex-col items-center justify-center'>
                <ul className=' w-full flex flex-col'>
                    <li className='py-4'>
                        <Link href='/resumeBuilder' className='flex gap-4'>
                            <FaFileSignature className=' text-2xl opacity-70' />
                            <p className={`${pathname === '/resumeBuilder'?'font-bold':'' }`}>Resume Builder</p>
                        </Link>
                    </li>
                    <li className=' py-4'>
                        <Link href='/resumeEnhancer' className='flex gap-4'>
                            <GiUpgrade className=' text-2xl opacity-70 '/>
                            <p className={`${pathname === '/resumeEnhancer'?'font-bold':'' }`}>Resume Enahncer</p>
                        </Link>
                    </li>
                    <li className=' py-4'>
                        <Link href='/resumes' className='flex gap-4'>
                            <SiGoogleanalytics className=' text-2xl opacity-70' />
                            <p className={`${pathname === '/resumes'?'font-bold':'' }`}>Resumes</p>
                        </Link>
                    </li>
                </ul>
            </nav>
        </div>
    )
}

export default Sidebar