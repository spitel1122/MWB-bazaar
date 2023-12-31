import React from "react";
import {  useNavigate } from "react-router-dom";
import { useNowholesellerStyles } from "@/static/stylesheets/molecules";
import PlaceholderImage from "@/static/images/mwb_nowholeseller.png";
import { AddButton } from "@/components/atoms/Button";

const NoWholeseller = () => {
  const classes = useNowholesellerStyles();
  const navigate = useNavigate();

  return (
    <div className={classes.root}>
      <div className="container">
        <div className="placeholder">
          <img src={PlaceholderImage} alt={"Not Found"} />
        </div>
        <div className="contentContainer">
          <p className="headTitle">No wholesalers added</p>
          <p className="headDescription">
            Try to create a new wholesaler, click on the button below.
          </p>
        </div>
        <div className="actonButton">
          <AddButton
            label="Add Wholesaler"
            onClick={() => navigate("/addwholeseller")}
          />
        </div>
      </div>
    </div>
  );
};

export { NoWholeseller };
