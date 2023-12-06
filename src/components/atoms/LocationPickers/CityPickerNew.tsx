import React, { useState, Fragment } from 'react';
import { Box, TextField, Checkbox } from "@mui/material";
import renderClasses from "classnames";
import { Menu, Transition } from "@headlessui/react";
import { useCommonSelectStyle } from "@/static/stylesheets/molecules";
// import { ChevronDownIcon } from "@heroicons/react/20/solid";
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
function classNames(...classes: any) {
  return classes.filter(Boolean).join(" ");
}
interface CityPickerProps {
  variant?: "outlined" | "button";
  label?: string;
  placeholder?: string;
  hint?: string;
  options?: {
    label: string;
    value: any;
  }[];
  states?: any;
  selectedCity?: any;
  districts?: any;
  selectedStates?: any;
  selectedDistricts?: any;
  selectedcity:any;
  onSelectItem?(id: number[], type?: {all: boolean}): void;
}


const CityPickerNew = (props: CityPickerProps) => {
  const classes = useCommonSelectStyle();
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const [selectedChecked, setSelectedCheck] = useState<any>({});
  const [cityplaceholder, setcityplaceholder] = useState<string[]>([]);
  const [checkAll, setCheckAll] = useState<any>({})
  const { variant, label, onSelectItem, selectedCity, districts } = props;
  const [search, setsearch] = useState("");
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLDivElement>) => {
    setAnchorEl(event.currentTarget);
  };

    console.log(props.selectedDistricts ,props.states,"districtsdistricts1")

  const handleClose = () => {
    setAnchorEl(null);
  };
  const handleOptioncheckd = (e: any, ids: number[],type?: {all: boolean}) => {
    if (onSelectItem) {
      onSelectItem(ids,type);
    }
  }
  React.useEffect(() => {
    (districts || []).forEach((item: any, index: any) => {
      setCheckAll((prev: any) => ({ ...prev, [item.district_name]: selectedCity }));
      (item.city || []).forEach((city: any, i: any) => {
        if (selectedCity.includes(city.id)) {
          setcityplaceholder((prev: string[]) => prev.includes(city.city) ? prev : [...prev, city.city])
        }
      })
    })
  }, [selectedCity, districts])
  const handleAllcheck = (e: any, city: any) => {
    const { name, checked } = e.target;
    handleOptioncheckd(null, city?.map((itm: any) => itm.id), {all: checked})
    const nameData = city?.map((itm: any) => itm.city)
    if (name === 'Allcheck') {
      if (checked === true) {
        setCheckAll({})
        setcityplaceholder((prev: any) => ([...prev, ...nameData]))
      } else {
        const Data = cityplaceholder?.filter((it: any) => !nameData?.includes(it))
        setcityplaceholder([...Data])
      }
    }
  }


  console.log(districts,"cityplaceholder")
  const selectedcitydatas = (e:any) =>{
    // setsearch(e.target.value)
    console.log(e,"ee")
  }
  
  const changedata = (e:any) =>{
    console.log(e.target.value,"ee")
  }
  console.log(props?.selectedStates,props.states,props.districts,"props?.districts")
  return (
    <div className={classes.root}>
      <Menu as="div" className="text-left" onChange={changedata}>
        <div>
          {label && (
            <div className={"text-[#84818a] text-[14px] font-[500] "}>
              {label}
            </div>
          )}
          <Menu.Button
            className={renderClasses("flex w-full", {
              "justify-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-[#84818A] shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:ring-offset-gray-100":
                !variant,
              "justify-between border-b border-b-[#84818A] p-[2px]":
                variant === "outlined",
            })}
          >
            {props.selectedcity.length > 0 ? `View All Cities` : props?.placeholder}
            <span>              
              <ArrowDropDownIcon className="-mr-1 ml-2 w-5 !text-[#84818A]" aria-hidden="true" />
            </span>
          </Menu.Button>
        </div>
        <Transition
          as={Fragment}
          enter="transition ease-out duration-100"
          enterFrom="transform opacity-0 scale-95"
          enterTo="transform opacity-100 scale-100"
          leave="transition ease-in duration-75"
          leaveFrom="transform opacity-100 scale-100"
          leaveTo="transform opacity-0 scale-95"
        >
           <Menu.Items className="absolute top-[98%] right-[-250px] z-10 mt-2 mb-2 origin-top-right overflow-y-auto rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none"  style={{ maxWidth:'calc(100vw - 280px)', maxHeight: "450px", top: "50%", left: "50%", transform: "translate(-50%, -50%)" }}>
            <div className={"min-w-[300px] px-[20px] py-[10px]"}>
              <div className={"border-b border-b-[1px solid #EEEEEE] mb-[20px]"}>
                <input
                  type={"search"}
                  className={"p-[5px] w-[100%] outline-0"}
                  placeholder={"Search"}
                  onChange={(e:any)=>setsearch(e.target.value)}
                />
              </div>
              <div className={"flex flex-row gap-[40px]"}>
                {(props?.districts || []) && props?.districts.map((item: any, index: any) => {
                  return <div className={"flex flex-col gap-[5px]"} key={index}>

                    <div className={"font-bold mb-[5px] flex flex-row items-center gap-[10px]"}>
                      <Checkbox name='Allcheck' checked={item.city.filter((i: any) => checkAll?.[item?.district_name]?.includes(i.id))?.length === item.city.length} onChange={(e) => handleAllcheck(e, item.city)} />
                      {/* <input type={"checkbox"} /> */}
                      <span className={"text-[#FF6652]"}> {item.district_name || "NaN"}</span>
                    </div>
                    <div className={"px-[12px] flex flex-col gap-[5px]"}>
                    {console.log(item,"item11")}
                      {(item.city.filter((elm: any) => elm.city.toLowerCase().includes(search.toLowerCase())) || []).map((city: any, i: any) => (
                        <>
                          {
                            selectedCity?.includes(city.id) &&
                        <div className={"flex items-center gap-[10px]"} key={i}>
                          <>
                            <>
                            <Checkbox
                              id="radio"
                              name="radio"
                              aria-multiline
                              checked={selectedCity?.includes(city.id) ? true : false}
                              onChange={(e) => {
                                handleOptioncheckd(e, [city?.id])
                                if (e.target.checked) {
                                  setcityplaceholder([...cityplaceholder, city.city])
                                } else {
                                  let tempArr = cityplaceholder;
                                  const index = tempArr.indexOf(city.city);
                                  if (index > -1) { // only splice array when item is found
                                    tempArr.splice(index, 1); // 2nd parameter means remove one item only
                                  }
                                  setcityplaceholder([...tempArr])
                                }
                              }}
                            />
                            {city.city}
                            </>
                          </>
                          {/* <input type={"checkbox"} />
                 <span>Dhaka</span> */}
                        </div>
                }
                        </>
                      ))}
                      {(item.city.filter((elm: any) => elm.city.toLowerCase().includes(search.toLowerCase())) || []).map((city: any, i: any) => (
                        <>
                          {
                            !selectedCity?.includes(city.id) &&
                        <div className={"flex items-center gap-[10px]"} key={i}>
                          <>
                            <>
                            <Checkbox
                              id="radio"
                              name="radio"
                              aria-multiline
                              checked={selectedCity?.includes(city.id) ? true : false}
                              onChange={(e) => {
                                handleOptioncheckd(e, [city?.id])
                                if (e.target.checked) {
                                  setcityplaceholder([...cityplaceholder, city.city])
                                } else {
                                  let tempArr = cityplaceholder;
                                  const index = tempArr.indexOf(city.city);
                                  if (index > -1) { // only splice array when item is found
                                    tempArr.splice(index, 1); // 2nd parameter means remove one item only
                                  }
                                  setcityplaceholder([...tempArr])
                                }
                              }}
                            />
                            {city.city}
                            </>
                          </>
                          {/* <input type={"checkbox"} />
                        <span>Dhaka</span> */}
                        </div>
                      }
                        </>
                      ))}
                    </div>
                  </div>
                })}
              </div>
            </div>
          </Menu.Items>
        </Transition>
      </Menu>
    </div>
  );
};
export { CityPickerNew };