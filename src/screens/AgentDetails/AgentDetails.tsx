import React, { useEffect, useState } from "react";
import { DashboardLayout } from "@/components/layouts";
import { useAgentDetailsStyle } from "@/static/stylesheets/screens";
import { MdArrowBackIosNew } from "react-icons/md";
import { Avatar } from "@mui/material";
import { FeaturesTab } from "@/components/organisms/FeaturesTab";
import AgentWholeseller from "@/screens/AgentDetails/AgentWholeseller";
import AgentPayment from "@/screens/AgentDetails/AgentPayment";
import AgentReport from "@/screens/AgentDetails/AgentReport";
import { FaUserAlt } from "react-icons/fa";
import { HiPhone } from "react-icons/hi";
import { useNavigate, useParams } from "react-router-dom";
import { AppService } from "@/service/AllApiData.service";
import AgentProfile from "./AgentProfile";
import { Grid } from "@mui/material";

const AgentDetails = () => {
    const classes = useAgentDetailsStyle();
    const navigate = useNavigate();
    const { id } = useParams();
    const [data, setData] = useState<any>();
    console.log('data', data)

    const getOneAgent = async (id: any) => {
        try {
            const response = await AppService.getAgentById(id);
            setData(response.data);
        } catch (error) {
            console.log("errrrrrr in kyc", error);
        }
    };

    useEffect(() => {
        getOneAgent(id);
    }, []);

    return (
        <>
            <DashboardLayout>
                <div className={classes.root}>
                    <div>
                        {/*Grid Box*/}
                        <Grid container spacing={2}>
                            <Grid item lg={3} md={3} sm={3}>
                                {/*portion one*/}
                                <div className="flex gap-4">
                                    <MdArrowBackIosNew className="cursor-pointer" style={{ color: "#84818A" }} onClick={() => navigate('/agents')} />
                                    <div>
                                        {data?.agent_image ? <img src={data?.agent_image} style={{ width: "80px", height: "80px", borderRadius: "20px", border: "1px solid #e1e1e1" }} /> : <Avatar sx={{ width: 80, height: 80, borderRadius: 4 }}>Logo</Avatar>}
                                        <p className="agentHeadtitle py-[5px]" style={{ textTransform: "capitalize", paddingTop: "10px" }}>{data?.agent_name}</p>
                                        <p className="agentSubtitle py-[5px]">{data?.agent_type}</p>
                                        <p className="statusTitle bg-[#fff6ed] p-[7px] text-center cursor-pointer mt-[7px] rounded-md">{data?.agent_status}</p>
                                    </div>
                                </div>
                            </Grid>
                            <Grid item lg={9} md={9} sm={9} style={{ overflowX: "auto" }}>
                                {/*portion two*/}
                                <div className="p-[20px] border-2 rounded-md" style={{ display: "inline-block" }}>
                                    {/*head info*/}
                                    <div className="flex gap-[40px]">
                                        {/*Agent info*/}
                                        <div className="flex gap-5" style={{ alignItems: "center" }}>
                                            <Avatar sx={{ width: 40, height: 40, borderRadius: 4 }}>
                                                <FaUserAlt />
                                            </Avatar>
                                            <div>
                                                <p className="agentTitle" style={{ paddingBottom: "5px" }}>Agent Name</p>
                                                <p className="agentSubtitle">{data?.agent_name}</p>
                                            </div>
                                        </div>

                                        {/*Agent Number*/}
                                        <div className="flex gap-5">
                                            <Avatar sx={{ width: 40, height: 40, borderRadius: 4 }}>
                                                <HiPhone />
                                            </Avatar>
                                            <div>
                                                <p className="agentTitle" style={{ paddingBottom: "5px" }}>Phone Number</p>
                                                <p className="agentSubtitle" style={{ fontSize: "15px" }}>{data?.agent_number !== "" ? data?.agent_number : data?.agent_altranate_mobile_number}</p>
                                            </div>
                                        </div>
                                    </div>

                                    {/*Agent Address*/}
                                    <div className="pt-[30px]">
                                        <div className="flex gap-5">
                                            <Avatar sx={{ width: 40, height: 40, borderRadius: 4 }}>
                                                <FaUserAlt />
                                            </Avatar>
                                            <div>
                                                <p className="agentTitle" style={{ paddingBottom: "5px" }}>Address</p>
                                                <p className="agentSubtitle">{data?.agent_address}</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </Grid>
                        </Grid>
                    </div>
                    {/*Tab*/}
                    <div className="mt-[50px] border-t-2">
                        <div className="pt-[20px]" >
                            <FeaturesTab
                                items={[
                                    {
                                        label: "Profile",
                                        content: <AgentProfile data={data} id={id} />,
                                    },
                                    {
                                        label: "Wholesaler",
                                        content: <AgentWholeseller data={data} id={id} />,
                                    },
                                    {
                                        label: "Payments",
                                        content: <AgentPayment />,
                                    },
                                    {
                                        label: "Reports",
                                        content: <AgentReport />,
                                    },
                                ]}
                            />
                        </div>
                    </div>
                </div>
            </DashboardLayout>
        </>
    );
};

export default AgentDetails;
