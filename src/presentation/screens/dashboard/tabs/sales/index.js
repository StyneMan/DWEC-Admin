import React from "react";
import Box from "@mui/system/Box";
import Typography from "@mui/material/Typography";
import SalesTable from "../../../../components/table/sales";

const Sales = () => {
  return (
    <div>
      <Box
        paddingBottom={4}
        display="flex"
        flexDirection={"row"}
        justifyContent="start"
        alignItems="start"
      >
        <Typography
          textTransform={"uppercase"}
          variant="h4"
          fontWeight={"700"}
          color="primary.main"
        >
          Sales
        </Typography>
      </Box>
      <SalesTable />
    </div>
  );
};

export default Sales;
