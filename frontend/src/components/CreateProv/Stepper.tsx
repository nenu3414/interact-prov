import React, { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../redux/useRedux";
import { setStep } from "../../redux/reducers/stepSlice";

export default function Stepper() {
  const steps = [
    "Adding Entity",
    "Adding Activity",
    "Adding Agent",
    "Define Relationship",
    "Visualize",
    "Export",
  ];
  const dispatch = useAppDispatch();
  const { currentStep, maxStep } = useAppSelector((state: any) => state.step);

  const handleStepClick = (step: number) => {
    if (step <= maxStep) {
      dispatch(setStep(step));
    }
  };
  return (
    <div className="flex flex-col gap-4">
      {steps?.map((step, i) => (
        <div
          className="flex items-center gap-2 cursor-pointer"
          key={i}
          onClick={() => handleStepClick(i)}
        >
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
