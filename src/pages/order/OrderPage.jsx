import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import "./OrderPage.css";

const OrderPage = () => {

  const [listOrder, setListOrder] = useState([]);
  useEffect(() => {
    const listUpdate = JSON.parse(localStorage.getItem("listPlaceOrder")) || [];
    setListOrder(listUpdate);

    // Event change to localStorage
    window.addEventListener("storage", () => {
      const listUpdate = JSON.parse(localStorage.getItem("listPlaceOrder")) || [];
      setListOrder(listUpdate);
    });

    // clean event
    return () => window.removeEventListener("storage", () => {});
  }, []);

  const userLogin = useSelector((state) => state.user.userEmail);
  const [placeOrder, setPlaceOrder] = useState([]);

     useEffect(() => {
    if (listOrder.length > 0) {
      const order = listOrder.filter((item) => {
        return item.email === userLogin;
      });

      setPlaceOrder(order);
    }
     }, [userLogin, listOrder]);
   
  const totalPricesOrdered = () => {
    let productPrice = 0;
    placeOrder.forEach((user) => {
      user.product.forEach((item) => {
        const price = parseInt(item.price) * parseInt(item.quantity);
        productPrice += price;
      });
    });
    return productPrice;
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
  return (
    <div className="order_cp">
      {placeOrder && placeOrder.length > 0 ? (
        <div className="order_cp-content">
              <h3>Ordered</h3>
              
              <div className="order_cp-order">
            {placeOrder.map((user) => {
              return user.product.map((item, index) => {
                return (
                  <div className="order_cp-order-item" key={index}>
                    <span className="order_cp-order-item-name">
                      {item.name}:
                    </span>
                    <span className="order_cp-order-item-price">
                      {formatPrice(item.price)}
                      <span className="order_cp-order-item-price-value ">
                        VND x {item.quantity}
                      </span>
                    </span>
                  </div>
                );
              });
            })}
          </div>

          <div className="order_cp-total">
            <span className="order_cp-total-title">total</span>
            <span className="order_cp-total-price">
              {formatPrice(totalPricesOrdered())} VND
            </span>
          </div>
        </div>
      ) : (
        <p>Khong tim thay order</p>
      )}
    </div>
  );
};

export default OrderPage;
