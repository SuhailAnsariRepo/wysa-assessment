import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Loader from "../Components/Loader";
import "../index.css";

const SleepChange = () => {
  const [values, setValues] = useState({
    lessThanTwoWeeks: false,
    twoToEightWeeks: false,
    moreThanEightWeeks: false
  });
  const [loading, setLoading] = useState(false);

  const nav = useNavigate();
  let [nickname, setnickname] = useState(
    JSON.parse(localStorage.getItem("nickname")) || ""
  );
  const handleCheckboxChange = (event) => {
    const { name, checked } = event.target;
    setValues((prevValues) => ({
      ...prevValues,
      [name]: checked
    }));
  };

  const handleSubmit = async () => {
    // Prepare selected values for API request
    const selectedValues = [];
    if (values.lessThanTwoWeeks) {
      selectedValues.push("I would go to sleep easily");
    }
    if (values.twoToEightWeeks) {
      selectedValues.push("I would sleep through the night");
    }
    if (values.moreThanEightWeeks) {
      selectedValues.push("I'd wake up on time, refereshed");
    }
  
    setLoading(true);
    try {
      // Get the token from wherever it is stored in your frontend (e.g., localStorage)
      const token = localStorage.getItem("token"); // Example of getting token from localStorage, adjust based on your implementation
      
      // Replace 'YOUR_API_ENDPOINT' with the actual endpoint URL
      const response = await fetch(`https://rich-tan-gopher-cap.cyclic.app/users/sleepChange`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "token": `${token}` // Include the token in the Authorization header
        },
        body: JSON.stringify({ nickname, userResponses: selectedValues }),
      });
  
      // Handle the response as per your requirements
      if (response.ok) {
        // API call was successful
        const data = await response.json();
        console.log("API Response:", data);
        setLoading(false);
        alert(data.message);
        nav("/sleepstruggle"); // Navigate to the next page upon successful API response
      } else {
        // API call failed
        console.error("Error occurred while making the API request.");
        setLoading(false);
      }
    } catch (error) {
      console.error("Error occurred during API request:", error);
      setLoading(false);
    }
  };
  

  if (loading) {
    return <Loader />;
  }

  return (
    <div className="checkbox-container" style={{ width: "30%", margin: "auto" }}>
      <p style={{ fontSize: "24px" }}>
        Thats a great goal. How long have you been struggling with your sleep?
      </p>
      <div style={{display:"flex",flexDirection:"column", fontSize: "24px"}}>
      <label className="checkbox-label">
          <input
            type="checkbox"
            name="lessThanTwoWeeks"
            checked={values.lessThanTwoWeeks}
            onChange={handleCheckboxChange}
          />
           I would go to sleep easily
        </label>
        <label className="checkbox-label">
          <input
            type="checkbox"
            name="twoToEightWeeks"
            checked={values.twoToEightWeeks}
            onChange={handleCheckboxChange}
          />
          I would sleep through the night
        </label>
        <label className="checkbox-label">
          <input
            type="checkbox"
            name="moreThanEightWeeks"
            checked={values.moreThanEightWeeks}
            onChange={handleCheckboxChange}
          />
          I'd wake up on time, refereshed
        </label>
      </div>
      <button className="button" onClick={handleSubmit} disabled={!values.lessThanTwoWeeks && !values.twoToEightWeeks && !values.moreThanEightWeeks}>
        Submit
      </button>
    </div>
  );
};

export default SleepChange;
