import * as React from "react";
import { DataGrid } from "@mui/x-data-grid";

import CustomNoRowsOverlay from "../../misc/placeholder/custom_no_data";
import { useSelector } from "react-redux";

export default function PendingDeliveriesTable() {
  const columns = [
    {
      field: "orderNo",
      headerName: "ORDER NO:",
      width: 92,
      valueGetter: (params) => `${params?.row?.order?.orderNo}`,
    },
    {
      field: "customerName",
      headerName: "CUSTOMER",
      width: 115,
      valueGetter: (params) => `${params?.row?.order?.customerName}`,
    },
    {
      field: "createdAt",
      headerName: "DATE",
      width: 80,
      valueGetter: (params) =>
        `${new Date(params.row?.createdAt?.seconds * 1000).toLocaleDateString(
          "en-US"
        )}`,
    },
    {
      field: "status",
      headerName: "STATUS",
      width: 98,
      valueGetter: (params) => `${params?.row?.status}`,
    },
  ];

  const [pendingDeliveries, setPendingDeliveries] = React.useState([]);
  const { deliveryData } = useSelector((state) => state.delivery);
  const { userData } = useSelector((state) => state.user);

  React.useEffect(() => {
    if (deliveryData && userData) {
      const deliv = deliveryData?.filter(
        (item) => item.agent.id === userData?.id
      );

      const pending = deliv?.filter((item) => item.status === "Pending");
      setPendingDeliveries(pending);
    }
  }, [deliveryData, userData]);

  return (
    <div style={{ height: 500, width: "100%" }}>
      <DataGrid
        rows={pendingDeliveries}
        columns={columns}
        components={{
          NoRowsOverlay: CustomNoRowsOverlay,
        }}
      />
    </div>
  );
}
