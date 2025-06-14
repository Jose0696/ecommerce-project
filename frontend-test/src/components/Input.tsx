'use client';

interface InputProps {
  label: string;
  type: string;
  name: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  required?: boolean;
}

const Input = ({ label, type, name, value, onChange, required = true }: InputProps) => {
  return (
    <div className="mb-4">
      <label className="block text-sm font-medium mb-1 text-black">{label}</label>
      <input
        className="w-full px-4 py-2 bg-gray-400 border border-gray-900 text-gray-900 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-400"
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        required={required}
      />
    </div>
  );
};

export default Input;
