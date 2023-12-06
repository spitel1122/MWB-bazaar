import React, { useEffect, useState } from "react";
import { DashboardLayout } from "@/components/layouts";
import { IoIosArrowBack } from "react-icons/io";
import { useNavigate } from "react-router-dom";
import { usAgentStyles } from "@/static/stylesheets/screens/agentStyle";
import { ActionButton } from "@/components/atoms/Button/ActionButton";
import icPhoneHandle from "@/static/icons/phoneHandle.svg";
import { AppService } from "@/service/AllApiData.service";
import CommonSelectElectronicBazaar from "@/components/atoms/CommonSelectElectronicBazaar/CommonSelectElectronicBazaar";
import { Dialog, Grid, TextField, Pagination, Box, FormControl, Input, InputAdornment, InputLabel } from "@mui/material";
import circleClose from '../../../src/static/images/x-circle1.png'
import { ErrorMessage, Form, Formik } from "formik";
import PhoneInput from "react-phone-input-2";
import { Alert } from "@/alert/Alert";
import * as Yup from "yup";

const PaymentRequest = () => {
    const classes = usAgentStyles();
    const navigate = useNavigate();
    const [getAllAgent, setGetAllAgent] = useState<any>([]);
    const [filterallAgent, setfilterallAgent] = useState<any>([]);
    const [filterAllAgentM, setfilterAllAgentM] = useState<any>([]);
    const [totalCount, SetTotalCount] = useState<number>(1);
    const [currentPage, setCurrentPage] = useState(1);
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
    const [searchK, setSearchK] = useState("");
    const [addModalOpen, setAddModalOpen] = useState(false);
    const [PaymentFormData, setPaymentFormData] = useState<any>();
    const [addConfirmModalOpen, setaddConfirmModalOpen] = useState(false);
    const [paymentSuccessModal, setpaymentSuccessModal] = useState(false)
    const [values, setvalues] = useState({
        agent_number: "",
        agent_address: "",
        agent_city_name: "",
        agent_state_name: "",
        agent_cutomer_id: "",
        agent_amount: ""
    });

    const SignupSchema = Yup.object().shape({
        agent_number: Yup.number()
            .typeError("Phone no must be in digit")
            .integer()
            .positive("Phone no must be positive")
            .required("Phone no is required"),
        agent_address: Yup.string().required("Address is required"),
        agent_city_name: Yup.string().required("agent_city_name is required"),
        agent_cutomer_id: Yup.string().required("agent_cutomer_id is required"),
        agenagent_amountt_city: Yup.string().required("agent_amount is required"),
    });

    const handleFormSubmit = async (values: any) => {
        console.log('values', values)
    };

    const handlePageChange = (event: any, value: any) => {
        setCurrentPage(value);
        getAllLists(value);
    };

    const getAllLists = async (page: any) => {
        const responseJson = await AppService.getAllAgentList({ page: page ? page : 1 });
        setGetAllAgent(responseJson.data.results);
        setfilterallAgent(responseJson.data.results);
        setfilterAllAgentM(responseJson.data.results);
        SetTotalCount(responseJson.data.count)
    };
    useEffect(() => {
        getAllLists(1);
    }, []);
    useEffect(() => {
        getAllAgentTypes()
        getAllAgentTypeData()
    }, [])
    useEffect(() => {
        filterallAgent.map((item: any) => {
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
    }, [filterallAgent])

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
        const responseJson = await AppService.getAllAgentList();
        const arr = responseJson.data.results.map((item: any) => item.agent_type);
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
    const handleChange = (selectboxName: string, id: any) => {
        if (selectboxName === 'Bazaar') {
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
        if (temp1?.length && agentTypeList?.length) {
            const selectedAgentType = agentTypeList?.filter((item: any) => item.status === true).map((item: any) => item.value);
            if (selectedAgentType?.length > 0) {
                temp1 = temp1?.filter((item: any) => selectedAgentType?.includes(item?.agent_type));
            }
        }
        setGetAllAgent(temp1)
    }, [filterAllAgentM, AllBazaarData, AllCity, AllState, allDis, agentTypeList, AllActiveInactive])

    const OpenPaymentModal = (index: number) => {
        setPaymentFormData({ ...getAllAgent[index], index });
        setAddModalOpen(true)
    }

    const paymentConfirm = () => {
        setAddModalOpen(false)
        setaddConfirmModalOpen(true)
    }

    const paymentSuccessModalM = () => {
        setaddConfirmModalOpen(false)
        setpaymentSuccessModal(true)
        Alert('Payment Success');
    }

    return (
        <>
            <DashboardLayout>
                <div className={classes.root}>
                    <div>
                        <div className="flex align-middle justify-between items-center payment-request" style={{ flexWrap: "wrap" }}>
                            <div className="flex gap-[30px] items-center">
                                <div className="commonTitle flex gap-2 items-center justify-center cursor-pointer" onClick={() => navigate('/agents')}>
                                    <IoIosArrowBack style={{ width: "16px", color: "#84818A" }} />
                                    <p className="mainTitle">Payment Requests</p>
                                </div>
                            </div>
                            <div className="flex gap-2">
                                <div className="relative search-main" style={{ width: "576px", marginRight: "10px" }}>
                                    <input
                                        type="text"
                                        onChange={(e) => setSearchK(e.target.value)}
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
                    </div>
                    <div>
                        <div className="relative pt-[40px] pb-[40px]" style={{ overflowX: "auto" }}>
                            <table className="w-full text-left" style={{ marginBottom: "80px" }}>
                                <thead className="">
                                    <tr className="color-[#2E2C34;]" style={{ borderBottom: "1px solid #EBEAED" }}>
                                        <th scope="col" className="tableTitle py-3 px-6" style={{ paddingLeft: 0 }}>
                                            Date
                                        </th>
                                        <th scope="col" className="tableTitle py-3 px-6">
                                            Agent Name
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
                                            Amount Requested
                                        </th>
                                        <th scope="col" className="tableTitle py-3 px-6"></th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {getAllAgent && getAllAgent?.filter((elm: any) => elm?.agent_name?.toLowerCase().includes(searchK) || elm?.agent_number?.toLowerCase().includes(searchK) || elm?.agent_city_name?.toLowerCase().includes(searchK) || elm?.agent_type?.toLowerCase().includes(searchK) || elm?.agent_status?.toLowerCase().includes(searchK))?.map((item: any, index: any) => (
                                        <tr className="border-b">
                                            <td
                                                scope="row"
                                                className="py-4 px-6 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                                                style={{ paddingLeft: 0 }}
                                            >
                                                <div className="flex gap-[20px] items-center ">
                                                    <p className="mb-3 tableContentTitle cursor-pointer" style={{ marginBottom: 0 }}>
                                                        <div className="flex gap-5 items-center">
                                                            <p
                                                                className="tableData"
                                                                style={{ marginBottom: 0 }}
                                                            >
                                                                21 - 07 - 2022
                                                            </p>
                                                        </div>
                                                    </p>
                                                </div>
                                            </td>
                                            <td className="py-4 px-6 tableData">
                                                {item.agent_name}
                                            </td>
                                            <td className="py-4 px-6 tableData">

                                                <div className="flex gap-2">
                                                    <img src={icPhoneHandle} alt="dots" />
                                                    {item.agent_number}
                                                </div>
                                            </td>
                                            <td className="py-4 px-6 tableData">
                                                {item.agent_city_name}
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
                                            <td className="py-4 px-6 tableData" style={{ textTransform: "capitalize" }}>{item?.agent_type}</td>
                                            <td className="py-4 px-6 tableData">Rs. 15,000</td>
                                            <td className="py-4 px-6 tableData cursor-pointer text-end pe-0" style={{ paddingRight: 0 }}>
                                                <ActionButton
                                                    variant={"primary"}
                                                    title={"Pay Now"}
                                                    onClick={() => OpenPaymentModal(item?.id)}
                                                />
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
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
                            </table>
                        </div>
                    </div>
                    <Dialog
                        open={addModalOpen}
                        maxWidth={"lg"}
                        sx={{
                            ".MuiPaper-root": {
                                borderRadius: "20px",
                            },
                        }}
                        onClose={() => setAddModalOpen(false)}
                    >
                        <div className={classes.AddDialog} style={{ padding: "24px 30px 30px", borderRadius: "5px" }}>
                            <p className="comissionTitle pb-[25px] text-center" style={{ fontWeight: 700, fontSize: "24px", lineHeight: "36px", color: "#2E2C34" }}>Payment</p>
                            <img src={circleClose} alt="icon" style={{ position: "absolute", top: "26px", right: "30px", cursor: "pointer" }} onClick={() => setAddModalOpen(false)} />
                            <div>
                                <Formik
                                    initialValues={values}
                                    onSubmit={handleFormSubmit}
                                    validationSchema={SignupSchema}
                                    enableReinitialize={true}
                                >
                                    {({
                                        values,
                                        handleBlur,
                                    }) => (
                                        <Form>
                                            <div className="radio-actionButton flex gap-5">
                                                <Grid container spacing={2}>
                                                    <Grid item xs={12} className="bazaarplan-div" style={{ paddingTop: 0 }}>
                                                        <FormControl variant="standard" style={{ width: "100%" }}>
                                                            <p className="formTitle">Phone Number</p>
                                                            <PhoneInput
                                                                country={"in"}
                                                                onChange={(e: any) => setvalues({ ...values, agent_number: e })}
                                                                value={values?.agent_number}
                                                                onBlur={handleBlur}
                                                            />
                                                            <Box sx={{ color: "red" }}>
                                                                <ErrorMessage name="agent_number" />
                                                            </Box>
                                                        </FormControl>
                                                    </Grid>
                                                    <Grid item xs={12} className="bazaarplan-div pr-div main-pr-div" style={{ paddingTop: 0 }}>
                                                        <div style={{ paddingTop: "24px" }}>
                                                            <p className="formTitle">Address</p>
                                                            <TextField
                                                                sx={{
                                                                    "& *": {
                                                                        fontFamily: "Manrope !important",
                                                                        fontSize: "14px",
                                                                    },
                                                                }}
                                                                variant="standard"
                                                                placeholder="address"
                                                                onChange={(e) => setvalues({ ...values, agent_address: e.target.value })}
                                                                fullWidth={true}
                                                                name="agent_address"
                                                                value={values.agent_address}
                                                            />
                                                            <Box sx={{ color: "red" }}>
                                                                <ErrorMessage name="agent_address" />
                                                            </Box>
                                                        </div>
                                                    </Grid>
                                                    <Grid item xs={7} className="bazaarplan-div pr-div br-none-pr" style={{ paddingTop: 0 }}>
                                                        <TextField
                                                            sx={{
                                                                "& *": {
                                                                    fontFamily: "Manrope !important",
                                                                    fontSize: "14px",
                                                                },
                                                            }}
                                                            variant="standard"
                                                            placeholder="city"
                                                            onChange={(e) => setvalues({ ...values, agent_city_name: e.target.value })}
                                                            fullWidth={true}
                                                            name="agent_city_name"
                                                            value={values.agent_city_name}
                                                        />
                                                        <Box sx={{ color: "red" }}>
                                                            <ErrorMessage name="agent_city_name" />
                                                        </Box>
                                                    </Grid>
                                                    <Grid item xs={5} className="bazaarplan-div pr-div" style={{ paddingTop: 0, paddingLeft: 0 }}>
                                                        <TextField
                                                            sx={{
                                                                "& *": {
                                                                    fontFamily: "Manrope !important",
                                                                    fontSize: "14px",
                                                                },
                                                            }}
                                                            placeholder="Customer ID"
                                                            variant="standard"
                                                            onChange={(e) => setvalues({ ...values, agent_cutomer_id: e.target.value })}
                                                            fullWidth={true}
                                                            name="agent_cutomer_id"
                                                            value={values.agent_cutomer_id}
                                                        />
                                                        <Box sx={{ color: "red" }}>
                                                            <ErrorMessage name="agent_cutomer_id" />
                                                        </Box>
                                                    </Grid>

                                                    <Grid item xs={12} className="bazaarplan-div pr-div" style={{ paddingTop: "24px" }}>
                                                        <div>
                                                            <p className="formTitle">Amount To Be Paid</p>
                                                            <TextField
                                                                sx={{
                                                                    "& *": {
                                                                        fontFamily: "Manrope !important",
                                                                        fontSize: "14px",
                                                                    },
                                                                }}
                                                                type="number"
                                                                placeholder="amount"
                                                                variant="standard"
                                                                onChange={(e) => setvalues({ ...values, agent_amount: e.target.value })}
                                                                fullWidth={true}
                                                                name="agent_amount"
                                                                value={values.agent_amount}
                                                            />
                                                            <Box sx={{ color: "red" }}>
                                                                <ErrorMessage name="agent_amount" />
                                                            </Box>
                                                        </div>
                                                    </Grid>
                                                </Grid>
                                            </div>
                                            <div style={{ textAlign: "center", paddingTop: "24px" }}>
                                                <button className="pay-now-btn" type="submit" title="Submit" onClick={paymentConfirm}>Pay Now</button>
                                            </div>
                                        </Form>
                                    )}
                                </Formik>
                            </div>
                        </div>
                    </Dialog>
                    <Dialog
                        open={addConfirmModalOpen}
                        maxWidth={"lg"}
                        sx={{
                            ".MuiPaper-root": {
                                borderRadius: "20px",
                            },
                        }}
                        onClose={() => setaddConfirmModalOpen(false)}
                    >
                        <div className={classes.AddDialog} style={{ padding: "24px 30px 30px", borderRadius: "5px" }}>
                            <p className="comissionTitle pb-[25px] text-center" style={{ fontWeight: 700, fontSize: "24px", lineHeight: "36px", color: "#2E2C34" }}>Are you sure you want to Pay?</p>
                            <div style={{ textAlign: "center" }}>
                                <button className="pay-now-btn" onClick={paymentSuccessModalM}>Pay Now</button>
                            </div>
                            <div style={{ textAlign: "center" }}>
                                <button className="reject-btn" onClick={() => setaddConfirmModalOpen(false)}>Reject</button>
                            </div>
                        </div>
                    </Dialog>
                </div>
            </DashboardLayout>
        </>
    );
};

export default PaymentRequest;
