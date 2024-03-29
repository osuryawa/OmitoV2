import React, { useState, useEffect } from "react";
import queryString from "query-string";
import axios from "axios";
import "../Styles/filter.css";

const Filter = (props) => {
  const [restaurants, setRestaurants] = useState([]);
  const [locations, setLocations] = useState([]);
  const [mealtype, setMealtype] = useState(undefined);
  const [location, setLocation] = useState(undefined);
  const [cuisine, setCuisine] = useState([]);
  const [lcost, setLcost] = useState(undefined);
  const [hcost, setHcost] = useState(undefined);
  const [sort, setSort] = useState(1);
  const [page, setPage] = useState(1);
  const [pageCount, setPageCount] = useState([]);

  useEffect(() => {
    const qs = queryString.parse(props.location.search);
    const { mealtype, location } = qs;

    const filterObj = {
      mealtype: Number(mealtype),
      location,
    };
    axios({
      method: "POST",
      url: "http://100.25.134.2:4567/filter",
      headers: { "Content-Type": "application/json" },
      data: filterObj,
    })
      .then((response) => {
        setRestaurants(response.data.restaurants);
        setMealtype(mealtype);
        setPageCount(response.data.pageCount);
      })
      .catch();

    axios({
      method: "GET",
      url: "http://100.25.134.2:4567/locations",
      headers: { "Content-Type": "application/json" },
    })
      .then((response) => {
        setLocations(response.data.locations);
      })
      .catch();
  }, []);

  const handleSortChange = (sort) => {
    const filterObj = {
      mealtype: Number(mealtype),
      cuisine: cuisine.length == 0 ? undefined : cuisine,
      location,
      lcost,
      hcost,
      sort,
      page,
    };

    axios({
      method: "POST",
      url: "http://100.25.134.2:4567/filter",
      headers: { "Content-Type": "application/json" },
      data: filterObj,
    })
      .then((response) => {
        setRestaurants(response.data.restaurants);
        setSort(sort);
        setPageCount(response.data.pageCount);
      })
      .catch();
  };

  const handleCostChange = (lcost, hcost) => {
    const filterObj = {
      mealtype: Number(mealtype),
      cuisine: cuisine.length == 0 ? undefined : cuisine,
      location,
      lcost,
      hcost,
      sort,
      page,
    };

    axios({
      method: "POST",
      url: "http://100.25.134.2:4567/filter",
      headers: { "Content-Type": "application/json" },
      data: filterObj,
    })
      .then((response) => {
        setRestaurants(response.data.restaurants);
        setLcost(lcost);
        setHcost(hcost);
        pageCount(response.data.pageCount);
      })
      .catch();
  };

  const handleLocationChange = (event) => {
    const location = event.target.value;
    const filterObj = {
      mealtype: Number(mealtype),
      cuisine: cuisine.length == 0 ? undefined : cuisine,
      location,
      lcost,
      hcost,
      sort,
      page,
    };

    axios({
      method: "POST",
      url: "http://100.25.134.2:4567/filter",
      headers: { "Content-Type": "application/json" },
      data: filterObj,
    })
      .then((response) => {
        setRestaurants(response.data.restaurants);
        setLocation(location);
        setPageCount(response.data.pageCount);
      })
      .catch();
  };
  const handlePageChange = (page) => {
    const filterObj = {
      mealtype: Number(mealtype),
      cuisine: cuisine.length == 0 ? undefined : cuisine,
      location,
      lcost,
      hcost,
      sort,
      page,
    };

    axios({
      method: "POST",
      url: "http://100.25.134.2:4567/filter",
      headers: { "Content-Type": "application/json" },
      data: filterObj,
    })
      .then((response) => {
        setRestaurants(response.data.restaurants);
        setPage(page);
        setPageCount(response.data.pageCount);
      })
      .catch();
  };

  const handleCuisineChange = (cuisineId) => {
    const index = cuisine.indexOf(cuisineId);

    if (index == -1) {
      cuisine.push(cuisineId);
    } else {
      cuisine.splice(index, 1);
    }

    const filterObj = {
      mealtype: Number(mealtype),
      cuisine: cuisine.length == 0 ? undefined : cuisine,
      location,
      lcost,
      hcost,
      sort,
      page,
    };

    axios({
      method: "POST",
      url: "http://100.25.134.2:4567/filter",
      headers: { "Content-Type": "application/json" },
      data: filterObj,
    })
      .then((response) => {
        setRestaurants(response.data.restaurants);
        setCuisine(cuisine);
        setPageCount(response.data.pageCount);
      })
      .catch();
  };
  const handleNavigate = (resId) => {
    props.history.push(`/details?restaurant=${resId}`);
  };

  return (
    <div>
      <div>
        <div id="myId" className="heading">
          Breakfast Places in Mumbai
        </div>

        <div className="container-fluid">
          <div className="row">
            <div className="col-sm-4 col-md-4 col-lg-4 filter-options">
              <div className="filter-heading">Filters / Sort</div>
              <span
                className="glyphicon glyphicon-chevron-down toggle-span"
                data-toggle="collapse"
                data-target="#filter"
              ></span>
              <div id="filter" className="collapse show">
                <div className="Select-Location">Select Location</div>
                <select
                  className="Rectangle-2236"
                  onChange={handleLocationChange}
                >
                  <option value="0">Select</option>
                  {locations.map((item) => {
                    return (
                      <option
                        value={item.location_id}
                      >{`${item.name}, ${item.city}`}</option>
                    );
                  })}
                </select>
                <div className="Cuisine">Cuisine</div>
                <div>
                  <input
                    type="checkbox"
                    onChange={() => handleCuisineChange(1)}
                  />
                  <span className="checkbox-items">North Indian</span>
                </div>
                <div style={{ display: "block" }}>
                  <input
                    type="checkbox"
                    onChange={() => handleCuisineChange(2)}
                  />
                  <span className="checkbox-items">South Indian</span>
                </div>
                <div>
                  <input
                    type="checkbox"
                    onChange={() => handleCuisineChange(3)}
                  />
                  <span className="checkbox-items">Chineese</span>
                </div>
                <div>
                  <input
                    type="checkbox"
                    onChange={() => handleCuisineChange(4)}
                  />
                  <span className="checkbox-items">Fast Food</span>
                </div>
                {/* <div>
                                        <input type="checkbox" onChange={() => this.handleCuisineChange(5)} />
                                        <span className="checkbox-items">Street Food</span>
                                    </div> */}
                <div className="Cuisine">Cost For Two</div>
                <div>
                  <input
                    type="radio"
                    name="cost"
                    onChange={() => handleCostChange(1, 500)}
                  />
                  <span className="checkbox-items">Less than &#8377; 500</span>
                </div>
                <div>
                  <input
                    type="radio"
                    name="cost"
                    onChange={() => handleCostChange(500, 1000)}
                  />
                  <span className="checkbox-items">
                    &#8377; 500 to &#8377; 1000
                  </span>
                </div>
                <div>
                  <input
                    type="radio"
                    name="cost"
                    onChange={() => handleCostChange(1000, 1500)}
                  />
                  <span className="checkbox-items">
                    &#8377; 1000 to &#8377; 1500
                  </span>
                </div>
                <div>
                  <input
                    type="radio"
                    name="cost"
                    onChange={() => handleCostChange(1500, 2000)}
                  />
                  <span className="checkbox-items">
                    &#8377; 1500 to &#8377; 2000
                  </span>
                </div>
                <div>
                  <input
                    type="radio"
                    name="cost"
                    onChange={() => handleCostChange(2000, 50000)}
                  />
                  <span className="checkbox-items">&#8377; 2000 +</span>
                </div>
                <div className="Cuisine">Sort</div>
                <div>
                  <input
                    type="radio"
                    name="sort"
                    onChange={() => handleSortChange(1)}
                  />
                  <span className="checkbox-items">Price low to high</span>
                </div>
                <div>
                  <input
                    type="radio"
                    name="sort"
                    onChange={() => handleSortChange(-1)}
                  />
                  <span className="checkbox-items">Price high to low</span>
                </div>
              </div>
            </div>
            <div className="col-sm-8 col-md-8 col-lg-8">
              {restaurants.length > 0 ? (
                restaurants.map((item) => {
                  return (
                    <div
                      className="Item"
                      onClick={() => handleNavigate(item._id)}
                    >
                      <div>
                        <div className="small-item vertical">
                          <img className="img" src={`./${item.image}`} />
                        </div>
                        <div className="big-item">
                          <div className="rest-name">{item.name}</div>
                          <div className="rest-location">{item.locality}</div>
                          <div className="rest-address">{item.city}</div>
                        </div>
                      </div>
                      <hr />
                      <div>
                        <div className="margin-left">
                          <div className="Bakery">
                            CUISINES :{" "}
                            {item.cuisine.map((cuisineItem) => {
                              return `${cuisineItem.name}, `;
                            })}
                          </div>
                          <div className="Bakery">
                            COST FOR TWO : &#8377; {item.min_price}{" "}
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })
              ) : (
                <div className="no-records">No Records Found ...</div>
              )}

              {restaurants.length > 0 ? (
                <div className="pagination">
                  <span className="page-num">&laquo;</span>
                  {pageCount.map((pageNo) => {
                    return (
                      <span
                        className="page-num"
                        onClick={() => handlePageChange(pageNo)}
                      >
                        {pageNo}
                      </span>
                    );
                  })}
                  <span className="page-num">&raquo;</span>
                </div>
              ) : null}
            </div>
          </div>
        </div>
      </div>
    </div> //test branch
  );
};

export default Filter;
