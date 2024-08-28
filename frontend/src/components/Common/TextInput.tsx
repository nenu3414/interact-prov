import React from "react";
import { INFO } from "../../assets/icons";

export default function TextInput({
  label,
  placeholder,
  value,
  onChange,
  type = "text",
  id,
  error,
  helperText,
  required = true,
  ...props
}: any) {
  const getTodayDate = () => {
    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, "0");
    const day = String(today.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  };
  return (
    <div className="flex items-center w-full mb-4">
      {label && (
        <label
          htmlFor={id}
          className="mr-4 w-1/4 text-sm font-semibold text-gray-700"
        >
          {label}
        </label>
      )}
      <div className="flex items-center w-3/4 relative">
        <input
          type={type}
          id={id}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          required={required}
          autoComplete="off"
          max={type === "date" ? getTodayDate() : undefined}
          className={`px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition w-full ${
            error
              ? "border-red-500 text-red-600 focus:border-red-500 focus:ring-red-500"
              : "border-gray-300 focus:border-blue-500"
          }`}
          {...props}
        />
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
}
