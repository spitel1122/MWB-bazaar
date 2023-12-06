import React, { useEffect, useState } from "react";
import { useCategoriesStyles } from "@/static/stylesheets/screens/categoriesStyles";
import { ChevronRightIcon } from "@heroicons/react/20/solid";
import { TreeItem, TreeView } from "@mui/lab";
import LogoEcBazaar from "@/static/images/placeholder.jpg";
import LogoDelete from "@/static/icons/ic_delete.png";
import LogoEdit from "@/static/icons/ic_edit.png";
import LogoAdd from "@/static/icons/ic_add.png";
import { Alert, AlertError } from "@/alert/Alert";
import { AppService } from "@/service/AllApiData.service";
import { useParams } from "react-router-dom";
import { readFileAsBase64 } from "@/helper/base64";
import SaveIcon from '@mui/icons-material/Save';
const Categories = (props: {
  formData: any;
  setFormData: (arg0: any) => void;
  setCatCount: (arg0: any) => void;
}) => {
  const classes = useCategoriesStyles();
  const [ListGroups, setListGroups] = useState<any>([]);
  const [IDS, setIDS] = React.useState<any>(ListGroups.length > 0 ? String(ListGroups[0].id) : "");
  const [HideTable, setHideTable] = React.useState(false);
  const { id } = useParams();
  const [groupCategories, SetGroupCategories] = useState(0);
  const [addData, setAddData] = React.useState<any>([]);

  const detailIB = async (ID: any) => {
    const responseJson = await AppService.detailMainCate(ID);
    setIDS(responseJson.data);
    console.log(responseJson.data);
    // Alert("save successfully");
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
        category_name: "",
        category_description: "",
        category_active: "true",
        category_updated_by: 2,
        category_ref_image: "",
        bazaar: id ? id : "",
        category_group: node
      }
    });
    setSelectedImage({ ...selectedImage, [groupCategoriesCount]: undefined });
    setHideTable(true);
    if(groupCategoriesCount <= 10){
      groupCategoriesCount = ++groupCategoriesCount;
      SetGroupCategories(groupCategoriesCount);
    }
    else{
      SetGroupCategories(11);
    }
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
    console.log(list);
    setInputFields(list);

  };

  const [selectedImage, setSelectedImage] = useState<any>({});
  const [selected, setSelected] = React.useState([]);
  const [node, setNode] = React.useState(0);
  const [firstTableHide, setFirstTableHide] = React.useState(false);
  const imageChange = async (e: any, index: number) => {
    if (e.target.files && e.target.files.length > 0) {
      console.log(e.target.files[0]);
      setSelectedImage({ ...selectedImage, [index]: e.target.files[0] });
      let url = await readFileAsBase64(e.target.files[0]);
      let obj = { ...addData[index], category_ref_image: url };
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
    console.log("nodeId", nodeId);
    setNode(nodeId);
    // detailIB(nodeId);
    getCategoryByGroup(nodeId);
    props.setFormData({
      ...props.formData,
      category_group: [nodeId],
    });

    [...Array(Object.keys(addData).length)].map(async (row: any, countRow: number) => {
      let tempRow = { ...row, category_group: nodeId };
      setAddData({ ...addData, [countRow]: tempRow });
    })


  };
  async function convertImageTobS4(imgUrl: string) {
    const imageToBase64 = require('image-to-base64/browser.js');
    let response = await imageToBase64(imgUrl);
    return "data:image/png;base64," + response;
  }
  const getCategoryByGroup = async (parentId: any) => {
    const responseJson = await AppService.listCateByParent({
      category_group: parentId,
    });
    SetGroupCategories(responseJson.data.results?.length)
    setAddData((prev:any)=>([...responseJson.data.results]))
    setIDS(responseJson.data.results);
    let tempObj = {};
    await Promise.all(
      responseJson.data.results.map(async (row: any, index: number) => {
        row.category_ref_image = await convertImageTobS4(row.category_ref_image);
        tempObj = { ...tempObj, [index]: row };
      })
    );
    if(responseJson.data.results.length <= 10){
      SetGroupCategories(responseJson.data.results.length)
    }
    else{
      SetGroupCategories(10)
    }
    setAddData(tempObj);
    props.setCatCount(responseJson.data.results.length)
  };

  const getAllLists = async () => {
    // const responseJson = await AppService.listMaincategory();
    // const responseJson = await AppService.listGroupCate();
    const responseJson = await AppService.listGroupCateByBazaar({
      bazaar: id,
    });
    console.log(responseJson.data.results,"responseJson.data.results")
    setListGroups(responseJson.data.results);
    getCategoryByGroup(responseJson.data.results[0].id);
    setAddData({
      ...addData,
      category_group: responseJson.data.results[0].id,
    });
    setNode(responseJson.data.results[0].id);
  };

  const deletes = async (id: any) => {
    if (!addData[id].id) {
      return false;
    }
    try {
        const responseJson = await AppService.deleteMainCate(addData[id].id);
        Alert("delete successfully");
    }
    catch (error: any) {

      let message = error.response.data.type + "\n"
      error.response.data.errors.map((row: any) => {
        message += row.attr + " : " + row.detail + "\n"
      })
      AlertError(message);
    }

  };
  const edit = async (id: any) => {
    const responseJson = await AppService.updateMainCate(id, addData);
    console.log(responseJson.data);
    Alert("updated successfully");
    getAllLists();
  };

  React.useEffect(() => {
    // console.log(formData);
    getAllLists();
  }, []);
  // React.useEffect(() => {
  //   getCategoryByGroup(ListGroups[0]?.id);
  // }, [ListGroups[0]?.id]);

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
    await deletes(index);
  };

  const handleChanges = (event: any, index: number) => {
    event.preventDefault();
    let obj = { ...addData[index], [event.target.name]: event.target.value };

    setAddData({ ...addData, [index]: obj });
    console.log("obj", addData)
    if (event.target.files && event.target.files.length > 0) {
      console.log(event.target.files[0]);
      setSelectedImage({ ...selectedImage, [index]: event.target.files[0] });
    }
  };

  const save = async (index: number) => {
    let data = { ...addData[index], category_group: addData[index].category_group }

    try {
      let responseJson;
      if (data.id) {
        responseJson = await AppService.updateMainCate(data.id, data);
      } else {
        responseJson = await AppService.addMainCate(data);
      }
      if (responseJson.status == 201 || responseJson.status == 200) {
        getCategoryByGroup(addData[index].category_group);
        Alert("Added successfully");
      }
    }
    catch (error: any) {

      let message:any = [];
      console.log(error.response.data.errors,"messagemessage")
      error.response.data.errors.map((row: any,ind:any) => {
        message.push(ind+1+". "+row.detail + "\n")
      })
      AlertError(message);
    }
    setHideTable(false);
  };
  console.log("addData",addData)
  React.useEffect(() => { props.setFormData(addData) }, [addData])

  console.log("addDataaddData",addData,groupCategories)
  return (
    <div className={classes.root}>
      <div className="container">
        <div className="leftContainer">

          {ListGroups.length > 0 && <TreeView
            className="treefont"
            aria-label="file system navigator"
            // onNodeToggle={handleToggle}
            defaultSelected={String(ListGroups[0]?.id)}
            onNodeSelect={handleSelectedItems}
            defaultExpandIcon={<ChevronRightIcon />}
            sx={{
              height: 492,
              flexGrow: 1,
              maxWidth: 254,
              overflowY: "auto",
              border: 1,
              padding: "10px",
              borderColor: "#E1E1E1",
              borderRadius: "10px",
            }}
          >
            {ListGroups?.map((items: any) => (
              <TreeItem
                sx={{
                  "& .MuiTreeItem-content": {
                    height: "48px",
                    borderRadius: "10px",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    fontWeight: '600',
                    fontFamily: 'Manrope'
                  },
                  "& .MuiTreeItem-content:hover": {
                    background: "transparent",
                    color: "black",
                  },
                  "& .MuiTreeItem-content:focus": {
                    background: "#e9e7fe",
                    color: "#5542F6",
                  },
                  "& .Mui-selected":{
                    background:'#e9e7fe',
                    color: "#5542F6"
                  },
                  "& .Mui-focused":{
                    background:'#e9e7fe !important',
                    color: "#5542F6 !important"
                  },
                  "& *": {
                    fontSize: "14px !important",
                  }
                }}
                nodeId={`${items.id}`}
                label={items.parent_category_name}
              >
                {/* <TreeItem nodeId={items.id} label={items.category_name} /> */}
              </TreeItem>
            ))}
          </TreeView>}
        </div>
        <div className="rightContainer">
          <table className="groupCeta">
            <tr hidden={ListGroups?.length > 0 ? true : !HideTable} className="pb-[5px]">
              <th className="title">Image</th>
              <th className="title !ps-[40px]">Category Name</th>
              <th></th>
            </tr>

            {[...Array(groupCategories)].map((row: any, index: number) => (
              <tr>
                <td className="py-[8px]">
                  <div className="brandLogo" style={{ position: "relative" }}>
                    {addData[index]?.category_ref_image === '' ? (
                      <img src={LogoEcBazaar} alt={"Logo"} />
                    ) : (
                      addData[index]?.category_ref_image && (
                        <img src={addData[index]?.category_ref_image} />
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
                <td className="py-[8px]">

                  <div>
                    <input
                      type="text"
                      name="category_name"
                      className="bg-gray-50 border text-[14px] font-[600] font-[Manrope] border-gray-300 text-sm rounded-lg text-[#2E2C34] block w-full h-[48px] p-[15px] dark:border-[#EBEAED]"
                      placeholder="Category"
                      value={addData[index]?.category_name}
                      onChange={(e) => handleChanges(e, index)}
                    />
                  </div>
                </td>
                <td className="py-[8px]">
                  <div className="ActionLogo h-[48px] flex justify-center">
                    {/*<img src={LogoEdit} alt={"Logo"} onClick={() => save()} />
                      <div className="dividor"></div>
                      <img
                        src={LogoDelete}
                        onClick={() => hideTabs(true)}
                        alt={"Logo"}
                      />*/}

                    <SaveIcon style={{ color: "#5542F6", cursor: "pointer" }} onClick={() => save(index)} />
                    <div className="dividor"></div>
                    <img
                      src={LogoDelete}
                      onClick={() => window.confirm("are you sure") ? hideTabs(true, index) : ""}
                      alt={"Logo"}
                    />
                  </div>
                </td>
              </tr>
            ))}
          </table>

          <div className="py-[33px]">
            <div className="addButton" onClick={addInputField}>
              <img src={LogoAdd} alt={"Logo"} />
              <p>Add New Category</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Categories;
