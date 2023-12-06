import React from "react";
import { useTopwholesellerStyle } from "@/static/stylesheets/molecules";
import LogoEcBazaar from "@/static/images/placeholder.jpg";

const TopProducts = () => {
  const classes = useTopwholesellerStyle();
  const data = [1, 2, 3, 4, 5];

  return (
    <div className={classes.root} style={{ overflowX: "auto" }}>
      <table className="topWholesalerTable">
        <tr>
          <th className="planTitle">ITEM</th>
          <th className="bazaarTitle">PRICE</th>
          <th className="stateTitle">SOLD</th>
          <th className="districtTitle" style={{ textAlign: "end", paddingRight: 0 }}>SALES</th>
        </tr>

        {data.map((item: any) => (
          <tr>
            <td>
              <div className="brandData" style={{ alignItems: "center" }}>
                <img className="brandLogo" src={LogoEcBazaar} alt={"Logo"} />
                <p>Wingreens Mart</p>
              </div>
            </td>
            <td>₹49</td>
            <td>5,951</td>
            <td style={{ textAlign: "end", paddingRight: 0 }}>₹15,302.00</td>
          </tr>
        ))}
      </table>
    </div>
  );
};

export { TopProducts };