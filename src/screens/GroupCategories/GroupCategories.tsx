import React, { useState } from "react";
import { useGroupCategoriesStyles } from "@/static/stylesheets/screens/groupcategoriesStyles";
import LogoEcBazaar from "@/static/images/placeholder.jpg";
import LogoDelete from "@/static/icons/ic_delete.png";
import LogoEdit from "@/static/icons/ic_edit.png";
import LogoAdd from "@/static/icons/ic_add.png";
import { AppService } from "@/service/AllApiData.service";
import { Alert, AlertError } from "@/alert/Alert";
import { useParams } from "react-router-dom";
import { readFileAsBase64 } from "@/helper/base64";
import SaveIcon from '@mui/icons-material/Save';

const GroupCategories = (props: {
  formData: { bazaar_name: any };
  setFormData: (arg0: any) => void;
  setParentCategoryList: (arg0: any) => void;
  onSavecategory: (payload: any) => void;
  setGroupCatCount: (payload: any) => void;
}) => {
  const classes = useGroupCategoriesStyles();
  const [groupCategories, SetGroupCategories] = useState(0);
  const [ListGroups, setListGroups] = useState([]);
  const [IDS, setIDS] = React.useState([]);
  const [HideTable, setHideTable] = React.useState(false);
  const [firstTableHide, setFirstTableHide] = React.useState(false);
  const { id } = useParams();

  const [addData, setAddData] = React.useState<any>([]);

  const detailIB = async (ID: any) => {
    const responseJson = await AppService.detailGroupCate(ID);
    setIDS(responseJson.data);
  };

  const [inputFields, setInputFields] = useState([
    {
      fullName: "",
      image: "",
    },
  ]);

  const addInputField = () => {
    let groupCategoriesCount = groupCategories;

    setAddData({
      ...addData, [groupCategoriesCount]: {
        parent_category_name: "",
        parent_category_description: "",
        parent_category_active: "true",
        parent_category_updated_by: 2,
        parent_category_ref_image: "",
        bazaar: id ? id : "",
      }
    });
    setSelectedImage({ ...selectedImage, [groupCategoriesCount]: undefined });
    setHideTable(true);
    groupCategoriesCount = ++groupCategoriesCount;
    SetGroupCategories(groupCategoriesCount);
  };
  const removeInputFields = (index: number) => {
    const rows = [...inputFields];
    rows.splice(index, 1);
    setInputFields(rows);
  };
  const handleChange = (
    index: string | number,
    evnt: React.ChangeEvent<HTMLInputElement>
  ) => {
    const { name, value } = evnt.target;
    const list = [...inputFields];
    setInputFields(list);
  };

  const [selectedImage, setSelectedImage] = useState<any>({});
  const [selected, setSelected] = React.useState([]);
  const [node, setNode] = React.useState("");

  const imageChange = async (e: any, index: number) => {
    if (e.target.files && e.target.files.length > 0) {
      console.log(e.target.files[0]);
      setSelectedImage({ ...selectedImage, [index]: e.target.files[0] });
      let url = await readFileAsBase64(e.target.files[0]);
      let obj = { ...addData[index], parent_category_ref_image: url };
      setAddData({ ...addData, [index]: obj });
    }
  };

  const dataSave = (e: any) => {
    // console.log(e.target.value);
    // props.setFormData({
    //   ...props.formData,
    //   bazaar_gorup_category: [selectedImage, e.target.value],
    // });
  };

  const handleSelectedItems = (event: any, nodeId: any) => {
    console.log(nodeId);
    setHideTable(false);
    setFirstTableHide(true);
    setNode(nodeId);
    detailIB(nodeId);
    props.setFormData({
      ...props.formData,
      bazaar_gorup_category: [nodeId],
    });
  };
  async function convertImageTobS4(imgUrl: string) {
    const imageToBase64 = require('image-to-base64/browser.js');
    let response = await imageToBase64(imgUrl);
    return "data:image/png;base64," + response;
  }

  const getAllLists = async () => {
    const responseJson = await AppService.listGroupCateByBazaar({ bazaar: id });
    console.log("getCategories", responseJson.data.results);
    setListGroups(responseJson.data.results);
    SetGroupCategories(responseJson.data.results.length)
    setAddData(responseJson.data.results)
    let tempObj = {};
    await Promise.all(
      responseJson.data.results.map(async (row: any, index: number) => {
        row.parent_category_ref_image = await convertImageTobS4(row.parent_category_ref_image);
        tempObj = { ...tempObj, [index]: row };
      })
    );
    props.setGroupCatCount(responseJson.data.results.length);

    setAddData(tempObj);
  };

  const deletes = async (id: any) => {
    if(id){
      Alert("delete successfully");
      setFirstTableHide(true);
      const responseJson = await AppService.deleteGroupCate(id);
      console.log(responseJson.data);
      getAllLists();
    }
  };
  const edit = async (id: any) => {
    setFirstTableHide(true);
    const responseJson = await AppService.updateGroupCate(id, addData);
    console.log(responseJson.data);
    Alert("updated successfully");
    getAllLists();
  };

  React.useEffect(() => {
    console.log("group-categories", props);
    if (id) {
      getAllLists();
    }
  }, [id]);
  React.useEffect(() => { props.setFormData(addData) }, [addData])


  const hideTabs = async (e: any, index: number) => {

    let groupCategoriesCount = groupCategories;
    groupCategoriesCount = --groupCategoriesCount;
    SetGroupCategories(groupCategoriesCount);
    if (groupCategories == 1) {
      setFirstTableHide(true);
      setHideTable(false);
      setAddData([]);
      SetGroupCategories(0);
      setSelectedImage({})
    }
      deletes( addData[index]?.id);
  };
  const handleChanges = (event: any, index: number) => {
    event.preventDefault();
    let obj = { ...addData[index], [event.target.name]: event.target.value };
    
    setAddData({ ...addData, [index]: obj });
    if (event.target.files && event.target.files.length > 0) {
      console.log(event.target.files[0]);
      setSelectedImage({ ...selectedImage, [index]: event.target.files[0] });
    }
  };
  console.log("addData[index]", addData);

  const save = async (index:number) => {
    let payload: any = Object.assign({}, addData[index]);
    try {
      let responseJson;
      if(payload?.parent_category_ref_image != ""){
        if (addData[index].id) {
          responseJson = await AppService.updateGroupCate(payload.id, payload);
        } else {
          responseJson = await AppService.addGroupCate(payload);
        }
        if (responseJson.status == 201 || responseJson.status == 200) {
          Alert("Added successfully");
        }
      }
      else{
        AlertError("Please enter a image");
      }
      getAllLists()
    }
    catch (error: any) {
      let message:any = [];
      error.response.data.errors.map((row: any,i:number) => {
        message.push(i+1+". "+row.detail)
      })
      AlertError(message);
    }
    //  props.onSavecategory(addData[index])
  };


  return (
    <div className={classes.root}>
      <div className="container" style={{ display: "flex", gap: "80px" }}>
        <div className="rightContainer">
          <table>
            {ListGroups.filter((x: any) => x.bazaar == id)?.length > 0 && (
              <tr>
                <th className="title">Image</th>
                <th className="title">Group Category Name</th>
                <th></th>
              </tr>
            )}
            <tr hidden={ListGroups?.length > 0 ? true : !HideTable}>
              <th className="title">Image</th>
              <th className="title">Group Category Name</th>
              <th></th>
            </tr>

            {[...Array(groupCategories)].map((row: any, index: number) => (
              <tr >
                <td>
                  <div className="brandLogo" style={{ position: "relative" }}>
                    {addData[index]?.parent_category_ref_image === '' ? (
                      <img src={LogoEcBazaar} alt={"Logo"} className={"w-[52px]"} />
                      ) : (
                        addData[index]?.parent_category_ref_image && (
                          <img src={addData[index]?.parent_category_ref_image} />
                          )
                          )}
                    <input
                      accept="image/*"
                      style={{
                        position: "absolute",
                        top: 0,
                        width: "40px",
                        height: "37px",
                        cursor: "pointer",
                        opacity: "0",
                      }}
                      type="file"
                      onChange={(e) => imageChange(e, index)}
                      name="image"
                    />
                  </div>
                </td>
                <td>

                  <div>
                    <input
                      type="text"
                      name="parent_category_name"
                      className="bg-gray-50 border border-gray-300 text-sm rounded-lg text-[#2E2C34] block w-full p-[15px] dark:border-[#EBEAED]"
                      placeholder="Group category"
                      value={addData[index]?.parent_category_name}
                      onChange={(e) => handleChanges(e, index)}
                    />
                  </div>
                </td>
                <td>
                  <div className="ActionLogo flex justify-center">

                    <SaveIcon style={{ color: "#5542F6", cursor: "pointer" }} onClick={() => save(index)} />
                    <div className="dividor"></div>
                    <img
                      src={LogoDelete}
                      onClick={() => hideTabs(true, index)}
                      alt={"Logo"}
                    />
                  </div>
                </td>
              </tr>
            ))}


          </table>
          <div>
            <div className="addButton" onClick={addInputField}>
              <img src={LogoAdd} alt={"Logo"} />
              <p>Add New Group Category</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GroupCategories;
