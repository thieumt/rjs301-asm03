import React from "react";
import "./Footer.css";

const Footer = () => {
  return (
    <div className="footer-app">
      <div className="footer-div">
        <h2 className="footer-title">customer services</h2>
        <li>
          <p>Help & Contact Us</p>
        </li>
        <li>
          <p>Returns & Refunds</p>
        </li>
        <li>
          <p>Online Stores</p>
        </li>
        <li>
          <p>Terms & Conditions</p>
        </li>
      </div>
      <div className="footer-div">
        <h2 className="footer-title">company</h2>
        <li>
          <p>What We Do</p>
        </li>
        <li>
          <p>Avaiable Services</p>
        </li>
        <li>
          <p>Latest Posts</p>
        </li>
        <li>
          <p>FAQs</p>
        </li>
      </div>
      <div className="footer-div">
        <h2 className="footer-title">social media</h2>
        <li>
          <p>Twitter</p>
        </li>
        <li>
          <p>Instagram</p>
        </li>
        <li>
          <p>Facebook</p>
        </li>
        <li>
          <p>Pinterest</p>
        </li>
      </div>
    </div>
  );
};

export default React.memo(Footer);
