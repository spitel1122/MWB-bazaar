import React, { useState, useRef, useEffect } from "react";
import { useDashboardLayoutStyles } from "@/static/stylesheets/layouts";
import { AdminSidebar } from "@/components/molecules/AdminSidebar";
import { Header } from "@/components/molecules/Header";
import { useDetectClickOutside } from 'react-detect-click-outside';
interface DashboardLayoutProps {
  children?: React.ReactNode;
  sectionName?:String
}
const DashboardLayout: React.FC<DashboardLayoutProps> = (props) => {
  const classes = useDashboardLayoutStyles();
  const [isSidebarOpen, setSidebarOpen] = useState(false);
  const handleSidebarToggle = () => {
    setSidebarOpen(!isSidebarOpen);
  };
  const headerStickyClose = () => {
    if (isSidebarOpen) {
      setSidebarOpen(false);
    }
  };
  const stickyRef = useDetectClickOutside({ onTriggered: headerStickyClose });
  // const sidebarRef = useRef(null);
  useEffect(() => {
    const handleClickOutside = (event: any) => {
      // console.log('sidebarRef', sidebarRef);
      // if (sidebarRef.current && !sidebarRef.current.contains(event.target)) {
      //   setSidebarOpen(false);
      // }
    };
    window.addEventListener('mousedown', handleClickOutside);
    return () => {
      window.removeEventListener('mousedown', handleClickOutside);
    };
  }, [])
  return (
    <div className={classes.root} ref={stickyRef}>
      <AdminSidebar
        isOpen={isSidebarOpen}
      />
      <div className={classes.mainContainer}>
        <Header
          handleSidebarToggle={handleSidebarToggle}
        />
        <div className={`${classes.contentContainer} ${props.sectionName}`}>{props?.children}</div>
      </div>
    </div>
  );
};
export { DashboardLayout };