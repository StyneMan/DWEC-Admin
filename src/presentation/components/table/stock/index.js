import * as React from "react";
import {
  DataGrid,
  GridToolbarContainer,
  GridToolbarColumnsButton,
  GridToolbarFilterButton,
  GridToolbarExport,
  GridToolbarDensitySelector,
} from "@mui/x-data-grid";

import CustomNoRowsOverlay from "../../misc/placeholder/custom_no_data";
import ActionButton from "./action_button";
import { useSelector } from "react-redux";

function CustomToolbar() {
  return (
    <GridToolbarContainer>
      <GridToolbarColumnsButton />
      <GridToolbarFilterButton />
      <GridToolbarDensitySelector />
      <GridToolbarExport />
    </GridToolbarContainer>
  );
}

export default function StocksTable() {
  const columns = [
    {
      field: "supplier",
      headerName: "SUPPLIER",
      width: 200,
    },
    {
      field: "warehouse",
      headerName: "WAREHOUSE",
      width: 165,
    },
    {
      field: "product",
      headerName: "PRODUCT ID",
      width: 175,
    },

    {
      field: "quantity",
      headerName: "QUANTITY",
      width: 100,
    },
    {
      field: "createdAt",
      headerName: "CREATED ON",
      width: 110,
      valueGetter: (params) =>
        `${new Date(params.row?.createdAt?.seconds * 1000).toLocaleDateString(
          "en-US"
        )}`,
    },
    {
      field: "status",
      headerName: "STATUS",
      width: 100,
    },
    {
      field: "id",
      headerName: "ACTIONS",
      width: 90,
      renderCell: (params) => {
        return <ActionButton selected={params} />;
      },
    },
  ];

  const { stocksData } = useSelector((state) => state.stocks);

  return (
    <div style={{ height: 400, width: "100%" }}>
      <DataGrid
        rows={stocksData}
        columns={columns}
        components={{
          Toolbar: CustomToolbar,
          NoRowsOverlay: CustomNoRowsOverlay,
        }}
      />
    </div>
  );
}
