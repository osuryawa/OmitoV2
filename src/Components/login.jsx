// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import { constants } from "../constants";

// function Login({
//   isLoggedIn,
//   setIsLoggedIn,
//   email,
//   setEmail,
//   setLoginPageIsOpen,
// }) {
//   const [password, setPassword] = useState("");
//   const [error, setError] = useState("");

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       const response = await axios.post(`${constants.hosts.localhost}/login`, {
//         email,
//         password,
//       });
//       if (response.data) {
//         if (response.data.isAuthenticated) {
//           setIsLoggedIn(true);
//         }
//       }
//     } catch (error) {
//       setError(error.response.data.message);
//     }
//   };
//   useEffect(() => {
//     if (isLoggedIn) {
//       setLoginPageIsOpen(false);
//     }
//   }, [isLoggedIn]);

//   return (
//     <form className="form-container" onSubmit={handleSubmit}>
//       <div>
//         <label htmlFor="username">Username or Email</label>
//         <input
//           type="text"
//           id="username"
//           value={email}
//           onChange={(e) => setEmail(e.target.value)}
//         />
//       </div>
//       <div>
//         <label htmlFor="password">Password</label>
//         <input
//           type="password"
//           id="password"
//           value={password}
//           onChange={(e) => setPassword(e.target.value)}
//         />
//       </div>
//       {error && <div className="error-message">{error}</div>}
//       <button type="submit">Login</button>
//     </form>
//   );
// }

// export default Login;

import React, { useEffect, useState } from "react";
import axios from "axios";
import { constants } from "../constants";

function Login({
  isLoggedIn,
  setIsLoggedIn,
  email,
  setEmail,
  setLoginPageIsOpen,
}) {
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`${constants.hosts.localhost}/login`, {
        email,
        password,
      });
      if (response.data && response.data.isAuthenticated) {
        setIsLoggedIn(true);
      }
    } catch (error) {
      setError(error.response.data.message);
    }
  };

  useEffect(() => {
    if (isLoggedIn) {
      setLoginPageIsOpen(false);
    }
  }, [isLoggedIn]);

  return (
    <form className="form-container" onSubmit={handleSubmit}>
      <div className="form-group">
        <label htmlFor="username">Username or Email</label>
        <input
          type="text"
          id="username"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>
      <div className="form-group">
        <label htmlFor="password">Password</label>
        <input
          type="password"
          id="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>
      {error && <div className="error-message">{error}</div>}
      <button type="submit">Login</button>
    </form>
  );
}

export default Login;

