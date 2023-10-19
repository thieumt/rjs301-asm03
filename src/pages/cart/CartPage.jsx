import React, { useState, useEffect } from "react";

import {
  faCaretLeft,
  faCaretRight,
  faTrashCan,
  faLeftLong,
  faRightLong,
  faGift,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { deleteCart, updateQuantity, getInfo } from "../../store/store";

import "./CartPage.css";

const CartPage = () => {
  // change page
  const navigate = useNavigate();
  const navigateTo = (path) => {
    navigate(path);
  };

  // state
  const dispatch = useDispatch();
  const [listCart, setListCart] = useState([]);
  const userLogin = useSelector((state) => state.user.userName);

  // get cart in localstorage
  useEffect(() => {
    const listCartSave = localStorage.getItem("listCartSave") || [];

    if (listCartSave.length > 0) {
      const listCartProduct = JSON.parse(listCartSave);

      const filterCartUser = listCartProduct.filter((item) => {
        return item.username === userLogin;
      });
      setListCart(filterCartUser);
    }
  }, [userLogin]);

  // calc total price
  const totalPrices = () => {
    let productPrice = 0;
    listCart.forEach((product) => {
      const price = parseInt(product.price) * parseInt(product.quantity);
      productPrice = productPrice + price;
    });
    return productPrice;
  };

  // handle delete product
  const handleRemoveProduct = (idProduct, userName) => {
    let payload = {};
    payload.idProduct = idProduct;
    payload.userName = userName;

    dispatch(deleteCart(payload));
    const listCartSave = JSON.parse(localStorage.getItem("listCartSave"));
    setListCart(listCartSave);
  };

  // handle change quantity
  const handleQuantityChange = (idProduct, userName, num) => {
    let payload = {};
    payload.idProduct = idProduct;
    payload.userName = userName;
    payload.num = num;
    dispatch(updateQuantity(payload));
    const listCartSave = JSON.parse(localStorage.getItem("listCartSave"));
    setListCart(listCartSave);
  };
  // handle click proceed
  const handleClickProceed = () => {
    if (listCart.length === 0) {
      alert("Vui long chon san pham truoc");
    } else {
      dispatch(getInfo());
      navigateTo("/checkout");
    }
  };

  // format price
  const formatPrice = (prices) => {
    if (typeof prices !== "undefined" && prices !== null) {
      const formattedPrice = prices
        .toString()
        .replace(/\B(?=(\d{3})+(?!\d))/g, ".");
      return formattedPrice;
    }
    return "";
  };

  return (
    <div className="cart-app">
      <div className="cart_title">
        <h2>cart</h2>
        <h5 className="cart-title-cart">cart</h5>
      </div>
      <div className="cart_shopping">
        <h3 className="cart_shopping-title">shopping cart</h3>
        <div className="cart_table">
          <div className="cart_table-content">
            <div className="table-product">
              <table>
                <thead>
                  <tr>
                    <th>image</th>
                    <th>product</th>
                    <th>price</th>
                    <th>quantity</th>
                    <th>total</th>
                    <th>remove</th>
                  </tr>
                </thead>
                <tbody>
                  {listCart?.map((product) => {
                    return (
                      <tr key={`${product._id.$oid}`}>
                        <td className="cart-product-img">
                          <img
                            className="cart-product-img-select"
                            src={`${product.img1}`}
                            alt={`${product.name}`}
                            onClick={() =>
                              navigateTo(`/detail/${product._id.$oid}`)
                            }
                          />
                        </td>
                        <td className="cart-product-name">{product.name}</td>
                        <td className="cart-product-price">
                          {formatPrice(product.price)} VND
                        </td>

                        <td className="cart-product-quantity">
                          <span
                            className={`cart-product-quantity-minus ${
                              product.quantity === 1
                                ? "cart-product-quantity-minus1"
                                : ""
                            }`}
                            onClick={() => {
                              handleQuantityChange(
                                product._id.$oid,
                                product.username,
                                -1
                              );
                            }}
                          >
                            <FontAwesomeIcon icon={faCaretLeft} size="2x" />
                          </span>
                          <span className="cart-product-quantity-number">
                            {product.quantity}
                          </span>
                          <span
                            className="cart-product-quantity-plus"
                            onClick={() => {
                              handleQuantityChange(
                                product._id.$oid,
                                product.username,
                                1
                              );
                            }}
                          >
                            <FontAwesomeIcon icon={faCaretRight} size="2x" />
                          </span>
                        </td>

                        <td className="cart-product-total">
                          $
                          {formatPrice(
                            parseInt(product.price) * parseInt(product.quantity)
                          )}{" "}
                          VND
                        </td>
                        <td
                          className="cart-product-remove"
                          onClick={() => {
                            handleRemoveProduct(
                              product._id.$oid,
                              product.username
                            );
                            console.log(product._id.$oid, product.username, -1);
                          }}
                        >
                          <FontAwesomeIcon icon={faTrashCan} />
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
            <div className="cart-btn-other">
              <button
                className="cart-btn-view btn-view-continue"
                type="button"
                onClick={() => navigateTo("/shop")}
              >
                <FontAwesomeIcon icon={faLeftLong} />
                <span>Continue shopping</span>
              </button>
              <button
                className="cart-btn-view btn-view-proceed"
                type="button"
                onClick={handleClickProceed}
              >
                <span>Proceed to checkout</span>
                <FontAwesomeIcon icon={faRightLong} />
              </button>
            </div>
          </div>

          <div className="cart_total-product">
            <h4 className="title">cart total</h4>
            <div className="product-subtotal">
              <span className="title">subtotal</span>
              <span className="product-subtotal-total">
                {formatPrice(totalPrices())} VND
              </span>
            </div>
            <div className="cart-product-price">
              <span className="title">total</span>
              <span className="title product-price-total">
                {formatPrice(totalPrices())} VND
              </span>
            </div>
            <form action="">
              <input
                className="cart-product-form-input"
                type="text"
                placeholder="Enter your coupon"
              />
              <button className="cart-product-form-btn" type="button">
                <FontAwesomeIcon icon={faGift} />
                <span>Apply coupon</span>
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartPage;
