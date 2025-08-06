
import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from "@/components/ui/table";
import DriverAvatar from "./DriverAvatar";
import JobStatusBadge from "./JobStatusBadge";

type Job = {
  id: string | number;
  origin: string;
  destination: string;
  assignedDriver: string;
  status: string;
  pay: number;
  completedAt?: string;
};

type Props = {
  jobHistory: Job[];
};

const JobHistoryTable = ({ jobHistory }: Props) => (
  <Table>
    <TableHeader>
      <TableRow>
        <TableHead>Origin</TableHead>
        <TableHead>Destination</TableHead>
        <TableHead>Driver</TableHead>
        <TableHead>Status</TableHead>
        <TableHead>Pay</TableHead>
        <TableHead>Date</TableHead>
      </TableRow>
    </TableHeader>
    <TableBody>
      {jobHistory.slice(0,8).map((job, idx) => (
        <TableRow key={`${job.id}-${idx}`} className="hover:bg-blue-50/50 transition">
          <TableCell>{job.origin}</TableCell>
          <TableCell>{job.destination}</TableCell>
          <TableCell>
            {job.assignedDriver
              ? <span className="flex items-center"><DriverAvatar name={job.assignedDriver} idx={idx} />{job.assignedDriver}</span>
              : "-"}
          </TableCell>
          <TableCell>
            <JobStatusBadge status={job.status || "Completed"} />
          </TableCell>
          <TableCell>${job.pay}</TableCell>
          <TableCell>
            {job.completedAt
              ? new Date(job.completedAt).toLocaleString()
              : "-"}
          </TableCell>
        </TableRow>
      ))}
    </TableBody>
  </Table>
);

export default JobHistoryTable;
