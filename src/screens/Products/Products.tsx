import React, { useState, useEffect } from "react";
import { DashboardLayout } from "@/components/layouts";
import { useProductsStyles } from "@/static/stylesheets/screens/productsStyles";
import { AddButton, GridOptionButton } from "@/components/atoms/Button";
import { SearchField } from "@/components/atoms/SearchField";
import { Dialog, Grid, Pagination, SelectChangeEvent, MenuItem, Select, TextField, Box } from "@mui/material";
import { Alert, AlertError } from "@/alert/Alert";
import barIcon from "@/static/svg/ic_barcode.svg";
import pieIcon from "@/static/svg/ic_piechart.svg";
import ChartIcon from "@/static/svg/ic_chart.svg";
import { useNavigate } from "react-router-dom";
import { AppService } from "@/service/AllApiData.service";
import LogoContract from "@/static/icons/uploader-frame.png";
import * as Yup from "yup";
import { readFileAsBase64 } from "@/helper/base64";
import calendar from "@/static/icons/calendar.svg";
import fill from "@/static/icons/fill.svg";
import CommonSelectElectronicBazaar from "@/components/atoms/CommonSelectElectronicBazaar/CommonSelectElectronicBazaar";
import Pinimage from "@/static/images/Vector (9).png";
import { ErrorMessage, Form, Formik } from "formik";
import UploaderFrame from "@/static/icons/uploader-frame.png";
import { useProductListStyles } from "@/static/stylesheets/molecules";
import closeicon from "@/static/images/Vector (10).png"
import { ActionButton } from "@/components/atoms/Button/ActionButton";
import moment from "moment";
import { MdDelete } from "react-icons/md";

const Products = (props: any) => {
  const navigate = useNavigate();
  const classes = useProductsStyles();
  const classesM = useProductListStyles();
  const [addModalOpen, setAddModalOpen] = useState(false);
  const [anotherModalOpen, setAnotherModalOpen] = useState(false);
  const [allProducts, setallProducts] = useState<any>([])
  const [AllGroupCategory, setAllGroupCategory] = useState<any>([]);
  const [AllCategory, setAllCategory] = useState<any>([]);
  const [AllSubCategory, setAllSubCategory] = useState<any>([]);
  const [UnitsByid, setUnitsByid] = useState<any>([]);
  const [totalproducts, setTotalproducts] = useState(1);
  const [filterAllProducts, setfilterAllProducts] = useState<any>([]);
  const [filterAllProductsM, setfilterAllProductsM] = useState<any>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchK, setSearchK] = useState("");
  const [ProductDetail, setProductDetail] = useState<any>({});
  const [isshowmore, setisshowmore] = useState(false);
  const [AllGroupCategoryType, setAllGroupCategoryType] = useState<any>([]);
  const [GroupCategoryTypeList, setGroupCategoryTypeList] = useState<any>([]);
  const [AllCategoryType, setAllCategoryType] = useState<any>([]);
  const [CategoryTypeList, setCategoryTypeList] = useState<any>([]);
  const [AllSubCategoryType, setAllSubCategoryType] = useState<any>([]);
  const [SubCategoryTypeList, setSubCategoryTypeList] = useState<any>([]);
  const [AllActiveInactive, setAllActiveInactive] = useState<any>([]);
  const [activeInactiveList, setactiveInactiveList] = useState<any>([]);
  const [Allstatus, setAllstatus] = useState<any>([]);
  const [statusList, setstatusList] = useState<any>([]);
  const [Allstocks, setAllstocks] = useState<any>([]);
  const [stockList, setstockList] = useState<any>([]);
  const [Allweight, setAllweight] = useState<any>([]);
  const [WeightList, setweightList] = useState<any>([]);
  const [AllPrice, setAllPrice] = useState<any>([]);
  const [PriceList, setPriceList] = useState<any>([]);
  const [addData, setAddData] = useState<any>({});
  const [data, setData] = useState<any>({});

  const handlePageChange = (event: any, value: any) => {
    setCurrentPage(value);
    getAllListsM(value);
  };

  console.log('allProducts', allProducts)

  const getAllListsM = async (page: any) => {
    try {
      const responseJson = await AppService.listPrdproductsAll({ page: page })
      setallProducts(responseJson.data.results)
      setfilterAllProducts(responseJson.data.results)
      setfilterAllProductsM(responseJson.data.results)
      setTotalproducts(responseJson?.data.count);
      responseJson.data.results.forEach((item: any) => {
        Promise.all([fetchCategoryDetail(item.category), fetchParentCategoryDetails(item.category_group), fetchSubCategoryDetails(item.subcategory), fetchUnitsDetails(item?.product_total_weight_unit)])
      })
    } catch (err) {
      console.log("Error: ", err)
    }
  }

  useEffect(() => {
    getAllListsM(1);
  }, []);

  const fetchCategoryDetail = async (id: number) => {
    try {
      const response = await AppService.detailMainCategoryById(id)
      setAllCategory((prev: any) => prev.find((item: any) => item.id === response.data.id) ? prev : prev.concat(response.data))
    } catch (err) {
      console.log("Error: ", err)
    }
  }

  const fetchParentCategoryDetails = async (id: number) => {
    try {
      const res = await AppService.listGroupCategoryById(id)
      setAllGroupCategory((prev: any) => prev.find((item: any) => item.id === res.data.id) ? prev : prev.concat(res.data))
    } catch (err) {
      console.log("Error: ", err)
    }
  }

  const fetchSubCategoryDetails = async (id: number) => {
    try {
      const res = await AppService.subcategoryById(id)
      setAllSubCategory((prev: any) => prev.find((item: any) => item.id === res.data.id) ? prev : prev.concat(res.data))
    } catch (err) {
      console.log("Error: ", err)
    }
  }

  const fetchUnitsDetails = async (id: number) => {
    try {
      const res = await AppService.getUnitsById(id)
      setUnitsByid((prev: any) => prev.find((item: any) => item.id === res.data.id) ? prev : prev.concat(res.data))
    } catch (err) {
      console.log("Error: ", err)
    }
  }

  const handleCallback = (e: any) => {
    setSearchK(e);
  }

  async function convertImageTobS4(imgUrl: string) {
    const imageToBase64 = require('image-to-base64/browser.js');
    let response = await imageToBase64(imgUrl);
    return "data:image/png;base64," + response;
  }

  const handleProductStatus = async (e: any, index: number, id: any) => {
    let textmsg = ""
    if (e.target.checked) {
      textmsg = "Do you want to active product ?";
    } else {
      textmsg = "Do you want to inactive product ?";
    }
    if (window.confirm(textmsg)) {
      let productData = allProducts[index];

      if (productData.product_upload_front_image) {
        if (productData.product_upload_front_image.includes("https")) {
          productData.product_upload_front_image = await convertImageTobS4(productData.product_upload_front_image);
        }
      } else {
        productData.product_upload_front_image = "";
      }

      if (productData.product_upload_back_image) {
        if (productData.product_upload_back_image.includes("https")) {
          productData.product_upload_back_image = await convertImageTobS4(productData.product_upload_back_image);
        }
      } else {
        productData.product_upload_back_image = "";
      }

      if (productData.product_upload_mrp_label_image) {
        if (productData.product_upload_mrp_label_image.includes("https")) {
          productData.product_upload_mrp_label_image = await convertImageTobS4(productData.product_upload_mrp_label_image);
        }
      } else {
        productData.product_upload_mrp_label_image = "";
      }
      productData.product_active = e.target.checked === true ? false : true;
      const responseJson = await AppService.updateProduct(id, productData);
      console.log('responseJson', responseJson)
      if (responseJson.status === 200) {
        if (e.target.checked) {
          Alert('product Inactive Successfully');
        }
        else {
          Alert('product Active Successfully');
        }
      }
      getAllListsM(currentPage);
    }
  }

  const handleDeleteProduct = async (id: any) => {
    if (window.confirm('Do You want to delete product')) {
      const responseJson = await AppService.deleteProduct(id);
      if (responseJson.status === 204) {
        Alert("Product Delete Successfully");
        getAllListsM(currentPage);
      }
    }
  }

  const ViewProductForm = async (id: any) => {
    const res = await AppService.detailProduct(id)
    setProductDetail(res.data)
    setisshowmore(true)
  }

  const handleModalBackdrop = props.handleModalBackdrop
  const useClickOutside = (ref: React.RefObject<HTMLElement>, onClickOutside: () => void) => {
    useEffect(() => {
      const handleClickOutside = (event: MouseEvent) => {
        if (ref.current && !ref.current.contains(event.target as Node)) {
          onClickOutside();
        }
      };
      document.addEventListener('mousedown', handleClickOutside);
      return () => {
        document.removeEventListener('mousedown', handleClickOutside);
      };
    }, [ref, onClickOutside]);
  };
  // const viewkycRef = useDetectClickOutside({ onTriggered: closeViewKycModal });
  const viewproductRef = React.useRef(null);
  useClickOutside(viewproductRef, () => setisshowmore(false));

  useEffect(() => {
    if (isshowmore) {
      handleModalBackdrop(true);
    } else if (!isshowmore) {
      handleModalBackdrop(false);
    }
  }, [isshowmore]);

  const [listcount, setListcount] = useState(0);
  const [listParentGroupList, setParentGroupList] = useState<any>([]);
  const [ListGroups, setListGroups] = useState([]);
  const [ListCat, setListCat] = useState<any>([]);
  const [ListSubCat, setListSubCat] = useState<any>([]);
  const [masterType, setMasterType] = useState("Regional Wholeseller");
  const [categoryGId, setCategoryGID] = useState();
  const [unitList, setUnitList] = useState([]);
  const [weightList, setWeightList] = useState([]);
  const [AllColors, setAllColors] = useState<any>([]);
  const [AllSize, setAllSize] = useState<any>([]);

  useEffect(() => {
    getWeightList();
    getUnitList();
    getColorList();
    getSizeList();
  }, []);

  const getColorList = async () => {
    const res = await AppService.getColour();
    setAllColors(res.data.results)
  }
  const getSizeList = async () => {
    const res = await AppService.getSize();
    setAllSize(res.data.results)
  }

  const getWeightList = async () => {
    const responseJson = await AppService.getAllWeightList();
    setWeightList(responseJson.data);
  };

  const getUnitList = async () => {
    const responseJson = await AppService.getUnits();
    setUnitList(responseJson.data.results);
  };

  useEffect(() => {
    getCategoryByGroup();
  }, [listParentGroupList]);

  useEffect(() => {
    if (ListSubCat.length > 0) {
      getAllLists(ListSubCat[0]?.id)
    }
  }, [ListSubCat]);

  const getCategoryByGroup = async (parent?: any) => {
    let categoryGroup: any = Object.assign([], listParentGroupList);
    let parentId = parent ? parent : categoryGroup[0]?.id ? categoryGroup[0]?.id : "";

    let responseJson;
    try {
      responseJson = await AppService.listCateByParent({
        category_group: parentId,
      });
      setListCat(responseJson.data.results);
      if (responseJson.data.results.length > 0) {
        setAddData({ ...addData, category: responseJson.data.results[0].id });
        setCategoryGID(responseJson.data.results[0].id);
      }

    } catch (e) {
      console.log(e)
    }
  };

  const handleChangeMasterType = (event: SelectChangeEvent) => {
    console.log('event.target.value', event.target.value)
    setMasterType(event.target.value as string);
  };
  const getAllLists = async (ids: any) => {
    try {
      const responseJson = await AppService.listproductsbysubcat({
        subcategory: ids,
      });
      setListGroups(responseJson.data.results);
      let tempObj = {};
      if (responseJson.data.results.length > 0) {
        await Promise.all(
          responseJson.data.results.map(async (row: any, index: number) => {
            row.product_upload_back_image = await convertImageTobS4(row.product_upload_back_image);
            row.product_upload_front_image = await convertImageTobS4(row.product_upload_front_image);
            row.product_upload_mrp_label_image = await convertImageTobS4(row.product_upload_mrp_label_image);
            tempObj = { ...tempObj, [index]: row };
          })
        );
        setListcount(responseJson.data.results.length)
        setAddData(tempObj);
      } else {
        setAddData([]);
      }
    } catch (e) {
      console.log(e);
    }
  };


  const SignupSchema = Yup.object().shape({
    product_name: Yup.string()
      .min(2, "Too Short!")
      .max(40, "Too Long!")
      .required("agent name is required"),
    product_brand_name: Yup.string().required("product brand name is required"),
    product_mrp: Yup.string().required("product_mrp is required"),
    product_gst_no: Yup.string().required("product_gst_no is required"),
    product_hsn_code: Yup.string().required("product_hsn_code is required"),
  });

  let initialValues = {
    product_name: data?.product_name || "",
    product_brand_name: data?.product_brand_name || "",
    product_description: data?.product_description || "",
    product_total_weight_value: data?.product_total_weight_value || "",
    product_total_weight_unit: data?.product_total_weight_unit || "",
    product_per_unit_weight_value: data?.product_per_unit_weight_value || "",
    product_per_unit_weight_unit: data?.product_per_unit_weight_unit || "",
    product_unit: data?.product_unit || "",
    product_total_mrp: data?.product_total_mrp || "",
    product_mrp: data?.product_mrp || "",
    product_gst_no: data?.product_gst_no || "",
    product_hsn_code: data?.product_hsn_code || "",
    product_upload_front_image: data?.product_upload_front_image || "",
    product_upload_back_image: data?.product_upload_back_image || "",
    product_upload_mrp_label_image: data?.product_upload_mrp_label_image || "",
    product_updated_date: data?.product_updated_date || "",
    product_subcategory: data?.product_subcategory || "",
    product_updated_by: data?.product_updated_by || "",
    product_size: data?.product_size,
    product_colour: data?.product_colour,
  };

  const EditProduct = async (id: any) => {
    const res = await AppService.detailProduct(id)
    setData(res.data)
    setAddModalOpen(true)
  }

  const handleFormSubmit = async (values: any) => {
    console.log('data?.product_upload_front_image', data?.product_upload_front_image)
    if (values?.product_upload_front_image?.includes("https")) {
      values.product_upload_front_image = await convertImageTobS4(data?.product_upload_front_image);
    }
    if (values?.product_upload_back_image?.includes("https")) {
      values.product_upload_back_image = await convertImageTobS4(data?.product_upload_back_image);
    }
    if (values?.product_upload_mrp_label_image.includes("https")) {
      values.product_upload_mrp_label_image = await convertImageTobS4(data?.product_upload_mrp_label_image);
    }
    try {
      const response = await AppService.updateProduct(data?.id, values);
      if (response) {
        Alert("Successfully updated!!!");
        navigate('/wholesellerproducts')
        setAddModalOpen(false)
      }
    } catch (error: any) {
      console.log("error===>in updating kyc", error);
      let message = error.response.data.type + "\n"
      error.response.data.errors.map((row: any) => {
        message += row.attr + " : " + row.detail + "\n"
      })
      AlertError(message);
    }
    getAllListsM(currentPage)
  };

  useEffect(() => {
    getAllGroupCateTypes()
    getAllGroupCateTypesData()
    getAllCateTypes()
    getAllCateTypesData()
    getAllSubCateTypes()
    getAllSubCateTypesData()
    getAllStatus()
    getAllStatusData()
    getAllWeight()
    getAllWeightData()
    getAllPrices()
    getAllPricesData()
  }, [])

  useEffect(() => {
    getAllGroupCateTypes()
    getAllGroupCateTypesData()
    getAllCateTypes()
    getAllCateTypesData()
    getAllSubCateTypes()
    getAllSubCateTypesData()
    getAllActiveInactive()
    getAllActiveInactiveData()
    getAllStatus()
    getAllStatusData()
    getAllStocks()
    getAllStocksData()
    getAllWeight()
    getAllWeightData()
    getAllPrices()
    getAllPricesData()
  }, [filterAllProducts])

  const getAllGroupCateTypes = async () => {
    const responseJson = await AppService.listGroupCate();
    const arr = responseJson.data.results.map((item: any) => item);
    setAllGroupCategoryType(arr);
  }
  const getAllGroupCateTypesData = async () => {
    if (AllGroupCategoryType.length > 0) {
      let tempState = AllGroupCategoryType?.map((row: any) => {
        return {
          label: row.parent_category_name,
          value: row.id,
        }
      })
      setGroupCategoryTypeList(tempState);
    }
  };

  const getAllCateTypes = async () => {
    const responseJson = await AppService.listMaincategory();
    const arr = responseJson.data.results?.map((item: any) => item);
    setAllCategoryType(arr);
  }
  const getAllCateTypesData = async () => {
    if (AllCategoryType.length > 0) {
      let tempState = AllCategoryType?.map((row: any) => {
        return {
          label: row.category_name,
          value: row.id,
        }
      })
      setCategoryTypeList(tempState);
    }
  };

  const getAllSubCateTypes = async () => {
    const responseJson = await AppService.listSubcategory();
    const arr = responseJson.data.results?.map((item: any) => item);
    setAllSubCategoryType(arr);
  }

  const getAllSubCateTypesData = async () => {
    if (AllSubCategoryType.length > 0) {
      let tempState = AllSubCategoryType?.map((row: any) => {
        return {
          label: row.subcategory_name,
          value: row.id,
        }
      })
      setSubCategoryTypeList(tempState);
    }
  };
  const getAllActiveInactive = async () => {
    const responseJson = await AppService.listPrdproducts();
    const arr = responseJson.data.results?.map((item: any) => {
      if (item?.product_active === true) {
        return true
      } else {
        return false
      }
    });
    var uniqueArray = Array.from(new Set(arr));
    setAllActiveInactive(uniqueArray);
  }
  const getAllActiveInactiveData = async () => {
    if (AllActiveInactive?.length > 0) {
      let tempState = AllActiveInactive?.map((row: any) => {
        return {
          label: row === true ? "Enable" : "Disable",
          value: row === true ? true : false,
        }
      })
      setactiveInactiveList(tempState);
    }
  };
  const getAllStocks = async () => {
    const responseJson = await AppService.listPrdproducts();
    const arr = responseJson.data.results?.map((item: any) => item?.product_stocks);
    var uniqueArray = Array.from(new Set(arr));
    setAllstocks(uniqueArray);
  }
  const getAllStocksData = async () => {
    if (Allstocks?.length > 0) {
      let tempState = Allstocks?.map((row: any) => {
        return {
          label: row,
          value: row,
        }
      })
      setstockList(tempState);
    }
  };
  const getAllWeight = async () => {
    const responseJson = await AppService.listPrdproducts();
    const arr = responseJson.data.results?.map((item: any) => item?.product_total_weight_value);
    var uniqueArray = Array.from(new Set(arr));
    setAllweight(uniqueArray);
  }
  const getAllWeightData = async () => {
    if (Allweight?.length > 0) {
      let tempState = Allweight?.map((row: any) => {
        return {
          label: row,
          value: row,
        }
      })
      setweightList(tempState);
    }
  };
  const getAllPrices = async () => {
    const responseJson = await AppService.listPrdproducts();
    const arr = responseJson.data.results?.map((item: any) => item?.product_total_mrp);
    var uniqueArray = Array.from(new Set(arr));
    setAllPrice(uniqueArray);
  }
  const getAllPricesData = async () => {
    if (AllPrice?.length > 0) {
      let tempState = AllPrice?.map((row: any) => {
        return {
          label: row,
          value: row
        }
      })
      setPriceList(tempState);
    }
  };
  const getAllStatus = async () => {
    const responseJson = await AppService.listPrdproducts();
    const arr = responseJson.data.results?.map((item: any) => item?.product_brand_name);
    var uniqueArray = Array.from(new Set(arr));
    setAllstatus(uniqueArray);
  }
  const getAllStatusData = async () => {
    if (Allstatus?.length > 0) {
      let tempState = Allstatus?.map((row: any) => {
        return {
          label: row,
          value: row,
        }
      })
      setstatusList(tempState);
    }
  };

  const handleChange = (selectboxName: string, id: any) => {
    if (selectboxName === 'Stock') {
      setstockList((prev: any) => {
        return prev.map((item: any) => item.value === id ? { ...item, status: !item.status } : item)
      });
    }
    if (selectboxName === 'Group Category') {
      setGroupCategoryTypeList((prev: any) => {
        return prev.map((item: any) => item.value === id ? { ...item, status: !item.status } : item)
      });
    }
    if (selectboxName === 'Category') {
      setCategoryTypeList((prev: any) => {
        return prev.map((item: any) => item.value === id ? { ...item, status: !item.status } : item)
      });
    }
    if (selectboxName === 'Sub-Category') {
      setSubCategoryTypeList((prev: any) => {
        return prev.map((item: any) => item.value === id ? { ...item, status: !item.status } : item)
      });
    }
    if (selectboxName === 'Brand') {
      setstatusList((prev: any) => {
        return prev.map((item: any) => item.value === id ? { ...item, status: !item.status } : item)
      });
    }
    if (selectboxName === 'Weight') {
      setweightList((prev: any) => {
        return prev.map((item: any) => item.value === id ? { ...item, status: !item.status } : item)
      });
    }
    if (selectboxName === 'Price') {
      setPriceList((prev: any) => {
        return prev.map((item: any) => item.value === id ? { ...item, status: !item.status } : item)
      });
    }
    if (selectboxName === 'Active/Inactive') {
      setactiveInactiveList((prev: any) => {
        return prev.map((item: any) => item.value === id ? { ...item, status: !item.status } : item)
      });
    }
  }

  useEffect(() => {
    let temp1 = filterAllProductsM;
    // Stock
    if (temp1?.length && stockList?.length) {
      const selectedstock = stockList?.filter((item: any) => item.status === true).map((item: any) => item?.value);
      if (selectedstock?.length > 0) {
        temp1 = temp1?.filter((item: any) => selectedstock?.includes(item?.product_stocks));
      }
    }
    // Group Category
    if (temp1?.length && GroupCategoryTypeList?.length) {
      const selectedGroupcategoryType = GroupCategoryTypeList?.filter((item: any) => item.status === true).map((item: any) => item?.value);
      if (selectedGroupcategoryType?.length > 0) {
        temp1 = temp1?.filter((item: any) => selectedGroupcategoryType?.includes(item?.category_group));
      }
    }
    // Category
    if (temp1?.length && CategoryTypeList?.length) {
      const selectedcategoryType = CategoryTypeList?.filter((item: any) => item.status === true).map((item: any) => item?.value);
      if (selectedcategoryType?.length > 0) {
        temp1 = temp1?.filter((item: any) => selectedcategoryType?.includes(item?.category));
      }
    }
    // Subcategory
    if (temp1?.length && SubCategoryTypeList?.length) {
      const selectedsubcategoryType = SubCategoryTypeList?.filter((item: any) => item.status === true).map((item: any) => item?.value);
      if (selectedsubcategoryType?.length > 0) {
        temp1 = temp1?.filter((item: any) => selectedsubcategoryType?.includes(item?.subcategory));
      }
    }
    // Brand
    if (temp1?.length && statusList?.length) {
      const selectedStatus = statusList?.filter((item: any) => item.status === true).map((item: any) => item.value);
      if (selectedStatus?.length > 0) {
        temp1 = temp1?.filter((item: any) => selectedStatus?.includes(item?.product_brand_name));
      }
    }
    // Weight
    if (temp1?.length && WeightList?.length) {
      const selectedWeight = WeightList?.filter((item: any) => item.status === true).map((item: any) => item.value);
      if (selectedWeight?.length > 0) {
        temp1 = temp1?.filter((item: any) => selectedWeight?.includes(item?.product_total_weight_value));
      }
    }
    // Price
    if (temp1?.length && PriceList?.length) {
      const selectedPrice = PriceList?.filter((item: any) => item.status === true).map((item: any) => item.value);
      if (selectedPrice?.length > 0) {
        temp1 = temp1?.filter((item: any) => selectedPrice?.includes(item?.product_total_mrp));
      }
    }
    // active / inactive
    if (temp1?.length && AllActiveInactive?.length) {
      const selectedActiveInactive = activeInactiveList?.filter((item: any) => item.status === true).map((item: any) => item.value);
      if (selectedActiveInactive?.length > 0) {
        temp1 = temp1?.filter((item: any) => selectedActiveInactive?.includes(item?.product_active));
      }
    }
    setallProducts(temp1)
  }, [filterAllProductsM, activeInactiveList, statusList, GroupCategoryTypeList, CategoryTypeList, SubCategoryTypeList, stockList, WeightList, PriceList])

  const [selectedImage, setSelectedImage] = useState();
  const imageChange = async (e: any) => {
    if (e.target.files && e.target.files.length > 0) {
      setSelectedImage(e.target.files[0]);
      const url = await readFileAsBase64(e.target.files[0]);
      let obj = { ...data, product_upload_back_image: url };
      setAddData(obj);
    }
  };
  const [selectedImage2, setSelectedImage2] = useState();
  const imageChange2 = async (e: any) => {
    if (e.target.files && e.target.files.length > 0) {
      const url = await readFileAsBase64(e.target.files[0]);
      let obj = { ...data, product_upload_mrp_label_image: url };
      setData(obj);
      setSelectedImage2(e.target.files[0]);
    }
  };
  const [selectedImage3, setSelectedImage3] = useState();
  const imageChange3 = async (e: any) => {
    if (e.target.files && e.target.files.length > 0) {
      const url = await readFileAsBase64(e.target.files[0]);
      let obj = { ...data, product_upload_front_image: url };
      setAddData(obj);
      setSelectedImage3(e.target.files[0]);
    }
  };

  return (
    <>
      <DashboardLayout>
        <div className={classes.root}>
          <div className="py-[20px]">
            <div className="headContainer">
              <div className="headTitle">
                <p>All Products ({totalproducts})</p>
              </div>
              <div className="actionButton">
                <div>
                  <AddButton
                    label="Add Products"
                    onClick={() => navigate("/addproduct")}
                  />
                </div>
                <div>
                  <AddButton label="Import from Tally" variant="primary" />
                </div>
              </div>
            </div>

            <div className="product-search">
              <div className="bazaarFilters pt-[10px]" style={{ display: "flex", alignItems: "center", flexWrap: "wrap" }}>
                <div style={{ marginRight: "10px", marginTop: "5px" }}>
                  <CommonSelectElectronicBazaar
                    label={"Stock"}
                    hint={"Select Stock"}
                    options={stockList}
                    handleSelect={handleChange}
                    selectedIds={stockList.filter((item: any) => item?.status).map((elm: any) => elm?.value)}
                  />
                </div>
                <div style={{ marginRight: "10px", marginTop: "5px" }}>
                  <CommonSelectElectronicBazaar
                    label={"Brand"}
                    hint={"Select Brand"}
                    options={statusList}
                    handleSelect={handleChange}
                    selectedIds={statusList?.filter((item: any) => item?.status).map((elm: any) => elm?.value)}
                  />
                </div>
                {/* <div style={{ marginRight: "10px", marginTop: "5px" }}>
                  <CommonSelectElectronicBazaar
                    label={"Branch"}
                    hint={"Select Branch"}
                    options={GroupCategoryTypeList}
                    handleSelect={handleChange}
                    selectedIds={GroupCategoryTypeList.filter((item: any) => item?.status).map((elm: any) => elm?.value)}
                  />
                </div> */}
                <div style={{ marginRight: "10px", marginTop: "5px" }}>
                  <CommonSelectElectronicBazaar
                    label={"Group Category"}
                    hint={"Select Group Category"}
                    options={GroupCategoryTypeList}
                    handleSelect={handleChange}
                    selectedIds={GroupCategoryTypeList.filter((item: any) => item?.status).map((elm: any) => elm?.value)}
                  />
                </div>
                <div style={{ marginRight: "10px", marginTop: "5px" }}>
                  <CommonSelectElectronicBazaar
                    label={"Category"}
                    hint={"Select Category"}
                    options={CategoryTypeList}
                    handleSelect={handleChange}
                    selectedIds={CategoryTypeList.filter((item: any) => item?.status).map((elm: any) => elm.value)}
                  />
                </div>
                <div style={{ marginRight: "10px", marginTop: "5px" }}>
                  <CommonSelectElectronicBazaar
                    label={"Sub-Category"}
                    hint={"Select Sub-Category"}
                    options={SubCategoryTypeList}
                    handleSelect={handleChange}
                    selectedIds={SubCategoryTypeList.filter((item: any) => item?.status).map((elm: any) => elm?.value)}
                  />
                </div>
                <div style={{ marginRight: "10px", marginTop: "5px" }}>
                  <CommonSelectElectronicBazaar
                    label={"Weight"}
                    hint={"Select Weight"}
                    options={WeightList}
                    handleSelect={handleChange}
                    selectedIds={WeightList?.filter((item: any) => item?.status).map((elm: any) => elm?.value)}
                  />
                </div>
                <div style={{ marginRight: "10px", marginTop: "5px" }}>
                  <CommonSelectElectronicBazaar
                    label={"Price Range"}
                    hint={"Select Price Range"}
                    options={PriceList}
                    handleSelect={handleChange}
                    selectedIds={PriceList?.filter((item: any) => item?.status).map((elm: any) => elm?.value)}
                  />
                </div>
                <div style={{ marginRight: "10px", marginTop: "5px" }}>
                  <CommonSelectElectronicBazaar
                    label={"Active/Inactive"}
                    hint={"Select Active/Inactive"}
                    options={activeInactiveList}
                    handleSelect={handleChange}
                    selectedIds={activeInactiveList?.filter((item: any) => item?.status).map((elm: any) => elm?.value)}
                  />
                </div>
              </div>
              <div className="leftContent">
                <form className="max-w-sm ps-4">
                  <div className="relative">
                    <SearchField parentCallback={handleCallback} />
                  </div>
                </form>
              </div>
            </div>

            <div>
              <div className="overflow-x-auto relative pt-[10px] pb-[40px]">
                <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400" style={{ marginBottom: "50px" }}>
                  <thead className="text-[12px] text-gray-700 bg-gray-50 font-[600] ">
                    <tr className=" color-[#2E2C34;]" style={{ borderBottom: "1px solid #e1e1e1" }}>
                      <th scope="col" className="py-3 px-6">
                        Product Name
                      </th>
                      <th scope="col" className="py-3 px-6">
                        Brand
                      </th>
                      <th scope="col" className="py-3 px-6">
                        Group Category
                      </th>
                      <th scope="col" className="py-3 px-6">
                        Category
                      </th>
                      <th scope="col" className="py-3 px-6">
                        Sub-Category
                      </th>
                      <th scope="col" className="py-3 px-6">
                        Weight
                      </th>
                      <th scope="col" className="py-3 px-6">
                        Base Price
                      </th>
                      <th scope="col" className="py-3 px-6">
                        Stock
                      </th>
                      <th scope="col" className="py-3 px-6 text-center">
                        Enable/Disable
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {allProducts?.filter((elm: any) => elm?.product_name?.toLowerCase().includes(searchK) || elm?.product_name?.toUpperCase().includes(searchK) || elm?.product_brand_name?.toLowerCase().includes(searchK))?.map((item: any, index: any) => {
                      const category = AllCategory.find((it: any) => it.id === item.category)
                      const parentCategory = AllGroupCategory.find((it: any) => it.id === item.category_group)
                      const subCategory = AllSubCategory.find((it: any) => it.id === item.subcategory)
                      const UnitsPerunitweight = UnitsByid.find((it: any) => it.id === item.product_total_weight_unit)
                      return <tr className="border-b" key={index}>
                        <td
                          scope="row"
                          className="py-4 pe-6 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                        >
                          <div className="flex gap-[20px] items-center ">
                            <img
                              className="w-[50px] rounded-md product-image"
                              src={item?.product_upload_front_image || LogoContract}
                              alt={"Mwb Bazaar"}
                            />
                            <p
                              onClick={() => setAddModalOpen(true)}
                              className="mb-3 text-[14px] font-[600] text-gray-700 font-Manrope dark:text-gray-400 cursor-pointer"
                            >
                              {item?.product_name}
                            </p>
                          </div>
                        </td>
                        <td className="py-4 px-6  color-[#2E2C34;]">{item?.product_brand_name}</td>
                        <td className="py-4 px-6  color-[#2E2C34;]">
                          <div className="tag">
                            <p className="tagTitle">{parentCategory?.parent_category_name}</p>
                          </div>
                        </td>
                        <td className="py-4 px-6  color-[#2E2C34;]">
                          <div className="tag">
                            <p className="tagTitle">{category?.category_name}</p>
                          </div>
                        </td>
                        <td className="py-4 px-6  color-[#2E2C34;]">
                          <div className="tag">
                            <p className="tagTitle">{subCategory?.subcategory_name}</p>
                          </div>
                        </td>
                        <td className="py-4 px-6  color-[#2E2C34;]">{item?.product_total_weight_value} {UnitsPerunitweight?.unit_name}</td>
                        <td className="py-4 px-6  color-[#2E2C34;]">
                          ₹{item.product_total_mrp}
                        </td>
                        <td className="py-4 px-6  color-[#2E2C34;]">
                          <p className="stockStatusTitle">{item?.product_stocks}</p>
                        </td>
                        <td className="py-4 px-6  color-[#2E2C34;]" style={{ padding: "7px 15px", paddingRight: 0 }}>
                          <div className="actionMenu" style={{ alignItems: "center", justifyContent: "center" }}>
                            <div style={{ width: "27px", height: "27px" }}>
                              <img src={pieIcon} alt={"Logo"} />
                            </div>
                            <div
                              onClick={() => setAnotherModalOpen(true)}
                              className="cursor-pointer"
                              style={{ width: "50px", height: "25px" }}
                            >
                              <img src={barIcon} alt={"Logo"} />
                            </div>
                            <div>
                              <span className="switch-main">
                                <label className={"switch"}>
                                  <input type="checkbox" checked={item?.product_active === true ? true : false} onChange={(e: any) => handleProductStatus(e, index, item.id)} />
                                  <span className="slider round"></span>
                                </label>
                              </span>
                            </div>
                            <div>
                              <GridOptionButton
                                icon={"vertical-options"}
                                menus={[
                                  {
                                    label: (
                                      <>
                                        <span className="icon">
                                          <img src={fill} alt="fill" />{" "}
                                        </span>{" "}
                                        View Product
                                      </>
                                    ),
                                    onClick() {
                                      ViewProductForm(item.id)
                                    },
                                  },
                                  {
                                    label: (
                                      <>
                                        <span className="icon">
                                          <img src={calendar} alt="calendar" />{" "}
                                        </span>{" "}
                                        Edit Product
                                      </>
                                    ),
                                    onClick() {
                                      EditProduct(item.id)
                                    },
                                  },
                                ]}
                              />
                            </div>
                            <div>
                              <MdDelete style={{ fontSize: "20px", cursor: "pointer" }} onClick={() => handleDeleteProduct(item.id)} />
                            </div>
                          </div>
                        </td>
                      </tr>
                    })}
                  </tbody>
                </table>
                <div className="items-center justify-center pt-4" style={{ display: "flex" }}>
                  <Pagination
                    count={Math.ceil(totalproducts / 10)}
                    page={currentPage}
                    onChange={handlePageChange}
                  />
                </div>
              </div>
            </div>
            {isshowmore && (
              <div
                ref={viewproductRef}
              >
                <div className={isshowmore ? "viewproduct-modal active" : "viewproduct-modal"}>
                  <div className="kycmodal-main">
                    <div className="modalHead" style={{ alignItems: "center", display: "flex", justifyContent: "space-between" }}>
                      <p className="modalTitle" style={{ fontSize: "20px", fontWeight: 700 }}>{ProductDetail?.product_name}</p>
                      <img onClick={() => setisshowmore(false)} src={closeicon} alt="icon" style={{ height: "14px", width: "14px", cursor: "pointer" }} />
                    </div>

                    <div className="headTitle" style={{ textAlign: "end" }}>
                      <div>
                        <span className="switch-main">
                          <label className={"switch"}>
                            <input type="checkbox" checked={ProductDetail?.product_active === true ? true : false} />
                            <span className="slider round"></span>
                          </label>
                        </span>
                      </div>
                    </div>

                    <div className="datContainer" style={{ display: "flex", justifyContent: "space-between", fontSize: "14px", alignItems: "center", padding: "15px 0", borderBottom: "1px solid #e1e1e1" }}>
                      <p className="dataTitle">Product brand</p>
                      <div style={{ textAlign: "end" }}>
                        <p className="font-[500] text-[#2E2C34] text-[14px] font-[Manrope]" style={{ paddingBottom: "10px" }}>{ProductDetail?.product_brand_name}</p>
                      </div>
                    </div>
                    <div className="datContainer" style={{ display: "flex", justifyContent: "space-between", fontSize: "14px", alignItems: "center", padding: "15px 0", borderBottom: "1px solid #e1e1e1" }}>
                      <p className="dataTitle">Bazaar</p>
                      <div style={{ textAlign: "end" }}>
                        {/* {AllBazaarData?.map((idx: any) => {
                          if (ProductDetail?.bazaar === idx.id) {
                            return <span className="font-[500] text-[#2E2C34] text-[14px] font-[Manrope]">{idx.bazaar_name}</span>
                          }
                        })} */}
                      </div>
                    </div>
                    <div className="datContainer" style={{ display: "flex", justifyContent: "space-between", fontSize: "14px", alignItems: "center", padding: "15px 0", borderBottom: "1px solid #e1e1e1" }}>
                      <div>
                        <p className="dataTitle" style={{ paddingBottom: "15px", fontSize: "14px" }}>GST</p>
                        <p className="dataTitle" style={{ fontSize: "14px" }}>HSN code</p>
                      </div>
                      <div>
                        <p className="font-[500] text-[#2E2C34] text-[14px] font-[Manrope]" style={{ paddingBottom: "15px", textAlign: "end" }}>{ProductDetail?.product_gst_no || "-"}</p>
                        <p className="font-[500] text-[#2E2C34] text-[14px] font-[Manrope]" style={{ textAlign: "end" }}>{ProductDetail?.product_hsn_code || "-"}</p>
                      </div>
                    </div>
                    <div className="datContainer" style={{ display: "flex", justifyContent: "space-between", fontSize: "14px", alignItems: "center", padding: "15px 0", borderBottom: "1px solid #e1e1e1" }}>
                      <p className="dataTitle">Product Colour</p>
                      <div style={{ textAlign: "end" }}>
                        <p className="font-[500] text-[#2E2C34] text-[14px] font-[Manrope]">{ProductDetail?.product_colour || "-"}</p>
                      </div>
                    </div>
                    <div className="datContainer" style={{ display: "flex", justifyContent: "space-between", fontSize: "14px", alignItems: "center", padding: "15px 0", borderBottom: "1px solid #e1e1e1" }}>
                      <p className="dataTitle">Product description</p>
                      <div style={{ textAlign: "end" }}>
                        <p className="font-[500] text-[#2E2C34] text-[14px] font-[Manrope]">{ProductDetail?.product_description || "-"}</p>
                      </div>
                    </div>
                    <div className="datContainer" style={{ display: "flex", justifyContent: "space-between", fontSize: "14px", alignItems: "center", padding: "15px 0", borderBottom: "1px solid #e1e1e1" }}>
                      <p className="dataTitle">Product added date</p>
                      <div style={{ textAlign: "end" }}>
                        <p className="font-[500] text-[#2E2C34] text-[14px] font-[Manrope]">{moment(ProductDetail?.product_added_date).format("DD MMM, YYYY")}</p>
                      </div>
                    </div>
                    <div className="datContainer" style={{ display: "flex", justifyContent: "space-between", fontSize: "14px", alignItems: "center", padding: "15px 0", borderBottom: "1px solid #e1e1e1" }}>
                      <p className="dataTitle">Product Total Price</p>
                      <div style={{ textAlign: "end" }}>
                        <p className="font-[500] text-[#2E2C34] text-[14px] font-[Manrope]">₹{ProductDetail?.product_total_mrp}</p>
                      </div>
                    </div>
                    <div className="datContainer" style={{ display: "flex", justifyContent: "space-between", fontSize: "14px", alignItems: "center", padding: "15px 0", borderBottom: "1px solid #e1e1e1" }}>
                      <p className="dataTitle">Product barcode number</p>
                      <div style={{ textAlign: "end" }}>
                        <p className="font-[500] text-[#2E2C34] text-[14px] font-[Manrope]">{ProductDetail?.product_barcode_number}</p>
                      </div>
                    </div>
                    <div className="datContainer" style={{ display: "flex", justifyContent: "space-between", fontSize: "14px", alignItems: "center", padding: "15px 0", borderBottom: "1px solid #e1e1e1" }}>
                      <p className="dataTitle">Group Category</p>
                      <div style={{ textAlign: "end" }}>
                        <p className="font-[500] text-[#2E2C34] text-[14px] font-[Manrope]">
                          {AllGroupCategory?.map((idx: any) => {
                            if (ProductDetail?.category_group === idx.id) {
                              return <span className="font-[500] text-[#2E2C34] text-[14px] font-[Manrope]">{idx.parent_category_name}</span>
                            }
                          })}
                        </p>
                      </div>
                    </div>
                    <div className="datContainer" style={{ display: "flex", justifyContent: "space-between", fontSize: "14px", alignItems: "center", padding: "15px 0", borderBottom: "1px solid #e1e1e1" }}>
                      <p className="dataTitle">Category</p>
                      <div style={{ textAlign: "end" }}>
                        <p className="font-[500] text-[#2E2C34] text-[14px] font-[Manrope]">
                          {AllCategory?.map((idx: any) => {
                            if (ProductDetail?.category === idx.id) {
                              return <span className="font-[500] text-[#2E2C34] text-[14px] font-[Manrope]">{idx.category_name}</span>
                            }
                          })}
                        </p>
                      </div>
                    </div>
                    <div className="datContainer" style={{ display: "flex", justifyContent: "space-between", fontSize: "14px", alignItems: "center", padding: "15px 0", borderBottom: "1px solid #e1e1e1" }}>
                      <p className="dataTitle">Subcategory</p>
                      <div style={{ textAlign: "end" }}>
                        <p className="font-[500] text-[#2E2C34] text-[14px] font-[Manrope]">
                          {AllSubCategory?.map((idx: any) => {
                            if (ProductDetail?.subcategory === idx.id) {
                              return <span className="font-[500] text-[#2E2C34] text-[14px] font-[Manrope]">{idx.subcategory_name}</span>
                            }
                          })}
                        </p>
                      </div>
                    </div>
                    <div style={{ padding: "30px 0" }}>
                      <div style={{ display: "flex", alignItems: "center" }}>
                        <img src={Pinimage} alt="icon" style={{ marginRight: "10px" }} /><span className="font-[500] text-[#2E2C34] text-[14px] font-[Manrope]">Product Images</span>
                      </div>
                    </div>
                    <div className="attachment" style={{ flexWrap: "wrap" }}>
                      <Grid container spacing={2}>
                        <Grid item xs={6}>
                          {ProductDetail?.product_upload_front_image && <img className="brandLogo" src={ProductDetail?.product_upload_front_image} alt={"Logo"} style={{ width: "100%", height: "120px", border: "1px solid #D1D0D3", borderRadius: "10px" }} />}
                        </Grid>
                        <Grid item xs={6}>
                          {ProductDetail?.product_upload_back_image && <img className="brandLogo" src={ProductDetail?.product_upload_back_image} alt={"Logo"} style={{ width: "100%", height: "120px", border: "1px solid #D1D0D3", borderRadius: "10px" }} />}
                        </Grid>
                        <Grid item xs={6}>
                          {ProductDetail?.product_upload_mrp_label_image && <img className="brandLogo" src={ProductDetail?.product_upload_mrp_label_image} alt={"Logo"} style={{ width: "100%", height: "120px", border: "1px solid #D1D0D3", borderRadius: "10px" }} />}
                        </Grid>
                      </Grid>
                    </div>
                  </div>
                </div>
              </div>
            )}
            {/* <div>
              <Dialog
                open={addModalOpen}
                maxWidth={"lg"}
                sx={{
                  ".MuiPaper-root": {
                    borderRadius: "6px",
                  },
                }}
                onClose={() => setAddModalOpen(false)}
              >
                <div className={classes.addDialog}>
                  <div className="pb-[10px] flex justify-end modalHead">
                    <div onClick={() => setAddModalOpen(false)}>
                      <svg
                        width="36"
                        height="36"
                        viewBox="0 0 36 36"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <circle cx="18" cy="18" r="18" fill="#E1E1E1" />
                        <line
                          x1="24.7305"
                          y1="12.423"
                          x2="12.4268"
                          y2="24.7266"
                          stroke="#84818A"
                          stroke-width="1.5"
                          stroke-linecap="round"
                        />
                        <line
                          x1="24.3104"
                          y1="24.7266"
                          x2="12.0068"
                          y2="12.4229"
                          stroke="#84818A"
                          stroke-width="1.5"
                          stroke-linecap="round"
                        />
                      </svg>
                    </div>
                  </div>

                  <div className="flex gap-5 pt-[20px]">
                    <div>
                      <img src={ProductImage} alt={"Product"} />
                    </div>
                    <div>
                      <img src={ProductImage} alt={"Product"} />
                    </div>
                    <div>
                      <img src={ProductImage} alt={"Product"} />
                    </div>
                  </div>

                  <div className="flex justify-between pt-[20px] pb-[20px]">
                    <div>
                      <p className="modalTitle">
                        Amazon Echo Plus (3nd Gen) - Premium…
                      </p>
                      <p className="modalSubtitile">Brand- Amazon</p>
                      <p className="modalPrize">Our Base Price: Rs. 5,000</p>

                      <div className="flex gap-5">
                        <p className="groupTitle">Group</p>
                        <div className="statusTag">
                          <p className="tagTitle">Computers</p>
                        </div>

                        <p className="groupTitle">Category</p>
                        <div className="statusTag">
                          <p className="tagTitle">Laptop</p>
                        </div>

                        <p className="groupTitle">Sub Category</p>
                        <div className="statusTag">
                          <p className="tagTitle">Gaming Laptops</p>
                        </div>
                      </div>
                    </div>

                    <div className="barCode">
                      <img src={barCodeImage} alt={"Go Back"} />
                    </div>
                  </div>

                  <div className="py-[20px]">
                    <p className="commonTitle">Price Details</p>
                    <div className="flex gap-5">
                      <div>
                        <p className="commonSybtitle py-[10px]">Total Weight</p>
                        <p>20 Kg</p>
                      </div>
                      <div>
                        <p className="commonSybtitle py-[10px]">Total Weight</p>
                        <p>20 Kg</p>
                      </div>
                      <div>
                        <p className="commonSybtitle py-[10px]">Total Weight</p>
                        <p>20 Kg</p>
                      </div>
                    </div>
                  </div>

                  <div className="py-[20px]">
                    <p className="commonTitle">Unit Price Detail</p>
                    <div className="flex gap-5">
                      <div>
                        <p className="commonSybtitle py-[10px]">Total Weight</p>
                        <p>20 Kg</p>
                      </div>
                      <div>
                        <p className="commonSybtitle py-[10px]">Total Weight</p>
                        <p>20 Kg</p>
                      </div>
                    </div>
                  </div>

                  <div className="py-[20px]">
                    <p className="commonTitle">Tax Details</p>
                    <div className="flex gap-5">
                      <div>
                        <p className="commonSybtitle py-[10px]">Total Weight</p>
                        <p>20 Kg</p>
                      </div>
                      <div>
                        <p className="commonSybtitle py-[10px]">Total Weight</p>
                        <p>20 Kg</p>
                      </div>
                    </div>
                  </div>
                </div>
              </Dialog>
            </div> */}
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
              <Formik
                initialValues={initialValues}
                onSubmit={handleFormSubmit}
                validationSchema={SignupSchema}
                enableReinitialize={true}
              >
                {({
                  values,
                  handleChange,
                  setFieldValue
                }) => (
                  <Form>
                    <div className={classesM.editproductDialog}>
                      <div style={{ width: "100%" }}>
                        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                          <p style={{ color: "#2E2C34", fontSize: "18px", fontWeight: 600 }}>Edit Product</p>
                          <img src={closeicon} onClick={() => setAddModalOpen(false)} />
                        </div>
                        <div className="border-2 p-5 mt-3 rounded-md">
                          <Grid container spacing={2}>
                            <Grid item xs={6}>
                              <div className="uploadCard">
                                <div
                                  className="uploadIcon px-3"
                                  style={{ position: "relative" }}
                                >
                                  {!values.product_upload_front_image ? (
                                    <img src={UploaderFrame} alt={"Uploader"} onChange={handleChange} />
                                  ) : (
                                    <img src={values.product_upload_front_image} onChange={handleChange} style={{ width: "70px", height: "70px", borderRadius: "50%" }} />
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
                                    onChange={(e: any) => imageChange3(e)}
                                    name="image"
                                  />
                                </div>
                                <div className="content">
                                  <div className={"title"} style={{ color: "#4E2FA9", fontSize: "13px", marginBottom: "5px" }}>Upload front Image</div>
                                  <div className={"subtitle"} style={{ color: "#84818A", fontSize: "10px" }}>
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
                                  {!values.product_upload_back_image ? (
                                    <img src={UploaderFrame} alt={"Uploader"} onChange={handleChange} />
                                  ) : (
                                    <img src={values.product_upload_back_image} onChange={handleChange} style={{ width: "70px", height: "70px", borderRadius: "50%" }} />
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
                                    onChange={(e: any) => imageChange(e)}
                                    name="image"
                                  />
                                </div>
                                <div className="content">
                                  <div className={"title"} style={{ color: "#4E2FA9", fontSize: "13px", marginBottom: "5px" }}>Upload Back Image</div>
                                  <div className={"subtitle"} style={{ color: "#84818A", fontSize: "10px" }}>
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
                                  {!values.product_upload_mrp_label_image ? (
                                    <img src={UploaderFrame} alt={"Uploader"} onChange={handleChange} />
                                  ) : (
                                    <img src={values.product_upload_mrp_label_image} onChange={handleChange} style={{ width: "70px", height: "70px", borderRadius: "50%" }} />
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
                                    onChange={(e: any) => imageChange2(e)}
                                    name="image"
                                  />
                                </div>
                                <div className="content">
                                  <div className={"title"} style={{ color: "#4E2FA9", fontSize: "13px", marginBottom: "5px" }}>Upload MRP label Image</div>
                                  <div className={"subtitle"} style={{ color: "#84818A", fontSize: "10px" }}>
                                    Image can be size of 512 PX by 512 PX Only
                                  </div>
                                </div>
                              </div>
                            </Grid>
                          </Grid>
                          {/* </div> */}
                          <div className="field">
                            <div className="bazaarField" style={{ paddingTop: "15px" }}>
                              <Grid container spacing={2}>
                                <Grid item xs={6}>
                                  <p className="commonSelectText" style={{ fontSize: "12px", color: "#84818A" }}>Product Name</p>
                                  <TextField
                                    value={values.product_name}
                                    onChange={handleChange}
                                    name="product_name"
                                    style={{ fontSize: "14px" }}
                                    variant="standard"
                                    fullWidth={true}
                                  />
                                  <Box sx={{ color: "red" }}>
                                    <ErrorMessage name="product_name" />
                                  </Box>
                                </Grid>

                                <Grid item xs={6}>
                                  <p className="commonSelectText" style={{ fontSize: "12px", color: "#84818A" }}>Brand Name</p>
                                  <TextField
                                    value={values.product_brand_name}
                                    onChange={handleChange}
                                    name="product_brand_name"
                                    style={{ fontSize: "14px" }}
                                    variant="standard"
                                    fullWidth={true}
                                  />
                                  <Box sx={{ color: "red" }}>
                                    <ErrorMessage name="product_brand_name" />
                                  </Box>
                                </Grid>
                              </Grid>
                            </div>
                            <div className="bazaarField" style={{ paddingTop: "15px" }}>
                              <Grid container spacing={2}>
                                <Grid item xs={6}>
                                  <p className="commonSelectText" style={{ fontSize: "12px", color: "#84818A" }}>Product Colour</p>
                                  <Select
                                    label="Age"
                                    variant={"standard"}
                                    fullWidth={true}
                                    onChange={handleChange}
                                    name="product_colour"
                                  >
                                    {AllColors?.map((item: any, index: number) => {
                                      return <MenuItem value={item?.id} key={index}>
                                        {item?.colour}
                                      </MenuItem>
                                    })}
                                  </Select>
                                </Grid>

                                <Grid item xs={6}>
                                  <p className="commonSelectText" style={{ fontSize: "12px", color: "#84818A" }}>Product Size</p>
                                  <Select
                                    label="Age"
                                    variant={"standard"}
                                    fullWidth={true}
                                    onChange={handleChange}
                                    name="product_size"
                                  >
                                    {AllSize?.map((item: any, index: number) => {
                                      return <MenuItem value={item?.id} key={index}>
                                        {item?.size}
                                      </MenuItem>
                                    })}
                                  </Select>
                                </Grid>
                              </Grid>
                            </div>
                            <div className="stateField">
                              <Grid container spacing={2}>
                                <Grid item lg={4} md={4} sm={4} style={{ paddingTop: "15px" }}>
                                  <div style={{ paddingTop: "15px" }}>
                                    <p className="commonSelectText" style={{ fontSize: "12px", color: "#84818A" }}>Total Weight</p>
                                    <div className="flex gap-4">
                                      <div>
                                        <TextField
                                          value={values.product_total_weight_value}
                                          onChange={handleChange}
                                          name="product_total_weight_value"
                                          style={{ fontSize: "14px" }}
                                          variant="standard"
                                          fullWidth={true}
                                        />
                                        <Box sx={{ color: "red" }}>
                                          <ErrorMessage name="product_total_weight_value" />
                                        </Box>
                                      </div>
                                      <div>
                                        <Select
                                          label="Age"
                                          variant={"standard"}
                                          fullWidth={true}
                                          name="product_total_weight_unit"
                                          value={values?.product_total_weight_unit}
                                          onChange={(e: any) => setFieldValue("product_total_weight_unit", String(e.target.value))}
                                        >
                                          {unitList.map((item: any, index: any) => {
                                            return (
                                              <MenuItem key={index} value={item.id}>
                                                {item.unit_name}
                                              </MenuItem>
                                            );
                                          })}
                                        </Select>
                                      </div>
                                    </div>
                                  </div>
                                </Grid>
                                <Grid item lg={4} md={4} sm={4}>
                                  <div style={{ paddingTop: "15px" }}>
                                    <p className="commonSelectText" style={{ fontSize: "12px", color: "#84818A" }}>No. of Units</p>
                                    <div className="flex gap-4">
                                      <div>
                                        <TextField
                                          value={values.product_unit}
                                          onChange={handleChange}
                                          name="product_unit"
                                          style={{ fontSize: "14px" }}
                                          variant="standard"
                                          fullWidth={true}
                                        />
                                        <Box sx={{ color: "red" }}>
                                          <ErrorMessage name="product_unit" />
                                        </Box>
                                      </div>
                                      <div>
                                        <Select
                                          label="Age"
                                          variant={"standard"}
                                          fullWidth={true}
                                          name="product_per_unit_weight_unit"
                                          value={values?.product_per_unit_weight_unit}
                                          onChange={(e: any) => setFieldValue("product_per_unit_weight_unit", String(e.target.value))}
                                        >
                                          {unitList.map((item: any, index: any) => {
                                            return (
                                              <MenuItem key={index} value={item.id}>
                                                {item.unit_name}
                                              </MenuItem>
                                            );
                                          })}
                                        </Select>
                                      </div>
                                    </div>
                                  </div>
                                </Grid>
                                <Grid item lg={4} md={4} sm={4} style={{ paddingTop: "15px" }}>
                                  <div style={{ paddingTop: "15px" }}>
                                    <p className="commonSelectText" style={{ fontSize: "12px", color: "#84818A" }}>Total MRP</p>
                                    <TextField
                                      value={values?.product_total_mrp}
                                      onChange={(e: any) => setFieldValue("product_total_mrp", String(e.target.value))}
                                      name="product_total_mrp"
                                      style={{ fontSize: "14px" }}
                                      variant="standard"
                                      fullWidth={true}
                                    />
                                    <Box sx={{ color: "red" }}>
                                      <ErrorMessage name="product_total_mrp" />
                                    </Box>
                                  </div>
                                </Grid>
                                <Grid item lg={4} md={4} sm={4} style={{ paddingTop: "15px" }}>
                                  <div>
                                    <p className="commonSelectText" style={{ fontSize: "12px", color: "#84818A" }}>Per Unit Weight</p>
                                    <div className="flex gap-4">
                                      <div>
                                        <TextField
                                          value={values.product_per_unit_weight_value}
                                          onChange={handleChange}
                                          name="product_per_unit_weight_value"
                                          style={{ fontSize: "14px" }}
                                          variant="standard"
                                          fullWidth={true}
                                        />
                                        <Box sx={{ color: "red" }}>
                                          <ErrorMessage name="product_per_unit_weight_value" />
                                        </Box>
                                      </div>
                                      <div>
                                        <Select
                                          label="Age"
                                          variant={"standard"}
                                          fullWidth={true}
                                          name="product_per_unit_weight_unit"
                                          value={values?.product_per_unit_weight_unit}
                                          onChange={(e: any) => setFieldValue("product_per_unit_weight_unit", String(e.target.value))}
                                        >
                                          {unitList.map((item: any, index: any) => {
                                            return (
                                              <MenuItem key={index} value={item.id}>
                                                {item.unit_name}
                                              </MenuItem>
                                            );
                                          })}
                                        </Select>
                                      </div>
                                    </div>
                                  </div>
                                </Grid>
                                <Grid item lg={4} md={4} sm={4} style={{ paddingTop: "15px" }}>
                                  <div>
                                    <p className="commonSelectText" style={{ fontSize: "12px", color: "#84818A" }}>MRP</p>
                                    <TextField
                                      value={values.product_mrp}
                                      onChange={handleChange}
                                      name="product_mrp"
                                      style={{ fontSize: "14px" }}
                                      variant="standard"
                                      fullWidth={true}
                                    />
                                    <Box sx={{ color: "red" }}>
                                      <ErrorMessage name="product_mrp" />
                                    </Box>
                                  </div>
                                </Grid>
                              </Grid>
                            </div>
                            <div className="cityField" style={{ paddingTop: "15px" }}>
                              <Grid container spacing={2}>
                                <Grid item xs={6}>
                                  <p className="commonSelectText" style={{ fontSize: "12px", color: "#84818A" }}>GST</p>
                                  <TextField
                                    value={values.product_gst_no}
                                    onChange={handleChange}
                                    name="product_gst_no"
                                    style={{ fontSize: "14px" }}
                                    variant="standard"
                                    fullWidth={true}
                                  />
                                  <Box sx={{ color: "red" }}>
                                    <ErrorMessage name="product_gst_no" />
                                  </Box>
                                </Grid>
                                <Grid item xs={6}>
                                  <p className="commonSelectText" style={{ fontSize: "12px", color: "#84818A" }}>HSN Code</p>
                                  <TextField
                                    value={values.product_hsn_code}
                                    onChange={handleChange}
                                    name="product_hsn_code"
                                    style={{ fontSize: "14px" }}
                                    variant="standard"
                                    fullWidth={true}
                                  />
                                  <Box sx={{ color: "red" }}>
                                    <ErrorMessage name="product_hsn_code" />
                                  </Box>
                                </Grid>
                              </Grid>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="flex gap-5 pb-[40px]" style={{ paddingLeft: "50px" }}>
                      <ActionButton title="Cancel" variant="default" />
                      <ActionButton type="submit" title="Submit" variant="primary" />
                    </div>
                  </Form>
                )}
              </Formik>
            </Dialog>
            <div>
              <Dialog
                open={anotherModalOpen}
                maxWidth={"lg"}
                sx={{
                  ".MuiPaper-root": {
                    borderRadius: "6px",
                  },
                }}
                onClose={() => setAnotherModalOpen(false)}
              >
                <div className={classes.addDialog}>
                  <div className="flex justify-between modalHead w-[500px] py-[10px]">
                    <p className="reportTitle">Sales Report</p>
                    <div onClick={() => setAnotherModalOpen(false)}>
                      <svg
                        width="36"
                        height="36"
                        viewBox="0 0 36 36"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <circle cx="18" cy="18" r="18" fill="#E1E1E1" />
                        <line
                          x1="24.7305"
                          y1="12.4228"
                          x2="12.4268"
                          y2="24.7265"
                          stroke="#84818A"
                          stroke-width="1.5"
                          stroke-linecap="round"
                        />
                        <line
                          x1="24.3104"
                          y1="24.7266"
                          x2="12.0068"
                          y2="12.4229"
                          stroke="#84818A"
                          stroke-width="1.5"
                          stroke-linecap="round"
                        />
                      </svg>
                    </div>
                  </div>

                  <div className="flex gap-10 py-[20px] items-center">
                    <div>
                      <div className="text-center p-[50px]">
                        <p className="font-bold">2400</p>
                        <p>Order</p>
                      </div>
                      <img src={ChartIcon} alt={"chart"} />
                    </div>
                    <div className="flex gap-[80px] justify-between">
                      <div>
                        <li className="text-red-500">
                          <span className="text-black">Complete</span>
                        </li>
                        <li className="text-red-500">
                          <span className="text-black">In Progress</span>
                        </li>
                        <li className="text-red-500">
                          <span className="text-black">Cancel</span>
                        </li>
                      </div>
                      <div>
                        <p>1200</p>
                        <p>800</p>
                        <p>200</p>
                      </div>
                    </div>
                  </div>
                </div>
              </Dialog>
            </div>
          </div>
        </div>
      </DashboardLayout>
    </>
  );
};

export default Products;
