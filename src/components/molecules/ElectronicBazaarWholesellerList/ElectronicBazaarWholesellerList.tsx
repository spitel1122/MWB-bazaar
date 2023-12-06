import React, { useEffect, useState } from "react";
import { usewholesellerListStyles } from "@/static/stylesheets/molecules";
import { Dialog, Switch } from "@mui/material";
// import { Switch } from "@/components/atoms/Switch";
import NidFront from "@/static/images/mwb_nid_frnt.png";
import NidBack from "@/static/images/mwb_nid_back.png";
import { ActionButton } from "@/components/atoms/Button/ActionButton";
import { useWholesellerListStyles } from "@/static/stylesheets/screens";
import complete from "@/static/icons/complete.svg";
import fill from "@/static/icons/fill.svg";
import phone from "@/static/icons/phone.svg";
import contact from "@/static/icons/contact-phone.svg";
import calendar from "@/static/icons/calendar.svg";
import deleteagent from "@/static/icons/delete-agent.svg";
import { AppService } from "@/service/AllApiData.service";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { GridOptionButton } from "@/components/atoms/Button";
import { Alert, AlertError } from "@/alert/Alert";
import { Grid, Pagination } from "@mui/material";
import moment from "moment";
import { AddButton } from "@/components/atoms/Button";
import { SearchField } from "@/components/atoms/SearchField";
import CommonSelectElectronicBazaar from "@/components/atoms/CommonSelectElectronicBazaar/CommonSelectElectronicBazaar";

const ElectronicBazaarWholesellerList = (props: any) => {
  const navigate = useNavigate();
  const location = useLocation();
  const { id } = useParams()
  const classes = usewholesellerListStyles();
  const wholeSellerListStyles = useWholesellerListStyles();
  const [getAllWholeseller, setGetAllWholeseller] = useState([]);
  const [totalCount, SetTotalCount] = useState<number>(1);
  const [currentPage, setCurrentPage] = useState(1);
  const [getAllWholesellers, setGetAllWholesellers] = useState<any>([]);
  const [filterAllwholeseller, setfilterAllwholeseller] = useState<any>([]);
  const [filterAllwholesellerM, setfilterAllwholesellerM] = useState<any>([]);
  const [addModalOpen, setAddModalOpen] = useState(false);
  const [iDS] = useState(localStorage.getItem("IDS"));
  const [Allagents, setAllagents] = useState<any>([]);
  const [allDis, setAllDis] = useState<any>([]);
  const [AllState, setAllState] = useState<any>([]);
  const [AllCity, setAllCity] = useState<any>([]);
  const [AllBazaarData, setAllBazaarData] = useState<any>([]);
  const [bazaarList, setBazaarList] = useState([])
  const [stateList, setstateList] = useState([])
  const [disList, setdisList] = useState([])
  const [cityList, setcityList] = useState([])
  const [AllAgentType, setAllAgentType] = useState<any>([]);
  const [agentTypeList, setagentTypeList] = useState<any>([]);
  const [AllActiveInactive, setAllActiveInactive] = useState<any>([]);
  const [activeInactiveList, setactiveInactiveList] = useState<any>([]);
  const [Allstatus, setAllstatus] = useState<any>([]);
  const [statusList, setstatusList] = useState<any>([]);
  const [searchK, setSearchK] = useState("");
  const [Allfilterwholeseller, setAllfilterwholeseller] = useState<any>([])
  const [wholesellerTypedata, setwholesellerTypedata] = useState<any>([]);
  const [Wholesellerlist, setWholesellerlist] = useState<any>([]);
  const [AllWholeseller, setAllWholeseller] = useState<any>([])
  console.log('Allfilterwholeseller', Allfilterwholeseller)
  useEffect(() => {
    getAgentAllLists()
    getAllWholesalerlistAPI()
  }, [])

  const IdParams = Number(id)

  const getAllLists = async () => {
    const responseJson = await AppService.getAllwholesellerList();
    setGetAllWholeseller(responseJson.data.results);
  };
  const getAgentAllLists = async () => {
    const responseJson = await AppService.getAllAgentList();
    setAllagents(responseJson.data.results)
  }
  const getAllWholesalerlistAPI = async () => {
    const responseJson = await AppService.getAllWholesellerListM()
    setAllWholeseller(responseJson.data.results)
  }

  const getAllListss = async (page: any) => {
    const responseJson = await AppService.getAllWholesellerListM({ page: page ? page : 1 });
    console.log("responseJson.data.results", responseJson.data.results);
    SetTotalCount(responseJson.data.count)
    setGetAllWholesellers(responseJson.data.results);
  };
  const handlePageChange = (event: any, value: any) => {
    setCurrentPage(value);
    getAllListss(value);
  };
  const getAllListssSearch = async () => {
    if (props.keys === "") {
    } else {
      const responseJson = await AppService.getAllBazarListwholesellerSearch(
        iDS,
        props.keys
      );

      console.log("decomposer", responseJson.data);
      if (location.pathname === "/wholesellerlist") {
        setGetAllWholeseller(responseJson.data.results);
      } else {
        setGetAllWholesellers(responseJson.data.results);
      }
    }
  };

  const handleDeleteFirm = async (index: number) => {
    if (window.confirm('Do You want to delete Wholeseller')) {
      let deleteuserid = getAllWholesellers[index].id;
      const responseJson = await AppService.deleteWholeseller(deleteuserid);
      if (responseJson.status == 204) {
        Alert('Wholeseller Delete Successfully');
        getAllListss(currentPage);
      }
    }
  }

  async function convertImageTobS4(imgUrl: string) {
    const imageToBase64 = require('image-to-base64/browser.js');
    let response = await imageToBase64(imgUrl);
    return "data:image/png;base64," + response;
  }
  const handleWholeSellerStatus = async (e: any, index: number, id: any) => {
    let textmsg = ""
    if (e.target.checked) {
      textmsg = "Do you want to active wholeseller ?";
    } else {
      textmsg = "Do you want to inactive wholeseller ?";
    }
    // alert(index);

    if (window.confirm(textmsg)) {
      let wSellertData = getAllWholesellers[index];
      console.log(wSellertData);
      wSellertData.wholeseller_active = e.target.checked;
      if (wSellertData.wholeseller_pan_card_image?.includes("https")) {
        wSellertData.wholeseller_pan_card_image = await convertImageTobS4(wSellertData.wholeseller_pan_card_image);
      }
      if (wSellertData.wholeseller_adhar_front_image?.includes("https")) {
        wSellertData.wholeseller_adhar_front_image = await convertImageTobS4(wSellertData.wholeseller_adhar_front_image);
      }
      if (wSellertData.wholeseller_adhar_back_image?.includes("https")) {
        wSellertData.wholeseller_adhar_back_image = await convertImageTobS4(wSellertData.wholeseller_adhar_back_image);
      }
      if (wSellertData.wholeseller_image?.includes("https")) {
        wSellertData.wholeseller_image = await convertImageTobS4(wSellertData.wholeseller_image);
      }
      const responseJson = await AppService.updateWholeseller(id, wSellertData);
      if (responseJson.status == 200) {
        if (e.target.checked) {
          Alert('Wholeseller Inactive Successfully');
        }
        else {
          Alert('Wholeseller Active Successfully');
        }
        getAllListss(currentPage);
      }
    }
  }

  useEffect(() => {
    if (AllWholeseller?.length > 0) {
      const matchingAgents = AllWholeseller?.filter((agent: any) => agent?.wholeseller_bazaar?.includes(IdParams));
      setAllfilterwholeseller(matchingAgents)
      setfilterAllwholeseller(matchingAgents)
      setfilterAllwholesellerM(matchingAgents)
    }
  }, [AllWholeseller]);

  useEffect(() => {
    getAllListssSearch();
    getAllLists();
    getAllListss(1);
  }, [props.keys]);

  useEffect(() => {
    getAllWholesellerTypeData()
    getAllWholesellerTypeAPI()
    getAllActiveInactive()
    getAllStatus()
    getAllStatusData()
  }, [])
  useEffect(() => {
    filterAllwholeseller?.map((item: any) => {
      getAllDis({ ids: item?.district }, "")
      getAllState({ ids: item?.state }, "")
      getAllCity({ ids: item?.city }, "")
    });
    getAllStateData()
    getAllDisData()
    getAllCityData()
    getAllAgentTypes()
    getAllAgentTypeData()
    getAllStatus()
    getAllStatusData()
    getAllActiveInactive()
    getAllActiveInactiveData()
    getAllWholesellerTypeAPI()
    getAllWholesellerTypeData()
  }, [filterAllwholeseller])

  const getAllWholesellerTypeAPI = async () => {
    const responseJson = await AppService.getAllListwholesellerNew();
    const arr = responseJson.data.results.map((item: any) => item.wholeseller_type_name);
    var uniqueArray = Array.from(new Set(arr));
    setwholesellerTypedata(uniqueArray);
  };
  const getAllWholesellerTypeData = async () => {
    if (wholesellerTypedata?.length > 0) {
      let tempState = wholesellerTypedata?.map((row: any) => {
        return {
          label: row,
          value: row,
        }
      })
      setWholesellerlist(tempState);
    }
  };

  const getAllDis = async (param: any, type: any) => {
    const responseJson = await AppService.getTotalDistrict(param)
    setAllDis(responseJson.data);
  };
  const getAllState = async (param: any, type: any) => {
    const responseJson = await AppService.getTotalCity(param)
    setAllState(responseJson.data);
  };
  const getAllCity = async (param: any, type: any) => {
    const responseJson = await AppService.getAllCity(param)
    setAllCity(responseJson.data.results);
  };
  const getAllStateData = async () => {
    const responseJson = await AppService.getTotalCity();
    let tempState = await responseJson.data.map((row: any) => {
      return {
        label: row.state,
        value: row.id,
      }
    })
    setstateList(tempState);
  };
  const getAllDisData = async () => {
    const responseJson = await AppService.getTotalDistrict();
    let tempState = await responseJson.data.map((row: any) => {
      return {
        label: row.district,
        value: row.id,
      }
    })
    setdisList(tempState);
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
    const responseJson = await AppService.getAllWholesellerListM();
    const arr = responseJson.data.results?.map((item: any) => {
      if (item?.wholeseller_active === true) {
        return true
      } else {
        return false
      }
    });
    var uniqueArray = Array.from(new Set(arr));
    setAllActiveInactive(uniqueArray);
  }
  const getAllActiveInactiveData = async () => {
    if (AllActiveInactive?.length > 0) {
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
    if (selectboxName === 'Wholeseller Type') {
      setWholesellerlist((prev: any) => {
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
    let temp1 = filterAllwholesellerM;
    // city
    if (temp1?.length && AllCity?.length) {
      let FCity = AllCity?.filter((b: any) => b.status === true)?.map((item: any) => item?.id)
      if (FCity?.length > 0) {
        for (const x of FCity) {
          temp1 = temp1?.filter((fc: any) => x === fc?.wholeseller_city_name)
        }
      }
    }
    // wholeseller type
    if (temp1?.length && Wholesellerlist?.length) {
      const selectedWholesellerType = Wholesellerlist?.filter((item: any) => item.status === true).map((item: any) => item.value);
      if (selectedWholesellerType?.length > 0) {
        temp1 = temp1?.filter((item: any) => selectedWholesellerType?.includes(item?.wholeseller_type_name));
      }
    }
    // Wholeseller status
    if (temp1?.length && statusList?.length) {
      const selectedStatus = statusList?.filter((item: any) => item.status === true).map((item: any) => item.value);
      if (selectedStatus?.length > 0) {
        temp1 = temp1?.filter((item: any) => selectedStatus?.includes(item?.wholeseller_status));
      }
    }
    // active / inactive
    if (temp1?.length && AllActiveInactive?.length) {
      const selectedActiveInactive = activeInactiveList?.filter((item: any) => item.status === true).map((item: any) => item.value);
      if (selectedActiveInactive?.length > 0) {
        temp1 = temp1?.filter((item: any) => selectedActiveInactive?.includes(item?.wholeseller_active));
      }
    }
    setAllfilterwholeseller(temp1)
  }, [filterAllwholesellerM, AllBazaarData, AllCity, AllState, allDis, activeInactiveList, statusList, Wholesellerlist])

  const handleCallback = (e: any) => {
    setSearchK(e);
  }

  return (
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
                label={"Wholeseller Type"}
                hint={"Select Wholeseller Type"}
                options={Wholesellerlist}
                handleSelect={handleChange}
                selectedIds={Wholesellerlist?.filter((item: any) => item?.status).map((elm: any) => elm?.value)}
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
              <AddButton label="Add Wholesaler" onClick={() => navigate('/addwholeseller')} />
            </div>
          </div>
        </Grid>
      </Grid>
      <div style={{ marginTop: "30px" }}>
        <table>
          <tr>
            <th>Name</th>
            <th>Contact Person</th>
            <th>City</th>
            <th>Bazaar</th>
            <th>Type</th>
            <th>Agent</th>
            <th>Status</th>
            <th>Plan Expiry</th>
            <th>Enable/Disable</th>
            <th></th>
          </tr>
          {Allfilterwholeseller?.filter((elm: any) => elm?.wholeseller_firm_name?.toLowerCase().includes(searchK) || elm?.wholeseller_city_name?.toLowerCase().includes(searchK) || elm?.wholeseller_type_name?.toLowerCase().includes(searchK))?.map((item: any, index: number) => (
            <tr>
              <td>{item.wholeseller_firm_name}</td>
              <td className="person-details">
                <div className="flex items-center gap-2 text-[#4E2FA9]">
                  <img className="brandLogo" src={contact} alt={"Logo"} />
                  {item.wholeseller_contact_per}
                </div>
                <div className="flex flex-col items-start gap-2 person-model">
                  <span className="job-title">Firm Manager</span>
                  <span className="text-sm text-[#2E2C34] font-medium">
                    {item.wholeseller_contact_per}
                  </span>
                  <span className="text-[13px] text-[#84818A] font-medium leading-5">
                    {item.wholeseller_city_name}, {item.wholeseller_state_name}
                  </span>
                  <span className="flex items-center gap-2 text-sm text-[#2E2C34] font-medium">
                    <img src={phone} alt="phone" /> {item.wholeseller_number}
                  </span>
                </div>
              </td>
              <td>{item.wholeseller_city_name}</td>
              <td className="overlap"> {item.wholeseller_bazaar_data.map((row: any) => row.bazaar_name)}</td>
              <td className="person-type">
                {item?.wholeseller_type_name}
              </td>
              <td className="person-details">
                <div className="flex items-center gap-2 text-[#4E2FA9]">
                  <img className="brandLogo" src={contact} alt={"Logo"} />
                  {Allagents?.map((elm: any) => {
                    if (elm?.id === item?.wholeseller_agent) {
                      return <span className="font-[500] text-[#2E2C34] text-[14px] font-[Manrope]">{elm?.agent_name}</span>
                    }
                  })}
                </div>
                <div className="flex flex-col items-start gap-2 person-model">
                  <span className="job-title">Salesman</span>
                  <span className="text-sm text-[#2E2C34] font-medium">
                    {Allagents?.map((elm: any) => {
                      if (elm?.id === item?.wholeseller_agent) {
                        return <span className="font-[500] text-[#2E2C34] text-[14px] font-[Manrope]">{elm?.agent_name}</span>
                      }
                    })}
                  </span>
                  <span className="text-[13px] text-[#84818A] font-medium leading-5">
                    {item.wholeseller_city_name}, {item.wholeseller_state_name}
                  </span>
                  <span className="flex items-center gap-2 text-sm text-[#2E2C34] font-medium">
                    <img src={phone} alt="phone" /> {item.wholeseller_number}
                  </span>
                </div>
              </td>
              <td style={{ paddingLeft: 0, fontSize: "12px" }}>
                {item.wholeseller_status == 'CREATED' && <div className="bg-[#e5f5ff] flex justify-center rounded-md p-[10px] w-[150px]">
                  <p className="text-[#28a1ff]">{item.wholeseller_status}</p>
                </div>}
                {item.wholeseller_status == 'PENDING' && <div className="bg-[#FFF6ED] flex justify-center rounded-md p-[10px] w-[150px]">
                  <p className="text-[#FFA043]">{item.wholeseller_status}</p>
                </div>}
                {item.wholeseller_status == 'KYCAPPROVED' && <div className="bg-[#e6fcf7] flex justify-center rounded-md p-[10px] w-[150px]">
                  <p className="text-[#00e0c0]">{item.wholeseller_status}</p>
                </div>}
                {item.wholeseller_status == 'KYCREJECTED' && <div className="bg-[#ffeae5] flex justify-center rounded-md p-[10px] w-[150px]">
                  <p className="text-[#ff0000]">{item.wholeseller_status}</p>
                </div>}
                {item.wholeseller_status == 'APPROVED' && <div className="bg-[#FFF6ED] flex justify-center rounded-md p-[10px] w-[150px]">
                  <p className="text-[#FFA043]">{item.wholeseller_status}</p>
                </div>}
              </td>
              <td>
                <div className="text-[#FFA043] text-sm font-medium">
                  {moment(item.created_at).format("DD MMM, YYYY")}
                </div>
              </td>
              <td>
                <div>
                  <Switch checked={item.wholeseller_active} onChange={(e: any) => handleWholeSellerStatus(e, index, item.id)} />
                </div>
              </td>
              <td>
                <div className="agent-dropdown" style={{ display: "flex", justifyContent: "end" }}>
                  <GridOptionButton
                    icon={"vertical-options"}
                    menus={[
                      {
                        label: (
                          <>
                            <span className="icon">
                              <img src={complete} alt="dots" />
                            </span>{" "}
                            Complete KYC
                          </>
                        ),
                        onClick() {
                          navigate(`/wholesellerkyc/${item.id}/KYC`)
                        },
                      },
                      {
                        label: (
                          <>
                            <span className="icon">
                              <img src={fill} alt="fill" />{" "}
                            </span>{" "}
                            Edit Firm
                          </>
                        ),
                        onClick() {
                          navigate(`/wholesellerkyc/${item.id}/EDIT`)
                        },
                      },
                      {
                        label: (
                          <>
                            <span className="icon">
                              <img src={deleteagent} alt="deleteagent" />{" "}
                            </span>
                            Delete Firm
                          </>
                        ),
                        onClick() {
                          handleDeleteFirm(index)
                        }
                      },
                      {
                        label: (
                          <>
                            <span className="icon">
                              <img src={calendar} alt="calendar" />{" "}
                            </span>{" "}
                            Renew Plan
                          </>
                        ),
                        onClick() {
                          navigate(`/renewplan/${item.id}`)
                        },
                      },
                    ]}
                  />
                </div>
              </td>
            </tr>
          ))}
        </table>
      </div>
      <Dialog
        open={addModalOpen}
        maxWidth={"lg"}
        sx={{
          ".MuiPaper-root": {
            borderRadius: "6px",
          },
        }}
        onClose={() => setAddModalOpen(false)}
      >
        <div className={wholeSellerListStyles.addDialog}>
          <div className="modalHead">
            <p className="modalTitle">Pending Approval</p>
            <div onClick={() => setAddModalOpen(false)}>X</div>
          </div>

          <div className="headTitle">
            <div>
              <p className="martTitle">Global Mart</p>
              <p className="martDescription">Wholesaler</p>
            </div>

            <div>
              <Switch />
            </div>
          </div>

          <div className="datContainer">
            <p className="dataTitle">Firm Address</p>
            <div>
              <p className="metaData">W 107b,Ahmadabad, Gujarat</p>
              <p className="dataDescription">Show Directions</p>
            </div>
          </div>

          <div className="datContainer">
            <p className="dataTitle">Firm Address</p>
            <div>
              <p className="metaData">W 107b,Ahmadabad, Gujarat</p>
              <p className="dataDescription">Show Directions</p>
            </div>
          </div>

          <div className="datContainer">
            <p className="dataTitle">Firm Address</p>
            <div>
              <p className="metaData">W 107b,Ahmadabad, Gujarat</p>
              <p className="dataDescription">Show Directions</p>
            </div>
          </div>

          <div className="attachment">
            <div className="attachmentHeader"></div>
            <img className="brandLogo" src={NidFront} alt={"Logo"} />
            <img className="brandLogo" src={NidBack} alt={"Logo"} />
          </div>

          <div>
            <div className={"action-bar"}>
              <ActionButton
                variant={"default"}
                title={"Cancel"}
                onClick={() => setAddModalOpen(false)}
              />

              <ActionButton
                variant={"primary"}
                title={"Approve"}
                onClick={() => setAddModalOpen(false)}
              />

              <ActionButton
                variant={"primary"}
                title={"Reject"}
                onClick={() => setAddModalOpen(false)}
              />
            </div>
          </div>
        </div>
      </Dialog>
    </div>
  );
}

export { ElectronicBazaarWholesellerList };
