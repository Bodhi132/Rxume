import React from 'react'
import axiosInstance from '../lib/axiosInstance';
import { useState , useEffect } from 'react'

const OptimizedResume = () => {

    const data = JSON.parse(localStorage.getItem('resumeForm') || '{}');

    const experience = data.experience
    const projects = data.projects

    const [expDesc, setExpDesc] = useState({})
    const [projectDesc, setProjectDesc] = useState({})

    async function optimizeFormData() {
        
        await Promise.all(experience.map(async(exp:any,ind:number)=>{
            const expData = {
                texts: exp.description
            }
            const response = await axiosInstance.post('/work-experience-optimze',expData,{
                headers: {
                    'Content-Type': 'application/json',
                }
            })
            setExpDesc(prevState => ({...prevState, [ind]: response.data.texts}))
        }))

        await Promise.all(projects.map(async(project:any,ind:number)=>{
            const projDesc = {
                texts: project.description
            }
            const response = await axiosInstance.post('/education-optimze',projDesc,{
                headers: {
                    'Content-Type': 'application/json',
                }
            })
            setProjectDesc(prevState => ({...prevState, [ind]: response.data.texts}))
        }))
    }

    useEffect(() => {
        optimizeFormData()
    }, [])

  return (
    <div>OptimizedResume</div>
  )
}

export default OptimizedResume