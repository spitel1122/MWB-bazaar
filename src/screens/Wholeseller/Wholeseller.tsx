import React from "react";
import { DashboardLayout } from "@/components/layouts";
import { SectionHeader } from "@/components/molecules/Bazaars";
import { NoWholeseller } from "@/components/molecules/NoWholeseller";

const Wholeseller = () => {

  return (
    <>
      <DashboardLayout>
        <SectionHeader />
        <NoWholeseller />
      </DashboardLayout>
    </>
  );
};

export default Wholeseller;
