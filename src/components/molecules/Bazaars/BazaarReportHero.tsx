import React, { useEffect, useState } from "react";
import { useBazaarreportHeroStyles } from "@/static/stylesheets/molecules";
import LogoGo from "@/static/icons/ic_go_blue.png";
import { Grid } from "@mui/material";
import { AppService } from "@/service/AllApiData.service";

const BazaarReportHero = () => {
  const classes = useBazaarreportHeroStyles();
  const [totalincome, settotalicome] = useState<any>([])
  const [totalorder, settotalorder] = useState<any>([])
  const bazzarId = localStorage?.getItem('IDS');
  const getalltotalincome = async (id: any) => {
    const responseJson = await AppService.gettotalincome(id);
    settotalicome(responseJson?.data?.results)
  }
  const gettotalorder = async (id: any) => {
    const responseJson = await AppService.gettotalorder(id);
    settotalorder(responseJson?.data?.results)
  }
  useEffect(() => {
    if (bazzarId !== null) {
      getalltotalincome(bazzarId)
      gettotalorder(bazzarId)
    }
  }, [])
  return (
    <div className={classes.root}>
      <h5>Earnings</h5>
      <div className={classes.wholesellerCard}>
        <Grid container spacing={2}>
          <Grid item xs={6}>
            <div className="totalCard">
              <div className="wholesellerItem">
                <p className="headTitle">Total Orders</p>
                <div className="detailsButton">
                {
                    totalorder?.map((item: any) => (
                      <p className="totalcount">{item?.total_orders}</p>
                    ))
                  }
                  <div className="btn" style={{ alignItems: "center", paddingRight: 0 }}>
                    <p className="reportButton">View Details</p>
                    <img src={LogoGo} alt={"Logo"} />
                  </div>
                </div>
              </div>
            </div>
          </Grid>
          <Grid item xs={6} style={{ paddingLeft: 0 }}>
            <div className="totaoItem">
              <div className="wholesellerItem">
                <p className="headTitle">Total Income</p>
                <div className="detailsButton">
                  {
                    totalincome?.map((item: any) => (
                      <p className="totalcount">₹{item?.total_income}</p>
                    ))
                  }
                  <div className="btn" style={{ alignItems: "center", paddingRight: 0 }}>
                    <p className="reportButton">View Details</p>
                    <img src={LogoGo} alt={"Logo"} />
                  </div>
                </div>
              </div>
            </div>
          </Grid>
        </Grid>
      </div>
    </div>
  );
};

export { BazaarReportHero };