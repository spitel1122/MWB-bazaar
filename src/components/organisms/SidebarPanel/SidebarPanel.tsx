import React from "react";
import { useSidebarPanelStyles } from "@/static/stylesheets/organisms";
import Logo from "@/static/images/mwb_bazaar_dashboard_logo.png";

interface SidebarPanelProps {
  children?: React.ReactNode;
  isOpen: boolean;
}

const SidebarPanel: React.FC<SidebarPanelProps> = (props: any) => {
  const classes = useSidebarPanelStyles();
  const isOpen = props.isOpen
  return (
    <div className={isOpen ? classes.brandContainermain : classes.root}>
      <div className={classes.brandLogoContainer}>
        <img src={Logo} alt={"Logo"} />
      </div>

      <div className={classes.menuContainer}>
        <div className={"wrapper"}>{props?.children}</div>
      </div>
    </div>
  );
};

export { SidebarPanel };
