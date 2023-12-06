import React from "react";
import { Button } from "@mui/material";
import { useActionButtonStyles } from "@/static/stylesheets/atoms/actionButtonStyles";
import classNames from "classnames";

interface ActionButtonProps {
  variant?: "primary" | "default";
  title?: string;
  onClick?(): void;
  type?: "button" | "submit" | "reset";
}

const ActionButton: React.FC<ActionButtonProps> = (props) => {
  const classes = useActionButtonStyles();

  return (
    <>
      <Button
        type={props?.type}
        variant={props?.variant === "default" ? "text" : "contained"}
        className={classNames({
          [classes.root]: true,
          [classes.default]: props?.variant === "default",
          [classes.primary]: props?.variant === "primary",
        })}
        disableElevation={true}
        onClick={props?.onClick}
      >
        {props?.title}
      </Button>
    </>
  );
};

export { ActionButton };
