"use client";
import React from 'react';
import dynamic from 'next/dynamic';

const OptimisedPdf = dynamic(() => import('@/app/components/OptimizedResume'), { ssr: false });

const OptimizedResumePage = () => {
  return (
    <div className="w-full h-screen bg-[#6b5b95]">
      <OptimisedPdf />
    </div>
  );
};

export default OptimizedResumePage;
