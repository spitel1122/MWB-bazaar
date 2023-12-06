import React, { useState } from "react";
import { DashboardLayout } from "@/components/layouts";
import { HeaderSection } from "@/components/molecules/rulespermission/section";
import { useNavigate } from "react-router-dom";
import {
  Box
} from "@mui/material";
import UserProfile from "@/static/images/User-profile.png";
import LocalPhoneIcon from '@mui/icons-material/LocalPhone';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';

const RolePermission = () => {
  const navigate = useNavigate();
  return (
    <DashboardLayout sectionName="roles_premission_section">
      <Box className="w-full px-[49px] mb-[50px] min-h-[calc(100vh_-_195px)]">
        <HeaderSection />
        <div className="mt-[35px]">
          <table className="w-full text-left">
            <thead className="border-b border-[#EBEAED]">
              <tr>
                <th className="text-[#84818A] text-[14px] font-[600] font-[Manrope] px-[20px] pb-[11px]">ID</th>
                <th className="text-[#84818A] text-[14px] font-[600] font-[Manrope] px-[20px] pb-[11px]">Name</th>
                <th className="text-[#84818A] text-[14px] font-[600] font-[Manrope] px-[20px] pb-[11px]">Role</th>
                <th className="text-[#84818A] text-[14px] font-[600] font-[Manrope] px-[20px] pb-[11px]">State</th>
                <th className="text-[#84818A] text-[14px] font-[600] font-[Manrope] px-[20px] pb-[11px]">Phone number</th>
                <th className="text-[#84818A] text-[14px] font-[600] font-[Manrope] px-[20px] pb-[11px]">Status</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b border-[#EBEAED]">
                <td className="py-[22px] px-[20px]">
                  <p className="text-[#2E2C34] text-[14px] font-[500] font-[Manrope]">ADM221-10</p>
                </td>
                <td className="py-[22px] px-[20px]">
                  <div className="flex gap-[10px] items-center">
                    <div className="w-[34px] h-[34px] rounded-full">
                      <img src={UserProfile} alt="user" className="w-full h-full rounded-full object-cover" />
                    </div>
                    <div className="flex flex-col">
                      <p className="text-[#2E2C34] text-[14px] font-[600] font-[Manrope]">Maria Roselia</p>
                      <span className="text-[#84818A] text-[12px] font-[500] font-[Manrope]">vaz@vid.io</span>
                    </div>
                  </div>
                </td>
                <td className="py-[22px] px-[20px]">
                  <p className="text-[#2E2C34] text-[14px] font-[500] font-[Manrope]">National Manager</p>
                </td>
                <td className="py-[22px] px-[20px]">
                  <div className='flex gap-[8px] items-center'>
                    <span className="bg-[#00A5FF] w-[7px] h-[7px] rounded-sm"></span>
                    <p className="text-[#2E2C34] text-[14px] font-[500] font-[Manrope]">India</p>
                  </div>
                </td>
                <td className="py-[22px] px-[20px]">
                  <div className='flex gap-[6px] items-center'>
                    <span className="text-[#84818A] text-[12px]"><LocalPhoneIcon /></span>
                    <p className="text-[#2E2C34] text-[14px] font-[500] font-[Manrope]">(847) 785-2310</p>
                  </div>
                </td>
                <td className="py-[22px] px-[20px]">
                  <div className='flex justify-between items-center'>
                    <span className="text-[#00A5FF] pt-[2px] pr-[8px] pb-[4px] pl-[8px] rounded font-[600] font-[Manrope] text-[12px] bg-[#00A5FF]/10">Contract</span>
                    <button className="text-[#84818A]"><MoreVertIcon /></button>
                  </div>
                </td>
              </tr>
              <tr className="border-b border-[#EBEAED]">
                <td className="py-[22px] px-[20px]">
                  <p className="text-[#2E2C34] text-[14px] font-[500] font-[Manrope]">ADM221-10</p>
                </td>
                <td className="py-[22px] px-[20px]">
                  <div className="flex gap-[10px] items-center">
                    <div className="w-[34px] h-[34px] rounded-full">
                      <img src={UserProfile} alt="user" className="w-full h-full rounded-full object-cover" />
                    </div>
                    <div className="flex flex-col">
                      <p className="text-[#2E2C34] text-[14px] font-[600] font-[Manrope]">Abhoy Latif</p>
                      <span className="text-[#84818A] text-[12px] font-[500] font-[Manrope]">ripu@meje.org</span>
                    </div>
                  </div>
                </td>
                <td className="py-[22px] px-[20px]">
                  <p className="text-[#2E2C34] text-[14px] font-[500] font-[Manrope]">Zonal Manager</p>
                </td>
                <td className="py-[22px] px-[20px]">
                  <div className='flex gap-[8px] items-center'>
                    <span className="bg-[#20C9AC] w-[7px] h-[7px] rounded-sm"></span>
                    <p className="text-[#2E2C34] text-[14px] font-[500] font-[Manrope]">Delhi</p>
                  </div>
                </td>
                <td className="py-[22px] px-[20px]">
                  <div className='flex gap-[6px] items-center'>
                    <span className="text-[#84818A] text-[12px]"><LocalPhoneIcon /></span>
                    <p className="text-[#2E2C34] text-[14px] font-[500] font-[Manrope]">(847) 785-2310</p>
                  </div>
                </td>
                <td className="py-[22px] px-[20px]">
                  <div className='flex justify-between items-center'>
                    <span className="text-[#5542F6] pt-[2px] pr-[8px] pb-[4px] pl-[8px] rounded font-[600] font-[Manrope] text-[12px] bg-[#5542F6]/10">Full time</span>
                    <button className="text-[#84818A]"><MoreVertIcon /></button>
                  </div>
                </td>
              </tr>
              <tr className="border-b border-[#EBEAED]">
                <td className="py-[22px] px-[20px]">
                  <p className="text-[#2E2C34] text-[14px] font-[500] font-[Manrope]">ADM221-10</p>
                </td>
                <td className="py-[22px] px-[20px]">
                  <div className="flex gap-[10px] items-center">
                    <div className="w-[34px] h-[34px] rounded-full">
                      <img src={UserProfile} alt="user" className="w-full h-full rounded-full object-cover" />
                    </div>
                    <div className="flex flex-col">
                      <p className="text-[#2E2C34] text-[14px] font-[600] font-[Manrope]">Dushane Daniel</p>
                      <span className="text-[#84818A] text-[12px] font-[500] font-[Manrope]">ze@ju.net</span>
                    </div>
                  </div>
                </td>
                <td className="py-[22px] px-[20px]">
                  <p className="text-[#2E2C34] text-[14px] font-[500] font-[Manrope]">Zonal Manager</p>
                </td>
                <td className="py-[22px] px-[20px]">
                  <div className='flex gap-[8px] items-center'>
                    <span className="bg-[#FA699D] w-[7px] h-[7px] rounded-sm"></span>
                    <p className="text-[#2E2C34] text-[14px] font-[500] font-[Manrope]">Uttar Pradesh</p>
                  </div>
                </td>
                <td className="py-[22px] px-[20px]">
                  <div className='flex gap-[6px] items-center'>
                    <span className="text-[#84818A] text-[12px]"><LocalPhoneIcon /></span>
                    <p className="text-[#2E2C34] text-[14px] font-[500] font-[Manrope]">(847) 785-2310</p>
                  </div>
                </td>
                <td className="py-[22px] px-[20px]">
                  <div className='flex justify-between items-center'>
                    <span className="text-[#FC3400] pt-[2px] pr-[8px] pb-[4px] pl-[8px] rounded font-[600] font-[Manrope] text-[12px] bg-[#FC3400]/10">Intern</span>
                    <button className="text-[#84818A]"><MoreVertIcon /></button>
                  </div>
                </td>
              </tr>
              <tr className="border-b border-[#EBEAED]">
                <td className="py-[22px] px-[20px]">
                  <p className="text-[#2E2C34] text-[14px] font-[500] font-[Manrope]">ADM221-10</p>
                </td>
                <td className="py-[22px] px-[20px]">
                  <div className="flex gap-[10px] items-center">
                    <div className="w-[34px] h-[34px] rounded-full">
                      <img src={UserProfile} alt="user" className="w-full h-full rounded-full object-cover" />
                    </div>
                    <div className="flex flex-col">
                      <p className="text-[#2E2C34] text-[14px] font-[600] font-[Manrope]">Maria Roselia</p>
                      <span className="text-[#84818A] text-[12px] font-[500] font-[Manrope]">vaz@vid.io</span>
                    </div>
                  </div>
                </td>
                <td className="py-[22px] px-[20px]">
                  <p className="text-[#2E2C34] text-[14px] font-[500] font-[Manrope]">Territory Manager</p>
                </td>
                <td className="py-[22px] px-[20px]">
                  <div className='flex gap-[8px] items-center'>
                    <span className="bg-[#EBEAED] w-[7px] h-[7px] rounded-sm"></span>
                    <p className="text-[#2E2C34] text-[14px] font-[500] font-[Manrope]">Karnataka</p>
                  </div>
                </td>
                <td className="py-[22px] px-[20px]">
                  <div className='flex gap-[6px] items-center'>
                    <span className="text-[#84818A] text-[12px]"><LocalPhoneIcon /></span>
                    <p className="text-[#2E2C34] text-[14px] font-[500] font-[Manrope]">(847) 785-2310</p>
                  </div>
                </td>
                <td className="py-[22px] px-[20px]">
                  <div className='flex justify-between items-center'>
                    <span className="text-[#00A5FF] pt-[2px] pr-[8px] pb-[4px] pl-[8px] rounded font-[600] font-[Manrope] text-[12px] bg-[#00A5FF]/10">Contract</span>
                    <button className="text-[#84818A]"><MoreVertIcon /></button>
                  </div>
                </td>
              </tr>
              <tr className="border-b border-[#EBEAED]">
                <td className="py-[22px] px-[20px]">
                  <p className="text-[#2E2C34] text-[14px] font-[500] font-[Manrope]">ADM221-10</p>
                </td>
                <td className="py-[22px] px-[20px]">
                  <div className="flex gap-[10px] items-center">
                    <div className="w-[34px] h-[34px] rounded-full">
                      <img src={UserProfile} alt="user" className="w-full h-full rounded-full object-cover" />
                    </div>
                    <div className="flex flex-col">
                      <p className="text-[#2E2C34] text-[14px] font-[600] font-[Manrope]">Maria Roselia</p>
                      <span className="text-[#84818A] text-[12px] font-[500] font-[Manrope]">vaz@vid.io</span>
                    </div>
                  </div>
                </td>
                <td className="py-[22px] px-[20px]">
                  <p className="text-[#2E2C34] text-[14px] font-[500] font-[Manrope]">Area Sales Manager</p>
                </td>
                <td className="py-[22px] px-[20px]">
                  <div className='flex gap-[8px] items-center'>
                    <span className="bg-[#FFCE74] w-[7px] h-[7px] rounded-sm"></span>
                    <p className="text-[#2E2C34] text-[14px] font-[500] font-[Manrope]">Gujarat</p>
                  </div>
                </td>
                <td className="py-[22px] px-[20px]">
                  <div className='flex gap-[6px] items-center'>
                    <span className="text-[#84818A] text-[12px]"><LocalPhoneIcon /></span>
                    <p className="text-[#2E2C34] text-[14px] font-[500] font-[Manrope]">(847) 785-2310</p>
                  </div>
                </td>
                <td className="py-[22px] px-[20px]">
                  <div className='flex justify-between items-center'>
                    <span className="text-[#5542F6] pt-[2px] pr-[8px] pb-[4px] pl-[8px] rounded font-[600] font-[Manrope] text-[12px] bg-[#5542F6]/10">Full time</span>
                    <button className="text-[#84818A]"><MoreVertIcon /></button>
                  </div>
                </td>
              </tr>
              <tr className="border-b border-[#EBEAED]">
                <td className="py-[22px] px-[20px]">
                  <p className="text-[#2E2C34] text-[14px] font-[500] font-[Manrope]">ADM221-10</p>
                </td>
                <td className="py-[22px] px-[20px]">
                  <div className="flex gap-[10px] items-center">
                    <div className="w-[34px] h-[34px] rounded-full">
                      <img src={UserProfile} alt="user" className="w-full h-full rounded-full object-cover" />
                    </div>
                    <div className="flex flex-col">
                      <p className="text-[#2E2C34] text-[14px] font-[600] font-[Manrope]">Maria Roselia</p>
                      <span className="text-[#84818A] text-[12px] font-[500] font-[Manrope]">vaz@vid.io</span>
                    </div>
                  </div>
                </td>
                <td className="py-[22px] px-[20px]">
                  <p className="text-[#2E2C34] text-[14px] font-[500] font-[Manrope]">Agent</p>
                </td>
                <td className="py-[22px] px-[20px]">
                  <div className='flex gap-[8px] items-center'>
                    <span className="bg-[#5542F6] w-[7px] h-[7px] rounded-sm"></span>
                    <p className="text-[#2E2C34] text-[14px] font-[500] font-[Manrope]">Gujarat</p>
                  </div>
                </td>
                <td className="py-[22px] px-[20px]">
                  <div className='flex gap-[6px] items-center'>
                    <span className="text-[#84818A] text-[12px]"><LocalPhoneIcon /></span>
                    <p className="text-[#2E2C34] text-[14px] font-[500] font-[Manrope]">(847) 785-2310</p>
                  </div>
                </td>
                <td className="py-[22px] px-[20px]">
                  <div className='flex justify-between items-center'>
                    <span className="text-[#FC3400] pt-[2px] pr-[8px] pb-[4px] pl-[8px] rounded font-[600] font-[Manrope] text-[12px] bg-[#FC3400]/10">Intern</span>
                    <button className="text-[#84818A]"><MoreVertIcon /></button>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
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

export default RolePermission;
