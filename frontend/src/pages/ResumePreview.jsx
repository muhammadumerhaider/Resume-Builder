import React, { useRef } from "react";
import { useLocation } from "react-router-dom";
// import { useReactToPrint } from "react-to-print";

export default function ResumePreview() {
  const location = useLocation();
  const formData = location.state;

  // const resumeRef = useRef();

  if (!formData) return <div>No resume data found.</div>;

  const {
    personalInfo,
    summary,
    skills,
    experience,
    education,
    projects,
    selected,
  } = formData;

  // const downloadResume = useReactToPrint({
  //   content: () => resumeRef.current,
  //   documentTitle: `${personalInfo.fullName}_Resume`,
  // });

  const downloadResume = (()=>{
    window.print();
  })

  return (
    <div>
      <div
        // ref={resumeRef}
        className="max-w-4xl mx-auto bg-white shadow-md p-8 my-8 text-gray-800 font-sans"
      >
        {selected === "basic" ? (
          <>
            <div className="text-center border-b pb-4 mb-6">
              <h1 className="text-3xl font-bold">{personalInfo.fullName}</h1>
              <h2 className="font-semibold">{personalInfo.jobTitle}</h2>
            </div>

            <div className="mb-6">
              <h2 className="text-xl font-semibold border-b mb-2">Personal Info</h2>
              <p className="text-sm text-gray-600">Email: {personalInfo.email}</p>
              <p className="text-sm text-gray-600">Phone: {personalInfo.phone.toString().substring(0,4)+"-"+personalInfo.phone.toString().substring(4)}</p>
              <p className="text-sm text-gray-600 capitalize">Location: {personalInfo.location}</p>
            </div>

            <div className="mb-6">
              <h2 className="text-xl font-semibold border-b mb-2">Skills</h2>
              <ul className="list-disc list-inside">
                {skills.split(",").map((skill, index) => (
                  <li key={index}>{skill.trim()}</li>
                ))}
              </ul>
            </div>

            {experience?.length > 0 && (
              <div className="mb-6">
                <h2 className="text-xl font-semibold border-b mb-2">Experience</h2>
                {experience.map((exp, index) => (
                  <div key={index} className="mb-4">
                    <h3 className="font-bold">
                      {exp.role} - {exp.company}
                    </h3>
                    <p className="text-sm text-gray-600">
                      {exp.from} - {exp.to}
                    </p>
                  </div>
                ))}
              </div>
            )}

            {education?.length > 0 && (
              <div className="mb-6">
                <h2 className="text-xl font-semibold border-b mb-2">Education</h2>
                {education.map((edu, index) => (
                  <div key={index} className="mb-3">
                    <h3 className="font-bold">{edu.degree}</h3>
                    <p className="text-sm">
                      {edu.university} | {edu.from} - {edu.to}
                    </p>
                  </div>
                ))}
              </div>
            )}
          </>
        ) : (
          <div className="text-center">
            <h1 className="text-3xl font-bold mb-4">Modern Template</h1>
            <p>Coming soon...</p>
          </div>
        )}
      </div>

      <div className="flex justify-center my-6 no-print">
        <button
          onClick={downloadResume}
          className="px-6 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition duration-200"
        >
          📄 Download Resume
        </button>
      </div>
    </div>
  );
}
