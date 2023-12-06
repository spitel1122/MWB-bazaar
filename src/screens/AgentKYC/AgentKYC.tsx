import React, { useEffect } from "react";
import { ActionButton } from "@/components/atoms/Button/ActionButton";
import { DashboardLayout } from "@/components/layouts";
import { useaddAgentStyle } from "@/static/stylesheets/molecules/addagent";
import {
  FormControl,
  FormControlLabel,
  Radio,
  RadioGroup,
} from "@mui/material";

import SalesManIcon from "@/static/icons/icon_salesman.svg";
import indivitualIcon from "@/static/icons/icon_indivitual.svg";
import AgancyIcon from "@/static/icons/icon_agancy.svg";
import LogoPrev from "@/static/icons/ic_previous.png";
import { IndivitualKYCForm } from "@/components/molecules/AgentsKycForm/IndivitualKYCForm";
import { AgencyKYCForm } from "@/components/molecules/AgentsKycForm/AgencyKYCForm";
import { SalesManKYCForm } from "@/components/molecules/AgentsKycForm/SalesManKYCForm";
import { useNavigate, useParams } from "react-router-dom";
import { AppService } from "@/service/AllApiData.service";

const AgentKYC = () => {
  const classes = useaddAgentStyle();
  const [ChangeType, setChangeType] = React.useState("INDIVIDUAL");
  const [data, setData] = React.useState<any>();
  console.log("datadata", data)

  const params = useParams();
  const navigate = useNavigate();
  const { id } = params;

  const getOneAgent = async (id: any) => {
    try {
      const response = await AppService.getAgentById(id);
      console.log("Resss=====in agent kyc", response.data);
      setData(response.data);
      setChangeType(response?.data?.agent_type);
    } catch (error) {
      console.log("errrrrrr in kyc", error);
    }
  };

  useEffect(() => {
    getOneAgent(id);
  }, []);

  return (
    <>
      <DashboardLayout>
        <div className={classes.root}>
          <div className="container">
            <div className="headContainer" style={{ alignItems: "center" }} onClick={() => navigate("/agents")}>
              <div className="icon">
                <img src={LogoPrev} alt={"Logo"} style={{ width: "7px", height: "12px" }} />
              </div>
              <div className="headTitle">Agent KYC</div>
            </div>

            <div className="radio-actionButton" style={{ flexWrap: "wrap" }}>
              <div className="radio-button">
                <FormControl>
                  <RadioGroup
                    aria-labelledby="radio-buttons"
                    name="controlled-radio-buttons"
                    value={ChangeType}
                    onChange={() => setChangeType("INDIVIDUAL")}
                  >
                    <FormControlLabel
                      value="INDIVIDUAL "
                      control={<Radio />}
                      checked={ChangeType === "INDIVIDUAL"}
                      label={
                        <div className="flex gap-4 items-center">
                          <img src={indivitualIcon} alt={"Logo"} />
                          Individual
                        </div>
                      }
                      disabled={data?.agent_type != "INDIVIDUAL"}
                    />
                  </RadioGroup>
                </FormControl>
              </div>

              <div className="radio-button">
                <FormControl>
                  <RadioGroup
                    aria-labelledby="radio-buttons"
                    name="controlled-radio-buttons"
                    value={ChangeType}
                    onChange={() => setChangeType("AGENCY")}
                  >
                    <FormControlLabel
                      value="agency"
                      control={<Radio />}
                      checked={ChangeType === "AGENCY"}
                      label={
                        <div className="flex gap-4 items-center">
                          <img src={AgancyIcon} alt={"Logo"} /> Agency
                        </div>
                      }
                      disabled={data?.agent_type != "AGENCY"}
                    />
                  </RadioGroup>
                </FormControl>
              </div>

              <div className="radio-button">
                <FormControl>
                  <RadioGroup
                    aria-labelledby="radio-buttons"
                    name="controlled-radio-buttons"
                    value={ChangeType}
                    onChange={() => setChangeType("SALESMAN")}
                  >
                    <FormControlLabel
                      value="Sales"
                      control={<Radio />}
                      checked={ChangeType === "SALESMAN"}
                      label={
                        <div className="flex gap-4 items-center">
                          <img src={SalesManIcon} alt={"Logo"} /> Salesman
                        </div>
                      }
                      disabled={data?.agent_type != "SALESMAN"}
                    />
                  </RadioGroup>
                </FormControl>
              </div>
            </div>

            {ChangeType === "INDIVIDUAL" && (
              <>
                <div>
                  <IndivitualKYCForm data={data} id={id} />
                </div>
              </>
            )}

            {ChangeType === "AGENCY" && (
              <>
                <div>
                  <AgencyKYCForm data={data} id={id} />
                </div>
              </>
            )}

            {ChangeType === "SALESMAN" && (
              <>
                <div>
                  <SalesManKYCForm data={data} id={id} />
                </div>
              </>
            )}
          </div>
        </div>
      </DashboardLayout>
    </>
  );
};

export default AgentKYC;
