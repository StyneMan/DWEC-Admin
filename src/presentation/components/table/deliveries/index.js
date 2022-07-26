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
import { Typography } from "@mui/material";

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
      field: "createdAt",
      headerName: "ORDER DATE",
      width: 120,
      valueGetter: (params) =>
        `${new Date(params.row?.createdAt?.seconds * 1000).toLocaleDateString(
          "en-US"
        )}`,
    },
    {
      field: "address",
      headerName: "DELIVERY ADDRESS",
      width: 200,
      renderCell: (params) => {
        return <Typography>{params?.deliveryInfo?.address}</Typography>;
      },
    },
    {
      field: "agentName",
      headerName: "DELIVERY AGENT",
      width: 200,
      renderCell: (params) => {
        return <Typography>{params?.deliveryInfo?.agentName}</Typography>;
      },
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

  const [mData, setMData] = React.useState();
  // const { deliverordersyData } = useSelector((state) => state.delivery);
  const { ordersData } = useSelector((state) => state.orders);

  React.useEffect(() => {
    if (ordersData) {
      let val = ordersData?.filter(
        (item) => item?.deliveryType === "Door Delivery"
      );
      setMData(val);
    }
  }, [ordersData]);

  return (
    <div style={{ height: 400, width: "100%" }}>
      <DataGrid
        rows={mData}
        columns={columns}
        components={{
          Toolbar: CustomToolbar,
          NoRowsOverlay: CustomNoRowsOverlay,
        }}
      />
    </div>
  );
}
