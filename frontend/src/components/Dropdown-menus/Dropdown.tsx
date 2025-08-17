import React from "react";

interface DropdownProps {
  label?: string;
  name: string;
  value: string;
  options: string[];
  onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
}

const Dropdown = ({ label, name, value, options, onChange }: DropdownProps) => {
  return (
    <div className="flex flex-col space-y-1">
      {label && <label htmlFor={name} className="text-black text-sm">{label}</label>}
      <select
        id={name}
        name={name}
        value={value}
        onChange={onChange}
        className="bg-gray-700 text-white rounded-md px-3 py-2 text-sm w-full outline-none"
      >
        <option value="">Select an option</option>
        {options.map((opt) => (
          <option key={opt} value={opt}>
            {opt}
          </option>
        ))}
      </select>
    </div>
  );
};

export default Dropdown;
