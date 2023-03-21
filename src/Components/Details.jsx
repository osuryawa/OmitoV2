import React, { useState, useEffect } from "react";
import queryString from "query-string";
import "../Styles/details.css";
import Modal from "react-modal";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from "react-responsive-carousel";
import { connect } from "react-redux";
import { fetchRestaurants } from "../Container/Actions/details";
import { fetchMenuItems } from "../Container/Actions/menuItems";

const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
    backgroundColor: "antiquewhite",
    border: "1px solid brown",
  },
};

function Details({
  isMenuItemsModalIsOpen,
  fetchMenuItemsCall,
  fetchRestaurantsCall,
  location,
  isRestaurantLoading,
  restaurantsData,
  isRestaurantError,
  isMenuItemsLoading,
  menuItemsData,
  isMenuItemsError,
}) {
  const [restId, setRestId] = useState(undefined);
  const [menuItems, setMenuItems] = useState([]);
  const [menuItemsModalIsOpen, setMenuItemsModalIsOpen] = useState(false);
  const [galleryModalIsOpen, setGalleryModalIsOpen] = useState(false);
  const [formModalIsOpen, setFormModalIsOpen] = useState(false);
  const [subTotal, setSubTotal] = useState(0);
  const [name, setName] = useState(undefined);
  const [contactNumber, setContactNumber] = useState(undefined);
  const [email, setEmail] = useState(undefined);
  const [address, setAddress] = useState(undefined);

  useEffect(() => {
    const qs = queryString.parse(location.search);
    const { restaurant } = qs;
    setRestId(restaurant);
    fetchRestaurantsCall(restaurant);
  }, []);

  useEffect(() => {
    isMenuItemsModalIsOpen && setMenuItemsModalIsOpen(true);
    console.log("isMenuItemsModalIsOpen", isMenuItemsModalIsOpen);
  }, [isMenuItemsModalIsOpen]);

  useEffect(() => {
    menuItems.length && setMenuItems(menuItemsData);
  }, [menuItemsData]);

  const handleOrder = () => {
    fetchMenuItemsCall(restId);
  };

  const addItems = (index, operationType) => {
    let total = 0;
    // Spread Operator - Copy of Reference Types
    const items = [...menuItemsData];
    const item = items[index];

    if (operationType === "add") {
      item.qty++;
    } else {
      item.qty--;
    }
    items[index] = item;
    items.map((item) => {
      total += item.qty * item.price;
    });
    setMenuItems(items);
    setSubTotal(total);
    // this.setState({ menuItems: items, subTotal: total });
  };

  const isDate = (val) => {
    // Cross realm comptatible
    return Object.prototype.toString.call(val) === "[object Date]";
  };

  const isObj = (val) => {
    return typeof val === "object";
  };

  const stringifyValue = (val) => {
    if (isObj(val) && !isDate(val)) {
      return JSON.stringify(val);
    } else {
      return val;
    }
  };

  const buildForm = ({ action, params }) => {
    const form = document.createElement("form");
    form.setAttribute("method", "post");
    form.setAttribute("action", action);

    Object.keys(params).forEach((key) => {
      const input = document.createElement("input");
      input.setAttribute("type", "hidden");
      input.setAttribute("name", key);
      input.setAttribute("value", stringifyValue(params[key]));
      form.appendChild(input);
    });
    return form;
  };

  const post = (details) => {
    const form = buildForm(details);
    document.body.appendChild(form);
    form.submit();
    form.remove();
  };

  const getData = (data) => {
    return fetch(`http://100.25.134.2:4567/payment`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((response) => response.json())
      .catch((err) => console.log(err));
  };

  const handlePayment = (event) => {
    if (!email) {
      alert("Please fill this field and then Proceed...");
    } else {
      // Payment API Call
      const paymentObj = {
        amount: subTotal,
        email: email,
      };

      getData(paymentObj).then((response) => {
        var information = {
          action: "https://securegw-stage.paytm.in/order/process",
          params: response,
        };
        post(information);
      });
    }
    event.preventDefault();
  };

  return (
    <div>
      <div>
        <img
          src={`./${
            restaurantsData.restaurant && restaurantsData.restaurant.image
          }`}
          alt="Sorry for the Inconvinience"
          width="100%"
          height="300px"
        />
        <button className="button" onClick={() => setGalleryModalIsOpen(true)}>
          Click to see Image Gallery
        </button>
      </div>
      <div className="heading">
        {restaurantsData.restaurant && restaurantsData.restaurant.name}
      </div>
      <button className="btn-order" onClick={() => handleOrder()}>
        Place Online Order
      </button>

      <div className="tabs">
        <div className="tab">
          <input
            type="radio"
            id="tab-1"
            name="tab-group-1"
            defaultChecked /*checked*/
          />
          <label htmlFor="tab-1">Overview</label>

          <div className="content">
            <div className="about">About this place</div>
            <div className="head">Cuisine</div>
            <div className="value">
              {restaurantsData.restaurant &&
                restaurantsData.restaurant.cuisine &&
                restaurantsData.restaurant.cuisine.map((item) => {
                  return `${item.name}, `;
                })}{" "}
            </div>
            <div className="head">Average Cost</div>
            <div className="value">
              &#8377;{" "}
              {restaurantsData.restaurant &&
                restaurantsData.restaurant.min_price}{" "}
              for two people(approx)
            </div>
          </div>
        </div>

        <div className="tab">
          <input type="radio" id="tab-2" name="tab-group-1" />
          <label htmlFor="tab-2">Contact</label>

          <div className="content">
            <div className="head">Phone Number</div>
            <div className="value">
              {restaurantsData.restaurant &&
                restaurantsData.restaurant.contact_number}
            </div>
            <div className="head">Address</div>
            <div className="value">{`${
              restaurantsData.restaurant && restaurantsData.restaurant.locality
            }, ${
              restaurantsData.restaurant && restaurantsData.restaurant.city
            }`}</div>
          </div>
        </div>
      </div>

      <Modal isOpen={menuItemsModalIsOpen} style={customStyles}>
        <div>
          <div
            className="glyphicon glyphicon-remove"
            style={{ float: "right", marginBottom: "10px" }}
            onClick={() => setMenuItemsModalIsOpen(false)}
          ></div>
          <div>
            <h3 className="restaurant-name">
              {restaurantsData.restaurant && restaurantsData.restaurant.name}
            </h3>
            <h3 className="item-total">SubTotal : {subTotal}</h3>
            <button
              className="btn btn-danger order-button"
              onClick={() => {
                setMenuItemsModalIsOpen(false);
                setFormModalIsOpen(true);
              }}
            >
              {" "}
              Pay Now
            </button>
            {menuItemsData.length &&
              menuItemsData.map((item, index) => {
                return (
                  <div
                    key={index}
                    style={{
                      width: "44rem",
                      marginTop: "10px",
                      marginBottom: "10px",
                      borderBottom: "2px solid #dbd8d8",
                    }}
                  >
                    <div
                      className="card"
                      style={{ width: "43rem", margin: "auto" }}
                    >
                      <div
                        className="row"
                        style={{ paddingLeft: "10px", paddingBottom: "10px" }}
                      >
                        <div
                          className="col-xs-9 col-sm-9 col-md-9 col-lg-9 "
                          style={{ paddingLeft: "10px", paddingBottom: "10px" }}
                        >
                          <span className="card-body">
                            <h5 className="item-name">{item.name}</h5>
                            <h5 className="item-price">&#8377;{item.price}</h5>
                            <p className="item-descp">{item.description}</p>
                          </span>
                        </div>
                        <div className="col-xs-3 col-sm-3 col-md-3 col-lg-3">
                          <img
                            className="card-img-center title-img"
                            alt=""
                            src={`../${item.image}`}
                            style={{
                              height: "75px",
                              width: "75px",
                              borderRadius: "20px",
                              marginTop: "12px",
                              marginLeft: "3px",
                            }}
                          />
                          {item.qty === 0 ? (
                            <div>
                              <button
                                className="add-button"
                                onClick={() => addItems(index, "add")}
                              >
                                Add
                              </button>
                            </div>
                          ) : (
                            <div className="add-number">
                              <button
                                onClick={() => addItems(index, "subtract")}
                              >
                                -
                              </button>
                              <span className="qty">{item.qty}</span>
                              <button onClick={() => addItems(index, "add")}>
                                +
                              </button>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            <div
              className="card"
              style={{
                width: "44rem",
                marginTop: "10px",
                marginBottom: "10px",
                margin: "auto",
              }}
            ></div>
          </div>
        </div>
      </Modal>

      <Modal isOpen={galleryModalIsOpen} style={customStyles}>
        <div>
          <div
            className="glyphicon glyphicon-remove"
            style={{ float: "right", marginBottom: "10px" }}
            onClick={() => setGalleryModalIsOpen(false)}
          ></div>
          <Carousel showThumbs={false} showIndicators={false}>
            {restaurantsData.restaurant &&
              restaurantsData.restaurant.thumb &&
              restaurantsData.restaurant.thumb.map((item, index) => {
                return (
                  <div key={index}>
                    <img
                      alt=""
                      src={`./${item}`}
                      style={{ width: "70%", height: "70%" }}
                    />
                  </div>
                );
              })}
          </Carousel>
        </div>
      </Modal>

      <Modal isOpen={formModalIsOpen} style={customStyles}>
        <div>
          <div
            className="glyphicon glyphicon-remove"
            style={{ float: "right", marginBottom: "10px" }}
            onClick={() => setFormModalIsOpen(false)}
          ></div>
          <form>
            <label className="form-label">Name</label>
            <input
              style={{ width: "370px" }}
              type="text"
              className="form-control"
              onChange={(event) => setName(event.target.value)}
            />
            <label className="form-label">Email</label>
            <input
              type="text"
              className="form-control"
              onChange={(event) => setEmail(event.target.value)}
            />
            <label className="form-label">Contact Number</label>
            <input
              type="text"
              className="form-control"
              onChange={(event) => setContactNumber(event.target.value)}
            />
            <label className="form-label">Address</label>
            <input
              type="text"
              className="form-control"
              onChange={(event) => setAddress(event.target.value)}
            />
            <button
              className="btn btn-danger"
              style={{ marginTop: "20px", float: "right" }}
              onClick={handlePayment}
            >
              Proceed
            </button>
          </form>
        </div>
      </Modal>
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    isRestaurantLoading: state.restaurantsDetails.loading,
    restaurantsData: state.restaurantsDetails.restaurants,
    isRestaurantError: state.restaurantsDetails.error,
    isMenuItemsLoading: state.menuItems.loading,
    menuItemsData: state.menuItems.menuItems,
    isMenuItemsError: state.menuItems.error,
    isMenuItemsModalIsOpen: state.menuItems.menuItemsModalIsOpen,
  };
};

const mapsDispatchToProps = (dispatch) => {
  return {
    fetchRestaurantsCall: (restaurants) =>
      dispatch(fetchRestaurants(restaurants)),
    fetchMenuItemsCall: (restId) => dispatch(fetchMenuItems(restId)),
  };
};

export default connect(mapStateToProps, mapsDispatchToProps)(Details);
