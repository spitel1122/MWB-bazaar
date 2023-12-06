import { css } from "@emotion/css";

export const useAgentStyles = () => {
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
        width: 150px;
      }
    `,
    nativeDialog: css`
    width: 510px;
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
  };
};
