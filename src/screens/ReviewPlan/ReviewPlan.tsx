import React, { useEffect, useState } from "react";
import { useBazaarStepperdStyles } from "@/static/stylesheets/molecules";
import LogoPrev from "@/static/icons/ic_previous.png";
import IcCheckMark from "@/static/svg/ic_checkmark.svg";
import { DashboardLayout } from "@/components/layouts";
import { SectionHeader } from "@/components/molecules/Bazaars";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { Grid } from "@mui/material";
import { AppService } from "@/service/AllApiData.service";

export default function ReviewPlan() {
  const classes = useBazaarStepperdStyles();
  const state = useLocation();
  const { id } = useParams();
  const navigate = useNavigate();
  const [allPlans, setAllPlans] = useState<any>([]);
  const localStoragedata = JSON.parse(
    localStorage.getItem("setplandata") || ""
    );
    const previewData = JSON.parse(localStorage.getItem("previewData") || "");
    const [statedata, setstatedata] = useState<any>([]);
    const [bazaardata, setbazaardata] = useState<any>({});
    const loction = useLocation()

  React.useEffect(() => {
    PlansAllApi();
  }, []);

  useEffect(() => {
    getalldis();
  }, []);

  console.log(id, "bazaardata");

  const getalldis = async () => {
    const res = await AppService.getAllDistricByState({
      ids: localStoragedata.state,
    });
    const response = await AppService.getAllBazarProductListdel(
      localStoragedata.bazaar
    );
    console.log(response.data, "response");
    setstatedata(res.data.results);
    setbazaardata(response.data);
  };
  const PlansAllApi = async () => {
    try {
      const res = await AppService.getPlans();
      const response = await AppService.getAllStates();
      const respo = await AppService.listFeatures();
      console.log(res?.data?.results);
      const finaldata = res.data.results?.map((im: any) => {
        const data = {
          plantype: im?.plan_choice === "FREE" ? "FREE" : im?.amount,
          branches: im?.branches?.toString(),
          featureData: respo?.data?.results
            ?.filter((it: any) => im?.plan_features?.includes(it?.id))
            ?.map((item: any) => item?.feature),
          state: response?.data?.results
            ?.filter((it: any) => im?.state?.includes(it?.id))
            ?.map((item: any) => item?.state),
        };
        return data;
      });
      if (
        res?.status === 200 &&
        response?.status === 200 &&
        respo?.status === 200
      ) {
        setAllPlans([state, ...finaldata]);
      }
    } catch (error: any) {
      console.log("err", error.message);
    }
  };

  const Navigatefuc = () =>{
    const loctions:any = loction.pathname.endsWith("undefined")

    if(loctions){
      navigate(`/addnewplan`)
    }
    else{
      navigate(`/planedit/${id}`)
    }
  }

  return (
    <DashboardLayout>
      <SectionHeader />
      <div className={classes.root}>
        <div
          className="headContainer"
          onClick={Navigatefuc}
          style={{ alignItems: "center", marginBottom: "15px" }}
        >
          <div className="icon">
            <img src={LogoPrev} alt={"Logo"} />
          </div>
          <div className="headTitle">Plan Preview</div>
        </div>
        <Grid
          container
          spacing={2}
          className="review-plans"
          style={{ marginRight: 0, paddingBottom: "30px" }}
        >
          <Grid item lg={4} md={4} sm={6} style={{ paddingTop: 0 }}>
            <div className="mt-[30px]">
              <div className={`border border-[#4E2FA9] rounded-xl p-[30px]`}>
                {localStoragedata?.plantype !== "FREE" ? (
                  <div
                    className="flex justify-between"
                    style={{ alignItems: "center" }}
                  >
                    <div>
                      <p className="text-[#4E2FA9] text-[16px] font-bold">
                        {localStoragedata?.plan_name}
                      </p>
                      <p className="text-[#121127] text-[24px] font-semibold pt-3">
                        {localStoragedata?.plan_choice == "FREE" ? (
                          localStoragedata?.plan_choice
                        ) : (
                          <>
                            {" "}
                            <span
                              className="text-[#7A7A86]"
                              style={{ fontSize: "18px" }}
                            >
                              ₹{localStoragedata?.amount} / 4 /{" "}
                              {localStoragedata.plan_periods_in_days}
                            </span>{" "}
                          </>
                        )}
                      </p>
                      <p className="text-[#121127] text-[18px] font-semibold pt-3">
                        Bazaar Name - {bazaardata?.bazaar_name}
                      </p>
                    </div>
                    <div className="bg-[#F9F5F2] top-[20px] left-[215px] rounded-full flex flex-col w-[100px] h-[100px] text-center items-center justify-center">
                      <p className="text-[#FF6652] text-[36px] font-bold leading-none">
                        {localStoragedata?.branches}
                      </p>
                      <p className="text-[#84818A] text-sm font-semibold">
                        Branches
                      </p>
                    </div>
                  </div>
                ) : (
                  <div className="flex gap-5 justify-between">
                    <div>
                      <p className="text-[#4E2FA9] text-[16px] font-semibold">
                        Individual
                      </p>
                      <p className="text-[#121127] text-[24px] font-semibold pt-2">
                        Free
                      </p>
                    </div>
                  </div>
                )}
                <div>
                  <p className="text-[#121127] text-[14px] font-semibold pt-4">
                    Available for,{" "}
                    {statedata?.map((item: any) => item.state_name)}
                  </p>
                  {/* <p className="text-[#121127] text-[14px] font-semibold pt-4">
                        {localStoragedata?.district} - {localStoragedata?.city}
                      </p> */}
                  <p className="text-[#121127] text-[14px] font-semibold pt-4">
                    Plan Tally - {localStoragedata?.plan_tally ? "Yes" : "No"}
                  </p>
                </div>
                <div className="mt-[100px]">
                  <p className="font-[#121127] text-[24px] font-bold mb-2">
                    Features
                  </p>
                  <div
                    className="flex gap-5 pb-6 all-features-div"
                    style={{ height: "384px", overflowY: "auto" }}
                  >
                    <ul>
                      {previewData?.featureData?.length > 0 ? (
                        previewData?.featureData.map((it: any) => (
                          <li className="mb-[5px]">
                            <div className="flex gap-4 items-center">
                              <img
                                className="w-[15px]"
                                src={IcCheckMark}
                                alt={"Logo"}
                              />
                              <p className="text-[#121127] text-[14px] font-normal py-[5px]">
                                {it}
                              </p>
                            </div>
                          </li>
                        ))
                      ) : (
                        <p className="text-[#121127] text-[14px] font-normal py-[5px]">
                          No Plan Features Data
                        </p>
                      )}
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </Grid>
          {allPlans?.length > 0
            ? allPlans?.map((itm: any, index: any) => {
                return (
                  <Grid item lg={4} md={4} sm={6} style={{ paddingTop: 0 }}>
                    <div className="mt-[30px]">
                      <div
                        className={`border border-[##E1E1E1]
                        } rounded-xl p-[30px]`}
                      >
                        {itm?.plantype !== "FREE" ? (
                          <div
                            className="flex justify-between"
                            style={{ alignItems: "center" }}
                          >
                            <div>
                              <p className="text-[#4E2FA9] text-[16px] font-bold">
                                {itm?.plan_name}
                              </p>
                              <p className="text-[#121127] text-[24px] font-semibold pt-3">
                                {itm?.plan_choice == "FREE" ? (
                                  itm?.plan_choice
                                ) : (
                                  <>
                                    {" "}
                                    <span
                                      className="text-[#7A7A86]"
                                      style={{ fontSize: "18px" }}
                                    >
                                      ₹{itm?.amount} / 4 /{" "}
                                      {itm.plan_periods_in_days}
                                    </span>{" "}
                                  </>
                                )}
                              </p>
                              <p className="text-[#121127] text-[18px] font-semibold pt-3">
                                Bazaar Name - {bazaardata?.bazaar_name}
                              </p>
                            </div>
                            <div className="bg-[#F9F5F2] top-[20px] left-[215px] rounded-full flex flex-col w-[100px] h-[100px] text-center items-center justify-center">
                              <p className="text-[#FF6652] text-[36px] font-bold leading-none">
                                {itm?.branches}
                              </p>
                              <p className="text-[#84818A] text-sm font-semibold">
                                Branches
                              </p>
                            </div>
                          </div>
                        ) : (
                          <div className="flex gap-5 justify-between">
                            <div>
                              <p className="text-[#4E2FA9] text-[16px] font-semibold">
                                Individual
                              </p>
                              <p className="text-[#121127] text-[24px] font-semibold pt-2">
                                Free
                              </p>
                            </div>
                          </div>
                        )}
                        <div>
                          <p className="text-[#121127] text-[14px] font-semibold pt-4">
                            Available for,{" "}
                            {statedata?.map((item: any) => item.state_name)}
                          </p>
                          {/* <p className="text-[#121127] text-[14px] font-semibold pt-4">
                        {localStoragedata?.district} - {localStoragedata?.city}
                      </p> */}
                          <p className="text-[#121127] text-[14px] font-semibold pt-4">
                            Plan Tally -{" "}
                            {itm?.plan_tally ? "Yes" : "No"}
                          </p>
                        </div>
                        <div className="mt-[100px]">
                          <p className="font-[#121127] text-[24px] font-bold mb-2">
                            Features
                          </p>
                          <div
                            className="flex gap-5 pb-6 all-features-div"
                            style={{ height: "384px", overflowY: "auto" }}
                          >
                            <ul>
                              {itm?.featureData?.length > 0 ? (
                                itm?.featureData.map((it: any) => (
                                  <li className="mb-[5px]">
                                    <div className="flex gap-4 items-center">
                                      <img
                                        className="w-[15px]"
                                        src={IcCheckMark}
                                        alt={"Logo"}
                                      />
                                      <p className="text-[#121127] text-[14px] font-normal py-[5px]">
                                        {it}
                                      </p>
                                    </div>
                                  </li>
                                ))
                              ) : (
                                <p className="text-[#121127] text-[14px] font-normal py-[5px]">
                                  No Plan Features Data
                                </p>
                              )}
                            </ul>
                          </div>
                        </div>
                      </div>
                    </div>
                  </Grid>
                );
              })
            : null}
          {/* <Grid item lg={4} md={4} sm={6} style={{ paddingTop: 0 }}>
            <div className="mt-[30px]">
              <div className="border border-[##E1E1E1] rounded-xl p-[30px]">
                <div className="flex justify-between" style={{ alignItems: "center" }}>
                  <div>
                    <p className="text-[#4E2FA9] text-[16px] font-bold">
                      Team
                    </p>
                    <p className="text-[#121127] text-[24px] font-semibold pt-3">
                      ₹24 <span className="text-[#7A7A86]" style={{ fontSize: "18px" }}>/month</span>
                    </p>
                  </div>
                  <div className="bg-[#F9F5F2] top-[20px] left-[215px] rounded-full flex flex-col w-[100px] h-[100px] text-center items-center justify-center">
                    <p className="text-[#FF6652] text-[36px] font-bold leading-none">12</p>
                    <p className="text-[#84818A] text-sm font-semibold">Branches</p>
                  </div>
                </div>
                <div>
                  <p className="text-[#121127] text-[14px] font-semibold pt-4">
                    Available for UP, Delhi, Punjab
                  </p>
                </div>
                <div className="mt-[100px]">
                  <p className="font-[#121127] text-[24px] font-bold mb-2">
                    Features
                  </p>
                  <div className="flex gap-5 pb-6 all-features-div" style={{ height: "295px", overflowY: "auto" }}>
                    <ul>
                      <li className="mb-[5px]">
                        <div className="flex gap-4 items-center">
                          <img
                            className="w-[15px]"
                            src={IcCheckMark}
                            alt={"Logo"}
                          />
                          <p className="text-[#121127] text-[14px] font-normal py-[5px]">
                            25 Projects
                          </p>
                        </div>
                      </li>
                      <li className="mb-[5px]">
                        <div className="flex gap-4 items-center">
                          <img
                            className="w-[15px]"
                            src={IcCheckMark}
                            alt={"Logo"}
                          />
                          <p className="text-[#121127] text-[14px] font-normal py-[5px]">
                            Up to 10,000 subscribers
                          </p>
                        </div>
                      </li>
                      <li className="mb-[5px]">
                        <div className="flex gap-4 items-center">
                          <img
                            className="w-[15px]"
                            src={IcCheckMark}
                            alt={"Logo"}
                          />
                          <p className="text-[#121127] text-[14px] font-normal py-[5px]">
                            {" "}
                            Advanced analytics
                          </p>
                        </div>
                      </li>
                      <li className="mb-[5px]">
                        <div className="flex gap-4 items-center">
                          <img
                            className="w-[15px]"
                            src={IcCheckMark}
                            alt={"Logo"}
                          />
                          <p className="text-[#121127] text-[14px] font-normal py-[5px]">
                            24-hour support response time
                          </p>
                        </div>
                      </li>
                      <li className="mb-[5px]">
                        <div className="flex gap-4 items-center">
                          <img
                            className="w-[15px]"
                            src={IcCheckMark}
                            alt={"Logo"}
                          />
                          <p className="text-[#121127] text-[14px] font-normal py-[5px]">
                            Marketing advisor
                          </p>
                        </div>
                      </li>
                      <li className="mb-[5px]">
                        <div className="flex gap-4 items-center">
                          <img
                            className="w-[15px]"
                            src={IcCheckMark}
                            alt={"Logo"}
                          />
                          <p className="text-[#121127] text-[14px] font-normal py-[5px]">
                            Custom integration
                          </p>
                        </div>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </Grid>
          <Grid item lg={4} md={4} sm={6} style={{ paddingTop: 0 }}>
            <div className="mt-[30px]">
              <div className="border border-[##E1E1E1] rounded-xl p-[30px]">
                <div className="flex justify-between" style={{ alignItems: "center" }}>
                  <div>
                    <p className="text-[#4E2FA9] text-[16px] font-bold">
                      Organization
                    </p>
                    <p className="text-[#121127] text-[24px] font-semibold pt-3">
                      ₹48 <span className="text-[#7A7A86]" style={{ fontSize: "18px" }}>/month</span>
                    </p>
                  </div>
                  <div className="bg-[#F9F5F2] top-[20px] left-[215px] rounded-full flex flex-col w-[100px] h-[100px] text-center items-center justify-center">
                    <p className="text-[#FF6652] text-[36px] font-bold leading-none">12</p>
                    <p className="text-[#84818A] text-sm font-semibold">Branches</p>
                  </div>
                </div>
                <div>
                  <p className="text-[#121127] text-[14px] font-semibold pt-4">
                    Available for UP, Delhi, Punjab
                  </p>
                </div>
                <div className="mt-[100px]">
                  <p className="font-[#121127] text-[24px] font-bold mb-2">
                    Features
                  </p>
                  <div className="flex gap-5 pb-6 all-features-div" style={{ height: "295px", overflowY: "auto" }}>
                    <ul>
                      <li className="mb-[5px]">
                        <div className="flex gap-4 items-center">
                          <img
                            className="w-[15px]"
                            src={IcCheckMark}
                            alt={"Logo"}
                          />
                          <p className="text-[#121127] text-[14px] font-normal py-[5px]">
                            Unlimited projects
                          </p>
                        </div>
                      </li>
                      <li className="mb-[5px]">
                        <div className="flex gap-4 items-center">
                          <img
                            className="w-[15px]"
                            src={IcCheckMark}
                            alt={"Logo"}
                          />
                          <p className="text-[#121127] text-[14px] font-normal py-[5px]">
                            Unlimited subscribers
                          </p>
                        </div>
                      </li>
                      <li className="mb-[5px]">
                        <div className="flex gap-4 items-center">
                          <img
                            className="w-[15px]"
                            src={IcCheckMark}
                            alt={"Logo"}
                          />
                          <p className="text-[#121127] text-[14px] font-normal py-[5px]">
                            {" "}
                            Custom analytics
                          </p>
                        </div>
                      </li>
                      <li className="mb-[5px]">
                        <div className="flex gap-4 items-center">
                          <img
                            className="w-[15px]"
                            src={IcCheckMark}
                            alt={"Logo"}
                          />
                          <p className="text-[#121127] text-[14px] font-normal py-[5px]">
                            1-hour support response time
                          </p>
                        </div>
                      </li>
                      <li className="mb-[5px]">
                        <div className="flex gap-4 items-center">
                          <img
                            className="w-[15px]"
                            src={IcCheckMark}
                            alt={"Logo"}
                          />
                          <p className="text-[#121127] text-[14px] font-normal py-[5px]">
                            Marketing advisor
                          </p>
                        </div>
                      </li>
                      <li className="mb-[5px]">
                        <div className="flex gap-4 items-center">
                          <img
                            className="w-[15px]"
                            src={IcCheckMark}
                            alt={"Logo"}
                          />
                          <p className="text-[#121127] text-[14px] font-normal py-[5px]">
                            Custom integration
                          </p>
                        </div>
                      </li>
                      <li className="mb-[5px]">
                        <div className="flex gap-4 items-center">
                          <img
                            className="w-[15px]"
                            src={IcCheckMark}
                            alt={"Logo"}
                          />
                          <p className="text-[#121127] text-[14px] font-normal py-[5px]">
                            Marketing advisor
                          </p>
                        </div>
                      </li>
                      <li className="mb-[5px]">
                        <div className="flex gap-4 items-center">
                          <img
                            className="w-[15px]"
                            src={IcCheckMark}
                            alt={"Logo"}
                          />
                          <p className="text-[#121127] text-[14px] font-normal py-[5px]">
                            Tracking customers flow
                          </p>
                        </div>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </Grid> */}
        </Grid>
      </div>
    </DashboardLayout>
  );
}
