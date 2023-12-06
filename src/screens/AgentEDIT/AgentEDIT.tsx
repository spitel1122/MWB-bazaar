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
import { useParams } from "react-router-dom";

const AgentEDIT = () => {
  const classes = useaddAgentStyle();
  const [paymentType, setPaymentType] = React.useState("individual");
  const [, setMasterType] = useState("Regional Wholeseller");
  const [AllState, setAllState] = React.useState([]);
  const [allDis, setAllDis] = React.useState([]);
  const [allCity, setAllCity] = React.useState([]);
  const [singleState, setSingleState] = React.useState([]);
  const [singleDis, setSingleDis] = React.useState([]);
  const [singleCity, setSingleCity] = React.useState([]);
  const [AllBazaar, setAllBazaar] = React.useState([]);
  const [editData, setEditData] = React.useState<any>();
  const [ChangeType, setChangeType] = React.useState("INDIVIDUAL");

  console.log("datttttttttttttttta",editData)
  console.log("datttttttChangeTypettttttttta",ChangeType)

  const params = useParams();
  const { id } = params;

  const handleChangeMasterType = (event: SelectChangeEvent) => {
    setMasterType(event.target.value as string);
  };

  const initialValues = {
    // agent_description: "",
    agent_name: editData?.agent_name || "",
    agent_type: editData?.agent_type || "INDIVIDUAL",
    agent_number: editData?.agent_number || "",
    agency_name: "",
    // agent_altranate_mobile_number: "",
    // agent_email: "",
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
    // agent_active: false,
    // agency: 2,
    agent_state: editData?.agent_state|| "",
    agent_city: editData?.agent_city||"",
    agent_district: editData?.agent_district|| "",
    // agent_commision: 0,
    agent_bazaar: editData?.agent_bazaar|| "",
    agent_assigned_state: editData?.agent_assigned_state || [],
    agent_assigned_city: editData?.agent_assigned_city || [],
    agent_assigned_district: editData?.agent_assigned_district || [],
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
    agent_bazaar: Yup.array().min(1, "Pick at least 1 Bazaar"),
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
    // if (values.agent_type == "INDIVIDUAL") {
    //   delete values.agency_name;
    // } else if (values.agent_type == "SALESMAN") {
    //   delete values.agency_name;
    // }
    // console.log("Valuessss---|||||||", values);
    // values.agent_number = "+" + values.agent_number;
    // try {
    //   const response = await AppService.addAgent(values);
    //   if (response) {
    //     // alert("Successfully added!!!");
    //     Alert("Successfully added!!!");
    //   }
    // } catch (error: any) {
    //   console.log("error", error);
    //   var firstKey = Object.keys(error?.response?.data)[0];
    //   // var cptyName = quotes[firstKey].cptyName;
    //   AlertError(error?.response?.data[firstKey]);
    // }
  };

  const getAllLists = async () => {
    const responseJson = await AppService.getAllStates();
    // console.log(responseJson.data.bazaar);
    setAllState(responseJson.data.results);
    setSingleState(responseJson.data.results);
  };

//   const getAllDis = async (param: any, type: any) => {
//     console.log("ppppppppparrararams", param);

//     const responseJson = await AppService.getAllDistricByState(param);
//     console.log("all Districtss and single-----");
//     // console.log(responseJson.data.bazaar);
//     if (type == "multiple") {
//       console.log("all Districtss and single-----ALLL");
//       setAllDis(responseJson.data.results);
//     } else {
//       console.log("all Districtss and single-----SINGLL");
//       setSingleDis(responseJson.data.results);
//     }
//   };

//   const getAllCity = async (param: any, type: any) => {
//     const responseJson = await AppService.getAllCityByDis(param);
//     if (type == "multiple") {
//       setAllCity(responseJson.data.results);
//     } else {
//       setSingleCity(responseJson.data.results);
//     }
//   };
  const getAllDis = async (param: any, type: any) => {
    console.log("ppppppppparrararams", param);

    const responseJson = await AppService.getAllDistricByState(param);
    console.log("all Districtss and single-----");
    // console.log(responseJson.data.bazaar);
    console.log("all Districtss and single-----ALLL");
    setAllDis(responseJson.data.results);
    setSingleDis(responseJson.data.results)
  };

  const getAllCity = async (param: any, type: any) => {
    const responseJson = await AppService.getAllCityByDis(param);
    setAllCity(responseJson.data.results);
    setSingleCity(responseJson.data.results);
  };

  const getAllBazaar = async () => {
    const responseJson = await AppService.getAllBazaar();
    setAllBazaar(responseJson.data.results);
  };

  const getOneAgent = async (id: any) => {
    try {
      const response = await AppService.getAgentById(id);
      console.log("Resss=====in agent edit", response.data);
      setEditData(response.data);
      setChangeType(response?.data?.agent_type);
    } catch (error) {
      console.log("errrrrrr in kyc", error);
    }
  };
  
  useEffect(() => {
    getAllDis({ ids: editData?.agent_state }, "");
  }, [editData?.agent_state]);
  useEffect(() => {
    getAllCity({ ids: editData?.agent_district }, "");
  }, [editData?.agent_district]);

  useEffect(() => {
    getAllLists();
    getAllBazaar();
    getOneAgent(id);
  }, []);

  // console.log("Values of agent form------raw", values);
  console.log("all Bazaar of agent form------raw", AllBazaar);
  console.log("all Districtss of agent form------raw", allDis);
  console.log("Singleee Districtss of agent form------raw", singleDis);
  console.log("all Citiessss of agent form------raw", allCity);
  console.log("Sinnnngleee Citiessss of agent form------raw", singleCity);

  return (
    <>
      <Formik
        initialValues={initialValues}
        onSubmit={handleFormSubmit}
        validationSchema={validationSchema}
        enableReinitialize={true}
      >
        {({
          values,
          handleChange,
          handleBlur,
          setFieldValue,
          touched,
          errors,
        }) => (
          <Form>
            <DashboardLayout>
              <div className={classes.root}>
                <div className="container">
                  <div className="textContainer">
                    <p className="titleHead">Edit Agent</p>
                  </div>
                  <div className="radio-actionButton">
                    <div className="radio-button">
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
                            control={<Radio />}
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

                    <div className="radio-button">
                      <FormControl>
                        <RadioGroup
                          aria-labelledby="radio-buttons"
                          name="agent_type"
                          value={values.agent_type}
                          onChange={() => setFieldValue("agent_type", "AGENCY")}
                        >
                          <FormControlLabel
                            value="Online"
                            control={<Radio />}
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
                    <div className="radio-button">
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
                            control={<Radio />}
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
                        </div>

                        <div className="formContainer">
                          <div className="grid grid-cols-2 gap-4 w-full">
                            <div>
                              <p className="title-main">Bazaar</p>
                              <Select
                                label="Bazaar"
                                multiple={true}
                                variant={"standard"}
                                fullWidth={true}
                                value={values.agent_bazaar}
                                onBlur={handleBlur}
                                name="agent_bazaar"
                                onChange={(e) => {
                                  handleChange(e);
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
                                multiple={true}
                                variant={"standard"}
                                fullWidth={true}
                                value={values.agent_bazaar}
                                name="agent_bazaar"
                                onChange={(e) => {
                                  handleChange(e);
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
                                multiple={true}
                                variant={"standard"}
                                fullWidth={true}
                                value={values.agent_bazaar}
                                name="agent_bazaar"
                                onChange={(e) => {
                                  handleChange(e);
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
        )}
      </Formik>
    </>
  );
};

export default AgentEDIT;
