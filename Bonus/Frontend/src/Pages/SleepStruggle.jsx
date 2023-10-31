import React from "react";
import { useState } from "react";
import "../index.css";
import { useNavigate } from "react-router-dom";
import Loader from "../Components/Loader";

const SleepStruggle = () => {
  const [value, setValue] = useState("");
  const [loading, setLoading] = useState(false);
  const nav = useNavigate();
  let [nickname, setnickname] = useState(
    JSON.parse(localStorage.getItem("nickname")) || ""
  );

  const handleSubmit = async () => {
    try {
      setLoading(true);
      // Get the token from wherever it is stored in your frontend (e.g., localStorage)
      const token = localStorage.getItem("token"); // Example of getting token from localStorage, adjust based on your implementation
  
      let res = await fetch(`https://rich-tan-gopher-cap.cyclic.app/users/sleepStruggle`, {
        method: "POST",
        body: JSON.stringify({ userResponse: value, nickname }),
        headers: {
          "Content-Type": "application/json",
          "token": `${token}` // Include the token in the Authorization header
        },
      });
  
      // Handle the response as per your requirements
      res = await res.json();
      setLoading(false);
      alert(res.message);
      nav("/gotobed");
    } catch (error) {
      console.log(error);
      // Handle errors
      return;
    }
  };
  
  if (loading) {
    return <Loader/>
  }


  return (
    <div style={{width:"30%",margin:"auto"}}>
      <p style={{ fontSize: "24px" }}>
        Thats a great goal . How long you have been struggling with your sleep ?
      </p>
      <div>
        <p
          className={`sleepstruggle ${value === "Less than 2 Weeks" ? "check" : ""}`}
          onClick={() => {
            setValue("Less than 2 Weeks");
          }}
        >
          Less than 2 Weeks
        </p>
        <p
          className={`sleepstruggle ${value === "2 to 8 weeks" ? "check" : ""}`}
          onClick={() => {
            setValue("2 to 8 weeks");
          }}
        >
          2 to 8 weeks
        </p>
        <p
          className={`sleepstruggle ${value === "More than 8 weeks" ? "check" : ""}`}
          onClick={() => {
            setValue("More than 8 weeks");
          }}
        >
          More than 8 weeks
        </p>
      </div>
      <button className="button" onClick={handleSubmit}>Submit</button>
    </div>
  );
};

export default SleepStruggle;