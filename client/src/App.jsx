import { useEffect, useState } from "react";
import { useAuth } from "./context/AuthContext";
import Register from "./components/Register";
import Login from "./components/Login";
import PostJobForm from "./components/PostJobForm";
import JobList from "./components/JobList";
import api from "./api/axios";

function App() {
  const { user, loading: authLoading, logout } = useAuth();
  const [showRegister, setShowRegister] = useState(false);

  const [jobs, setJobs] = useState([]);
  const [jobsLoading, setJobsLoading] = useState(false);
  const [jobsError, setJobsError] = useState("");

  const fetchJobs = async (searchTerm = "") => {
    try {
      setJobsLoading(true);
      setJobsError("");
      const response = await api.get("/jobs", {
        params: searchTerm ? { keyword: searchTerm } : {},
      });
      setJobs(response.data.jobs);
    } catch (err) {
      setJobsError(err.response?.data?.message || "Failed to fetch jobs");
    } finally {
      setJobsLoading(false);
    }
  };

  useEffect(() => {
    if (user) {
      fetchJobs();
    }
  }, [user]);

  if (authLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50">
        <p className="text-slate-600 font-medium">
          Checking authentication session...
        </p>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50 p-4">
        <div className="max-w-md w-full bg-white rounded-xl shadow-md border border-slate-200 p-8">
          <div className="text-center mb-6">
            <h1 className="text-2xl font-extrabold text-indigo-600">
              Job Portal
            </h1>
          </div>

          <div className="grid grid-cols-2 bg-slate-100 p-1 rounded-lg mb-6">
            <button
              type="button"
              onClick={() => setShowRegister(false)}
              className={`py-2 text-sm font-semibold rounded-md transition-all cursor-pointer ${
                !showRegister
                  ? "bg-white text-indigo-600 shadow-sm"
                  : "text-slate-600 hover:text-slate-900"
              }`}
            >
              Login
            </button>
            <button
              type="button"
              onClick={() => setShowRegister(true)}
              className={`py-2 text-sm font-semibold rounded-md transition-all cursor-pointer ${
                showRegister
                  ? "bg-white text-indigo-600 shadow-sm"
                  : "text-slate-600 hover:text-slate-900"
              }`}
            >
              Register
            </button>
          </div>

          {showRegister ? <Register /> : <Login />}
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Top Navigation Bar */}
      <header className="bg-white border-b border-slate-200">
        <div className="max-w-4xl mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <h1 className="text-xl font-extrabold text-indigo-600">
              Job Portal
            </h1>
            <span className="px-2.5 py-0.5 text-xs font-semibold uppercase tracking-wide rounded-full bg-indigo-100 text-indigo-700">
              {user.role}
            </span>
          </div>

          <div className="flex items-center gap-4">
            <span className="text-sm text-slate-600 hidden sm:inline">
              Welcome, <strong className="text-slate-900">{user.name}</strong>
            </span>
            <button
              type="button"
              onClick={logout}
              className="px-4 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-900 text-white text-sm font-semibold transition-colors cursor-pointer"
            >
              Logout
            </button>
          </div>
        </div>
      </header>

      {/* Main Content Container */}
      <main className="max-w-4xl mx-auto px-4 py-8">
        {user.role === "employer" && <PostJobForm onJobCreated={fetchJobs} />}

        <JobList
          jobs={jobs}
          loading={jobsLoading}
          error={jobsError}
          onSearch={fetchJobs}
        />
      </main>
    </div>
  );
}

export default App;
