import React, { useEffect, useState } from "react";
import { useAgentDetailsStyle } from "@/static/stylesheets/screens";
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
import phone from "@/static/icons/phone.svg";

interface WholesalerRetailerType {
    data?: any;
    id?: any;
}
const WholesalerRetailer: React.FC<WholesalerRetailerType> = ({ data }) => {
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
    const [Allretailer, setAllretailer] = useState<any>([])
    const [AllRetailers, setAllRetailers] = useState<any>([]);
    const [retailerList, setretailerList] = useState<any>([]);
    const agent = data?.agent_name
    console.log('AllWholesaler', AllWholesaler)
    useEffect(() => {
        getAllLists();
        getAllListsmain("")
    }, []);

    const getAllLists = async () => {
        const responseJson = await AppService.getAllWholesellerRetailer();
        if (responseJson.data.results?.length > 0) {
            let AllWholeSalerlist = responseJson.data.results?.map((item: any) => {
                if (item.wholeseller_retailer === data.id) {
                    return { ...item, agent, data }
                }
            })
            const filteredWholesalers = AllWholeSalerlist.filter((item: any) => item !== undefined);
            setAllWholesaler(filteredWholesalers)
            setfilterAllwholesellers(filteredWholesalers)
            setAllWholesalerM(filteredWholesalers)
        }
    };
    const getAllListsmain = async (param: any) => {
        const responseJson = await AppService.getRetailerType(param);
        setAllretailer(responseJson.data.results)
    };

    const handleDeleteFirm = async (index: number, id: any) => {
        if (window.confirm('Do You want to delete Wholeseller Retailer')) {
            const responseJson = await AppService.deleteWholesellerRetailer(id);
            if (responseJson.status == 204) {
                Alert('Wholeseller Retailer Delete Successfully');
                getAllLists();
            }
        }
    }

    useEffect(() => {
        getAllAgentTypes()
        getAllAgentTypeData()
        getAllStatus()
        getAllStatusData()
        getAllRetailerData()
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
        getAllRetailerData()
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
        const arr = AllWholesaler?.map((item: any) => {
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
        const arr = AllWholesaler?.map((item: any) => item.wholeseller_retailer_status);
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
    const getAllRetailerData = async () => {
        if (Allretailer.length > 0) {
            let tempState = await Allretailer?.map((row: any) => {
                return {
                    label: row.retailer_type_name,
                    value: row.id,
                }
            })
            setretailerList(tempState);
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
        if (selectboxName === 'Retailer Type') {
            setretailerList((prev: any) => {
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
        // city  wholeseller_retailer_type
        if (temp1?.length && AllCity?.length) {
            let FCity = AllCity?.filter((b: any) => b.status === true)?.map((item: any) => item?.id)
            if (FCity?.length > 0) {
                temp1 = temp1?.filter((item: any) => FCity?.includes(item?.wholeseller_retailer_city));
            }
        }
        // state
        if (temp1?.length && AllState?.length) {
            let FState = AllState?.filter((b: any) => b.status === true)?.map((item: any) => item?.id)
            if (FState?.length > 0) {
                temp1 = temp1?.filter((item: any) => FState?.includes(item?.wholeseller_retailer_state));
            }
        }
        // district
        if (temp1?.length && allDis?.length) {
            let FDistrict = allDis?.filter((b: any) => b.status === true)?.map((item: any) => item?.id)
            if (FDistrict?.length > 0) {
                temp1 = temp1?.filter((item: any) => FDistrict?.includes(item?.wholeseller_retailer_district));
            }
        }
        // wholeseller type
        if (temp1?.length && agentTypeList?.length) {
            const selectedAgentType = agentTypeList?.filter((item: any) => item.status === true).map((item: any) => item.value);
            if (selectedAgentType?.length > 0) {
                temp1 = temp1?.filter((item: any) => selectedAgentType?.includes(item?.wholeseller_retailer_type));
            }
        }
        // retailer type
        if (temp1?.length && retailerList?.length) {
            const selectedAgentType = retailerList?.filter((item: any) => item.status === true).map((item: any) => item.value);
            if (selectedAgentType?.length > 0) {
                temp1 = temp1?.filter((item: any) => selectedAgentType?.includes(item?.wholeseller_retailer_type));
            }
        }
        // wholeseller status
        if (temp1?.length && statusList?.length) {
            const selectedStatus = statusList?.filter((item: any) => item.status === true).map((item: any) => item.value);
            if (selectedStatus?.length > 0) {
                temp1 = temp1?.filter((item: any) => selectedStatus?.includes(item?.wholeseller_retailer_status));
            }
        }
        // active / inactive
        if (temp1?.length && activeInactiveList?.length) {
            const selectedActiveInactive = activeInactiveList?.filter((item: any) => item.status === true).map((item: any) => item.value);
            if (selectedActiveInactive?.length > 0) {
                temp1 = temp1?.filter((item: any) => selectedActiveInactive?.includes(item?.wholeseller_retailer_active));
            }
        }
        setAllWholesaler(temp1)
    }, [AllWholesalerM, AllCity, AllState, allDis, agentTypeList, activeInactiveList, statusList, retailerList])

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
                            label={"Retailer Type"}
                            hint={"Select Retailer Type"}
                            options={retailerList}
                            handleSelect={handleChange}
                            selectedIds={retailerList?.filter((item: any) => item?.status).map((elm: any) => elm?.value)}
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
                            <table className="w-full text-left " style={{ marginBottom: "190px" }}>
                                <thead className="" style={{ borderBottom: "1px solid #e1e1e1" }}>
                                    <tr className="color-[#2E2C34;]">
                                        <th scope="col" className="tableTitle py-3 px-6" style={{ paddingLeft: 0 }}>
                                            Name
                                        </th>
                                        <th scope="col" className="tableTitle py-3 px-6">
                                            Contact Person
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
                                            Plan
                                        </th>
                                        <th scope="col" className="tableTitle py-3 px-6">
                                            # of Orders
                                        </th>
                                        <th></th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {AllWholesaler?.length > 0 ? AllWholesaler?.map((elm: any, index: any) => {
                                        const retailertype = Allretailer.find((it: any) => it.id === elm?.wholeseller_retailer_type)
                                        console.log('retailertype', retailertype)
                                        return <tr className="border-b" key={elm.id}>
                                            <td scope="row" className="py-4 px-6 tableData" style={{ paddingLeft: 0 }}>
                                                <p className="tableData">
                                                    {elm?.wholeseller_retailer_name}
                                                </p>
                                            </td>
                                            <td className="py-4 px-6 tableData person-details">
                                                <div className="flex items-center gap-2 text-[#4E2FA9]">
                                                    <img className="brandLogo" src={contact} alt={"Logo"} />
                                                    <span style={{ textDecoration: "underline" }}>{elm?.wholeseller_retailer_contact_per}</span>
                                                </div>
                                                <div className="flex flex-col items-start gap-2 person-model">
                                                    <span className="job-title">Firm Manager</span>
                                                    <span className="text-sm text-[#2E2C34] font-medium">
                                                        {elm.wholeseller_retailer_contact_per}
                                                    </span>
                                                    <span className="text-[13px] text-[#84818A] font-medium leading-5">
                                                        {AllCity.map((item: any) => {
                                                            if (item.id === elm?.wholeseller_retailer_city) {
                                                                return item?.city
                                                            }
                                                        })}
                                                    </span>
                                                    <span className="flex items-center gap-2 text-sm text-[#2E2C34] font-medium">
                                                        <img src={phone} alt="phone" /> {elm.wholeseller_retailer_number}
                                                    </span>
                                                </div>
                                            </td>
                                            <td className="py-4 px-6 tableData person-details">
                                                <div className="flex items-center gap-2">
                                                    {AllCity.map((item: any) => {
                                                        if (item.id === elm?.wholeseller_retailer_city) {
                                                            return item?.city
                                                        }
                                                    })}
                                                </div>
                                            </td>
                                            <td className="py-4 px-6 tableData">
                                                {elm?.data?.wholeseller_bazaar_data?.map((item: any, index: any) => {
                                                    return <span className="group relative" key={index}>
                                                        <button className="rounded bg-[#E6F6FF] px-4 py-2 text-sm text-[#00A5FF] shadow-sm" style={{ fontSize: "12px", marginRight: "15px", marginTop: "5px" }}>
                                                            {item?.bazaar_name}
                                                        </button>
                                                    </span>
                                                })}
                                            </td>
                                            <td className="py-4 px-6 tableData">
                                                {retailertype?.retailer_type_name}
                                            </td>
                                            <td className="py-4 px-6 tableData">
                                                {elm?.wholeseller_retailer_plan}
                                            </td>
                                            <td className="py-4 px-6 tableData cursor-pointer font-[500] text-[#2E2C34] text-[14px] font-[Manrope]">
                                                {elm?.wholeseller_retailer_no_of_bills_allowed}
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
                                                                handleDeleteFirm(index, elm.id)
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
                                    }) : <p className="font-[500] text-[#2E2C34] text-[14px] font-[Manrope]" style={{ paddingTop: "10px" }}>No Wholesaler retailers yet</p>}

                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default WholesalerRetailer;
