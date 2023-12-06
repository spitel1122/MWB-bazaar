import React, { useEffect, useState } from "react";
import { DashboardLayout } from "@/components/layouts";
import { SectionHeader } from "@/components/molecules/Bazaars";
import { useElectronicsBazaarStyles } from "@/static/stylesheets/screens";
import LogoAdd from "@/static/icons/ic_report.png";
import LogoGo from "@/static/icons/ic_go.png";
import { Grid } from "@mui/material";
import { BazaarReportCard } from "@/components/molecules/Bazaars/BazaarReportCard";
import { FeaturesTab } from "@/components/organisms/FeaturesTab";
import { useNavigate, useParams } from "react-router-dom";
import { ProductsList } from "@/components/molecules/ProductsList";
import { AppService } from "@/service/AllApiData.service";
import { ElectronicBazaarAgents } from "@/components/molecules/ElectronicBazaarAgents";
import { ElectronicBazaarWholesellerList } from "@/components/molecules/ElectronicBazaarWholesellerList";
import { GroupCategoryList } from "@/components/molecules/GroupCategoryList";


const ElectronicsBazaar = (props: any) => {
  const classes = useElectronicsBazaarStyles();
  const navigate = useNavigate();
  const { id } = useParams()
  const [TotalGroupCategoryCount, SetTotalGroupCategoryCount] = useState([]);
  const [Bazaardetails, setBazaardetails] = useState<any>()
  const [AllAgents, setAllAgents] = useState<any>([])
  const [AllfilterAgent, setAllfilterAgent] = useState<any>([])
  const [AllWholeseller, setAllWholeseller] = useState<any>([])
  const [Allfilterwholeseller, setAllfilterwholeseller] = useState<any>([])
  const [AllProducts, setAllProducts] = useState<any>([])
  const [CustomerGenerated, setCustomerGenerated] = useState<any>([])
  const [Bazaardatas, setBazaardatas] = useState<any>([])
  const [Bazaardatacount, setBazaardatacount] = useState<any>(0)

  const handleModalBackdrop = props.handleModalBackdrop

  const getAllAgentListAPI = async () => {
    const responseJson = await AppService.getAllAgentList();
    setAllAgents(responseJson.data.results)
  }

  const getAllWholesalerlistAPI = async () => {
    const responseJson = await AppService.getAllWholesellerListM()
    setAllWholeseller(responseJson.data.results)
  }
  const IdParams = Number(id)
  const getAllProductsAPI = async () => {
    try {
      const params = {
        bazaar: IdParams,
      }
      const responseJson = await AppService.listproductsbysubcat(params)
      console.log(responseJson.data,"datas")
      setAllProducts(responseJson.data.count)
    } catch (error) {
      console.log('err: ', error)
    }
  }

  const listGroupCateByBazaardata = async() =>{
    try {
      const params = {
        bazaar: IdParams,
      }
      const responseJson = await AppService.listGroupCateByBazaar(params)
      setBazaardatacount(responseJson.data.count)
      setBazaardatas(responseJson.data.results)
    } catch (error) {
      console.log('err: ', error)
    }
  }

  useEffect(() => {
    getSingleBazaarDataAPI()
    getAllAgentListAPI()
    getAllWholesalerlistAPI()
    getAllProductsAPI()
    customerGenerated()
    getAllListsM()
    listGroupCateByBazaardata();
  }, []);

  const customerGenerated = async () => {
    const responseJson = await AppService.AgentCommissionRedeem()
    setCustomerGenerated(responseJson.data.results)
  }

  const totalCustomersGenerated = CustomerGenerated.reduce((total: 0, product: any) => total + product.minimum_no_of_invoice_genrated, 0);

  const getAllListsM = async () => {
    try {
      const params = {
        bazaar: IdParams
      }
      const responseJson = await AppService.listSubCateByCat(params)
      SetTotalGroupCategoryCount(responseJson.data.count)
    } catch (err) {
      console.log("Error: ", err)
    }
  }

  const getSingleBazaarDataAPI = async () => {
    const res = await AppService.getBazars(id)
    if (res.status === 200) {
      setBazaardetails(res.data)
    }
  }

  useEffect(() => {
    if (AllAgents?.length > 0) {
      const matchingAgents = AllAgents?.filter((agent: any) => agent?.agent_bazaar?.includes(IdParams));
      setAllfilterAgent(matchingAgents)
    }
  }, [AllAgents]);

  useEffect(() => {
    if (AllWholeseller?.length > 0) {
      const matchingwholesalers = AllWholeseller?.filter((wholesaler: any) => wholesaler?.wholeseller_bazaar?.includes(IdParams));
      setAllfilterwholeseller(matchingwholesalers)
    }
  }, [AllWholeseller]);

  const totalwholesalerEarning = Allfilterwholeseller.reduce((total: 0, wholesaler: any) => total + wholesaler.earnings, 0);
  const totalwholesalerBills = Allfilterwholeseller.reduce((total: 0, wholesaler: any) => total + wholesaler.bills, 0);

  return (
    <>
      <DashboardLayout>
        <SectionHeader />
        <div className={classes.root}>
          <Grid container spacing={2} style={{ alignItems: "center", paddingBottom: "15px" }}>
            <Grid item xs={6}>
              <div className="headingTitle">{Bazaardetails?.bazaar_name || ""}</div>
            </Grid>

            <Grid item xs={6}>
              <div className={classes.container} style={{ alignItems: "center" }}>
                <img src={LogoAdd} alt={"Logo"} />
                <p
                  className="reportButton"
                  onClick={() => navigate("/bazaarreport")}
                >
                  View Report
                </p>
                <img src={LogoGo} alt={"Logo"} style={{ width: "10.67px", height: "10.67px" }} />
              </div>
            </Grid>
          </Grid>
          <Grid container spacing={2}>
            <Grid item lg={6} md={6} sm={12} className="wholesellerBadge">
              <BazaarReportCard
                title="Total Wholesellers"
                count={Allfilterwholeseller?.length || 0}
                revenue="Total revenue Earned"
                prize={`Rs. ${totalwholesalerEarning || 0}`}
                bills="No of Bills"
                billsNumber={totalwholesalerBills || 0}
              />
            </Grid>

            <Grid item lg={6} md={6} sm={12} className="wholesellerBadge">
              <BazaarReportCard
                title="Total Agents"
                count={AllfilterAgent?.length || 0}
                revenue="Commission Paid"
                prize="0"
                bills="Customers Generated"
                billsNumber={"0"}
              />
            </Grid>

            <Grid item xs={12}>
              <FeaturesTab
                items={[
                  {
                    label: "Wholeseller (" + Allfilterwholeseller?.length + ")",
                    content: <ElectronicBazaarWholesellerList Allfilterwholeseller={Allfilterwholeseller} />,
                  },
                  {
                    label: "Agents (" + AllfilterAgent?.length + ")",
                    content: <ElectronicBazaarAgents AllfilterAgent={AllfilterAgent} />,
                  },
                  {
                    label: "Products (" + AllProducts + ")",
                    content: <ProductsList handleModalBackdrop={handleModalBackdrop} />,
                  },
                  {
                    label: "Group Category (" + Bazaardatacount + ")",
                    content: <GroupCategoryList handleModalBackdrop={Bazaardatas} />,
                  },
                ]}
              />
            </Grid>
          </Grid>
        </div>
      </DashboardLayout>
    </>
  );
};

export default ElectronicsBazaar;
