import React from "react";
import { DashboardLayout } from "@/components/layouts";
import { FeaturesTab } from "@/components/organisms/FeaturesTab";
import { useMasterListStyles } from "@/static/stylesheets/screens";
import { MasterListGrid } from "@/components/molecules/Admin/MasterListGrid";
import { Locations } from "@/components/molecules/Admin/Locations";
import { Units } from "@/components/molecules/Admin/Units";
import CreateFetures from "@/screens/CreateFetures";

const MasterList = () => {
  const classes = useMasterListStyles();
  const [wcount, setwCount] = React.useState(0)
  const [Rcount, setRCount] = React.useState(0)

  const wholesellercount = (count: any) => {
    setwCount(count)
  }
  const reatilercount = (count: any) => {
    setRCount(count)
  }
  return (
    <>
      <DashboardLayout>
        <div className={classes.root}>
          <div className={classes.pageTitle}>Master List</div>
          <FeaturesTab
            items={[
              // {
              //   label: "Location",
              //   content: <Locations />,
              // },
              {
                label: "Wholesaler (" + wcount + ")",
                content: <MasterListGrid type={"WholeSeller"} wholesellerCount={wholesellercount} />,
              },
              {
                label: "Retailer (" + Rcount + ")",
                content: <MasterListGrid type={"Retailer"} reatilercount={reatilercount} />,
              },
              {
                label: "Create Plan Features",
                content: <CreateFetures />,
              },
              {
                label: "Units",
                content: <Units />,
              },
            ]}
          />
        </div>
      </DashboardLayout>
    </>
  );
};

export default MasterList;
