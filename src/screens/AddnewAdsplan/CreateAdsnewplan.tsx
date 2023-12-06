import React, { useState, useEffect } from 'react';
import { DashboardLayout } from '@/components/layouts';
import { useNavigate } from 'react-router-dom';
import { BiChevronLeft } from 'react-icons/bi';
import { Select, MenuItem, Checkbox, ListItemText } from '@mui/material'
import { AppService } from '@/service/AllApiData.service';
import { useAdNewPlan } from '@/static/stylesheets/screens/AddAdsPlan';
function CreateAdsnewplan() {
    const [isOpen, setisOpen] = useState(false)
    const [isOpen2, setisOpen2] = useState(false)
    const [isOpen3, setisOpen3] = useState(false)
    const [isOpen4, setisOpen4] = useState(false)
    const [isOpen5, setisOpen5] = useState(false)
    const [isOpen6, setisOpen6] = useState(false)
    const [isOpen7, setisOpen7] = useState(false)
    const [isOpen8, setisOpen8] = useState(false)
    const [statedata, setstatedata] = useState<any>([])
    const [AllState, setAllState] = useState<any>([])
    const [Alldistricts, setAlldistricts] = useState<any>([])
    const [Allcity, setAllcity] = useState<any>([])
    const [districtdata, setdistrictdata] = useState<any>([])
    const [citydata, setcitydata] = useState<any>([])
    const classes = useAdNewPlan()
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
    const handleChangebazaar = (e: any) => {
        const { value } = e.target;
        console.log(value)
    }
    const handleChangedistrict = (e: any) => {
        const { value } = e.target;
        const int = value.map(Number);
        setdistrictdata([...int])
    }
    const handleChangecity = (e: any) => {
        const { value } = e.target;
        const int = value.map(Number);
        setcitydata([...int])
    }
    const handleduration = (e: any) => {
        const { value } = e.target;
        console.log(value)
    }
    const handletimeslot = (e: any) => {
        const { value } = e.target;
        console.log(value)
    }
    const handlefrequency = (e: any) => {
        const { value } = e.target;
        console.log(value)
    }
    const handleprice = (e: any) => {
        const { value } = e.target;
        console.log(value)
    }
    useEffect(() => {
        getAllLists()
        getAllDisData()
        getAllCityData()
    }, [])
    return (
        <DashboardLayout>
            <div className={classes.root}>
                <div className="container">
                    <div className='flex items-center gap-[24px]'>
                        <button className='text-[#84818A] text-[24px]' onClick={() => { navigate('/advertisement') }}><BiChevronLeft /></button>
                        <div className="commonTitle">New Advertisement Plan</div>
                    </div>
                    <div className='mt-[54px]'>
                        <div className='w-[50%]'>
                            <div className='w-full'>
                                <div className='flex gap-[32px] mb-[27px]'>
                                    <div>
                                        <label className='text-[14px] font-[Manrope] font-[500] text-[#84818A]'>Plan Name</label>
                                        <input type="text" className='border-b block border-[#EBEAED] w-[288px] text-[14px] font-[Manrope] font-[500] text-[#2E2C34] outline-none' />
                                    </div>
                                </div>
                                <div className='flex gap-[32px] mb-[27px]'>
                                    <div>
                                        <label className='text-[14px] block font-[Manrope] font-[500] text-[#84818A]'>Select Bazaar</label>
                                        <Select
                                            open={isOpen}
                                            onClose={() => setisOpen(false)}
                                            onOpen={() => setisOpen(true)}
                                            multiple={false}
                                            variant='standard'
                                            sx={{ height: 20, width: 288, borderBottomColor: '#EBEAED' }}
                                            value={[]}
                                            fullWidth={true}
                                            onChange={handleChangebazaar}
                                        >
                                        </Select>
                                    </div>
                                    <div>
                                        <label className='text-[14px] block font-[Manrope] font-[500] text-[#84818A]'>State</label>
                                        <Select
                                            open={isOpen2}
                                            onClose={() => setisOpen2(false)}
                                            onOpen={() => setisOpen2(true)}
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
                                <div className='flex gap-[32px] mb-[27px]'>
                                    <div>
                                        <label className='text-[14px] block font-[Manrope] font-[500] text-[#84818A]'>District</label>
                                        <Select
                                            open={isOpen3}
                                            onClose={() => setisOpen3(false)}
                                            onOpen={() => setisOpen3(true)}
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
                                        <label className='text-[14px] block font-[Manrope] font-[500] text-[#84818A]'>City</label>
                                        {/* <Select
                                            open={isOpen4}
                                            onClose={() => setisOpen4(false)}
                                            onOpen={() => setisOpen4(true)}
                                            multiple={false}
                                            variant='standard'
                                            sx={{ height: 20, width: 288, borderBottomColor: '#EBEAED' }}
                                            value={[]}
                                            fullWidth={true}
                                            onChange={handleChangecity}
                                        >
                                        </Select> */}
                                         <Select
                                            open={isOpen4}
                                            onClose={() => setisOpen4(false)}
                                            onOpen={() => setisOpen4(true)}
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
                                <div className='flex gap-[32px] mb-[27px]'>
                                    <div>
                                        <label className='text-[14px] font-[Manrope] block font-[500] text-[#84818A]'>Start Date</label>
                                        <input type="date" className="border-b block border-[#EBEAED] w-[288px] text-[14px] font-[Manrope] font-[500] text-[#2E2C34] outline-none" />
                                    </div>
                                    <div>
                                        <label className='text-[14px] font-[Manrope] block font-[500] text-[#84818A]'>Start Time</label>
                                        <input type="time" className="border-b block border-[#EBEAED] w-[288px] text-[14px] font-[Manrope] font-[500] text-[#2E2C34] outline-none" />
                                    </div>
                                </div>
                                <div className='flex gap-[32px] mb-[27px]'>
                                    <div>
                                        <label className='text-[14px] font-[Manrope] block font-[500] text-[#84818A]'>End Date</label>
                                        <input type="date" className="border-b block border-[#EBEAED] w-[288px] text-[14px] font-[Manrope] font-[500] text-[#2E2C34] outline-none" />
                                    </div>
                                    <div>
                                        <label className='text-[14px] font-[Manrope] block font-[500] text-[#84818A]'>End Time</label>
                                        <input type="time" className="border-b block border-[#EBEAED] w-[288px] text-[14px] font-[Manrope] font-[500] text-[#2E2C34] outline-none" />
                                    </div>
                                </div>
                                <div className='flex gap-[32px] mb-[27px]'>
                                    <div>
                                        <label className='text-[14px] block font-[Manrope] font-[500] text-[#84818A]'>Duration</label>
                                        <Select
                                            open={isOpen5}
                                            onClose={() => setisOpen5(false)}
                                            onOpen={() => setisOpen5(true)}
                                            multiple={false}
                                            variant='standard'
                                            sx={{ height: 20, width: 288, borderBottomColor: '#EBEAED' }}
                                            value={[]}
                                            fullWidth={true}
                                            onChange={handleduration}
                                        >
                                        </Select>
                                    </div>
                                    <div>
                                        <label className='text-[14px] block font-[Manrope] font-[500] text-[#84818A]'>Time Slot</label>
                                        <Select
                                            open={isOpen6}
                                            onClose={() => setisOpen6(false)}
                                            onOpen={() => setisOpen6(true)}
                                            multiple={false}
                                            variant='standard'
                                            sx={{ height: 20, width: 288, borderBottomColor: '#EBEAED' }}
                                            value={[]}
                                            fullWidth={true}
                                            onChange={handletimeslot}
                                        >
                                        </Select>
                                    </div>
                                </div>
                                <div className='flex gap-[32px] mb-[45px]'>
                                    <div>
                                        <label className='text-[14px] block font-[Manrope] font-[500] text-[#84818A]'>Frequency</label>
                                        <Select
                                            open={isOpen7}
                                            onClose={() => setisOpen7(false)}
                                            onOpen={() => setisOpen7(true)}
                                            multiple={false}
                                            variant='standard'
                                            sx={{ height: 20, width: 288, borderBottomColor: '#EBEAED' }}
                                            value={[]}
                                            fullWidth={true}
                                            onChange={handlefrequency}
                                        >
                                        </Select>
                                    </div>
                                    <div>
                                        <label className='text-[14px] block font-[Manrope] font-[500] text-[#84818A]'>Price</label>
                                        <Select
                                            open={isOpen8}
                                            onClose={() => setisOpen8(false)}
                                            onOpen={() => setisOpen8(true)}
                                            multiple={false}
                                            variant='standard'
                                            sx={{ height: 20, width: 288, borderBottomColor: '#EBEAED' }}
                                            value={[]}
                                            fullWidth={true}
                                            onChange={handleprice}
                                        >
                                        </Select>
                                    </div>
                                </div>
                                <div className='flex gap-[12px]'>
                                    <button className='h-[36px] border rounded bg-[#FFFFFF] px-[16px] py-[8px] capitalize text-[14px] flex justify-center items-center font-[Manrope] font-[600] text-[#2E2C34]' onClick={() => { navigate('/advertisement') }}>cancel</button>
                                    <button className='h-[36px] border rounded bg-[#4E2FA9] px-[16px] py-[8px] capitalize text-[14px] flex justify-center items-center font-[Manrope] font-[600] text-[#fff]' onClick={() => { navigate('/advertisement') }}>Create Ad Plan</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </DashboardLayout>
    );
}

export default CreateAdsnewplan;