import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';

export default function ResumeForm() {
  const [selected, setSelected] = useState('');
  const [personalInfo, setPersonalInfo] = useState({
    // Personal Info //
    fullName: '',
    email: '',
    phone: '',
    location: '',
    jobTitle: '',
  });
  // Summary //
  const [summary, setSummary] = useState('');
  // Skills //
  const [skills, setSkills] = useState('');
  // Experience //
  const [experience, setExperience] = useState([]);
  const [tempExperience, setTempExperience] = useState({
    role: '',
    company: '',
    from: '',
    to: '',
    description: '',
  });
  // Education //
  const [education, setEducation] = useState([]);
  const [tempEducation, setTempEducation] = useState({
    degree: '',
    university: '',
    from: '',
    to: '',
  });
  // Projects //
  const [project, setProject] = useState([]);
  const [tempProject, setTempProject] = useState({
    title: '',
    description: '',
    techStack: '',
    link: '',
  });

  const navigate = useNavigate();

  let addExpBtnClicked = false;

  const handleDropDownChange = (e) => {
    setSelected(e.target.value);
    setPersonalInfo({
      fullName: '',
      email: '',
      phone: '',
      location: '',
      jobTitle: '',
    });
    setSummary('');
    setSkills('');
    setExperience([]);
    setEducation([]);
    setProject([]);
    setTempExperience({
      role: '',
      company: '',
      from: '',
      to: '',
      description: '',
    });
    setTempEducation({
      degree: '',
      university: '',
      from: '',
      to: '',
    });
    setTempProject({
      title: '',
      description: '',
      techStack: '',
      link: '',
    });
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
    
    let fromDate = tempExperience.from.toString().split("-").reverse().join("/");
    let toDate = tempExperience.to.toString().split("-").reverse().join("/")

    if(new Date(fromDate).getTime() > new Date(toDate).getTime()){
      Swal.fire({
        title: 'Message',
        text: 'To Date must be greater than From Date.',
        icon: 'error',
      }).then(()=>{
        setTempExperience((prev) => ({
          ...prev,
          to: "",
        }));
      })
      return;
    }

    const updatedExperience = [...experience, tempExperience];
    const sortedData = updatedExperience.sort(
      (a, b) => new Date(b.from) - new Date(a.from)
    );
    setExperience(sortedData);
    setTempExperience({
      role: '',
      company: '',
      from: '',
      to: '',
      description: '',
    });

    addExpBtnClicked = true;
  };

  const removeExperience = () => {
    setExperience((prev) => prev.slice(0, -1));

    if (experience.length != 0) {
      Swal.fire({
        title: 'Message',
        text: 'Last added Experience has been removed.',
        icon: 'success',
      });
      return;
    }
  };

  const handleEducationChange = (e) => {
    const { name, value } = e.target;
    setTempEducation((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const addEducation = () => {
    if (
      Number(tempEducation.from) <= 1980 ||
      Number(tempEducation.to) > new Date().getFullYear()
    ) {
      Swal.fire({
        title: 'Message',
        text: 'Please enter valid From/To Year.',
        icon: 'error',
      });
      return;
    }
    if (Number(tempEducation.from) > Number(tempEducation.to)) {
      Swal.fire({
        title: 'Message',
        text: 'To Year must be greater than From Year.',
        icon: 'error',
      });
      return;
    }
    // }

    setEducation((prev) => [...prev, tempEducation]);

    setTempEducation({
      degree: '',
      university: '',
      from: '',
      to: '',
    });
  };

  const removeEducation = () => {
    setEducation((prev) => prev.slice(0, -1));
    if (education.length != 0) {
      Swal.fire({
        title: 'Message',
        text: 'Last added Education has been removed.',
        icon: 'success',
      });
      return;
    }
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
      title: '',
      description: '',
      techStack: '',
      link: '',
    });
  };

  const removeProject = () => {
    setProject((prev) => prev.slice(0, -1));
    if (project.length != 0) {
      Swal.fire({
        title: 'Message',
        text: 'Last added Project has been removed.',
        icon: 'success',
      });
      return;
    }
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const phoneRegex = /^(\+92|0)?3[0-9]{9}$/;
    console.log('personalInfo ', personalInfo);

    if (
      !personalInfo.fullName ||
      !personalInfo.email ||
      !personalInfo.phone ||
      !personalInfo.location
    ) {
      Swal.fire({
        title: 'Message',
        text: 'Please fill all Personal Info fields before previewing.',
        icon: 'warning',
      });
      return;
    }
    if (!emailRegex.test(personalInfo.email)) {
      Swal.fire({
        title: 'Message',
        text: 'Email is Invalid.',
        icon: 'error',
      });
      return;
    }
    if (!phoneRegex.test(personalInfo.phone)) {
      Swal.fire({
        title: 'Message',
        text: 'Phone Number is Invalid.',
        icon: 'error',
      });
      return;
    }
    if (selected === 'modern') {
      if (summary === '') {
        Swal.fire({
          title: 'Message',
          text: 'Enter Summary.',
          icon: 'warning',
        });
        return;
      }
    }
    if (skills === '') {
      Swal.fire({
        title: 'Message',
        text: 'Enter atleast one Skill.',
        icon: 'warning',
      });
      return;
    }
    if (experience.length == 0) {
      Swal.fire({
        title: 'Message',
        text: 'Please add at least one Experience entry.',
        icon: 'warning',
      });
      return;
    }
    if (education.length == 0) {
      Swal.fire({
        title: 'Message',
        text: 'Please add at least one Education entry.',
        icon: 'warning',
      });
      return;
    }
    if (selected === 'modern' && project.length == 0) {
      Swal.fire({
        title: 'Message',
        text: 'Please add at least one Project entry.',
        icon: 'warning',
      });
      return;
    }

    const formData = {
      selected,
      personalInfo,
      summary,
      skills,
      experience,
      education,
      project,
    };

    localStorage.setItem('resumeData', JSON.stringify(formData));

    navigate('/preview');
  };

  useEffect(() => {
    const savedData = localStorage.getItem('resumeData');
    if (savedData) {
      const parsed = JSON.parse(savedData);
      setSelected(parsed.selected);
      setPersonalInfo(parsed.personalInfo);
      setSummary(parsed.summary);
      setSkills(parsed.skills);
      setExperience(parsed.experience);
      setEducation(parsed.education);
      setProject(parsed.project);
    }
  }, []);

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
          <option value="">Choose</option>
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
            {['fullName', 'email', 'phone', 'location', 'jobTitle'].map(
              (field) => (
                <div key={field}>
                  <label className="block font-medium text-gray-700 capitalize">
                    {field.replace(/([A-Z])/g, ' $1')}
                  </label>

                  <input
                    type="text"
                    name={field}
                    value={personalInfo[field]}
                    onChange={(e) => {
                      let value = e.target.value;

                      if (field === 'phone') {
                        // Only digits allowed
                        value = value.replace(/\D/g, '').slice(0, 11);
                      } else if (
                        ['fullName', 'location', 'jobTitle'].includes(field)
                      ) {
                        // Only letters and spaces
                        value = value.replace(/[^a-zA-Z\s]/g, '');
                      }

                      handlePersonalInfoChange({
                        target: {
                          name: field,
                          value,
                        },
                      });
                    }}
                    className="w-full p-2 border rounded"
                  />
                </div>
              )
            )}
          </div>
        </div>
        {/* Summary */}
        {selected === 'modern' && (
          <div>
            <h2 className="text-xl font-bold text-blue-800 mb-2">Summary</h2>
            <textarea
              name="summary"
              type="alphabet"
              value={summary}
              rows={4}
              onChange={(e) => {
                const value = e.target.value.replace(/[^a-zA-Z\s.,]/g, '');
                handleSummaryChange({
                  target: {
                    name: 'summary',
                    value,
                  },
                });
              }}
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
            onChange={(e) => {
              const value = e.target.value.replace(/[^a-zA-Z\s.,+#]/g, '');
              handleSkillsChange({
                target: {
                  name: 'skills',
                  value,
                },
              });
            }}
            className="w-full p-2 border rounded"
            placeholder="e.g., React, Node.js, SQL"
          />
        </div>
        {/* Experience */}
        <div>
          <h2 className="text-xl font-bold text-blue-800 mb-4">Experience</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {['role', 'company', 'from', 'to'].map((field) => (
              <div key={field}>
                <label className="block font-medium text-gray-700 capitalize">
                  {field}
                </label>

                {['from', 'to'].includes(field) ? (
                  <input
                    type="date"
                    name={field}
                    value={tempExperience[field]}
                    onChange={handleExperienceChange}
                    className="w-full p-2 border rounded"
                  />
                ) : (
                  <input
                    type="text"
                    name={field}
                    value={tempExperience[field]}
                    onChange={(e) => {
                      let value = e.target.value;

                      if (['role', 'company'].includes(field)) {
                        value = value.replace(/[^a-zA-Z\s.]/g, '');
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
                )}
              </div>
            ))}
          </div>

          {selected === 'modern' && (
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
            {['degree', 'university', 'from', 'to'].map((field) => (
              <div key={field}>
                <label className="block font-medium text-gray-700 capitalize">
                  {field.replace(/([A-Z])/g, ' $1')}
                </label>
                <input
                  type="text"
                  name={field}
                  value={tempEducation[field]}
                  onChange={(e) => {
                    let value = e.target.value;

                    if (['from', 'to'].includes(field)) {
                      // Allow only numbers, max 4 digits
                      if (/^\d{0,4}$/.test(value)) {
                        handleEducationChange({
                          target: {
                            name: field,
                            value,
                          },
                        });
                      }
                    } else if (['degree', 'university'].includes(field)) {
                      // Allow only letters and spaces
                      value = value.replace(/[^a-zA-Z\s.,]/g, '');
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
                    ['from', 'to'].includes(field) ? 'numeric' : undefined
                  }
                  maxLength={['from', 'to'].includes(field) ? 4 : undefined}
                  placeholder={
                    ['from', 'to'].includes(field) ? 'e.g. 2023' : ''
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
        {/* Projects */}
        {selected === 'modern' && (
          <div>
            <h2 className="text-xl font-bold text-blue-800 mb-4">Projects</h2>
            {['title', 'description', 'techStack', 'link'].map((field) => (
              <div key={field} className="mb-3">
                <label className="block font-medium text-gray-700 capitalize">
                  {field}
                </label>

                {field === 'description' ? (
                  <textarea
                    name={field}
                    value={tempProject[field]}
                    onChange={(e) => {
                      const value = e.target.value.replace(
                        /[^a-zA-Z0-9\s.,]/g,
                        ''
                      );
                      handleProjectsChange({
                        target: {
                          name: field,
                          value,
                        },
                      });
                    }}
                    rows={4}
                    className="w-full p-2 border rounded resize-none"
                    placeholder="Describe your project..."
                  />
                ) : (
                  <input
                    type="text"
                    name={field}
                    value={tempProject[field]}
                    onChange={(e) => {
                      let value = e.target.value;

                      if (['title', 'techStack'].includes(field)) {
                        value = value.replace(/[^a-zA-Z\s.,]/g, '');
                        handleProjectsChange({
                          target: {
                            name: field,
                            value,
                          },
                        });
                      } else handleProjectsChange(e);
                    }}
                    className="w-full p-2 border rounded"
                  />
                )}
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
