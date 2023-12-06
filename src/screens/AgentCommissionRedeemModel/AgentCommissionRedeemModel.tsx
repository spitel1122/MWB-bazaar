import React, { useEffect, useState } from "react";
import { DashboardLayout } from "@/components/layouts";
import { useRetailerStyles } from "@/static/stylesheets/screens";
import { SearchField } from "@/components/atoms/SearchField";
import { AddButton, GridOptionButton } from "@/components/atoms/Button";
import closeicon from "@/static/images/Vector (10).png"
import { useNavigate } from "react-router-dom";
import { routePaths } from "@/routes";
import complete from "@/static/icons/complete.svg";
import fill from "@/static/icons/fill.svg";
import deleteagent from "@/static/icons/delete-agent.svg";
import calendar from "@/static/icons/calendar.svg";
import { AppService } from "@/service/AllApiData.service";
import { Alert, AlertError } from "@/alert/Alert";
import { Box, Dialog, FormControl, FormControlLabel, Grid, Pagination, Radio, RadioGroup, TextField } from "@mui/material";
import { ErrorMessage, Form, Formik } from "formik";
import * as Yup from "yup"
import { ActionButton } from "@/components/atoms/Button/ActionButton";
import { useProductListStyles } from "@/static/stylesheets/molecules";

const AgentCommissionRedeemModel = () => {
  const classes = useRetailerStyles();
  const navigate = useNavigate();
  const [CommisionRedeem, setCommisionRedeem] = useState([])
  const [searchK, setSearchK] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [totalCount, SetTotalCount] = useState<number>(1);
  const [addModalOpen, setAddModalOpen] = useState(false);
  const [data, setData] = useState<any>({});
  const classesM = useProductListStyles();

  useEffect(() => {
    AgentCommissionRedeemAPI(1)
  }, [])

  const AgentCommissionRedeemAPI = async (page: any) => {
    try {
      const res = await AppService.AgentCommissionRedeem({ page: page ? page : 1 })
      if (res.status === 200) {
        setCommisionRedeem(res.data.results)
        SetTotalCount(res.data.count)
      }
    } catch (err) {
      console.log('err: ', err)
    }
  }
  
  const handlePageChange = (event: any, value: any) => {
    setCurrentPage(value);
    AgentCommissionRedeemAPI(value);
  };

  const handleCallback = (e: any) => {
    setSearchK(e);
  }

  const deleteCommissionredeemAPI = async (id: any) => {
    if (window.confirm('Do You want to delete commissionredeem')) {
      const responseJson = await AppService.deleteAgentCommissionRedeem(id);
      if (responseJson.status == 204) {
        Alert('CommissionRedeem Delete Successfully');
        AgentCommissionRedeemAPI(currentPage);
      }
      console.log("all commission redeem list===>", responseJson);
    }
  }

  const handleEdit = async (id: any) => {
    const res = await AppService.DetailAgentCommissionRedeem(id)
    setData(res.data)
    setAddModalOpen(true)
  }

  const SignupSchema = Yup.object().shape({
    minimum_no_of_invoice_genrated: Yup.string().required("minimum_no_of_invoice_genrated is required"),
    amount_reimbursed_on_particular_days_percent: Yup.string().required("amount_reimbursed_on_particular_days_percent is required"),
    no_of_days_between_redemption: Yup.string().required("no_of_days_between_redemption is required"),
  });

  let initialValues = {
    plan: data?.plan || "",
    minimum_no_of_invoice_genrated: data?.minimum_no_of_invoice_genrated || "",
    amount_reimbursed_on_particular_days_percent: data?.amount_reimbursed_on_particular_days_percent || "",
    no_of_days_between_redemption: data?.no_of_days_between_redemption || "",
  };

  const handleFormSubmit = async (values: any) => {
    try {
      const response = await AppService.AgentCommissionRedeemUpdate(data?.id, values);
      if (response) { 
        Alert("Successfully updated!!!");
        navigate('/agent-commission-redeem-model')
        setAddModalOpen(false)
      }
    } catch (error: any) {
      let message = error.response.data.type + "\n"
      error.response.data.errors.map((row: any) => {
        message += row.attr + " : " + row.detail + "\n"
      })
      AlertError(message);
    }
    AgentCommissionRedeemAPI(currentPage)
  };

  return (
    <>
      <DashboardLayout>
        <div className={classes.root}>
          <div>
            <div className="flex align-middle justify-between">
              <p className="commonTitle">Agent Commission Redeem Model</p>

              <div className="flex gap-5 align-middle justify-end">
                <SearchField parentCallback={handleCallback} />
                <AddButton
                  label="Create"
                  onClick={() => navigate(routePaths?.createAgentCommissionRedeemModel)}
                />
              </div>
            </div>
          </div>

          <div className="relative pt-[20px] pb-[40px]" style={{ overflowX: "auto" }}>
            <table className="w-full text-sm text-left text-gray-500 " style={{ marginBottom: "70px" }}>
              <thead className="text-[12px] text-[#2E2C34] bg-gray-50 font-[600]">
                <tr className=" [#2E2C34]">
                  <th scope="col" className="py-3 px-6">
                    Date
                  </th>
                  <th scope="col" className="py-3 px-6">
                    Plan Type
                  </th>
                  <th scope="col" className="py-3 px-6">
                    Minimum Invoice
                  </th>
                  <th scope="col" className="py-3 px-6">
                    Maximum Amount
                  </th>
                  <th scope="col" className="py-3 px-6">
                    No of days
                  </th>
                  <th scope="col" className="py-3 px-6">
                    No of days between Redemption
                  </th>
                  <th scope="col" className="py-3 px-6"></th>
                </tr>
              </thead>
              <tbody>
                {CommisionRedeem?.filter((elm: any) => elm?.plan?.toLowerCase().includes(searchK)).map((item: any, index: number) => {
                  return <tr className="border-b" key={index}>
                    <td className="py-4 px-6  [#2E2C34]">
                      <div className="flex gap-5 align-middle">
                        <div>
                          <p className="font-[14px] text-[#2E2C34]">
                            24 Jan, 2021 4:00PM
                          </p>
                        </div>
                      </div>
                    </td>
                    <th
                      scope="row"
                      className="py-4 px-6 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                    >
                      <div className="flex gap-[20px] items-center ">
                        <p className="mb-3 text-[14px] font-[600] text-[#2E2C34] font-Manrope  cursor-pointer">
                          {item?.plan}
                        </p>
                      </div>
                    </th>
                    <td className="py-4 px-6  [#2E2C34]">
                      {item?.minimum_no_of_invoice_genrated}
                    </td>
                    <td className="py-4 px-6  [#2E2C34]">{item?.amount_reimbursed_on_particular_days_percent}</td>
                    <td className="py-4 px-6  [#2E2C34] cursor-pointer">
                      12
                    </td>
                    <td className="py-4 px-6  [#2E2C34] cursor-pointer">
                      <div className="flex gap-5 align-middle">
                        <div>
                          <p className="font-[14px] color-[#4E2FA9]">
                            {item?.no_of_days_between_redemption}
                          </p>
                        </div>
                      </div>
                    </td>
                    <td className="py-4 px-6  [#2E2C34] cursor-pointer" style={{ textAlign: "end", float: "right", paddingRight: 0 }}>
                      <GridOptionButton
                        icon={"vertical-options"}
                        menus={[
                          {
                            label: (
                              <>
                                <span className="icon"><img src={fill} alt="fill" /> </span> Edit Commissionredeem
                              </>
                            ),
                            onClick() {
                              handleEdit(item?.id);
                            },
                          },
                          {
                            label: (
                              <>
                                <span className="icon"><img src={deleteagent} alt="deleteagent" /> </span> Delete Commissionredeem
                              </>
                            ),
                            onClick() {
                              deleteCommissionredeemAPI(item?.id)
                            },
                          },
                        ]}
                      />
                    </td>
                  </tr>
                })}
              </tbody>
            </table>
          </div>
          {CommisionRedeem?.length > 10 && <div
            className="flex items-center justify-center"
            style={{ display: "flex", marginLeft: 0 }}
          >
            <Pagination
              count={Math.ceil(totalCount / 10)}
              page={currentPage}
              onChange={handlePageChange}
            />
          </div>}
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
          <Formik
            initialValues={initialValues}
            onSubmit={handleFormSubmit}
            validationSchema={SignupSchema}
            enableReinitialize={true}
          >
            {({
              values,
              handleChange,
              setFieldValue
            }) => (
              <Form>
                <div className={classes.commissionRedeemDialog}>
                  <div style={{ width: "100%" }}>
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "15px" }}>
                      <p style={{ color: "#2E2C34", fontSize: "18px", fontWeight: 600 }}>Edit Commission Redeem</p>
                      <img src={closeicon} onClick={() => setAddModalOpen(false)} style={{ cursor: "pointer", height: "13px", width: "13px" }} />
                    </div>
                    <div className="radio-actionButton" style={{ display: "flex", alignItems: "center", marginBottom: "15px" }}>
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
                    <Grid container spacing={2}>
                      <Grid item xs={12}>
                        <p className="commonSelectText" style={{ fontSize: "12px", color: "#84818A" }}>minimum no of invoice genrated</p>
                        <TextField
                          value={values.minimum_no_of_invoice_genrated}
                          onChange={handleChange}
                          name="minimum_no_of_invoice_genrated"
                          style={{ fontSize: "14px" }}
                          variant="standard"
                          fullWidth={true}
                        />
                        <Box sx={{ color: "red" }}>
                          <ErrorMessage name="minimum_no_of_invoice_genrated" />
                        </Box>
                      </Grid>
                      <Grid item xs={12}>
                        <p className="commonSelectText" style={{ fontSize: "12px", color: "#84818A" }}>Amount reimbursed on particular days</p>
                        <TextField
                          value={values.amount_reimbursed_on_particular_days_percent}
                          onChange={handleChange}
                          name="amount_reimbursed_on_particular_days_percent"
                          style={{ fontSize: "14px" }}
                          variant="standard"
                          fullWidth={true}
                        />
                        <Box sx={{ color: "red" }}>
                          <ErrorMessage name="amount_reimbursed_on_particular_days_percent" />
                        </Box>
                      </Grid>
                      <Grid item xs={12}>
                        <p className="commonSelectText" style={{ fontSize: "12px", color: "#84818A" }}>No. of Days Between redemption</p>
                        <TextField
                          value={values.no_of_days_between_redemption}
                          onChange={handleChange}
                          name="no_of_days_between_redemption"
                          style={{ fontSize: "14px" }}
                          variant="standard"
                          fullWidth={true}
                        />
                        <Box sx={{ color: "red" }}>
                          <ErrorMessage name="no_of_days_between_redemption" />
                        </Box>
                      </Grid>
                    </Grid>

                  </div>
                </div>
                <div className="flex gap-5 pb-[40px]" style={{ paddingLeft: "30px" }}>
                  <ActionButton title="Cancel" variant="default" onClick={() => setAddModalOpen(false)} />
                  <ActionButton type="submit" title="Submit" variant="primary" />
                </div>
              </Form>
            )}
          </Formik>
        </Dialog>
      </DashboardLayout>
    </>
  );
};

export default AgentCommissionRedeemModel;
