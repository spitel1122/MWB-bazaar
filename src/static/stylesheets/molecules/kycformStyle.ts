import { css } from "@emotion/css";

export const useKycFormStyles = () => {
  return {
    root: css`
      // width: 600px;
      .headContainer {
        display: flex;
        gap: 24px;
        padding-top: 30px;
        padding-bottom: 20px;
        align-items: center;
      }

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
        input{
          font-size: 14px !important;
        }
      }
      .buttonTitle{
        font-family: "Manrope", serif;
        font-style: normal;
        font-weight: 600;
        font-size: 14px;
        line-height: 20px;
        text-align: center;
        color: #84818A;
      }
      
      .browseButton{
        font-family: "Manrope", serif;
        font-style: normal;
        font-weight: 500;
        font-size: 12px;
        line-height: 18px;
        text-align: center;
        color: #4E2FA9;
      }

      .formTitle{
        font-family: "Manrope", serif;
        font-style: normal;
        font-weight: 500;
        font-size: 12px;
        line-height: 18px;
        color: #84818A;
      }

      .docTitle{
        font-family: "Manrope", serif;
        font-style: normal;
        font-weight: 500;
        font-size: 14px;
        line-height: 20px;
        color: #2E2C34;
      }

      .singleForm {
        width: 300px;
        padding-top: 20px;
        padding-bottom: 20px;
      }

      .actionButton{
        font-family: "Manrope", serif;
        font-style: normal;
        font-weight: 600;
        font-size: 16px;
        line-height: 22px;
        color: #4E2FA9;
      }

      .addButton{
        font-family: "Manrope", serif;
        font-style: normal;
        font-weight: 600;
        font-size: 14px;
        line-height: 20px;
        color: #5542F6;
      }

      .FormTitle{
        font-family: "Manrope", serif;
        font-style: normal;
        font-weight: 500;
        font-size: 12px;
        line-height: 18px;
        color: #84818A;
      }
      
      .mainTitle{
        font-family: "Manrope", serif;
        font-style: normal;
        font-weight: 600;
        font-size: 18px;
        line-height: 27px;
        color: #4E2FA9;
      }

      .documentButton {
        padding-top: 30px;
        padding-bottom: 30px;
      }

      .ActionLogo {
        width: 130px;
        display: flex;
        gap: 20px;
        border: 2px solid #ebeaed;
        padding: 15px;
        border-radius: 5px;
        text-align: center;

        .dividor {
          border-left: 2px solid #ebeaed;
        }

        img {
          width: 20px;
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

        .Attachment-file {
          display: flex;
          gap: 24px;
          padding-top: 20px;
        }
        .buttonKycForms{
          position:relative;
        }
        .kycFormsTwo{
          position: absolute;
          top: 22px;
          width: 100px;
          height: 100px;
          opacity: 0;
          cursor: pointer;
        }

      }
      .buttonKycForms{
        position:relative;
      }
      .kycForms{
        position: absolute;
        top: 0px;
        left: 0px;
        width: 160px;
        height: 36px;
        opacity: 0;
        cursor: pointer;
      }

      .privacyButton{
        font-family: "Manrope", serif;
        font-style: normal;
        font-weight: 500;
        font-size: 18px;
        line-height: 34px;
        color: #4E2FA9;
      }
    `,
  };
};
