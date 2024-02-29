import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setUser } from "../../store/store";

import "./LoginPage.css";

const LoginPage = () => {
  // change page
  const navigate = useNavigate();
  const navigateTo = (path) => {
    navigate(path);
  };
  // state
  const [formData, setformData] = useState({
    email: "",
    password: "",
  });
  const [errorInput, setErrorInput] = useState({
    email: "",
    password: "",
  });
  const newErrors = { ...errorInput };

  // handle change input form
  const handleChange = (e) => {
    const { name, value } = e.target;
    setformData((prevState) => ({ ...prevState, [name]: value }));
    if (name && value) {
      for (const prop in newErrors) {
        if (prop === name) {
          newErrors[prop] = "";
        }
      }

      setErrorInput(newErrors);
    }
  };

  const dispatch = useDispatch();
  // handle login
  const handleLogin = () => {
    const userLogin = JSON.parse(localStorage.getItem("userLogin")) || "";

    const userName = {
      name: userLogin,
      email: formData.email,
    };

    dispatch(setUser(userName));
    navigateTo("/");
  };

  // handle submit
  const handleSubmit = (e) => {
    e.preventDefault();

    let user = "";
    let valid = false;
    let check = false;

    const dataUsers = JSON.parse(localStorage.getItem("dataUsers")) || [];
    // handle valid input
    const validateData = () => {
      if (formData.email === "") {
        newErrors.email = "Vui lòng nhập Email của bạn";
        valid = true;
      } else {
        newErrors.email = "";
      }

      if (formData.password === "") {
        newErrors.password = "Vui lòng nhập Password của bạn";
        valid = true;
      } else {
        newErrors.password = "";
      }

      if (formData.password !== "" && formData.email !== "") {
        const inputEmail = dataUsers.find(
          (item) => item.email === formData.email
        );

        if (inputEmail === undefined) {
          valid = true;
          newErrors.email = "Email không đúng";
        } else {
          newErrors.email = "";

          if (inputEmail.password !== formData.password) {
            newErrors.password = "Password không đúng";
            valid = true;
            check = false;
          } else {
            newErrors.password = "";
          }

          if (
            inputEmail.password === formData.password &&
            inputEmail.email === formData.email
          ) {
            check = true;
            user = inputEmail.username;
            newErrors.password = "";
            newErrors.email = "";
          }
        }
      }

      if (!valid && check) {
        return true;
      } else {
        return false;
      }
    };
    // check valid
    const isValid = validateData();
    if (isValid) {
      localStorage.setItem("userLogin", JSON.stringify(user));
      localStorage.setItem("emailLogin", JSON.stringify(formData.email));
      handleLogin();
      setformData({
        email: "",
        password: "",
      });
    } else {
      setErrorInput(newErrors);
    }
  };

  return (
    <div className="login-app">
      <div className="login-form">
        <div className="login-form-view">
          <h2 className="login-title">Login</h2>
          <form onSubmit={handleSubmit}>
            <input
              className="login-input login_form-email"
              type="email"
              name="email"
              placeholder="Email"
              onChange={handleChange}
              value={formData.email}
            />
            {errorInput.email && (
              <span className="form-error">{errorInput.email}</span>
            )}
            <input
              className="login-input login_form-password"
              type="password"
              name="password"
              placeholder="Password"
              onChange={handleChange}
              value={formData.password}
            />
            {!errorInput.email && errorInput.password && (
              <span className="form-error">{errorInput.password}</span>
            )}

            <button type="submit" className="login-btn-login">
              LOGIN
            </button>
          </form>

          <div>
            <button
              type="button"
              className="btn login-btn-sign"
              onClick={() => navigateTo("/register")}
            >
              Create an account
            </button>
            <button
              type="button"
              className="btn login-btn-sign login-btn-signup"
              onClick={() => navigateTo("/register")}
            >
              Sign Up?
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
