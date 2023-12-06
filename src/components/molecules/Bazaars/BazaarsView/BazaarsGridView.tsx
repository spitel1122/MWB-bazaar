import React, { useEffect, useState } from "react";
import { BazaarCard } from "@/components/molecules/Bazaars";
import { Grid, IconButton, Pagination } from "@mui/material";
import { useBazaarCardStyles } from "@/static/stylesheets/molecules";
import { AppService } from "@/service/AllApiData.service";
import { useNavigate } from "react-router-dom";
import LogoEdit from "@/static/icons/ic_edit.png";
import LaptopIcon from "@/static/icons/ic_laptop.png";
import { routePaths } from "@/routes";
import Loading from "@/components/LoadingCom/Loading";

const BazaarsGridView = (props: any) => {
  const classes = useBazaarCardStyles();
  const navigate = useNavigate();
  const [getAllBazar, setGetAllBazar] = useState([]);
  const [totalCount, setTotalRows] = useState(10);
  // const data = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14];
  const [currentPage, setCurrentPage] = useState(1);
  const ITEMS_PER_PAGE = 10;
  const [loading,setloading] = useState(true)


  const handlePageChange = (event: any, value: any) => {
    setCurrentPage(value);
    getAllLists(value);
  };
  const search = props.searchItem;
  const [step, setStep] = useState(null)

  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const endIndex = startIndex + ITEMS_PER_PAGE;
  const currentItems = getAllBazar;
  const getAllLists = async (data: any) => {
    const responseJson = await AppService.getAllBazarList(data);
    if(responseJson.data.results){
      setloading(false)
    }
    setGetAllBazar(responseJson.data.results);
    setTotalRows(responseJson.data.count)
    // console.log("ecomprd", responseJson.data.results);
  };
  const getViaID = async (ID: any) => {
    // console.log(ID.id);
    localStorage.setItem("IDS", ID.id);
    navigate(`/electronicsbazaar/${ID.id}`);

  }

  const GetALLDATA = getAllBazar?.filter((elm: any) => elm?.bazaar_name?.toLowerCase().includes(search)).length > 0 ? getAllBazar?.filter((elm: any) => elm?.bazaar_name?.toLowerCase().includes(search)) : getAllBazar;

  useEffect(() => {
    getAllLists(currentPage);
  }, []);
  console.log('getAllBazar', getAllBazar)
  return (
    <>
    {
      loading ? <Loading /> : <div className={classes.root}>
        <Grid container spacing={2}>
          {GetALLDATA === undefined ? <></> : GetALLDATA.map((addr: any) => (
            <Grid item lg={4} md={6} sm={12}>
              <div
                className={classes.root}
                onClick={() => getViaID(addr)}
              >
                <div className={classes.bazaarContainer}>
                  <div className="flex">
                    <Grid container spacing={2} style={{ alignItems: "center" }}>
                      <Grid item xs={8} md={7}>
                        <div className="border-r-1 bazaarInfo">
                          <div className="brandInfo">
                            <div className={"flex justify-between"}>
                              <img
                                className="brandLogo"
                                src={addr.bazaar_image}
                                alt={"Logo"}
                              // onError={(e: any) => {e.target.onerror = null; e.target.src=LaptopIcon}}
                              />
                              <div>
                                <IconButton>
                                  <img className={"w-[13px]"} src={LogoEdit} alt={"Logo"} onClick={(e) => {
                                    e.stopPropagation();
                                    // navigate(routePaths?.newbazaars);
                                    navigate(routePaths?.newbazaars, { state: { Bstep: addr.bazaar_step, Bid: addr.id } });
                                  }} />
                                </IconButton>
                              </div>
                            </div>
                            <p className="bazaarTitle">{addr.bazaar_name}</p>
                            <p className="bazaarSubTitle  w-40 truncate">{addr.bazaar_description}</p>
                          </div>
                        </div>
                      </Grid>
                      <Grid item xs={4} md={5}>
                        <div className="bazaarContainer">
                          <div className={classes.wholesalerCard}>
                            <div className="brandCounter">
                              <div className="container">
                                <p className="counterTitle">{Number(addr.wholesellers)}</p>
                                <p className="counterSubtitle">Wholesaler</p>
                              </div>
                              <div className="container">
                                <p className="counterTitle">{Number(addr.agents)}</p>
                                <p className="counterSubtitle">Agents</p>
                              </div>
                              <div className="container">
                                <p className="counterTitle">{Number(addr.bazaar_state.length)}</p>
                                <p className="counterSubtitle">States</p>
                              </div>
                            </div>
                          </div>
                        </div>
                      </Grid>
                    </Grid>
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
          <div className="flex items-center justify-between pagination my-[40px]" style={{ display: "flex", width: '100%' }}>
            <div className="text-[#84818A] text-sm font-medium">Show <span>{ITEMS_PER_PAGE}</span> from {getAllBazar.length} products</div>
            <Pagination count={Math.ceil(totalCount / 10)} page={currentPage} onChange={handlePageChange} />
          </div>
        </Grid>
      </div>
    }
    </>
  );
};

export { BazaarsGridView };
