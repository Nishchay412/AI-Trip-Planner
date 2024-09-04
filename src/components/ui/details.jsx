import React, { useState, useEffect } from "react";
import { Header } from "./header";
import { doc, getDoc } from "firebase/firestore";
import { db } from "@/firebaseconfig";

export function Results() {
  const [tripData, setTripData] = useState({ hotels: [], itinerary: [] });
  const [docId, setDocId] = useState("");
  const [selectedDay, setSelectedDay] = useState(null); // State to manage the selected day

  useEffect(() => {
    async function fetchDocumentById() {
      const storedDocId = localStorage.getItem('docRefId');
      setDocId(storedDocId);

      if (!storedDocId) {
        console.log("No document ID found in localStorage.");
        return;
      }

      try {
        const docRef = doc(db, "users", storedDocId);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          const data = docSnap.data();
          console.log("Document data:", data);
          setTripData({
            hotels: data.result.hotels || [], // Ensure hotels is an array
            itinerary: data.result.itinerary || [] // Ensure itinerary is an array
          });
        } else {
          console.log("No such document!");
        }
      } catch (error) {
        console.error("Error fetching document:", error);
      }
    }
    
    fetchDocumentById();
  }, [docId]);

  // Define a click handler for hotels
  const handleHotelClick = (hotel) => {
    console.log("Clicked hotel:", hotel);
  };

  // Define a click handler for days in the itinerary
  const handleDayClick = (dayIndex) => {
    setSelectedDay(dayIndex === selectedDay ? null : dayIndex);
  };

  return (
    <div className="flex flex-col min-h-screen bg-gray-100">
      <Header />
      <div className="flex items-center justify-center w-full py-8 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 text-white">
        <div className="font-bold text-3xl md:text-4xl">
          Here is everything you need
        </div>
      </div>
      
      <div className="flex flex-wrap justify-center gap-8 p-6">
        {tripData.hotels.length > 0 ? (
          tripData.hotels.map((hotel, index) => (
            <div
              key={index}
              className="bg-white shadow-xl rounded-lg overflow-hidden transform hover:scale-105 transition-transform duration-300 w-80"
              onClick={() => handleHotelClick(hotel)}
            >
              <img
                className="w-full h-48 object-cover"
                src={hotel.hotelImageUrl}
                alt={hotel.hotelName}
              />
              <div className="p-4">
                <div className="text-lg font-bold text-gray-800">
                  {hotel.hotelName}
                </div>
                <div className="flex items-center justify-between mt-2">
                  <span className="text-gray-600">{hotel.rating} ★</span>
                  <span className="text-indigo-600 font-semibold">{hotel.price}</span>
                </div>
                <p className="mt-3 text-gray-500 text-sm">{hotel.description}</p>
              </div>
            </div>
          ))
        ) : (
          <div className="flex justify-center items-center w-full h-40">
            <p className="text-lg text-gray-600">No hotels available.</p>
          </div>
        )}
      </div>

      <div className="p-6">
        <h2 className="text-2xl font-bold text-gray-800 mb-4 text-center ">Itinerary</h2>
        <div className="space-y-6">
          {tripData.itinerary.length > 0 ? (
            tripData.itinerary.map((day, index) => (
              <div key={index} className="bg-white shadow-lg rounded-lg p-4">
                <button
                  onClick={() => handleDayClick(index)}
                  className="w-full text-left font-semibold text-xl text-gray-700 mb-2"
                >
                  {day.day}
                </button>
                {selectedDay === index && (
                  <div className="space-y-4">
                    {day.plan.map((item, i) => (
                      <div key={i} className="bg-gray-50 p-4 rounded-lg shadow-md">
                        <h4 className="font-semibold text-lg">{item.placeName}</h4>
                        <p className="text-gray-600">{item.time}</p>
                        {item.placeImageUrl && (
                          <img
                            className="w-full h-40 object-cover mt-2 mb-2"
                            src={item.placeImageUrl}
                            alt={item.placeName}
                          />
                        )}
                        <p className="text-gray-500 mt-2">{item.placeDetails}</p>
                        {item.placeAddress && (
                          <p className="text-gray-500 mt-1">Address: {item.placeAddress}</p>
                        )}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            ))
          ) : (
            <div className="flex justify-center items-center w-full h-40">
              <p className="text-lg text-gray-600">No itinerary available.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
