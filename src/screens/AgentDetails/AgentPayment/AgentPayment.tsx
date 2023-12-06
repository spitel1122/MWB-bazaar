import React from "react";
import { useAgentDetailsStyle } from "@/static/stylesheets/screens";
import { ActionButton } from "@/components/atoms/Button/ActionButton";
import { Grid } from "@mui/material";

const AgentPayment = () => {
    const classes = useAgentDetailsStyle();

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
                    {/*First Grid*/}
                    <Grid container spacing={2}>
                        <Grid item lg={5} md={5} sm={6} className="bazaarplan-div">
                            <div className="bg-[#F7F7F7] flex justify-between p-[30px] rounded-md">
                                <p className="agentpaymentTitle">Year - 2021</p>
                                <div> 
                                    <p className="statusTitle">Available Balance</p>
                                    <div className="flex gap-3 pt-[15px]">
                                        <p className="blancetitle">₹ 70,000</p>
                                    </div>
                                </div>
                            </div>
                        </Grid>
                        {/*Second Grid*/}
                        <Grid item lg={5} md={5} sm={6} className="bazaarplan-div">
                            <div className="bg-[#F7F7F7] flex justify-between p-[30px] rounded-md">
                                <p className="agentpaymentTitle">Year - 2021</p>
                                <div>
                                    <p className="statusTitle">Available Balance</p>
                                    <div className="flex gap-3 pt-[15px]">
                                        <ActionButton variant={"primary"} title={"Pay Now"} />
                                        <p className="blancetitle">₹ 70,000</p>
                                    </div>
                                </div>
                            </div>
                        </Grid>
                    </Grid>


                    {/*Payment Request Table*/}
                    <div>
                        <p className="mainheadYTitle py-[20px]">Payment Request</p>
                        <div className="prcontainer">
                            <div className="grid grid-cols-3 gap-4" style={{ alignItems: "center", borderBottom: "1px solid #e1e1e1", padding: "7px 20px" }}>
                                <div className="prtitle justify-center">21-07-2-22</div>
                                <div className="prtitle">Agent has requisted a payment of <span className="text-[#4E2FA9]">Rs 10,000</span></div>
                                <div className="text-end"><ActionButton variant={"primary"} title={"Pay Now"} /></div>
                            </div>
                            <div className="grid grid-cols-3 gap-4" style={{ alignItems: "center", padding: "15px 20px" }}>
                                <div className="prtitle justify-center">21-07-2-22</div>
                                <div className="prtitle">Agent has requisted a payment of <span className="text-[#4E2FA9]">Rs 10,000</span></div>
                                <div className="text-end"><ActionButton variant={"primary"} title={"Pay Now"} /></div>
                            </div>
                        </div>
                    </div>


                    {/*Transaction Table*/}
                    <div>
                        <p className="mainheadYTitle py-[20px]">Transaction History</p>
                        <div className="prcontainer" style={{ overflowX: "auto" }}>
                            <table className="w-full text-left">
                                <thead style={{ borderBottom: "1px solid #e1e1e1" }}>
                                    <tr className="color-[#2E2C34;]">
                                        <th scope="col" className="tableTitle py-3 px-6">
                                            Date
                                        </th>
                                        <th scope="col" className="tableTitle py-3 px-6">
                                            Translation
                                        </th>
                                        <th scope="col" className="tableTitle py-3 px-6">
                                            Transaction Id
                                        </th>
                                        <th scope="col" className="tableTitle py-3 px-6">
                                            Status
                                        </th>
                                        <th scope="col" className="tableTitle py-3 px-6">
                                            Amount
                                        </th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr className="border-b">
                                        <th scope="row"
                                            className="py-4 px-6 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                            <div className="flex gap-[20px] items-center ">
                                                <p className="mb-3 tableContentTitle cursor-pointer">
                                                    <div className="flex gap-5 items-center">
                                                        <p className="tableData">
                                                            21-07-22
                                                        </p>
                                                    </div>
                                                </p>
                                            </div>
                                        </th>
                                        <td className="py-4 px-6 tableData">
                                            Your withdraw request for 132454561 Success.
                                        </td>
                                        <td className="py-4 px-6 tableData">
                                            1256ZDF15165
                                        </td>
                                        <td className="py-4 px-6 tableData">
                                            <p className="text-[#20C9AC] bg-[#E9FAF7] text-center p-[7px] rounded-md w-[130px] cursor-pointer">success</p>
                                        </td>
                                        <td className="py-4 px-6 tableData text-[#FC3400]">
                                            ₹ 250.00
                                        </td>
                                    </tr>
                                    <tr className="border-b">
                                        <th scope="row"
                                            className="py-4 px-6 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                            <div className="flex gap-[20px] items-center ">
                                                <p className="mb-3 tableContentTitle cursor-pointer">
                                                    <div className="flex gap-5 items-center">
                                                        <p className="tableData">
                                                            21-07-22
                                                        </p>
                                                    </div>
                                                </p>
                                            </div>
                                        </th>
                                        <td className="py-4 px-6 tableData">
                                            Your withdraw request for 132454561 Success.
                                        </td>
                                        <td className="py-4 px-6 tableData">
                                            1256ZDF15165
                                        </td>
                                        <td className="py-4 px-6 tableData">
                                            <p className="text-[#20C9AC] bg-[#E9FAF7] text-center p-[7px] rounded-md w-[130px] cursor-pointer">success</p>
                                        </td>
                                        <td className="py-4 px-6 tableData text-[#FC3400]">
                                            ₹ 250.00
                                        </td>
                                    </tr>
                                    <tr className="border-b">
                                        <th scope="row"
                                            className="py-4 px-6 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                            <div className="flex gap-[20px] items-center ">
                                                <p className="mb-3 tableContentTitle cursor-pointer">
                                                    <div className="flex gap-5 items-center">
                                                        <p className="tableData">
                                                            21-07-22
                                                        </p>
                                                    </div>
                                                </p>
                                            </div>
                                        </th>
                                        <td className="py-4 px-6 tableData">
                                            Your withdraw request for 132454561 Success.
                                        </td>
                                        <td className="py-4 px-6 tableData">
                                            1256ZDF15165
                                        </td>
                                        <td className="py-4 px-6 tableData">
                                            <p className="text-[#20C9AC] bg-[#E9FAF7] text-center p-[7px] rounded-md w-[130px] cursor-pointer">success</p>
                                        </td>
                                        <td className="py-4 px-6 tableData text-[#FC3400]">
                                            ₹ 250.00
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default AgentPayment;
