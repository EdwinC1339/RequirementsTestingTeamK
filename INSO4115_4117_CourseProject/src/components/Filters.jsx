import React from "react";
import { useState, memo } from "react";
import Filter from "./Filter";
import Dropdown from "react-bootstrap/Dropdown";
import DropdownButton from "react-bootstrap/DropdownButton";

function Filters() {
  const restriction_names = [
    "Halal",
    "Lactose Intolerant",
    "Nut Allergy",
    "Vegan",
    "Vegetarian",
  ];

  const [selectedFilters, setSelectedFilters] = useState([]);

  const handleFilterSelection = (filterName) => {
    if (selectedFilters.includes(filterName)) {
      setSelectedFilters(selectedFilters.filter((name) => name !== filterName));
    } else {
      setSelectedFilters([...selectedFilters, filterName]);
    }
  };

  const handleCheckboxClick = (event) => {
    event.stopPropagation();
  };

  const filters = restriction_names.map((name) => {
    return (
      <Dropdown.Item key={name}>
        <label>
          <input
            type="checkbox"
            value={name}
            checked={selectedFilters.includes(name)}
            onChange={() => handleFilterSelection(name)}
            onClick={handleCheckboxClick}
          />
          {name}
        </label>
      </Dropdown.Item>
    );
  });

  return (
    <div className="filters-div">
      <h1>SELECT YOUR RESTRICTIONS</h1>
      <p>
        Select from an extensive list of dietary restrictions to be able to
        choose the food service that suits your needs
      </p>
      <DropdownButton
        variant="success"
        title="Restriction Selection"
        onToggle={() => {}}
        padding="10px"
      >
        {filters}
      </DropdownButton>
    </div>
  );
}

export default memo(Filters);
