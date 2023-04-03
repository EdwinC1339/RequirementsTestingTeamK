import React from 'react';
import renderer from 'react-test-renderer';
import Filters from '../src/components/Filters.jsx';

describe('Filters', () => {
  it('should render a dropdown list of items', () => {
    const filters = [
      { name: "Halal" },
      { name: "Lactose Intolerant"},
      { name: "Nut Allergy" },
      { name: "Vegan"},
      { name: "Vegetarian" }
    ];
    const component = renderer.create(
      <Filters/>,
    );
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();

    // Ensure the element is rendered
    expect(component).toBeInTheDocument();

    // Ensure the options are rendered
    filters.forEach((filter) => {
      expect(getByText(filter.name)).toBeInTheDocument();
    });
  });
});
