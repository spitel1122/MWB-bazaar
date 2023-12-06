import React, { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { useBazaarStepperdStyles } from "@/static/stylesheets/molecules";
import LogoPrev from "@/static/icons/ic_previous.png";
import { DashboardLayout } from "@/components/layouts";
import { SectionHeader } from "@/components/molecules/Bazaars";
import PaymentDetails from "@/components/molecules/PaymentDetails/PaymentDetails";
import PlanTab from "@/components/molecules/PlanTab/PlanTab";
import CheckIcon from "@/static/icons/ic_check.png";
import checkIconm from "@/static/images/Vector (11).png"
import { WholsellerKycForm } from "@/components/molecules/WholsellerKycForm";
import { useNavigate, useParams } from "react-router-dom";
import { AppService } from "@/service/AllApiData.service";
import * as Yup from "yup";
import { Alert, AlertError } from "@/alert/Alert";
import { ErrorMessage, Form, Formik, useFormik } from "formik";
import { WholesellerList } from "@/components/molecules/WholesellerList";
import WholesellerDet from "../WholesellerList/ComplateKYC/ WholesellerDet";
// const steps = ["Wholeseller Details", "Choose Plan", "Payment Details"];
const steps = ["Wholeseller Details", "Choose Plan", "Payment Details", "Success"];
export default function WholesellerKYC() {
  const params = useParams();
  const navigate = useNavigate();
  const [activeStep, setActiveStep] = React.useState(0);
  const [skipped, setSkipped] = React.useState(new Set<number>());
  const [initialValues, setInitialValues] = React.useState<any>({});
  const [initialValues2, setInitialValues2] = React.useState<any>({});

  useEffect(() => { getWholeSellerByID() }, [params.wSellerID])
  const getWholeSellerByID = async () => {
    const responseJson = await AppService.getWholesellerById(params.wSellerID);
    console.log("responseJson111", responseJson);
    console.log("responseJson111", responseJson.data);
    setInitialValues(responseJson.data);
    setInitialValues2(responseJson.data);
    console.log("responseJson111 - 1", responseJson);
  };
  useEffect(() => {
    console.log('initialValues', initialValues);
    console.log('initialValues2', initialValues2);
    
  }, [initialValues])

  const isStepSkipped = (step: number) => {
    return skipped.has(step);
  };
  const handleNext = async(stuts?:any) => {

    console.log(initialValues.wholeseller_status,"initialValues.wholeseller_status")
    if (formRef.current) {
      formRef.current.scrollIntoView({ block: "nearest", behavior: "smooth" });
      formRef.current.requestSubmit();
    }
    if (activeStep > 0) {
      let newSkipped = skipped;
      if (isStepSkipped(activeStep)) {
        newSkipped = new Set(newSkipped.values());
        newSkipped.delete(activeStep);
      }
      setActiveStep((prevActiveStep) => prevActiveStep + 1);
      setSkipped(newSkipped);
    }
        if(stuts == "Reject"){
          const data:any = initialValues
          if (data.wholeseller_pan_card_image?.includes("https")) {
            data.wholeseller_pan_card_image = await convertImageTobS4(data?.wholeseller_pan_card_image);
          }
          if (data.wholeseller_adhar_front_image?.includes("https")) {
            data.wholeseller_adhar_front_image = await convertImageTobS4(data?.wholeseller_adhar_front_image);
          }
          if (data.wholeseller_adhar_back_image?.includes("https")) {
            data.wholeseller_adhar_back_image = await convertImageTobS4(data?.wholeseller_adhar_back_image);
          }
          if (data.wholeseller_image?.includes("https")) {
            data.wholeseller_image = await convertImageTobS4(data?.wholeseller_image);
          }
          data.wholeseller_status = "KYCREJECTED"
          const responseJson = await AppService.updateWholeseller(data.id, data)
          if(responseJson.status == 200 || responseJson.status == 201){
            Alert("Kyc Rejected successfully")
            navigate('/wholesellerlist')
          }  
        }
        if(stuts == "PENDING"){
          const data:any = initialValues
          if (data.wholeseller_pan_card_image?.includes("https")) {
            data.wholeseller_pan_card_image = await convertImageTobS4(data?.wholeseller_pan_card_image);
          }
          if (data.wholeseller_adhar_front_image?.includes("https")) {
            data.wholeseller_adhar_front_image = await convertImageTobS4(data?.wholeseller_adhar_front_image);
          }
          if (data.wholeseller_adhar_back_image?.includes("https")) {
            data.wholeseller_adhar_back_image = await convertImageTobS4(data?.wholeseller_adhar_back_image);
          }
          if (data.wholeseller_image?.includes("https")) {
            data.wholeseller_image = await convertImageTobS4(data?.wholeseller_image);
          }
          data.wholeseller_status = "KYCAPPROVED"
          const responseJson = await AppService.updateWholeseller(data.id, data);
          if(responseJson.status == 200 || responseJson.status == 201){
            Alert("Kyc Approved successfully")
            navigate('/wholesellerlist')
          }
        }
        if(activeStep === steps.length - 1){
          if(initialValues.wholeseller_status == "CREATED" || initialValues.wholeseller_status == "KYCREJECTED"){
            const data:any = initialValues
            if (data.wholeseller_pan_card_image?.includes("https")) {
              data.wholeseller_pan_card_image = await convertImageTobS4(data?.wholeseller_pan_card_image);
            }
            if (data.wholeseller_adhar_front_image?.includes("https")) {
              data.wholeseller_adhar_front_image = await convertImageTobS4(data?.wholeseller_adhar_front_image);
            }
            if (data.wholeseller_adhar_back_image?.includes("https")) {
              data.wholeseller_adhar_back_image = await convertImageTobS4(data?.wholeseller_adhar_back_image);
            }
            if (data.wholeseller_image?.includes("https")) {
              data.wholeseller_image = await convertImageTobS4(data?.wholeseller_image);
            }
            data.wholeseller_status = "PENDING"
            const responseJson = await AppService.updateWholeseller(data.id, data);
            if(responseJson.status == 200 || responseJson.status == 201){
              Alert("Kyc Process successfully")
              navigate('/wholesellerlist')
            }
          }
        }
    }
  const handleBack = () => {
    if(initialValues.wholeseller_status == "KYCAPPROVED"){
      navigate('/wholesellerlist')
    }
    else{
      setActiveStep((prevActiveStep) => prevActiveStep - 1);
    }
  };
  const handleReset = () => {
    setActiveStep(0);
  };
  async function convertImageTobS4(imgUrl: string) {
    const imageToBase64 = require('image-to-base64/browser.js');
    let response = await imageToBase64(imgUrl);
    return "data:image/png;base64," + response;
  }

  console.log("params",params)
  const classes = useBazaarStepperdStyles();
  const formRef = React.useRef<HTMLFormElement>(null);
  const handleFormSubmit = async (values: any) => {
    let formdata = { ...values }
    formdata.wholeseller_number = String(formdata.wholeseller_number).includes("+91") ? formdata.wholeseller_number : "+91" + formdata.wholeseller_number;
    formdata.wholeseller_altranate_number = String(formdata.wholeseller_altranate_number).includes("+91") ? formdata.wholeseller_altranate_number : "+91" + formdata.wholeseller_altranate_number;
    formdata.get_wholeseller_location_json_data = formdata.get_wholeseller_location_json_data ? formdata.get_wholeseller_location_json_data : "test locations";
    // formdata.wholeseller_status = formdata?.wholeseller_status  == "CREATED" ? 'PENDING' : formdata?.wholeseller_status ;
    if (formdata.wholeseller_pan_card_image?.includes("https")) {
      formdata.wholeseller_pan_card_image = await convertImageTobS4(formdata?.wholeseller_pan_card_image);
    }
    if (formdata.wholeseller_adhar_front_image?.includes("https")) {
      formdata.wholeseller_adhar_front_image = await convertImageTobS4(formdata?.wholeseller_adhar_front_image);
    }
    if (formdata.wholeseller_adhar_back_image?.includes("https")) {
      formdata.wholeseller_adhar_back_image = await convertImageTobS4(formdata?.wholeseller_adhar_back_image);
    }
    if (formdata.wholeseller_image?.includes("https")) {
      formdata.wholeseller_image = await convertImageTobS4(formdata?.wholeseller_image);
    }
    try {
      let responseJson;
      if (params.wSellerID) {
        responseJson = await AppService.kycApproveWholeseller(params.wSellerID, formdata);
      } else {
        responseJson = await AppService.addWholeseller(formdata);
      }
      if (responseJson.status == 201 || responseJson.status == 200) {
        Alert("WholeSeller added successfully");
        let newSkipped = skipped;
        if (isStepSkipped(activeStep)) {
          newSkipped = new Set(newSkipped.values());
          newSkipped.delete(activeStep);
        }
        setActiveStep((prevActiveStep) => prevActiveStep + 1);
        setSkipped(newSkipped);
      }
    } catch (error: any) {
      let message = error.response.data.type + "\n"
      error.response.data.errors.map((row: any) => {
        message += row.attr + " : " + row.detail + "\n"
      })
      AlertError(message);
    }
  }
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
    wholeseller_bazaar: Yup.array().required("Bazaar is required"),
    wholeseller_type: Yup.string().required("Wholeseller type is required"),
  });
  console.log('steps', steps)
  return (
    <DashboardLayout>
      <SectionHeader />
      <>{console.log('initialValues', initialValues)}</>
      <div className={classes.root}>
        <div className="headContainer">
          <div className="icon">
            <img src={LogoPrev} alt={"Logo"} onClick={() => navigate(-1)} />
          </div>
          <div className="headTitle">{initialValues.wholeseller_status == "KYCAPPROVED" ? "Details Wholesaler" :"Wholesaler KYC"}</div>
        </div>
        
        <div className={classes.stepperContainer}>
          <Box sx={{ width: "100%" }}>
            {/* <Stepper sx={{ width: "600px" }} activeStep={activeStep}>
              {steps.map((label, index) => {
                const stepProps: { completed?: boolean } = {};
                const labelProps: {
                  optional?: React.ReactNode;
                } = {};
                if (isStepSkipped(index)) {
                  stepProps.completed = false;
                }
                return (
                  <Step key={label} {...stepProps}>
                    <StepLabel {...labelProps}>{label}</StepLabel>
                  </Step>
                );
              })}
            </Stepper> */}
            <div className="w-[100%]">
              <ol className="flex items-center w-full">
                {initialValues.wholeseller_status != "KYCAPPROVED" && initialValues.wholeseller_status != "PENDING" && steps.map((label, index) => {
                  return (
                    <>
                      <li className="flex items-center gap-2">
                        <span className={activeStep === index ? "w-[28px] h-[28px] rounded-[24px] text-[#5542F6] text-center leading-[28px] text-[14px] font-[Manrope] font-[600]" : "w-[28px] h-[28px] rounded-[24px] text-[#2E2C34] text-center leading-[28px] text-[14px] font-[Manrope] font-[600]"} style={{
                          backgroundColor: activeStep === index ? 'rgba(85, 66, 246, 0.1)' : 'rgba(182, 180, 186, 0.1)'
                        }}>{index + 1}</span>
                        <span className={activeStep === index ? "text-[16px] font-[Manrope] whitespace-nowrap font-[600] text-[#5542F6]" : "text-[16px] whitespace-nowrap font-[Manrope] font-[600] text-[#2E2C34]"}>{label}</span>
                      </li>
                      {index !== steps.length - 1 && <li style={{ width: '51px', height: '1px', background: '#EBEAED',margin:"0 10px" }}></li>}
                    </>
                  )
                })}
              </ol>
            </div>
            {activeStep === steps.length ? (
              <React.Fragment>
                <Typography sx={{ mt: 2, mb: 1 }}>
                  {/* <div className="headTitle">
                    <div className="finishContainer">
                      <p>Plan name ₹1224</p>
                      <div className="sucessMesage">
                        <img src={CheckIcon} alt={"Uploader"} />
                        <p className="sucessTitle">
                          Payment of Rs 1224 has been received successfully
                        </p>
                      </div>
                    </div>
                  </div> */}
                </Typography>
                <Box sx={{ pt: 2 }}>
                  {/* <Box sx={{ flex: "1 1 auto" }} />
                  <Button className="nextButton" onClick={handleReset}>
                    Reset
                  </Button> */}
                </Box>
              </React.Fragment>
            ) : (
              <React.Fragment>
                {(initialValues.wholeseller_status == "CREATED" || initialValues.wholeseller_status == "KYCREJECTED")? activeStep === 0 && <Formik
                  initialValues={initialValues}
                  onSubmit={handleFormSubmit}
                  validationSchema={SignupSchema}
                  enableReinitialize={true}
                >
                  {/* {console.log('initialValuesinitialValues', initialValues)} */}
                  {({
                    values,
                    handleChange,
                    handleBlur,
                    setFieldValue,
                    touched,
                    errors,
                  }) => (
                    <Form id="form1" ref={formRef}> <WholsellerKycForm ErrorMessage={ErrorMessage} formValues={values} handleChange={handleChange} setFieldValue={setFieldValue} errors={errors} /></Form>
                  )}
                </Formik> : activeStep === 0 && <WholesellerDet initialValues={initialValues} />}
                {activeStep === 1 && <PlanTab initialValues={initialValues}/>}
                {activeStep === 2 && <PaymentDetails />}
                {activeStep === 3 && <div style={{ padding: "80px 0px", display: "flex", alignItems: "center" }}><img src={checkIconm} alt="icon" style={{ marginRight: "15px" }} />Payment of Rs 1224 has been received successfully</div>}
                <div className="actionButton">
                  <div>
                    <Button
                      className="BackButton"
                      color="inherit"
                      onClick={handleBack}
                    >
                      Back
                    </Button>
                  </div>
                  <div>
                    {
                      initialValues.wholeseller_status != "KYCAPPROVED" && <Button className="nextButton" onClick={()=>handleNext(initialValues.wholeseller_status == "PENDING" && initialValues.wholeseller_status)}>
                      {activeStep === steps.length - 1 ? "Finish" : initialValues.wholeseller_status == "PENDING" ? "Approve" : "Next"}
                    </Button>
                    }
                    {
                      initialValues.wholeseller_status == "PENDING" &&  <Button className="nextButton !ml-[15px]" onClick={()=>handleNext(initialValues.wholeseller_status == "PENDING" && "Reject")}>Reject</Button>
                    }
                  </div>
                </div>
              </React.Fragment>
            )}
          </Box>
        </div>
      </div>
      
    </DashboardLayout>
  );
}