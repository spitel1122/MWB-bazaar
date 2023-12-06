import { css } from "@emotion/css";

export const useDashboardLayoutStyles = () => {
  return {
    root: css`
      display: flex;
      height: 100vh;
    `,

    mainContainer: css`
      display: flex;
      flex-grow: 1;
      flex-direction: column;
      width: calc(100% - 260px);
    `,

    contentContainer: css`
      display: flex;
      flex-grow: 1;
      overflow-y: auto;
      overflow-x: hidden;
      padding: 25px 49px;
      @media(max-width: 1399px){
        padding: 25px 15px 25px 30px;
      }
      @media (max-width: 991px) {
        padding: 25px 15px 25px 15px;
      }
    `,
  };
};
