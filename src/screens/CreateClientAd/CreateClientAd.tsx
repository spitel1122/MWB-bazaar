import React, { useEffect, useState } from 'react';
import { DashboardLayout } from "@/components/layouts";
import { SectionHeader } from "@/components/molecules/Bazaars";
import { MenuItem, Select, Checkbox, ListItemText } from "@mui/material";
import { BiChevronLeft } from 'react-icons/bi';
import { useNavigate } from 'react-router-dom';
import { AppService } from '@/service/AllApiData.service';
import { useAdclientStyles } from '@/static/stylesheets/screens/addclientadStyles';
function CreateClientAd() {
    const classes = useAdclientStyles();
    const [isOpen, setisOpen] = useState(false)
    const [isOpen2, setisOpen2] = useState(false)
    const [isOpen3, setisOpen3] = useState(false)
    const [statedata, setstatedata] = useState<any>([])
    const [AllState, setAllState] = useState<any>([])
    const [Alldistricts, setAlldistricts] = useState<any>([])
    const [Allcity, setAllcity] = useState<any>([])
    const [districtdata, setdistrictdata] = useState<any>([])
    const [citydata, setcitydata] = useState<any>([])

    const navigate = useNavigate();
    const getAllLists = async () => {
        const responseJson = await AppService.getTotalStates();
        setAllState(responseJson.data);
    }

    const getAllDisData = async () => {
        const responseJson = await AppService.getTotalDistrict();
        let tempState = await responseJson.data.map((row: any) => {
            return {
                label: row.district,
                value: row.id,
            }
        })
        setAlldistricts(tempState);
    };
    const getAllCityData = async () => {
        const responseJson = await AppService.getAllCity();
        let tempState = await responseJson.data.results.map((row: any) => {
            return {
                label: row.city,
                value: row.id,
            }
        })
        setAllcity(tempState);
    };
    const handleChangestate = (e: any) => {
        const { value } = e.target;
        const int = value.map(Number);
        setstatedata([...int])
    }
    const handleChangedistrict = (e:any)=>{
        const { value } = e.target;
        const int = value.map(Number);
        setdistrictdata([...int])
    }
    const handleChangecity = (e:any)=>{
        const { value } = e.target;
        const int = value.map(Number);
        setcitydata([...int])
    }
    useEffect(() => {
        getAllLists()
        getAllDisData()
        getAllCityData()
    }, [])
    return (
        <DashboardLayout>
            <div className={classes.root}>
                <SectionHeader />
                <div className="container">
                    <div className='flex items-center gap-[24px]'>
                        <button className='text-[#84818A] text-[24px]' onClick={() => { navigate('/advertisement') }}><BiChevronLeft /></button>
                        <div className="commonTitle">Create New Client</div>
                    </div>
                    <div className='mt-[54px]'>
                        <div className='w-[50%]'>
                            <div className='w-full'>
                                <div className='flex gap-[32px] mb-[34px]'>
                                    <div>
                                        <label className='text-[14px] font-[Manrope] font-[500] text-[#84818A]'>Client Name</label>
                                        <input type="text" className='border-b block border-[#EBEAED] w-[288px] text-[14px] font-[Manrope] font-[500] text-[#2E2C34] outline-none' />
                                    </div>
                                    <div>
                                        <label className='text-[14px] block font-[Manrope] font-[500] text-[#84818A]'>Select State</label>
                                        <Select
                                            open={isOpen}
                                            onClose={() => setisOpen(false)}
                                            onOpen={() => setisOpen(true)}
                                            multiple={true}
                                            variant='standard'
                                            sx={{ height: 20, width: 288, borderBottomColor: '#EBEAED' }}
                                            value={statedata}
                                            fullWidth={true}
                                            renderValue={(selected) => {
                                                var data: any = [];
                                                AllState.map((item: any) => {
                                                    if (selected.includes(item?.id)) {
                                                        data.push(item.state)
                                                    }
                                                })
                                                return data.join(', ')
                                            }
                                            }
                                            onChange={handleChangestate}
                                        >
                                            {AllState.map((items: any) => {
                                                return (
                                                    <MenuItem key={items.id} value={items.id}>
                                                        <Checkbox checked={statedata.indexOf(items.id) > -1} />
                                                        <ListItemText primary={items.state} />
                                                    </MenuItem>
                                                )
                                            }
                                            )}
                                        </Select>
                                    </div>
                                </div>
                                <div className='flex gap-[32px] mb-[34px]'>
                                    <div>
                                        <label className='text-[14px] block font-[Manrope] font-[500] text-[#84818A]'>Select District</label>
                                        <Select
                                            open={isOpen2}
                                            onClose={() => setisOpen2(false)}
                                            onOpen={() => setisOpen2(true)}
                                            multiple={true}
                                            variant='standard'
                                            sx={{ height: 20, width: 288, borderBottomColor: '#EBEAED' }}
                                            value={districtdata}
                                            fullWidth={true}
                                            renderValue={(selected) => {
                                                var data: any = [];
                                                Alldistricts.map((item: any) => {
                                                    if (selected.includes(item?.value)) {
                                                        data.push(item.label)
                                                    }
                                                })
                                                return data.join(', ')
                                            }
                                            }
                                            onChange={handleChangedistrict}
                                        >
                                            {Alldistricts.map((items: any) => {
                                                return (
                                                    <MenuItem key={items.value} value={items.value}>
                                                        <Checkbox checked={districtdata.indexOf(items.value) > -1} />
                                                        <ListItemText primary={items.label} />
                                                    </MenuItem>
                                                )
                                            }
                                            )}
                                        </Select>
                                    </div>
                                    <div>
                                        <label className='text-[14px] block font-[Manrope] font-[500] text-[#84818A]'>Select CIty</label>
                                        <Select
                                            open={isOpen3}
                                            onClose={() => setisOpen3(false)}
                                            onOpen={() => setisOpen3(true)}
                                            multiple={true}
                                            variant='standard'
                                            sx={{ height: 20, width: 288, borderBottomColor: '#EBEAED' }}
                                            value={citydata}
                                            fullWidth={true}
                                            renderValue={(selected) => {
                                                var data: any = [];
                                                Allcity.map((item: any) => {
                                                    if (selected.includes(item?.value)) {
                                                        data.push(item?.label)
                                                    }
                                                })
                                                return data.join(', ')
                                            }
                                            }
                                            onChange={handleChangecity}
                                        >
                                            {Allcity.map((items: any) => {
                                                return (
                                                    <MenuItem key={items?.value} value={items?.value}>
                                                        <Checkbox checked={citydata.indexOf(items?.value) > -1} />
                                                        <ListItemText primary={items?.label} />
                                                    </MenuItem>
                                                )
                                            }
                                            )}
                                        </Select>
                                    </div>
                                </div>
                                <div className='flex gap-[32px] mb-[41px]'>
                                    <div>
                                        <label className='text-[14px] font-[Manrope] font-[500] text-[#84818A]'>GST Number</label>
                                        <input type="text" className='border-b block border-[#EBEAED] w-[288px] text-[14px] font-[Manrope] font-[500] text-[#2E2C34] outline-none' />
                                    </div>
                                </div>
                                <div className='flex gap-[12px]'>
                                    <button className='h-[36px] border rounded bg-[#FFFFFF] px-[16px] py-[8px] capitalize text-[14px] flex justify-center items-center font-[Manrope] font-[600] text-[#2E2C34]' onClick={() => { navigate('/advertisement') }}>cancel</button>
                                    <button className='h-[36px] border rounded bg-[#4E2FA9] px-[16px] py-[8px] capitalize text-[14px] flex justify-center items-center font-[Manrope] font-[600] text-[#fff]' onClick={() => { navigate('/advertisement') }}>Create Ad</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </DashboardLayout>
    );
}

export default CreateClientAd;