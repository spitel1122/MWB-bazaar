import React, { useEffect, useState } from "react";
import { usecityBuisnessStyle } from "@/static/stylesheets/molecules";
import { AppService } from "@/service/AllApiData.service";

const CityBuisness = (props: any) => {
  const { data } = props;
  const classes = usecityBuisnessStyle();
  const [Allcities, setAllcities] = useState<any>([])
  const getcitydata = async () => {
    const responsecityJson = await AppService.getAllCity();
    setAllcities(responsecityJson?.data?.results)
  }
  useEffect(() => {
    getcitydata()
  }, [])
  return (
    <div className={classes.root} style={{ overflowX: "auto" }}>
      <table style={{ width: "100%" }}>
        <thead>
          <tr>
            <th>Cities</th>
            <th>ORDERS</th>
            <th style={{ textAlign: "end", paddingRight: 0 }}>SALES</th>
          </tr>
        </thead>
        <tbody>
          {data.map((item: any) => {
            const cityname = Allcities.find((it: any) => it.id === item.cities)
            return (< tr key={item?.orders}>
              <td>{cityname?.city}</td>
              <td>{item?.orders}</td>
              <td style={{ textAlign: "end", paddingRight: 0 }}>₹{item?.sales}</td>
            </tr>)
          })}
        </tbody>
      </table>
    </div >
  );
};

export { CityBuisness };