import React, { useRef, useState } from "react";
import MoreVertOutlinedIcon from "@mui/icons-material/MoreVertOutlined";
import CreateOutlinedIcon from '@mui/icons-material/CreateOutlined';
import CloseIcon from "@mui/icons-material/Close";
import { useGridOptionButtonStyles } from "@/static/stylesheets/atoms/gridOptionButtonStyles";
import classNames from "classnames";
import { css } from "@emotion/css";
import { useOutsideClickHandler } from "@/hooks";

interface GridOptionButtonProps {
  icon?: "vertical-options" | "edit-item" | 'edit-itemmore';
  menus?: {
    label: string | React.ReactNode,
    onClick?(): void,
  }[],
}

const dropdownStyles = css`
  position: relative;

  .dropdown {
    position: absolute;
    right: 0;
    top: 100%;
    background: #ffffff;
    box-shadow: 0px 6px 20px rgb(0 0 0 / 10%);
    border-radius: 8px;
    display: none;
    flex-direction: column;
    width: 285px;
    
    a {
      padding: 12px 25px;
      border-bottom: 1px solid #f0f0f3;
      display: flex;
      gap: 15px;
      align-items: center;

      :hover{
        color: red; !important;
      }

      span.icon {
        background: #f6f6f6;
        border-radius: 8px;
        display: flex;
        align-items: center;
        justify-content: center;
        height: 36px;
        width: 36px;
      }
    }
  }
`;
const dropdownOpenStyles = css`
  display: flex !important;
  right: 36px;
  top: 10px;
  z-index: 999;
`;

const
  GridOptionButton: React.FC<GridOptionButtonProps> = (props) => {
    const containerRef = useRef<HTMLSpanElement>(null);
    const classes = useGridOptionButtonStyles();
    const verticalOptionsIcon = <MoreVertOutlinedIcon />;
    const createOutlinedIcon = <CreateOutlinedIcon />;
    const Icon =
      props?.icon === "vertical-options" ? <MoreVertOutlinedIcon /> :
        props?.icon === "edit-item" ? <CreateOutlinedIcon style={{ fontSize: "16px", color: "#686868" }} /> : props?.icon === 'edit-itemmore' ? <MoreVertOutlinedIcon style={{ fontSize: "20px", color: "#84818A" }}/> : null;
    const [open, setOpen] = useState<boolean>(false);

    useOutsideClickHandler(containerRef, () => setOpen(false));

    return (
      <>
        <span className={dropdownStyles} ref={containerRef}>
          {!open && (
            <div className={classes.root} onClick={() => setOpen(true)}>
              {Icon}
            </div>
          )}
          {open && (
            <div className={classNames(classes.root, "bg-[#4E2FA9] text-[#ffffff]")} onClick={() => setOpen(false)}>
              <CloseIcon />
            </div>
          )}
          <div className={classNames("dropdown", {
            [dropdownOpenStyles]: open,
          })}>
            {props?.menus?.map((item, index) => (
              <a className={"cursor-pointer"} key={index} onClick={() => {
                if (item?.onClick) {
                  item?.onClick();
                  setOpen(false);
                }
              }}>
                {item?.label}
              </a>
            ))}
          </div>
        </span>
      </>
    );
  };

export { GridOptionButton };
