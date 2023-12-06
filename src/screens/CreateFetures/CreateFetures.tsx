import React, { useEffect, useState } from 'react';
import {
    FormControl,
    Grid,
    Pagination
} from "@mui/material";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import SaveIcon from '@mui/icons-material/Save';
import { AppService } from '@/service/AllApiData.service';
import { Alert, AlertError } from "@/alert/Alert";
import { Switch } from '@/components/atoms/Switch';
import { GridOptionButton } from '@/components/atoms/Button';
import fill from "@/static/icons/fill.svg";
import { useMasterListStyles } from '@/static/stylesheets/screens';


const CreateFetures = () => {
  const classes = useMasterListStyles();
  const [groupCategories, SetGroupCategories] = useState(0);
  const [addFeatures, setAddFeatures] = React.useState<any>([]);
  const [addModalOpen, setAddModalOpen] = useState(false);
  const [wholesellerState, setWholesellerState] = useState("");
  const [editState, setEditState] = useState<string>("");
  const [planfeaturesArray,setplanfeaturesArray] = useState([])
  const [totalWholeseller, setTotalWholeseller] = useState(1);
  const [currentPage, setCurrentPage] = useState(1);
  const [PlanCount, setPlanCount] = useState(1);

  useEffect(()=>{
    getWholesellerType(1)
  },[])

    const addInputField = () => {
        let groupCategoriesCount = groupCategories;
        setAddFeatures({
            ...addFeatures, [groupCategoriesCount]: { id: "", feature: "" }
        });
        groupCategoriesCount = ++groupCategoriesCount;
        SetGroupCategories(groupCategoriesCount);
    };

    const hideTabs = async (e: any, index: number, deleteid: number | undefined) => {

        let groupCategoriesCount = groupCategories;
        groupCategoriesCount = --groupCategoriesCount;
        SetGroupCategories(groupCategoriesCount);
        if (groupCategories == 1) {
            setAddFeatures([]);
            SetGroupCategories(0);
        }

        if (deleteid) {
            deleteFeature(deleteid);
        }
    };
    const handleChanges = (event: any, index: number) => {
        event.preventDefault();
        setAddFeatures({ ...addFeatures, [index]: { ...addFeatures[index], feature: event.target.value } });
    };
    const savePlan = async (index: number, updateId: number) => {
        try {
            let responseJson;

            if (updateId) {
                responseJson = await AppService.editFeature(updateId, { feature: addFeatures[index].feature });
            } else {
                responseJson = await AppService.addFeature({ feature: addFeatures[index].feature });
            }

            if (responseJson.status == 201 || responseJson.status == 200) {
                Alert(`Plan features added successfully`);
            }
        } catch (error: any) {

            let message = error.response.data.type + "\n"
            error.response.data.errors.map((row: any) => {
                message += row.attr + " : " + row.detail + "\n"
            })
            AlertError(message);
        }

    };

    const deleteFeature = async (id: any) => {
        if (!id) {
            return false;
        }
        try {
            const responseJson = await AppService.deleteFeature(id);
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

    const editModal = (id: any, name: any) => {
          setWholesellerState(name);
          setAddModalOpen(true);
          setEditState(id);
      };

      const getWholesellerType = async (page: any) => {
        const response = await AppService.getAllFeaturesPlans({page : page});
        setplanfeaturesArray(response?.data?.results);
        setTotalWholeseller(response?.data.count);
        setPlanCount(response?.data.count)
      };

      const handlePageChange = (event: any, value: any) => {
        setCurrentPage(value);
        getWholesellerType(value);
      };
    return (
        <>
            {[...Array(groupCategories)].map((row: any, index: number) => (
                <div className="pt-[20px]">
                    <Grid container spacing={2}>
                        <Grid item lg={3.25} md={5} sm={6} xs={7}>
                            <FormControl variant="standard" style={{ width: "100%", paddingRight: "15px" }}>
                                <input type="text" className='border-[#EBEAED] indent-[15px] border w-full h-[40px] rounded'
                                    name="plan_features"
                                    value={addFeatures[index].feature}
                                    onChange={(e) => handleChanges(e, index)} />
                            </FormControl>
                        </Grid>
                        <Grid item lg={3.25} md={5} sm={6} xs={5}>
                            <FormControl variant="standard" className="w-1/2">
                                <div className="flex items-center border-[#EBEAED] border rounded w-[80px] h-[40px]">
                                    <div className='w-[50%] justify-center flex border-e border-[#EBEAED]'>
                                        <SaveIcon
                                            className="cursor-pointer text-[#5542F6]"
                                            onClick={() => savePlan(index, addFeatures[index].id)}
                                        />
                                    </div>
                                    <div className='w-[50%] justify-center flex'>
                                        <DeleteOutlineIcon
                                            className="cursor-pointer text-[#ff6652]"
                                            onClick={() => hideTabs(true, index, addFeatures[index].id)}
                                        />
                                    </div>
                                </div>
                            </FormControl>
                        </Grid>
                    </Grid>
                </div>
            ))}

            <div className='my-[20px]'>
                <div
                    onClick={addInputField}
                    className="border-2 border-dashed border-[#5542F6] w-[280px] p-[10px] items-center text-center rounded-lg cursor-pointer"
                >
                    <p className='text-[14px] text-[#5542F6] font-semibold font-[Manrope]'>+ Add More</p>
                </div>
            </div>

            <div>
        <table className={classes.dataGrid} cellPadding={0} cellSpacing={0}>
          <thead>
            <tr>
              <th>Title</th>
              <th className='!text-center'>Enable/Disable</th>
            </tr>
          </thead>
          <tbody>
            {planfeaturesArray?.map((item: any, index: any) => (
                <tr>
                  <td>{item?.feature}</td>
                  <td className='text-center'>
                    <Switch />
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>

      <div
            className="flex items-center justify-between pagination"
            style={{ display: "flex" }}
          >
            {/* <div className="text-[#84818A] text-sm font-medium">
            Show <span>10</span> from {states.length} products
          </div> */}
            <Pagination
              count={Math.ceil(totalWholeseller / 10)}
              page={totalWholeseller}
              onChange={handlePageChange}
            />
          </div>
        </>
    );
}

export default CreateFetures;