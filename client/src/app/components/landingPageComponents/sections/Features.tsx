import React from 'react'

const Features = () => {
  return (
    <div className='bg-white h-[22vh] border-4 px-4 border-black rounded-lg shadow-[8px_8px_0px_0px_rgba(0,0,0,0.8)]'>
      <div className='text-sm font-bold uppercase text-black'>
        <p>Features</p>
        <ul className='list-disc list-inside'>
          <li>AI-powered resume optimization for better job matching</li>
          <li>Tailored resumes based on specific job descriptions</li>
          <li>Keyword analysis to pass Applicant Tracking Systems (ATS)</li>
        </ul>
      </div>
    </div>
  )
}

export default Features