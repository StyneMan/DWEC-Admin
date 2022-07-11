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

export default function ProductsTable() {
  const columns = [
    {
      field: "_id",
      headerName: "ID",
      width: 200,
      valueGetter: (params) => `${params?.row?.id}`,
    },
    {
      field: "image",
      headerName: "Image",
      width: 75,
      renderCell: (params) => (
        <img alt="Profile" src={params?.row?.image} width="56%" />
      ),
    },
    {
      field: "name",
      headerName: "NAME",
      width: 165,
    },
    {
      field: "category",
      headerName: "CATEGORY",
      width: 175,
    },
    {
      field: "price",
      headerName: "UNIT PRICE",
      width: 175,
    },
    {
      field: "quantity",
      headerName: "STOCK",
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

  const { productsData } = useSelector((state) => state.products);

  return (
    <div style={{ height: 400, width: "100%" }}>
      <DataGrid
        rows={productsData}
        columns={columns}
        components={{
          Toolbar: CustomToolbar,
          NoRowsOverlay: CustomNoRowsOverlay,
        }}
      />
    </div>
  );
}
