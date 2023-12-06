import React from "react";
import { DashboardLayout } from "@/components/layouts";
import CommonSelect from "@/components/atoms/CommonSelect/CommonSelect";
import { ActionButton } from "@/components/atoms/Button/ActionButton";
import { useBranchPlanStyles } from "@/static/stylesheets/screens";
import { PlanLogDataTable } from "@/components/molecules/PlanLogDataTable";

const BranchPlan = () => {
  const classes = useBranchPlanStyles();

  return (
    <>
      <DashboardLayout>
        <div className={classes.root}>
          <div>
            <p className="pageTitle">Category Wise Plans</p>
          </div>

          <div className="flex gap-5 py-5">
            <ActionButton title="Retailer" variant="primary" />
            <ActionButton title="Hotellier" variant="default" />
            <ActionButton title="Semi-Wholeseller" variant="default" />
          </div>
          <div className="flex gap-5 py-5">
              {/* <CommonSelect /> */}
              {/* <CommonSelect /> */}
          </div>
          <div>
            <PlanLogDataTable />
          </div>
        </div>
      </DashboardLayout>
    </>
  );
};

export default BranchPlan;
