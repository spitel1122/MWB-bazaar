import React, { useEffect, useState } from "react";
import { DashboardLayout } from "@/components/layouts";
import { AddButton, GridOptionButton } from "@/components/atoms/Button";
import { useNavigate } from "react-router-dom";
import { useRetailerStyles } from "@/static/stylesheets/screens/retailersStyle";
import { Pagination, Switch } from "@mui/material";
import { AppService } from "@/service/AllApiData.service";
import fill from "@/static/icons/fill.svg";
import deleteagent from "@/static/icons/delete-agent.svg";
import CommonSelectElectronicBazaar from "@/components/atoms/CommonSelectElectronicBazaar/CommonSelectElectronicBazaar";
import { Alert, AlertError } from "@/alert/Alert";
import Loading from "@/components/LoadingCom/Loading";

const Retailers = () => {
  const classes = useRetailerStyles();
  const navigate = useNavigate();
  const [plans, setPlans] = useState<any>([]);
  const [filterPlans, setfilterPlans] = useState<any>([]);
  const [allDis, setAllDis] = useState<any>([]);
  const [AllState, setAllState] = useState<any>([]);
  const [AllCity, setAllCity] = useState<any>([]);
  const [AllBazaarData, setAllBazaarData] = useState<any>([]);
  const [bazaarList, setBazaarList] = useState([])
  const [stateList, setstateList] = useState([])
  const [disList, setdisList] = useState([])
  const [cityList, setcityList] = useState([])
  const [AllPrice, setAllPrice] = useState<any>([]);
  const [priceList, setpriceList] = useState<any>([]);
  const [AllStatus, setAllStatus] = useState<any>([]);
  const [statusList, setstatusList] = useState<any>([]);
  const [searchK, setSearchK] = useState("");
  const [filterplanM, setfilterplanM] = useState<any>([]);
  const [currentPage, setCurrentPage] = useState<any>(1);
  const [totalCount, SetTotalCount] = useState<number>(1);
  const [loading,setloading] = useState(true)


  console.log('AllStatus', AllBazaarData)

  const handlePageChange = (event: any, value: any) => {
    setCurrentPage(value);
    getPlans(value);
};

useEffect(()=>{
  setTimeout(() => {
    handlePageChange("e",currentPage)
  }, 2000);
},[])

  const getPlans = async (page:any) => {
    const responseJson = await AppService.getPlans(page);
    if(responseJson.data.results){
      setloading(false)
    }
    setPlans(responseJson.data.results);
    setfilterPlans(responseJson.data.results)
    setfilterplanM(responseJson.data.results)
    console.log(responseJson.data.results,responseJson  ,"responseJson.data.count")
    SetTotalCount(responseJson.data.count)
  };
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
  const getAllPrices = async () => {
    const responseJson = await AppService.getPlans(currentPage);
    const arr = await responseJson.data.results.map((item: any) => item.amount);
    
    var uniqueArray = Array.from(new Set(arr));
    setAllPrice(uniqueArray);
  }
  const getAllPriceData = async () => {
    if (AllPrice.length > 0) {
      let tempState = AllPrice.map((row: any) => {
        return {
          label: row,
          value: row,
        }
      })
      setpriceList(tempState);
    }
  };
  const getAllStatus = async () => {
    const responseJson = await AppService.getPlans(currentPage);
    const arr = responseJson.data.results.map((item: any) => {
      if (item.plan_active === true) {
        return true
      } else {
        return false
      }
    });
    var uniqueArray = Array.from(new Set(arr));
    setAllStatus(uniqueArray);
  }
  const getAllStatusData = async () => {
    if (AllStatus.length > 0) {
      let tempState = AllStatus?.map((row: any) => {
        return {
          label: row === true ? "Enable" : "Disable",
          value: row === true ? true : false,
        }
      })
      setstatusList(tempState);
    }
  };
  useEffect(() => {
    getPlans(currentPage);
    getAllBazaar();
    getAllStateData();
    getAllDisData();
    getAllCityData();
    getAllPrices();
    getAllPriceData();
    getAllStatus();
    getAllStatusData();
    localStorage.removeItem("setplandata")
  }, []);
  
  React.useEffect(() => {
    filterPlans.map((item: any) => {
      getAllDis({ ids: item?.state }, "")
      getAllState({ ids: item?.state }, "")
      getAllCity({ ids: item?.city }, "")
    });
    getAllPrices();
    getAllPriceData();
    getAllStatus();
    getAllStatusData();
    getAllBazaarData()
  }, [filterPlans]);
  const onTrigger = (event: any) => {
    setSearchK(event.target.value.toLowerCase());
  }
  const handleChange = (selectboxName: string, id: any) => {
    // const temp = [];
    if (selectboxName === 'Bazaar') {
      setAllBazaarData((prev: any) => {
        return prev.map((item: any) => item.id === id ? { ...item, status: !item.status } : item)
      });
    }
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
    if (selectboxName === 'Price') {
      setpriceList((prev: any) => {
        return prev.map((item: any) => item.value === id ? { ...item, status: !item.status } : item)
      });
    }
    if (selectboxName === 'Status') {
      setstatusList((prev: any) => {
        return prev.map((item: any) => item.value === id ? { ...item, status: !item.status } : item)
      });
    }
  }
  useEffect(() => {
    let temp1 = filterplanM;
    // bazaar data
    console.log(temp1,"temp1")
    if (filterplanM?.length && AllBazaarData?.length) {
      let FBazaardata = AllBazaarData?.filter((b: any) => b.status === true)?.map((item: any) => item?.id)
      if (FBazaardata?.length > 0) {
        for (const x of FBazaardata) {
          temp1 = temp1?.filter((fp: any) => fp?.bazaar?.includes(x))
        }
      }
    }
    // city
    if (temp1?.length && AllCity?.length) {
      let FCity = AllCity?.filter((b: any) => b.status === true)?.map((item: any) => item?.id)
      if (FCity?.length > 0) {
        for (const x of FCity) {
          temp1 = temp1?.filter((fc: any) => fc?.city?.includes(x))
        }
      }
    }
    // state
    if (temp1?.length && AllState?.length) {
      let FState = AllState?.filter((b: any) => b.status === true)?.map((item: any) => item?.id)
      if (FState?.length > 0) {
        for (const x of FState) {
          temp1 = temp1?.filter((fs: any) => fs?.state?.includes(x))
        }
      }
    }
    // district
    if (temp1?.length && allDis?.length) {
      let FDistrict = allDis?.filter((b: any) => b.status === true)?.map((item: any) => item?.id)
      if (FDistrict?.length > 0) {
        for (const x of FDistrict) {
          temp1 = temp1?.filter((fs: any) => fs?.district?.includes(x))
        }
      }
    }
    // Price
    if (temp1?.length && priceList?.length) {
      const selectedPrice = priceList?.filter((item: any) => item.status === true).map((item: any) => item.value);
      if (selectedPrice?.length > 0) {
        temp1 = temp1?.filter((item: any) => selectedPrice?.includes(item?.amount));
      }
    }
    // status
    if (temp1?.length && statusList?.length) {
      const selectedActiveInactive = statusList?.filter((item: any) => item.status === true).map((item: any) => item.value);
      if (selectedActiveInactive?.length > 0) {
        temp1 = temp1?.filter((item: any) => selectedActiveInactive?.includes(item?.plan_active));
      }
    }
    setPlans(temp1)
  }, [filterplanM, AllBazaarData, AllCity, AllState, allDis, priceList, statusList,currentPage])


  const hideTabs = async (e: any, id: number | undefined) => {
    if (id) {
      deleteFeature(id);
    }
  };
  const deleteFeature = async (id: any) => {
    if (window.confirm('Do You want to delete Plan')) {
      if (!id) {
        return false;
      }
      try {
        const responseJson = await AppService.removePlan(id);
        Alert("delete successfully");
        await getPlans(currentPage);
      }
      catch (error: any) {
        let message = error.response.data.type + "\n"
        error.response.data.errors.map((row: any) => {
          message += row.attr + " : " + row.detail + "\n"
        })
        AlertError(message);
      }
    }
  };

  const handlePlansStatus = async (e: any, index: number) => {
    let textmsg = ""
    if (e.target.checked) {
      textmsg = "Do you want to active plan ?";
    } else {
      textmsg = "Do you want to inactive plan ?";
    }
    if (window.confirm(textmsg)) {
      let plansData = plans[index];
      plansData.plan_active = e.target.checked;
      const responseJson = await AppService.updatePlan(plansData.id, plansData);
      if (responseJson.status == 200) {
        if (e.target.checked) {
          Alert('Plan InActive Successfully');
        }
        else {
          Alert('Plan Active Successfully');
        }
        getPlans(currentPage);
      }
    }
  }

  return (
    <>
      <DashboardLayout>
        {
          loading ? <Loading/> :
          <>
        <div className={classes.root}>
          <div className="mb-[32px]">
            <div className="flex align-middle justify-between" style={{ alignItems: "center" }}>
              <p className="commonTitle">Plans</p>
              <div className="flex gap-5 align-middle justify-end">
                <div className="relative">
                  <input
                    type="text"
                    placeholder="Search ..." onKeyUp={onTrigger}
                    className="w-[576px] py-[11px] px-4 h-[48px] text-gray-500 border rounded-[4px] outline-none bg-gray-50 focus:bg-white"
                  />
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="absolute top-0 bottom-0 w-6 h-6 my-auto text-gray-400 right-3"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
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
                  label="Add Plan"
                  onClick={() => navigate("/addnewplan")}
                />
              </div>
            </div>
          </div>
          <div className="flex justify-between items-center">
            <div className="flex gap-4">
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
                label={"Price"}
                hint={"Select Price"}
                options={priceList}
                handleSelect={handleChange}
                selectedIds={priceList?.filter((item: any) => item?.status).map((elm: any) => elm?.value)}
              />
              <CommonSelectElectronicBazaar
                label={"Status"}
                hint={"Select Staus"}
                options={statusList}
                handleSelect={handleChange}
                selectedIds={statusList?.filter((item: any) => item?.status).map((elm: any) => elm?.value)}
              />
            </div>
          </div>
          <div className="w-full">
            <table className="w-full text-sm text-left text-gray-500 " style={{ marginBottom: "120px" }}>
              <thead className="tableTitle border-b border-[#EBEAED]">
                <tr>
                  <th scope="col" className="py-3 px-3">
                    Plan Title
                  </th>
                  <th scope="col" className="py-3 px-3 w-[100px]">
                    Start Time
                  </th>
                  <th scope="col" className="py-3 px-3 w-[100px]">
                    End Time
                  </th>
                  <th scope="col" className="py-3 px-3 ">
                    Branches
                  </th>
                  <th scope="col" className="py-3 px-3 ">
                    Bazaar
                  </th>
                  <th scope="col" className="py-3 px-3 ">
                    State
                  </th>
                  <th scope="col" className="py-3 px-3 ">
                    District
                  </th>
                  <th scope="col" className="py-3 px-3 w-[100px]">
                    City
                  </th>
                  <th scope="col" className="py-3 px-3 ">
                    Price
                  </th>
                  <th scope="col" className="py-3 px-3 ">
                    Subscriber total
                  </th>
                  <th scope="col" className="py-3 px-3 ">
                    Total Active Subscribers
                  </th>
                  <th scope="col" className="py-3 px-3 ">
                    Total expired Subscribers
                  </th>
                  <th scope="col" className="py-3 px-3 ">
                    Enable/Disable
                  </th>
                  <th scope="col" className="py-3 px-3 "></th>
                </tr>
              </thead>
              <tbody>
                {plans &&
                  plans?.filter((elm: any) => elm?.plan_name?.toLowerCase().includes(searchK))?.map((item: any, index: number) => (
                    <tr className="border-b border-[#E1E1E1]">
                      <td
                        scope="row"
                        className="py-3 pl-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                      >
                        <div className="flex gap-[20px] items-center">
                          <p
                            className="dataTitle !text-[13px]"
                          >
                            {item.plan_name || "any"}
                          </p>
                        </div>
                      </td>
                      <td className="py-3 pl-[10px]">
                        <div className="flex gap-5 align-middle">
                          <div>
                            <p className="dataTitle whitespace-pre-line !text-[13px]">
                              <div>{item.start_date}</div>
                              <div>{item.start_time}</div>
                            </p>
                          </div>
                        </div>
                      </td>
                      <td className="py-3 pl-[10px] dataTitle !text-[13px]">
                        <div>{item.end_date}</div>
                        <div>{item.end_time}</div>
                      </td>
                      <td className="py-3 px-6 dataTitle">{item.branches}</td>
                      <td className="py-3 px-6  dataTitle cursor-pointer !text-[13px]">
                        {item.bazaar.map((items: any, index: any) => (
                          AllBazaarData?.map((idx: any) => {
                            if (items === idx.id) {
                              const lastItemIndex = item.bazaar.length - 1;
                              return <span className="font-[500] text-[#2E2C34] text-[12px] font-[Manrope]">{idx.bazaar_name}{index !== lastItemIndex && ', '}</span>
                            }
                          })
                        ))}
                      </td>
                      <td className="py-3 px-6 dataTitle] cursor-pointer">
                        <div className="flex gap-5 align-middle !text-[13px]">
                          <p className="dataTitle">
                            {item.state.map((items: any, index: any) => (
                              AllState?.map((idx: any) => {
                                if (items === idx.id) {
                                  const lastItemIndex = item.state.length - 1;
                                  return <span className="font-[500] text-[#2E2C34] text-[12px] font-[Manrope]">{idx.state}{index !== lastItemIndex && ', '}</span>
                                }
                              })
                            ))}
                          </p>
                        </div>
                      </td>
                      <td className="py-3 pl-5 dataTitle cursor-pointer">
                        <p className="font-[14px] color-[#4E2FA9] !text-[13px]">
                          {item.district.map((items: any, index: any) => (
                            allDis?.map((idx: any) => {
                              if (items === idx.id) {
                                const lastItemIndex = item.district.length - 1;
                                return <span className="font-[500] text-[#2E2C34] text-[12px] font-[Manrope]">{idx.district}{index !== lastItemIndex && ', '}</span>
                              }
                            })
                          ))}
                        </p>
                      </td>
                      <td className="py-3 pl-4 dataTitle cursor-pointer">
                        <p className="font-[14px] color-[#4E2FA9] !text-[13px]">
                          {item.city.map((items: any, index: any) => (
                            AllCity?.map((idx: any) => {
                              if (items === idx.id) {
                                const lastItemIndex = item.city.length - 1;
                                return <span className="font-[500] text-[#2E2C34] text-[12px] font-[Manrope]">{idx.city}{index !== lastItemIndex && ', '}</span>
                              }
                            })
                          ))}
                        </p>
                      </td>
                      <td className="py-3 px-6 dataTitle cursor-pointer !text-[13px]">
                        {item.amount ? item.amount : "Free"}
                      </td>
                      <td className="py-3  dataTitle cursor-pointer !text-[13px] text-center">
                        100M
                      </td>
                      <td className="py-3  dataTitle cursor-pointer !text-[13px]">
                        
                      </td>
                      <td className="py-3  dataTitle cursor-pointer !text-[13px]">
                        
                      </td>
                      <td className="py-5 dataTitle cursor-pointer flex gap-[16px] h-full">
                        <Switch checked={item.plan_active} onChange={(e: any) => handlePlansStatus(e, index)} />
                        <GridOptionButton
                          icon={"vertical-options"}
                          menus={[
                            {
                              label: (
                                <>
                                  <a href={`/addnewplan/${item.id}`} onClick={(e:any)=>e.preventdefault()} style={{ padding: 0, borderBottom: 0 }}>
                                    <span className="icon">
                                      <img src={fill} alt="fill" />{" "}
                                    </span>{" "}
                                    Edit Plan
                                  </a>
                                </>
                              ),
                            },
                            {
                              label: (
                                <>
                                  <span className="icon">
                                    <img
                                      src={deleteagent}
                                      alt="deleteagent"
                                    />{" "}
                                  </span>{" "}
                                  Delete Plan
                                </>
                              ),
                              onClick() { hideTabs(true, item.id) },
                            },
                          ]}
                        />
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>
        </div>
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
          </>
        }
      </DashboardLayout>
    </>
  );
};
export default Retailers;