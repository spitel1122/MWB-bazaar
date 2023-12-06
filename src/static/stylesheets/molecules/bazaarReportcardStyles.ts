import { css } from "@emotion/css";

export const useBazaarReportCardStyles = () => {
    return {
        root: css`
            display: flex;
            width: 100%;
        `,

        wholesellerCard: css`
            display: flex;
            gap: 65px;
            padding: 23px 30px 23px 30px;
            width: 100%;
            align-items: center;
            background: #fafafa;
            border: 1px solid #E1E1E1;

            .revenewItem {
                border-left: 1px solid #E1E1E1;
            }

            .wholesellerItem {
                // padding-left: 30px;
                // padding-right: 30px;
            }
            .totalcount {
                padding-top: 10px;
                font-family: "Manrope", serif;
                font-style: normal;
                font-weight: 700;
                font-size: 30px;
                line-height: 32px;
                color: #4e2fa9;
            }

            .headTitle {
                font-family: "Manrope", serif;
                font-style: normal;
                font-weight: 600;
                font-size: 14px;
                line-height: 18px;
                color: #84818a;
            }
            .subHeadTitle {
                padding-bottom: 10px;
                font-family: "Manrope", serif;
                font-style: normal;
                font-weight: 600;
                font-size: 12px;
                line-height: 18px;
                color: #84818a;
            }

            .headSubtitle {
                font-family: "Manrope", serif;
                font-style: normal;
                font-weight: 700;
                font-size: 18px;
                line-height: 22px;
                color: #2e2c34;
            }
        `,
    };
};
