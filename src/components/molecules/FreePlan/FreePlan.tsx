import React, { useEffect, useState } from "react";
import { useKycFormStyles } from "@/static/stylesheets/molecules";
import {
  FormControl,
  Input,
  MenuItem,
  Select,
  Checkbox,
  ListItemText,
  SelectChangeEvent,
  TextField,
} from "@mui/material";
import LogoDelete from "@/static/icons/ic_delete.png";
import LogoEdit from "@/static/icons/ic_edit.png";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AppService } from "@/service/AllApiData.service";
import { ActionButton } from "../../atoms/Button/ActionButton";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import EditIcon from "@mui/icons-material/Edit";
import DistrictPicker from "@/components/atoms/LocationPickers/DistrictPicker";
import { DesktopDatePicker } from "@mui/x-date-pickers/DesktopDatePicker";
import { Form, Formik } from "formik";
import { Alert, AlertError } from "@/alert/Alert";
import { Grid } from "@mui/material";
import IcView from "@/static/svg/ic_view.svg";
import { useNavigate, useParams } from "react-router-dom";
const FreePlan = (props: any) => {
  const {
    errors,
    setFieldValue,
    handleChange,
    values,
    handleSubmit,
    id,
    AllBazaar,
    feature,
    setFeature,
    settally,
    tally,
    previewData,
    setPreviewData,
  } = props;
  const classes = useKycFormStyles();
  const [groupCategories, SetGroupCategories] = useState(0);
  const [addFeatures, setAddFeatures] = React.useState<any>([]);
  const navigate = useNavigate();
  const datas = useParams();
  const [isOpen, setIsOpen] = React.useState<any>(false);
  const addInputField = () => {
    let groupCategoriesCount = groupCategories;
    setAddFeatures({
      ...addFeatures,
      [groupCategoriesCount]: { id: "", feature: "" },
    });
    groupCategoriesCount = ++groupCategoriesCount;
    SetGroupCategories(groupCategoriesCount);
  };

  console.log(values,"values")

  const hideTabs = async (
    e: any,
    index: number,
    deleteid: number | undefined
  ) => {
    let groupCategoriesCount = groupCategories;
    groupCategoriesCount = --groupCategoriesCount;
    SetGroupCategories(groupCategoriesCount);
    if (groupCategories == 1) {
      setAddFeatures([]);
      SetGroupCategories(0);
    }

    if (deleteid) {
      deleteFeature(deleteid);
    }
  };
  const [AllState, setAllState] = React.useState([]);
  const [allDis, setAllDis] = React.useState([]);
  const [allCity, setAllCity] = React.useState<any>([]);
  const [singleState, setSingleState] = React.useState([]);
  const [singleDis, setSingleDis] = React.useState([]);
  const [singleCity, setSingleCity] = React.useState([]);
  const [AllFeature, setAllFeature] = React.useState<any[]>([]);
  const [dropdowndata, setDropdowndata] = React.useState<any>([]);
  const [stateList, setStateList] = useState<any[]>([]);
  const [states, setStates] = useState<any>();
  const [districtList, setDistrictList] = useState<any[]>([]);
  const [districts, setDistricts] = useState<any>();
  const [cityList, setCityList] = useState<any[]>([]);
  const [citys, setCitys] = useState<any>();
  const [selectbazzar, setselectbazzar] = useState<any>([]);
  
  useEffect(() => {
    FeaturesAlldatas();
    getTotalStates();
  }, []);

  console.log(states,selectbazzar,"values.state")

  useEffect(()=>{
    setStates(values.state)
    setDistricts(values.district)
    setselectbazzar(values.bazaar)
  },[values.state])
  
  
  useEffect(()=>{
    if(values.bazaar){
      bazaargetdata(values.bazaar)
    }
  },[values])
  
  const bazaargetdata = async(id:any) =>{
    const responseJson = await AppService.getAllBazarProductListdel(id)
    setStateList(responseJson.data?.bazaar_state_names)
    console.log(responseJson.data?.bazaar_state_names,"responseJson.data?.bazaar_state_names")
  }
  useEffect(() => {
    getDistrictByStates();
  }, [states]);

  useEffect(() => {
    getAllCitys();
  }, [districts]);

  const getTotalStates = async () => {
    setStateList([])
    setDistrictList([])
    setCityList([])
    const responseJson = await AppService.getTotalStates();
  };

  const getDistrictByStates = async () => {
    setDistrictList([])
    setCityList([])
    const responseJson = await AppService.getAllDistricByState({
      ids: states.toString(),
    });
    setDistrictList(responseJson.data.results);
  };
  
  const getAllCitys = async () => {
    setCityList([])
    const responseJson = await AppService.getAllCityByDis({
      ids: districts.toString(),
    });
    setCityList(responseJson.data.results);
  };

  const FeaturesAlldatas = async () => {
    const renssponseJson = await AppService.listFeaturesAll();
    let data = await Math.ceil(renssponseJson.data.count / 10);

    for (let i = 0; i < data; i++) {
      const data = await AppService.listFeaturesAll({ page: i + 1 });
      setDropdowndata((prev: any) => [...prev, ...data.data.results]);
    }
  };

  const getAllLists = async () => {
    const responseJson = await AppService.getAllStates();
    setAllState(responseJson.data.results);
    setSingleState(responseJson.data.results);
  };
  const handlePreviewData = (e: any) => {
    const { value } = e.target;
    const int = value.map(Number);
    const previewname = AllState?.filter((it: any) =>
      [...int]?.includes(it?.id)
    )?.map((im: any) => im?.state);
    setPreviewData((prev: any) => ({ ...prev, state: previewname }));
  };
  const getAllPlan = async () => {
    const responseJson = await AppService.listFeatures();
    let tempObj = {};
    await Promise.all(
      responseJson.data.results.map(async (row: any, index: number) => {
        tempObj = { ...tempObj, [index]: { id: row.id, feature: row.feature } };
      })
    );
    SetGroupCategories(responseJson.data.results.length);
    setAddFeatures(tempObj);
    setAllFeature(responseJson.data.results);
    // let array = await responseJson.data.results.map((row: { id: number }) => {
    //   if (row?.id) {
    //     return row?.id;
    //   }
    // })

    // values.plan_features = array;
    // setFeature(array);
  };

  const getAllDis = async (param: any, type: any) => {
    const responseJson = await AppService.getAllDistricByState(param);
    setAllDis(responseJson.data.results);
    setSingleDis(responseJson.data.results);
  };
  console.log(singleDis);

  const getAllCity = async (param: any, type: any) => {
    const responseJson = await AppService.getAllCityByDis(param);
    setSingleCity(responseJson.data.results);

    param.ids.map((x: any) => {
      responseJson.data.results?.map((y: any) => {
        if (x == y.district) {
          setAllCity((prev: any) => [...prev, y]);
        }
        // else{
        //  let allCityData = allCity.filter((x:any)=> x.district != y.district)
        //  setAllCity(allCityData)
        // }
      });
    });
  };
  const savePlan = async (index: number, updateId: number) => {
    try {
      let responseJson;

      if (updateId) {
        responseJson = await AppService.editFeature(updateId, {
          feature: addFeatures[index].feature,
        });
      } else {
        responseJson = await AppService.addFeature({
          feature: addFeatures[index].feature,
        });
      }

      if (responseJson.status == 201 || responseJson.status == 200) {
        await getAllPlan();
        Alert(`Plan features ${updateId ? "updated" : "added"} successfully`);
      }
    } catch (error: any) {
      let message = error.response.data.type + "\n";
      error.response.data.errors.map((row: any) => {
        message += row.attr + " : " + row.detail + "\n";
      });
      AlertError(message);
    }
  };

  const deleteFeature = async (id: any) => {
    if (!id) {
      return false;
    }
    try {
      const responseJson = await AppService.deleteFeature(id);
      Alert("delete successfully");
      await getAllPlan();
    } catch (error: any) {
      let message = error.response.data.type + "\n";
      error.response.data.errors.map((row: any) => {
        message += row.attr + " : " + row.detail + "\n";
      });
      AlertError(message);
    }
  };

  React.useEffect(() => {
    getAllLists();
    getAllPlan();
  }, []);

  React.useEffect(() => {
    getAllDis({ ids: values?.state }, "");
  }, [values?.state]);
  React.useEffect(() => {
    getAllCity({ ids: values?.district }, "");
  }, [values?.district]);
  const handleChanges = (event: any, index: number) => {
    event.preventDefault();
    setAddFeatures({
      ...addFeatures,
      [index]: { ...addFeatures[index], feature: event.target.value },
    });
  };
  const handlechagetelly = (e: any) => {
    const { name, checked } = e.target;
    if (name === "plan_tally") {
      settally(checked);
    }
  };
  const handleplanfeture = (e: any) => {
    const { value ,name } = e.target;
    const int = value.map(Number);
    const previewname = AllFeature?.filter((it: any) =>
      [...int]?.includes(it?.id)
    )?.map((im: any) => im?.feature);
    setPreviewData((prev: any) => ({ ...prev, featureData: previewname }));
    setFeature([...int]);
  };

  const getplanlistbyid = async (id: any) => {
    const data = await AppService?.getPlanById(id);
    if (data?.status === 200) {
      setFeature([...data?.data?.plan_features]);
      settally(data?.data?.plan_tally);
    }
  };
  React.useEffect(() => {
    if (id !== "") {
      getplanlistbyid(id);
    }
  }, []);

  const hendalselectbazaar = (e:any) =>{
    setselectbazzar([e.target.value])
  }

  console.log(datas.id, "previewData");
  const hendalPreview = (data: any) => {
    navigate(`/reviewplan/${datas.id}`);
    localStorage.setItem("setplandata",JSON.stringify(values))
    localStorage.setItem("previewData",JSON.stringify(previewData))
  };
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <div className={classes.root}>
        <form onSubmit={handleSubmit}>
          <div>
            <div
              className="bazaarField flex items-center gap-8 mt-6 bazaarplan-form"
              style={{ width: "100%", display: "block" }}
            >
              {values.plan_choice === "FREE" ? (
                <>
                  <Grid container spacing={2}>
                    <Grid
                      item
                      lg={3.25}
                      md={5}
                      sm={6}
                      className="bazaarplan-div"
                    >
                      <div style={{ paddingRight: "15px" }}>
                        <p className="fieldTitle">Plan Name</p>
                        <Input
                          className="w-full"
                          id="plan_name"
                          type="text"
                          name="plan_name"
                          required
                          error={!!errors.plan_name}
                          value={values.plan_name}
                          onChange={handleChange}
                        />
                      </div>
                    </Grid>
                  </Grid>
                  <Grid container spacing={2}>
                    <Grid
                      item
                      lg={3.25}
                      md={5}
                      sm={6}
                      className="bazaarplan-div"
                    >
                      <div style={{ paddingTop: "30px", paddingRight: "15px" }}>
                        <p className="fieldTitle">Number of Branch</p>
                        <Input
                          className="w-full"
                          id="branches"
                          type="number"
                          name="branches"
                          required
                          error={!!errors.branches}
                          value={values.branches ? values.branches : ""}
                          onChange={(e) => {
                            handleChange(e);
                            setPreviewData((prev: any) => ({
                              ...prev,
                              branches: e?.target?.value,
                            }));
                          }}
                        />
                      </div>
                    </Grid>
                  </Grid>
                  <Grid container spacing={2}>
                    <Grid
                      item
                      lg={3.25}
                      md={5}
                      sm={6}
                      className="bazaarplan-div"
                    >
                      <div style={{ paddingTop: "30px", paddingRight: "15px" }}>
                        <p className="fieldTitle">Start Date</p>
                        <DesktopDatePicker
                          className="w-full"
                          // label="Start Date"
                          inputFormat="YYYY/MM/DD"
                          value={values.start_date}
                          onChange={(e: any) => {
                            setFieldValue(
                              "start_date",
                              e.$y + "-" + (e.$M + 1) + "-" + e.$D
                            );
                          }}
                          renderInput={(params) => (
                            <TextField {...params} variant={"standard"} />
                          )}
                        />
                      </div>
                    </Grid>
                    <Grid
                      item
                      lg={3.25}
                      md={5}
                      sm={6}
                      className="bazaarplan-div"
                    >
                      <div style={{ paddingTop: "30px", paddingRight: "15px" }}>
                        <p className="fieldTitle">Start Time</p>
                        <Input
                          className="w-full pt-[16px]"
                          id="start_time"
                          type="time"
                          name="start_time"
                          fullWidth={true}
                          required
                          error={!!errors.start_time}
                          value={values.start_time}
                          onChange={handleChange}
                          style={{ paddingTop: 0 }}
                        />
                      </div>
                    </Grid>
                  </Grid>
                  <Grid container spacing={2}>
                    <Grid
                      item
                      lg={3.25}
                      md={5}
                      sm={6}
                      className="bazaarplan-div"
                    >
                      <div style={{ paddingTop: "30px", paddingRight: "15px" }}>
                        <p className="fieldTitle">End Date</p>
                        <DesktopDatePicker
                          className="w-full"
                          // label="End Date"
                          inputFormat="YYYY/MM/DD"
                          value={values.end_date}
                          onChange={(e: any) => {
                            setFieldValue(
                              "end_date",
                              e.$y + "-" + (e.$M + 1) + "-" + e.$D
                            );
                          }}
                          renderInput={(params) => (
                            <TextField {...params} variant={"standard"} />
                          )}
                        />
                      </div>
                    </Grid>
                    <Grid
                      item
                      lg={3.25}
                      md={5}
                      sm={6}
                      className="bazaarplan-div"
                    >
                      <div style={{ paddingTop: "30px", paddingRight: "15px" }}>
                        <p className="fieldTitle">End Time</p>
                        <Input
                          className="w-full pt-[16px]"
                          id="end_time"
                          type="time"
                          name="end_time"
                          fullWidth={true}
                          required
                          error={!!errors.end_time}
                          value={values.end_time}
                          onChange={handleChange}
                          style={{ paddingTop: 0 }}
                        />
                      </div>
                    </Grid>
                  </Grid>
                  <Grid container spacing={2}>
                    <Grid
                      item
                      lg={3.25}
                      md={5}
                      sm={6}
                      className="bazaarplan-div"
                    >
                      <div style={{ paddingTop: "30px", paddingRight: "15px" }}>
                        <p className="title-main">Bazaar</p>
                        <Select
                          label="Bazaar"
                          variant={"standard"}
                          fullWidth={true}
                          value={selectbazzar}
                          name="bazaar"
                          onChange={(e) => {
                            handleChange(e);
                            hendalselectbazaar(e);
                          }}
                        >
                          {AllBazaar.map((items: any) => (
                            <MenuItem key={items.id} value={items.id}>
                              {items.bazaar_name}
                            </MenuItem>
                          ))}
                        </Select>
                      </div>
                    </Grid>
                    <Grid
                      item
                      lg={3.25}
                      md={5}
                      sm={6}
                      className="bazaarplan-div"
                    >
                      <div style={{ paddingTop: "30px", paddingRight: "15px" }}>
                        <p className="title-main">States</p>
                        <Select
                          label="Age"
                          variant={"standard"}
                          fullWidth={true}
                          name="state"
                          value={id ? values.state[0] : values.state}
                          onChange={(e) => {
                            handleChange(e);
                            setStates(e.target.value);
                          }}
                        >
                          {stateList?.map((row) => (
                            <MenuItem value={row?.id}>{row?.state}</MenuItem>
                          ))}
                        </Select>
                      </div>
                    </Grid>
                  </Grid>
                  <Grid container spacing={2}>
                    <Grid
                      item
                      lg={3.25}
                      md={5}
                      sm={6}
                      className="bazaarplan-div"
                    >
                      <div style={{ paddingTop: "30px", paddingRight: "15px" }}>
                        <p className="title-main">Districts</p>
                        <Select
                          label="Bazaar"
                          multiple={true}
                          variant={"standard"}
                          fullWidth={true}
                          name="district"
                          value={values.district}
                          onChange={(e) => {
                            handleChange(e);
                            setDistricts(e.target.value);
                          }}
                        >
                          {districtList.map((row) =>
                            row.district.map((innerrow: any) => (
                              <MenuItem value={innerrow.id}>
                                {innerrow.district}
                              </MenuItem>
                            ))
                          )}
                        </Select>
                      </div>
                    </Grid>
                    <Grid
                      item
                      lg={3.25}
                      md={5}
                      sm={6}
                      className="bazaarplan-div"
                    >
                      <div style={{ paddingTop: "30px", paddingRight: "15px" }}>
                        <p className="title-main">Assigned Cities</p>
                        <Select
                          label="Age"
                          variant={"standard"}
                          fullWidth={true}
                          multiple={true}
                          name="city"
                          value={values.city}
                          onChange={(e) => {
                            handleChange(e);
                            setCitys(e.target.value);
                          }}
                        >
                          {cityList.map((row) =>
                            row.city.map((innerrow: any) => (
                              <MenuItem value={innerrow.id}>
                                {innerrow.city}
                              </MenuItem>
                            ))
                          )}
                        </Select>
                      </div>
                    </Grid>
                  </Grid>
                  <Grid container spacing={2}>
                    <Grid
                      item
                      lg={3.25}
                      md={5}
                      sm={6}
                      className="bazaarplan-div"
                    >
                      <div style={{ paddingTop: "30px", paddingRight: "15px" }}>
                        <p className="fieldTitle">Plan Period</p>
                        <div className="flex items-end">
                          <Input
                            className="w-full"
                            id="plan_periods_in_days"
                            type="text"
                            name="plan_periods_in_days"
                            required
                            error={!!errors.plan_periods_in_days}
                            value={values.plan_periods_in_days}
                            onChange={handleChange}
                          />
                          <p className="text-[gray]">Days</p>
                        </div>
                      </div>
                    </Grid>
                  </Grid>

                  <div
                    style={{
                      paddingTop: "30px",
                      paddingRight: "15px",
                      display: "flex",
                      alignItems: "center",
                    }}
                  >
                    <input
                      type="checkbox"
                      checked={tally}
                      onChange={(e) => handlechagetelly(e)}
                      className="accent-[#4E2FA9] mx-1 !w-[17px] !h-[14px]"
                      name="plan_tally"
                      id="telly"
                    />
                    <label htmlFor="telly" className="fieldTitle !text-[16px]">
                      Add Tally
                    </label>
                  </div>
                </>
              ) : null}
              <></>
            </div>

            <div
              className="bazaarField flex items-center gap-8 bazaarplan-form"
              style={{ width: "100%", display: "block" }}
            >
              {values.plan_choice === "PAID" ? (
                <>
                  {/* <div className="grid grid-cols-2 gap-4 w-full"> */}
                  <Grid container spacing={2}>
                    <Grid
                      item
                      lg={3.25}
                      md={5}
                      sm={6}
                      className="bazaarplan-div"
                    >
                      <div style={{ paddingRight: "15px" }}>
                        <p className="fieldTitle">Plan Name</p>
                        <Input
                          className="w-full"
                          id="plan_name"
                          type="text"
                          name="plan_name"
                          required
                          error={!!errors.plan_name}
                          value={values.plan_name}
                          onChange={handleChange}
                        />
                      </div>
                    </Grid>
                    <Grid
                      item
                      lg={3.25}
                      md={5}
                      sm={6}
                      className="bazaarplan-div"
                    >
                      <div style={{ paddingRight: "15px" }}>
                        <p className="fieldTitle">Amount</p>
                        <Input
                          className="w-full"
                          id="amount"
                          type="text"
                          name="amount"
                          required
                          error={!!errors.amount}
                          value={values.amount ? values.amount : ""}
                          onChange={(e) => {
                            handleChange(e);
                            setPreviewData((prev: any) => ({
                              ...prev,
                              plantype: e?.target?.value,
                            }));
                          }}
                        />
                      </div>
                    </Grid>
                  </Grid>
                  <Grid container spacing={2}>
                    <Grid
                      item
                      lg={3.25}
                      md={5}
                      sm={6}
                      className="bazaarplan-div"
                    >
                      <div style={{ paddingTop: "30px", paddingRight: "15px" }}>
                        <p className="fieldTitle">Number of Branch</p>
                        <Input
                          className="w-full"
                          id="branches"
                          type="number"
                          name="branches"
                          required
                          error={!!errors.branches}
                          value={values.branches ? values.branches : ""}
                          onChange={(e) => {
                            handleChange(e);
                            setPreviewData((prev: any) => ({
                              ...prev,
                              branches: e?.target?.value,
                            }));
                          }}
                        />
                      </div>
                    </Grid>
                  </Grid>
                  <Grid container spacing={2}>
                    <Grid
                      item
                      lg={3.25}
                      md={5}
                      sm={6}
                      className="bazaarplan-div"
                    >
                      <div style={{ paddingTop: "30px", paddingRight: "15px" }}>
                        <p className="fieldTitle">Start Date</p>
                        <DesktopDatePicker
                          className="w-full"
                          // label="Start Date"
                          inputFormat="YYYY/MM/DD"
                          value={values.start_date}
                          onChange={(e: any) => {
                            setFieldValue(
                              "start_date",
                              e.$y + "-" + (e.$M + 1) + "-" + e.$D
                            );
                          }}
                          renderInput={(params) => (
                            <TextField {...params} variant={"standard"} />
                          )}
                        />
                      </div>
                    </Grid>
                    <Grid
                      item
                      lg={3.25}
                      md={5}
                      sm={6}
                      className="bazaarplan-div"
                    >
                      <div style={{ paddingTop: "30px", paddingRight: "15px" }}>
                        <p className="fieldTitle">Start Time</p>
                        <Input
                          className="w-full pt-[16px]"
                          id="start_time"
                          type="time"
                          name="start_time"
                          fullWidth={true}
                          required
                          error={!!errors.start_time}
                          value={values.start_time}
                          onChange={handleChange}
                          style={{ paddingTop: 0 }}
                        />
                      </div>
                    </Grid>
                  </Grid>
                  <Grid container spacing={2}>
                    <Grid
                      item
                      lg={3.25}
                      md={5}
                      sm={6}
                      className="bazaarplan-div"
                    >
                      <div style={{ paddingTop: "30px", paddingRight: "15px" }}>
                        <p className="fieldTitle">End Date</p>
                        <DesktopDatePicker
                          className="w-full"
                          // label="End Date"
                          inputFormat="YYYY/MM/DD"
                          value={values.end_date}
                          onChange={(e: any) => {
                            setFieldValue(
                              "end_date",
                              e.$y + "-" + (e.$M + 1) + "-" + e.$D
                            );
                          }}
                          renderInput={(params) => (
                            <TextField {...params} variant={"standard"} />
                          )}
                        />
                      </div>
                    </Grid>
                    <Grid
                      item
                      lg={3.25}
                      md={5}
                      sm={6}
                      className="bazaarplan-div"
                    >
                      <div style={{ paddingTop: "30px", paddingRight: "15px" }}>
                        <p className="fieldTitle">End Time</p>
                        <Input
                          className="w-full pt-[16px]"
                          id="end_time"
                          type="time"
                          name="end_time"
                          fullWidth={true}
                          required
                          error={!!errors.end_time}
                          value={values.end_time}
                          onChange={handleChange}
                          style={{ paddingTop: 0 }}
                        />
                      </div>
                    </Grid>
                  </Grid>
                  <Grid container spacing={2}>
                    <Grid
                      item
                      lg={3.25}
                      md={5}
                      sm={6}
                      className="bazaarplan-div"
                    >
                      <div style={{ paddingTop: "30px", paddingRight: "15px" }}>
                        <p className="title-main">Bazaar</p>
                        <Select
                          label="Bazaar"
                          variant={"standard"}
                          fullWidth={true}
                          value={selectbazzar}
                          name="bazaar"
                          onChange={(e) => {
                            handleChange(e);
                            hendalselectbazaar(e);
                          }}
                        >
                          {AllBazaar.map((items: any) => (
                            <MenuItem key={items.id} value={[items.id]}>
                              {items.bazaar_name}
                            </MenuItem>
                          ))}
                        </Select>
                      </div>
                    </Grid>
                    <Grid
                      item
                      lg={3.25}
                      md={5}
                      sm={6}
                      className="bazaarplan-div"
                    >
                      <div style={{ paddingTop: "30px", paddingRight: "15px" }}>
                        <p className="title-main">States</p>
                        <Select
                          label="Age"
                          variant={"standard"}
                          fullWidth={true}
                          name="state"
                          value={values?.state}
                          onChange={(e) => {
                            handleChange(e);
                            setStates(e.target.value);
                          }}
                        >
                          {stateList?.map((row) => (
                            <MenuItem value={row?.id}>{row?.state}</MenuItem>
                          ))}
                        </Select>
                      </div>
                    </Grid>
                  </Grid>
                  <Grid container spacing={2}>
                    <Grid
                      item
                      lg={3.25}
                      md={5}
                      sm={6}
                      className="bazaarplan-div"
                    >
                      <div style={{ paddingTop: "30px", paddingRight: "15px" }}>
                        <p className="title-main">Districts</p>
                        <Select
                          label="Bazaar"
                          multiple={true}
                          variant={"standard"}
                          fullWidth={true}
                          name="district"
                          value={values.district}
                          onChange={(e) => {
                            handleChange(e);
                            setDistricts(e.target.value);
                          }}
                        >
                          {districtList.map((row) =>
                            row.district.map((innerrow: any) => (
                              <MenuItem value={innerrow.id}>
                                {innerrow.district}
                              </MenuItem>
                            ))
                          )}
                        </Select>
                      </div>
                    </Grid>
                    <Grid
                      item
                      lg={3.25}
                      md={5}
                      sm={6}
                      className="bazaarplan-div"
                    >
                      <div style={{ paddingTop: "30px", paddingRight: "15px" }}>
                        <p className="title-main">Assigned Cities</p>
                        <Select
                          label="Age"
                          variant={"standard"}
                          fullWidth={true}
                          multiple={true}
                          name="city"
                          value={values.city}
                          onChange={(e) => {
                            handleChange(e);
                            setCitys(e.target.value);
                          }}
                        >
                          {cityList.map((row) =>
                            row.city.map((innerrow: any) => (
                              <MenuItem value={innerrow.id}>
                                {innerrow.city}
                              </MenuItem>
                            ))
                          )}
                        </Select>
                      </div>
                    </Grid>
                  </Grid>
                  <Grid container spacing={2}>
                    <Grid
                      item
                      lg={3.25}
                      md={5}
                      sm={6}
                      className="bazaarplan-div"
                    >
                      <div style={{ paddingTop: "30px", paddingRight: "15px" }}>
                        <p className="fieldTitle">Plan Period</p>
                        <div className="flex items-end">
                          <Input
                            className="w-full"
                            id="plan_periods_in_days"
                            type="text"
                            name="plan_periods_in_days"
                            required
                            error={!!errors.plan_periods_in_days}
                            value={values.plan_periods_in_days}
                            onChange={handleChange}
                          />
                          <p className="text-[gray]">Days</p>
                        </div>
                      </div>
                    </Grid>
                  </Grid>
                  <div
                    style={{
                      paddingTop: "30px",
                      paddingRight: "15px",
                      display: "flex",
                      alignItems: "center",
                    }}
                  >
                    <input
                      type="checkbox"
                      checked={tally}
                      onChange={(e) => handlechagetelly(e)}
                      className="accent-[#4E2FA9] mx-1 !w-[17px] !h-[14px]"
                      name="plan_tally"
                      id="telly"
                    />
                    <label htmlFor="telly" className="fieldTitle !text-[16px]">
                      Add Tally
                    </label>
                  </div>
                  {/* </div> */}
                </>
              ) : null}
              <></>
            </div>
          </div>

          <div className="mt-[20px] items-center">
            <p className="actionButton pt-[20px] pb-[20px]">Plan Features</p>
          </div>
          <Grid item lg={3.25} md={5} sm={6} xs={7}>
            <div className="w-[390px]">
              <Select
                sx={{
                  "& *": {
                    fontFamily: "Manrope !important",
                    fontSize: "14px",
                  },
                }}
                open={isOpen}
                fullWidth={true}
                onClose={() => setIsOpen(false)}
                onOpen={() => setIsOpen(true)}
                label="Age"
                name="plan_features"
                multiple={true}
                value={feature}
                variant={"standard"}
                renderValue={(selected: any) => {
                  var data: any = [];
                  AllFeature.map((item: any) => {
                    if (selected.includes(item?.id)) {
                      data.push(item.feature);
                    }
                  });
                  return data.join(", ");
                }}
                onChange={handleplanfeture}
              >
                {dropdowndata.map((items: any) => {
                  return (
                    <MenuItem key={items.id} value={items.id}>
                      <Checkbox checked={feature.indexOf(items.id) > -1} />
                      <ListItemText primary={items.feature} />
                    </MenuItem>
                  );
                })}
              </Select>
            </div>
          </Grid>
          {/* {[...Array(groupCategories)].map((row: any, index: number) => ( */}
          {/* <div className="pb-[20px]"> */}
          {/* <div className="bazaarField flex items-center gap-8"> */}
          {/* <Grid container spacing={2}>
                <Grid item lg={3.25} md={5} sm={6} xs={7}>
                  <FormControl variant="standard" style={{ width: "100%", paddingRight: "15px" }}>
                    <TextField
                      id="outlined-basic"
                      variant="outlined"
                      type="text"
                      name="plan_features"
                      value={addFeatures[index].feature}
                      onChange={(e) => handleChanges(e, index)}
                    // onChange={(e) => setFeature([ ...feature, parseInt(e.target.value) ])}
                    />
                  </FormControl>
                </Grid>
                <Grid item lg={3.25} md={5} sm={6} xs={5}>
                  <FormControl variant="standard" className="w-1/2">
                    <div className="ActionLogo">
                      <EditIcon
                        className="cursor-pointer"
                        onClick={() => savePlan(index, addFeatures[index].id)}
                      />
                      <div className="divider"></div>
                      <DeleteOutlineIcon
                        className="cursor-pointer text-[red]"
                        onClick={() => hideTabs(true, index, addFeatures[index].id)}
                      />
                    </div>
                  </FormControl>
                </Grid>
              </Grid> */}
          {/* </div> */}
          {/* </div> */}
          {/* ))} */}

          {/* <div className="">
            <div
              onClick={addInputField}
              className="border-2 border-dashed border-[#5542F6] w-[280px] p-[10px] items-center text-center rounded-lg cursor-pointer"
            >
              <p className="addButton">+ Add More</p>
            </div>
          </div> */}
          <button
            className={
              (id || (previewData?.featureData?.length > 0 &&
              previewData?.plantype !== ""))
                ? "flex mt-[25px] w-[250px] gap-5 items-center border-2 border-[#4E2FA9] rounded-[11px] border-dashed py-[8px] px-[20px] cursor-pointer"
                : "flex mt-[25px] w-[250px] gap-5 items-center border-2 border-[#4E2FA9] rounded-[11px] border-dashed py-[8px] px-[20px] cursor-not-allowed"
            }
            onClick={() => hendalPreview(values)}
            disabled={
              (id || (previewData?.featureData?.length > 0 &&
              previewData?.plantype != ""))
                ? false
                : true
            }
          >
            <div className="w-[20px]">
              <img src={IcView} alt={"Logo"} />
            </div>
            <div className="privacyButton">Preview</div>
          </button>
          <div className="flex gap-5 py-[30px]">
            <ActionButton
              title="Cancel"
              variant="primary"
              onClick={() => (navigate("/plans") , localStorage.removeItem("setplandata"))}
            />
            <ActionButton type="submit" title="Submit" variant="default" />
          </div>
        </form>
      </div>
    </LocalizationProvider>
  );
};

export { FreePlan };
