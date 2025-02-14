"use client"
import React, { useState, useEffect, useRef } from 'react';
import { useForm, SubmitHandler, useFieldArray, Controller, useWatch } from 'react-hook-form';
import { technicalSkills } from '@/data/skills';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import dynamic from 'next/dynamic';

const PdfViewer = dynamic(() => import('@/app/components/PdfViewer'), { ssr: false });

const App: React.FC = () => {

  const [isClicked, setIsClicked] = useState(false)

  useEffect(() => {
    setIsClicked(false)
  }, [isClicked])

  const { register, handleSubmit, setValue, control } = useForm<FormData>({
    defaultValues: {
      userInfo: {
        name: '',
        phone: undefined,
        email: '',
        linkedin: '',
        github: '',
        twitter: '',
        portfolio: '',
      },
      technicalSkills: {
        frontend: [],
        backend: [],
        databases: [],
        devops: [],
        testing: [],
        tools: [],
      },
      experience: [{
        company: '',
        role: '',
        skill: [],
        start: '',
        end: '',
        description: ['', '', '']
      }],
      projects: [
        {
          name: '',
          description: [''],
          codeLink: '',
          demoLink: '',
          techStack: [''],
        },
      ],
      education: [{
        degree: '',
        college: '',
        start: '',
        end: '',
      }],
    }
  });

  const { fields: experienceFields, append: appendExperience, remove: removeExperience } = useFieldArray({
    control,
    name: 'experience'
  });

  const { fields: projectFields, append: appendProject, remove: removeProject } = useFieldArray({
    control,
    name: 'projects'
  });

  const { fields: educationFields, append: appendEducation, remove: removeEducation } = useFieldArray({
    control,
    name: 'education'
  });

  const watchedTechnicalSkills = useWatch({ control, name: 'technicalSkills' });
  const watchedExperience = useWatch({ control, name: 'experience' });
  const watchedProjects = useWatch({ control, name: 'projects' });
  const watchedEducation = useWatch({ control, name: 'education' });

  const [inputValues, setInputValues] = useState({
    frontend: '',
    backend: '',
    databases: '',
    devops: '',
    testing: '',
    tools: ''
  });

  const [selectedSkills, setSelectedSkills] = useState<{
    frontend: string[];
    backend: string[];
    databases: string[];
    devops: string[];
    testing: string[];
    tools: string[];
  }>({
    frontend: [],
    backend: [],
    databases: [],
    devops: [],
    testing: [],
    tools: [],
  });

  const [jobSkill, setjobSkill] = useState<string>('')

  const handleSkillSelect = (skill: string, category: keyof typeof technicalSkills) => {
    setSelectedSkills((prevSelectedSkills) => ({
      ...prevSelectedSkills,
      [category]: [...prevSelectedSkills[category], skill],
    }));
    setInputValues({
      ...inputValues,
      [category]: ''
    })
    setValue(`technicalSkills.${category}`, [...watchedTechnicalSkills[category], skill]);
  };

  const handleRemoveSkill = (skill: string, category: keyof typeof technicalSkills) => {
    setSelectedSkills((prevSelectedSkills) => ({
      ...prevSelectedSkills,
      [category]: prevSelectedSkills[category].filter((s) => s !== skill),
    }));
    setValue(`technicalSkills.${category}`, watchedTechnicalSkills[category].filter((s: string) => s !== skill));
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>, category: keyof typeof technicalSkills) => {
    setInputValues({
      ...inputValues,
      [category]: event.target.value
    });
  };

  const handleJobSkill = (skill: string, index: number) => {
    setValue(`experience.${index}.skill`, [...watchedExperience[index].skill, skill]);
    console.log(watchedExperience[index].skill);

    setjobSkill('');
  };

  const skills = Object.values(technicalSkills).flat();

  type FormData = {
    userInfo: {
      name: string;
      phone: number;
      email: string;
      linkedin: string;
      github: string;
      twitter: string;
      portfolio: string;
    };
    technicalSkills: {
      frontend: string[];
      backend: string[];
      databases: string[];
      devops: string[];
      testing: string[];
      tools: string[];
    };
    experience: {
      company: string;
      role: string;
      skill: string[];
      start: string;
      end: string;
      description: string[];
    }[];
    projects: {
      name: string;
      description: string[];
      codeLink: string;
      demoLink: string;
      techStack: string[];
    }[];
    education: {
      degree: string;
      college: string;
      start: string;
      end: string;
    }[];
  };

  const formData = useWatch({ control });

  const onSubmit: SubmitHandler<FormData> = (data) => console.log(data);

  return (
    <div className="App p-4 flex gap-4 bg-gradient-to-t from-sky-500 to-indigo-500 h-full w-full">
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4 w-1/2 bg-white h-screen rounded-md overflow-y-auto">
        <h2 className="text-xl font-bold mb-4">Personal Details</h2>
        <input className="p-2 border border-gray-300 rounded" type="text" placeholder="Name" {...register('userInfo.name')} />
        <input className="p-2 border border-gray-300 rounded" type="email" placeholder="Email" {...register('userInfo.email')} />
        <input className="p-2 border border-gray-300 rounded" type="number" placeholder="Phone" {...register('userInfo.phone')} />
        <input className="p-2 border border-gray-300 rounded" type="text" placeholder="Provide a link to your LinkedIn account" {...register('userInfo.linkedin')} />
        <input className="p-2 border border-gray-300 rounded" type="text" placeholder="Provide a link to your GitHub account" {...register('userInfo.github')} />
        <input className="p-2 border border-gray-300 rounded" type="text" placeholder="Provide a link to your Twitter account" {...register('userInfo.twitter')} />
        <input className="p-2 border border-gray-300 rounded" type="text" placeholder="Provide a link to your Portfolio" {...register('userInfo.portfolio')} />

        <h2 className="text-xl font-bold my-4">Technical Skills</h2>
        <div>
          {Object.keys(technicalSkills).map((category) => (
            <div key={category} className="mb-4 flex flex-col">
              <h3 className="text-lg font-semibold">{category.toUpperCase()}</h3>
              <div className="flex flex-col border border-gray-400 p-2 rounded">
                <div className='flex flex-wrap'>
                  {watchedTechnicalSkills[category as keyof typeof technicalSkills].map((skill, index) => (
                    <button
                      key={index}
                      className="m-1 px-2 py-1 bg-red-500 text-white rounded hover:bg-red-700"
                      onClick={() => handleRemoveSkill(skill, category as keyof typeof technicalSkills)}
                    >
                      {skill} &times;
                    </button>
                  ))}
                </div>
                <div className="flex flex-col">
                  <input
                    type="text"
                    className="border-none flex-1 outline-none bg-transparent block"
                    placeholder="Type to search..."
                    value={inputValues[category as keyof typeof technicalSkills]}
                    onChange={(e) => handleInputChange(e, category as keyof typeof technicalSkills)}
                  />
                  <ul>
                    {inputValues[category as keyof typeof technicalSkills] && technicalSkills[category as keyof typeof technicalSkills]
                      .filter((skill) =>
                        skill.toLowerCase().includes(inputValues[category as keyof typeof technicalSkills].toLowerCase()) &&
                        !selectedSkills[category as keyof typeof technicalSkills].some(val => val.toLowerCase() === skill.toLowerCase())
                      )
                      .map((skill, index) => (
                        <li
                          key={index}
                          className="cursor-pointer p-2 hover:bg-gray-200"
                          onClick={() => handleSkillSelect(skill, category as keyof typeof technicalSkills)}
                        >
                          {skill}
                        </li>
                      ))}
                  </ul>
                </div>
              </div>
            </div>
          ))}
        </div>
        <div>
          <h2>Work Experience</h2>
          {experienceFields.map((field, index) => (
            <div key={field.id} className="mb-4">
              <input className="p-2 border border-gray-300 rounded" type="text" placeholder="Type company name" {...register(`experience.${index}.company`)} />
              <input className='p-2 border border-gray-300 rounded' type="text" placeholder='Type your role in the company' {...register(`experience.${index}.role`)} />
              {/* <input className='p-2 border border-gray-300 rounded' type="text" placeholder='Type the skills you used' onChange={(e) => setjobSkill(e.target.value)} /> */}
              <div>
                <input type="text" className="p-2 border bg-transparent rounded" placeholder='Enter skills needed for the job' value={jobSkill} onChange={(e) => setjobSkill(e.target.value)} />
                { 
                  watchedExperience[index]?.skill?.map((skill, i) => (
                    <button key={i} className='bg-gray-200 p-2 m-1 rounded'
                      onClick={() =>{ setIsClicked(true); setValue(`experience.${index}.skill`, watchedExperience[index].skill.filter((s: string) => s !== skill))}}
                    >{skill}</button>
                  ))
                }
                <div className='border border-gray-400 rounded p-2'>
                  <ul>
                    {jobSkill && skills.filter((skill) => skill.toLowerCase().startsWith(jobSkill.toLowerCase())).map((skill, skillIndex) => (
                      <li key={skillIndex} className='cursor-pointer p-2 hover:bg-gray-200' onClick={() => { setIsClicked(true); handleJobSkill(skill, index)}}>{skill}</li>
                    ))}
                  </ul>
                </div>
              </div>
              <Controller
                name={`experience.${index}.start`}
                control={control}
                render={({ field: { onChange, onBlur, value, ref } }) => (
                  <DatePicker
                    selected={value ? new Date(value) : null}
                    onChange={(date) => onChange(date?.toISOString() || null)}
                    placeholderText="Please Enter Start Date"
                  />
                )}
              />
              <Controller
                name={`experience.${index}.end`}
                control={control}
                render={({ field: { onChange, onBlur, value, ref } }) => (
                  <DatePicker
                    selected={value ? new Date(value) : null}
                    onChange={(date) => onChange(date?.toISOString() || null)}
                    minDate={
                      watchedExperience[index]?.start
                        ? new Date(watchedExperience[index]?.start)
                        : undefined
                    }
                    placeholderText="Please Enter End Date"
                  />
                )}
              />
              <div>
                <h3>Description</h3>
                {watchedExperience[index]?.description.map((desc, descInd) => (
                  <div key={descInd} className='mb-2'>
                    <input
                      className="p-2 border border-gray-300 rounded"
                      type="text"
                      placeholder="Description"
                      {...register(`experience.${index}.description.${descInd}`, { required: descInd < 3 })}
                    />
                    {descInd > 2 && typeof window !== 'undefined' && <button type="button" onClick={() => {
                      const descriptions = watchedExperience[index].description;
                      setIsClicked(true);
                      setValue(`experience.${index}.description`, descriptions.filter((_, i) => i !== descInd));
                    }}>Remove</button>}
                  </div>
                ))}
                <button type="button" onClick={() => {
                  const descriptions = watchedExperience[index].description;
                  setValue(`experience.${index}.description`, [...descriptions, '']);
                }}>Add Description</button>
              </div>
              {index > 0 && <button type="button" onClick={() =>{ setIsClicked(true);removeExperience(index)}}>Remove Experience</button>}
            </div>
          ))}
          {<button type="button" onClick={() =>{ setIsClicked(true);appendExperience({ company: '', role: '', skill: [], start: '', end: '', description: [] })}}>Add Experience</button>}
        </div>

        <div>
          <h2>Project Title</h2>
          {
            watchedProjects.map((_, projectIndex) => (
              <div key={projectIndex}>

                <input {...register(`projects.${projectIndex}.name`)}
                  placeholder='Project Name'
                  className='p-2 border border-gray-300 rounded'
                />

                <input {...register(`projects.${projectIndex}.codeLink`)}
                  placeholder='Enter Github ,gitlab or bitbucket link'
                  className='p-2 border border-gray-300 rounded'
                />

                <input
                  {...register(`projects.${projectIndex}.demoLink`)}
                  placeholder='Enter the deployed link or the video link'
                  className='p-2 border border-gray-300 rounded'
                />

                {/* <input
                  {...register(`projects.${projectIndex}.techStack`)}
                  placeholder='Enter the tech used using comma separated values'
                  className='p-2 border border-gray-300 rounded'
                /> */}

                <Controller 
                  control={control}
                  name={`projects.${projectIndex}.techStack`}
                  render={({ field }) => (
                    <>
                      {
                        field.value.map((_, techIndex) => (
                          <div key={techIndex} className='flex gap-2 mt-2'>
                            <input
                              {...register(`projects.${projectIndex}.techStack.${techIndex}`)}
                              placeholder='Please Enter the tech used'
                              className='w-full p-2 border rounded'
                            />
                            <button
                              type='button'
                              className='bg-red-500 text-white p-2 rounded'
                              onClick={() => {
                                const newTech = watchedProjects[projectIndex].techStack;
                                newTech.splice(techIndex, 1);
                                field.onChange(newTech);
                              }}
                            >
                              Remove
                            </button>
                          </div>
                        ))
                      }
                      <button
                        className='bg-blue-500 text-white p-2 rounded'
                        onClick={() => field.onChange([...field.value, ''])}
                      >
                        Add Tech
                      </button>
                    </>
                  )}
                />

                <Controller
                  control={control}
                  name={`projects.${projectIndex}.description`}
                  render={({ field }) => (
                    <>
                      {
                        field.value.map((_, descIndex) => (
                          <div key={descIndex} className='flex gap-2 mt-2'>
                            <input
                              {...register(`projects.${projectIndex}.description.${descIndex}`)}
                              placeholder='Please Enter details of your project'
                              className='w-full p-2 border rounded'
                            />
                            <button
                              type='button'
                              className='bg-red-500 text-white p-2 rounded'
                              onClick={() => {
                                const newDesc = watchedProjects[projectIndex].description;
                                newDesc.splice(descIndex, 1);
                                field.onChange(newDesc);
                              }}
                            >
                              Remove
                            </button>
                          </div>
                        ))}
                      <button
                        className='bg-blue-500 text-white p-2 rounded'
                        onClick={() => field.onChange([...field.value, ''])}
                      >
                        Add Description
                      </button>
                    </>
                  )}
                />
                <button
                  className='bg-red-500 text-white p-2 rounded'
                  
                  onClick={() => {setIsClicked(true); removeProject(projectIndex)}}
                >
                  Remove Project
                </button>
              </div>
            ))
          }
          <button
            className='bg-blue-500 text-white p-2 rounded'
            onClick={() => {setIsClicked(true);appendProject({ name: '', description: [''], codeLink: '', demoLink: '', techStack: [''] })}}>
            Add Project
          </button>
        </div>

        <div>
          <h2>Education Details</h2>
          {
            watchedEducation.map((_, educationIndex) => (
              <div key={educationIndex}>
                <input
                  {...register(`education.${educationIndex}.degree`)}
                  placeholder='Enter your degree'
                  className='p-2 border border-gray-300 rounded'
                />
                <input
                  {...register(`education.${educationIndex}.college`)}
                  placeholder='Enter your college name'
                  className='p-2 border border-gray-300 rounded'
                />
                <input
                  {...register(`education.${educationIndex}.start`)}
                  placeholder='Enter start date'
                  className='p-2 border border-gray-300 rounded'
                />
                <input
                  {...register(`education.${educationIndex}.end`)}
                  placeholder='Enter end date'
                  className='p-2 border border-gray-300 rounded'
                />
                <button
                  className='bg-red-500 text-white p-2 rounded'
                  onClick={() => {setIsClicked(true);removeEducation(educationIndex)}}
                >
                  Remove Education
                </button>
              </div>
            ))
          }
          <button
            className='bg-blue-500 text-white p-2 rounded'
            onClick={() => {setIsClicked(true);appendEducation({ degree: '', college: '', start: '', end: '' })}}
          >
            Add Education
          </button>
        </div>
        <div>
        </div>
        <input type="submit" />
      </form>
      {!isClicked && <div className=' w-1/2'>
        {
          // typeof window !== 'undefined' &&
          // <Suspense fallback={<div>Loading...</div>}>
            <PdfViewer formData={formData} />
          // </Suspense>
        }
      </div>}
    </div>
  );
};

export default App;