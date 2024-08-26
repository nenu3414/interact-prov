import React, { useEffect, useState } from "react";

interface Radio {
  checked: boolean;
  onChange: (value: string) => void;
  value: string;
  name: string;
  label: string;
  disabled?: boolean;
}

export function Radio({
  checked,
  label,
  name,
  onChange,
  value,
  disabled,
}: Radio) {
  return (
    <div className="w-1/5 flex gap-5 items-center border-gray-300 border-2 p-3 rounded-md">
      <div className={`w-5 h-5 relative text-sm rounded-md cursor-pointer`}>
        <input
          type="radio"
          checked={checked}
          value={value}
          name={name}
          disabled={disabled}
          onChange={(e) => {
            onChange(e.target.value);
          }}
          className={`absolute top-0 left-0 z-20 w-full h-full appearance-none cursor-pointer`}
        />
        <div
          className={`absolute top-0 left-0 w-full h-full rounded-full transition-all flex items-center justify-center 
         border-2 border-blue-400 bg-white  ${
           disabled && "bg-gray-200 border-gray-500"
         } `}
        >
          {checked && <div className="p-1.5 bg-blue-400 rounded-full"></div>}
        </div>
      </div>
      <label htmlFor={label} className="text-sm">
        {label}
      </label>
    </div>
  );
}
