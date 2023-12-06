import React, { useState, useEffect, useRef } from "react";
import { ActionButton } from "@/components/atoms/Button/ActionButton";
import { useKycFormStyles } from "@/static/stylesheets/molecules";
import { Avatar, Box, FormControl, Input, InputAdornment, InputLabel, MenuItem, Select, SelectChangeEvent, TextField, Grid, Dialog } from "@mui/material";
import LogoDelete from "@/static/icons/ic_delete.png";
import LogoEdit from "@/static/icons/ic_edit.png";
import { AppService } from "@/service/AllApiData.service";
import RemoveRedEyeOutlinedIcon from "@mui/icons-material/RemoveRedEyeOutlined";
import DeleteOutlinedIcon from "@mui/icons-material/DeleteOutlined";
import { readFileAsBase64 } from "@/helper/base64";
import IcImage from "@/static/svg/ic_image.svg";
import { useParams } from "react-router-dom";
import GoogleMap from "../../../components/molecules/AgentsKycForm/IndivitualKYCForm/GoogleMap.js";
import './wholeseller.css'

const WholsellerKycForm = (props: any) => {
  const params = useParams();
  const { ErrorMessage, formValues, handleChange, setFieldValue, errors } = props;
  console.log('formValues 123123', formValues);
  const classes = useKycFormStyles();
  const [masterType, setMasterType] = useState("Regional Wholeseller");
  const [image, setImage] = React.useState("");
  const [imageModal, setImageModal] = React.useState(false);
  const [bazaarList, setBazaarList] = useState([]);
  const [states, setStates] = useState<any>(formValues.wholeseller_state);
  const [WholesellerAgent, setWholesellerAgent] = useState<any[]>([]);
  const [WholesellerAgentmain, setWholesellerAgentmain] = useState<any>(formValues.wholeseller_district);
  const [districtList, setDistrictList] = useState<any[]>([]);
  const [districts, setDistricts] = useState<any>(formValues.wholeseller_district);
  const [bazaars, setBazaars] = useState<any[]>([]);
  const [cityList, setCityList] = useState<any[]>([]);
  const [stateList, setStateList] = useState<any[]>([]);
  const [wholesellerType, setWholesellerType] = useState<any[]>([]);
  const [citys, setCitys] = useState<any>(formValues.wholeseller_city);
  const [planList, setPlanList] = useState<any[]>([]);
  const [locationModal, setLocationModal] = React.useState(false);
  const filePickerRef = useRef<any>(null);
  const cardPickerRef = useRef<any>(null);
  const cardPickerRef1 = useRef<any>(null);
  const cardPickerRef2 = useRef<any>(null);
  const [locationname, setLocationname] = useState("");
  const [currentlocation, setCurrentlocation] = useState("");
  const [commonLocation, setCommonLocation] = useState("");
  const [geoCordLat, setGeoCordLat] = useState(21.1702401);
  const [geoCordLng, setGeoCordLng] = useState(72.83106070000001);
  useEffect(() => {
    console.log("params.type", params.type)
    console.log('params asdasd', params);
    if (params.type == "KYC") {
      formValues.wholeseller_status = 'KYCAPPROVED';
      setFieldValue('wholeseller_status', 'KYCAPPROVED')
    } else {
      formValues.wholeseller_status = 'CREATED';

      setFieldValue('wholeseller_status', 'CREATED')
    }

  }, [params.type])

  
  useEffect(() => {
    getTotalStates();
    getAllBazaar();
    getWholesellerType();
    getAllPlan();
    getWholesellerAgent();
  }, []);

  useEffect(() => {
    getDistrictByStates();
  }, [states]);

  useEffect(() => {
    getAllCity();
  }, [districts]);

  const getWholesellerType = async () => {
    const responseJson = await AppService.getWholesellerType({});
    console.log("responseJson.data.results", responseJson.data.results);
    setWholesellerType(responseJson.data.results);
  };
  const getWholesellerAgent = async () => {
    const responseJson = await AppService.getAllAgentList();
    setWholesellerAgent(responseJson.data.results);
  };
  const getTotalStates = async () => {
    const responseJson = await AppService.getTotalStates();
    setStateList(responseJson.data);
  };

  const getDistrictByStates = async () => {
    const responseJson = await AppService.getAllDistricByState({ ids: states.toString() });
    console.log(responseJson.data.results);
    setDistrictList(responseJson.data.results);
  };

  const getAllCity = async () => {
    const responseJson = await AppService.getAllCityByDis({ ids: districts.toString() });
    console.log("districts", responseJson.data.results);
    setCityList(responseJson.data.results);
  };

  const getAllPlan = async () => {
    const responseJson = await AppService.getPlans();
    console.log("plan", responseJson.data)
    setPlanList(responseJson.data.results);
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


  const handleChangeMasterType = (event: SelectChangeEvent) => {
    setMasterType(event.target.value as string);
  };

  const [selectedImage, setSelectedImage] = useState();

  const imageChange = (e: any) => {
    if (e.target.files && e.target.files.length > 0) {
      console.log(e.target.files[0]);
      setSelectedImage(e.target.files[0]);
    }
  };

  const [selectedImageT, setSelectedImageT] = useState();

  const imageChangeTwo = (e: any) => {
    if (e.target.files && e.target.files.length > 0) {
      console.log(e.target.files[0]);
      setSelectedImageT(e.target.files[0]);
    }
  };


  const [selectedImageTH, setSelectedImageTH] = useState();

  const imageChangeTH = (e: any) => {
    if (e.target.files && e.target.files.length > 0) {
      console.log(e.target.files[0]);
      setSelectedImageTH(e.target.files[0]);
    }
  };


  const removeSelectedImage = (e: any) => {
    // setSelectedImage();
  };
  const removePicture = async (values: any, type: any, setFieldValue: any) => {
    if (values[type]) {
      setFieldValue(type, null);
    }
  };
  const insertPicture = async (e: any, type: any, setFieldValue: any) => {
    if (e.target.files[0]) {
      const url = await readFileAsBase64(e.target.files[0]);
      setFieldValue(type, url);
    } else {

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
      <div className={classes.root}>
        <div className="headContainer">
          {!formValues.wholeseller_image ? (
            <Avatar sx={{ width: 100, height: 100 }}>Logo</Avatar>
          ) : (
            <img src={formValues.wholeseller_image} width={100} height={100} style={{ width: "100px", height: "100px", borderRadius: "50%" }} />
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
                insertPicture(e, "wholeseller_image", setFieldValue)
              }
            />
          </div>
          <p className="buttonTitle cursor-pointer" onClick={() =>
            removePicture(formValues, "wholeseller_image", setFieldValue)
          }>Remove picture</p>
        </div>
        <div className="field">
          <Grid container spacing={2} style={{ alignItems: "center" }}>
            <Grid item lg={3.25} md={5} sm={6} className="bazaarplan-div">
              <div style={{ paddingTop: "30px", paddingRight: "15px" }}>
                <InputLabel htmlFor="standard-adornment-amount" className="label-main">Firm Name</InputLabel>
                <TextField name="wholeseller_firm_name" value={formValues.wholeseller_firm_name} style={{ width: "100%" }} onChange={handleChange} variant="standard" id="fullWidth" />
                <Box sx={{ color: "red" }}>
                  <ErrorMessage name="wholeseller_firm_name" />
                </Box>
              </div>
            </Grid>
            <Grid item lg={3.25} md={5} sm={6} className="bazaarplan-div">
              <div style={{ paddingTop: "30px", paddingRight: "15px" }}>
                <InputLabel htmlFor="standard-adornment-amount" className="label-main">Contact Person</InputLabel>
                <TextField name="wholeseller_contact_per" value={formValues.wholeseller_contact_per} style={{ width: "100%" }} onChange={handleChange} variant="standard" id="fullWidth" />
                <Box sx={{ color: "red" }}>
                  <ErrorMessage name="wholeseller_contact_per" />
                </Box>
              </div>
            </Grid>
          </Grid>
          <Grid container spacing={2} style={{ alignItems: "center" }}>
            <Grid item lg={3.25} md={5} sm={6} className="bazaarplan-div">
              <div style={{ paddingTop: "30px", paddingRight: "15px" }}>
                <FormControl variant="standard" style={{ width: "100%" }}>
                  <InputLabel htmlFor="standard-adornment-amount">Phone number</InputLabel>
                  <Input id="standard-adornment-amount" name="wholeseller_number" value={formValues.wholeseller_number ? Number(String(formValues.wholeseller_number).replace("+91", "")) : ""} onChange={handleChange} startAdornment={<InputAdornment position="start">+91 </InputAdornment>} type="number" />
                  <Box sx={{ color: "red" }}>
                    <ErrorMessage name="wholeseller_number" />
                  </Box>
                </FormControl>
              </div>
            </Grid>
            <Grid item lg={3.25} md={5} sm={6} className="bazaarplan-div">
              <div style={{ paddingTop: "30px", paddingRight: "15px" }}>
                <FormControl variant="standard" style={{ width: "100%" }}>
                  <InputLabel htmlFor="standard-adornment-amount">Alternate mobile number</InputLabel>
                  <Input id="standard-adornment-amount" name="wholeseller_altranate_number" value={formValues.wholeseller_altranate_number ? Number(String(formValues.wholeseller_altranate_number).replace("+91", "")) : ""} onChange={handleChange} startAdornment={<InputAdornment position="start">+91 </InputAdornment>} type="number" />
                  <Box sx={{ color: "red" }}>
                    <ErrorMessage name="wholeseller_altranate_number" />
                  </Box>
                </FormControl>
              </div>
            </Grid>
          </Grid>
          <Grid container spacing={2} style={{ alignItems: "center" }}>
            <Grid item lg={3.25} md={5} sm={6} className="bazaarplan-div">
              <div style={{ paddingTop: "30px", paddingRight: "15px" }}>
                {/* <FormControl variant="standard" style={{ width: "100%" }}>
                  <InputLabel htmlFor="standard-adornment-amount">Email Address</InputLabel>
                  <Input id="standard-adornment-amount" name="wholeseller_email_id" value={formValues.wholeseller_email_id} onChange={handleChange} type="email" />
                  <Box sx={{ color: "red" }}>
                    <ErrorMessage name="wholeseller_email_id" />
                  </Box>
                </FormControl> */}
                <div>
                  <label className="text-[12px] text-[#84818A] font-[500] font-[Manrope]">Email Address</ label>
                  <input name="wholeseller_email_id" value={formValues.wholeseller_email_id} onChange={handleChange} type="email" className="w-full border-b outline-none text-[14px] text-[#2E2C34] font-[500] font-[Manrope]" />
                  <div>
                    <ErrorMessage name="wholeseller_email_id" />
                  </div>
                </div>
              </div>
            </Grid>
            <Grid item lg={3.25} md={5} sm={6} className="bazaarplan-div">
              <div style={{ paddingTop: "30px", paddingRight: "15px" }}>
                <InputLabel id="Wholeseller type" style={{ fontSize: "12px" }}>Wholeseller type</InputLabel>
                <Select
                  labelId="Customer-Type"
                  label="Customer Type"
                  variant={"standard"}
                  fullWidth={true}
                  defaultValue={formValues.wholeseller_type || ""}
                  value={formValues.wholeseller_type || ""}
                  onChange={handleChange}
                  name="wholeseller_type"
                >
                  {wholesellerType.map((row) => (
                    <MenuItem value={row.id}>{row.wholeseller_type_name}</MenuItem>
                  ))}
                </Select>
                <Box sx={{ color: "red" }}>
                  <ErrorMessage name="wholeseller_type" />
                </Box>
              </div>
            </Grid>
          </Grid>
          <Grid container spacing={2} style={{ alignItems: "center" }}>
            <Grid item lg={3.25} md={5} sm={6} className="bazaarplan-div">
              <div style={{ paddingTop: "30px", paddingRight: "15px" }}>
                {/* <FormControl variant="standard" style={{ width: "100%" }}>
                  <InputLabel htmlFor="standard-adornment-amount">Aadhaar</InputLabel>
                  <Input id="standard-adornment-amount" name="wholeseller_adhar_no" value={formValues.wholeseller_adhar_no} onChange={handleChange} type="number" />
                  <Box sx={{ color: "red" }}>
                    <ErrorMessage name="wholeseller_adhar_no" />
                  </Box>
                </FormControl> */}
                 <div>
                  <label className="text-[12px] text-[#84818A] font-[500] font-[Manrope]">Aadhaar</ label>
                  <input name="wholeseller_adhar_no" value={formValues.wholeseller_adhar_no} onChange={handleChange} type="number" className="w-full border-b outline-none text-[14px] text-[#2E2C34] font-[500] font-[Manrope]" />
                  <div>
                  <ErrorMessage name="wholeseller_adhar_no" />
                  </div>
                </div>
              </div>
            </Grid>
            <Grid item lg={3.25} md={5} sm={6} className="bazaarplan-div">
              <div style={{ paddingTop: "30px", paddingRight: "15px" }}>
                <InputLabel id="Select-Districts" style={{ fontSize: "12px" }}>Wholesaler Agent</InputLabel>
                <Select
                  labelId="Select-wholeseller_agent"
                  label="Select wholeseller agent"
                  variant={"standard"}
                  fullWidth={true}
                  value={formValues.wholeseller_agent || ""}
                  onChange={(e) => { handleChange(e); setWholesellerAgentmain(e.target.value) }}
                  name="wholeseller_agent"
                >
                  {WholesellerAgent?.map((row: any) => (
                    <MenuItem value={row.id}>{row.agent_name}</MenuItem>
                  ))}
                </Select>
                <Box sx={{ color: "red" }}>
                  <ErrorMessage name="wholeseller_agent" />
                </Box>
              </div>
            </Grid>
          </Grid>
          <Grid container spacing={2} style={{ alignItems: "center" }}>
            <Grid item lg={3.25} md={5} sm={6} className="bazaarplan-div">
              <div style={{ paddingTop: "30px", paddingRight: "15px" }}>
                <InputLabel id="Bazaar">Bazaar</InputLabel>

                <Select
                  labelId="Select-Bazaar"
                  label="Select Bazaar"
                  variant={"standard"}
                  fullWidth={true}
                  value={formValues.wholeseller_bazaar || []}
                  onChange={handleChange}
                  name="wholeseller_bazaar"
                  multiple={true}
                >
                  {bazaarList.map((row: any) => (
                    <MenuItem value={row.value}>{row.label}</MenuItem>
                  ))}

                </Select>
                <Box sx={{ color: "red" }}>
                  <ErrorMessage name="wholeseller_bazaar" />
                </Box>
              </div>
            </Grid>
            <Grid item lg={3.25} md={5} sm={6} className="bazaarplan-div">
              <div style={{ paddingTop: "30px", paddingRight: "15px" }}>
                <InputLabel id="Bazaar">Plan</InputLabel>

                <Select
                  labelId="Select-Plan"
                  label="Select Plan"
                  variant={"standard"}
                  fullWidth={true}
                  value={formValues.wholeseller_plan || []}
                  onChange={handleChange}
                  name="wholeseller_plan"
                >
                  {planList.map((row: any) => (
                    <MenuItem value={row.id}>{row.plan_name}</MenuItem>
                  ))}

                </Select>
                <Box sx={{ color: "red" }}>
                  <ErrorMessage name="wholeseller_plan" />
                </Box>
              </div>
            </Grid>
          </Grid>
          <Grid container spacing={2} style={{ alignItems: "center" }}>
            <Grid item lg={3.25} md={5} sm={6} className="bazaarplan-div">
              <div style={{ paddingTop: "30px", paddingRight: "15px" }}>
                {/* <FormControl variant="standard" style={{ width: "100%" }}>
                  <InputLabel htmlFor="standard-adornment-amount" style={{ fontSize: "12px" }}>GST Number</InputLabel>
                  <Input id="standard-adornment-amount" name="wholeseller_gst_no" onChange={handleChange} value={formValues.wholeseller_gst_no} type="number" />
                  <Box sx={{ color: "red" }}>
                    <ErrorMessage name="wholeseller_gst_no" />
                  </Box>
                </FormControl> */}
                 <div>
                  <label className="text-[12px] text-[#84818A] font-[500] font-[Manrope]">GST Number</ label>
                  <input name="wholeseller_gst_no" onChange={handleChange} value={formValues.wholeseller_gst_no} type="number" className="w-full border-b outline-none text-[14px] text-[#2E2C34] font-[500] font-[Manrope]" />
                  <div>
                  <ErrorMessage name="wholeseller_gst_no" />
                  </div>
                </div>
              </div>
            </Grid>
            <Grid item lg={3.25} md={5} sm={6} className="bazaarplan-div">
              <div style={{ paddingTop: "30px", paddingRight: "15px" }}>
                <InputLabel htmlFor="standard-adornment-amount" style={{ fontSize: "12px" }}>Firm PAN Number</InputLabel>
                <TextField name="wholeseller_firm_pan_no" onChange={handleChange} value={formValues.wholeseller_firm_pan_no} variant="standard" id="fullWidth" style={{ width: "100%" }} />
                <Box sx={{ color: "red" }}>
                  <ErrorMessage name="wholeseller_firm_pan_no" />
                </Box>
              </div>
            </Grid>
          </Grid>
          <Grid container spacing={2} style={{ alignItems: "center" }}>
            <Grid item lg={3.25} md={5} sm={6} className="bazaarplan-div">
              <div style={{ paddingTop: "30px", paddingRight: "15px" }}>
                <InputLabel htmlFor="standard-adornment-amount" style={{ fontSize: "12px" }}>Address</InputLabel>
                <TextField name="wholeseller_address" onChange={handleChange} value={formValues.wholeseller_address} variant="standard" id="fullWidth" style={{ width: "100%" }} />
                <Box sx={{ color: "red" }}>
                  <ErrorMessage name="wholeseller_address" />
                </Box>
              </div>
            </Grid>
            <Grid item lg={3.25} md={5} sm={6} className="bazaarplan-div">
              <div style={{ paddingTop: "30px", paddingRight: "15px" }}>
                <InputLabel htmlFor="standard-adornment-amount" style={{ fontSize: "12px" }}>Landmark</InputLabel>
                <TextField name="wholeseller_landmark" onChange={handleChange} value={formValues.wholeseller_landmark} variant="standard" id="fullWidth" style={{ width: "100%" }} />
                <Box sx={{ color: "red" }}>
                  <ErrorMessage name="wholeseller_landmark" />
                </Box>
              </div>
            </Grid>
          </Grid>
          <Grid container spacing={2} style={{ alignItems: "center" }}>
            <Grid item lg={3.25} md={5} sm={6} className="bazaarplan-div">
              <div style={{ paddingTop: "30px", paddingRight: "15px" }}>
                <InputLabel id="Select-State" style={{ fontSize: "12px" }}>State</InputLabel>
                <Select
                  labelId="Select-State"
                  label="Select State"
                  variant={"standard"}
                  fullWidth={true}
                  value={formValues.wholeseller_state}
                  onChange={(e) => { handleChange(e); setStates(e.target.value) }}
                  name="wholeseller_state"
                >
                  {stateList.map((row) => (
                    <MenuItem value={row.id}>{row.state}</MenuItem>
                  ))}
                </Select>
                <Box sx={{ color: "red" }}>
                  <ErrorMessage name="wholeseller_state" />
                </Box>
              </div>
            </Grid>
            <Grid item lg={3.25} md={5} sm={6} className="bazaarplan-div">
              <div style={{ paddingTop: "30px", paddingRight: "15px" }}>
                <InputLabel id="Select-Districts" style={{ fontSize: "12px" }}>Districts</InputLabel>
                <Select
                  labelId="Select-Districts"
                  label="Select Districts"
                  variant={"standard"}
                  fullWidth={true}
                  value={formValues.wholeseller_district || ""}
                  onChange={(e) => { handleChange(e); setDistricts(e.target.value) }}
                  name="wholeseller_district"
                >
                  {districtList.map((row) => (
                    row.district.map((innerrow: any) => (
                      <MenuItem value={innerrow.id}>{innerrow.district}</MenuItem>
                    ))
                  ))}
                </Select>
                <Box sx={{ color: "red" }}>
                  <ErrorMessage name="wholeseller_district" />
                </Box>
              </div>
            </Grid>
          </Grid>
          <Grid container spacing={2} style={{ alignItems: "center" }}>
            <Grid item lg={3.25} md={5} sm={6} className="bazaarplan-div">
              <div style={{ paddingTop: "30px", paddingRight: "15px" }}>
                <InputLabel id="Select-Districts" style={{ fontSize: "12px" }}>City</InputLabel>
                <Select
                  labelId="Select-City"
                  label="Select City"
                  variant={"standard"}
                  fullWidth={true}
                  value={formValues.wholeseller_city || ""}
                  onChange={(e) => { handleChange(e); setCitys(e.target.value) }}
                  name="wholeseller_city"
                >
                  {cityList.map((row) => (
                    row.city.map((innerrow: any) => (
                      <MenuItem value={innerrow.id}>{innerrow.city}</MenuItem>
                    ))
                  ))}
                </Select>
                <Box sx={{ color: "red" }}>
                  <ErrorMessage name="wholeseller_city" />
                </Box>
              </div>
            </Grid>
            <Grid item lg={3.25} md={5} sm={6} className="bazaarplan-div">
              <div style={{ paddingTop: "30px", paddingRight: "15px" }}>
                {/* <FormControl variant="standard" style={{ width: "100%" }}>
                  <InputLabel htmlFor="standard-adornment-amount" style={{ fontSize: "12px" }}>Pincode</InputLabel>
                  <Input id="standard-adornment-amount" name="wholeseller_pincode_no" onChange={handleChange} value={formValues.wholeseller_pincode_no} type="number" />
                  <Box sx={{ color: "red" }}>
                    <ErrorMessage name="wholeseller_pincode_no" />
                  </Box>
                </FormControl> */}
                <div>
                  <label className="text-[12px] text-[#84818A] font-[500] font-[Manrope]">Pincode</ label>
                  <input name="wholeseller_pincode_no" onChange={handleChange} value={formValues.wholeseller_pincode_no} type="number" className="w-full border-b outline-none text-[14px] text-[#2E2C34] font-[500] font-[Manrope]" />
                  <div>
                  <ErrorMessage name="wholeseller_pincode_no" />
                  </div>
                </div>
              </div>
            </Grid>
          </Grid>
          <div className="mapButton mt-8" style={{ alignItems: "center" }}>
            <p>Set Location via Google Maps</p>
            <ActionButton variant="primary" title="Set Location"
              onClick={() => {
                setLocationModal(true);
              }} />
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
                    {!formValues.wholeseller_adhar_front_image ? (
                      <img src={IcImage} alt={"Logo"} />
                    ) : (
                      <img src={formValues.wholeseller_adhar_front_image} />
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
                      "wholeseller_adhar_front_image",
                      setFieldValue
                    )
                  }
                />
                <div className="w-[110px] border-2 p-[10px] rounded-md flex gap-4" style={{ margin: "0 auto", marginTop: "15px" }}>
                  <div
                    onClick={() => {
                      setImageModal(true);
                      setImage(formValues.wholeseller_adhar_front_image);
                    }}
                  >
                    <RemoveRedEyeOutlinedIcon className="cursor-pointer" />
                  </div>
                  <div className="border-l-2"></div>
                  <div
                    onClick={() => {
                      removePicture(
                        formValues,
                        "wholeseller_adhar_front_image",
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
                    {!formValues.wholeseller_adhar_back_image ? (
                      <img src={IcImage} alt={"Logo"} />
                    ) : (
                      <img src={formValues.wholeseller_adhar_back_image} />
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
                      "wholeseller_adhar_back_image",
                      setFieldValue
                    )
                  }
                />
                <div className="w-[110px] border-2 p-[10px] rounded-md flex gap-4" style={{ margin: "0 auto", marginTop: "15px" }}>
                  <div
                    onClick={() => {
                      setImageModal(true);
                      setImage(formValues.wholeseller_adhar_back_image);
                    }}
                  >
                    <RemoveRedEyeOutlinedIcon className="cursor-pointer" />
                  </div>
                  <div className="border-l-2"></div>
                  <div
                    onClick={() => {
                      removePicture(
                        formValues,
                        "wholeseller_adhar_back_image",
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
                    {!formValues.wholeseller_pan_card_image ? (
                      <img src={IcImage} alt={"Logo"} />
                    ) : (
                      <img src={formValues.wholeseller_pan_card_image} />
                    )}
                    <p className="browseButton">Browse</p>
                  </div>
                </Avatar>
                <input
                  className="w-0 h-0 absolute"
                  type={"file"}
                  ref={cardPickerRef2}
                  onChange={(e: any) =>
                    insertPicture(e, "wholeseller_pan_card_image", setFieldValue)
                  }
                />
                <div className="w-[110px] border-2 p-[10px] rounded-md flex gap-4" style={{ margin: "0 auto", marginTop: "15px" }}>
                  <div
                    onClick={() => {
                      setImageModal(true);
                      setImage(formValues.wholeseller_pan_card_image);
                    }}
                  >
                    <RemoveRedEyeOutlinedIcon className="cursor-pointer" />
                  </div>
                  <div className="border-l-2"></div>
                  <div
                    onClick={() => {
                      removePicture(
                        formValues,
                        "wholeseller_pan_card_image",
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
      </div >
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
    </>
  );
};

export { WholsellerKycForm };