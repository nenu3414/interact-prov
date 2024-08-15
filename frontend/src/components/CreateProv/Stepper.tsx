import React from "react";

export default function Stepper({ currentStep, setCurrentStep }: any) {
  const steps = [
    "Adding Entity",
    "Adding Activity",
    "Adding Agent",
    "Define Relationship",
    "Visualize",
    "Export",
  ];
  return (
    <div className="flex flex-col gap-4">
      {steps?.map((step, i) => (
        <div className="flex items-center gap-2" key={i}>
          <p
            className={`${
              currentStep === i
                ? "bg-gray-300"
                : i < currentStep
                ? "bg-green-400"
                : ""
            } w-5 h-5 flex justify-center items-center rounded-full border-black border-solid border-[1px]`}
          >
            {i + 1}
          </p>
          <p className="font-medium">{step}</p>
        </div>
      ))}
    </div>
  );
}
