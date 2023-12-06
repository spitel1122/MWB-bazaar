import React, { useEffect, useState } from "react";
import { useElectronicsBazaarStyles } from "@/static/stylesheets/screens";
import { Grid } from "@mui/material";
import { FeaturesTab } from "@/components/organisms/FeaturesTab";
import { FreePlanview, PaidPlanview, Planview } from "../PlanCard";
import { AppService } from "@/service/AllApiData.service";

interface Iprops {
  initialValues : any
}

const PlanTab = (props : Iprops) => {
  const classes = useElectronicsBazaarStyles();
  const [allPlans, setAllPlans] = useState<any>([]);
  const [TotalPlanscount, setTotalPlanscount] = useState<any>([]);
  const [Freeplans, setFreeplans] = useState<any>([]);
  const [PaidPlans, setPaidPlans] = useState<any>([]);

  const {initialValues} = props

  React.useEffect(() => {
    PlansAllApi()
  }, [])

  const PlansAllApi = async () => {
    try {
      const res = await AppService.getPlans()
      if(initialValues.wholeseller_status == "PENDING"){
        res.data.results.map((x:any)=>{
          if(initialValues?.wholeseller_plan == x.id){
            allPlans.push(x)
          }
        })
        setAllPlans([...allPlans])
      }
      else{
        setAllPlans(res.data.results)
      }
      setTotalPlanscount(res.data.count)
    } catch (error: any) {
      console.log('err', error.message)
    }
  }
  useEffect(() => {
    if (allPlans?.length > 0) {
      const FreeplansData = allPlans?.filter((plan: any) => plan?.plan_choice?.includes("FREE"));
      setFreeplans(FreeplansData)
    }
  }, [allPlans]);

  useEffect(() => {
    if (allPlans?.length > 0) {
      const Paidplansdata = allPlans?.filter((plan: any) => plan?.plan_choice?.includes("PAID"));
      setPaidPlans(Paidplansdata)
    }
  }, [allPlans]);

  return (
    <div className={classes.root}>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <FeaturesTab
            items={[
              {
                label: `All Plans (${TotalPlanscount})`,
                content: <Planview allPlans={allPlans} />,
              },
              {
                label: `Free (${Freeplans?.length})`,
                content: <FreePlanview Freeplans={Freeplans} />,
              },
              {
                label: `Paid (${PaidPlans?.length})`,
                content: <PaidPlanview PaidPlans={PaidPlans} />,
              },
            ]}
          />
        </Grid>
      </Grid>
    </div>
  );
};

export default PlanTab;
