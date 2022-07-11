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
import { useSelector } from "react-redux";
import ActionButton from "./action_button";

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

export default function OrdersTable() {
  const columns = [
    {
      field: "orderNo",
      headerName: "ORDER NO:",
      width: 105,
    },
    {
      field: "date",
      headerName: "DATE",
      width: 80,
      valueGetter: (params) =>
        `${new Date(params.row?.date?.seconds * 1000).toLocaleDateString(
          "en-US"
        )}`,
    },
    {
      field: "name",
      headerName: "PRODUCT NAME",
      width: 135,
    },
    {
      field: "category",
      headerName: "CATEGORY",
      width: 130,
    },
    {
      field: "price",
      headerName: "PRICE",
      width: 86,
    },
    {
      field: "quantity",
      headerName: "QUANTITY",
      width: 75,
    },
    {
      field: "cost",
      headerName: "COST",
      width: 86,
    },
    {
      field: "paymentMethod",
      headerName: "PAYMENT",
      width: 86,
      valueGetter: (params) => `${params.row?.paymentMethod}`.toUpperCase(),
    },
    {
      field: "status",
      headerName: "STATUS",
      width: 96,
    },
    {
      field: "id",
      headerName: "ACTIONS",
      width: 130,
      renderCell: (params) => {
        return <ActionButton selected={params} />;
      },
    },
  ];

  const { ordersData } = useSelector((state) => state.orders);

  return (
    <div style={{ height: 400, width: "100%" }}>
      <DataGrid
        rows={ordersData}
        columns={columns}
        components={{
          Toolbar: CustomToolbar,
          NoRowsOverlay: CustomNoRowsOverlay,
        }}
      />
    </div>
  );
}
