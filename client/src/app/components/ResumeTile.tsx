import React from 'react';

interface ResumeTileProps {
  name: string;
  email: string;
  phone: string;
  projects: { name: string; description: string }[];
  experience: { role: string; company: string; duration: string }[];
}

const ResumeTile: React.FC<ResumeTileProps> = ({ name, email, phone, projects, experience }) => {
  return (
    <div className="w-72 h-auto bg-white border-4 border-black rounded-xl shadow-[6px_6px_0px_rgba(0,0,0,0.8)] p-4">
      <div className="text-lg font-bold">{name}</div>
      <div className="text-sm text-gray-600">{email}</div>
      <div className="text-sm text-gray-600 mb-4">{phone}</div>

      <div>
        <p className="font-semibold underline mb-1">Projects</p>
        {projects?.slice(0, 2).map((project, idx) => (
          <div key={idx} className="mb-2">
            <p className="font-medium">{project.name}</p>
            <p className="text-xs text-gray-700 line-clamp-2">{project.description}</p>
          </div>
        ))}
      </div>

      <div>
        <p className="font-semibold underline mb-1">Experience</p>
        {experience?.slice(0, 2).map((exp, idx) => (
          <div key={idx} className="mb-1">
            <p className="text-sm font-medium">{exp.role}</p>
            <p className="text-xs text-gray-600">{exp.company} • {exp.duration}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ResumeTile;
