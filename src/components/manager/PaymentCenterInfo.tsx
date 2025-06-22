
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Settings } from "lucide-react";

const PaymentCenterInfo = () => (
  <Card className="mb-8 shadow rounded animate-fade-in" id="payment-center">
    <CardHeader className="flex flex-row items-center gap-3 pb-2">
      <Settings className="text-gray-700" size={22} />
      <CardTitle>Payment Center (Simulation Only)</CardTitle>
    </CardHeader>
    <CardContent>
      <p className="mb-2">
        All payment processing is simulated. No real transactions take place.
      </p>
      <ul className="list-disc ml-6">
        <li>Track current payment status for drivers</li>
        <li>Manually mark jobs as paid or unpaid above in the Payments section</li>
        <li>Payment reports can be exported (simulation only)</li>
      </ul>
      <p className="text-muted-foreground text-xs mt-2">
        For demo and training purposes only.
      </p>
    </CardContent>
  </Card>
);

export default PaymentCenterInfo;
