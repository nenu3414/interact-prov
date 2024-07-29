import React from "react";
import { FEATURE1, FEATURE2, FEATURE3, FEATURE4 } from "../../assets/icons";

export default function Section3() {
  return (
    <div className="mt-16">
      <h1 className="text-5xl font-extrabold">Features</h1>
      <div className="mt-5 flex gap-8">
        <div className="border rounded-lg p-2 h-36 w-1/4">
          <img src={FEATURE1} alt="Feature 1" />
          <p className="mt-2 text-sm font-bold">Create Provenance Graph</p>
          <p className="w-3/4 mt-2 text-sm text-gray-400">
            Use the graph builder to create a new Provenance Graph
          </p>
        </div>
        <div className="border rounded-lg p-2 h-36 w-1/4">
          <img src={FEATURE2} alt="Feature 2" />
          <p className="mt-2 text-sm font-bold">Visualize Provenance Graph</p>
          <p className="w-3/4 mt-2 text-sm text-gray-400">
            View and traverse Provenance Graphs
          </p>
        </div>
        <div className="border rounded-lg p-2 h-36 w-1/4">
          <img src={FEATURE3} alt="Feature 3" />
          <p className="mt-2 text-sm font-bold">Export Provenance Graph</p>
          <p className="w-3/4 mt-2 text-sm text-gray-400">
            Export Provenance Graph as images, JSON or other formats
          </p>
        </div>
        <div className="border rounded-lg p-2 h-36 w-1/4">
          <img src={FEATURE4} alt="Feature 4" />
          <p className="mt-2 text-sm font-bold">Validate Provenance Graph</p>
          <p className="w-3/4 mt-2 text-sm text-gray-400">
            Validate Provenance Graph against a given schema
          </p>
        </div>
      </div>
    </div>
  );
}
