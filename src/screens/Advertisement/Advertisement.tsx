import React, { useState, useEffect } from "react";
import { DashboardLayout } from "@/components/layouts";
import { useAdvertisementStyles } from "@/static/stylesheets/screens";
import { SectionHeader } from "@/components/molecules/Bazaars";
import { TbReceipt } from 'react-icons/tb';
import { BiDotsVerticalRounded } from 'react-icons/bi';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import ListItemText from '@mui/material/ListItemText';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import Checkbox from '@mui/material/Checkbox';
import { BsPlus } from 'react-icons/bs';
import { useNavigate } from "react-router-dom";
import { AppService } from "@/service/AllApiData.service";

const Advertisement = () => {
  const classes = useAdvertisementStyles();
  const [active, setactive] = useState(0)
  const options = ['Advertisement Clients', 'Ads', 'Plans', 'Invoices'];
  const [personName, setPersonName] = React.useState<string[]>([]);
  const [state, setstate] = React.useState<string[]>([]);
  const [AllStates, setAllStates] = React.useState<string[]>([]);
  const [Alladvertisementdata, setAlladvertisementdata] = React.useState<string[]>([]);
  const navigate = useNavigate();
  const names = [
    'Oliver Hansen',
    'Van Henry',
    'April Tucker',
    'Ralph Hubbard',
    'Omar Alexander',
    'Carlos Abbott',
    'Miriam Wagner',
    'Bradley Wilkerson',
    'Virginia Andrews',
    'Kelly Snyder',
  ];

  const handleChange = (event: SelectChangeEvent<typeof personName>) => {
    const {
      target: { value },
    } = event;
    setPersonName(
      typeof value === 'string' ? value.split(',') : value,
    );
  };

  const handleChangestate = (event: SelectChangeEvent<typeof personName>) => {
    const {
      target: { value },
    } = event;
    setstate(
      typeof value === 'string' ? value.split(',') : value,
    );
  };
  const handleAdspage = () => {
    if (active === 0) {
      navigate('/createadclient')
    }
    if (active === 1) {
      navigate('/addnewadvertisement')
    }
    if (active === 2) {
      navigate('/createadsplan')
    }
  }
  const getTotalStates = async () => {
    const responseJson = await AppService.getTotalStates();
    setAllStates(responseJson.data);
  };
  const getAlladsData = async () => {
    const responseJson = await AppService.getAdsAllData();
    setAlladvertisementdata(responseJson?.data?.results)
  }
  useEffect(() => {
    getTotalStates()
  }, [])
  useEffect(() => {
    getAlladsData()
  }, [])
  return (
    <>
      <DashboardLayout>
        <div className={classes.root}>
          <SectionHeader />
          <div className="container">
            <div className="flex items-center justify-between">
              <div className="commonTitle">Ads</div>
              <button className={`w-[200px] outline-none bg-[#FF6652] h-[48px] text-[14px] rounded text-center font-[Manrope] font-[600] text-[#FFFFFF] flex items-center justify-center gap-1 ${active !== 3 ? 'visible' : 'invisible'}`} onClick={() => { handleAdspage() }}><span className="text-[25px] text-white" ><BsPlus /></span> {active === 1 ? 'Create New Ad' : active === 2 ? 'Create New Plan' : 'Create New Client'}</button>
            </div>
            <div className="mt-[16px]">
              <ul className="list-none flex gap-4 m-0 p-0">
                {options.map((item: any, index: any) => {
                  return (
                    <li className={`h-[34px] ${index === active ? 'border-b-2 border-[#5542F6]' : 'border-b-2 border-transparent'}`}>
                      <button className={`w-fit text-[14px] text-center px-[12px] font-[Manrope] font-[600] ${index === active ? 'text-[#2E2C34]' : 'text-[#84818A]'}`} onClick={() => { setactive(index) }}>{item}</button>
                    </li>
                  )
                })}
              </ul>
            </div>
            {active === 0 &&
              <div>
                <table className="w-full mt-[35px]">
                  <thead className="border-b border-[#EBEAED]">
                    <tr>
                      <th className="text-[#84818A] pb-[11px] text-left text-[14px] font-[Manrope] font-[600]">Client Name</th>
                      <th className="text-[#84818A] pb-[11px] text-left text-[14px] font-[Manrope] font-[600]">Active Ad</th>
                      <th className="text-[#84818A] pb-[11px] text-left text-[14px] font-[Manrope] font-[600]">Pending Invoices</th>
                      <th className="text-[#84818A] pb-[11px] text-left text-[14px] font-[Manrope] font-[600]">Referred by</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="h-[64px] items-center border-b border-[#EBEAED]">
                      <td className="text-[#2E2C34] text-left text-[14px] font-[Manrope] font-[500]">Global Mart, Indore</td>
                      <td className="text-[#2E2C34] text-left text-[14px] font-[Manrope] font-[500]">2</td>
                      <td>
                        <div className="flex gap-[10px] items-center">
                          <p className="text-[#2E2C34] text-left text-[14px] font-[Manrope] font-[500]">Rs. 25,000</p>
                          <span className="text-[#5542F6]"><TbReceipt /></span>
                        </div>
                      </td>
                      <td>
                        <div className="flex justify-between items-center">
                          <p className="text-[#2E2C34] text-left text-[14px] font-[Manrope] font-[500]">Mehak Sharma</p>
                          <span className="text-[#84818A]"><BiDotsVerticalRounded /></span>
                        </div>
                      </td>
                    </tr>
                    <tr className="h-[64px] items-center border-b border-[#EBEAED]">
                      <td className="text-[#2E2C34] text-left text-[14px] font-[Manrope] font-[500]">Global Mart, Indore</td>
                      <td className="text-[#2E2C34] text-left text-[14px] font-[Manrope] font-[500]">2</td>
                      <td className="text-[#2E2C34] text-left text-[14px] font-[Manrope] font-[500]">
                        -
                      </td>
                      <td>
                        <div className="flex justify-between items-center">
                          <p className="text-[#2E2C34] text-left text-[14px] font-[Manrope] font-[500]">Mehak Sharma</p>
                          <span className="text-[#84818A]"><BiDotsVerticalRounded /></span>
                        </div>
                      </td>
                    </tr>
                    <tr className="h-[64px] items-center border-b border-[#EBEAED]">
                      <td className="text-[#2E2C34] text-left text-[14px] font-[Manrope] font-[500]">Global Mart, Indore</td>
                      <td className="text-[#2E2C34] text-left text-[14px] font-[Manrope] font-[500]">2</td>
                      <td>
                        <div className="flex gap-[10px] items-center">
                          <p className="text-[#2E2C34] text-left text-[14px] font-[Manrope] font-[500]">Rs. 25,000</p>
                          <span className="text-[#5542F6]"><TbReceipt /></span>
                        </div>
                      </td>
                      <td>
                        <div className="flex justify-between items-center">
                          <p className="text-[#2E2C34] text-left text-[14px] font-[Manrope] font-[500]">Mehak Sharma</p>
                          <span className="text-[#84818A]"><BiDotsVerticalRounded /></span>
                        </div>
                      </td>
                    </tr>
                    <tr className="h-[64px] items-center border-b border-[#EBEAED]">
                      <td className="text-[#2E2C34] text-left text-[14px] font-[Manrope] font-[500]">Global Mart, Indore</td>
                      <td className="text-[#2E2C34] text-left text-[14px] font-[Manrope] font-[500]">2</td>
                      <td className="text-[#2E2C34] text-left text-[14px] font-[Manrope] font-[500]">
                        -
                      </td>
                      <td>
                        <div className="flex justify-between items-center">
                          <p className="text-[#2E2C34] text-left text-[14px] font-[Manrope] font-[500]">Mehak Sharma</p>
                          <span className="text-[#84818A]"><BiDotsVerticalRounded /></span>
                        </div>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            }

            {active === 1 &&
              <div>
                <table className="w-full mt-[35px]">
                  <thead className="border-b border-[#EBEAED]">
                    <tr>
                      <th className="text-[#84818A] pb-[11px] text-left text-[14px] font-[Manrope] font-[600]">Ad Name</th>
                      <th className="text-[#84818A] pb-[11px] text-left text-[14px] font-[Manrope] font-[600]">Start Date</th>
                      <th className="text-[#84818A] pb-[11px] text-left text-[14px] font-[Manrope] font-[600]">Start time</th>
                      <th className="text-[#84818A] pb-[11px] text-left text-[14px] font-[Manrope] font-[600]">Choose Plan</th>
                      <th className="text-[#84818A] pb-[11px] text-left text-[14px] font-[Manrope] font-[600]">Gst</th>
                      <th className="text-[#84818A] pb-[11px] text-left text-[14px] font-[Manrope] font-[600]">Referral</th>
                      <th className="text-[#84818A] pb-[11px] text-left text-[14px] font-[Manrope] font-[600]">State</th>
                    </tr>
                  </thead>
                  <tbody>
                    {Alladvertisementdata?.map((itm: any) => {
                      const intersection = AllStates?.filter((it: any) => {
                        return itm?.select_state?.indexOf(it?.id) > -1;
                      })
                      return (
                        <tr className="h-[64px] items-center border-b border-[#EBEAED]">
                          <td>
                            <div className="flex gap-[14px] items-center">
                              <div className="w-[36px] h-[36px] rounded-[2px]">
                                <img src={itm?.media} alt="" className="object-cover w-full h-full rounded-[2px]" />
                              </div>
                              <p className="text-[#2E2C34] text-left text-[14px] font-[Manrope] font-[500]">{itm?.ad_title}</p>
                            </div>
                          </td>
                          <td className="text-[#2E2C34] text-left text-[14px] font-[Manrope] font-[500]">{itm?.start_date}</td>
                          <td className="text-[#2E2C34] text-left text-[14px] font-[Manrope] font-[500]">{itm?.start_time}</td>
                          <td className="text-[#2E2C34] text-left text-[14px] font-[Manrope] font-[500]">{itm?.choose_plan}</td>
                          <td className="text-[#2E2C34] text-left text-[14px] font-[Manrope] font-[500]">{itm?.gst}</td>
                          <td className="text-[#2E2C34] text-left text-[14px] font-[Manrope] font-[500]">{itm?.referral}</td>
                          <td>
                            <div className="flex justify-between items-center">
                              <p className="text-[#2E2C34] text-left text-[14px] font-[Manrope] font-[500]">{intersection?.map((i:any)=>i?.state)?.join(',')}</p>
                              <span className="text-[#84818A]"><BiDotsVerticalRounded /></span>
                            </div>
                          </td>
                        </tr>
                      )
                    })}
                  </tbody>
                </table>
              </div>
            }
            {active === 2 &&
              <div>
                <table className="w-full mt-[35px]">
                  <thead className="border-b border-[#EBEAED]">
                    <tr>
                      <th className="text-[#84818A] pb-[11px] text-left text-[14px] font-[Manrope] font-[600]">Plan Name</th>
                      <th className="text-[#84818A] pb-[11px] text-left text-[14px] font-[Manrope] font-[600]">Bazaar</th>
                      <th className="text-[#84818A] pb-[11px] text-left text-[14px] font-[Manrope] font-[600]">State</th>
                      <th className="text-[#84818A] pb-[11px] text-left text-[14px] font-[Manrope] font-[600]">District</th>
                      <th className="text-[#84818A] pb-[11px] text-left text-[14px] font-[Manrope] font-[600]">City</th>
                      <th className="text-[#84818A] pb-[11px] text-left text-[14px] font-[Manrope] font-[600]">Duration</th>
                      <th className="text-[#84818A] pb-[11px] text-left text-[14px] font-[Manrope] font-[600]">Plan Time Slot</th>
                      <th className="text-[#84818A] pb-[11px] text-left text-[14px] font-[Manrope] font-[600]">Price</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="h-[64px] items-center border-b border-[#EBEAED]">
                      <td className="text-[#2E2C34] text-left text-[14px] font-[Manrope] font-[500]">Delhi, UP Weekly Plan</td>
                      <td>{['Electronics Bazaar', 'Computer Bazaar'].map((item: any, index: any) => (
                        <p key={index} className="text-[#2E2C34] text-left text-[14px] font-[Manrope] font-[500]">{item}</p>
                      ))}
                      </td>
                      <td className="text-[#2E2C34] text-left text-[14px] font-[Manrope] font-[500]">UP, Delhi</td>
                      <td>
                        {['GB Nagar', 'Ghaziabad, + 1'].map((item: any, index: any) => (
                          <p key={index} className="text-[#2E2C34] text-left text-[14px] font-[Manrope] font-[500]">{item}</p>
                        ))}
                      </td>
                      <td>{['Ghaziabad,', 'Noida, Delhi'].map((item: any, index: any) => (
                        <p key={index} className="text-[#2E2C34] text-left text-[14px] font-[Manrope] font-[500]">{item}</p>
                      ))}</td>
                      <td className="text-[#2E2C34] text-left text-[14px] font-[Manrope] font-[500]">7 days</td>
                      <td>
                        <div className="flex gap-1 flex-col justify-center">
                          <div className="w-[103px] mt-[17px] h-[29px] border flex justify-center items-center border-[#E1E1E1] text-[#2E2C34] text-left text-[14px] rounded-full font-[Manrope] font-[500]">
                            9AM-6PM
                          </div>
                          <div className="w-[103px] mb-[17px] h-[29px] border flex justify-center items-center border-[#E1E1E1] text-[#2E2C34] text-left text-[14px] rounded-full font-[Manrope] font-[500]">
                            6PM-12PM
                          </div>
                        </div>
                      </td>
                      <td>
                        <div className="flex justify-between items-center">
                          <p className="text-[#2E2C34] text-left text-[14px] font-[Manrope] font-[500]">Rs. 10,000</p>
                          <span className="text-[#84818A]"><BiDotsVerticalRounded /></span>
                        </div>
                      </td>
                    </tr>
                    <tr className="h-[64px] items-center border-b border-[#EBEAED]">
                      <td className="text-[#2E2C34] text-left text-[14px] font-[Manrope] font-[500]">Delhi, UP Weekly Plan</td>
                      <td>{['Electronics Bazaar', 'Computer Bazaar'].map((item: any, index: any) => (
                        <p key={index} className="text-[#2E2C34] text-left text-[14px] font-[Manrope] font-[500]">{item}</p>
                      ))}
                      </td>
                      <td className="text-[#2E2C34] text-left text-[14px] font-[Manrope] font-[500]">UP, Delhi</td>
                      <td>
                        {['GB Nagar', 'Ghaziabad, + 1'].map((item: any, index: any) => (
                          <p key={index} className="text-[#2E2C34] text-left text-[14px] font-[Manrope] font-[500]">{item}</p>
                        ))}
                      </td>
                      <td>{['Ghaziabad,', 'Noida, Delhi'].map((item: any, index: any) => (
                        <p key={index} className="text-[#2E2C34] text-left text-[14px] font-[Manrope] font-[500]">{item}</p>
                      ))}</td>
                      <td className="text-[#2E2C34] text-left text-[14px] font-[Manrope] font-[500]">7 days</td>
                      <td>
                        <div className="flex gap-1 flex-col justify-center">
                          <div className="w-[103px] mt-[17px] h-[29px] border flex justify-center items-center border-[#E1E1E1] text-[#2E2C34] text-left text-[14px] rounded-full font-[Manrope] font-[500]">
                            9AM-6PM
                          </div>
                          <div className="w-[103px] mb-[17px] h-[29px] border flex justify-center items-center border-[#E1E1E1] text-[#2E2C34] text-left text-[14px] rounded-full font-[Manrope] font-[500]">
                            6PM-12PM
                          </div>
                        </div>
                      </td>
                      <td>
                        <div className="flex justify-between items-center">
                          <p className="text-[#2E2C34] text-left text-[14px] font-[Manrope] font-[500]">Rs. 10,000</p>
                          <span className="text-[#84818A]"><BiDotsVerticalRounded /></span>
                        </div>
                      </td>
                    </tr>
                    <tr className="h-[64px] items-center border-b border-[#EBEAED]">
                      <td className="text-[#2E2C34] text-left text-[14px] font-[Manrope] font-[500]">Delhi, UP Weekly Plan</td>
                      <td>{['Electronics Bazaar', 'Computer Bazaar'].map((item: any, index: any) => (
                        <p key={index} className="text-[#2E2C34] text-left text-[14px] font-[Manrope] font-[500]">{item}</p>
                      ))}
                      </td>
                      <td className="text-[#2E2C34] text-left text-[14px] font-[Manrope] font-[500]">UP, Delhi</td>
                      <td>
                        {['GB Nagar', 'Ghaziabad, + 1'].map((item: any, index: any) => (
                          <p key={index} className="text-[#2E2C34] text-left text-[14px] font-[Manrope] font-[500]">{item}</p>
                        ))}
                      </td>
                      <td>{['Ghaziabad,', 'Noida, Delhi'].map((item: any, index: any) => (
                        <p key={index} className="text-[#2E2C34] text-left text-[14px] font-[Manrope] font-[500]">{item}</p>
                      ))}</td>
                      <td className="text-[#2E2C34] text-left text-[14px] font-[Manrope] font-[500]">7 days</td>
                      <td>
                        <div className="flex gap-1 flex-col justify-center">
                          <div className="w-[103px] mt-[17px] h-[29px] border flex justify-center items-center border-[#E1E1E1] text-[#2E2C34] text-left text-[14px] rounded-full font-[Manrope] font-[500]">
                            9AM-6PM
                          </div>
                          <div className="w-[103px] mb-[17px] h-[29px] border flex justify-center items-center border-[#E1E1E1] text-[#2E2C34] text-left text-[14px] rounded-full font-[Manrope] font-[500]">
                            6PM-12PM
                          </div>
                        </div>
                      </td>
                      <td>
                        <div className="flex justify-between items-center">
                          <p className="text-[#2E2C34] text-left text-[14px] font-[Manrope] font-[500]">Rs. 10,000</p>
                          <span className="text-[#84818A]"><BiDotsVerticalRounded /></span>
                        </div>
                      </td>
                    </tr>
                    <tr className="h-[64px] items-center border-b border-[#EBEAED]">
                      <td className="text-[#2E2C34] text-left text-[14px] font-[Manrope] font-[500]">Delhi, UP Weekly Plan</td>
                      <td>{['Electronics Bazaar', 'Computer Bazaar'].map((item: any, index: any) => (
                        <p key={index} className="text-[#2E2C34] text-left text-[14px] font-[Manrope] font-[500]">{item}</p>
                      ))}
                      </td>
                      <td className="text-[#2E2C34] text-left text-[14px] font-[Manrope] font-[500]">UP, Delhi</td>
                      <td>
                        {['GB Nagar', 'Ghaziabad, + 1'].map((item: any, index: any) => (
                          <p key={index} className="text-[#2E2C34] text-left text-[14px] font-[Manrope] font-[500]">{item}</p>
                        ))}
                      </td>
                      <td>{['Ghaziabad,', 'Noida, Delhi'].map((item: any, index: any) => (
                        <p key={index} className="text-[#2E2C34] text-left text-[14px] font-[Manrope] font-[500]">{item}</p>
                      ))}</td>
                      <td className="text-[#2E2C34] text-left text-[14px] font-[Manrope] font-[500]">7 days</td>
                      <td>
                        <div className="flex gap-1 flex-col justify-center">
                          <div className="w-[103px] mt-[17px] h-[29px] border flex justify-center items-center border-[#E1E1E1] text-[#2E2C34] text-left text-[14px] rounded-full font-[Manrope] font-[500]">
                            9AM-6PM
                          </div>
                          <div className="w-[103px] mb-[17px] h-[29px] border flex justify-center items-center border-[#E1E1E1] text-[#2E2C34] text-left text-[14px] rounded-full font-[Manrope] font-[500]">
                            6PM-12PM
                          </div>
                        </div>
                      </td>
                      <td>
                        <div className="flex justify-between items-center">
                          <p className="text-[#2E2C34] text-left text-[14px] font-[Manrope] font-[500]">Rs. 10,000</p>
                          <span className="text-[#84818A]"><BiDotsVerticalRounded /></span>
                        </div>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            }
            {active === 3 &&
              <div className="mt-[45px]">
                <div className="flex gap-[11px] items-center">
                  <button className="w-[156px] h-[36px] rounded text-white bg-[#4E2FA9] flex justify-center items-center text-[14px] font-[Manrope] font-[600]">Awaiting Payment</button>
                  <FormControl>
                    <InputLabel id="demo-multiple-checkbox-label" sx={{ textAlign: 'center', color: '#84818A', fontSize: '14px', fontFamily: 'Manrope', fontWeight: 600 }}>Bill Date</InputLabel>
                    <Select
                      labelId="demo-multiple-checkbox-label"
                      id="demo-multiple-checkbox"
                      multiple
                      sx={{ width: 109, height: 36, textAlign: 'center', color: '#84818A', fontSize: '14px', fontFamily: 'Manrope', fontWeight: 600 }}
                      value={personName}
                      onChange={handleChange}
                      label='Bill Date'
                      renderValue={(selected) => selected.join(', ')}
                    >
                      {names.map((name) => (
                        <MenuItem key={name} value={name}>
                          <Checkbox checked={personName.indexOf(name) > -1} />
                          <ListItemText primary={name} />
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                  <FormControl>
                    <InputLabel id="demo-multiple-checkbox-label" sx={{ textAlign: 'center', color: '#84818A', fontSize: '14px', fontFamily: 'Manrope', fontWeight: 600 }}>State</InputLabel>
                    <Select
                      labelId="demo-multiple-checkbox-label"
                      id="demo-multiple-checkbox"
                      multiple
                      sx={{ width: 93, height: 36, textAlign: 'center', color: '#84818A', fontSize: '14px', fontFamily: 'Manrope', fontWeight: 600 }}
                      value={state}
                      onChange={handleChangestate}
                      label='State'
                      renderValue={(selected) => {
                        var data: any = [];
                        AllStates.map((item: any) => {
                          if (selected.includes(item?.id)) {
                            data.push(item.state)
                          }
                        })
                        return data.join(', ')
                      }}
                    >
                      {AllStates.map((item: any) => (
                        <MenuItem key={item?.id} value={item?.id}>
                          <Checkbox checked={state.indexOf(item?.id) > -1} />
                          <ListItemText primary={item?.state} />
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                  <button className="w-[100px] rounded px-[16px] py-[8px] text-[#FC3400] text-center text-[14px] font-[Manrope] font-[600]">Reset</button>
                </div>
                <div>
                  <table className="w-full mt-[30px]">
                    <thead className="border-b border-[#EBEAED]">
                      <tr>
                        <th className="text-[#84818A] pb-[11px] text-left text-[14px] font-[Manrope] font-[600]">Invoice Number</th>
                        <th className="text-[#84818A] pb-[11px] text-left text-[14px] font-[Manrope] font-[600]">Client</th>
                        <th className="text-[#84818A] pb-[11px] text-left text-[14px] font-[Manrope] font-[600]">State</th>
                        <th className="text-[#84818A] pb-[11px] text-left text-[14px] font-[Manrope] font-[600]">Bill Date</th>
                        <th className="text-[#84818A] pb-[11px] text-left text-[14px] font-[Manrope] font-[600]">Bill Amount</th>
                        <th className="text-[#84818A] pb-[11px] text-left text-[14px] font-[Manrope] font-[600]">Status</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr className="h-[64px] items-center border-b border-[#EBEAED]">
                        <td className="text-[#2E2C34] text-left text-[14px] font-[Manrope] font-[500]">123456</td>
                        <td className="text-[#2E2C34] text-left text-[14px] font-[Manrope] font-[500]">Wingreens Mart</td>
                        <td className="text-[#2E2C34] text-left text-[14px] font-[Manrope] font-[500]">UP, Delhi</td>
                        <td className="text-[#2E2C34] text-left text-[14px] font-[Manrope] font-[500]">20 Apr 2021</td>
                        <td className="text-[#2E2C34] text-left text-[14px] font-[Manrope] font-[500]">Rs. 1200.00</td>
                        <td>
                          <div className="flex justify-between items-center">
                            <p className="text-[#FF6652] text-left text-[14px] font-[Manrope] font-[500]">Awaiting Payment</p>
                            <div className="flex gap-[34px]">
                              <button className="text-[#4E2FA9]" onClick={() => { navigate('/invoiceview') }}><TbReceipt /></button>
                              <span className="text-[#84818A]"><BiDotsVerticalRounded /></span>
                            </div>
                          </div>
                        </td>
                      </tr>
                      <tr className="h-[64px] items-center border-b border-[#EBEAED]">
                        <td className="text-[#2E2C34] text-left text-[14px] font-[Manrope] font-[500]">123456</td>
                        <td className="text-[#2E2C34] text-left text-[14px] font-[Manrope] font-[500]">Metro Global</td>
                        <td className="text-[#2E2C34] text-left text-[14px] font-[Manrope] font-[500]">UP, Delhi</td>
                        <td className="text-[#2E2C34] text-left text-[14px] font-[Manrope] font-[500]">20 Apr 2021</td>
                        <td className="text-[#2E2C34] text-left text-[14px] font-[Manrope] font-[500]">Rs. 1200.00</td>
                        <td>
                          <div className="flex justify-between items-center">
                            <p className="text-[#FF6652] text-left text-[14px] font-[Manrope] font-[500]">Awaiting Payment</p>
                            <div className="flex gap-[34px]">
                              <button className="text-[#4E2FA9]"><TbReceipt /></button>
                              <span className="text-[#84818A]"><BiDotsVerticalRounded /></span>
                            </div>
                          </div>
                        </td>
                      </tr>
                      <tr className="h-[64px] items-center border-b border-[#EBEAED]">
                        <td className="text-[#2E2C34] text-left text-[14px] font-[Manrope] font-[500]">123456</td>
                        <td className="text-[#2E2C34] text-left text-[14px] font-[Manrope] font-[500]">Client Name</td>
                        <td className="text-[#2E2C34] text-left text-[14px] font-[Manrope] font-[500]">UP, Delhi</td>
                        <td className="text-[#2E2C34] text-left text-[14px] font-[Manrope] font-[500]">20 Apr 2021</td>
                        <td className="text-[#2E2C34] text-left text-[14px] font-[Manrope] font-[500]">Rs. 1200.00</td>
                        <td>
                          <div className="flex justify-between items-center">
                            <p className="text-[#20C9AC] text-left text-[14px] font-[Manrope] font-[500]">Paid</p>
                            <div className="flex gap-[34px]">
                              <button className="text-[#4E2FA9]"><TbReceipt /></button>
                              <span className="text-[#84818A]"><BiDotsVerticalRounded /></span>
                            </div>
                          </div>
                        </td>
                      </tr>
                      <tr className="h-[64px] items-center border-b border-[#EBEAED]">
                        <td className="text-[#2E2C34] text-left text-[14px] font-[Manrope] font-[500]">123456</td>
                        <td className="text-[#2E2C34] text-left text-[14px] font-[Manrope] font-[500]">Client Name</td>
                        <td className="text-[#2E2C34] text-left text-[14px] font-[Manrope] font-[500]">UP, Delhi</td>
                        <td className="text-[#2E2C34] text-left text-[14px] font-[Manrope] font-[500]">20 Apr 2021</td>
                        <td className="text-[#2E2C34] text-left text-[14px] font-[Manrope] font-[500]">Rs. 1200.00</td>
                        <td>
                          <div className="flex justify-between items-center">
                            <p className="text-[#FF6652] text-left text-[14px] font-[Manrope] font-[500]">Awaiting Payment</p>
                            <div className="flex gap-[34px]">
                              <button className="text-[#4E2FA9]"><TbReceipt /></button>
                              <span className="text-[#84818A]"><BiDotsVerticalRounded /></span>
                            </div>
                          </div>
                        </td>
                      </tr>
                      <tr className="h-[64px] items-center border-b border-[#EBEAED]">
                        <td className="text-[#2E2C34] text-left text-[14px] font-[Manrope] font-[500]">123456</td>
                        <td className="text-[#2E2C34] text-left text-[14px] font-[Manrope] font-[500]">Metro Global</td>
                        <td className="text-[#2E2C34] text-left text-[14px] font-[Manrope] font-[500]">UP, Delhi</td>
                        <td className="text-[#2E2C34] text-left text-[14px] font-[Manrope] font-[500]">20 Apr 2021</td>
                        <td className="text-[#2E2C34] text-left text-[14px] font-[Manrope] font-[500]">Rs. 1200.00</td>
                        <td>
                          <div className="flex justify-between items-center">
                            <p className="text-[#FF6652] text-left text-[14px] font-[Manrope] font-[500]">Awaiting Payment</p>
                            <div className="flex gap-[34px]">
                              <button className="text-[#4E2FA9]"><TbReceipt /></button>
                              <span className="text-[#84818A]"><BiDotsVerticalRounded /></span>
                            </div>
                          </div>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            }
          </div>
        </div>
      </DashboardLayout>
    </>
  );
};

export default Advertisement;
