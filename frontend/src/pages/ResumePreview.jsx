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
    project,
    selected,
  } = formData;

  console.log("formData ", formData);

  // const downloadResume = useReactToPrint({
  //   content: () => resumeRef.current,
  //   documentTitle: `${personalInfo.fullName}_Resume`,
  // });

  const downloadResume = () => {
    window.print();
  };

  return (
    <div>
      <div
        // ref={resumeRef}
        className="max-w-4xl mx-auto bg-white shadow-md p-8 my-8 text-gray-800 font-sans"
      >
        {selected === "basic" ? (
          <>
            <div className="text-center border-b pb-4 mb-6">
              <h1 className="text-4xl font-bold">
                {personalInfo.fullName.toString()?.toUpperCase()}
              </h1>
              <h2 className="font-medium">
                {personalInfo.jobTitle.toString()?.toUpperCase()}
              </h2>
            </div>

            <div className="mb-6">
              <h2 className="text-xl font-semibold border-b mb-2">
                Personal Info
              </h2>
              <p className="text-sm text-gray-600">
                Email: {personalInfo.email}
              </p>
              <p className="text-sm text-gray-600">
                Phone:{" "}
                {personalInfo.phone.toString().substring(0, 4) +
                  "-" +
                  personalInfo.phone.toString().substring(4)}
              </p>
              <p className="text-sm text-gray-600 capitalize">
                Location: {personalInfo.location}
              </p>
            </div>

            <div className="mb-6">
              <h2 className="text-xl font-semibold border-b mb-2">Skills</h2>
              <ul className="list-disc list-inside capitalize">
                {skills.split(",").map((skill, index) => (
                  <li key={index}>{skill.trim()}</li>
                ))}
              </ul>
            </div>

            {experience?.length > 0 && (
              <div className="mb-6">
                <h2 className="text-xl font-semibold border-b mb-2">
                  Experience
                </h2>
                {experience.map((exp, index) => (
                  <div key={index} className="mb-4">
                    <h3 className="font-bold capitalize">
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
                <h2 className="text-xl font-semibold border-b mb-2">
                  Education
                </h2>
                {education.map((edu, index) => (
                  <div key={index} className="mb-3 capitalize">
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
          <>
            <div className="max-w-3xl mx-auto p-8 bg-white shadow-xl rounded-lg border border-gray-200">
              {/* Header */}
              <div className="text-center border-b pb-6 mb-8">
                <h1 className="text-4xl font-extrabold text-gray-900 tracking-wide uppercase">
                  {personalInfo.fullName.toString()}
                </h1>
                <h2 className="text-lg font-medium text-blue-600 tracking-wider uppercase">
                  {personalInfo.jobTitle.toString()}
                </h2>
              </div>

              {/* Personal Info */}
              <div className="mb-8">
                <h2 className="text-xl font-semibold text-gray-800 border-l-4 border-blue-500 pl-3 mb-4 uppercase">
                  Personal Info
                </h2>
                <ul className="text-sm text-gray-700 space-y-1 pl-3">
                  <li>
                    <strong>Email:</strong> {personalInfo.email}
                  </li>
                  <li>
                    <strong>Phone:</strong>{" "}
                    {personalInfo.phone.toString().substring(0, 4)}-
                    {personalInfo.phone.toString().substring(4)}
                  </li>
                  <li>
                    <strong>Location:</strong>{" "}
                    <span className="capitalize">{personalInfo.location}</span>
                  </li>
                </ul>
              </div>

              {/* Summary */}
              <div className="mb-8">
                <h2 className="text-xl font-semibold text-gray-800 border-l-4 border-blue-500 pl-3 mb-4 uppercase">
                  Summary
                </h2>
            <p className="text-sm text-gray-600 capitalize">{summary}</p>
              </div>

              {/* Skills */}
              <div className="mb-8">
                <h2 className="text-xl font-semibold text-gray-800 border-l-4 border-blue-500 pl-3 mb-4 uppercase">
                  Skills
                </h2>
                <div className="flex flex-wrap gap-2 pl-3">
                  {skills.split(",").map((skill, index) => (
                    <span
                      key={index}
                      className="bg-blue-100 text-blue-800 text-xs px-3 py-1 rounded-full capitalize"
                    >
                      {skill.trim()}
                    </span>
                  ))}
                </div>
              </div>

              {/* Experience */}
              {experience?.length > 0 && (
                <div className="mb-8">
                  <h2 className="text-xl font-semibold text-gray-800 border-l-4 border-blue-500 pl-3 mb-4 uppercase">
                    Experience
                  </h2>
                  {experience.map((exp, index) => (
                    <div key={index} className="mb-5 pl-3">
                      <div className="flex justify-between items-center">
                        <h3 className="font-bold text-gray-900 capitalize">
                          {exp.role} -{" "}
                          <span className="text-blue-600">{exp.company}</span>
                        </h3>
                        <span className="text-xs text-gray-500">
                          {exp.from} → {exp.to}
                        </span>
                      </div>
                      <ul className="list-disc pl-5 text-sm text-gray-700 capitalize">
                        {exp.description
                          .split(/\n|(?<=\.)/)
                          .map((line) => line.trim())
                          .filter((line) => line.length > 0)
                          .map((line, index) => {
                            const formattedLine = line.endsWith(".")
                              ? line
                              : line + ".";
                            return <li key={index}>{formattedLine}</li>;
                          })}
                      </ul>
                    </div>
                  ))}
                </div>
              )}

              {/* Education */}
              {education?.length > 0 && (
                <div className="mb-8">
                  <h2 className="text-xl font-semibold text-gray-800 border-l-4 border-blue-500 pl-3 mb-4 uppercase">
                    Education
                  </h2>
                  {education.map((edu, index) => (
                    <div key={index} className="mb-4 pl-3 capitalize">
                      <h3 className="font-bold text-gray-900">{edu.degree}</h3>
                      <p className="text-sm text-gray-600">
                        {edu.university} | {edu.from} - {edu.to}
                      </p>
                    </div>
                  ))}
                </div>
              )}

              {/* Projects */}
              {project?.length > 0 && (
                <div className="mb-8">
                  <h2 className="text-xl font-semibold text-gray-800 border-l-4 border-blue-500 pl-3 mb-4 uppercase">
                    Projects
                  </h2>
                  {project.map((project, index) => (
                    <div key={index} className="mb-5 pl-3 capitalize">
                      <h3 className="font-bold text-gray-900">
                        {project.title}
                      </h3>
                      <p className="text-sm text-gray-700 mb-1">
                        <strong>Tech Stack:</strong> {project.techStack}
                      </p>
                      <p className="text-sm text-blue-600 mb-1 underline">
                        {project.link}
                      </p>

                      <ul className="list-disc pl-5 text-sm text-gray-700 capitalize">
                        {project.description
                          .split(/\n|(?<=\.)/)
                          .map((line) => line.trim())
                          .filter((line) => line.length > 0)
                          .map((line, index) => {
                            const formattedLine = line.endsWith(".")
                              ? line
                              : line + ".";
                            return <li key={index}>{formattedLine}</li>;
                          })}
                      </ul>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </>
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
