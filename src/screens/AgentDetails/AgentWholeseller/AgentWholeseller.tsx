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
import { useNavigate } from "react-router-dom";
import { Alert } from "@/alert/Alert";
import CommonSelectElectronicBazaar from "@/components/atoms/CommonSelectElectronicBazaar/CommonSelectElectronicBazaar";

interface AgentWholesalerType {
    data?: any;
    id?: any;
}
const AgentWholesaler: React.FC<AgentWholesalerType> = ({ data, id }) => {
    const classes = useAgentDetailsStyle();
    const navigate = useNavigate()
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
    const agent = data.agent_name
    console.log('AllWholesaler', AllWholesaler)
    useEffect(() => {
        getAllLists();
    }, []);

    const getAllLists = async () => {
        const responseJson = await AppService.getAgentByWholsellerList(id);
        if (responseJson.data.results?.length > 0) {
            let AllWholeSalerlist = responseJson.data.results?.map((item: any) => {
                if (item.wholeseller_agent === data.id) {
                    return { ...item, agent }
                }
            })
            const filteredWholesalers = AllWholeSalerlist.filter((item: any) => item !== undefined);
            setAllWholesaler(filteredWholesalers)
            setfilterAllwholesellers(filteredWholesalers)
            setAllWholesalerM(filteredWholesalers)
        }
    };

    const handleDeleteFirm = async (index: number) => {
        if (window.confirm('Do You want to delete Wholeseller')) {
            let deleteuserid = AllWholesaler[index].id;
            const responseJson = await AppService.deleteWholeseller(deleteuserid);
            if (responseJson.status == 204) {
                Alert('Wholeseller Delete Successfully');
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
            let updatedStateData = AllState?.map((item: any) => {
                if (item.id === id) {
                    return { ...item, status: true };
                } else {
                    return { ...item, status: false };
                }
            });
            setAllState(updatedStateData);
        }
        if (selectboxName === 'District') {
            let updateddistrictData = allDis?.map((item: any) => {
                if (item.id === id) {
                    return { ...item, status: true };
                } else {
                    return { ...item, status: false };
                }
            });
            setAllDis(updateddistrictData);
        }
        if (selectboxName === 'City') {
            let updatedCity = AllCity?.map((item: any) => {
                if (item.id === id) {
                    return { ...item, status: true };
                } else {
                    return { ...item, status: false };
                }
            });
            setAllCity(updatedCity);
        }
        if (selectboxName === 'Agent Type') {
            const updatedAgentType = agentTypeList?.map((item: any) => ({
                ...item,
                status: item.value === id ? true : false
            }));
            setagentTypeList(updatedAgentType);
        }
        if (selectboxName === 'Status') {
            const updatedStatus = statusList.map((item: any) => ({
                ...item,
                status: item.value === id ? true : false
            }));
            setstatusList(updatedStatus);
        }
        if (selectboxName === 'Active/Inactive') {
            const updatedActiveInactive = activeInactiveList?.map((item: any) => ({
                ...item,
                status: item.value === id ? true : false
            }));
            setactiveInactiveList(updatedActiveInactive);
        }
    }

    useEffect(() => {
        let temp1 = AllWholesalerM;
        // city
        if (temp1?.length && AllCity?.length) {
            let FCity = AllCity?.filter((b: any) => b.status === true)?.map((item: any) => item?.id)
            if (FCity?.length > 0) {
                for (const x of FCity) {
                    temp1 = temp1.filter((fc: any) => fc.wholeseller_city === x)
                }
            }
        }
        // state
        if (temp1?.length && AllState?.length) {
            let FState = AllState?.filter((b: any) => b.status === true)?.map((item: any) => item?.id)
            if (FState?.length > 0) {
                for (const x of FState) {
                    temp1 = temp1?.filter((fs: any) => fs?.wholeseller_state === x)
                }
            }
        }
        // district
        if (temp1?.length && allDis?.length) {
            let FDistrict = allDis?.filter((b: any) => b.status === true)?.map((item: any) => item?.id)
            if (FDistrict?.length > 0) {
                for (const x of FDistrict) {
                    temp1 = temp1?.filter((fs: any) => fs?.wholeseller_district === x)
                }
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
                            label={"Retailer Type"}
                            hint={"Select Retailer Type"}
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
                        <CommonSelectElectronicBazaar
                            label={"Agent Type"}
                            hint={"Select Agent Type"}
                            options={agentTypeList}
                            handleSelect={handleChange}
                            selectedIds={agentTypeList?.filter((item: any) => item?.status).map((elm: any) => elm?.value)}
                        />
                        <CommonSelectElectronicBazaar
                            label={"Plan Status"}
                            hint={"Select Plan Status"}
                            options={statusList}
                            handleSelect={handleChange}
                            selectedIds={Allstatus}
                        />
                    </div>

                    <div>
                        <div className="relative pt-[40px] pb-[40px]" style={{ overflowX: "auto" }}>
                            <table className="w-full text-left " style={{ marginBottom: "170px" }}>
                                <thead className="" style={{ borderBottom: "1px solid #e1e1e1" }}>
                                    <tr className="color-[#2E2C34;]">
                                        <th scope="col" className="tableTitle py-3 px-6" style={{ paddingLeft: 0 }}>
                                            S.No
                                        </th>
                                        <th scope="col" className="tableTitle py-3 px-6">
                                            Firm Name
                                        </th>
                                        <th scope="col" className="tableTitle py-3 px-6">
                                            C_Name
                                        </th>
                                        <th scope="col" className="tableTitle py-3 px-6">
                                            Mobile No.
                                        </th>
                                        <th scope="col" className="tableTitle py-3 px-6">
                                            City
                                        </th>
                                        <th scope="col" className="tableTitle py-3 px-6">
                                            Customer Type
                                        </th>
                                        <th scope="col" className="tableTitle py-3 px-6">
                                            Categories
                                        </th>
                                        <th scope="col" className="tableTitle py-3 px-6">Status</th>
                                        <th scope="col" className="tableTitle py-3 px-6">Plan</th>
                                        <th scope="col" className="tableTitle py-3 px-6">Expire In</th>
                                        <th scope="col" className="tableTitle py-3 px-6" style={{ paddingRight: 0 }}>Action</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {AllWholesaler?.length > 0 ? AllWholesaler?.map((elm: any, index: any) => {
                                        return <tr className="border-b" key={elm.id}>
                                            <td scope="row" className="py-4 px-6 tableData" style={{ paddingLeft: 0 }}>
                                                <p className="tableData">
                                                    {index + 1}
                                                </p>
                                            </td>
                                            <td className="py-4 px-6 tableData">
                                                <div className="flex gap-2">
                                                    {elm?.wholeseller_firm_name}
                                                </div>
                                            </td>
                                            <td className="py-4 px-6 tableData person-details">
                                                <div className="flex items-center gap-2 text-[#4E2FA9]">
                                                    <img className="brandLogo" src={contact} alt={"Logo"} />
                                                    {elm?.agent}
                                                </div>
                                                <div className="flex flex-col items-start gap-2 person-model">
                                                    <span className="job-title">Firm Manager</span>
                                                    {/* <span className="text-sm text-[#2E2C34] font-medium">
                                                        {elm?.name}
                                                    </span> */}
                                                    <span className="text-[13px] text-[#84818A] font-medium leading-5">
                                                        {elm?.wholeseller_city_name}
                                                    </span>
                                                    <span className="flex items-center gap-2 text-sm font-medium">
                                                        {elm?.agent}
                                                    </span>
                                                </div>
                                            </td>
                                            <td className="py-4 px-6 tableData">
                                                {elm?.wholeseller_number}
                                            </td>
                                            <td className="py-4 px-6 tableData">{elm?.wholeseller_city_name}</td>
                                            <td className="py-4 px-6 tableData">
                                                {elm?.wholeseller_bazaar_data?.map((items: any, index: any) => {
                                                    const lastItemIndex = elm?.wholeseller_bazaar_data.length - 1;
                                                    return <span key={items.id} className="font-[500] text-[#2E2C34] text-[14px] font-[Manrope]">{items?.bazaar_name}{index !== lastItemIndex && ', '}</span>
                                                })}
                                            </td>
                                            <td className="py-4 px-6 tableData cursor-pointer">
                                                <div>
                                                    {elm?.wholeseller_bazaar_data && elm?.wholeseller_bazaar_data[0]?.category_group?.map((element: any, index: any) => {
                                                        const lastItemIndex = elm?.wholeseller_bazaar_data && elm?.wholeseller_bazaar_data[0]?.category_group?.length - 1;
                                                        return <span key={element.id} className="font-[500] text-[#2E2C34] text-[14px] font-[Manrope]">{element?.parent_category_name}{index !== lastItemIndex && ', '}</span>
                                                    })}
                                                </div>
                                            </td>
                                            <td className="py-4 px-6">
                                                {elm?.wholeseller_status == 'CREATED' && <div className="bg-[#e5f5ff] flex justify-center rounded-md p-[10px] w-[150px]">
                                                    <p className="text-[#28a1ff]" style={{ fontSize: "12px", lineHeight: "18px" }}>{elm?.wholeseller_status}</p>
                                                </div>}
                                                {elm?.wholeseller_status == 'PENDING' && <div className="bg-[#FFF6ED] flex justify-center rounded-md p-[10px] w-[150px]">
                                                    <p className="text-[#FFA043]" style={{ fontSize: "12px", lineHeight: "18px" }}>{elm?.wholeseller_status}</p>
                                                </div>}
                                                {elm?.wholeseller_status == 'KYCAPPROVED' && <div className="bg-[#e6fcf7] flex justify-center rounded-md p-[10px] w-[150px]">
                                                    <p className="text-[#00e0c0]" style={{ fontSize: "12px", lineHeight: "18px" }}>{elm?.wholeseller_status}</p>
                                                </div>}
                                                {elm?.wholeseller_status == 'KYCREJECTED' && <div className="bg-[#ffeae5] flex justify-center rounded-md p-[10px] w-[150px]">
                                                    <p className="text-[#ff0000]" style={{ fontSize: "12px", lineHeight: "18px" }}>{elm?.wholeseller_status}</p>
                                                </div>}
                                                {elm?.wholeseller_status == 'APPROVED' && <div className="bg-[#FFF6ED] flex justify-center rounded-md p-[10px] w-[150px]">
                                                    <p className="text-[#FFA043]" style={{ fontSize: "12px", lineHeight: "18px" }}>{elm?.wholeseller_status}</p>
                                                </div>}
                                            </td>
                                            <td className="py-4 px-6 tableData">
                                                {elm?.wholeseller_plan_name}
                                            </td>
                                            <td className="py-4 px-6 tableData cursor-pointer">
                                                <div className="text-[#FFA043] text-sm font-medium">
                                                    {moment(elm?.created_at).format("DD MMM, YYYY")}
                                                </div>
                                            </td>
                                            <td className="py-4 px-6 tableData cursor-pointer" style={{ paddingRight: 0 }}>
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
                                                                navigate(`/wholesellerkyc/${elm.id}/KYC`)
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
                                                                navigate(`/wholesellerkyc/${elm.id}/EDIT`)
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
                                                                navigate(`/renewplan/${elm.id}`)
                                                            },
                                                        },
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

export default AgentWholesaler;
