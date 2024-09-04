import React from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "./button";

export function Hero() {
  const navigate = useNavigate();

  const handleNavigation = () => {
    navigate("/trip"); // Navigate to the /trip route
  };

  return (
    <div className="flex flex-col w-full h-[100vh] items-center justify-center text-gray-800 font-bold relative bg-gradient-to-b from-gray-100 via-white to-gray-200">
      {/* Main content */}
      <div className="relative z-10 text-center p-5 max-w-xl">
        <h1 className="text-4xl md:text-5xl mb-4 bg-clip-text text-transparent bg-gradient-to-r from-gray-900 via-gray-800 to-gray-500">
          Unlock Your Next Adventure with Our AI-Powered Planner!
        </h1>
        <p className="text-lg md:text-xl mb-6 text-gray-700">
          Let Us Craft Your Ideal Itinerary with Advanced AI Insights!
        </p>
        <p className="text-sm md:text-base mb-8 text-gray-600">
          Tailor-Made Journeys with the Power of Artificial Intelligence!
        </p>
        <Button
          className="rounded-xl font-semibold py-3 px-6 bg-gradient-to-r from-yellow-400 to-yellow-500 hover:from-yellow-500 hover:to-yellow-600 text-white shadow-lg transform hover:scale-105 transition-transform duration-300"
          onClick={handleNavigation}
        >
          Discover the Experience {'\u{1F334}'}
        </Button>
      </div>
    </div>
  );
}
