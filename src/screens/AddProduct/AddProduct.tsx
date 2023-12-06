import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { DashboardLayout } from "@/components/layouts";
import { useAddnewProductStyles } from "@/static/stylesheets/screens";
import Placeholder from "@/static/images/placeholder.jpg";
import UploadImg from "@/static/svg/ic_bulkupload.svg";
import { MenuItem, Select, SelectChangeEvent } from "@mui/material";
import UploadAreaImage from "@/static/svg/ic_uploadarea.svg";
import { AppService } from "@/service/AllApiData.service";
import { FormControl, RadioGroup, FormControlLabel, Radio, Grid } from "@mui/material";
import { Alert, AlertError } from "@/alert/Alert";

const AddProduct = () => {
  const classes = useAddnewProductStyles();
  const navigate = useNavigate();
  const [masterType, setMasterType] = useState("Regional Wholeseller");
  const [modalOpen, setModalOpen] = useState(false)
  const [selectedType, setselectedType] = useState<any>({});
  const [payload, setpayload] = useState<any>({})
  const [CategoryGroupData, setCategoryGroupData] = useState<any>([]);
  const [SubCategoryGroupData, setSubCategoryGroupData] = useState<any>([]);
  const [FinalProductGroupData, setFinalProductGroupData] = useState<any>([]);
  const [iDS] = useState(localStorage.getItem("IDS"));
  const [ProductBazaar, setProductBazaar] = useState<any>([])
  const [FilteredProductsData, setAllfilterAllProducts] = useState<any>([])
  const [weightList, setWeightList] = useState([]);
  const [unitList, setUnitList] = useState<any>([]);
  const [AllColors, setAllColors] = useState<any>([]);
  const [AllSize, setAllSize] = useState<any>([]);

  useEffect(() => {
    createproductdata()
    allGroupCategoryAPI()
    allCategoryAPI()
    allSubCategoryAPI()
    getAllProductsAPI()
  }, [])

  const allGroupCategoryAPI = async () => {
    const res = await AppService.listMaincategory()
    setCategoryGroupData(res?.data?.results)
  }

  const allCategoryAPI = async () => {
    const res = await AppService.listSubcategory()
    setSubCategoryGroupData(res?.data?.results)
  }

  const allSubCategoryAPI = async () => {
    const res = await AppService.listSubcategory()
    setFinalProductGroupData(res?.data?.results)
  }

  useEffect(() => {
    getWeightList();
    getUnitList();
    getColorList();
    getSizeList();
  }, []);

  const getWeightList = async () => {
    const responseJson = await AppService.getAllWeightList();
    setWeightList(responseJson.data);
  };

  const getUnitList = async () => {
    const responseJson = await AppService.getUnits();
    setUnitList(responseJson.data.results);
  };

  const getColorList = async () => {
    const res = await AppService.getColour();
    setAllColors(res.data.results)
  }
  const getSizeList = async () => {
    const res = await AppService.getSize();
    setAllSize(res.data.results)
  }

  const IdParams = Number(iDS)

  const getAllProductsAPI = async () => {
    const responseJson = await AppService.getAllBazaar()
    setProductBazaar(responseJson.data.results)
  }

  useEffect(() => {
    if (ProductBazaar?.length > 0) {
      const matchingproducts = ProductBazaar?.filter((product: any) => product?.bazaar === IdParams);
      setAllfilterAllProducts(matchingproducts)
    }
  }, [ProductBazaar]);

  const createproductdata = async () => {
    setpayload({
      product_description: "",
      product_active: true,
      product_added_date: new Date().toJSON(),
      product_updated_date: new Date().toJSON(),
      product_updated_by: 1,
    });
  }
  function getBase64(file: any) {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = error => reject(error);
    });
  }

  const handleChangeMasterType = async (event: any) => {
    const { files, value, name } = event.target;
    if (files) {
      await getBase64(files[0]).then(
        data => (payload[name] = data)
      );
    }
    else if (Number(value)) {
      payload[name] = Number(value)
    }
    else {
      payload[name] = value
    }
    setpayload({
      ...payload, bazaar: await (selectedType?.selectedCategory?.bazaar),
      category_group: await (selectedType?.selectedCategory?.category_group),
      category: await (selectedType?.selectedCategory?.id),
      subcategory: await (selectedType?.selectedSubcategory?.id)
    })
  };

  useEffect(() => {
    if (ProductBazaar?.length && (!CategoryGroupData || CategoryGroupData?.length === 0 || !Object.keys(selectedType).includes("selectedGroup"))) {
      handleGroupClick(ProductBazaar[0])
      setselectedType((prevdata: any) => ({ ...prevdata, selectedGroup: ProductBazaar[0] }));
    }
  }, [ProductBazaar])

  useEffect(() => {
    if (CategoryGroupData?.length && (!SubCategoryGroupData || SubCategoryGroupData?.length === 0 || !selectedType["selectedCategory"] || selectedType["selectedCategory"]?.bazaar !== selectedType["selectedSubcategory"]?.id)) {
      handleCategoryClick(CategoryGroupData[0])
      setselectedType((prevdata: any) => ({ ...prevdata, selectedCategory: CategoryGroupData[0] }));
    }

    if (CategoryGroupData?.length === 0 && selectedType["selectedCategory"]) {
      setselectedType((prevdata: any) => {
        delete prevdata["selectedCategory"]
        return { ...prevdata }
      });
      if (selectedType["selectedSubcategory"]) {
        setselectedType((prevdata: any) => {
          delete prevdata["selectedSubcategory"]
          return { ...prevdata }
        });
      }
    }

  }, [CategoryGroupData])

  useEffect(() => {
    if (SubCategoryGroupData?.length && (!Object.keys(selectedType).includes("selectedSubcategory") || !selectedType["selectedSubcategory"] || selectedType["selectedCategory"]?.bazaar !== selectedType["selectedSubcategory"]?.bazaar || selectedType["selectedCategory"]?.category_group !== selectedType["selectedSubcategory"]?.category_group)) {
      setselectedType((prevdata: any) => ({ ...prevdata, selectedSubcategory: SubCategoryGroupData[0] }));
    }

    if (SubCategoryGroupData?.length === 0 && selectedType["selectedSubcategory"]) {
      setselectedType((prevdata: any) => {
        delete prevdata["selectedSubcategory"]
        return { ...prevdata }
      });
    }
  }, [SubCategoryGroupData])

  useEffect(() => {
    if (Object.keys(selectedType).includes("selectedGroup") && Object.keys(selectedType).includes("selectedCategory") && Object.keys(selectedType).includes("selectedSubcategory")) {
      handleFilteredProducts();
    }
  }, [selectedType])

  const handleGroupClick = async (data: any) => {
    setselectedType((prevdata: any) => ({ ...prevdata, selectedGroup: data }));
    const res = await AppService.listCateByParent({ bazaar: data })
    setCategoryGroupData(res?.data?.results)
  }

  const handleCategoryClick = async (data: any) => {
    setselectedType((prevdata: any) => ({ ...prevdata, selectedCategory: data }));
    const res = await AppService.listSubCateByCat({ bazaar: selectedType.selectedGroup, category: selectedType.selectedCategory?.id })
    setSubCategoryGroupData(res?.data?.results)
    // dispatch(CategorySlice({ bazaarId: data.bazaar, id: data.category_group }))
  }
  const handleSubCategoryClick = (data: any) => {
    setselectedType((prevdata: any) => ({ ...prevdata, selectedSubcategory: data }));
    // dispatch(SubCategorySlice({ bazaarId: data.bazaar, category: data.category_group, id: data.category_group }))
  }

  const handleFilteredProducts = () => {
    setAllfilterAllProducts({ bazaar: selectedType["selectedGroup"], categoryGroup: selectedType["selectedCategory"]?.category_group, category: selectedType["selectedCategory"]?.id, subCategory: selectedType["selectedSubcategory"]?.id })
    // dispatch(FilteredProducts({ bazaar: selectedType["selectedGroup"], categoryGroup: selectedType["selectedCategory"]?.category_group, category: selectedType["selectedCategory"]?.id, subCategory: selectedType["selectedSubcategory"]?.id }))
  }

  const handelsubmit = async () => {
    try {
      const res = await AppService.addPrdCate(payload)
      if (res.status === 201) {
        navigate('/wholesellerproducts')
        Alert("product added Successfully...")
      }
    } catch (err: any) {
      console.log('err: ', err)
      var firstKey = Object.keys(err?.response?.data)[0];
      AlertError(err?.response?.data[firstKey])
    }
  }

  return (
    <>
      <DashboardLayout>
        <div className={classes.root}>
          <div>
            <div className="flex gap-5 justify-between items-center pb-[20px]">
              <p className="commonTitle">Add New Product</p>
              <div className="border-2 p-3 rounded-md cursor-pointer">
                <div
                  onClick={() => navigate("/bulkupload")}
                  className="flex gap-5"
                >
                  <img src={UploadImg} alt={"Logo"} />
                  <p>Bulk Upload</p>
                </div>
              </div>
            </div>
            <div className="grid grid-cols-9 gap-1">
              <div className="bg-[#e7e7e7] product_item col-span-2">
                <div className="py-[15px] ps-[30px]">
                  <p className="font-Manrope text-[#2E2C34] font-[700] not-italic text-[12px] leading-[20px] tracking-[3px]">GROUP</p>
                </div>
                <div className="product_list">
                  {ProductBazaar?.length > 0 && ProductBazaar?.map((item: any) => (
                    <div className={`py-[9px] cursor-pointer px-[23px] ${item?.id === selectedType["selectedGroup"] && ("bg-[#4E2FA9] text-[#fff]")}`} onClick={() => { handleGroupClick(item?.id) }}>
                      <div className="flex gap-5 items-center">
                        <img
                          style={{ width: '32px', height: '32px' }}
                          className="rounded-[4px] border-solid border-[1px] border-[#E1E1E1]"
                          src={item.bazaar_image}
                          alt={"Logo"}
                        />
                        <p className={`font-Manrope font-[500] not-italic text-[14px] leading-[20px] ${item?.id === selectedType["selectedGroup"] ? ("text-[#fff]") : 'text-gray-900'}`}>{item.bazaar_name}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              <div className="bg-[#e7e7e7] product_item col-span-2">
                <div className="py-[15px] ps-[30px]">
                  <p className="font-Manrope text-[#2E2C34] font-[700] not-italic text-[12px] leading-[20px] tracking-[3px]">CATEGORY</p>
                </div>
                <div className="product_list">
                  {CategoryGroupData?.length > 0 && CategoryGroupData?.map((item: any) => (
                    <div className={`py-[9px] cursor-pointer px-[23px] ${item?.id === selectedType["selectedCategory"]?.id && ("bg-[#4E2FA9] text-[#fff]")}`} onClick={() => handleCategoryClick(item)}>
                      <div className="flex gap-5 items-center">
                        <img
                          style={{ width: '32px', height: '32px' }}
                          className="rounded-[4px] border-solid border-[1px] border-[#E1E1E1]"
                          src={item?.category_ref_image}
                          alt={"Logo"}
                        />
                        <p className={`font-Manrope font-[500] not-italic text-[14px] leading-[20px] ${item?.id === selectedType["selectedCategory"]?.id ? ("text-[#fff]") : 'text-gray-900'}`}>{item.category_name}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              <div className=" product_item col-span-2 bg-[#e7e7e7]">
                <div className="py-[15px] ps-[30px]">
                  <p className="font-Manrope text-[#2E2C34] font-[700] not-italic text-[12px] leading-[20px] tracking-[3px]">SUB-CATEGORY</p>
                </div>
                <div className="product_list">
                  {CategoryGroupData?.length > 0 && SubCategoryGroupData?.length > 0 && SubCategoryGroupData?.map((item: any) => (
                    <div className={`py-[9px] cursor-pointer px-[23px] ${item?.id === selectedType["selectedSubcategory"]?.id && ("bg-[#4E2FA9] text-[#fff]")}`} onClick={() => handleSubCategoryClick(item)}>
                      <div className="flex gap-5 items-center">
                        <img
                          style={{ width: '32px', height: '32px' }}
                          className="rounded-[4px] border-solid border-[1px] border-[#E1E1E1]"
                          src={item?.subcategory_ref_image}
                          alt={"Logo"}
                        />
                        <p className={`font-Manrope font-[500] not-italic text-[14px] leading-[20px] ${item?.id === selectedType["selectedSubcategory"]?.id ? ("text-[#fff]") : 'text-gray-900'}`}>{item.subcategory_name}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              {modalOpen ?
                <div className="col-span-3 product_item">
                  <div className="ps-[35px]">
                    <h2 className="font-Manrope text-[#2E2C34] font-[700] not-italic text-[16px] leading-[20px] tracking-[2px]">Basic Details</h2>
                  </div>
                  <div className="create_product">
                    <div className="ps-[35px]">
                      <div className="py-[22px]">
                        <label className="text-[12px] text-[#84818A] leading-[18px] font-[500]">Product Name</label>
                        <input type="text" className="outline-none border-b-[1px] border-[#EBEAED] w-full" name="product_name" onChange={handleChangeMasterType} />
                      </div>
                    </div>

                    <div className="ps-[35px]">
                      <div className="pb-[22px]">
                        <label className="text-[12px] text-[#84818A] leading-[18px] font-[500]">Product Description</label>
                        <textarea className="outline-none border-[1px] px-[5px] rounded-[6px] border-[#EBEAED] w-full mt-[5px]" name="product_description" onChange={handleChangeMasterType} />
                      </div>
                    </div>
                    <div className="ps-[35px]">
                      <div className="pb-[22px]">
                        <label className="text-[12px] text-[#84818A] leading-[18px] font-[500]">Brand Name</label>
                        <input type="text" className="outline-none border-b-[1px] border-[#EBEAED] w-full" name="product_brand_name" onChange={handleChangeMasterType} />
                      </div>
                    </div>

                    <div className="ps-[35px] flex gap-3">
                      <div>
                        <label className="text-[12px] text-[#84818A] leading-[18px] font-[500]">Color</label>
                        <Select
                          label="Age"
                          variant={"standard"}
                          fullWidth={true}
                          onChange={handleChangeMasterType}
                          name="product_colour"
                        >
                          {AllColors?.map((item: any, index: number) => {
                            return <MenuItem value={item?.id} key={index}>
                              {item?.colour}
                            </MenuItem>
                          })}
                        </Select>
                      </div>
                      <div>
                        <label className="text-[12px] text-[#84818A] leading-[18px] font-[500]">Size</label>
                        <Select
                          label="Age"
                          variant={"standard"}
                          fullWidth={true}
                          onChange={handleChangeMasterType}
                          name="product_size"
                        >
                          {AllSize?.map((item: any, index: number) => {
                            return <MenuItem value={item?.id} key={index}>
                              {item?.size}
                            </MenuItem>
                          })}
                        </Select>
                      </div>
                    </div>

                    <div className="ps-[35px]">
                      <div className="py-[20px]">
                        <p className="tableTitle pt-[10px]">Packing Details</p>
                      </div>


                      <div className="flex gap-2 w-full items-end">

                        <div className="w-3/4">
                          <div>
                            <p className="font-Poppins text-[#84818A] font-[500] not-italic text-[13px] leading-[13px]">
                              {/* <AcUnitIcon className="py-[5px] px-[0px]"/> */}
                              1 box</p>
                          </div>
                          <label className="font-Poppins text-[#84818A] font-[400] not-italic text-[10.3769px] leading-[13px]">Primary Packing</label>
                          <input type="number" className="outline-none h-[28px] border-b-[1px] border-[#EBEAED] w-full" name="product_primary_packing_value" onChange={handleChangeMasterType} />
                        </div>

                        <div className="w-2/4">
                          <p className="font-Poppins text-[#84818A] font-[400] not-italic text-[10px] leading-[13px]">Unit</p>
                          <Select
                            label="Age"
                            variant={"standard"}
                            fullWidth={true}
                            onChange={handleChangeMasterType}
                            name="product_primary_packing_unit"
                          >
                            {unitList?.map((item: any, index: number) => {
                              return <MenuItem value={item?.id} key={index}>
                                {item?.unit_name}
                              </MenuItem>
                            })}
                          </Select>
                        </div>

                        <div className="w-3/4">
                          <div>
                            <p className="font-Poppins text-[#84818A] font-[500] not-italic text-[13px] leading-[13px]">
                              {/* <AcUnitIcon className="py-[5px] px-[0px]"/> */}
                              20 pices</p>
                          </div>
                          <label className="font-Poppins text-[#84818A] font-[400] not-italic text-[10.3769px] leading-[13px]">Secondary Packing</label>
                          <input type="number" className="outline-none border-b-[1px] h-[28px] border-[#EBEAED] w-full" name="product_secondary_packing_value" onChange={handleChangeMasterType} />
                        </div>

                        <div className="w-2/4">
                          <p className="font-Poppins text-[#84818A] font-[400] not-italic text-[10.3769px] leading-[13px]">Unit</p>
                          <Select
                            label="Age"
                            variant={"standard"}
                            fullWidth={true}
                            onChange={handleChangeMasterType}
                            name="product_secondary_packing_unit"
                          >
                            {unitList?.map((item: any, index: number) => {
                              return <MenuItem value={item?.id} key={index}>
                                {item?.unit_name}
                              </MenuItem>
                            })}
                          </Select>
                        </div>
                      </div>
                    </div>

                    <div className="ps-[35px]">
                      <div className="py-[20px]">
                        <p className="tableTitle pt-[10px]">Price Details</p>
                      </div>

                      <div className="flex gap-2 w-full items-end pt-[20px]">
                        <div className="w-3/4">
                          <label className="font-Poppins text-[#84818A] font-[400] not-italic text-[10.3769px] leading-[13px]">Total Mrp</label>
                          <div className="flex items-end">
                            <span className="outline-none pe-[5px] border-b-[1px] h-[28px] border-[#EBEAED] pt-[2px]">Rs.</span>
                            <input type="number" className="outline-none border-b-[1px] h-[28px] border-[#EBEAED]" name="product_total_mrp" onChange={handleChangeMasterType} />
                          </div>
                        </div>

                        <div className="w-3/4">
                          <label className="font-Poppins text-[#84818A] font-[400] not-italic text-[10.3769px] leading-[13px]">Selling Price</label>
                          <div className="flex items-end">
                            <span className="outline-none pe-[5px] border-b-[1px] h-[28px] border-[#EBEAED] pt-[2px]">Rs.</span>
                            <input type="number" className="outline-none border-b-[1px] h-[28px] border-[#EBEAED] w-full" name="product_selling_price" onChange={handleChangeMasterType} />
                          </div>
                        </div>

                        <div className="w-3/4">
                          <label className="font-Poppins text-[#84818A] font-[400] not-italic text-[10.3769px] leading-[13px]">Unit Price</label>
                          <div className="flex items-end">
                            <span className="outline-none pe-[5px] border-b-[1px] h-[28px] border-[#EBEAED] pt-[2px]">Rs.</span>
                            <input type="number" className="outline-none border-b-[1px] h-[28px] border-[#EBEAED] w-full" value={(+payload?.product_primary_packing_value / +payload?.product_selling_price) ? Math.round(+payload?.product_primary_packing_value / +payload?.product_selling_price) : ''} disabled name="product_per_unit_price" onChange={handleChangeMasterType} />
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="ps-[35px]">
                      <div className="py-[20px]">
                        <p className="tableTitle pt-[10px]">Weight Details</p>
                      </div>
                      <div>
                        <p className="font-Poppins text-[#84818A] font-[500] not-italic text-[13px] leading-[13px]">
                          {/* <AcUnitIcon className="py-[5px] px-[0px]" /> */}
                          1 box = 100 KG</p>
                      </div>
                      <div className="flex gap-2 w-full items-end">

                        <div className="w-3/4">
                          <label className="font-Poppins text-[#84818A] font-[400] not-italic text-[10.3769px] leading-[13px]">weight per unit </label>
                          <input type="number" className="outline-none h-[28px] border-b-[1px] border-[#EBEAED] w-full" name="product_per_unit_weight_value" onChange={handleChangeMasterType} />
                        </div>

                        <div className="w-2/4">
                          <p className="font-Poppins text-[#84818A] font-[400] not-italic text-[10px] leading-[13px]">Unit</p>
                          <Select
                            label="Age"
                            variant={"standard"}
                            fullWidth={true}
                            onChange={handleChangeMasterType}
                            name="product_per_unit_weight_unit"
                          >
                            {unitList?.map((item: any, index: number) => {
                              return <MenuItem value={item?.id} key={index}>
                                {item?.unit_name}
                              </MenuItem>
                            })}
                          </Select>
                        </div>

                        <div className="w-3/4">
                          <label className="font-Poppins text-[#84818A] font-[400] not-italic text-[10.3769px] leading-[13px]">total weight</label>
                          <input type="number" className="outline-none border-b-[1px] h-[28px] border-[#EBEAED] w-full" name="product_total_weight_value" onChange={handleChangeMasterType} />
                        </div>

                        <div className="w-2/4">
                          <p className="font-Poppins text-[#84818A] font-[400] not-italic text-[10.3769px] leading-[13px]">Unit</p>
                          <Select
                            label="Age"
                            variant={"standard"}
                            fullWidth={true}
                            onChange={handleChangeMasterType}
                            name="product_total_weight_unit"
                          >
                            {unitList?.map((item: any, index: number) => {
                              return <MenuItem value={item?.id} key={index}>
                                {item?.unit_name}
                              </MenuItem>
                            })}
                          </Select>
                        </div>
                      </div>
                    </div>
                    <div className="ps-[35px]">
                      <div className="pt-[18px] pb-[14px]">
                        <p className="font-Manrope text-[#2E2C34] font-[700] not-italic text-[16px] leading-[20px]">Tax Details</p>
                      </div>
                      <div className="flex items-end">
                        <div><label className="text-[12px] text-[#84818A] leading-[18px] font-[500] w-full inline-block">GST(%)</label>
                          <input type="number" className="outline-none border-b-[1px] border-[#EBEAED] w-[110px]" name="product_gst_no" onChange={handleChangeMasterType} /></div>
                        <span className="flex items-end">
                          <FormControl>
                            <RadioGroup
                              row
                              defaultValue="Inclusive"
                              name="product_gst_no"
                            >
                              <FormControlLabel className="inclusive_radio" value="Inclusive" control={<Radio />} label="Inclusive" />
                              <FormControlLabel className="inclusive_radio" value="Exclusive" control={<Radio />} label="Exclusive" />
                            </RadioGroup>
                          </FormControl>
                        </span>
                      </div>
                    </div>

                    <div className="pt-[20px] ps-[35px]">
                      <div className=" ">
                        <label className="text-[12px] text-[#84818A] leading-[18px] font-[500]">HSN Code</label>
                        <input type="number" className="outline-none border-b-[1px] border-[#EBEAED] w-full" name="product_hsn_code" onChange={handleChangeMasterType} />
                      </div>
                    </div>

                    <div className="mt-[9px] ps-[35px]" style={{ width: "100%" }}>
                      <div>
                        <p className="font-Manrope text-[#2E2C34] font-[700] not-italic text-[16px] leading-[20px] py-[17px]">Product Details</p>
                      </div>

                      <Grid container spacing={2}>
                        <Grid item xs={6}>
                          <label className="font-Poppins text-[#84818A] font-[400] not-italic text-[10.3769px] leading-[13px]">Product Barcode No</label> <br />
                          <input type="number" className="outline-none border-b-[1px] border-[#EBEAED] mb-5" name="product_barcode_number" style={{ width: "100%" }} onChange={handleChangeMasterType} />
                        </Grid><Grid item xs={6}>
                          <label className="font-Poppins text-[#84818A] font-[400] not-italic text-[10.3769px] leading-[13px]">Product Stocks</label> <br />
                          <input type="number" className="outline-none border-b-[1px] border-[#EBEAED] mb-5" name="product_stocks" style={{ width: "100%" }} onChange={handleChangeMasterType} />
                        </Grid>
                      </Grid>
                      <Grid container spacing={2}>
                        <Grid item xs={6}>
                          <label className="font-Poppins text-[#84818A] font-[400] not-italic text-[10.3769px] leading-[13px]">Product Min Quantity</label> <br />
                          <input type="number" className="outline-none border-b-[1px] border-[#EBEAED] mb-5" name="product_min_quantity" style={{ width: "100%" }} onChange={handleChangeMasterType} />
                        </Grid><Grid item xs={6}>
                          <label className="font-Poppins text-[#84818A] font-[400] not-italic text-[10.3769px] leading-[13px]">Product Max Quantity</label> <br />
                          <input type="number" className="outline-none border-b-[1px] border-[#EBEAED] mb-5" name="product_max_quantity" style={{ width: "100%" }} onChange={handleChangeMasterType} />
                        </Grid>
                      </Grid>
                    </div>

                    <div className="pb-[30px] ps-[35px]">
                      <div className="pb-[8px]">
                        <p className="font-Manrope text-[#2E2C34] font-[700] not-italic text-[16px] leading-[20px]">Photos</p>
                      </div>

                      <div className="py-[5px]" style={{ maxWidth: "370px" }}>
                        <div className="flex gap-3 justify-center align-middle items-center relative border-[#E1E1E1;] border-2 border-dashed rounded-md p-5 bg-[#F9FAFB] cursor-pointer">
                          <input type="file" className="absolute w-full h-full cursor-pointer opacity-0" accept=".png, .jpg, .jpeg" name="product_upload_front_image" onChange={handleChangeMasterType} />
                          <div>
                            <img src={UploadAreaImage} alt={"Logo"} />
                          </div>
                          <div>
                            <p>Upload Image</p>
                            <p>Supports JPG, PNG, and JPEG</p>
                          </div>
                        </div>
                      </div>
                      <div className="py-[5px]" style={{ maxWidth: "370px" }}>
                        <div className="flex gap-3 justify-center align-middle items-center relative border-[#E1E1E1;] border-2 border-dashed rounded-md p-5 bg-[#F9FAFB] cursor-pointer">
                          <input type="file" className="absolute w-full h-full cursor-pointer opacity-0" accept=".png, .jpg, .jpeg" name="product_upload_back_image" onChange={handleChangeMasterType} />
                          <div>
                            <img src={UploadAreaImage} alt={"Logo"} />
                          </div>
                          <div>
                            <p>Upload Image</p>
                            <p>Supports JPG, PNG, and JPEG</p>
                          </div>
                        </div>
                      </div>

                      <div className="py-[5px]" style={{ maxWidth: "370px" }}>
                        <div className="flex gap-3 justify-center align-middle items-center relative border-[#E1E1E1;] border-2 border-dashed rounded-md p-5 bg-[#F9FAFB] cursor-pointer">
                          <input type="file" className="absolute w-full h-full cursor-pointer opacity-0" accept=".png, .jpg, .jpeg" name="product_upload_mrp_label_image" onChange={handleChangeMasterType} />
                          <div>
                            <img src={UploadAreaImage} alt={"Logo"} />
                          </div>
                          <div>
                            <p>Upload Image</p>
                            <p>Supports JPG, PNG, and JPEG</p>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="ps-[35px]">
                      <span className="font-Manrope font-[500] text-[16px] leading-[20px] not-italic p-3 cursor-pointer" onClick={() => setModalOpen(false)}>Cancel</span>
                      <span className="font-Manrope font-[500] text-[16px] leading-[20px] not-italic p-3 cursor-pointer" onClick={handelsubmit}>Save</span>
                    </div>
                  </div>
                </div>

                :
                <div className="product_item final_product col-span-3">
                  <div className="">
                    <p className="font-Manrope text-[#2E2C34] font-[700] not-italic text-[12px] leading-[20px] tracking-[3px] bg-[#F5F5F5] py-[15px] ps-[30px]">PRODUCTS</p>
                  </div>

                  <div className="product_lists">
                    <div className="py-[9px] px-[16px]">
                      <button className="flex gap-5 p-2 items-center align-middle text-[#5542F6]" onClick={() => setModalOpen(true)}>
                        <svg
                          width="10"
                          height="10"
                          viewBox="0 0 10 10"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M9.66537 5.66634H5.66536V9.66634H4.33203V5.66634H0.332031V4.33301H4.33203V0.333008H5.66536V4.33301H9.66537V5.66634Z"
                            fill="#5542F6"
                          />
                        </svg>
                        <p className="cursor-pointer">Add More Product</p>
                      </button>
                    </div>
                    <div className="product_list">
                      {
                        FilteredProductsData?.length > 0 && FilteredProductsData?.map((item: any) => (
                          <div className="py-[9px] cursor-pointer px-[23px]">
                            <div className="flex gap-5 items-center">
                              <img
                                style={{ width: '36px', height: '36px' }}
                                className="rounded-md"
                                src={item.product_upload_front_image}
                                alt={"Logo"}
                              />
                              <p className="text-gray-900 whitespace-nowrap text-[14px] font-[600]">{item.product_name}</p>
                            </div>
                          </div>
                        ))
                      }
                    </div>
                  </div>
                </div>
              }
            </div>
          </div>
        </div>
      </DashboardLayout>
    </>
  );
};

export default AddProduct;
