import { css } from "@emotion/css";

export const useAgentDetailsStyle = () => ({
    root: css`
    width: 100%;
    padding-top: 20px;
    padding-bottom: 20px;

    .user-avatar {
      .amenity-avatar {
        width: 32px !important;
        height: 32px !important;
        font-size: 12px;
        border-radius: 50%;
        span{
          font-size: 14px;
        }
      }
    }
    .view-more-button {
      position: absolute !important;
      bottom: 0 !important;
      width: 84% !important;
    }
    .tag {
      background: #e6f6ff;
      border-radius: 6px;
      padding: 10px;
      display: flex;
      justify-content: center;

      .tagTitle {
        font-family: "Manrope", serif;
        font-style: normal;
        font-weight: 600;
        font-size: 12px;
        line-height: 18px;
        color: #00a5ff;
      }
    }
      
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
      .switch-main{
        .switch {
          position: relative;
          display: inline-block;
          width: 44px;
          height: 24px;
        }
    
        .switch input {
          opacity: 0;
          width: 0;
          height: 0;
        }
    
        .slider {
          position: absolute;
          cursor: pointer;
          top: 0;
          left: 0px;
          right: 0;
          bottom: 0;
          background-color: #ccc;
          -webkit-transition: 0.4s;
          transition: 0.4s;
        }
    
        .slider:before {
          position: absolute;
          content: "";
          height: 20px;
          width: 20px;
          left: 2px;
          bottom: 2px;
          background-color: white;
          -webkit-transition: 0.4s;
          transition: 0.4s;
        }
    
        input:checked + .slider {
          background-color: #5542f6;
        }
    
        input:focus + .slider {
          box-shadow: 0 0 1px #2196f3;
        }
    
        input:checked + .slider:before {
          -webkit-transform: translateX(20px);
          -ms-transform: translateX(20px);
          transform: translateX(20px);
        }
    
        /* Rounded sliders */
        .slider.round {
          border-radius: 34px;
        }
    
        .slider.round:before {
          border-radius: 50%;
        }
      }
      .viewproduct-modal {
        right: 0;
        visibility: visible;
        width: calc(100% - 50px);
        max-width: 350px;
        height: 100vh;
        position: fixed;
        top: 0;
        bottom: 0;
        background-color: var(--text-white);
        box-shadow: 0 0 5px 2px rgb(0 0 0 / 5%);
        z-index: 999999;
        visibility: hidden;
        text-align: left;
        right: -100%;
        -webkit-transition: all 300ms ease-in-out;
        -moz-transition: all 300ms ease-in-out;
        -ms-transition: all 300ms ease-in-out;
        -o-transition: all 300ms ease-in-out;
        transition: all 300ms ease-in-out;
        overflow-y: auto;
        padding: 30px;
      }
      .viewproduct-modal.active{
        right: 0;
        visibility: visible;
        color: #000;
        background: #fff;
      }
  `,
});
