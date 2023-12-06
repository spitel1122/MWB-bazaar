import React, { useEffect, useState } from "react";
import { useSubCategoriesStyles } from "@/static/stylesheets/screens/subcategoriesStyles";
import MuiTreeView from "@/components/atoms/MuiTreeView/MuiTreeView";
import BulkIcon from "@/static/svg/ic_bulkuploads.svg";
import { Dialog, Grid, IconButton, TextField } from "@mui/material";
import UploaderFrame from "@/static/icons/uploader-frame.png";
import { MenuItem, Select, SelectChangeEvent } from "@mui/material";
import LogoAdd from "@/static/icons/ic_add.png";
import { ChevronRightIcon } from "@heroicons/react/20/solid";
import { TreeView, TreeItem } from "@mui/lab";
import { Alert, AlertError } from "@/alert/Alert";
import { AppService } from "@/service/AllApiData.service";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { useParams } from "react-router-dom";
import { readFileAsBase64 } from "@/helper/base64";
import AddIcon from "@mui/icons-material/Add";
import { Units } from "@/components/molecules/Admin/Units";
import { useMasterListStyles } from "@/static/stylesheets/screens";
import CloseIcon from "@mui/icons-material/Close";
import classNames from "classnames";
import AcUnitIcon from "@mui/icons-material/AcUnit";
import {
  FormControl,
  FormControlLabel,
  RadioGroup,
  Radio,
} from "@mui/material";
const SubCategories = (props: {
  formData: { bazaar_name: any };
  setFormData: (arg0: any) => void;
}) => {
  const classes = useSubCategoriesStyles();
  const masterClasses = useMasterListStyles();
  const [listcount, setListcount] = useState(0);
  const [listParentGroupList, setParentGroupList] = useState<any>([]);
  const [ListGroups, setListGroups] = useState([]);
  const [ListCat, setListCat] = useState<any>([]);
  const [ListSubCat, setListSubCat] = useState<any>([]);
  const [masterType, setMasterType] = useState("Regional Wholeseller");
  const [node, setNode] = React.useState("");
  const [categoryGId, setCategoryGID] = useState();
  const [subCategoryGId, setSubCategoryGID] = useState();
  const [unitListModalOpen, setUnitListModalOpen] = useState(false);
  const { id } = useParams();
  const [unitList, setUnitList] = useState([]);
  const [weightList, setWeightList] = useState([]);
  const [selectedbulkImage, setSelectedbulkImage] = useState();
  const [AllColors, setAllColors] = useState<any>([]);
  const [AllSize, setAllSize] = useState<any>([]);
  const [addData, setAddData] = React.useState<any>({});
  const [errorobj, seterrorobj] = useState<any>({
    product_primary_packing_value: false,
    product_secondary_packing_value: false,
    product_per_unit_weight_value: false,
    product_total_weight_value: false,
    product_hsn_code: false,
  });
  useEffect(() => {
    getWeightList();
    getUnitList();
    getColorList();
    getSizeList();
  }, []);

  console.log("subCategoryGIdsubCategoryGId", subCategoryGId);

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
    setAllColors(res.data.results);
  };
  const getSizeList = async () => {
    const res = await AppService.getSize();
    setAllSize(res.data.results);
  };

  React.useEffect(() => {
    if (id) {
      getAllParentLists();
    }
  }, [id]);

  useEffect(() => {
    getCategoryByGroup();
  }, [listParentGroupList]);
  useEffect(() => {
    if (ListSubCat.length > 0) {
      getAllLists(ListSubCat[0]?.id);
    }
  }, [ListSubCat]);
  const getAllParentLists = async () => {
    // const responseJson = await AppService.listSubcategory();
    const responseJson = await AppService.listGroupCateByBazaar({
      bazaar: id,
    });
    setParentGroupList(responseJson.data.results);
    getCategoryByGroup(responseJson.data.results[0].id);
    setAddData({ ...addData, category_group: responseJson.data.results[0].id });
  };

  const getCategoryByGroup = async (parent?: any) => {
    let categoryGroup: any = Object.assign([], listParentGroupList);
    let parentId = parent
      ? parent
      : categoryGroup[0]?.id
      ? categoryGroup[0]?.id
      : "";

    let responseJson;
    try {
      responseJson = await AppService.listCateByParent({
        category_group: parentId,
      });
      setListCat(responseJson.data.results);
      if (responseJson.data.results.length > 0) {
        setAddData({ ...addData, category: responseJson.data.results[0].id });
        setCategoryGID(responseJson.data.results[0].id);
        getSubcategoryByCategory(responseJson.data.results[0].id);
      }
    } catch (e) {
      console.log(e);
    }
  };

  const getSubcategoryByCategory = async (id: any) => {
    let responseJson;
    try {
      responseJson = await AppService.listSubCateByCat({ category: id });
      setAddData({
        ...addData,
        subcategory: responseJson.data.results[0]?.id,
      });
      getAllLists(id);
      setListSubCat(responseJson.data.results);
    } catch (e) {
      console.log(e);
    }
  };

  const bulkUpload = (e: any) => {
    if (e.target.files && e.target.files.length > 0) {
      setSelectedbulkImage(e.target.files[0]);
      uploadBulkFile(e.target.files[0]);
    }
  };

  const uploadBulkFile = async (bulkFile: any) => {
    let formData = new FormData();
    formData.append("files", bulkFile);
    const responseJson = await AppService.bazaarBulkPuload(formData);
  };

  const handleChangeMasterType = (event: SelectChangeEvent) => {
    setMasterType(event.target.value as string);
  };

  const [selectedImage, setSelectedImage] = useState();
  const imageChange = async (e: any, index: number) => {
    if (e.target.files && e.target.files.length > 0) {
      setSelectedImage(e.target.files[0]);
      const url = await readFileAsBase64(e.target.files[0]);
      let obj = { ...addData[index], product_upload_back_image: url };
      setAddData({ ...addData, [index]: obj });
    }
  };
  const [selectedImage2, setSelectedImage2] = useState();
  const imageChange2 = async (e: any, index: number) => {
    if (e.target.files && e.target.files.length > 0) {
      const url = await readFileAsBase64(e.target.files[0]);
      let obj = { ...addData[index], product_upload_mrp_label_image: url };
      setAddData({ ...addData, [index]: obj });
      setSelectedImage2(e.target.files[0]);
    }
  };
  const [selectedImage3, setSelectedImage3] = useState();
  const imageChange3 = async (e: any, index: number) => {
    if (e.target.files && e.target.files.length > 0) {
      const url = await readFileAsBase64(e.target.files[0]);
      let obj = { ...addData[index], product_upload_front_image: url };
      setAddData({ ...addData, [index]: obj });
      setSelectedImage3(e.target.files[0]);
    }
  };

  const handleChange = (
    event: {
      preventDefault(): unknown;
      target: { name: any; value: any };
    },
    index: number
  ) => {
    event.preventDefault();
    let obj = { ...addData[index], [event.target.name]: event.target.value };
    setAddData({ ...addData, [index]: obj });
    if (event.target.value?.includes("-")) {
      seterrorobj((prev: any) => ({ ...prev, [event.target.name]: true }));
    } else {
      seterrorobj((prev: any) => ({ ...prev, [event.target.name]: false }));
    }

    // props.setFormData({
    //   ...props.formData,
    //   bazaar_product: [contactInfo],
    // });
  };
  console.log(errorobj, "errorobj");

  const addInputField = () => {
    let tempListCount = listcount;
    setAddData({
      ...addData,
      [tempListCount]: {
        product_name: "",
        product_description: "",
        product_active: true,
        product_brand_name: "",
        product_unit: "",
        product_total_mrp: "",
        product_per_unit_weight: "",
        product_mrp: "",
        product_gst_no: "",
        bazaar: id,
        product_hsn_code: "",
        product_upload_front_image: null,
        product_upload_back_image: null,
        product_upload_mrp_label_image: null,
        product_added_date: new Date().toISOString(),
        product_updated_date: new Date().toISOString(),
        subcategory: subCategoryGId,
        category: categoryGId,
        category_group: node,
        product_total_weight_unit: "",
        product_per_unit_weight_value: "",
        product_size: "",
        product_colour: "",
        product_per_unit_price: "",
        product_selling_price: "",
        product_primary_packing_value: "",
        product_updated_by: 2,
        product_primary_packing_unit: "",
        product_secondary_packing_value: "",
        product_secondary_packing_unit: "",
        product_per_unit_weight_unit: "",
        product_total_weight_value: "",
      },
    });
    // setInputFields([...inputFields, {
    //     fullName:'',
    //     image:'',
    // } ])
    tempListCount = ++tempListCount;
    setListcount(tempListCount);
  };
  const getAllLists = async (ids: any) => {
    try {
      const responseJson = await AppService.listproductsbysubcat({
        subcategory: ids,
      });

      setListGroups(responseJson.data.results);
      if (responseJson.data.results.length) {
      }
      let tempObj = {};
      if (responseJson.data.results.length > 0) {
        // await Promise.all(
        //   responseJson.data.results.map(async (row: any, index: number) => {
        //     row.product_upload_back_image = await convertImageTobS4(row.product_upload_back_image);
        //     row.product_upload_front_image = await convertImageTobS4(row.product_upload_front_image);
        //     row.product_upload_mrp_label_image = await convertImageTobS4(row.product_upload_mrp_label_image);
        //     tempObj = { ...tempObj, [index]: row };
        //   })
        // );
        // setListcount(responseJson.data.results.length)
        // setAddData(tempObj);
      } else {
        setAddData([]);
      }
    } catch (e) {
      console.log(e);
    }
  };

  const renderParent = (item: any) => <span>{item.parent_category_name}</span>;

  const renderChild = (item: any) => <span>{item.category_name}</span>;

  const renderSubChild = (item: any) => <span>{item.subcategory_name}</span>;

  const save = async (index: number) => {
    let data = {
      ...addData[index],
      subcategory: subCategoryGId,
      category: categoryGId,
      category_group: node,
      product_updated_by: 2,
    };
    const payload = {
      product_name: addData[index].product_name,
      product_brand_name: addData[index].product_brand_name,
      product_description: addData[index].product_description,
      product_total_weight_value: addData[index].product_total_weight_value,
      product_unit: addData[index].product_unit,
      product_total_mrp: addData[index].product_total_mrp,
      product_per_unit_weight: addData[index].product_per_unit_weight,
      product_mrp: addData[index].product_mrp,
      bazaar: id,
      category: categoryGId,
      category_group: node,
      subcategory: subCategoryGId,
      product_gst_no: addData[index].product_gst_no,
      product_hsn_code: addData[index].product_hsn_code,
      product_upload_front_image: addData[index].product_upload_front_image,
      product_upload_back_image: addData[index].product_upload_back_image,
      product_upload_mrp_label_image:
        addData[index].product_upload_mrp_label_image,
      product_active: addData[index].product_active,
      product_added_date: new Date(),
      product_updated_date: new Date(),
      product_subcategory: 2,
      product_updated_by: 2,
      product_total_weight_unit: addData[index].product_total_weight_unit,
      product_per_unit_weight_value:
        addData[index].product_per_unit_weight_value,
      product_size: addData[index].product_size,
      product_colour: addData[index].product_colour,
      product_selling_price: addData[index].product_selling_price,
      product_per_unit_price: addData[index].product_per_unit_price,
      product_primary_packing_value:
        addData[index].product_primary_packing_value,
      product_primary_packing_unit: addData[index].product_primary_packing_unit,
      product_secondary_packing_value:
        addData[index].product_secondary_packing_value,
      product_secondary_packing_unit:
        addData[index].product_secondary_packing_unit,
      product_per_unit_weight_unit: addData[index].product_per_unit_weight_unit,
    };

    console.log(subCategoryGId, "subCategoryGIdsubCategoryGId");

    if (
      errorobj.product_primary_packing_value == false &&
      errorobj.product_secondary_packing_value == false &&
      errorobj.product_per_unit_weight_value == false &&
      errorobj.product_total_weight_value == false &&
      errorobj.product_hsn_code == false
    ) {
      if (subCategoryGId && categoryGId && node) {
        try {
          const responseJson = await AppService.addPrdCate(payload);
          getAllLists(addData.subcategory);

          Alert("AddNew successfully");
        } catch (error: any) {
          let message = error.response.data.type + "\n";
          error.response.data.errors.map((row: any) => {
            message += row.attr + " : " + row.detail + "\n";
          });
          AlertError(message);
        }
      } else {
        AlertError(
          "Please select atleast one group category,category and sub category"
        );
      }
    } else {
      AlertError("please enter a positive number");
    }
  };
  return (
    <div className={classes.root}>
      <div className="container" style={{ marginRight: 0 }}>
        <Grid container>
          <Grid item lg={3} md={4} sm={12}>
            {listParentGroupList.length > 0 && (
              <TreeView
                className="treefont"
                aria-label="file system navigator"
                defaultSelected={String(
                  ListSubCat.length > 0 ? ListSubCat[0]?.id : 0
                )}
                defaultExpanded={[
                  String(
                    listParentGroupList.length > 0
                      ? listParentGroupList[0]?.id
                      : 0
                  ),
                  String(ListCat.length > 0 ? ListCat[0]?.id : 0),
                ]}
                // onNodeToggle={handleToggle}
                // onNodeSelect={handleSelectedItems}
                defaultCollapseIcon={<ExpandMoreIcon />}
                defaultExpandIcon={<ChevronRightIcon />}
                sx={{
                  minHeight: 492,
                  flexGrow: 1,
                  maxWidth: 254,
                  overflowY: "auto",
                  border: 1,
                  padding: "10px",
                  borderColor: "#E1E1E1",
                  borderRadius: "10px",
                }}
              >
                {listParentGroupList?.map((items: any) => (
                  <TreeItem
                    sx={{
                      "& .MuiTreeItem-content": {
                        height: "48px",
                        borderRadius: "10px",
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        fontWeight: "600",
                        fontFamily: "Manrope",
                      },
                      "& .MuiTreeItem-content:hover": {
                        background: "transparent",
                        color: "black",
                      },
                      "& .MuiTreeItem-content:focus": {
                        background: "#e9e7fe",
                        color: "#5542F6",
                      },
                      "& .Mui-selected": {
                        background: "#e9e7fe",
                        color: "#5542F6",
                      },
                      "& .Mui-focused": {
                        background: "#e9e7fe !important",
                        color: "#5542F6 !important",
                      },
                      "& *": {
                        fontSize: "14px !important",
                      },
                    }}
                    nodeId={String(items.id)}
                    label={renderParent(items)}
                    onClick={(event) => {
                      setNode(items.id);
                      setAddData({ ...addData, category_group: items.id });
                      getCategoryByGroup(items.id);

                      event.stopPropagation();
                      event.preventDefault();
                    }}
                  >
                    {ListCat?.map(
                      (cat: any, index: any) =>
                        items.id == cat.category_group && (
                          <TreeItem
                            sx={{
                              "& .MuiTreeItem-content": {
                                height: "48px",
                                borderRadius: "10px",
                                display: "flex",
                                justifyContent: "center",
                                alignItems: "center",
                              },

                              "& .MuiTreeItem-content:hover": {
                                background: "#e9e7fe",
                                color: "#5542F6",
                              },

                              "& *": {
                                fontSize: "14px !important",
                              },
                            }}
                            nodeId={String(cat.id)}
                            label={renderChild(cat)}
                            onClick={(event) => {
                              //setActiveItemId(item.id);
                              setCategoryGID(cat.id);
                              setSubCategoryGID(undefined);
                              getSubcategoryByCategory(cat.id);
                              setAddData({ ...addData, category: cat.id });
                              // if you want after click do expand/collapse comment this two line
                              event.stopPropagation();
                              event.preventDefault();
                            }}
                          >
                            {ListSubCat?.map((sub: any, index: any) => {
                              return (
                                cat.id == sub.category && (
                                  <TreeItem
                                    sx={{
                                      height: "48px",
                                      borderRadius: "10px",
                                      display: "flex",
                                      justifyContent: "center",
                                      alignItems: "center",

                                      "& .MuiTreeItem-content:hover": {
                                        background: "transparent",
                                      },

                                      "& *": {
                                        fontSize: "14px !important",
                                      },
                                    }}
                                    className={
                                      "hover:bg-[#e9e7fe] hover:text-[#5542F6]"
                                    }
                                    nodeId={String(sub.id)}
                                    label={renderSubChild(sub)}
                                    onClick={(event) => {
                                      setCategoryGID(cat.id);
                                      setSubCategoryGID(sub.id);
                                      setNode(items.id);
                                      setAddData({
                                        ...addData,
                                        subcategory: sub.id,
                                      }); //setActiveItemId(item.id);
                                      getAllLists(sub.id);
                                      // getSubcategoryByCategory(item.id);
                                      // if you want after click do expand/collapse comment this two line
                                      event.stopPropagation();
                                      event.preventDefault();
                                    }}
                                  />
                                )
                              );
                            })}
                          </TreeItem>
                        )
                    )}
                  </TreeItem>
                ))}
              </TreeView>
            )}
          </Grid>
          <Grid item lg={9} md={8} sm={12}>
            <div className={"flex gap-[20px]"}>
              <div
                className="rightContainer pt-0 relative"
                style={{ padding: "0 0 10px" }}
              >
                <div
                  className="addButton flex justify-items-center items-center"
                  style={{ padding: "15px 15px" }}
                >
                  <img src={BulkIcon} alt={"Logo"} />
                  <p>Bulk Upload</p>
                </div>
                <input
                  accept="file/*"
                  style={{
                    position: "absolute",
                    top: 0,
                    cursor: "pointer",
                    opacity: "0",
                    width: "100%",
                    padding: "10px 15px",
                  }}
                  className="addButton"
                  type="file"
                  onChange={(e: any) => {
                    bulkUpload(e);
                  }}
                  name="bulk_image"
                />
              </div>
              {/* <div className="rightContainer pt-0 relative">
                <div className="addButton flex justify-items-center items-center" onClick={() => setUnitListModalOpen(true)}>
                  <AddIcon style={{ fontSize: "19px" }} />
                  <p>Add Unit</p>
                </div>
              </div> */}
            </div>

            {[...Array(listcount)].map((row: any, index: number) => (
              <div className="border-2 p-5 mt-3 rounded-md">
                {/* <div className="flex gap-5"> */}
                {/* </div> */}
                <h2 className="font-Manrope text-[#2E2C34] font-[700] not-italic text-[16px] leading-[20px] w-full">
                  Basic Details
                </h2>
                <div className="field">
                  {/* <div className="bazaarField"> */}
                  {/* <Grid container spacing={2}>
                      <Grid item xs={6}>
                        <p className="commonSelectText">Product Name</p>
                        <TextField
                          onChange={(e) => handleChange(e, index)}
                          name="product_name"
                          variant="standard"
                          fullWidth={true}
                          value={addData[index]?.product_name}
                        />
                      </Grid>
                          
                          <Grid item xs={6}>
                        <p className="commonSelectText">Product description</p>
                        <textarea className="w-full h-[32px] outline-none border-b-2 border-[#e1e1e1] text-[14px] indent-[5px] rounded"
                          onChange={(e) => handleChange(e, index)}
                          name="product_description"
                          value={addData[index]?.product_description}
                        ></textarea>
                      </Grid>

                          <Grid item xs={6}>
                        <p className="commonSelectText">Brand Name</p>
                        <TextField
                          onChange={(e) => handleChange(e, index)}
                          name="product_brand_name"
                          variant="standard"
                          fullWidth={true}
                          value={addData[index]?.product_brand_name}
                        />
                      </Grid>
                        </Grid> */}

                  {/* </div> */}
                  <div className="flex gap-12">
                    <div className="w-[50%] my-2">
                      <label className="text-[12px] text-[#84818A] leading-[18px] font-[500]">
                        Product Name
                      </label>
                      <input
                        type="text"
                        className="outline-none border-b-[1px] border-[#EBEAED] w-full"
                        onChange={(e) => handleChange(e, index)}
                        name="product_name"
                        value={addData[index]?.product_name}
                      />
                    </div>
                    <div className="w-[50%] my-2">
                      <label className="text-[12px] text-[#84818A] leading-[18px] font-[500]">
                        Brand Name
                      </label>
                      <input
                        type="text"
                        className="outline-none border-b-[1px] border-[#EBEAED] w-full"
                        onChange={(e) => handleChange(e, index)}
                        name="product_brand_name"
                        value={addData[index]?.product_brand_name}
                      />
                    </div>
                  </div>
                  <div className="w-full my-2">
                    <label className="text-[12px] text-[#84818A] leading-[18px] font-[500]">
                      Product Description
                    </label>
                    <textarea
                      className="outline-none border-[1px] px-[5px] rounded-[6px] border-[#EBEAED] w-full mt-[5px]"
                      onChange={(e) => handleChange(e, index)}
                      name="product_description"
                      value={addData[index]?.product_description}
                    />
                  </div>

                  <div className="flex gap-3">
                    <div className="w-[48%]">
                      <label className="text-[12px] text-[#84818A] leading-[18px] font-[500]">
                        Color
                      </label>
                      <input
                        type={"text"}
                        className="outline-none h-[28px] border-b-[1px] border-[#EBEAED] w-full"
                        onChange={(e) => handleChange(e, index)}
                        name="product_colour"
                      />
                    </div>
                    <div className="w-[48%]">
                      <label className="text-[12px] text-[#84818A] leading-[18px] font-[500]">
                        Size
                      </label>
                      <input
                        type={"text"}
                        onChange={(e) => handleChange(e, index)}
                        name="product_size"
                        className="outline-none h-[28px] border-b-[1px] border-[#EBEAED] w-full"
                      />
                    </div>
                  </div>
                  <div>
                    <div className="my-[10px]">
                      <p className="font-Manrope text-[#2E2C34] font-[700] not-italic text-[16px] leading-[20px] w-full pt-[10px]">
                        Packing Details
                      </p>
                    </div>
                    <div className="flex">
                      <div className="flex justify-center w-[50%]">
                        <p className="font-Poppins text-[#84818A] font-[500] not-italic text-[13px] leading-[13px]">
                          <AcUnitIcon className="py-[5px] px-[0px]" /> 1 box
                        </p>
                      </div>
                      <div className="flex justify-center w-[50%]">
                        <p className="font-Poppins text-[#84818A] font-[500] not-italic text-[13px] leading-[13px]">
                          <AcUnitIcon className="py-[5px] px-[0px]" /> 20 pices
                        </p>
                      </div>
                    </div>
                    <div className="flex gap-2 w-full items-start">
                      <div className="w-3/4">
                        <label className="font-Poppins text-[#84818A] font-[400] not-italic text-[10.3769px] leading-[13px]">
                          Primary Packing
                        </label>
                        <input
                          type="number"
                          className="outline-none h-[28px] border-b-[1px] border-[#EBEAED] w-full"
                          name="product_primary_packing_value"
                          onChange={(e) => handleChange(e, index)}
                        />
                        {errorobj.product_primary_packing_value && (
                          <span className="text-[red] text-[13px]">
                            please enter a positive value
                          </span>
                        )}
                      </div>
                      <div className="w-2/4">
                        <p className="font-Poppins text-[#84818A] font-[400] not-italic text-[10px] leading-[13px]">
                          Unit
                        </p>
                        <Select
                          label="Age"
                          variant={"standard"}
                          fullWidth={true}
                          onChange={(e) => handleChange(e, index)}
                          name="product_primary_packing_unit"
                        >
                          {unitList?.map((item: any, index: number) => {
                            return (
                              <>
                                {item.unit_type == "QUANTITY" && (
                                  <MenuItem value={item?.id} key={index}>
                                    {item?.unit_name}
                                  </MenuItem>
                                )}
                              </>
                            );
                          })}
                        </Select>
                      </div>
                      <div className="w-3/4">
                        <label className="font-Poppins text-[#84818A] font-[400] not-italic text-[10.3769px] leading-[13px]">
                          Secondary Packing
                        </label>
                        <input
                          type="number"
                          className="outline-none border-b-[1px] h-[28px] border-[#EBEAED] w-full"
                          name="product_secondary_packing_value"
                          onChange={(e) => handleChange(e, index)}
                        />
                        {errorobj.product_secondary_packing_value && (
                          <span className="text-[red] text-[13px]">
                            please enter a positive value
                          </span>
                        )}
                      </div>
                      <div className="w-2/4">
                        <p className="font-Poppins text-[#84818A] font-[400] not-italic text-[10.3769px] leading-[13px]">
                          Unit
                        </p>
                        <Select
                          label="Age"
                          variant={"standard"}
                          fullWidth={true}
                          onChange={(e) => handleChange(e, index)}
                          name="product_secondary_packing_unit"
                        >
                          {unitList?.map((item: any, index: number) => {
                            return (
                              <>
                                {item.unit_type == "QUANTITY" && (
                                  <MenuItem value={item?.id} key={index}>
                                    {item?.unit_name}
                                  </MenuItem>
                                )}
                              </>
                            );
                          })}
                        </Select>
                      </div>
                    </div>
                  </div>
                  <div>
                    <div className="my-[10px]">
                      <p className="font-Manrope text-[#2E2C34] font-[700] not-italic text-[16px] leading-[20px] w-full pt-[10px]">
                        Price Details
                      </p>
                    </div>
                    <div className="flex gap-2 w-full items-end">
                      <div className="w-3/4">
                        <label className="font-Poppins text-[#84818A] font-[400] not-italic text-[10.3769px] leading-[13px]">
                          Total Mrp
                        </label>
                        <div className="flex items-end">
                          <span className="outline-none pe-[5px] border-b-[1px] h-[28px] border-[#EBEAED] pt-[2px]">
                            Rs.
                          </span>
                          <input
                            type="number"
                            className="outline-none border-b-[1px] h-[28px] border-[#EBEAED]"
                            name="product_total_mrp"
                            onChange={(e) => handleChange(e, index)}
                            value={addData[index]?.product_total_mrp}
                          />
                        </div>
                      </div>
                      <div className="w-3/4">
                        <label className="font-Poppins text-[#84818A] font-[400] not-italic text-[10.3769px] leading-[13px]">
                          Selling Price
                        </label>
                        <div className="flex items-end">
                          <span className="outline-none pe-[5px] border-b-[1px] h-[28px] border-[#EBEAED] pt-[2px]">
                            Rs.
                          </span>
                          <input
                            type="number"
                            className="outline-none border-b-[1px] h-[28px] border-[#EBEAED]"
                            name="product_selling_price"
                            onChange={(e) => handleChange(e, index)}
                            value={addData[index]?.product_selling_price}
                          />
                        </div>
                      </div>
                      <div className="w-3/4">
                        <label className="font-Poppins text-[#84818A] font-[400] not-italic text-[10.3769px] leading-[13px]">
                          Unit Price
                        </label>
                        <div className="flex items-end">
                          <span className="outline-none pe-[5px] border-b-[1px] h-[28px] border-[#EBEAED] pt-[2px]">
                            Rs.
                          </span>
                          <input
                            type="number"
                            className="outline-none border-b-[1px] h-[28px] border-[#EBEAED] w-full"
                            name="product_per_unit_price"
                            onChange={(e) => handleChange(e, index)}
                            disabled={true}
                            value={Math.round(Number(addData[index]?.product_selling_price) / Number(addData[index]?.product_secondary_packing_value)) || "00"}
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                  <div>
                    <div className="my-[10px]">
                      <p className="font-Manrope text-[#2E2C34] font-[700] not-italic text-[16px] leading-[20px] w-full pt-[10px]">
                        Weight Details
                      </p>
                    </div>
                    <div className="flex justify-between">
                      <div className="w-[50%] justify-center flex">
                        <p className="font-Poppins text-[#84818A] font-[500] not-italic text-[13px] leading-[13px]">
                          <AcUnitIcon className="py-[5px] px-[0px]" /> 1KG
                        </p>
                      </div>
                      <div className="w-[50%] justify-center flex">
                        <p className="font-Poppins text-[#84818A] font-[500] not-italic text-[13px] leading-[13px]">
                          <AcUnitIcon className="py-[5px] px-[0px]" />
                          20KG
                        </p>
                      </div>
                    </div>
                    <div className="flex gap-2 w-full items-start">
                      <div className="w-3/4">
                        <label className="font-Poppins text-[#84818A] font-[400] not-italic text-[10.3769px] leading-[13px]">
                          weight per unit{" "}
                        </label>
                        <input
                          type="number"
                          className="outline-none h-[28px] border-b-[1px] border-[#EBEAED] w-full"
                          name="product_per_unit_weight_value"
                          onChange={(e) => handleChange(e, index)}
                          value={addData[index]?.product_per_unit_weight_value}
                        />
                        {errorobj.product_per_unit_weight_value && (
                          <span className="text-[red] text-[13px]">
                            please enter a positive value
                          </span>
                        )}
                      </div>
                      <div className="w-2/4">
                        <p className="font-Poppins text-[#84818A] font-[400] not-italic text-[10px] leading-[13px]">
                          Unit
                        </p>
                        <Select
                          label="Age"
                          variant={"standard"}
                          fullWidth={true}
                          name="product_per_unit_weight_unit"
                          onChange={(e) => handleChange(e, index)}
                        >
                          {unitList?.map((item: any, index: number) => {
                            return (
                              <>
                                {item.unit_type == "WEIGHT" && (
                                  <MenuItem value={item?.id} key={index}>
                                    {item?.unit_name}
                                  </MenuItem>
                                )}
                              </>
                            );
                          })}
                        </Select>
                      </div>

                      <div className="w-3/4">
                        <label className="font-Poppins text-[#84818A] font-[400] not-italic text-[10.3769px] leading-[13px]">
                          total weight
                        </label>
                        <input
                          type="number"
                          className="outline-none border-b-[1px] h-[28px] border-[#EBEAED] w-full"
                          name="product_total_weight_value"
                          value={addData[index]?.product_total_weight_value}
                          onChange={(e) => handleChange(e, index)}
                        />
                        {errorobj.product_total_weight_value && (
                          <span className="text-[red] text-[13px]">
                            please enter a positive value
                          </span>
                        )}
                      </div>

                      <div className="w-2/4">
                        <p className="font-Poppins text-[#84818A] font-[400] not-italic text-[10.3769px] leading-[13px]">
                          Unit
                        </p>
                        <Select
                          label="Age"
                          variant={"standard"}
                          fullWidth={true}
                          name="product_total_weight_unit"
                          onChange={(e) => handleChange(e, index)}
                        >
                          {unitList?.map((item: any, index: number) => {
                            return (
                              <>
                                {item.unit_type == "WEIGHT" && (
                                  <MenuItem value={item?.id} key={index}>
                                    {item?.unit_name}
                                  </MenuItem>
                                )}
                              </>
                            );
                          })}
                        </Select>
                      </div>
                    </div>
                  </div>
                  <div>
                    <div className="my-[10px]">
                      <p className="font-Manrope text-[#2E2C34] font-[700] not-italic text-[16px] leading-[20px] w-full pt-[10px]">
                        Tax Details
                      </p>
                    </div>
                    <div className="flex items-end">
                      <span className="flex items-end">
                        <FormControl>
                          <RadioGroup
                            row
                            defaultValue="Inclusive"
                            name="product_gst_no"
                          >
                            <FormControlLabel
                              className="inclusive_radio"
                              value="Inclusive"
                              control={<Radio />}
                              label="Inclusive"
                            />
                            <FormControlLabel
                              className="inclusive_radio"
                              value="Exclusive"
                              control={<Radio />}
                              label="Exclusive"
                            />
                          </RadioGroup>
                        </FormControl>
                      </span>
                    </div>
                    <div className="pt-[20px] flex gap-3">
                      <div className="w-[50%]">
                        <label className="text-[12px] text-[#84818A] leading-[18px] font-[500] w-full inline-block">
                          GST(%)
                        </label>
                        <input
                          type="number"
                          className="outline-none border-b-[1px] border-[#EBEAED] w-full"
                          name="product_gst_no"
                          onChange={(e) => handleChange(e, index)}
                          value={addData[index]?.product_gst_no}
                        />
                      </div>
                      <div className="w-[50%]">
                        <label className="text-[12px] text-[#84818A] leading-[18px] font-[500]">
                          HSN Code
                        </label>
                        <input
                          type="number"
                          className="outline-none border-b-[1px] border-[#EBEAED] w-full"
                          name="product_hsn_code"
                          onChange={(e) => handleChange(e, index)}
                          value={addData[index]?.product_hsn_code}
                        />
                        {errorobj.product_hsn_code && (
                          <span className="text-[red] text-[13px]">
                            please enter a positive value
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                  <div>
                    <div className="my-[10px]">
                      <p className="font-Manrope text-[#2E2C34] font-[700] not-italic text-[16px] leading-[20px] w-full pt-[10px]">
                        Documents
                      </p>
                    </div>
                    <Grid container spacing={2} className="mb-[20px]">
                      <Grid item xs={6}>
                        <div className="uploadCard">
                          <div
                            className="uploadIcon px-3"
                            style={{ position: "relative" }}
                          >
                            {!addData[index]?.product_upload_front_image ? (
                              <img src={UploaderFrame} alt={"Uploader"} />
                            ) : (
                              addData[index]?.product_upload_front_image && (
                                <img
                                  src={
                                    addData[index]?.product_upload_front_image
                                  }
                                />
                              )
                            )}
                            <input
                              accept="image/*"
                              style={{
                                position: "absolute",
                                top: 0,
                                maxWidth: "130px",
                                height: "37px",
                                cursor: "pointer",
                                opacity: "0",
                              }}
                              type="file"
                              onChange={(e) => imageChange3(e, index)}
                              name="image"
                            />
                          </div>

                          <div className="content">
                            <div className={"title"}>Upload front Image</div>
                            <div className={"subtitle"}>
                              Image can be size of 512 PX by 512 PX Only
                            </div>
                          </div>
                        </div>
                      </Grid>
                      <Grid item xs={6}>
                        <div className="uploadCard">
                          <div
                            className="uploadIcon px-3"
                            style={{ position: "relative" }}
                          >
                            {!addData[index]?.product_upload_back_image ? (
                              <img src={UploaderFrame} alt={"Uploader"} />
                            ) : (
                              addData[index]?.product_upload_back_image && (
                                <img
                                  src={
                                    addData[index]?.product_upload_back_image
                                  }
                                />
                              )
                            )}
                            <input
                              accept="image/*"
                              style={{
                                position: "absolute",
                                top: 0,
                                maxWidth: "130px",
                                height: "37px",
                                cursor: "pointer",
                                opacity: "0",
                              }}
                              type="file"
                              onChange={(e) => imageChange(e, index)}
                              name="image"
                            />
                          </div>

                          <div className="content">
                            <div className={"title"}>Upload Back Image</div>
                            <div className={"subtitle"}>
                              Image can be size of 512 PX by 512 PX Only
                            </div>
                          </div>
                        </div>
                      </Grid>
                      <Grid item xs={6}>
                        <div className="uploadCard">
                          <div
                            className="uploadIcon px-3"
                            style={{ position: "relative" }}
                          >
                            {!addData[index]?.product_upload_mrp_label_image ? (
                              <img src={UploaderFrame} alt={"Uploader"} />
                            ) : (
                              addData[index]
                                ?.product_upload_mrp_label_image && (
                                <img
                                  src={
                                    addData[index]
                                      ?.product_upload_mrp_label_image
                                  }
                                />
                              )
                            )}
                            <input
                              accept="image/*"
                              style={{
                                position: "absolute",
                                top: 0,
                                maxWidth: "130px",
                                height: "37px",
                                cursor: "pointer",
                                opacity: "0",
                              }}
                              type="file"
                              onChange={(e) => imageChange2(e, index)}
                              name="image"
                            />
                          </div>

                          <div className="content">
                            <div className={"title"}>
                              Upload MRP label Image
                            </div>
                            <div className={"subtitle"}>
                              Image can be size of 512 PX by 512 PX Only
                            </div>
                          </div>
                        </div>
                      </Grid>
                    </Grid>
                  </div>
                  <div>
                    <button
                      className="MuiButtonBase-root MuiButton-root MuiButton-text
                   MuiButton-textPrimary MuiButton-sizeMedium MuiButton-textSizeMedium MuiButton-root MuiButton-text MuiButton-textPrimary MuiButton-sizeMedium MuiButton-textSizeMedium nextButton css-1e6y48t-MuiButtonBase-root-MuiButton-root"
                      type="button"
                      onClick={() => save(index)}
                    >
                      Save
                      <span className="MuiTouchRipple-root css-8je8zh-MuiTouchRipple-root"></span>
                    </button>
                  </div>
                </div>
              </div>
            ))}
            <button
              disabled={!subCategoryGId}
              onClick={addInputField}
              className="disabled:opacity-80 disabled:cursor-not-allowed flex gap-4 items-center border-dashed border-2 border-[#4E2FA9] p-3 h-[48px] rounded-md w-[377px] justify-center cursor-pointer mt-10"
            >
              <img className="w-[10px]" src={LogoAdd} alt={"Logo"} />
              <span className="text-[#4E2FA9]">Add New Product</span>
            </button>
          </Grid>
        </Grid>
      </div>

      <Dialog
        open={unitListModalOpen}
        maxWidth={"lg"}
        sx={{
          "& .MuiDialog-paper": {
            width: "650px",
          },
        }}
        onClose={() => setUnitListModalOpen(false)}
      >
        <div>
          <div className={"flex justify-between p-[30px] pb-[5px]"}>
            <div className={"text-[20px] font-bold"}>Units</div>
            <div>
              <IconButton onClick={() => setUnitListModalOpen(false)}>
                <CloseIcon />
              </IconButton>
            </div>
          </div>
          <div className={classNames(masterClasses.root, "p-[30px] pt-[5px]")}>
            <Units />
          </div>
        </div>
      </Dialog>
    </div>
  );
};

export default SubCategories;
