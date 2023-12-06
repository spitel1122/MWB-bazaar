import React from "react";
import { PlanCard } from "./PlanCard";
import { Grid } from "@mui/material";

const Planview = (props: any) => {
  return (
    <div>
      <Grid container rowSpacing={1} columnSpacing={5}>
        {props?.allPlans?.map((item: any) => (
          <Grid item lg={3} md={4} sm={6} xs={12}>
            <PlanCard item={item} />
          </Grid>
        ))}
      </Grid>
    </div>
  );
};

export { Planview };
