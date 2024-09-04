import React from "react";
import { Button } from "./button";
import { jwtDecode } from "jwt-decode";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";

//import React from 'react';
import { GoogleLogin } from '@react-oauth/google';
//import { Button } from '@mui/material'; // Adjust import if you're using a different Button component


export function Signup() {
    const navigate = useNavigate();
    const [data,setData]=useState(null);
    const handleSuccess = (credentialResponse) => {
        console.log("Login Success:", credentialResponse);
        const decoded = jwtDecode(credentialResponse?.credential);
        setData(decoded); // Update state
        localStorage.setItem("data", JSON.stringify(decoded)); // Store in localStorage
      };

const storedData = localStorage.getItem("data");
if (storedData) {
  const parsedData = JSON.parse(storedData);
  console.log("Retrieved Data:", parsedData);
}
    const handleError = () => {
      console.log('Login Failed');
    };
    useEffect(() => {
        if (data) {
          console.log("Data updated and stored:", data);
          navigate("/trip")
        }
      }, [data,navigate]);

      useEffect(() => {
        const storedData = localStorage.getItem("data");
        if (storedData) {
          const parsedData = JSON.parse(storedData);
          console.log("Retrieved Data:", parsedData);
          //useNavigate("/trip")
        } else {
          console.log("No data found in localStorage");
        }
      }, []);


      if (storedData){
        useNavigate("/trip")
      }

    
    
    return (
      <div className="flex flex-col items-center justify-center min-h-screen">
        <div className="flex items-center justify-center w-full">
          <GoogleLogin
            onSuccess={handleSuccess}
            onError={handleError}
          />
        </div>
      </div>
    );
  }