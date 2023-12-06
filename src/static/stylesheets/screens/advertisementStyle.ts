import { css } from "@emotion/css";

export const useAdvertisementStyles = () => ({
  root: css`
    width: 100%;
    padding-top: 20px;
    padding-bottom: 20px;

    .commonTitle {
      font-family: "Manrope", serif;
      font-style: normal;
      font-weight: 600;
      font-size: 24px;
      line-height: 20px;
      color: #2e2c34;
    }
    #demo-multiple-checkbox-label{
      transform: translate(14px, 8px) scale(1);
    }
    #demo-multiple-checkbox-label[data-shrink="true"]{
      transform: translate(14px, -7px) scale(0.75);
    }
  `,
});
