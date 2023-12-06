import { css } from "@emotion/css";

export const usePaymentrequeststyle = () => ({
    root: css`
    width: 100%;
    padding-top: 20px;
    padding-bottom: 20px;
      
      .mainTitle{
        font-family: "Manrope", serif;
        font-style: normal;
        font-weight: 600;
        font-size: 24px;
        line-height: 20px;
        color: #2E2C34;
      }
      

    table {
      width: 100%;
      font-size: 14px;
      font-family: "Manrope", serif;
      font-style: normal;
      font-weight: 600;
      margin-top: 25px;
      margin-bottom: 25px;
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
    }
    th {
      text-align: left;
      padding-top: 10px;
      padding-bottom: 10px;
    }
  `,
});
