import { useState } from "react";
import api from "../api/axios";

function PostJobForm({ onJobCreated }) {
  const [jobForm, setJobForm] = useState({
    title: "",
    company: "",
    location: "",
    description: "",
    requirements: "",
    jobType: "Full-Time",
    workmode: "On-Site",
    minSalary: "",
    maxSalary: "",
    experienceLevel: "Fresher",
  });
  const [postMessage, setPostMessage] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setPostMessage("");
    setSubmitting(true);

    try {
      const payload = {
        title: jobForm.title,
        company: jobForm.company,
        location: jobForm.location,
        description: jobForm.description,
        requirements: jobForm.requirements
          .split(",")
          .map((skill) => skill.trim())
          .filter(Boolean),
        jobType: jobForm.jobType,
        workmode: jobForm.workmode,
        salary: {
          min: Number(jobForm.minSalary) || 0,
          max: Number(jobForm.maxSalary) || 0,
          currency: "INR",
        },
        experienceLevel: jobForm.experienceLevel,
      };

      await api.post("/jobs", payload);

      setPostMessage("Job posted successfully!");
      setJobForm({
        title: "",
        company: "",
        location: "",
        description: "",
        requirements: "",
        jobType: "Full-Time",
        workmode: "On-Site",
        minSalary: "",
        maxSalary: "",
        experienceLevel: "Fresher",
      });

      // Notify parent App.jsx to re-fetch the live jobs list
      if (onJobCreated) {
        onJobCreated();
      }
    } catch (err) {
      setPostMessage(err.response?.data?.message || "Failed to post job");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6 mb-8">
      <h2 className="text-lg font-bold text-slate-800 mb-4">
        Post a New Job{" "}
        <span className="text-xs font-medium text-indigo-600">
          (Employer Only)
        </span>
      </h2>

      {postMessage && (
        <div className="mb-4 p-3 rounded-lg bg-indigo-50 border border-indigo-200 text-indigo-800 text-sm font-medium">
          {postMessage}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <input
            type="text"
            placeholder="Job Title (e.g. MERN Stack Developer)"
            value={jobForm.title}
            onChange={(e) => setJobForm({ ...jobForm, title: e.target.value })}
            required
            className="w-full px-3.5 py-2 rounded-lg border border-slate-300 text-slate-900 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
          <input
            type="text"
            placeholder="Company Name"
            value={jobForm.company}
            onChange={(e) =>
              setJobForm({ ...jobForm, company: e.target.value })
            }
            required
            className="w-full px-3.5 py-2 rounded-lg border border-slate-300 text-slate-900 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
          <input
            type="text"
            placeholder="Location (e.g. Hinjewadi, Pune)"
            value={jobForm.location}
            onChange={(e) =>
              setJobForm({ ...jobForm, location: e.target.value })
            }
            required
            className="w-full px-3.5 py-2 rounded-lg border border-slate-300 text-slate-900 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
        </div>

        <textarea
          rows="3"
          placeholder="Job Description"
          value={jobForm.description}
          onChange={(e) =>
            setJobForm({ ...jobForm, description: e.target.value })
          }
          required
          className="w-full px-3.5 py-2 rounded-lg border border-slate-300 text-slate-900 focus:outline-none focus:ring-2 focus:ring-indigo-500"
        />

        <input
          type="text"
          placeholder="Skills (comma-separated: React, Node.js, MongoDB)"
          value={jobForm.requirements}
          onChange={(e) =>
            setJobForm({ ...jobForm, requirements: e.target.value })
          }
          required
          className="w-full px-3.5 py-2 rounded-lg border border-slate-300 text-slate-900 focus:outline-none focus:ring-2 focus:ring-indigo-500"
        />

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <select
            value={jobForm.jobType}
            onChange={(e) =>
              setJobForm({ ...jobForm, jobType: e.target.value })
            }
            className="w-full px-3.5 py-2 rounded-lg border border-slate-300 bg-white text-slate-900 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          >
            <option value="Full-Time">Full-Time</option>
            <option value="Part-Time">Part-Time</option>
            <option value="Contract">Contract</option>
            <option value="Internship">Internship</option>
          </select>

          <select
            value={jobForm.workmode}
            onChange={(e) =>
              setJobForm({ ...jobForm, workmode: e.target.value })
            }
            className="w-full px-3.5 py-2 rounded-lg border border-slate-300 bg-white text-slate-900 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          >
            <option value="On-Site">On-Site</option>
            <option value="Remote">Remote</option>
            <option value="Hybrid">Hybrid</option>
          </select>

          <select
            value={jobForm.experienceLevel}
            onChange={(e) =>
              setJobForm({ ...jobForm, experienceLevel: e.target.value })
            }
            className="w-full px-3.5 py-2 rounded-lg border border-slate-300 bg-white text-slate-900 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          >
            <option value="Fresher">Fresher</option>
            <option value="Junior">Junior</option>
            <option value="Mid-Level">Mid-Level</option>
            <option value="Senior">Senior</option>
          </select>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <input
            type="number"
            placeholder="Min Salary (INR)"
            value={jobForm.minSalary}
            onChange={(e) =>
              setJobForm({ ...jobForm, minSalary: e.target.value })
            }
            className="w-full px-3.5 py-2 rounded-lg border border-slate-300 text-slate-900 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
          <input
            type="number"
            placeholder="Max Salary (INR)"
            value={jobForm.maxSalary}
            onChange={(e) =>
              setJobForm({ ...jobForm, maxSalary: e.target.value })
            }
            className="w-full px-3.5 py-2 rounded-lg border border-slate-300 text-slate-900 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
        </div>

        <button
          type="submit"
          disabled={submitting}
          className="px-5 py-2.5 rounded-lg bg-indigo-600 hover:bg-indigo-700 disabled:bg-indigo-400 text-white font-semibold transition-colors cursor-pointer"
        >
          {submitting ? "Posting..." : "Post Job"}
        </button>
      </form>
    </div>
  );
}

export default PostJobForm;
