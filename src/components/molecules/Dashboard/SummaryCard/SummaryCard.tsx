import React from "react";
import { useSummarycardStyle } from "@/static/stylesheets/molecules/summarycardStyle";

const SummaryCard = (summary:any) => {

  const classes = useSummarycardStyle();

  return (
    <div className={classes.root}>
      <div className={classes.bazaarCard}>
        <p className="headTitle">Total Bazar</p>
        <p className="headSubtitle">{summary?.bazaar ?summary?.bazaar :0}</p>
      </div>

      <div className={classes.wholesellerCard}>
        <div className="wholesellerItem">
          <p className="headTitle">Total Wholesellers</p>
          <p className="headSubtitle">{summary?.wholeseller ?summary?.wholeseller :0}</p>
        </div>
        <div>
          <p className="headTitle2" style={{ marginTop: 0 }}>Total Revenue Earned</p>
          <p className="headSubtitle2">Rs.</p>
        </div>
        <div>
          <p className="headTitle2" style={{ marginTop: 0 }}>No. of Bills</p>
          <p className="headSubtitle2"></p>
        </div>
      </div>

      <div className={classes.agentsCard}>
        <div className="agentItem">
          <p className="headTitle">Total Agents</p>
          <p className="headSubtitle">{summary?.agent ?summary?.agent :0}</p>
        </div>
        <div>
          <p className="headTitle2" style={{ marginTop: 0 }}>Commission Paid</p>
          <p className="headSubtitle2">Rs. {summary?.commission ?summary?.commission :0}</p>
        </div>
        <div>
          <p className="headTitle2" style={{ marginTop: 0 }}>Customers Generated</p>
          <p className="headSubtitle2"></p>
        </div>
      </div>
    </div>
  );
};

export { SummaryCard };
