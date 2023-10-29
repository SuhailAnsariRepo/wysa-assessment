import React, { useState } from "react";
import { useEffect } from "react";
import "../index.css";
import {Link} from "react-router-dom"
const Efficiency = () => {
  let [nickname, setnickname] = useState(
    JSON.parse(localStorage.getItem("nickname")) || ""
  );
  const [sleepEfficiency, setSleepEfficiency] = useState("");
  const getData = async () => {
    try {
      // Retrieve auth token from localStorage or your preferred storage
      const token = localStorage.getItem('token');
  
      let res = await fetch(`https://rich-tan-gopher-cap.cyclic.app/users/sleepEfficiency`, {
        method: "POST",
        body: JSON.stringify({ nickname }),
        headers: {
          "Content-Type": "application/json",
          // Include the auth token in the headers if available
          'token': `${token}`
        },
      });
  
      if (res.ok) {
        res = await res.json();
        setSleepEfficiency(res.sleepEfficiency);
      } else {
        // Handle unauthorized or other errors here
        if (res.status === 401) {
          // Handle unauthorized access (redirect to login page or show error message)
          console.error("Unauthorized access. Redirecting to login page...");
          // Redirect to login page or display an error message to the user
        } else {
          // Handle other errors
          console.error("Error fetching data:", res.status);
          // Handle other error scenarios as needed
        }
      }
    } catch (error) {
      console.error("Error fetching data:", error);
      // Handle network errors or other exceptions here
    }
  };
  

  useEffect(() => {
    getData();
  }, []);
  return (
    <div>
      <Link to={"/"}>Go Back to Home</Link>
      <p className="efficiency">You seem to have a sleep efficiency of  {sleepEfficiency}%</p>
      <br />
      {sleepEfficiency < 90 ? <p className="efficiency">We'll get this up to 90%</p> : ""}
      <br />

      <p className="efficiency">
        A higher sleep efficiency score a more refreshuing and energizing
        sleep,which can help you move into your day with a sense of lightness
        and ease.
      </p>
    </div>
  );
};

export default Efficiency;
