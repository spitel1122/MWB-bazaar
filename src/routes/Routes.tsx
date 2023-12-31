import AddAdvertisement from "@/screens/AddAdvertisement";
import AddAgents from "@/screens/AddAgents";
import AddBazaar from "@/screens/AddBazaar";
import AddBranch from "@/screens/AddBranch";
import AddNewPlan from "@/screens/AddNewPlan";
import AddProduct from "@/screens/AddProduct";
import AddRetailers from "@/screens/AddRetailers";
import AddWholeseller from "@/screens/AddWholeseller";
import MasterList from "@/screens/Admin/MasterList";
import Advertisement from "@/screens/Advertisement";
import Agent from "@/screens/Agent";
import AgentKYC from "@/screens/AgentKYC";
import AgentEDIT from "@/screens/AgentEDIT";
import BazaarReport from "@/screens/BazaarReport";
import Bazaars from "@/screens/Bazars";
import Branch from "@/screens/Branch";
import BranchPlan from "@/screens/BranchPlan";
import BulkUpload from "@/screens/BulkUpload";
import CreateOffer from "@/screens/CreateOffer";
import CreateOrder from "@/screens/CreateOrder";
import Dashboard from "@/screens/Dashboard";
import EditOrder from "@/screens/EditOrder";
import ElectronicsBazaar from "@/screens/ElectronicsBazaar";
import ItemWisePlan from "@/screens/ItemWisePLan";
import Login from "@/screens/Login";
import Mwb from "@/screens/Mwb/Mwb";
import Offers from "@/screens/Offers";
import Order from "@/screens/Order";
import PhotoOrder from "@/screens/PhotoOrder";
import Plans from "@/screens/Plans";
import PlanEDIT from "@/screens/PlanEDIT"
import Products from "@/screens/Products";
import Retailers from "@/screens/Retailers";
import RevenewPlan from "@/screens/RevenewPlan";
import ReviewPlan from "@/screens/ReviewPlan";
import SubCategories from "@/screens/SubCategories";
import TrackOrder from "@/screens/TrackOrder";
import Wholeseller from "@/screens/Wholeseller";
import WholesellerDashboard from "@/screens/WholesellerDashboard";
import WholesellerKYC from "@/screens/WholesellerKYC";
import WholesellerLis from "@/screens/WholesellerList";
import WholesellerMart from "@/screens/WholesellerMart";
import RolePermission from "@/screens/RolePermission";
import RolesPermission from "@/screens/RolePermission/RolesPermission";
import AddRols from "@/screens/RolePermission/addRols";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { routePaths } from "./routePaths";
import AgentCommissionRedeemModel from "@/screens/AgentCommissionRedeemModel";
import AgentCommissionRedeemModelForm from "@/screens/AgentCommissionRedeemModelForm";
import AgentDetails from "@/screens/AgentDetails";
import PaymentDetails from "@/components/molecules/PaymentDetails/PaymentDetails";
import PaymentRequest from "@/screens/PaymentRequest";
import MakePayment from "@/screens/MakePayment";
import WholesalerDetails from "@/screens/WholesalerDetails/WholesalerDetails";
import CreateAdsnewplan from "@/screens/AddnewAdsplan";
import InvoiceViewData from "@/screens/InvoiceViewData";
import InvoiceView from "@/screens/invoiceAds";
import CreateClientAd from "@/screens/CreateClientAd";

const AppRoutes = (props: any) => {
  return (
    <>
      <Router>
        <Routes>
          <Route path={routePaths.root} element={<Login />} />
          <Route path={routePaths.login} element={<Login />} />
          <Route path={routePaths.mwb} element={<Mwb />} />
          <Route path={routePaths.dashboard} element={<Dashboard />} />
          <Route path={routePaths.newbazaars} element={<AddBazaar />} />
          <Route path={routePaths.updatebazaars} element={<AddBazaar />} />
          <Route path={routePaths.wholeseller} element={<Wholeseller />} />
          <Route
            path={routePaths.wholesellerlist}
            element={<WholesellerLis handleModalBackdrop={props.handleModalBackdrop} />}
          />
          <Route
            path={routePaths.wholesellerdashboard}
            element={<WholesellerDashboard />}
          />
          <Route
            path={routePaths.wholesellermart}
            element={<WholesellerMart />}
          />
          <Route path={routePaths.wholesellerproducts} element={<Products handleModalBackdrop={props.handleModalBackdrop} />} />
          <Route path={routePaths.agents} element={<Agent handleModalBackdrop={props.handleModalBackdrop} />} />
          <Route path={routePaths.addagent} element={<AddAgents />} />
          <Route path={routePaths.addagentId} element={<AddAgents />} />
          <Route path={routePaths.CreateAdclient} element={<CreateClientAd />} />
          <Route path={routePaths.CreateAdsplan} element={<CreateAdsnewplan/>}/>
          <Route path={routePaths.Createinvoiceview} element={<InvoiceView/>}/>
          <Route path={routePaths.CreateinvoiceviewData} element={<InvoiceViewData/>}/>
          <Route path={routePaths.agentkyc} element={<AgentKYC />} />
          <Route path={routePaths.agentedit} element={<AgentEDIT />} />
          <Route path={routePaths.plans} element={<Plans />} />
          <Route path={routePaths.planedit} element={<PlanEDIT />} />
          <Route path={routePaths.addnewplan} element={<AddNewPlan />} />
          <Route path={routePaths.updateplans} element={<AddNewPlan />} />
          <Route path={routePaths.Editwholeseller} element={<AddWholeseller/>}/>
          <Route path={routePaths.updateplan} element={<AddNewPlan />} />
          <Route path={routePaths.reviewplan} element={<ReviewPlan />} />
          <Route path={routePaths.makepayment} element={<MakePayment />} />

          <Route path={routePaths.retailers} element={<Retailers />} />
          <Route path={routePaths.addretailers} element={<AddRetailers />} />
          <Route path={routePaths.renewplan} element={<RevenewPlan />} />
          <Route path={routePaths.offers} element={<Offers />} />
          <Route path={routePaths.createoffer} element={<CreateOffer />} />
          <Route
            path={routePaths.addnewadvertisement}
            element={<AddAdvertisement />}
          />
          <Route path={routePaths.addbranch} element={<AddBranch />} />
          <Route path={routePaths.advertisement} element={<Advertisement />} />
          <Route path={routePaths.branch} element={<Branch />} />
          <Route path={routePaths.branchplan} element={<BranchPlan />} />
          <Route path={routePaths.createorder} element={<CreateOrder />} />
          <Route path={routePaths.editorder} element={<EditOrder />} />
          <Route path={routePaths.order} element={<Order />} />
          <Route path={routePaths.photoorder} element={<PhotoOrder />} />
          <Route path={routePaths.trackorder} element={<TrackOrder />} />
          <Route path={routePaths.addproduct} element={<AddProduct />} />
          <Route path={routePaths.bulkupload} element={<BulkUpload />} />
          <Route path={routePaths.agentdetails} element={<AgentDetails />} />
          <Route path={routePaths.wholesalerdetails} element={<WholesalerDetails handleModalBackdrop={props.handleModalBackdrop} />} />
          <Route path={routePaths.paymentrequest} element={<PaymentRequest />} />
          <Route
            path={routePaths.subcategories}
            element={
              <SubCategories
                formData={{
                  bazaar_name: undefined,
                }}
                setFormData={function (arg0: any): void {
                  throw new Error("Function not implemented.");
                }}
              />
            }
          />
          <Route
            path={routePaths.addwholeseller}
            element={<AddWholeseller />}
          />
          <Route
            path={routePaths.wholesellerkyc}
            element={<WholesellerKYC />}
          />
          <Route
            path={routePaths.electronicsbazaar}
            element={<ElectronicsBazaar handleModalBackdrop={props.handleModalBackdrop} />}
          />
          <Route path={routePaths.bazaarreport} element={<BazaarReport />} />
          <Route path={routePaths.itemwiseplan} element={<ItemWisePlan />} />
          <Route path={routePaths.admin.bazaars} element={<Bazaars />} />
          <Route path={routePaths.admin.masterList} element={<MasterList />} />
          <Route
            path={routePaths.agentCommissionRedeemModel}
            element={<AgentCommissionRedeemModel />}
          />
          <Route
            path={routePaths.createAgentCommissionRedeemModel}
            element={<AgentCommissionRedeemModelForm />}
          />
          <Route
            path={routePaths.rolePermission}
            element={<RolePermission />}
          />
          <Route
            path={routePaths.rolesPermissions}
            element={<RolesPermission />}
          />
          <Route path={routePaths.AddRols} element={<AddRols />} />
        </Routes>
      </Router>
    </>
  );
};

export { AppRoutes as Routes };
