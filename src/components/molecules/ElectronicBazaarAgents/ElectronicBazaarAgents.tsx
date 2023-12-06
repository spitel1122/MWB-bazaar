import React, { useEffect, useState } from "react";
import { GridOptionButton } from "@/components/atoms/Button";
import { useAgentStyles } from "@/static/stylesheets/molecules";
import { AppService } from "../../../service/AllApiData.service";
import {
  Dialog,
  FormControl,
  FormControlLabel,
  Grid,
  Radio,
  RadioGroup,
  TextField,
  Switch
} from "@mui/material";
import { AddButton } from "@/components/atoms/Button";
import { SearchField } from "@/components/atoms/SearchField";
import CommonSelectElectronicBazaar from "@/components/atoms/CommonSelectElectronicBazaar/CommonSelectElectronicBazaar";
import { Alert, AlertError } from "@/alert/Alert";
import complete from "@/static/icons/complete.svg";
import icPhoneHandle from "@/static/icons/phoneHandle.svg";
import fill from "@/static/icons/fill.svg";
import calendar from "@/static/icons/calendar.svg";
import deleteagent from "@/static/icons/delete-agent.svg";
import { useNavigate, useParams } from "react-router-dom";
import { FaMapMarkerAlt } from "react-icons/fa";
import { HiPhone } from "react-icons/hi";
import { ActionButton } from "@/components/atoms/Button/ActionButton";

const ElectronicBazaarAgents = (props: any) => {
  const classes = useAgentStyles();
  const navigate = useNavigate()
  const { id } = useParams()
  const [getAllAgentList, setGetAllAgentList] = useState([]);
  const [searchK, setSearchK] = useState("");
  const [AllCity, setAllCity] = useState<any>([]);
  const [filterAgentlist, setfilterAgentlist] = useState<any>([]);
  const [filterallAgent, setfilterallAgent] = useState<any>([]);
  const [filterAllAgentM, setfilterAllAgentM] = useState<any>([]);
  const [AllBazaarData, setAllBazaarData] = useState<any>([]);
  const [editFormData, setEditFormData] = useState<any>();
  const [manageCommissionData, setManageCommissionData] = useState<any>({});
  const [addCommisionModalOpen, setAddCommitionModalOpen] = useState(false);
  const [addModalOpen, setAddModalOpen] = useState(false);
  const [addRejectModalOpen, setAddRejectModalOpen] = useState(false);
  const [allDis, setAllDis] = useState<any>([]);
  const [AllState, setAllState] = useState<any>([]);
  const [cityList, setcityList] = useState([])
  const [AllAgentType, setAllAgentType] = useState<any>([]);
  const [agentTypeList, setagentTypeList] = useState<any>([]);
  const [AllActiveInactive, setAllActiveInactive] = useState<any>([]);
  const [activeInactiveList, setactiveInactiveList] = useState<any>([]);
  const [Allstatus, setAllstatus] = useState<any>([]);
  const [statusList, setstatusList] = useState<any>([]);
  const [filterAllagentlist, setfilterAllagentlist] = useState<any>([])
  const [AllAgents, setAllAgents] = useState<any>([])

  useEffect(() => {
    getAllListss();
  }, []);
  const getAllListss = async () => {
    const responseJson = await AppService.getAllAgentList();
    setAllAgents(responseJson.data.results)
    setGetAllAgentList(responseJson.data.results);
    setfilterAgentlist(responseJson.data.results)
  };

  const IdParams = Number(id)

  useEffect(() => {
    if (AllAgents?.length > 0) {
      const matchingAgents = AllAgents?.filter((agent: any) => agent?.agent_bazaar?.includes(IdParams));
      setfilterAllagentlist(matchingAgents)
      setfilterallAgent(matchingAgents)
      setfilterAllAgentM(matchingAgents)
    }
  }, [AllAgents]);

  useEffect(() => {
    filterAgentlist?.map((item: any) => {
      getAllCity({ ids: item?.city }, "")
      getAllBazaarData({ ids: item?.bazaar }, "")
    });
  }, [getAllAgentList])

  const getAllBazaarData = async (param: any, type: any) => {
    const responseJson = await AppService.getAllBazaar(param)
    setAllBazaarData(responseJson.data.results);
  };

  const getAllCity = async (param: any, type: any) => {
    const responseJson = await AppService.getAllCity(param)
    setAllCity(responseJson.data.results);
  };

  const handleCallback = (e: any) => {
    setSearchK(e);
  }

  const handleAgentStatus = async (e: any, index: number, id: any) => {
    let textmsg = ""
    if (e.target.checked) {
      textmsg = "Do you want to active Agent ?";
    } else {
      textmsg = "Do you want to Inactive Agent ?";
    }

    if (window.confirm(textmsg)) {
      let agentData = getAllAgentList[index];
      // agentData.agent_active = e.target.checked;
      const responseJson = await AppService.kycApproveAgent(id, agentData);
      if (responseJson.status == 200) {
        if (e.target.checked) {
          Alert('Agent Inactive Successfully');
        }
        else {
          Alert('Agent Active Successfully');
        }
      }
      getAllListss()
    }
  }

  const [selectedTab, setSelectedTab] = useState<
    "PERPLAN" | "PERCUSTOMER"
  >("PERCUSTOMER");

  const handleDeleteAgent = async (id: any) => {
    if (window.confirm('Do You want to delete agent')) {
      const responseJson = await AppService.deleteAgent(id);
      if (responseJson.status == 204) {
        Alert('Agent Delete Successfully');
        getAllListss();
      }
    }
  }

  const handleAddCommissionModal = async (index: number) => {
    setEditFormData({ ...filterAllagentlist[index], index });
    let obj = {
      agent_commission_value_type: filterAllagentlist[index].agent_commission_value_type,
      agent_commission_type: filterAllagentlist[index].agent_commission_type,
      agent_commission_value: filterAllagentlist[index].agent_commission_value
    }
    setManageCommissionData(obj);
    setSelectedTab(filterAllagentlist[index].agent_commission_type);
    setAddCommitionModalOpen(true)
  }

  const handleAddCommissionSubmit = async () => {
    let data = manageCommissionData;
    data.agent_commission_type = selectedTab;
    let agentData = filterAllagentlist[editFormData.index];
    delete agentData.agent_commission_value;
    agentData = { ...agentData, ...data };
    try {
      const responseJson = await AppService.kycApproveAgent(agentData.id, agentData);
      if (responseJson.status == 200) {
        setAddCommitionModalOpen(false);
        Alert('Commission updated Successfully');
        getAllListss();
      }
    } catch (error: any) {
      setAddCommitionModalOpen(false);
      console.log("error", error);
      let message = error.response.data.type + "\n"
      error.response.data.errors.map((row: any) => {
        message += row.attr + " : " + row.detail + "\n"
      })
      AlertError(message);
    }
  }

  const handleEdit = (index: number) => {
    setEditFormData({ ...filterAgentlist[index], index });
    setAddModalOpen(true)
  }

  const handleKycApproveAgent = async (index: number, agent_status: string) => {
    let textmsg = ""
    if (agent_status == 'KYCAPPROVED') {
      textmsg = "Do You want to approve agent KYC ?";
    }
    if (agent_status == 'KYCREJECTED') {
      textmsg = "Do You want to reject agent KYC ?";
    }
    if (window.confirm(textmsg)) {
      let agentData = filterAgentlist[index];
      agentData.agent_status = agent_status;
      const responseJson = await AppService.kycApproveAgent(agentData.id, agentData);
      if (responseJson.status == 200) {
        setAddModalOpen(false);
        if (agent_status == 'KYCAPPROVED') {
          Alert('Agent KYC APPROVED Successfully');
        }
        if (agent_status == 'KYCREJECTED') {
          Alert('Agent KYC REJECTED Successfully');
        }
        getAllListss();
      }
    }
  }

  const manageCommissionDataChange = (e: any, valueType: string) => {
    let tempobj = {
      ...manageCommissionData,
      [e.target.name]: e.target.value
    };
    tempobj.agent_commission_value_type = valueType
    setManageCommissionData(tempobj);
  }

  useEffect(() => {
    getAllAgentTypes()
    getAllAgentTypeData()
    getAllActiveInactive()
    getAllActiveInactiveData()
  }, [])
  useEffect(() => {
    filterallAgent?.map((item: any) => {
      getAllDis({ ids: item?.district }, "")
      getAllState({ ids: item?.state }, "")
      getAllCity({ ids: item?.city }, "")
      getAllBazaarData({ ids: item?.bazaar }, "")
    });
    getAllCityData()
    getAllAgentTypes()
    getAllAgentTypeData()
    getAllActiveInactive()
    getAllActiveInactiveData()
    getAllStatus()
    getAllStatusData()
  }, [filterallAgent])

  const getAllDis = async (param: any, type: any) => {
    const responseJson = await AppService.getTotalDistrict(param)
    setAllDis(responseJson.data);
  };
  const getAllState = async (param: any, type: any) => {
    const responseJson = await AppService.getTotalCity(param)
    setAllState(responseJson.data);
  };
  const getAllCityData = async () => {
    const responseJson = await AppService.getAllCity();
    let tempState = await responseJson.data.results.map((row: any) => {
      return {
        label: row.city,
        value: row.id,
      }
    })
    setcityList(tempState);
  };
  const getAllAgentTypes = async () => {
    const responseJson = await AppService.getAllAgentList();
    const arr = responseJson.data.results.map((item: any) => item.agent_type);
    var uniqueArray = Array.from(new Set(arr));
    setAllAgentType(uniqueArray);
  }
  const getAllAgentTypeData = async () => {
    if (AllAgentType.length > 0) {
      let tempState = AllAgentType?.map((row: any) => {
        return {
          label: row,
          value: row,
        }
      })
      setagentTypeList(tempState);
    }
  };
  const getAllActiveInactive = async () => {
    const responseJson = await AppService.getAllAgentList();
    const arr = responseJson.data.results?.map((item: any) => {
      if (item?.agent_active === true) {
        return true
      } else {
        return false
      }
    });
    var uniqueArray = Array.from(new Set(arr));
    setAllActiveInactive(uniqueArray);
  }
  const getAllActiveInactiveData = async () => {
    if (AllActiveInactive.length > 0) {
      let tempState = AllActiveInactive.map((row: any) => {
        return {
          label: row === true ? "Enable" : "Disable",
          value: row === true ? true : false,
        }
      })
      setactiveInactiveList(tempState);
    }
  };
  const getAllStatus = async () => {
    const responseJson = await AppService.getAllAgentList();
    const arr = responseJson.data.results?.map((item: any) => item?.agent_status);
    var uniqueArray = Array.from(new Set(arr));
    setAllstatus(uniqueArray);
  }
  const getAllStatusData = async () => {
    if (Allstatus?.length > 0) {
      let tempState = Allstatus?.map((row: any) => {
        return {
          label: row,
          value: row,
        }
      })
      setstatusList(tempState);
    }
  };

  const handleChange = (selectboxName: string, id: any) => {
    if (selectboxName === 'City') {
      setAllCity((prev: any) => {
        return prev.map((item: any) => item.id === id ? {...item, status: !item.status} : item)
      });
    }
    if (selectboxName === 'Agent Type') {
      setagentTypeList((prev: any) => {
        return prev.map((item: any) => item.value === id ? {...item, status: !item.status} : item)
      });
    }
    if (selectboxName === 'Status') {
      setstatusList((prev: any) => {
        return prev.map((item: any) => item.value === id ? {...item, status: !item.status} : item)
      });
    }
    if (selectboxName === 'Active/Inactive') {
      setactiveInactiveList((prev: any) => {
        return prev.map((item: any) => item.value === id ? {...item, status: !item.status} : item)
      });
    }
  }

  useEffect(() => {
    let temp1 = filterAllAgentM;
    // bazaar data
    if (filterAllAgentM?.length && AllBazaarData?.length) {
      let FBazaardata = AllBazaarData?.filter((b: any) => b.status === true)?.map((item: any) => item?.id)
      if (FBazaardata?.length > 0) {
        for (const x of FBazaardata) {
          temp1 = temp1?.filter((fp: any) => fp?.agent_bazaar?.includes(x))
        }
      }
    }
    // city
    if (temp1?.length && AllCity?.length) {
      let FCity = AllCity?.filter((b: any) => b.status === true)?.map((item: any) => item?.id)
      if (FCity?.length > 0) {
        for (const x of FCity) {
          temp1 = temp1?.filter((fc: any) => fc?.agent_assigned_city?.includes(x))
        }
      }
    }
    // state
    if (temp1?.length && AllState?.length) {
      let FState = AllState?.filter((b: any) => b.status === true)?.map((item: any) => item?.id)
      if (FState?.length > 0) {
        for (const x of FState) {
          temp1 = temp1?.filter((fs: any) => fs?.agent_assigned_state?.includes(x))
        }
      }
    }
    // district
    if (temp1?.length && allDis?.length) {
      let FDistrict = allDis?.filter((b: any) => b.status === true)?.map((item: any) => item?.id)
      if (FDistrict?.length > 0) {
        for (const x of FDistrict) {
          temp1 = temp1?.filter((fs: any) => fs?.agent_assigned_district?.includes(x))
        }
      }
    }
    // agent type
    if (temp1?.length && AllAgentType?.length) {
      const selectedAgentType = agentTypeList?.filter((item: any) => item.status === true).map((item: any) => item.value);
      if (selectedAgentType?.length > 0) {
        temp1 = temp1?.filter((item: any) => selectedAgentType?.includes(item?.agent_type));
      }
    }
    // agent status
    if (temp1?.length && statusList?.length) {
      const selectedStatus = statusList?.filter((item: any) => item.status === true).map((item: any) => item.value);
      if (selectedStatus?.length > 0) {
        temp1 = temp1?.filter((item: any) => selectedStatus?.includes(item?.agent_status));
      }
    }
    // active / inactive
    if (temp1?.length && AllActiveInactive?.length) {
      const selectedActiveInactive = activeInactiveList?.filter((item: any) => item.status === true).map((item: any) => item.value);
      if (selectedActiveInactive?.length > 0) {
        temp1 = temp1?.filter((item: any) => selectedActiveInactive?.includes(item?.agent_active));
      }
    }
    setfilterAllagentlist(temp1)
  }, [filterAllAgentM, AllBazaarData, AllCity, AllState, allDis, activeInactiveList, statusList, agentTypeList])

  return (
    <>
      <div className={classes.root}>
        <Grid container spacing={2}>
          <Grid item xs={6}>
            <div className="bazaarFilters pt-[20px]" style={{ display: "flex", alignItems: "center", flexWrap: "wrap" }}>
              <div style={{ marginRight: "10px", marginTop: "5px" }}>
                <CommonSelectElectronicBazaar
                  label={"City"}
                  hint={"Select City"}
                  options={cityList}
                  handleSelect={handleChange}
                  selectedIds={AllCity.filter((item: any) => item?.status).map((elm: any) => elm.id)}
                />
              </div>
              <div style={{ marginRight: "10px", marginTop: "5px" }}>
                <CommonSelectElectronicBazaar
                  label={"Agent Type"}
                  hint={"Select Agent Type"}
                  options={agentTypeList}
                  handleSelect={handleChange}
                  selectedIds={agentTypeList?.filter((item: any) => item?.status).map((elm: any) => elm?.value)}
                />
              </div>
              <div style={{ marginRight: "10px", marginTop: "5px" }}>
                <CommonSelectElectronicBazaar
                  label={"Status"}
                  hint={"Select Status"}
                  options={statusList}
                  handleSelect={handleChange}
                  selectedIds={statusList?.filter((item: any) => item?.status).map((elm: any) => elm?.value)}
                />
              </div>
              <div style={{ marginRight: "10px", marginTop: "5px" }}>
                <CommonSelectElectronicBazaar
                  label={"Active/Inactive"}
                  hint={"Select Active/Inactive"}
                  options={activeInactiveList}
                  handleSelect={handleChange}
                  selectedIds={activeInactiveList?.filter((item: any) => item?.status).map((elm: any) => elm?.value)}
                />
              </div>
            </div>
          </Grid>

          <Grid item xs={6}>
            <div className="leftContent">
              <form className="max-w-sm px-4">
                <div className="relative">
                  <SearchField parentCallback={handleCallback} />
                </div>
              </form>

              <div>
                <AddButton label="Add Agent" onClick={() => navigate('/addagent')} />
              </div>
            </div>
          </Grid>
        </Grid>
        <div style={{ marginTop: "30px" }}>
          <table>
            <tr>
              <th>Name</th>
              <th>Mobile Number</th>
              <th>City</th>
              <th>Bazaar</th>
              <th>Type</th>
              <th>Status</th>
              <th>Enable/Disable</th>
              <th></th>
              <th></th>
            </tr>
            {filterAllagentlist?.filter((elm: any) => elm?.agent_name?.toLowerCase().includes(searchK))?.map((item: any, index: any) => (
              <tr>
                <td>{item?.agent_name}</td>
                <td>{item?.agent_number || item?.agent_altranate_mobile_number}</td>
                <td>
                  {item?.agent_assigned_city?.map((items: any, index: any) => (
                    AllCity?.map((idx: any) => {
                      if (items === idx.id) {
                        const lastItemIndex = item.agent_assigned_city.length - 1;
                        return <span className="font-[500] text-[#2E2C34] text-[14px] font-[Manrope]">{idx.city}{index !== lastItemIndex && ', '}</span>
                      }
                    })
                  ))}
                </td>
                <td>
                  {item.agent_bazaar.map((items: any, index: any) => (
                    AllBazaarData?.map((idx: any) => {
                      if (items === idx.id) {
                        const lastItemIndex = item.agent_bazaar.length - 1;
                        return <span className="font-[500] text-[#2E2C34] text-[14px] font-[Manrope]">{idx.bazaar_name}{index !== lastItemIndex && ', '}</span>
                      }
                    })
                  ))}
                </td>
                <td>{item.agent_type}</td>
                <td>
                  {item.agent_status == 'CREATED' && <div className="bg-[#e5f5ff] flex justify-center rounded-md p-[10px] w-[150px]">
                    <p className="text-[#28a1ff]" style={{ fontSize: "12px", lineHeight: "18px" }}>{item.agent_status}</p>
                  </div>}
                  {item.agent_status == 'PENDING' && <div className="bg-[#FFF6ED] flex justify-center rounded-md p-[10px] w-[150px]">
                    <p className="text-[#FFA043]" style={{ fontSize: "12px", lineHeight: "18px" }}>{item.agent_status}</p>
                  </div>}
                  {item.agent_status == 'KYCAPPROVED' && <div className="bg-[#e6fcf7] flex justify-center rounded-md p-[10px] w-[150px]">
                    <p className="text-[#00e0c0]" style={{ fontSize: "12px", lineHeight: "18px" }}>{item.agent_status}</p>
                  </div>}
                  {item.agent_status == 'KYCREJECTED' && <div className="bg-[#ffeae5] flex justify-center rounded-md p-[10px] w-[150px]">
                    <p className="text-[#ff0000]" style={{ fontSize: "12px", lineHeight: "18px" }}>{item.agent_status}</p>
                  </div>}
                  {item.agent_status == 'APPROVED' && <div className="bg-[#FFF6ED] flex justify-center rounded-md p-[10px] w-[150px]">
                    <p className="text-[#FFA043]" style={{ fontSize: "12px", lineHeight: "18px" }}>{item.agent_status}</p>
                  </div>}
                </td>
                <td>
                  <div className="text-center">
                    {item.agent_status == 'CREATED' ? <Switch disabled /> : <Switch checked={item.agent_active} onChange={(e: any) => handleAgentStatus(e, index, item.id)} name="gilad" />}
                  </div>
                </td>
                <td style={{ paddingRight: 0 }}>
                  <div className="cursor-pointer" style={{ justifyContent: "end", display: "flex", paddingRight: 0 }}>
                    <GridOptionButton
                      icon={"vertical-options"}
                      menus={[
                        {
                          label: (
                            <>
                              <span className="icon">
                                <img src={complete} alt="dots" />
                              </span>
                              <p onClick={() => navigate(`/agentkyc/${item.id}`)}>
                                Complete KYC
                              </p>
                            </>
                          ),
                        },
                        {
                          label: (
                            <>
                              <span className="icon">
                                <img src={fill} alt="fill" />{" "}
                              </span>
                              <p onClick={() => handleEdit(index)}>
                                Edit Agent
                              </p>
                            </>
                          ),
                        },
                        {
                          label: (
                            <>
                              <span className="icon">
                                <img src={deleteagent} alt="deleteagent" />
                              </span>
                              Delete Agent
                            </>
                          ),
                          onClick() {
                            handleDeleteAgent(item.id)
                          },
                        },
                        {
                          label: (
                            <>
                              <span className="icon">
                                <img src={calendar} alt="calendar" />
                              </span>
                              <p
                                onClick={() =>
                                  handleAddCommissionModal(index)
                                }
                              >
                                Manage Commission
                              </p>
                            </>
                          ),
                        },
                      ]}
                    />
                  </div>
                </td>
              </tr>
            ))}
          </table>
        </div>

      </div>
      <Dialog
        open={addModalOpen}
        maxWidth={"lg"}
        style={{ maxHeight: "100%" }}
        sx={{
          "& .MuiDialog-container": {
            justifyContent: "flex-end",
            alignItems: "flex-end",
          },
          ".MuiPaper-root": {
            borderRadius: "6px",
          },
        }}
        PaperProps={{
          sx: {
            m: 0,
            top: 0,
            left: 10,
          },
        }}
        onClose={() => setAddModalOpen(false)}
      >
        <div className={classes.nativeDialog}>
          <div className="modalHead" style={{ padding: "30px 30px 15px" }}>
            <p className="modalTitle">{editFormData?.agent_status}</p>
            <div onClick={() => setAddModalOpen(false)}>
              <svg
                width="36"
                height="36"
                viewBox="0 0 36 36"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <circle cx="18" cy="18" r="18" fill="#fff" />
                <line
                  x1="24.7305"
                  y1="12.423"
                  x2="12.4268"
                  y2="24.7266"
                  stroke="#84818A"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                />
                <line
                  x1="24.3104"
                  y1="24.7266"
                  x2="12.0068"
                  y2="12.4229"
                  stroke="#84818A"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                />
              </svg>
            </div>
          </div>
          <div className="headTitle" style={{ padding: "0 30px" }}>
            <div>
              <p className="martTitle">{editFormData?.agent_name}</p>
              <p className="martDescription">Agent</p>
            </div>

            <div>
              <span style={{ fontSize: "16px", fontWeight: 600 }}>{editFormData?.agent_active === true ? "Active" : "Inactive"}</span>
              {editFormData?.agent_active === true ? <Switch checked /> : <Switch disabled />}
            </div>
          </div>
          <div className="datContainer" style={{ padding: "22px 30px" }}>
            <p className="dataTitle">Contact Detail</p>
            <div>
              <p className="metaData">{editFormData?.agent_name}</p>
              <p className="metaData flex gap-4 justify-end items-center py-[5px]">
                <HiPhone />
                {editFormData?.agent_number}
              </p>
              <p className="metaData"> {editFormData?.agent_email}</p>
            </div>
          </div>
          <div className="datContainer" style={{ padding: "22px 30px" }}>
            <p className="dataTitle"> Address</p>
            <div>
              <p className="metaData"> {editFormData?.agent_landmark},{editFormData?.agent_city}, {editFormData?.agent_state}</p>
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
              <p className="dataTitle" style={{ paddingBottom: "15px" }}>Aadhar</p>
              <p className="dataTitle">PAN</p>
            </div>
            <div>
              <p className="metaData" style={{ paddingBottom: "15px" }}>{editFormData?.agent_adharcard_no}</p>
              <p className="metaData">{editFormData?.agent_pancard_no}</p>
            </div>
          </div>
          <div className="attachment" style={{ padding: "22px 30px", flexWrap: "wrap" }}>
            {editFormData?.agent_adhar_front_image && <img className="brandLogo" src={editFormData?.agent_adhar_front_image} alt={"Logo"} style={{ width: "215px", height: "140px", border: "1px solid #D1D0D3", borderRadius: "10px" }} />}
            {editFormData?.agent_adhar_back_image && <img className="brandLogo" src={editFormData?.agent_adhar_back_image} alt={"Logo"} style={{ width: "215px", height: "140px", border: "1px solid #D1D0D3", borderRadius: "10px" }} />}
            {editFormData?.agent_pancard_image && <img className="brandLogo" src={editFormData?.agent_pancard_image} alt={"Logo"} style={{ width: "215px", height: "140px", border: "1px solid #D1D0D3", borderRadius: "10px" }} />}
          </div>
          <div className={"action-bar"} style={{ padding: "22px 30px", flexWrap: "wrap", marginTop: 0 }}>
            <ActionButton
              variant={"default"}
              title={"Cancel"}
              onClick={() => setAddModalOpen(false)}
            />

            {editFormData?.agent_status != "CREATED" && <ActionButton
              variant={"primary"}
              title={"Approve"}
              onClick={() => handleKycApproveAgent(editFormData.index, 'KYCAPPROVED')}
            />}

            {editFormData?.agent_status != "CREATED" && <ActionButton
              variant={"primary"}
              title={"Reject"}
              onClick={() => handleKycApproveAgent(editFormData.index, 'KYCREJECTED')}
            />}
          </div>
        </div>
      </Dialog>

      <Dialog
        open={addRejectModalOpen}
        maxWidth={"lg"}
        sx={{
          ".MuiPaper-root": {
            borderRadius: "6px",
          },
        }}
        onClose={() => setAddModalOpen(false)}
      >
        <div className={classes.addDialog}>
          <div className="flex gap-5 justify-between">
            <p className="rejectModalTitle">Reject KYC</p>
            <div
              onClick={() => setAddRejectModalOpen(false)}
              className="cursor-pointer"
            >
              <svg
                width="36"
                height="36"
                viewBox="0 0 36 36"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <circle cx="18" cy="18" r="18" fill="#E1E1E1" />
                <line
                  x1="24.7305"
                  y1="12.423"
                  x2="12.4268"
                  y2="24.7266"
                  stroke="#84818A"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                />
                <line
                  x1="24.3104"
                  y1="24.7266"
                  x2="12.0068"
                  y2="12.4229"
                  stroke="#84818A"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                />
              </svg>
            </div>
          </div>
          <div className="pt-[20px]">
            <p className="fieldText">Reason</p>
            <TextField
              sx={{
                "& *": {
                  fontFamily: "Manrope !important",
                  fontSize: "14px",
                },
              }}
              variant="standard"
              fullWidth={true}
              name="agency_name"
            />
          </div>
          <div className="flex gap-4 justify-center items-center pt-[30px] pb-[10px]">
            <ActionButton
              variant={"default"}
              title={"Cancel"}
              onClick={() => setAddRejectModalOpen(false)}
            />

            <ActionButton
              variant={"primary"}
              title={"Reject KYC"}
              onClick={() => setAddRejectModalOpen(false)}
            />
          </div>
        </div>
      </Dialog>

      <Dialog
        open={addCommisionModalOpen}
        maxWidth={"lg"}
        sx={{
          ".MuiPaper-root": {
            borderRadius: "20px",
          },
        }}
        onClose={() => setAddModalOpen(false)}
      >
        <div className={classes.addDialog}>
          <div>
            <p className="comissionTitle pb-[30px]">Manage Commission</p>
            <div>
              <div className="radio-actionButton flex gap-5">
                <div className="radio-button">
                  <FormControl>
                    <RadioGroup
                      aria-labelledby="radio-buttons"
                      name="controlled-radio-buttons"
                      value={selectedTab}
                      onChange={() => setSelectedTab("PERCUSTOMER")}
                    >
                      <FormControlLabel
                        control={<Radio />}
                        checked={selectedTab === "PERCUSTOMER"}
                        label={
                          <div className="flex gap-4 items-center">
                            Per Customer
                          </div>
                        }
                      />
                    </RadioGroup>
                  </FormControl>
                </div>
                <div className="radio-button">
                  <FormControl>
                    <RadioGroup
                      aria-labelledby="radio-buttons"
                      name="controlled-radio-buttons"
                      value={selectedTab}
                      onChange={() => setSelectedTab("PERPLAN")}
                    >
                      <FormControlLabel
                        value="Online"
                        control={<Radio />}
                        checked={selectedTab === "PERPLAN"}
                        label={
                          <div className="flex gap-4 items-center">
                            Per Plan
                          </div>
                        }
                      />
                    </RadioGroup>
                  </FormControl>
                </div>
              </div>
              {selectedTab === "PERCUSTOMER" && (
                <>
                  <div className="pt-[20px] pb-[10px]">
                    <p className="fieldText">Enter Percentage</p>
                    <div className="w-[300px]">
                      <TextField
                        sx={{
                          "& *": {
                            fontFamily: "Manrope !important",
                            fontSize: "14px",
                          },
                        }}
                        variant="standard"
                        fullWidth={true}
                        name="agent_commission_value"
                        value={manageCommissionData.agent_commission_value_type == 'PERCENTAGE' ? manageCommissionData.agent_commission_value : ""}
                        onChange={(e) => manageCommissionDataChange(e, 'PERCENTAGE')}
                      />
                    </div>
                  </div>
                  <p className="py-[10px] fieldText"> Or </p>
                  <div className="pt-[40p] pb-[40px]">
                    <p className="fieldText">Set Amount</p>
                    <div className="w-[300px]">
                      <TextField
                        sx={{
                          "& *": {
                            fontFamily: "Manrope !important",
                            fontSize: "14px",
                          },
                        }}
                        variant="standard"
                        fullWidth={true}
                        name="agent_commission_value"
                        value={manageCommissionData.agent_commission_value_type == 'AMOUNT' ? manageCommissionData.agent_commission_value : ""}
                        onChange={(e) => manageCommissionDataChange(e, 'AMOUNT')}
                      />
                    </div>
                  </div>
                </>
              )}

              {selectedTab === "PERPLAN" && (
                <>
                  <div className="pt-[20px] pb-[10px]">
                    <p className="fieldText">Enter Percentage</p>
                    <div className="w-[300px]">
                      <TextField
                        sx={{
                          "& *": {
                            fontFamily: "Manrope !important",
                            fontSize: "14px",
                          },
                        }}
                        variant="standard"
                        fullWidth={true}
                        name="agent_commission_value"
                        value={manageCommissionData.agent_commission_value_type == 'PERCENTAGE' ? manageCommissionData.agent_commission_value : ""}
                        onChange={(e) => manageCommissionDataChange(e, 'PERCENTAGE')}
                      />
                    </div>
                  </div>
                  <p className="py-[10px] fieldText"> Or </p>
                  <div className="pt-[40p] pb-[40px]">
                    <p className="fieldText">Set Amount</p>
                    <div className="w-[300px]">
                      <TextField
                        sx={{
                          "& *": {
                            fontFamily: "Manrope !important",
                            fontSize: "14px",
                          },
                        }}
                        variant="standard"
                        fullWidth={true}
                        name="agent_commission_value"
                        value={manageCommissionData.agent_commission_value_type == 'AMOUNT' ? manageCommissionData.agent_commission_value : ""}
                        onChange={(e) => manageCommissionDataChange(e, 'AMOUNT')}
                      />
                    </div>
                  </div>
                </>
              )}
            </div>
          </div>
          <div className="flex gap-2">
            <ActionButton
              variant={"default"}
              title={"Cancel"}
              onClick={() => setAddCommitionModalOpen(false)}
            />

            <ActionButton
              variant={"primary"}
              title={"Update"}
              onClick={handleAddCommissionSubmit}
            />
          </div>
        </div>
      </Dialog>
    </>
  );
};

export { ElectronicBazaarAgents };
