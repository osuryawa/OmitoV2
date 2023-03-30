import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import axios from "axios";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import "../Styles/home.css";
import Wallpaper from "./Wallpaper";
import QuickSearch from "./quickSearch";
import { fetchMealTypes } from "../Container/Actions/mealTypes";

const Home = (props) => {
  const { mealTypeData, isMealtypesLoading } = props;
  const [locations, setLocations] = useState([]);

  const mealTypes =
    mealTypeData && mealTypeData.mealtype ? mealTypeData.mealtype : [];

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

    props.fetchMealTypes();
  }, []);

  return (
    <>
      <div>
        <Wallpaper locationsData={locations} />
        {isMealtypesLoading ? (
          <Skeleton />
        ) : (
          <QuickSearch mealtypesData={mealTypes} />
        )}
      </div>
    </>
  );
};

const mapStateToProps = (state) => {
  return {
    mealTypeData: state.mealTypes.mealTypeData,
    isMealtypesLoading: state.mealTypes.loading,
  };
};

const mapsDispatchToProps = (dispatch) => {
  return {
    fetchMealTypes: () => dispatch(fetchMealTypes()),
  };
};

export default connect(mapStateToProps, mapsDispatchToProps)(Home);
