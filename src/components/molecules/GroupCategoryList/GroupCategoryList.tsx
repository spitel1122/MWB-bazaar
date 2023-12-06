import React, { useEffect, useState } from "react";
import { GridOptionButton } from "@/components/atoms/Button";
import { useProductListStyles } from "@/static/stylesheets/molecules";
import LogoContract from "@/static/icons/uploader-frame.png";
import { AppService } from "@/service/AllApiData.service";
import { Grid, Pagination } from "@mui/material";
import { AddButton } from "@/components/atoms/Button";
import { SearchField } from "@/components/atoms/SearchField";
import CommonSelectElectronicBazaar from "@/components/atoms/CommonSelectElectronicBazaar/CommonSelectElectronicBazaar";
import { useNavigate, useParams } from "react-router-dom";
import { Alert, AlertError } from "@/alert/Alert";
import complete from "@/static/icons/complete.svg";
import fill from "@/static/icons/fill.svg";
import calendar from "@/static/icons/calendar.svg";
import deleteagent from "@/static/icons/delete-agent.svg";
import closeicon from "@/static/images/Vector (10).png"
import { readFileAsBase64 } from "@/helper/base64";
import UploaderFrame from "@/static/icons/uploader-frame.png";
import { ActionButton } from "@/components/atoms/Button/ActionButton";
import { ErrorMessage, Form, Formik } from "formik";
import * as Yup from "yup";
import { FaMapMarkerAlt } from "react-icons/fa";
import { HiPhone } from "react-icons/hi";
import Pinimage from "@/static/images/Vector (9).png";
import moment from "moment";

const GroupCategoryList = (props: any) => {
  const classes = useProductListStyles();
  const { id } = useParams()
  const navigate = useNavigate()
  const [searchK, setSearchK] = useState("");
  const [AllfilterAllGroupCategory, setAllfilterAllGroupcategory] = useState<any>([])
  const [AllGroupCategory, setAllGroupCategory] = useState<any>([]);
  const [AllCategory, setAllCategory] = useState<any>([]);
  const [AllSubCategory, setAllSubCategory] = useState<any>([]);
  const IdParams = Number(id)
  const [totalCount, SetTotalCount] = useState<number>(1);
  const [currentPage, setCurrentPage] = useState(1);

  const handlePageChange = (event: any, value: any) => {
    setCurrentPage(value);
    getAllListsM(value);
  };

  const getAllListsM = async (page: any) => {
    try {
      const params = {
        bazaar: IdParams,
        page: page ? page : 1
      }
      const responseJson = await AppService.listSubCateByCat(params)
      setAllfilterAllGroupcategory(responseJson.data.results)
      SetTotalCount(responseJson.data.count)
      responseJson.data.results.forEach((item: any) => {
        Promise.all([fetchCategoryDetail(item.category), fetchParentCategoryDetails(item.category_group)])
      })
    } catch (err) {
      console.log("Error: ", err)
    }
  }

  const listSubcategorydata = async() =>{
    try {
      const res = await AppService.listSubcategory()
      setAllSubCategory(res.data.results)
    } catch (err) {
      console.log("Error: ", err)
    }
  }

  useEffect(() => {
    listSubcategorydata()
    getAllListsM(1);
  }, []);

  const handleCallback = (e: any) => {
    setSearchK(e);
  }

  const fetchParentCategoryDetails = async (id: number) => {
    try {
      const res = await AppService.listGroupCategoryById(id)
      setAllGroupCategory((prev: any) => prev.find((item: any) => item.id === res.data.id) ? prev : prev.concat(res.data))
    } catch (err) {
      console.log("Error: ", err)
    }
  }

  const fetchCategoryDetail = async (id: number) => {
    try {
      const response = await AppService.listMaincategory()
      setAllCategory(response.data.results)
    } catch (err) {
      console.log("Error: ", err)
    }
  }


  console.log(props?.handleModalBackdrop,"props?.handleModalBackdrop")
  return (
    <div className={classes.root}>
      <Grid container spacing={2}>
        <Grid item xs={6}>
        </Grid>
        <Grid item xs={6}>
          <div className="leftContent">
            <form className="max-w-sm px-4">
              <div className="relative">
                <SearchField parentCallback={handleCallback} />
              </div>
            </form>
            <div>
              <AddButton label="Add Bazaar" onClick={() => navigate('/newbazaars')} />
            </div>
          </div>
        </Grid>
      </Grid>
      <div style={{ overflowX: "auto", marginTop: "30px" }}>
        <table style={{ marginBottom: "50px", width: "100%" }}>
          <tr>
            <th style={{ padding: "7px 15px", paddingLeft: 0 }}>Group Category</th>
            <th style={{ padding: "7px 15px", textAlign: "center" }}>Category</th>
            <th style={{ padding: "7px 15px", textAlign: "end" }}>Sub-Category</th>
          </tr>
          {props?.handleModalBackdrop?.map((elm: any,index:any) => {
            return (
              <tr key={index}>
                <td style={{ paddingRight: "15px", minWidth: "135px" }}>
                  <div className="bg-[#e5f7ff] flex justify-center rounded-md p-[5px] w-[200px]">
                    <p className="text-[#15abff]" style={{ fontSize: "12px"}}>
                      {elm?.parent_category_name}
                    </p>
                  </div>
                </td>
                <td style={{ padding: "7px 15px", textAlign: "center" }}>
                  <div className="bg-[#e5f7ff] flex justify-center rounded-md p-[5px] w-[200px]" style={{ margin: "0 auto" }}>
                    <p className="text-[#15abff]" style={{ fontSize: "12px" }}>
                      {AllCategory?.length && AllCategory?.map((x:any)=> elm?.id == x?.category_group && x?.category_name)}
                    </p>
                  </div>
                </td>
                <td style={{ padding: "7px 15px", textAlign: "end" }}>
                  <div className="bg-[#e5f7ff] flex justify-center rounded-md p-[5px] w-[250px]" style={{ margin: "0 auto", marginRight: 0 }}>
                    <p className="text-[#15abff]" style={{ fontSize: "12px" }}>
                      {AllCategory?.length && AllCategory?.map((x:any)=> elm?.id == x?.category_group && AllSubCategory.map((y:any)=> x?.id == y?.category && y?.subcategory_name))}
                    </p>
                  </div>
                </td>
              </tr>
            )
          })}
        </table>
      </div>
    </div>
  );
};

export { GroupCategoryList };