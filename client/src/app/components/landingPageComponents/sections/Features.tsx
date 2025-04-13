import React from 'react'

const Features = () => {
  return (
    <div className='relative bg-yellow-100 h-[24vh] px-4 py-3 border-4 border-black rounded-lg shadow-[8px_8px_0px_#000] overflow-hidden'>

      {/* Comic-style halftone dots in background */}
      <div className='absolute inset-0 bg-[radial-gradient(#000_1px,transparent_1px)] bg-[length:8px_8px] opacity-10 pointer-events-none' />

      {/* Comic-style label */}
      <div className='absolute -top-3 left-1/2 transform -translate-x-1/2 bg-pink-300 px-3 py-3 border-2 border-black text-xs font-bold shadow-[2px_2px_0_#000] rotate-[-2deg] z-10'>
        ✨ Features
      </div>

      <div className='relative z-10 text-sm font-bold uppercase text-black mt-6'>
        <ul className='list-disc list-inside space-y-1'>
          <li>AI-powered resume optimization</li>
          <li>Tailored for each job description</li>
          <li>ATS keyword matching</li>
        </ul>
      </div>
    </div>
  )
}

export default Features
