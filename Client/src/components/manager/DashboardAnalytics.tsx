
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Users, Truck, DollarSign, Check, ArrowUp, ArrowRight } from "lucide-react";

type Props = {
  jobsCount: number;
  inProgressCount: number;
  revenue: number;
  completedCount: number;
  jobHistoryCount: number;
};

const DashboardAnalytics = ({ jobsCount, inProgressCount, revenue, completedCount, jobHistoryCount }: Props) => (
  <div className="grid gap-6 grid-cols-1 md:grid-cols-4 mb-8">
    <Card className="shadow-lg rounded-xl bg-blue-50/70 animate-scale-in hover:shadow-2xl transition-shadow">
      <CardHeader className="flex items-center gap-2 pb-3">
        <span className="bg-blue-200 rounded-full p-2">
          <Users className="text-blue-800" size={22} />
        </span>
        <CardTitle className="text-blue-900 text-lg">Jobs Posted</CardTitle>
      </CardHeader>
      <CardContent>
        <span className="text-3xl font-extrabold text-blue-700 flex items-center gap-1">
          {jobsCount}
          <ArrowUp className="text-green-500 ml-1" size={18} />
        </span>
      </CardContent>
    </Card>
    <Card className="shadow-lg rounded-xl bg-yellow-50/70 animate-scale-in hover:shadow-2xl transition-shadow">
      <CardHeader className="flex items-center gap-2 pb-3">
        <span className="bg-yellow-200 rounded-full p-2">
          <Truck className="text-yellow-800" size={22} />
        </span>
        <CardTitle className="text-yellow-900 text-lg">Currently Assigned</CardTitle>
      </CardHeader>
      <CardContent>
        <span className="text-3xl font-extrabold text-yellow-700 flex items-center gap-1">
          {inProgressCount}
          <ArrowRight className="text-yellow-500 ml-1" size={18} />
        </span>
      </CardContent>
    </Card>
    <Card className="shadow-lg rounded-xl bg-green-50/70 animate-scale-in hover:shadow-2xl transition-shadow">
      <CardHeader className="flex items-center gap-2 pb-3">
        <span className="bg-green-200 rounded-full p-2">
          <DollarSign className="text-green-800" size={22} />
        </span>
        <CardTitle className="text-green-900 text-lg">Total Revenue</CardTitle>
      </CardHeader>
      <CardContent>
        <span className="text-3xl font-extrabold text-green-700 flex items-center gap-1">
          ${revenue.toLocaleString()}
          <ArrowUp className="text-green-500 ml-1" size={18} />
        </span>
      </CardContent>
    </Card>
    <Card className="shadow-lg rounded-xl bg-cyan-50/70 animate-scale-in hover:shadow-2xl transition-shadow">
      <CardHeader className="flex items-center gap-2 pb-3">
        <span className="bg-cyan-200 rounded-full p-2">
          <Check className="text-cyan-800" size={22} />
        </span>
        <CardTitle className="text-cyan-900 text-lg">Completed Jobs</CardTitle>
      </CardHeader>
      <CardContent>
        <span className="text-3xl font-extrabold text-cyan-700 flex items-center gap-1">
          {completedCount}
        </span>
      </CardContent>
    </Card>
  </div>
);

export default DashboardAnalytics;
