import React from 'react'
import Sidebar from '../components/Sidebar';
import ProtectedRoute from '../wrapperComponent/ProtectedRoute';

const layout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return (
    <ProtectedRoute>
      <div className='flex w-screen h-auto'>
        <Sidebar />
        {children}
      </div>
    </ProtectedRoute>
  )
}

export default layout