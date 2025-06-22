import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { toast } from "@/hooks/use-toast";

const JOBS = [
  { id: 1, origin: "Chicago, IL", destination: "Dallas, TX", pay: "$1,100", truckType: "Flatbed" },
  { id: 2, origin: "Atlanta, GA", destination: "Miami, FL", pay: "$950", truckType: "Reefer" },
  { id: 3, origin: "Seattle, WA", destination: "Portland, OR", pay: "$650", truckType: "Box" },
  { id: 4, origin: "New York, NY", destination: "Boston, MA", pay: "$700", truckType: "Flatbed" },
];

const demoActiveJobs = [
  {
    id: 1,
    origin: "Chicago, IL",
    destination: "Dallas, TX",
    pay: "$1,100",
    truckType: "Flatbed",
    status: "In Progress",
  },
  {
    id: 4,
    origin: "New York, NY",
    destination: "Boston, MA",
    pay: "$700",
    truckType: "Flatbed",
    status: "In Progress",
  },
];

const getInitialState = () => {
  const active = localStorage.getItem("active_jobs");
  const history = localStorage.getItem("job_history");
  return {
    activeJobs: active ? JSON.parse(active) : demoActiveJobs,
    jobHistory: history ? JSON.parse(history) : [],
  };
};

const storeState = (activeJobs, jobHistory) => {
  localStorage.setItem("active_jobs", activeJobs ? JSON.stringify(activeJobs) : "[]");
  localStorage.setItem("job_history", JSON.stringify(jobHistory));
};

const paymentStatus = () => (Math.random() > 0.5 ? "Paid" : "Unpaid");

export default function DriverDashboard() {
  const [{ activeJobs, jobHistory }, setState] = useState(getInitialState);

  useEffect(() => {
    storeState(activeJobs, jobHistory);
  }, [activeJobs, jobHistory]);

  const handleAccept = (job) => {
    if (activeJobs.find((j) => j.id === job.id) || jobHistory.find((j) => j.id === job.id)) {
      toast({ title: "Job already accepted or completed." });
      return;
    }
    setState((prev) => ({
      ...prev,
      activeJobs: [...prev.activeJobs, { ...job, status: "In Progress" }],
    }));
    toast({ title: "Job accepted!", description: `Drive from ${job.origin} to ${job.destination}` });
  };

  const handleComplete = (jobId) => {
    const jobToComplete = activeJobs.find((job) => job.id === jobId);
    if (!jobToComplete) return;

    const completedJob = {
      ...jobToComplete,
      status: "Completed",
      paid: paymentStatus(),
      completedAt: new Date().toISOString(),
    };

    setState((prev) => ({
      activeJobs: prev.activeJobs.filter((job) => job.id !== jobId),
      jobHistory: [completedJob, ...prev.jobHistory],
    }));

    toast({
      title: "Job completed!",
      description: `Congrats on completing the delivery from ${jobToComplete.origin} to ${jobToComplete.destination}`,
    });
  };

  const handleReset = () => {
    localStorage.removeItem("active_jobs");
    localStorage.removeItem("job_history");
    setState({ activeJobs: [], jobHistory: [] });
    toast({ title: "Dashboard reset." });
  };

  const takenIds = [...activeJobs.map((j) => j.id), ...jobHistory.map((j) => j.id)];
  const availableJobs = JOBS.filter((job) => !takenIds.includes(job.id));

  return (
    <main className="min-h-screen bg-gradient-to-br from-white via-blue-300 to-white p-6 flex flex-col items-center font-sans text-black animate-fade-in">
      <header className="w-full max-w-md flex justify-between items-center mb-8">
        <h1 className="text-3xl font-extrabold drop-shadow-lg tracking-tight">🚛 Driver Dashboard</h1>
        <Button
          onClick={handleReset}
          className="text-sm text-indigo-900 rounded-full border border-white/50 bg-white/30 hover:bg-white/50 shadow-md px-4 py-1 transition focus:outline-none focus:ring-2 focus:ring-indigo-400"
        >
          Reset
        </Button>
      </header>

      {/* Active Jobs */}
      <section className="w-full max-w-md bg-white/25 rounded-3xl p-6 mb-8 shadow-2xl backdrop-blur-md border border-white/30">
        <h2 className="text-2xl font-semibold mb-6 drop-shadow-md">Active Jobs</h2>
        {activeJobs.length > 0 ? (
          <ul className="space-y-4 max-h-[280px] overflow-y-auto pr-2 scroll-smooth">
            {activeJobs.map((job) => (
              <li
                key={job.id}
                className="bg-white rounded-xl p-5 flex flex-col sm:flex-row sm:items-center justify-between shadow-lg"
              >
                <div className="mb-4 sm:mb-0">
                  <p><strong>Route:</strong> {job.origin} → {job.destination}</p>
                  <p><strong>Truck Type:</strong> {job.truckType}</p>
                  <p><strong>Pay:</strong> {job.pay}</p>
                  <p><strong>Status:</strong> <em>{job.status}</em></p>
                </div>
                <Button
                  onClick={() => handleComplete(job.id)}
                  className="mt-3 sm:mt-0 rounded-full bg-[#555d50] text-white font-bold shadow-md hover:bg-blue-300/70 hover:text-black active:scale-95 transition px-6 py-3"
                >
                  Mark as Completed
                </Button>
              </li>
            ))}
          </ul>
        ) : (
          <p className="italic text-black/80 text-center">No active jobs. Browse below and accept a job to get started.</p>
        )}
      </section>

      {/* Available Jobs */}
      <section className="w-full max-w-md bg-white/20 rounded-3xl p-6 mb-8 shadow-2xl backdrop-blur-md border border-white/30">
        <h2 className="text-2xl font-semibold mb-6 drop-shadow-md">Available Jobs</h2>
        {availableJobs.length === 0 ? (
          <p className="italic text-black/80 text-center">No jobs available right now. Check back later!</p>
        ) : (
          <div className="space-y-5 max-h-72 overflow-y-auto pr-2 scroll-smooth">
            {availableJobs.map((job) => (
              <div
                key={job.id}
                className="bg-white rounded-xl p-5 flex flex-col sm:flex-row sm:items-center justify-between shadow-lg cursor-pointer hover:from-cyan-300/70 hover:to-indigo-500/70 transition focus:outline-none focus:ring-2 focus:ring-indigo-400"
                onClick={() => handleAccept(job)}
                tabIndex={0}
                role="button"
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") handleAccept(job);
                }}
              >
                <div className="flex flex-col space-y-2">
                  <span><strong>Route:</strong> {job.origin} → {job.destination}</span>
                  <span><strong>Truck:</strong> {job.truckType}</span>
                </div>
                <div className="flex items-center space-x-4 mt-4 sm:mt-0">
                  <span className="text-lg font-semibold">{job.pay}</span>
                  <Button
                    size="sm"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleAccept(job);
                    }}
                    className="w-full rounded-full bg-blue-300/70 text-black font-bold shadow-md hover:bg-[#555D50] hover:text-white active:scale-95 transition px-6 py-3"
                  >
                    Accept
                  </Button>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>

      {/* Job History */}
      <section className="w-full max-w-md bg-white/20 rounded-3xl p-6 shadow-xl backdrop-blur-md border border-white/30">
        <h2 className="text-2xl font-semibold mb-6 drop-shadow-md px-1">📦 Job History</h2>
        {jobHistory.length === 0 ? (
          <p className="italic text-black/70 text-center py-6">You haven't completed any jobs yet.</p>
        ) : (
          <ul className="space-y-4 max-h-64 overflow-y-auto pr-1">
            {jobHistory.slice(0, 5).map((job, idx) => (
              <li
                key={`${job.id}-${idx}`}
                className="bg-gradient-to-br from-cyan-100/40 via-blue-200/40 to-indigo-300/40 rounded-xl p-4 shadow-md flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3"
              >
                <div className="flex flex-col space-y-1 flex-1 min-w-0">
                  <p className="truncate"><strong>Route:</strong> {job.origin} → {job.destination}</p>
                  <p className="text-sm truncate">
                    <strong>Status:</strong>{" "}
                    <span className={job.paid === "Paid" ? "text-black" : "text-indigo-900"}>
                      {job.status || "Completed"} ({job.paid || "Unpaid"})
                    </span>
                  </p>
                  <p className="text-xs text-black/60">{new Date(job.completedAt).toLocaleString()}</p>
                </div>
                <span className="text-base font-semibold whitespace-nowrap">{job.pay}</span>
              </li>
            ))}
          </ul>
        )}
      </section>
    </main>
  );
}
