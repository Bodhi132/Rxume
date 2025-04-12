import React from 'react'
import { motion } from 'framer-motion';

const Headlines = () => {
  return (
    <div className='bg-white h-[22vh] border-4 border-black rounded-lg shadow-[8px_8px_0px_0px_rgba(0,0,0,0.8)] p-5 bg-[url(/images/bgImage.png)] bg-cover bg-center flex items-center justify-center'>
      <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className='text-2xl font-bold uppercase text-center text-black'
      >
        <div className='bg-white border-black rounded text-center shadow-[8px_8px_0px_0px_rgba(0,0,0,0.8)]'>
          <p>Your AI-Powered Resume Assistant</p>
          <p>Craft. Tailor. Save. All in one place.</p>
        </div>
      </motion.div>
    </div>
  )
}

export default Headlines