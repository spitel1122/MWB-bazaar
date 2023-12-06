import React, { useEffect, useState } from "react";
import { useAgentDetailsStyle } from "@/static/stylesheets/screens";
import { GridOptionButton } from "@/components/atoms/Button";
import fill from "@/static/icons/fill.svg";
import calendar from "@/static/icons/calendar.svg";
import { AppService } from "@/service/AllApiData.service";
import moment from "moment";
import { useNavigate, useParams } from "react-router-dom";
import { Alert, AlertError } from "@/alert/Alert";
import CommonSelectElectronicBazaar from "@/components/atoms/CommonSelectElectronicBazaar/CommonSelectElectronicBazaar";
import closeicon from "@/static/images/Vector (10).png"
import { Dialog, Grid, MenuItem, Select, TextField, Box } from "@mui/material";
import { ErrorMessage, Form, Formik } from "formik";
import UploaderFrame from "@/static/icons/uploader-frame.png";
import Pinimage from "@/static/images/Vector (9).png";
import { ActionButton } from "@/components/atoms/Button/ActionButton";
import * as Yup from "yup";
import { readFileAsBase64 } from "@/helper/base64";
import { useProductListStyles } from "@/static/stylesheets/molecules";
import LogoContract from "@/static/icons/uploader-frame.png";
import { BASE_URL_IMAGE } from "@/helper/constants";
interface WholesalerProductsType {
    data?: any;
    id?: any;
    handleModalBackdrop?: any;
}
const WholesalerProducts: React.FC<WholesalerProductsType> = ({ handleModalBackdrop }) => {
    const classes = useAgentDetailsStyle();
    const classesM = useProductListStyles();
    const navigate = useNavigate()
    const [AllWholesaler, setAllWholesaler] = useState<any>();
    const [filterAllProductsM, setfilterAllProductsM] = useState<any>([]);
    const [filterAllProducts, setfilterAllProducts] = useState<any>([]);
    const [AllGroupCategory, setAllGroupCategory] = useState<any>([]);
    const [AllCategory, setAllCategory] = useState<any>([]);
    const [AllSubCategory, setAllSubCategory] = useState<any>([]);
    const [ProductDetail, setProductDetail] = useState<any>({});
    const [isshowmore, setisshowmore] = useState(false);
    const [AllGroupCategoryType, setAllGroupCategoryType] = useState<any>([]);
    const [GroupCategoryTypeList, setGroupCategoryTypeList] = useState<any>([]);
    const [AllCategoryType, setAllCategoryType] = useState<any>([]);
    const [CategoryTypeList, setCategoryTypeList] = useState<any>([]);
    const [AllSubCategoryType, setAllSubCategoryType] = useState<any>([]);
    const [SubCategoryTypeList, setSubCategoryTypeList] = useState<any>([]);
    const [data, setData] = useState<any>({});
    const [addModalOpen, setAddModalOpen] = useState(false);
    const [AllActiveInactive, setAllActiveInactive] = useState<any>([]);
    const [activeInactiveList, setactiveInactiveList] = useState<any>([]);
    const [Allstatus, setAllstatus] = useState<any>([]);
    const [statusList, setstatusList] = useState<any>([]);
    const [AllProducts, setAllProducts] = useState<any>([]);
    const [UnitsByid, setUnitsByid] = useState<any>([]);
    const [addData, setAddData] = useState<any>({});
    const { id } = useParams()
    const [unitList, setUnitList] = useState([]);
    const [Allproductdetails, setAllproductdetails] = useState<any>({});
    console.log('Allproductdetails', Allproductdetails)

    useEffect(() => {
        getAllListss();
        getUnitList();
    }, []);

    const getAllListss = async () => {
        const res = await AppService.getWholesellerProducts(id)
        setAllProducts(res?.data?.result)
        setfilterAllProducts(res?.data?.result)
        setfilterAllProductsM(res?.data?.result)
        res?.data?.result?.forEach((item: any) => {
            Promise.all([fetchCategoryDetail(item.category_id), fetchParentCategoryDetails(item.category_group_id), fetchSubCategoryDetails(item.subcategory_id), fetchUnitsDetails(item?.product_total_weight_unit_id)])
        })
    }

    const getUnitList = async () => {
        const responseJson = await AppService.getUnits();
        setUnitList(responseJson.data.results);
    };

    // const getProductDetail = async (id: number) => {
    //     try {
    //         const res = await AppService.detailProduct(id)
    //         console.log('res', res)
    //         setAllproductdetails((prev: any) => prev.find((item: any) => item.id === res.data.id) ? prev : prev.concat(res.data))
    //     } catch (err) {
    //         console.log("Error: ", err)
    //     }
    // }

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

    const handleDeleteFirm = async (id: any) => {
        if (window.confirm('Do You want to delete Product')) {
            const responseJson = await AppService.deleteProduct(id);
            if (responseJson.status == 204) {
                Alert('Product Delete Successfully');
                getAllListss();
            }
        }
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
        let productData = AllProducts[index];
        console.log('productData.product_upload_mrp_label_image', productData.product_upload_mrp_label_image)
        if (window.confirm(textmsg)) {
            let productData = AllProducts[index];
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
            productData.product_updated_by = productData.product_updated_by_id
            productData.product_active = e.target.checked === true ? false : true;
            const responseJson = await AppService.updateProduct(productData.id, productData);
            if (responseJson.status === 200) {
                if (e.target.checked) {
                    Alert('product Inactive Successfully');
                }
                else {
                    Alert('product Active Successfully');
                }
            }
            getAllListss();
        }
    }

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
        product_updated_by: data?.product_updated_by || ""
    };

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
        getAllListss()
    };

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
    }, [])

    useEffect(() => {
        setTimeout(() => {
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
        }, 1000);
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
        const responseJson = await AppService.getWholesellerProducts(id);
        const arr = responseJson.data.result?.map((item: any) => {
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
    const getAllStatus = async () => {
        const responseJson = await AppService.getWholesellerProducts(id);
        const arr = responseJson.data.result?.map((item: any) => item.product_brand_name);
        var uniqueArray = Array.from(new Set(arr));
        setAllstatus(uniqueArray);
    }
    const getAllStatusData = async () => {
        if (Allstatus.length > 0) {
            let tempState = Allstatus.map((row: any) => {
                return {
                    label: row,
                    value: row,
                }
            })
            setstatusList(tempState);
        }
    };

    const handleChange = (selectboxName: string, id: any) => {
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
        if (selectboxName === 'Active/Inactive') {
            setactiveInactiveList((prev: any) => {
                return prev.map((item: any) => item.value === id ? { ...item, status: !item.status } : item)
            });
        }
    }

    useEffect(() => {
        let temp1 = filterAllProductsM;
        // Group Category
        if (temp1?.length && GroupCategoryTypeList?.length) {
            const selectedGroupcategoryType = GroupCategoryTypeList?.filter((item: any) => item.status === true).map((item: any) => item?.value);
            if (selectedGroupcategoryType?.length > 0) {
                temp1 = temp1?.filter((item: any) => selectedGroupcategoryType?.includes(item?.category_group_id));
            }
        }
        // Category
        if (temp1?.length && CategoryTypeList?.length) {
            const selectedcategoryType = CategoryTypeList?.filter((item: any) => item.status === true).map((item: any) => item?.value);
            if (selectedcategoryType?.length > 0) {
                temp1 = temp1?.filter((item: any) => selectedcategoryType?.includes(item?.category_id));
            }
        }
        // Subcategory
        if (temp1?.length && SubCategoryTypeList?.length) {
            const selectedsubcategoryType = SubCategoryTypeList?.filter((item: any) => item.status === true).map((item: any) => item?.value);
            if (selectedsubcategoryType?.length > 0) {
                temp1 = temp1?.filter((item: any) => selectedsubcategoryType?.includes(item?.subcategory_id));
            }
        }
        // Brand
        if (temp1?.length && statusList?.length) {
            const selectedStatus = statusList?.filter((item: any) => item.status === true).map((item: any) => item.value);
            if (selectedStatus?.length > 0) {
                temp1 = temp1?.filter((item: any) => selectedStatus?.includes(item?.product_brand_name));
            }
        }
        // active / inactive
        if (temp1?.length && AllActiveInactive?.length) {
            const selectedActiveInactive = activeInactiveList?.filter((item: any) => item.status === true).map((item: any) => item.value);
            if (selectedActiveInactive?.length > 0) {
                temp1 = temp1?.filter((item: any) => selectedActiveInactive?.includes(item?.product_active));
            }
        }
        setAllProducts(temp1)
    }, [filterAllProductsM, activeInactiveList, statusList, GroupCategoryTypeList, CategoryTypeList, SubCategoryTypeList])

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

    const ViewProductForm = async (id: any) => {
        const res = await AppService.detailProduct(id)
        setProductDetail(res.data)
        setisshowmore(true)
    }

    const EditProduct = async (id: any) => {
        const res = await AppService.detailProduct(id)
        setData(res.data)
        setAddModalOpen(true)
    }
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

    useEffect(() => {
        if (isshowmore) {
            handleModalBackdrop(true);
        } else if (!isshowmore) {
            handleModalBackdrop(false);
        }
    }, [isshowmore]);
    // const viewkycRef = useDetectClickOutside({ onTriggered: closeViewKycModal });
    const viewproductRef = React.useRef(null);
    useClickOutside(viewproductRef, () => setisshowmore(false));

    return (
        <>
            <div className={classes.root}>
                <div>
                    <div className="flex gap-5 pt-[30px] " style={{ flexWrap: "wrap" }}>
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
                                label={"Brand"}
                                hint={"Select Brand"}
                                options={statusList}
                                handleSelect={handleChange}
                                selectedIds={statusList.filter((item: any) => item?.status).map((elm: any) => elm?.value)}
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

                    <div>
                        <div className="relative pt-[40px]" style={{ overflowX: "auto" }}>
                            <table className="w-full text-left " style={{ marginBottom: "150px" }}>
                                <thead className="" style={{ borderBottom: "1px solid #e1e1e1" }}>
                                    <tr className="color-[#2E2C34;]">
                                        <th scope="col" className="tableTitle py-3 px-6" style={{ paddingLeft: 0 }}>
                                            Product Name
                                        </th>
                                        <th scope="col" className="tableTitle py-3 px-6">
                                            Brand
                                        </th>
                                        <th scope="col" className="tableTitle py-3 px-6">
                                            Group Category
                                        </th>
                                        <th scope="col" className="tableTitle py-3 px-6">
                                            Category
                                        </th>
                                        <th scope="col" className="tableTitle py-3 px-6">
                                            Sub-Category
                                        </th>
                                        <th scope="col" className="tableTitle py-3 px-6">
                                            Weight
                                        </th>
                                        <th scope="col" className="tableTitle py-3 px-6">
                                            MRP
                                        </th>
                                        <th></th>
                                        <th></th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {AllProducts?.length > 0 ? AllProducts?.map((elm: any, index: any) => {
                                        const category = AllCategory.find((it: any) => it.id === elm.category_id)
                                        const parentCategory = AllGroupCategory.find((it: any) => it.id === elm.category_group_id)
                                        const subCategory = AllSubCategory.find((it: any) => it.id === elm.subcategory_id)
                                        const UnitsPerunitweight = UnitsByid.find((it: any) => it.id === elm.product_total_weight_unit_id)
                                        return <tr className="border-b" key={elm.id}>
                                            <td scope="row" className="py-4 px-6 tableData" style={{ paddingLeft: 0 }}>
                                                <div className="flex gap-[20px] items-center ">
                                                    <img
                                                        className="w-[50px] rounded-md product-image"
                                                        src={elm?.product_upload_front_image ? `${BASE_URL_IMAGE}${elm?.product_upload_front_image}` : LogoContract}
                                                        alt={"Mwb Bazaar"}
                                                        style={{ width: "40px", height: "45px", border: "1px solid #e1e1e1", borderRadius: "4px" }}
                                                    />
                                                    <p
                                                        onClick={() => ViewProductForm(elm.id)}
                                                        className="mb-3 text-[14px] font-[600] text-gray-700 font-Manrope dark:text-gray-400 cursor-pointer mb-0"
                                                    >
                                                        {elm?.product_name}
                                                    </p>
                                                </div>
                                            </td>
                                            <td className="py-4 px-6 tableData">
                                                <div className="flex gap-2">
                                                    {elm?.product_brand_name}
                                                </div>
                                            </td>
                                            <td className="py-4 px-6 tableData person-details">
                                                <div className="tag">
                                                    <p className="tagTitle color-[#2E2C34;]">{parentCategory?.parent_category_name}</p>
                                                </div>
                                            </td>
                                            <td className="py-4 px-6 tableData">
                                                <div className="tag">
                                                    <p className="tagTitle color-[#2E2C34;]">{category?.category_name}</p>
                                                </div>
                                            </td>
                                            <td className="py-4 px-6 tableData">
                                                <div className="tag">
                                                    <p className="tagTitle color-[#2E2C34;]">{subCategory?.subcategory_name}</p>
                                                </div>
                                            </td>
                                            <td className="py-4 px-6 tableData">
                                                {elm?.product_total_weight_value} {UnitsPerunitweight?.unit_name}
                                            </td>
                                            <td className="py-4 px-6 tableData cursor-pointer">
                                                ₹{elm?.product_total_mrp}
                                            </td>
                                            <td>
                                                <div>
                                                    <span className="switch-main">
                                                        <label className={"switch"}>
                                                            <input type="checkbox" checked={elm?.product_active === true ? true : false} onChange={(e: any) => handleProductStatus(e, index, elm.id)} />
                                                            <span className="slider round"></span>
                                                        </label>
                                                    </span>
                                                </div>
                                            </td>
                                            <td className="py-4 px-6 tableData cursor-pointer" style={{ paddingRight: 0 }}>
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
                                                                ViewProductForm(elm?.id)
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
                                                                EditProduct(elm?.id)
                                                            },
                                                        },
                                                        {
                                                            label: (
                                                                <>
                                                                    <span className="icon">
                                                                        <img src={calendar} alt="fill" />{" "}
                                                                    </span>{" "}
                                                                    Delete Product
                                                                </>
                                                            ),
                                                            onClick() {
                                                                handleDeleteFirm(elm?.id)
                                                            },
                                                        },
                                                    ]}
                                                />
                                            </td>
                                        </tr>
                                    }) : <p className="font-[500] text-[#2E2C34] text-[14px] font-[Manrope]" style={{ paddingTop: "10px" }}>No Products yet</p>}

                                </tbody>
                            </table>
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
                    </div>
                </div>
            </div >
        </>
    );
};

export default WholesalerProducts;
