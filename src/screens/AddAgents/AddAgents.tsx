import { ActionButton } from "@/components/atoms/Button/ActionButton";
import { DashboardLayout } from "@/components/layouts";
import { useaddAgentStyle } from "@/static/stylesheets/molecules/addagent";
import {
  Box,
  FormControl,
  FormControlLabel,
  MenuItem,
  Radio,
  RadioGroup,
  Select,
  SelectChangeEvent,
  TextField,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import SalesManIcon from "@/static/icons/icon_salesman.svg";
import indivitualIcon from "@/static/icons/icon_indivitual.svg";
import AgancyIcon from "@/static/icons/icon_agancy.svg";
import * as Yup from "yup";
import { ErrorMessage, Form, Formik } from "formik";
import PhoneInput from "react-phone-input-2";
import { AppService } from "@/service/AllApiData.service";
import { Alert, AlertError } from "@/alert/Alert";
import LogoPrev from "@/static/icons/ic_previous.png";
import { useNavigate, useParams } from "react-router-dom";

const AddAgents = () => {
  const classes = useaddAgentStyle();
  const navigate = useNavigate()
  const [paymentType, setPaymentType] = React.useState("individual");
  const [, setMasterType] = useState("Regional Wholeseller");
  const [AllState, setAllState] = React.useState([]);
  const [allDis, setAllDis] = React.useState([]);
  const [allCity, setAllCity] = React.useState([]);
  const [singleState, setSingleState] = React.useState([]);
  const [singleDis, setSingleDis] = React.useState([]);

  const [initialValues, setInitialValues] = useState<any>({
    // agent_description: "",
    agent_name: "",
    agent_type: "INDIVIDUAL",
    agent_number: "",
    agency_name: "",
    // agent_altranate_mobile_number: "",
    agent_email: "",
    // agent_gender: "MALE",
    // agent_date_of_birth: "",
    // agent_address: "",
    // agent_landmark: "",
    // agent_pincode: "",
    // agent_adharcard_no: "",
    // agent_adhar_front_image: null,
    // agent_adhar_back_image: null,
    // agent_pancard_image: null,
    // agent_pancard_no: "",
    // agent_image: null,
    agent_active: true,
    // agency: 2,
    agent_state: "",
    agent_city: "",
    agent_district: "",
    // agent_commision: 0,
    agent_bazaar: [],
    agent_assigned_state: [],
    agent_assigned_city: [],
    agent_assigned_district: [],
  });
  const [singleCity, setSingleCity] = React.useState([]);
  const [AllBazaar, setAllBazaar] = React.useState<any>([]);
  const [count, setCount] = useState<any>(1)
  const { id } = useParams()

  const handleChangeMasterType = (event: SelectChangeEvent) => {
    setMasterType(event.target.value as string);
  };

  const validationSchema = Yup.object().shape({
    agent_name: Yup.string()
      .min(2, "Too Short!")
      .max(40, "Too Long!")
      .required("agent name is required"),
    // agency_name: Yup.string().when("agent_type", {
    //   is: (values:string) =>values && ( values == "Agent"),
    //   then: Yup.string().required("agency name is required")
    // }),
    // agency_name: Yup.string().when("agent_type", (value: string) => {
    //   console.log("drdfhdfhdfh", value);
    //   // if (value == "Agent") {
    //   //   return Yup.string().required("jygsdyfg");
    //   // }
    // }),
    // agent_email: Yup.string()
    //   .email("Invalid email format")
    //   .required("Email address is required*"),
    agent_number: Yup.number()
      .typeError("Phone no must be in digit")
      .integer()
      .positive("Phone no must be positive")
      .required("Phone no is required"),
    agent_state: Yup.string().required("State no is required"),
    agent_district: Yup.string().required("District is required"),
    agent_city: Yup.string().required("City is required"),
    agent_bazaar: Yup.array().required("Bazaar is required"),
    // .required("Bazaar is required"),
    agent_assigned_state: Yup.array().min(1, "Pick at least 1 Assigned state"),
    // .of(Yup.string())
    // .required("Assigned State is required"),
    agent_assigned_city: Yup.array().min(1, "Pick at least 1 Assigned city"),
    agent_assigned_district: Yup.array().min(
      1,
      "Pick at least 1 Assigned  district"
    ),
  });

  // const {
  //   handleChange,
  //   handleSubmit,
  //   handleReset,
  //   values,
  //   errors,
  //   touched,
  //   setValues,
  //   setFieldValue,
  // } = useFormik({
  //   initialValues,
  //   // validationSchema,
  //   onSubmit: (values) => {
  //     console.log("val--on submit", values);
  //   },
  // });

  const handleFormSubmit = async (values: any) => {
    if (values.agent_type == "INDIVIDUAL") {
      delete values.agency_name;
    } else if (values.agent_type == "SALESMAN") {
      delete values.agency_name;
    }
    console.log("Valuessss---|||||||", values);
    values.agent_number = "+" + values.agent_number;
    try {
      if (!id) {
        const response = await AppService.addAgent(values);
        if (response) {
          Alert("Successfully added!!!");
          navigate('/agents')
        }
      } else {
        const response = await AppService.updateAgentKyc(id, values);
        if (response) {
          Alert("Successfully Update!!!");
          navigate('/agents')
        }
      }
    } catch (error: any) {
      let message: any = [];
      error.response.data.errors?.map((x: any) => {
        message.push(x.detail)
      })
      AlertError(`1. ${message}`);
    }
  };

  const getAllLists = async () => {
    const responseJson = await AppService.getAllStates();
    // console.log(responseJson.data.bazaar);
    setAllState(responseJson.data.results);
    setSingleState(responseJson.data.results);
  };

  const getAllDis = async (param: any, type: any) => {
    console.log("ppppppppparrararams", param);

    const responseJson = await AppService.getAllDistricByState(param);
    console.log("all Districtss and single-----");
    // console.log(responseJson.data.bazaar);
    if (type == "multiple") {
      console.log("all Districtss and single-----ALLL");
      setAllDis(responseJson.data.results);
    } else {
      console.log("all Districtss and single-----SINGLL");
      setSingleDis(responseJson.data.results);
    }
  };

  const getAllCity = async (param: any, type: any) => {
    const responseJson = await AppService.getAllCityByDis(param);
    if (type == "multiple") {
      setAllCity(responseJson.data.results);
    } else {
      setSingleCity(responseJson.data.results);
    }
  };
  useEffect(() => {
    if (count) {
      getAllBazaar1(count)
    }
  }, [count])

  const getAllBazaar1 = async (countdata: any) => {
    const responseJson = await AppService.getAllBazaar(countdata);
    if (responseJson.status == 200) {
      console.log(AllBazaar, "count")
      setCount(count + 1)
      setAllBazaar((prev: any) => ([...prev, ...responseJson.data.results]));
    }
  };

  const getOneAgent = async (id: any) => {
    try {
      const response = await AppService.getAgentById(id);
      console.log("Resss=====in agent edit", response.data);
      setInitialValues((prev: any) => ({
        ...prev,
        agent_name: response.data?.agent_name,
        agent_type: response.data?.agent_type,
        agent_number: response.data?.agent_number,
        agency_name: response.data?.agent_name,
        agent_email: response.data?.agent_email,
        agent_active: response.data?.agent_active,
        agent_state: response.data?.agent_state,
        agent_city: response.data?.agent_city,
        agent_district: response.data?.agent_district,
        agent_bazaar: response.data?.agent_bazaar,
        agent_assigned_state: response.data?.agent_assigned_state,
        agent_assigned_city: response.data?.agent_assigned_city,
        agent_assigned_district: response.data?.agent_assigned_district,
      }))
    } catch (error) {
      console.log("errrrrrr in kyc", error);
    }
  };

  useEffect(() => {
    getAllLists();
  }, []);

  useEffect(() => {
    if (id) {
      getOneAgent(id)
    }
  }, [id])


  console.log("all Bazaar of agent form------raw", AllBazaar);
  console.log("all Districtss of agent form------raw", allDis);
  console.log("Singleee Districtss of agent form------raw", singleDis);
  console.log("all Citiessss of agent form------raw", allCity);
  console.log("Sinnnngleee Citiessss of agent form------raw", singleCity);
  console.log("initialValuesinitialValuesinitialValues", initialValues);

  const handalchanges = (e: any) => {
    setInitialValues((prev: any) => ({ ...prev, [e.target.name]: e.target.name }))
  }

  return (
    <>
      <Formik
        initialValues={initialValues}
        onSubmit={handleFormSubmit}
        enableReinitialize={true}
        validationSchema={validationSchema}
      >
        {({
          values,
          handleChange,
          handleBlur,
          setFieldValue,
          setValues,
          touched,
          errors,
        }) => {
          return (
            <Form>
              <DashboardLayout>
                <div className={classes.root}>
                  <div className="container">
                    <div className="textContainer" style={{ alignItems: "center", display: "flex" }}>
                      <button onClick={() => navigate("/agents")} className="icon" style={{ marginRight: "15px" }}>
                        <img src={LogoPrev} alt={"Logo"} style={{ width: "7px", height: "12px" }} />
                      </button>
                      <p className="titleHead">{id ? "Edit" : "Add"} Agent</p>
                    </div>
                    <div className="radio-actionButton">
                      <div className={`${values.agent_type === 'INDIVIDUAL' ? "border border-[#4e2fa9] p-[10px] w-[205px] flex justify-center items-center h-[60px] rounded-md bg-[#f9fafb]" : "radio-button"}`}>
                        <FormControl>
                          <RadioGroup
                            aria-labelledby="radio-buttons"
                            name="agent_type"
                            value={values.agent_type}
                            onChange={() =>
                              setFieldValue("agent_type", "INDIVIDUAL")
                            }
                          >
                            <FormControlLabel
                              value="Cash "
                              control={<Radio sx={{
                                color: '#84818A',
                                '&.Mui-checked': {
                                  color: '#4e2fa9',
                                },
                              }} />}
                              checked={values.agent_type === "INDIVIDUAL"}
                              label={
                                <div className="flex gap-4 items-center">
                                  <img src={indivitualIcon} alt={"Logo"} />
                                  Individual
                                </div>
                              }
                            />
                          </RadioGroup>
                        </FormControl>
                      </div>

                      <div className={`${values.agent_type === 'AGENCY' ? "border border-[#4e2fa9] p-[10px] w-[205px] flex justify-center items-center h-[60px] rounded-md bg-[#f9fafb]" : "radio-button"}`}>
                        <FormControl>
                          <RadioGroup
                            aria-labelledby="radio-buttons"
                            name="agent_type"
                            value={values.agent_type}
                            onChange={() => setFieldValue("agent_type", "AGENCY")}
                          >
                            <FormControlLabel
                              value="Online"
                              control={<Radio sx={{
                                color: '#84818A',
                                '&.Mui-checked': {
                                  color: '#4e2fa9',
                                },
                              }} />}
                              checked={values.agent_type === "AGENCY"}
                              label={
                                <div className="flex gap-4 items-center">
                                  <img src={AgancyIcon} alt={"Logo"} /> Agency
                                </div>
                              }
                            />
                          </RadioGroup>
                        </FormControl>
                      </div>
                      <div className={`${values.agent_type === 'SALESMAN' ? "border border-[#4e2fa9] p-[10px] w-[205px] flex justify-center items-center h-[60px] rounded-md bg-[#f9fafb]" : "radio-button"}`}>
                        <FormControl>
                          <RadioGroup
                            aria-labelledby="radio-buttons"
                            name="agent_type"
                            value={values.agent_type}
                            onChange={() =>
                              setFieldValue("agent_type", "SALESMAN")
                            }
                          >
                            <FormControlLabel
                              value="Online"
                              control={<Radio sx={{
                                color: '#84818A',
                                '&.Mui-checked': {
                                  color: '#4e2fa9',
                                },
                              }} />}
                              checked={values.agent_type === "SALESMAN"}
                              label={
                                <div className="flex gap-4 items-center">
                                  <img src={SalesManIcon} alt={"Logo"} /> Salesman
                                </div>
                              }
                            />
                          </RadioGroup>
                        </FormControl>
                      </div>
                    </div>
                    {values.agent_type === "INDIVIDUAL" ? (
                      <>
                        {console.log("vaaaaaaaaaaa=======>", values)}

                        {/* <Form onSubmit={handleSubmit}> */}
                        <div className={"w-[50%]"}>
                          <div className="formContainer">
                            <div className="grid grid-cols-2 gap-4 w-full">
                              <div>
                                <p className="title-main">Agent Person</p>
                                <TextField
                                  sx={{
                                    "& *": {
                                      fontFamily: "Manrope !important",
                                      fontSize: "14px",
                                    },
                                  }}
                                  variant="standard"
                                  onChange={(e) => {
                                    handleChange(e);
                                    handalchanges(e);
                                  }}
                                  fullWidth={true}
                                  name="agent_name"
                                  value={values.agent_name}
                                  onBlur={handleBlur}
                                />
                                <Box sx={{ color: "red" }}>
                                  <ErrorMessage name="agent_name" />
                                </Box>
                              </div>
                              <div>
                                <PhoneInput
                                  country={"in"}
                                  value={values.agent_number}
                                  onChange={(phone) =>
                                    setFieldValue("agent_number", phone)
                                  }
                                />
                                <Box sx={{ color: "red" }}>
                                  <ErrorMessage name="agent_number" />
                                </Box>
                              </div>
                            </div>
                          </div>

                          <div className="formContainer">
                            <div className="grid grid-cols-2 gap-4 w-full">
                              <div>
                                <p className="title-main">State</p>

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
                                  {singleState?.map((items: any) => (
                                    <MenuItem key={items.id} value={items.id}>
                                      {items.state}
                                    </MenuItem>
                                  ))}
                                </Select>
                                <Box sx={{ color: "red" }}>
                                  <ErrorMessage name="agent_state" />
                                </Box>
                              </div>
                              <div>
                                <p className="title-main">District</p>

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
                                  {singleDis?.map((items: any) => {
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
                                  <ErrorMessage name="agent_district" />
                                </Box>
                              </div>
                            </div>
                          </div>

                          <div className="formContainer">
                            <div className="w-[50%]">
                              <p className="title-main">City</p>

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
                                {singleCity?.map((items: any) => {
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
                                <ErrorMessage name="agent_city" />
                              </Box>
                            </div>

                            <div className="w-[50%]">
                              <div>
                                <p className="title-main">Email Address</p>
                                <TextField
                                  sx={{
                                    "& *": {
                                      fontFamily: "Manrope !important",
                                      fontSize: "14px",
                                    },
                                  }}
                                  variant="standard"
                                  onChange={(e) => {
                                    handleChange(e);
                                  }}
                                  fullWidth={true}
                                  name="agent_email"
                                  value={values.agent_email}
                                  onBlur={handleBlur}
                                />
                                <Box sx={{ color: "red" }}>
                                  <ErrorMessage name="agent_name" />
                                </Box>
                              </div>
                            </div>
                          </div>

                          <div className="formContainer">
                            <div className="grid grid-cols-2 gap-4 w-full">
                              <div>
                                <p className="title-main">Bazaar</p>
                                <Select
                                  label="Bazaar"
                                  // multiple={true}
                                  variant={"standard"}
                                  fullWidth={true}
                                  value={values.agent_bazaar}
                                  onBlur={handleBlur}
                                  name="agent_bazaar"
                                  onChange={(e) => {
                                    // handleChange(e);
                                    setFieldValue('agent_bazaar', [e?.target?.value])
                                  }}
                                >
                                  {AllBazaar.map((items: any) => (
                                    <MenuItem key={items.id} value={items.id}>
                                      {items.bazaar_name}
                                    </MenuItem>
                                  ))}
                                </Select>
                                <Box sx={{ color: "red" }}>
                                  <ErrorMessage name="agent_bazaar" />
                                </Box>
                              </div>
                              <div>
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
                                  {values?.agent_bazaar?.length > 0 && (AllBazaar?.find((item: any) => item.id === values.agent_bazaar[0])?.bazaar_state_names)?.map((items: any) => (
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
                          </div>

                          <div className="formContainer">
                            <div className="grid grid-cols-2 gap-4 w-full">
                              <div>
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
                                  {values?.agent_bazaar?.length > 0 && (AllBazaar?.find((item: any) => item.id === values.agent_bazaar[0])?.bazaar_district_names)?.map((items: any) => (
                                    <MenuItem key={items.id} value={items.id}>
                                      {items.district}
                                    </MenuItem>
                                  ))}
                                </Select>
                                <Box sx={{ color: "red" }}>
                                  <ErrorMessage name="agent_assigned_district" />
                                </Box>
                              </div>
                              <div>
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
                                  {values?.agent_bazaar?.length > 0 && (AllBazaar?.find((item: any) => item.id === values.agent_bazaar[0])?.bazaar_city_names)?.map((items: any) => (
                                    <MenuItem key={items.id} value={items.id}>
                                      {items.city}
                                    </MenuItem>
                                  ))}
                                </Select>
                                <Box sx={{ color: "red" }}>
                                  <ErrorMessage name="agent_assigned_city" />
                                </Box>
                              </div>
                            </div>
                          </div>
                        </div>
                        {/* </Form> */}
                      </>
                    ) : null}

                    {values.agent_type === "AGENCY" ? (
                      <>
                        <div className={"w-[50%]"}>
                          <div className="formContainer">
                            <div className="grid grid-cols-2 gap-4 w-full">
                              <div>
                                <p className="title-main">Agent Person</p>
                                <TextField
                                  sx={{
                                    "& *": {
                                      fontFamily: "Manrope !important",
                                      fontSize: "14px",
                                    },
                                  }}
                                  variant="standard"
                                  onChange={(e) => {
                                    handleChange(e);
                                  }}
                                  fullWidth={true}
                                  name="agent_name"
                                  value={values.agent_name}
                                  onBlur={handleBlur}
                                />
                                <Box sx={{ color: "red" }}>
                                  <ErrorMessage name="agent_name" />
                                </Box>
                              </div>

                              <div>
                                <p className="title-main">Agency Name</p>
                                <TextField
                                  sx={{
                                    "& *": {
                                      fontFamily: "Manrope !important",
                                      fontSize: "14px",
                                    },
                                  }}
                                  variant="standard"
                                  onChange={(e) => {
                                    handleChange(e);
                                  }}
                                  fullWidth={true}
                                  name="agency_name"
                                  value={values.agency_name}
                                />
                                {/* <Box sx={{ color: "red" }}>
                                <ErrorMessage name="agency_name" />
                              </Box> */}
                              </div>
                            </div>
                          </div>

                          <div className="formContainer">
                            <div className="grid grid-cols-2 gap-4 w-full">
                              <div>
                                <PhoneInput
                                  country={"in"}
                                  value={values.agent_number}
                                  onChange={(phone) =>
                                    setFieldValue("agent_number", phone)
                                  }
                                />
                                <Box sx={{ color: "red" }}>
                                  <ErrorMessage name="agent_number" />
                                </Box>
                              </div>
                              <div>
                                <p className="title-main">Email Address</p>
                                <TextField
                                  sx={{
                                    "& *": {
                                      fontFamily: "Manrope !important",
                                      fontSize: "14px",
                                    },
                                  }}
                                  variant="standard"
                                  onChange={(e) => {
                                    handleChange(e);
                                  }}
                                  fullWidth={true}
                                  name="agent_email"
                                  value={values.agent_email}
                                  onBlur={handleBlur}
                                />
                                <Box sx={{ color: "red" }}>
                                  <ErrorMessage name="agent_name" />
                                </Box>
                              </div>

                            </div>
                          </div>

                          <div className="formContainer">
                            <div className="grid grid-cols-2 gap-4 w-full">
                              <div>
                                <p className="title-main">State</p>
                                <Select
                                  label="Age"
                                  variant={"standard"}
                                  fullWidth={true}
                                  multiple={false}
                                  name="agent_state"
                                  value={values.agent_state}
                                  onChange={(e: any) => {
                                    handleChange(e);
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
                                  {singleState?.map((items: any) => (
                                    <MenuItem key={items.id} value={items.id}>
                                      {items.state}
                                    </MenuItem>
                                  ))}
                                </Select>
                                <Box sx={{ color: "red" }}>
                                  <ErrorMessage name="agent_state" />
                                </Box>
                              </div>
                              <div>
                                <p className="title-main">District</p>
                                <Select
                                  label="Bazaar"
                                  multiple={false}
                                  variant={"standard"}
                                  fullWidth={true}
                                  name="agent_district"
                                  value={values.agent_district}
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
                                  {singleDis?.map((items: any) => {
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
                                  <ErrorMessage name="agent_district" />
                                </Box>
                              </div>
                            </div>
                          </div>

                          <div className="formContainer">
                            <div className="w-[50%]">
                              <p className="title-main">City</p>
                              <Select
                                label="Age"
                                variant={"standard"}
                                fullWidth={true}
                                multiple={false}
                                name="agent_city"
                                value={values.agent_city}
                                onChange={(e: any) => {
                                  handleChange(e);
                                }}
                              >
                                {singleCity?.map((items: any) => {
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
                                <ErrorMessage name="agent_city" />
                              </Box>
                            </div>
                          </div>

                          <div className="formContainer">
                            <div className="grid grid-cols-2 gap-4 w-full">
                              <div>
                                <p className="title-main">Bazaar</p>
                                <Select
                                  label="Bazaar"
                                  // multiple={true}
                                  variant={"standard"}
                                  fullWidth={true}
                                  value={values.agent_bazaar}
                                  name="agent_bazaar"
                                  onChange={(e) => {
                                    // handleChange(e);
                                    setFieldValue('agent_bazaar', [e?.target?.value])
                                  }}
                                >
                                  {AllBazaar.map((items: any) => (
                                    <MenuItem key={items.id} value={items.id}>
                                      {items.bazaar_name}
                                    </MenuItem>
                                  ))}
                                </Select>
                                <Box sx={{ color: "red" }}>
                                  <ErrorMessage name="agent_bazaar" />
                                </Box>
                              </div>
                              <div>
                                <p className="title-main">Assigned States</p>
                                <Select
                                  label="Age"
                                  variant={"standard"}
                                  fullWidth={true}
                                  multiple={true}
                                  name="agent_assigned_state"
                                  value={values.agent_assigned_state}
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
                                  {values?.agent_bazaar?.length > 0 && (AllBazaar?.find((item: any) => item.id === values.agent_bazaar[0])?.bazaar_state_names)?.map((items: any) => (
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
                          </div>

                          <div className="formContainer">
                            <div className="grid grid-cols-2 gap-4 w-full">
                              <div>
                                <p className="title-main">Assigned Districts</p>
                                <Select
                                  label="Bazaar"
                                  multiple={true}
                                  variant={"standard"}
                                  fullWidth={true}
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
                                  {values?.agent_bazaar?.length > 0 && (AllBazaar?.find((item: any) => item.id === values.agent_bazaar[0])?.bazaar_district_names)?.map((items: any) => (
                                    <MenuItem key={items.id} value={items.id}>
                                      {items.district}
                                    </MenuItem>
                                  ))}
                                </Select>
                                <Box sx={{ color: "red" }}>
                                  <ErrorMessage name="agent_assigned_district" />
                                </Box>
                              </div>
                              <div>
                                <p className="title-main">Assigned Cities</p>
                                <Select
                                  label="Age"
                                  variant={"standard"}
                                  fullWidth={true}
                                  multiple={true}
                                  name="agent_assigned_city"
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
                                  {values?.agent_bazaar?.length > 0 && (AllBazaar?.find((item: any) => item.id === values.agent_bazaar[0])?.bazaar_city_names)?.map((items: any) => (
                                    <MenuItem key={items.id} value={items.id}>
                                      {items.city}
                                    </MenuItem>
                                  ))}
                                </Select>
                                <Box sx={{ color: "red" }}>
                                  <ErrorMessage name="agent_assigned_city" />
                                </Box>
                              </div>
                            </div>
                          </div>
                        </div>
                      </>
                    ) : null}

                    {values.agent_type === "SALESMAN" ? (
                      <>
                        <div className={"w-[50%]"}>
                          <div className="formContainer">
                            <div className="grid grid-cols-2 gap-4 w-full">
                              <div>
                                <p className="title-main">Agent Person</p>
                                <TextField
                                  sx={{
                                    "& *": {
                                      fontFamily: "Manrope !important",
                                      fontSize: "14px",
                                    },
                                  }}
                                  variant="standard"
                                  onChange={(e) => {
                                    handleChange(e);
                                  }}
                                  fullWidth={true}
                                  name="agent_name"
                                  value={values.agent_name}
                                />
                                <Box sx={{ color: "red" }}>
                                  <ErrorMessage name="agent_name" />
                                </Box>
                              </div>
                              <div>
                                <PhoneInput
                                  country={"in"}
                                  value={values.agent_number}
                                  onChange={(phone) =>
                                    setFieldValue("agent_number", phone)
                                  }
                                />
                                <Box sx={{ color: "red" }}>
                                  <ErrorMessage name="agent_number" />
                                </Box>
                              </div>
                            </div>
                          </div>

                          <div className="formContainer">
                            <div className="grid grid-cols-2 gap-4 w-full">
                              <div>
                                <p className="title-main">State</p>
                                <Select
                                  label="Age"
                                  variant={"standard"}
                                  fullWidth={true}
                                  multiple={false}
                                  name="agent_state"
                                  value={values.agent_state}
                                  onChange={(e: any) => {
                                    handleChange(e);
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
                                  {singleState?.map((items: any) => (
                                    <MenuItem key={items.id} value={items.id}>
                                      {items.state}
                                    </MenuItem>
                                  ))}
                                </Select>
                                <Box sx={{ color: "red" }}>
                                  <ErrorMessage name="agent_state" />
                                </Box>
                              </div>
                              <div>
                                <p className="title-main">District</p>

                                <Select
                                  label="Bazaar"
                                  multiple={false}
                                  variant={"standard"}
                                  fullWidth={true}
                                  name="agent_district"
                                  value={values.agent_district}
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
                                  {singleDis?.map((items: any) => {
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
                                  <ErrorMessage name="agent_district" />
                                </Box>
                              </div>
                            </div>
                          </div>

                          <div className="formContainer">
                            <div className="w-[50%]">
                              <p className="title-main">City</p>
                              <Select
                                label="Age"
                                variant={"standard"}
                                fullWidth={true}
                                multiple={false}
                                name="agent_city"
                                value={values.agent_city}
                                onChange={(e: any) => {
                                  handleChange(e);
                                }}
                              >
                                {singleCity?.map((items: any) => {
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
                                <ErrorMessage name="agent_city" />
                              </Box>
                            </div>
                          </div>

                          <div className="formContainer">
                            <div className="grid grid-cols-2 gap-4 w-full">
                              <div>
                                <p className="title-main">Bazaar</p>
                                <Select
                                  label="Bazaar"
                                  // multiple={true}
                                  variant={"standard"}
                                  fullWidth={true}
                                  value={values.agent_bazaar}
                                  name="agent_bazaar"
                                  onChange={(e) => {
                                    // handleChange(e);
                                    setFieldValue('agent_bazaar', [e?.target?.value])
                                  }}
                                >
                                  {AllBazaar.map((items: any) => (
                                    <MenuItem key={items.id} value={items.id}>
                                      {items.bazaar_name}
                                    </MenuItem>
                                  ))}
                                </Select>
                                <Box sx={{ color: "red" }}>
                                  <ErrorMessage name="agent_bazaar" />
                                </Box>
                              </div>
                              <div>
                                <p className="title-main">Assigned States</p>
                                <Select
                                  label="Age"
                                  variant={"standard"}
                                  fullWidth={true}
                                  multiple={true}
                                  name="agent_assigned_state"
                                  value={values.agent_assigned_state}
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
                                  {values?.agent_bazaar?.length > 0 && (AllBazaar?.find((item: any) => item.id === values.agent_bazaar[0])?.bazaar_state_names)?.map((items: any) => (
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
                          </div>

                          <div className="formContainer">
                            <div className="grid grid-cols-2 gap-4 w-full">
                              <div>
                                <p className="title-main">Assigned Districts</p>
                                <Select
                                  label="Bazaar"
                                  multiple={true}
                                  variant={"standard"}
                                  fullWidth={true}
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
                                  {values?.agent_bazaar?.length > 0 && (AllBazaar?.find((item: any) => item.id === values.agent_bazaar[0])?.bazaar_district_names)?.map((items: any) => (
                                    <MenuItem key={items.id} value={items.id}>
                                      {items.district}
                                    </MenuItem>
                                  ))}
                                </Select>
                                <Box sx={{ color: "red" }}>
                                  <ErrorMessage name="agent_assigned_district" />
                                </Box>
                              </div>
                              <div>
                                <p className="title-main">Assigned Cities</p>
                                <Select
                                  label="Age"
                                  variant={"standard"}
                                  fullWidth={true}
                                  multiple={true}
                                  name="agent_assigned_city"
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
                                  {values?.agent_bazaar?.length > 0 && (AllBazaar?.find((item: any) => item.id === values.agent_bazaar[0])?.bazaar_city_names)?.map((items: any) => (
                                    <MenuItem key={items.id} value={items.id}>
                                      {items.city}
                                    </MenuItem>
                                  ))}
                                </Select>
                                <Box sx={{ color: "red" }}>
                                  <ErrorMessage name="agent_assigned_city" />
                                </Box>
                              </div>
                            </div>
                          </div>
                        </div>
                      </>
                    ) : null}
                    <div className="flex gap-5 py-7">
                      <ActionButton
                        title="Cancel"
                        type="reset"
                        variant="primary"
                      />
                      {/* <button type="submit"> Save</button> */}
                      <ActionButton
                        type="submit"
                        title="Save"
                        variant="default"
                      />
                    </div>
                  </div>
                </div>
              </DashboardLayout>
            </Form>
          )
        }}
      </Formik>
    </>
  );
};

export default AddAgents;
