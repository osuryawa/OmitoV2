import React, { useEffect, useState } from "react";
import axios from "axios";
import "../Styles/home.css";
import Wallpaper from "./Wallpaper";
import QuickSearch from "./quickSearch";

const Home = () => {
  const [locations, setLocations] = useState([]);
  const [mealtypes, setMealtypes] = useState([]);

  useEffect(() => {
    sessionStorage.clear();

    axios({
      method: "GET",
      url: "http://localhost:4567/locations",
      headers: { "Content-Type": "application/json" },
    })
      .then((response) => {
        setLocations(response.data.locations);
      })
      .catch();

    axios({
      method: "GET",
      url: "http://localhost:4567/mealtypes",
      headers: { "Content-Type": "application/json" },
    })
      .then((response) => {
        setMealtypes(response.data.mealtype);
      })
      .catch();
  }, []);

  return (
    <>
      <div>
        <Wallpaper locationsData={locations} />
        <QuickSearch mealtypesData={mealtypes} />
      </div>
    </>
  );
};

export default Home;
