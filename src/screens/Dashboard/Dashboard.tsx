import React, { useEffect, useState } from "react";
import { Dialog, Grid, TextField } from "@mui/material";
import { DashboardLayout } from "@/components/layouts";
import Box from '@mui/material/Box';
import { SummaryCard } from "@/components/molecules/Dashboard/SummaryCard";
import { useDashboardStyles } from "@/static/stylesheets/screens";
import { BazaarReportCard } from "@/components/molecules/Bazaars/BazaarReportCard";
import { BazaarCard, BazaarCounter, BazaarsPlanList, } from "@/components/molecules/Bazaars";
import { ActionButton } from "@/components/atoms/Button/ActionButton";
import CommonSelect from "@/components/atoms/CommonSelect/CommonSelect";
import { AppService } from "../../service/AllApiData.service";
import dayjs, { Dayjs } from 'dayjs';
import Stack from '@mui/material/Stack';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker';
import { DateRangePicker } from "@mui/lab";
import { useNavigate } from "react-router-dom";
import DistrictPicker from "@/components/atoms/LocationPickers/DistrictPicker";
import CityPicker from "@/components/atoms/LocationPickers/CityPicker";
import { string } from "yup";
import DatePicker from "react-multi-date-picker";
import type { Value } from "react-multi-date-picker"

const Dashboard = () => {
    const [getAllBazar, setGetAllBazar] = useState([]);
    const [getyearSummeryData, setGetYearSummeryData] = useState({
        agent: 0, bazaar: 0, commission: 0, wholeseller: 0,
    });
    const [getTotalBazaar, setTotalBazaar] = useState("");
    const [getWholesellers, setWholesellers] = useState("");
    const [getRevenue, setRevenue] = useState("");
    const [getBill, setBill] = useState("");
    const [getAgent, setAgent] = useState("");
    const [getCommission, setCommission] = useState("");
    const [getCustomer, setCustomer] = useState("");
    const [activeTab, setActiveTab] = useState("")
    const [yearval, setYearval] = useState<any>("2021")
    const [active, setActive] = useState(null)
    const [todayrespo, setTodayrespo] = useState<any>(
        { plan: 0, subscriber: 0, revenue: 0 }
    )
    const [todayreport, setTodayreport] = useState<any>(
        { wholeseller: 0, agent: 0, commission: 0 }
    )
    const [bazzarlist, setbazzarlist] = useState<any>([])
    const [selectreportbazzar, setselectreportbazzar] = useState<any>([])
    const [selectreportbazzar2, setselectreportbazzar2] = useState<any>([])
    const [selectreportbazzar3, setselectreportbazzar3] = useState<any>([])
    const [districtData, setDistrictData] = useState<any>([])
    const [selectreportdistrict, setselectreportdistrict] = useState<any>([])
    const [selectreportdistrict2, setselectreportdistrict2] = useState<any>([])
    const [selectreportdistrict3, setselectreportdistrict3] = useState<any>([])
    const [stateData, setStateData] = useState<any>([])
    const [selectreportstate, setselectreportstate] = useState<any>([])
    const [selectreportstate2, setselectreportstate2] = useState<any>([])
    const [selectreportstate3, setselectreportstate3] = useState<any>([])
    const [cityData, setCityData] = useState<any>([])
    const [selectreportcity, setselectreportcity] = useState<any>([])
    const [selectreportcity2, setselectreportcity2] = useState<any>([])
    const [selectreportcity3, setselectreportcity3] = useState<any>([])
    const [getPlanname, setgetPlanname] = useState<any>([])
    const [selectplanname, setselectplanname] = useState<any>([])
    const [daterangevalue, setdaterangevalue] = useState<Value>([
    ]);
    const [daterangevalue2, setdaterangevalue2] = useState<Value>([
    ]);

    const getAllLists = async () => {
        const responseJson = await AppService.getAllDashBazaarLists();

        setTotalBazaar(responseJson.data.bazaar);
        setWholesellers(responseJson.data.wholeseller);
        setRevenue(responseJson.data.revenue);
        setBill(responseJson.data.bill);
        setAgent(responseJson.data.agent);
        setCommission(responseJson.data.commission);
        setCustomer(responseJson.data.customer);
    };


    const [value, setValue] = React.useState<Dayjs | null>(
        dayjs('2021-08-18T21:11:54'),
    );

    const handleChange = async (newValue: any) => {
        const formet: any = dayjs(newValue)
        setYearval(String(formet["$y"]))
        const responseJson = await AppService.getAllSummerys(String(formet["$y"]))
        if (responseJson?.status === 200) {
            setGetYearSummeryData(responseJson?.data)
        }
        setValue(formet);
    };
    const getAllListsMain = async () => {
        const responseJson = await AppService.getAllBazarList(1);
        setGetAllBazar(responseJson.data.results.slice(0, 9));
    };

    useEffect(() => {
        getAllLists();
        getAllListsMain();
    }, []);

    const classes = useDashboardStyles();


    const [open, setOpen] = React.useState(false);
    const handleClickOpen = () => {
        setOpen(true);
    };
    const handleClose = () => {
        setOpen(false);
    };

    const navigate = useNavigate();
    const handleClick = () => navigate('/bazaars');


    const handleToggle = async (e: any, value?: any) => {
        setActiveTab(e)
        if (e === 'six' || e === 'five' || e === 'four' || e === 'three' || e === 'two' || e === 'one') {
            const responseJson = await AppService.getAllreportToday(value)
            if (responseJson?.status === 200) {
                setTodayreport(responseJson?.data)
            }
        } else {
            const responseJson = await AppService.getAllplanToday(value)
            if (responseJson?.status === 200) {
                setTodayrespo(responseJson?.data)
            }
        }
    };
    const handletodayAction = async (val?: any) => {
        setActive(val)
        const responseJson = await AppService.getAllplanToday(val)
        setTodayrespo(responseJson?.data?.plan)
    }
    const handleStateChange = (e: any, selectboxName: string, id: string) => {
        const { checked } = e.target;
        if (selectboxName === 'All Bazaars') {
            if (checked === true) {
                setselectreportbazzar((prev: any) => ([...prev, id]))
            } else {
                const filterbazzar = selectreportbazzar?.filter((im: any) => im !== id)
                setselectreportbazzar([...filterbazzar])
            }
        }
        if (selectboxName === 'All States') {
            if (checked === true) {
                setselectreportstate((prev: any) => ([...prev, id]))
            } else {
                const filterbazzar = selectreportstate?.filter((im: any) => im !== id)
                setselectreportstate([...filterbazzar])
            }
        }
        if (selectboxName === 'All Cities') {
            if (checked === true) {
                setselectreportcity((prev: any) => ([...prev, id]))
            } else {
                const filterbazzar = selectreportcity?.filter((im: any) => im !== id)
                setselectreportcity([...filterbazzar])
            }
        }
        if (selectboxName === 'All District') {
            if (checked === true) {
                setselectreportdistrict((prev: any) => ([...prev, id]))
            } else {
                const filterbazzar = selectreportdistrict?.filter((im: any) => im !== id)
                setselectreportdistrict([...filterbazzar])
            }
        }
    }

    const handleStateChange2 = (e: any, selectboxName: string, id: string) => {
        const { checked } = e.target;
        if (selectboxName === 'All Bazaars') {
            if (checked === true) {
                setselectreportbazzar2((prev: any) => ([...prev, id]))
            } else {
                const filterbazzar = selectreportbazzar2?.filter((im: any) => im !== id)
                setselectreportbazzar2([...filterbazzar])
            }
        }
        if (selectboxName === 'All States') {
            if (checked === true) {
                setselectreportstate2((prev: any) => ([...prev, id]))
            } else {
                const filterbazzar = selectreportstate2?.filter((im: any) => im !== id)
                setselectreportstate2([...filterbazzar])
            }
        }
        if (selectboxName === 'All Cities') {
            if (checked === true) {
                setselectreportcity2((prev: any) => ([...prev, id]))
            } else {
                const filterbazzar = selectreportcity2?.filter((im: any) => im !== id)
                setselectreportcity2([...filterbazzar])
            }
        }
        if (selectboxName === 'All District') {
            if (checked === true) {
                setselectreportdistrict2((prev: any) => ([...prev, id]))
            } else {
                const filterbazzar = selectreportdistrict2?.filter((im: any) => im !== id)
                setselectreportdistrict2([...filterbazzar])
            }
        }
    }

    const handleStateChange3 = (e: any, selectboxName: string, id: string) => {
        const { checked } = e.target;
        if (selectboxName === 'All Bazaars') {
            if (checked === true) {
                setselectreportbazzar3((prev: any) => ([...prev, id]))
            } else {
                const filterbazzar = selectreportbazzar3?.filter((im: any) => im !== id)
                setselectreportbazzar3([...filterbazzar])
            }
        }

        if (selectboxName === 'All States') {
            if (checked === true) {
                setselectreportstate3((prev: any) => ([...prev, id]))
            } else {
                const filterbazzar = selectreportstate3?.filter((im: any) => im !== id)
                setselectreportstate3([...filterbazzar])
            }
        }
        if (selectboxName === 'All District') {
            if (checked === true) {
                setselectreportdistrict3((prev: any) => ([...prev, id]))
            } else {
                const filterbazzar = selectreportdistrict3?.filter((im: any) => im !== id)
                setselectreportdistrict3([...filterbazzar])
            }
        }
        if (selectboxName === 'All Cities') {
            if (checked === true) {
                setselectreportcity3((prev: any) => ([...prev, id]))
            } else {
                const filterbazzar = selectreportcity3?.filter((im: any) => im !== id)
                setselectreportcity3([...filterbazzar])
            }
        }
        if (selectboxName === "Plan Name") {
            if (checked === true) {
                setselectplanname((prev: any) => ([...prev, id]))
            } else {
                const filterbazzar = selectplanname?.filter((im: any) => im !== id)
                setselectplanname([...filterbazzar])
            }
        }

    }

    const getAllbazzarlist = async () => {
        const responceJson = await AppService?.getAllBazaar()
        const bazaardata = responceJson?.data?.results?.map((it: any) => {
            return {
                label: it?.bazaar_name,
                value: it?.id
            }
        }
        )
        setbazzarlist([...bazaardata])
    }
    const getTotalDistrictData = async () => {
        const responseJson = await AppService.getTotalDistrict();
        const data = responseJson?.data?.map((it: any) => {
            return {
                label: it?.district,
                value: it?.id
            }
        })
        setDistrictData([...data]);
    };
    const getTotalCities = async () => {
        const responseJson = await AppService.getAllLIstCity();
        const data = responseJson?.data?.results?.map((it: any) => {
            return {
                label: it?.city,
                value: it?.id
            }
        })
        setCityData([...data]);
    };
    const getTotalStates = async () => {
        const responseJson = await AppService.getTotalStates();
        const data = responseJson?.data?.map((it: any) => {
            return {
                label: it?.state,
                value: it?.id
            }
        })
        setStateData([...data]);
    };
    useEffect(() => {
        getAllbazzarlist()
        getTotalDistrictData()
        getTotalCities()
        getTotalStates()
    }, [])
    const getreportbazzar = async ({ selectreportbazzar, selectreportstate, selectreportdistrict, selectreportcity }: any) => {
        const namefilter = bazzarlist?.filter((it: any) => selectreportbazzar?.includes(it?.value))?.map((im: any) => im?.label);
        if (namefilter?.length > 0) {
            const responseJson = await AppService?.getAllreportfilterbazzar({ bazaar: namefilter })
            setTodayreport(responseJson?.data)
        }
        const statenamefilter = stateData?.filter((it: any) => selectreportstate?.includes(it?.value))?.map((im: any) => im?.label);
        if (namefilter?.length > 0) {
            const responseJson = await AppService?.getAllreportfilterbazzar({ states: statenamefilter })
            setTodayreport(responseJson?.data)
        }
        const citynamefilter = stateData?.filter((it: any) => selectreportcity?.includes(it?.value))?.map((im: any) => im?.label);
        if (namefilter?.length > 0) {
            const responseJson = await AppService?.getAllreportfilterbazzar({ cities: citynamefilter })
            setTodayreport(responseJson?.data)
        }
        const districtnamefilter = stateData?.filter((it: any) => selectreportdistrict?.includes(it?.value))?.map((im: any) => im?.label);
        if (namefilter?.length > 0) {
            const responseJson = await AppService?.getAllreportfilterbazzar({ disctrict: districtnamefilter })
            setTodayreport(responseJson?.data)
        }
    }
    const getplanbazzar = async ({ selectreportbazzar2, selectreportstate2, selectreportdistrict2, selectreportcity2 }: any) => {
        const namefilter = bazzarlist?.filter((it: any) => selectreportbazzar2?.includes(it?.value))?.map((im: any) => im?.label);
        if (namefilter?.length > 0) {
            const responseJson = await AppService?.getAllplanfilterbazzar({ bazaar: namefilter })
            setTodayrespo(responseJson?.data)
        }
        const statenamefilter = stateData?.filter((it: any) => selectreportstate2?.includes(it?.value))?.map((im: any) => im?.label);
        if (namefilter?.length > 0) {
            const responseJson = await AppService?.getAllplanfilterbazzar({ states: statenamefilter })
            setTodayrespo(responseJson?.data)
        }
        const citynamefilter = stateData?.filter((it: any) => selectreportcity2?.includes(it?.value))?.map((im: any) => im?.label);
        if (namefilter?.length > 0) {
            const responseJson = await AppService?.getAllplanfilterbazzar({ cities: citynamefilter })
            setTodayrespo(responseJson?.data)
        }
        const districtnamefilter = stateData?.filter((it: any) => selectreportdistrict2?.includes(it?.value))?.map((im: any) => im?.label);
        if (namefilter?.length > 0) {
            const responseJson = await AppService?.getAllplanfilterbazzar({ disctrict: districtnamefilter })
            setTodayrespo(responseJson?.data)
        }
    }
    const getplanbazzar2 = async ({ selectreportbazzar3, selectreportstate3, selectreportdistrict3, selectreportcity3 }: any) => {
        const namefilter = bazzarlist?.filter((it: any) => selectreportbazzar3?.includes(it?.value))?.map((im: any) => im?.label);
        if (namefilter?.length > 0) {
            const responseJson = await AppService?.getAllplanfilterbazzar({ bazaar: namefilter })
            setTodayrespo(responseJson?.data)
        }
        const statenamefilter = stateData?.filter((it: any) => selectreportstate3?.includes(it?.value))?.map((im: any) => im?.label);
        if (namefilter?.length > 0) {
            const responseJson = await AppService?.getAllplanfilterbazzar({ states: statenamefilter })
            setTodayrespo(responseJson?.data)
        }
        const citynamefilter = stateData?.filter((it: any) => selectreportcity3?.includes(it?.value))?.map((im: any) => im?.label);
        if (namefilter?.length > 0) {
            const responseJson = await AppService?.getAllplanfilterbazzar({ cities: citynamefilter })
            setTodayrespo(responseJson?.data)
        }
        const districtnamefilter = stateData?.filter((it: any) => selectreportdistrict3?.includes(it?.value))?.map((im: any) => im?.label);
        if (namefilter?.length > 0) {
            const responseJson = await AppService?.getAllplanfilterbazzar({ disctrict: districtnamefilter })
            setTodayrespo(responseJson?.data)
        }
    }
    const getAllplannames = async () => {
        const responseJson = await AppService.getAllPlansData()
        const data = responseJson?.data?.results?.map((im: any) => {
            return {
                label: im?.plan_name,
                value: Math.floor(Math.random() * 999999)
            }
        })
        setgetPlanname([...data])
    }
    useEffect(() => {
        getAllplannames()
    }, [])
    useEffect(() => {
        getreportbazzar({ selectreportbazzar: selectreportbazzar, selectreportcity: selectreportcity, selectreportdistrict: selectreportdistrict, selectreportstate: selectreportstate })
    }, [selectreportbazzar?.length, selectreportcity?.length, selectreportdistrict?.length, selectreportstate?.length])

    useEffect(() => {
        getplanbazzar({ selectreportbazzar2: selectreportbazzar2, selectreportcity2: selectreportcity2, selectreportdistrict2: selectreportdistrict2, selectreportstate2: selectreportstate2 })
    }, [selectreportbazzar2?.length, selectreportcity2?.length, selectreportdistrict2?.length, selectreportstate2?.length])

    useEffect(() => {
        getplanbazzar2({ selectreportbazzar3: selectreportbazzar3, selectreportcity3: selectreportcity3, selectreportdistrict3: selectreportdistrict3, selectreportstate3: selectreportstate3 })
    }, [selectreportbazzar3?.length, selectreportcity3?.length, selectreportdistrict3?.length, selectreportstate3?.length])

    return (
        <>
            <DashboardLayout>
                <div className={classes.root}>
                    <div className={classes.summaryTitle}>
                        <p>Summary </p>
                        <LocalizationProvider dateAdapter={AdapterDayjs}>
                            <Stack spacing={3}>
                                <DesktopDatePicker
                                    views={["year"]}
                                    inputFormat={yearval}
                                    value={value}
                                    onChange={handleChange}
                                    renderInput={(params) => <TextField {...params} />}
                                />
                            </Stack>
                        </LocalizationProvider>
                    </div>

                    <div>
                        <SummaryCard summary={getyearSummeryData} />
                    </div>

                    <div className={classes.commonTitle}>
                        <p>Bazaar Report</p>
                    </div>

                    <div className="bazaarButtons">
                        <div onClick={() => {
                            handleToggle('one', "Today");
                        }}><ActionButton variant={activeTab === 'one' ? "primary" : "default"} title={"Today"} /></div>
                        <div onClick={() => {
                            handleToggle('two', "This Week");
                        }}><ActionButton variant={activeTab === 'two' ? "primary" : "default"} title={"This Week"} />
                        </div>
                        <div onClick={() => {
                            handleToggle('three', "Last Week");
                        }}><ActionButton variant={activeTab === 'three' ? "primary" : "default"} title={"Last Week"} />
                        </div>
                        <div onClick={() => {
                            handleToggle('four', "This Month");
                        }}><ActionButton variant={activeTab === 'four' ? "primary" : "default"} title={"This Month"} />
                        </div>
                        <div onClick={() => {
                            handleToggle('five', "Last Month");
                        }}><ActionButton variant={activeTab === 'five' ? "primary" : "default"} title={"Last Month"} />
                        </div>
                        {/* <div onClick={() => {
                            handleToggle('six', 'Add');
                        }}><ActionButton variant={activeTab === 'six' ? "primary" : "default"} title={"Add"} /></div> */}
                        <DatePicker render={<input type="text" readOnly className="h-[40px] cursor-pointer w-[194px] text-[#84818A] text-[14px] font-[Manrope] font-[600] outline-none border border-[#EBEAED] px-[5px]" placeholder="Select Date Range" />} value={daterangevalue} dateSeparator=" to " format="DD/MM/YYYY" range onChange={setdaterangevalue} />

                        <LocalizationProvider dateAdapter={AdapterDayjs}>
                            <Stack spacing={3}>
                                <DateRangePicker
                                    label="Year"
                                    value={value}
                                    onChange={handleChange}
                                    renderInput={(startProps: any, endProps: any) => (
                                        <React.Fragment>
                                            <TextField {...startProps} />
                                            <Box sx={{ mx: 2 }}> to </Box>
                                            <TextField {...endProps} />
                                        </React.Fragment>
                                    )}
                                />
                            </Stack>
                        </LocalizationProvider>
                    </div>


                    <div className="bazaarFilters pt-[20px]">
                        <CommonSelect
                            handleSelect={handleStateChange}
                            label={"All Bazaars"}
                            hint={"Select Bazaar"}
                            options={bazzarlist}
                            selectedIds={selectreportbazzar}
                        />

                        <CommonSelect
                            handleSelect={handleStateChange}
                            label={"All States"}
                            hint={"Search"}
                            options={stateData}
                            selectedIds={selectreportstate}
                        />

                        <CommonSelect
                            handleSelect={handleStateChange}
                            label={"All District"}
                            hint={"Search"}
                            options={districtData}
                            selectedIds={selectreportdistrict}
                        />

                        <CommonSelect
                            handleSelect={handleStateChange}
                            label={"All Cities"}
                            hint={"Search"}
                            options={cityData}
                            selectedIds={selectreportcity}
                        />
                    </div>

                    <div className="bazaarReport">
                        <BazaarReportCard
                            title="Total Retailers"
                            count={getWholesellers}
                            revenue="Total revenue Earned"
                            prize={`Rs- ${getRevenue ? getRevenue : ''}`}
                            bills="No of Bills"
                            billsNumber={getBill}
                        />
                        <BazaarReportCard
                            title="Total Agents"
                            count={getAgent}
                            revenue="Commission Paid"
                            prize={`Rs- ${getCommission ? getCommission : ''}`}
                            bills="Customers Generated"
                            billsNumber={getCustomer}
                        />
                    </div>

                    <div className={classes.commonTitle}>
                        <p>Plan Sold</p>
                        <p className="moreButton" onClick={handleClickOpen}>See all</p>
                    </div>

                    <div className="bazaarButtons">
                        <div onClick={() => {
                            handleToggle('seven', 'Today');
                        }}><ActionButton variant={activeTab === 'seven' ? "primary" : "default"} title={"Today"} /></div>
                        <div onClick={() => {
                            handleToggle('eight', 'This Week');
                        }}><ActionButton variant={activeTab === 'eight' ? "primary" : "default"} title={"This Week"} />
                        </div>
                        <div onClick={() => {
                            handleToggle('nine', 'Last Week');
                        }}><ActionButton variant={activeTab === 'nine' ? "primary" : "default"} title={"Last Week"} />
                        </div>
                        <div onClick={() => {
                            handleToggle('ten', 'This Month');
                        }}><ActionButton variant={activeTab === 'ten' ? "primary" : "default"} title={"This Month"} />
                        </div>
                        <div onClick={() => {
                            handleToggle('eleven', 'Last Month');
                        }}><ActionButton variant={activeTab === 'eleven' ? "primary" : "default"} title={"Last Month"} />
                        </div>
                        {/* <div onClick={() => {
                            handleToggle('twelve', 'Add');
                        }}><ActionButton variant={activeTab === 'twelve' ? "primary" : "default"} title={"Add"} /></div> */}
                        <DatePicker render={<input type="text" readOnly className="h-[40px] w-[194px] cursor-pointer text-[#84818A] text-[14px] font-[Manrope] font-[600] outline-none border border-[#EBEAED] px-[5px]" placeholder={'Select Date Range'} />} value={daterangevalue2} dateSeparator=" to " format="DD/MM/YYYY" range onChange={setdaterangevalue2} />

                        <LocalizationProvider dateAdapter={AdapterDayjs}>
                            <Stack spacing={3}>
                                <DateRangePicker
                                    label="Year"
                                    value={value}
                                    onChange={handleChange}
                                    renderInput={(startProps: any, endProps: any) => (
                                        <React.Fragment>
                                            <TextField {...startProps} />
                                            <Box sx={{ mx: 2 }}> to </Box>
                                            <TextField {...endProps} />
                                        </React.Fragment>
                                    )}
                                />


                            </Stack>
                        </LocalizationProvider>
                    </div>

                    <div className="bazaarFilters pt-[20px]">
                        <CommonSelect
                            handleSelect={handleStateChange2}
                            label={"All Bazaars"}
                            hint={"Select Bazaar"}
                            options={bazzarlist}
                            selectedIds={selectreportbazzar2}
                        />

                        <CommonSelect
                            handleSelect={handleStateChange2}
                            label={"All States"}
                            hint={"Search"}
                            options={stateData}
                            selectedIds={selectreportstate2}
                        />

                        <CommonSelect
                            handleSelect={handleStateChange2}
                            label={"All District"}
                            hint={"Search"}
                            options={districtData}
                            selectedIds={selectreportdistrict2}
                        />

                        <CommonSelect
                            handleSelect={handleStateChange2}
                            label={"All Cities"}
                            hint={"Search"}
                            options={cityData}
                            selectedIds={selectreportcity2}
                        />
                    </div>

                    <div className="counterCard">
                        <BazaarCounter data={todayrespo} />
                    </div>

                    <div className="planList">
                        <BazaarsPlanList />
                    </div>

                    <div className={classes.commonTitle}>
                        <p>All Bazaar</p>
                        <p className="moreButton" onClick={handleClick}>See all</p>
                    </div>

                    <div className="bazaarCard">
                        <Grid container spacing={2}>
                            <BazaarCard getAllBazars={getAllBazar} />
                        </Grid>
                    </div>
                </div>
                {/* All Plans Details */}
                <Dialog open={open} className="planPopUP" onClose={handleClose} aria-labelledby="alert-dialog-title"
                    aria-describedby="alert-dialog-description">
                    <div className="flex items-center justify-between">
                        <p className="text-[#2E2C34] text-[18px] font-semibold pb-3">All Plan Sold</p>
                        <p className="closeBtn cursor-pointer" onClick={handleClose}></p>
                    </div>
                    {/* <div className="bazaarButtons">
                        <ActionButton variant={active === "Today" ? "primary" : 'default'} title={"Today"} onClick={() => handletodayAction("Today")} />
                        <ActionButton variant={active === "This Week" ? "primary" : 'default'} title={"This Week"} onClick={() => handletodayAction("This Week")} />
                        <ActionButton variant={active === "Last Week" ? "primary" : 'default'} title={"Last Week"} onClick={() => handletodayAction("Last Week")} />
                        <ActionButton variant={active === "This Month" ? "primary" : 'default'} title={"This Month"} onClick={() => handletodayAction("This Month")} />
                        <ActionButton variant={active === "Last Month" ? "primary" : 'default'} title={"Last Month"} onClick={() => handletodayAction("Last Month")} />
                        <ActionButton variant={active === "Add" ? "primary" : 'default'} title={"Add"} onClick={() => handletodayAction("Add")} />
                    </div> */}

                    <div className="flex gap-2 py-[20px]">
                        <CommonSelect
                            handleSelect={handleStateChange3}
                            label={"Plan Name"}
                            hint={"Select Plan Name"}
                            options={getPlanname}
                            selectedIds={selectplanname}
                        />

                        <CommonSelect
                            handleSelect={handleStateChange3}
                            label={"All Bazaars"}
                            hint={"Select Bazaar"}
                            options={bazzarlist}
                            selectedIds={selectreportbazzar3}
                        />


                        <CommonSelect
                            handleSelect={handleStateChange3}
                            label={"All States"}
                            hint={"Search"}
                            options={stateData}
                            selectedIds={selectreportstate3}
                        />

                        <CommonSelect
                            handleSelect={handleStateChange3}
                            label={"All District"}
                            hint={"Search"}
                            options={districtData}
                            selectedIds={selectreportdistrict3}
                        />

                        <CommonSelect
                            handleSelect={handleStateChange3}
                            label={"All Cities"}
                            hint={"Search"}
                            options={cityData}
                            selectedIds={selectreportcity3}
                        />
                    </div>

                    <div className="counterCard pt-5">
                        <BazaarCounter data={todayrespo} />
                    </div>

                    <div className="planList">
                        <BazaarsPlanList />
                    </div>

                </Dialog>
                {/* All Plans Details */}

            </DashboardLayout>
        </>
    );
};

export default Dashboard;
