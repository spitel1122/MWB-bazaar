import React, { useState, useEffect } from "react";
import { DashboardLayout } from "@/components/layouts";
import { SectionHeader } from "@/components/molecules/Bazaars";
import { useWholesellerListStyles } from "@/static/stylesheets/screens";
import { AddButton } from "@/components/atoms/Button";
import { AppService } from "@/service/AllApiData.service";
import CommonSelectElectronicBazaar from "@/components/atoms/CommonSelectElectronicBazaar/CommonSelectElectronicBazaar";
import { Checkbox, Dialog, ListItemText, MenuItem, Select, Switch, TextField } from "@mui/material";
// import { Switch } from "@/components/atoms/Switch";
import NidFront from "@/static/images/mwb_nid_frnt.png";
import NidBack from "@/static/images/mwb_nid_back.png";
import { ActionButton } from "@/components/atoms/Button/ActionButton";
import complete from "@/static/icons/complete.svg";
import fill from "@/static/icons/fill.svg";
import phone from "@/static/icons/phone.svg";
import contact from "@/static/icons/contact-phone.svg";
import calendar from "@/static/icons/calendar.svg";
import deleteagent from "@/static/icons/delete-agent.svg";
import { useLocation, useNavigate } from "react-router-dom";
import { GridOptionButton } from "@/components/atoms/Button";
import { Alert } from "@/alert/Alert";
import { Grid, Pagination } from "@mui/material";
import moment from "moment";
import { FaMapMarkerAlt } from "react-icons/fa";
import { HiPhone } from "react-icons/hi";
import Pinimage from "@/static/images/Vector (9).png";
import closeicon from "@/static/images/Vector (10).png"
import Loading from "@/components/LoadingCom/Loading";

const Wholeseller = (props: any) => {
  const classes = useWholesellerListStyles();
  const navigate = useNavigate();
  const location = useLocation();
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
  const [wholesellerTypedata, setwholesellerTypedata] = useState<any>([]);
  const [Wholesellerlist, setWholesellerlist] = useState<any>([]);
  const [Wholesalerbranch, setWholesalerbranch] = useState<any>([]);
  const [editFormData, setEditFormData] = useState<any>();
  console.log('editFormData', editFormData)
  const [searchK, setSearchK] = useState("")
  const [loading,setloading] = useState(true)


  useEffect(() => {
    getAgentAllLists()
    getWholesalerBranchAPI()
  }, [])

  useEffect(()=>{
    setTimeout(() => {
      handlePageChange("e",currentPage)
    }, 4000);
  },[])

  const getAllLists = async () => {
    const responseJson = await AppService.getAllwholesellerList();
    setGetAllWholeseller(responseJson.data.results);
  };
  const getAgentAllLists = async () => {
    const responseJson = await AppService.getAllAgentList();
    setAllagents(responseJson.data.results)
  }
  const getAllListss = async (page: any) => {
    const responseJson = await AppService.getAllWholesellerListM({ page: page ? page : 1 });
    SetTotalCount(responseJson.data.count)
    if(responseJson.data.results){
      setloading(false)
    }
    setGetAllWholesellers(responseJson.data.results);
    setfilterAllwholeseller(responseJson.data.results)
    setfilterAllwholesellerM(responseJson.data.results)
  };

  const handlePageChange = (event: any, value: any) => {
    console.log("first",value)
    setCurrentPage(value);
    getAllListss(value);
  };
  
  const getWholesalerBranchAPI = async () => {
    const res = await AppService.getWholesalerBranch()
    setWholesalerbranch(res.data.results)
  }
  
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

  const handleKycApproveAgent = async (index: number, wholeseller_status: string) => {
    let textmsg = ""
    if (wholeseller_status == 'KYCAPPROVED') {
      textmsg = "Do You want to approve wholeseller KYC ?";
    }
    if (wholeseller_status == 'KYCREJECTED') {
      textmsg = "Do You want to reject wholeseller KYC ?";
    }
    if (window.confirm(textmsg)) {
      let wholeseller = getAllWholesellers[index];
      wholeseller.wholeseller_status = wholeseller_status;
      if (wholeseller.wholeseller_pan_card_image.includes("https")) {
        wholeseller.wholeseller_pan_card_image = await convertImageTobS4(wholeseller.wholeseller_pan_card_image);
      }
      if (wholeseller.wholeseller_adhar_front_image.includes("https")) {
        wholeseller.wholeseller_adhar_front_image = await convertImageTobS4(wholeseller.wholeseller_adhar_front_image);
      }
      if (wholeseller.wholeseller_adhar_back_image.includes("https")) {
        wholeseller.wholeseller_adhar_back_image = await convertImageTobS4(wholeseller.wholeseller_adhar_back_image);
      }
      if (wholeseller.wholeseller_image.includes("https")) {
        wholeseller.wholeseller_image = await convertImageTobS4(wholeseller.wholeseller_image);
      }
      const responseJson = await AppService.kycApproveWholeseller(wholeseller.id, wholeseller);
      if (responseJson.status == 200) {
        setisshowmore(false);
        if (wholeseller_status == 'KYCAPPROVED') {
          Alert('Wholeseller KYC APPROVED Successfully');
        }
        if (wholeseller_status == 'KYCREJECTED') {
          Alert('Wholeseller KYC REJECTED Successfully');
        }
        getAllListss(currentPage);
      }
    }
  }
  
  const handleWholeSellerStatus = async (e: any, index: number, id: any,item:any) => {
    let textmsg = ""
    console.log(item,'itemitem')
    if (e.target.checked) {
      console.log()
      textmsg = "Do you want to active wholeseller ?";
    } else {
      textmsg = "Do you want to inactive wholeseller ?";
    }
    // alert(index);
    
    if (window.confirm(textmsg)) {
      let wSellertData = getAllWholesellers[index];
      console.log(wSellertData,"wSellertData");
      wSellertData.wholeseller_active = e.target.checked;
      if (wSellertData.wholeseller_pan_card_image?.includes("https")) {
        wSellertData.wholeseller_pan_card_image = await convertImageTobS4(wSellertData.wholeseller_pan_card_image);
      }
      else{
        wSellertData.wholeseller_pan_card_image = undefined
      }
      if (wSellertData.wholeseller_adhar_front_image?.includes("https")) {
        wSellertData.wholeseller_adhar_front_image = await convertImageTobS4(wSellertData.wholeseller_adhar_front_image);
      }
      else{
        wSellertData.wholeseller_adhar_front_image = undefined
      }
      if (wSellertData.wholeseller_adhar_back_image?.includes("https")) {
        wSellertData.wholeseller_adhar_back_image = await convertImageTobS4(wSellertData.wholeseller_adhar_back_image);
      }
      else{
        wSellertData.wholeseller_adhar_back_image = undefined
      }
      if (wSellertData.wholeseller_image?.includes("https")) {
        wSellertData.wholeseller_image = await convertImageTobS4(wSellertData.wholeseller_image);
      }
      else{
        wSellertData.wholeseller_image = undefined
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
    getAllLists();
    getAllListss(1);
    getAllAgentTypes()
    getAllAgentTypeData()
    getAllWholesellerTypeAPI()
    getAllWholesellerTypeData()
    getAllActiveInactive()
    getAllActiveInactiveData()
    getAllStatus()
    getAllStatusData()
    handlePageChange("e",currentPage)
  }, []);
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
    getAllWholesellerTypeAPI()
    getAllWholesellerTypeData()
    getAllActiveInactive()
    getAllActiveInactiveData()
    getAllStatus()
    getAllStatusData()
  }, [filterAllwholeseller])
  
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
    const responseJson = await AppService.getAllListwholesellerNew();
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
    const responseJson = await AppService.getAllListwholesellerNew();
    const arr = responseJson.data.results?.map((item: any) => item?.wholeseller_status);
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
    console.log(id,"idid")
    if (selectboxName === 'State') {
      setAllState((prev: any) => {
        return prev.map((item: any) => item.id === id ? { ...item, status: !item.status } : item)
      });
    }
    if (selectboxName === 'District') {
      setAllDis((prev: any) => {
        return prev.map((item: any) => item.id === id ? { ...item, status: !item.status } : item)
      });
    }
    if (selectboxName === 'City') {
      setAllCity((prev: any) => {
        return prev.map((item: any) => item.id === id ? { ...item, status: !item.status } : item)
      });
    }
    if (selectboxName === 'Wholesaler Type') {
      setWholesellerlist((prev: any) => {
        return prev.map((item: any) => item.value === id ? { ...item, status: !item.status } : item)
      });
    }
    if (selectboxName === 'Agent Type') {
      setagentTypeList((prev: any) => {
        return prev.map((item: any) => item.value === id ? { ...item, status: !item.status } : item)
      });
    }
    if (selectboxName === 'Status') {
      setstatusList((prev: any) => {
        return prev.map((item: any) => item.value === id ? { ...item, status: !item.status } : item)
      });
    }
    if (selectboxName === 'Active/Inactive') {
      setactiveInactiveList((prev: any) => {
        return prev.map((item: any) => item.value === id ? { ...item, status: !item.status } : item)
      });
    }
  }

  useEffect(() => {
    let temp1 = filterAllwholesellerM;
    // city
    if (temp1?.length && AllCity?.length) {
      let FCity = AllCity?.filter((b: any) => b.status === true)?.map((item: any) => item?.id)
      if (FCity?.length > 0) {
        temp1 = temp1?.filter((item: any) => FCity?.includes(item?.wholeseller_city));
      }
    }
    // state
    if (temp1?.length && AllState?.length) {
      let FState = AllState?.filter((b: any) => b?.status === true)?.map((item: any) => item?.id)
      if (FState?.length > 0) {
        temp1 = temp1?.filter((item: any) => FState?.includes(item?.wholeseller_state));
      }
    }
    // district
    if (temp1?.length && allDis?.length) {
      let FDistrict = allDis?.filter((b: any) => b.status === true)?.map((item: any) => item?.id)
      if (FDistrict?.length > 0) {
        temp1 = temp1?.filter((item: any) => FDistrict?.includes(item?.wholeseller_district));
      }
    }
    // wholeseller type
    if (temp1?.length && Wholesellerlist?.length) {
      const selectedWholesellerType = Wholesellerlist?.filter((item: any) => item.status === true).map((item: any) => item.value);
      if (selectedWholesellerType?.length > 0) {
        temp1 = temp1?.filter((item: any) => selectedWholesellerType?.includes(item?.wholeseller_type_name));
      }
    }
    // agent type
    if (temp1?.length && agentTypeList?.length) {
      const selectedAgentType = agentTypeList?.filter((item: any) => item.status === true).map((item: any) => item.value);
      if (selectedAgentType?.length > 0) {
        temp1 = temp1?.filter((item: any) => selectedAgentType?.includes(item?.agent_type));
      }
    }
    // wholeseller status
    if (temp1?.length && statusList?.length) {
      const selectedStatus = statusList?.filter((item: any) => item.status === true).map((item: any) => item.value);
      if (selectedStatus?.length > 0) {
        temp1 = temp1?.filter((item: any) => selectedStatus?.includes(item?.wholeseller_status));
      }
    }
    // active / inactive
    if (temp1?.length && activeInactiveList?.length) {
      const selectedActiveInactive = activeInactiveList?.filter((item: any) => item.status === true).map((item: any) => item.value);
      if (selectedActiveInactive?.length > 0) {
        temp1 = temp1?.filter((item: any) => selectedActiveInactive?.includes(item?.wholeseller_active));
      }
    }
    setGetAllWholesellers(temp1)
  }, [filterAllwholesellerM, AllCity, AllState, allDis, activeInactiveList, statusList, agentTypeList, Wholesellerlist])

  const [isshowmore, setisshowmore] = useState(false);

  const handleModalBackdrop = props.handleModalBackdrop
  const useClickOutside = (ref: React.RefObject<HTMLElement>, onClickOutside: () => void) => {
    useEffect(() => {
      const handleClickOutside = (event: MouseEvent) => {
        if (ref.current && !ref.current.contains(event.target as Node)) {
          onClickOutside();
        }
      };
      document.addEventListener('mousedown', handleClickOutside);
      return () => {
        document.removeEventListener('mousedown', handleClickOutside);
      };
    }, [ref, onClickOutside]);
  };
  // const viewkycRef = useDetectClickOutside({ onTriggered: closeViewKycModal });
  const viewkycRef = React.useRef(null);
  useClickOutside(viewkycRef, () => setisshowmore(false));

  useEffect(() => {
    if (isshowmore) {
      handleModalBackdrop(true);
    } else if (!isshowmore) {
      handleModalBackdrop(false);
    }
  }, [isshowmore]);

  const ViewKYCForm = (index: number) => {
    setEditFormData({ ...getAllWholesellers[index], index });
    setisshowmore(true)
  }

  console.log("Wholesellerlist",AllCity)

  return (
    <>
      <DashboardLayout>
        {
          loading ? <Loading/> : 
        <div className={classes.root}>
          <SectionHeader />
          <Grid container spacing={2}>
            <Grid item xs={6}>
              <div className="headTitle">Wholesaler</div>
            </Grid>
            <Grid item xs={6}>
              <div className="actionArea">
                <div className="flex gap-2 search-div">
                  <div className="relative" style={{ width: "500px", marginRight: "10px" }}>
                    <input
                      type="text"
                      onChange={(e) => setSearchK(e.target.value.toLowerCase())}
                      placeholder="Search by City , Name, Mobile Number, Type etc"
                      className="w-full py-[11px] pl-12 pr-4 text-gray-500 border rounded-md outline-none bg-gray-50 focus:bg-white"
                      style={{ fontSize: "14px", fontWeight: 500, fontFamily: "Manrope", color: "#84818A", paddingLeft: "16px" }}
                    />
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="absolute top-0 bottom-0 w-6 h-6 my-auto text-gray-400"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      style={{ right: "16px", color: "#504F54", width: "17.49px", height: "17.49px" }}
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                      />
                    </svg>
                  </div>
                  <AddButton
                    label="Add Wholesaler"
                    onClick={() => navigate("/addwholeseller")}
                  />
                </div>
              </div>
            </Grid>
          </Grid>
          <div className="flex gap-5 pt-[30px] " style={{ flexWrap: "wrap", paddingBottom: "30px" }}>
            <CommonSelectElectronicBazaar
              label={"State"}
              hint={"Select State"}
              options={stateList}
              handleSelect={handleChange}
              selectedIds={AllState?.filter((item: any) => item?.status).map((elm: any) => elm.id)}
            />
            <CommonSelectElectronicBazaar
              label={"District"}
              hint={"Select District"}
              options={disList}
              handleSelect={handleChange}
              selectedIds={allDis.filter((item: any) => item?.status).map((elm: any) => elm.id)}
            />
            <CommonSelectElectronicBazaar
              label={"City"}
              hint={"Select City"}
              options={cityList}
              handleSelect={handleChange}
              selectedIds={AllCity.filter((item: any) => item?.status).map((elm: any) => elm.id)}
            />
            <CommonSelectElectronicBazaar
              label={"Wholesaler Type"}
              hint={"Select Wholesaler Type"}
              options={Wholesellerlist}
              handleSelect={handleChange}
              selectedIds={Wholesellerlist?.filter((item: any) => item?.status).map((elm: any) => elm?.value)}
            />
            <CommonSelectElectronicBazaar
              label={"Status"}
              hint={"Select Status"}
              options={statusList}
              handleSelect={handleChange}
              selectedIds={statusList?.filter((item: any) => item?.status).map((elm: any) => elm?.value)}
            />
            <CommonSelectElectronicBazaar
              label={"Active/Inactive"}
              hint={"Select Active/Inactive"}
              options={activeInactiveList}
              handleSelect={handleChange}
              selectedIds={activeInactiveList?.filter((item: any) => item?.status).map((elm: any) => elm?.value)}
            />
            <CommonSelectElectronicBazaar
              label={"Agent Type"}
              hint={"Select Agent Type"}
              options={agentTypeList}
              handleSelect={handleChange}
              selectedIds={agentTypeList?.filter((item: any) => item?.status).map((elm: any) => elm?.value)}
            />
          </div>
          <div className="main-wholeseller-table">
            <div style={{ overflowX: "auto" }}>
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
                <> {console.log(getAllWholesellers)}</>
                {getAllWholesellers?.filter((elm: any) => elm?.wholeseller_firm_name?.toLowerCase().includes(searchK) || elm?.wholeseller_city_name?.toLowerCase().includes(searchK) || elm?.wholeseller_type_name?.toLowerCase().includes(searchK))?.map((item: any, index: any) => (
                  <tr key={index}>
                    <td >{item.wholeseller_firm_name}</td>
                    <td className="person-details" onClick={() => item.wholeseller_status == 'KYCAPPROVED' && navigate(`/wholesalerdetails/${item.id}`)}>
                      <div className={`flex items-center gap-2 ${item.wholeseller_status == 'KYCAPPROVED' && "text-[#4E2FA9]"}`}>
                        {
                          item.wholeseller_status == 'KYCAPPROVED' ? <>
                          <img className="brandLogo" src={contact} alt={"Logo"} />
                          <span style={{textDecoration: "underline"}}>{item.wholeseller_contact_per}</span>
                          </> : <span >{item.wholeseller_contact_per}</span>
                        }
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
                    <td className="person-type">{item.wholeseller_type_name}</td>
                    <td className="person-details">
                      <div className="flex items-center gap-2 text-[#4E2FA9]">
                        <img className="brandLogo" src={contact} alt={"Logo"} />
                        {Allagents?.map((elm: any) => {
                          if (elm?.id === item?.wholeseller_agent) {
                            return <span className="font-[500] text-[#4E2FA9] text-[14px] font-[Manrope]" style={{ textDecoration: "underline" }}>{elm?.agent_name}</span>
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
                    <td className="py-4 px-6 tableData" style={{ paddingLeft: 0, fontSize: "12px" }}>
                      {item.wholeseller_status == 'CREATED' && <div className="bg-[#e5f5ff] flex justify-center rounded-md p-[10px] w-[150px]">
                        <p className="text-[#28a1ff]">{item.wholeseller_status}</p>
                      </div>}
                      {item.wholeseller_status == 'PENDING' && <div className="bg-[#FFF6ED] flex justify-center rounded-md p-[10px] w-[150px]" onClick={()=>ViewKYCForm(index)}>
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
                        <Switch checked={item.wholeseller_active} onChange={(e: any) => handleWholeSellerStatus(e, index, item.id,item)} />
                      </div>
                    </td>
                    <td style={{ paddingRight: 0 }}>
                      <div className="agent-dropdown" style={{ display: "flex", justifyContent: "end" }}>
                        {
                          item.wholeseller_status == 'CREATED' && <GridOptionButton
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
                                navigate(`/wholesellerkyc/${item.id}/PENDING`)
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
                                navigate(`/addwholeseller/${item.id}`)
                              },
                            },
                            // {
                            //   label: (
                            //     <>
                            //       <span className="icon">
                            //         <img src={calendar} alt="calendar" />{" "}
                            //       </span>{" "}
                            //       Renew Plan
                            //     </>
                            //   ),
                            //   onClick() {
                            //     navigate(`/renewplan/${item.id}`)
                            //   },
                            // },
                          ]}
                        />
                        }
                        {
                          item.wholeseller_status == 'PENDING' && <GridOptionButton
                          icon={"vertical-options"}
                          menus={[
                            {
                              label: (
                                <>
                                  <span className="icon">
                                    <img src={fill} alt="fill" />{" "}
                                  </span>{" "}
                                  View Kyc
                                </>
                              ),
                              onClick() {
                                ViewKYCForm(index)
                              },
                            },
                          ]}
                        />
                        }
                        {
                          item.wholeseller_status == 'KYCAPPROVED' && <GridOptionButton
                          icon={"vertical-options"}
                          menus={[
                            {
                              label: (
                                <>
                                  <span className="icon">
                                    <img src={fill} alt="fill" />{" "}
                                  </span>{" "}
                                  View Kyc
                                </>
                              ),
                              onClick() {
                                ViewKYCForm(index)  
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
                        }
                        {
                          item.wholeseller_status == 'KYCREJECTED' && <GridOptionButton
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
                                navigate(`/wholesellerkyc/${item.id}/PENDING`)
                              },
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
                        }
                        {
                          item.wholeseller_status == 'APPROVED' && <GridOptionButton
                          icon={"vertical-options"}
                          menus={[
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
                        }
                      </div>
                    </td>
                  </tr>
                ))}
              </table>
              <div
                className="flex items-center justify-between"
                style={{ display: "flex", marginLeft: 0, justifyContent: "center", marginTop: "40px", marginBottom: "150px" }}
              >
                <Pagination
                  count={Math.ceil(totalCount / 10)}
                  page={currentPage}
                  onChange={handlePageChange}
                />
              </div>
            </div>
            {isshowmore && (
              <div
                ref={viewkycRef}
              >
                <div className={isshowmore ? "viewkyc-modal active" : "viewkyc-modal"}>
                  <div className="kycmodal-main">
                    <div className="modalHead" style={{ alignItems: "center" }}>
                      <p className="modalTitle">Pending Approval</p>
                      <img onClick={() => setisshowmore(false)} src={closeicon} alt="icon" style={{ height: "14px", width: "14px" }} />
                    </div>

                    <div className="headTitle">
                      <div>
                        <p className="martTitle">{editFormData?.wholeseller_firm_name}</p>
                        <p className="martDescription">Wholeseller</p>
                      </div>

                      <div>
                        <Switch checked={editFormData?.wholeseller_active} onChange={(e: any) => handleWholeSellerStatus(e, editFormData?.index, editFormData?.id,editFormData)} />
                      </div>
                    </div>

                    <div className="datContainer" style={{ borderBottom: "none" }}>
                      <p className="dataTitle">Contact Person</p>
                      <div style={{ textAlign: "end" }}>
                        <p className="font-[500] text-[#2E2C34] text-[14px] font-[Manrope]" style={{ paddingBottom: "10px" }}>{editFormData?.wholeseller_contact_per}</p>
                        <p className="font-[500] text-[#2E2C34] text-[14px] font-[Manrope]" style={{ display: "flex", alignItems: "center", fontSize: "14px", justifyContent: "end" }}><HiPhone /> {editFormData?.wholeseller_number}</p>
                      </div>
                    </div>
                    <div className="datContainer" style={{ borderBottom: "none" }}>
                      <p className="dataTitle">Firm Address</p>
                      <div>
                        <p className="font-[500] text-[#2E2C34] text-[14px] font-[Manrope]" style={{ textAlign: "end", paddingBottom: "10px" }}>{editFormData?.wholeseller_address}</p>
                        <p className="dataDescription" style={{ display: "flex", alignItems: "center", fontSize: "14px", justifyContent: "end" }}><FaMapMarkerAlt style={{ marginRight: "5px" }} /> Show Directions</p>
                      </div>
                    </div>
                    <div className="datContainer" style={{ display: "flex", alignItems: "center", fontSize: "14px", borderBottom: "none" }}>
                      <p className="dataTitle">Bazaar</p>
                      <div style={{ display: "flex", alignItems: "center", flexWrap: "wrap", justifyContent: "end" }}>
                        {editFormData?.wholeseller_bazaar_data?.map((item: any, index: any) => {
                          return <div className="group relative" key={index}>
                            <button className="rounded bg-[#E6F6FF] px-4 py-2 text-sm text-[#00A5FF] shadow-sm" style={{ fontSize: "12px", marginLeft: "15px", marginTop: "5px" }}>
                              {item?.bazaar_name}
                            </button>
                          </div>
                        })}
                      </div>
                    </div>
                    <div className="datContainer" style={{ borderBottom: "none" }}>
                      <p className="dataTitle">Agent</p>
                      <div style={{ justifyContent: "end" }}>
                        <p className="font-[500] text-[#2E2C34] text-[14px] font-[Manrope]" style={{ paddingBottom: "10px", textAlign: "end" }}>
                          {Allagents?.map((elm: any) => {
                            if (elm?.id === editFormData?.wholeseller_agent) {
                              return <span className="font-[500] text-[#2E2C34] text-[14px] font-[Manrope]">{elm?.agent_name}</span>
                            }
                          })}
                        </p>
                        <p className="font-[500] text-[#2E2C34] text-[14px] font-[Manrope]">
                          {Allagents?.map((elm: any) => {
                            if (elm?.id === editFormData?.wholeseller_agent) {
                              return <span className="font-[500] text-[#2E2C34] text-[14px] font-[Manrope]">{elm?.agent_number}</span>
                            }
                          })}
                        </p>
                      </div>
                    </div>
                    <div className="datContainer">
                      <div>
                        <p className="dataTitle" style={{ paddingBottom: "15px" }}>GST</p>
                        <p className="dataTitle">PAN</p>
                      </div>
                      <div>
                        <p className="font-[500] text-[#2E2C34] text-[14px] font-[Manrope]" style={{ paddingBottom: "15px", textAlign: "end" }}>{editFormData?.wholeseller_gst_no || "-"}</p>
                        <p className="font-[500] text-[#2E2C34] text-[14px] font-[Manrope]" style={{ textAlign: "end" }}>{editFormData?.wholeseller_firm_pan_no || "-"}</p>
                      </div>
                    </div>
                    <div className="datContainer">
                      <div>
                        <p className="dataTitle" style={{ paddingBottom: "15px" }}>Plan Detail</p>
                        <p className="dataTitle" style={{ paddingBottom: "15px" }}>Payment  Status</p>
                        <p className="dataTitle">Payment Detail</p>
                      </div>
                      <div>
                        <div style={{ paddingBottom: "15px", justifyContent: "end" }}>
                          <span className="font-[500] text-[#2E2C34] text-[14px] font-[Manrope]">{editFormData?.wholeseller_plan_name}fgfd</span>,
                          <span className="font-[500] text-[#2E2C34] text-[14px] font-[Manrope]">{editFormData?.wholeseller_payment}</span>
                        </div>
                        <p className="metaData font-[500] text-[#2E2C34] text-[14px] font-[Manrope]">{editFormData?.wholeseller_payment_name || "-"}</p>
                        <div className="metaData">
                          <p className="font-[500] text-[#2E2C34] text-[14px] font-[Manrope]">Online Payment</p>
                          <p className="font-[500] text-[#2E2C34] text-[14px] font-[Manrope]">Amount</p>
                          <p className="font-[500] text-[#2E2C34] text-[14px] font-[Manrope]">{moment(editFormData.created_at).format("DD MMM, YYYY")}</p>
                          <p className="font-[500] text-[#2E2C34] text-[14px] font-[Manrope]">Paytm</p>
                          <p className="font-[500] text-[#2E2C34] text-[14px] font-[Manrope]">Transaction ID</p>
                          <p className="dataDescription" style={{ fontSize: "14px", paddingTop: "15px" }}>View Invoice</p>
                        </div>
                      </div>
                    </div>
                    <div style={{ padding: "30px 0" }}>
                      <div style={{ display: "flex", alignItems: "center" }}>
                        <img src={Pinimage} alt="icon" style={{ marginRight: "10px" }} /><span className="font-[500] text-[#2E2C34] text-[14px] font-[Manrope]">Documents</span>
                      </div>
                    </div>
                    <div className="attachment" style={{ flexWrap: "wrap" }}>
                      <Grid container spacing={2}>
                        <Grid item xs={6}>
                          {editFormData?.wholeseller_adhar_front_image && <img className="brandLogo" src={editFormData?.wholeseller_adhar_front_image} alt={"Logo"} style={{ width: "100%", height: "140px", border: "1px solid #D1D0D3", borderRadius: "10px" }} />}
                        </Grid>
                        <Grid item xs={6}>
                          {editFormData?.wholeseller_adhar_back_image && <img className="brandLogo" src={editFormData?.wholeseller_adhar_back_image} alt={"Logo"} style={{ width: "100%", height: "140px", border: "1px solid #D1D0D3", borderRadius: "10px" }} />}
                        </Grid>
                        <Grid item xs={6}>
                          {editFormData?.wholeseller_pan_card_image && <img className="brandLogo" src={editFormData?.wholeseller_pan_card_image} alt={"Logo"} style={{ width: "100%", height: "140px", border: "1px solid #D1D0D3", borderRadius: "10px" }} />}
                        </Grid>
                      </Grid>
                    </div>
                    <div>
                      <div className={"action-bar"}>
                        <ActionButton
                          variant={"default"}
                          title={"Cancel"}
                          onClick={() => setisshowmore(false)}
                        />
                        {editFormData?.wholeseller_status == "PENDING" && <ActionButton
                          variant={"primary"}
                          title={"Approve"}
                          onClick={() => handleKycApproveAgent(editFormData.index, 'KYCAPPROVED')}
                        />}
                        {editFormData?.wholeseller_status == "PENDING" && <ActionButton
                          variant={"primary"}
                          title={"Reject"}
                          onClick={() => handleKycApproveAgent(editFormData.index, 'KYCREJECTED')}
                        />}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
        }
      </DashboardLayout>
    </>
  );
};

export default Wholeseller;
