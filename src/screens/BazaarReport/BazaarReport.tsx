import React, { useEffect, useState } from "react";
import { DashboardLayout } from "@/components/layouts";
import {
  BazaarReportHero,
  SectionHeader,
} from "@/components/molecules/Bazaars";
import { TopWholeseler } from "@/components/molecules/Wholesellers";
import { Grid } from "@mui/material";
import LogoAdd from "@/static/icons/ic_report.png";
import LogoGo from "@/static/icons/ic_go.png";
import { useBazaarreportStyles } from "@/static/stylesheets/screens";
import { CityBuisness } from "@/components/molecules/cityBuisness";
import { NewWholeseller } from "@/components/molecules/NewWholeseller/NewWholeseller";
import { AiOutlineLeft, AiOutlineReload, AiOutlineEllipsis, AiOutlineArrowRight } from "react-icons/ai";
import { TopProducts } from "@/components/molecules/TopProducts/TopProducts";
import { useLocation, useNavigate } from "react-router-dom";
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import { AppService } from "@/service/AllApiData.service";

const BazaarReport = () => {
  const classes = useBazaarreportStyles();
  const navigate = useNavigate();
  const [citywisedata, setcitywisedata] = useState<any>([])
  const [topwholedata, settopwholedata] = useState<any>([])
  const bazaar_Id = localStorage?.getItem('IDS');
  const goToElectronicBazarpage = () => {
    if(bazaar_Id !== null){
      navigate("/electronicsbazaar/"+bazaar_Id);
    }
  }
  const getcitywisedata = async (id: any) => {
    const responseJson = await AppService.getAllcitywise(id);
    setcitywisedata(responseJson?.data?.results)
  }
  const gettopwholewisedata = async (id: any) => {
    const responseJson = await AppService.getAlltopwholewise(id);
    settopwholedata(responseJson?.data?.results)
  }
  const getwholeseller = async () => {
    const responcejson = await AppService.getAllListwholesellerNew()
    console.log(responcejson?.data?.results?.map((itm: any) => itm?.wholeseller_type_name))
  }

  useEffect(() => {
    if (bazaar_Id !== null) {
      gettopwholewisedata(bazaar_Id)
      getcitywisedata(bazaar_Id)
    }
    getwholeseller()
  }, [])
  return (
    <>
      <DashboardLayout>
        <SectionHeader />
        <div className={classes.root}>
          <Grid container spacing={2}>
            <Grid item xs={6}>
              <div className="headingTitle" style={{ display: "flex", alignItems: "center", paddingBottom: "15px" }} onClick={goToElectronicBazarpage}><AiOutlineLeft style={{ color: "#84818A", marginRight: "10px", fontSize: '15px' }} /> Reports- Electronic Bazaar</div>
            </Grid>

            {/* <Grid item xs={6}>
              <div className={classes.container}>
                <img src={LogoAdd} alt={"Logo"} />
                <p className="reportButton">View Report</p>
                <img src={LogoGo} alt={"Logo"} />
              </div>
            </Grid> */}

            <Grid item xs={12}>
              <BazaarReportHero />
            </Grid>

            <Grid item lg={4} md={4} sm={4} xs={12}>
              <div className="cityBuisness">
                <div className="cityTitle">
                  <p>City-Wise Business</p>
                  <p style={{ display: 'flex', alignItems: 'center' }}>Delhi-NCR <ArrowDropDownIcon /></p>
                </div>
                <div>
                  <CityBuisness data={citywisedata} />
                </div>
              </div>
            </Grid>

            <Grid item lg={8} md={8} sm={8} xs={12}>
              <div className="cityBuisness">
                <div className="cityTitle">
                  <p>Top Wholesellers</p>
                  <p className="viewAllBtn">View all</p>
                </div>
                <div>
                  <TopWholeseler />
                </div>
              </div>
            </Grid>

            <Grid item lg={8} md={8} sm={8} xs={12} style={{ marginBottom: "15px" }}>
              <div className="cityBuisness" style={{ position: "relative", padding: "20px 20px 54px" }}>
                <div className="cityTitle">
                  <p>Top Poducts</p>
                  <p className="viewAllBtn">View all</p>
                </div>
                <div>
                  <TopProducts />
                </div>
                <div style={{ borderTop: "1px solid #EBEAED", padding: "16px", textAlign: "center", position: "absolute", width: "100%", bottom: 0, left: 0 }}>
                  <button style={{ display: "flex", alignItems: "center", justifyContent: "center", width: "100%", fontWeight: 600, fontSize: "14px", color: "#4E2FA9" }}>View More Customers <AiOutlineArrowRight style={{ marginLeft: "10px" }} /></button>
                </div>
              </div>
            </Grid>

            <Grid item lg={4} md={4} sm={4} xs={12} style={{ marginBottom: "15px" }}>
              <div className="cityBuisness" style={{ position: "relative", padding: "20px 20px 54px" }}>
                <div className="cityTitle">
                  <p>New Wholesellers</p>
                  <div style={{ display: "flex", alignItems: "center" }}>
                    <AiOutlineReload style={{ marginRight: "10px", color: "#84818A" }} />
                    <AiOutlineEllipsis style={{ transform: "rotate(92deg)", color: "#84818A" }} />
                  </div>
                </div>
                <div>
                  <NewWholeseller />
                </div>
                <div style={{ borderTop: "1px solid #EBEAED", padding: "16px", textAlign: "center", position: "absolute", width: "100%", bottom: 0, left: 0 }}>
                  <button style={{ display: "flex", alignItems: "center", justifyContent: "center", width: "100%", fontWeight: 600, fontSize: "14px", color: "#4E2FA9" }}>View More Customers <AiOutlineArrowRight style={{ marginLeft: "10px" }} /></button>
                </div>
              </div>
            </Grid>
          </Grid>
        </div>
      </DashboardLayout>
    </>
  );
};

export default BazaarReport;