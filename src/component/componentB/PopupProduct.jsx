import React from "react";
import { useNavigate } from "react-router-dom";
import "./PopupProduct.css";

const Popup = ({ dataImg, handleClosePopup, formatPrice }) => {
  // change page
  const navigate = useNavigate();

  const handleDetailProduct = (path) => {
    navigate(`./detail/${path}`)
    handleClosePopup()
  }
  return (
    <div className="popup-app">
      <div className="content">
        <div className="popup-img">
          <img className="img-show" src={dataImg.img1} alt={dataImg.name} />
        </div>
        <div className="popup-detail">
          <div className="detail-btn-close">
            <button
              onClick={handleClosePopup}
              type="button"
              className="close-btn"
            >
              x
            </button>
          </div>

          <h2 className="title img-name">{dataImg.name}</h2>
          <h4 className="title img-price">{formatPrice(dataImg.price)} VND</h4>
          <p className="img-short_desc">{dataImg.short_desc}</p>
          <button
            type="button"
            className="btn img-btn"
            onClick={() => handleDetailProduct(dataImg._id.$oid)}
          >
            View Detail
          </button>
        </div>
      </div>
    </div>
  );
};

export default React.memo(Popup);
