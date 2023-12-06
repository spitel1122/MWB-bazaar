import React, { useEffect, useState } from "react";
import { usePlancardStyles } from "@/static/stylesheets/molecules/plancardStyle";
import LogoGo from "@/static/icons/ic_arrow_go.png";
import { ActionButton } from "@/components/atoms/Button/ActionButton";
import { Dialog } from "@mui/material";
import successCheckIcon from "@/static/icons/green-tick.svg";
import close from '@/static/icons/close-icon.svg';
import { AppService } from "@/service/AllApiData.service";

const PlanCard = (props: any) => {
  const classes = usePlancardStyles();
  const [addModalOpen, setAddModalOpen] = useState(false);
  const [AllDistrict, setAllDistrict] = useState<any>([]);
  const [allFeatures, setAllFeatures] = useState<any>([]);

  const data = props.item

  useEffect(() => {
    fetchplanDistrictDetails()
    fetchplanFeaturesDetails()
  }, [])

  const fetchplanDistrictDetails = async () => {
    try {
      const promises = data.district?.map(async (id: any) => {
        const [res1] = await Promise.all([
          AppService.getAllDistricById(id)
        ])
        return { ...id, ...res1?.data };
      })
      const temp = await Promise.all(promises);
      setAllDistrict(temp)
    } catch (err) {
      console.log("Error: ", err)
    }
  }

  const fetchplanFeaturesDetails = async () => {
    try {
      const promises = data?.plan_features?.map(async (id: any) => {
        const [res1] = await Promise.all([
          AppService.getPlanFeaturesById(id)
        ])
        return { ...id, ...res1?.data };
      })
      const temp = await Promise.all(promises);
      setAllFeatures(temp)
    } catch (err) {
      console.log("Error: ", err)
    }
  }

  const AddPlan = () => {
    setAddModalOpen(false)
    localStorage.setItem("planId", data?.id);

  }

  return (
    <div className={classes.root}>
      <div className="container" onClick={() => setAddModalOpen(true)}>
        <div className="plancard">
          <div className="plan-area">
            <div>
              <p className="planTitle">{data?.plan_name}</p>
              <p className="planSubtitle">₹{data?.amount || 0} /month</p>
            </div>

            <div>
              <div className="circle">
                <p>{data?.plan_periods_in_days || 0}</p>
              </div>
              <p className="circle-label">days</p>
            </div>
          </div>

          <p className="planDescription">Available for {AllDistrict.map((item: any, index: number) => {
            const lastItemIndex = AllDistrict.length - 1;
            return <span key={index}>{item.district}{index !== lastItemIndex && ', '}</span>
          })}</p>
          <div className="actionButton" style={{ alignItems: "center" }}>
            <p>View Features</p>
            <img src={LogoGo} alt={"Logo"} style={{ height: "17px", width: "12px" }} />
          </div>
        </div>
      </div>

      <Dialog open={addModalOpen} maxWidth={"lg"} sx={{ ".MuiPaper-root": { borderRadius: "20px", }, }}>
        <div className={classes.addDialog}>
          <div className="modalContainer">
            <div className="modalHead">
              <div>{data?.plan_name}</div>
              <div onClick={() => setAddModalOpen(false)}><img src={close} alt="close" /></div>
            </div>

            <div className="planHead">
              <div>
                <p>
                  ₹{data?.amount || 0} /month
                </p>
                <p className="planDescription">Available for {AllDistrict.map((item: any, index: number) => {
                  const lastItemIndex = AllDistrict.length - 1;
                  return <span key={index} style={{ fontWeight: 400, fontSize: "14px", color: "#121127 "}}>{item.district}{index !== lastItemIndex && ', '}</span>
                })}</p>
              </div>

              <div className="circlePlan">
                <p className="circleTitle">{data?.branches || 0}</p>
                <p className="circleDescription">Branches</p>
              </div>
            </div>

            <div className="FeatureHead">
              <p>Features</p>
              {allFeatures?.map((item: any, index: number) => {
                return <div className="featureList" key={index}>
                  <img src={successCheckIcon} alt={"OTP Success"} />
                  <p className="projectTitle">{item?.feature}</p>
                </div>
              })}
            </div>
          </div>
          <div>
            <div className={"action-bar"}>
              <ActionButton
                variant={"default"}
                title={"Cancel"}
                onClick={() => setAddModalOpen(false)}
              />

              <ActionButton
                variant={"primary"}
                title={"Add"}
                onClick={() => AddPlan()}
              />
            </div>
          </div>
        </div>
      </Dialog>
    </div>
  );
};

export { PlanCard };
