import React, { useState } from "react";
import { DashboardLayout } from "@/components/layouts";
import { useMasterListStyles } from "@/static/stylesheets/screens";
import { AgentCommissionRedeemModelForm as RedeemModelForm } from "@/components/molecules/AgentCommissionRedeemModelForm";
import { FormControl, FormControlLabel, Radio, RadioGroup } from "@mui/material";
import { AppService } from "@/service/AllApiData.service";
import { Alert, AlertError } from "@/alert/Alert";
import * as Yup from "yup";
import { useNavigate, useParams } from "react-router-dom";
import { useFormik } from "formik";

const AgentCommissionRedeemModelForm = () => {
  const classes = useMasterListStyles();
  const navigate = useNavigate();
  const { id } = useParams();
  const [feature, setFeature] = React.useState([]);

  const getPlanById = async () => {
    const responseJson = await AppService.getPlanById(id);
    console.log(responseJson);
    await setValues(responseJson.data);
  };

  React.useEffect(() => {
    if (id) {
      getPlanById();
    }
  }, [id]);
  const initialValues = {
    plan: "FREEPLAN",
    minimum_no_of_invoice_genrated: "",
    amount_reimbursed_on_particular_days_percent: "",
    no_of_days_between_redemption: "",
  };

  const validationSchema = Yup.object().shape({
    plan: Yup.string()
      .min(2, "Too Short!")
      .max(40, "Too Long!")
      .required("agent name is required*"),
  });

  const onSubmit = async (values: any) => {
    try {
      values.plan_features = feature;
      let payload = Object.assign({}, values);
      if (id) {
        await AppService.AgentCommissionRedeemUpdate(id, payload);
        await Alert("CommissionRedeem Updated Successfully");
        await setValues({
          plan: "FREEPLAN",
          minimum_no_of_invoice_genrated: "",
          amount_reimbursed_on_particular_days_percent: "",
          no_of_days_between_redemption: "",
        });
      } else {
        await AppService.AgentCommissionRedeemCreate(payload);
        await Alert("CommissionRedeem Added Successfully");
        await setValues({
          plan: "FREEPLAN",
          minimum_no_of_invoice_genrated: "",
          amount_reimbursed_on_particular_days_percent: "",
          no_of_days_between_redemption: "",
        });
      }
      navigate(-1);
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
  return (
    <>
      <DashboardLayout>
        <div className={classes.root}>
          <div className={classes.pageTitle} style={{ marginBottom: 0 }}>Agent commission redeem model</div>
          <div className="radio-actionButton">
            <div>
              <FormControl>
                <RadioGroup
                  aria-labelledby="radio-buttons"
                  name="controlled-radio-buttons"
                  value={values.plan}
                  onChange={() => setFieldValue("plan", "FREEPLAN")}
                >
                  <FormControlLabel
                    value="FREEPLAN "
                    control={<Radio />}
                    checked={values.plan === "FREEPLAN"}
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
                  value={values.plan}
                  onChange={() => setFieldValue("plan", "PLANPAID")}
                >
                  <FormControlLabel
                    value="PLANPAID"
                    control={<Radio />}
                    checked={values.plan === "PLANPAID"}
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
          <RedeemModelForm
            values={values}
            handleChange={handleChange}
            setFieldValue={setFieldValue}
            errors={errors}
            id={id ? id : ""}
            handleSubmit={handleSubmit}
            feature={feature}
            setFeature={setFeature} />
        </div>
      </DashboardLayout>
    </>
  );
};

export default AgentCommissionRedeemModelForm;
