import React, { useEffect, useState } from "react";
import { DashboardLayout } from "@/components/layouts";
import { useWholesalerDetailsStyle } from "@/static/stylesheets/screens";
import { MdArrowBackIosNew } from "react-icons/md";
import { Avatar } from "@mui/material";
import { FeaturesTab } from "@/components/organisms/FeaturesTab";
import { FaUserAlt } from "react-icons/fa";
import { HiPhone } from "react-icons/hi";
import { useNavigate, useParams } from "react-router-dom";
import { AppService } from "@/service/AllApiData.service";
import WholesalerProfile from "./WholesalerProfile";
import { Grid } from "@mui/material";
import iconm from "@/static/images/Group 36025.png";
import moment from "moment";
import WholesalerRetailer from "./WholesalerRetailer";
import WholesalerBranches from "./WholesalerBranches";
import WholesalerProducts from "./WholesalerProducts";
import WholesalerReport from "./WholesalerReport";

const WholesalerDetails = (props: any) => {
  const classes = useWholesalerDetailsStyle();
  const navigate = useNavigate();
  const { id } = useParams();
  const [data, setData] = useState<any>();
  console.log('data', data)
  const handleModalBackdrop = props?.handleModalBackdrop

  const getsingleWholesaler = async (id: any) => {
    try {
      const response = await AppService.getWholesellerById(id);
      setData(response.data);
    } catch (error) {
      console.log("errrrrrr in kyc", error);
    }
  };

  useEffect(() => {
    getsingleWholesaler(id);
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
                  <MdArrowBackIosNew className="cursor-pointer" style={{ color: "#84818A" }} onClick={() => navigate('/wholesellerlist')} />
                  <div>
                    {data?.wholeseller_image ? <img src={data?.wholeseller_image} style={{ width: "80px", height: "80px", borderRadius: "20px", border: "1px solid #e1e1e1" }} /> : <Avatar sx={{ width: 80, height: 80, borderRadius: 4 }}>Logo</Avatar>}
                    <p className="agentHeadtitle py-[5px]" style={{ textTransform: "capitalize", paddingTop: "10px" }}>{data?.wholeseller_firm_name}</p>
                    <p className="agentSubtitle py-[5px]">Wholesaler</p>
                    <div className="statusTitle text-center cursor-pointer mt-[7px] rounded-md">
                      {data?.wholeseller_status == 'CREATED' && <div className="bg-[#e5f5ff] flex justify-center rounded-md p-[10px] w-[150px]">
                        <p className="text-[#28a1ff]">{data?.wholeseller_status}</p>
                      </div>}
                      {data?.wholeseller_status == 'PENDING' && <div className="bg-[#FFF6ED] flex justify-center rounded-md p-[10px] w-[150px]">
                        <p className="text-[#FFA043]">{data?.wholeseller_status}</p>
                      </div>}
                      {data?.wholeseller_status == 'KYCAPPROVED' && <div className="bg-[#e6fcf7] flex justify-center rounded-md p-[10px] w-[150px]">
                        <p className="text-[#00e0c0]">{data?.wholeseller_status}</p>
                      </div>}
                      {data?.wholeseller_status == 'KYCREJECTED' && <div className="bg-[#ffeae5] flex justify-center rounded-md p-[10px] w-[150px]">
                        <p className="text-[#ff0000]">{data?.wholeseller_status}</p>
                      </div>}
                      {data?.wholeseller_status == 'APPROVED' && <div className="bg-[#FFF6ED] flex justify-center rounded-md p-[10px] w-[150px]">
                        <p className="text-[#FFA043]">{data?.wholeseller_status}</p>
                      </div>}
                    </div>
                  </div>
                </div>
              </Grid>
              <Grid item lg={9} md={9} sm={9}>
                {/*portion two*/}
                <Grid container spacing={2}>
                  <Grid item lg={7} md={7} sm={7}>
                    <div className="p-[20px] rounded-md" style={{ display: "inline-block", width: "100%", border: "1px solid #e1e1e1" }}>
                      {/*head info*/}
                      <Grid container spacing={2}>
                        <Grid item xs={6}>
                          {/*Agent info*/}
                          <div className="flex gap-5" style={{ alignItems: "center" }}>
                            <Avatar sx={{ width: 32, height: 32, borderRadius: "8px" }}>
                              <FaUserAlt />
                            </Avatar>
                            <div>
                              <p className="agentTitle" style={{ paddingBottom: "5px" }}>Contact Person</p>
                              <p className="agentSubtitle">{data?.wholeseller_contact_per}</p>
                            </div>
                          </div>
                        </Grid>
                        <Grid item xs={6}>
                          {/*Agent Number*/}
                          <div className="flex gap-5" style={{ alignItems: "center" }}>
                            <Avatar sx={{ width: 32, height: 32, borderRadius: "8px" }}>
                              <HiPhone />
                            </Avatar>
                            <div>
                              <p className="agentTitle" style={{ paddingBottom: "5px" }}>Phone Number</p>
                              <p className="agentSubtitle" style={{ fontSize: "15px" }}>{data?.wholeseller_number !== "" ? data?.wholeseller_number : data?.wholeseller_altranate_number}</p>
                            </div>
                          </div>
                        </Grid>
                        <Grid item xs={6}>
                          {/*Agent Address*/}
                          <div className="flex gap-5" style={{ alignItems: "center" }}>
                            <Avatar sx={{ width: 32, height: 32, borderRadius: "8px" }}>
                              <FaUserAlt />
                            </Avatar>
                            <div>
                              <p className="agentTitle" style={{ paddingBottom: "5px" }}>Firm Address</p>
                              <p className="agentSubtitle">{data?.wholeseller_address}</p>
                            </div>
                          </div>
                        </Grid>
                      </Grid>
                    </div>
                  </Grid>
                  <Grid item lg={5} md={5} sm={5}>
                    <div className="p-[20px] rounded-md" style={{ display: "inline-block", height:"100%", border: "1px solid #e1e1e1" }}>
                      <div className="flex gap-[40px]">
                        <div className="flex gap-5" style={{ alignItems: "center" }}>
                          <div>
                            <img src={iconm} alt="icon" />
                          </div>
                          <div>
                            <p className="agentTitle" style={{ paddingBottom: "5px" }}>Plan</p>
                            <p className="agentSubtitle">{data?.wholeseller_plan_name}</p>
                          </div>
                        </div>
                      </div>
                      <button style={{ color: "#00A5FF", fontWeight: 600, fontSize: "13px", lineHeight: "18px", background: "rgba(0, 165, 255, 0.1)", padding: "6px 15px", margin: "20px 0 10px", borderRadius: "4px" }}>Expiry day: {moment(data?.created_at).format("DD MMM, YYYY")}</button>
                    </div>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          </div>
          {/*Tab*/}
          <div className="mt-[50px] border-t-2">
            <div className="pt-[20px]">
              <FeaturesTab
                items={[
                  {
                    label: "Profile",
                    content: <WholesalerProfile data={data} id={id} />,
                  },
                  {
                    label: "Retailers",
                    content: <WholesalerRetailer data={data} />,
                  },
                  {
                    label: "Products",
                    content: <WholesalerProducts data={data} handleModalBackdrop={handleModalBackdrop} />,
                  },
                  {
                    label: "Branches",
                    content: <WholesalerBranches data={data} />,
                  },
                  {
                    label: "Reports",
                    content: <WholesalerReport />,
                  }
                ]}
              />
            </div>
          </div>
        </div>
      </DashboardLayout >
    </>
  );
};

export default WholesalerDetails;
