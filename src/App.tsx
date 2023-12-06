import React, { useEffect } from "react";
import { Routes } from "@/routes";
import { GlobalStyles } from "@/static/stylesheets";
import { AppService } from "./service/AllApiData.service";
import "react-phone-input-2/lib/style.css";

function App() {
  const [isAnyModalOpen, setisAnyModalOpen] = React.useState(false);
  const getLogin = async () => {
    const responseJson = await AppService.login("mwb", "mwb@123");
  };
  useEffect(() => {
    getLogin();
  }, []);

  const handleModalBackdrop = (value: any) => {
    setisAnyModalOpen(value);
  };

  return (
    <div className={isAnyModalOpen ? "app-active" : "app"}>
      <GlobalStyles />
      <Routes handleModalBackdrop={handleModalBackdrop} />
    </div>
  );
}

export default App;