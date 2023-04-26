import React, { useState } from "react";

import { FaStar } from "react-icons/fa";
import "./styles/RatingComponent.css";
import { Card, Form, Button } from "react-bootstrap";

const RatingComponent = ({ restaurantName, location }) => {
  const [rating, setRating] = useState(null);
  const [hoverRating, setHoverRating] = useState(null);
  const [review, setReview] = useState("");
  const [error, setError] = useState("");
  const [restaurant, setRestaurant] = useState({ reviews: [] }); // Initialize the restaurant state

  // Rest of the code

  console.log("Restaurant name:", restaurantName);
  console.log("Location:", location);
  const handleRatingClick = (value) => {
    setRating(value);
  };

  const handleMouseEnter = (value) => {
    setHoverRating(value);
  };

  const handleMouseLeave = () => {
    setHoverRating(null);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!restaurant) {
      console.error("Restaurant data not available.");
      return;
    }

    restaurant.reviews.push({
      rating,
      review,
    });
    console.log("Review added to existing restaurant in JSON:", {
      rating,
      review,
    });

    setRating(null);
    setHoverRating(null);
    setReview("");
    setError("");

    // Make a request to your API to update the restaurant document in the database
    try {
      const response = await fetch("http://localhost:4000/api/add-review", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          id: restaurantName.toLowerCase().replace(/[^a-z0-9]+/g, "-"),
          location: location,
          rating: rating,
          review: review,
        }),
      });
      const data = await response.json();
      console.log("Server response:", data);
    } catch (error) {
      console.error("Error submitting review:", error);
    }
  };
  if (!restaurantName) {
    restaurantName = null; // default value
  }

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

  <Card>
    <Card.Header>
      Rate {restaurantName || null} at {location}
    </Card.Header>
    <Card.Body>
      {error && <div>{error}</div>}
      <Form onSubmit={handleSubmit}>
        <Form.Group controlId="formRating">
          <Form.Label>Rating:</Form.Label>
          <div>{stars}</div>
        </Form.Group>
        <Form.Group controlId="formReview">
          <Form.Label>Review:</Form.Label>
          <Form.Control
            as="textarea"
            rows={3}
            value={review}
            onChange={(e) => setReview(e.target.value)}
          />
        </Form.Group>
        <Button variant="primary" type="submit" disabled={!review}>
          Submit
        </Button>
      </Form>
    </Card.Body>
  </Card>;
};

export default RatingComponent;
