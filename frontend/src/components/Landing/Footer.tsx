import React from "react";

export default function Footer() {
  return (
    <div className="w-4/5 mx-auto flex flex-col gap-y-3">
      <div className="flex justify-between">
        <p className="font-medium text-gray-400">About</p>
        <p className="font-medium text-gray-400">Contact Us</p>
        <p className="font-medium text-gray-400">Terms of USe</p>
      </div>
      <div className="self-center">
        <p className="font-medium text-gray-400">
          Copyright 2024. All rights reserved.
        </p>
      </div>
    </div>
  );
}
