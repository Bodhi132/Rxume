import React from 'react'
import Sidebar from '../components/Sidebar';

const layout = ({
    children,
}:Readonly<{
    children: React.ReactNode;
}>) => {
  return (
    <div className='flex bg-[#F5F5F5] w-screen h-screen'>
        <Sidebar />
        {children}
    </div>
  )
}

export default layout