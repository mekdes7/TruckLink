
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";

type Props = {
  form: { origin: string; destination: string; truckType: string; pay: string };
  error: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onPost: (e: React.FormEvent) => void;
};

const JobPostForm = ({ form, error, onChange, onPost }: Props) => (
  <form className="flex flex-wrap gap-3 items-end" onSubmit={onPost}>
    <div className="flex-1 min-w-[160px]">
      <Input
        placeholder="Origin (e.g. Detroit, MI)"
        name="origin"
        value={form.origin}
        onChange={onChange}
      />
    </div>
    <div className="flex-1 min-w-[160px]">
      <Input
        placeholder="Destination"
        name="destination"
        value={form.destination}
        onChange={onChange}
      />
    </div>
    <div className="flex-1 min-w-[120px]">
      <Input
        placeholder="Truck Type"
        name="truckType"
        value={form.truckType}
        onChange={onChange}
      />
    </div>
    <div className="flex-1 min-w-[100px]">
      <Input
        placeholder="Pay (USD)"
        type="number"
        name="pay"
        value={form.pay}
        onChange={onChange}
      />
    </div>
    <Button type="submit" variant="default" size="sm">
      <Plus className="mr-1" size={16} />
      Post Job
    </Button>
    {error && <span className="text-xs text-destructive">{error}</span>}
  </form>
);

export default JobPostForm;
