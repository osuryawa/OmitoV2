import React from "react";
import axios from "axios";
import { useState } from "react";
import { withRouter } from "react-router-dom";
import "../Styles/home.css";

const Wallpaper = (props) => {
  const { locationsData } = props;
  const [restaurants, setRestaurants] = useState([]);
  const [inputText, setInputText] = useState(undefined);
  const [suggestions, setSuggestions] = useState([]);

  const handleLocationChange = (event) => {
    const locationId = event.target.value;
    sessionStorage.setItem("locationId", locationId);

    axios({
      method: "GET",
      url: `http://localhost:4567/restaurants/${locationId}`,
      headers: { "Content-Type": "application/json" },
    })
      .then((response) => {
        setRestaurants(response.data.restaurants);
        setInputText("");
      })
      .catch();
  };

  const handleSearch = (event) => {
    const inputText = event.target.value;

    const suggestions = restaurants.filter((item) =>
      item.name.toLowerCase().includes(inputText.toLowerCase())
    );
    setInputText(inputText);
    setSuggestions(suggestions);
  };

  const selectingRestaurant = (resObj) => {
    props.history.push(`/details?restaurant=${resObj._id}`);
  };

  const showSuggestion = () => {
    if (suggestions.length === 0 && inputText === undefined) {
      return null;
    }
    if (suggestions.length > 0 && inputText === "") {
      return null;
    }
    if (suggestions.length === 0 && inputText) {
      return (
        <ul>
          <li>No Search Results Found</li>
        </ul>
      );
    }
    return (
      <ul>
        {suggestions.map((item, index) => (
          <li
            key={index}
            onClick={() => selectingRestaurant(item)}
          >{`${item.name} -   ${item.locality},${item.city}`}</li>
        ))}
      </ul>
    );
  };

  return (
    <div>
      {/* Adding Wallpaper */}
      <img src="./Assets/homepageimg.png" width="100%" height="450" />
      <div>
        <div className="logo">
          <p>e!</p>
        </div>

        <div className="headings">Find the best restaurants, cafes, bars</div>

        <div className="locationSelector">
          <select className="locationDropdown" onChange={handleLocationChange}>
            <option value="0">Select</option>
            {locationsData.map((item) => {
              return (
                <option
                  value={item.location_id}
                >{`${item.name}, ${item.city}`}</option>
              );
            })}
          </select>
          <div>
            <span className="glyphicon glyphicon-search search"></span>
            <div id="notebooks">
              <input
                id="query"
                className="restaurantsinput"
                type="text"
                value={inputText}
                placeholder="Please Enter Restaurant Name"
                onChange={handleSearch}
              />
              {showSuggestion()}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default withRouter(Wallpaper);
