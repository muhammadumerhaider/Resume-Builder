import React, { useState } from "react";

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
  const [experience, setExperience] = useState([
    {
      role: "",
      company: "",
      from: "",
      to: "",
      description: "",
    },
  ]);
  // Education //
  const [education, setEducation] = useState([
    {
      degree: "",
      university: "",
      eduFromDate: "",
      eduToDate: "",
    },
  ]);
  // Projects //
  const [projects, setProjects] = useState([
    {
      title: "",
      description: "",
      techStack: "",
      link: "",
    },
  ]);

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

const handleExperienceChange = (e, index) => {
  const { name, value } = e.target;
  const updatedExperience = [...experience];
  updatedExperience[index] = {
    ...updatedExperience[index],
    [name]: value,
  };
  setExperience(updatedExperience);
};


  const addExperience = (e) => {
    e.preventDefault()
  setExperience((prev) => [
    ...prev,
    {
      role: "",
      company: "",
      from: "",
      to: "",
      description: "",
    },
  ]);
};

const removeExperience = (index) => {
  setExperience((prev) => prev.filter((_, i) => i !== index));
};

  const handleEducationChange = (e, index) => {
    const { name, value } = e.target;

    setEducation((prevEducation) => {
      const updated = [...prevEducation];
      updated[index] = {
        ...updated[index],
        [name]: value,
      };
      return updated;
    });
  };

  const handleProjectsChange = (e, index) => {
    const { name, value } = e.target;

    setProjects((prevProjects) => {
      const updated = [...prevProjects];
      updated[index] = {
        ...updated[index],
        [name]: value,
      };
      return updated;
    });
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
      projects,
    };

    console.log("formData ", formData);
    return formData;
  };

  return (
    <div>
      <div>
        <label htmlFor="role">Select your Resume Template: </label>
        <select id="role" value={selected} onChange={handleDropDownChange}>
          <option value="">-- Choose --</option>
          <option value="basic">Basic</option>
          <option value="modern">Modern</option>
        </select>
      </div>

      <div>
        <form onSubmit={handleFormSubmit}>
          {/* Personal Info */}

          <div>
            <h2> Personal Information </h2>

            <div>
              <label>Full Name</label>
              <input
                type="text"
                name="fullName"
                value={personalInfo.fullName}
                onChange={handlePersonalInfoChange}
                required
              />
            </div>

            <div>
              <label>Email</label>
              <input
                type="text"
                name="email"
                value={personalInfo.email}
                onChange={handlePersonalInfoChange}
                required
              />
            </div>

            <div>
              <label>Phone</label>
              <input
                type="text"
                name="phone"
                value={personalInfo.phone}
                onChange={handlePersonalInfoChange}
                required
              />
            </div>

            <div>
              <label>Location</label>
              <input
                type="text"
                name="location"
                value={personalInfo.location}
                onChange={handlePersonalInfoChange}
                required
              />
            </div>

            <div>
              <label>Job Title</label>
              <input
                type="text"
                name="jobTitle"
                value={personalInfo.jobTitle}
                onChange={handlePersonalInfoChange}
                required
              />
            </div>
          </div>

          {/* Summary */}

          {selected == "modern" && (
            <div>
              <h2> Summary </h2>

              <div>
                <label>Summary</label>
                <input
                  type="text"
                  name="summary"
                  value={summary}
                  onChange={handleSummaryChange}
                  required
                />
              </div>
            </div>
          )}

          {/* Skills */}

          <div>
            <h2> Skills </h2>

            <div>
              <label>Skills</label>
              <input
                type="text"
                name="skills"
                value={skills}
                onChange={handleSkillsChange}
                required
              />
            </div>
          </div>

          {/* Experience */}

          <div>
            <div>
            <h2> Experience </h2>

            <div>
              <label>Role</label>
              <input
                type="text"
                name="role"
                value={experience.role}
                onChange={(e, index) => handleExperienceChange(e, index)}
                required
              />
            </div>

            <div>
              <label>Company</label>
              <input
                type="text"
                name="company"
                value={experience.company}
                onChange={(e, index) => handleExperienceChange(e, index)}
                required
              />
            </div>

            <div>
              <label>From</label>
              <input
                type="text"
                name="from"
                value={experience.from}
                onChange={(e, index) => handleExperienceChange(e, index)}
                required
              />
            </div>

            <div>
              <label>To</label>
              <input
                type="text"
                name="to"
                value={experience.to}
                onChange={(e, index) => handleExperienceChange(e, index)}
                required
              />
            </div>

            <div>
              <label>Description</label>
              <textarea
                name="description"
                value={experience.description}
                onChange={(e, index) => handleExperienceChange(e, index)}
                required
              />
            </div>

              <button type="button" onClick={() => removeExperience(index)} > Remove Experience</button>

            </div>

          <button  type="button"  onClick={addExperience}> Add Experience </button>

          </div>

          {/* Education */}

          <div>
            <h2> Education </h2>

            <div>
              <label>Degree</label>
              <input
                type="text"
                name="degree"
                value={education.degree}
                onChange={(e, index) => handleEducationChange(e, index)}
                required
              />
            </div>

            <div>
              <label>University</label>
              <input
                type="text"
                name="university"
                value={education.university}
                onChange={(e, index) => handleEducationChange(e, index)}
                required
              />
            </div>

            <div>
              <label>From</label>
              <input
                type="text"
                name="eduFromDate"
                value={education.eduFromDate}
                onChange={(e, index) => handleEducationChange(e, index)}
                required
              />
            </div>

            <div>
              <label>To</label>
              <input
                type="text"
                name="eduToDate"
                value={experience.eduToDate}
                onChange={(e, index) => handleEducationChange(e, index)}
                required
              />
            </div>
          </div>

          {/* Projects */}

        {selected=="modern" && (
          <div>
            <h2> Projects </h2>

            <div>
              <label>Title</label>
              <input
                type="text"
                name="title"
                value={projects.title}
                onChange={(e, index) => handleProjectsChange(e, index)}
                required
              />
            </div>

            <div>
              <label>Description</label>
              <input
                type="text"
                name="description"
                value={projects.description}
                onChange={(e, index) => handleProjectsChange(e, index)}
                required
              />
            </div>

            <div>
              <label>Tech Stack</label>
              <input
                type="text"
                name="techStack"
                value={projects.techStack}
                onChange={(e, index) => handleProjectsChange(e, index)}
                required
              />
            </div>

            <div>
              <label>Link</label>
              <input
                type="text"
                name="link"
                value={projects.link}
                onChange={(e, index) => handleProjectsChange(e, index)}
                required
              />
            </div>
          </div>
          )}

          <div>
            <button type="submit">Preview</button>
          </div>
        </form>
      </div>
    </div>
  );
}
