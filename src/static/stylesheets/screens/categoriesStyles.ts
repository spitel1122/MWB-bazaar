import { css } from "@emotion/css";
export const useCategoriesStyles = () => ({
  root: css`
    width: 100%;
    padding-top: 20px;
    padding-bottom: 20px;
    .img{
      border-radius: 10px !important;
    }
    .padding_tpb {
      padding-top: 8px;
      padding-bottom: 8px;
    }
    .brandLogo {
      img {
        width: 54px;
        height:48px;
        border-radius: 5px;
      }
    }
    .container {
      display: flex;
      gap: 64px;
    }
    .leftContainer {
      height: 492px;
      width: 254px;
      padding-top: 20px;
    }
    .rightContainer {
      width:377px;
      padding: 20px 0;
    }
    .title{
      font-family: "Manrope", serif;
      font-style: normal;
      font-weight: 500;
      font-size: 14px;
      line-height: 20px;
      color: #504F54;
    }
  `,
});