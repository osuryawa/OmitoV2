import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import "../Styles/home.css";
import Wallpaper from "./Wallpaper";
import QuickSearch from "./QuickSearch";
import { fetchMealTypes } from "../Container/Actions/mealTypes";
import { fetchLocations } from "../Container/Actions/locations";

const Home = (props) => {
  const { mealTypesDetails, locationsData, fetchLocations, fetchMealTypes } =
    props;

  const mealTypes =
    mealTypesDetails &&
    mealTypesDetails.mealTypeData &&
    mealTypesDetails.mealTypeData.mealtype
      ? mealTypesDetails.mealTypeData.mealtype
      : [];

  const isMealtypesLoading = mealTypesDetails && mealTypesDetails.loading;

  const locations =
    locationsData && locationsData.locations ? locationsData.locations : [];

  useEffect(() => {
    sessionStorage.clear();
    fetchLocations();
    fetchMealTypes();
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
    mealTypesDetails: state.mealTypes,
    locationsData: state.locations.locationsData,
  };
};

const mapsDispatchToProps = (dispatch) => {
  return {
    fetchMealTypes: () => dispatch(fetchMealTypes()),
    fetchLocations: () => dispatch(fetchLocations()),
  };
};

export default connect(mapStateToProps, mapsDispatchToProps)(Home);
