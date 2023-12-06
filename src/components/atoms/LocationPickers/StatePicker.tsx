import React, { useState } from 'react';
import { Box, Menu, TextField } from "@mui/material";

const StatePicker = () => {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLDivElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <>
      <p className={"text-[14px] text-[#84818a]"} style={{
        fontFamily: "Manrope",
        fontWeight: 500,
      }}>State</p>

      <Box
      onClick={handleClick}
      >
        <TextField
          sx={{
            cursor: "pointer",
            "& *": {
              fontFamily: "Manrope !important",
              fontSize: "14px",
            },
          }}
          variant="standard"
          fullWidth={true}
        />
      </Box>

      <Menu
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          'aria-labelledby': 'basic-button',
        }}
        PaperProps={{
          style:{
            maxHeight: "450px",
            overflow: "auto",
          }
        }}
      >
       <div className={"min-w-[300px] px-[20px] py-[10px]"}>
         <div className={"border-b border-b-[1px solid #eeeeee] mb-[20px]"}>
           <input
             type={"search"}
             className={"p-[5px] w-[100%] outline-0"}
             placeholder={"Search"}
           />
         </div>

           <div className={"flex flex-row gap-[40px]"}>
             <div className={"flex flex-col gap-[5px]"}>
               <div className={"flex items-center gap-[10px]"}>
                 <input type={"checkbox"} />
                 <span>Dhaka</span>
               </div>
               <div className={"flex items-center gap-[10px]"}>
                 <input type={"checkbox"} />
                 <span>Cumilla</span>
               </div>
               <div className={"flex items-center gap-[10px]"}>
                 <input type={"checkbox"} />
                 <span>Rajshahi Dhaka Long Name Long Name</span>
               </div>
               <div className={"flex items-center gap-[10px]"}>
                 <input type={"checkbox"} />
                 <span>Chittagong</span>
               </div>
               <div className={"flex items-center gap-[10px]"}>
                 <input type={"checkbox"} />
                 <span>Feni</span>
               </div>
             </div>
         </div>
       </div>
      </Menu>
    </>
  );
};

export { StatePicker };
