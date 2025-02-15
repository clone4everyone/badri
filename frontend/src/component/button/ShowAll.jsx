import React from "react";
import "./FloatingActionAnimationButton.css";

const FloatingActionAnimationButton = ({showAll}) => {
  return (
    <div className="fab-container">
      <div className="overlay" /> 
      <div className="bar bar1" />
      <div className="bar bar2" />
      <div className="bar bar3" />
      <div className="bar bar4" />
      <div className="bar bar5" />
      <div className="main-button" />
      <div className="button-text-another"> {!showAll ? 'Show More' : 'Show Less'}  </div>
    </div>
  );
};

export default FloatingActionAnimationButton;
