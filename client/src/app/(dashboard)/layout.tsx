import React from 'react'
import Sidebar from '../components/Sidebar';
import Header from '../components/Header';
import ProtectedRoute from '../wrapperComponent/ProtectedRoute';

const layout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return (
    // <ProtectedRoute>
      <div className='flex w-screen h-screen bg-gray-50 overflow-hidden'>
        <Sidebar />
        <div className='flex flex-col flex-1 h-full overflow-y-auto'>
          <Header />
          <main className="flex-1 w-full relative">
            {children}
          </main>
        </div>
      </div>
    // </ProtectedRoute>
  )
}

export default layout