
type Props = {
  status: string;
};

function statusColor(status: string) {
  switch (status) {
    case "Available": return "bg-green-100 text-green-700";
    case "Assigned": return "bg-yellow-100 text-yellow-800";
    case "Completed": return "bg-blue-100 text-blue-700";
    case "Paid": return "bg-green-100 text-green-700";
    case "Unpaid": return "bg-yellow-100 text-yellow-800";
    case "On Job": return "bg-cyan-100 text-cyan-800";
    default: return "bg-gray-100 text-gray-600";
  }
}

const JobStatusBadge = ({ status }: Props) => (
  <span className={`px-2 py-1 rounded text-xs font-semibold shadow ${statusColor(status)}`}>
    {status}
  </span>
);

export default JobStatusBadge;
