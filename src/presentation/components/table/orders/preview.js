import { Button, Container, Typography } from "@mui/material";
import { Box } from "@mui/system";
import React from "react";

const OrdersPreview = (props) => {
  let { item, setOpen } = props;

  return (
    <div>
      <Container sx={{ paddingY: 1 }}>
        <Box
          display="flex"
          flexDirection="row"
          justifyContent="space-between"
          alignItems="center"
        >
          <Box
            display="flex"
            flexDirection="column"
            justifyContent={"center"}
            alignItems="center"
          >
            <img src={item?.image} alt="" width={150} />
            <Typography>{item?.status}</Typography>
          </Box>

          <Box
            display="flex"
            flexDirection="column"
            justifyContent={"start"}
            alignItems="start"
          >
            <Box
              display="flex"
              flexDirection="row"
              justifyContent={"center"}
              alignItems="center"
            >
              <Typography pr={2} fontWeight="600">
                ORDER NO:
              </Typography>
              <Typography>{item?.orderNo}</Typography>
            </Box>

            <Box
              display="flex"
              flexDirection="row"
              justifyContent={"center"}
              alignItems="center"
            >
              <Typography pr={2} fontWeight="600">
                ORDER DATE
              </Typography>
              <Typography>{`${new Date(
                item?.createdAt?.seconds * 1000
              ).toLocaleDateString("en-US")}`}</Typography>
            </Box>

            <Box
              display="flex"
              flexDirection="row"
              justifyContent={"center"}
              alignItems="center"
            >
              <Typography pr={2} fontWeight="600">
                PRODUCT NAME
              </Typography>
              <Typography>{item?.name}</Typography>
            </Box>

            <Box
              display="flex"
              flexDirection="row"
              justifyContent={"center"}
              alignItems="center"
            >
              <Typography pr={2} fontWeight="600">
                PRODUCT CATEGORY
              </Typography>
              <Typography>{item?.category}</Typography>
            </Box>

            <Box
              display="flex"
              flexDirection="row"
              justifyContent={"center"}
              alignItems="center"
            >
              <Typography pr={2} fontWeight="600">
                PRICE
              </Typography>
              <Typography>{item?.price}</Typography>
            </Box>

            <Box
              display="flex"
              flexDirection="row"
              justifyContent={"center"}
              alignItems="center"
            >
              <Typography pr={2} fontWeight="600">
                QUANTITY
              </Typography>
              <Typography>{item?.quantity}</Typography>
            </Box>

            <Box
              display="flex"
              flexDirection="row"
              justifyContent={"center"}
              alignItems="center"
            >
              <Typography pr={2} fontWeight="600">
                COST
              </Typography>
              <Typography>{item?.cost}</Typography>
            </Box>

            <Box
              display="flex"
              flexDirection="row"
              justifyContent={"center"}
              alignItems="center"
            >
              <Typography pr={2} fontWeight="600">
                PAYMENT METHOD
              </Typography>
              <Typography>{item?.paymentMethod}</Typography>
            </Box>

            <Box
              display="flex"
              flexDirection="row"
              justifyContent={"center"}
              alignItems="center"
            >
              <Typography pr={2} fontWeight="600">
                DELIVERY TYPE
              </Typography>
              <Typography>{item?.deliveryType}</Typography>
            </Box>
            {item?.deliveryType === "Door Delivery" && (
              <Box
                display="flex"
                flexDirection="column"
                justifyContent={"start"}
                alignItems="start"
              >
                <Box
                  paddingX={1}
                  display="flex"
                  flexDirection="row"
                  justifyContent={"start"}
                  alignItems="start"
                >
                  <Typography fontWeight="600" pr={1}>
                    CUSTOMER NAME
                  </Typography>
                  <Typography>{item?.deliveryInfo?.customerName}</Typography>
                </Box>
                <Box
                  paddingX={1}
                  display="flex"
                  flexDirection="row"
                  justifyContent={"start"}
                  alignItems="start"
                >
                  <Typography fontWeight="600" pr={1}>
                    CUSTOMER ADDRESS
                  </Typography>
                  <Typography>{item?.deliveryInfo?.address}</Typography>
                </Box>
                <Box
                  paddingX={1}
                  display="flex"
                  flexDirection="row"
                  justifyContent={"start"}
                  alignItems="start"
                >
                  <Typography fontWeight="600" pr={1}>
                    CUSTOMER CONTACT
                  </Typography>
                  <Typography>{item?.deliveryInfo?.phone}</Typography>
                </Box>

                <Box
                  paddingX={1}
                  display="flex"
                  flexDirection="column"
                  justifyContent={"start"}
                  alignItems="start"
                >
                  <Typography fontWeight="600" pr={1}>
                    DESCRIPTION
                  </Typography>
                  <Typography>{item?.deliveryInfo?.description}</Typography>
                </Box>
              </Box>
            )}
          </Box>
        </Box>

        <Box
          display="flex"
          flexDirection={"row"}
          justifyContent="end"
          alignItems="end"
        >
          <Button variant="contained" onClick={() => setOpen(false)}>
            Done
          </Button>
        </Box>
      </Container>
    </div>
  );
};

export default OrdersPreview;
