
import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { DollarSign } from "lucide-react";
import DriverAvatar from "./DriverAvatar";
import JobStatusBadge from "./JobStatusBadge";

type Job = {
  id: string | number;
  origin: string;
  destination: string;
  assignedDriver: string;
  pay: number;
  paymentStatus: string;
  status: string;
};

type Props = {
  jobHistory: Job[];
  onMarkPaid: (jobIdx: number) => void;
};

const PaymentsTable = ({ jobHistory, onMarkPaid }: Props) => (
  <Table>
    <TableHeader>
      <TableRow>
        <TableHead>Job</TableHead>
        <TableHead>Driver</TableHead>
        <TableHead>Pay</TableHead>
        <TableHead>Status</TableHead>
        <TableHead />
      </TableRow>
    </TableHeader>
    <TableBody>
      {jobHistory.filter(j => j.status === "Completed").map((job, i) => (
        <TableRow key={job.id} className="hover:bg-green-50/50 transition-all">
          <TableCell>
            {job.origin} → {job.destination}
          </TableCell>
          <TableCell>
            {job.assignedDriver
              ? <span className="flex items-center"><DriverAvatar name={job.assignedDriver} idx={i} />{job.assignedDriver}</span>
              : "-"}
          </TableCell>
          <TableCell>
            <span className="font-medium">${job.pay}</span>
          </TableCell>
          <TableCell>
            <JobStatusBadge status={job.paymentStatus || "-"} />
          </TableCell>
          <TableCell>
            {job.paymentStatus !== "Paid" && (
              <Button
                variant="secondary"
                size="sm"
                onClick={() => onMarkPaid(i)}
              >
                <DollarSign size={15} />
                Mark Paid
              </Button>
            )}
          </TableCell>
        </TableRow>
      ))}
    </TableBody>
  </Table>
);

export default PaymentsTable;
