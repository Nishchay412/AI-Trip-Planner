import React, { useEffect, useState } from "react";
import { Button } from "./button";
import { useNavigate } from "react-router-dom";

export function Header() {
  const [data, setData] = useState(null);
  const [name, setName] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const lcdata = localStorage.getItem("data");

    if (lcdata) {
      const parsedData = JSON.parse(lcdata);
      console.log("Data found in localStorage:", parsedData);
      setData(parsedData);
      setName(parsedData.name || ""); // Update name state with the value from data
    } else {
      console.log("No data found in localStorage");
    }
  }, []);

  const handleNavigation2 = () => {
    navigate("/signup");
  };

  return (
    <header className="flex items-center justify-between w-full h-16 px-6 bg-transparent  fixed top-0 z-20">
      {/* Logo */}
      <div className="flex items-center gap-2">
        <div className="text-3xl font-extrabold text-gray-800">
          TRAVELMANIA
        </div>
        <div className="text-2xl text-yellow-500">
          {'\u{2708}'} {/* Airplane emoji */}
        </div>
      </div>

      {/* Button */}
      <div className="p-2">
        <Button
          className="rounded-full bg-gradient-to-r from-yellow-400 via-orange-500 to-red-500 hover:from-red-500 hover:to-yellow-500 px-6 py-2 text-sm font-semibold text-white shadow-lg transform hover:scale-105 transition-transform duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
          onClick={handleNavigation2}
        >
          {name || "Sign Up!"} {/* Default text if name is not available */}
        </Button>
      </div>
    </header>
  );
}
