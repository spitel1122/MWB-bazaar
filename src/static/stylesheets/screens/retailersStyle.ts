import { css } from "@emotion/css";

export const useRetailerStyles = () => ({
  root: css`
    width: 100%;
    padding-top: 20px;
    padding-bottom: 20px;
    // .css-5ryogn-MuiButtonBase-root-MuiSwitch-switchBase.Mui-checked+.MuiSwitch-track{
    //   background: #4E2FA9;
    //   opacity: 1;
    //   height: 20.5px;
    //   margin-top: -3.5px;
    //   border-radius: 32px;
    // }
    // .css-jsexje-MuiSwitch-thumb{
    //   border: 2px solid #4E2FA9;
    //   background: #fff;
    // }
    // .css-1yjjitx-MuiSwitch-track{
    //   height: 20.5px;
    //   margin-top: -3.5px;
    //   border-radius: 32px;
    // }

    .commonTitle {
      font-family: "Manrope", serif;
      font-style: normal;
      font-weight: 600;
      font-size: 24px;
      line-height: 20px;
      color: #2e2c34;
    }

    .tableTitle {
      font-family: "Manrope", serif;
      font-style: normal;
      font-weight: 600;
      font-size: 14px;
      line-height: 20px;
      color: #84818A;
    }

    .dataTitle {
      font-family: "Manrope", serif;
      font-style: normal;
      font-weight: 500;
      font-size: 14px;
      line-height: 20px;
      color: #2E2C34;
    }

    .metaData {
      font-family: "Manrope", serif;
      font-style: normal;
      font-weight: 500;
      font-size: 14px;
      line-height: 20px;
      color: #2E2C34;
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
  `,

  commissionRedeemDialog: css`
  padding: 30px;
    width: 400px;

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

  // addDialog: css`
  //   padding: 44px;
  //   width: 600px;

  //   .modalHead {
  //     display: flex;
  //     justify-content: space-between;
  //     cursor: pointer;
  //   }

  //   .modalTitle {
  //     font-style: normal;
  //     font-weight: 600;
  //     font-size: 12px;
  //     line-height: 18px;
  //     color: #ffa043;
  //     background: #fff6ed;
  //     padding: 10px;
  //     border-radius: 6px;
  //     cursor: pointer;
  //   }

  //   .datContainer {
  //     display: flex;
  //     border-top: 1px solid #ebeaed;
  //     border-bottom: 1px solid #ebeaed;
  //     justify-content: space-between;
  //     padding-top: 20px;
  //     padding-bottom: 20px;
  //   }

  //   .attachment {
  //     display: flex;
  //     gap: 15px;

  //     img {
  //       width: 250px;
  //     }

  //     .attachmentHead {
  //       font-family: "Manrope", serif;
  //       font-style: normal;
  //       font-weight: 600;
  //       font-size: 16px;
  //       line-height: 20px;
  //       text-align: right;
  //       color: #ff6652;
  //       padding-top: 20px;
  //     }
  //   }

  //   .headTitle {
  //     display: flex;
  //     justify-content: space-between;
  //     padding-top: 20px;

  //     .martTitle {
  //       font-family: "Manrope", serif;
  //       font-style: normal;
  //       font-weight: 600;
  //       font-size: 28px;
  //       line-height: 36px;
  //       color: #2e2c34;
  //     }

  //     .martDescription {
  //       font-family: "Manrope", serif;
  //       font-style: normal;
  //       font-weight: 600;
  //       font-size: 16px;
  //       line-height: 18px;
  //       color: #4e2fa9;
  //       padding-top: 20px;
  //       padding-bottom: 20px;
  //     }
  //   }

  //   .title {
  //     font-family: "Manrope", serif;
  //     font-style: normal;
  //     font-weight: 600;
  //     font-size: 24px;
  //     line-height: 20px;
  //     color: #2e2c34;
  //     margin-bottom: 27px;
  //   }

  //   .select-master {
  //     margin-top: 26px;

  //     .input-label {
  //       font-family: "Manrope", serif;
  //       font-style: normal;
  //       font-weight: 500;
  //       font-size: 12px;
  //       line-height: 18px;
  //       color: #84818a;
  //     }
  //   }

  //   .action-bar {
  //     margin-top: 41px;
  //     display: flex;
  //     gap: 12px;
  //   }
  // `,
});
