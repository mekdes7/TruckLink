
import { getImg } from "./managerDashboardUtils";

type Props = {
  name: string;
  idx?: number;
};

const DriverAvatar = ({ name, idx }: Props) => (
  <img
    src={getImg(idx || name || 0, "driver")}
    alt={name}
    className="inline-block h-9 w-9 rounded-full object-cover border-2 border-white shadow-sm mr-2"
    title={name}
  />
);

export default DriverAvatar;
