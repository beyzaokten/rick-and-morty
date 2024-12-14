import React from "react";
import "../index.css";
import bannerImage from "../assets/banner.png";

const Header = () => {
  return (
    <header className="header">
      <img
        src={bannerImage}
        alt="Rick and Morty"
        className="header-banner"
      />
    </header>
  );
};

export default Header;
