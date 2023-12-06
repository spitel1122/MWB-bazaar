import React, { useState, useEffect } from "react";
import { AddButton, GridOptionButton } from "@/components/atoms/Button";
import { useMasterListStyles } from "@/static/stylesheets/screens";
import { Switch } from "@/components/atoms/Switch";
import {
  Checkbox,
  Dialog,
  ListItemText,
  MenuItem,
  Pagination,
  Select,
  SelectChangeEvent,
  TextField,
} from "@mui/material";
import { UploadArea } from "@/components/organisms/UploadArea";
import { ActionButton } from "@/components/atoms/Button/ActionButton";
import { AppService } from "@/service/AllApiData.service";
import fill from "@/static/icons/fill.svg";
import deleteagent from "@/static/icons/delete-agent.svg";
import { useUploadAreaStyles } from "@/static/stylesheets/organisms/uploadAreadStyles";
import UploaderFrame from "@/static/icons/uploader-frame.png";
import { readFileAsBase64 } from "@/helper/base64";
import { Alert } from "@/alert/Alert";
interface MasterListGridProps {
  type?: "WholeSeller" | "Retailer",
  wholesellerCount?: any,
  reatilercount?: any
}

const MasterListGrid: React.FC<MasterListGridProps> = (props) => {
  const classes = useMasterListStyles();
  const classes2 = useUploadAreaStyles();
  const { type, wholesellerCount, reatilercount } = props;
  const [consts,setCounts] = React.useState<any>(1)
  const [wholesellerState, setWholesellerState] = useState("");
  const [wholesellerArray, setWholesellerArray] = useState([]);
  const [retailerArray, setRetailerArray] = useState([]);
  const [addModalOpen, setAddModalOpen] = useState(false);
  const [retailerState, setRetailerState] = useState("");
  const [editState, setEditState] = useState<string>("");
  const [currentPage, setCurrentPage] = useState(1);
  const [currentPageR, setCurrentPageR] = useState(1);
  const [totalRetailer, setTotalRetailer] = useState(1);
  const [totalWholeseller, setTotalWholeseller] = useState(0);
  const [masterType, setMasterType] = useState("Regional Wholeseller");
  const [wholesellerimgprev, setWholesellerimgprev] = useState<any>("");
  const [wholesellerimg, setWholesellerimg] = useState<any>("");
  const [retailerimgprev, setretailerprev] = useState<any>("");
  const [retailerimg, setretailerimg] = useState<any>("");
  const [AllBazaar, setAllBazaar] = useState<any>([]);
  const [selectwholebazzar,setselectwholebazzar] = React.useState<any>(0)

  const getAllBazaar = async () => {
    const responseJson = await AppService.getAllBazaar();
    setAllBazaar(responseJson.data.results);
  };

  useEffect(() => {
    getAllBazaar();
  }, []);

  const handleChangeMasterType = (event: any) => {
    const { value } = event.target;
    setselectwholebazzar(value)
  };

  const handlechangeimg = async (e: any) => {
    const { files, name } = e.target;
    if (name === 'wholeseller_type_image') {
      const reader = new FileReader();
      if (files.length > 0) {
        reader.onloadend = () => {
          setWholesellerimgprev(reader?.result);
        };
        if (files[0] && files?.length > 0) {
          reader.readAsDataURL(files[0]);
        }
        const base64data = await readFileAsBase64(files[0])
        setWholesellerimg(base64data)
      }
    }
    if (name === 'retailer_type_image') {
      const reader = new FileReader();
      if (files.length > 0) {
        reader.onloadend = () => {
          setretailerprev(reader?.result);
        };
        if (files[0] && files?.length > 0) {
          reader.readAsDataURL(files[0]);
        }
        const base64data = await readFileAsBase64(files[0])
        setretailerimg(base64data)
      }
    }
  }
  const editModal = (id: any, name: any, bazaarId : any) => {
    if (props?.type == "WholeSeller") {
      setWholesellerState(name);
      setAddModalOpen(true);
      setEditState(id);
      setselectwholebazzar(bazaarId)
    } else {
      console.log("setttttttttt------");
      setRetailerState(name);
      setAddModalOpen(true);
      setEditState(id);
      setselectwholebazzar(bazaarId)
    }
  };

  const addWholesellerType = async () => {
    if (wholesellerState) {
      const response = await AppService.addWholesellerType({
        bazaar: selectwholebazzar,
        wholeseller_type_name: wholesellerState,
      });

      if (response.status == 201) {
        Alert(`Plan features added successfully`);
      }

      setAddModalOpen(false);
      getWholesellerType(currentPage);
      setWholesellerState("");
      setselectwholebazzar(0)
    }
  };
  const editWholesellerType = async () => {
    if (wholesellerState && editState) {
      const response = await AppService.editWholesellerType(editState, {
        bazaar: selectwholebazzar,
        wholeseller_type_name: wholesellerState,
      });

      setAddModalOpen(false);
      getWholesellerType(currentPage);
      setWholesellerState("");
      setEditState("");
      setselectwholebazzar(0)
    }
  };

  const addRetailerType = async () => {
    if (retailerState) {
      const response = await AppService.addRetailerType({
        bazaar: selectwholebazzar,
        retailer_type_name: retailerState,
      });

      if (response.status == 201) {
        Alert(`Plan features added successfully`);
      }

      setAddModalOpen(false);
      getRetailerType(currentPageR);
      setRetailerState("");
      setselectwholebazzar(0)

    }
  };
  const editRetailerType = async () => {
    if (retailerState) {
      const response = await AppService.editRetailerType(editState, {
        bazaar: selectwholebazzar,
        retailer_type_name: retailerState,
      });

      setAddModalOpen(false);
      getRetailerType(currentPageR);
      setRetailerState("");
      setEditState("");
      setselectwholebazzar(0)
    }
  };
  
  
  const getWholesellerType = async (page: any) => {
    const response = await AppService.getWholesellerType({ page: page });
    setWholesellerArray(response?.data?.results);
    setTotalWholeseller(response?.data.count);
    wholesellerCount(response?.data.count)
  };
  const getRetailerType = async (page: any) => {
    const response = await AppService.getRetailerType({ page: page });
    console.log("Resss=====", response.data);
    setRetailerArray(response?.data?.results);
    setTotalRetailer(response?.data.count);
    reatilercount(response?.data.count)
  };

  const handlePageChange = (event: any, value: any) => {
    setCurrentPage(value);
    getWholesellerType(value);
  };
  const handlePageChangeR = (event: any, value: any) => {
    setCurrentPageR(value);
    getRetailerType(value);
  };

  useEffect(() => {
    if (props?.type == "WholeSeller") {
      getWholesellerType(1);
    } else {
      getRetailerType(1);
    }
  }, []);

  return (
    <>
      <div className="my-[20px]">
        <AddButton
          label={type === "WholeSeller" ? "Wholeseller Type" : "Retailer Type"}
          onClick={() => setAddModalOpen(true)}
        />
      </div>
      <div>
        <table className={classes.dataGrid} cellPadding={0} cellSpacing={0}>
          <thead>
            <tr>
              <th>Title</th>
              <th>Type</th>
              <th>Enable/Disable</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {props?.type == "WholeSeller"
              ? wholesellerArray?.map((item: any, index: any) => (
                <tr>
                  <td>{item?.wholeseller_type_name}</td>
                  <td style={{whiteSpace:'nowrap',color:'#2e2c34',fontSize:'14px',fontFamily:"Manrope",fontWeight:"500"}}>
                    {AllBazaar?.map((x: any)=> x.id == item?.bazaar && x.bazaar_name)}
                  </td>
                  <td>
                    <Switch />
                  </td>
                  <td>
                    <GridOptionButton
                      icon={"edit-item"}
                      menus={[
                        {
                          label: (
                            <>
                              <span className="icon">
                                <img src={fill} alt="fill" />{" "}
                              </span>{" "}
                              Edit
                            </>
                          ),
                          onClick() {
                            editModal(item?.id, item?.wholeseller_type_name,item?.bazaar);
                          },
                        },
                        // {
                        //   label: (
                        //     <>
                        //       <span className="icon">
                        //         <img src={deleteagent} alt="deleteagent" />{" "}
                        //       </span>{" "}
                        //       Delete
                        //     </>
                        //   ),
                        //   onClick() {
                        //     alert("Clicked");
                        //   },
                        // },
                      ]}
                    />
                  </td>
                </tr>
              ))
              : retailerArray?.map((item: any, index: any) => (
                <tr>
                  <td>{item?.retailer_type_name}</td>
                  <td style={{whiteSpace:'nowrap',color:'#2e2c34',fontSize:'14px',fontFamily:"Manrope",fontWeight:"500"}}>
                    {AllBazaar?.map((x: any)=> x.id == item?.bazaar && x.bazaar_name)}
                  </td>
                  <td>
                    <Switch />
                  </td>
                  <td>
                    <GridOptionButton
                      icon={"edit-item"}
                      menus={[
                        {
                          label: (
                            <>
                              <span className="icon">
                                <img src={fill} alt="fill" />{" "}
                              </span>{" "}
                              Edit
                            </>
                          ),
                          onClick() {
                            editModal(item?.id, item?.retailer_type_name,item?.bazaar);
                          },
                        },
                      ]}
                    />
                  </td>
                </tr>
              ))}
            {/* <tr>
              <td>
                {type === "WholeSeller" ? "Wholeseller" : "Retailer"} Type
              </td>
              <td>
                <Switch />
              </td>
              <td>
                <GridOptionButton icon={"vertical-options"} />
              </td>
            </tr>

            <tr>
              <td>{type === "WholeSeller"} Types</td>
              <td>
                <Switch />
              </td>
              <td>
                <GridOptionButton icon={"vertical-options"} />
              </td>
            </tr>

            <tr>
              <td>
                {type === "WholeSeller" ? "Wholeseller" : "Retailer"} Type
              </td>
              <td>
                <Switch />
              </td>
              <td>
                <GridOptionButton icon={"vertical-options"} />
              </td>
            </tr> */}
          </tbody>
        </table>
        {props?.type == "WholeSeller" ? (
            <div
              className="flex items-center justify-between pagination"
              style={{ display: "flex" }}
            >
              {/* <div className="text-[#84818A] text-sm font-medium">
              Show <span>10</span> from {states.length} products
            </div> */}
              <Pagination
                count={Math.ceil(totalWholeseller / 10)}
                page={currentPage}
                onChange={handlePageChange}
              />
            </div>
        ) : (
          <div
            className="flex items-center justify-between pagination"
            style={{ display: "flex" }}
          >
            {/* <div className="text-[#84818A] text-sm font-medium">
          Show <span>10</span> from {states.length} products
        </div> */}
            <Pagination
              count={Math.ceil(totalRetailer / 10)}
              page={currentPageR}
              onChange={handlePageChangeR}
            />
          </div>
        )}
      </div>
      {console.log("totalWholeseller---", totalWholeseller)}

      <Dialog
        open={addModalOpen}
        maxWidth={"lg"}
        sx={{
          ".MuiPaper-root": {
            borderRadius: "20px",
          },
        }}
        onClose={() => setAddModalOpen(false)}
      >
        <div className={classes.addDialog}>
          <div className={"title"}>
            Add {type === "WholeSeller" ? "Wholeseller" : "Retailer"} Type
          </div>

          <div className={"select-master"}>
            <div className={"input-label"}>
              {type === "WholeSeller" ? "Wholeseller" : "Retailer"} Type
            </div>
            <TextField
              variant="standard"
              fullWidth={true}
              placeholder={
                props?.type == "WholeSeller"
                  ? "Add WholeSeller type"
                  : "Add Retailer type"
              }
              value={
                props?.type == "WholeSeller" ? wholesellerState : retailerState
              }
              name={
                props?.type == "WholeSeller" ? "wholeseller_type_name" : "retailer_type_name"
              }
              onChange={(e: any) => {
                props?.type == "WholeSeller"
                  ? setWholesellerState(e.target.value)
                  : setRetailerState(e.target.value);
              }}
            />
            <div className="select-master">
              <p className="input-label">Bazaar</p>
              <Select
                label="Age"
                variant={"standard"}
                fullWidth={true}
                value={selectwholebazzar}
                 onChange={handleChangeMasterType}
                 renderValue={(selected)=>{
                  let data:any = [];
                  data = AllBazaar?.find((it: any) => it?.id === selected)?.bazaar_name;
                  return data
                 }}
              >
                {AllBazaar?.map((items: any) => (
                  <MenuItem key={items.id} value={items.id}>
                  <Checkbox checked={selectwholebazzar === items?.id} />
                  <ListItemText primary={items.bazaar_name} />
                </MenuItem>
                ))}
              </Select>
            </div>
          </div>

          <div className={"action-bar"}>
            <ActionButton
              variant={"default"}
              title={"Cancel"}
              onClick={() => setAddModalOpen(false)}
            />

            <ActionButton
              variant={"primary"}
              title={"Add"}
              onClick={() => {
                !editState
                  ? props?.type == "WholeSeller"
                    ? addWholesellerType()
                    : addRetailerType()
                  : props?.type == "WholeSeller"
                    ? editWholesellerType()
                    : editRetailerType();
              }}
            />
          </div>
        </div>
      </Dialog>
    </>
  );
};

export { MasterListGrid };
