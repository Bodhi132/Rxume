import React from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { ImArrowUpRight2 } from "react-icons/im";

const Navbar = () => {
  return (
    <div className='flex justify-between items-center mt-3'>
      <Image src="/images/rxume-logo.png" alt="Logo" width={150} height={150} className=' invert' />
      <nav>
        <ul className='flex gap-5 text-white font-medium items-center text-lg'>
          <li>
            <Link href='/'>Features</Link>
          </li>
          <li>
            <Link href='/about'>How it works</Link>
          </li>
          <li>
            <Link href='/services'>Pricing</Link>
          </li>
          <li>
            <Link href='/contact'>FAQ</Link>
          </li>
          <li>
            <Link href='/login'>Login</Link>
          </li>
          <li className='flex items-center bg-white px-4 py-2 rounded-3xl gap-3'>
            <button className=' text-[#535AFF]'>
              Get Started 
            </button>
            <ImArrowUpRight2 className=' text-[#535AFF] text-lg'/>
          </li>
        </ul>
      </nav>
    </div>
  )
}

export default Navbar