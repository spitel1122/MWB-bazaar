import React, { useEffect, useState } from "react";
import { AddButton, GridOptionButton } from "@/components/atoms/Button";
import { useMasterListStyles } from "@/static/stylesheets/screens";
import {
  Dialog,
  FormControl,
  FormControlLabel,
  MenuItem,
  Pagination,
  Radio,
  RadioGroup,
  Select,
  TextField,
} from "@mui/material";
import { ActionButton } from "@/components/atoms/Button/ActionButton";
import CreateOutlinedIcon from "@mui/icons-material/CreateOutlined";
import fill from "@/static/icons/fill.svg";
import deleteagent from "@/static/icons/delete-agent.svg";
import { AppService } from "@/service/AllApiData.service";

const Units = () => {
  const classes = useMasterListStyles();
  const [stateFormOpen, setStateFormOpen] = useState<boolean>(false);
  const [districtFormOpen, setDistrictFormOpen] = useState<boolean>(false);
  const [cityFormOpen, setCityFormOpen] = useState<boolean>(false);
  const [selectedTab, setSelectedTab] = useState<"weight" | "quantity">(
    "weight"
  );
  const [weightState, setWeightState] = useState<string>("");
  const [unitArray, setUnitArray] = useState([]);
  const [quantityArray, setQuantityArray] = useState([]);
  const [quantityState, setQuantityState] = useState<string>();
  const [editState, setEditState] = useState<string>("");
  const [totalUnits, setTotalUnits] = useState<number>(1);
  const [totalQuantity, setTotalQuantity] = useState<number>(1);
  const [currentPageWeight, setCurrentPageweight] = useState(1);
  const [currentPageQuantity, setCurrentPageQuantity] = useState(1);
    
  const editModal = (id: any, name: any, type: any) => {
    if (type == "WEIGHT") {
      setWeightState(name);
      setStateFormOpen(true);
      setEditState(id);
    } else {
      console.log("setttttttttt------");
      setQuantityState(name);
      setDistrictFormOpen(true);
      setEditState(id);
    }
  };

  const addWeight = async () => {
    if (weightState) {
      const response = await AppService.addUnits({
        unit_type: "WEIGHT",
        unit_name: weightState,
      });

      setStateFormOpen(false);
      getUnitsWeight(currentPageWeight);
      setWeightState("");
    }
  };
  const editWeight = async () => {
    if (weightState && editState) {
      const response = await AppService.editUnits(editState, {
        unit_type: "WEIGHT",
        unit_name: weightState,
      });

      setStateFormOpen(false);
      getUnitsWeight(currentPageWeight);
      setWeightState("");
      setEditState("");
    }
  };
  const addQuantity = async () => {
    if (quantityState) {
      const response = await AppService.addUnits({
        unit_type: "QUANTITY",
        unit_name: quantityState,
      });

      setDistrictFormOpen(false);
      getUnitsQuantitiy(currentPageQuantity);
      setQuantityState("");
    }
  };
  const editQuantity = async () => {
    if (quantityState && editState) {
      const response = await AppService.editUnits(editState, {
        unit_type: "QUANTITY",
        unit_name: quantityState,
      });

      setDistrictFormOpen(false);
      getUnitsQuantitiy(currentPageQuantity);
      setQuantityState("");
      setEditState("");
    }
  };
  const getUnitsWeight = async (page: any) => {
    const response = await AppService.getUnitsWeight({ page: page });
    console.log("Resss=====", response.data);
    setTotalUnits(response.data.count);
    setUnitArray(response?.data?.results);
  };

  const handlePageChange = (event: any, value: any) => {
    setCurrentPageweight(value);
    getUnitsWeight(value);
  };
  const handlePageChangeQ = (event: any, value: any) => {
    setCurrentPageQuantity(value);
    getUnitsQuantitiy(value);
  };
  const getUnitsQuantitiy = async (page: any) => {
    const response = await AppService.getUnitsQuantitiy({ page: page });
    console.log("Resss=====", response.data);
    setTotalQuantity(response.data.count);
    setQuantityArray(response?.data?.results);
  };

  useEffect(() => {
    getUnitsQuantitiy(1);
    getUnitsWeight(1);
  }, []);

  console.log("edit state----", editState);
  return (
    <>
      <div className="radio-actionButton">
        <div className="radio-button">
          <FormControl>
            <RadioGroup
              aria-labelledby="radio-buttons"
              name="controlled-radio-buttons"
              value={selectedTab}
              onChange={() => setSelectedTab("weight")}
            >
              <FormControlLabel
                control={<Radio />}
                checked={selectedTab === "weight"}
                label={
                  <div className="flex gap-4 items-center">Weight Units</div>
                }
              />
            </RadioGroup>
          </FormControl>
        </div>
        <div className="radio-button">
          <FormControl>
            <RadioGroup
              aria-labelledby="radio-buttons"
              name="controlled-radio-buttons"
              value={selectedTab}
              onChange={() => setSelectedTab("quantity")}
            >
              <FormControlLabel
                value="Online"
                control={<Radio />}
                checked={selectedTab === "quantity"}
                label={
                  <div className="flex gap-4 items-center">Quantity Units</div>
                }
              />
            </RadioGroup>
          </FormControl>
        </div>
      </div>
      {console.log("quantityArray-----", quantityArray)}
      {selectedTab === "weight" && (
        <>
          <div className={"flex justify-between w-[564px]"}>
            <h3 className={"text-[16px] mt-[15px] font-bold"}>Weight</h3>
            <AddButton
              label={"Add Weight"}
              onClick={() => setStateFormOpen(true)}
            />
          </div>

          {console.log("Unit---aray---", unitArray)}
          <div>
            <table className={classes.dataGrid} cellPadding={0} cellSpacing={0}>
              <thead>
                <tr>
                  <th>Name</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {unitArray?.map((item: any, index: any) => {
                  return (
                    <tr key={index}>
                      <td>{item?.unit_name}</td>
                      <td>
                        <div className={"flex justify-end"}>
                          <GridOptionButton
                            icon={"edit-item"}
                            menus={[
                              {
                                label: (
                                  <>
                                    <span className="icon">
                                      <img src={fill} alt="fill" />{" "}
                                    </span>{" "}
                                    Edit
                                  </>
                                ),
                                onClick() {
                                  editModal(
                                    item?.id,
                                    item?.unit_name,
                                    "WEIGHT"
                                  );
                                },
                              },
                              // {
                              //   label: (
                              //     <>
                              //       <span className="icon">
                              //         <img
                              //           src={deleteagent}
                              //           alt="deleteagent"
                              //         />{" "}
                              //       </span>{" "}
                              //       Delete
                              //     </>
                              //   ),
                              //   onClick() {
                              //     alert("Clicked");
                              //   },
                              // },
                            ]}
                          />
                        </div>
                      </td>
                    </tr>
                  );
                })}
                {/*
                {
                label: "Units",
                content: <Units />,
              }, 
                <tr>
                  <td>Dhaka</td>
                  <td>
                    <div className={"flex justify-end"}>
                      <GridOptionButton
                        icon={"vertical-options"}
                        menus={[
                          {
                            label: (
                              <>
                                <span className="icon">
                                  <img src={fill} alt="fill" />{" "}
                                </span>{" "}
                                Edit
                              </>
                            ),
                            onClick() {
                              alert("Clicked");
                            },
                          },
                          {
                            label: (
                              <>
                                <span className="icon">
                                  <img src={deleteagent} alt="deleteagent" />{" "}
                                </span>{" "}
                                Delete
                              </>
                            ),
                            onClick() {
                              alert("Clicked");
                            },
                          },
                        ]}
                      />
                    </div>
                  </td>
                </tr>
                <tr>
                  <td>Dhaka</td>
                  <td>
                    <div className={"flex justify-end"}>
                      <GridOptionButton
                        icon={"vertical-options"}
                        menus={[
                          {
                            label: (
                              <>
                                <span className="icon">
                                  <img src={fill} alt="fill" />{" "}
                                </span>{" "}
                                Edit
                              </>
                            ),
                            onClick() {
                              alert("Clicked");
                            },
                          },
                          {
                            label: (
                              <>
                                <span className="icon">
                                  <img src={deleteagent} alt="deleteagent" />{" "}
                                </span>{" "}
                                Delete
                              </>
                            ),
                            onClick() {
                              alert("Clicked");
                            },
                          },
                        ]}
                      />
                    </div>
                  </td>
                </tr> */}
              </tbody>
              <div
                className="flex items-center justify-between pagination"
                style={{ display: "flex" }}
              >
                <Pagination
                  count={Math.ceil(totalUnits / 10)}
                  page={currentPageWeight}
                  onChange={handlePageChange}
                />
              </div>
            </table>
          </div>
        </>
      )}

      {selectedTab === "quantity" && (
        <>
          <div className={"flex justify-between w-[564px]"}>
            <h3 className={"text-[16px] mt-[15px] font-bold"}>Quantity</h3>
            <AddButton
              label={"Add Quantity"}
              onClick={() => setDistrictFormOpen(true)}
            />
          </div>

          <div>
            <table className={classes.dataGrid} cellPadding={0} cellSpacing={0}>
              <thead>
                <tr>
                  <th>Name</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {quantityArray?.map((item: any, index: any) => {
                  return (
                    <tr key={index}>
                      <td>{item?.unit_name}</td>
                      <td>
                        <div className={"flex justify-end"}>
                          <GridOptionButton
                            icon={"vertical-options"}
                            menus={[
                              {
                                label: (
                                  <>
                                    <span className="icon">
                                      <img src={fill} alt="fill" />{" "}
                                    </span>{" "}
                                    Edit
                                  </>
                                ),
                                onClick() {
                                  editModal(
                                    item?.id,
                                    item?.unit_name,
                                    "QUANTITY"
                                  );
                                },
                              },
                              // {
                              //   label: (
                              //     <>
                              //       <span className="icon">
                              //         <img
                              //           src={deleteagent}
                              //           alt="deleteagent"
                              //         />{" "}
                              //       </span>{" "}
                              //       Delete
                              //     </>
                              //   ),
                              //   onClick() {
                              //     alert("Clicked");
                              //   },
                              // },
                            ]}
                          />
                        </div>
                      </td>
                    </tr>
                  );
                })}
                {/* <tr>
                  <td>Dhaka</td>
                  <td>
                    <div className={"flex justify-end"}>
                      <GridOptionButton
                        icon={"vertical-options"}
                        menus={[
                          {
                            label: (
                              <>
                                <span className="icon">
                                  <img src={fill} alt="fill" />{" "}
                                </span>{" "}
                                Edit
                              </>
                            ),
                            onClick() {
                              alert("Clicked");
                            },
                          },
                          {
                            label: (
                              <>
                                <span className="icon">
                                  <img src={deleteagent} alt="deleteagent" />{" "}
                                </span>{" "}
                                Delete
                              </>
                            ),
                            onClick() {
                              alert("Clicked");
                            },
                          },
                        ]}
                      />
                    </div>
                  </td>
                </tr>
                <tr>
                  <td>Dhaka</td>
                  <td>
                    <div className={"flex justify-end"}>
                      <GridOptionButton
                        icon={"vertical-options"}
                        menus={[
                          {
                            label: (
                              <>
                                <span className="icon">
                                  <img src={fill} alt="fill" />{" "}
                                </span>{" "}
                                Edit
                              </>
                            ),
                            onClick() {
                              alert("Clicked");
                            },
                          },
                          {
                            label: (
                              <>
                                <span className="icon">
                                  <img src={deleteagent} alt="deleteagent" />{" "}
                                </span>{" "}
                                Delete
                              </>
                            ),
                            onClick() {
                              alert("Clicked");
                            },
                          },
                        ]}
                      />
                    </div>
                  </td>
                </tr> */}
              </tbody>
              <div
                className="flex items-center justify-between pagination"
                style={{ display: "flex" }}
              >
                <Pagination
                  count={Math.ceil(totalQuantity / 10)}
                  page={currentPageQuantity}
                  onChange={handlePageChangeQ}
                />
              </div>
            </table>
          </div>
        </>
      )}

      <Dialog
        open={stateFormOpen}
        maxWidth={"lg"}
        sx={{
          ".MuiPaper-root": {
            borderRadius: "20px",
          },
        }}
        onClose={() => setStateFormOpen(false)}
      >
        <div className={classes.addDialog}>
          <div className={"title"}>Add Weight Unit</div>

          <div>
            {/*<p className="fieldTitle">Weight</p>*/}
            <TextField
              variant="standard"
              fullWidth={true}
              placeholder={"Add weight unit"}
              value={weightState}
              onChange={(e) => setWeightState(e.target.value)}
            />
          </div>

          <div className={"action-bar"}>
            <ActionButton
              variant={"default"}
              title={"Cancel"}
              onClick={() => setStateFormOpen(false)}
            />

            <ActionButton
              variant={"primary"}
              title={"Submit"}
              onClick={() => {
                editState ? editWeight() : addWeight();
              }}
            />
          </div>
        </div>
      </Dialog>

      <Dialog
        open={districtFormOpen}
        maxWidth={"lg"}
        sx={{
          ".MuiPaper-root": {
            borderRadius: "20px",
          },
        }}
        onClose={() => setDistrictFormOpen(false)}
      >
        <div className={classes.addDialog}>
          <div className={"title"}>Add Quantity Unit</div>

          <div className={"mt-[30px]"}>
            {/*<p className="fieldTitle"></p>*/}
            <TextField
              variant="standard"
              fullWidth={true}
              placeholder={"Add quantity unit"}
              onChange={(e) => setQuantityState(e.target.value)}
              value={quantityState}
            />
          </div>

          <div className={"action-bar"}>
            <ActionButton
              variant={"default"}
              title={"Cancel"}
              onClick={() => setDistrictFormOpen(false)}
            />

            <ActionButton
              variant={"primary"}
              title={"Submit"}
              onClick={() => {
                editState ? editQuantity() : addQuantity();
              }}
            />
          </div>
        </div>
      </Dialog>

      <Dialog
        open={cityFormOpen}
        maxWidth={"lg"}
        sx={{
          ".MuiPaper-root": {
            borderRadius: "20px",
          },
        }}
        onClose={() => setCityFormOpen(false)}
      >
        <div className={classes.addDialog}>
          <div className={"title"}>Add City</div>

          <div>
            <p className="fieldTitle">State</p>
            <Select
              label="Age"
              variant={"standard"}
              fullWidth={true}
              multiple={true}
              value={[]}
            >
              <MenuItem value={""}>Test 1</MenuItem>
              <MenuItem value={""}>Test 2</MenuItem>
              <MenuItem value={""}>Test 3</MenuItem>
            </Select>
          </div>

          <div className={"mt-[30px]"}>
            <p className="fieldTitle">District</p>
            <Select
              label="Age"
              variant={"standard"}
              fullWidth={true}
              multiple={true}
              value={[]}
            >
              <MenuItem value={""}>Test 1</MenuItem>
              <MenuItem value={""}>Test 2</MenuItem>
              <MenuItem value={""}>Test 3</MenuItem>
            </Select>
          </div>

          <div className={"mt-[30px]"}>
            <p className="fieldTitle">City Name</p>
            <TextField variant="standard" fullWidth={true} />
          </div>

          <div className={"action-bar"}>
            <ActionButton
              variant={"default"}
              title={"Cancel"}
              onClick={() => setCityFormOpen(false)}
            />

            <ActionButton
              variant={"primary"}
              title={"Submit"}
              onClick={() => setCityFormOpen(false)}
            />
          </div>
        </div>
      </Dialog>
    </>
  );
};

export { Units };
