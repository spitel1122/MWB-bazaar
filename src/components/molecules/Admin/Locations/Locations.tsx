import React, { useEffect, useState } from "react";
import { AddButton } from "@/components/atoms/Button";
import { useMasterListStyles } from "@/static/stylesheets/screens";
import CreateOutlinedIcon from "@mui/icons-material/CreateOutlined";
import { Dialog, FormControl, FormControlLabel, Pagination, Radio, RadioGroup, TextField, Select, MenuItem } from "@mui/material";
import { ActionButton } from "@/components/atoms/Button/ActionButton";
import { AppService } from "@/service/AllApiData.service";

interface MasterListGridProps {
  type?: "WholeSeller" | "Retailer";
}

const Locations: React.FC<MasterListGridProps> = (props) => {
  const classes = useMasterListStyles();
  const [stateFormOpen, setStateFormOpen] = useState<boolean>(false);
  const [districtFormOpen, setDistrictFormOpen] = useState<boolean>(false);
  const [cityFormOpen, setCityFormOpen] = useState<boolean>(false);
  const [districts, setDistricts] = useState([]);
  const [states, setStates] = useState([]);
  const [cities, setCities] = useState([]);
  const [currentPageS, setCurrentPageS] = useState(1);
  const [currentPageD, setCurrentPageD] = useState(1);
  const [currentPageC, setCurrentPageC] = useState(1);
  const [totalStates, setTotalStates] = useState(1);
  const [totalDistricts, setTotalDistricts] = useState(1);
  const [totalCities, setTotalCities] = useState(1);
  const [addState, setAddState] = useState({ state: "" });
  const [adddistrict, setAddDistrict] = useState({ state: "", district: "" });
  const [addCity, setAddCity] = useState({ state: "", district: "", city: "" });
  const [editId, setEditId] = useState("");
  const [AllStates, setAllStates] = useState([]);
  const [AllDistricts, setAllDistricts] = useState([]);
  const [AllCities, setAllCities] = useState([]);
  const getAllDistrict = async (value: any) => {
    const responseJson = await AppService.getAllDistric({ page: value });
    setDistricts(responseJson.data.results);
    setTotalDistricts(responseJson.data.count);
  };
  const getAllCities = async (value: any) => {
    const responseJson = await AppService.getAllCity({ page: value });
    setCities(responseJson.data.results);
    setTotalCities(responseJson.data.count);
  };
  const getAllStates = async (value: any) => {
    const responseJson = await AppService.getAllStates({ page: value });
    // console.log(responseJson.data.bazaar);
    setTotalStates(responseJson.data.count);
    setStates(responseJson.data.results);
  };

  const getTotalDistrict = async () => {
    const responseJson = await AppService.getTotalDistrict();
    setAllDistricts(responseJson.data);
  };
  const getTotalCities = async () => {
    const responseJson = await AppService.getTotalCity();
    setAllCities(responseJson.data);
  };
  const getTotalStates = async () => {
    const responseJson = await AppService.getTotalStates();
    // console.log(responseJson.data.bazaar);
  
    setAllStates(responseJson.data);
  };
  useEffect(() => {
    getAllStates(currentPageS);
    getAllDistrict(currentPageD);
    getAllCities(currentPageC);
    getTotalStates();
    getTotalDistrict();
    getTotalCities();
  }, []);

  const addStateData = async () => {
    if (addState.state) {
      if (editId) {
        const responseJson = await AppService.updateState(editId, addState);
        setEditId("");
      } else {
        const responseJson = await AppService.addState(addState);
      }
      getAllStates(currentPageS);
      setAddState({ state: "" });
      setStateFormOpen(false);
    }
  };
  const addDistrictData = async () => {
    if (adddistrict.state && adddistrict.district) {
      if (editId) {
        const responseJson = await AppService.updateDistrict(
          editId,
          adddistrict
        );
        setEditId("");
      } else {
        const responseJson = await AppService.addDistrict(adddistrict);
      }
      getAllDistrict(currentPageD);
      setAddDistrict({ district: "", state: "" });
      setDistrictFormOpen(false);
    }
  };

  const addCityData = async () => {
    if (addCity.state && addCity.district && addCity.city) {
      if (editId) {
        const responseJson = await AppService.updateCity(editId, addCity);
        setEditId("");
      } else {
        const responseJson = await AppService.addCity(addCity);
      }
      getAllCities(currentPageC);
      setAddCity({ city: "", district: "", state: "" });
      setCityFormOpen(false);
    }
  };

  const editState = (state: any) => {
    setEditId(state.id);
    setAddState({ state: state.state });
    setStateFormOpen(true);
  };

  const editDistrict = (dis: any) => {
    setEditId(dis.id);
    setAddDistrict({ state: dis.state, district: dis.district });
    setDistrictFormOpen(true);
  };
  const editCity = (city: any) => {
    setEditId(city.id);
    setAddCity({
      state: city.state,
      district: city.district,
      city: city.city,
    });
    setCityFormOpen(true);
  };

  const handlePageChange = (event: any, value: any) => {
    setCurrentPageS(value);
    getAllStates(value);
  };

  const handlePageChangeD = (event: any, value: any) => {
    setCurrentPageS(value);
    getAllDistrict(value);
  };
  const handlePageChangeC = (event: any, value: any) => {
    setCurrentPageS(value);
    getAllCities(value);
  };

  const [selectedTab, setSelectedTab] = useState<"State" | "District" | "City">(
    "State"
  );

React.useEffect(()=>{
  setCurrentPageS(1);
  setCurrentPageD(1);
  setCurrentPageC(1);
},[selectedTab])
  return (
    <>
      <div className="radio-actionButton">
        <div className="radio-button">
          <FormControl>
            <RadioGroup
              aria-labelledby="radio-buttons"
              name="controlled-radio-buttons"
              value={selectedTab}
              onChange={() => setSelectedTab("State")}
            >
              <FormControlLabel
                control={<Radio />}
                checked={selectedTab === "State"}
                label={<div className="flex gap-4 items-center">State</div>}
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
              onChange={() => setSelectedTab("District")}
            >
              <FormControlLabel
                value="Online"
                control={<Radio />}
                checked={selectedTab === "District"}
                label={<div className="flex gap-4 items-center">District</div>}
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
              onChange={() => setSelectedTab("City")}
            >
              <FormControlLabel
                value="Online"
                control={<Radio />}
                checked={selectedTab === "City"}
                label={<div className="flex gap-4 items-center">City</div>}
              />
            </RadioGroup>
          </FormControl>
        </div>
      </div>

      {selectedTab === "State" && (
        <>
          <div className={"flex justify-between w-[564px] mt-[20px]"}>
            <h3 className={"text-[20px] font-bold"}>States</h3>
            <AddButton
              label={"Add State"}
              onClick={() => {
                setAddState({ state: "" });
                setEditId("");
                setStateFormOpen(true);
              }}
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
              {states.map((state: any, index: any) => {
                return (
                  <tr key={index}>
                    <td>{state.state}</td>
                    <td>
                      <div className={"flex justify-end"}>
                        <div
                          className="inline-flex border hover:border-[#FF6652] p-[3px] rounded-lg cursor-pointer"
                          onClick={() => editState(state)}>
                          <CreateOutlinedIcon style={{ fontSize: "16px", color: "#686868" }} />
                        </div>
                      </div>
                    </td>
                  </tr>
                );
              })}
              </tbody>
            </table>
            <div
              className="flex items-center justify-between pagination"
              style={{ display: "flex" }}
            >
              {/* <div className="text-[#84818A] text-sm font-medium">
            Show <span>10</span> from {states.length} products
          </div> */}

              <Pagination
                count={Math.ceil(totalStates / 10)}
                page={currentPageS}
                onChange={handlePageChange}
              />
            </div>
          </div>
        </>
      )}

      {selectedTab === "District" && (
        <>
          <div className={"flex justify-between w-[564px] mt-[20px]"}>
            <h3 className={"text-[20px] font-bold"}>Districts</h3>
            <AddButton
              label={"Add District"}
              onClick={() => {
                setAddDistrict({ district: "", state: "" });
                setEditId("");
                setDistrictFormOpen(true);
              }}
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
              {districts.map((dis: any, index: any) => {
                return (
                  <tr key={index}>
                    <td>{dis.district}</td>
                    <td>
                      <div className={"flex justify-end"}>
                        <div
                          className="inline-flex border hover:border-[#FF6652] p-[7px] rounded-lg cursor-pointer"
                          onClick={() => editDistrict(dis)}>
                          <CreateOutlinedIcon style={{ fontSize: "16px", color: "#686868" }} />
                        </div>
                      </div>
                    </td>
                  </tr>
                );
              })}
              </tbody>
            </table>
            <div
              className="flex items-center justify-between pagination"
              style={{ display: "flex" }}
            >
              {/* <div className="text-[#84818A] text-sm font-medium">
            Show <span>10</span> from {states.length} products
          </div> */}

              <Pagination
                count={Math.ceil(totalDistricts / 10)}
                page={currentPageD}
                onChange={handlePageChangeD}
              />
            </div>
          </div>
        </>
      )}

      {selectedTab === "City" && (
        <>
          <div className={"flex justify-between w-[564px] mt-[20px]"}>
            <h3 className={"text-[20px] font-bold"}>Cities</h3>
            <AddButton
              label={"Add City"}
              onClick={() => {
                setAddCity({ city: "", state: "", district: "" });
                setEditId("");
                setCityFormOpen(true);
              }}
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
              {cities.map((city: any, index: any) => {
                return (
                  <tr>
                    <td>{city.city}</td>
                    <td>
                      <div className={"flex justify-end"}>
                        <div
                          className="inline-flex border hover:border-[#FF6652] p-[3px] rounded-lg cursor-pointer"
                          onClick={() => editCity(city)}>
                          <CreateOutlinedIcon style={{ fontSize: "16px", color: "#686868" }} />
                        </div>
                      </div>
                    </td>
                  </tr>
                );
              })}
              </tbody>
            </table>
            <div
              className="flex items-center justify-between pagination"
              style={{ display: "flex" }}
            >
              {/* <div className="text-[#84818A] text-sm font-medium">
            Show <span>10</span> from {states.length} products
          </div> */}
              <Pagination
                count={Math.ceil(totalCities / 10)}
                page={currentPageC}
                onChange={handlePageChangeC}
              />
            </div>
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
          <div className={"title"}>{editId ? "Update" : "Add"} State</div>

          <div>
            {/*<p className="fieldTitle">State Name</p>*/}
            <TextField
              variant="standard"
              value={addState.state}
              placeholder={"State Name"}
              onChange={(e) =>
                setAddState({ ...addState, state: e.target.value })
              }
              fullWidth={true}
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
              onClick={() => addStateData()}
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
          <div className={"title"}>{editId ? "Update" : "Add"} District</div>
          <div>
            <p className="fieldTitle">State</p>
            <Select
              label="Age"
              variant={"standard"}
              fullWidth={true}
              multiple={false}
              value={adddistrict.state}
              onChange={(e) =>
                setAddDistrict({ ...adddistrict, state: e.target.value })
              }
            >
              {AllStates.map((state: any, index: any) => {
                return <MenuItem value={state.id}>{state.state}</MenuItem>;
              })}
            </Select>
          </div>

          <div className={"mt-[30px]"}>
            {/*<p className="fieldTitle">District Name</p>*/}
            <TextField
              variant="standard"
              value={adddistrict.district}
              placeholder={"District Name"}
              onChange={(e) =>
                setAddDistrict({ ...adddistrict, district: e.target.value })
              }
              fullWidth={true}
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
              onClick={() => addDistrictData()}
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
          <div className={"title"}>{editId ? "Update" : "Add"} City</div>
          <div>
            <p className="fieldTitle">State</p>
            <Select
              label="Age"
              variant={"standard"}
              fullWidth={true}
              multiple={false}
              value={addCity.state}
              onChange={(e) =>
                setAddCity({ ...addCity, state: e.target.value })
              }
            >
              {AllStates.map((state: any, index: any) => {
                return <MenuItem key={index} value={state.id}>{state.state}</MenuItem>;
              })}
            </Select>
          </div>

          <div className={"mt-[30px]"}>
            <p className="fieldTitle">District</p>
            <Select
              label="Age"
              variant={"standard"}
              fullWidth={true}
              value={addCity.district}
              onChange={(e) =>
                setAddCity({ ...addCity, district: e.target.value })
              }
            >
              {AllDistricts.map((dis: any, index: any) => {
                return <MenuItem key={index} value={dis.id}>{dis.district}</MenuItem>;
              })}
            </Select>
          </div>

          <div className={"mt-[30px]"}>
            {/*<p className="fieldTitle">City Name</p>*/}
            <TextField
              variant="standard"
              placeholder={"City Name"}
              value={addCity.city}
              onChange={(e) => setAddCity({ ...addCity, city: e.target.value })}
              fullWidth={true}
            />
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
              onClick={() => addCityData()}
            />
          </div>
        </div>
      </Dialog>
    </>
  );
};

export { Locations };
