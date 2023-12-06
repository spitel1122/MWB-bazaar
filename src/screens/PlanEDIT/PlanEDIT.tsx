import React, { useState } from "react";
import { DashboardLayout } from "@/components/layouts";
import { useaddAgentStyle } from "@/static/stylesheets/molecules/addagent";
import {
  FormControl,
  FormControlLabel,
  Radio,
  RadioGroup,
} from "@mui/material";
import LogoPrev from "@/static/icons/ic_previous.png";
import IcView from "@/static/svg/ic_view.svg";
import { FreePlan } from "@/components/molecules/FreePlan";
import { useNavigate, useParams } from "react-router-dom";
import { useFormik } from "formik";
import { Alert, AlertError } from "@/alert/Alert";
import * as Yup from "yup";
import { AppService } from "@/service/AllApiData.service";

const PlanEDIT = () => {
  const classes = useaddAgentStyle();
  const navigate = useNavigate();
  const { id } = useParams();
  const [AllBazaar, setAllBazaar] = React.useState([]);
  const [feature, setFeature] = React.useState([]);
  const [tally, settally] = React.useState(false)
  const [previewData, setPreviewData] = React.useState({
    featureData: [],
    state: [],
    plantype: 'FREE',
    branches:0,
  })
  const [localStoragedata,setlocalStorageData] = useState<any>(JSON.parse(localStorage.getItem("setplandata") || "{}") || "")

  //   const [getById, setGetById] = useState<any>();
  //   console.log("getByIdgetById", getById);
  React.useEffect(() => {
    getAllBazaar();
  }, []);

  const getPlanById = async () => {
    const responseJson = await AppService.getPlanById(id);
    console.log(responseJson.data,"responseJson.data11");
    const data:any = responseJson.data
    data.bazaar = data.bazaar[0]
    await setValues(data);
    // setGetById(responseJson.data);
  };

  React.useEffect(() => {
    if (id) {
      getPlanById();
    }
  }, [id]);
  const getAllBazaar = async () => {
    const responseJson = await AppService.getAllBazaar();
    setAllBazaar(responseJson.data.results);
  };
  const initialValues = {
    plan_choice: localStoragedata?.plan_choice || "FREE",
    plan_name: localStoragedata?.plan_name || "",
    start_date: localStoragedata?.start_date || "",
    start_time: localStoragedata?.start_time || "",
    end_date: localStoragedata?.end_date || "",
    end_time: localStoragedata?.end_time || "",
    plan_tally: localStoragedata?.plan_tally || false,
    amount: localStoragedata?.amount || 0,
    branches: localStoragedata?.branches || 0,
    user_per_branch: localStoragedata?.user_per_branch || 0,
    bazaar: localStoragedata?.bazaar || [],
    state: localStoragedata?.state || [],
    city: localStoragedata?.city || [],
    district: localStoragedata?.district || [],
    plan_features: localStoragedata?.plan_features || [],
  };

  const validationSchema = Yup.object().shape({
    plan_name: Yup.string()
      .min(2, "Too Short!")
      .max(40, "Too Long!")
      .required("agent name is required*"),
  });

  const onSubmit = async (values: any) => {
    try {
      values.plan_features = feature;
      values.plan_tally = tally;
      let payload = Object.assign({}, values);
      payload.bazaar = [payload.bazaar]
      if (id) {
        await AppService.updatePlan(id, payload);
        await Alert("Plan Updated Successfully");
        await setValues({
          plan_choice: "FREE",
          plan_name: "",
          start_date: "",
          start_time: "",
          end_date: "",
          end_time: "",
          plan_tally: false,
          amount: 0,
          branches: 0,
          user_per_branch: 0,
          bazaar: [],
          state: [],
          city: [],
          district: [],
          plan_features: [],
        });
      } else {
        await AppService.addNewPlan(payload);
        await Alert("Plan Added Successfully");
        await setValues({
          plan_choice: "FREE",
          plan_name: "",
          start_date: "",
          start_time: "",
          end_date: "",
          end_time: "",
          amount: 0,
          branches: 0,
          plan_tally: false,
          user_per_branch: 0,
          bazaar: [],
          state: [],
          city: [],
          district: [],
          plan_features: [],
        });
      } navigate("/plans");
    } catch (error: any) {

      let message = error.response.data.type + "\n"
      error.response.data.errors.map((row: any) => {
        message += row.attr + " : " + row.detail + "\n"
      })
      AlertError(message);
    }
  };

  const {
    handleChange,
    handleSubmit,
    values,
    errors,
    setValues,
    setFieldValue,
  } = useFormik({
    initialValues,
    validationSchema,
    onSubmit,
  });

  console.log('values', values)
  return (
    <>
      <DashboardLayout>
        <div className={classes.root}>
          <div className="container">
            <div className="flex gap-5 items-center justify-between">
              <div className="flex gap-5 items-center">
                <div onClick={() => navigate('/plans')}>
                  <img
                    className="w-[10px] cursor-pointer"
                    src={LogoPrev}
                    alt={"Logo"}
                  />
                </div>
                <div className="headTitle">Edit Plan</div>
              </div>
            </div>

            <div className="radio-actionButton pt-[25px]">
              <div>
                <FormControl>
                  <RadioGroup
                    aria-labelledby="radio-buttons"
                    name="controlled-radio-buttons"
                    value={values.plan_choice}
                    onChange={() => setFieldValue("plan_choice", "FREE")}
                  >
                    <FormControlLabel
                      value="FREE "
                      control={<Radio />}
                      checked={values.plan_choice === "FREE"}
                      label={
                        <div className="flex gap-4 items-center planTitle">
                          Free
                        </div>
                      }
                    />
                  </RadioGroup>
                </FormControl>
              </div>

              <div>
                <FormControl>
                  <RadioGroup
                    aria-labelledby="radio-buttons"
                    name="controlled-radio-buttons"
                    value={values.plan_choice}
                    onChange={() => setFieldValue("plan_choice", "PAID")}
                  >
                    <FormControlLabel
                      value="PAID"
                      control={<Radio />}
                      checked={values.plan_choice === "PAID"}
                      label={
                        <div className="flex gap-4 items-center planTitle">
                          Paid
                        </div>
                      }
                    />
                  </RadioGroup>
                </FormControl>
              </div>
            </div>

            <div>
              <FreePlan
                values={values}
                handleChange={handleChange}
                setFieldValue={setFieldValue}
                errors={errors}
                id={id ? id : ""}
                AllBazaar={AllBazaar}
                handleSubmit={handleSubmit}
                feature={feature}
                setFeature={setFeature}
                settally={settally}
                tally={tally}
                setPreviewData={setPreviewData}
                previewData={previewData}
              />
            </div>
          </div>
        </div>
      </DashboardLayout>
    </>
  );
};

export default PlanEDIT;
