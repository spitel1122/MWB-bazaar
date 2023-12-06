// import React from "react";
// import { DashboardLayout } from "@/components/layouts";
// import { useaddAdvertisementStyles } from "@/static/stylesheets/screens";
// import PaymentDetails from "@/components/molecules/PaymentDetails/PaymentDetails";
// const AddAdvertisement = () => {
//   const classes = useaddAdvertisementStyles();
//   return (
//     <>
//       <DashboardLayout>
//         <div className={classes.root}>
//           <div>
//             <PaymentDetails />
//           </div>
//         </div>
//       </DashboardLayout>
//     </>
//   );
// };
// export default AddAdvertisement;
import React, { useState, useEffect } from "react";
import { DashboardLayout } from "@/components/layouts";
import { useaddAdvertisementStyles } from "@/static/stylesheets/screens";
import { AppService } from "@/service/AllApiData.service";
import { MenuItem, Select, Checkbox, ListItemText } from "@mui/material";
import { BiChevronLeft } from 'react-icons/bi';
import { AiFillCloseCircle } from 'react-icons/ai';
import ImageIcon from '@mui/icons-material/Image';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import { useNavigate } from 'react-router-dom';
import { NavLink } from "react-router-dom";
import { Alert, AlertError } from "@/alert/Alert";
import { readFileAsBase64 } from "@/helper/base64";
const AddAdvertisement = () => {
  const classes = useaddAdvertisementStyles();
  const [isOpen, setisOpen] = useState(false)
  const [isOpen2, setisOpen2] = useState(false)
  const [isOpen3, setisOpen3] = useState(false)
  const [isOpen4, setisOpen4] = useState(false)
  const [isOpen5, setisOpen5] = useState(false)
  const [statedata, setstatedata] = useState<any>([])
  const [refAlldata, setrefAlldata] = useState<any>([])
  const [AllState, setAllState] = useState<any>([])
  const [media, setMedia] = useState<any>('')
  const [media1, setMedia1] = useState<any>(null)
  const navigate = useNavigate();
  const getAllLists = async () => {
    const responseJson = await AppService.getTotalStates();
    setAllState(responseJson.data);
  }
  const [AddAdvertisement, setaddAdvertisement] = useState<any>({
    ad_title: '',
    created_for: [],
    start_date: '',
    start_time: '',
    choose_plan: [],
    gst: "",
    referral: '',
    select_state: []
  })
  const [Addrefdata, setAddrefdata] = useState({
    commission: '',
    enter_percentage: '',
    selectref: null
  })
  const [Addrefdataerr, setAddrefdataerr] = useState({
    commission: '',
    enter_percentage: '',
    selectref: null
  })
  const handleSaveAds = async () => {
    try {
      if (Addrefdata?.selectref !== null && Addrefdata?.commission !== '' && Addrefdata?.enter_percentage !== '') {
        const findbyid = refAlldata?.find((it: any) => it?.id === Addrefdata?.selectref)
        const payload = {
          referred_by: findbyid?.referred_by,
          commission: Addrefdata?.commission?.toUpperCase(),
          enter_percentage: Addrefdata?.enter_percentage + "%"
        }
        const Appdata = await AppService?.Postrefrence(payload)
        if (Appdata?.status === 201) {
          setAddrefdata({
            commission: '',
            enter_percentage: '',
            selectref: null
          })
          Alert('SuccessFully Added')
        }
      } else {
        if (Addrefdata?.selectref === null) {
          setAddrefdataerr((prv: any) => ({ ...prv, selectref: 'Please Select Reference.' }))
        } else {
          setAddrefdataerr((prv: any) => ({ ...prv, selectref: null }))
        }
        if (Addrefdata?.commission === '') {
          setAddrefdataerr((prv: any) => ({ ...prv, commission: 'Please Fill This Field.' }))
        } else {
          setAddrefdataerr((prv: any) => ({ ...prv, commission: '' }))
        }
        if (Addrefdata?.enter_percentage === '') {
          setAddrefdataerr((prv: any) => ({ ...prv, enter_percentage: 'Please Enter Any Number.' }))
        } else {
          setAddrefdataerr((prv: any) => ({ ...prv, enter_percentage: '' }))
        }
      }
    } catch (error: any) {
      let message = error.response.data.type + "\n"
      error.response.data.errors.map((row: any) => {
        message += row.attr + " : " + row.detail + "\n"
      })
      AlertError(message);
    }
  }
  const handleChangemedia = async (e: any) => {
    const { name, files } = e.target;
    const reader = new FileReader();
    if (files.length > 0) {
      reader.onloadend = () => {
        setMedia(reader.result);
      };
      if (files[0] && files?.length > 0) {
        reader.readAsDataURL(files[0]);
      }
      const base64data = await readFileAsBase64(files[0])
      setMedia1(base64data)
    }
  }
  const handleChangeAllads = async (e: any) => {
    const { name, value } = e.target;
    if (name === 'select_state') {
      const int = value.map(Number);
      setaddAdvertisement((prev: any) => ({ ...prev, select_state: [...int] }))
    }
    if (name === 'ad_title') {
      setaddAdvertisement((prev: any) => ({ ...prev, ad_title: value }))
    }
    if (name === 'start_date') {
      setaddAdvertisement((prev: any) => ({ ...prev, start_date: value }))
    }
    if (name === 'start_time') {
      setaddAdvertisement((prev: any) => ({ ...prev, start_time: value }))
    }
    if (name === 'gst') {
      setaddAdvertisement((prev: any) => ({ ...prev, gst: value }))
    }
  }
  const handleCommission = (e: any) => {
    const { name, value } = e?.target;
    if (name === 'commission') {
      if (!value) {
        setAddrefdataerr((prv: any) => ({ ...prv, commission: 'Please Fill This Field.' }))
      } else {
        setAddrefdataerr((prv: any) => ({ ...prv, commission: '' }))
        setAddrefdata((prev: any) => ({ ...prev, commission: value }))
      }
    }
    if (name === 'referred_by') {
      if (!value) {
        setAddrefdataerr((prv: any) => ({ ...prv, selectref: 'Please Select Reference.' }))
      } else {
        setAddrefdataerr((prv: any) => ({ ...prv, selectref: null }))
        setAddrefdata((prev: any) => ({ ...prev, selectref: value }))
      }
    }
    if (name === 'enter_percentage') {
      if (value === '') {
        setAddrefdataerr((prv: any) => ({ ...prv, enter_percentage: 'Please Enter Any Number.' }))
      } else {
        setAddrefdataerr((prv: any) => ({ ...prv, enter_percentage: '' }))
        setAddrefdata((prev: any) => ({ ...prev, enter_percentage: value }))
      }
    }
  }
  const refencelistAll = async () => {
    const responceJson = await AppService.getAllrefrence()
    setrefAlldata(responceJson?.data?.results)
  }
  useEffect(() => {
    getAllLists()
    refencelistAll()
  }, [])
  return (
    <>
      <DashboardLayout>
        <div className={classes.root}>
          <div className="container">
            <div className='flex items-center gap-[24px]'>
              <button className='text-[#84818A] text-[24px]' onClick={() => { navigate('/advertisement') }}><BiChevronLeft /></button>
              <div className="commonTitle">New Advertisement</div>
            </div>
            <div className='mt-[54px]'>
              <div className='w-[50%]'>
                <div className='w-full'>
                  <div className='flex gap-[32px] mb-[39px]'>
                    <div>
                      <label className='text-[14px] font-[Manrope] font-[500] text-[#84818A]'>Ad Title</label>
                      <input type="text" name="ad_title" onChange={(e) => { handleChangeAllads(e) }} className='border-b block border-[#EBEAED] w-[288px] text-[14px] font-[Manrope] font-[500] text-[#2E2C34] outline-none' />
                    </div>
                    <div>
                      <label className='text-[14px] block font-[Manrope] font-[500] text-[#84818A]'>Select State</label>
                      <Select
                        open={isOpen}
                        onClose={() => setisOpen(false)}
                        onOpen={() => setisOpen(true)}
                        multiple={true}
                        variant='standard'
                        name="select_state"
                        sx={{ height: 20, width: 288, borderBottomColor: '#EBEAED' }}
                        value={AddAdvertisement?.select_state}
                        fullWidth={true}
                        renderValue={(selected: any) => {
                          var data: any = [];
                          AllState.map((item: any) => {
                            if (selected.includes(item?.id)) {
                              data.push(item.state)
                            }
                          })
                          return data.join(', ')
                        }
                        }
                        onChange={handleChangeAllads}
                      >
                        {AllState.map((items: any) => {
                          return (
                            <MenuItem key={items.id} value={items.id}>
                              <Checkbox checked={AddAdvertisement?.select_state.indexOf(items.id) > -1} />
                              <ListItemText primary={items.state} />
                            </MenuItem>
                          )
                        }
                        )}
                      </Select>
                    </div>
                  </div>
                  <div className='flex gap-[32px] mb-[39px] items-center'>
                    <div>
                      <label className='text-[14px] block font-[Manrope] font-[500] text-[#84818A]'>Created for</label>
                      <Select
                        open={isOpen2}
                        onClose={() => setisOpen2(false)}
                        onOpen={() => setisOpen2(true)}
                        multiple={false}
                        variant='standard'
                        name=""
                        sx={{ height: 20, width: 288, borderBottomColor: '#EBEAED' }}
                        value={AddAdvertisement?.created_for}
                        fullWidth={true}
                        onChange={handleChangeAllads}
                      >
                      </Select>
                    </div>
                    <div>
                      <NavLink to={'/createadclient'} className={'text-[#4E2FA9] underline text-[15px] font-[Manrope] font-[600]'}>Add New Client</NavLink>
                    </div>
                  </div>
                  <div className='flex gap-[32px] mb-[41px]'>
                    <div>
                      <label className='text-[14px] font-[Manrope] block font-[500] text-[#84818A]'>Start Date</label>
                      <input type="date" name="start_date" onChange={(e) => { handleChangeAllads(e) }} className="border-b block border-[#EBEAED] w-[288px] text-[14px] font-[Manrope] font-[500] text-[#2E2C34] outline-none" />
                    </div>
                    <div>
                      <label className='text-[14px] font-[Manrope] block font-[500] text-[#84818A]'>Start Time</label>
                      <input type="time" name="start_date" onChange={(e) => { handleChangeAllads(e) }} className="border-b block border-[#EBEAED] w-[288px] text-[14px] font-[Manrope] font-[500] text-[#2E2C34] outline-none" />
                    </div>
                  </div>
                  <div className='flex gap-[32px] mb-[39px] items-center'>
                    <div>
                      <label className='text-[14px] block font-[Manrope] font-[500] text-[#84818A]'>Choose Plan</label>
                      <Select
                        open={isOpen3}
                        onClose={() => setisOpen3(false)}
                        onOpen={() => setisOpen3(true)}
                        multiple={false}
                        variant='standard'
                        sx={{ height: 20, width: 288, borderBottomColor: '#EBEAED' }}
                        value={AddAdvertisement?.choose_plan}
                        fullWidth={true}
                        onChange={handleChangeAllads}
                      >
                      </Select>
                    </div>
                    <div>
                      <NavLink to={'/createadsplan'} className={'text-[#4E2FA9] underline text-[15px] font-[Manrope] font-[600]'}>Create new Plan</NavLink>
                    </div>
                  </div>
                  <div className='flex gap-[32px] mb-[39px]'>
                    <div>
                      <label className='text-[14px] block font-[Manrope] font-[500] text-[#84818A]'>GST</label>
                      {/* <Select
                        open={isOpen4}
                        onClose={() => setisOpen4(false)}
                        onOpen={() => setisOpen4(true)}
                        multiple={false}
                        variant='standard'
                        sx={{ height: 20, width: 288, borderBottomColor: '#EBEAED' }}
                        value={[]}
                        fullWidth={true}
                        onChange={handleChangegst}
                      >
                      </Select> */}
                      <input type="text" name="gst" onChange={(e) => { handleChangeAllads(e) }} className="border-b block border-[#EBEAED] w-[288px] text-[14px] font-[Manrope] font-[500] text-[#2E2C34] outline-none" />
                    </div>
                  </div>
                  <div className='mb-[30px] flex flex-col gap-[9px] mt-[2px]'>
                    <div>
                      <p className='text-[18px] font-[Manrope] font-[600] text-[#2E2C34]'>Media</p>
                      <div className="w-[163px] flex justify-center h-[165px] relative border border-[#B6B4BA] rounded border-dashed">
                        <input type="file" className="opacity-0 w-full h-full absolute" onChange={(e) => { handleChangemedia(e) }} />
                        {media !== '' ?
                          <>
                            <div className="absolute top-1 right-1 z-[5]">
                              <button className="text-[#4E2FA9]" onClick={() => { setMedia(''); setMedia1(null) }}><AiFillCloseCircle /></button>
                            </div>
                            <img src={media} className="w-full relative h-full rounded object-cover" />
                          </>
                          :
                          <div className="w-full h-full gap-[17px] flex justify-center items-center flex-col">
                            <span className="text-[#4E2FA9]"><ImageIcon /></span>
                            <p className="text-[#4E2FA9] text-[14px] font-[Manrope] font-[600]">Browse image..</p>
                          </div>
                        }
                      </div>
                    </div>
                  </div>
                  <div className="w-[608px] mb-[40px]">
                    <p className="text-[#2E2C34] text-[18px] font-[Manrope] font-[600]">Referral (Optional)</p>
                    <div className="mt-[31px] mb-[22px]">
                      <label className='text-[14px] block font-[Manrope] font-[500] text-[#84818A]'>Referred By</label>
                      <Select
                        open={isOpen5}
                        onClose={() => setisOpen5(false)}
                        onOpen={() => setisOpen5(true)}
                        multiple={false}
                        variant='standard'
                        sx={{ height: 20, borderBottomColor: '#EBEAED' }}
                        value={Addrefdata?.selectref}
                        fullWidth={true}
                        name="referred_by"
                        onChange={handleCommission}
                        renderValue={(selected: any) => {
                          let data = null;
                          data = refAlldata?.find((it: any) => it?.id === selected)?.referred_by;
                          return data
                        }
                        }
                      >
                        {refAlldata.map((items: any) => {
                          return (
                            <MenuItem key={items.id} value={items.id}>
                              <Checkbox checked={Addrefdata?.selectref === items?.id} />
                              <ListItemText primary={items.referred_by} />
                            </MenuItem>
                          )
                        }
                        )}
                      </Select>
                      <div>
                        {Addrefdataerr?.selectref !== null && <p className="text-[red] text-[14px] font-[Manrope] font-[500]">{Addrefdataerr?.selectref}</p>}
                      </div>
                    </div>
                    <div className="mb-[22px]">
                      <p className="text-[#2E2C34] text-[14px] font-[Manrope] font-[500] mb-[16px]">Commission</p>
                      <div className="flex justify-between w-[288px]">
                        <div className="flex items-center gap-[14px]">
                          <input type="radio" id="fix" checked={Addrefdata?.commission === 'Fixed' ? true : false} onChange={(e) => { handleCommission(e) }} className="w-[20px] h-[20px] accent-[#4E2FA9]" value='Fixed' name="commission" /> <label htmlFor="fix" className="text-[14px] text-[#84818A] font-[500] font-[Manrope]">Fixed</label>
                        </div>
                        <div className="flex items-center gap-[14px]">
                          <input type="radio" id="per" checked={Addrefdata?.commission === 'Percentage' ? true : false} onChange={(e) => { handleCommission(e) }} className="w-[20px] h-[20px] accent-[#4E2FA9]" value='Percentage' name="commission" /> <label htmlFor='per' className="text-[14px] text-[#84818A] font-[500] font-[Manrope]">Percentage</label>
                        </div>
                      </div>
                      <div>
                        {Addrefdataerr?.commission !== '' && <p className="text-[red] text-[14px] font-[Manrope] font-[500]">{Addrefdataerr?.commission}</p>}
                      </div>
                    </div>
                    <div>
                      <div>
                        <label className='text-[14px] font-[Manrope] font-[500] text-[#84818A]'>Enter Percentage</label>
                        <input type="number" name="enter_percentage" onChange={(e) => { handleCommission(e) }} className='border-b block border-[#4E2FA9] w-[288px] text-[14px] font-[Manrope] font-[500] text-[#2E2C34] outline-none' />
                      </div>
                      <div>
                        {Addrefdataerr?.enter_percentage !== '' && <p className="text-[red] text-[14px] font-[Manrope] font-[500]">{Addrefdataerr?.enter_percentage}</p>}
                      </div>
                    </div>
                  </div>
                  <div className='flex gap-[12px]'>
                    <button className='h-[36px] border rounded bg-[#FFFFFF] px-[16px] py-[8px] capitalize text-[14px] flex justify-center items-center font-[Manrope] font-[600] text-[#2E2C34]' onClick={() => { navigate('/advertisement') }}>cancel</button>
                    <button className='h-[36px] border rounded bg-[#4E2FA9] px-[16px] py-[8px] capitalize text-[14px] flex justify-center items-center font-[Manrope] font-[600] text-[#fff]' onClick={() => { handleSaveAds() }}>Create Ad</button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </DashboardLayout>
    </>
  );
};
export default AddAdvertisement;
