import React, { useEffect, useState } from "react";
import { GridOptionButton } from "@/components/atoms/Button";
import { Switch } from "@/components/atoms/Switch";
import { useAgentStyles } from "@/static/stylesheets/molecules";
import { AppService } from "../../../service/AllApiData.service";
import { Grid } from "@mui/material";
import { AddButton } from "@/components/atoms/Button";
import { SearchField } from "@/components/atoms/SearchField";
import CommonSelectElectronicBazaar from "@/components/atoms/CommonSelectElectronicBazaar/CommonSelectElectronicBazaar";

const AgentList = (props: any) => {
  const classes = useAgentStyles();
  const [getAllAgentList, setGetAllAgentList] = useState([]);
  const [iDS] = useState(localStorage.getItem("IDS"));
  const [searchK, setSearchK] = useState("");

  const getAllListss = async (iDS: any) => {
    const responseJson = await AppService.getAllBazarListwholeseller(iDS);
    setGetAllAgentList(responseJson.data.results);
  };

  const getAllListssSearch = async () => {
    if (props.keys === "") {

    } else {
      const responseJson = await AppService.getAllBazarAgentListSearch(iDS, props.keys);
      console.log("ecomprdserd", responseJson.data);
      setGetAllAgentList(responseJson.data.results);

    }
  };


  useEffect(() => {
    console.log(props.keys);
    getAllListssSearch();
    getAllListss(iDS);

  }, [props.keys]);

  const handleCallback = (e: any) => {
    setSearchK(e);
  }

  const handleChange = (selectboxName: string, id: string) => {
  }

  const AllfilterAgent = props.AllfilterAgent

  return (
    <div className={classes.root}>
      <Grid container spacing={2}>
        <Grid item xs={6}>
          <div className="bazaarFilters pt-[20px]" style={{ display: "flex", alignItems: "center", flexWrap: "wrap" }}>
            <div style={{ marginRight: "10px", marginTop: "5px" }}>
              <CommonSelectElectronicBazaar
                handleSelect={handleChange}
                label={"City"}
                hint={"Select City"}
                options={[
                  {
                    label: "Option #1",
                    value: "Option #1"
                  },
                  {
                    label: "Option #1",
                    value: "Option #1"
                  },
                  {
                    label: "Option #1",
                    value: "Option #1"
                  },
                  {
                    label: "Option #1",
                    value: "Option #1"
                  },
                ]}
              />
            </div>
            <div style={{ marginRight: "10px", marginTop: "5px" }}>
              <CommonSelectElectronicBazaar
                handleSelect={handleChange}
                label={"Agent Type"}
                hint={"Search"}
                options={[
                  {
                    label: "Option #1",
                    value: "Option #1"
                  },
                  {
                    label: "Option #1",
                    value: "Option #1"
                  },
                  {
                    label: "Option #1",
                    value: "Option #1"
                  },
                  {
                    label: "Option #1",
                    value: "Option #1"
                  },
                ]}
              />
            </div>
            <div style={{ marginRight: "10px", marginTop: "5px" }}>
              <CommonSelectElectronicBazaar
                handleSelect={handleChange}
                label={"Status"}
                hint={"Select Status"}
                options={[
                  {
                    label: "true",
                    value: "true"
                  },
                  {
                    label: "false",
                    value: "false"
                  }
                ]}
              />
            </div>
            <div style={{ marginRight: "10px", marginTop: "5px" }}>
              <CommonSelectElectronicBazaar
                handleSelect={handleChange}
                label={"Active/Inactive"}
                hint={"Active/Inactive"}
                options={[
                  {
                    label: "Active",
                    value: "Active"
                  },
                  {
                    label: "Inactive",
                    value: "Inactive"
                  }
                ]}
              />
            </div>
          </div>
        </Grid>

        <Grid item xs={6}>
          <div className="leftContent">
            <form className="max-w-sm px-4">
              <div className="relative">
                <SearchField parentCallback={handleCallback} />
              </div>
            </form>

            <div>
              <AddButton label="Add Bazaar" />
            </div>
          </div>
        </Grid>
      </Grid>
      <table>
        <tr>
          <th>Name</th>
          <th>Mobile Number</th>
          <th>City</th>
          <th>Bazaar</th>
          <th>Type</th>
          <th>Status</th>
          <th>Enable/Disable</th>
          <th></th>
          <th></th>
        </tr>
        {getAllAgentList?.filter((elm: any) => elm?.bazaar?.toLowerCase().includes(searchK))?.map((item: any) => (
          <tr>
            <td>{item.name}</td>
            <td>{"+91-8477852310"}</td>
            <td>{item.city}</td>
            <td>{item.bazaar}</td>
            <td>{item.type}</td>
            <td>
              <div className="status">{item.status}</div>
            </td>
            <td>
              <div>
                <Switch SwitchProps={item.enable} />
              </div>
            </td>
            <td>
              <GridOptionButton icon={"vertical-options"} />
            </td>
          </tr>
        ))}
      </table>
    </div>
  );
};

export { AgentList };
