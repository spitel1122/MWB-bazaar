import React from "react";
import { useAgentDetailsStyle } from "@/static/stylesheets/screens";
import { RiAttachment2 } from "react-icons/ri";
import { HiPhone } from "react-icons/hi";
import { FaMapMarkerAlt } from "react-icons/fa";
import { Grid } from "@mui/material";
import { AppService } from "@/service/AllApiData.service";
interface WholesalerProfileType {
  data?: any;
  id?: any;
}
const WholesalerProfile: React.FC<WholesalerProfileType> = ({ data }) => {
  const classes = useAgentDetailsStyle();
  const [Allagents, setAllagents] = React.useState<any>([]);

  React.useEffect(() => {
    getAgentAllLists()
  }, [])

  const getAgentAllLists = async () => {
    const responseJson = await AppService.getAllAgentList();
    setAllagents(responseJson.data.results)
  }
console.log('Allagents',Allagents)
  return (
    <>
      <div className={classes.root}>
        {/*Contact Container*/}
        <Grid container spacing={2}>
          <Grid item lg={6} md={8} sm={12}>
            <p className="py-[20px] agencydetailstitle" style={{ borderBottom: "1px solid #e1e1e1" }}>Agency Details</p>
            <div className="flex justify-between py-[15px]">
              <p className="agentTitle">Contact Person</p>
              <div className="agentSubtitle text-end">
                <p className="py-[7px]" style={{ fontSize: "14px" }}>{data?.wholeseller_contact_per}</p>
                <div className="flex gap-2 items-center justify-end">
                  <HiPhone />
                  <p className="py-[7px]" style={{ fontSize: "14px" }}>{data?.wholeseller_number !== "" ? data?.wholeseller_number : data?.wholeseller_altranate_number}</p>
                </div>
                <p className="py-[7px]" style={{ fontSize: "14px" }}>{data?.wholeseller_email_id}</p>
              </div>
            </div>
            <div className="flex justify-between py-[10px]" style={{ borderTop: "1px solid #e1e1e1" }}>
              <div>
                <p className="agentTitle py-[7px]">Aadhar</p>
                <p className="agentTitle py-[7px]">PAN</p>
              </div>
              <div className="agentSubtitle text-end">
                <p className="py-[7px]" style={{ fontSize: "14px" }}>{data?.wholeseller_adhar_no}</p>
                <p className="py-[7px]" style={{ fontSize: "14px" }}>{data?.wholeseller_firm_pan_no}</p>
              </div>
            </div>
            <div className="flex justify-between py-[20px]" style={{ borderTop: "1px solid #e1e1e1" }}>
              <p className="agentTitle py-[7px]">Firm Address</p>
              <div className="agentSubtitle text-end">
                <p className="py-[7px]">{data?.wholeseller_address}</p>
                <div className="flex gap-2 items-center justify-end text-[#FF6652] cursor-pointer">
                  <FaMapMarkerAlt />
                  <p className="py-[7px]" style={{ fontSize: "14px" }} onClick={() => alert('clicked')}>Show Direction</p>
                </div>
              </div>
            </div>
            <div className="flex justify-between py-[20px]" style={{ alignItems: "center", borderTop: "1px solid #e1e1e1" }}>
              <p className="agentTitle py-[7px]">Bazaar</p>
              <div className="agentSubtitle text-end">
                <div className="flex gap-2 items-center justify-end text-[#FF6652] cursor-pointer">
                  {data?.wholeseller_bazaar_data?.map((item: any, index: any) => {
                    return <div className="group relative" key={index}>
                      <button className="rounded bg-[#E6F6FF] px-4 py-2 text-sm text-[#00A5FF] shadow-sm" style={{ fontSize: "12px", marginLeft: "15px", marginTop: "5px" }}>
                        {item?.bazaar_name}
                      </button>
                    </div>
                  })}
                </div>
              </div>
            </div>
            <div className="flex justify-between py-[20px]" style={{ borderTop: "1px solid #e1e1e1" }}>
              <p className="agentTitle py-[7px]">State</p>
              <div className="agentSubtitle text-end">
                <p className="py-[7px]" style={{ fontSize: "14px" }}>{data?.wholeseller_state_name}</p>
              </div>
            </div>
            <div className="flex justify-between py-[20px]" style={{ borderTop: "1px solid #e1e1e1" }}>
              <p className="agentTitle py-[7px]">District</p>
              <div className="agentSubtitle text-end">
                <p className="py-[7px]" style={{ fontSize: "14px" }}>{data?.wholeseller_district_name}</p>
              </div>
            </div>
            <div className="flex justify-between py-[20px]" style={{ borderTop: "1px solid #e1e1e1" }}>
              <p className="agentTitle py-[7px]">City</p>
              <div className="agentSubtitle text-end">
                <p className="py-[7px]" style={{ fontSize: "14px" }}>{data?.wholeseller_city_name}</p>
              </div>
            </div>
            <div className="flex justify-between py-[20px]" style={{ borderTop: "1px solid #e1e1e1" }}>
              <p className="agentTitle">Agent</p>
              <div className="agentSubtitle text-end">
                <p className="py-[7px]" style={{ fontSize: "14px" }}>
                  {Allagents?.map((elm: any) => {
                    if (elm?.id === data?.wholeseller_agent) {
                      return <span className="font-[500] text-[14px] font-[Manrope]">{elm?.agent_name}</span>
                    }
                  })}
                </p>
                <div className="flex gap-2 items-center justify-end">
                  <HiPhone />
                  <p className="py-[7px]" style={{ fontSize: "14px" }}>
                    {Allagents?.map((elm: any) => {
                      if (elm?.id === data?.wholeseller_agent) {
                        return <span className="font-[500] text-[14px] font-[Manrope]">{elm?.agent_number}</span>
                      }
                    })}
                  </p>
                </div>
              </div>
            </div>
            <div className="flex justify-between py-[10px]" style={{ borderTop: "1px solid #e1e1e1" }}>
              <div>
                <p className="agentTitle py-[7px]">GST</p>
                <p className="agentTitle py-[7px]">PAN</p>
              </div>
              <div className="agentSubtitle text-end">
                {/* <p className="py-[7px]" style={{ fontSize: "14px" }}>
                  {Allagents?.map((elm: any) => {
                    if (elm?.id === data?.wholeseller_agent) {
                      return <span className="font-[500] text-[14px] font-[Manrope]">{elm?.agent_name}</span>
                    }
                  })}
                </p> */}
                {/* <p className="py-[7px]" style={{ fontSize: "14px" }}>
                  {Allagents?.map((elm: any) => {
                    if (elm?.id === data?.wholeseller_agent) {
                      return <span className="font-[500] text-[14px] font-[Manrope]">{elm?.agent_pancard_no}</span>
                    }
                  })}
                </p> */}
                <p className="py-[7px]" style={{ fontSize: "14px" }}>{data?.wholeseller_gst_no}</p>
                <p className="py-[7px]" style={{ fontSize: "14px" }}>{data?.wholeseller_firm_pan_no}</p>
              </div>
            </div>
            <div className="flex gap-2 items-center pt-[30px]" style={{ paddingBottom: "10px", borderTop: "1px solid #e1e1e1" }}>
              <RiAttachment2 />
              <p>Documents</p>
            </div>
            <div className="flex gap-[3px]" style={{ flexWrap: "wrap" }}>
              <img src={data?.wholeseller_adhar_front_image} alt={"Logo"} style={{ width: "215px", height: "140px", border: "1px solid #e1e1e1", marginRight: "15px", borderRadius: "15px" }} />
              <img src={data?.wholeseller_pan_card_image} alt={"Logo"} style={{ width: "215px", height: "140px", border: "1px solid #e1e1e1", borderRadius: "15px" }} />
            </div>
          </Grid>
        </Grid>
      </div>
    </>
  );
};

export default WholesalerProfile;
