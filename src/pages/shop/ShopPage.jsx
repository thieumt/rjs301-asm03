import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import axios from "axios";

import {
  faChevronLeft,
  faChevronRight,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "./ShopPage.css";

import {
  ListProductItem,
  ListProductAll,
} from "../../store/actions/ListProduct";

import ProductList from "../../component/componentB/ProductList";
import MenuShop from "../../component/componentB/MenuShop";

const ShopPage = ({ listitem, showItem, showItemAll }) => {
  const [dataApi, setDataApi] = useState([]);
  const [dataListImg, setDataListImg] = useState([]);
  const [category, setCategory] = useState("");

  //  get product to api
  useEffect(() => {
    const fetchApi = async () => {
      try {
        const response = await axios.get(
          `https://firebasestorage.googleapis.com/v0/b/funix-subtitle.appspot.com/o/Boutique_products.json?alt=media&token=dc67a5ea-e3e0-479e-9eaf-5e01bcd09c74`
        );

        if (response.status === 200) {
          const dataResults = response.data;

          // handle data
          const dataEnd = await dataResults.slice(0, 30);

          setDataApi(dataEnd);

          setDataListImg(dataEnd);
        }
      } catch (error) {
        if (error) throw error;
      }
    };

    fetchApi();
  }, []);
  // handle click item component
  const handleClickedItem = (e) => {
    const clickedItemNav = e.target.id;
    setCategory(e.target.id);

    if (clickedItemNav === "all") {
      setDataListImg(dataApi);
    } else {
      const filterDataItem = dataApi.filter(
        (product) => product.category === clickedItemNav
      );
      if (filterDataItem.length > 0) {
        setDataListImg(filterDataItem);
      } else {
        setDataListImg([]);
      }
    }
  };

  const handleChangeOption = (e) => {
    console.log('click', e.target.value)
    if (e.target.value === "default") {
      console.log(dataListImg)
      if (category) {
         const filterDataItem = dataListImg.filter(
        (product) => product.category === category
        );

      setDataListImg(filterDataItem);
      } else {
        setDataListImg(dataApi)
      }

    } else if (e.target.value === "high") {
      console.log(dataListImg)

      const sortProduct = dataListImg.sort((a, b) => {
        if (typeof a.price === "number" && typeof b.price === "number") {
          return parseFloat(b.price) - parseFloat(a.price);
        } else {
          return 1;
        }
      });
            console.log(sortProduct)

      setDataListImg(sortProduct);
    } else {

      const sortProduct = dataListImg.sort((a, b) => {
        if (typeof a.price === "number" && typeof b.price === "number") {
          return parseFloat(a.price) - parseFloat(b.price);
        } else {
          return 1;
        }
      });
      console.log(sortProduct)
      setDataListImg(sortProduct);
    }
  };

  return (
    <div className="shop-app">
      <div className="shop-container">
        <div className="shop-banner">
          <h1 className="banner-title">Shop</h1>
          <h5 className="banner-title-h5">Shop</h5>
        </div>
        <div className="shop-content">
          <MenuShop handleClickedItem={handleClickedItem} />

          <div className="products_form-categories">
            <div className="product-form">
              <input
                className="product-form-input"
                type="text"
                placeholder="Enter Search Here!"
              />
              <select
                className="product-form-select"
                onChange={handleChangeOption}
              >
                <option value="default">Default sorting</option>
                <option value="high">Price: High to Low</option>
                <option value="low">Price: Low to high</option>
              </select>
            </div>

            {dataListImg.length > 0 ? (
              <ProductList dataListImg={dataListImg} />
            ) : (
              <p>Khong tin thay du lieu</p>
            )}

            <div className="product-pages">
              <button type="button" className="product-pages-btn">
                <FontAwesomeIcon icon={faChevronLeft} />
              </button>
              <span>1</span>
              <button type="button" className="product-pages-btn">
                <FontAwesomeIcon icon={faChevronRight} />
              </button>
              <p>Show 1 to 9 of 9 results</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    ListProductItem: state.listitem.ListProductItem,
    ListProductAll: state.listitem.ListProductAll,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    showItem: () => dispatch(ListProductItem),
    showItemAll: () => dispatch(ListProductAll),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ShopPage);
