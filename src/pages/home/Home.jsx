import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import {
  showPopupAction,
  hidePopupAction,
} from "../../store/actions/PopupActions";
import { useNavigate } from "react-router-dom";
import axios from "axios";
// import LiveChat from "../../component/componentB/LiveChat";
import Popup from "../../component/componentB/PopupProduct.jsx";
import "./Home.css";

const Home = ({ isPopupState, showPopup, hidePopup }) => {
  // change page
  const nagigate = useNavigate();
  const navigateTo = (path) => {
    nagigate(path);
  };

  const [dataApi, setDataApi] = useState([]);
  const [dataImg, setDataImg] = useState({});
  // get data api
  useEffect(() => {
    const fetchApi = async () => {
      try {
        const response = await axios.get(
          `https://firebasestorage.googleapis.com/v0/b/funix-subtitle.appspot.com/o/Boutique_products.json?alt=media&token=dc67a5ea-e3e0-479e-9eaf-5e01bcd09c74`
        );
        if (response.status === 200) {
          const dataResultsEnd = await response.data.slice(0, 8);
          setDataApi(dataResultsEnd);
        }
      } catch (error) {
        if (error) throw error;
      }
    };

    fetchApi();
  }, []);
  // handle click img product
  const handleClickImg = (e) => {
    const infoImg = e.target.id;
    const filteredData = dataApi.filter((img) => img._id.$oid === infoImg);

    console.log(e)
    if (filteredData.length > 0) {
      setDataImg(filteredData[0]);
      if (!isPopupState) {
        showPopup();
      }
    }
  };
  // handle close popup
  const handleClosePopup = () => {
    hidePopup();
  };
  // format  price
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
    <div className="home-app">
      <div className="content">
        <div className="home-banner">
          <img
            className="banner-img"
            src={process.env.PUBLIC_URL + "/imgs/banner1.jpg"}
            alt=""
          />
          <div className="banner-slogan">
            <h4 className="slogan-title title-e ">new inspiration 2020</h4>
            <h2 className="slogan-title title-b ">20% off on new season</h2>
            <button
              className="slogan-btn btn"
              onClick={() => navigateTo("/shop")}
            >
              Browse collections
            </button>
          </div>
        </div>
        <div className="categories">
          <div className="categories-title">
            <h4 className="title-h4">carefully created collections</h4>
            <h2 className="title-h2">browse our categories</h2>
          </div>
          <div className="list-group-1">
            <div className="list-div" onClick={() => navigateTo("/shop")}>
              <img
                className="list-img"
                src={process.env.PUBLIC_URL + "/imgs/product_1.png"}
                alt="product_1.png"
              />
            </div>
            <div className="list-div" onClick={() => navigateTo("/shop")}>
              <img
                className="list-img"
                src={process.env.PUBLIC_URL + "/imgs/product_2.png"}
                alt="product_2.png"
              />
            </div>
          </div>
          <div className="list-group-2">
            <div className="list-div" onClick={() => navigateTo("/shop")}>
              <img
                className="list-img"
                src={process.env.PUBLIC_URL + "/imgs/product_3.png"}
                alt="product_3.png"
              />
            </div>
            <div className="list-div" onClick={() => navigateTo("/shop")}>
              <img
                className="list-img"
                src={process.env.PUBLIC_URL + "/imgs/product_4.png"}
                alt="product_4.png"
              />
            </div>
            <div className="list-div" onClick={() => navigateTo("/shop")}>
              <img
                className="list-img"
                src={process.env.PUBLIC_URL + "/imgs/product_5.png"}
                alt="product_5.png"
              />
            </div>
          </div>
        </div>

        <div className="products">
          <h4 className="product-title-4">make the hard way</h4>
          <h2 className="product-title-2">top trending propducts</h2>
          <div className="product">
            {dataApi.map((img) => (
              <div className="product-item" key={img._id.$oid}>
                <img
                  className="product-img"
                  id={img._id.$oid}
                  src={img.img1}
                  alt={img.name}
                  onClick={handleClickImg}
                />
                <h4 className="product-name" id={img._id.$oid} onClick={handleClickImg}>{img.name}</h4>
                <h5 className="product-price">{formatPrice(img.price)} VND</h5>
              </div>
            ))}
          </div>
        </div>

        <div className="info-other">
          <div className="other">
            <div className="other-div">
              <h2 className="title">freeshipping</h2>
              <span className="other-span">Free shipping worlwide</span>
            </div>
            <div className="other-div">
              <h2 className="title">24 x 7 service</h2>
              <span className="other-span">Free shipping worlwide</span>
            </div>
            <div className="other-div">
              <h2 className="title">festival offer</h2>
              <span className="other-span">Free shipping worlwide</span>
            </div>
          </div>
          <div className="other-form">
            <div className="other-title">
              <h2 className="title"> let's be friend!</h2>
              <h4 className="title-gray">
                Nisi Nisi tempor consequat laboris nisi
              </h4>
            </div>
            <div className="other-form">
              <form action="" className="form-email">
                <input
                  className="input-text"
                  type="text"
                  placeholder="Enter your email address"
                />
                <input className="input-btn" type="button" value="Subscribe" />
              </form>
            </div>
          </div>
        </div>
      </div>
      {isPopupState && (
        <Popup
          dataImg={dataImg}
          handleClosePopup={handleClosePopup}
          formatPrice={formatPrice}
        />
      )}
      {/* <LiveChat /> */}
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    isPopupState: state.popup.isPopupState,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    showPopup: () => dispatch(showPopupAction()),
    hidePopup: () => dispatch(hidePopupAction()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Home);
