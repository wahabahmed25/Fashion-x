import React from "react";

interface PropType {
  value: string;
  name: string;
  placeholder?: string;
  type: string;
  label?: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const InputFieldOne = ({ value, name, placeholder, label = "", type, onChange }: PropType) => {
  return (
    <div className="flex flex-col space-y-1">
      {label && <label htmlFor={name} className="text-black text-sm">{label}</label>}
      <input
        className="bg-gray-700 text-white rounded-md px-3 py-2 text-sm w-full outline-none placeholder-gray-400"
        type={type}
        name={name}
        id={name}
        value={value}
        placeholder={placeholder}
        onChange={onChange}
      />
    </div>
  );
};

export default InputFieldOne;
