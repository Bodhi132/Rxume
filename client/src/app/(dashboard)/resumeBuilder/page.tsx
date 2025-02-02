"use client"
import React, { useState , useEffect } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { technicalSkills } from '@/data/frontendSkills';

const App: React.FC = () => {
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


  useEffect(() => {
    console.log(selectedSkills);
  }, [selectedSkills])
  

  const handleSkillSelect = (skill: string, category: keyof typeof technicalSkills) => {
    setSelectedSkills((prevSelectedSkills) => ({
      ...prevSelectedSkills,
      [category]: [...prevSelectedSkills[category], skill],
    }));
    
  };

  const handleRemoveSkill = (skill: string, category: keyof typeof technicalSkills) => {
    setSelectedSkills((prevSelectedSkills) => ({
      ...prevSelectedSkills,
      [category]: prevSelectedSkills[category].filter((s) => s !== skill),
    }));
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>, category: keyof typeof technicalSkills) => {
    setInputValues({
      ...inputValues,
      [category]: event.target.value
    });
  };

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
      start: string;
      end: string;
      description: string[];
    };
    projects: {
      name: string;
      description: string[];
      link: string;
      techStack: string[];
    };
    education: {
      degree: string;
      college: string;
      start: string;
      end: string;
    };
  };

  const { register, handleSubmit } = useForm<FormData>();
  const onSubmit: SubmitHandler<FormData> = (data) => console.log(data);

  return (
    <div className="App p-4">
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
        <h2 className="text-xl font-bold mb-4">Personal Details</h2>
        <input className="p-2 border border-gray-300 rounded" type="text" placeholder="Name" {...register('userInfo.name')} />
        <input className="p-2 border border-gray-300 rounded" type="number" placeholder="Phone" {...register('userInfo.phone')} />
        <input className="p-2 border border-gray-300 rounded" type="email" placeholder="Email" {...register('userInfo.email')} />
        <input className="p-2 border border-gray-300 rounded" type="text" placeholder="Provide a link to your LinkedIn account" {...register('userInfo.linkedin')} />
        <input className="p-2 border border-gray-300 rounded" type="text" placeholder="Provide a link to your GitHub account" {...register('userInfo.github')} />
        <input className="p-2 border border-gray-300 rounded" type="text" placeholder="Provide a link to your Twitter account" {...register('userInfo.twitter')} />
        <input className="p-2 border border-gray-300 rounded" type="text" placeholder="Provide a link to your Portfolio" {...register('userInfo.portfolio')} />

        <h2 className="text-xl font-bold my-4">Technical Skills</h2>
        <div>
          {Object.keys(technicalSkills).map((category) => (
            <div key={category} className="mb-4">
              <h3 className="text-lg font-semibold">{category.toUpperCase()}</h3>
              <div className="flex flex-wrap border border-gray-400 p-2 rounded">
                {selectedSkills[category as keyof typeof technicalSkills].map((skill, index) => (
                  <button
                    key={index}
                    className="m-1 px-2 py-1 bg-red-500 text-white rounded hover:bg-red-700"
                    onClick={() => handleRemoveSkill(skill, category as keyof typeof technicalSkills)}
                  >
                    {skill} &times;
                  </button>
                ))}
                <div className="relative">
                  <input
                    type="text"
                    className="border-none flex-1 outline-none"
                    placeholder="Type to search..."
                    value={inputValues[category as keyof typeof technicalSkills]}
                    onChange={(e) => handleInputChange(e, category as keyof typeof technicalSkills)}
                  />
                  {technicalSkills[category as keyof typeof technicalSkills]
                    .filter((skill) =>
                      skill.toLowerCase().includes(inputValues[category as keyof typeof technicalSkills].toLowerCase())
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
                </div>
              </div>
            </div>
          ))}
        </div>
      </form>
    </div>
  );
};

export default App;
