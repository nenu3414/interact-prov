import React from "react";
import { LOGO } from "../../assets/logos";
import { Button } from "../Common/Button";
import { Link } from "react-router-dom";

export default function Nav() {
  return (
    <div>
      <div className="w-full mx-auto px-4 flex h-12 border-b-[1px] border-black">
        <div className="flex w-full justify-center items-center gap-">
          <img src={LOGO} alt="Logo" className="w-4 h-4" />
          <p className="w-full font-bold">PROV-Interact</p>
        </div>
        <div className="w-full flex items-center justify-end">
          <ul className="flex gap-8 mr-5 items-center font-medium">
            <li className="cursor-pointer">Home</li>
            <Link to="/create-prov" className="">
              <li className="cursor-pointer">Create Prov</li>
            </Link>
            <li className="cursor-pointer">View</li>
            {/* <li>Validate</li>
            <li>Bulk Upload</li> */}
            <div>
              <Button
                text="New"
                block
                rounded="rounded-lg"
                type="primary"
                size="sm"
              />
            </div>
            <div>
              <Button
                text="Help"
                block
                rounded="rounded-lg"
                type="outlined"
                size="sm"
              />
            </div>
          </ul>
        </div>
      </div>
    </div>
  );
}
