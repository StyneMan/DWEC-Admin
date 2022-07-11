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

export default function DeliveriesTable() {
  const columns = [
    {
      field: "orderNo",
      headerName: "ORDER NO:",
      width: 100,
    },
    {
      field: "date",
      headerName: "ORDER DATE",
      width: 120,
      valueGetter: (params) =>
        `${new Date(params.row?.date?.seconds * 1000).toLocaleDateString(
          "en-US"
        )}`,
    },
    {
      field: "address",
      headerName: "DELIVERY ADDRESS",
      width: 200,
    },
    {
      field: "agentName",
      headerName: "DELIVERY AGENT",
      width: 200,
    },
    {
      field: "agentPhone",
      headerName: "PHONE",
      width: 130,
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

  const { deliveryData } = useSelector((state) => state.delivery);

  return (
    <div style={{ height: 400, width: "100%" }}>
      <DataGrid
        rows={deliveryData}
        columns={columns}
        components={{
          Toolbar: CustomToolbar,
          NoRowsOverlay: CustomNoRowsOverlay,
        }}
      />
    </div>
  );
}
