import React from "react";

import "./MenuShop.css";

const MenuShop = ({ handleClickedItem }) => {
  
  return (
    <div className="shop_menu-app">
      <h1 className="title shop_menu-title">categories</h1>

      <div className="menu_item menu_apple">
        <h4 className="title apple-title item-title">apple</h4>
        <h6 id="all" className={`item-product`} onClick={handleClickedItem}>
          All
        </h6>
      </div>

      <div className="menu_item menu_iphone">
        <h4 className="title item-title">iphone & mac</h4>
        <li id="iphone" className={`item-product`} onClick={handleClickedItem}>
          IPhone
        </li>
        <li id="ipad" className={`item-product`} onClick={handleClickedItem}>
          Ipad
        </li>
        <li id="macbook" className={`item-product`} onClick={handleClickedItem}>
          Macbook
        </li>
      </div>

      <div className="menu_item menu_wireless">
        <h4 className="title item-title">wireless</h4>
        <li id="airpod" className={`item-product`} onClick={handleClickedItem}>
          Airpod
        </li>
        <li id="watch" className={`item-product`} onClick={handleClickedItem}>
          Watch
        </li>
      </div>

      <div className="menu_item menu_other">
        <h4 className="title item-title">other</h4>
        <li id="mouse" className={`item-product`} onClick={handleClickedItem}>
          Mouse
        </li>
        <li
          id="Keyboard"
          className={`item-product`}
          onClick={handleClickedItem}
        >
          Keyboard
        </li>
        <li id="other" className={`item-product`} onClick={handleClickedItem}>
          Other
        </li>
      </div>
    </div>
  );
};

export default React.memo(MenuShop);
