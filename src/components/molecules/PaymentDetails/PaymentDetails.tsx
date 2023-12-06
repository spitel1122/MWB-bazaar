import React, { useState, useEffect } from "react";
import { usePaymentdetailsStyle } from "@/static/stylesheets/molecules/paymentdetailsStyle";
import {
  Dialog,
  FormControl,
  FormControlLabel,
  Radio,
  RadioGroup,
  TextField,
  Box
} from "@mui/material";
import { ActionButton } from "@/components/atoms/Button/ActionButton";
import UploaderFrame from "@/static/icons/uploader-frame.png";
import { useNavigate, useParams } from "react-router-dom";
import { AppService } from "@/service/AllApiData.service";
import { Alert, AlertError } from "@/alert/Alert";
import { ErrorMessage, Form, Formik } from "formik";
import * as Yup from "yup";

export default function PaymentDetails() {
  const classes = usePaymentdetailsStyle();
  const navigate = useNavigate()
  const [paymentType, setPaymentType] = React.useState("cash");
  const [addModalOpen, setAddModalOpen] = useState(false);
  const [planId] = useState(localStorage.getItem("planId"));
  const [plandata, setPalndata] = useState<any>({})
  const [data, setdata] = useState<any>({})
  const [showerroremail,setshowerroremail] = useState<any>(false)
  const [emaildata,setEmailData] = useState<any>("")
  const [showerrorphonenumber,setshowerrorphonenumber] = useState<any>(false)
  const [phonenumberdata,setphonenumberData] = useState<any>("")
  const [showerroramount,setshowerroramount] = useState<any>(false)
  const [amountdata,setamountData] = useState<any>("")
  const { id } = useParams()

  useEffect(() => {
    getPlanData();
    getWholesellerData();
  }, [])

  const getPlanData = async () => {
    try {
      const res = await AppService.getPlanById(planId)
      setPalndata(res.data)
    } catch (error: any) {
      console.log('err', error.message)
    }
  }

  const getWholesellerData = async () => {
    try {
      const res = await AppService.getWholesellerById(id)
      setdata(res.data)
    } catch (err) {
      console.log('err', err)
    }
  }

  const SignupSchema = Yup.object().shape({
    payment_choice: Yup.string().required("payment_choice is required"),
    paid_to: Yup.string()
      .min(2, "Too Short!")
      .max(40, "Too Long!")
      .required("Contact person is required"),
    amount: Yup.number().typeError("amount no must be in digit").integer().required("amount is required"),
  });

  let initialValues = {
    payment_choice: paymentType === "online" ? "ONLINEPAYMENT" : "CASH" || "",
    paid_to: "",
    amount: "",
    payment_date: "",
    plan_name: plandata?.id,
    wholesaler_id: id
  };

  async function convertImageTobS4(imgUrl: string) {
    const imageToBase64 = require('image-to-base64/browser.js');
    let response = await imageToBase64(imgUrl);
    return "data:image/png;base64," + response;
  }

  const handleFormSubmit = async (values: any) => {
    console.log("values", values);
    let formdata = { ...initialValues, ...values }
    const payment = Number(values?.payment_choice)
    console.log('fdhfgjgfhi', typeof payment)
    let dataM = {
      ...data,
      wholeseller_plan: plandata?.id,
      wholeseller_plan_name: plandata?.plan_name
    }
    try {
      let responseJson;
      responseJson = await AppService.CreatePayment(formdata);
      const responseJson1 = await AppService.updateWholeseller(id, dataM);
      console.log('responseJson', responseJson)
      if (responseJson.status == 201) {
        Alert("Payment added successfully");
        navigate('/wholesellerlist')
      }
    } catch (error: any) {
      console.log('err', error)
    }
  }

  const inputemailvalue = async(e:any) =>{
    let {value} = e.target
    let regExp = /^[A-Za-z][\w$.]+@[\w]+\.\w+$/;
    if (regExp.test(value)){
      setshowerroremail(false)
      setEmailData(value)
    }
    else{
      console.log(regExp.test(value))
      setshowerroremail(true)
      setEmailData("")
    } 
  }

  const inputphonenumbervalue = async(e:any) =>{
    let {value} = e.target
    if (value.length == "10"){
      setshowerrorphonenumber(false)
      setphonenumberData(value)
    }
    else{
      setshowerrorphonenumber(true)
      setphonenumberData("")
    } 
  }

  const handelamountdatas = (e:any) =>{
    const {value} = e.target
    if(value.includes("-")){
      setshowerroramount(true)
      setamountData("")
    }
    else{
      setshowerroramount(false)
      setamountData(value)
    }
  }


  return (
    <div className={classes.root}>
      <div className="container">
        <div className="textContainer">
          <p className="titleHead">{plandata?.plan_name} ₹{plandata?.amount || 0}</p>
        </div>
        <div className="radio-actionButton">
          <div className="radio-button">
            <FormControl>
              <RadioGroup
                aria-labelledby="radio-buttons"
                name="controlled-radio-buttons"
                value={paymentType}
                onChange={() => setPaymentType("cash")}
              >
                <FormControlLabel
                  value="Cash "
                  control={<Radio />}
                  checked={paymentType === "cash" ? true : false}
                  label="Cash "
                />
              </RadioGroup>
            </FormControl>
          </div>
          <div className="radio-button">
            <FormControl>
              <RadioGroup
                aria-labelledby="radio-buttons"
                name="controlled-radio-buttons"
                value={paymentType}
                onChange={() => setPaymentType("online")}
              >
                <FormControlLabel
                  value="Online"
                  control={<Radio />}
                  checked={paymentType === "online" ? true : false}
                  label="Online Payment"
                />
              </RadioGroup>
            </FormControl>
          </div>
        </div>

        {paymentType === "cash" ? (
          <>
            <Formik
              initialValues={initialValues}
              onSubmit={handleFormSubmit}
              validationSchema={SignupSchema}
              enableReinitialize={true}
              className='dgdfh'
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
                  <div className="inputField">
                    <input
                      type="date"
                      id="first_name"
                      className="bg-gray-50 border h-[48px] border-gray-300 text-sm rounded-lg text-[#2E2C34] block w-[335px] p-[15px] dark:border-[#EBEAED]"
                      placeholder="Date"
                      name="payment_date"
                      value={values.payment_date}
                      onChange={handleChange}
                    />
                    <Box sx={{ color: "red" }}>
                      <ErrorMessage name="payment_date" />
                    </Box>
                    <div>
                    <input
                      type="number"
                      id="first_name"
                      className="bg-gray-50 h-[48px] border border-gray-300 text-sm rounded-lg text-[#2E2C34] block w-[335px] p-[15px] dark:border-[#EBEAED]"
                      placeholder="Amount"
                      name="amount"
                      value={values.amount}
                      onChange={handleChange}
                      onInput={handelamountdatas}
                    />
                    <Box sx={{ color: "red" }}>
                      <ErrorMessage name="amount" />
                    </Box>
                    {
                      showerroramount && <span className="text-[red] text-[13px]">enter a positive amount</span>
                    }
                    </div>
                  </div>
                  <div>
                    <input
                      type="text"
                      id="first_name"
                      className="bg-gray-50 border h-[48px] border-gray-300 text-sm rounded-lg text-[#2E2C34] block w-[335px] p-[15px] dark:border-[#EBEAED]"
                      placeholder="Paid To"
                      name="paid_to"
                      value={values.paid_to}
                      onChange={handleChange}
                    />
                    <Box sx={{ color: "red" }}>
                      <ErrorMessage name="paid_to" />
                    </Box>
                  </div>
                  <div className="actionButton">
                    <ActionButton variant="default" title="cancel" />
                    <ActionButton type="submit" variant="primary" title="save" />
                  </div>
                </Form>)}
            </Formik>
          </>
        ) : (
          <>
            <div className="inputField">
              <div>
              <input
                type="number"
                id="first_name"
                className="bg-gray-50 h-[48px] border border-gray-300 text-sm rounded-lg text-[#2E2C34] block w-[335px] p-[15px] dark:border-[#EBEAED]"
                placeholder="Phone Number"
                onChange={inputphonenumbervalue}
              />
              {
                showerrorphonenumber && <span className="text-[red] text-[13px]">Enter valid phone number</span>
              }
              </div>
              <div>
              <input
                type="email"
                id="first_name"
                className="bg-gray-50 border h-[48px] border-gray-300 text-sm rounded-lg text-[#2E2C34] block w-[335px] p-[15px] dark:border-[#EBEAED]"
                placeholder="Email Address"
                onChange={inputemailvalue}
              />
              {
              showerroremail && <span className="text-[red] text-[13px]">Enter valid email address</span> 
              }
              </div>
            </div>
            <div className="paymentButton">
              <ActionButton
                variant="primary"
                title="Send Payment Link"
              />
              <p>
                <span onClick={() => setAddModalOpen(true)} className="orange"> Click here</span>
                <span> if you have received the payment manually</span>
              </p>
            </div>

            <Dialog
              open={addModalOpen}
              maxWidth={"lg"}
              sx={{
                ".MuiPaper-root": {
                  borderRadius: "20px",
                },
              }}
              onClose={() => setAddModalOpen(false)}
            >
              <div className={classes.addDialog}>
                <p className="title">Add Payment Details</p>
                <div>
                  <div className={"uploader"}>
                    <div className={"icon"}>
                      <img src={UploaderFrame} alt={"Uploader"} />
                    </div>
                    <div className={"content"}>
                      <div className={"title"}>Upload Screenshot</div>
                      <div className={"subtitle"}>
                        Image can be size of 512 PX by 512 PX Only
                      </div>
                    </div>
                  </div>
                </div>
                <div className="mt-5">
                  <TextField label="Date" variant="standard" id="fullWidth" className="w-full" />
                </div>
                <div className="mt-5">
                  <TextField label="Mode of payment" variant="standard" id="fullWidth" className="w-full" />
                </div>
                <div className="mt-5">
                  <TextField label="Transaction ID" variant="standard" id="fullWidth" className="w-full" />
                </div>
                <div className="mt-5">
                  <TextField label="Add comment..." variant="standard" id="fullWidth" className="w-full" />
                </div>

                <div>
                  <div className={"action-bar"}>
                    <ActionButton
                      variant={"default"}
                      title={"Cancel"}
                      onClick={() => setAddModalOpen(false)}
                    />

                    <ActionButton
                      variant={"primary"}
                      title={"Save"}
                      onClick={() => setAddModalOpen(false)}
                    />
                  </div>
                </div>
              </div>
            </Dialog>
          </>
        )}
      </div>
    </div>
  );
}
