import React, { useEffect, useState } from "react";
import { useAgentDetailsStyle } from "@/static/stylesheets/screens";
import CommonSelect from "@/components/atoms/CommonSelect/CommonSelect";
import { GridOptionButton } from "@/components/atoms/Button";
import complete from "@/static/icons/complete.svg";
import fill from "@/static/icons/fill.svg";
import deleteagent from "@/static/icons/delete-agent.svg";
import calendar from "@/static/icons/calendar.svg";
import { AppService } from "@/service/AllApiData.service";
import moment from "moment";
import contact from "@/static/icons/contact-phone.svg";
import { useNavigate, useParams } from "react-router-dom";
import { Alert } from "@/alert/Alert";
import CommonSelectElectronicBazaar from "@/components/atoms/CommonSelectElectronicBazaar/CommonSelectElectronicBazaar";

interface WholesalerBranchesType {
    data?: any;
    id?: any;
}
const WholesalerBranches: React.FC<WholesalerBranchesType> = ({ data }) => {
    const classes = useAgentDetailsStyle();
    const navigate = useNavigate()
    const { id } = useParams()
    const [AllWholesaler, setAllWholesaler] = useState<any>();
    const [AllWholesalerM, setAllWholesalerM] = useState<any>();
    const [filterAllwholesellers, setfilterAllwholesellers] = useState<any>();
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
    const paramsId = Number(id)
    const agent = data?.agent_name
    console.log('AllWholesaler', AllWholesaler)
    useEffect(() => {
        getAllLists();
    }, []);

    const getAllLists = async () => {
        const responseJson = await AppService.getWholesalerBranch();
        if (responseJson.data.results?.length > 0) {
            let AllWholeSalerlist = responseJson.data.results?.map((item: any) => {
                if (item?.branch_wholeseller === paramsId) {
                    return { ...item, agent, data }
                }
            })
            const filteredWholesalers = AllWholeSalerlist.filter((item: any) => item !== undefined);
            setAllWholesaler(filteredWholesalers)
            setfilterAllwholesellers(filteredWholesalers)
            setAllWholesalerM(filteredWholesalers)
        }
    };

    const handleDeleteFirm = async (index: number, id: any) => {
        if (window.confirm('Do You want to delete Wholeseller Branch')) {
            const responseJson = await AppService.deleteWholesellerBranch(id);
            if (responseJson.status == 204) {
                Alert('Wholeseller Branch Delete Successfully');
                getAllLists();
            }
        }
    }

    async function convertImageTobS4(imgUrl: string) {
        const imageToBase64 = require('image-to-base64/browser.js');
        let response = await imageToBase64(imgUrl);
        return "data:image/png;base64," + response;
      }

    const handleBranchStatus = async (e: any, index: number, id: any) => {
        let textmsg = ""
        if (e.target.checked) {
          textmsg = "Do you want to active wholeseller ?";
        } else {
          textmsg = "Do you want to inactive wholeseller ?";
        }
        // alert(index);
    
        if (window.confirm(textmsg)) {
          let wSellertData = AllWholesaler[index];
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
            getAllLists();
          }
        }
      }

    useEffect(() => {
        getAllAgentTypes()
        getAllAgentTypeData()
    }, [])
    useEffect(() => {
        filterAllwholesellers?.map((item: any) => {
            getAllDis({ ids: item?.district }, "")
            getAllState({ ids: item?.state }, "")
            getAllCity({ ids: item?.city }, "")
            getAllBazaarData({ ids: item?.bazaar }, "")
        });
        getAllBazaar()
        getAllStateData()
        getAllDisData()
        getAllCityData()
        getAllAgentTypes()
        getAllAgentTypeData()
        getAllActiveInactive()
        getAllActiveInactiveData()
        getAllStatus()
        getAllStatusData()
    }, [filterAllwholesellers])

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
    const getAllBazaarData = async (param: any, type: any) => {
        const responseJson = await AppService.getAllBazaar(param)
        setAllBazaarData(responseJson.data.results);
    };
    const getAllBazaar = async () => {
        const responseJson = await AppService.getAllBazaar();
        let tempBazaar = await responseJson.data.results.map((row: any) => {
            return {
                label: row.bazaar_name,
                value: row.id,
            }
        })
        setBazaarList(tempBazaar);
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
        const arr = AllWholesaler?.map((item: any) => item?.wholeseller_type_name);
        var uniqueArray = Array.from(new Set(arr));
        setAllAgentType(uniqueArray);
    }
    const getAllAgentTypeData = async () => {
        if (AllAgentType.length > 0) {
            let tempState = AllAgentType.map((row: any) => {
                return {
                    label: row,
                    value: row,
                }
            })
            setagentTypeList(tempState);
        }
    };
    const getAllActiveInactive = async () => {
        const arr = AllWholesaler?.map((item: any) => {
            if (item.wholeseller_active === true) {
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
        const arr = AllWholesaler?.map((item: any) => item.wholeseller_status);
        var uniqueArray = Array.from(new Set(arr));
        setAllstatus(uniqueArray);
    }
    const getAllStatusData = async () => {
        if (Allstatus.length > 0) {
            let tempState = Allstatus.map((row: any) => {
                return {
                    label: row,
                    value: row,
                }
            })
            setstatusList(tempState);
        }
    };

    const handleChange = (selectboxName: string, id: any) => {
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
        let temp1 = AllWholesalerM;
        // city
        if (temp1?.length && AllCity?.length) {
            let FCity = AllCity?.filter((b: any) => b.status === true)?.map((item: any) => item?.id)
            if (FCity?.length > 0) {
                temp1 = temp1?.filter((item: any) => FCity?.includes(item?.city));
            }
        }
        // state
        if (temp1?.length && AllState?.length) {
            let FState = AllState?.filter((b: any) => b.status === true)?.map((item: any) => item?.id)
            if (FState?.length > 0) {
                temp1 = temp1?.filter((item: any) => FState?.includes(item?.state));
            }
        }
        // district
        if (temp1?.length && allDis?.length) {
            let FDistrict = allDis?.filter((b: any) => b.status === true)?.map((item: any) => item?.id)
            if (FDistrict?.length > 0) {
                temp1 = temp1?.filter((item: any) => FDistrict?.includes(item?.district));
            }
        }
        // wholeseller type
        if (temp1?.length && agentTypeList?.length) {
            const selectedAgentType = agentTypeList?.filter((item: any) => item.status === true).map((item: any) => item.value);
            if (selectedAgentType?.length > 0) {
                temp1 = temp1?.filter((item: any) => selectedAgentType?.includes(item?.wholeseller_type_name));
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
        setAllWholesaler(temp1)
    }, [AllWholesalerM, AllCity, AllState, allDis, agentTypeList, activeInactiveList, statusList])

    return (
        <>
            <div className={classes.root}>
                <div>
                    <div className="flex gap-5 pt-[30px] " style={{ flexWrap: "wrap" }}>
                        <CommonSelectElectronicBazaar
                            label={"State"}
                            hint={"Select State"}
                            options={stateList}
                            handleSelect={handleChange}
                            selectedIds={AllState.filter((item: any) => item?.status).map((elm: any) => elm.id)}
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
                            label={"Branch Type"}
                            hint={"Select Branch Type"}
                            options={cityList}
                            handleSelect={handleChange}
                            selectedIds={AllCity}
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
                    </div>

                    <div>
                        <div className="relative pt-[40px] pb-[40px]" style={{ overflowX: "auto" }}>
                            <table className="w-full text-left " style={{ marginBottom: "200px" }}>
                                <thead className="" style={{ borderBottom: "1px solid #e1e1e1" }}>
                                    <tr className="color-[#2E2C34;]">
                                        <th scope="col" className="tableTitle py-3 px-6" style={{ paddingLeft: 0 }}>
                                            Branch Name
                                        </th>
                                        <th scope="col" className="tableTitle py-3 px-6">
                                            Branch Manager
                                        </th>
                                        <th scope="col" className="tableTitle py-3 px-6">
                                            Mobile Number
                                        </th>
                                        <th scope="col" className="tableTitle py-3 px-6">
                                            City
                                        </th>
                                        <th scope="col" className="tableTitle py-3 px-6">
                                            Bazaar
                                        </th>
                                        <th scope="col" className="tableTitle py-3 px-6">
                                            Type
                                        </th>
                                        <th scope="col" className="tableTitle py-3 px-6">
                                            Enable/Disable
                                        </th>
                                        <th></th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {AllWholesaler?.length > 0 ? AllWholesaler?.map((elm: any, index: any) => {
                                        return <tr className="border-b" key={elm.id}>
                                            <td className="py-4 px-6 tableData" style={{ paddingLeft: 0 }}>
                                                <div className="flex gap-2">
                                                    {elm?.branch_name}
                                                </div>
                                            </td>
                                            <td className="py-4 px-6 tableData">
                                                {elm?.manager_name}
                                            </td>
                                            <td className="py-4 px-6 tableData">{elm?.branch_phone}</td>
                                            <td className="py-4 px-6 tableData">
                                                {AllCity.map((item: any) => {
                                                    if (item.id === elm?.city) {
                                                        return item?.city
                                                    }
                                                })}
                                            </td>
                                            <td className="py-4 px-6 tableData">
                                                {elm?.data?.wholeseller_bazaar_data?.map((items: any, index: any) => {
                                                    const lastItemIndex = elm?.data?.wholeseller_bazaar_data.length - 1;
                                                    return <span key={items.id} className="font-[500] text-[#2E2C34] text-[14px] font-[Manrope]">{items?.bazaar_name}{index !== lastItemIndex && ', '}</span>
                                                })}
                                            </td>
                                            <td className="py-4 px-6 tableData">
                                                {elm?.wholeseller_plan_name}
                                            </td>
                                            <td className="py-4 px-6 tableData cursor-pointer">
                                                <div>
                                                    <span className="switch-main">
                                                        <label className={"switch"}>
                                                            <input type="checkbox" checked={elm?.data?.bazaar_active === true ? true : false} onChange={(e: any) => handleBranchStatus(e, index, elm.id)} />
                                                            <span className="slider round"></span>
                                                        </label>
                                                    </span>
                                                </div>
                                            </td>
                                            <td className="py-4 px-6 tableData cursor-pointer" style={{ paddingRight: 0 }}>
                                                <GridOptionButton
                                                    icon={"vertical-options"}
                                                    menus={[{
                                                            label: (
                                                                <>
                                                                    <span className="icon">
                                                                        <img src={deleteagent} alt="deleteagent" />{" "}
                                                                    </span>
                                                                    Delete Firm
                                                                </>
                                                            ),
                                                            onClick() {
                                                                handleDeleteFirm(index, elm.id)
                                                            }
                                                        }
                                                    ]}
                                                />
                                            </td>
                                        </tr>
                                    }) : <p className="font-[500] text-[#2E2C34] text-[14px] font-[Manrope]" style={{ paddingTop: "10px" }}>No Wholesalers yet</p>}

                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default WholesalerBranches;
