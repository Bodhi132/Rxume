"use client"
import React from 'react'
import ResumeTile from '@/app/components/ResumeTile'
import { useState, useEffect } from 'react'
import axiosInstance from '@/app/lib/axiosInstance'
import Cookies from 'js-cookie'

const Page = () => {

  type Resume = {
    id: number
    user_id: string
    json_data: any
  }

  const [resumes, setResumes] = useState<Resume[]>([])
  const [loading, setLoading] = useState(true)

  const user_id = Cookies.get('user_id') as string

  useEffect(() => {
    const fetchResumes = async () => {
      try {
        const res = await axiosInstance.get(`/get-all-resumes`, {
          params: { user_id: user_id }, // dynamically inject this
        })
        setResumes(res.data)
      } catch (err) {
        console.error('Error fetching resumes:', err)
      } finally {
        setLoading(false)
      }
    }

    fetchResumes()
  }, [])

  if (loading) return <p>Loading...</p>


  return (
    <div className='bg-white w-full h-full'>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {resumes.map((resume, ind) => {
          const { json_data } = resume;
          const { name, email, phone, projects, experience } = json_data; // Extract additional properties from json_data
          return (
            <ResumeTile
              key={ind}
              name={name}
              email={email}
              phone={phone}
              projects={projects}
              experience={experience}
            />
          );
        })}
      </div>
    </div>
  )
}

export default Page