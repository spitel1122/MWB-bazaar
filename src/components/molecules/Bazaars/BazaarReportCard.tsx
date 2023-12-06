import React from "react";
import { useBazaarReportCardStyles } from "@/static/stylesheets/molecules/bazaarReportcardStyles";
import { Grid } from "@mui/material";
interface BazaarReportCardProps {
    title?: string;
    count?: string;
    revenue?: string;
    prize?: string;
    bills?: string;
    billsNumber?: string;
}

const BazaarReportCard: React.FC<BazaarReportCardProps> = (props) => {
    const classes = useBazaarReportCardStyles();

    return (
        <div className={classes.root}>
            <div className={classes.wholesellerCard}>
                <Grid container spacing={2}>
                    <Grid item lg={3} md={3} sm={4} xs={4}>
                        <div style={{ borderRight: "1px solid #E1E1E1" }}>
                            <div className="wholesellerItem" style={{ paddingLeft: 0, paddingRight: 0 }}>
                                <p className="headTitle">{props?.title}</p>
                                <p className="totalcount">{props?.count}</p>
                            </div>
                        </div>
                    </Grid>
                    <Grid item lg={9} md={9} sm={8} xs={8}>
                        <Grid container spacing={2}>
                            <Grid item xs={6}>
                                <div className="wholesellerItem">
                                    <p className="subHeadTitle">{props?.revenue}</p>
                                    <p className="headSubtitle">{props?.prize}</p>
                                </div>
                            </Grid>
                            <Grid item xs={6}>
                                <div className="wholesellerItem">
                                    <p className="subHeadTitle">{props?.bills}</p>
                                    <p className="headSubtitle">{props?.billsNumber}</p>
                                </div>
                            </Grid>
                        </Grid>
                    </Grid>
                </Grid>
            </div>
        </div >
    );
};

export { BazaarReportCard };
