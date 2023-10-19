import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";

import { faCaretLeft, faCaretRight } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import "./DetailPage.css";

import { addCart } from "../../store/store";

const DetailPage = () => {
  // change page
  const navigate = useNavigate();
  const navigateTo = (path) => {
    navigate(path);
  };
  // values
  const dispatch = useDispatch();

  const params = useParams();
  const [resultsId, setResultsId] = useState([]);
  const [resultsIdRelated, setResultsIdRelated] = useState([]);
  const [checkRelated, setCheckRelated] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [srcImg, setSrcImg] = useState("");

  const productId = params.id;
  // get product to api
  useEffect(() => {
    const fetchID = async () => {
      try {
        const response = await fetch(
          `https://firebasestorage.googleapis.com/v0/b/funix-subtitle.appspot.com/o/Boutique_products.json?alt=media&token=dc67a5ea-e3e0-479e-9eaf-5e01bcd09c74`
        );
        const dataApi = await response.json();

        const isData = await dataApi.find(
          (prod) => prod._id.$oid === productId
        );
        const isDataRelated = await dataApi.filter(
          (prod) =>
            prod.category === isData.category && prod._id.$oid !== productId
        );
        setResultsId(isData);

        if (isDataRelated.length > 0) {
          setCheckRelated(true);
          setResultsIdRelated(isDataRelated);
        }

        setIsLoading(true);
      } catch (error) {
        if (error) throw error;
      }
    };

    fetchID();
  }, [productId]);
  // handle click image product
  const handleClickImg = (e) => {
    setSrcImg(e.target.src);
  };

  // handle add cart
  const handleAddToCart = () => {
    const userLogin = JSON.parse(localStorage.getItem("userLogin")) || "";

    const userName = userLogin || "";
    const payload = { ...resultsId };

    payload.quantity = 1;
    payload.username = userName;

    dispatch(addCart(payload));
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
    <div className="detail-app">
      {isLoading ? (
        <div className="detail_container">
          <div className="detail_content">
            <div className="detail_imgs-color">
              <li className="list-img-product">
                <img
                  className="img-color-product"
                  src={`${resultsId.img4}`}
                  alt={`${resultsId.name}`}
                  onClick={handleClickImg}
                />
              </li>
              <li className="list-img-product">
                <img
                  className="img-color-product"
                  src={`${resultsId.img3}`}
                  alt={`${resultsId.name}`}
                  onClick={handleClickImg}
                />
              </li>
              <li className="list-img-product">
                <img
                  className="img-color-product"
                  src={`${resultsId.img2}`}
                  alt={`${resultsId.name}`}
                  onClick={handleClickImg}
                />
              </li>
              <li className="list-img-product">
                <img
                  className="img-color-product"
                  src={`${resultsId.img1}`}
                  alt={`${resultsId.name}`}
                  onClick={handleClickImg}
                />
              </li>
            </div>
            <div className="detail_img-main">
              {srcImg ? (
                <img
                  className="detail_img-main-img"
                  src={srcImg}
                  alt={`${resultsId.name}`}
                />
              ) : (
                <img
                  className="detail_img-color-product"
                  src={`${resultsId.img1}`}
                  alt={`${resultsId.name}`}
                  onClick={handleClickImg}
                />
              )}
            </div>
            <div className="detail_product-view">
              <h2 className="detail_product-view-h2">{resultsId.name}</h2>
              <h4 className="detail_product-view-h4">
                {formatPrice(resultsId.price)} VND
              </h4>
              <p className="detail_product-view-desc">{resultsId.short_desc}</p>
              <p className="detail_product-view-p">
                <span className="detail_product-view-p-1">category:</span>{" "}
                <span className="detail_product-view-p-2">
                  {resultsId.category}
                </span>
              </p>
              <div className="detail_product-view-quantity">
                <p>
                  <span className="detail_product-view-quantity-1">
                    quantity
                  </span>
                  <FontAwesomeIcon icon={faCaretLeft} />
                  <span className="detail_product-view-quantity-2">{}1</span>
                  <FontAwesomeIcon icon={faCaretRight} />
                </p>

                <button
                  className="cart-btn-add"
                  type="button"
                  onClick={handleAddToCart}
                >
                  Add to cart
                </button>
              </div>
            </div>
          </div>
          <div className="detail_features-view">
            <h4 className="title features-description">description</h4>
            <h3 className="title features-title">product description</h3>
            {resultsId.long_desc.split("\n").map((line, i) => (
              <p key={i}>{line}</p>
            ))}
          </div>
          {checkRelated && (
            <>
              <h3 className="title">related products</h3>
              <div className="detail_related">
                {resultsIdRelated.map((prod) => (
                  <div className="related-product" key={prod._id.$oid}>
                    <img
                      className="related-product-img"
                      src={`${prod.img1}`}
                      alt={`${prod.img1}`}
                      onClick={() => {
                        setSrcImg(prod.img1);
                        navigateTo(`/detail/${prod._id.$oid}`);
                      }}
                    />
                    <h4 className="related-product-title-h3">{prod.name}</h4>
                    <h5 className="related-product-title-h5">
                      {formatPrice(prod.price)} VND
                    </h5>
                  </div>
                ))}
              </div>
            </>
          )}
        </div>
      ) : (
        <p>Loading ...</p>
      )}
    </div>
  );
};

export default DetailPage;
