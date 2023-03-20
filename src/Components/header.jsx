import React from "react";
import "../Styles/header.css";
import { withRouter } from "react-router-dom";
import Modal from "react-modal";
import GoogleLogin from "react-google-login";
import { useState } from "react";
import Login from "./Login";
import SignUpForm from "./SignUp-form";
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

const Header = (props) => {
  const [loginModalIsOpen, setLoginModalIsOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userformISopen, setUserformISopen] = useState(false);

  const [email, setEmail] = useState(undefined);
  const [loginPageIsOpen, setLoginPageIsOpen] = useState(false);

  const handleLoginPage = (value) => {
    if (loginModalIsOpen) {
      handleLoginModal(false);
    }
    setLoginPageIsOpen(value);
  };

  const handleSignupPage = (value) => {
    setUserformISopen(value);
  };

  const handleNavigate = () => {
    props.history.push("/");
  };

  const handleLoginModal = (value) => {
    setLoginModalIsOpen(value);
  };

  const responseGoogle = (response) => {
    console.log(response, "omkar");
    handleLoginModal(false);
    setIsLoggedIn(true);
    setEmail(response.profileObj.name);
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setEmail(undefined);
  };

  return (
    <div>
      <div className="header">
        <div className="header-logo" onClick={() => handleNavigate()}>
          <p>e!</p>
        </div>
        {isLoggedIn ? (
          <div className="header-user">
            <div className="login">{email}</div>
            <div className="signup" onClick={() => handleLogout()}>
              Logout
            </div>
          </div>
        ) : (
          <div className="header-user">
            <div className="login" onClick={() => handleLoginModal(true)}>
              Login
            </div>
            <div className="signup" onClick={() => handleSignupPage(true)}>
              Create an account
            </div>
          </div>
        )}
      </div>
      <Modal
        isOpen={loginPageIsOpen}
        style={customStyles}
        onRequestClose={() => handleLoginPage(false)}
      >
        <Login
          isLoggedIn={isLoggedIn}
          setIsLoggedIn={setIsLoggedIn}
          email={email}
          setEmail={setEmail}
          setLoginPageIsOpen={setLoginPageIsOpen}
        />
        <button onClick={() => handleLoginPage(false)}>Close Modal</button>
      </Modal>
      <Modal
        isOpen={userformISopen}
        style={customStyles}
        onRequestClose={() => handleSignupPage(false)}
      >
        <SignUpForm
          isLoggedIn={isLoggedIn}
          setIsLoggedIn={setIsLoggedIn}
          setUserformISopen={setUserformISopen}
        />
        <button onClick={() => handleSignupPage(false)}>Close Modal</button>
      </Modal>
      <Modal isOpen={loginModalIsOpen} style={customStyles}>
        <div className="modal-class">
          <div class="modal-header">
            <button
              type="button"
              className="close close-btn"
              onClick={() => handleLoginModal(false)}
            >
              X
            </button>
          </div>
          <div class="modal-body">
            <button
              onClick={() => handleLoginPage(true)}
              className="btn btn-primary btn-1"
            >
              Login with Credentails
            </button>
            <div className="btn-1">
              <GoogleLogin
                clientId="1054161126566-gi7p8nv6hd30eeq50qcns58gpst4730a.apps.googleusercontent.com"
                buttonText="Continue with Gmail"
                onSuccess={responseGoogle}
                onFailure={responseGoogle}
                cookiePolicy={"single_host_origin"}
              />
            </div>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default withRouter(Header);
