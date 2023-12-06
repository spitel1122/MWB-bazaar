import { AxiosRequestConfig } from "axios";
import http from "./http-common";
import { AnyRecord } from "dns";
export class AppService {
  static login(username: string, password: string) {
    // const response = await axios.get(`${BASE_URL}/bazaar/`);
    // return http.post("/login/", {
    // 	username,
    // 	password,
    //   });

    return http
      .post("/login/", {
        username,
        password,
      })
      .then((response) => {
        if (response.data.access) {
          localStorage.setItem("user", JSON.stringify(response.data));
        }

        return response.data;
      });
  }

  static getCurrentUser = () => {
    const userStr = localStorage.getItem("user");
    if (userStr) return JSON.parse(userStr);
    return null;
  };

  static authHeader() {
    const userStr = localStorage.getItem("user");
    let user = null;
    if (userStr) user = JSON.parse(userStr);

    if (user && user.access) {
      return { Authorization: "Bearer " + user.access }; // for Spring Boot back-end
      // return { 'x-access-token': user.accessToken };       // fo Node.js Express back-endr
    } else {
      return { Authorization: "" }; // for Spring Boot back-end
      // return { 'x-access-token': null }; // for Node Express back-end
    }
  }

  static getAllBazarList(datas?: any) {
    return http.get("bazaar/data/?page=" + datas, {
      headers: AppService.authHeader(),
    });
  }

  static getAllBazaar(param?: any) {
    return(
      param ?
          http.get(`bazaar/data/?page=${param}`, {
          headers: AppService.authHeader(),
        }) :
           http.get("bazaar/data/", {
            params: param,
            headers: AppService.authHeader(),
          })
    )
  }

  static getreportalldatas(id: any) {
    return http.get(`wholeseller/data/${id}/report/`, {
      headers: AppService.authHeader(),
    });
  }

  static getAllBazarListLiveSerach(datas: any) {
    return http.get("bazaar/data/?search=" + datas, {
      headers: AppService.authHeader(),
    });
  }

  static getAllBazarListSearch(datas: any) {
    return http.get("bazaar/data/?search=" + datas, {
      headers: AppService.authHeader(),
    });
  }
  static getAllBazarListwholeseller(ID: any) {
    return http.get("bazaar/data/" + `${ID}` + "/wholesellers-list/", {
      headers: AppService.authHeader(),
    });
  }

  static getAllBazarListwholesellerSearch(ID: any, items: any) {
    return http.get(
      "bazaar/data/" +
      `${ID}` +
      "/wholesellers-list/?search=" +
      `${items}` +
      "",
      { headers: AppService.authHeader() }
    );
  }
  static getAllBazarAgentList(ID: any) {
    return http.get("bazaar/data/" + `${ID}` + "/agents-list/", {
      headers: AppService.authHeader(),
    });
  }

  static getAllBazarAgentListSearch(ID: any, items: any) {
    return http.get(
      "bazaar/data/" + `${ID}` + "/agents-list/?search=" + `${items}` + "",
      { headers: AppService.authHeader() }
    );
  }

  static getAllBazarProductListSearch(ID: any, items: any) {
    return http.get(
      "bazaar/data/" + `${ID}` + "/products-list/?search=" + `${items}` + "",
      { headers: AppService.authHeader() }
    );
  }
  static  getAllBazarProductList(ID: any) {
    return http.get("bazaar/data/" + `${ID}` + "/products-list/", {
      headers: AppService.authHeader(),
    });
  }

  static getAllBazarProductListdel(ID: any) {
    return http.get(`bazaar/data/${ID}/`, {
      headers: AppService.authHeader(),
    });
  }

  static getAllAgentList(param?: any) {
    return http.get(`agent/data/`, {
      params:param,
      headers: AppService.authHeader(),
    });
  }

  static getAgentAllReport() {
    return http.get(`agent/report_plan`, {
      headers: AppService.authHeader(),
    });
  }

  static updateAgentKyc(id?: any, data?: any) {
    return http.put(`agent/data/${id}/`, data, {
      headers: AppService.authHeader(),
    });
  }
  static getAgentById(id?: any) {
    return http.get(`agent/data/${id}/`, {
      headers: AppService.authHeader(),
    });
  }
  static getAllwholesellerList() {
    return http.get("wholeseller/", { headers: AppService.authHeader() });
  }
  static listwholesalersearch(param?: any) {
    return http.get("wholeseller/data/", {
      params: param,
      headers: AppService.authHeader(),
    });
  }

  static getAllSummerys(param?: any) {
    return http.get("dashboard/summary/", { params: {y:param}, headers: AppService.authHeader() });
  }

  static getAllDashBazaarLists() {
    return http.get("dashboard/report/", { headers: AppService.authHeader() });
  }
  static getAllPlans() {
    return http.get("dashboard/plan/", { headers: AppService.authHeader() });
  }
  static getAllFeaturesPlans(param : any) {
    return http.get("plans/features/", {
      params: param,
      headers: AppService.authHeader(),
    });
  }
  static getAllPlansData() {
    return http.get("dashboard/plan-list/", {
      headers: AppService.authHeader(),
    });
  }

  static getAllStates(param?: any) {
    return http.get("location/state/", {
      params: param,
      headers: AppService.authHeader(),
    });
  }
  static getAllDistric(param?: any) {
    return http.get("location/district/", {
      params: param,
      headers: AppService.authHeader(),
    });
  }

  static getAllDistricByState(param?: any) {
    return http.get("location/g-dist/", {
      params: param,
      headers: AppService.authHeader(),
    });
  }

  static getAllLIstCity() {
    return http.get("location/city/", {
      headers: AppService.authHeader(),
    });
  }

  static getAllCity(param?: any) {
    return http.get("location/city/", {
      params: param,
      headers: AppService.authHeader(),
    });
  }
  static getAllCityByDis(param?: any) {
    return http.get("location/g-city/", {
      params: param,
      headers: AppService.authHeader(),
    });
  }

  static addBazars(data: any) {
    return http.post("bazaar/data/", data, {
      headers: AppService.authHeader(),
    });
  }
  static updateBazars(id: any, data: any) {
    return http.put("bazaar/data/" + id + "/", data, {
      headers: AppService.authHeader(),
    });
  }
  static getBazars(id: any) {
    return http.get("bazaar/data/" + id + "/", {
      headers: AppService.authHeader(),
    });
  }
  static addGroupCate(data: any) {
    return http.post("parentcategory/data/", data, {
      headers: AppService.authHeader(),
    });
  }
  static detailGroupCate(data: any) {
    return http.get("parentcategory/" + `${data}` + "/", {
      headers: AppService.authHeader(),
    });
  }
  static deleteGroupCate(data: any) {
    return http.delete("parentcategory/data/" + `${data}` + "/", {
      headers: AppService.authHeader(),
    });
  }
  static updateGroupCate(ID: any, data: any) {
    return http.put(`parentcategory/data/${ID}/`, data, {
      headers: AppService.authHeader(),
    });
  }
  static listGroupCate(param?: any) {
    return http.get("parentcategory/data/", {
      params: param,
      headers: AppService.authHeader()
    });
  }
  static listGroupCategoryById(id: number) {
    return http.get(`parentcategory/data/${id}/`, {
      headers: AppService.authHeader()
    });
  }
  static listGroupCateByBazaar(param?: any) {
    return http.get("parentcategory/filter/", {
      params: param,
      headers: AppService.authHeader(),
    });
  }

  static listCateByParent(param?: any) {
    return http.get("category/filter/", {
      params: param,
      headers: AppService.authHeader(),
    });
  }

  static listSubCateByCat(param?: any) {
    return http.get("subcategory/filter/", {
      params: param,
      headers: AppService.authHeader(),
    });
  }

  static getAllWeightList() {
    return http.get("product/weight/", { headers: AppService.authHeader() });
  }

  static getAllUnitList() {
    return http.get("product/unit/", { headers: AppService.authHeader() });
  }

  static getAllcitywise(id?: any) {
    return http.get(`bazaar/data/${id}/city-wise/`, { headers: AppService.authHeader() });
  }

  static gettotalincome(id?: any) {
    return http.get(`bazaar/data/${id}/total-income/`, { headers: AppService.authHeader() });
  }

  static gettotalorder(id: any) {
    return http.get(`bazaar/data/${id}/total-orders/`, { headers: AppService.authHeader() })
  }

  static getAlltopwholewise(id?: any) {
    return http.get(`bazaar/data/${id}/top-wholesellers/`, { headers: AppService.authHeader() });
  }

  static addMainCate(data: any) {
    return http.post("category/data/", data, {
      headers: AppService.authHeader(),
    });
  }
  static detailMainCate(data: any) {
    return http.get("category/" + `${data}` + "/", {
      headers: AppService.authHeader(),
    });
  }
  static detailMainCategoryById(id: number) {
    return http.get("category/data/" + `${id}` + "/", {
      headers: AppService.authHeader(),
    });
  }
  static deleteMainCate(data: any) {
    return http.delete("category/data/" + `${data}` + "/", {
      headers: AppService.authHeader(),
    });
  }
  static updateMainCate(ID: any, data: any) {
    return http.put(`category/data/${ID}/`, data, {
      headers: AppService.authHeader(),
    });
  }

  static listMaincategory() {
    return http.get("category/data/", { headers: AppService.authHeader() });
  }
  static listMaincategoryData(param?: any) {
    return http.get("category/filter/", {
      params: param,
      headers: AppService.authHeader()
    });
  }

  static addSubCate(data: any) {
    return http.post("subcategory/data/", data, {
      headers: AppService.authHeader(),
    });
  }
  static detailSubCate(data: any) {
    return http.get("subcategory/" + `${data}` + "/", {
      headers: AppService.authHeader(),
    });
  }
  static deleteSubCate(data: any) {
    return http.delete("subcategory/data/" + `${data}` + "/", {
      headers: AppService.authHeader(),
    });
  }
  static updateSubCate(ID: any, data: any) {
    return http.put("subcategory/data/" + `${ID}` + "/", data, {
      headers: AppService.authHeader(),
    });
  }

  static listSubcategory() {
    return http.get("subcategory/data/", { headers: AppService.authHeader() });
  }

  static subcategoryById(id: number) {
    return http.get(`subcategory/data/${id}/`, { headers: AppService.authHeader() });
  }

  static addPrdCate(data: any) {
    return http.post("product/data/", data, {
      headers: AppService.authHeader(),
    });
  }
  static updateProduct(id: any, data: any) {
    return http.put("product/data/" + `${id}` + "/", data, {
      headers: AppService.authHeader(),
    });
  }
  static detailPrdCate(data: any) {
    return http.get("product/" + `${data}` + "/", {
      headers: AppService.authHeader(),
    });
  }
  static deletePrdCate(data: any) {
    return http.delete("product/" + `${data}` + "/", {
      headers: AppService.authHeader(),
    });
  }
  static deleteProduct(id: any) {
    return http.delete("product/data/" + `${id}` + "/", {
      headers: AppService.authHeader(),
    });
  }
  static detailProduct(data: any) {
    return http.get("product/data/" + `${data}` + "/", {
      headers: AppService.authHeader(),
    });
  }
  static updatePrdCate(ID: any, data: any) {
    return http.put("product/" + `${ID}` + "/", data, {
      headers: AppService.authHeader(),
    });
  }
  static listPrdproducts() {
    return http.get("product/data/", {
      headers: AppService.authHeader()
    });
  }
  static listPrdproductsAll(param?: any) {
    return http.get("product/data/", {
      params: param,
      headers: AppService.authHeader()
    });
  }
  static AgentCommissionRedeem(param?: any) {
    return http.get("agent/agent-commision-redeem/", {  
      params: param,
      headers: AppService.authHeader(),
    });
  }
  static DetailAgentCommissionRedeem(id?: any) {
    return http.get(`agent/agent-commision-redeem/${id}/`, {
      headers: AppService.authHeader(),
    });
  }
  static AgentCommissionRedeemCreate(data: any) {
    return http.post("agent/agent-commision-redeem/", data, {
      headers: AppService.authHeader(),
    });
  }
  static AgentCommissionRedeemUpdate(id: any, data: any) {
    return http.put(`agent/agent-commision-redeem/${id}/`, data, {
      headers: AppService.authHeader(),
    });
  }
  static deleteAgentCommissionRedeem(id: any) {
    return http.delete(`agent/agent-commision-redeem/${id}/`, {
      headers: AppService.authHeader(),
    });
  }
  static listproductsbysubcat(param?: any) {
    return http.get("product/filter/", {
      params: param,
      headers: AppService.authHeader(),
    });
  }
  static bazaarBulkPuload(data: any) {
    return http.post("bazaar/csv/upload_data/", data, {
      headers: AppService.authHeader(),
    });
  }
  static getPlans(param?: any) {
    return(
      param ? 
      http.get(`plans/data/?page=${param}`,{
        headers: AppService.authHeader(),
      }) : http.get(`plans/data/`,{
        headers: AppService.authHeader(),
      }) 
    );
    
  }
  static getPlanById(id: any) {
    return http.get("plans/data/" + id + "/", {
      headers: AppService.authHeader(),
    });
  }
  static CreatePayment(data: any) {
    return http.post("payment/data/", data, {
      headers: AppService.authHeader(),
    });
  }
  static addNewPlan(data: any) {
    return http.post("plans/data/", data, {
      headers: AppService.authHeader(),
    });
  }

  static updatePlan(id: any, data: any) {
    return http.put("plans/data/" + id + "/", data, {
      headers: AppService.authHeader(),
    });
  }

  static removePlan(id: any) {
    return http.delete("plans/data/" + id + "/", {
      headers: AppService.authHeader(),
    });
  }

  static addFeature(data: any) {
    return http.post("plans/features/", data, {
      headers: AppService.authHeader(),
    });
  }
  static listFeatures() {
    return http.get("plans/features/", {
      headers: AppService.authHeader(),
    });
  }
  static listFeaturesAll(param?: any) {
    return http.get("plans/features/", {
      params: param,
      headers: AppService.authHeader(),
    });
  }
  static getPlanFeaturesById(id?: any) {
    return http.get(`plans/features/${id}/`, {
      headers: AppService.authHeader(),
    });
  }
  static deleteFeature(data: any) {
    return http.delete("plans/features/" + `${data}` + "/", {
      headers: AppService.authHeader(),
    });
  }
  static editFeature(id: any, data: any) {
    return http.put("plans/features/" + id + "/", data, {
      headers: AppService.authHeader(),
    });
  }
  static addAgent(data: any) {
    return http.post("agent/data/", data, {
      headers: AppService.authHeader(),
    });
  }
  static addState(data: any) {
    return http.post("location/state/", data, {
      headers: AppService.authHeader(),
    });
  }
  static addDistrict(data: any) {
    return http.post("location/district/", data, {
      headers: AppService.authHeader(),
    });
  }
  static getAllDistricById(id?: any) {
    return http.get(`location/district/${id}/`, {
      headers: AppService.authHeader(),
    });
  }
  static addCity(data: any) {
    return http.post("location/city/", data, {
      headers: AppService.authHeader(),
    });
  }
  static updateState(id: any, data: any) {
    return http.put("location/state/" + id + "/", data, {
      headers: AppService.authHeader(),
    });
  }
  static updateDistrict(id: any, data: any) {
    return http.put("location/district/" + id + "/", data, {
      headers: AppService.authHeader(),
    });
  }
  static updateCity(id: any, data: any) {
    return http.put("location/city/" + id + "/", data, {
      headers: AppService.authHeader(),
    });
  }

  static getUnitsWeight(param: any) {
    return http.get("master/unit/?unit_type=WEIGHT", {
      params: param,
      headers: AppService.authHeader(),
    });
  }
  static getUnitsQuantitiy(param: any) {
    return http.get("master/unit/?unit_type=QUANTITY", {
      params: param,
      headers: AppService.authHeader(),
    });
  }

  static addUnits(data: any) {
    return http.post("master/unit/", data, {
      headers: AppService.authHeader(),
    });
  }
  static editUnits(id: any, data: any) {
    return http.put(`master/unit/${id}/`, data, {
      headers: AppService.authHeader(),
    });
  }
  static deleteUnits(data: any) {
    return http.delete("master/unit/", {
      headers: AppService.authHeader(),
    });
  }
  static getUnits(param?: any) {
    return http.get("master/unit/", {
      params: param,
      headers: AppService.authHeader(),
    });
  }
  static getUnitsById(id?: any) {
    return http.get(`master/unit/${id}/`, {
      headers: AppService.authHeader(),
    });
  }
  static addWholesellerType(data: any) {
    return http.post("master/wholeseller-type/", data, {
      headers: AppService.authHeader(),
    });
  }
  static getWholesellerType(param: any) {
    return http.get("master/wholeseller-type/", {
      params: param,
      headers: AppService.authHeader(),
    });
  }
  static editWholesellerType(id: any, data: any) {
    return http.put(`master/wholeseller-type/${id}/`, data, {
      headers: AppService.authHeader(),
    });
  }
  static kycApproveWholeseller(id: any, data: any) {
    return http.put(`wholeseller/data/${id}/`, data, {
      headers: AppService.authHeader(),
    });
  }
  static addRetailerType(data: any) {
    return http.post("master/retailer-type/", data, {
      headers: AppService.authHeader(),
    });
  }
  static getRetailerType(param: any) {
    return http.get("master/retailer-type/", {
      params: param,
      headers: AppService.authHeader(),
    });
  }
  static getColour() {
    return http.get("master/colour/", {
      headers: AppService.authHeader(),
    });
  }
  static getSize() {
    return http.get("master/size/", {
      headers: AppService.authHeader(),
    });
  }
  static editRetailerType(id: any, data: any) {
    return http.put(`master/retailer-type/${id}/`, data, {
      headers: AppService.authHeader(),
    });
  }

  static deleteAgent(id?: any) {
    return http.delete(`agent/data/${id}/`, {
      headers: AppService.authHeader(),
    });
  }
  static kycApproveAgent(id: any, data: any) {
    return http.put(`agent/data/${id}/`, data, {
      headers: AppService.authHeader(),
    });
  }
  static agentCommissionUpdate(id: any, data: any) {
    return http.put(`agent/commision/${id}/`, data, {
      headers: AppService.authHeader(),
    });
  }
  static addAgency(data: any) {
    return http.post("agency/data/", data, {
      headers: AppService.authHeader(),
    });
  }
  static updateAgency(id: any, data: any) {
    return http.put(`agency/data/${id}/`, data, {
      headers: AppService.authHeader(),
    });
  }
  static getAgency(id: any) {
    return http.get(`agency/data/${id}/`, {
      headers: AppService.authHeader(),
    });
  }
  static getAgentByWholsellerList(id: any) {
    return http.get(`agent/data/${id}/wholeseller-list/`, {
      headers: AppService.authHeader(),
    });
  }

  static getAgentByfilter(parms: any) {
    return http.get(`agent/data/`, {
      params: parms,
      headers: AppService.authHeader(),
    });
  }
  static getTotalStates(param?: any) {
    return http.get("location/allstate/", {
      headers: AppService.authHeader(),
    });
  }
  static getTotalDistrict(param?: any) {
    return http.get("location/alldistrict/", {
      headers: AppService.authHeader(),
    });
  }

  static getTotalCity(param?: any) {
    return http.get("location/allstate/", {
      headers: AppService.authHeader(),
    });
  }

  static addWholeseller(data: any) {
    return http.post("wholeseller/data/", data, {
      headers: AppService.authHeader(),
    });
  }
  static updateWholeseller(id: any, data: any) {
    return http.put("wholeseller/data/" + id + "/", data, {
      headers: AppService.authHeader(),
    });
  }

  static getAllListwholesellerNew() {
    return http.get("wholeseller/data/", {
      headers: AppService.authHeader(),
    });
  }

  static getAllWholesellerListM(param?: any) {
    return http.get("wholeseller/data/", {
      params: param,
      headers: AppService.authHeader(),
    });
  }
  static getAllWholesellerRetailer(param?: any) {
    return http.get("wholeseller/retailer/", {
      params: param,
      headers: AppService.authHeader(),
    });
  }
  static getWholesalerBranch(param?: any) {
    return http.get("wholeseller/branch/", {
      params: param,
      headers: AppService.authHeader(),
    });
  }
  static getRetailerTypeById(id?: any) {
    return http.get(`master/retailer-type/${id}`, {
      headers: AppService.authHeader(),
    });
  }
  static deleteWholeseller(id?: any) {
    return http.delete(`wholeseller/data/${id}/`, {
      headers: AppService.authHeader(),
    });
  }
  static deleteWholesellerBranch(id?: any) {
    return http.delete(`api/wholeseller/branch/${id}/`, {
      headers: AppService.authHeader(),
    });
  }
  static deleteWholesellerRetailer(id?: any) {
    return http.delete(`api/retailer/data/${id}/`, {
      headers: AppService.authHeader(),
    });
  }
  static getWholesellerById(id?: any) {
    return http.get(`wholeseller/data/${id}/`, {
      headers: AppService.authHeader(),
    });
  }
  static getCitywiseWholeseller(id?: any) {
    return http.get(`wholeseller/data/${id}/report/city-wise-business/`, {
      headers: AppService.authHeader(),
    });
  }
  static getWholesellerRealSale(id?: any) {
    return http.get(`wholeseller/data/${id}/report/realtime-sale/`, {
      headers: AppService.authHeader(),
    });
  }
  static getWholesellerTotalOrders(id?: any) {
    return http.get(`wholeseller/data/${id}/report/total-order/`, {
      headers: AppService.authHeader(),
    });
  }
  static getWholesellerTotalIncome(id?: any) {
    return http.get(`wholeseller/data/${id}/report/total-income/`, {
      headers: AppService.authHeader(),
    });
  }
  static getWholesellerProducts(id?: any) {
    return http.get(`wholeseller/data/${id}/product/`, {
      headers: AppService.authHeader(),
    });
  }
  static getWholesellerTopProducts(id?: any) {
    return http.get(`wholeseller/data/${id}/report/top-products/`, {
      headers: AppService.authHeader(),
    });
  }
  static getWholesellerNewRetailers(id?: any) {
    return http.get(`wholeseller/data/${id}/report/new-retailers/`, {
      headers: AppService.authHeader(),
    });
  }
  static getWholesellerTransactionHistory(id?: any) {
    return http.get(`wholeseller/data/${id}/report/transaction-history/`, {
      headers: AppService.authHeader(),
    });
  }

  static Postrefrence(data: any) {
    return http.post("ads/referral/", data, {
      headers: AppService.authHeader(),
    });
  }
  static getAdsAllData() {
    return http.get(`ads/data/`, { headers: AppService.authHeader() })
  }
  static getAllrefrence() {
    return http.get(`ads/referral/`, { headers: AppService.authHeader() })
  }
  static newwholeseller(id?: any) {
    return http.get(`bazaar/data/${id}/new-wholesellers/`, { headers: AppService.authHeader() });
  }

  static getAllplanToday(param?: any) {
    return http.get("dashboard/plan/", {
      params: {q:param},
      headers: AppService.authHeader(),
    });
  }
  static getAllreportToday(param?: any) {
    return http.get("dashboard/report/", {
      params: {q:param},
      headers: AppService.authHeader(),
    });
  }
  static getAllreportfilterbazzar(param?: any) {
    return http.get("dashboard/report/", {
      params:param,
      headers: AppService.authHeader(),
    });
  }
  static getAllplanfilterbazzar(param?: any) {
    return http.get("dashboard/plan/", {
      params:param,
      headers: AppService.authHeader(),
    });
  }
}
