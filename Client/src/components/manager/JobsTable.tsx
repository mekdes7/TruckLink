
import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Check } from "lucide-react";
import JobStatusBadge from "./JobStatusBadge";
import DriverAvatar from "./DriverAvatar";
import { getImg } from "./managerDashboardUtils";

type Driver = { id: number; name: string; jobsCompleted: number; status: string; rating: number };
type Job = {
  id: string | number;
  origin: string;
  destination: string;
  truckType: string;
  pay: number;
  status: string;
  assignedDriver: string;
  postedAt: string;
};

type Props = {
  jobs: Job[];
  drivers: Driver[];
  onAssign: (jobId: string | number, driverName: string) => void;
  onComplete: (jobId: string | number) => void;
};

const JobsTable = ({ jobs, drivers, onAssign, onComplete }: Props) => (
  <Table>
    <TableHeader>
      <TableRow>
        <TableHead />
        <TableHead>Origin</TableHead>
        <TableHead>Destination</TableHead>
        <TableHead>Truck</TableHead>
        <TableHead>Pay</TableHead>
        <TableHead>Status</TableHead>
        <TableHead>Driver</TableHead>
        <TableHead />
      </TableRow>
    </TableHeader>
    <TableBody>
      {jobs.map((job, i) => (
        <TableRow key={job.id} className="hover:bg-blue-50/60 transition">
          <TableCell>
            <img
              src={getImg(job.id, "job")}
              alt=""
              className="h-8 w-8 rounded-md object-cover shadow mr-1"
            />
          </TableCell>
          <TableCell>{job.origin}</TableCell>
          <TableCell>{job.destination}</TableCell>
          <TableCell>{job.truckType}</TableCell>
          <TableCell>
            <span className="font-medium">${job.pay}</span>
          </TableCell>
          <TableCell>
            <JobStatusBadge status={job.status} />
          </TableCell>
          <TableCell>
            {job.assignedDriver
              ? (
                <span className="flex items-center">
                  <DriverAvatar name={job.assignedDriver} idx={i} />
                  {job.assignedDriver}
                </span>
              )
              : "-"}
          </TableCell>
          <TableCell>
            {job.status === "Available" && (
              <select
                className="border rounded p-1 text-xs"
                defaultValue=""
                onChange={e =>
                  e.target.value &&
                  onAssign(job.id, e.target.value)
                }
              >
                <option value="">Assign Driver</option>
                {drivers
                  .filter(d => d.status === "Available")
                  .map((d) => (
                    <option key={d.id} value={d.name}>
                      {d.name}
                    </option>
                  ))}
              </select>
            )}
            {job.status === "Assigned" && (
              <Button variant="default" size="sm" onClick={() => onComplete(job.id)}>
                <Check size={16} className="mr-1" />
                Mark Completed
              </Button>
            )}
          </TableCell>
        </TableRow>
      ))}
    </TableBody>
  </Table>
);

export default JobsTable;
