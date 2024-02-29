import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

import "./RegisterPage.css";

const RegisterPage = () => {
  // change page
  const navigate = useNavigate();
  const navigateTo = (path) => {
    navigate(path);
  };
  // state
  const [formData, setformData] = useState({
    username: "",
    email: "",
    phone: "",
    password: "",
    repassword: "",
  });

  const [errorInput, setErrorInput] = useState({
    username: "",
    email: "",
    phone: "",
    password: "",
    repassword: "",
  });

  let dataForm = [];
  let valid = false;
  const newErrors = { ...errorInput };
  const dataUsers = JSON.parse(localStorage.getItem("dataUsers")) || [];

  // Check key
  if (!dataUsers) {
    // create key
    localStorage.setItem("dataUsers", []);
  }
  // handle change input
  const handleChange = (e) => {
    const { name, value } = e.target;
    setformData((prevState) => ({ ...prevState, [name]: value }));
    if (name && value) {
      for (const key in newErrors) {
        if (key === name) {
          newErrors[key] = "";
        }
      }
      
      setErrorInput(newErrors);
      
    }
  };

  //  change submit
  const handleSubmit = (e) => {
    e.preventDefault();
    // handle valid input
    const validateData = () => {
      if (dataUsers.length > 0) {
        dataForm = [...dataUsers];
      }

      if (formData.username === "") {
        valid = true;
        newErrors.username = "Vui lòng nhập UserName của bạn";
      } else {
        newErrors.username = "";
      }
      if (formData.email === "") {
        valid = true;
        newErrors.email = "Vui lòng nhập Email của bạn";
      } else {
        newErrors.email = "";
      }

      if (formData.password === "") {
        valid = true;
        newErrors.password = "Vui lòng nhập Password của bạn";
      } else if (formData.password.length <= 8) {
        valid = true;
        newErrors.password = "Password phải có ít nhất 8 ký tự";
        setformData({
          ...formData,
          password: "",
          repassword: "",
        });
      } else {
        newErrors.password = "";
      }
      if (formData.repassword === "") {
        valid = true;
        newErrors.repassword = "Vui lòng nhập Re-password của bạn";
      } else if (formData.password !== formData.repassword) {
        valid = true;
        newErrors.repassword = "Re-password và Password phải giống nhau";
        setformData({
          ...formData,
          password: "",
          repassword: "",
        });
      } else {
        newErrors.repassword = "";
      }
      if (formData.phone === "") {
        valid = true;
        newErrors.phone = "Vui lòng nhập Phone của bạn";
      } else {
        newErrors.phone = "";
      }

      // check localstorage
      if (dataForm.find((item) => item.username === formData.username)) {
        newErrors.username = "UserName da ton tai";
        valid = true;
      } else if (dataForm.find((item) => item.email === formData.email)) {
        newErrors.username = "Email da duoc su dung";
        valid = true;
      }

      if (valid) {
        return false;
      } else {
        return true;
      }
    };

    const isValid = validateData(formData);
    // check form input
    if (isValid) {
      dataForm.push(formData);
      localStorage.setItem("dataUsers", JSON.stringify(dataForm));
      setformData({
        username: "",
        email: "",
        phone: "",
        password: "",
        repassword: "",
      });
      valid = false;
      alert("Thanh cong")
      navigateTo("/login");
    } else {
      setErrorInput(newErrors);
    }
  };

  return (
    <div className="register-app">
      <div className="register-form">
        <div className="register-form-view">
          <h2 className="regis-title">Sign Up</h2>
          <form onSubmit={handleSubmit}>
            <input
              className="regis-input regis_form-name"
              type="text"
              name="username"
              placeholder="Full Name"
              onChange={handleChange}
              value={formData.username}
            />
            {errorInput.username && (
              <span className="form-error">{errorInput.username}</span>
            )}
            <input
              className="regis-input regis_form-email"
              type="email"
              name="email"
              placeholder="Email"
              onChange={handleChange}
              value={formData.email}
            />
            {!errorInput.username && errorInput.email && (
              <span className="form-error">{errorInput.email}</span>
            )}
            <input
              className="regis-input regis_form-password"
              type="password"
              name="password"
              placeholder="Password"
              onChange={handleChange}
              value={formData.password}
            />
            {!errorInput.username && !errorInput.email && errorInput.password && (
              <span className="form-error">{errorInput.password}</span>
            )}
            <input
              className="regis-input regis_form-re-password"
              type="password"
              name="repassword"
              placeholder="Re-Password"
              onChange={handleChange}
              value={formData.repassword}
            />
            {!errorInput.username && !errorInput.email && !errorInput.password && errorInput.repassword && (
              <span className="form-error">{errorInput.repassword}</span>
            )}
            <input
              className="regis-input regis_form-phone"
              type="tel"
              name="phone"
              placeholder="Phone"
              onChange={handleChange}
              value={formData.phone}
            />
            {!errorInput.username && !errorInput.email && !errorInput.password && !errorInput.repassword && errorInput.phone && (
              <span className="form-error">{errorInput.phone}</span>
            )}

            <button type="submit" className="regis-btn regis-btn-sign">
              SIGN UP
            </button>
          </form>

          <div>
            <button
              type="button"
              className="regis-btn regis-btn-login"
              onClick={() => navigateTo("/login")}
            >
              login?
            </button>
            <button
              type="button"
              className="regis-btn regis-btn-click"
              onClick={() => console.log("clickForGet")}
            >
              Click
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;
