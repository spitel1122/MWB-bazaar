import React, { useEffect } from "react";
import { useAgentDetailsStyle } from "@/static/stylesheets/screens";
import { ActionButton } from "@/components/atoms/Button/ActionButton";
import { AiOutlineArrowRight } from "react-icons/ai";
import { BsThreeDotsVertical } from "react-icons/bs";
import { Avatar, Grid, FormControl, InputLabel, Select, MenuItem } from "@mui/material";
import { GrFormCheckmark } from "react-icons/gr";
import CommonSelectElectronicBazaar from "@/components/atoms/CommonSelectElectronicBazaar/CommonSelectElectronicBazaar";
import { AppService } from "@/service/AllApiData.service";
import filterbtn from "@/static/images/button.png";

const Agentreport = () => {
    const classes = useAgentDetailsStyle();
    const [activeButton, setActiveButton] = React.useState('wholesaler');
    const [selectedYear, setSelectedYear] = React.useState<number>(2023);
    const [AllBazaarData, setAllBazaarData] = React.useState<any>([]);
    const [bazaarList, setBazaarList] = React.useState([])

    const handleYearChange = (event: React.ChangeEvent<{ value: unknown }>) => {
        setSelectedYear(event.target.value as number);
    };

    const currentYear = new Date().getFullYear();

    const years = Array.from({ length: currentYear - 2000 + 1 }, (_, index) => 2000 + index);

    const WholesalersMonth = [{ id: 1, month: "January", totalWholesalers: 120 }, { id: 2, month: "February", totalWholesalers: 50 }, { id: 3, month: "March", totalWholesalers: 150 }, { id: 4, month: "April", totalWholesalers: 150 }, { id: 5, month: "May", totalWholesalers: 150 }, { id: 6, month: "June", totalWholesalers: 130 }, { id: 7, month: "July", totalWholesalers: 150 }, { id: 8, month: "August", totalWholesalers: 70 }, { id: 9, month: "September", totalWholesalers: 150 }, { id: 10, month: "October", totalWholesalers: 150 }, { id: 11, month: "November", totalWholesalers: 150 }, { id: 12, month: "December", totalWholesalers: 159 }]

    const earningsMonth = [{ id: 1, quarter: "Quarter 1", totalEarning: 120 }, { id: 2, quarter: "Quarter 2", totalEarning: 50 }, { id: 3, quarter: "Quarter 3", totalEarning: 150 }, { id: 4, quarter: "Quarter 4", totalEarning: 150 }]

    useEffect(() => {
        getAllBazaar()
        getAllBazaarData()
    }, [])

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
    }
    const GetAllReportData = async () => {
        const responceJson = await AppService.getAgentAllReport();
        console.log('responceJson',responceJson)
    }
    useEffect(() => {
        GetAllReportData()
    }, [])

    return (
        <>
            <div className={classes.root}>
                <div className="flex gap-2" style={{ flexWrap: "wrap" }}>
                    <ActionButton variant={"primary"} title={"Today"} />
                    <ActionButton variant={"default"} title={"This Week"} />
                    <ActionButton variant={"default"} title={"Last Week"} />
                    <ActionButton variant={"default"} title={"This Month"} />
                    <ActionButton variant={"default"} title={"Last Month"} />
                </div>

                <div className="py-[30px]">
                    <p className="py-[20px]">Earnings</p>
                    <div style={{ background: "#F7F7F7" }}>
                        <Grid container spacing={2}>
                            <Grid item xs={6} style={{ paddingTop: 0 }}>
                                <div style={{ padding: "20px 24px", borderRight: "1px solid #e1e1e1" }}>
                                    <p className="statusTitle" style={{ color: "#2E2C34" }}>Wholesalers</p>
                                    <div className="flex gap-3 pt-[15px]">
                                        <p className="blancetitle">910</p>
                                    </div>
                                </div>
                            </Grid>
                            <Grid item xs={6} style={{ paddingTop: 0 }}>
                                <div style={{ padding: "20px 24px" }}>
                                    <p className="statusTitle" style={{ color: "#2E2C34" }}>Commission Earned</p>
                                    <div className="flex gap-3 pt-[15px]">
                                        <p className="blancetitle">₹5,56,690</p>
                                    </div>
                                </div>
                            </Grid>
                        </Grid>
                    </div>

                    <Grid container spacing={2} style={{ marginRight: 0, width: "100%", marginTop: "30px" }}>
                        {/*City-Wise Wholesalers*/}
                        <Grid item lg={4} md={6} sm={12} xs={12} style={{ paddingTop: 0 }}>
                            <div className="citycontainer p-[20px]" style={{ paddingTop: 0 }}>
                                <div className="flex justify-between py-[20px]">
                                    <p className="cityThead">City-Wise Wholesalers</p>
                                    <p className="citydrop cursor-pointer">Delhi-NCR</p>
                                </div>

                                <div>
                                    <table className="w-full">
                                        <thead>
                                            <tr className="border-b">
                                                <th className="text-start py-3 cityTablehead">Song</th>
                                                <th className="text-center py-3 cityTablehead">Artist</th>
                                                <th className="text-end py-3 cityTablehead">Year</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            <tr>
                                                <td className="py-2 cityTabledata">Delhi</td>
                                                <td className="text-center py-3 cityTabledata">12,202</td>
                                                <td className="text-end py-3 cityTabledata">₹150,200</td>
                                            </tr>
                                            <tr>
                                                <td className="py-2 cityTabledata">Delhi</td>
                                                <td className="text-center py-3 cityTabledata">12,202</td>
                                                <td className="text-end py-3 cityTabledata">₹150,200</td>
                                            </tr>
                                            <tr>
                                                <td className="py-2 cityTabledata">Delhi</td>
                                                <td className="text-center py-3 cityTabledata">12,202</td>
                                                <td className="text-end py-3 cityTabledata">₹150,200</td>
                                            </tr>
                                        </tbody>
                                    </table>

                                    <div className="flex gap-2 py-[10px] cursor-pointer items-center">
                                        <p className="cityButton">View More Customers</p>
                                        <AiOutlineArrowRight style={{ color: "#4E2FA9" }} />
                                    </div>
                                </div>
                            </div>
                        </Grid>
                        {/*Plan Expiry*/}
                        <Grid item lg={4} md={6} sm={12} xs={12} style={{ paddingTop: 0 }}>
                            <div className="citycontainer p-[20px]" style={{ paddingBottom: 0, paddingTop: 0 }}>
                                <div className="flex justify-between py-[20px]">
                                    <p className="cityThead">Plan Expiry</p>
                                    <BsThreeDotsVertical className="cursor-pointer" />
                                </div>
                                <div className="flex justify-between py-[5px]">
                                    <div className="flex gap-4">
                                        <div>
                                            <Avatar sx={{ width: 32, height: 32, fontSize: "12px", borderRadius: 5 }}>A</Avatar>
                                        </div>
                                        <div>
                                            <p className="planTitle">Retailer Name</p>
                                            <p className="planSubtitle">City Name</p>
                                        </div>
                                    </div>
                                    <p className="text-[#FFA043] font-[12px] bg-[#FFF6ED] p-[9px] rounded-md cursor-pointer" style={{ fontSize: "12px", lineHeight: "18px", paddingBottom: 0, height: "30px", paddingTop: 0, alignItems: "center", display: "flex" }}>
                                        Expiring Soon
                                    </p>
                                </div>

                                <div className="flex justify-between py-[5px]">
                                    <div className="flex gap-4">
                                        <div>
                                            <Avatar sx={{ width: 32, height: 32, fontSize: "12px", borderRadius: 5 }}>A</Avatar>
                                        </div>
                                        <div>
                                            <p className="planTitle">Retailer Name</p>
                                            <p className="planSubtitle">City Name</p>
                                        </div>
                                    </div>
                                    <p className="text-[#FFA043] font-[12px] bg-[#FFF6ED] p-[9px] rounded-md cursor-pointer" style={{ fontSize: "12px", lineHeight: "18px", paddingBottom: 0, height: "30px", paddingTop: 0, alignItems: "center", display: "flex" }}>
                                        Expiring Soon
                                    </p>
                                </div>
                                <div className="flex justify-between py-[5px]">
                                    <div className="flex gap-4">
                                        <div>
                                            <Avatar sx={{ width: 32, height: 32, fontSize: "12px", borderRadius: 5 }}>A</Avatar>
                                        </div>
                                        <div>
                                            <p className="planTitle">Retailer Name</p>
                                            <p className="planSubtitle">City Name</p>
                                        </div>
                                    </div>
                                    <p className="text-[#FFA043] font-[12px] bg-[#FFF6ED] p-[9px] rounded-md cursor-pointer" style={{ fontSize: "12px", lineHeight: "18px", paddingBottom: 0, height: "30px", paddingTop: 0, alignItems: "center", display: "flex" }}>
                                        Expiring Soon
                                    </p>
                                </div>
                                <div className="flex justify-between py-[5px]">
                                    <div className="flex gap-4">
                                        <div>
                                            <Avatar sx={{ width: 32, height: 32, fontSize: "12px", borderRadius: 5 }}>A</Avatar>
                                        </div>
                                        <div>
                                            <p className="planTitle">Retailer Name</p>
                                            <p className="planSubtitle">City Name</p>
                                        </div>
                                    </div>
                                    <p className="text-[#FFA043] font-[12px] bg-[#FFF6ED] p-[9px] rounded-md cursor-pointer" style={{ fontSize: "12px", lineHeight: "18px", paddingBottom: 0, height: "30px", paddingTop: 0, alignItems: "center", display: "flex" }}>
                                        Expiring Soon
                                    </p>
                                </div>
                                <div className="flex justify-between py-[5px]">
                                    <div className="flex gap-4">
                                        <div>
                                            <Avatar sx={{ width: 32, height: 32, fontSize: "12px", borderRadius: 5 }}>A</Avatar>
                                        </div>
                                        <div>
                                            <p className="planTitle">Retailer Name</p>
                                            <p className="planSubtitle">City Name</p>
                                        </div>
                                    </div>
                                    <p className="text-[#FFA043] font-[12px] bg-[#FFF6ED] p-[9px] rounded-md cursor-pointer" style={{ fontSize: "12px", lineHeight: "18px", paddingBottom: 0, height: "30px", paddingTop: 0, alignItems: "center", display: "flex" }}>
                                        Expiring Soon
                                    </p>
                                </div>

                                <div className="flex gap-2 mt-[15px] border-t-2 py-[20px] cursor-pointer items-center justify-center">
                                    <p className="cityButton">View More Customers</p>
                                    <AiOutlineArrowRight style={{ color: "#4E2FA9" }} />
                                </div>
                            </div>
                        </Grid>
                        {/*Transaction History*/}
                        <Grid item lg={4} md={6} sm={12} xs={12} style={{ paddingTop: 0 }}>
                            <div className="citycontainer p-[20px]" style={{ paddingBottom: 0, paddingTop: 0 }}>
                                <div className="flex justify-between py-[20px]">
                                    <p className="cityThead">Transaction History</p>
                                    <BsThreeDotsVertical className="cursor-pointer" />
                                </div>
                                <div className="flex justify-between py-[5px]">
                                    <div className="flex gap-4" style={{ alignItems: "center" }}>
                                        <div>
                                            <Avatar sx={{ width: 24, height: 24, fontSize: "12px", borderRadius: 5, background: "#20C9AC", }}>
                                                <GrFormCheckmark className="text-white" />
                                            </Avatar>
                                        </div>
                                        <div>
                                            <p className="planTitle">Payment from #1032</p>
                                            <p className="planSubtitle">Jan 21, 2019, 3:30pm</p>
                                        </div>
                                    </div>
                                    <div>
                                        <p className="planTitle text-end">+ $250.00</p>
                                        <p className="text-[#20C9AC] text-end" style={{ fontSize: "12px" }}>Completed</p>
                                    </div>
                                </div>

                                <div className="flex justify-between py-[5px]">
                                    <div className="flex gap-4" style={{ alignItems: "center" }}>
                                        <div>
                                            <Avatar sx={{ width: 24, height: 24, fontSize: "12px", borderRadius: 5 }}>A</Avatar>
                                        </div>
                                        <div>
                                            <p className="planTitle">Payment from #1032</p>
                                            <p className="planSubtitle">Jan 21, 2019, 3:30pm</p>
                                        </div>
                                    </div>
                                    <div>
                                        <p className="planTitle text-end">+ $250.00</p>
                                        <p className="text-[#20C9AC] text-end" style={{ fontSize: "12px" }}>Completed</p>
                                    </div>
                                </div>
                                <div className="flex justify-between py-[5px]">
                                    <div className="flex gap-4" style={{ alignItems: "center" }}>
                                        <div>
                                            <Avatar sx={{ width: 24, height: 24, fontSize: "12px", borderRadius: 5 }}>A</Avatar>
                                        </div>
                                        <div>
                                            <p className="planTitle">Payment from #1032</p>
                                            <p className="planSubtitle">Jan 21, 2019, 3:30pm</p>
                                        </div>
                                    </div>
                                    <div>
                                        <p className="planTitle text-end">+ $250.00</p>
                                        <p className="text-[#20C9AC] text-end" style={{ fontSize: "12px" }}>Completed</p>
                                    </div>
                                </div>
                                <div className="flex justify-between py-[5px]">
                                    <div className="flex gap-4" style={{ alignItems: "center" }}>
                                        <div>
                                            <Avatar sx={{ width: 24, height: 24, fontSize: "12px", borderRadius: 5 }}>A</Avatar>
                                        </div>
                                        <div>
                                            <p className="planTitle">Payment from #1032</p>
                                            <p className="planSubtitle">Jan 21, 2019, 3:30pm</p>
                                        </div>
                                    </div>
                                    <div>
                                        <p className="planTitle text-end">+ $250.00</p>
                                        <p className="text-[#20C9AC] text-end" style={{ fontSize: "12px" }}>Completed</p>
                                    </div>
                                </div>
                                <div className="flex justify-between py-[5px]">
                                    <div className="flex gap-4" style={{ alignItems: "center" }}>
                                        <div>
                                            <Avatar sx={{ width: 24, height: 24, fontSize: "12px", borderRadius: 5 }}>A</Avatar>
                                        </div>
                                        <div>
                                            <p className="planTitle">Payment from #1032</p>
                                            <p className="planSubtitle">Jan 21, 2019, 3:30pm</p>
                                        </div>
                                    </div>
                                    <div>
                                        <p className="planTitle text-end">+ $250.00</p>
                                        <p className="text-[#20C9AC] text-end" style={{ fontSize: "12px" }}>Completed</p>
                                    </div>
                                </div>

                                <div className="flex gap-2 mt-[15px] border-t-2 py-[20px] cursor-pointer items-center justify-center">
                                    <p className="cityButton">View More Customers</p>
                                    <AiOutlineArrowRight style={{ color: "#4E2FA9" }} />
                                </div>
                            </div>
                        </Grid>
                    </Grid>
                </div>

                <div style={{ margin: "0 10px" }}>
                    <div className="citycontainer p-[20px]" style={{ padding: "30px" }}>
                        <div className="flex justify-between" style={{ alignItems: "center", paddingBottom: "30px", flexWrap: "wrap" }}>
                            <p className="wtitle">Month wise Report</p>
                            <div style={{ display: "flex", overflowX: "auto" }}>
                                <button className={activeButton === 'wholesaler' ? 'monthwise-btn active' : 'monthwise-btn'}
                                    onClick={() => setActiveButton('wholesaler')}>Wholesaler</button>
                                <button className={activeButton === 'earnings' ? 'monthwise-disable-btn active' : 'monthwise-disable-btn'}
                                    onClick={() => setActiveButton('earnings')}>Earnings</button>
                            </div>
                            <p className="wtitle text-[#4E2FA9] cursor-pointer" style={{ fontSize: "14px", color: "#4E2FA9" }}>View all</p>
                        </div>
                        {activeButton === 'wholesaler' && (
                            <div className="wholesaler-div">
                                {/* Content for the wholesaler div */}
                                <div style={{ display: "flex", alignItems: "center", flexWrap: "wrap" }}>
                                    <FormControl>
                                        <InputLabel id="year-select-label" style={{ color: "#84818A", marginTop: "-8px" }}>Select Year</InputLabel>
                                        <Select
                                            labelId="year-select-label"
                                            id="year-select"
                                            value={selectedYear}
                                            onChange={(e: any) => handleYearChange(e)}
                                            className="year-selection"
                                            style={{ padding: "3px 15px", paddingLeft: "5px" }}
                                        >
                                            {years.map((year) => (
                                                <MenuItem key={year} value={year}>
                                                    {year}
                                                </MenuItem>
                                            ))}
                                        </Select>
                                    </FormControl>
                                    <div style={{ paddingLeft: "15px", paddingRight: "15px" }}>
                                        <CommonSelectElectronicBazaar
                                            label={"Bazaar"}
                                            hint={"Select Bazaar"}
                                            options={bazaarList}
                                            handleSelect={handleChange}
                                            selectedIds={AllBazaarData.filter((item: any) => item?.status).map((elm: any) => elm.id)}
                                        />
                                    </div>
                                    <img className="brandLogo" src={filterbtn} alt={"Logo"} style={{ paddingRight: "15px" }} />
                                    <button className="updatebtn">Update</button>
                                </div>
                                <div>
                                    <div className="flex gap-2 py-[30px]" style={{ flexWrap: "wrap" }}>
                                        <ActionButton variant={"primary"} title={"Today"} />
                                        <ActionButton variant={"default"} title={"This Week"} />
                                        <ActionButton variant={"default"} title={"Last Week"} />
                                        <ActionButton variant={"default"} title={"This Month"} />
                                        <ActionButton variant={"default"} title={"Last Month"} />
                                        <input type='date' style={{ border: "1px solid #e1e1e1", fontSize: "14px", borderRadius: "4px", padding: "5px 15px" }} />
                                    </div>
                                </div>

                                <Grid container spacing={2}>
                                    <Grid item lg={5} md={6} sm={12} xs={12} style={{ paddingTop: "15px" }}>
                                        <div className="bg-[#F9F5F2] flex justify-between p-[30px] rounded-md">
                                            <p className="agentpaymentTitle">Year - 2021</p>
                                            <div>
                                                <p className="statusTitle" style={{ color: "#2E2C34" }}>Total Customers</p>
                                                <div className="flex gap-3 pt-[15px]">
                                                    <p className="blancetitle">910</p>
                                                </div>
                                            </div>
                                        </div>
                                    </Grid>
                                </Grid>
                                <div className="py-[40px]">
                                    <Grid container spacing={2}>
                                        {WholesalersMonth?.map((item: any) => {
                                            return <Grid item lg={3} md={4} sm={6} xs={12} key={item.id}>
                                                <div className="bg-[#FF6652] p-[15px] rounded-t-md">
                                                    <p className="text-center calanderHead">{item.month}</p>
                                                </div>
                                                <div className="border-x-2 border-b-2 rounded-b-md">
                                                    <div className="p-[30px] text-center">
                                                        <p className="calanderTitle">No. of Wholesalers</p>
                                                        <p className="calanderSubtitle">{item.totalWholesalers}</p>
                                                    </div>
                                                </div>
                                            </Grid>
                                        })}
                                    </Grid>
                                </div>
                            </div>
                        )}

                        {activeButton === 'earnings' && (
                            <div className="earnings-div">
                                {/* Content for the earnings div */}
                                <div style={{ display: "flex", alignItems: "center", flexWrap: "wrap" }}>
                                    <FormControl>
                                        <InputLabel id="year-select-label" style={{ color: "#84818A", marginTop: "-8px" }}>Select Year</InputLabel>
                                        <Select
                                            labelId="year-select-label"
                                            id="year-select"
                                            value={selectedYear}
                                            onChange={(e: any) => handleYearChange(e)}
                                            className="year-selection"
                                            style={{ padding: "3px 15px", paddingLeft: "5px" }}
                                        >
                                            {years.map((year) => (
                                                <MenuItem key={year} value={year}>
                                                    {year}
                                                </MenuItem>
                                            ))}
                                        </Select>
                                    </FormControl>
                                    <div style={{ paddingLeft: "15px", paddingRight: "15px" }}>
                                        <CommonSelectElectronicBazaar
                                            label={"Bazaar"}
                                            hint={"Select Bazaar"}
                                            options={bazaarList}
                                            handleSelect={handleChange}
                                            selectedIds={AllBazaarData.filter((item: any) => item?.status).map((elm: any) => elm.id)}
                                        />
                                    </div>
                                    <img className="brandLogo" src={filterbtn} alt={"Logo"} style={{ paddingRight: "15px" }} />
                                    <button className="updatebtn">Update</button>
                                </div>
                                <div>
                                    <div className="flex gap-2 py-[30px]" style={{ flexWrap: "wrap" }}>
                                        <ActionButton variant={"primary"} title={"Today"} />
                                        <ActionButton variant={"default"} title={"This Week"} />
                                        <ActionButton variant={"default"} title={"Last Week"} />
                                        <ActionButton variant={"default"} title={"This Month"} />
                                        <ActionButton variant={"default"} title={"Last Month"} />
                                        <input type='date' style={{ border: "1px solid #e1e1e1", fontSize: "14px", borderRadius: "4px", padding: "5px 15px" }} />
                                    </div>
                                </div>
                                <Grid container spacing={2}>
                                    <Grid item lg={5} md={6} sm={12} xs={12} style={{ paddingTop: "15px" }}>
                                        <div className="bg-[#F9F5F2] flex justify-between p-[30px] rounded-md">
                                            <p className="agentpaymentTitle">Year - 2021</p>
                                            <div>
                                                <p className="statusTitle" style={{ color: "#2E2C34" }}>Total Earnings</p>
                                                <div className="flex gap-3 pt-[15px]">
                                                    <p className="blancetitle">₹ 5,70,000</p>
                                                </div>
                                            </div>
                                        </div>
                                    </Grid>
                                </Grid>
                                <div className="py-[40px]">
                                    <Grid container spacing={2}>
                                        {earningsMonth?.map((item: any) => {
                                            return <Grid item lg={3} md={4} sm={6} xs={12} key={item.id}>
                                                <div className="bg-[#FF6652] p-[15px] rounded-t-md">
                                                    <p className="text-center calanderHead">{item.quarter}</p>
                                                </div>
                                                <div className="border-x-2 border-b-2 rounded-b-md">
                                                    <div className="p-[30px] text-center">
                                                        <p className="calanderTitle">Total Earnings</p>
                                                        <p className="calanderSubtitle">₹ {item.totalEarning}</p>
                                                    </div>
                                                </div>
                                            </Grid>
                                        })}
                                    </Grid>
                                </div>
                            </div>
                        )}

                    </div>
                </div>
            </div >
        </>
    );
};

export default Agentreport;
