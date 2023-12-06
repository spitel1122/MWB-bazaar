import { css } from "@emotion/css";

export const usenewWholesellerStyles = () => {
  return {
    root: css`
      margin-top: 30px;

      p {
        font-family: "Manrope", serif;
        font-style: normal;
        font-weight: 600;
        font-size: 14px;
        line-height: 20px;
        color: #2E2C34;
      }

      .container {
        display: flex;
        gap: 20px;

        .brandData {
          display: flex;
          gap: 20px;
          padding-top: 10px;
          padding-bottom: 10px;
        }

        .brandLogo {
          width: 32px;
          border-radius: 50%;
        }

        .customerId{
          font-weight: 500;
          font-size: 12px;
          line-height: 18px;
          color: #84818A;
        }
      }
    `,
  };
};
