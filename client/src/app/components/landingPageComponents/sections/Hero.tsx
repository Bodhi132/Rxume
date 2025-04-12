import React from 'react'
import Image from 'next/image'

const Hero = () => {
  return (
    <div className='bg-white border-4 border-black rounded-lg shadow-[8px_8px_0px_0px_rgba(0,0,0,0.8)] z-[999]'>
      <Image
        src="/resumeHero/revamp.gif"
        height={500}
        width={500}
        alt="Hero Image"
      />
    </div>
  )
}

export default Hero