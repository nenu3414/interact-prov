import React from "react";
import { RECENT_DOC } from "../../assets/images";

export default function Section4() {
  return (
    <div className="mt-16">
      <h1 className="text-5xl font-extrabold">Recent Documents</h1>
      <div className="flex justify-between items-center pt-8 m-auto">
        <div className="flex gap-4">
          <div>
            <img src={RECENT_DOC} alt="Recent Doc" />
          </div>
          <div className="flex flex-col justify-center">
            <p className="font-medium text-black">Temp Prov Graph</p>
            <p className="text-xs font-semibold text-gray-400">1h ago</p>
          </div>
        </div>
        <div>
          <button className="bg-gray-200 px-4 py-2 text-xs font-medium rounded-xl">
            View
          </button>
        </div>
      </div>
      <div className="flex justify-between items-center pt-8 m-auto">
        <div className="flex gap-4">
          <div>
            <img src={RECENT_DOC} alt="Recent Doc" />
          </div>
          <div className="flex flex-col justify-center">
            <p className="font-medium text-black">Temp Prov Graph</p>
            <p className="text-xs font-semibold text-gray-400">1h ago</p>
          </div>
        </div>
        <div>
          <button className="bg-gray-200 px-4 py-2 text-xs font-medium rounded-xl">
            View
          </button>
        </div>
      </div>
      <div className="flex justify-between items-center pt-8 m-auto">
        <div className="flex gap-4">
          <div>
            <img src={RECENT_DOC} alt="Recent Doc" />
          </div>
          <div className="flex flex-col justify-center">
            <p className="font-medium text-black">Temp Prov Graph</p>
            <p className="text-xs font-semibold text-gray-400">1h ago</p>
          </div>
        </div>
        <div>
          <button className="bg-gray-200 px-4 py-2 text-xs font-medium rounded-xl">
            View
          </button>
        </div>
      </div>
    </div>
  );
}
