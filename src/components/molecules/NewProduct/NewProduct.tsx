import React from "react";
import { useNavigate } from "react-router-dom";
import { useAddnewProductStyles } from "@/static/stylesheets/screens";
import Placeholder from "@/static/images/placeholder.jpg";

interface NewProductProps {
  type?: "WholeSeller" | "Retailer";
}

const NewProduct: React.FC<NewProductProps> = (props) => {
  const classes = useAddnewProductStyles();
  const navigate = useNavigate();

  return (
    <>
      <div className={classes.root}>
        <div>
          <div className="flex gap-5 justify-between">
            <p>Add New Product</p>
            <div className="border-2 p-3 rounded-md cursor-pointer">
              <div
                onClick={() => navigate("/bulkupload")}
                className="flex gap-5"
              >
                <svg
                  width="16"
                  height="20"
                  viewBox="0 0 16 20"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M10 0H2C0.9 0 0.0100002 0.9 0.0100002 2L0 18C0 19.1 0.89 20 1.99 20H14C15.1 20 16 19.1 16 18V6L10 0ZM14 18H2V2H9V7H14V18ZM4 13.01L5.41 14.42L7 12.84V17H9V12.84L10.59 14.43L12 13.01L8.01 9L4 13.01Z"
                    fill="#4E2FA9"
                  />
                </svg>
                <p>Bulk Upload</p>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-4 gap-4 py-[50px]">
            <div className="bg-[#e7e7e7] h-screen">
              <div className="p-4">
                <p className="text-gray-900">GROUP</p>
              </div>
              <div className="bg-[#4E2FA9] p-4">
                <div className="flex gap-5 p-2 items-center">
                  <img
                    className="w-[50px] rounded-md"
                    src={Placeholder}
                    alt={"Logo"}
                  />
                  <p className="text-white">Computers</p>
                </div>
              </div>
              <div className="p-4">
                <div className="flex gap-5 p-2 items-center">
                  <img
                    className="w-[50px] rounded-md"
                    src={Placeholder}
                    alt={"Logo"}
                  />
                  <p className="text-gray-900">Computers</p>
                </div>
              </div>
              <div className=" p-4">
                <div className="flex gap-5 p-2 items-center">
                  <img
                    className="w-[50px] rounded-md"
                    src={Placeholder}
                    alt={"Logo"}
                  />
                  <p className="text-gray-900">Computers</p>
                </div>
              </div>
            </div>

            <div className="bg-[#e7e7e7] h-screen">
              <div className="p-4">
                <p className="text-gray-900">GROUP</p>
              </div>
              <div className="bg-[#4E2FA9] p-4">
                <div className="flex gap-5 p-2 items-center">
                  <img
                    className="w-[50px] rounded-md"
                    src={Placeholder}
                    alt={"Logo"}
                  />
                  <p className="text-white">Computers</p>
                </div>
              </div>
              <div className="p-4">
                <div className="flex gap-5 p-2 items-center">
                  <img
                    className="w-[50px] rounded-md"
                    src={Placeholder}
                    alt={"Logo"}
                  />
                  <p className="text-gray-900">Computers</p>
                </div>
              </div>
              <div className=" p-4">
                <div className="flex gap-5 p-2 items-center">
                  <img
                    className="w-[50px] rounded-md"
                    src={Placeholder}
                    alt={"Logo"}
                  />
                  <p className="text-gray-900">Computers</p>
                </div>
              </div>
            </div>
            <div className="bg-[#e7e7e7] h-screen">
              <div className="p-4">
                <p className="text-gray-900">GROUP</p>
              </div>
              <div className="bg-[#4E2FA9] p-4">
                <div className="flex gap-5 p-2 items-center">
                  <img
                    className="w-[50px] rounded-md"
                    src={Placeholder}
                    alt={"Logo"}
                  />
                  <p className="text-white">Computers</p>
                </div>
              </div>
              <div className="p-4">
                <div className="flex gap-5 p-2 items-center">
                  <img
                    className="w-[50px] rounded-md"
                    src={Placeholder}
                    alt={"Logo"}
                  />
                  <p className="text-gray-900">Computers</p>
                </div>
              </div>
              <div className=" p-4">
                <div className="flex gap-5 p-2 items-center">
                  <img
                    className="w-[50px] rounded-md"
                    src={Placeholder}
                    alt={"Logo"}
                  />
                  <p className="text-gray-900">Computers</p>
                </div>
              </div>
            </div>

            <div className="bg-[#ffffff] h-screen">
              <div className="p-4">
                <p className="text-gray-900">GROUP</p>
              </div>
              <div className="flex gap-5 p2 cursor-pointer">
                <p>+</p>
                <p>Add New Product</p>
              </div>
              <div className="p-4">
                <div className="flex gap-5 p-2 items-center">
                  <img
                    className="w-[50px] rounded-md"
                    src={Placeholder}
                    alt={"Logo"}
                  />
                  <p className="text-gray-900">Computers</p>
                </div>
              </div>
              <div className="p-4">
                <div className="flex gap-5 p-2 items-center">
                  <img
                    className="w-[50px] rounded-md"
                    src={Placeholder}
                    alt={"Logo"}
                  />
                  <p className="text-gray-900">Computers</p>
                </div>
              </div>
              <div className="p-4">
                <div className="flex gap-5 p-2 items-center">
                  <img
                    className="w-[50px] rounded-md"
                    src={Placeholder}
                    alt={"Logo"}
                  />
                  <p className="text-gray-900">Computers</p>
                </div>
              </div>
              <div className="p-4">
                <div className="flex gap-5 p-2 items-center">
                  <img
                    className="w-[50px] rounded-md"
                    src={Placeholder}
                    alt={"Logo"}
                  />
                  <p className="text-gray-900">Computers</p>
                </div>
              </div>
              <div className=" p-4">
                <div className="flex gap-5 p-2 items-center">
                  <img
                    className="w-[50px] rounded-md"
                    src={Placeholder}
                    alt={"Logo"}
                  />
                  <p className="text-gray-900">Computers</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default NewProduct;
