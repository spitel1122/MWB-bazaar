import React, { useEffect, useState } from "react";
import { useBazaarCounterStyles } from "@/static/stylesheets/molecules";
import { AppService } from "@/service/AllApiData.service";

const BazaarCounter = (data:any) => {
  // const [getPlan, setTotalPlan] = useState("");
  // const [getSubscriber, setSubscriber] = useState("");
  // const [getRevenue, setRevenue] = useState("");

  // const getAllLists = async () => {
  //   const responseJson = await AppService.getAllPlansData();
    // console.log(responseJson.data.bazaar);
    // const subplans = responseJson?.data?.results?.map((it:any)=>it?.subscribers_active)?.reduce((prev:any,value:any)=>Number(prev)+Number(value),0)
    // const plansrev = responseJson?.data?.results?.map((it:any)=>it?.revenue_generated)?.reduce((prev:any,value:any)=>Number(prev)+Number(value),0)
    // setTotalPlan(responseJson?.data?.count);
    // setSubscriber(subplans);
    // setRevenue(plansrev);
    
    // totalWholesellers(responseJson);
   
  // };
 
  // const totalBazaar = (responseJson:any) =>{
  //   let sum = responseJson.data = (datas:any)=> {
  //     return datas.bazaars
  //   };
  //   console.log(sum);
  //   setTotalBazaar(sum);
  // }

  // const totalWholesellers = (responseJson:any) =>{
  //   let sum = responseJson.data.results.reduce(function(prev: number, current:any) {
  //     return prev + +current.wholesellers
  //   }, 0);
  //   console.log(sum);
  //   setWholesellers(sum);
  // }

  // useEffect(() => {
  //   getAllLists();
  // }, []);

  const classes = useBazaarCounterStyles();
  return (
    <div className={classes.root}>
      <div className={classes.wholesellerCard}>
        <div>
          <div className="wholesellerItem">
            <p className="headTitle">Total Plans</p>
            <p className="wholesellerCount">{data?.data?.plan}</p>
          </div>
        </div>

        <div className="borderItem">
          <div className="wholesellerItem">
            <p className="headTitle">Total Subscribers</p>
            <p className="subscriberCount">{data?.data?.subscriber}</p>
          </div>
        </div>

        <div className="borderItem">
          <div className="wholesellerItem">
            <p className="headTitle">Revenue Generated</p>
            <p className="revenewCount">Rs. {data?.data?.revenue}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export { BazaarCounter };
