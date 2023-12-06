import { css } from "@emotion/css";

export const useWholesalerDetailsStyle = () => ({
    root: css`
    width: 100%;
    padding-top: 20px;
    padding-bottom: 20px;
      
      .agentHeadtitle{
        font-family: "Manrope", serif;
        font-style: normal;
        font-weight: 700;
        font-size: 20px;
        line-height: 27px;
        color: #2E2C34;
      }
      td{
        font-weight: 500 !important;
        font-size: 14px !important;
        line-height: 20px !important;
        color: #2E2C34 !important;
      }
      td.person-details {
        position: relative;
        cursor: pointer;
        .person-model {
          position: absolute;
          padding: 15px;
          background: #ffffff;
          box-shadow: 0px 6px 20px rgb(0 0 0 / 10%);
          border-radius: 8px;
          width: 195px;
          z-index: 9999;
          display: none;
          .job-title {
            background: rgba(0, 165, 255, 0.1);
            border-radius: 4px;
            font-weight: 600;
            font-size: 12px;
            line-height: 18px;
            font-family: "Manrope";
            color: #00a5ff;
            padding: 4px 10px;
          }
        }
      }
      td.person-details:hover .person-model {
        display: flex;
      }
      .monthwise-btn {
        background: #fff; 
        color: #fff; 
        font-size: 14px; 
        width: 164px; 
        height: 40px; 
        border-top-left-radius: 4px; 
        border-bottom-left-radius: 4px;
        color: #4E2FA9; 
        border: 1px solid #4E2FA9;
      }
      .monthwise-btn.active{
        background: #4E2FA9;
        color: #fff;
      }
      .monthwise-disable-btn{
        background: #fff; 
        color: #4E2FA9; 
        font-size: 14px; 
        width: 164px; 
        height: 40px; 
        border: 1px solid #4E2FA9;
        border-top-right-radius: 4px; 
        border-bottom-right-radius: 4px;
      }
      .monthwise-disable-btn.active{
        background: #4E2FA9;
        color: #fff;
      }
      .year-selection{
        font-size: 14px;
        .MuiSelect-select{
          padding: 7px 15px;
          padding-right: 32px;
        }
      }
      .agentSubtitle{
        font-family: "Manrope", serif;
        font-style: normal;
        font-weight: 400;
        font-size: 16px;
        line-height: 18px;
        color: #84818A;
      }
      .statusTitle{
        font-family: "Manrope", serif;
        font-style: normal;
        color: #FFA043;
        font-weight: 600;
        font-size: 12px;
        line-height: 18px;
      }
      
      .agentTitle{
        font-family: "Manrope", serif;
        font-style: normal;
        font-weight: 600;
        font-size: 14px;
        line-height: 20px;
        color: #84818A;
      }
      
      .agentSubtitle{
        font-family: "Manrope", serif;
        font-style: normal;
        font-weight: 500;
        font-size: 16px;
        line-height: 20px;
        color: #2E2C34;
      }
      
      .agencydetailstitle{
        font-family: "Manrope", serif;
        font-style: normal;
        font-weight: 600;
        font-size: 18px;
        line-height: 27px;
        color: #4E2FA9;
      }

      .tableTitle {
        font-family: "Manrope", serif;
        font-style: normal;
        font-weight: 600;
        font-size: 14px;
        line-height: 20px;
        color: #84818A;
      }

      .tableContentTitle {
        font-family: "Manrope", serif;
        font-style: normal;
        font-weight: 500;
        font-size: 14px;
        line-height: 20px;
        color: #2E2C34;
      }
      
      .tableData {
        font-family: "Manrope", serif;
        font-style: normal;
        font-weight: 600;
        font-size: 14px;
        line-height: 20px;
        color: #000000;
        .css-1vc8cn7{
          display: flex;
          justify-content: end;
        }
      }
      
      .agentpaymentTitle{
        font-family: "Manrope", serif;
        font-style: normal;
        font-weight: 600;
        font-size: 16px;
        line-height: 22px;
        color: #4E2FA9;
      }
      
      .blancetitle{
        font-family: "Manrope", serif;
        font-style: normal;
        font-weight: 600;
        font-size: 32px;
        line-height: 40px;
        text-align: right;
        color: #2E2C34;
        @media (max-width: 991px) {
          font-size: 19px;
          line-height: 7px;
        }
      }

      .updatebtn{
        font-size: 14px;
        border-radius: 4px;
        background: #4E2FA9;
        color: #fff;
        padding: 10px 15px;
      }
      
      .mainheadYTitle{
        font-family: "Manrope", serif;
        font-style: normal;
        font-weight: 600;
        font-size: 16px;
        line-height: 22px;
        color: #2E2C34;
      }
      
      .prcontainer{
        background: #FFFFFF;
        box-shadow: 0px 4px 24px rgba(64, 64, 64, 0.08);
        border-radius: 4px;
      }
      
      .prtitle{
        font-family: "Manrope", serif;
        font-style: normal;
        font-weight: 500;
        font-size: 14px;
        line-height: 20px;
        color: #2E2C34;
      }
      
      .citycontainer{
        background: #FFFFFF;
        box-shadow: 0px 4px 24px rgba(64, 64, 64, 0.08);
        border-radius: 4px;
      }
      
      .cityThead{
        font-family: "Manrope", serif;
        font-style: normal;
        font-weight: 600;
        font-size: 16px;
        line-height: 22px;
        color: #2E2C34;
      }
      
      .citydrop{
        font-family: "Manrope", serif;
        font-style: normal;
        font-weight: 500;
        font-size: 14px;
        line-height: 20px;
        color: #504F54;
      }
      
      .cityTablehead{
        font-family: "Manrope", serif;
        font-style: normal;
        font-weight: 600;
        font-size: 12px;
        line-height: 18px;
        color: #84818A;
      }
      
      .cityTabledata{
        font-family: "Manrope", serif;
        font-style: normal;
        font-weight: 600;
        font-size: 14px;
        line-height: 20px;
        color: #2E2C34;
      }
      
      .cityButton{
        font-family: "Manrope", serif;
        font-style: normal;
        font-weight: 600;
        font-size: 14px;
        line-height: 20px;
        text-align: right;
        color: #4E2FA9;
      }
      
      .planTitle{
        font-family: "Manrope", serif;
        font-style: normal;
        font-weight: 600;
        font-size: 14px;
        line-height: 20px;
        color: #2E2C34;
      }
      
      .planSubtitle{
        font-family: "Manrope", serif;
        font-style: normal;
        font-weight: 500;
        font-size: 12px;
        line-height: 18px;
        color: #84818A;
      }
      .wtitle{
        font-family: "Manrope", serif;
        font-style: normal;
        font-weight: 600;
        font-size: 16px;
        line-height: 22px;
        color: #2E2C34;
      }
      
      .calanderHead{
        font-family: "Manrope", serif;
        font-style: normal;
        font-weight: 600;
        font-size: 16px;
        line-height: 22px;
        color: #FFFFFF;
      }
      
      .calanderTitle{
        font-family: "Manrope", serif;
        font-style: normal;
        font-weight: 600;
        font-size: 14px;
        line-height: 19px;
        color: #2E2C34;
      }
      
      .calanderSubtitle{
        font-family: "Manrope", serif;
        font-style: normal;
        font-weight: 600;
        font-size: 32px;
        line-height: 40px;
        color: #2E2C34;

      }
  `,
});
