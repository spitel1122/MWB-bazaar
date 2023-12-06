import React from "react";
import { SidebarPanel } from "@/components/organisms/SidebarPanel";
import { MenuItem } from "@/components/organisms/SidebarPanel/MenuItem";
import DashboardIcon from "@mui/icons-material/Dashboard";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import CardMembershipIcon from "@mui/icons-material/CardMembership";
import ListIcon from "@mui/icons-material/List";
import SettingsIcon from "@mui/icons-material/Settings";
import BadgeIcon from "@mui/icons-material/Badge";
import { routePaths } from "@/routes";
import { AppService } from "@/service/AllApiData.service";

const AdminSidebar = (props: any) => {
  return (
    <>
      <SidebarPanel isOpen={props.isOpen}>
        <MenuItem
          href={routePaths.dashboard}
          icon={<DashboardIcon />}
          label={"Dashboard"}
        />
        <MenuItem
          href={routePaths.admin.bazaars}
          icon={<ShoppingCartIcon />}
          label={"All Bazaars"}
        />
        <MenuItem
          href={routePaths.wholesellerproducts}
          icon={<ShoppingCartIcon />}
          label={"Products"}
        />
        <MenuItem
          href={routePaths.wholesellerlist}
          icon={<ShoppingCartIcon />}
          label={"Wholesaler"}
        />
        <MenuItem
          href={"/plans"}
          icon={<CardMembershipIcon />}
          label={"Plans"}
        />
        <MenuItem href={"/agents"} icon={<BadgeIcon />} label={"Agents"} />
        <MenuItem href={"/advertisement"} icon={<ListIcon />} label={"Ads"} />
        <MenuItem href={"/mwb"} icon={<SettingsIcon />} label={"Routes"} />
        <MenuItem
          href={"/rolepermission"}
          icon={<SettingsIcon />}
          label={"Roles & Permissions"}
        />
        <MenuItem
          href={"/trackorder"}
          icon={<SettingsIcon />}
          label={"Activity Tracking"}
        />
        <MenuItem
          href={routePaths.admin.masterList}
          icon={<SettingsIcon />}
          label={"Master"}
        />
        <MenuItem
          href={routePaths.agentCommissionRedeemModel}
          icon={<SettingsIcon />}
          label={"Agent Commission Redeem Model"}
        />
      </SidebarPanel>
    </>
  );
};

export { AdminSidebar };
