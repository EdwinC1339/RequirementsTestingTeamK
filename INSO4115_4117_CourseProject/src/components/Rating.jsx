import React, { useState, useRef } from "react";
import { Card, Form, Button } from "react-bootstrap";
import { useEffect } from "react";
import { FaStar } from "react-icons/fa";
import "./styles/RatingComponent.css";
const restriction_names = [
  "Halal",
  "Lactose Intolerant",
  "Nut Allergy",
  "Vegan",
  "Vegetarian",
];
const RatingComponent = ({ restaurantName, location }) => {
  const [rating, setRating] = useState(null);
  const [hoverRating, setHoverRating] = useState(null);
  const [review, setReview] = useState("");
  const [error, setError] = useState("");
  const [restaurant, setRestaurant] = useState({ reviews: [] }); // Initialize the restaurant state
  const [averageRating, setAverageRating] = useState(0);
  const [restrictions, setRestrictions] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const prevRestaurantNameRef = useRef();
  const prevLocationRef = useRef();

  useEffect(() => {
    prevRestaurantNameRef.current = restaurantName;
    prevLocationRef.current = location;
  });

  const prevRestaurantName = prevRestaurantNameRef.current;
  const prevLocation = prevLocationRef.current;

  useEffect(() => {
    if (restaurantName !== prevRestaurantName || location !== prevLocation) {
      setSubmitted(false);
    }

    prevRestaurantNameRef.current = restaurantName;
    prevLocationRef.current = location;
  }, [restaurantName, location]);

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
  const handleRestrictionChange = (restrictionName, value) => {
    const newRestrictions = { ...restrictions, [restrictionName]: value };
    console.log("New restrictions:", newRestrictions);
    setRestrictions(newRestrictions);
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

    setRating(null);
    setHoverRating(null);
    setReview("");
    setError("");
    setRestrictions({}); // Reset restrictions state
    setSubmitted(true);

    try {
      const response = await fetch("http://localhost:4000/api/add-review", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          id: restaurantName.toLowerCase().replace(/[^a-z0-9]+/g, "-"),
          location: location,
          rating: rating,
          review: review,
          restrictions: restrictions, // include the restrictions object in the payload
        }),
      });
      const data = await response.json();
      console.log("Server response:", data);
    } catch (error) {
      console.error("Error submitting review:", error);
    }
  };

  useEffect(() => {
    const fetchRestaurantData = async () => {
      try {
        const response = await fetch(
          "http://localhost:4000/api/get-restaurant-rating",
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              id: restaurantName.toLowerCase().replace(/[^a-z0-9]+/g, "-"),
              location: location,
            }),
          }
        );
        const data = await response.json();
        setAverageRating(data.averageRating);
        console.log("Server response:", data);
      } catch (error) {
        console.error("Error fetching restaurant data:", error);
      }
    };
    fetchRestaurantData();
  }, [restaurantName, location]);

  useEffect(() => {
    console.log("Average rating:", averageRating);
  }, [averageRating]);
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
  return (
    <>
      {submitted ? (
        <Card>
          <Card.Header>Thank you for your rating!</Card.Header>
        </Card>
      ) : (
        <Card>
          <Card.Header>
            Rate {restaurantName || null} at {location}
          </Card.Header>
          <Form.Label style={{ paddingTop: "10px" }}>Filters:</Form.Label>
          <Card.Body>
            {error && <div>{error}</div>}

            <div
              style={{
                height: "100px",
                overflowY: "scroll",
                paddingBottom: "5px",
              }}
            >
              <Form.Group controlId="formFilters">
                {restriction_names.map((restriction, index) => (
                  <div
                    key={index}
                    style={{
                      fontSize: "12px",
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                      margin: "2px 0",
                    }}
                  >
                    <div style={{ marginRight: "3px" }}>{restriction}</div>
                    <div>
                      <Form.Check
                        inline
                        type="radio"
                        label={<span style={{ fontSize: "10px" }}>Yes</span>}
                        id={`restriction-yes-${restriction}`}
                        name={`${restriction}`}
                        value={true}
                        onChange={(e) =>
                          handleRestrictionChange(`${restriction}`, true)
                        }
                        checked={restrictions[`${restriction}`] === true}
                      />

                      <Form.Check
                        inline
                        type="radio"
                        label={<span style={{ fontSize: "10px" }}>No</span>}
                        id={`restriction-no-${restriction}`}
                        name={`${restriction}`}
                        value={false}
                        onChange={(e) =>
                          handleRestrictionChange(`${restriction}`, false)
                        }
                        checked={restrictions[`${restriction}`] === false}
                      />
                    </div>
                  </div>
                ))}
              </Form.Group>
            </div>

            <Form onSubmit={handleSubmit}>
              <Form.Group controlId="formRating">
                <Form.Label style={{ paddingTop: "10px" }}>
                  Rating: {averageRating}
                </Form.Label>
                <div>{stars}</div>
              </Form.Group>
              <Form.Label>Meets restriction:</Form.Label>
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
        </Card>
      )}
    </>
  );
};

export default RatingComponent;
