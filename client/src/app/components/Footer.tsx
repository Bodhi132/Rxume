"use client";
import React from "react";
import { FaArrowRight, FaPlayCircle, FaFacebook, FaTwitter, FaInstagram, FaLinkedin, FaYoutube, FaGithub } from "react-icons/fa";
import Link from "next/link";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";

const Footer = () => {
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  };

  const router = useRouter();

  return (
    <footer className="min-h-screen bg-[#1A1F2C] text-white py-16 relative overflow-hidden">
      {/* Comic style decorative elements */}
      <div className="container mx-auto px-4 pt-12 relative z-10">
        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="flex flex-col items-center mb-20"
        >
          <motion.div variants={item} className="mb-8">
            <p className="mb-6">
              HOW IT WORKS
            </p>
          </motion.div>

          {/* Video Section */}
          <motion.div variants={item} className="w-full max-w-4xl aspect-video mb-12 relative">
            <div className="absolute inset-0 bg-black/50 flex items-center justify-center rounded-lg border-4 border-white shadow-[8px_8px_0px_0px_rgba(234,56,76,0.8)]">
              <FaPlayCircle className="w-20 h-20 text-white opacity-80 hover:opacity-100 cursor-pointer transition-all" />
              <span className="absolute bottom-4 font-bold text-xl text-white">Watch How It Works</span>
            </div>
            {/* This would be replaced with an actual video player in production */}
            <img 
              src="https://images.unsplash.com/photo-1586281380117-5a60ae2050cc" 
              alt="Video thumbnail"
              className="w-full h-full object-cover rounded-lg" 
            />
          </motion.div>
          
          {/* Get Started Button */}
          <motion.div variants={item} className="mb-16">
            <button 
              className="px-8 py-7 text-xl font-bold uppercase bg-[#ffeb3b] hover:bg-[#e6d535] text-black border-2 border-black shadow-[6px_6px_0px_0px_rgba(0,0,0,0.8)] hover:shadow-[3px_3px_0px_0px_rgba(0,0,0,0.8)] hover:translate-y-1 hover:translate-x-1 transition-all duration-200 group" 
              onClick={()=> router.push("/register")}
            >
              Get Started Now!
              <FaArrowRight className="ml-2 h-6 w-6 group-hover:translate-x-1 transition-transform duration-300" />
            </button>
          </motion.div>
        </motion.div>

        {/* Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12 border-t-2 border-[#ffeb3b]/30 pt-12">
          {/* Column 1 - About */}
          <div>
            <h3 className="text-xl font-bold mb-4 text-[#ffeb3b]">RXUME</h3>
            <p className="text-gray-300 mb-6">
              The fastest way to create standout resumes that get you hired! Our AI-powered tool crafts professional resumes in minutes, not hours.
            </p>
            <div className="flex space-x-4">
              <Link href="#" className="text-gray-300 hover:text-[#ffeb3b]">
                <FaFacebook size={20} />
              </Link>
              <Link href="#" className="text-gray-300 hover:text-[#ffeb3b]">
                <FaTwitter size={20} />
              </Link>
              <Link href="#" className="text-gray-300 hover:text-[#ffeb3b]">
                <FaInstagram size={20} />
              </Link>
              <Link href="#" className="text-gray-300 hover:text-[#ffeb3b]">
                <FaLinkedin size={20} />
              </Link>
              <Link href="#" className="text-gray-300 hover:text-[#ffeb3b]">
                <FaGithub size={20} />
              </Link>
            </div>
          </div>
          
          {/* Column 3 - Contact */}
          <div>
            <h3 className="text-xl font-bold mb-4 text-[#ffeb3b]">CONTACT US</h3>
            <p className="text-gray-300 mb-2">
              Have questions? We're here to help!
            </p>
            <p className="text-gray-300 mb-4">
              Email: support@rxume.ai
            </p>
            <button 
              className="border-[#ffeb3b] text-[#ffeb3b] hover:bg-[#ffeb3b]/10"
            >
              Send Message
            </button>
          </div>
        </div>
        
        {/* Copyright */}
        <div className="text-center border-t border-[#ffeb3b]/30 pt-8">
          <p className="text-gray-400">
            © {new Date().getFullYear()} Rxume. All rights reserved.
          </p>
          <div className="flex justify-center space-x-6 mt-4">
            <Link href="#" className="text-gray-400 hover:text-white text-sm">Privacy Policy</Link>
            <Link href="#" className="text-gray-400 hover:text-white text-sm">Terms of Service</Link>
            <Link href="#" className="text-gray-400 hover:text-white text-sm">Cookies</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
