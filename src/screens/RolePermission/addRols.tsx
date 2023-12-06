import React, { useState } from "react";
import { DashboardLayout } from "@/components/layouts";
import { RoleSection } from "@/components/molecules/rulespermission/roleSection";
import { useNavigate } from "react-router-dom";
import { Box, Checkbox, FormControlLabel, FormGroup, TextField, Typography } from "@mui/material";
import arrow from '@/static/svg/ic_arrow.svg';
import { ActionButton } from "@/components/atoms/Button/ActionButton";
import { BiChevronLeft } from 'react-icons/bi';
const AddRols = () => {
  const navigate = useNavigate();

  return (
    <DashboardLayout>
      {/* <Box className="w-full addRole">
          <Box className="breadCrumb"> <img src={arrow} alt="left arrow" /> <span>Create New Role</span></Box>
          <Box className="role">
            <TextField id="standard-basic" label="Role Name" variant="standard" className=" w-[300px]" />
          </Box>
          <Typography className="title pt-8">Permissions  Group Title</Typography>
          <Typography className="para">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</Typography>
          <FormGroup>
              <FormControlLabel control={<Checkbox defaultChecked />} label="Permission Name" className="checkbox-addrole"/>
              <span className="pera-text">A short description of the permissions will be displayed here</span>
          </FormGroup>
          <FormGroup>
              <FormControlLabel control={<Checkbox />} label="Permission Name" className="checkbox-addrole"/>
              <span className="pera-text">A short description of the permissions will be displayed here</span>
          </FormGroup>
          <FormGroup>
              <FormControlLabel control={<Checkbox defaultChecked />} label="Permission Name" className="checkbox-addrole"/>
              <span className="pera-text">A short description of the permissions will be displayed here</span>
          </FormGroup>
          <Typography className="title pt-8">Permissions  Group Title</Typography>
          <Typography className="para">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</Typography>
          <FormGroup>
              <FormControlLabel control={<Checkbox defaultChecked />} label="Permission Name" className="checkbox-addrole"/>
              <span className="pera-text">A short description of the permissions will be displayed here</span>
          </FormGroup>
          <Box className="pt-8 flex items-center gap-5">
            <ActionButton variant="default" title="Cancel" />
            <ActionButton variant="primary" title="Save" />  
          </Box>                
      </Box> */}
      <div className="w-[604px]">
        <div className="w-full py-[20px]">
          <div className='container'>
            <div className='flex items-center gap-[24px]'>
              <button className='text-[#84818A] text-[24px]' onClick={() => { navigate('/rolespermissions') }}><BiChevronLeft /></button>
              <div className="text-[#2e2c34] leading-[20px] text-[24px] font-[600] font-[Manrope]">Create New Role</div>
            </div>
            <div className="mt-[54px] mb-[37px]">
              <div>
                <label className='text-[14px] font-[Manrope] font-[500] text-[#84818A]'>Role Name</label>
                <input type="text" className='border-b block border-[#EBEAED] w-[288px] text-[14px] font-[Manrope] font-[500] text-[#2E2C34] outline-none' />
              </div>
            </div>
            <div className="mb-[26px]">
              <p className="text-[16px] font-[Manrope] font-[600] text-[#2E2C34]">Permissions Group Title</p>
              <p className="text-[14px] font-[Manrope] font-[500] text-[#84818A]">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
            </div>
            <div className="flex gap-[15px] mb-[26px]">
              <div className="my-[5px]">
                <input type="checkbox" defaultChecked className="accent-[#4E2FA9] w-[18px] h-[18px]" />
              </div>
              <div>
                <p className="text-[14px] font-[Manrope] font-[600] text-[#2E2C34]">Permission Name</p>
                <p className="text-[14px] font-[Manrope] font-[500] text-[#84818A]">A short description of the permissions will be displayed here</p>
              </div>
            </div>
            <div className="flex gap-[15px] mb-[26px]">
              <div className="my-[5px]">
                <input type="checkbox" className="accent-[#4E2FA9] w-[18px] h-[18px]" />
              </div>
              <div>
                <p className="text-[14px] font-[Manrope] font-[600] text-[#2E2C34]">Permission Name</p>
                <p className="text-[14px] font-[Manrope] font-[500] text-[#84818A]">A short description of the permissions will be displayed here</p>
              </div>
            </div>
            <div className="flex gap-[15px] mb-[26px]">
              <div className="my-[5px]">
                <input type="checkbox" defaultChecked className="accent-[#4E2FA9] w-[18px] h-[18px]" />
              </div>
              <div>
                <p className="text-[14px] font-[Manrope] font-[600] text-[#2E2C34]">Permission Name</p>
                <p className="text-[14px] font-[Manrope] font-[500] text-[#84818A]">A short description of the permissions will be displayed here</p>
              </div>
            </div>
            <div className="flex gap-[15px] mb-[34px]">
              <div className="my-[5px]">
                <input type="checkbox" className="accent-[#4E2FA9] w-[18px] h-[18px]" />
              </div>
              <div>
                <p className="text-[14px] font-[Manrope] font-[600] text-[#2E2C34]">Permission Name</p>
                <p className="text-[14px] font-[Manrope] font-[500] text-[#84818A]">A short description of the permissions will be displayed here</p>
              </div>
            </div>
            <div className="mb-[26px]">
              <p className="text-[16px] font-[Manrope] font-[600] text-[#2E2C34]">Permissions Group Title</p>
              <p className="text-[14px] font-[Manrope] font-[500] text-[#84818A]">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
            </div>
            <div className="flex gap-[15px] mb-[34px]">
              <div className="my-[5px]">
                <input type="checkbox" defaultChecked className="accent-[#4E2FA9] w-[18px] h-[18px]" />
              </div>
              <div>
                <p className="text-[14px] font-[Manrope] font-[600] text-[#2E2C34]">Permission Name</p>
                <p className="text-[14px] font-[Manrope] font-[500] text-[#84818A]">A short description of the permissions will be displayed here</p>
              </div>
            </div>
            <div className="pt-8 flex items-center gap-5">
              <ActionButton variant="default" title="Cancel" />
              <ActionButton variant="primary" title="Save" />
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default AddRols;
