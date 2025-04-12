import React from 'react'
import Image from 'next/image'

const Tech = () => {
  return (
    <div className="relative w-40 h-[173px] bg-white border-4 border-black rounded-lg shadow-[8px_8px_0px_0px_rgba(0,0,0,0.8)] transform rotate-[-1deg]">
      <div className="absolute top-5 left-5">
        <Image src="/images/Tech/next-js.svg" alt="Next.js logo" width={55} height={55} />
      </div>
      <div className="absolute top-5 right-5">
        <Image src="/images/Tech/postgresql.svg" alt="Postgres logo" width={55} height={55} />
      </div>
      <div className="absolute bottom-5 left-1/2 transform -translate-x-1/2">
        <Image src="/images/Tech/openai.svg" alt="OpenAI logo" width={55} height={55} />
      </div>
    </div>
  )
}

export default Tech
