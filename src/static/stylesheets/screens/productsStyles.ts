import { css } from "@emotion/css";

export const useProductsStyles = () => ({
  root: css`
    width: 100%;
    padding-top: 20px;
    padding-bottom: 20px;

    .headContainer {
      display: flex;
      gap: 20px;
      justify-content: space-between;

      .headTitle {
        font-family: "Manrope", serif;
        font-style: normal;
        font-weight: 600;
        font-size: 24px;
        line-height: 20px;
        color: #2e2c34;
      }

      .actionButton {
        display: flex;
        gap: 20px;
      }
    }

    .leftContent{
      align-items: center;
    }

    .product-search{
      display: flex;
      justify-content: space-between;
      padding: 30px 0 25px;
      align-items: center;
      flex-wrap: wrap;
    }
    .product-image{
      width: 37px !important;
      height: 37px !important;
      border: 1px solid #e1e1e1;
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

    .productFilters {
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

    .stockStatusTitle {
      font-family: "Manrope", serif;
      font-style: normal;
      font-weight: 500;
      font-size: 14px;
      line-height: 20px;
      color: #20c9ac;
    }

    .actionMenu {
      display: flex;
      gap: 20px;
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
  addDialog: css`
    padding: 44px;

    .reportTitle {
      font-family: "Manrope", serif;
      font-style: normal;
      font-weight: 600;
      font-size: 24px;
      line-height: 20px;
      color: #2e2c34;
    }

    .modalHead {
      display: flex;
      justify-content: space-between;
      cursor: pointer;
    }

    .barCode {
      img {
        width: 200px;
      }
    }

    .modalTitle {
      font-family: "Manrope", serif;
      font-style: normal;
      font-weight: 600;
      font-size: 24px;
      line-height: 33px;
      color: #2e2c34;
      padding-top: 5px;
      padding-top: 5px;
      padding-bottom: 5px;
    }

    .modalSubtitile {
      font-family: "Manrope", serif;
      font-style: normal;
      font-weight: 600;
      font-size: 18px;
      line-height: 25px;
      color: #4e2fa9;
      padding-top: 5px;
      padding-bottom: 5px;
    }

    .modalPrize {
      font-family: "Manrope", serif;
      font-style: normal;
      font-weight: 700;
      font-size: 22px;
      line-height: 20px;
      color: #2e2c34;
      padding-top: 5px;
      padding-bottom: 20px;
    }

    .statusTag {
      background: #e6f6ff;
      border-radius: 6px;
      padding: 5px;

      .tagTitle {
        font-family: "Manrope", serif;
        display: flex;
        justify-content: center;
        font-style: normal;
        font-weight: 600;
        font-size: 12px;
        line-height: 18px;
        color: #00a5ff;
      }
    }

    .groupTitle {
      font-family: "Manrope", serif;
      font-style: normal;
      font-weight: 600;
      font-size: 14px;
      line-height: 20px;
      color: #84818a;
    }

    .commonTitle {
      font-family: "Manrope", serif;
      font-style: normal;
      font-weight: 700;
      font-size: 16px;
      line-height: 20px;
      color: #2e2c34;
    }

    .commonSybtitle {
      font-family: "Manrope", serif;
      font-style: normal;
      font-weight: 400;
      font-size: 14px;
      line-height: 13px;
      color: #a39f9f;
    }
  `,
});
