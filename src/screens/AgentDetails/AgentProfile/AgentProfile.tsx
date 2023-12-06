import React from "react";
import { useAgentDetailsStyle } from "@/static/stylesheets/screens";
import { RiAttachment2 } from "react-icons/ri";
import { HiPhone } from "react-icons/hi";
import { FaMapMarkerAlt } from "react-icons/fa";
import { Grid } from "@mui/material";
interface AgentProfileType {
    data?: any;
    id?: any;
}
const AgentProfile: React.FC<AgentProfileType> = ({ data }) => {
    const classes = useAgentDetailsStyle();

    return (
        <>
            <div className={classes.root}>
                {/*Contact Container*/}
                <Grid container spacing={2}>
                    <Grid item lg={6} md={8} sm={12}>
                        <p className="border-b-2 py-[20px] agencydetailstitle">Agency Details</p>
                        <div className="flex justify-between py-[15px]">
                            <p className="agentTitle">Contact person</p>
                            <div className="agentSubtitle text-end">
                                <p className="py-[7px]">{data?.agent_name}</p>
                                <div className="flex gap-2 items-center justify-end">
                                    <HiPhone />
                                    <p className="py-[7px]">{data?.agent_number !== "" ? data?.agent_number : data?.agent_altranate_mobile_number}</p>
                                </div>
                                <p className="py-[7px]">{data?.agent_email}</p>
                            </div>
                        </div>

                        <div className="flex justify-between py-[20px] border-t-2">
                            <p className="agentTitle py-[7px]">Agency Address</p>
                            <div className="agentSubtitle text-end">
                                <p className="py-[7px]">{data?.agent_address}</p>
                                <div className="flex gap-2 items-center justify-end text-[#FF6652] cursor-pointer">
                                    <FaMapMarkerAlt />
                                    <p className="py-[7px]" onClick={() => alert('clicked')}>Show Direction</p>
                                </div>
                            </div>
                        </div>

                        <div className="flex justify-between py-[10px] border-t-2">
                            <div>
                                <p className="agentTitle py-[7px]">GST</p>
                                <p className="agentTitle py-[7px]">PAN</p>
                            </div>
                            <div className="agentSubtitle text-end">
                                <p className="py-[7px]">2674839927399</p>
                                <p className="py-[7px]">{data?.agent_pancard_no}</p>
                            </div>
                        </div>

                        <div className="flex gap-2 items-center border-t-2 mt-5 pt-[10px]" style={{ paddingBottom: "10px" }}>
                            <RiAttachment2 />
                            <p>Document</p>
                        </div>
                        <div className="flex gap-[3px]" style={{ flexWrap: "wrap" }}>
                            <img src={data?.agent_adhar_front_image} alt={"Logo"} style={{ width: "215px", height: "140px", border: "1px solid #e1e1e1", marginRight: "15px", borderRadius: "15px" }} />
                            <img src={data?.agent_pancard_image} alt={"Logo"} style={{ width: "215px", height: "140px", border: "1px solid #e1e1e1", borderRadius: "15px" }} />
                        </div>
                    </Grid>
                </Grid>

                {/*Agent Container*/}
                <Grid container spacing={2}>
                    <Grid item lg={6} md={8} sm={12}>
                        <div className="py-10px">
                            <p className="border-b-2 py-[20px] agencydetailstitle">Agency Details</p>
                            <div className="flex justify-between py-[15px]">
                                <p className="agentTitle">Agent Name</p>
                                <div className="agentSubtitle text-end">
                                    <p className="py-[7px]">{data?.agent_name}</p>
                                    <div className="flex gap-2 items-center justify-end">
                                        <HiPhone />
                                        <p className="py-[7px]">{data?.agent_number !== "" ? data?.agent_number : data?.agent_altranate_mobile_number}</p>
                                    </div>
                                    <p className="py-[7px]">{data?.agent_email}</p>
                                </div>
                            </div>
                            <div className="flex justify-between py-[15px] border-t-2">
                                <p className="agentTitle">Date of Birth</p>
                                <div className="agentSubtitle text-end">
                                    <p className="py-[7px]">{data?.agent_date_of_birth}</p>
                                </div>
                            </div>

                            <div className="flex justify-between py-[20px] border-t-2">
                                <p className="agentTitle py-[7px]">Agency Address</p>
                                <div className="agentSubtitle text-end">
                                    <p className="py-[7px]">{data?.agent_address}</p>
                                    <div className="flex gap-2 items-center justify-end text-[#FF6652] cursor-pointer">
                                        <FaMapMarkerAlt />
                                        <p className="py-[7px]" onClick={() => alert('clicked')}>Show Direction</p>
                                    </div>
                                </div>
                            </div>

                            <div className="flex justify-between py-[10px] border-t-2">
                                <div>
                                    <p className="agentTitle py-[7px]">Adhaar</p>
                                    <p className="agentTitle py-[7px]">PAN</p>
                                </div>
                                <div className="agentSubtitle text-end">
                                    <p className="py-[7px]">{data?.agent_adharcard_no}</p>
                                    <p className="py-[7px]">{data?.agent_pancard_no}</p>
                                </div>
                            </div>


                            <div className="flex gap-2 items-center border-t-2 mt-5 pt-[10px]" style={{ paddingBottom: "10px" }}>
                                <RiAttachment2 />
                                <p>Document</p>
                            </div>
                            <div className="flex gap-[3px]" style={{ flexWrap: "wrap" }}>
                                <img src={data?.agent_adhar_front_image} alt={"Logo"} style={{ width: "215px", height: "140px", border: "1px solid #e1e1e1", marginRight: "15px", borderRadius: "15px" }} />
                                <img src={data?.agent_pancard_image} alt={"Logo"} style={{ width: "215px", height: "140px", border: "1px solid #e1e1e1", borderRadius: "15px" }} />
                            </div>
                        </div>
                    </Grid>
                </Grid>
            </div>
        </>
    );
};

export default AgentProfile;
