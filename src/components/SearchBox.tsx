import { Search } from "lucide-react";
import { Input } from "./ui/input";

export default function SearchBox({
  placeholder,
  value,
  onChange,
}: {
  placeholder?: string;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}) {
  return (
    <div className="relative">
      <Search
        size={18}
        className="absolute top-1/2 left-4 -translate-y-1/2 text-gray-500 pointer-events-none"
      />
      <Input
        className="pl-11 shadow-none min-w-[380px]"
        placeholder={placeholder}
        value={value}
        onChange={onChange}
      />
    </div>
  );
}
