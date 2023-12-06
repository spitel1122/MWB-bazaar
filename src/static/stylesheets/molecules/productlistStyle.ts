import { css } from "@emotion/css";

export const useProductListStyles = () => {
  return {
    root: css`
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
        padding-right: 40px;
        border-bottom: 1px solid #e1e1e1;
      }
      th {
        text-align: left;
        padding-top: 10px;
        padding-bottom: 10px;
      }

      .brandData {
        display: flex;
        gap: 20px;
        align-items: center;
      }

      .brandLogo {
        width: 25px;
      }

      .status {
        color: #ffa043;
        background: #fff6ed;
        border-radius: 5px;
        padding: 10px;
        width: 100px;
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
    editproductDialog: css`
    padding: 44px;
    max-width: 850px;

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
    .uploadCard {
      cursor: pointer;
      padding: 10px;
      // width: 500px;
      background: #ffffff;
      border: 2px dashed #e1e1e1;
      border-radius: 5.30337px;
      padding: 20px;
      text-align: center;
      display: flex;
      justify-content: center;
      align-items: center;

      .uploadIcon {
        display: flex;
        justify-content: center;

        img {
          width: 40px;
          height: 40px;
        }
      }
    }
    `
  };
};
