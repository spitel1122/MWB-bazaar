import { css } from "@emotion/css";

export const useWholesellerListStyles = () => ({
  root: css`
    width: 100%;
    padding-top: 20px;
    padding-bottom: 20px;

    .headTitle {
      font-family: "Manrope", serif;
      font-style: normal;
      font-weight: 600;
      font-size: 24px;
      line-height: 33px;
      letter-spacing: 0.2px;
      color: #000000;
    }

    .actionArea {
      display: flex;
      justify-content: end;
      gap: 20px;
    }

    .wholesellerFilter {
      display: flex;
      gap: 20px;
      padding-top: 20px;
      padding-bottom: 20px;
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
    table {
      width: 100%;
      font-size: 14px;
      font-family: "Manrope", serif;
      font-style: normal;
      font-weight: 600;
      cursor: pointer;
    }
    th {
      font-family: "Manrope", serif;
      font-style: normal;
      font-weight: 600;
      font-size: 14px;
      line-height: 18px;
      color: #84818a;
      width: auto;
      padding-top: 30px;
      padding-bottom: 30px;
      text-align: left;
      border-bottom: 1px solid #e1e1e1;
    }
    td {
      font-family: "Manrope", serif;
      font-style: normal;
      font-weight: 600;
      font-size: 14px;
      line-height: 20px;
      text-align: left;
      padding-top: 20px;
      padding-bottom: 20px;
      padding-right: 20px;
      border-bottom: 1px solid #e1e1e1;
      white-space: nowrap;
    }
    th {
      text-align: left;
      padding-top: 10px;
      padding-bottom: 10px;
    }
    td.overlap {
      max-width: 160px;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }
    .viewkyc-modal {
      right: 0;
      visibility: visible;
      width: calc(100% - 50px);
      max-width: 554px;
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
    .viewkyc-modal.active{
      right: 0;
      visibility: visible;
      color: #000;
      background: #fff;
    }
    .kycmodal-main{
      padding: 30px;

    .modalHead {
      display: flex;
      justify-content: space-between;
      cursor: pointer;
    }

    .modalTitle {
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
        padding-bottom: 10px;
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
    }
  `,

  addDialog: css`
    padding: 44px;
    width: 600px;

    .modalHead {
      display: flex;
      justify-content: space-between;
      cursor: pointer;
    }

    .modalTitle {
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
