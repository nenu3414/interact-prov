import React from "react";
import { INFO } from "../../assets/icons";

interface DropdownProps {
  label?: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  options: { label: string; value: string }[];
  id: string;
  error?: boolean;
  helperText?: string;
}

const Dropdown: React.FC<DropdownProps> = ({
  label,
  value,
  onChange,
  options,
  id,
  error,
  helperText,
}) => {
  return (
    <div className="flex items-center w-full mb-4">
      {label && (
        <label
          htmlFor={id}
          className="mb-2 mr-4 w-1/4 text-sm font-semibold text-gray-700"
        >
          {label}
        </label>
      )}
      <div className="flex items-center w-3/4 relative" key={id}>
        <select
          id={id}
          value={value}
          onChange={onChange}
          className={`px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition w-full cursor-pointer ${
            error
              ? "border-red-500 focus:border-red-500 focus:ring-red-500"
              : "border-gray-300 focus:border-blue-500"
          }`}
        >
          {options.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
        {helperText && (
          <div className="relative ml-2 flex items-center group">
            <img src={INFO} alt="info" className="cursor-pointer" />
            <div className="absolute top-0 w-max left-6 mt-1 px-4 py-2 text-sm text-white bg-gray-700 rounded shadow-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10">
              {helperText}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Dropdown;
