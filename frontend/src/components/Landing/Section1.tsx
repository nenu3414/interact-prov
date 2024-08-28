import React from "react";
import { LANDING_IMG } from "../../assets/images";
import { Button } from "../Common/Button";
import { Link } from "react-router-dom";

export default function Section1() {
  return (
    <div className="flex mt-16">
      <div className="flex justify-center">
        <img src={LANDING_IMG} alt="Landing" />
      </div>
      <div className="w-4/5 flex flex-col items-center justify-center">
        <h1 className="w-3/5 text-5xl font-extrabold">
          Welcome to PROV-Interact : Build, Visualize, and Export provenance
          documents
        </h1>
        <p className="w-3/5 mt-5">
          Our form-based tool is designed to be user-friendly and intuitive,
          allowing you to create, view graph, and export provenance documents
          with ease. Need help? We've got you covered.
        </p>
        <div className="w-3/5 mt-5">
          <div className="w-11/12 flex gap-3">
            <Link to="/create-prov" className="w-full">
              <Button
                text="Create Provenance Graph"
                block
                rounded="rounded-xl"
                type="primary"
                size="md"
              />
            </Link>
            <Button
              text="Learn More"
              block
              rounded="rounded-xl"
              type="outlined"
              size="md"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
