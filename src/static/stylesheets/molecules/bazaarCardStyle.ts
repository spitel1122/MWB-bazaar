import { css } from "@emotion/css";

export const useBazaarCardStyles = () => {
  return {
    root: css`
      cursor: pointer;
    `,

    // BazaarContainer
    bazaarContainer: css`
      height: 220px;
      border: 1px solid #E1E1E1;
      border-radius: 4px;
      
      .brandInfo {
        padding: 15px;
      }
      
      .brandCounter{
        // padding: 30px 0;
      }

      .brandLogo {
        width: 50px;
        height: 40px;
        margin: 10px 0 10px 0;
      }

      .bazaarTitle {
        font-family: "Manrope", serif;
        font-style: normal;
        font-weight: 700;
        font-size: 16px;
        line-height: 22px;
        color: #2e2c34;
      }
      
      .bazaarSubTitle {
        font-family: "Manrope", serif;
        font-style: normal;
        font-weight: 500;
        font-size: 14px;
        line-height: 20px;
        color: #84818A;
      }

      .counterTitle {
        font-family: "Manrope", serif;
        font-style: normal;
        font-weight: 600;
        font-size: 14px;
        line-height: 19px;
        text-align: center;
        letter-spacing: 0.2px;
        color: #2E2C34;
      }
      
      .counterSubtitle {
        font-family: "Manrope", serif;
        font-style: normal;
        font-weight: 500;
        font-size: 12px;
        line-height: 16px;
        color: #888887;
      }
    `,


    // WholeSellerCard
    wholesalerCard: css`
      /*border-left: 2px solid #e1e1e1;
      padding: 30px 20px 30px 20px;*/

      .container {
        display: flex;
        gap: 12px;
        padding: 5px;
        align-items: center;
      }
    `,

    // Revenue Container
    revenueContainer: css`
      border-top: 1px solid #e1e1e1;
      display: flex;
      gap: 24px;
    `,

    // Revenue Card
    revenueCard: css`
      .container {
        display: flex;
        gap: 40px;
        padding: 10px 20px 10px 20px;
      }

      .headTitle {
        font-family: "Manrope", serif;
        font-style: normal;
        font-weight: 600;
        font-size: 12px;
        line-height: 16px;
        color: #84818a;
        padding: 5px 0px 5px 0px;
      }

      .headSubtitle {
        font-family: "Manrope", serif;
        font-style: normal;
        font-weight: 700;
        font-size: 18px;
        line-height: 22px;
        color: #2e2c34;
        padding: 5px 0px 5px 0px;
      }
    `,
  };
};
