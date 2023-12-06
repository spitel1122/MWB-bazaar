import React, { useState } from "react";
import { DashboardLayout } from "@/components/layouts";
import { RoleSection } from "@/components/molecules/rulespermission/roleSection";
import { useNavigate } from "react-router-dom";
import { Box, Checkbox, Dialog, DialogActions, DialogContent, DialogTitle, FormControlLabel, FormGroup, Grid, InputAdornment, MenuItem, Pagination, Paper, Stack, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField, Typography } from "@mui/material";
import dots from '@/static/icons/dots-1.svg';
import setting from '@/static/svg/setting.svg';
import { ActionButton } from "@/components/atoms/Button/ActionButton";
import { LocalizationProvider, DesktopDatePicker } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import SettingsIcon from '@mui/icons-material/Settings';
import MoreVertIcon from '@mui/icons-material/MoreVert';

const RolesPermission = () => {
  const navigate = useNavigate();
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  return (
    <DashboardLayout sectionName="roles_premission_section">
      <Box className="w-full px-[49px] mb-[50px] min-h-[calc(100vh_-_195px)]">
        <RoleSection />
        <div className="mt-[35px]">
          <table className="w-full text-left">
            <thead>
              <tr>
                <th className="text-[#84818A] text-[14px] font-[600] font-[Manrope] pb-[11px]">Name</th>
                <th className="text-[#84818A] text-[14px] font-[600] font-[Manrope] pb-[11px]">Status</th>
                <th className="text-[#84818A] text-[14px] font-[600] font-[Manrope] pb-[11px]">Role Type</th>
                <th className="text-[#84818A] text-[14px] font-[600] font-[Manrope] pb-[11px]">Members</th>
                <th className="text-[#84818A] text-[14px] font-[600] font-[Manrope] pb-[11px]">Permissions</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b border-[#EBEAED]">
                <td className="py-[17px]">
                  <p className="text-[#2E2C34] text-[14px] font-[500] font-[Manrope]">Super Admin</p>
                </td>
                <td className="py-[17px]">
                  <p className="text-[#2E2C34] text-[14px] font-[500] font-[Manrope]">Active</p>
                </td>
                <td className="py-[17px]">
                  <p className="text-[#2E2C34] text-[14px] font-[500] font-[Manrope]">Default</p>
                </td>
                <td className="py-[17px]">
                  <p className="text-[#2E2C34] text-[14px] font-[500] font-[Manrope]">1</p>
                </td>
                <td className="py-[17px]">
                  <div className="flex justify-between items-center">
                    <button className="text-[#E1E1E1] flex items-center gap-[5px] text-[14px] font-[600] font-[Manrope]" disabled onClick={handleClickOpen}>
                      <SettingsIcon fontSize="small" />
                      <span>Modify</span>
                    </button>
                    <button className="text-[#84818A]"><MoreVertIcon /></button>
                  </div>
                </td>
              </tr>
              <tr className="border-b border-[#EBEAED]">
                <td className="py-[17px]">
                  <p className="text-[#2E2C34] text-[14px] font-[500] font-[Manrope]">National Manager</p>
                </td>
                <td className="py-[17px]">
                  <p className="text-[#2E2C34] text-[14px] font-[500] font-[Manrope]">Active</p>
                </td>
                <td className="py-[17px]">
                  <p className="text-[#2E2C34] text-[14px] font-[500] font-[Manrope]">Default</p>
                </td>
                <td className="py-[17px]">
                  <p className="text-[#2E2C34] text-[14px] font-[500] font-[Manrope]">1</p>
                </td>
                <td className="py-[17px]">
                  <div className="flex justify-between items-center">
                    <button className="text-[#4E2FA9] flex items-center gap-[5px] text-[14px] font-[600] font-[Manrope]" onClick={handleClickOpen}>
                      <SettingsIcon fontSize="small" />
                      <span>Modify</span>
                    </button>
                    <button className="text-[#84818A]"><MoreVertIcon /></button>
                  </div>
                </td>
              </tr>
              <tr className="border-b border-[#EBEAED]">
                <td className="py-[17px]">
                  <p className="text-[#2E2C34] text-[14px] font-[500] font-[Manrope]">Zonal Manager</p>
                </td>
                <td className="py-[17px]">
                  <p className="text-[#2E2C34] text-[14px] font-[500] font-[Manrope]">Active</p>
                </td>
                <td className="py-[17px]">
                  <p className="text-[#2E2C34] text-[14px] font-[500] font-[Manrope]">Default</p>
                </td>
                <td className="py-[17px]">
                  <p className="text-[#2E2C34] text-[14px] font-[500] font-[Manrope]">6</p>
                </td>
                <td className="py-[17px]">
                  <div className="flex justify-between items-center">
                    <button className="text-[#4E2FA9] flex items-center gap-[5px] text-[14px] font-[600] font-[Manrope]" onClick={handleClickOpen}>
                      <SettingsIcon fontSize="small" />
                      <span>Modify</span>
                    </button>
                    <button className="text-[#84818A]"><MoreVertIcon /></button>
                  </div>
                </td>
              </tr>
              <tr className="border-b border-[#EBEAED]">
                <td className="py-[17px]">
                  <p className="text-[#2E2C34] text-[14px] font-[500] font-[Manrope]">Regional Manager</p>
                </td>
                <td className="py-[17px]">
                  <p className="text-[#2E2C34] text-[14px] font-[500] font-[Manrope]">Active</p>
                </td>
                <td className="py-[17px]">
                  <p className="text-[#2E2C34] text-[14px] font-[500] font-[Manrope]">Default</p>
                </td>
                <td className="py-[17px]">
                  <p className="text-[#2E2C34] text-[14px] font-[500] font-[Manrope]">56</p>
                </td>
                <td className="py-[17px]">
                  <div className="flex justify-between items-center">
                    <button className="text-[#4E2FA9] flex items-center gap-[5px] text-[14px] font-[600] font-[Manrope]" onClick={handleClickOpen}>
                      <SettingsIcon fontSize="small" />
                      <span>Modify</span>
                    </button>
                    <button className="text-[#84818A]"><MoreVertIcon /></button>
                  </div>
                </td>
              </tr>
              <tr className="border-b border-[#EBEAED]">
                <td className="py-[17px]">
                  <p className="text-[#2E2C34] text-[14px] font-[500] font-[Manrope]">Territory Manager</p>
                </td>
                <td className="py-[17px]">
                  <p className="text-[#2E2C34] text-[14px] font-[500] font-[Manrope]">Active</p>
                </td>
                <td className="py-[17px]">
                  <p className="text-[#2E2C34] text-[14px] font-[500] font-[Manrope]">Default</p>
                </td>
                <td className="py-[17px]">
                  <p className="text-[#2E2C34] text-[14px] font-[500] font-[Manrope]">34</p>
                </td>
                <td className="py-[17px]">
                  <div className="flex justify-between items-center">
                    <button className="text-[#4E2FA9] flex items-center gap-[5px] text-[14px] font-[600] font-[Manrope]" onClick={handleClickOpen}>
                      <SettingsIcon fontSize="small" />
                      <span>Modify</span>
                    </button>
                    <button className="text-[#84818A]"><MoreVertIcon /></button>
                  </div>
                </td>
              </tr>
              <tr className="border-b border-[#EBEAED]">
                <td className="py-[17px]">
                  <p className="text-[#2E2C34] text-[14px] font-[500] font-[Manrope]">Area Sales Manager</p>
                </td>
                <td className="py-[17px]">
                  <p className="text-[#2E2C34] text-[14px] font-[500] font-[Manrope]">Active</p>
                </td>
                <td className="py-[17px]">
                  <p className="text-[#2E2C34] text-[14px] font-[500] font-[Manrope]">Default</p>
                </td>
                <td className="py-[17px]">
                  <p className="text-[#2E2C34] text-[14px] font-[500] font-[Manrope]">146</p>
                </td>
                <td className="py-[17px]">
                  <div className="flex justify-between items-center">
                    <button className="text-[#4E2FA9] flex items-center gap-[5px] text-[14px] font-[600] font-[Manrope]" onClick={handleClickOpen}>
                      <SettingsIcon fontSize="small" />
                      <span>Modify</span>
                    </button>
                    <button className="text-[#84818A]"><MoreVertIcon /></button>
                  </div>
                </td>
              </tr>
              <tr className="border-b border-[#EBEAED]">
                <td className="py-[17px]">
                  <p className="text-[#2E2C34] text-[14px] font-[500] font-[Manrope]">Salesman</p>
                </td>
                <td className="py-[17px]">
                  <p className="text-[#2E2C34] text-[14px] font-[500] font-[Manrope]">Active</p>
                </td>
                <td className="py-[17px]">
                  <p className="text-[#2E2C34] text-[14px] font-[500] font-[Manrope]">Default</p>
                </td>
                <td className="py-[17px]">
                  <p className="text-[#2E2C34] text-[14px] font-[500] font-[Manrope]">2346</p>
                </td>
                <td className="py-[17px]">
                  <div className="flex justify-between items-center">
                    <button className="text-[#4E2FA9] flex items-center gap-[5px] text-[14px] font-[600] font-[Manrope]" onClick={handleClickOpen}>
                      <SettingsIcon fontSize="small" />
                      <span>Modify</span>
                    </button>
                    <button className="text-[#84818A]"><MoreVertIcon /></button>
                  </div>
                </td>
              </tr>
              <tr className="border-b border-[#EBEAED]">
                <td className="py-[17px]">
                  <p className="text-[#2E2C34] text-[14px] font-[500] font-[Manrope]">Agent</p>
                </td>
                <td className="py-[17px]">
                  <p className="text-[#2E2C34] text-[14px] font-[500] font-[Manrope]">Active</p>
                </td>
                <td className="py-[17px]">
                  <p className="text-[#2E2C34] text-[14px] font-[500] font-[Manrope]">Default</p>
                </td>
                <td className="py-[17px]">
                  <p className="text-[#2E2C34] text-[14px] font-[500] font-[Manrope]">1234</p>
                </td>
                <td className="py-[17px]">
                  <div className="flex justify-between items-center">
                    <button className="text-[#4E2FA9] flex items-center gap-[5px] text-[14px] font-[600] font-[Manrope]" onClick={handleClickOpen}>
                      <SettingsIcon fontSize="small" />
                      <span>Modify</span>
                    </button>
                    <button className="text-[#84818A]"><MoreVertIcon /></button>
                  </div>
                </td>
              </tr>
              <tr className="border-b border-[#EBEAED]">
                <td className="py-[17px]">
                  <p className="text-[#2E2C34] text-[14px] font-[500] font-[Manrope]">Sales Admin</p>
                </td>
                <td className="py-[17px]">
                  <p className="text-[#2E2C34] text-[14px] font-[500] font-[Manrope]">Inactive</p>
                </td>
                <td className="py-[17px]">
                  <p className="text-[#2E2C34] text-[14px] font-[500] font-[Manrope]">Custom</p>
                </td>
                <td className="py-[17px]">
                  <p className="text-[#2E2C34] text-[14px] font-[500] font-[Manrope]">0</p>
                </td>
                <td className="py-[17px]">
                  <div className="flex justify-between items-center">
                    <button className="text-[#4E2FA9] flex items-center gap-[5px] text-[14px] font-[600] font-[Manrope]" onClick={handleClickOpen}>
                      <SettingsIcon fontSize="small" />
                      <span>Modify</span>
                    </button>
                    <button className="text-[#84818A]"><MoreVertIcon /></button>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <div>
          <Dialog open={open} PaperProps={{
            style: { borderRadius: 20, boxShadow: 'none', padding: '20px 45px' }
          }} onClose={handleClose} aria-labelledby="alert-dialog-title" aria-describedby="alert-dialog-description" className="addRole">
            <DialogTitle id="alert-dialog-title">
              <span className="text-[#2E2C34] text-[24px] font-[Manrope] leading-5 font-semibold">Zonal Manager -</span> <span className="text-[#84818A] font-normal text-[24px] font-[Manrope] leading-5 ">Modify Permissions</span>
            </DialogTitle>
            <DialogContent className="!pt-[10px]">
              <Typography className="title !font-[Manrope]">Permissions  Group Title</Typography>
              <Typography className="para !font-[Manrope]">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</Typography>
              <FormGroup>
                <FormControlLabel control={<Checkbox defaultChecked sx={{
                  color: '#84818A',
                  '&.Mui-checked': {
                    color: '#4e2fa9',
                  },
                }} />} label={<p className="!font-[Manrope] font-[600] text-[14px] text-[#2E2C34]">Permission Name</p>} className="checkbox-addrole" />
                <span className="pera-text !font-[Manrope]">A short description of the permissions will be displayed here</span>
              </FormGroup>
              <FormGroup>
                <FormControlLabel control={<Checkbox sx={{
                  color: '#84818A',
                  '&.Mui-checked': {
                    color: '#4e2fa9',
                  },
                }} />} label={<p className="!font-[Manrope] font-[600] text-[14px] text-[#2E2C34]">Permission Name</p>} className="checkbox-addrole" />
                <span className="pera-text !font-[Manrope]">A short description of the permissions will be displayed here</span>
              </FormGroup>
              <FormGroup>
                <FormControlLabel control={<Checkbox defaultChecked sx={{
                  color: '#84818A',
                  '&.Mui-checked': {
                    color: '#4e2fa9',
                  },
                }} />} label={<p className="!font-[Manrope] font-[600] text-[14px] text-[#2E2C34]">Permission Name</p>} className="checkbox-addrole" />
                <span className="pera-text !font-[Manrope]">A short description of the permissions will be displayed here</span>
              </FormGroup>
              <Typography className="title pt-8 !font-[Manrope] !font-[600]">Permissions  Group Title</Typography>
              <Typography className="para !font-[Manrope]">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</Typography>
              <FormGroup>
                <FormControlLabel control={<Checkbox defaultChecked sx={{
                  color: '#84818A',
                  '&.Mui-checked': {
                    color: '#4e2fa9',
                  },
                }} />} label={<p className="!font-[Manrope] font-[600] text-[14px] text-[#2E2C34]">Permission Name</p>} className="checkbox-addrole" />
                <span className="pera-text !font-[Manrope]">A short description of the permissions will be displayed here</span>
              </FormGroup>
            </DialogContent>
            <Box className="divider"></Box>
            <DialogActions>
              <ActionButton onClick={handleClose} variant="default" title="Cancel" />
              <ActionButton onClick={handleClose} variant="primary" title="Save Changes" />
            </DialogActions>
          </Dialog>
        </div>
      </Box>
      <div className="w-full h-[60px] bg-white" style={{ boxShadow: '0px -1px 10px rgba(0, 0, 0, 0.1)' }}>
          <div className="flex justify-between items-center w-full h-full px-[39px]">
            <p className="text-[#84818A] font-[Manrope] text-[12px] font-[600]">Show 8 from 120 products</p>
            <div>
              <Stack spacing={2}>
                <Pagination count={10} sx={{
                  '& .MuiPaginationItem-root': {
                    color: '#84818A',
                    fontFamily: 'Manrope',
                    fontSize: '12px',
                    fontWeight: 600
                  },
                  '& .Mui-selected': {
                    backgroundColor: 'rgba(85, 66, 246, 0.1) !important',
                    color: 'rgba(85, 66, 246, 1)'
                  }
                }} shape="rounded" />
              </Stack>
            </div>
          </div>
        </div>
    </DashboardLayout>
  );
};

export default RolesPermission;
