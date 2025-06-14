'use client';

import { Search } from 'lucide-react';

interface SearchBarProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
}

const SearchBar = ({ value, onChange, placeholder = 'Buscar...' }: SearchBarProps) => {
  return (
    <div className="relative w-full sm:w-72">
      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
        <Search className="h-5 w-5 text-gray-950" />
      </div>
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-950 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-950 placeholder-gray-950 transition"
      />
    </div>
  );
};

export default SearchBar;
