import React, { useState } from "react";
import restaurantsData from "../node/restaurant.json";
import "./RestaurantList.css";
import { useNavigate, Link } from "react-router-dom";
import { faHouse } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Header from "../components/Header";
import Footer from "../components/Footer";
function RestaurantList() {
  const [counter, setCounter] = useState(1);
  const totalRestaurants = restaurantsData.length;
  const [seenLocations, setSeenLocations] = useState({});

  const handleColor = (location) => {
    if (seenLocations[location]) {
      return seenLocations[location];
    } else {
      const availableColors = [
        "#007bff",
        "#28a745",
        "#dc3545",
        "#ffc107",
        "#17a2b8",
        "#f012be",
        "#bada55",
        "#39cccc",
        "#85144b",
        "#3d9970",
        "#2ecc40",
        "#ff4136",
        "#7fdbff",
        "#ff851b",
        "#ffdc00",
        "#001f3f",
        "#39cccc",
        "#3d9970",
        "#e83e8c",
        "#f012be",
        "#85144b",
        "#2ecc40",
        "#ff4136",
        "#7fdbff",
        "#ff851b",
        "#ffdc00",
      ];
      const usedColors = Object.values(seenLocations);
      const availableColorsWithoutUsed = availableColors.filter(
        (color) => !usedColors.includes(color)
      );
      const randomColor =
        availableColorsWithoutUsed[
          Math.floor(Math.random() * availableColorsWithoutUsed.length)
        ];
      setSeenLocations((prevState) => ({
        ...prevState,
        [location]: randomColor,
      }));
      return randomColor;
    }
  };

  const [buttonStyle, setButtonStyle] = useState({
    backgroundColor: "#007bff",
    color: "#fff",
    borderRadius: "5px",
    padding: "10px",
    fontSize: "16px",
    marginTop: "20px",
    cursor: "pointer",
    transition: "all 0.2s ease-in-out",
    boxShadow: "0px 0px 5px rgba(0, 0, 0, 0.2)",
  });

  const handleMouseEnter = () => {
    setButtonStyle({
      ...buttonStyle,
      backgroundColor: "#0056b3",
      transform: "scale(1.05)",
    });
  };

  const handleMouseLeave = () => {
    setButtonStyle({
      ...buttonStyle,
      backgroundColor: "#007bff",
      transform: "scale(1)",
    });
  };

  return (
    <>
      <Header />
      <div className="header">Restaurants </div>{" "}
      <div className="container-fluid">
        {restaurantsData.map((restaurant, index) => (
          <div
            key={restaurant.id}
            className="restaurant"
            style={{ backgroundColor: handleColor(restaurant.location) }}
          >
            <h2 className="name">{restaurant.name}</h2>
            <p className="location">Location: {restaurant.location}</p>
          </div>
        ))}
      </div>
      <Footer />
    </>
  );
}

export default RestaurantList;
