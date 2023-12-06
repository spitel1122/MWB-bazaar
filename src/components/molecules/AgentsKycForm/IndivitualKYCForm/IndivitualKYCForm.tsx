import React, { useState, useRef, useEffect } from "react";
import { ActionButton } from "@/components/atoms/Button/ActionButton";
import { useKycFormStyles } from "@/static/stylesheets/molecules";
import {
  Avatar,
  Box,
  Dialog,
  FormControl,
  Input,
  MenuItem,
  Select,
  Grid,
  SelectChangeEvent,
} from "@mui/material";
import PhoneInput from "react-phone-input-2";
import * as Yup from "yup";
import RemoveRedEyeOutlinedIcon from "@mui/icons-material/RemoveRedEyeOutlined";
import DeleteOutlinedIcon from "@mui/icons-material/DeleteOutlined";
import IcImage from "@/static/svg/ic_image.svg";
import { readFileAsBase64 } from "@/helper/base64";
import { ErrorMessage, Form, Formik } from "formik";
import { AppService } from "@/service/AllApiData.service";
import { Alert, AlertError } from "@/alert/Alert";
import GoogleMap from "../../../../components/molecules/AgentsKycForm/IndivitualKYCForm/GoogleMap.js";
import { useNavigate } from "react-router-dom";

function setFieldValue(phone: string) { }
interface IndivitualKYCFormType {
  data?: any;
  id?: any;
}

async function convertImageTobS4(imgUrl: string) {
  const imageToBase64 = require('image-to-base64/browser.js');
  let response = await imageToBase64(imgUrl);
  return "data:image/png;base64," + response;
}

const IndivitualKYCForm: React.FC<IndivitualKYCFormType> = ({ data, id }) => {
  const classes = useKycFormStyles();
  const navigate = useNavigate()
  const filePickerRef = useRef<any>(null);
  const cardPickerRef = useRef<any>(null);
  const cardPickerRef1 = useRef<any>(null);
  const cardPickerRef2 = useRef<any>(null);
  const [masterType, setMasterType] = useState("Regional Wholesaler");
  const [allBazaar, setAllBazaar] = React.useState([]);
  const [AllState, setAllState] = React.useState([]);
  const [allDis, setAllDis] = React.useState([]);
  const [allCity, setAllCity] = React.useState([]);
  const [imageModal, setImageModal] = React.useState(false);
  const [image, setImage] = React.useState("");
  const [locationModal, setLocationModal] = React.useState(false);
  const [geoCordLat, setGeoCordLat] = useState(21.1702401);
  const [geoCordLng, setGeoCordLng] = useState(72.83106070000001);
  const [geoLoc, setGeoLoc] = useState("");
  const [locationname, setLocationname] = useState("");
  const [currentlocation, setCurrentlocation] = useState("");
  const [commonLocation, setCommonLocation] = useState("");

  console.log("propsssss in indivuad kyc===", data);

  const handleChangeMasterType = (event: SelectChangeEvent) => {
    setMasterType(event.target.value as string);
  };

  const SignupSchema = Yup.object().shape({
    agent_name: Yup.string()
      .min(2, "Too Short!")
      .max(40, "Too Long!")
      .required("agent name is required"),
    agent_number: Yup.number()
      .typeError("Phone no must be in digit")
      .integer()
      .positive("Phone no must be positive")
      .required("Phone no is required"),
    agent_altranate_mobile_number: Yup.number()
      .typeError("Phone no must be in digit")
      .integer()
      .positive("Phone no must be positive")
      .required("Phone no is required"),
    agent_email: Yup.string()
      .required("Email is required")
      .matches(
        /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/,
        "Invalid email format"
      ),
    agent_bazaar: Yup.array().min(1, "Pick at least 1 Bazaar"),
    agent_gender: Yup.string().required("Gender is required"),
    agent_date_of_birth: Yup.string().required("Date of birth is required"),
    agent_address: Yup.string().required("Address is required"),
    agent_landmark: Yup.string().required("Landmark is required"),
    agent_state: Yup.string().required("State is required"),
    agent_district: Yup.string().required("District is required"),
    agent_city: Yup.string().required("City is required"),
    agent_pincode: Yup.string()
      .min(6, "Too Short!")
      .required("Pincode is required"),
    agent_adharcard_no: Yup.string()
      .min(12, "Too Short!")
      .required("Aadhaarcard number is required"),
    agent_pancard_no: Yup.string()
      .matches(/[A-Z]{5}[0-9]{4}[A-Z]{1}$/, "Invalid PAN card number").required("Pancard num is required"),
  });

  let initialValues = {
    // agent_description: "",
    agent_name: data?.agent_name || "",
    agent_type: data?.agent_type || "",
    agent_number: data?.agent_number || "",
    agent_altranate_mobile_number: data?.agent_altranate_mobile_number || "",
    agent_email: data?.agent_email || "",
    agent_gender: data?.agent_gender || "MALE",
    agent_image: data?.agent_image || "",
    agent_date_of_birth: data?.agent_date_of_birth || "",
    agent_address: data?.agent_address || "",
    agent_landmark: data?.agent_landmark || "",
    agent_pincode: data?.agent_pincode || "",
    agent_adharcard_no: data?.agent_adharcard_no || "",
    agent_adhar_front_image: data?.agent_adhar_front_image || null,
    agent_adhar_back_image: data?.agent_adhar_back_image || null,
    agent_pancard_image: data?.agent_pancard_image || null,
    agent_pancard_no: data?.agent_pancard_no || "",
    // agent_image: null,
    // agent_active: false,
    // agency: 2,
    agent_state: data?.agent_state || "",
    agent_city: data?.agent_city || "",
    agent_district: data?.agent_district || "",
    // agent_commision: 0,
    agent_bazaar: data?.agent_bazaar || [],
    agent_assigned_state: data?.agent_assigned_state || [],
    agent_assigned_city: data?.agent_assigned_city || [],
    agent_assigned_district: data?.agent_assigned_district || [],
    get_agent_location_json_data: data?.get_agent_location_json_data || "",
    agent_status: data?.agent_status == "CREATED" ? 'PENDING' : data?.agent_status
  };

  const handleFormSubmit = async (values: any) => {
    values.get_agent_location_json_data = commonLocation ? commonLocation : "test locations";
    if (values?.agent_pancard_image?.includes("https")) {
      values.agent_pancard_image = await convertImageTobS4(data?.agent_pancard_image);
    }
    if (values?.agent_adhar_front_image?.includes("https")) {
      values.agent_adhar_front_image = await convertImageTobS4(data?.agent_adhar_front_image);
    }
    if (values?.agent_adhar_back_image.includes("https")) {
      values.agent_adhar_back_image = await convertImageTobS4(data?.agent_adhar_back_image);
    }
    if (values.agent_image?.includes("https")) {
      values.agent_image = await convertImageTobS4(data?.agent_image);
    }

    console.log("values submittttttttteddd", values);
    try {
      values.agent_number = "+" + values.agent_number;
      values.agent_altranate_mobile_number = "+" + values.agent_altranate_mobile_number;
      const response = await AppService.updateAgentKyc(id, values);
      if (response) {
        Alert("Successfully updated!!!");
        navigate('/agents')
      }
    } catch (error: any) {
      console.log("error===>in updating kyc", error);
      let message = error.response.data.type + "\n"
      error.response.data.errors.map((row: any) => {
        message += row.attr + " : " + row.detail + "\n"
      })
      AlertError(message);
    }
  };

  const getCoordinates = (e: any) => {
    let arrayOne = [];

    setGeoCordLat(e.latLng.lat());
    setGeoCordLng(e.latLng.lng());
    arrayOne.push(e.latLng.lat(), e.latLng.lng());
    // console.log("arrayOnearrayOne",arrayOne)
    // setGeoArr(arrayOne);
  };

  const getCurrentLocation = () => {
    if ("geolocation" in navigator) {
      console.log("Available");
      navigator.geolocation.getCurrentPosition(function (position) {
        console.log("Latitude is :", position.coords.latitude);
        console.log("Longitude is :", position.coords.longitude);

        fetch(
          "https://maps.googleapis.com/maps/api/geocode/json?address=" +
          position.coords.latitude +
          "," +
          position.coords.longitude +
          "&key="
        )
          .then((response) => response.json())
          .then((responseJson) => {
            console.log("responseJson", responseJson);
            console.log(
              "responseJson==>",
              responseJson.results[0].formatted_addressYup
            );
            setCurrentlocation(responseJson.results[0].formatted_address);
          });
      });
    } else {
      console.log("Not Available");
    }
  };

  const getValues = (values: any) => {
    console.log("values=====>", values);
  };
  const insertPicture = async (e: any, type: any, setFieldValue: any) => {
    console.log("insertPicture ddddddddidnt rrrrrrrr:");
    if (e.target.files[0]) {
      console.log("insertPicture  rrrrrrrr:");
      const url = await readFileAsBase64(e.target.files[0]);
      console.log("insertPicture =====>", url);
      setFieldValue(type, url);
    } else {
      console.log("dddddidnt runn=====");
    }
  };
  const removePicture = async (values: any, type: any, setFieldValue: any) => {
    if (values[type]) {
      setFieldValue(type, null);
    }
  };

  const getAllLists = async () => {
    const responseJson = await AppService.getAllStates();
    // console.log(responseJson.data.bazaar);
    setAllState(responseJson.data.results);
  };

  const getAllDis = async (param: any, type: any) => {
    console.log("ppppppppparrararams", param);

    const responseJson = await AppService.getAllDistricByState(param);
    console.log("all Districtss and single-----");
    // console.log(responseJson.data.bazaar);
    console.log("all Districtss and single-----ALLL");
    setAllDis(responseJson.data.results);
  };

  const getAllCity = async (param: any, type: any) => {
    const responseJson = await AppService.getAllCityByDis(param);
    setAllCity(responseJson.data.results);
  };

  const getAllBazaar = async () => {
    const responseJson = await AppService.getAllBazaar();
    setAllBazaar(responseJson.data.results);
  };

  useEffect(() => {
    getAllDis({ ids: data?.agent_state }, "");
  }, [data?.agent_state]);
  useEffect(() => {
    getAllCity({ ids: data?.agent_district }, "");
  }, [data?.agent_district]);

  useEffect(() => {
    getAllLists();
    getAllBazaar();
  }, []);

  useEffect(() => {
    if (locationname) {
      setCurrentlocation("");
    }
  }, [locationname]);

  useEffect(() => {
    if (currentlocation) {
      setLocationname("");
    }
  }, [currentlocation]);
  return (
    <>
      <Formik
        initialValues={initialValues}
        onSubmit={handleFormSubmit}
        validationSchema={SignupSchema}
        enableReinitialize={true}
      >
        {({
          values,
          handleChange,
          handleBlur,
          setFieldValue,
          touched,
          errors
        }) => (
          <Form>
            <div className={classes.root}>
              <div className="headContainer">
                {!values.agent_image ? (
                  <Avatar sx={{ width: 100, height: 100 }}>Logo</Avatar>
                ) : (
                  <img src={values.agent_image} style={{ width: "100px", height: "100px", borderRadius: "50%" }} />
                )}
                <div className="relative">
                  <ActionButton
                    onClick={() => filePickerRef?.current?.click()}
                    variant="default"
                    title="Upload new picture"
                  />
                  <input
                    className="w-0 h-0 absolute"
                    type={"file"}
                    ref={filePickerRef}
                    onChange={(e: any) =>
                      insertPicture(e, "agent_image", setFieldValue)
                    }
                  />
                </div>
                <p
                  className="buttonTitle cursor-pointer"
                  onClick={() =>
                    removePicture(values, "agent_image", setFieldValue)
                  }
                >
                  Remove picture
                </p>
              </div>
              <div className="field">
                <Grid container spacing={2}>
                  <Grid item lg={3.25} md={5} sm={6} className="bazaarplan-div">
                    <div style={{ width: "100%", paddingRight: "15px" }}>
                      <FormControl variant="standard" style={{ width: "100%" }}>
                        <p className="formTitle">Name</p>
                        <Input
                          id="standard-adornment-amount"
                          type="text"
                          value={values.agent_name}
                          onChange={handleChange}
                          name="agent_name"
                          disabled={id ? true : false}
                          onBlur={handleBlur}
                          style={{ fontSize: "14px" }}
                        />
                        <Box sx={{ color: "red" }}>
                          <ErrorMessage name="agent_name" />
                        </Box>
                      </FormControl>
                    </div>
                  </Grid>
                </Grid>
                <Grid container spacing={2}>
                  <Grid item lg={3.25} md={5} sm={6} className="bazaarplan-div">
                    <div style={{ paddingTop: "30px", paddingRight: "15px" }}>
                      <FormControl variant="standard" style={{ width: "100%" }}>
                        <p className="formTitle">Phone Number</p>
                        <PhoneInput
                          country={"in"}
                          onChange={(phone) => setFieldValue("agent_number", phone)}
                          value={values?.agent_number}
                          onBlur={handleBlur}
                          disabled={id ? true : false}
                        />
                        <Box sx={{ color: "red" }}>
                          <ErrorMessage name="agent_number" />
                        </Box>
                      </FormControl>
                    </div>
                  </Grid>
                  <Grid item lg={3.25} md={5} sm={6} className="bazaarplan-div">
                    <div style={{ paddingTop: "30px", paddingRight: "15px" }}>
                      <FormControl variant="standard" style={{ width: "100%" }}>
                        <p className="formTitle">Alternative Phone Number</p>
                        <PhoneInput
                          country={"in"}
                          onChange={(phone) =>
                            setFieldValue("agent_altranate_mobile_number", phone)
                          }
                          value={values?.agent_altranate_mobile_number}
                          onBlur={handleBlur}
                          disabled={data?.agent_altranate_mobile_number ? true : false}
                        />
                        <Box sx={{ color: "red" }}>
                          <ErrorMessage name="agent_altranate_mobile_number" />
                        </Box>
                      </FormControl>
                    </div>
                  </Grid>
                </Grid>
                <Grid container spacing={2}>
                  <Grid item lg={3.25} md={5} sm={6} className="bazaarplan-div">
                    <div style={{ paddingTop: "30px", paddingRight: "15px" }}>
                      <FormControl variant="standard" style={{ width: "100%" }}>
                        <p className="formTitle">Email Address</p>
                        <Input
                          id="standard-adornment-amount"
                          type="email"
                          value={values.agent_email}
                          onChange={handleChange}
                          name="agent_email"
                          onBlur={handleBlur}
                        />
                        <Box sx={{ color: "red" }}>
                          <ErrorMessage name="agent_email" />
                        </Box>
                      </FormControl>
                    </div>
                  </Grid>
                </Grid>
                <Grid container spacing={2}>
                  <Grid item lg={3.25} md={5} sm={6} className="bazaarplan-div">
                    <div style={{ paddingTop: "30px", paddingRight: "15px" }}>
                      <FormControl variant="standard" style={{ width: "100%" }}>
                        <p className="formTitle">Gender</p>
                        <Select
                          label="Bazaar"
                          labelId="Bazaar"
                          variant={"standard"}
                          fullWidth={true}
                          value={values.agent_gender}
                          onChange={handleChange}
                          name="agent_gender"
                        >
                          <MenuItem value={"MALE"}>Male</MenuItem>
                          <MenuItem value={"FEMALE"}>Female</MenuItem>
                        </Select>
                      </FormControl>
                    </div>
                  </Grid>
                  <Grid item lg={3.25} md={5} sm={6} className="bazaarplan-div">
                    <div style={{ paddingTop: "30px", paddingRight: "15px" }}>
                      <FormControl variant="standard" style={{ width: "100%" }}>
                        <p className="formTitle" style={{ paddingBottom: "8px" }}>Date of Birth</p>
                        <input
                          className="border-b-2 border-[#84818A] w-full"
                          type={"date"}
                          value={values.agent_date_of_birth}
                          onChange={handleChange}
                          name="agent_date_of_birth"
                          onBlur={handleBlur}
                        />
                        <Box sx={{ color: "red" }}>
                          <ErrorMessage name="agent_date_of_birth" />
                        </Box>
                      </FormControl>
                    </div>
                  </Grid>
                </Grid>
                <Grid container spacing={2}>
                  <Grid item lg={3.25} md={5} sm={6} className="bazaarplan-div">
                    <div style={{ paddingTop: "30px", paddingRight: "15px" }}>
                      <FormControl variant="standard" style={{ width: "100%" }}>
                        <p className="formTitle">Address</p>
                        <Input
                          id="standard-adornment-amount"
                          type="text"
                          value={values.agent_address}
                          onChange={handleChange}
                          name="agent_address"
                          onBlur={handleBlur}
                        />
                        <Box sx={{ color: "red" }}>
                          <ErrorMessage name="agent_address" />
                        </Box>
                      </FormControl>
                    </div>
                  </Grid>
                  <Grid item lg={3.25} md={5} sm={6} className="bazaarplan-div">
                    <div style={{ paddingTop: "30px", paddingRight: "15px" }}>
                      <FormControl variant="standard" style={{ width: "100%" }}>
                        <p className="formTitle">Landmark</p>
                        <Input
                          id="standard-adornment-amount"
                          type="text"
                          value={values.agent_landmark}
                          onChange={handleChange}
                          name="agent_landmark"
                          onBlur={handleBlur}
                        />
                        <Box sx={{ color: "red" }}>
                          <ErrorMessage name="agent_landmark" />
                        </Box>
                      </FormControl>
                    </div>
                  </Grid>
                </Grid>
                <Grid container spacing={2}>
                  <Grid item lg={3.25} md={5} sm={6} className="bazaarplan-div">
                    <div style={{ paddingTop: "30px", paddingRight: "15px" }}>
                      <p className="formTitle">State</p>
                      <Select
                        label="Age"
                        variant={"standard"}
                        fullWidth={true}
                        multiple={false}
                        name="agent_state"
                        value={values.agent_state}
                        onBlur={handleBlur}
                        onChange={(e: any) => {
                          handleChange(e);
                          setAllCity([]);
                          setAllDis([]);
                          getAllDis(
                            {
                              ids:
                                e.target.value.length > 1
                                  ? e.target.value.join(",")
                                  : e.target.value,
                            },
                            "single"
                          );
                        }}
                      >
                        {AllState?.map((items: any) => (
                          <MenuItem key={items.id} value={items.id}>
                            {items.state}
                          </MenuItem>
                        ))}
                      </Select>
                      <Box sx={{ color: "red" }}>
                        <ErrorMessage name="agent_state" />
                      </Box>
                    </div>
                  </Grid>
                  <Grid item lg={3.25} md={5} sm={6} className="bazaarplan-div">
                    <div style={{ paddingTop: "30px", paddingRight: "15px" }}>
                      <div className="w-full">
                        <p className="formTitle">District</p>
                        {/* <DistrictPicker
                      placeholder={"All Districts"}
                      variant={"outlined"}
                    /> */}
                        <Select
                          label="Bazaar"
                          multiple={false}
                          variant={"standard"}
                          fullWidth={true}
                          name="agent_district"
                          value={values.agent_district}
                          onBlur={handleBlur}
                          onChange={(e: any) => {
                            handleChange(e);
                            getAllCity(
                              {
                                ids:
                                  e.target.value.length > 1
                                    ? e.target.value.join(",")
                                    : e.target.value,
                              },
                              "single"
                            );
                          }}
                        >
                          {allDis?.map((items: any) => {
                            return items?.district.map((item: any) => {
                              return (
                                <MenuItem value={item.id}>{item.district}</MenuItem>
                              );
                            });
                          })}
                        </Select>
                        <Box sx={{ color: "red" }}>
                          <ErrorMessage name="agent_district" />
                        </Box>
                      </div>
                    </div>
                  </Grid>
                </Grid>
                <Grid container spacing={2}>
                  <Grid item lg={3.25} md={5} sm={6} className="bazaarplan-div">
                    <div style={{ paddingTop: "30px", paddingRight: "15px" }}>
                      <div className="w-full">
                        <p className="formTitle">City</p>
                        {/* <CityPicker
                      placeholder={"All Cities"}
                      variant={"outlined"}
                    /> */}
                        <Select
                          label="Age"
                          variant={"standard"}
                          fullWidth={true}
                          multiple={false}
                          name="agent_city"
                          value={values.agent_city}
                          onBlur={handleBlur}
                          onChange={(e: any) => {
                            handleChange(e);
                          }}
                        >
                          {allCity?.map((items: any) => {
                            return items?.city.map((item: any) => {
                              return (
                                <MenuItem value={item.id}>{item.city}</MenuItem>
                              );
                            });
                          })}
                        </Select>
                        <Box sx={{ color: "red" }}>
                          <ErrorMessage name="agent_city" />
                        </Box>
                      </div>
                    </div>
                  </Grid>
                  <Grid item lg={3.25} md={5} sm={6} className="bazaarplan-div">
                    <div style={{ paddingTop: "30px", paddingRight: "15px" }}>
                      <FormControl variant="standard" style={{ width: "100%" }}>
                        <p className="formTitle">Pin code</p>
                        <Input
                          onKeyPress={(event) => {
                            const target = event.target as HTMLInputElement;
                            if (target.value.length >= 6 || !/\d/.test(event.key)) {
                              event.preventDefault();
                            }
                          }}
                          id="standard-adornment-amount"
                          type="number"
                          value={values.agent_pincode}
                          onChange={handleChange}
                          name="agent_pincode"
                          onBlur={handleBlur}
                        />
                        <Box sx={{ color: "red" }}>
                          <ErrorMessage name="agent_pincode" />
                        </Box>
                      </FormControl>
                    </div>
                  </Grid>
                </Grid>
                <Grid container spacing={2}>
                  <Grid item lg={3.25} md={5} sm={6} className="bazaarplan-div">
                    <div style={{ paddingTop: "30px", paddingRight: "15px" }}>
                      <div className="w-full">
                        <p className="title-main">Bazaar</p>
                        <Select
                          label="Bazaar"
                          labelId="Bazaar"
                          variant={"standard"}
                          fullWidth={true}
                          value={values.agent_bazaar}
                          onChange={handleChange}
                          name="agent_bazaar"
                          className="w-1/2"
                          multiple={true}
                        >
                          {allBazaar.map((items: any) => (
                            <MenuItem key={items.id} value={items.id}>
                              {items.bazaar_name}
                            </MenuItem>
                          ))}
                        </Select>
                        <Box sx={{ color: "red" }}>
                          <ErrorMessage name="agent_bazaar" />
                        </Box>
                      </div>
                    </div>
                  </Grid>
                  <Grid item lg={3.25} md={5} sm={6} className="bazaarplan-div">
                    <div style={{ paddingTop: "30px", paddingRight: "15px" }}>
                      <div className="w-full">
                        <p className="title-main">Assigned States</p>
                        <Select
                          label="Age"
                          variant={"standard"}
                          fullWidth={true}
                          multiple={true}
                          name="agent_assigned_state"
                          value={values.agent_assigned_state}
                          onBlur={handleBlur}
                          onChange={(e: any) => {
                            handleChange(e);
                            getAllDis(
                              {
                                ids:
                                  e.target.value.length > 1
                                    ? e.target.value.join(",")
                                    : e.target.value.join(","),
                              },
                              "multiple"
                            );
                          }}
                        >
                          {AllState.map((items: any) => (
                            <MenuItem key={items.id} value={items.id}>
                              {items.state}
                            </MenuItem>
                          ))}
                        </Select>
                        <Box sx={{ color: "red" }}>
                          <ErrorMessage name="agent_assigned_state" />
                        </Box>
                      </div>
                    </div>
                  </Grid>
                </Grid>
                <Grid container spacing={2}>
                  <Grid item lg={3.25} md={5} sm={6} className="bazaarplan-div">
                    <div style={{ paddingTop: "30px", paddingRight: "15px" }}>
                      <div className="w-full">
                        <p className="title-main">Assigned Districts</p>
                        <Select
                          label="Bazaar"
                          multiple={true}
                          variant={"standard"}
                          fullWidth={true}
                          onBlur={handleBlur}
                          name="agent_assigned_district"
                          value={values.agent_assigned_district}
                          onChange={(e: any) => {
                            handleChange(e);
                            getAllCity(
                              {
                                ids:
                                  e.target.value.length > 1
                                    ? e.target.value.join(",")
                                    : e.target.value.join(","),
                              },
                              "multiple"
                            );
                          }}
                        >
                          {allDis?.map((items: any) => {
                            return items?.district.map((item: any) => {
                              return (
                                <MenuItem value={item.id}>
                                  {item.district}
                                </MenuItem>
                              );
                            });
                          })}
                        </Select>
                        <Box sx={{ color: "red" }}>
                          <ErrorMessage name="agent_assigned_district" />
                        </Box>
                      </div>
                    </div>
                  </Grid>
                  <Grid item lg={3.25} md={5} sm={6} className="bazaarplan-div">
                    <div style={{ paddingTop: "30px", paddingRight: "15px" }}>
                      <div className="w-full">
                        <p className="title-main">Assigned Cities</p>
                        <Select
                          label="Age"
                          variant={"standard"}
                          fullWidth={true}
                          multiple={true}
                          name="agent_assigned_city"
                          onBlur={handleBlur}
                          value={values.agent_assigned_city}
                          onChange={(e: any) => {
                            handleChange(e);
                            // getAllCity({
                            //   ids:
                            //     e.target.value.length > 1
                            //       ? e.target.value.join(",")
                            //       : e.target.value,
                            // });
                          }}
                        >
                          {allCity?.map((items: any) => {
                            return items?.city.map((item: any) => {
                              return (
                                <MenuItem value={item.id}>
                                  {item.city}
                                </MenuItem>
                              );
                            });
                          })}
                        </Select>
                        <Box sx={{ color: "red" }}>
                          <ErrorMessage name="agent_assigned_city" />
                        </Box>
                      </div>
                    </div>
                  </Grid>
                </Grid>
                <Grid container spacing={2}>
                  <Grid item lg={3.25} md={5} sm={6} className="bazaarplan-div">
                    <div style={{ paddingTop: "30px", paddingRight: "15px" }}>
                      <FormControl variant="standard" className="w-full">
                        <p className="formTitle">Aadhaar Number</p>
                        <Input
                          onKeyPress={(event) => {
                            const target = event.target as HTMLInputElement;
                            if (
                              target.value.length >= 12 ||
                              !/\d/.test(event.key)
                            ) {
                              event.preventDefault();
                            }
                          }}
                          id="standard-adornment-amount"
                          type="number"
                          value={values.agent_adharcard_no}
                          onChange={handleChange}
                          name="agent_adharcard_no"
                          onBlur={handleBlur}
                        />
                        <Box sx={{ color: "red" }}>
                          <ErrorMessage name="agent_adharcard_no" />
                        </Box>
                      </FormControl>
                    </div>
                  </Grid>
                  <Grid item lg={3.25} md={5} sm={6} className="bazaarplan-div">
                    <div style={{ paddingTop: "30px", paddingRight: "15px" }}>
                      <FormControl variant="standard" className="w-full">
                        <p className="formTitle">Pan Number</p>
                        <Input
                          id="standard-adornment-amount"
                          type="text"
                          value={values.agent_pancard_no}
                          onChange={(e) => setFieldValue("agent_pancard_no", e.target.value.toUpperCase())}
                          name="agent_pancard_no"
                          onBlur={handleBlur}
                        />
                        <Box sx={{ color: "red" }}>
                          <ErrorMessage name="agent_pancard_no" />
                        </Box>
                      </FormControl>
                    </div>
                  </Grid>
                </Grid>
              </div>
              <div className="mapButton mt-8 items-center" style={{ flexWrap: "wrap" }}>
                <p>Set Location via Google Maps</p>
                <ActionButton
                  variant="primary"
                  title="Set Location"
                  onClick={() => {
                    setLocationModal(true);
                    console.log("valuessssssss------in kyc", values);
                  }}
                />
              </div>
              <div className="docContainer">
                <p className="docTitle">Documents</p>
                <div className="Attachment-file" style={{ flexWrap: "wrap" }}>
                  <div style={{ textAlign: "center" }}>
                    <p className="pb-[10px]">Aadhaar Card Front</p>
                    <Avatar
                      onClick={() => cardPickerRef?.current?.click()}
                      className="cursor-pointer border-2"
                      sx={{
                        width: 110,
                        height: 100,
                        borderRadius: 2,
                        background: "white",
                      }}
                      variant="square"
                      style={{ margin: "0 auto" }}
                    >
                      <div className="flex gap-2">
                        {!values.agent_adhar_front_image ? (
                          <img src={IcImage} alt={"Logo"} />
                        ) : (
                          <img src={values.agent_adhar_front_image} />
                        )}
                        <p className="browseButton">Browse</p>
                      </div>
                    </Avatar>
                    <input
                      className="w-0 h-0 absolute"
                      type={"file"}
                      ref={cardPickerRef}
                      onChange={(e: any) =>
                        insertPicture(
                          e,
                          "agent_adhar_front_image",
                          setFieldValue
                        )
                      }
                    />
                    <div className="w-[110px] border-2 p-[10px] rounded-md flex gap-4" style={{ margin: "0 auto", marginTop: "15px" }}>
                      <div
                        onClick={() => {
                          setImageModal(true);
                          setImage(values.agent_adhar_front_image);
                        }}
                      >
                        <RemoveRedEyeOutlinedIcon className="cursor-pointer" />
                      </div>
                      <div className="border-l-2"></div>
                      <div
                        onClick={() => {
                          removePicture(
                            values,
                            "agent_adhar_front_image",
                            setFieldValue
                          );
                        }}
                      >
                        <DeleteOutlinedIcon className="cursor-pointer text-[red]" />
                      </div>
                    </div>
                  </div>
                  <div style={{ textAlign: "center" }}>
                    <p className="pb-[10px]">Aadhaar Card Back</p>
                    <Avatar
                      onClick={() => cardPickerRef1?.current?.click()}
                      className="cursor-pointer border-2"
                      sx={{
                        width: 110,
                        height: 100,
                        borderRadius: 2,
                        background: "white",
                      }}
                      variant="square"
                      style={{ margin: "0 auto" }}
                    >
                      <div className="flex gap-2">
                        {!values.agent_adhar_back_image ? (
                          <img src={IcImage} alt={"Logo"} />
                        ) : (
                          <img src={values.agent_adhar_back_image} />
                        )}
                        <p className="browseButton">Browse</p>
                      </div>
                    </Avatar>
                    <input
                      className="w-0 h-0 absolute"
                      type={"file"}
                      ref={cardPickerRef1}
                      onChange={(e: any) =>
                        insertPicture(
                          e,
                          "agent_adhar_back_image",
                          setFieldValue
                        )
                      }
                    />
                    <div className="w-[110px] border-2 p-[10px] rounded-md flex gap-4" style={{ margin: "0 auto", marginTop: "15px" }}>
                      <div
                        onClick={() => {
                          setImageModal(true);
                          setImage(values.agent_adhar_back_image);
                        }}
                      >
                        <RemoveRedEyeOutlinedIcon className="cursor-pointer" />
                      </div>
                      <div className="border-l-2"></div>
                      <div
                        onClick={() => {
                          removePicture(
                            values,
                            "agent_adhar_back_image",
                            setFieldValue
                          );
                        }}
                      >
                        <DeleteOutlinedIcon className="cursor-pointer text-[red]" />
                      </div>
                    </div>
                  </div>
                  <div style={{ textAlign: "center" }}>
                    <p className="pb-[10px]">Pan Card</p>
                    <Avatar
                      onClick={() => cardPickerRef2?.current?.click()}
                      className="cursor-pointer border-2"
                      sx={{
                        width: 110,
                        height: 100,
                        borderRadius: 2,
                        background: "white",
                      }}
                      variant="square"
                      style={{ margin: "0 auto" }}
                    >
                      <div className="flex gap-2">
                        {!values.agent_pancard_image ? (
                          <img src={IcImage} alt={"Logo"} />
                        ) : (
                          <img src={values.agent_pancard_image} />
                        )}
                        <p className="browseButton">Browse</p>
                      </div>
                    </Avatar>
                    <input
                      className="w-0 h-0 absolute"
                      type={"file"}
                      ref={cardPickerRef2}
                      onChange={(e: any) =>
                        insertPicture(e, "agent_pancard_image", setFieldValue)
                      }
                    />
                    <div className="w-[110px] border-2 p-[10px] rounded-md flex gap-4" style={{ margin: "0 auto", marginTop: "15px" }}>
                      <div
                        onClick={() => {
                          setImageModal(true);
                          setImage(values.agent_pancard_image);
                        }}
                      >
                        <RemoveRedEyeOutlinedIcon className="cursor-pointer" />
                      </div>
                      <div className="border-l-2"></div>
                      <div
                        onClick={() => {
                          removePicture(
                            values,
                            "agent_pancard_image",
                            setFieldValue
                          );
                        }}
                      >
                        <DeleteOutlinedIcon className="cursor-pointer text-[red]" />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="flex gap-5 pt-[10px] pb-[40px]">
              <ActionButton title="Cancel" variant="primary" />
              <ActionButton type="submit" title="Submit" variant="default" />
            </div>
          </Form>
        )}
      </Formik>
      <Dialog
        open={imageModal}
        maxWidth={"lg"}
        sx={{
          ".MuiPaper-root": {
            borderRadius: "20px",
          },
        }}
        onClose={() => {
          setImageModal(false);
          setImage("");
        }}
      >
        <img src={image} />
        <div className={"action-bar"}>
          <ActionButton
            variant={"default"}
            title={"Cancel"}
            onClick={() => {
              setImageModal(false);
              setImage("");
            }}
          />
        </div>
      </Dialog>
      <Dialog
        open={locationModal}
        sx={{
          ".MuiPaper-root": {
            borderRadius: "10px",
            width: "33%",
            height: "60vh",
          },
        }}
        onClose={() => {
          setLocationModal(false);
        }}
      >
        <div className={"action-bar"}>
          <div className="cat">
            <p
              className="formTitle"
              style={{ margin: "5px 20px", textAlign: "center" }}
            >
              Location
            </p>
            <GoogleMap
              // setLocationname={setLocationname}
              selectlocation={setLocationname}
              lat={geoCordLat}
              setLat={setGeoCordLat}
              setLng={setGeoCordLng}
              lng={geoCordLng}
              getCoordinates={getCoordinates}
            />
          </div>
          <div
            className="mapButton mt-8 items-center"
            style={{ textAlign: "center" }}
          >
            <p>Current location</p>
            <ActionButton
              variant="primary"
              title="Current location"
              onClick={() => getCurrentLocation()}
            />
          </div>
          <div style={{ textAlign: "center" }}>
            <Input
              id="standard-adornment-amount"
              type="text"
              value={locationname ? locationname : currentlocation}
              onChange={(e) => setCurrentlocation(e.target.value)}
              name="agent_pancard_no"
            />
          </div>
          <div style={{ display: 'flex', justifyContent: 'center', margin: '20px', position: 'absolute', bottom: '0' }}>
            <ActionButton
              variant={"default"}
              title={"Cancel"}
              onClick={() => {
                setLocationModal(false);
              }}
            />
            <ActionButton
              variant={"primary"}
              title={"Submit"}
              onClick={() => {
                if (locationname && !currentlocation) {
                  setCommonLocation(locationname);
                } else if (currentlocation && !locationname) {
                  setCommonLocation(currentlocation);
                }
                setLocationModal(false);
              }}
            />
          </div>
        </div>
      </Dialog>
    </>
  );
};

export { IndivitualKYCForm };
