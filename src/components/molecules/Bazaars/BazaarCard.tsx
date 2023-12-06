import React, { useEffect, useState } from "react";
import { useBazaarCardStyles } from "@/static/stylesheets/molecules";
import Logo from "@/static/icons/ic_laptop.png";
import { useNavigate } from "react-router-dom";
import { Grid } from "@mui/material";
import { Pagination } from "@mui/lab";

const BazaarCard = (props: any) => {
    const classes = useBazaarCardStyles();
    const navigate = useNavigate();
    const [currentPage, setCurrentPage] = useState(1);
    const ITEMS_PER_PAGE = 10;
    const handlePageChange = (event: any, value: any) => {
        setCurrentPage(value);
    };
    const currentItems = props.getAllBazars;
    const getViaID = async (ID: any) => {
        // console.log(ID.id);
        localStorage.setItem("IDS", ID.id);
        navigate(`/electronicsbazaar/${ID.id}`);

    }

    useEffect(() => {
        // console.log("child", props.getAllBazaars);
    }, []);


    return (
        <>
            {props.getAllBazars === undefined ? <></> : currentItems.map((addr: any) => (
                <Grid item xs={4}>
                    <div
                        className={classes.root}
                        onClick={() => getViaID(addr)}
                    >
                        <div className={classes.bazaarContainer}>
                            <div className="flex">
                                <div className="w-[50%] border-r-2">
                                    <div className="brandInfo">
                                        <img className="brandLogo" src={addr.bazaar_image ? addr.bazaar_image : "Image Not Found"} alt={"Logo"} />
                                        <p className="bazaarTitle">{addr.bazaar_name}</p>
                                        <p className="bazaarSubTitle w-40 truncate">{addr.bazaar_description}</p>
                                    </div>
                                </div>

                                <div className="bazaarContainer">
                                    <div className={classes.wholesalerCard}>
                                        <div className="brandCounter">
                                            <div className="container">
                                                <p className="counterTitle">{addr.wholesellers}</p>
                                                <p className="counterSubtitle">Wholesaler</p>
                                            </div>

                                            <div className="container">
                                                <p className="counterTitle">{addr.agents}</p>
                                                <p className="counterSubtitle">Agents</p>
                                            </div>

                                            <div className="container">
                                                <p className="counterTitle">{addr.bazaar_state}</p>
                                                <p className="counterSubtitle">States</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className={classes.revenueContainer}>
                                <div className={classes.revenueCard}>
                                    <div className="container">
                                        <div>
                                            <p className="headTitle">Total Revenue Earned</p>
                                            <p className="headSubtitle">{addr.earnings}</p>
                                        </div>

                                        <div>
                                            <p className="headTitle">No. of Bills</p>
                                            <p className="headSubtitle">{addr.bills}</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </Grid>

            ))}
            {currentItems?.length ? null : <div className="flex items-center justify-between pagination" style={{ display: "flex", width: '100%' }}>
                <div className="text-[#84818A] text-sm font-medium">Show <span>{ITEMS_PER_PAGE}</span> from {props.getAllBazars.length} products</div>
                <Pagination count={10} page={currentPage} onChange={handlePageChange} />
            </div>}
        </>
    );
};
export { BazaarCard };
