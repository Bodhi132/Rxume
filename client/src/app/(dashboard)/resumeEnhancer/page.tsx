"use client"
import React from 'react'
import { useState } from 'react'
import { useForm, SubmitHandler } from "react-hook-form"

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
    <div>
      <form onSubmit={handleSubmit(onSubmit)} className='flex flex-col'>
        <label htmlFor="">Enter Job Link</label>
        <input {...register("jobLink")} />
        <label htmlFor="">Enter resume</label>
        <input {...register("resume")} type='file'/>
        <select {...register("platform")}>
          <option value="Wellfound">WellFound</option>
          <option value="linkedin">LinkedIn</option>
          <option value="internshala">Internshala</option>
        </select>
        <input type="submit" />
      </form>
    </div>
  )
}

export default page