import { css } from "@emotion/css";

export const useBazaarreportHeroStyles = () => ({
  root: css`
    // display: flex;
    width: 100%;
    h5{
      font-weight: 700;
      font-size: 16px;
      line-height: 25px;
      color: #2E2C34;
      margin-bottom: 12px;
    }
  `,

  wholesellerCard: css`
    display: flex;
    gap: 65px;
    // padding: 30px;
    width: 100%;
    align-items: center;
    // height: 110px;
    background: #f7f7f7;
    // border: 2px solid #e1e1e1;

    .detailsButton {
      display: flex;
      gap: 20px;
      justify-content: space-between;

      .btn {
        display: flex;
        gap: 10px;
        margin-top: 20px;
        padding-left: 20px;
        padding-right: 20px;

        img {
          width: 15px;
          height: 15px;
        }

        .reportButton {
          font-family: "Manrope", serif;
          font-style: normal;
          font-weight: 600;
          font-size: 14px;
          line-height: 20px;
          color: #4e2fa9;
          cursor: pointer;
        }
      }
    }

    .totalCard {
      padding: 20px 24px;
      // width: 50%;
      border-right: 1px solid #E2DFE9;
    }

    .totaoItem {
      padding: 20px 24px;
      // width: 50%;
    }

    .totalcount {
      padding-top: 10px;
      // padding-bottom: 10px;
      font-family: "Manrope", serif;
      font-style: normal;
      font-weight: 700;
      font-size: 30px;
      line-height: 32px;
    }

    .headTitle {
      // padding-top: 10px;
      // padding-bottom: 10px;
      font-family: "Manrope", serif;
      font-style: normal;
      font-weight: 600;
      font-size: 14px;
      line-height: 18px;
    }
  `,
});
