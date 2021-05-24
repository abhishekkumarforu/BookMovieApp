import React from "react";
import Header from "../../common/header/Header";
import { Typography } from "@material-ui/core";
import "./Details.css";

function Details() {
  return (
    <div>
      <Header />
      <div>
        <div className="back-btn">
        <Typography>{"< Back to Home"}</Typography>
        </div>
      </div>
      <div className="section-container">
        <div className="left-section"></div>
        <div className="middle-section">
            <Typography variant="h2">ABCD</Typography>
            <span className="subtitle">Genre: </span><span>Action</span> <br/>
            <span className="subtitle">Duration: </span><span>148</span> <br/>
            <span className="subtitle">Release Date: </span><span>Fri jul 2016</span> <br/>
            <span className="subtitle">Rating: </span><span>6.8</span> <br/><br/>
            <span className="subtitle">Plot: </span><span></span> <br/><br/>
            <span className="subtitle">Trailer: </span><span></span>
        </div>
        <div className="right-section"></div>
      </div>
    </div>
  );
}

export default Details;
