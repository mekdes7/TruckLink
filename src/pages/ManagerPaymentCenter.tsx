import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from "@/components/ui/table";
import { useEffect, useState } from "react";

const getHistory = () => {
  try {
    const h = localStorage.getItem("manager_jobs_history");
    return h ? JSON.parse(h) : [];
  } catch {
    return [];
  }
};

const ManagerPaymentCenter = () => {
  const [jobHistory, setJobHistory] = useState(getHistory());

  useEffect(() => {
    setJobHistory(getHistory());
  }, []);

  const totalPaid = jobHistory.reduce(
    (sum, job) => sum + (job.paymentStatus === "Paid" ? Number(job.pay) : 0),
    0
  );
  const dueJobs = jobHistory.filter((job) => job.paymentStatus !== "Paid");
  const paidJobs = jobHistory.filter((job) => job.paymentStatus === "Paid");
  const totalDue = dueJobs.reduce((sum, j) => sum + (Number(j.pay) || 0), 0);

  return (
    <div className="max-w-4xl mx-auto p-6 w-full space-y-8">
      <h1 className="text-3xl font-bold text-center text-gray-900">Payment Center (Simulation Only)</h1>

      <Card>
        <CardHeader>
          <CardTitle>Payments Overview</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 text-center">
            <div>
              <div className="text-2xl font-semibold text-indigo-700">{paidJobs.length}</div>
              <div className="text-sm text-gray-600">Paid Jobs</div>
            </div>
            <div>
              <div className="text-2xl font-semibold text-yellow-600">{dueJobs.length}</div>
              <div className="text-sm text-gray-600">Pending Payments</div>
            </div>
            <div>
              <div className="text-2xl font-semibold text-green-700">${totalPaid.toFixed(2)}</div>
              <div className="text-sm text-gray-600">Total Paid</div>
            </div>
            <div>
              <div className="text-2xl font-semibold text-red-600">${totalDue.toFixed(2)}</div>
              <div className="text-sm text-gray-600">Due Amount</div>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Payment Table</CardTitle>
        </CardHeader>
        <CardContent>
          {jobHistory.length === 0 ? (
            <p className="text-center text-gray-500 italic">No jobs in payment history.</p>
          ) : (
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Job</TableHead>
                    <TableHead>Driver</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Pay</TableHead>
                    <TableHead>Payment Status</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {jobHistory.slice(0, 10).map((job, idx) => (
                    <TableRow key={`${job.id}-${idx}`}>
                      <TableCell>
                        {job.origin} → {job.destination}
                      </TableCell>
                      <TableCell>{job.assignedDriver || "-"}</TableCell>
                      <TableCell>{job.status}</TableCell>
                      <TableCell>${Number(job.pay).toFixed(2)}</TableCell>
                      <TableCell>
                        <span
                          className={
                            job.paymentStatus === "Paid"
                              ? "text-green-700 font-semibold"
                              : "text-yellow-700 font-semibold"
                          }
                        >
                          {job.paymentStatus || "-"}
                        </span>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          )}
        </CardContent>
      </Card>

      <p className="text-center text-gray-500 text-xs italic mt-4">
        All payment information is simulation only.
      </p>
    </div>
  );
};

export default ManagerPaymentCenter;
