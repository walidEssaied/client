import { Button } from "@mui/material";
import React from "react";
import ReactToPrint from "react-to-print";

type ActionButtonProps = {
 componentToPrint: React.MutableRefObject<null>;
};

export const ActionButton = (props: ActionButtonProps) => {
 const { componentToPrint } = props;

 return (
  <>
   <ReactToPrint
    trigger={() => (
     <Button id={"print"} variant="contained" color="primary">
      {" "}
      {"Print"}{" "}
     </Button>
    )}
    content={() => componentToPrint.current}
   />
  </>
 );
};