import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from "@/components/ui/table";
import { useEffect, useState } from "react";

const getJobHistory = () => {
  try {
    const history = localStorage.getItem("job_history");
    return history ? JSON.parse(history) : [];
  } catch {
    return [];
  }
};

const DriverPaymentCenter = () => {
  const [jobHistory, setJobHistory] = useState(getJobHistory());

  useEffect(() => {
    setJobHistory(getJobHistory());
  }, []);

  const earnings = jobHistory
    ? jobHistory.reduce((sum, job) => {
        const payNumber = Number(job.pay?.replace(/[^0-9.-]+/g, ""));
        return sum + (isNaN(payNumber) ? 0 : payNumber);
      }, 0)
    : 0;

  return (
    <main className="min-h-screen bg-gradient-to-br from-white via-blue-300 to-white p-6 flex flex-col items-center font-sans text-black">
      <div className="w-full max-w-3xl">
        <h1 className="text-3xl font-extrabold mb-8 drop-shadow-md px-2 text-center">💰 Payment Center</h1>

        <Card className="mb-8 rounded-3xl shadow-2xl border border-white/30 backdrop-blur-md bg-white/25 animate-fade-in">
          <CardHeader>
            <CardTitle className="text-xl font-semibold drop-shadow-sm px-6 py-4">Total Earnings</CardTitle>
          </CardHeader>
          <CardContent className="px-6 pb-8">
            <span className="text-4xl font-extrabold text-indigo-900">${earnings.toLocaleString()}</span>
          </CardContent>
        </Card>

        <Card className="rounded-3xl shadow-2xl border border-white/30 backdrop-blur-md bg-white/20 animate-fade-in overflow-x-auto">
          <CardHeader>
            <CardTitle className="text-xl font-semibold drop-shadow-sm px-6 py-4">Payment History</CardTitle>
          </CardHeader>
          <CardContent className="px-6 pb-6">
            {jobHistory.length === 0 ? (
              <p className="italic text-black/70 text-center text-base py-12">No payment entries.</p>
            ) : (
              <Table className="min-w-full">
                <TableHeader>
                  <TableRow>
                    <TableHead>Origin</TableHead>
                    <TableHead>Destination</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Pay</TableHead>
                    <TableHead>Payment</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {jobHistory.slice(0, 10).map((job, idx) => (
                    <TableRow
                      key={job.id + "-" + idx}
                      className="hover:bg-indigo-100/30 transition-colors"
                    >
                      <TableCell>{job.origin}</TableCell>
                      <TableCell>{job.destination}</TableCell>
                      <TableCell>{job.status}</TableCell>
                      <TableCell>{job.pay}</TableCell>
                      <TableCell>
                        <span
                          className={
                            job.paid === "Paid"
                              ? "text-green-700 font-semibold"
                              : "text-yellow-700 font-semibold"
                          }
                        >
                          {job.paid || "-"}
                        </span>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            )}
          </CardContent>
        </Card>
      </div>
    </main>
  );
};

export default DriverPaymentCenter;
