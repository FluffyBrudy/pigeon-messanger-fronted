import { ChangeEvent, useRef, useState } from "react";

interface GenericSearchInputProps {
  placeholder?: string;
  debounceTime?: number;
  onSearch: (query: string) => void;
  icon?: React.ReactNode;
}

const GenericSearchInput = ({
  placeholder = "Search...",
  debounceTime = 300,
  onSearch,
  icon,
}: GenericSearchInputProps) => {
  const timeoutRef = useRef<number | null>(null);
  const [searchValue, setSearchValue] = useState("");

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.trim();
    setSearchValue(value);

    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }

    timeoutRef.current = window.setTimeout(() => {
      onSearch(value);
      
    }, debounceTime);
  };

  return (
    <div className="relative w-full">
      <input
        type="text"
        value={searchValue}
        onChange={handleChange}
        className="w-full px-4 py-2 text-gray-700 bg-white border rounded-full shadow focus:border-blue-400 focus:ring-blue-300 focus:outline-none focus:ring focus:ring-opacity-40"
        placeholder={placeholder}
      />
      {icon && (
        <span className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500">
          {icon}
        </span>
      )}
    </div>
  );
};

export default GenericSearchInput;
