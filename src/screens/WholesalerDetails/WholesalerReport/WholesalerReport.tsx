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
import mapimg from "@/static/images/Maps.png";
import Arrowup from "@/static/images/call_made.png";
import { useParams, useNavigate } from "react-router-dom";
import UserAvatar from 'react-avatar';

const WholesalerReport = () => {
    const classes = useAgentDetailsStyle();
    const navigate = useNavigate()
    const [selectedYear, setSelectedYear] = React.useState<number>(2023);
    const [AllBazaarData, setAllBazaarData] = React.useState<any>([]);
    const [bazaarList, setBazaarList] = React.useState([])
    const [AllCityWiseWholesellers, setAllCityWiseWholesellers] = React.useState<any>([]);
    const [RealtimeSale, setRealtimeSale] = React.useState<any>([]);
    const [TotalWholesellerOrders, setTotalWholesellerOrders] = React.useState<any>([]);
    const [TotalWholesellerIncome, setTotalWholesellerIncome] = React.useState<any>([]);
    const [TopProducts, setTopProducts] = React.useState<any>([]);
    const [NewRetailers, setNewRetailers] = React.useState<any>([]);
    const [TransactionHistory, setTransactionHistory] = React.useState<any>([]);
    const [reportdata, setreportdata] = React.useState<any>({});

    const { id } = useParams()

    console.log('TransactionHistory', id)

    useEffect(()=>{
        if(id){
            getreprtdata()
        }
    },[id])
    
    const getreprtdata = async() =>{
        const respons = await AppService.getreportalldatas(id)
        setreportdata(respons.data)
        console.log(respons.data,"responsrespons")
    }

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
        getCityWiseWholesalerData()
        getRealtimeWholesalerSale()
        TotalOrdersApi()
        TotalIncomeApi()
        WholesalerTopProducts()
        getWholesellerNewRetailersApi()
        getWholesellerTransactionHistoryAPI()
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

    const getRealtimeWholesalerSale = async () => {
        const res = await AppService.getWholesellerRealSale(id)
        setRealtimeSale(res?.data)
    }
    const TotalOrdersApi = async () => {
        const res = await AppService.getWholesellerTotalOrders(id)
        setTotalWholesellerOrders(res?.data)
    }
    const TotalIncomeApi = async () => {
        const res = await AppService.getWholesellerTotalIncome(id)
        setTotalWholesellerIncome(res?.data)
    }
    const WholesalerTopProducts = async () => {
        const res = await AppService.getWholesellerTopProducts(id)
        setTopProducts(res?.data?.result)
    }
    const getWholesellerNewRetailersApi = async () => {
        const res = await AppService.getWholesellerNewRetailers(id)
        setNewRetailers(res?.data)
    }
    const getWholesellerTransactionHistoryAPI = async () => {
        const res = await AppService.getWholesellerTransactionHistory(id)
        setTransactionHistory(res?.data)
    }
    const getCityWiseWholesalerData = async () => {
        const res = await AppService.getCitywiseWholeseller(id)
        setAllCityWiseWholesellers(res.data.results)
    }
    const groupedData = AllCityWiseWholesellers?.reduce((result: any, current: any) => {
        const { cities, orders, sales } = current;
        if (!result[cities]) {
            result[cities] = { cities, orders, sales };
        } else {
            result[cities].orders += orders;
            result[cities].sales += sales;
        }
        return result;
    }, {});
    const groupedArray = Object.values(groupedData);
    const TotalOrders = RealtimeSale.reduce((total: 0, orders: any) => total + orders.Orders, 0);
    const TotalSales = RealtimeSale.reduce((total: 0, sales: any) => total + sales["Avg. Sales per Day"], 0);

    return (
        <>
            <div className={classes.root}>
                <div style={{ display: "flex", alignItems: "center", flexWrap: "wrap" }}>
                    <FormControl>
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
                <div className="pb-[30px]">
                    <p className="py-[20px] mb-[15px]">Earnings</p>
                    <div style={{ background: "#F7F7F7" }}>
                        <Grid container spacing={2}>
                            <Grid item xs={6} style={{ paddingTop: 0 }}>
                                <div style={{ padding: "20px 24px", borderRight: "1px solid #e1e1e1" }}>
                                    <p className="statusTitle" style={{ color: "#2E2C34" }}>Total Orders</p>
                                    <div className="flex gap-3 pt-[15px]">
                                        <p className="blancetitle">{TotalWholesellerOrders ? TotalWholesellerOrders["total order"] : 0}</p>
                                    </div>
                                </div>
                            </Grid>
                            <Grid item xs={6} style={{ paddingTop: 0 }}>
                                <div style={{ padding: "20px 24px" }}>
                                    <p className="statusTitle" style={{ color: "#2E2C34" }}>Total Income</p>
                                    <div className="flex gap-3 pt-[15px]">
                                        <p className="blancetitle">₹{TotalWholesellerIncome ? TotalWholesellerIncome["total Income"] : 0}</p>
                                    </div>
                                </div>
                            </Grid>
                        </Grid>
                    </div>

                    <Grid container spacing={2} style={{ marginRight: 0, width: "100%", marginTop: "30px", padding: "0 5px" }}>
                        {/*City-Wise Wholesalers*/}
                        <Grid item lg={4} md={6} sm={12} xs={12} style={{ paddingTop: 0 }}>
                            <div className="citycontainer p-[20px]" style={{ paddingTop: 0, position: "relative" }}>
                                <div className="flex justify-between py-[20px]">
                                    <p className="cityThead">City-Wise Business</p>
                                    <p className="citydrop cursor-pointer">Delhi-NCR</p>
                                </div>
                                <div>
                                    <img src={mapimg} alt='img' />
                                </div>
                                <div>
                                    <table className="w-full">
                                        <thead>
                                            <tr className="border-b">
                                                <th className="text-start py-3 cityTablehead">CITIES</th>
                                                <th className="text-center py-3 cityTablehead">ORDERS</th>
                                                <th className="text-end py-3 cityTablehead">SALES</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {groupedArray?.map((item: any) => {
                                                return <tr>
                                                    <td className="py-2 cityTabledata">{item.cities}</td>
                                                    <td className="text-center py-3 cityTabledata">{item.orders}</td>
                                                    <td className="text-end py-3 cityTabledata">₹{item.sales}</td>
                                                </tr>
                                            })}
                                        </tbody>
                                    </table>

                                    {groupedArray?.length > 5 && <div className="flex gap-2 py-[10px] cursor-pointer items-center view-more-button">
                                        <p className="cityButton">View More Customers</p>
                                        <AiOutlineArrowRight style={{ color: "#4E2FA9" }} />
                                    </div>}
                                </div>
                            </div>
                        </Grid>
                        <Grid item lg={8} md={6} sm={12} xs={12} style={{ paddingTop: 0 }}>
                            <div className="citycontainer p-[20px]" style={{ paddingTop: 0, height: "100%" }}>
                                <div className="flex justify-between py-[20px]">
                                    <p className="cityThead">Top Poducts</p>
                                    <p className="citydrop cursor-pointer" style={{ color: "#5542F6" }} onClick={() => navigate('/wholesellerproducts')}>View all</p>
                                </div>
                                <div>
                                    <table className="w-full">
                                        <thead>
                                            <tr className="border-b">
                                                <th className="text-start py-3 cityTablehead">ITEM</th>
                                                <th className="text-center py-3 cityTablehead">PRICE</th>
                                                <th className="text-center py-3 cityTablehead">SOLD</th>
                                                <th className="text-end py-3 cityTablehead">SALES</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {TopProducts?.length > 0 ? TopProducts?.map((item: any) => {
                                                return <tr key={item?.id}>
                                                    <td className="py-2 cityTabledata">{item.product_name}</td>
                                                    <td className="text-center py-3 cityTabledata">₹{item.product_total_mrp}</td>
                                                    <td className="text-center py-3 cityTabledata">{item.sold}</td>
                                                    <td className="text-end py-3 cityTabledata">₹{item.sales}</td>
                                                </tr>
                                            }) : <p style={{ paddingTop: "15px", fontSize: "14px" }}>No Product yet</p>}
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </Grid>
                    </Grid>
                </div>

                <div>
                    <Grid container spacing={2} style={{ marginRight: 0, width: "100%", marginBottom: "30px", padding: "0 5px" }}>
                        {/*Plan Expiry*/}
                        <Grid item lg={4} md={6} sm={12} xs={12} style={{ paddingTop: 0 }}>
                            <div className="citycontainer p-[20px]" style={{ paddingBottom: "15px", paddingTop: 0, height: "100%", position: "relative" }}>
                                <div className="flex justify-between py-[20px]">
                                    <p className="cityThead">New Retailers</p>
                                    <BsThreeDotsVertical className="cursor-pointer" />
                                </div>
                                {NewRetailers?.length > 0 ? NewRetailers?.map((item: any) => {
                                    return <div className="flex justify-between py-[5px]" key={item?.id}>
                                        <div className="flex gap-4">
                                            <div className="user-avatar">
                                                <UserAvatar style={{ width: "32px", height: "32px", fontSize: "12px", borderRadius: "50%" }} name={item?.Name?.split(' ').map((name: any) => name[0]).join('').toUpperCase()} className='amenity-avatar' />
                                            </div>
                                            <div>
                                                <p className="planTitle">{item?.Name}</p>
                                                <p className="planSubtitle">Customer ID#{item?.customer_id}</p>
                                            </div>
                                        </div>
                                    </div>
                                }) : <p style={{ paddingTop: "15px", fontSize: "14px" }}>No Retailers yet</p>}
                                {NewRetailers?.length > 5 && <div className="flex gap-2 mt-[15px] border-t-2 py-[20px] pb-[10px] cursor-pointer items-center justify-center view-more-button" onClick={() => navigate('/admin/master-list')}>
                                    <p className="cityButton">View More Customers</p>
                                    <AiOutlineArrowRight style={{ color: "#4E2FA9" }} />
                                </div>}
                            </div>
                        </Grid>
                        {/*Transaction History*/}
                        <Grid item lg={4} md={6} sm={12} xs={12} style={{ paddingTop: 0 }}>
                            <div className="citycontainer p-[20px]" style={{ paddingBottom: 0, paddingTop: 0, height: "100%", position: "relative" }}>
                                <div className="flex justify-between py-[20px]">
                                    <p className="cityThead">Transaction History</p>
                                    <BsThreeDotsVertical className="cursor-pointer" />
                                </div>
                                {TransactionHistory?.map((payment: any) => {
                                    return Object?.entries(payment)?.map(([propertyName, value]) => (
                                        <div className="flex justify-between py-[5px]" key={propertyName}>
                                            <div className="flex gap-4" style={{ alignItems: "center" }}>
                                                <div>
                                                    <Avatar sx={{ width: 24, height: 24, fontSize: "12px", borderRadius: 5, background: "#20C9AC", }}>
                                                        <GrFormCheckmark className="text-white" />
                                                    </Avatar>
                                                </div>
                                                <div>
                                                    <p className="planTitle">{propertyName}</p>
                                                    <p className="planSubtitle">Jan 21, 2019, 3:30pm</p>
                                                </div>
                                            </div>
                                            <div>
                                                <p className="planTitle text-end">+ {value as number}</p>
                                                <p className="text-[#20C9AC] text-end" style={{ fontSize: "12px" }}>Completed</p>
                                            </div>
                                        </div>
                                    ));
                                })}
                                <div className="flex gap-2 mt-[15px] border-t-2 py-[20px] cursor-pointer items-center justify-center view-more-button" onClick={() => navigate('/paymentrequest')}>
                                    <p className="cityButton">View More Transactions</p>
                                    <AiOutlineArrowRight style={{ color: "#4E2FA9" }} />
                                </div>
                            </div>
                        </Grid>
                        {/*Real time sales*/}
                        <Grid item lg={4} md={6} sm={12} xs={12} style={{ paddingTop: 0 }}>
                            <div className="citycontainer p-[20px]" style={{ paddingTop: 0, height: "100%", position: "relative" }}>
                                <div className="flex justify-between py-[15px]">
                                    <p className="cityThead">Real-Time Sale</p>
                                    <BsThreeDotsVertical className="cursor-pointer" />
                                </div>
                                <Grid container spacing={2}>
                                    <Grid item xs={6}>
                                        <div>
                                            <p className="text-start py-3 cityTablehead">Orders</p>
                                            <p style={{ display: "flex", alignItems: "center" }}><span>{TotalOrders}</span> <img src={Arrowup} alt='icon' /> <span style={{ fontSize: "12px" }}>0.20%</span></p>
                                        </div>
                                    </Grid>
                                    <Grid item xs={6}>
                                        <div>
                                            <p className="text-start py-3 cityTablehead">Avg. Sales per day</p>
                                            <p style={{ display: "flex", alignItems: "center" }}><span>₹{TotalSales}</span> <img src={Arrowup} alt='icon' /> <span style={{ fontSize: "12px" }}>1.04%</span></p>
                                        </div>
                                    </Grid>
                                </Grid>
                                <div>
                                    <table className="w-full">
                                        <thead>
                                            <tr className="border-b">
                                                <th className="text-start py-3 cityTablehead">CITIES</th>
                                                <th className="text-center py-3 cityTablehead">ORDERS</th>
                                                <th className="text-end py-3 cityTablehead">SALES</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {groupedArray?.map((item: any) => {
                                                return <tr>
                                                    <td className="py-2 cityTabledata">{item.cities}</td>
                                                    <td className="text-center py-3 cityTabledata">{item.orders}</td>
                                                    <td className="text-end py-3 cityTabledata">₹{item.sales}</td>
                                                </tr>
                                            })}
                                        </tbody>
                                    </table>

                                    {groupedArray?.length > 5 && <div className="flex gap-2 py-[10px] cursor-pointer items-center view-more-button">
                                        <p className="cityButton">View More Customers</p>
                                        <AiOutlineArrowRight style={{ color: "#4E2FA9" }} />
                                    </div>}
                                </div>
                            </div>
                        </Grid>
                    </Grid>
                </div>

                {/* <div style={{ margin: "0 10px" }}>
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
                </div> */}
            </div >
        </>
    );
};

export default WholesalerReport;
