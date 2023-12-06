import React, { useEffect, useState, useRef } from "react";
import { useAddbazaarStyles } from "@/static/stylesheets/molecules";
import UploaderFrame from "@/static/icons/uploader-frame.png";
import { MenuItem, Select, TextField, Checkbox, Box, IconButton, Grid } from "@mui/material";
import { AppService } from "@/service/AllApiData.service";
import DistrictPicker from "@/components/atoms/LocationPickers/DistrictPicker";
import CityPicker from "@/components/atoms/LocationPickers/CityPicker";
import { readFileAsBase64 } from "@/helper/base64";
import CloseIcon from '@mui/icons-material/Close';
import { DistrictPickerNew } from "@/components/atoms/LocationPickers/DistrictPickerNew";
import { CityPickerNew } from "@/components/atoms/LocationPickers/CityPickerNew";
import { StatePicker } from "@/components/atoms/LocationPickers/StatePicker";
import ListItemText from '@mui/material/ListItemText';
import { input } from "@material-tailwind/react";
import './BazaarDetails.css'
import { useLocation } from "react-router-dom";

const BazaarDetails = (props: {
  formData: any;
  setFormData: (arg0: any) => void;
  actionButtonContent?: React.ReactNode,
  stateCount?: number | null
}) => {
  const classes = useAddbazaarStyles();

  const [masterType, setMasterType] = React.useState<any[]>([]);
  const [masterType2, setMasterType2] = React.useState<any[]>([]);
  const [masterType3, setMasterType3] = React.useState<any[]>([]);
  const [AllState, setAllState] = React.useState<any[]>([]);
  const [AllDis, setAllDis] = React.useState<any[]>([]);
  const [AllCity, setAllCity] = React.useState<any[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const [selectedChecked, setSelectedCheck] = useState<any>({});
  const location = useLocation()

  const handleChangeMasterType = (event: any) => {
    const {
      target: { value },
    } = event;
    setMasterType([value]);
    const int = [value];
    const selectedData = typeof value === 'string' ? value.split(',') : value;
    
    props.setFormData((prev: any) => {
      if(location.state?.Bid){        
        return {
          ...prev,
          bazaar_state: prev.bazaar_state.includes(value) ? prev.bazaar_state.filter((item: number | string) => item !== value) : prev.bazaar_state.length >= ((props.stateCount || 0) + 1) ? prev.bazaar_state : prev.bazaar_state.concat(value),
          bazaar_district: [],
          bazaar_city: []
        }
      }else{  
        return {
          ...prev,
          bazaar_state: [value],
          bazaar_district: [],
          bazaar_city: []
        }
      }
    });
    setAllCity([])
    // getAllDis({ ids: event.target.value.join(",") });
    // setIsOpen(false);
  };
  console.log(AllState,AllCity,AllDis,"masterType1111")
  console.log(masterType,masterType2,masterType3,"masterType1")

  const handleOptioncheckd = (id: any) => {
    const isChecked = selectedChecked[id];
    setSelectedCheck((prevState: any) => ({
      ...prevState,
      [id]: !isChecked,
    }));

  }

  
  const handleChangeDistrict = (id: number[], type: {all: boolean}) => {
    let ids = [...masterType2];
    id?.forEach(item => {
      if(type){
        if(type?.all){
          ids.push(item);
        }else{
          ids = ids.filter(it => it !== item)
        }
      }else{
        if (!ids.includes(item)) {
          ids.push(item);
        }else{
         ids = ids.filter(it => it !== item)
        }
      }
    })
    setMasterType2(ids);
    
    props.setFormData({
      ...props.formData,
      bazaar_district: ids,
    });
    // getAllDis({ ids });
    getAllCity({ ids: ids.join(",") });
  };

  useEffect(()=>{
    setMasterType2(masterType2);
  },[masterType2])


  console.log(masterType2,"type11")
  
  const handleChangeCity = (id: number[], type: {all: boolean}) => {
    let ids = [...props.formData.bazaar_city];
    id.forEach((item: any) => {
      if(type){
        if(type?.all){
          ids.push(item);
        }else{
          ids = ids.filter(it => it !== item)
        }
      } else {
        if (ids.includes(item)) {
          let tempArr = ids;
          const index = tempArr.indexOf(item);
          if (index > -1) { // only splice array when item is found
            tempArr.splice(index, 1); // 2nd parameter means remove one item only
          }
          ids = tempArr;
        } else {
          ids.push(item);
        }
      }
    })

    props.setFormData({
      ...props.formData,
      bazaar_city: ids,
    });
  };

  const handleChangeMasterType2 = (event: any) => {
    setMasterType2(event.target.value);
    // console.log(event.target.value.join(","));
    const str = event.target.value.map(Number);
    props.setFormData({
      ...props.formData,
      bazaar_district: str,
    });
    console.log("str", str);
    getAllCity({ ids: event.target.value });
  };
  const handleChangeMasterType3 = (event: any) => {
    setMasterType3(event.target.value);
    // console.log(event.target.value.join());
    const str = event.target.value.map(Number);
    props.setFormData({
      ...props.formData,
      bazaar_city: str,
    });
  };
  const [file, setFiles] = useState("");
  const [fileName, setFileName] = useState("");
  const [selectedImage, setSelectedImage] = useState(props.formData.bazaar_image);
  const imageRef = useRef<HTMLInputElement>(null)
  const imageChange = async (e: any) => {
    console.log("imageChange",e.target.files)
    if (e.target.files && e.target.files.length > 0) {
      console.log(e.target.files[0]);
      setSelectedImage(e.target.files[0]);
      setFiles(e.target.files[0]);
      setFileName(e.target.files[0].name);
      console.log(e.target.files[0].name);
      let url = await readFileAsBase64(e.target.files[0]);
      props.setFormData({
        ...props.formData,
        bazaar_image: url,
      });
    }
  };

  React.useEffect(() => { setSelectedImage(props.formData.bazaar_image) }, [props.formData])

  const getAllLists = async () => {
    const responseJson = await AppService.getTotalStates();
    // console.log(responseJson.data.bazaar);
    setAllState(responseJson.data);
  };

  const getAllDis = async (param: any) => {
    if (param.ids !== "") {
      const responseJson = await AppService.getAllDistricByState(param);
      setAllDis(responseJson.data.results);
    } else {
      setAllDis([]);
    }
  };

  const getAllCity = async (param: any) => {
    const responseJson = await AppService.getAllCityByDis(param);
    setAllCity(responseJson.data.results);
  };

  useEffect(() => {
    getAllLists();

    if (props.formData.bazaar_state && props.formData.bazaar_district) {
      getAllDis({
        ids:
          props.formData.bazaar_state.length > 1
            ? props.formData.bazaar_state.join(",")
            : props.formData.bazaar_state[0],
      });
      if(props.formData.bazaar_district.length){
        getAllCity({
          ids: props.formData.bazaar_district.join(",")
        });
      }
      setTimeout(() => {
        setMasterType(props.formData.bazaar_state);
        setMasterType2(props.formData.bazaar_district);
        setMasterType3(props.formData.bazaar_city);
      }, 200);
    }
  }, [props.formData]);
  
  const removeMedia = () => {
    setSelectedImage(undefined);
    if(imageRef.current){
      imageRef.current.value = ""
    }
    // localStorage.removeItem("img");
  };

  console.log("alldis11",AllCity)
  return (
    <div className={classes.root}>
      <Grid container>
        <div className="w-full">
          <Grid item lg={5}>
            <div className="pt-[50px]">
              <div className={classes.content}>
                <div className="py-5 h-[169px] flex flex-col justify-center">
                  <div className="uploadIcon">
                    {selectedImage === undefined ? (
                      null
                    ) : (
                      selectedImage && (
                        <>
                          <IconButton
                            style={{
                              position: "absolute",
                              zIndex: "2",
                              background: "#ffffff",
                              top: "15px",
                              right: "10px",
                            }}
                            onClick={() => removeMedia()}
                            size={"small"}
                            className={"shadow-md"}
                          >
                            <CloseIcon style={{ fontSize: "17px" }} />
                          </IconButton>

                          <Box
                            className={"absolute top-0 bottom-0 left-0 right-0 bg-red-400 z-[1] rounded-[5.30337px]"}
                            sx={{

                            }}
                          >
                            <img
                              src={selectedImage}
                              style={{
                                width: "100%",
                                borderRadius: "5px",
                                height: '100%'
                              }}
                            />
                          </Box>
                        </>
                      )
                    )}
                  </div>
                    <input
                      onChange={imageChange}
                      ref={imageRef}
                      className={"hidden"}
                      type="file"
                      name="file"
                      id="formFile"
                    />
                    <label htmlFor="formFile">
                      <div className="flex justify-center">
                        <img src={UploaderFrame} style={{width:'50px'}} alt={"Uploader"}/>
                      </div>
                      <div className={"title"}>Upload Media here</div>
                      <div className="py-1"></div>
                      <div className={"subtitle"}>
                        Image can be size of 512 PX by 512 PX Only
                      </div>
                    </label>
                </div>
              </div>
            </div>
          </Grid>
        </div>

        <Grid item width={'680px'}>
          <div className="py-[30px]">
            <div>
              <p className="fieldTitle">Bazaar Name</p>
              <TextField
                sx={{
                  "& *": {
                    fontFamily: "Manrope !important",
                    fontSize: "14px",
                  },
                }}
                variant="standard"
                value={props.formData.bazaar_name}
                onChange={(e) =>
                  props.setFormData({
                    ...props.formData,
                    bazaar_name: e.target.value,
                  })
                }
                fullWidth={true}
              />
            </div>

            <div className="flex gap-4 py-[20px]">
              <div className={"w-[50%]"}>
                <p className="fieldTitle">Select State</p>

                <Select
                  sx={{
                    "& *": {
                      fontFamily: "Manrope !important",
                      fontSize: "14px",
                    },
                  }}
                  open={isOpen}
                  onClose={() => setIsOpen(false)}
                  onOpen={() => setIsOpen(true)}
                  label="Age"
                  variant={"standard"}
                  fullWidth={true}
                  value={props.formData.bazaar_state}
                  renderValue={(selected) => {
                      var data:any = [];
                       AllState.map((item) => {
                        if (selected.includes(item.id)) {
                          data.push(item.state)
                        }
                       })
                      return data.join(', ')
                    }
                  }
                  onChange={handleChangeMasterType}
                >
                  {AllState?.map((items: any) => {
                    return (
                      <MenuItem key={items.id} value={items.id}>
                         <Checkbox checked={props.formData.bazaar_state.indexOf(items.id) > -1} />
                        <ListItemText primary={items.state} />
                      </MenuItem>
                    )
                  }
                  )}
                </Select>
                {/* <StatePicker /> */}
              </div>
              <div className={"w-[50%]"}>
                {/* <DistrictPickerNew /> */}

                {(masterType.length > 0 && AllDis.length > 0 || true) && (
                  <div className="Selectdistrict">
                    {/* <p className="fieldTitle">Select District</p> */}
                    <DistrictPicker
                      label={"Select District"}
                      placeholder={"Select District"}
                      hint={"Search"}
                      variant={"outlined"}
                      states={AllState}
                      selectedStates={masterType}
                      districts={AllDis}
                      selectedDistricts={props.formData.bazaar_district}
                      onSelectItem={handleChangeDistrict}
                    />

                    {/* <Select
              label={"Select District"}
              placeholder={"All Districts"}
              multiple={false}
              variant={"standard"}
              fullWidth={true}
              name="agent_district"
              value={masterType2}
              onChange={handleChangeDistrict}
            >
              {AllDis?.map((items: any) => {
                return items?.district.map((item: any) => {
                  return (
                    <MenuItem value={item.id}>
                      {item.district}
                    </MenuItem>
                  );
                });
              })}
            </Select> */}
                  </div>


                )}
              </div>
              {/* {masterType.length && AllDis.length ? (
            <div>
              <p className="fieldTitle">District</p>
              <Select
                label="Age"
                variant={"standard"}
                fullWidth={true}
                multiple={true}
                value={masterType2}
                onChange={handleChangeMasterType2}
              >
                {AllDis.map((items: any) => {
                  return items?.district.map((item: any) => {
                    return <MenuItem value={item.id}>{item.district}</MenuItem>;
                  });
                })}
              </Select>
            </div>
          ) : null} */}
            </div>
            {/*{masterType.length && masterType2.length ? (
              <div>
              <p className="fieldTitle">City</p>
            <Select
            label="Age"
            variant={"standard"}
            fullWidth={true}
            multiple={true}
            value={masterType3}
            onChange={handleChangeMasterType3}
            >
              {AllCity.map((items: any) => {
                return items?.city.map((item: any) => {
                  return <MenuItem value={item.id}>{item.city}</MenuItem>;
                });
              })}
            </Select>
          </div>
        ) : null}*/}

            {/* <CityPicker
              label={"Select Cities"}
              placeholder={"All Cities"}
              hint={"Search"}
              variant={"outlined"}
              states={AllDis}
              selectedStates={masterType2}
              districts={AllCity}
              selectedDistricts={masterType3}
              onSelectItem={(id: any) => handleChangeCity(id)}
            /> */}

            <CityPickerNew label={"Select Cities"}
              placeholder={"Select Cities"}
              hint={"Search"}
              variant={"outlined"}
              states={AllDis}
              selectedStates={masterType2}
              selectedcity={masterType3}
              selectedDistricts={props.formData.bazaar_district}
              districts={AllCity}
              selectedCity={props.formData.bazaar_city}
              onSelectItem={(id: any, type: {all: boolean}) => handleChangeCity(id,type)} />

            {props?.actionButtonContent}
          </div>
        </Grid>
      </Grid>
    </div>
    // <div className="mt-[56px]">
    //   <div className="w-[467px] h-[169px] relative rounded-[8px] border-[1.5px] cursor-pointer flex justify-center flex-col border-dashed border-[#E1E1E1]">
    //     <input type="file" className="w-full h-full absolute top-0 left-0 opacity-0" />
    //     {
    //       selectedImage === undefined ?
    //         <div className="text-center">
    //           <div className="flex justify-center">
    //             <img src={UploaderFrame} alt={"Uploader"} className="w-[50px]" />
    //           </div>
    //           <div className="font-[Manrope] text-[17px] text-[#4E2FA9] font-[500] mb-[6px] mt-[3px]">Upload Media here</div>
    //           <div className="mt-[5px] font-[Manrope] text-[12px] text-[#84818A] font-[500]">Image can be size of 512 PX by 512 PX Only</div>
    //         </div>
    //         : <img
    //           src={selectedImage}
    //           style={{
    //             width: "100%",
    //             borderRadius: "5px",
    //             height: '100%'
    //           }} />
    //     }
    //  </div>
    //  </div>
  );
};

export default BazaarDetails;
