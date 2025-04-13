import React from 'react'
import Image from 'next/image'

const Tech = () => {
  return (
    <div className="relative w-44 h-[180px] bg-yellow-100 border-4 border-black rounded-lg shadow-[8px_8px_0px_#000] transform rotate-[-1deg] overflow-hidden">

      {/* Comic-style halftone background */}
      <div className="absolute inset-0 bg-[radial-gradient(#000_1px,transparent_1px)] bg-[length:8px_8px] opacity-10 z-0" />

      {/* Comic-style label */}
      <div className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-pink-300 px-2 py-1 border-2 border-black text-xs font-bold shadow-[2px_2px_0_#000] z-10 rotate-[-2deg]">
        ⚡ Powered by:
      </div>

      {/* Tech Icons */}
        <div className="absolute top-14 left-5 z-10">
          <Image src="/images/Tech/next-js.svg" alt="Next.js logo" width={55} height={55} />
        </div>
        <div className="absolute top-14 right-5 z-10">
          <Image src="/images/Tech/postgresql.svg" alt="Postgres logo" width={55} height={55} />
        </div>
        <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2 z-10">
          <Image src="/images/Tech/openai.svg" alt="OpenAI logo" width={55} height={55} />
        </div>
      </div>
  )
}

export default Tech
