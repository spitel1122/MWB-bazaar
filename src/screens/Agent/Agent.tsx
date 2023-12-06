import React, { useEffect, useState } from "react";
import { DashboardLayout } from "@/components/layouts";
import { AddButton, GridOptionButton } from "@/components/atoms/Button";
import { useNavigate } from "react-router-dom";
import { usAgentStyles } from "@/static/stylesheets/screens/agentStyle";
import { ActionButton } from "@/components/atoms/Button/ActionButton";
import {
    Dialog,
    FormControl,
    FormControlLabel,
    Pagination,
    Radio,
    RadioGroup,
    TextField,
    Switch
} from "@mui/material";
import complete from "@/static/icons/complete.svg";
import icPhoneHandle from "@/static/icons/phoneHandle.svg";
import fill from "@/static/icons/fill.svg";
import calendar from "@/static/icons/calendar.svg";
import deleteagent from "@/static/icons/delete-agent.svg";
import { AppService } from "@/service/AllApiData.service";
import contact from "@/static/icons/contact-phone.svg";
import { FaMapMarkerAlt } from "react-icons/fa";
import { HiPhone } from "react-icons/hi";
import { BsFileEarmarkPlus } from "react-icons/bs";
import { Alert, AlertError } from "@/alert/Alert";
import CommonSelectElectronicBazaar from "@/components/atoms/CommonSelectElectronicBazaar/CommonSelectElectronicBazaar";
import { Preview } from "@mui/icons-material";
import Loading from '../../components/LoadingCom/Loading.jsx'

async function convertImageTobS4(imgUrl: string) {
    const urlBase = imgUrl.endsWith("png") ? "data:image/png;base64," : "data:image/jpg;base64,"
    const imageToBase64 = require('image-to-base64/browser.js');
    let response = await imageToBase64(imgUrl);
    return urlBase + response;
}
const Agent = (props: any) => {
    const classes = usAgentStyles();
    const navigate = useNavigate();
    const [addRejectModalOpen, setAddRejectModalOpen] = useState(false);
    const [addCommisionModalOpen, setAddCommitionModalOpen] = useState(false);
    const [getAllAgent, setGetAllAgent] = useState<any>([]);
    const [filterallAgent, setfilterallAgent] = useState<any>([]);
    const [filterAllAgentM, setfilterAllAgentM] = useState<any>([]);
    const [totalCount, SetTotalCount] = useState<number>(1);
    const [currentPage, setCurrentPage] = useState(1);
    const [editFormData, setEditFormData] = useState<any>({});
    const [manageCommissionData, setManageCommissionData] = useState<any>({});
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
    const [isshowmore, setisshowmore] = useState(false);
    const [AgentImage, setAgentImage] = useState<any>("")
    const [loading, setloading] = useState(true)
    const [agentId, setAgentId] = useState(0)
    const [filterData, setFilterData] = useState<any>({
        city_id: [],
        state_id: [],
        district_id: [],
        agent_type: [],
        agent_status:[],
        agent_active: []
    })

    console.log("AllBazaarData", AllBazaarData)

    const handlePageChange = (event: any, value: any) => {

        setCurrentPage(value);
        getAllLists(value);
    };
    const getAllLists = async (page: any) => {
        const responseJson = await AppService.getAllAgentList({ page: page});
        if (responseJson.data.results) {
            setloading(false)
        }
        setGetAllAgent(responseJson.data.results);
        setfilterallAgent(responseJson.data.results);
        setfilterAllAgentM(responseJson.data.results);
        SetTotalCount(responseJson.data.count)
        console.log("all agents list===>", responseJson);
    };

    const [selectedTab, setSelectedTab] = useState<
        "PERPLAN" | "PERCUSTOMER"
    >("PERCUSTOMER");

    console.log("selectedTab", selectedTab);


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
    const viewproductRef = React.useRef(null);
    useClickOutside(viewproductRef, () => setisshowmore(false));

    useEffect(() => {
        if (isshowmore) {
            handleModalBackdrop(true);
        } else if (!isshowmore) {
            handleModalBackdrop(false);
        }
    }, [isshowmore]);

    useEffect(() => {
        setTimeout(() => {
            getAllLists(1);
        }, 10);
    }, []);

    const manageCommissionDataChange = (e: any, valueType: string) => {
        let tempobj = {
            ...manageCommissionData,
            [e.target.name]: e.target.value
        };
        tempobj.agent_commission_value_type = valueType
        setManageCommissionData(tempobj);
    }

    const handleEdit = (index: number) => {
        console.log(getAllAgent[index], "getAllAgent[index]getAllAgent[index]")
        setEditFormData({ ...getAllAgent[index], index });
        setisshowmore(true)
    }
    const handleDeleteAgent = async (index: number) => {
        let deleteuserid = getAllAgent[index].id;
        const responseJson = await AppService.deleteAgent(deleteuserid);

        if (responseJson.status == 204) {
            Alert('Agent Deleted Successfully');
            // let tempArr = getAllAgent;
            // const indexid = tempArr.indexOf(index);
            // if (indexid > -1) { 
            //     tempArr.splice(indexid, 1);
            // }
            // setGetAllAgent([...tempArr]);
            getAllLists(currentPage);
        }
        console.log("all agents list===>", responseJson);

    }

    const handleKycApproveAgent = async (index: number, agent_status: string) => {
        if (agent_status == 'KYCREJECTED') {
            setAddRejectModalOpen(true)
            setisshowmore(false)
            setAgentId(index)
        } else {
            let textmsg = ""
            if (agent_status == 'KYCAPPROVED') {
                textmsg = "Do You want to approve agent KYC ?";
            }
            if (agent_status == 'KYCREJECTEDWITHREASON') {
                textmsg = "Do You want to reject agent KYC ?";
            }
            if (window.confirm(textmsg)) {
                let agentData = getAllAgent[index];
                agentData.agent_status = agent_status === "KYCREJECTEDWITHREASON" ? "KYCREJECTED" : agent_status;
                if (agentData.agent_pancard_image.includes("https")) {
                    agentData.agent_pancard_image = await convertImageTobS4(agentData.agent_pancard_image);
                }
                if (agentData.agent_adhar_front_image.includes("https")) {
                    agentData.agent_adhar_front_image = await convertImageTobS4(agentData.agent_adhar_front_image);
                }
                if (agentData.agent_adhar_back_image.includes("https")) {
                    agentData.agent_adhar_back_image = await convertImageTobS4(agentData.agent_adhar_back_image);
                }
                if (agentData.agent_image.includes("https")) {
                    agentData.agent_image = await convertImageTobS4(agentData.agent_image);
                }
                const responseJson = await AppService.kycApproveAgent(agentData.id, agentData);

                if (responseJson.status == 200) {
                    setisshowmore(false)
                    if (agent_status == 'KYCAPPROVED') {
                        Alert('Agent KYC APPROVED Successfully');
                    }
                    if (agent_status == 'KYCREJECTEDWITHREASON') {
                        Alert('Agent KYC REJECTED Successfully');
                    }
                    getAllLists(currentPage);
                    setAddRejectModalOpen(false)
                }
                console.log("all agents list===>", responseJson);
            }

        }

    }
    const handleAgentStatus = async (e: any, index: number, item: any) => {
        let textmsg = ""
        if (e.target.checked) {
            textmsg = "Do you want to active Agent ?";
        } else {
            textmsg = "Do you want to Inactive Agent ?";
        }
        let agentData = item;
        agentData.agent_active = e.target.checked;
        if (agentData.agent_pancard_image) {
            if (agentData.agent_pancard_image.includes("https")) {
                agentData.agent_pancard_image = await convertImageTobS4(agentData.agent_pancard_image);
            }
        }
        else {
            agentData.agent_pancard_image = undefined
        }
        if (agentData.agent_adhar_front_image) {
            if (agentData.agent_adhar_front_image.includes("https")) {
                agentData.agent_adhar_front_image = await convertImageTobS4(agentData.agent_adhar_front_image);
            }
        }
        else {
            agentData.agent_adhar_front_image = undefined
        }
        if (agentData.agent_adhar_back_image) {
            if (agentData.agent_adhar_back_image.includes("https")) {
                agentData.agent_adhar_back_image = await convertImageTobS4(agentData.agent_adhar_back_image);
            }
        }
        else {
            agentData.agent_adhar_back_image = undefined
        }
        if (agentData.agent_image) {
            if (agentData.agent_image.includes("https")) {
                agentData.agent_image = await convertImageTobS4(agentData.agent_image);
            }
        }
        else {
            agentData.agent_image = undefined
        }
        const responseJson = await AppService.kycApproveAgent(agentData.id, agentData);
        console.log(item, responseJson, "item")
        if (responseJson.status == 200) {
            if (e.target.checked) {
                Alert('Agent Inactive Successfully');
            }
            else {
                Alert('Agent Active Successfully');
            }

            // let tempArr = getAllAgent;
            // const indexid = tempArr.indexOf(index);
            // if (indexid > -1) { 
            //     tempArr.splice(indexid, 1);
            // }
            // setGetAllAgent([...tempArr]);
        }
        getAllLists(currentPage);
        console.log("all agents list===>", responseJson);

    }

    const handleAddCommissionModal = async (index: number) => {
        setEditFormData({ ...getAllAgent[index], index });
        let obj = {
            agent_commission_value_type: getAllAgent[index].agent_commission_value_type,
            agent_commission_type: getAllAgent[index].agent_commission_type,
            agent_commission_value: getAllAgent[index].agent_commission_value
        }
        setManageCommissionData(obj);
        setSelectedTab(getAllAgent[index].agent_commission_type);
        setAddCommitionModalOpen(true)
    }

    const handleAddCommissionSubmit = async () => {
        let data = manageCommissionData;
        data.agent_commission_type = selectedTab;
        let agentData = getAllAgent[editFormData.index];
        delete agentData.agent_commission_value;

        agentData = { ...agentData, ...data };
        console.log("agentData.agent_pancard_image", agentData.agent_pancard_image);

        if (agentData.agent_pancard_image) {
            if (agentData.agent_pancard_image.includes("https")) {
                agentData.agent_pancard_image = await convertImageTobS4(agentData.agent_pancard_image);
            }
        }
        else {
            agentData.agent_pancard_image = undefined;
        }

        if (agentData.agent_adhar_front_image) {
            if (agentData.agent_adhar_front_image.includes("https")) {
                agentData.agent_adhar_front_image = await convertImageTobS4(agentData.agent_adhar_front_image);
            }
        }
        else {
            agentData.agent_adhar_front_image = undefined;
        }

        if (agentData.agent_adhar_back_image) {
            if (agentData.agent_adhar_back_image.includes("https")) {
                agentData.agent_adhar_back_image = await convertImageTobS4(agentData.agent_adhar_back_image);
            }
        }
        else {
            agentData.agent_adhar_back_image = undefined;
        }
        if (agentData.agent_image) {
            if (agentData.agent_image.includes("https")) {
                agentData.agent_image = await convertImageTobS4(agentData.agent_image);
            }
        }
        else {
            agentData.agent_image = undefined;
        }
        if (!agentData.agent_commission_value.includes("-")) {
            try {
                console.log(agentData, "agentDataagentData")
                const responseJson = await AppService.kycApproveAgent(agentData.id, agentData);
                if (responseJson.status == 200) {
                    setAddCommitionModalOpen(false);
                    Alert('Commission updated Successfully');
                    getAllLists(currentPage);
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
        else {
            AlertError('enter a positive value')
            setAddCommitionModalOpen(false);

        }
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
    }, [filterallAgent])

    useEffect(() => {
        getAllBazaarData()
    }, [])

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
    const getAllBazaarData = async () => {
        const responseJson = await AppService.getAllBazaar()
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
        const responseJson = await AppService.getAllAgentList({ page: currentPage});
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
        const responseJson = await AppService.getAllAgentList({ page: currentPage});
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
        const responseJson = await AppService.getAllAgentList({ page: currentPage});
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
        if (selectboxName === 'Bazaar') {
            // if (AllBazaarData.includes(id)) {
            //     setAllBazaarData(AllBazaarData.filter((item: any) => item.id !== id));
            // } else {
            //     setAllBazaarData([...AllBazaarData, id]);
            // }
            let updatedBazaarData = AllBazaarData?.map((item: any) => {
                if (item.id === id) {
                    return { ...item, status: true };
                } else {
                    return { ...item, status: false };
                }
            });
            setAllBazaarData(updatedBazaarData);
        }
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


    const filterdata = async (param: any) => {
        const data = await AppService.getAgentByfilter(param)
        if (data?.status === 200) {
            console.log('data',data?.data?.results)
            setGetAllAgent(data?.data?.results)
        }
    }

    useEffect(() => {
        if (filterData) {
            filterdata(filterData)
        }
    }, [filterData])

    useEffect(() => {
        const parmsData: any = {};
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
                // parmsData['city_id'] = Object.values(FCity)
                setFilterData((prev:any) => ({...prev, city_id: FCity[0]}))
                for (const x of FCity) {
                    temp1 = temp1?.filter((fc: any) => fc?.agent_assigned_city?.includes(x))
                }
            }
        }
        // state
        if (temp1?.length && AllState?.length) {
            let FState = AllState?.filter((b: any) => b.status === true)?.map((item: any) => item?.id)
            if (FState?.length > 0) {
                // parmsData['state_id'] = Object.values(FState)
                setFilterData((prev:any) => ({...prev, state_id: FState[0]}))
                for (const x of FState) {
                    temp1 = temp1?.filter((fs: any) => fs?.agent_assigned_state?.includes(x))
                }
            }
        }
        // district
        if (temp1?.length && allDis?.length) {
            let FDistrict = allDis?.filter((b: any) => b.status === true)?.map((item: any) => item?.id)
            if (FDistrict?.length > 0) {
                // parmsData['district_id'] = Object.values(FDistrict)
                setFilterData((prev:any) => ({...prev, district_id: FDistrict[0]}))
                for (const x of FDistrict) {
                    temp1 = temp1?.filter((fs: any) => fs?.agent_assigned_district?.includes(x))
                }
            }
        }
        // agent type
        if (temp1?.length && AllAgentType?.length) {
            const selectedAgentType = agentTypeList?.filter((item: any) => item.status === true).map((item: any) => item.value);
            if (selectedAgentType?.length > 0) {
                // parmsData['agent_type'] = Object.values(selectedAgentType)
                setFilterData((prev:any) => ({...prev, agent_type: selectedAgentType}))
                temp1 = temp1?.filter((item: any) => selectedAgentType?.includes(item?.agent_type));
            }
        }
        // agent status
        if (temp1?.length && statusList?.length) {
            const selectedStatus = statusList?.filter((item: any) => item.status === true).map((item: any) => item.value);
            if (selectedStatus?.length > 0) {
                // parmsData['agent_status'] = Object.values(selectedStatus)
                setFilterData((prev:any) => ({...prev, agent_status: selectedStatus[0]}))
                temp1 = temp1?.filter((item: any) => selectedStatus?.includes(item?.agent_status));
            }
        }
        // active / inactive
        if (temp1?.length && AllActiveInactive?.length) {
            const selectedActiveInactive = activeInactiveList?.filter((item: any) => item.status === true).map((item: any) => item.value);
            if (selectedActiveInactive?.length > 0) {
                // parmsData['agent_active'] = Object.values(selectedActiveInactive)
                setFilterData((prev:any) => ({...prev, agent_active: selectedActiveInactive[0]}))
                temp1 = temp1?.filter((item: any) => selectedActiveInactive?.includes(item?.agent_active));
            }
        }
    }, [filterAllAgentM, AllBazaarData, AllCity, AllState, allDis, activeInactiveList, statusList, agentTypeList])

    return (
        <>
            <DashboardLayout>
                {
                    loading ?
                        <Loading /> :
                        <div className={classes.root}>
                            <div>
                                <div className="flex align-middle justify-between items-center agent-wrapper" style={{ flexWrap: "wrap" }}>
                                    <div className="flex gap-[30px] items-center" style={{ flexWrap: "wrap" }}>
                                        <p className="commonTitle headTitle">Agents</p>
                                        <div className="commonTitle flex gap-2 cursor-pointer" style={{ alignItems: "center" }}>
                                            <BsFileEarmarkPlus className="w-10px text-[#FF6652]" style={{ color: "#333" }} />
                                            <p
                                                className="paymentTitle"
                                                onClick={() => navigate("/paymentrequest")}
                                            >
                                                {totalCount || 0} Payment Requests
                                            </p>
                                        </div>
                                    </div>

                                    <div className="flex gap-2 search-div">
                                        <div className="relative" style={{ width: "576px", marginRight: "10px" }}>
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
                                            label="Create New Agent"
                                            onClick={() => navigate("/addagent")}
                                        />
                                    </div>
                                </div>
                            </div>
                            <div className="flex gap-5 pt-[30px] " style={{ flexWrap: "wrap" }}>
                                <CommonSelectElectronicBazaar
                                    label={"Bazaar"}
                                    hint={"Select Bazaar"}
                                    options={bazaarList}
                                    handleSelect={handleChange}
                                    selectedIds={AllBazaarData.filter((item: any) => item?.status).map((elm: any) => elm.id)}
                                // selectedIds={AllBazaarData}
                                />
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
                                    label={"Agent Type"}
                                    hint={"Select Agent Type"}
                                    options={agentTypeList}
                                    handleSelect={handleChange}
                                    selectedIds={agentTypeList?.filter((item: any) => item?.status).map((elm: any) => elm?.value)}
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
                                    <table className="w-full text-left">
                                        <thead className="">
                                            <tr className="color-[#2E2C34;]" style={{ borderBottom: "1px solid #EBEAED" }}>
                                                <th scope="col" className="tableTitle py-3 px-6" style={{ paddingLeft: 0 }}>
                                                    Name
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
                                                    Status
                                                </th>
                                                <th
                                                    scope="col"
                                                    className="tableTitle py-3 px-6 text-center"
                                                >
                                                    Enable/Disable
                                                </th>
                                                <th scope="col" className="tableTitle py-3 px-6"></th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {getAllAgent && getAllAgent?.filter((elm: any) => elm?.agent_name?.toLowerCase().includes(searchK) || elm?.agent_number?.toLowerCase().includes(searchK) || elm?.agent_city_name?.toLowerCase().includes(searchK) || elm?.agent_type?.toLowerCase().includes(searchK) || elm?.agent_status?.toLowerCase().includes(searchK))?.map((item: any, index: any) => (
                                                <tr className="border-b" key={index}>
                                                    <td
                                                        scope="row"
                                                        className="py-4 px-6 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                                                        style={{ paddingLeft: 0 }}
                                                    >
                                                        {
                                                            item.agent_status == 'KYCAPPROVED' ?
                                                                <div className="flex items-center gap-2 text-[#4E2FA9] cursor-pointer" onClick={() => navigate(`/agentdetails/${item.id}`)}>
                                                                    <img className="brandLogo" src={contact} alt={"Logo"} />
                                                                    <span style={{ textDecoration: "underline" }}>{item.agent_name}</span>
                                                                </div> :
                                                                <div className="flex gap-[20px] items-center ">
                                                                    <p className="mb-3 tableContentTitle" style={{ marginBottom: 0 }}>
                                                                        <div className="flex gap-5 items-center">
                                                                            <p
                                                                                className="tableData"
                                                                                style={{ marginBottom: 0 }}
                                                                            >
                                                                                {item.agent_name}
                                                                            </p>
                                                                        </div>
                                                                    </p>
                                                                </div>
                                                        }
                                                    </td>
                                                    <td className="py-4 px-6 tableData">
                                                        <div className="flex gap-2">
                                                            <img src={icPhoneHandle} alt="dots" />
                                                            {item.agent_number}
                                                        </div>
                                                    </td>
                                                    <td className="py-4 px-6 tableData">
                                                        {item.agent_city_name || "NA"}
                                                    </td>
                                                    <td className="py-4 px-6 tableData">
                                                        {item.agent_bazaar.map((items: any, index: any) => (
                                                            AllBazaarData?.map((idx: any) => {
                                                                if (items === idx.id) {
                                                                    const lastItemIndex = item.agent_bazaar.length - 1;
                                                                    return <span className="font-[500] text-[#2E2C34] text-[14px] font-[Manrope]">{idx.bazaar_name}{index !== lastItemIndex && ', '}</span>
                                                                }
                                                            })
                                                        ))}
                                                    </td>
                                                    <td className="py-4 px-6 tableData" style={{ textTransform: "capitalize" }}>{item.agent_type}</td>
                                                    <td className="py-4 px-6 tableData">
                                                        {item.agent_status == 'CREATED' && <div className="bg-[#e5f5ff] flex justify-center rounded-md p-[10px] w-[150px]">
                                                            <p className="text-[#28a1ff]" style={{ fontSize: "12px", lineHeight: "18px" }}>{item.agent_status}</p>
                                                        </div>}
                                                        {item.agent_status == 'PENDING' && <div className="bg-[#FFF6ED] cursor-pointer flex justify-center rounded-md p-[10px] w-[150px]" onClick={() => handleEdit(index)}>
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
                                                    <td className="py-4 px-6 tableData cursor-pointer">
                                                        <div className="text-center">
                                                            <Switch checked={item.agent_active} onChange={(e: any) => handleAgentStatus(e, index, item)} name="gilad" />
                                                        </div>
                                                    </td>
                                                    <td className="py-4 px-6 tableData cursor-pointer" style={{ justifyContent: "end", display: "flex", paddingRight: 0 }}>
                                                        {
                                                            item.agent_status == 'CREATED' &&
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
                                                                                <p onClick={() => navigate(`/addagent/${item.id}`)}>
                                                                                    Edit Agent
                                                                                </p>
                                                                            </>
                                                                        ),
                                                                    },
                                                                    // {
                                                                    //     label: (
                                                                    //         <>
                                                                    //             <span className="icon">
                                                                    //                 <img src={deleteagent} alt="deleteagent" />
                                                                    //             </span>
                                                                    //             Delete Agent
                                                                    //         </>
                                                                    //     ),
                                                                    //     onClick() {
                                                                    //         handleDeleteAgent(index)
                                                                    //     },
                                                                    // },
                                                                    // {
                                                                    //     label: (
                                                                    //         <>
                                                                    //             <span className="icon">
                                                                    //                 <img src={calendar} alt="calendar" />
                                                                    //             </span>
                                                                    //             <p
                                                                    //                 onClick={() =>
                                                                    //                     handleAddCommissionModal(index)
                                                                    //                 }
                                                                    //             >
                                                                    //                 Manage Commission
                                                                    //             </p>
                                                                    //         </>
                                                                    //     ),
                                                                    // },
                                                                ]}
                                                            />
                                                        }
                                                        {
                                                            item.agent_status == 'PENDING' &&
                                                            <GridOptionButton
                                                                icon={"vertical-options"}
                                                                menus={[
                                                                    {
                                                                        label: (
                                                                            <>
                                                                                <span className="icon">
                                                                                    <img src={complete} alt="dots" />
                                                                                </span>
                                                                                <p onClick={() => handleEdit(index)}>
                                                                                    View Kyc
                                                                                </p>

                                                                            </>
                                                                        ),
                                                                    },
                                                                    // {
                                                                    //     label: (
                                                                    //         <>
                                                                    //             <span className="icon">
                                                                    //                 <img src={fill} alt="fill" />{" "}
                                                                    //             </span>
                                                                    //             <p onClick={() => handleEdit(index)}>
                                                                    //                 Edit Agent
                                                                    //             </p>
                                                                    //         </>
                                                                    //     ),
                                                                    // },
                                                                    // {
                                                                    //     label: (
                                                                    //         <>
                                                                    //             <span className="icon">
                                                                    //                 <img src={deleteagent} alt="deleteagent" />
                                                                    //             </span>
                                                                    //             Delete Agent
                                                                    //         </>
                                                                    //     ),
                                                                    //     onClick() {
                                                                    //         handleDeleteAgent(index)
                                                                    //     },
                                                                    // },
                                                                    // {
                                                                    //     label: (
                                                                    //         <>
                                                                    //             <span className="icon">
                                                                    //                 <img src={calendar} alt="calendar" />
                                                                    //             </span>
                                                                    //             <p
                                                                    //                 onClick={() =>
                                                                    //                     handleAddCommissionModal(index)
                                                                    //                 }
                                                                    //             >
                                                                    //                 Manage Commission
                                                                    //             </p>
                                                                    //         </>
                                                                    //     ),
                                                                    // },
                                                                ]}
                                                            />
                                                        }
                                                        {
                                                            item.agent_status == 'KYCAPPROVED' &&
                                                            <GridOptionButton
                                                                icon={"vertical-options"}
                                                                menus={[
                                                                    {
                                                                        label: (
                                                                            <>
                                                                                <span className="icon">
                                                                                    <img src={complete} alt="dots" />
                                                                                </span>
                                                                                <p onClick={() => handleEdit(index)}>
                                                                                    View Kyc
                                                                                </p>

                                                                            </>
                                                                        ),
                                                                    },
                                                                    // {
                                                                    //     label: (
                                                                    //         <>
                                                                    //             <span className="icon">
                                                                    //                 <img src={fill} alt="fill" />{" "}
                                                                    //             </span>
                                                                    //             <p onClick={() => handleEdit(index)}>
                                                                    //                 Edit Agent
                                                                    //             </p>
                                                                    //         </>
                                                                    //     ),
                                                                    // },
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
                                                                            handleDeleteAgent(index)
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
                                                        }
                                                        {
                                                            item.agent_status == 'KYCREJECTED' &&
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
                                                                    // {
                                                                    //     label: (
                                                                    //         <>
                                                                    //             <span className="icon">
                                                                    //                 <img src={fill} alt="fill" />{" "}
                                                                    //             </span>
                                                                    //             <p onClick={() => handleEdit(index)}>
                                                                    //                 Edit Agent
                                                                    //             </p>
                                                                    //         </>
                                                                    //     ),
                                                                    // },
                                                                    // {
                                                                    //     label: (
                                                                    //         <>
                                                                    //             <span className="icon">
                                                                    //                 <img src={deleteagent} alt="deleteagent" />
                                                                    //             </span>
                                                                    //             Delete Agent
                                                                    //         </>
                                                                    //     ),
                                                                    //     onClick() {
                                                                    //         handleDeleteAgent(index)
                                                                    //     },
                                                                    // },
                                                                    // {
                                                                    //     label: (
                                                                    //         <>
                                                                    //             <span className="icon">
                                                                    //                 <img src={calendar} alt="calendar" />
                                                                    //             </span>
                                                                    //             <p
                                                                    //                 onClick={() =>
                                                                    //                     handleAddCommissionModal(index)
                                                                    //                 }
                                                                    //             >
                                                                    //                 Manage Commission
                                                                    //             </p>
                                                                    //         </>
                                                                    //     ),
                                                                    // },
                                                                ]}
                                                            />
                                                        }
                                                        {
                                                            item.agent_status == 'APPROVED' &&
                                                            <GridOptionButton
                                                                icon={"vertical-options"}
                                                                menus={[
                                                                    // {
                                                                    //     label: (
                                                                    //         <>
                                                                    //                 <span className="icon">
                                                                    //                     <img src={complete} alt="dots" />
                                                                    //                 </span>
                                                                    //                 <p onClick={() => navigate(`/agentkyc/${item.id}`)}>
                                                                    //                     Complete KYC
                                                                    //                 </p>

                                                                    //             </>
                                                                    //         ),
                                                                    // },
                                                                    // {
                                                                    //     label: (
                                                                    //         <>
                                                                    //             <span className="icon">
                                                                    //                 <img src={fill} alt="fill" />{" "}
                                                                    //             </span>
                                                                    //             <p onClick={() => handleEdit(index)}>
                                                                    //                 Edit Agent
                                                                    //             </p>
                                                                    //         </>
                                                                    //     ),
                                                                    // },
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
                                                                            handleDeleteAgent(index)
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
                                                        }
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                    <div
                                        className="flex items-center justify-between"
                                        style={{ display: "flex", marginLeft: 0 }}
                                    >
                                        <Pagination
                                            count={Math.ceil(totalCount / 10)}
                                            page={currentPage}
                                            onChange={handlePageChange}
                                        />
                                    </div>
                                </div>
                            </div>
                            {isshowmore && (
                                <div ref={viewproductRef}>
                                    <div className={isshowmore ? "viewagent-modal active" : "viewagent-modal"}>
                                        <div className={classes.nativeDialog}>
                                            <div className="modalHead" style={{ padding: "30px 30px 15px" }}>
                                                <p className="modalTitle">{editFormData?.agent_status}</p>
                                                <div onClick={() => setisshowmore(false)}>
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
                                            <div className={"action-bar"} style={{ padding: "22px 30px", flexWrap: "wrap", marginTop: 0 }}>
                                                <ActionButton
                                                    variant={"default"}
                                                    title={"Cancel"}
                                                    onClick={() => setisshowmore(false)}
                                                />

                                                {(editFormData?.agent_status == "PENDING") && <ActionButton
                                                    variant={"primary"}
                                                    title={"Approve"}
                                                    onClick={() => (handleKycApproveAgent(editFormData.index, 'KYCAPPROVED'), setisshowmore(false), setAddCommitionModalOpen(true))}
                                                />}

                                                {(editFormData?.agent_status == "PENDING") && <ActionButton
                                                    variant={"primary"}
                                                    title={"Reject"}
                                                    onClick={() => handleKycApproveAgent(editFormData.index, 'KYCREJECTED')}
                                                />}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            )}

                            <Dialog
                                open={addRejectModalOpen}
                                maxWidth={"lg"}
                                sx={{
                                    ".MuiPaper-root": {
                                        borderRadius: "6px",
                                    },
                                }}
                                onClose={() => setisshowmore(false)}
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
                                            onClick={() => handleKycApproveAgent(agentId, 'KYCREJECTEDWITHREASON')}
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
                                onClose={() => setisshowmore(false)}
                            >
                                <div className={classes.addDialog}>
                                    <div>

                                        <p className="comissionTitle pb-[30px]">{editFormData?.agent_status == "PENDING" ? "Set Commission" : "Manage Commission"}</p>
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
                                                                value={manageCommissionData.agent_commission_value_type == 'PERPLAN' ? manageCommissionData.agent_commission_value : ""}
                                                                onChange={(e) => manageCommissionDataChange(e, 'PERPLAN')}
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
                        </div>
                }
            </DashboardLayout>
        </>
    );
};

export default Agent;
