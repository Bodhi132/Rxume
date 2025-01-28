import Image from "next/image";
import Navbar from "./components/Navbar";
import { Inter } from "next/font/google";
import { DiVim } from "react-icons/di";
import { ImArrowUpRight2 } from "react-icons/im";

const inter = Inter({ subsets: ['latin'] });

export default function Home() {
  return (
    <div className={inter.className}>
      <header className="h-[100vh] w-[100vw]">
        <div className="container lg:w-[80%] lg:h-[90%] relative top-5 bg-[#535AFF] mx-auto rounded-xl px-3">
          <Navbar />
          <div className="flex flex-col items-center justify-center absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
            <h1 className="text-white text-[60px] font-bold mx-auto text-center py-3">
              <div className="leading-tight">
                Build your Resume
              </div>
              <div className="mt-0">
                on rxume
              </div>
            </h1>
            <h2 className="text-white text-[20px] text-center my-5">
              <p>Create your perfect resume with ai and discover</p>
              <p>
                job opportunities tailored just for you.
              </p>
            </h2>
            <div className=" mt-7 flex items-center bg-white px-4 py-2 rounded-3xl gap-3">
              <button className=' text-[#535AFF]'>
                Get Started
              </button>
              <ImArrowUpRight2 className=' text-[#535AFF] text-lg' />
            </div>
          </div>
        </div>
      </header>

      {/* <section id="features" className="features">
        <div className="container">
          <h2>Our Features</h2>
          <ul>
            <li>
              <h3>AI-Powered Resume Builder</h3>
              <p>Generate professional reusmes with Ai-suggested content in minutes</p>
            </li>
            <li>
              <h3>Job Matching</h3>
              <p>Get tailored job recommendations based on your resume and preferences.</p>
            </li>
          </ul>
        </div>
      </section> */}

      <section id="facts" className="facts">
        <div className="px-[13%]">
          <p className=" mb-3">Did you know?</p>
          <h1 className="text-[48px] font-semibold -tracking-[2px] leading-tight">
          Did you know that over 75% of recruiters use Applicant Tracking Systems (ATS) to filter resumes? 
          Our AI ensures your resume passes through them.
          </h1>
        </div>
      </section>
    </div>
  );
}
