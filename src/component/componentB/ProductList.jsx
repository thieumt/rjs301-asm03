import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./ProductList.css";

const ProductList = ({ dataListImg }) => {
  const [listProduct, setListProduct]=useState([])
  // change page
  const navigate = useNavigate();
  const navigateTo = (path) => {
    navigate(path);
  };

  useEffect(() => {
    setListProduct(dataListImg)
  },[dataListImg])

  //format price
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
    <div className="shop_productlist-app">
      <div className="productlist">
        {
          listProduct.length > 0 ?
          listProduct.map((img) => (
          <div className="productlist-item" key={img._id.$oid}>
            <img
              className="productlist-img"
              id={img._id.$oid}
              src={img.img1}
              alt={img.name}
              onClick={() => navigateTo(`/detail/${img._id.$oid}`)}
            />
            <h4 className="product-name" onClick={() => navigateTo(`/detail/${img._id.$oid}`)}>{img.name}</h4>
            <h5 className="product-price">{formatPrice(img.price)} VND</h5>
          </div>
        )) : <p>Khong tin thay du lieu</p>}
      </div>
    </div>
  );
};

export default React.memo(ProductList);
