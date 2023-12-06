import { css } from "@emotion/css";

export const useSidebarPanelStyles = () => {
  return {
    root: css`
      display: flex;
      flex-direction: column;
      background: #f9f5f2;
      border-right: 1px solid #e1e1e1;
      width: 260px;
      @media (max-width: 991px) {
        left: -260px;
        position: absolute;
        height: 100%;
        z-index: 999;
      }
    `,

    brandLogoContainer: css`
      display: flex;
      text-align: center;
      justify-content: center;
      align-items: center;
      padding: 22px 0;
      margin-bottom: 20px;

      img {
        width: 151.1px;
      }
    `,

    brandContainermain: css`
      left: 0;
      background: #f9f5f2;
      border-right: 1px solid #e1e1e1;
      position: absolute;
      width: 260px;
      z-index: 999;
      height: 100%;
    `,

    menuContainer: css`
      display: flex;
      flex-direction: column;
      flex-grow: 1;
      overflow: auto;
      padding: 0 12px;

      .wrapper {
        display: block;
        width: 100%;
      }

      .menu-item {
        display: flex;
        flex-direction: row;
        height: 48px;
        border-radius: 4px;
        align-items: center;
        padding: 0 15px;
        cursor: pointer;
        transition: all 0.8s;
        margin-bottom: 2px;

        .icon {
          display: flex;
          text-align: center;

          svg {
            font-size: 20px;
            color: #2f3650;
            transition: all 0.2s;
          }
        }

        .label {
          display: flex;
          margin-left: 12px;
          font-family: "Manrope", serif;
          font-style: normal;
          font-weight: 600;
          font-size: 14px;
          line-height: 20px;
          color: #2f3650;
          transition: all 0.2s;
        }

        :hover {
          background: #ff6652;

          svg {
            font-size: 21px;
            color: #ffffff;
          }

          .label {
            color: #ffffff;
          }
        }
      }

      .active {
        background: #ff6652;

        svg {
          font-size: 21px;
          color: #ffffff !important;
        }

        .label {
          color: #ffffff !important;
        }
      }
    `,
  };
};
