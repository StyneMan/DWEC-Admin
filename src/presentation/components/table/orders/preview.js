import Print from "@mui/icons-material/Print";
import ArrowBackIosNew from "@mui/icons-material/ArrowBackIosNew";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Box from "@mui/system/Box";
import React from "react";
import { useHistory, useLocation } from "react-router-dom";
import OrderItemsTable from "./items_table";

const OrdersPreview = () => {
  const location = useLocation();
  const history = useHistory();
  let { item } = location.state;

  const handlePrint = () => {};

  return (
    <div>
      <Box
        display="flex"
        flexDirection="row"
        justifyContent="space-between"
        alignItems="center"
      >
        <Button
          variant="text"
          startIcon={<ArrowBackIosNew />}
          onClick={() => history.goBack()}
        >
          Back
        </Button>

        <Button variant="contained" startIcon={<Print />} onClick={handlePrint}>
          Print Receipt
        </Button>
      </Box>
      <Box p={3}>
        <Typography variant="h5" fontWeight="600" color="primary.main">
          Order Summary
        </Typography>
        <Typography>{`Below is the order summary for ${item?.customerName}'s order with the order number, ${item?.orderNo}`}</Typography>
      </Box>

      <Box
        display="flex"
        flexDirection="row"
        justifyContent="space-between"
        alignItems="center"
      >
        <Box
          display="flex"
          flexDirection="column"
          justifyContent="start"
          alignItems="start"
        >
          <Typography
            gutterBottom
          >{`Order Number: ${item?.orderNo}`}</Typography>
          <Typography gutterBottom>{`Order Date: ${new Date(
            item?.createdAt?.seconds * 1000
          ).toLocaleString("en-US")}`}</Typography>
          <Typography
            gutterBottom
          >{`Ordered by ${item?.customerName}`}</Typography>
          <Typography
            gutterBottom
          >{`Customer ID ${item?.customerId}`}</Typography>
        </Box>

        <Box
          display="flex"
          flexDirection="column"
          justifyContent="start"
          alignItems="start"
        >
          <Typography
            gutterBottom
          >{`Payment Method: ${item?.paymentMethod}`}</Typography>
          <Typography gutterBottom>{`Paid On: ${new Date(
            item?.paidAt
          ).toDateString()}`}</Typography>
          <Typography
            gutterBottom
          >{`Delivery Type: ${item?.deliveryType}`}</Typography>
          <Typography
            gutterBottom
          >{`Order Status: ${item?.status}`}</Typography>
        </Box>
      </Box>

      <Box
        display="flex"
        flexDirection="column"
        justifyContent="start"
        alignItems="start"
      >
        {item?.deliveryType !== "Pickup" && (
          <>
            <br />
            <Typography variant="h6" fontWeight="600">
              Delivery Details
            </Typography>
            <Typography>
              {`Delivering To: ${item?.deliveryInfo?.customerName}`}
            </Typography>
            <Typography>
              {`Delivery Address: ${item?.deliveryInfo?.address}`}
            </Typography>
            <Typography>
              {`Delivery Contact: ${item?.deliveryInfo?.phone}`}
            </Typography>
            <Typography>
              {`Delivery Description: ${item?.deliveryInfo?.description}`}
            </Typography>
          </>
        )}
      </Box>
      <br />
      <Box
        display="flex"
        flexDirection="column"
        justifyContent="start"
        alignItems="start"
      >
        <Typography variant="h6" fontWeight="600">
          Items Ordered
        </Typography>
        <OrderItemsTable items={item?.items} />
      </Box>
    </div>
  );
};

export default OrdersPreview;
