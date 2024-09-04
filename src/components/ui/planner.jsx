import React, { useState, useEffect } from "react";
import { Header } from "./header";
import Autocomplete from "react-google-autocomplete";
import { SelectTravelesList, SelectBudgetOptions, AI_PROMPT } from "@/constants/helperinfo";
import { Button } from "./button";
import { chatSession } from "@/aimodel/aimodel"; // Ensure this is correctly imported
import { addDoc, collection } from "firebase/firestore";
import { db } from "@/firebaseconfig"; // Ensure this is the correct path to your Firebase config
import { useNavigate } from "react-router-dom";

export function Planner() {
  const [place, setPlace] = useState(null);
  const [selectedItem, setSelectedItem] = useState(null);
  const [selectedItem2, setSelectedItem2] = useState(null);
  const [generatedPrompt, setGeneratedPrompt] = useState("");
  const [docrefid, setdocref] = useState();
  const navigate = useNavigate();

  const handleTravelerClick = (item) => {
    setSelectedItem(item);
  };

  const handleBudgetClick = (item) => {
    setSelectedItem2(item);
  };

  const generatePrompt = async () => {
    if (!place || !selectedItem || !selectedItem2) {
      console.log("Please fill all the data");
      return;
    }

    const locationName = place?.address_components?.[0]?.long_name || "Unknown Location";
    const travelerTitle = selectedItem?.title || "Unknown Traveler";
    const budgetTitle = selectedItem2?.title || "Unknown Budget";

    const updatedPrompt = AI_PROMPT
      .replace("{location}", locationName)
      .replace("{totalDays}", 5) // You can make this dynamic if needed
      .replace("{traveler}", travelerTitle)
      .replace("{budget}", budgetTitle);

    setGeneratedPrompt(updatedPrompt);
    console.log("Generated Prompt:", updatedPrompt);

    try {
      const result = await chatSession.sendMessage(updatedPrompt);
      const responseData = JSON.parse(result?.response?.text() || '{}');

      const docRef = await addDoc(collection(db, "users"), {
        prompt: updatedPrompt,
        result: responseData,
        location: locationName,
        traveler: travelerTitle,
        budget: budgetTitle,
        createdAt: new Date(), // Add a timestamp for sorting
      });
      console.log("Document written with ID:", docRef.id);
      localStorage.setItem("docRefId", docRef.id);
      setdocref("docRef.id");
      navigate("/planner");
    } catch (error) {
      console.error("Error adding document: ", error);
    }
  };

  useEffect(() => {
    if (selectedItem && selectedItem2) {
      console.log("Selected Items:", selectedItem, selectedItem2);
    }
  }, [selectedItem, selectedItem2]);

  return (
    <div className="relative min-h-screen bg-gradient-to-b from-gray-100 via-white to-gray-200">
      <Header />

      <div className="relative z-10 flex flex-col items-center justify-center mt-10 gap-6 px-6">
        <div className="text-center text-gray-800 max-w-2xl">
          <h1 className="font-bold text-4xl sm:text-5xl tracking-wide bg-clip-text text-transparent bg-gradient-to-r from-gray-900 via-gray-800 to-gray-500">
            Share Your Preferences for a Perfectly Tailored Journey
          </h1>
          <p className="font-semibold mt-5 text-2xl text-[#F73B52]">
            Share Your Interests and Discover Tailor-Made Experiences
          </p>
        </div>

        {/* Search Input */}
        <div className="w-full max-w-xl mt-10 rounded-lg">
          <Autocomplete
            apiKey={"AIzaSyDbxL_AouMBYR7o5ru0dpMcr_qMDIO5OyU"}
            onPlaceSelected={(place) => setPlace(place)}
            className="w-full p-4 border border-gray-300 rounded-lg shadow-lg text-center focus:border-blue-500 focus:ring focus:ring-blue-200 focus:ring-opacity-50 transition duration-150 ease-in-out"
            placeholder="Search for a place 🤓"
          />
        </div>

        {/* Travel Experience Section */}
        <div className="text-center text-gray-800 font-bold text-4xl py-8">
          Choose Your Ideal Travel Experience 🌎
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-8 px-4 w-full max-w-5xl">
          {SelectTravelesList.map((item) => (
            <div
              key={item.id}
              className={`flex flex-col items-center p-6 bg-white shadow-lg rounded-3xl transform transition-transform hover:scale-105 cursor-pointer ${
                selectedItem === item ? "ring-4 ring-[#F73B52]" : ""
              }`}
              onClick={() => handleTravelerClick(item)}
            >
              <div className="text-4xl">{item.icon}</div>
              <h2 className="mt-4 text-xl font-semibold">{item.title}</h2>
              <p className="mt-2 text-gray-700">{item.desc}</p>
              <p className="mt-1 text-gray-500">{item.people}</p>
            </div>
          ))}
        </div>

        {/* Budget Section */}
        <div className="text-center text-gray-800 font-bold text-4xl py-8">
          Choose your Budget 💵
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 px-4 w-full max-w-5xl">
          {SelectBudgetOptions.map((item) => (
            <div
              key={item.id}
              className={`flex flex-col items-center p-6 bg-white shadow-lg rounded-3xl transform transition-transform hover:scale-105 cursor-pointer ${
                selectedItem2 === item ? "ring-4 ring-[#F73B52]" : ""
              }`}
              onClick={() => handleBudgetClick(item)}
            >
              <div className="text-4xl">{item.icon}</div>
              <h2 className="mt-4 text-xl font-semibold">{item.title}</h2>
              <p className="mt-2 text-gray-700">{item.desc}</p>
            </div>
          ))}
        </div>

        {/* Generate Trip Button */}
        <div className="mt-12">
          <Button
            onClick={generatePrompt}
            className="rounded-xl p-4 text-white font-semibold bg-gradient-to-r from-[#F73B52] to-red-600 shadow-xl transform transition duration-300 hover:scale-105"
          >
            Generate TRIP 🧳
          </Button>
        </div>
      </div>
    </div>
  );
}
