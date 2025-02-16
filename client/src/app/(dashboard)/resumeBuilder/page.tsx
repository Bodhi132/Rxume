"use client"
import React, { useState, useEffect, useRef } from 'react';
import { useForm, SubmitHandler, useFieldArray, Controller, useWatch } from 'react-hook-form';
import { technicalSkills } from '@/data/skills';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import './styles.css';
import { FaUser } from "react-icons/fa6";
import { FaUniversity } from "react-icons/fa";
import { FaStar } from "react-icons/fa";
import { FaPlus } from "react-icons/fa";
import { FaMinus } from "react-icons/fa";
import { IoCodeSlash } from "react-icons/io5";
import { BiBriefcase, BiSolidBriefcase } from "react-icons/bi";
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
          description: ['', '', ''],
          codeLink: '',
          demoLink: '',
          techStack: [],
        },
      ],
      education: [{
        degree: '',
        college: '',
        start: '',
        end: '',
        grade: 0,
        gradeType: '',
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
  const [projectSkill, setProjectSkill] = useState<string>('')

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

  const handleProjectSkill = (skill: string, index: number) => {
    setValue(`projects.${index}.techStack`, [...watchedProjects[index].techStack, skill]);
    setProjectSkill('');
  }

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
      grade: number;
      gradeType: string;
    }[];
  };

  const formData = useWatch({ control });

  const onSubmit: SubmitHandler<FormData> = (data) => console.log(data);

  return (
    <div className="App p-4 flex gap-4 bg-[#6b5b95] h-screen w-full">
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4 w-1/2 bg-[#EFF3EA] border-black border-2 h-[95vh] overflow-y-auto form-style rounded-md">
        <h2 className='text-center font-semibold text-2xl pt-5'>RESUME DETAILS</h2>
        <div className=' px-4'>
          <hr className=' font-bold border-2 border-black' />
        </div>

        <div className=' border-2 mx-3 py-5 border-black bg-[#EFF6FF] rounded-md'>
          <div className='flex gap-2 px-4'>
            <FaUser className="text-2xl text-center" />
            <h2 className="text-xl font-bold mb-4">PERSONAL INFORMATION</h2>
          </div>
          <div className='grid grid-cols-2 gap-4 px-4'>
            <input className="p-2 border border-black rounded w-full personal-info-input" type="text" placeholder="Name" {...register('userInfo.name')} />
            <input className="p-2 border border-black rounded w-full personal-info-input" type="email" placeholder="Email" {...register('userInfo.email')} />
            <input className="p-2 border border-black rounded w-full personal-info-input" type="number" placeholder="Phone" {...register('userInfo.phone')} />
            <input className="p-2 border border-black rounded w-full personal-info-input" type="text" placeholder="Link to your LinkedIn account" {...register('userInfo.linkedin')} />
            <input className="p-2 border border-black rounded w-full personal-info-input" type="text" placeholder="Link to your GitHub account" {...register('userInfo.github')} />
            <input className="p-2 border border-black rounded w-full personal-info-input" type="text" placeholder="Link to your Twitter account" {...register('userInfo.twitter')} />
            <input className="p-2 border border-black rounded w-full col-span-2 personal-info-input" type="text" placeholder="Link to your Portfolio" {...register('userInfo.portfolio')} />
          </div>
        </div>

        <div className=' border-2 mx-3 py-5 border-black bg-[#ecfdf5] rounded-md'>
          <div className='flex gap-2 px-4 my-4 items-center'>
            <FaStar className="text-2xl text-center" />
            <h2 className="text-xl font-bold">Technical Skills</h2>
          </div>
          <div>
            {Object.keys(technicalSkills).map((category) => (
              <div key={category} className="mb-4 flex flex-col px-4 gap-2 ">
                <h3 className="text-lg font-semibold">{category.toUpperCase()}</h3>
                <div className="flex flex-col border border-black p-2 rounded personal-info-input bg-white">
                  <div className='flex flex-wrap gap-2'>
                    {watchedTechnicalSkills[category as keyof typeof technicalSkills].map((skill, index) => (
                      <button
                        key={index}
                        className="m-1 px-2 py-1 bg-red-500 text-white rounded hover:bg-red-700 personal-info-input"
                        onClick={() => handleRemoveSkill(skill, category as keyof typeof technicalSkills)}
                      >
                        {skill} &times;
                      </button>
                    ))}
                  </div>
                  <div className="flex flex-col ">
                    <input
                      type="text"
                      className="border-none flex-1 outline-none bg-transparent block mx-3 my-2"
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
        </div>
        <div className='border-2 mx-3 py-5 border-black bg-[#fef2f2] rounded-md'>
          <div className='flex gap-2 px-4 my-4 items-center'>
            <FaUniversity className="text-2xl text-center" />
            <h2 className='text-xl font-bold'>WORK EXPERIENCE</h2>
          </div>
          {experienceFields.map((field, index) => (
            <div key={field.id} className="mb-4 flex flex-col px-4 gap-2 ">
              <div className='flex gap-4'>
                <input className="p-2 border border-black rounded w-full personal-info-input" type="text" placeholder="Type company name" {...register(`experience.${index}.company`)} />
                <input className='p-2 border border-black rounded w-full personal-info-input' type="text" placeholder='Type your role in the company' {...register(`experience.${index}.role`)} />
              </div>
              {/* <input className='p-2 border border-gray-300 rounded' type="text" placeholder='Type the skills you used' onChange={(e) => setjobSkill(e.target.value)} /> */}
              <div className=' my-3'>
                <div className='border border-black bg-white personal-info-input rounded p-2 flex flex-col'>
                  <input type="text" className="p-2 bg-transparent rounded" placeholder='Enter skills needed for the job' value={jobSkill} onChange={(e) => setjobSkill(e.target.value)} />
                  <div className='flex flex-wrap gap-2'>
                    {
                      watchedExperience[index]?.skill?.map((skill, i) => (
                        <button key={i} className='m-1 px-2 py-1 bg-red-500 text-white rounded hover:bg-red-700 personal-info-input'
                          onClick={() => { setIsClicked(true); setValue(`experience.${index}.skill`, watchedExperience[index].skill.filter((s: string) => s !== skill)) }}
                        >{skill} &times;</button>
                      ))
                    }
                  </div>
                  <ul>
                    {jobSkill && skills.filter((skill) => skill.toLowerCase().startsWith(jobSkill.toLowerCase()) && !watchedExperience[index]?.skill.includes(skill)).map((skill, skillIndex) => (
                      <li key={skillIndex} className='cursor-pointer p-2 hover:bg-gray-200' onClick={() => { setIsClicked(true); handleJobSkill(skill, index) }}>{skill}</li>
                    ))}
                  </ul>
                </div>
              </div>
              <div className='flex gap-4 w-full'>
                <Controller
                  name={`experience.${index}.start`}
                  control={control}
                  render={({ field: { onChange, onBlur, value, ref } }) => (
                    <DatePicker
                      selected={value ? new Date(value) : null}
                      onChange={(date) => onChange(date?.toISOString() || null)}
                      placeholderText="Please Enter Start Date"
                      showYearDropdown
                      scrollableYearDropdown
                      yearDropdownItemNumber={50}
                      className='p-2 border border-black rounded w-full personal-info-input'
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
                      yearDropdownItemNumber={50}
                      showYearDropdown
                      scrollableYearDropdown
                      placeholderText="Please Enter End Date"
                      className='p-2 border border-black rounded w-full personal-info-input'
                    />
                  )}
                />
              </div>
              <div className='my-3 flex flex-col gap-3'>
                <h3 className='text-xl font-bold'>Description</h3>
                {watchedExperience[index]?.description.map((desc, descInd) => (
                  <div key={descInd} className='flex gap-3 items-center'>
                    <input
                      className="p-2 border border-black rounded w-full personal-info-input text-wrap"
                      type="text"
                      placeholder="Description"
                      {...register(`experience.${index}.description.${descInd}`, { required: descInd < 3 })}
                    />
                    {descInd > 2 && typeof window !== 'undefined' &&
                      <button type="button" className='bg-[#D91656] hover:bg-[#6f253e] text-xs personal-info-input' onClick={() => {
                        const descriptions = watchedExperience[index].description;
                        setIsClicked(true);
                        setValue(`experience.${index}.description`, descriptions.filter((_, i) => i !== descInd));
                      }}>
                        <p className=' font-bold'>Remove Description</p>
                      </button>}
                  </div>
                ))}
                <button type="button" className='flex items-center justify-center text-xs bg-[#f7cac9] p-3 w-fit gap-2 rounded-md personal-info-input mt-4' onClick={() => {
                  const descriptions = watchedExperience[index].description;
                  setValue(`experience.${index}.description`, [...descriptions, '']);
                }}>
                  <FaPlus className='text-xs block' />
                  <p className='text-xs font-bold h-5'>Add Description</p>
                </button>
              </div>
              {index > 0 && <button type="button" className='flex items-center justify-center text-xs font-bold bg-[#f7cac9] p-3 w-fit gap-2 rounded-md personal-info-input mt-2' onClick={() => { setIsClicked(true); removeExperience(index) }}>
                <FaMinus />
                <p>Remove Experience</p>
              </button>}
            </div>
          ))}
          {<button type="button" className='flex items-center justify-center text-xs font-bold bg-[#f7cac9] p-3 w-fit gap-2 rounded-md personal-info-input mt-2 ml-5' onClick={() => { setIsClicked(true); appendExperience({ company: '', role: '', skill: [], start: '', end: '', description: ['', '', ''] }) }}>
            <FaPlus />
            <p>Add Experience</p>
          </button>}
        </div>

        <div className='border-2 mx-3 py-5 border-black bg-[#F8F5E9] rounded-md'>
          <div className='flex gap-2 px-4 my-4 items-center '>
            <IoCodeSlash className="text-2xl text-center" />
            <h2 className="text-xl font-bold ">PROJECT TITLE</h2>
          </div>
          {
            watchedProjects.map((_, projectIndex) => (
              <div key={projectIndex} className='mb-4 flex flex-col px-4 gap-4 '>

                <input {...register(`projects.${projectIndex}.name`)}
                  placeholder='Project Name'
                  className='p-2 border border-black rounded w-full personal-info-input'
                />

                <div className='flex gap-4'>
                  <input {...register(`projects.${projectIndex}.codeLink`)}
                    placeholder='Enter Github ,gitlab or bitbucket link'
                    className='p-2 border border-black rounded w-full personal-info-input'
                  />

                  <input
                    {...register(`projects.${projectIndex}.demoLink`)}
                    placeholder='Enter the deployed link or the video link'
                    className='p-2 border border-black rounded w-full personal-info-input'
                  />
                </div>


                {/* <input
                  {...register(`projects.${projectIndex}.techStack`)}
                  placeholder='Enter the tech used using comma separated values'
                  className='p-2 border border-gray-300 rounded'
                /> */}

                <div className='border border-black bg-white personal-info-input rounded p-2 flex flex-col'>
                  <input
                    type="text"
                    className="p-2 border bg-transparent rounded"
                    placeholder="Enter skills needed for the job"
                    value={projectSkill}
                    onChange={(e) => setProjectSkill(e.target.value)}
                  />
                  <div className='flex flex-wrap gap-2'>
                    {watchedProjects[projectIndex]?.techStack?.map((skill, i) => (
                      <button
                        key={i}
                        className='m-1 px-2 py-1 bg-red-500 text-white rounded hover:bg-red-700 personal-info-input'
                        onClick={() => {
                          setIsClicked(true);
                          setValue(
                            `projects.${projectIndex}.techStack`,
                            watchedProjects[projectIndex].techStack.filter((s: string) => s !== skill)
                          );
                        }}
                      >
                        {skill}
                      </button>
                    ))}
                  </div>
                  <ul>
                    {projectSkill &&
                      skills
                        .filter(
                          (skill) =>
                            skill.toLowerCase().startsWith(projectSkill.toLowerCase()) &&
                            !watchedProjects[projectIndex]?.techStack.includes(skill)
                        )
                        .map((skill, skillIndex) => (
                          <li
                            key={skillIndex}
                            className="cursor-pointer p-2 hover:bg-gray-200"
                            onClick={() => {
                              setIsClicked(true);
                              handleProjectSkill(skill, projectIndex);
                            }}
                          >
                            {skill}
                          </li>
                        ))}
                  </ul>

                </div>
                <Controller
                  control={control}
                  name={`projects.${projectIndex}.description`}
                  render={({ field }) => (
                    <>
                      {
                        field.value.map((_, descIndex) => (
                          <div key={descIndex} className='flex gap-4 mt-2'>
                            <input
                              {...register(`projects.${projectIndex}.description.${descIndex}`)}
                              placeholder='Please Enter details of your project'
                              className='w-full p-2 border border-black rounded personal-info-input'
                            />
                            {descIndex > 2 && <button
                              type='button'
                              className='bg-red-500 text-white p-1 rounded personal-info-input'
                              onClick={() => {
                                setIsClicked(true)
                                const newDesc = watchedProjects[projectIndex].description;
                                newDesc.splice(descIndex, 1);
                                field.onChange(newDesc);
                              }}
                            >
                              Remove
                            </button>}
                          </div>
                        ))}
                      <button
                        className='bg-[#FFF2C2] personal-info-input text-black font-bold p-2 rounded'
                        onClick={() => field.onChange([...field.value, ''])}
                      >
                        Add Description
                      </button>
                    </>
                  )}
                />
                {<button
                  className='bg-red-500 text-white personal-info-input font-bold p-2 rounded'
                  type='button'
                  onClick={() => { setIsClicked(true); removeProject(projectIndex) }}
                >
                  Remove Project
                </button>}
              </div>
            ))
          }
          <button
            className='bg-[#FFF2C2] personal-info-input text-black font-bold p-2 ml-4 rounded flex items-center gap-2'
            onClick={() => { setIsClicked(true); appendProject({ name: '', description: [''], codeLink: '', demoLink: '', techStack: [''] }) }}>
            <FaPlus />
            <p>Add Project</p>
          </button>
        </div>

        <div className='border-2 mx-3 py-5 border-black bg-[#fff4ef] rounded-md flex flex-col gap-3'>
          <div className='flex gap-2 px-4 my-4 items-center'>
            <BiSolidBriefcase />
            <h2>Education Details</h2>
          </div>
          {
            watchedEducation.map((_, educationIndex) => (
              <div key={educationIndex} className=' grid grid-cols-2 gap-4 px-4'>
                <input
                  {...register(`education.${educationIndex}.degree`)}
                  placeholder='Enter your degree'
                  className='p-2 border border-black rounded w-full personal-info-input'
                />
                <input
                  {...register(`education.${educationIndex}.college`)}
                  placeholder='Enter your college name'
                  className='p-2 border border-black rounded w-full personal-info-input'
                />
                {/* <input
                  {...register(`education.${educationIndex}.start`)}
                  placeholder='Enter start date'
                  className='p-2 border border-gray-300 rounded'
                /> */}
                <Controller
                  control={control}
                  name={`education.${educationIndex}.start`}
                  render={({ field }) => (
                    <DatePicker
                      className='p-2 border border-black rounded w-full personal-info-input'
                      selected={field.value ? new Date(field.value) : null}
                      onChange={(date) => field.onChange(date?.toISOString() || null)}
                      placeholderText="Please Enter Start Date"
                      showYearDropdown
                      scrollableYearDropdown
                    />
                  )}
                />
                {/* <input
                  {...register(`education.${educationIndex}.end`)}
                  placeholder='Enter end date'
                  className='p-2 border border-gray-300 rounded'
                /> */}
                <Controller
                  control={control}
                  name={`education.${educationIndex}.end`}
                  render={({ field }) => (
                    <DatePicker
                      className='p-2 border border-black rounded w-full personal-info-input'
                      selected={field.value ? new Date(field.value) : null}
                      onChange={(date) => field.onChange(date?.toISOString() || null)}
                      placeholderText="Please Enter End Date"
                      showYearDropdown
                      scrollableYearDropdown
                    />
                  )}
                />
                {/* <input
                    {...register(`education.${educationIndex}.gradeType`)}
                    placeholder='Enter your grade type'
                    className='p-2 border border-gray-300 rounded'
                  /> */}
                <Controller
                  name={`education.${educationIndex}.gradeType`}
                  control={control}
                  render={({ field }) => (
                    <select {...field} onMouseDown={() => setIsClicked(true)} onKeyDown={() => setIsClicked(true)}
                      className='p-2 border border-black rounded w-full personal-info-input'
                    >
                      <option value="">Select Grade Type</option>
                      <option value="CGPA">CGPA</option>
                      <option value="SGPA">SGPA</option>
                      <option value="%">Percentage</option>
                    </select>
                  )}
                />
                {
                  (watchedEducation[educationIndex].gradeType === 'CGPA' ||
                    watchedEducation[educationIndex].gradeType === 'SGPA' ||
                    watchedEducation[educationIndex].gradeType === '%') && (
                    <Controller
                      name={`education.${educationIndex}.grade`}
                      control={control}
                      render={({ field }) => (
                        <input
                          {...field}
                          className='p-2 border border-black rounded w-full personal-info-input'
                          placeholder='Enter your grade'
                          onChange={(e) => {
                            field.onChange(e.target.value);
                            setIsClicked(true);
                          }}
                        />
                      )}
                    />
                  )
                }
                <button
                  className='bg-red-500 text-white personal-info-input font-bold p-2 rounded col-span-2'
                  onClick={() => { setIsClicked(true); removeEducation(educationIndex) }}
                >
                  Remove Education
                </button>
              </div>
            ))
          }
          <button
            className='bg-[#fee68e] w-fit text-white personal-info-input font-bold p-2 rounded col-span-2 ml-4'
            onClick={() => { setIsClicked(true); appendEducation({ degree: '', college: '', start: '', end: '', grade: 0, gradeType: '' }) }}
          >
            Add Education
          </button>
        </div>
        <div>
        </div>
        <input type="submit" />
      </form>
      {!isClicked && <div className=' w-1/2 h-[95vh]'>
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