import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function ResumeForm() {
  const [selected, setSelected] = useState("");
  const [personalInfo, setPersonalInfo] = useState({
    // Personal Info //
    fullName: "",
    email: "",
    phone: "",
    location: "",
    jobTitle: "",
  });
  // Summary //
  const [summary, setSummary] = useState("");
  // Skills //
  const [skills, setSkills] = useState("");
  // Experience //
  const [experience, setExperience] = useState([]);
  const [tempExperience, setTempExperience] = useState({
    role: "",
    company: "",
    from: "",
    to: "",
    description: "",
  });
  // Education //
  const [education, setEducation] = useState([]);
  const [tempEducation, setTempEducation] = useState({
    degree: "",
    university: "",
    from: "",
    to: "",
  });
  // Projects //
  const [project, setProject] = useState([]);
  const [tempProject, setTempProject] = useState({
    title: "",
    description: "",
    techStack: "",
    link: "",
  });

  const navigate = useNavigate();

  const handleDropDownChange = (e) => {
    setSelected(e.target.value);
  };

  const handlePersonalInfoChange = (e) => {
    const { name, value } = e.target;
    setPersonalInfo((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSummaryChange = (e) => {
    setSummary(e.target.value);
  };

  const handleSkillsChange = (e) => {
    setSkills(e.target.value);
  };

  const handleExperienceChange = (e) => {
    const { name, value } = e.target;
    setTempExperience((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const addExperience = () => {
    setExperience((prev) => [...prev, tempExperience]);

    setTempExperience({
      role: "",
      company: "",
      from: "",
      to: "",
      description: "",
    });
  };

  const removeExperience = () => {
    setExperience((prev) => prev.slice(0, -1));
  };

  const handleEducationChange = (e) => {
    const { name, value } = e.target;
    setTempEducation((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const addEducation = () => {
    setEducation((prev) => [...prev, tempEducation]);

    setTempEducation({
      degree: "",
      university: "",
      from: "",
      to: "",
    });
  };

  const removeEducation = () => {
    setEducation((prev) => prev.slice(0, -1));
  };

  const handleProjectsChange = (e) => {
    const { name, value } = e.target;
    setTempProject((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const addProject = () => {
    setProject((prev) => [...prev, tempProject]);

    setTempProject({
      title: "",
      description: "",
      techStack: "",
      link: "",
    });
  };

  const removeProject = () => {
    setProject((prev) => prev.slice(0, -1));
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    const formData = {
      selected,
      personalInfo,
      summary,
      skills,
      experience,
      education,
      project,
    };

    navigate("/preview", {
      state: {
        selected,
        personalInfo,
        summary,
        skills,
        experience,
        education,
        project,
      },
    });
  };

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white shadow-lg rounded-lg space-y-6">
      {/* Template Selector */}
      <div className="flex flex-col sm:flex-row sm:items-center gap-2">
        <label htmlFor="role" className="font-semibold text-gray-700">
          Select your Resume Template:
        </label>
        <select
          id="role"
          value={selected}
          onChange={handleDropDownChange}
          className="border rounded p-2"
        >
          <option value="">-- Choose --</option>
          <option value="basic">Basic</option>
          <option value="modern">Modern</option>
        </select>
      </div>

      <form onSubmit={handleFormSubmit} className="space-y-6">
        {/* Personal Information */}
        <div>
          <h2 className="text-xl font-bold text-blue-800 mb-4">
            Personal Information
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {["fullName", "email", "phone", "location", "jobTitle"].map(
              (field) => (
                <div key={field}>
                  <label className="block font-medium text-gray-700 capitalize">
                    {field.replace(/([A-Z])/g, " $1")}
                  </label>

                  <input
                    type="text"
                    name={field}
                    value={personalInfo[field]}
                    onChange={(e) => {
                      let value = e.target.value;

                      if (field === "phone") {
                        // Only digits allowed
                        value = value.replace(/\D/g, "").slice(0, 11);
                      } else if (
                        ["fullName", "location", "jobTitle"].includes(field)
                      ) {
                        // Only letters and spaces
                        value = value.replace(/[^a-zA-Z\s]/g, "");
                      }

                      handlePersonalInfoChange({
                        target: {
                          name: field,
                          value,
                        },
                      });
                    }}
                    required
                    className="w-full p-2 border rounded"
                  />
                </div>
              )
            )}
          </div>
        </div>
        {/* Summary */}
        {selected === "modern" && (
          <div>
            <h2 className="text-xl font-bold text-blue-800 mb-2">Summary</h2>
            <textarea
              name="summary"
              value={summary}
              onChange={handleSummaryChange}
              required
              className="w-full p-3 border rounded"
              placeholder="Write a short professional summary"
            />
          </div>
        )}
        {/* Skills */}
        <div>
          <h2 className="text-xl font-bold text-blue-800 mb-2">Skills</h2>
          <input
            type="text"
            name="skills"
            value={skills}
            onChange={handleSkillsChange}
            required
            className="w-full p-2 border rounded"
            placeholder="e.g., React, Node.js, SQL"
          />
        </div>
        {/* Experience */}
        <div>
          <h2 className="text-xl font-bold text-blue-800 mb-4">Experience</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {["role", "company", "from", "to"].map((field) => (
              <div key={field}>
                <label className="block font-medium text-gray-700 capitalize">
                  {field}
                </label>
                <input
                  type="text"
                  name={field}
                  value={tempExperience[field]}
                  onChange={(e) => {
                    let value = e.target.value;

                    if (field === "role") {
                      value = value.replace(/[^a-zA-Z\s]/g, ""); // Only letters and spaces
                      handleExperienceChange({
                        target: {
                          name: field,
                          value,
                        },
                      });
                    } else {
                      handleExperienceChange(e);
                    }
                  }}
                  className="w-full p-2 border rounded"
                />
              </div>
            ))}
          </div>

          {selected === "modern" && (
            <div className="mt-2">
              <label className="block font-medium text-gray-700">
                Description
              </label>
              <textarea
                name="description"
                value={tempExperience.description}
                onChange={handleExperienceChange}
                className="w-full p-3 border rounded"
              />
            </div>
          )}

          <div className="flex items-center justify-between mt-6">
            <button
              type="button"
              onClick={addExperience}
              className="px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 shadow-md transition duration-200"
            >
              ➕ Add Experience
            </button>

            <button
              type="button"
              onClick={removeExperience}
              className="px-6 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 shadow-md transition duration-200"
              disabled={experience.length === 0}
            >
              🗑️ Remove Experience
            </button>
          </div>
        </div>
        {/* Education */}
        <div>
          <h2 className="text-xl font-bold text-blue-800 mb-4">Education</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {["degree", "university", "from", "to"].map((field) => (
              <div key={field}>
                <label className="block font-medium text-gray-700 capitalize">
                  {field.replace(/([A-Z])/g, " $1")}
                </label>
                <input
                  type="text"
                  name={field}
                  value={tempEducation[field]}
                  onChange={(e) => {
                    let value = e.target.value;

                    if (["from", "to"].includes(field)) {
                      // Allow only numbers, max 4 digits
                      if (/^\d{0,4}$/.test(value)) {
                        handleEducationChange({
                          target: {
                            name: field,
                            value,
                          },
                        });
                      }
                    } else if (["degree", "university"].includes(field)) {
                      // Allow only letters and spaces
                      value = value.replace(/[^a-zA-Z\s]/g, "");
                      handleEducationChange({
                        target: {
                          name: field,
                          value,
                        },
                      });
                    } else {
                      handleEducationChange(e);
                    }
                  }}
                  className="w-full p-2 border rounded"
                  inputMode={
                    ["from", "to"].includes(field) ? "numeric" : undefined
                  }
                  maxLength={["from", "to"].includes(field) ? 4 : undefined}
                  placeholder={
                    ["from", "to"].includes(field) ? "e.g. 2023" : ""
                  }
                />
              </div>
            ))}
          </div>

          <div className="flex items-center justify-between mt-6">
            <button
              type="button"
              onClick={addEducation}
              className="px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 shadow-md transition duration-200"
            >
              ➕ Add Education
            </button>

            <button
              type="button"
              onClick={removeEducation}
              className="px-6 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 shadow-md transition duration-200"
            >
              🗑️ Remove Education
            </button>
          </div>
        </div>
        -{/* Projects */}
        {selected === "modern" && (
          <div>
            <h2 className="text-xl font-bold text-blue-800 mb-4">Projects</h2>
            {["title", "description", "techStack", "link"].map((field) => (
              <div key={field} className="mb-3">
                <label className="block font-medium text-gray-700 capitalize">
                  {field}
                </label>
                <input
                  type="text"
                  name={field}
                  value={tempProject[field]}
                  onChange={handleProjectsChange}
                  className="w-full p-2 border rounded"
                />
              </div>
            ))}

            <div className="flex items-center justify-between mt-6">
              <button
                type="button"
                onClick={addProject}
                className="px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 shadow-md transition duration-200"
              >
                ➕ Add Project
              </button>

              <button
                type="button"
                onClick={removeProject}
                className="px-6 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 shadow-md transition duration-200"
              >
                🗑️ Remove Project
              </button>
            </div>
          </div>
        )}
        {/* Preview */}
        <div className="text-center">
          <button
            type="submit"
            className="px-6 py-2 bg-blue-700 text-white rounded hover:bg-blue-800"
          >
            Preview
          </button>
        </div>
      </form>
    </div>
  );
}
