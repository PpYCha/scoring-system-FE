import React from "react";
import { Button } from "@mui/material";
import { useReactToPrint } from "react-to-print";
import PrintableTable from "./PrintableTable";

const PrintButton = ({ data }) => {
  const tableRef = React.useRef();
  const handlePrint = useReactToPrint({
    content: () => tableRef.current,
  });

  return (
    <>
      <Button variant="contained" onClick={handlePrint}>
        Print Table
      </Button>
      <div style={{ display: "none" }}>
        <PrintableTable data={data} ref={tableRef} />
      </div>
    </>
  );
};

export default PrintButton;
