import React from "react";
import "./Preloader.css";

const Preloader = (props) => {
  const { handlePreloader } = props;
  return (
    <div className="preloader" onClick={handlePreloader}>
      <div className="preloader__container">
        <span className="preloader__round"></span>
      </div>
    </div>
  );
};

export default Preloader;
