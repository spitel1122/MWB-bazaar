import { Fragment, useState } from "react";
import { Menu, Transition } from "@headlessui/react";
import { ChevronDownIcon } from "@heroicons/react/20/solid";
import { Checkbox } from "@mui/material";
import { useCommonSelectStyle } from "@/static/stylesheets/molecules";
import renderClasses from "classnames";

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
  selectedDistricts?: any;
  districts?: any;
  selectedStates?: any;

  onSelectItem?(id: any): void;
}

export default function CityPicker(props: CityPickerProps) {
  const classes = useCommonSelectStyle();
  const [selectedChecked, setSelectedCheck] = useState<any>({});
  const [cityplaceholder, setcityplaceholder] = useState<any>([]);
  const { variant, label, onSelectItem } = props;
  console.log("p", props);

  const handleOptioncheckd = (id: any) => {
    const isChecked = selectedChecked[id];
    setSelectedCheck((prevState: any) => ({
      ...prevState,
      [id]: !isChecked,
    }));

  }

  return (
    <div className={classes.root}>
      <Menu as="div" className="relative text-left">
        <div>
          {label && (
            <div className={"text-[#84818a] text-[14px] font-[500] "}>
              {label}
            </div>
          )}
          <Menu.Button
            className={renderClasses(
              "flex w-full border-gray-300 bg-white px-4 py-2 text-sm font-medium text-[#84818A] shadow-sm hover:bg-grill",
              {
                "justify-center rounded-md border-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:ring-offset-gray-100":
                  !variant,
                "justify-between border-b border-b-[#84818A] p-[2px]":
                  variant === "outlined",
                "justify-between border border-offset-gray-100 rounded-md p-[2px]":
                  variant === "button",
              }
            )}
          >
            {cityplaceholder.length > 0 ? `View ${props?.placeholder}` : props?.placeholder}
            <ChevronDownIcon className="-mr-1 ml-2 w-5" aria-hidden="true" />
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
          <Menu.Items className="absolute z-10 mt-2 mb-2 origin-top-right overflow-y-auto rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none" style={{ maxWidth: 'calc(100vw - 280px)', maxHeight: "450px", top: "50%", left: "50%", transform: "translate(-50%, -50%)" }}>
            <div className="py-1">
              {/* <p className="border-b-2 py-[10px] px-[40px] selectTitle">
                {props?.hint}
              </p>*/}
              {(props?.districts || []).map((item: any, index: any) => (
                <div className={"mb-[10px] py-[15px] px-[25px]"} key={index}>
                  <div
                    className={"font-bold mb-[10px] text-[#ff6652] text-[20px]"}
                  >
                    {item.district_name || "NaN"}
                    {/* {stateData?.state} */}
                  </div>
                  <div className={"px-[15px]"}>
                    <div className={"flex h-[300px] gap-[10px]"}>
                      {(item.city || []).map((city: any, i: any) => (
                        <div className={"flex-grow w-[150px]"} key={i}>
                          {/* <div
                            className={
                              "font-bold border-b-[1px] border-[#dddddd] mb-[10px] text-[#4d4d4d] text-[16px] pb-[4px]"
                            }
                          >
                            "Denis"
                          </div> */}
                          <a
                            className={classNames(
                              "text-gray-700",
                              "block px-[0px] py-[0px] text-[14px] optionTitle"
                            )}
                          >
                            <>
                              <Checkbox
                                id="radio"
                                name="radio"
                                aria-multiline
                                checked={selectedChecked[city?.id] || false}
                                onChange={(e) => {
                                  handleOptioncheckd(city?.id)

                                  setcityplaceholder([...cityplaceholder, city.city])
                                  console.log("daaaaaaaadd", e);
                                  if (onSelectItem) {
                                    onSelectItem(item?.district);
                                  }
                                }}
                              />
                              {/* {console.log("itemcity111sddssd1", city)} */}
                              {city.city}
                            </>
                          </a>
                        </div>
                      ))}

                      {/* <div className={"flex-grow w-[150px]"}>
                            <div
                              className={
                                "font-bold border-b-[1px] border-[#dddddd] mb-[10px] text-[#4d4d4d] text-[16px] pb-[4px]"
                              }
                            >
                              Dhaka
                            </div>
                            <a
                              className={classNames(
                                "text-gray-700",
                                "block px-[0px] py-[0px] text-[14px] optionTitle"
                              )}
                            >
                              <>
                                <Checkbox
                                  id="radio"
                                  name="radio"
                                  aria-multiline
                                />
                                Option 1
                              </>
                            </a>
                            <a
                              className={classNames(
                                "text-gray-700",
                                "block px-[0px] py-[0px] text-[14px] optionTitle"
                              )}
                            >
                              <>
                                <Checkbox
                                  id="radio"
                                  name="radio"
                                  aria-multiline
                                />
                                Option 1
                              </>
                            </a>
                            <a
                              className={classNames(
                                "text-gray-700",
                                "block px-[0px] py-[0px] text-[14px] optionTitle"
                              )}
                            >
                              <>
                                <Checkbox
                                  id="radio"
                                  name="radio"
                                  aria-multiline
                                />
                                Option 1
                              </>
                            </a>
                            <a
                              className={classNames(
                                "text-gray-700",
                                "block px-[0px] py-[0px] text-[14px] optionTitle"
                              )}
                            >
                              <>
                                <Checkbox
                                  id="radio"
                                  name="radio"
                                  aria-multiline
                                />
                                Option 1
                              </>
                            </a>
                            <a
                              className={classNames(
                                "text-gray-700",
                                "block px-[0px] py-[0px] text-[14px] optionTitle"
                              )}
                            >
                              <>
                                <Checkbox
                                  id="radio"
                                  name="radio"
                                  aria-multiline
                                />
                                Option 1
                              </>
                            </a>
                          </div> */}

                      {/* <div className={"flex-grow w-[150px]"}>
                            <div
                              className={
                                "font-bold border-b-[1px] border-[#dddddd] mb-[10px] text-[#4d4d4d] text-[16px] pb-[4px]"
                              }
                            >
                              Cumilla
                            </div>
                            <a
                              className={classNames(
                                "text-gray-700",
                                "block px-[0px] py-[0px] text-[14px] optionTitle"
                              )}
                            >
                              <>
                                <Checkbox
                                  id="radio"
                                  name="radio"
                                  aria-multiline
                                />
                                Option 1
                              </>
                            </a>
                            <a
                              className={classNames(
                                "text-gray-700",
                                "block px-[0px] py-[0px] text-[14px] optionTitle"
                              )}
                            >
                              <>
                                <Checkbox
                                  id="radio"
                                  name="radio"
                                  aria-multiline
                                />
                                Option 1
                              </>
                            </a>
                            <a
                              className={classNames(
                                "text-gray-700",
                                "block px-[0px] py-[0px] text-[14px] optionTitle"
                              )}
                            >
                              <>
                                <Checkbox
                                  id="radio"
                                  name="radio"
                                  aria-multiline
                                />
                                Option 1
                              </>
                            </a>
                            <a
                              className={classNames(
                                "text-gray-700",
                                "block px-[0px] py-[0px] text-[14px] optionTitle"
                              )}
                            >
                              <>
                                <Checkbox
                                  id="radio"
                                  name="radio"
                                  aria-multiline
                                />
                                Option 1
                              </>
                            </a>
                            <a
                              className={classNames(
                                "text-gray-700",
                                "block px-[0px] py-[0px] text-[14px] optionTitle"
                              )}
                            >
                              <>
                                <Checkbox
                                  id="radio"
                                  name="radio"
                                  aria-multiline
                                />
                                Option 1
                              </>
                            </a>
                          </div> */}
                    </div>
                  </div>
                </div>
              ))}
              {/* {(props?.selectedStates ?? []).map(
                (stateId: number, index: number) => {
                  const stateData = (props?.states ?? []).find(
                    (s: any) => Number(s?.id) === Number(stateId)
                  );

                  return (
                    <div className={"mb-[10px] py-[15px] px-[25px]"}>
                      <div
                        className={
                          "font-bold mb-[10px] text-[#ff6652] text-[20px]"
                        }
                      >
                        {stateData?.state}
                      </div>
                      <div className={"px-[15px]"}>
                        <div className={"flex h-[300px] gap-[10px]"}>
                          {props?.selectedStates?.map(
                            (state: any, stateId: any) => {
                              let stateData = (props?.districts || []).find(
                                (district: any) =>
                                  Number(district?.state) === Number(state)
                              );
                              console.log(
                                "statedata hereeeeeee-----",
                                stateData
                              );
                              return stateData?.district?.map(
                                (district: any, disId: any) => (
                                  <>
                                    <div className={"flex-grow w-[150px]"}>
                                      <div
                                        className={
                                          "font-bold border-b-[1px] border-[#dddddd] mb-[10px] text-[#4d4d4d] text-[16px] pb-[4px]"
                                        }
                                      >
                                        {district?.district}
                                      </div>
                                      <a
                                        className={classNames(
                                          "text-gray-700",
                                          "block px-[0px] py-[0px] text-[14px] optionTitle"
                                        )}
                                      >
                                        <>
                                          <Checkbox
                                            id="radio"
                                            name="radio"
                                            aria-multiline
                                          />
                                          Option 1
                                        </>
                                      </a>
                                      <a
                                        className={classNames(
                                          "text-gray-700",
                                          "block px-[0px] py-[0px] text-[14px] optionTitle"
                                        )}
                                      >
                                        <>
                                          <Checkbox
                                            id="radio"
                                            name="radio"
                                            aria-multiline
                                          />
                                          Option 1
                                        </>
                                      </a>
                                      <a
                                        className={classNames(
                                          "text-gray-700",
                                          "block px-[0px] py-[0px] text-[14px] optionTitle"
                                        )}
                                      >
                                        <>
                                          <Checkbox
                                            id="radio"
                                            name="radio"
                                            aria-multiline
                                          />
                                          Option 1
                                        </>
                                      </a>
                                      <a
                                        className={classNames(
                                          "text-gray-700",
                                          "block px-[0px] py-[0px] text-[14px] optionTitle"
                                        )}
                                      >
                                        <>
                                          <Checkbox
                                            id="radio"
                                            name="radio"
                                            aria-multiline
                                          />
                                          Option 1
                                        </>
                                      </a>
                                      <a
                                        className={classNames(
                                          "text-gray-700",
                                          "block px-[0px] py-[0px] text-[14px] optionTitle"
                                        )}
                                      >
                                        <>
                                          <Checkbox
                                            id="radio"
                                            name="radio"
                                            aria-multiline
                                          />
                                          Option 1
                                        </>
                                      </a>
                                    </div>
                                  </>
                                )
                              );
                            }
                          )}
                          {/* <div className={"flex-grow w-[150px]"}>
                            <div
                              className={
                                "font-bold border-b-[1px] border-[#dddddd] mb-[10px] text-[#4d4d4d] text-[16px] pb-[4px]"
                              }
                            >
                              Dhaka
                            </div>
                            <a
                              className={classNames(
                                "text-gray-700",
                                "block px-[0px] py-[0px] text-[14px] optionTitle"
                              )}
                            >
                              <>
                                <Checkbox
                                  id="radio"
                                  name="radio"
                                  aria-multiline
                                />
                                Option 1
                              </>
                            </a>
                            <a
                              className={classNames(
                                "text-gray-700",
                                "block px-[0px] py-[0px] text-[14px] optionTitle"
                              )}
                            >
                              <>
                                <Checkbox
                                  id="radio"
                                  name="radio"
                                  aria-multiline
                                />
                                Option 1
                              </>
                            </a>
                            <a
                              className={classNames(
                                "text-gray-700",
                                "block px-[0px] py-[0px] text-[14px] optionTitle"
                              )}
                            >
                              <>
                                <Checkbox
                                  id="radio"
                                  name="radio"
                                  aria-multiline
                                />
                                Option 1
                              </>
                            </a>
                            <a
                              className={classNames(
                                "text-gray-700",
                                "block px-[0px] py-[0px] text-[14px] optionTitle"
                              )}
                            >
                              <>
                                <Checkbox
                                  id="radio"
                                  name="radio"
                                  aria-multiline
                                />
                                Option 1
                              </>
                            </a>
                            <a
                              className={classNames(
                                "text-gray-700",
                                "block px-[0px] py-[0px] text-[14px] optionTitle"
                              )}
                            >
                              <>
                                <Checkbox
                                  id="radio"
                                  name="radio"
                                  aria-multiline
                                />
                                Option 1
                              </>
                            </a>
                          </div> */}

              {/* <div className={"flex-grow w-[150px]"}>
                            <div
                              className={
                                "font-bold border-b-[1px] border-[#dddddd] mb-[10px] text-[#4d4d4d] text-[16px] pb-[4px]"
                              }
                            >
                              Cumilla
                            </div>
                            <a
                              className={classNames(
                                "text-gray-700",
                                "block px-[0px] py-[0px] text-[14px] optionTitle"
                              )}
                            >
                              <>
                                <Checkbox
                                  id="radio"
                                  name="radio"
                                  aria-multiline
                                />
                                Option 1
                              </>
                            </a>
                            <a
                              className={classNames(
                                "text-gray-700",
                                "block px-[0px] py-[0px] text-[14px] optionTitle"
                              )}
                            >
                              <>
                                <Checkbox
                                  id="radio"
                                  name="radio"
                                  aria-multiline
                                />
                                Option 1
                              </>
                            </a>
                            <a
                              className={classNames(
                                "text-gray-700",
                                "block px-[0px] py-[0px] text-[14px] optionTitle"
                              )}
                            >
                              <>
                                <Checkbox
                                  id="radio"
                                  name="radio"
                                  aria-multiline
                                />
                                Option 1
                              </>
                            </a>
                            <a
                              className={classNames(
                                "text-gray-700",
                                "block px-[0px] py-[0px] text-[14px] optionTitle"
                              )}
                            >
                              <>
                                <Checkbox
                                  id="radio"
                                  name="radio"
                                  aria-multiline
                                />
                                Option 1
                              </>
                            </a>
                            <a
                              className={classNames(
                                "text-gray-700",
                                "block px-[0px] py-[0px] text-[14px] optionTitle"
                              )}
                            >
                              <>
                                <Checkbox
                                  id="radio"
                                  name="radio"
                                  aria-multiline
                                />
                                Option 1
                              </>
                            </a>
                          </div> */}
              {/* </div>
                      </div>
                    </div>
                  );
                }
              // )} */}
              {/* <div className={"mb-[10px] py-[15px] px-[25px]"}>
                <div
                  className={"font-bold mb-[10px] text-[#ff6652] text-[20px]"}
                >
                  Chittagong
                </div>
                <div className={"px-[15px]"}>
                  <div className={"flex h-[300px] gap-[10px]"}>
                    <div className={"flex-grow w-[150px]"}>
                      <div
                        className={
                          "font-bold border-b-[1px] border-[#dddddd] mb-[10px] text-[#4d4d4d] text-[16px] pb-[4px]"
                        }
                      >
                        Dhaka
                      </div>
                      <a
                        className={classNames(
                          "text-gray-700",
                          "block px-[0px] py-[0px] text-[14px] optionTitle"
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
                          "block px-[0px] py-[0px] text-[14px] optionTitle"
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
                          "block px-[0px] py-[0px] text-[14px] optionTitle"
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
                          "block px-[0px] py-[0px] text-[14px] optionTitle"
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
                          "block px-[0px] py-[0px] text-[14px] optionTitle"
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
                        className={
                          "font-bold border-b-[1px] border-[#dddddd] mb-[10px] text-[#4d4d4d] text-[16px] pb-[4px]"
                        }
                      >
                        Cumilla
                      </div>
                      <a
                        className={classNames(
                          "text-gray-700",
                          "block px-[0px] py-[0px] text-[14px] optionTitle"
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
                          "block px-[0px] py-[0px] text-[14px] optionTitle"
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
                          "block px-[0px] py-[0px] text-[14px] optionTitle"
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
                          "block px-[0px] py-[0px] text-[14px] optionTitle"
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
                          "block px-[0px] py-[0px] text-[14px] optionTitle"
                        )}
                      >
                        <>
                          <Checkbox id="radio" name="radio" aria-multiline />
                          Option 1
                        </>
                      </a>
                    </div>
                  </div>
                </div>
              </div>

              <div className={"mb-[10px] py-[15px] px-[25px]"}>
                <div
                  className={"font-bold mb-[10px] text-[#ff6652] text-[20px]"}
                >
                  Mymensing
                </div>
                <div className={"px-[15px]"}>
                  <div className={"flex h-[300px] gap-[10px]"}>
                    <div className={"flex-grow w-[150px]"}>
                      <div
                        className={
                          "font-bold border-b-[1px] border-[#dddddd] mb-[10px] text-[#4d4d4d] text-[16px] pb-[4px]"
                        }
                      >
                        Dhaka
                      </div>
                      <a
                        className={classNames(
                          "text-gray-700",
                          "block px-[0px] py-[0px] text-[14px] optionTitle"
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
                          "block px-[0px] py-[0px] text-[14px] optionTitle"
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
                          "block px-[0px] py-[0px] text-[14px] optionTitle"
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
                          "block px-[0px] py-[0px] text-[14px] optionTitle"
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
                          "block px-[0px] py-[0px] text-[14px] optionTitle"
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
                        className={
                          "font-bold border-b-[1px] border-[#dddddd] mb-[10px] text-[#4d4d4d] text-[16px] pb-[4px]"
                        }
                      >
                        Cumilla
                      </div>
                      <a
                        className={classNames(
                          "text-gray-700",
                          "block px-[0px] py-[0px] text-[14px] optionTitle"
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
                          "block px-[0px] py-[0px] text-[14px] optionTitle"
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
                          "block px-[0px] py-[0px] text-[14px] optionTitle"
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
                          "block px-[0px] py-[0px] text-[14px] optionTitle"
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
                          "block px-[0px] py-[0px] text-[14px] optionTitle"
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
                        className={
                          "font-bold border-b-[1px] border-[#dddddd] mb-[10px] text-[#4d4d4d] text-[16px] pb-[4px]"
                        }
                      >
                        Rajshahi
                      </div>
                      <a
                        className={classNames(
                          "text-gray-700",
                          "block px-[0px] py-[0px] text-[14px] optionTitle"
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
                          "block px-[0px] py-[0px] text-[14px] optionTitle"
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
                          "block px-[0px] py-[0px] text-[14px] optionTitle"
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
                          "block px-[0px] py-[0px] text-[14px] optionTitle"
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
                          "block px-[0px] py-[0px] text-[14px] optionTitle"
                        )}
                      >
                        <>
                          <Checkbox id="radio" name="radio" aria-multiline />
                          Option 1
                        </>
                      </a>
                    </div>
                  </div>
                </div>
              </div> */}
            </div>
          </Menu.Items>
        </Transition>
      </Menu>
    </div>
  );
}
