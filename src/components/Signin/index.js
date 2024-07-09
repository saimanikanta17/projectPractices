import { useState } from "react";
import { FaEyeSlash, FaEye } from "react-icons/fa";

import "./index.css";

const Signin = () => {
  const [userName, userNameInput] = useState("");
  const [userPassword, userPasswordInput] = useState("");
  const [showPassword, hidePassword] = useState("");


  const onchangeUsername = (event) => userNameInput(event.target.value);
  const onchangePassword = (event) => userPasswordInput(event.target.value);
  const hideShowPassword = () => hidePassword()

  console.log(userPassword);
  return (
    <div className="bg-container">
      <div className="sign-form">
        <h1 className="logo">MSK Inventory</h1>

        <label>
          <p>User Name</p>
          <input
            type="text"
            className="input-field input-border"
            value={userName}
            placeholder="Enter user name"
            onChange={onchangeUsername}
          />
        </label>
        <label>
          <p>Password</p>
          <div className="input-container input-border">
            <input
              type="Password"
              className="input-field"
              alue={userPassword}
              placeholder="Enter password"
              onChange={onchangePassword}
            />
            <button className="hide-button" onClick={hideShowPassword}>
              <FaEyeSlash />
              <FaEye />
            </button>
          </div>
        </label>
        <button className="sign-in-btn">Signin</button>
      </div>
    </div>
  );
};
export default Signin;
