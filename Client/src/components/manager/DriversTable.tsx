
import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from "@/components/ui/table";
import DriverAvatar from "./DriverAvatar";
import JobStatusBadge from "./JobStatusBadge";
import StarIcon from "./StarIcon";

type Driver = { id: number; name: string; jobsCompleted: number; status: string; rating: number };

type Props = {
  drivers: Driver[];
};

const DriversTable = ({ drivers }: Props) => (
  <Table>
    <TableHeader>
      <TableRow>
        <TableHead />
        <TableHead>Name</TableHead>
        <TableHead>Status</TableHead>
        <TableHead>Jobs Completed</TableHead>
        <TableHead>Rating</TableHead>
      </TableRow>
    </TableHeader>
    <TableBody>
      {drivers.map((driver, idx) => (
        <TableRow key={driver.id} className="hover:bg-green-50/50 transition-all">
          <TableCell>
            <DriverAvatar name={driver.name} idx={idx} />
          </TableCell>
          <TableCell>{driver.name}</TableCell>
          <TableCell>
            <JobStatusBadge status={driver.status} />
          </TableCell>
          <TableCell>{driver.jobsCompleted}</TableCell>
          <TableCell>
            <StarIcon rating={driver.rating} /> {driver.rating}
          </TableCell>
        </TableRow>
      ))}
    </TableBody>
  </Table>
);

export default DriversTable;
