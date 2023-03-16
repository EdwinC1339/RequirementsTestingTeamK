import React, { useState } from "react";
import Filter from "./Filter";
import { Dropdown, DropdownButton } from "react-bootstrap";
function Filters() {
  // Dummy restriction names
  const restriction_names = [
    "Halal",
    "Lactose Intolerant",
    "Nut Allergy",
    "Vegan",
    "Vegetarian",
  ];
  const filters = restriction_names.map((name) => {
    return <Filter name={name} />;
  });

  return (
    <div className="filters-div">
      <h1>SELECT YOUR RESTRICTIONS</h1>
      <p>
        Select from an extensive list of dietary restrictions to be able to
        choose the food service that suits your needs
      </p>
      <Dropdown>
        <Dropdown.Toggle variant="success" id="dropdown-basic">
          Restriction Selection
        </Dropdown.Toggle>

        <Dropdown.Menu>
          <div className="filters">{filters}</div>
        </Dropdown.Menu>
      </Dropdown>
    </div>
  );
}

export default React.memo(Filters);
