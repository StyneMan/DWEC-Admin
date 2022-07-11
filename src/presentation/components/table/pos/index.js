import React from "react";
import { DataGrid } from "@mui/x-data-grid";

import CustomNoRowsOverlay from "../../misc/placeholder/custom_no_data";
import { useSelector } from "react-redux";
import { makeStyles } from "@mui/styles";
import {
  IconButton,
  InputAdornment,
  TextField,
  Typography,
} from "@mui/material";
import DeleteOutlineOutlined from "@mui/icons-material/DeleteOutlineOutlined";
import { AccountCircle } from "@mui/icons-material";

const useStyles = makeStyles(() => ({
  noBorder: {
    border: "none",
  },
}));

export default function POSTable() {
  const classes = useStyles();

  const handleQuantityChange = (e) => {};

  const columns = [
    {
      field: "name",
      headerName: "NAME",
      width: 120,
    },
    {
      field: "price",
      headerName: "PRICE",
      width: 80,
    },
    {
      field: "quantity",
      headerName: "QUANTITY",
      width: 70,
      renderCell: (params) => {
        return (
          <TextField
            type="number"
            classes={{ notchedOutline: classes.input }}
            value={params?.row?.quantity}
            onChange={handleQuantityChange}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <Typography>{params?.row?.quantity}</Typography>
                </InputAdornment>
              ),
              classes: { notchedOutline: classes.noBorder },
            }}
          />
        );
      },
    },
    {
      field: "subtotal",
      headerName: "SUBTOTAL",
      width: 100,
    },
    {
      field: "id",
      headerName: "",
      width: 100,
      renderCell: (params) => {
        return (
          <IconButton>
            <DeleteOutlineOutlined />
          </IconButton>
        );
      },
    },
  ];

  const { userData } = useSelector((state) => state.user);

  return (
    <div style={{ height: 420, width: "100%" }}>
      <DataGrid
        rows={userData?.sales}
        columns={columns}
        pagination={false}
        components={{
          //   Toolbar: CustomToolbar,
          NoRowsOverlay: CustomNoRowsOverlay,
        }}
      />
    </div>
  );
}
