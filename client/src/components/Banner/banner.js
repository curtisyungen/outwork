import React, { Component } from "react";
import "./banner.css";

class Banner extends Component {
  render() {
    return (
      <div className="banner">
        This version of Outwork is obsolete as of 01/01/2020. View the latest
        version here:
        <a href="https://outwork-cjy.herokuapp.com">
          https://outwork-cjy.herokuapp.com
        </a>
        .
      </div>
    );
  }
}

export default Banner;
