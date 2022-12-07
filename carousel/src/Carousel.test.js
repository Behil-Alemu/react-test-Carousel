import React from "react";
import { render, fireEvent } from "@testing-library/react";
import Carousel from "./Carousel";



it("renders without crashing Carousel", function() {
  render(<Carousel />);
});

it("matches snapshot", function() {
  const { asFragment } = render(<Carousel />);
  expect(asFragment()).toMatchSnapshot();
});

it("works when you click on the right arrow", function() {
  const { queryByTestId, queryByAltText } = render(<Carousel />);

  // expect the first image to show, but not the second
  expect(queryByAltText("Photo by Richard Pasquarella on Unsplash")).toBeInTheDocument();
  expect(queryByAltText("Photo by Pratik Patel on Unsplash")).not.toBeInTheDocument();

  // move forward in the carousel
  const rightArrow = queryByTestId("right-arrow");
  fireEvent.click(rightArrow);

  // expect the second image to show, but not the first
  expect(queryByAltText("Photo by Richard Pasquarella on Unsplash")).not.toBeInTheDocument();
  expect(queryByAltText("Photo by Pratik Patel on Unsplash")).toBeInTheDocument();
});


it("works when you click on the left arrow", function() {
  const { queryByTestId, queryByAltText } = render(<Carousel />);



  // move forward first in the carousel
  const rightArrow = queryByTestId("right-arrow");
  fireEvent.click(rightArrow);

  // then move backwards in the carousel
  const leftArrow = queryByTestId("left-arrow");
  fireEvent.click(leftArrow);

  // expect the second image backward to show, but not the first
  expect(queryByAltText("Photo by Richard Pasquarella on Unsplash")).toBeInTheDocument();
  expect(queryByAltText("Photo by Pratik Patel on Unsplash")).not.toBeInTheDocument();
});

it("Remove left or right arrow when last image", function() {
  const { queryByTestId, getByText} = render(<Carousel />);
  const divMain = getByText("Shells from far away beaches.");
  
  //props.[cardData].includes(cardIdx - 1) cardIdx - 1
  const leftArrow = queryByTestId("left-arrow");
  fireEvent.click(leftArrow);

  expect(divMain).not.toContainHTML('<i data-testid="left-arrow" />')
  expect(divMain).not.toHaveClass('fas fa-chevron-circle-left fa-2x')


})