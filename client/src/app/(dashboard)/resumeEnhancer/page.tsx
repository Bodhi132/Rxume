"use client"
import React from 'react'
import { useForm, SubmitHandler } from "react-hook-form"
import { Dela_Gothic_One } from 'next/font/google'
import { League_Gothic } from 'next/font/google'

const delaGothicOne = Dela_Gothic_One({
  subsets: ["latin"],
  weight: "400",
});

const league_Gothic = League_Gothic({
  subsets: ["latin"],
  weight: "400",
})

const page = () => {

  type Inputs = {
    jobLink: string,
    platform: string,
    resume: File
  }

  const { register, handleSubmit } = useForm<Inputs>()

  const onSubmit: SubmitHandler<Inputs> = (data) => {

  }

  return (
    <div className={`bg-[#ECE8D9] w-screen h-auto text-[#341210] px-[4rem] py-[2.5rem]`}>

      <div className=' w-full flex flex-col items-center'>
        <p className={`${delaGothicOne.className} text-5xl`}>How it works ?</p>
        <div className=' bg-purple-600 flex flex-col items-center border-[5px] border-[#341210] rounded my-5' style={{ boxShadow:' 15px 15px #341210' }}>
          <video src="" width='800' height='800' controls></video>
        </div>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className={`flex flex-col ${league_Gothic.className} my-4`}>
        <label htmlFor="" className='text-[3rem]' style={{letterSpacing:'0.5px'}}>Enter Job Link</label>
        <input {...register("jobLink")} className=' border-black '/>
        <label htmlFor="">Enter resume</label>
        <input {...register("resume")} type='file' />
        <select {...register("platform")}>
          {/* <option value="Wellfound">WellFound</option> */}
          <option value="linkedin">LinkedIn</option>
          {/* <option value="internshala">Internshala</option> */}
        </select>
        <input type="submit" />
      </form>
    </div>
  )
}

export default page