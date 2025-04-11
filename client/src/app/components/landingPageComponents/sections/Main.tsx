import React from 'react';
import HeroBanner from '../../HeroBanner';
import { FaArrowRight } from 'react-icons/fa6';

const Main = () => {
  return (
    <div className="w-full h-full">
      <main className="mx-auto px-4">
        <div className="bg-white border-4 border-black rounded-lg shadow-[8px_8px_0px_0px_rgba(0,0,0,0.8)] transform rotate-[-1deg]">
          <div className="transform rotate-[1deg]">
            <div className="flex justify-center mt-7 mb-4">
                <button
                  className="flex px-2 py-3 text-xl font-bold uppercase bg-[#ea384c] hover:bg-[#d42c3e] border-2 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,0.8)] hover:shadow-[2px_2px_0px_0px_rgba(0,0,0,0.8)] hover:translate-y-1 hover:translate-x-1 transition-all duration-200 group "
                  onClick={()=>console.log('click')}
                >
                  <p>POW! Get Started</p>
                  <FaArrowRight className="ml-2 h-6 w-6 group-hover:translate-x-1 transition-transform duration-300" />
                </button>
            </div>
            <HeroBanner />
          </div>
        </div>
      </main>
    </div>
  );
};

export default Main;