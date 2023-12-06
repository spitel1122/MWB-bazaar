import React, { useEffect, useState } from "react";
import { DashboardLayout } from "@/components/layouts";
import { useNavigate } from "react-router-dom";
import { ActionButton } from "@/components/atoms/Button/ActionButton";
import {
    FormControl,
    FormControlLabel,
    Radio,
    RadioGroup,
    TextField,
} from "@mui/material";
import { AppService } from "@/service/AllApiData.service";
import {useMakepaymentStyle} from "@/static/stylesheets/screens/makepaymentStyle";
import {MdOutlineKeyboardArrowLeft} from "react-icons/md";

const MakePayment = () => {
    const classes = useMakepaymentStyle();
    useNavigate();
    const [, setAddCommitionModalOpen] = useState(false);
    const [, setGetAllAgent] = useState([]);
    const getAllLists = async (page: any) => {
        const responseJson = await AppService.getAllAgentList(page);
        setGetAllAgent(responseJson.data.results);
        console.log("all agents list===>", responseJson);
    };

    const [selectedTab, setSelectedTab] = useState<
        "bank" | "topup" | "check"
    >("bank");

    useEffect(() => {
        getAllLists(1);
    }, []);

    return (
        <>
            <DashboardLayout>
                <div className={classes.root}>
                    <div>
                        <div>
                           <div className="flex gap-3 items-center">
                               <MdOutlineKeyboardArrowLeft className="cursor-po inter"/>
                               <p className="headtitle">Make Payment to  Sachin Yadav</p>
                           </div>
                            <div>
                                <p className="hedsubtitle py-[30px]">Payment Amount: Rs. 10,000</p>
                            </div>
                            <div>
                                <div className="radio-actionButton ">
                                    <div className="radio-button">
                                        <FormControl>
                                            <RadioGroup
                                                aria-labelledby="radio-buttons"
                                                name="controlled-radio-buttons"
                                                value={selectedTab}
                                                onChange={() => setSelectedTab("bank")}
                                            >
                                                <FormControlLabel
                                                    control={<Radio />}
                                                    checked={selectedTab === "bank"}
                                                    label={
                                                        <div className="flex gap-4 items-center">
                                                            To Bank Account
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
                                                onChange={() => setSelectedTab("topup")}
                                            >
                                                <FormControlLabel
                                                    value="Online"
                                                    control={<Radio />}
                                                    checked={selectedTab === "topup"}
                                                    label={
                                                        <div className="flex gap-4 items-center">
                                                            To UPI Id
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
                                                onChange={() => setSelectedTab("check")}
                                            >
                                                <FormControlLabel
                                                    value="Online"
                                                    control={<Radio />}
                                                    checked={selectedTab === "check"}
                                                    label={
                                                        <div className="flex gap-4 items-center">
                                                            By Cheque
                                                        </div>
                                                    }
                                                />
                                            </RadioGroup>
                                        </FormControl>
                                    </div>
                                </div>
                                {selectedTab === "bank" && (
                                    <>
                                        <div className="border-2 w-[280px] my-[20px] rounded-md">
                                           <div className="p-[10px]">
                                               <table className="table-auto">
                                                   <thead>
                                                   <tr>
                                                   </tr>
                                                   </thead>
                                                   <tbody className="">
                                                   <tr>
                                                       <td className="th1">Bank Name:</td>
                                                       <td className="th2 text-end">HDFC BANK</td>
                                                   </tr>
                                                   <tr>
                                                       <td className="th1">AC Holder’s Name:</td>
                                                       <td className="th2 text-end">Sahil Patel</td>
                                                   </tr>
                                                   <tr>
                                                       <td className="th1">AC No:</td>
                                                       <td className="th2 text-end">1234 4567 1234 4567</td>
                                                   </tr>
                                                   <tr>
                                                       <td className="th1">Account Type:</td>
                                                       <td className="th2 text-end">Saving</td>
                                                   </tr>
                                                   <tr>
                                                       <td className="th1">IFSC Code:</td>
                                                       <td className="th2 text-end">HDFC002546</td>
                                                   </tr>
                                                   </tbody>
                                               </table>
                                           </div>
                                        </div>

                                        <div className="w-[600px] py-[20px]">
                                            <div className="flex gap-3">
                                               <div>
                                                   <p className="formTitle">Amount</p>
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

                                                <div>
                                                    <p className="formTitle">Transaction ID</p>
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
                                            </div>

                                            <div className="w-[180px] py-[20px]">
                                                <p className="formTitle">Date</p>
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
                                        </div>
                                    </>
                                )}

                                {selectedTab === "topup" && (
                                    <>
                                        <>
                                            <div className="border-2 w-[280px] my-[20px] rounded-md">
                                                <div className="p-[10px]">
                                                    <table className="table-auto">
                                                        <thead>
                                                        <tr>
                                                        </tr>
                                                        </thead>
                                                        <tbody className="">
                                                        <tr>
                                                            <td className="th1">Bank Name:</td>
                                                            <td className="th2 text-end">HDFC BANK</td>
                                                        </tr>
                                                        <tr>
                                                            <td className="th1">AC Holder’s Name:</td>
                                                            <td className="th2 text-end">Sahil Patel</td>
                                                        </tr>
                                                        <tr>
                                                            <td className="th1">AC No:</td>
                                                            <td className="th2 text-end">1234 4567 1234 4567</td>
                                                        </tr>
                                                        <tr>
                                                            <td className="th1">Account Type:</td>
                                                            <td className="th2 text-end">Saving</td>
                                                        </tr>
                                                        <tr>
                                                            <td className="th1">IFSC Code:</td>
                                                            <td className="th2 text-end">HDFC002546</td>
                                                        </tr>
                                                        </tbody>
                                                    </table>
                                                </div>
                                            </div>

                                            <div className="w-[600px] py-[20px]">
                                                <div className="flex gap-3">
                                                    <div>
                                                        <p className="formTitle">Amount</p>
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

                                                    <div>
                                                        <p className="formTitle">Transaction ID</p>
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
                                                </div>

                                                <div className="w-[180px] py-[20px]">
                                                    <p className="formTitle">Date</p>
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
                                            </div>
                                        </>
                                    </>
                                )}

                                {selectedTab === "check" && (
                                    <>
                                        <>
                                            <div className="border-2 w-[280px] my-[20px] rounded-md">
                                                <div className="p-[10px]">
                                                    <table className="table-auto">
                                                        <thead>
                                                        <tr>
                                                        </tr>
                                                        </thead>
                                                        <tbody className="">
                                                        <tr>
                                                            <td className="th1">Bank Name:</td>
                                                            <td className="th2 text-end">HDFC BANK</td>
                                                        </tr>
                                                        <tr>
                                                            <td className="th1">AC Holder’s Name:</td>
                                                            <td className="th2 text-end">Sahil Patel</td>
                                                        </tr>
                                                        <tr>
                                                            <td className="th1">AC No:</td>
                                                            <td className="th2 text-end">1234 4567 1234 4567</td>
                                                        </tr>
                                                        <tr>
                                                            <td className="th1">Account Type:</td>
                                                            <td className="th2 text-end">Saving</td>
                                                        </tr>
                                                        <tr>
                                                            <td className="th1">IFSC Code:</td>
                                                            <td className="th2 text-end">HDFC002546</td>
                                                        </tr>
                                                        </tbody>
                                                    </table>
                                                </div>
                                            </div>

                                            <div className="w-[600px] py-[20px]">
                                                <div className="flex gap-3">
                                                    <div>
                                                        <p className="formTitle">Amount</p>
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

                                                    <div>
                                                        <p className="formTitle">Transaction ID</p>
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
                                                </div>

                                                <div className="w-[180px] py-[20px]">
                                                    <p className="formTitle">Date</p>
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
                                            </div>
                                        </>
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
                                title={"Reject"}
                                onClick={() => setAddCommitionModalOpen(false)}
                            />
                        </div>
                    </div>
                </div>
            </DashboardLayout>
        </>
    );
};

export default MakePayment;
