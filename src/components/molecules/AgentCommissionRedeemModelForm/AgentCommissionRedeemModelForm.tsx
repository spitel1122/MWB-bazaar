import React from 'react';
import { Input } from "@mui/material";
import { ActionButton } from "@/components/atoms/Button/ActionButton";
import { AppService } from '@/service/AllApiData.service';

const AgentCommissionRedeemModelForm = (props: any) => {
  const {
    errors,
    handleChange,
    values,
    handleSubmit,
    id,
    setFeature,
  } = props;

  const getAllPlan = async () => {
    const responseJson = await AppService.listFeatures();
    let tempObj = {};
    await Promise.all(
      responseJson.data.results.map(async (row: any, index: number) => {
        tempObj = { ...tempObj, [index]: { id: row.id, feature: row.feature } };
      })
    );
  };

  React.useEffect(() => {
    getAllPlan();
  }, []);

  const getplanlistbyid = async (id: any) => {
    const data = await AppService?.getPlanById(id)
    if (data?.status === 200) {
      setFeature([...data?.data?.plan_features])
    }
  }

  React.useEffect(() => {
    if (id !== '') {
      getplanlistbyid(id)
    }
  }, [])

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div className={"border-[1px] rounded-[10px] p-[20px] pb-[28px]"}>
          <table className={"text-[14px] w-[100%]"}>
            <thead>
              <tr>
                <th className={"w-[100px] p-[8px]"}></th>
                <th className={"p-[8px]"}>Minimum Number of Invoice to generate by Wholesaler</th>
                <th className={"p-[8px]"}>Amounts that can be reimbursed on the particular way</th>
                <th className={"p-[8px]"}>Number of days between Redemption</th>
              </tr>
            </thead>
            <tbody>
              {values.plan === "FREEPLAN" ? (
                <>
                  <tr>
                    <th className={"p-[8px]"}>Free</th>
                    <td className={"p-[8px]"}>
                      <Input
                        className={"border-[1px] outline-0 p-[7px] rounded-[5px] w-[100%] border-box"}
                        style={{ fontSize: "14px" }}
                        id="minimum_no_of_invoice_genrated"
                        type="text"
                        name="minimum_no_of_invoice_genrated"
                        required
                        error={!!errors.minimum_no_of_invoice_genrated}
                        value={values.minimum_no_of_invoice_genrated}
                        onChange={handleChange}
                      />
                    </td>
                    <td className={"p-[8px]"}>
                      <Input
                        className={"border-[1px] outline-0 p-[7px] rounded-[5px] w-[100%] border-box"}
                        style={{ fontSize: "14px" }}
                        id="amount_reimbursed_on_particular_days_percent"
                        type="text"
                        name="amount_reimbursed_on_particular_days_percent"
                        required
                        error={!!errors.amount_reimbursed_on_particular_days_percent}
                        value={values.amount_reimbursed_on_particular_days_percent}
                        onChange={handleChange}
                      />
                    </td>
                    <td className={"p-[8px]"}>
                      <Input
                        className={"border-[1px] outline-0 p-[7px] rounded-[5px] w-[100%] border-box"}
                        style={{ fontSize: "14px" }}
                        id="no_of_days_between_redemption"
                        type="text"
                        name="no_of_days_between_redemption"
                        required
                        error={!!errors.no_of_days_between_redemption}
                        value={values.no_of_days_between_redemption}
                        onChange={handleChange}
                      />
                    </td>
                  </tr>
                </>
              ) : (
                <tr>
                  <th className={"p-[8px]"}>Paid</th>
                  <td className={"p-[8px]"}>
                    <Input
                      className={"border-[1px] outline-0 p-[7px] rounded-[5px] w-[100%] border-box"}
                      style={{ fontSize: "14px" }}
                      id="minimum_no_of_invoice_genrated2"
                      type="text"
                      name="minimum_no_of_invoice_genrated"
                      required
                      error={!!errors.minimum_no_of_invoice_genrated}
                      value={values.minimum_no_of_invoice_genrated}
                      onChange={handleChange}
                    />
                  </td>
                  <td className={"p-[8px]"}>
                    <Input
                      className={"border-[1px] outline-0 p-[7px] rounded-[5px] w-[100%] border-box"}
                      style={{ fontSize: "14px" }}
                      id="amount_reimbursed_on_particular_days_percent2"
                      type="text"
                      name="amount_reimbursed_on_particular_days_percent"
                      required
                      error={!!errors.amount_reimbursed_on_particular_days_percent}
                      value={values.amount_reimbursed_on_particular_days_percent}
                      onChange={handleChange}
                    />
                  </td>
                  <td className={"p-[8px]"}>
                    <Input
                      className={"border-[1px] outline-0 p-[7px] rounded-[5px] w-[100%] border-box"}
                      style={{ fontSize: "14px" }}
                      id="no_of_days_between_redemption2"
                      type="text"
                      name="no_of_days_between_redemption"
                      required
                      error={!!errors.no_of_days_between_redemption}
                      value={values.no_of_days_between_redemption}
                      onChange={handleChange}
                    />
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        <div className="flex justify-end gap-5 mt-[30px] pb-[40px]">
          <ActionButton type="submit" title="Submit" variant="primary" />
        </div>
      </form>
    </div>
  );
};

export { AgentCommissionRedeemModelForm };
