import React from "react";
import LogoEcBazaar from "@/static/images/placeholder.jpg";
import { usenewWholesellerStyles } from "@/static/stylesheets/molecules";

const NewWholeseller = (props:any) => {
  const classes = usenewWholesellerStyles();
  const {data} = props;

  return (
    <div className={classes.root} style={{ overflowX: "auto" }}>
      {data?.map((item: any) => (
        <div key={item?.username} className="container" style={{ alignItems: "center" }}>
          <div className="brandData">
            <img className="brandLogo" src={LogoEcBazaar} alt={"Logo"} />
          </div>
          <div>
            <p>{item?.username}</p>
            <p className="customerId">Customer ID#{item?.customer_id}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export { NewWholeseller };
