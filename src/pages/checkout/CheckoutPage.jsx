import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

import "./CheckoutPage.css";

const CheckoutPage = () => {
  // state
  const [listCartUser, setListCartUser] = useState([]);
  const [infoUser, setInfoUser] = useState("");

  const [clickSubmit, setCLickSubmit] = useState(false);

  const userLogin = useSelector((state) => state.user.userName);
  const userProceed = useSelector((state) => state.checkout.infoUser);

  const listCartSave = JSON.parse(localStorage.getItem("listCartSave"));

  // change page
  const navigate = useNavigate();
  const navigateTo = (path) => {
    navigate(path);
  };
  // state
  const [formData, setFormData] = useState(() => {
    if (Object.keys(userProceed).length === 0) {
      return {
        name: "",
        email: "",
        phone: "",
        address: "",
      };
    } else {
      return {
        name: userProceed.username,
        email: userProceed.email,
        phone: userProceed.phone,
        address: "",
      };
    }
  });

  const [errorInput, setErrorInput] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    product: "",
  });

  // get data to localstorage
  useEffect(() => {
    const listCart = JSON.parse(localStorage.getItem("listCartSave")) || [];
    const userLogin = JSON.parse(localStorage.getItem("userLogin")) || "";
    const dataUsers = JSON.parse(localStorage.getItem("dataUsers")) || [];

    // get data
    const checkDataUser = (arr) => {
      const filterArr = arr.filter((item) => {
        return item.username === userLogin;
      });
      return filterArr;
    };

    const carts = checkDataUser(listCart);
;
    const user = dataUsers.find((item) => {
      return item.username === userLogin;
    });

    // state update
    setListCartUser(carts);
    setInfoUser(user);

  }, []);

  useEffect(() => {
    setTimeout(() => {


      setCLickSubmit(false);
    }, 1000);
  }, [clickSubmit, userLogin]);

  // hanlde time && date
  const timeDate = () => {
    const currentDate = new Date();

    const year = currentDate.getFullYear();
    const index = currentDate.getMonth();
    const monthIndex = [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ];

    const day = currentDate.getDate();
    const hours = currentDate.getHours();
    const minutes = currentDate.getMinutes();

    const results = {
      formattedDate: `${year}-${monthIndex[index]}-${day}`,
      formattedTime: `${hours}:${minutes}`,
    };
    return results;
  };

  // format price
  const formatPrice = (prices) => {
    if (typeof prices !== "undefined") {
      const formattedPrice = prices
        .toString()
        .replace(/\B(?=(\d{3})+(?!\d))/g, ".");
      return formattedPrice;
    }
    return "";
  };
  // calc total price
  const totalPrices = () => {
    let productPrice = 0;
    listCartUser.forEach((product) => {
      const price = parseInt(product.price) * parseInt(product.quantity);
      productPrice = productPrice + price;
    });
    return productPrice;
  };


  // state form data

  // display err
  const newErrors = { ...errorInput };
  // handle change input
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({ ...prevState, [name]: value }));
    if (value) {
      for (const key in newErrors) {
        if (key === name) {
          newErrors[key] = "";
          setErrorInput(newErrors);
        }
      }
    }
  };
  // check input form
  const validInput = () => {
    let valid = false;

    if (formData.name === "") {
      valid = true;
      newErrors.name = "Vui long nhap ten nguoi nhan hang";
    } else {
      if (formData.email === "") {
        valid = true;
        newErrors.email = "Vui long nhap email nhan hang";
      } else {
        if (!infoUser) {
          alert("Khong tim thay Email phu hop. Hay Dang nhap");
          valid = true;
        } else if (formData.phone === "") {
          valid = true;
          newErrors.phone = "Vui long nhap so dien thoai nhan hang";
        } else {
          if (formData.address === "") {
            valid = true;
            newErrors.address = "Vui long nhap dia chi nhan hang";
          } else {
            if (listCartUser.length === 0) {
              valid = true;
              newErrors.product = "Vui long chon san pham de thanh toan";
            }
          }
        }
      }
    }

    setErrorInput(newErrors);

    if (!valid) {
      return true;
    } else {
      return false;
    }
  };
  // handle submit
  const handleSubmit = (e) => {
    e.preventDefault();

    const isValid = validInput();

    if (isValid) {
      const timer = timeDate();
      const updateInfoUser = {
        name: infoUser.username,
        email: infoUser.email,
        phone: infoUser.phone,
        totalBill: totalPrices(),
        product: listCartUser,
        address: formData.address,
        date: timer.formattedDate,
        time: timer.formattedTime,
      };
      //get localstorage
      const listPlaceOrderData = JSON.parse(
        localStorage.getItem("listPlaceOrder")
      );

      // check data

      let listPlaceOrder = listPlaceOrderData ? listPlaceOrderData : [];

      if (listPlaceOrder.length === 0) {
        // not yet order
        listPlaceOrder.push(updateInfoUser);
        localStorage.setItem("listPlaceOrder", JSON.stringify(listPlaceOrder));
        setListCartUser([]);
      } else {
        listPlaceOrder.push(updateInfoUser);
        localStorage.setItem("listPlaceOrder", JSON.stringify(listPlaceOrder));
        setListCartUser([]);
      }
      // delete product in  cart
      handleClear();
      alert("Da dat hang thanh cong");
    } else {
      setErrorInput(newErrors);
    }
  };

  const handleClear = () => {
    const filterProduct = listCartSave.filter((item) => {
      return item.username !== userLogin;
    });
    localStorage.setItem("listCartSave", JSON.stringify(filterProduct));
    setListCartUser([]);

    setFormData({
      name: "",
      email: "",
      phone: "",
      address: "",
    });
  };

  return (
    <div className="checkout-app">
      <div className="checkout_logan">
        <h2 className="title">checkout</h2>
        <div className="checkout_logan-navbar">
          <button
            className="checkout_logan-navbar-btn"
            type="button"
            onClick={() => navigateTo("/")}
          >
            home <span>/</span>{" "}
          </button>
          <button
            className="checkout_logan-navbar-btn"
            type="button"
            onClick={() => navigateTo("/cart")}
          >
            cart <span>/</span>{" "}
          </button>
          <button className="checkout_logan-navbar-btn" type="button">
            <span>checkout</span>
          </button>
        </div>
      </div>
      <div className="checkout_billing">
        <div className="checkout_billing-form">
          <h3 className="title">billing details</h3>

          <form onSubmit={handleSubmit}>
            <label className="checkout_billing-form-label" htmlFor="fullname">
              Full name:
            </label>
            <input
              className="checkout_billing-form-input"
              type="text"
              name="name"
              placeholder="Enter Your Full Name Here!"
              onChange={handleChange}
              value={formData.name}
            />
            {errorInput.name && (
              <span className="checkout_billing-form-error">
                {errorInput.name}
              </span>
            )}
            <label className="checkout_billing-form-label" htmlFor="email">
              Email:
            </label>
            <input
              className="checkout_billing-form-input"
              type="email"
              name="email"
              placeholder="Enter Your Email Here!"
              onChange={handleChange}
              value={formData.email}
            />
            {errorInput.email && (
              <span className="checkout_billing-form-error">
                {errorInput.email}
              </span>
            )}
            <label className="checkout_billing-form-label" htmlFor="phone">
              Phone:
            </label>
            <input
              className="checkout_billing-form-input"
              type="tel"
              name="phone"
              placeholder="Enter Your Phone Number Here!"
              onChange={handleChange}
              value={formData.phone}
            />
            {errorInput.phone && (
              <span className="checkout_billing-form-error">
                {errorInput.phone}
              </span>
            )}
            <label className="checkout_billing-form-label" htmlFor="address">
              Address:
            </label>
            <input
              className="checkout_billing-form-input"
              type="text"
              name="address"
              placeholder="Enter Your Address Here!"
              onChange={handleChange}
              value={formData.address}
            />
            {errorInput.address && (
              <span className="checkout_billing-form-error">
                {errorInput.address}
              </span>
            )}
            <button
              type="submit"
              className="checkout_billing-form-btn"
              disabled={clickSubmit}
            >
              Place order
            </button>
            {errorInput.product && (
              <span className="checkout_billing-form-error">
                {errorInput.product}
              </span>
            )}
          </form>
        </div>
        <div className="checkout_billing-order">
          <h2 className="checkout_billing-order-title">your order</h2>

          <div className="checkout_billing-order-wait">
            <h3>New Order</h3>
            {listCartUser?.map((product, index) => {
              return (
                <div className="checkout_billing-order-wait-item" key={index}>
                  <span className="checkout_billing-order-wait-item-name">
                    {product.name}
                  </span>
                  <span className="checkout_billing-order-wait-item-price">
                    {formatPrice(product.price)}
                    <span className="checkout_billing-order-item-price">
                      VND x {product.quantity}
                    </span>
                  </span>
                </div>
              );
            })}
            <div className="checkout_billing-total">
              <span className="checkout_billing-total-title">total</span>
              <span className="checkout_billing-total-price">
                {formatPrice(totalPrices())} VND
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CheckoutPage;
