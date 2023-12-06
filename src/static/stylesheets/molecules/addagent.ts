import { css } from "@emotion/css";

export const useaddAgentStyle = () => {
  return {
    root: css`
      width: 100%;
      padding-bottom: 20px;
      
      .title-main{
        font-family: "Manrope", serif;
        font-style: normal;
        font-weight: 500;
        font-size: 12px;
        line-height: 18px;
        color: #84818A;
      }
      
      .fieldTitle{
        font-family: "Manrope", serif;
        font-style: normal;
        font-weight: 500;
        font-size: 12px;
        line-height: 18px;
        color: #84818A;
      }

      .headContainer {
        display: flex;
        gap: 20px;
        text-align: center;

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
      .privacyButton{
        font-family: "Manrope", serif;
        font-style: normal;
        font-weight: 500;
        font-size: 18px;
        line-height: 34px;
        color: #4E2FA9;
      }
      
      .planTitle{
        font-family: "Manrope", serif;
        font-style: normal;
        font-weight: 500;
        font-size: 14px;
        line-height: 20px;
        color: #84818A;
      }
      
      .react-tel-input .form-control {
        height: 48px;
        border-top: none;
        border-left: none;
        border-right: none;
        width: 100%;
        font-size: 16px;
      }
      .react-tel-input .flag-dropdown {
        border-top: none;
        border-left: none;
        border-right: none;
        background-color: white;
        border-radius: none;
      }
      .textContainer {
        padding-top: 39px;
        padding-bottom: 57px;
        display:flex;
        align-items:center;

        .titleHead {
          font-family: "Manrope", serif;
          font-style: normal;
          font-weight: 600;
          font-size: 24px;
          line-height: 33px;
          letter-spacing: 0.2px;
          color: #2e2c34;
        }

        .titleDescription {
          font-family: "Manrope", serif;
          font-style: normal;
          font-weight: 600;
          font-size: 24px;
          line-height: 33px;
          letter-spacing: 0.2px;
          color: #2e2c34;
        }
      }

      .formContainer {
        width: 710px;
        padding-top: 20px;
        padding-bottom: 20px;
        display: flex;
        gap: 24px;
      }
      .headContainer {
        display: flex;
        gap: 24px;
        padding-top: 30px;
        padding-bottom: 20px;
        align-items: center;
      }

      .singleForm {
        width: 300px;
        padding-top: 20px;
        padding-bottom: 20px;
      }

      .documentButton {
        padding-top: 30px;
        padding-bottom: 30px;
      }

      .ActionLogo {
        display: flex;
        gap: 20px;
        border: 2px solid #ebeaed;
        width: 110px;
        padding: 15px;
        border-radius: 5px;
        text-align: center;

        .divider {
          border-left: 2px solid #ebeaed;
        }

        img {
          width: 20px;
          height: 20px;
          cursor: pointer;
        }
      }

      .formContainer {
        padding-top: 20px;
        padding-bottom: 20px;
        display: flex;
        gap: 24px;
      }

      .mapButton {
        padding-top: 20px;
        padding-bottom: 20px;
        display: flex;
        gap: 24px;

        p {
          font-family: "Manrope", serif;
          font-weight: 500;
          font-size: 14px;
          line-height: 20px;
          color: #2e2c34;
        }
      }

      .docContainer {
        font-family: "Manrope", serif;
        font-style: normal;
        font-weight: 500;
        font-size: 14px;
        line-height: 20px;
        color: #2e2c34;
        padding-top: 20px;
        padding-bottom: 20px;

        .Attachment-file {
          display: flex;
          gap: 24px;
          padding-top: 20px;
          padding-bottom: 20px;
        }
      }
      .radio-actionButton {
        display: flex;
        gap: 25px;
        /*padding-top: 20px;
        padding-bottom: 20px;*/

        .radio-button {
          border: 1px solid #e6e9ed;
          padding: 10px;
          width: 205px;
          display:flex;
          justify-content:center;
          align-items:center;
          height: 60px;
          border-radius: 6px;
          background: #f9fafb;
        }
      }

      .inputField {
        display: flex;
        gap: 20px;
        padding-top: 20px;
        padding-bottom: 20px;
      }

      .inputLabel {
        font-family: "Manrope", serif;
        font-style: normal;
        font-weight: 600;
        font-size: 14px;
        line-height: 17px;
        letter-spacing: 0.02em;
        color: #242b42;
      }

      .paymentButton {
        padding-top: 20px;
        padding-bottom: 40px;

        p {
          color: #ff6652;
          font-family: "Manrope", serif;
          font-style: normal;
          font-weight: 600;
          font-size: 14px;
          line-height: 19px;
          letter-spacing: 0.02em;
          padding-top: 20px;
          cursor: pointer;
        }

        span {
          color: #000000;
          font-family: "Manrope", serif;
          font-style: normal;
          font-weight: 600;
          font-size: 14px;
          line-height: 19px;
          letter-spacing: 0.02em;
        }
      }
    `,

    addDialog: css`
      padding: 44px;
      width: 461px;

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
  };
};
