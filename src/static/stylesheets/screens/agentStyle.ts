import { css } from "@emotion/css";

export const usAgentStyles = () => ({
  root: css`
    width: 100%;
    padding-top: 20px;
    padding-bottom: 20px;
    .mainTitle{
      @media(max-width: 991px) {
        font-size: 18px;
      }
    }
    .agent-wrapper{
      @media (max-width: 991px){

      }
    }
    .MuiPagination-root{
      background: #fff !important;
      ul{
        background: #fff;
        box-shadow: 2px 2px 20px -10px #000;
        margin-top: 30px;
        padding: 8px;
      }
    }
    .payment-request{
      @media(max-width: 650px) {
        display: block;
      }
    }
    .search-div{
      @media (max-width: 991px){
        margin-top: 15px;
        flex-wrap: wrap;
      }
      .relative{
        @media(max-width: 991px) {
          width: 100% !important;
        }
      }
      input{
        padding-right: 40px;
        @media(max-width: 991px) {
          width: 100%;
        }
      }
    }
    .search-main{
      @media(max-width: 650px) {
        width: 100% !important;
        margin-top: 10px;
      }
      input {
        padding-right: 40px;
        @media(max-width: 650px) {
          margin-right: 0;
        }
      }
    }
    .commonTitle {
      font-family: "Manrope", serif;
      font-style: normal;
      font-weight: 600;
      font-size: 24px;
      line-height: 20px;
      color: #2e2c34;
    }
    
    .paymentTitle{
      font-family: "Manrope", serif;
      font-style: normal;
      font-weight: 600;
      font-size: 14px;
      line-height: 20px;
      text-decoration-line: underline;
      color: #FF6652;
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
      font-size: 14px;
      line-height: 20px;
      font-weight: 500;
      color: #2E2C34;
    }
    .agent-dropdown {
      position: relative;
      .dropdown {
        position: absolute;
        right: 0;
        top: 100%;
        background: #ffffff;
        box-shadow: 0px 6px 20px rgb(0 0 0 / 10%);
        border-radius: 8px;
        display: none;
        flex-direction: column;
        width: 285px;
        a {
          padding: 12px 25px;
          border-bottom: 1px solid #f0f0f3;
          display: flex;
          gap: 15px;
          align-items: center;
          span.icon {
            background: #f6f6f6;
            border-radius: 8px;
            display:flex;
            align-items: center;
            justify-content: center;
            height: 36px;
            width: 36px;
          }
        }
      }
    }
    .agent-dropdown:hover img + .dropdown {
      display: flex !important;
      right:-20px;
      z-index: 999;
    }
    .viewagent-modal {
      right: 0;
      visibility: visible;
      width: calc(100% - 50px);
      max-width: 510px;
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
    }
    .viewagent-modal.active{
      right: 0;
      visibility: visible;
      color: #000;
      background: #fff;
    }
  `,

  AddDialog: css`
    width: 620px;
    @media(max-width: 575px) {
      width: 100%;
    }
    .pr-div{
      input{
        border: 1px solid #e1e1e1;
        outline: none;
        padding: 7px 15px;
        border-radius: 4px;
        font-size: 14px;
        color: #2E2C34;
      }
      .css-1a1fmpi-MuiInputBase-root-MuiInput-root:after, .css-1a1fmpi-MuiInputBase-root-MuiInput-root:before{
        border-bottom: none !important;
      }
    }
    .main-pr-div{
      input{
        border-bottom: none !important;
      }
    }
    .br-none-pr{
      input{
        border-right: none;
      }
    }
    .react-tel-input{
      input{
        width: 100%;
        border: 1px solid #e1e1e1;
      }
    }
    .pay-now-btn{
      width: 226px;
      height: 43px;
      background: #20C9AC;
      border-radius: 4px;
      font-weight: 600;
      font-size: 16px;
      line-height: 20px;
      color: #FFFFFF;
    }
    .reject-btn{
      width: 226px;
      height: 43px;
      background: transparent;
      border: 1px solid #FF6652;
      border-radius: 4px;
      font-weight: 600;
      font-size: 16px;
      line-height: 20px;
      color: #FF6652;
      margin-top: 15px;
    }
    .formTitle {
      font-weight: 600;
      font-size: 14px;
      line-height: 20px;
      color: #84818A;
      font-family: 'Manrope';
      margin-bottom: 5px
    }
    .css-tokvmb{
      font-size: 13px;
    }
  `,

  addDialog: css`
    padding: 44px;
    width: 500px;
    @media(max-width: 575px) {
      width: 100%;
    }
    .modalHead {
      display: flex;
      justify-content: space-between;
      cursor: pointer;
    }
    
    .rejectModalTitle{
      font-family: "Manrope", serif;
      font-style: normal;
      font-weight: 600;
      font-size: 25px;
      line-height: 34px;
      text-align: center;
      text-transform: capitalize;
      color: #2E2C34;
    }
    
    .comissionTitle{
      font-family: "Manrope", serif;
      font-style: normal;
      font-weight: 600;
      font-size: 25px;
      line-height: 34px;
      text-transform: capitalize;
      color: #2E2C34;
    }
    
    .fieldText{
      font-family: "Manrope", serif;
      font-style: normal;
      font-weight: 500;
      font-size: 12px;
      line-height: 18px;
      color: #84818A;
    }


    .modalTitle {
      font-family: "Manrope", serif;
      font-style: normal;
      font-weight: 600;
      font-size: 12px;
      line-height: 18px;
      color: #ffa043;
      background: #fff6ed;
      padding: 10px;
      border-radius: 6px;
      cursor: pointer;
    }

    .datContainer {
      display: flex;
      border-top: 1px solid #ebeaed;
      border-bottom: 1px solid #ebeaed;
      justify-content: space-between;
      padding-top: 20px;
      padding-bottom: 20px;

      .dataTitle {
        font-family: "Manrope", serif;
        font-style: normal;
        font-weight: 600;
        font-size: 14px;
        line-height: 20px;
        color: #84818a;
      }

      .metaData {
        font-family: "Manrope", serif;
        font-style: normal;
        font-weight: 600;
        font-size: 16px;
        line-height: 20px;
        text-align: right;
        color: #2e2c34;
      }

      .dataDescription {
        font-family: "Manrope", serif;
        font-style: normal;
        font-weight: 600;
        font-size: 16px;
        line-height: 20px;
        text-align: right;
        color: #ff6652;
      }
    }

    .attachment {
      display: flex;
      gap: 15px;

      img {
        width: 250px;
      }

      .attachmentHead {
        font-family: "Manrope", serif;
        font-style: normal;
        font-weight: 600;
        font-size: 16px;
        line-height: 20px;
        text-align: right;
        color: #ff6652;
        padding-top: 20px;
      }
    }

    .headTitle {
      display: flex;
      justify-content: space-between;
      padding-top: 20px;

      .martTitle {
        font-family: "Manrope", serif;
        font-style: normal;
        font-weight: 600;
        font-size: 28px;
        line-height: 36px;
        color: #2e2c34;
      }

      .martDescription {
        font-family: "Manrope", serif;
        font-style: normal;
        font-weight: 600;
        font-size: 16px;
        line-height: 18px;
        color: #4e2fa9;
        padding-top: 20px;
        padding-bottom: 20px;
      }
    }

    .title {
      font-family: "Manrope", serif;
      font-style: normal;
      font-weight: 600;
      font-size: 24px;
      line-height: 20px;
      color: #2e2c34;
      margin-bottom: 27px;
    }

    .select-master {
      margin-top: 26px;

      .input-label {
        font-family: "Manrope", serif;
        font-style: normal;
        font-weight: 500;
        font-size: 12px;
        line-height: 18px;
        color: #84818a;
      }
    }

    .action-bar {
      margin-top: 41px;
      display: flex;
      gap: 12px;
    }
  `,

  nativeDialog: css`
    @media (max-width: 575px) {
      width: 100%;
    }
    .modalHead {
      display: flex;
      justify-content: space-between;
      cursor: pointer;
    }
    
    .rejectModalTitle{
      font-family: "Manrope", serif;
      font-style: normal;
      font-weight: 600;
      font-size: 25px;
      line-height: 34px;
      text-align: center;
      text-transform: capitalize;
      color: #2E2C34;
    }
    
    .comissionTitle{
      font-family: "Manrope", serif;
      font-style: normal;
      font-weight: 600;
      font-size: 25px;
      line-height: 34px;
      text-transform: capitalize;
      color: #2E2C34;
    }
    
    .fieldText{
      font-family: "Manrope", serif;
      font-style: normal;
      font-weight: 500;
      font-size: 12px;
      line-height: 18px;
      color: #84818A;
    }


    .modalTitle {
      font-family: "Manrope", serif;
      font-style: normal;
      font-weight: 600;
      font-size: 12px;
      line-height: 18px;
      color: #ffa043;
      background: #fff6ed;
      padding: 10px;
      border-radius: 6px;
      cursor: pointer;
    }

    .datContainer {
      display: flex;
      border-top: 1px solid #ebeaed;
      border-bottom: 1px solid #ebeaed;
      justify-content: space-between;
      padding-top: 20px;
      padding-bottom: 20px;

      .dataTitle {
        font-family: "Manrope", serif;
        font-style: normal;
        font-weight: 600;
        font-size: 14px;
        line-height: 20px;
        color: #84818a;
      }

      .metaData {
        font-family: "Manrope", serif;
        font-style: normal;
        font-weight: 600;
        font-size: 16px;
        line-height: 20px;
        text-align: right;
        color: #2e2c34;
      }

      .dataDescription {
        font-family: "Manrope", serif;
        font-style: normal;
        font-weight: 600;
        font-size: 16px;
        line-height: 20px;
        text-align: right;
        color: #ff6652;
      }
    }

    .attachment {
      display: flex;
      gap: 15px;

      img {
        width: 250px;
      }

      .attachmentHead {
        font-family: "Manrope", serif;
        font-style: normal;
        font-weight: 600;
        font-size: 16px;
        line-height: 20px;
        text-align: right;
        color: #ff6652;
        padding-top: 20px;
      }
    }

    .headTitle {
      display: flex;
      justify-content: space-between;
      padding-top: 20px;

      .martTitle {
        font-family: "Manrope", serif;
        font-style: normal;
        font-weight: 600;
        font-size: 28px;
        line-height: 36px;
        color: #2e2c34;
      }

      .martDescription {
        font-family: "Manrope", serif;
        font-style: normal;
        font-weight: 600;
        font-size: 16px;
        line-height: 18px;
        color: #4e2fa9;
        padding-top: 20px;
        padding-bottom: 20px;
      }
    }

    .title {
      font-family: "Manrope", serif;
      font-style: normal;
      font-weight: 600;
      font-size: 24px;
      line-height: 20px;
      color: #2e2c34;
      margin-bottom: 27px;
    }

    .select-master {
      margin-top: 26px;

      .input-label {
        font-family: "Manrope", serif;
        font-style: normal;
        font-weight: 500;
        font-size: 12px;
        line-height: 18px;
        color: #84818a;
      }
    }

    .action-bar {
      margin-top: 41px;
      display: flex;
      gap: 12px;
    }
  `,
});
