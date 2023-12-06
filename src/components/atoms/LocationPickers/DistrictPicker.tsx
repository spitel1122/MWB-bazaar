import { Fragment, useEffect, useState } from "react";
import { Menu, Transition } from "@headlessui/react";
// import { ChevronDownIcon } from "@heroicons/react/20/solid";
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import { Checkbox, Grid } from "@mui/material";
import { useCommonSelectStyle } from "@/static/stylesheets/molecules";
import renderClasses from "classnames";
function classNames(...classes: any) {
  return classes.filter(Boolean).join(" ");
}
interface DistrictPickerProps {
  variant?: "outlined";
  label?: string;
  placeholder?: string;
  hint?: string;
  options?: {
    label: string;
    value: any;
  }[];
  districts?: any[];
  states?: any[];
  selectedDistricts?: any[];
  selectedStates?: any[];
  onSelectItem?(id: number[], type?: {all: boolean}): void;
}
export default function DistrictPicker(props: DistrictPickerProps) {
  const classes = useCommonSelectStyle();
  const [selectedChecked, setSelectedCheck] = useState<any>({});
  const [districtplaceholder, setdistrictplaceholder] = useState<any>([]);
  const [newdistrictplaceholder, setNewdistrictplaceholder] = useState<any>([]);
  const [alldistricts, setAllDistricts] = useState<any>([]);
  const [alldistricts1, setAllDistricts1] = useState<any>([]);
  const [checkAll, setCheckAll] = useState<any>({})
  const [search, setsearch] = useState("");
  const [disarray,setdisarray] = useState<any>([]);
  const {
    variant,
    label,
    states,
    districts,
    selectedDistricts,
    selectedStates,
    onSelectItem,
  } = props;

  
  
  useEffect(()=>{
    const array1:any = []
    districts?.length && districts?.map((x:any)=>{
      x.district?.map((y:any)=>{
        return ( array1.push(y.district) )
      })
    })
    const array:any = new Set(array1)
    setdisarray([...array])
  },[districts])

  useEffect(()=>{
    setNewdistrictplaceholder([])
    disarray?.map((x:any)=>{
      districtplaceholder?.map((y:any)=>{
       return ( x == y &&  setNewdistrictplaceholder((prev:any)=>[...prev,y])) 
      })
    })
  },[disarray])

    console.log(newdistrictplaceholder,"disarraydisarray")
  
  const handleOptioncheckd = (e: any, ids: number[],type?: {all: boolean}) => {
    if(onSelectItem){
      onSelectItem(ids, type)
    }
  }

  const checkvalus = (e:any,district:any) => {
    if(e.target.checked){
      setdistrictplaceholder([...districtplaceholder, district])
    }
    else{
      let data = districtplaceholder.filter((x:any)=>x != district)
      setdistrictplaceholder([...data])
    }
  }

  useEffect(()=>{
    selectedStates?.map((x:any)=>{
      let data1 = states?.find((y:any)=>{
          return Number(y?.id) === Number(x)   
      })
    })
  },[selectedStates])

  const handleAllcheck = (e: any, dis: any) => {
    const { name, checked } = e.target;
    const FilterData: any = districts?.filter((itm: any) => itm?.state_name === dis);
    if (FilterData?.length > 0) {
      handleOptioncheckd(null, FilterData[0]?.district?.map((itm: any) => itm.id), {all: checked})
      const nameData = FilterData[0]?.district?.map((itm: any) => itm.district)
      if (name === 'Allcheck') {
        if (checked === true) {
          setCheckAll({})
          setdistrictplaceholder((prev: any) => ([...prev, ...nameData]))
        } else {
          const Data = districtplaceholder?.filter((it: any) => nameData != it)
          console.log("nameData",dis)
          setdistrictplaceholder([])
        }
      }
    }
  }

  useEffect(() => {
    (districts || []).forEach((item: any, index: any) => {
      setCheckAll((prev: any) => ({ ...prev, [item.state_name]: selectedDistricts }));
      (item.district || []).forEach((city: any, i: any) => {
        if (selectedDistricts?.includes(city.id)) {
          setdistrictplaceholder((prev: string[]) => prev.includes(city.district) ? prev : [...prev, city.district])
        }
      })
    })
  }, [selectedDistricts, districts])


  console.log(selectedDistricts,"selectedDistricts1")

  return (
    <div className={classes.root}>
      <Menu as="div" className="text-left">
        <div>
          {label && (
            <div className={"text-[#84818A] text-[14px] font-[500] "}>
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
            {newdistrictplaceholder.length > 0 ? `View All District` : props?.placeholder}
            <span>
              <ArrowDropDownIcon className="-mr-1 ml-2 w-5 !text-[#84818A]" aria-hidden="true" />
            </span>
          </Menu.Button>
        </div>
        {
          selectedStates?.length && districts?.length ?
          <Transition
          as={Fragment}
          enter="transition ease-out duration-100"
          enterFrom="transform opacity-0 scale-95"
              enterTo="transform opacity-100 scale-100"
              leave="transition ease-in duration-75"
              leaveFrom="transform opacity-100 scale-100"
              leaveTo="transform opacity-0 scale-95"
            >
              <Menu.Items className="absolute z-10 mt-2 !top-[-98%] w-[600px] mb-2 origin-top-right overflow-y-auto rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none" style={{ maxWidth: 'calc(100vw - 280px)', maxHeight: "450px", top: "50%", left: "50%", transform: "translate(-50%, -50%)" }}>
                <div className="py-1">
                  {/* <p className="border-b-2 py-[10px] px-[40px] selectTitle">
                {" "}
                {props?.hint}
              </p> */}
                  <div className={"border-b border-b-[1px solid #EEEEEE] mb-[20px]"}>
                    <input
                      type={"search"}
                      className={"p-[5px] w-[100%] outline-0"}
                      placeholder={"Search"}
                      onChange={(e) => setsearch(e.target.value)}
                      />
                  </div>
                  <div className={"p-[15px] flex h-[300px] gap-[10px]"}>
                    {(selectedStates ?? []).map((stateId: number, index) => {
                      const stateData = (states ?? []).find(
                        (s) => Number(s?.id) === Number(stateId)
                        );
                        const stateDistricts =
                        (districts ?? []).find(
                          (d) => Number(d?.state) === Number(stateId)
                          )?.district ?? [];
                          return (
                            <div key={index} className={"flex-grow w-[150px]"}>
                          <div
                            className={
                              "font-bold border-b-[1px] border-[#DDDDDD] mb-[10px] text-[#4D4D4D] text-[16px] pb-[4px] whitespace-nowrap"
                            }
                            >
                            <Checkbox name="Allcheck" checked={stateDistricts?.length && stateDistricts.filter((item: any) => checkAll?.[stateData?.state]?.includes(item.id))?.length === stateDistricts?.length}  onChange={(e) => { handleAllcheck(e, stateData?.state) }} />  Select District
                          </div>
                          {stateDistricts?.length ? stateDistricts?.filter((elm: any) => elm?.district?.toLowerCase().includes(search.toLowerCase()))?.map((item: any, index: number) => {
                            const isSelected =
                              (selectedDistricts ?? []).findIndex(
                                (id) => Number(id) === Number(item?.id)
                              ) > -1;
                            return (
                              <>
                              {
                                selectedDistricts?.includes(item?.id) && <a
                                key={index}
                                className={classNames(
                                  "text-gray-700",
                                  "px-[3px] py-[3px] text-sm optionTitle flex items-center"
                                )}
                              >
                                <>
                                  <Checkbox
                                    // checked={isSelected}
                                    checked={selectedDistricts?.includes(item?.id) ? true : false}
                                    onChange={(e) => {
                                      handleOptioncheckd(e, [item?.id])
                                      // setSelectedCheck([
                                      //   e.target
                                      // ]);
                                      checkvalus(e,item.district)
                                    }}
                                  />

                                  {item?.district}
                                </>
                              </a>
                              }</>
                            );
                          }) : ""}
                          {stateDistricts?.length ? stateDistricts?.filter((elm: any) => elm?.district?.toLowerCase().includes(search.toLowerCase()))?.map((item: any, index: number) => {
                            const isSelected =
                              (selectedDistricts ?? []).findIndex(
                                (id) => Number(id) === Number(item?.id)
                              ) > -1;
                            return (
                              <>
                              {
                                !selectedDistricts?.includes(item?.id) && <a
                                key={index}
                                className={classNames(
                                  "text-gray-700",
                                  "px-[3px] py-[3px] text-sm optionTitle flex items-center"
                                )}
                              >
                                <>
                                  <Checkbox
                                    // checked={isSelected}
                                    checked={selectedDistricts?.includes(item?.id) ? true : false}
                                    onChange={(e) => {
                                      handleOptioncheckd(e, [item?.id])
                                      // setSelectedCheck([
                                      //   e.target
                                      // ]);
                                      checkvalus(e,item.district)
                                    }}
                                  />

                                  {item?.district}
                                </>
                              </a>
                              }</>
                            );
                          }) : ""}
                        </div>
                      );
                    })}
                    {/*<div className={"flex-grow w-[150px]"}>
                  <div
                    className={"font-bold border-b-[1px] border-[#DDDDDD] mb-[10px] text-[#4D4D4D] text-[16px] pb-[4px]"}>Dhaka
                  </div>
                  <a
                    className={classNames(
                      "text-gray-700",
                      "block px-[3px] py-[3px] text-sm optionTitle"
                    )}
                  >
                    <>
                      <Checkbox id="radio" name="radio" aria-multiline />
                      Option 1
                    </>
                  </a>
                  <a
                    className={classNames(
                      "text-gray-700",
                      "block px-[3px] py-[3px] text-sm optionTitle"
                    )}
                  >
                    <>
                      <Checkbox id="radio" name="radio" aria-multiline />
                      Option 1
                    </>
                  </a>
                  <a
                    className={classNames(
                      "text-gray-700",
                      "block px-[3px] py-[3px] text-sm optionTitle"
                    )}
                  >
                    <>
                      <Checkbox id="radio" name="radio" aria-multiline />
                      Option 1
                    </>
                  </a>
                  <a
                    className={classNames(
                      "text-gray-700",
                      "block px-[3px] py-[3px] text-sm optionTitle"
                    )}
                  >
                    <>
                      <Checkbox id="radio" name="radio" aria-multiline />
                      Option 1
                    </>
                  </a>
3:37
<a
                    className={classNames(
                      "text-gray-700",
                      "block px-[3px] py-[3px] text-sm optionTitle"
                    )}
                  >
                    <>
                      <Checkbox id="radio" name="radio" aria-multiline />
                      Option 1
                    </>
                  </a>
                </div>
                <div className={"flex-grow w-[150px]"}>
                  <div
                    className={"font-bold border-b-[1px] border-[#DDDDDD] mb-[10px] text-[#4D4D4D] text-[16px] pb-[4px]"}>Cumilla
                  </div>
                  <a
                    className={classNames(
                      "text-gray-700",
                      "block px-[3px] py-[3px] text-sm optionTitle"
                    )}
                  >
                    <>
                      <Checkbox id="radio" name="radio" aria-multiline />
                      Option 1
                    </>
                  </a>
                  <a
                    className={classNames(
                      "text-gray-700",
                      "block px-[3px] py-[3px] text-sm optionTitle"
                    )}
                  >
                    <>
                      <Checkbox id="radio" name="radio" aria-multiline />
                      Option 1
                    </>
                  </a>
                  <a
                    className={classNames(
                      "text-gray-700",
                      "block px-[3px] py-[3px] text-sm optionTitle"
                    )}
                  >
                    <>
                      <Checkbox id="radio" name="radio" aria-multiline />
                      Option 1
                    </>
                  </a>
                  <a
                    className={classNames(
                      "text-gray-700",
                      "block px-[3px] py-[3px] text-sm optionTitle"
                    )}
                  >
                    <>
                      <Checkbox id="radio" name="radio" aria-multiline />
                      Option 1
                    </>
                  </a>
                  <a
                    className={classNames(
                      "text-gray-700",
                      "block px-[3px] py-[3px] text-sm optionTitle"
                    )}
                  >
                    <>
                      <Checkbox id="radio" name="radio" aria-multiline />
                      Option 1
                    </>
                  </a>
                </div>
                <div className={"flex-grow w-[150px]"}>
                  <div
                    className={"font-bold border-b-[1px] border-[#DDDDDD] mb-[10px] text-[#4D4D4D] text-[16px] pb-[4px]"}>Rajshahi
                  </div>
                  <a
                    className={classNames(
                      "text-gray-700",
                      "block px-[3px] py-[3px] text-sm optionTitle"
                    )}
                  >
                    <>
                      <Checkbox id="radio" name="radio" aria-multiline />
                      Option 1
                    </>
                  </a>
                  <a
                    className={classNames(
                      "text-gray-700",
                      "block px-[3px] py-[3px] text-sm optionTitle"
                    )}
                  >
                    <>
                      <Checkbox id="radio" name="radio" aria-multiline />
                      Option 1
                    </>
                  </a>
                  <a
                    className={classNames(
                      "text-gray-700",
                      "block px-[3px] py-[3px] text-sm optionTitle"
                    )}
                  >
                    <>
                      <Checkbox id="radio" name="radio" aria-multiline />
                      Option 1
                    </>
                  </a>
                  <a
                    className={classNames(
                      "text-gray-700",
                      "block px-[3px] py-[3px] text-sm optionTitle"
                    )}
                  >
                    <>
                      <Checkbox id="radio" name="radio" aria-multiline />
                      Option 1
                    </>
                  </a>
                  <a
                    className={classNames(
                      "text-gray-700",
                      "block px-[3px] py-[3px] text-sm optionTitle"
                    )}
                  >
                    <>
                      <Checkbox id="radio" name="radio" aria-multiline />
                      Option 1
                    </>
                  </a>
                </div>*/}
                  </div>
                </div>
              </Menu.Items>
            </Transition> : null
        }
      </Menu>
    </div>
  );
}







