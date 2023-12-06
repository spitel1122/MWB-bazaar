import { Box, Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, InputAdornment, MenuItem, Stack, TextField } from "@mui/material";
import React, { useState } from "react";
import { Form, Link, useNavigate } from "react-router-dom";
import pdf from '@/static/icons/pdf.svg';
import excel from '@/static/icons/excel.svg';
import plus from '@/static/icons/plus.svg';
import { Typography } from "@material-tailwind/react";
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker';
import dayjs, { Dayjs } from "dayjs";
import { ActionButton } from "@/components/atoms/Button/ActionButton";

const HeaderSection = () => {
  const navigate = useNavigate();
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  const [value, setValue] = React.useState<Dayjs | null>(
    dayjs('2014-08-18T21:11:54'),
  );

  const handleChange = (newValue: Dayjs | null) => {
    setValue(newValue);
  };

  return (
    <Box className="flex items-center justify-between">
      <Box className="flex items-center gap-6">
        <a className="text-sm font-semibold text-[#2E2C34] pb-3 px-3 border-b-[2px] border-[#5542F6] inline-block" onClick={() => navigate("/rolepermission")}>Users</a>
        <a className="text-sm font-normal text-[#84818A] pb-3 px-3 inline-block border-b-[2px] border-transparent" onClick={() => navigate("/rolespermissions")}>Roles and Permissions</a>
      </Box>
      <Box className="flex items-center gap-[10px]">
        <a className="pdf-link"> <img src={pdf} alt="PDF" /> Export to PDF</a>
        <a className="excel-link"> <img src={excel} alt="pdf" /> Export to Excel</a>

        <div className="inline-block">
          <a className="add-rules" onClick={handleClickOpen}><img src={plus} alt="Plus" /> Add New User</a>
          <Dialog PaperProps={{
            style: { borderRadius: 20, boxShadow: 'none',padding:0}
          }} open={open} onClose={handleClose} aria-labelledby="alert-dialog-title" aria-describedby="alert-dialog-description" className="rolePOPUP">
            <DialogTitle id="alert-dialog-title" className="!text-[#2E2C34] !px-[45px] !text-[24px] !font-[Manrope] !font-[600]">
              {"Add New User"}
            </DialogTitle>
            <DialogContent className="border-b border-[#EBEAED] !px-[45px]">
              <Typography className="form-name">General Details</Typography>
              <form>
                {/* <Box className="flex items-center gap-[32px] mt-4 w-full">
                  <TextField id="standard-basic" label="First Name" variant="standard" className=" w-full" />
                  <TextField id="standard-basic" label="Last Name" variant="standard" className=" w-full" />
                </Box>
                <Box className="flex items-end gap-[32px] mt-4 w-full">
                  <TextField id="standard-basic" label="Email ID" variant="standard" className=" w-full" />
                  <TextField className=" w-full" id="filled-start-adornment" InputProps={{ startAdornment: <InputAdornment position="start">kg</InputAdornment>, }} variant="standard" />
                </Box> */}
                <div className="flex items-center gap-[32px] mt-[29px]">
                  <div>
                    <label className='text-[14px] font-[Manrope] font-[500] text-[#84818A]'>First Name</label>
                    <input type="text" className='border-b block border-[#EBEAED] w-[244px] text-[14px] font-[Manrope] font-[500] text-[#2E2C34] outline-none' />
                  </div>
                  <div>
                    <label className='text-[14px] font-[Manrope] font-[500] text-[#84818A]'>Last Name</label>
                    <input type="text" className='border-b block border-[#EBEAED] w-[244px] text-[14px] font-[Manrope] font-[500] text-[#2E2C34] outline-none' />
                  </div>
                </div>
                <div className="flex items-end gap-[32px] mt-[29px]">
                  <div>
                    <label className='text-[14px] font-[Manrope] font-[500] text-[#84818A]'>Email ID</label>
                    <input type="text" className='border-b block border-[#EBEAED] w-[244px] text-[14px] font-[Manrope] font-[500] text-[#2E2C34] outline-none' />
                  </div>
                  <div className="w-[244px] border-b border-[#EBEAED]">
                    <select id="" className="inline-block text-[14px] font-[Manrope] font-[500] text-[#2E2C34] outline-none">
                      <option value="+91" className="text-[14px] font-[Manrope] font-[500] text-[#2E2C34]">+91</option>
                    </select>
                    <input type="text" placeholder="Phone number" className='inline-block indent-1 placeholder:text-[#84818A] text-[14px] font-[Manrope] font-[500] text-[#2E2C34] outline-none' />
                  </div>
                </div>
                <div className="flex items-center gap-[32px] mt-[29px]">
                  <div>
                    <label className='text-[14px] font-[Manrope] font-[500] text-[#84818A]'>Gender</label>
                    <select id="" className="border-b block border-[#EBEAED] w-[244px] text-[14px] font-[Manrope] font-[500] text-[#2E2C34] outline-none">
                      <option value="male" className="text-[14px] font-[Manrope] font-[500] text-[#2E2C34]">male</option>
                    </select>
                  </div>
                  <div>
                    <label className='text-[14px] font-[Manrope] font-[500] text-[#84818A]'>Date of birth</label>
                    <input type="date" className='border-b block border-[#EBEAED] w-[244px] text-[14px] font-[Manrope] font-[500] text-[#2E2C34] outline-none' />
                  </div>
                </div>
                {/* <Box className="flex items-end gap-[32px] mt-6 w-full">
                  <TextField className="w-full max-w-[244px]" id="standard-select-currency" select label="Select" defaultValue="EUR" variant="standard" >
                    <MenuItem> Male</MenuItem>
                    <MenuItem> Female</MenuItem>
                  </TextField>
                  <LocalizationProvider dateAdapter={AdapterDayjs} className="w-full">
                    <Stack>
                      <DesktopDatePicker
                        label="Date desktop"
                        inputFormat="MM/DD/YYYY"
                        value={value}
                        onChange={handleChange}
                        renderInput={(params) => <TextField variant="standard" {...params} />} />
                    </Stack>
                  </LocalizationProvider>
                </Box> */}
                <Box className="flex justify-between items-center mt-10">
                  <Typography className="text-[#4E2FA9] text-[16px] font-[Manrope] font-semibold">Role and Regions</Typography>
                  <Typography className="text-[#FF6652] text-[16px] font-[Manrope] font-semibold underline">Add New Role</Typography>
                </Box>
                {/* <Box className="flex items-end gap-4 mt-6 w-full">
                  <TextField className="w-full max-w-[207px]" id="standard-select-currency" select label="Role" defaultValue="Area Sales Manager" variant="standard" >
                    <MenuItem> Area Sales Manager</MenuItem>
                    <MenuItem> Area Sales Manager 2</MenuItem>
                  </TextField>
                  <TextField className="w-full max-w-[207px]" id="standard-select-currency" select label="Select Zonal Manager" defaultValue="Manager" variant="standard" >
                    <MenuItem> Select Zonal Manager</MenuItem>
                    <MenuItem> Select Zonal Manager4</MenuItem>
                  </TextField>
                </Box> */}
                <div className="flex items-center gap-[32px] mt-[29px]">
                  <div>
                    <label className='text-[14px] font-[Manrope] font-[500] text-[#84818A]'>Role</label>
                    <select id="" className="border-b block border-[#EBEAED] w-[244px] text-[14px] font-[Manrope] font-[500] text-[#2E2C34] outline-none">
                      <option value="Area Sales Manager" className="text-[14px] font-[Manrope] font-[500] text-[#2E2C34]">Area Sales Manager</option>
                    </select>
                  </div>
                  <div>
                    <label className='text-[14px] font-[Manrope] font-[500] text-[#84818A]'>Select Zonal Manager</label>
                    <select id="" className="border-b block border-[#EBEAED] w-[244px] text-[14px] font-[Manrope] font-[500] text-[#2E2C34] outline-none">
                      <option value="" className="text-[14px] font-[Manrope] font-[500] text-[#2E2C34]">Select</option>
                    </select>
                  </div>
                </div>
                <div className="flex items-center gap-[32px] mt-[29px]">
                  <div>
                    <label className='text-[14px] font-[Manrope] font-[500] text-[#84818A]'>District</label>
                    <select id="" className="border-b block border-[#EBEAED] w-[244px] text-[14px] font-[Manrope] font-[500] text-[#2E2C34] outline-none">
                      <option value="Gautam Buddh Nagar- Vishal Kumar" className="text-[14px] font-[Manrope] font-[500] text-[#2E2C34]">Gautam Buddh Nagar- Vishal Kumar</option>
                    </select>
                  </div>
                  <div>
                    <label className='text-[14px] font-[Manrope] font-[500] text-[#84818A]'>City</label>
                    <select id="" className="border-b block border-[#EBEAED] w-[244px] text-[14px] font-[Manrope] font-[500] text-[#2E2C34] outline-none">
                      <option value="male" className="text-[14px] font-[Manrope] font-[500] text-[#2E2C34]">Greater Noida- Varsha Yadav</option>
                    </select>
                  </div>
                </div>
                <div className="flex items-center gap-[32px] mt-[29px]">
                  <div>
                    <label className='text-[14px] font-[Manrope] font-[500] text-[#84818A]'>Area</label>
                    <select id="" className="border-b block border-[#EBEAED] w-[244px] text-[14px] font-[Manrope] font-[500] text-[#2E2C34] outline-none">
                      <option value="Gaur City" className="text-[14px] font-[Manrope] font-[500] text-[#2E2C34]">Gaur City</option>
                    </select>
                  </div>
                </div>
                {/* <Box className="flex items-end gap-4 mt-6 w-full">
                  <TextField className="w-full max-w-[207px]" id="standard-select-currency" select label="District" defaultValue="EUR" variant="standard" >
                    <MenuItem> District</MenuItem>
                    <MenuItem> District</MenuItem>
                  </TextField>
                  <TextField className="w-full max-w-[207px]" id="standard-select-currency" select label="Select" defaultValue="EUR" variant="standard" >
                    <MenuItem> Male</MenuItem>
                    <MenuItem> Female</MenuItem>
                  </TextField>
                </Box>
                <Box className="flex items-end gap-4 mt-6 w-full">
                  <TextField className="w-full max-w-[207px]" id="standard-select-currency" select label="Select" defaultValue="EUR" variant="standard" >
                    <MenuItem> Male</MenuItem>
                    <MenuItem> Female</MenuItem>
                  </TextField>
                </Box> */}
              </form>
            </DialogContent>
            <DialogActions className="!my-[20px] !mx-[20px] items-center gap-[12px] flex !justify-start">
              <ActionButton onClick={handleClose} variant="default" title="Cancel" />
              <ActionButton onClick={handleClose} variant="primary" title="Save Changes" />
            </DialogActions>
          </Dialog>
        </div>
      </Box>
    </Box>
  );
};

export { HeaderSection };
