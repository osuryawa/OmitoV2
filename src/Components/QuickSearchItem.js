import React from "react";
import { withRouter } from "react-router-dom";

const QuickSearchItem = ({ heading, description, image, id, history }) => {
  const handleNavigate = (mealtypeId) => {
    const locationId = sessionStorage.getItem("locationId");
    if (locationId) {
      history.push(`/filter?mealtype=${mealtypeId}&location=${locationId}`);
    } else {
      history.push(`/filter?mealtype=${mealtypeId}`);
    }
  };
  return (
    <div
      className="col-sm-12 col-md-6 col-lg-4"
      onClick={() => handleNavigate(id)}
    >
      <div className="tileContainer">
        <div className="tileComponent1">
          <img src={`./${image}`} height="150" width="140" />
        </div>
        <div className="tileComponent2">
          <div className="componentHeading">{heading}</div>
          <div className="componentSubHeading">{description}</div>
        </div>
      </div>
    </div>
  );
};

export default withRouter(QuickSearchItem);
