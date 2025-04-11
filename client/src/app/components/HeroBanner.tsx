import { motion } from "framer-motion";
import { useState, useEffect } from "react";

const HeroBanner = () => {
  const [mounted, setMounted] = useState(false);
  
  useEffect(() => {
    setMounted(true);
  }, []);

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.3,
      },
    },
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { duration: 0.6 } },
  };

  if (!mounted) {
    return (
      <div className="text-center max-w-3xl mx-auto space-y-6">
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-black uppercase text-gray-900 opacity-0">
          Build Your <span className="text-[#ea384c]">SUPER</span> Resume with AI!
        </h1>
        <p className="text-xl md:text-2xl text-gray-800 max-w-2xl mx-auto opacity-0 font-comic">
          Create a standout resume in minutes with our intelligent resume builder
        </p>
      </div>
    );
  }

  return (
    <motion.div
      className="text-center mx-auto my-3 space-y-6"
      variants={container}
      initial="hidden"
      animate="show"
    >
      <div className="bg-[#ffeb3b] inline-block transform rotate-[-2deg] border-2 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,0.8)] mb-2">
        <motion.h2 
          className=" text-lg font-bold uppercase text-black"
          variants={item}
        >
          Exclusive Limited Time Offer!
        </motion.h2>
      </div>
      
      <motion.h1 
        className="text-sm md:text-xl lg:text-2xl font-black uppercase text-gray-900 leading-tight"
        variants={item}
      >
        Build Your <span className="text-[#ea384c] bg-[#ffeb3b] px-2 py-1 inline-block">SUPER</span> Resume with AI!
      </motion.h1>
    </motion.div>
  );
};

export default HeroBanner;
