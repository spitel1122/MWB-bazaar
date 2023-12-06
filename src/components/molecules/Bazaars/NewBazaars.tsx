import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import BazaarDetails from "@/screens/BazaarDetails";
import GroupCategories from "@/screens/GroupCategories";
import Categories from "@/screens/Categories";
import Categories2 from "@/screens/Categories2";
import SubCategories from "@/screens/SubCategories";
import { useBazaarStepperdStyles } from "@/static/stylesheets/molecules";
import LogoPrev from "@/static/icons/ic_previous.png";
import { AppService } from "@/service/AllApiData.service";
import { Alert, AlertError } from "@/alert/Alert";
import { useNavigate, useParams, useLocation } from "react-router-dom";
const steps = [
  "Bazaar Details",
  "Group Categories",
  "Categories",
  "Sub- Categories",
  "Products",
];
async function convertImageTobS4(imgUrl: string) {
  const imageToBase64 = require('image-to-base64/browser.js');
  let response = await imageToBase64(imgUrl);
  return "data:image/png;base64," + response;
}
export default function NewBazaars() {
  const [grpCatCount, setGroupCatCount] = React.useState(0);
  const [catCount, setCatCount] = React.useState(0);

  const [activeStep, setActiveStep] = React.useState(0);
  const [skipped, setSkipped] = React.useState(new Set<number>());
  const [AllState, setAllState] = React.useState([]);
  const navigate = useNavigate();
  const [setpId, setSetpId] = React.useState(124);
  const [parecategory, setParentCategory] = React.useState(null)
  const { id } = useParams();
  const [bid, setBid] = React.useState(null)
  const bazarState = useLocation()
  const [basicDetail, setBasicDetail] = React.useState({
    id: "",
    bazaar_description: "test",
    bazaar_name: "",
    bazaar_image: null,
    bazaar_added_date: new Date().toISOString(),
    bazaar_updated_date: new Date().toISOString(),
    bazaar_updated_by: 1,
    bazaar_active: true,
    bazaar_state: [],
    bazaar_city: [],
    bazaar_district: [],
  });

  const stateCount = React.useRef<null | number>(null)

  const getAllLists = async () => {
    const responseJson = await AppService.getAllStates();
    setAllState(responseJson.data.results);
  };

  console.log(basicDetail,"basicDetail")

  React.useEffect(() => {

    if (bazarState?.state?.Bstep) {
      setActiveStep(bazarState?.state?.Bstep)
      setBid(bazarState?.state?.Bid)
    } else {
      setActiveStep(0)
      setBid(bazarState?.state?.Bid)
    }

    getBazaarDetails(bazarState?.state?.Bid);
    console.log('first useEffect')
  }, []);


  React.useEffect(() => {
    getAllLists();
    console.log('second useEffect')
  }, []);

  console.log('ourside of component')
  const getBazaarDetails = async (id: any) => {
    console.log("basiccccccccdetaill", bid, id);
  if(id){
    const responseJson = await AppService.getBazars(id);
    let obj = responseJson.data;
    obj.bazaar_image = await convertImageTobS4(obj.bazaar_image)
    stateCount.current = obj.bazaar_state?.length || 0
    setBasicDetail(obj);
  }
  };

  const [parentCategoryList, setParentCategoryList] = React.useState([]);
  const [formSetGroupCategories, SetFormGroupCategories] = React.useState<any>({});
  const [formData, setFormData] = React.useState<any>({
    wholesellers: "",
    agents: "2",
    states: "2",
    earnings: "154000",
    bills: "52",
    bazaar_description: "test",
    bazaar_name: "",
    bazaar_image: null,
    bazaar_added_date: "2023-03-06T19:56:00+05:30",
    bazaar_updated_date: "2023-03-06T19:56:00+05:30",
    bazaar_updated_by: 1,
    bazaar_state: [],
    bazaar_city: [],
    bazaar_district: [],
    bazaar_gorup_category: [],
    bazaar_category: [],
    bazaar_subcategory: [],
    bazaar_product: [],
  });


  const isStepSkipped = (step: number) => {
    return skipped.has(step);
  };

  const handleGcdata = async (payload: any) => {

    try {
      let responseJson;
      if(payload?.parent_category_ref_image != ""){
        if (payload.id) {
          responseJson = await AppService.updateGroupCate(payload.id, payload);
        } else {
          responseJson = await AppService.addGroupCate(payload);
        }
        if (responseJson.status == 201 || responseJson.status == 200) {
          Alert("Added successfully");
          setGroupCatCount(1);
        }
      }
      else{
        AlertError("Please enter a image");
      }
    }
    catch (error: any) {
      let message:any = [];
      error.response.data.errors.map((row: any,i:number) => {
        message.push(i+1+". "+row.detail)
      })
      AlertError(message);
    }
  }

  const isAllowedStep = async (step: any) => {
    console.log("Fsafds", id);
    let status;
    if (id) {

      if (step === 1) {
        await Promise.all(
          [...Array(Object.keys(formData).length)].map(async (row: any, index: number) => {
            try {
              let responseJson;
              console.log("formData[index]", formData[index]);
              if (formData[index].id) {
                responseJson = await AppService.updateGroupCate(formData[index].id, formData[index]);
              } else {
                responseJson = await AppService.addGroupCate(formData[index]);
              }

              if (responseJson.status == 201 || responseJson.status == 200) {
                if ((Object.keys(formData).length - 1) == index) {
                  console.log("responseJsonhhh", responseJson);
                  status = true;
                }

              } else {
                status = false;
              }
            }
            catch (error: any) {
              status = false;
              let message:any = [];
              error.response.data.errors.map((row: any,i:number) => {
                message.push(i+1+". "+row.detail)
              })
              AlertError(message);
            }
          }))
      }


      if (step === 2) {
        await Promise.all(
          [...Array(Object.keys(formData).length)].map(async (row: any, index: number) => {
            try {
              console.log("formData[index]", formData[index]);

              let responseJson;
              if (formData[index].id) {
                responseJson = await AppService.updateMainCate(formData[index].id, formData[index]);
              } else {
                responseJson = await AppService.addMainCate(formData[index]);
              }
              if (responseJson.status == 201 || responseJson.status == 200) {
                if ((Object.keys(formData).length - 1) == index) {
                  console.log("responseJsonhhh", responseJson);
                  status = true;
                }

              } else {
                status = false;
              }
            }
            catch (error: any) {
              let message:any = [];
              error.response.data.errors.map((row: any,i:number) => {
                message.push(i+1+". "+row.detail)
              })
              AlertError(message);
            }
          }))
      }
      if (step === 3) {
        await Promise.all(
          [...Array(Object.keys(formData).length)].map(async (row: any, index: number) => {
            try {
              console.log("formData[index]", formData[index]);

              let responseJson;
              if (formData[index].id) {
                responseJson = await AppService.updateSubCate(formData[index].id, formData[index]);
              } else {
                responseJson = await AppService.addSubCate(formData[index]);
              }
              if (responseJson.status == 201 || responseJson.status == 200) {
                if ((Object.keys(formData).length - 1) == index) {
                  console.log("responseJsonhhh", responseJson);
                  status = true;
                }

              } else {
                status = false;
              }
            }
            catch (error: any) {
              let message:any = [];
              error.response.data.errors.map((row: any,i:number) => {
                message.push(i+1+". "+row.detail)
              })
              AlertError(message);
            }
          }))
      }



    } else {
      status = false;
    }
    return status;
  };

  const handleNext = async (e?: any,text?:string) => {
    if(text == "Finish"){
      Alert("updated successfully");
    }

    let newSkipped = skipped;
    try {
      if (activeStep === 4) {
        navigate("/bazaars");
        // const responseJson = await AppService.addBazars(formData);
        // Alert("save successfully");
      } else if (activeStep === 0 && basicDetail.bazaar_name) {

        if ((basicDetail.hasOwnProperty("id") && basicDetail.id !== "") || id) {
          let payload: any = Object.assign({}, basicDetail);

          console.log(basicDetail.id,id,payload,"111")
          // payload.bazaar_city = payload.bazaar_city.join(",");
          // payload.bazaar_district = payload.bazaar_district.join(",");
          // payload.bazaar_state = payload.bazaar_state.join(",");

          const responseJson = await AppService.updateBazars(id||basicDetail.id, payload);

          if (responseJson.data) {
            setSetpId(responseJson.data.id);
            setFormData(responseJson.data);
            navigate(`/updatebazaars/${id||basicDetail.id}`);
            setActiveStep((prevActiveStep) => prevActiveStep + 1);
          }
        } else {
          let payload: any = Object.assign({}, basicDetail);
          // payload.bazaar_city = payload.bazaar_city.join(",");
          // payload.bazaar_district = payload.bazaar_district.join(",");
          // payload.bazaar_state = payload.bazaar_state.join(",");
          const responseJson = await AppService.addBazars(payload);
          if (responseJson.data.id) {
            Alert("Saved Successfully");
            navigate(`/updatebazaars/${responseJson.data.id}`);
            setActiveStep((prevActiveStep) => prevActiveStep + 1);
          }
        }
      } else if (activeStep === 1) {
        setActiveStep((prevActiveStep) => prevActiveStep + 1);
      } else if (activeStep === 2) {
        setActiveStep((prevActiveStep) => prevActiveStep + 1);
      } else if (activeStep === 3) {
        setActiveStep((prevActiveStep) => prevActiveStep + 1);
      }

      if (isStepSkipped(activeStep)) {
        newSkipped = new Set(newSkipped.values());
        console.log(activeStep);
        newSkipped.delete(activeStep);
      }
    }
    catch (error: any) {
      let message:any = [];
      error.response.data.errors.map((row: any,i:number) => {
        message.push(i+1+". "+row.detail)
      })
      AlertError(message);
    }
    // setActiveStep((prevActiveStep) => prevActiveStep + 1);

    setSkipped(newSkipped);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
    console.log(formData,"formData");
  };

  const handleReset = () => {
    setActiveStep(0);
  };

  const classes = useBazaarStepperdStyles();
  return ( 
  <div style={{ width: "100%" }} className={classes.root}>
      <div className="headContainer">
        <div className="icon cursor-pointer" onClick={()=>{navigate('/bazaars')}}>
          <img src={LogoPrev} alt={"Logo"} />
        </div>
        <div className="headTitle">
          {activeStep === 0 ? "Add New Bazaar" : basicDetail?.bazaar_name}
        </div>
      </div>
      <div className={classes.stepperContainer}>
        <Box className="relative" sx={{ width: "100%" }}>
          {/* <Stepper activeStep={activeStep}>
            {steps.map((label, index) => {
              const stepProps: { completed?: boolean } = {};
              const labelProps: {
                optional?: React.ReactNode;
              } = {};
              if (isStepSkipped(index)) {
                stepProps.completed = false;
              }
              return (
                <Step key={label} {...stepProps}>
                  <StepLabel {...labelProps}>{label}</StepLabel>
                </Step>
              );
            })}
          </Stepper> */}
          <div className="w-[100%]">
            <ol className="flex justify-between items-center w-full">
              {steps.map((label, index) => {
                return (
                  <>
                  <li className="flex items-center gap-2">
                    <span className={activeStep === index ? "w-[28px] h-[28px] rounded-[24px] text-[#5542F6] text-center leading-[28px] text-[14px] font-[Manrope] font-[600]" : "w-[28px] h-[28px] rounded-[24px] text-[#2E2C34] text-center leading-[28px] text-[14px] font-[Manrope] font-[600]"} style={{
                      backgroundColor: activeStep === index ? 'rgba(85, 66, 246, 0.1)' : 'rgba(182, 180, 186, 0.1)'
                    }}>{index + 1}</span>
                    <span className={activeStep === index ? "text-[16px] font-[Manrope] whitespace-nowrap font-[600] text-[#5542F6]" : "text-[16px] whitespace-nowrap font-[Manrope] font-[600] text-[#2E2C34]"}>{label}</span>
                  </li>
                  {index !== steps.length-1 && <li style={{width:'51px',height:'1px',background:'#EBEAED'}}></li> }
                  </>
                )
              })}
            </ol>
          </div>
          {activeStep === steps.length ? (
            <React.Fragment>
              <Typography sx={{ mt: 2, mb: 1 }}>
                <div className="headTitle">completed</div>
              </Typography>
              <Box sx={{ display: "flex", flexDirection: "row", pt: 2 }}>
                <Box sx={{ flex: "1 1 auto" }} />
                <Button className="nextButton" onClick={handleReset}>
                  Reset
                </Button>
              </Box>
            </React.Fragment>
          ) : (
            <React.Fragment>
              {activeStep === 0 && (
                <BazaarDetails
                  formData={basicDetail}
                  setFormData={setBasicDetail}
                  stateCount={stateCount.current}
                  actionButtonContent={(
                    <div className="actionButton justify-start">
                      <div>
                        <Button
                          className="BackButton"
                          color="inherit"
                          disabled={activeStep === 0}
                          onClick={handleBack}
                        >
                          Back
                        </Button>
                      </div>

                      <div>
                        <Button className="nextButton" onClick={handleNext}>
                          {activeStep === steps.length - 1 ? "Finish" : "Next"}
                        </Button>
                      </div>
                    </div>
                  )}
                />
              )}

              {activeStep === 1 && (
                <GroupCategories
                  formData={formData}
                  setFormData={setFormData}
                  setParentCategoryList={setParentCategoryList}
                  onSavecategory={handleGcdata}
                  setGroupCatCount={setGroupCatCount}
                />
              )}

              {activeStep === 2 && (
                <Categories setCatCount={setCatCount} formData={formData} setFormData={setFormData} />
              )}
              {activeStep === 3 && (
                <Categories2 formData={formData} setFormData={setFormData} />
              )}
              {activeStep === 4 && (
                <SubCategories formData={formData} setFormData={setFormData} />
              )}

              {activeStep !== 0 && (
                <div className="actionButton">
                  <div>
                    <Button
                      className="BackButton"
                      color="inherit"
                      disabled={activeStep === 0}
                      onClick={handleBack}
                    >
                      Back
                    </Button>
                  </div>

                  <div>
                    <Button className="nextButton" onClick={(e:any)=>handleNext(e,(activeStep === steps.length - 1 ? "Finish" : "Next"))}>
                      {activeStep === steps.length - 1 ? "Finish" : "Next"}
                    </Button>
                  </div>
                </div>
              )}
            </React.Fragment>
          )}
        </Box>
      </div>
    </div>
  );
}
