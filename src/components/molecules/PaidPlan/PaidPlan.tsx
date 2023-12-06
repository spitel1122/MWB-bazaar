import React from "react";
import { useKycFormStyles } from "@/static/stylesheets/molecules";
import {
  FormControl,
  Input,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
import LogoDelete from "@/static/icons/ic_delete.png";
import LogoEdit from "@/static/icons/ic_edit.png";
import { DesktopDatePicker } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AppService } from "@/service/AllApiData.service";
import { ActionButton } from "../../atoms/Button/ActionButton";

const PaidPlan = (props: any) => {
  const {
    AllBazaar,
    errors,
    setFieldValue,
    handleChange,
    values,
    handleSubmit,
  } = props;
  const classes = useKycFormStyles();
  const [AllState, setAllState] = React.useState([]);
  const [AllDis, setAllDis] = React.useState([]);
  const [AllCity, setAllCity] = React.useState([]);
  React.useEffect(() => {
    getAllLists();
  }, []);
  const getAllLists = async () => {
    const responseJson = await AppService.getAllStates();
    setAllState(responseJson.data.results);
  }, getAllDis = async (param: any) => {
    const responseJson = await AppService.getAllDistricByState(param);
    setAllDis(responseJson.data.results);
  }, getAllCity = async (param: any) => {
    const responseJson = await AppService.getAllCityByDis(param);
    setAllCity(responseJson.data.results);
  };


  return (
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <div className={classes.root}>
          <form onSubmit={handleSubmit}>
            <div className="field">
              <div className="bazaarField flex items-center gap-8 mt-6">
                <FormControl variant="standard" className="w-1/2">
                  <InputLabel htmlFor="firm_name">Name</InputLabel>
                  <Input
                      id="firm_name"
                      type="text"
                      name="firm_name"
                      required
                      error={!!errors.firm_name}
                      value={values.firm_name}
                      onChange={handleChange}
                  />
                </FormControl>
              </div>

              <div className="bazaarField flex items-center gap-8 mt-6">
                <FormControl variant="standard" className="w-1/2">
                  <DesktopDatePicker
                      label="Start Date"
                      inputFormat="MM/DD/YYYY"
                      value={values.start_date}
                      onChange={(e) => {
                        setFieldValue("start_date", e);
                      }}
                      renderInput={(params) => (
                          <TextField {...params} variant={"standard"} />
                      )}
                  />
                </FormControl>
                <div className="w-1/2">
                  <InputLabel id="start_time">Start Time</InputLabel>
                  <Select
                      label="Start Time"
                      labelId="start_time"
                      variant={"standard"}
                      fullWidth={true}
                      value={values.start_time}
                      onChange={(e) => {
                        setFieldValue("start_time", e.target.value);
                      }}
                      className="w-1/2"
                  >
                    <MenuItem value={"1 PM"}>1 PM</MenuItem>
                    <MenuItem value={"2 PM"}>2 PM</MenuItem>
                    <MenuItem value={"3 PM"}>3 PM</MenuItem>
                    <MenuItem value={"4 PM"}>4 PM</MenuItem>
                    <MenuItem value={"5 PM"}>5 PM</MenuItem>
                    <MenuItem value={"6 PM"}>6 PM</MenuItem>
                    <MenuItem value={"7 PM"}>7 PM</MenuItem>
                  </Select>
                </div>
              </div>

              <div className="bazaarField flex items-center gap-8 mt-6">
                <FormControl variant="standard" className="w-1/2">
                  <DesktopDatePicker
                      label="End Date"
                      inputFormat="MM/DD/YYYY"
                      value={values.end_date}
                      onChange={(e) => {
                        setFieldValue("end_date", e);
                      }}
                      renderInput={(params) => (
                          <TextField {...params} variant={"standard"} />
                      )}
                  />
                </FormControl>
                <div className="w-1/2">
                  <InputLabel id="end_time">End Time</InputLabel>
                  <Select
                      label="end time"
                      labelId="end_time"
                      variant={"standard"}
                      fullWidth={true}
                      value={values.end_time}
                      onChange={(e) => {
                        setFieldValue("end_time", e.target.value);
                      }}
                      className="w-1/2"
                  >
                    <MenuItem value={"1 PM"}>1 PM</MenuItem>
                    <MenuItem value={"2 PM"}>2 PM</MenuItem>
                    <MenuItem value={"3 PM"}>3 PM</MenuItem>
                    <MenuItem value={"4 PM"}>4 PM</MenuItem>
                    <MenuItem value={"5 PM"}>5 PM</MenuItem>
                    <MenuItem value={"6 PM"}>6 PM</MenuItem>
                    <MenuItem value={"7 PM"}>7 PM</MenuItem>
                  </Select>
                </div>
              </div>
              <div className="bazaarField flex items-center gap-8 mt-6">
                <FormControl variant="standard" className="w-1/2">
                  <InputLabel htmlFor="amount">Amount</InputLabel>
                  <Input
                      id="amount"
                      type="number"
                      name="amount"
                      required
                      error={!!errors.amount}
                      value={values.amount}
                      onChange={handleChange}
                  />
                </FormControl>
                <FormControl variant="standard" className="w-1/2">
                  <InputLabel htmlFor="branches">Branches</InputLabel>
                  <Input
                      id="branches"
                      type="number"
                      name="branches"
                      required
                      error={!!errors.branches}
                      value={values.branches}
                      onChange={handleChange}
                  />
                </FormControl>
              </div>
              <div className="bazaarField flex items-center gap-8 mt-6">
                <FormControl variant="standard" className="w-1/2">
                  <InputLabel htmlFor="amount">User per branch</InputLabel>
                  <Input
                      id="user_per_branch"
                      type="number"
                      name="user_per_branch"
                      required
                      error={!!errors.user_per_branch}
                      value={values.user_per_branch}
                      onChange={handleChange}
                  />
                </FormControl>
                <div className="w-1/2">
                  <InputLabel id="Bazaar">Bazaar</InputLabel>
                  <Select
                      label="bazaar"
                      labelId="bazaar"
                      variant={"standard"}
                      fullWidth={true}
                      value={values.bazaar}
                      onChange={(e) => {
                        setFieldValue("bazaar", e.target.value);
                      }}
                      className="w-1/2"
                  >
                    {AllBazaar.map((items: any) => (
                        <MenuItem key={items.id} value={items.id}>
                          {items.bazaar_name}
                        </MenuItem>
                    ))}
                  </Select>
                </div>
              </div>
              <div className="bazaarField flex items-center gap-8 mt-6">
                <div className="w-1/2">
                  <InputLabel id="start_time">State</InputLabel>
                  <Select
                      label="State"
                      variant={"standard"}
                      fullWidth={true}
                      name="state"
                      value={values.state}
                      onChange={(e) => {
                        handleChange(e);
                        getAllDis({ ids: e.target.value });
                      }}
                  >
                    {AllState.map((items: any) => (
                        <MenuItem key={items.id} value={items.id}>
                          {items.state}
                        </MenuItem>
                    ))}
                  </Select>
                </div>
                {values.state && AllDis.length ? (
                    <div className="w-1/2">
                      <InputLabel id="start_time">District</InputLabel>
                      <Select
                          label="District"
                          variant={"standard"}
                          fullWidth={true}
                          multiple={false}
                          name="district"
                          value={values.district}
                          onChange={(e) => {
                            handleChange(e);
                            getAllCity({ ids: e.target.value });
                          }}
                      >
                        {AllDis.map((items: any) => {
                          return items?.district.map((item: any) => {
                            return (
                                <MenuItem value={item.id}>{item.district}</MenuItem>
                            );
                          });
                        })}
                      </Select>
                    </div>
                ) : null}
                {values.district && AllCity.length ? (
                    <div className="w-1/2">
                      <InputLabel id="start_time">City</InputLabel>
                      <Select
                          label="City"
                          variant={"standard"}
                          fullWidth={true}
                          multiple={false}
                          name="city"
                          value={values.city}
                          onChange={(e) => {
                            handleChange(e);
                          }}
                      >
                        {AllCity.map((items: any) => {
                          return items?.city.map((item: any) => {
                            return <MenuItem value={item.id}>{item.city}</MenuItem>;
                          });
                        })}
                      </Select>
                    </div>
                ) : null}
              </div>
            </div>

            <div className="mt-[30px] items-center">
              <p className="text-[#4E2FA9] font-bold text-[20px]	">
                Plan Features
              </p>
            </div>

            <div className="docContainer flex gap-4">
              <div>
                <TextField
                    id="outlined-basic"
                    label="Outlined"
                    variant="outlined"
                />
              </div>

              <div className="ActionLogo">
                <img src={LogoDelete} alt={"Logo"} />
                <div className="divider"></div>
                <img src={LogoEdit} alt={"Logo"} />
              </div>
            </div>

            <div className="docContainer flex gap-4">
              <div>
                <TextField
                    id="outlined-basic"
                    label="Outlined"
                    variant="outlined"
                />
              </div>

              <div className="ActionLogo">
                <img src={LogoDelete} alt={"Logo"} />
                <div className="divider"></div>
                <img src={LogoEdit} alt={"Logo"} />
              </div>
            </div>
            <div className="mt=[10px] mb-[10px]">
              <div className="border-2 border-dashed border-[#5542F6] w-[250px] p-[10px] items-center text-center rounded-lg cursor-pointer">
                <p>+ Add More</p>
              </div>
            </div>
            <div className="flex gap-5 pt-[10px] pb-[40px]">
              <ActionButton title="Cancel" variant="primary" />
              <button type="submit">Submit</button>
            </div>
          </form>
        </div>
      </LocalizationProvider>
  );
};

export { PaidPlan };
