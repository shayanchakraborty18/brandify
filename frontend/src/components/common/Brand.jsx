import React from "react";
import { MdDeviceHub, MdOutlineDevicesOther } from "react-icons/md";
import { Link } from "react-router-dom";
export const Brand = () => {
  return (
    <Link to="/" className="text-2xl font-bold">
      <div className="flex items-center gap-2">
        <MdOutlineDevicesOther className="text-card" size={24} />
        {/* <MdDeviceHub className="text-card" size={24} /> */}
        <h1 className="font-bold text-card">
          Device<span className="text-tertiary">Hub</span>
        </h1>
      </div>
    </Link>
  );
};
