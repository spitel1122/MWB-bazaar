import { ActionButton } from "@/components/atoms/Button/ActionButton";
import React, { useEffect, useState } from "react";
import { FaMapMarkerAlt } from "react-icons/fa";
import { HiPhone } from "react-icons/hi";
import { Switch } from "@mui/material";
import { useParams } from "react-router-dom";
import { AppService } from "@/service/AllApiData.service";
import { useAgentStyles } from "@/static/stylesheets/molecules";

interface Iprops {
    initialValues : any
}

function WholesellerDet(props : Iprops) {
  const classes = useAgentStyles();
  const { initialValues } = props

  console.log(initialValues)
  return (
    <div className={classes.nativeDialog}>
      <div className="modalHead" style={{ padding: "30px 30px 15px" }}>
        <p className="modalTitle">{initialValues?.wholeseller_status}</p>
      </div>
      <div className="headTitle" style={{ padding: "0 30px" }}>
        <div>
          <p className="martTitle">{initialValues?.wholeseller_firm_name}</p>
          <p className="martDescription">Agent</p>
        </div>

        <div>
          <span style={{ fontSize: "16px", fontWeight: 600 }}>
            {initialValues?.agent_active === true ? "Active" : "Inactive"}
          </span>
          {initialValues?.wholeseller_active === true ? (
            <Switch checked />
          ) : (
            <Switch disabled />
          )}
        </div>
      </div>
      <div className="datContainer" style={{ padding: "22px 30px" }}>
        <p className="dataTitle">Contact Detail</p>
        <div>
          <p className="metaData">{initialValues?.wholeseller_firm_name}</p>
          <p className="metaData flex gap-4 justify-end items-center py-[5px]">
            <HiPhone />
            {initialValues?.wholeseller_altranate_number}
          </p>
          <p className="metaData"> {initialValues?.wholeseller_email_id}</p>
        </div>
      </div>
      <div className="datContainer" style={{ padding: "22px 30px" }}>
        <p className="dataTitle"> Address</p>
        <div>
          <p className="metaData">
            {" "}
            {initialValues?.wholeseller_landmark},
            {initialValues?.wholeseller_city_name},{" "}
            {initialValues?.wholeseller_state_name}
          </p>
          <p className="dataDescription flex gap-4 justify-end items-center py-[5px]">
            <FaMapMarkerAlt />
            Show Directions
          </p>
        </div>
      </div>
      <div className="datContainer" style={{ padding: "22px 30px" }}>
        <p className="dataTitle">Bazaar</p>
        <div>
          <div className="flex gap-2">
            <div className="group relative">
              <button className="rounded bg-[#E6F6FF] px-4 py-2 text-sm text-[#00A5FF] shadow-sm">
                electronics
              </button>
              <span className="absolute top-10 scale-0 rounded bg-gray-800 p-2 text-xs text-white group-hover:scale-100">
                You hover me!
              </span>
            </div>

            <div className="group relative">
              <button className="rounded bg-[#E6F6FF] px-4 py-2 text-sm text-[#00A5FF] shadow-sm">
                electronics
              </button>
              <span className="absolute top-10 scale-0 rounded bg-gray-800 p-2 text-xs text-white group-hover:scale-100 ">
                You hover me!
              </span>
            </div>
          </div>
        </div>
      </div>
      <div className="datContainer" style={{ padding: "22px 30px" }}>
        <div>
          <p className="dataTitle" style={{ paddingBottom: "15px" }}>
            Aadhar
          </p>
          <p className="dataTitle">PAN</p>
        </div>
        <div>
          <p className="metaData" style={{ paddingBottom: "15px" }}>
            {initialValues?.wholeseller_adhar_no}
          </p>
          <p className="metaData">{initialValues?.wholeseller_firm_pan_no}</p>
        </div>
      </div>
      <div className="datContainer" style={{ padding: "22px 30px" }}>
        <div>
          <p className="dataTitle" style={{ paddingBottom: "15px" }}>
            Payment Status 
          </p>
          <p className="dataTitle">Payment Detail</p>
        </div>
        <div>
          <p className="metaData" style={{ paddingBottom: "15px" }}>
            {initialValues?.wholeseller_payment}
          </p>
          <p className="metaData">{initialValues?.wholeseller_payment_name}</p>
        </div>
      </div>
    </div>
  );
}

export default WholesellerDet;
