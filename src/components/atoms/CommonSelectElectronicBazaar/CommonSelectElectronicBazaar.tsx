import { Fragment } from "react";
import { Menu, Transition } from "@headlessui/react";
import { ChevronDownIcon } from "@heroicons/react/20/solid";
import { Checkbox } from "@mui/material";
import { useCommonSelectStyle } from "@/static/stylesheets/molecules";
import renderClasses from "classnames";
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
function classNames(...classes: any) {
  return classes.filter(Boolean).join(" ");
}

interface CommonSelectElectronicBazaarProps {
  label?: string;
  hint?: string;
  options?: {
    label: string;
    value: string;
  }[];
  selectedIds?: any[]
  variant?: string
  handleSelect: (label: string, id: any) => void;
}

export default function CommonSelectElectronicBazaar(props: CommonSelectElectronicBazaarProps) {
  const classes = useCommonSelectStyle();
  return (
    <div className={classes.root}>
      <Menu as="div" className="relative inline-block text-left">
        <div>
          <Menu.Button
            className={renderClasses("flex w-full", {
              "justify-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-[#84818A] shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:ring-offset-gray-100":
                !props.variant,
              "justify-between border-b border-b-[#84818A] p-[2px]":
                props.variant === "outlined",
            })} style={{ alignItems: "center", fontSize: "14px", fontFamily: 'Manrope', paddingRight: "5px" }}>
            {props?.label}
            <ArrowDropDownIcon aria-hidden="true" style={{ marginLeft: "5px" }} />
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
          <Menu.Items
            className="absolute z-10 mt-2 w-[245px] origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
            <div className="py-1">
              <p className="border-b-2 py-[10px] px-[40px] selectTitle"> {props?.hint}</p>
              <div style={{ maxHeight: "300px", overflowY: "auto" }}>
                {props?.options?.map((item: any, index: any) => (
                  <Menu.Item>
                    {({ active }) => (
                      <a
                        className={classNames(
                          active ? "bg-gray-100 text-gray-900" : "text-gray-700",
                          "block px-[25px] py-2 text-sm optionTitle"
                        )}
                      >
                        <>
                          <Checkbox checked={props.selectedIds?.includes(item?.value) ? true : false} value={item?.value} onChange={() => props.handleSelect(String(props?.label), item?.value)} id="radio" name="radio" aria-multiline />
                          {item?.label}
                        </>
                      </a>
                    )}
                  </Menu.Item>
                ))}
              </div>
            </div>
          </Menu.Items>
        </Transition>
      </Menu>
    </div>
  );
}
