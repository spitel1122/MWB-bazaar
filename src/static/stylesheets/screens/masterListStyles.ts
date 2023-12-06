import { css } from "@emotion/css";

export const useMasterListStyles = () => ({
  root: css`
    flex: 1;

    .radio-actionButton {
      display: flex;
      gap: 20px;
      padding-top: 20px;
      padding-bottom: 20px;
      width: 564px;

      .radio-button {
        border: 2px solid #e6e9ed;
        padding: 10px;
        height: 50px;
        border-radius: 10px;
        background: #f9fafb;
        display: flex;
        justify-content: center;
        align-items: center;
        width: 100%;
        * {
          font-size: 16px !important;
        }
      }
    }
  `,
  pageTitle: css`
    font-family: "Manrope", serif;
    font-style: normal;
    font-weight: 600;
    font-size: 24px;
    line-height: 33px;
    letter-spacing: 0.2px;
    color: #000000;
    margin-bottom: 51px;
  `,

  dataGrid: css`
    width: 564px;
    margin-top: 33px;

    th {
      font-family: "Manrope", serif;
      font-style: normal;
      font-weight: 600;
      font-size: 14px;
      line-height: 20px;
      color: #84818a;
      text-align: left;
      padding: 11px 20px;
      border-bottom: 1px solid #e1e1e1;

      :first-child {
        width: 350px;
      }
    }

    tr {
      :hover td {
        background: #efebf9;
      }
    }

    td {
      height: 68px;
      padding: 0 20px;
      border-bottom: 1px solid #e1e1e1;

      :first-child {
        font-family: "Manrope", serif;
        font-style: normal;
        font-weight: 500;
        font-size: 14px;
        line-height: 20px;
        color: #2e2c34;
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
});
