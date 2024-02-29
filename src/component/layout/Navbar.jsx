import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

import { logoutUser, setUser } from "../../store/store";
import {
  faCartShopping,
  faUser,
  faCaretDown,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "./Navbar.css";

const Navbar = () => {
  // state
  const dispatch = useDispatch();
  const { userName, isLoggedIn } = useSelector((state) => state.user);


  //   check localstorage
  useEffect(() => {
    const userLogin = localStorage.getItem("userLogin");
    const emailLogin = localStorage.getItem("emailLogin")
    if (typeof userLogin === "string" && userLogin.length > 1) {
      const user = {
        name: JSON.parse(userLogin),
        email: JSON.parse(emailLogin)
      }


      dispatch(setUser(user));
    }
  }, [userName, dispatch]);

  // change page
  const navigate = useNavigate();
  const navigateTo = (path) => {
    navigate(path);
  };

  // handle logout
  const handleLogout = () => {
    dispatch(logoutUser());
    localStorage.removeItem("userLogin");
    localStorage.removeItem("emailLogin");
    navigateTo("/");
  };
  // handle click user
  const clickAvatar = () => {
    navigate('/order')
  };

  return (
    <div className="nav-app">
      <div className="nav-home">
        <button
          type="button"
          className="btn nav-btn-home"
          onClick={() => navigateTo("/")}
        >
          Home
        </button>
        <button
          type="button"
          className="btn "
          onClick={() => navigateTo("/shop")}
        >
          Shop
        </button>
      </div>
      <div className="nav-boutique">
        <button type="button" className="btn">
          BOUTIQUE
        </button>
      </div>
      <div className="nav-login">
        <button
          type="button"
          className="btn "
          onClick={() => navigateTo("/cart")}
        >
          <FontAwesomeIcon icon={faCartShopping} />
          Cart
        </button>

        {isLoggedIn ? (
          <button type="button" className="btn " onClick={clickAvatar}>
            <FontAwesomeIcon icon={faUser} />

            <span className="nav-user-loggined">{userName}</span>

            <FontAwesomeIcon icon={faCaretDown} />
          </button>
        ) : (
          ""
        )}

        {isLoggedIn ? (
          <button type="button" className="btn" onClick={handleLogout}>
            ( Logout )
          </button>
        ) : (
          <button
            type="button"
            className="btn "
            onClick={() => navigateTo("/login")}
          >
            <FontAwesomeIcon icon={faUser} />
            Login
          </button>
        )}
      </div>
    </div>
  );
};

export default React.memo(Navbar);
