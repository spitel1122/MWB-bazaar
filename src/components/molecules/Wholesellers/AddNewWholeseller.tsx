import React, { useState, useEffect } from "react";
import { useNewWholesellerStyles } from "@/static/stylesheets/molecules";
import LogoPrev from "@/static/icons/ic_previous.png";
import {
  FormControl,
  Input,
  InputAdornment,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
  TextField,
  Box,
  Grid,
  Dialog,
  Checkbox,
  ListItemText,
} from "@mui/material";
import { ActionButton } from "@/components/atoms/Button/ActionButton";
import DistrictPicker from "@/components/atoms/LocationPickers/DistrictPicker";
import { useNavigate, useParams } from "react-router-dom";
import { AppService } from "@/service/AllApiData.service";
import CommonSelect from "@/components/atoms/CommonSelect/CommonSelect";
import { CityPickerNew } from "@/components/atoms/LocationPickers/CityPickerNew";
import { ErrorMessage, Form, Formik, useFormik } from "formik";
import * as Yup from "yup";
import { Alert, AlertError } from "@/alert/Alert";
import moment from "moment";
const AddNewWholeseller = () => {
  const navigate = useNavigate();
  const classes = useNewWholesellerStyles();
  const [masterType, setMasterType] = useState("Regional Wholesaler");
  const [stateList, setStateList] = useState<any[]>([]);
  const [stateList1, setStateList1] = useState<any[]>([]);
  const [bazaarList, setBazaarList] = useState<any>([]);
  const [states, setStates] = useState<any>();
  const [districtList, setDistrictList] = useState<any[]>([]);
  const [districts, setDistricts] = useState<any>();
  const [bazaars, setBazaars] = useState<any[]>([]);
  const [cityList, setCityList] = useState<any[]>([]);
  const [citys, setCitys] = useState<any>();
  const [wholesellerType, setWholesellerType] = useState<any[]>([]);
  const [WholesellerAgent, setWholesellerAgent] = useState<any[]>([]);
  const [Wholesellerretailer, setWholesellerretailer] = useState<any[]>([]);
  const [wholesellerModalOpen, setwholesellerModalOpen] = useState(false);
  const [AllBazaar, setAllBazaar] = useState<any>([]);
  const [inputPhone, setinputPhone] = useState<any>("");
  const {id} = useParams<any>()
  const [wholesellerdata, setwholesellerdata] = useState<any>({
    bazaar: "",
    wholeseller_type_name: "",
  });
  const [count, setconut] = useState<any>(1);
  const [initialValues,setinitialValues] = useState({
      wholeseller_description: "",
      wholeseller_name: "",
      wholeseller_type: "",
      wholeseller_retailer_type: "",
      wholeseller_firm_name: "",
      wholeseller_contact_per: "",
      wholeseller_number: "",
      wholeseller_altranate_number:  "",
      wholeseller_email_id:  null,
      wholeseller_adhar_no:  null,
      wholeseller_gst_no:  null,
      wholeseller_firm_pan_no:  null,
      wholeseller_address:  null,
      wholeseller_landmark:  null,
      wholeseller_pincode_no:  null,
      wholeseller_adhar_front_image: "",
      wholeseller_adhar_back_image: "",
      wholeseller_pan_card_image: "",
      wholeseller_image: "",
      wholeseller_status: "CREATED",
      wholeseller_active: true,
      get_wholeseller_location_json_data: null,
      created_at:  moment().format("YYYY-MM-DD"),
      wholeseller_plan:  "",
      wholeseller_payment:  null,
      wholeseller_agent:  null,
      wholeseller_city:  null,
      wholeseller_state:  null,
      wholeseller_district:  null,
      wholeseller_bazaar:  [],
    });
  
    console.log(states,districtList,"inputPhone")
  useEffect(() => {
    getTotalStates();
    getWholesellerType();
    getWholesellerAgent();
    getWholesellerretailer({ ids: initialValues?.wholeseller_city });
    deteliswholseller()
  }, []);

  useEffect(() => {
    if (count) {
      getAllBazaar();
    }
  }, [count]);

  useEffect(() => {
    getDistrictByStates();
  }, [states]);

  useEffect(() => {
    getAllCity();
  }, [districts]);

  const deteliswholseller = async() =>{
    if(id){
      const responseJson = await AppService.getWholesellerById(id)
      setinitialValues(responseJson.data)
      setinputPhone(responseJson.data.wholeseller_number.replace("+91", ""))
    }
  }

  const handleChangeMasterType = (event: SelectChangeEvent) => {
    setMasterType(event.target.value as string);
  };

  const getTotalStates = async () => {
    const responseJson = await AppService.getTotalStates();
    setStateList(responseJson.data);
  };

  const getDistrictByStates = async () => {
    const responseJson = await AppService.getAllDistricByState({
      ids: states.toString(),
    });
    console.log(responseJson.data.results);
    setDistrictList(responseJson.data.results);
  };

  const getAllCity = async () => {
    const responseJson = await AppService.getAllCityByDis({
      ids: districts.toString(),
    });
    console.log("districts", responseJson.data.results);
    setCityList(responseJson.data.results);
  };

  const getWholesellerType = async () => {
    const responseJson = await AppService.getWholesellerType({});
    console.log("responseJson.data.results", responseJson.data.results);
    setWholesellerType(responseJson.data.results);
  };
  const getWholesellerAgent = async () => {
    const responseJson = await AppService.getAllAgentList();
    setWholesellerAgent(responseJson.data.results);
  };
  const getWholesellerretailer = async (param: any) => {
    const responseJson = await AppService.getRetailerType(param);
    setWholesellerretailer(responseJson.data.results);
  };

  const SignupSchema = Yup.object().shape({
    wholeseller_firm_name: Yup.string()
      .min(2, "Too Short!")
      .max(40, "Too Long!")
      .required("Firm name is required"),
    wholeseller_contact_per: Yup.string()
      .min(2, "Too Short!")
      .max(40, "Too Long!")
      .required("Contact person is required"),
    wholeseller_number: Yup.number()
      .typeError("Phone no must be in digit")
      .integer()
      .positive("Phone no must be positive")
      .required("Phone no is required"),
    wholeseller_state: Yup.string().required("State is required"),
    wholeseller_district: Yup.string().required("District is required"),
    wholeseller_city: Yup.string().required("City is required"),
    wholeseller_type: Yup.string().required("Wholeseller type is required"),
  });
  const handleFormSubmit = async (values: any) => {
    let formdata = { ...initialValues, ...values };
    console.log("values", values);
    formdata.wholeseller_number = "+91" + formdata.wholeseller_number;
    formdata.wholeseller_bazaar = [Number(values?.wholeseller_bazaar)]


    try {
      let responseJson;

      if (id) {
        responseJson = await AppService.updateWholeseller(id,formdata);
      } else {
        responseJson = await AppService.addWholeseller(formdata);
      }
      
      if (responseJson.status == 201) {
        Alert("WholeSeller added successfully");
        navigate("/wholesellerlist");
      } else if (responseJson.status == 200) {
        Alert("WholeSeller edit successfully");
        navigate("/wholesellerlist");
      }
    } catch (error: any) {
      let message = error.response.data.type + "\n";
      error.response.data.errors.map((row: any) => {
        message += row.attr + " : " + row.detail + "\n";
      });
      AlertError(message);
    }
  };
  console.log(initialValues,"initialValuesinitialValues")
  
  const getAllBazaar = async () => {
    const responseJson = await AppService.getAllBazaar(count);
    if (responseJson.status == 200) {
      setconut(count + 1);
      setAllBazaar((prev: any) => [...prev, ...responseJson.data.results]);
    }
    let tempBazaar = await responseJson.data.results.map((row: any) => {
      return {
        label: row.bazaar_name,
        value: row.id,
      };
    });
    setBazaarList((prev: any) => [...prev, ...tempBazaar]);
  };

  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setwholesellerdata((prev: any) => ({ ...prev, [name]: value }));
  };

  const AddWholeseller = async () => {
    if (
      wholesellerdata?.bazaar != "" &&
      wholesellerdata?.wholeseller_type_name != ""
    ) {
      const response = await AppService.addWholesellerType(wholesellerdata);
      if (response.status == 201) {
        setwholesellerModalOpen(false);
        Alert(`wholeseller added successfully`);
      }
    } else {
      setwholesellerModalOpen(false);
      AlertError(`please fill in all fields`);
    }
  };

  useEffect(()=>{
    if(bazaars){
      bazaargetdata(bazaars)
    }
  },[bazaars])

  console.log(bazaars,bazaarList,"initialValues?.wholeseller_bazaar")
  
  const bazaargetdata = async(id:any) =>{
    const responseJson = await AppService.getAllBazarProductListdel(id)
    setStateList1(responseJson.data?.bazaar_state_names)
  }

  return (
    <>
      <Formik
        initialValues={initialValues}
        onSubmit={handleFormSubmit}
        validationSchema={SignupSchema}
        enableReinitialize={true}
        className="dgdfh"
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
            <>{console.log("wholeseller_bazaar", errors)}</>
            <div className={classes.root}>
              <div className="headContainer">
                <div className="icon" onClick={() => navigate(-1)}>
                  <img src={LogoPrev} alt={"Logo"} />
                </div>
                <div className="headTitle">{id ? "Edit Wholesaler" :"Add New Wholesaler"}</div>
              </div>

              <div className="field">
                <Grid container spacing={2} style={{ alignItems: "end" }}>
                  <Grid item lg={3.25} md={5} sm={6} className="bazaarplan-div">
                    <div style={{ paddingTop: "30px", paddingRight: "15px" }}>
                      <p className="fieldTitle">Firm Name</p>
                      <TextField
                        variant="standard"
                        id="fullWidth"
                        name="wholeseller_firm_name"
                        value={values.wholeseller_firm_name}
                        onChange={handleChange}
                        className="w-full"
                        style={{ width: "100%" }}
                      />
                      <Box sx={{ color: "red" }}>
                        <ErrorMessage name="wholeseller_firm_name" />
                      </Box>
                    </div>
                  </Grid>
                </Grid>
                <Grid container spacing={2}></Grid>
                <Grid container spacing={2} style={{ alignItems: "center" }}>
                  <Grid item lg={3.25} md={5} sm={6} className="bazaarplan-div">
                    <div style={{ paddingTop: "30px", paddingRight: "15px" }}>
                      <div className="w-full">
                        <p className="fieldTitle">Contact Person</p>
                        <TextField
                          name="wholeseller_contact_per"
                          value={values.wholeseller_contact_per}
                          onChange={handleChange}
                          variant="standard"
                          id="fullWidth"
                          className="w-full"
                          style={{ width: "100%" }}
                        />
                        <Box sx={{ color: "red" }}>
                          <ErrorMessage name="wholeseller_contact_per" />
                        </Box>
                      </div>
                    </div>
                  </Grid>
                  <Grid item lg={3.25} md={5} sm={6} className="bazaarplan-div">
                    <div style={{ paddingTop: "30px", paddingRight: "15px" }}>
                      <FormControl variant="standard" style={{ width: "100%" }}>
                        <p className="fieldTitle">Phone Number</p>
                        <Input
                          id="standard-adornment-amount"
                          startAdornment={
                            <InputAdornment position="start">
                              +91{" "}
                            </InputAdornment>
                          }
                          name="wholeseller_number"
                          type="number"
                          value={inputPhone}
                          onChange={(e:any)=>{handleChange(e); setinputPhone(e.target.value)}}
                        />
                        <Box sx={{ color: "red" }}>
                          <ErrorMessage name="wholeseller_number" />
                        </Box>
                      </FormControl>
                    </div>
                  </Grid>
                </Grid>
                <Grid container spacing={2} style={{ alignItems: "center" }}>
                  <Grid item lg={3.25} md={5} sm={6} className="bazaarplan-div">
                    <div style={{ paddingTop: "30px", paddingRight: "15px" }}>
                      <InputLabel id="Customer-Type">Customer Type</InputLabel>
                      <Select
                        labelId="Customer-Type"
                        label="Customer Type"
                        variant={"standard"}
                        fullWidth={true}
                        value={values.wholeseller_type}
                        onChange={handleChange}
                        name="wholeseller_type"
                      >
                        {wholesellerType.map((row) => (
                          <MenuItem value={row.id}>
                            {row.wholeseller_type_name}
                          </MenuItem>
                        ))}
                      </Select>
                      <Box sx={{ color: "red" }}>
                        <ErrorMessage name="wholeseller_type" />
                      </Box>
                    </div>
                  </Grid>
                  <Grid item lg={3.25} md={5} sm={6} className="bazaarplan-div">
                    <div style={{ paddingTop: "30px", paddingRight: "15px" }}>
                      <a
                        href=""
                        onClick={(e) => (
                          setwholesellerModalOpen(true), e.preventDefault()
                        )}
                        className="text-purple text-[15px] leading-5 font-semibold"
                      >
                        Create New Type
                      </a>
                    </div>
                  </Grid>
                </Grid>
                <Grid container spacing={2} style={{ alignItems: "center" }}>
                  <Grid item lg={3.25} md={5} sm={6} className="bazaarplan-div">
                    <div style={{ paddingTop: "30px", paddingRight: "15px" }}>
                      <InputLabel id="Select-Bazaar">Bazaar</InputLabel>
                      <Select
                        labelId="Select-Bazaar"
                        label="Select Bazaar"
                        variant={"standard"}
                        fullWidth={true}
                        value={values.wholeseller_bazaar}
                        onChange={handleChange}
                        name="wholeseller_bazaar"
                      >
                        {bazaarList.map((row: any) => (
                          <MenuItem onClick={()=>setBazaars(row.value)} value={row.value}>{row.label}</MenuItem>
                        ))}
                      </Select>
                      <Box sx={{ color: "red" }}>
                        <ErrorMessage name="wholeseller_bazaar" />
                      </Box>
                    </div>
                  </Grid>
                  <Grid item lg={3.25} md={5} sm={6} className="bazaarplan-div">
                    <div style={{ paddingTop: "30px", paddingRight: "15px" }}>
                      <InputLabel id="Select-State">State</InputLabel>
                      <Select
                        labelId="Select-State"
                        label="Select State"
                        variant={"standard"}
                        fullWidth={true}
                        defaultValue={values.wholeseller_state}
                        onChange={(e) => {
                          handleChange(e);
                          setStates(e.target.value);
                        }}
                        name="wholeseller_state"
                      >
                        {stateList1?.map((row) => (
                          <MenuItem value={row?.id}>{row?.state}</MenuItem>
                        ))}
                      </Select>
                      <Box sx={{ color: "red" }}>
                        <ErrorMessage name="wholeseller_state" />
                      </Box>
                    </div>
                  </Grid>
                </Grid>
                <Grid container spacing={2} style={{ alignItems: "center" }}>
                  <Grid item lg={3.25} md={5} sm={6} className="bazaarplan-div">
                    <div style={{ paddingTop: "30px", paddingRight: "15px" }}>
                      <InputLabel id="Select-Districts">Districts</InputLabel>
                      <Select
                        labelId="Select-Districts"
                        label="Select Districts"
                        variant={"standard"}
                        fullWidth={true}
                        defaultValue={values.wholeseller_district}
                        onChange={(e) => {
                          handleChange(e);
                          setDistricts(e.target.value);
                        }}
                        name="wholeseller_district"
                      >
                        {districtList.map((row) =>
                          row.district.map((innerrow: any) => (
                            <MenuItem value={innerrow.id}>
                              {innerrow.district}
                            </MenuItem>
                          ))
                        )}
                      </Select>
                      <Box sx={{ color: "red" }}>
                        <ErrorMessage name="wholeseller_district" />
                      </Box>
                    </div>
                  </Grid>
                  <Grid item lg={3.25} md={5} sm={6} className="bazaarplan-div">
                    <div style={{ paddingTop: "30px", paddingRight: "15px" }}>
                      <InputLabel id="Select-Districts">City</InputLabel>
                      <Select
                        labelId="Select-City"
                        label="Select City"
                        variant={"standard"}
                        fullWidth={true}
                        defaultValue={values.wholeseller_city}
                        onChange={(e) => {
                          handleChange(e);
                          setCitys(e.target.value);
                        }}
                        name="wholeseller_city"
                      >
                        {cityList.map((row) =>
                          row.city.map((innerrow: any) => (
                            <MenuItem value={innerrow.id}>
                              {innerrow.city}
                            </MenuItem>
                          ))
                        )}
                      </Select>
                      <Box sx={{ color: "red" }}>
                        <ErrorMessage name="wholeseller_city" />
                      </Box>
                    </div>
                  </Grid>
                </Grid>
              </div>
              <div className="actionButton pl-[30px] !pt-[45px]">
                <ActionButton variant="default" title="cancel" />
                <ActionButton type="submit" variant="primary" title="save" />
              </div>
            </div>
          </Form>
        )}
      </Formik>
      <Dialog
        open={wholesellerModalOpen}
        maxWidth={"lg"}
        sx={{
          ".MuiPaper-root": {
            borderRadius: "20px",
          },
        }}
        onClose={() => setwholesellerModalOpen(false)}
      >
        <div className="p-[44px] w-[461px]">
          <div
            className={
              "title font-[600] text-[24px] leading-[20px] text-[#2e2c34] mb-[27px]"
            }
          >
            Add Wholesaler Type
          </div>

          <div className={"select-master pt-[26px]"}>
            <div
              className={
                "input-label font-[500] text-[12px] leading-[18px] text-[#84818a]"
              }
            >
              Wholesaler Type
            </div>
            <TextField
              variant="standard"
              fullWidth={true}
              name={"wholeseller_type_name"}
              onChange={handleChange}
            />
            <div className="select-master pt-[26px]">
              <p className="input-label font-[500] text-[12px] leading-[18px] text-[#84818a]">
                Bazaar
              </p>
              <Select
                label="Age"
                variant={"standard"}
                fullWidth={true}
                onChange={handleChange}
                name="bazaar"
              >
                {AllBazaar?.map((items: any) => (
                  <MenuItem key={items.id} value={items.id}>
                    <ListItemText primary={items.bazaar_name} />
                  </MenuItem>
                ))}
              </Select>
            </div>
          </div>

          <div className={"action-bar flex gap-[12px] mt-[41px]"}>
            <ActionButton
              variant={"default"}
              title={"Cancel"}
              onClick={() => setwholesellerModalOpen(false)}
            />

            <ActionButton
              variant={"primary"}
              title={"Add"}
              onClick={AddWholeseller}
            />
          </div>
        </div>
      </Dialog>
    </>
  );
};

export { AddNewWholeseller };
