import React, { useState } from "react";
import restaurants from "../node/restaurant.json";
import { FaStar } from "react-icons/fa";
import "./styles/RatingComponent.css";
import { Card, Form, Button } from "react-bootstrap";

const RatingComponent = ({ restaurantName }) => {
  const [rating, setRating] = useState(null);
  const [hoverRating, setHoverRating] = useState(null);
  const [review, setReview] = useState("");
  const [error, setError] = useState("");
  const [restaurantLocation, setRestaurantLocation] = useState(null); // Added state for restaurantLocation

  const handleRatingClick = (value) => {
    setRating(value);
  };

  const handleMouseEnter = (value) => {
    setHoverRating(value);
  };

  const handleMouseLeave = () => {
    setHoverRating(null);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const restaurant = restaurants.find((r) => r.name === restaurantName);
    if (!restaurant) {
      // If the restaurant doesn't exist in the JSON file, add it with the current review
      restaurants.push({ name: restaurantName, reviews: [{ rating, review }] });
      console.log("New restaurant added to JSON:", {
        name: restaurantName,
        reviews: [{ rating, review }],
      });
    } else {
      // If the restaurant exists in the JSON file, check if it already has a review for the current location
      const existingReview = restaurant.reviews.find(
        (r) => r.location === restaurantLocation
      );
      if (existingReview) {
        setError("A review for this location already exists.");
        return;
      } else {
        // If the restaurant exists in the JSON file but doesn't have a review for the current location, add the review
        restaurant.reviews.push({
          rating,
          review,
          location: restaurantLocation,
        });
        console.log("Review added to existing restaurant in JSON:", {
          rating,
          review,
        });
      }
    }
    setRating(null);
    setHoverRating(null);
    setReview("");
    setError("");
    // Here you can make a request to your API to update the restaurant document in the database
  };

  const restaurant = restaurants.find((r) => r.name === restaurantName);
  const locations = restaurant ? restaurant.locations : [];

  const stars = [];
  for (let i = 1; i <= 5; i++) {
    let icon;
    if (hoverRating != null) {
      if (i <= hoverRating) {
        icon = <FaStar color="#ffc107" />;
      } else {
        icon = <FaStar color="#e4e5e9" />;
      }
    } else {
      if (i <= rating) {
        icon = <FaStar color="#ffc107" />;
      } else {
        icon = <FaStar color="#e4e5e9" />;
      }
    }
    stars.push(
      <span
        key={i}
        onClick={() => handleRatingClick(i)}
        onMouseEnter={() => handleMouseEnter(i)}
        onMouseLeave={handleMouseLeave}
      >
        {icon}
      </span>
    );
  }

  return (
    <Card>
      <Card.Header>Rate {restaurantName}</Card.Header>
      <Card.Body>
        {error && <div>{error}</div>}
        <Form onSubmit={handleSubmit}>
          <Form.Group controlId="formRating">
            <Form.Label>Rating:</Form.Label>
            <div>{stars}</div>
          </Form.Group>
          {locations.length > 0 && (
            <Form.Group controlId="formLocation">
              <Form.Label>Location:</Form.Label>
              <Form.Control
                as="select"
                onChange={(e) => setRestaurantLocation(e.target.value)}
              >
                <option>Select a location</option>
                {locations.map((location, index) => (
                  <option key={index} value={location}>
                    {location}
                  </option>
                ))}
              </Form.Control>
            </Form.Group>
          )}
          <Form.Group controlId="formReview">
            <Form.Label>Review:</Form.Label>
            <Form.Control
              as="textarea"
              rows={3}
              value={review}
              onChange={(e) => setReview(e.target.value)}
            />
          </Form.Group>
          <Button variant="primary" type="submit">
            Submit
          </Button>
        </Form>
      </Card.Body>
    </Card>
  );
};

export default RatingComponent;
