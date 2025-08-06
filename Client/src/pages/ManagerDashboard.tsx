import { useState, useEffect } from "react";
import { toast } from "@/hooks/use-toast";
import { ManagerSidebar } from "@/components/ManagerSidebar";
import HeroBanner from "@/components/manager/HeroBanner";
import DashboardAnalytics from "@/components/manager/DashboardAnalytics";
import JobPostForm from "@/components/manager/JobPostForm";
import JobsTable from "@/components/manager/JobsTable";
import DriversTable from "@/components/manager/DriversTable";
import PaymentsTable from "@/components/manager/PaymentsTable";
import JobHistoryTable from "@/components/manager/JobHistoryTable";

const ManagerDashboard = () => {
  const [{ drivers, jobs, jobHistory }, setState] = useState(() => {
    const driversLS = localStorage.getItem("drivers");
    const jobsLS = localStorage.getItem("manager_jobs");
    const historyLS = localStorage.getItem("manager_jobs_history");
    return {
      drivers: driversLS ? JSON.parse(driversLS) : [],
      jobs: jobsLS ? JSON.parse(jobsLS) : [],
      jobHistory: historyLS ? JSON.parse(historyLS) : [],
    };
  });

  const completedCount = jobHistory.length;
  const inProgressCount = jobs.filter(j => j.status === "Assigned").length;
  const availableCount = jobs.filter(j => j.status === "Available").length;
  const paidCount = jobHistory.filter(j => j.paymentStatus === "Paid").length;
  const revenue = jobHistory.reduce((sum, j) => sum + (Number(j.pay) || 0), 0);

  useEffect(() => {
    localStorage.setItem("drivers", JSON.stringify(drivers));
    localStorage.setItem("manager_jobs", JSON.stringify(jobs));
    localStorage.setItem("manager_jobs_history", JSON.stringify(jobHistory));
  }, [drivers, jobs, jobHistory]);

  const [form, setForm] = useState({ origin: "", destination: "", truckType: "", pay: "" });
  const [error, setError] = useState("");

  const handleFormChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm(f => ({ ...f, [e.target.name]: e.target.value }));
    setError("");
  };

  const handlePostJob = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.origin || !form.destination || !form.truckType || !form.pay) {
      setError("All fields required");
      return;
    }
    const newJob = {
      id: new Date().getTime().toString(),
      origin: form.origin,
      destination: form.destination,
      truckType: form.truckType,
      pay: Number(form.pay),
      status: "Available",
      assignedDriver: "",
      postedAt: new Date().toISOString(),
    };
    setState(state => ({ ...state, jobs: [newJob, ...state.jobs] }));
    setForm({ origin: "", destination: "", truckType: "", pay: "" });
    toast({ title: "Job Posted", description: `New job from ${newJob.origin} to ${newJob.destination}` });
  };

  return (
    <div className="flex bg-gradient-to-tr from-blue-50 via-cyan-50 to-blue-50/80 font-sans min-h-screen">
      <ManagerSidebar />
      <main className="flex-1 flex flex-col px-6 py-9 overflow-auto">
     
        <HeroBanner />

       
        <section className="mb-10 rounded-3xl bg-white shadow-lg p-10 animate-fade-in">
          <DashboardAnalytics
            jobsCount={jobs.length + jobHistory.length}
            inProgressCount={inProgressCount}
            revenue={revenue}
            completedCount={completedCount}
            jobHistoryCount={jobHistory.length}
          />
        </section>

        {/* Divider */}
        <div className="my-10 h-px bg-gradient-to-r from-blue-300 via-cyan-200 to-white/0" />

        {/* Post New Job */}
        <section className="mb-10 rounded-3xl bg-white shadow-lg p-10 animate-fade-in">
          <h3 className="text-2xl font-semibold text-blue-700 mb-6 text-center">Post New Job</h3>
          <JobPostForm form={form} error={error} onChange={handleFormChange} onPost={handlePostJob} />
        </section>

        {/* Current Jobs */}
        <h2 className="text-3xl font-bold text-blue-800 mb-6">Current Jobs</h2>
        <section className="mb-10 rounded-3xl bg-white shadow-lg p-6 animate-fade-in">
          <JobsTable
            jobs={jobs}
            drivers={drivers}
            onAssign={(jobId, driverName) => {
              // Implement assignment logic here
              // For now throw error or add your function
            }}
            onComplete={(jobId) => {
              // Implement completion logic here
              // For now throw error or add your function
            }}
          />
        </section>

        {/* Drivers */}
        <h2 className="text-3xl font-bold text-green-700 mb-6">Drivers</h2>
        <section className="mb-10 rounded-3xl bg-white shadow-lg p-6 animate-fade-in">
          <DriversTable drivers={drivers} />
        </section>

        {/* Payments */}
        <h2 className="text-3xl font-bold text-green-700 mb-6">Payments</h2>
        <section className="mb-10 rounded-3xl bg-white shadow-lg p-6 animate-fade-in">
          <PaymentsTable
            jobHistory={jobHistory}
            onMarkPaid={(jobIdx) => {
              // Implement payment marking logic here
              // For now throw error or add your function
            }}
          />
        </section>

        {/* Job History */}
        <h2 className="text-3xl font-bold text-blue-700 mb-6 mt-10">Job History (Last 8)</h2>
        <section className="mb-10 rounded-3xl bg-white shadow-lg p-6 animate-fade-in">
          <JobHistoryTable jobHistory={jobHistory} />
        </section>
      </main>
    </div>
  );
};

export default ManagerDashboard;
