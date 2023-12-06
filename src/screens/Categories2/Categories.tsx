import React, { useEffect, useState } from "react";
import { useCategoriesStyles } from "@/static/stylesheets/screens/categoriesStyles";
import GroupCategories from "../GroupCategories";
import MuiTreeView from "@/components/atoms/MuiTreeView/MuiTreeView";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { TreeView, TreeItem } from "@mui/lab";
import LogoEcBazaar from "@/static/images/placeholder.jpg";
import LogoDelete from "@/static/icons/ic_delete.png";
import LogoEdit from "@/static/icons/ic_edit.png";
import LogoAdd from "@/static/icons/ic_add.png";
import { Alert, AlertError } from "@/alert/Alert";
import { AppService } from "@/service/AllApiData.service";
import { useParams } from "react-router-dom";
import { readFileAsBase64 } from "@/helper/base64";
import SaveIcon from "@mui/icons-material/Save";
const Categories2 = (props: {
  formData: { bazaar_name: any };
  setFormData: (arg0: any) => void;
}) => {
  const classes = useCategoriesStyles();
  const [ListGroups, setListGroups] = useState<any>([]);
  const [ListCat, setListCat] = useState<any>([]);
  const [ListSubCat, setListSubCat] = useState([]);
  const [IDS, setIDS] = React.useState([]);
  const [HideTable, setHideTable] = React.useState(false);
  const { id } = useParams();
  const [groupCategories, SetGroupCategories] = useState(0);
  const [addData, setAddData] = React.useState<any>([]);
  const [categoryGId, setCategoryGID] = useState<any>();
  console.log("groupCategories", groupCategories, addData);

  const [selectedImage, setSelectedImage] = useState<any>({});
  const [selected, setSelected] = React.useState<any>([]);
  const [node, setNode] = React.useState("");
  const [firstTableHide, setFirstTableHide] = React.useState(false);
  const detailIB = async (ID: any) => {
    setAddData({ ...addData, category: ID });
    const responseJson = await AppService.detailSubCate(ID);
    setIDS(responseJson.data);
  };

  useEffect(() => {
    if (ListCat.length > 0 && ListGroups.length > 0) {
      // setCatAndGrpCat(ListCat[0]?.id,ListGroups[0].id)
    }

    // getCategoryByGroup();
  }, [ListGroups, ListCat]);

  const getCategoryByGroup = async (parent?: any) => {
    let categoryGroup: any = Object.assign([], ListGroups);
    let parentId = parent
      ? parent
      : categoryGroup[0].id
      ? categoryGroup[0].id
      : "";
    const responseJson = await AppService.listCateByParent({
      category_group: parentId,
    });
    setListCat([...responseJson.data.results]);
    console.log(selected, "selected.lengthselected.length");
    setCategoryGID(parent);
    setSelected(parent);
  };
  async function convertImageTobS4(imgUrl: string) {
    const imageToBase64 = require("image-to-base64/browser.js");
    let response = await imageToBase64(imgUrl);
    return "data:image/png;base64," + response;
  }
  const getSubcategoryByCategory = async (id: any) => {
    const responseJson = await AppService.listSubCateByCat({ category: id });
    setListSubCat(responseJson.data.results);
    let tempObj = {};
    SetGroupCategories(responseJson.data.results.length);
    if (responseJson.data.results.length > 0) {
      await Promise.all(
        responseJson.data.results.map(async (row: any, index: number) => {
          row.subcategory_ref_image = await convertImageTobS4(
            row.subcategory_ref_image
          );
          tempObj = { ...tempObj, [index]: row };
        })
      );
      setAddData({ ...tempObj });
    } else {
      setAddData([]);
    }
  };

  const [inputFields, setInputFields] = useState([
    {
      fullName: "",
      image: "",
    },
  ]);

  const addInputField = () => {
    let groupCategoriesCount = groupCategories;
    let categoryGroup: any = Object.assign([], ListGroups);
    setAddData({
      ...addData,
      [groupCategoriesCount]: {
        subcategory_name: "",
        subcategory_description: "",
        subcategory_active: "true",
        subcategory_updated_by: 2,
        subcategory_ref_image: "",
        category_group: categoryGroup[0].id ? categoryGroup[0].id : "",
        category: categoryGId ? categoryGId : "",
        bazaar: id ? id : "",
      },
    });
    setSelectedImage({ ...selectedImage, [groupCategoriesCount]: undefined });
    // setHideTable(true);
    // setInputFields([...inputFields, {
    //     fullName:'',
    //     image:'',
    // } ])
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

  const imageChange = async (e: any, index: number) => {
    if (e.target.files && e.target.files.length > 0) {
      setSelectedImage({ ...selectedImage, [index]: e.target.files[0] });
      let url = await readFileAsBase64(e.target.files[0]);
      let obj = { ...addData[index], subcategory_ref_image: url };
      setAddData({ ...addData, [index]: obj });
    }
  };

  const handleSelectedItems = (event: any, nodeId: any) => {
    setNode(nodeId);
    getCategoryByGroup(nodeId);
    // detailIB(nodeId);
    props.setFormData({
      ...props.formData,
      bazaar_subcategory: [nodeId],
    });
  };

  const getAllLists = async () => {
    const responseJson = await AppService.listGroupCateByBazaar({
      bazaar: id,
    });
    setListGroups(responseJson.data.results);
    getCategoryByGroup(responseJson.data.results[0].id);
  };

  const deletes = async (id: any) => {
    if (!addData[id].id) {
      return false;
    }
    try {
        const responseJson = await AppService.deleteSubCate(addData[id].id);
        Alert("delete successfully");
        await getSubcategoryByCategory(addData[id].category);
    } catch (error: any) {
      let message = error.response.data.type + "\n";
      error.response.data.errors.map((row: any) => {
        message += row.attr + " : " + row.detail + "\n";
      });
      AlertError(message);
    }
  };

  React.useEffect(() => {
    if (id) {
      getAllLists();
    }
  }, [id]);

  const hideTabs = async (e: any, index: number) => {
    let groupCategoriesCount = groupCategories;
    groupCategoriesCount = --groupCategoriesCount;
    SetGroupCategories(groupCategoriesCount);
    if (groupCategories == 1) {
      setFirstTableHide(true);
      setHideTable(false);
      setAddData([]);
      SetGroupCategories(0);
      setSelectedImage({});
    }
    await deletes(index);
    // delete addData[index];
  };

  const handleChanges = (event: any, index: number) => {
    event.preventDefault();
    let obj = { ...addData[index], [event.target.name]: event.target.value };
    setAddData({ ...addData, [index]: obj });
    if (event.target.files && event.target.files.length > 0) {
      setSelectedImage({ ...selectedImage, [index]: event.target.files[0] });
    }
    // props.setFormData({
    //   ...props.formData,
    //   bazaar_product: [contactInfo],
    // });
  };

  const save = async (index: number) => {
    let payload: any = Object.assign({}, addData[index]);
    try {
      payload["category"] = selected[0];
      payload["category_group"] = categoryGId[0];
      console.log("category_group++", payload.category_group);

      if (!payload.category || !payload.category_group) {
        if (!payload.category_group) {
          AlertError("No Category selected2");
        }
        if (!payload.category) {
          AlertError("No Category selected");
        }
        return;
      }

      let responseJson;
      if (addData[index].id) {
        responseJson = await AppService.updateSubCate(payload.id, payload);
      } else {
        responseJson = await AppService.addSubCate(payload);
      }
      Alert("Added successfully");
      await getSubcategoryByCategory(payload.category);
    } catch (error: any) {
      let message = error.response.data.type + "\n";
      error.response.data.errors.map((row: any) => {
        message += row.attr + " : " + row.detail + "\n";
      });
      AlertError(message);
    }
  };

  const renderParent = (item: any) => (
    <span
      onClick={(event) => {
        setNode(item.id);
        getCategoryByGroup(item.id);
        event.preventDefault();
      }}
    >
      {item.parent_category_name}
    </span>
  );

  const renderChild = (item: any, items: any) => (
    <span
      onClick={(event) => {
        setCategoryGID([items.id]);
        setSelected([item.id]);
        setCategoryGID(item.id);
        getSubcategoryByCategory(item.id);
        // if you want after click do expand/collapse comment this two line
        event.preventDefault();
      }}
    >
      {item.category_name}
    </span>
  );
  React.useEffect(() => {
    props.setFormData(addData);
  }, [addData]);

  console.log("selected.lengthselected.length", !selected.length);
  const setCatAndGrpCat = async (cat: number, groupcat: number) => {
    setCategoryGID([groupcat]);
    setSelected([cat]);
    await getSubcategoryByCategory(cat);
  };
  const condition = ListCat.length > 0 || true;
  return (
    <div className={classes.root}>
      <div className="container">
        <div className="leftContainer">
          {condition && (
            <TreeView
              className="treefont"
              aria-label="file system navigator"
              defaultSelected={String(ListCat.length > 0 ? ListCat[0]?.id : 0)}
              defaultExpanded={[
                String(ListGroups.length > 0 ? ListGroups[0]?.id : 0),
              ]}
              // onNodeToggle={handleToggle}
              // onNodeSelect={handleSelectedItems}
              defaultCollapseIcon={<ExpandMoreIcon />}
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
              {ListGroups?.map((items: any, index: any) => (
                <TreeItem
                  nodeId={String(items.id)}
                  label={renderParent(items)}
                  onClick={() => getCategoryByGroup(items.id)}
                  sx={{
                    "& .MuiTreeItem-content": {
                      height: "48px",
                      borderRadius: "10px",
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                    },
                    "& .MuiTreeItem-content:hover": {
                      background: "transparent",
                      color: "black",
                    },
                    "& .Mui-focused": {
                      background: "transparent",
                      color: "black",
                    },
                    "& .Mui-selected": {
                      background: "#e9e7fe !important",
                      color: "#5542F6 !important",
                    },
                    "& *": {
                      fontSize: "14px !important",
                    },
                  }}
                >
                  {ListCat?.map((cat: any, index: any) => {
                    return (
                      items.id == cat.category_group && (
                        <TreeItem
                          onClick={() => setCatAndGrpCat(cat.id, items.id)}
                          nodeId={String(cat.id)}
                          label={renderChild(cat, items)}
                        />
                      )
                    );
                  })}
                </TreeItem>
              ))}
            </TreeView>
          )}
        </div>
        <div className="rightContainer">
          <table className="groupCeta">
            <tr hidden={ListGroups?.length > 0 ? true : !HideTable}>
              <th className="title">Image</th>
              <th className="title !ps-[35px]">Sub Category Name</th>
              <th></th>
            </tr>

            {selected.length &&
              [...Array(groupCategories)].map((row: any, index: number) => (
                <tr>
                  <td className="padding_tpb">
                    <div className="brandLogo" style={{ position: "relative" }}>
                      {addData[index]?.subcategory_ref_image === "" ? (
                        <img
                          src={LogoEcBazaar}
                          alt={"Logo"}
                          className={"w-[52px]"}
                        />
                      ) : (
                        addData[index]?.subcategory_ref_image && (
                          <img
                            src={addData[index]?.subcategory_ref_image}
                            className={"w-[52px]"}
                          />
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
                  <td className="padding_tpb">
                    <div>
                      <input
                        type="text"
                        name="subcategory_name"
                        className="bg-gray-50 border text-[14px] font-[600] font-[Manrope] border-gray-300 text-sm rounded-lg text-[#2E2C34] block w-full h-[48px] p-[15px] dark:border-[#EBEAED]"
                        placeholder="Sub category"
                        value={addData[index]?.subcategory_name}
                        onChange={(e) => handleChanges(e, index)}
                      />
                    </div>
                  </td>
                  <td className="padding_tpb">
                    <div className="ActionLogo h-[48px] flex justify-center">
                      {/*<img src={LogoEdit} alt={"Logo"} onClick={() => save()} />
                      <div className="dividor"></div>
                      <img
                        src={LogoDelete}
                        onClick={() => hideTabs(true)}
                        alt={"Logo"}
                      />*/}

                      <SaveIcon
                        style={{ color: "#5542F6", cursor: "pointer" }}
                        onClick={() => save(index)}
                      />
                      <div className="dividor"></div>
                      <img
                        src={LogoDelete}
                        onClick={() =>
                          window.confirm("are you sure")
                            ? hideTabs(true, index)
                            : ""
                        }
                        alt={"Logo"}
                      />
                    </div>
                  </td>
                </tr>
              ))}
          </table>
          <div>
            <button
              disabled={!selected.length}
              className="w-full disabled:opacity-80 disabled:cursor-not-allowed addButton h-[48px] mt-[10px]"
              onClick={addInputField}
            >
              <img src={LogoAdd} alt={"Logo"} />
              <p>Add New Subcategory</p>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Categories2;
