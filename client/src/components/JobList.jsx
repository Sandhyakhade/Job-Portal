import { useState } from "react";

function JobList({ jobs, loading, error, onSearch }) {
  const [keyword, setKeyword] = useState("");

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    onSearch(keyword);
  };

  const handleReset = () => {
    setKeyword("");
    onSearch("");
  };

  return (
    <div>
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
        <h2 className="text-xl font-bold text-slate-800">
          Open Jobs ({jobs.length})
        </h2>

        <form onSubmit={handleSearchSubmit} className="flex gap-2">
          <input
            type="text"
            placeholder="Search title or company..."
            value={keyword}
            onChange={(e) => setKeyword(e.target.value)}
            className="px-3.5 py-2 rounded-lg border border-slate-300 bg-white text-slate-900 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
          <button
            type="submit"
            className="px-4 py-2 rounded-lg bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-semibold transition-colors cursor-pointer"
          >
            Search
          </button>
          <button
            type="button"
            onClick={handleReset}
            className="px-3.5 py-2 rounded-lg bg-slate-200 hover:bg-slate-300 text-slate-700 text-sm font-semibold transition-colors cursor-pointer"
          >
            Reset
          </button>
        </form>
      </div>

      {loading && <p className="text-slate-600">Loading jobs...</p>}
      {error && (
        <div className="p-3 rounded-lg bg-red-50 border border-red-200 text-red-700 text-sm">
          {error}
        </div>
      )}
      {!loading && !error && jobs.length === 0 && (
        <p className="text-slate-500 bg-white p-6 rounded-xl border border-slate-200 text-center">
          No jobs found.
        </p>
      )}

      <div className="space-y-4">
        {!loading &&
          !error &&
          jobs.map((job) => (
            <div
              key={job._id}
              className="bg-white rounded-xl shadow-sm border border-slate-200 p-6"
            >
              <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-2 mb-2">
                <div>
                  <h3 className="text-lg font-bold text-slate-900">
                    {job.title}
                  </h3>
                  <p className="text-sm font-medium text-indigo-600">
                    {job.company} • {job.location}
                  </p>
                </div>

                <div className="flex flex-wrap gap-2">
                  <span className="px-2.5 py-1 text-xs font-semibold rounded-full bg-slate-100 text-slate-700">
                    {job.jobType}
                  </span>
                  <span className="px-2.5 py-1 text-xs font-semibold rounded-full bg-emerald-50 text-emerald-700">
                    {job.workmode}
                  </span>
                  <span className="px-2.5 py-1 text-xs font-semibold rounded-full bg-amber-50 text-amber-700">
                    {job.experienceLevel}
                  </span>
                </div>
              </div>

              <p className="text-sm text-slate-600 my-3">{job.description}</p>

              <div className="flex flex-wrap gap-1.5 mb-3">
                {job.requirements?.map((skill, idx) => (
                  <span
                    key={idx}
                    className="px-2.5 py-0.5 text-xs font-medium rounded-md bg-indigo-50 text-indigo-700"
                  >
                    {skill}
                  </span>
                ))}
              </div>

              <div className="flex flex-wrap items-center justify-between text-xs text-slate-500 pt-3 border-t border-slate-100">
                <span>
                  <strong className="text-slate-700">Salary:</strong>{" "}
                  {job.salary?.currency} {job.salary?.min?.toLocaleString()} –{" "}
                  {job.salary?.max?.toLocaleString()}
                </span>
                <span>
                  <strong className="text-slate-700">Posted by:</strong>{" "}
                  {job.postedBy?.name || "Employer"}
                </span>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
}

export default JobList;
