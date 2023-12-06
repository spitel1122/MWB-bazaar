import { css } from "@emotion/css";

export const useNewWholesellerStyles = () => {
  return {
    root: css`
      max-width: 100%;
      padding-top: 30px;
      padding-bottom: 30px;
      display: block;
      .bazaarplan-div{
        @media (max-width: 599px) {
          display: block;
          width: 100%;
        }
        div:first-child{
          @media (max-width: 599px) {
            padding-right: 0 !important;
          }
        }
      }
      .label-main{
        font-family: 'Manrope';
        font-style: normal;
        font-weight: 500;
        font-size: 12px;
        line-height: 18px;
        color: #84818A;
      }
      
      .field {
        padding-top: 50px;
        input{
          font-size: 14px !important;
        }
        label{
          font-size: 12px !important;
        }
      }

      .fieldTitle{
        font-family: "Manrope", serif;
        font-style: normal;
        font-weight: 500;
        font-size: 12px;
        line-height: 18px;
        color: #84818A;

      }

      .bazaarField {
        padding-top: 20px;
        padding-bottom: 20px;
      }

      .cityField {
        padding-top: 20px;
        padding-bottom: 20px;
      }

      .stateField {
        padding-top: 20px;
        padding-bottom: 20px;
        display: flex;
        gap: 12px;
      }

      .action-bar {
        margin-top: 41px;
        display: flex;
        gap: 12px;
      }

      .headContainer {
        display: flex;
        gap: 20px;
        text-align: center;
        align-items: center;

        .icon {
          img {
            width: 10px;
            cursor: pointer;
          }
        }
      }

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
        padding-top: 20px;
        padding-bottom: 20px;
      }
    `,
  };
};
