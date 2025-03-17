"use client"
import React from 'react'
import { useForm, SubmitHandler, useWatch, Controller } from "react-hook-form"
import { useState, useEffect } from 'react'
import TailoredResume from '@/app/components/TailoredResume'
import { Dela_Gothic_One } from 'next/font/google'
import { League_Gothic } from 'next/font/google'
import { RiFileUploadFill } from "react-icons/ri";
import axiosInstance from '@/app/lib/axiosInstance'
import './styles.css'

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
    resume: FileList | null
  }

  const { register, handleSubmit, control, setValue } = useForm<Inputs>()
  const [isclicked, setClicked] = useState(false)
  const [responseResume, setResponseResume] = useState(null)
  const [loading, setIsLoading] = useState(false)

  const resume = useWatch({
    control,
    name: 'resume',
    defaultValue: undefined
  })

  useEffect(() => {
    if (isclicked) {
      setClicked(false)
    }
    console.log(resume)
  }, [resume])

  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    // console.log(data.resume ? data.resume[0] : null)
    setIsLoading(true)
    const formData: any = new FormData()
    formData.append('file', data.resume ? data.resume[0] : null)

    try {
      const response = await axiosInstance.post('/resume-tailor', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        },
        params: {
          job_url: data.jobLink,
        }
      })
      console.log("Response:", response)
      setResponseResume(response.data)
      setIsLoading(false)
    }
    catch (err) {
      console.log(err)
    }
  }

  const handleRemoveFile = () => {
    setValue('resume', null)
  }

  return (
    <div className={`bg-[#ECE8D9] w-full h-auto text-[#341210] px-[4rem] py-[2.5rem]`}>

      <div className=' w-full flex flex-col items-center'>
        <p className={`${delaGothicOne.className} text-5xl`}>How it works ?</p>
        <div className=' bg-purple-600 flex flex-col items-center border-[5px] border-[#341210] rounded my-5' style={{ boxShadow: ' 15px 15px #341210' }}>
          <video src="" width='800' height='800' controls></video>
        </div>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className={`flex flex-col ${league_Gothic.className} my-4`}>
        <label htmlFor="" className='text-[1.5rem]' style={{ letterSpacing: '0.5px' }}>Enter Job Link</label>
        <input {...register("jobLink")} className=' border-black personal-info-input p-2 rounded-md' />
        <div className='w-full my-5'>
          {
            resume ?
              <div className='flex flex-col items-center justify-center gap-2 w-full h-[200px] p-2 rounded-md border-[#341210] personal-info-input bg-white border-[3.5px]'>
                <RiFileUploadFill size='50px' className='personal-info-input' />
                <p className=' text-2xl'>{resume[0].name}</p>
                <button onClick={handleRemoveFile} className=' text-white bg-amber-900 p-2'>Remove</button>
              </div> :
              <label htmlFor="file" className='flex flex-col items-center justify-center w-full h-[200px] p-2 rounded-md border-[#341210] personal-info-input bg-white border-[3.5px]'>
                <div className='flex flex-col gap-4 items-center w-2/5 h-4/5 rounded-md border-[#341210] cursor-pointer'>
                  <RiFileUploadFill size='50px' className='personal-info-input' />
                  <p className=' text-2xl'>Upload your resume</p>
                  <Controller
                    control={control}
                    name='resume'
                    render={({ field }) => (
                      <input type='file' id='file' className='hidden' onChange={(e) => field.onChange(e.target.files)} />
                    )}
                  />
                </div>
              </label>
          }
        </div>
        <select {...register("platform")} className=' border-black personal-info-input p-2 rounded-md text-2xl'>
          {/* <option value="Wellfound">WellFound</option> */}
          <option value="linkedin">LinkedIn</option>
          {/* <option value="internshala">Internshala</option> */}
        </select>
        <input type="submit" className='mt-3 border-black personal-info-input p-2 rounded-md text-2xl bg-white cursor-pointer' />
      </form>
      {loading ? <p>Loading...</p> :
        <TailoredResume responseResume={responseResume} />
      }
    </div>
  )
}

export default page