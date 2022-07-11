import {
  Card,
  CardActionArea,
  //   CardMedia,
  Container,
  Divider,
  Grid,
  TextField,
  Toolbar,
  Typography,
} from "@mui/material";
import { Box } from "@mui/system";
import React from "react";
import { useSelector } from "react-redux";
import { useSnackbar } from "notistack";
import logo from "../../../assets/images/dwec_round.png";
import CurrencyFormat from "react-currency-format";
import POSTable from "../../components/table/pos";
import {
  db,
  doc,
  arrUnion,
  FieldValue,
  arrayUnion,
} from "../../../data/firebase";
import { updateDoc } from "firebase/firestore/lite";

const ItemCard = (props) => {
  let { item, userData, list } = props;
  const { enqueueSnackbar } = useSnackbar();

  const addProduct = () => {
    // First check if this is already added
    const timeNow = new Date();
    list?.forEach(async (elem) => {
      if (elem?.id === item?.productId) {
        enqueueSnackbar(`${"Product already added"}`, {
          variant: "info",
        });
      } else {
        const usersRef = doc(db, "users", "" + userData?.id);

        // Atomically add a new region to the "regions" array field.
        try {
          const resp = await updateDoc(usersRef, {
            sales: arrayUnion([
              {
                id: timeNow,
                productId: item?.id,
                category: item?.category,
                name: item?.name,
                quantity: 1,
                image: item?.image,
                price: item?.price,
                subtotal: item?.price * 1,
              },
            ]),
          });

          console.log("CHEECK:: ", resp);
        } catch (error) {
          enqueueSnackbar(
            `${error?.message || "Check your internet connection!"}`,
            {
              variant: "error",
            }
          );
        }
      }
    });
  };

  return (
    <div>
      <Card
        elevation={0}
        sx={{ borderRadius: 2, backgroundColor: "#9A031E1A", height: 144 }}
      >
        <CardActionArea
          onClick={addProduct}
          sx={{ borderRadius: 2, backgroundColor: "#9A031E1A", height: 144 }}
        >
          <img src={item?.image} alt="" width={100} />
        </CardActionArea>
      </Card>
      <Typography paddingY={1}>{item?.name}</Typography>
    </div>
  );
};

const Receipt = (props) => {
  //   let { item } = props;
  return (
    <div>
      <Box
        pb={1}
        display="flex"
        flexDirection="row"
        justifyContent="space-between"
        alignItems="start"
      >
        <img src={logo} alt="" width="40%" />
        <Box
          pt={1}
          display="flex"
          flexDirection="column"
          justifyContent="space-between"
          alignItems="start"
        >
          <Typography
            fontSize={16}
            color="primary.main"
            gutterBottom
            fontWeight="600"
          >
            DWEC Winery Shop
          </Typography>
          <Typography fontSize={13}>Unique wine for unique people.</Typography>
        </Box>
      </Box>
      <Divider />
      <Box
        pt={1.5}
        display="flex"
        flexDirection="column"
        justifyContent="start"
        alignItems="stretch"
      >
        <Box
          display="flex"
          flexDirection="row"
          justifyContent="space-between"
          alignItems="center"
          paddingY={1}
        >
          <Typography>Total Items</Typography>
          <Typography>{1}</Typography>
        </Box>
        <Divider />
        <Box
          display="flex"
          flexDirection="row"
          justifyContent="space-between"
          alignItems="center"
          paddingY={1}
        >
          <Typography>Sub total</Typography>
          <CurrencyFormat
            value={2456981}
            displayType={"text"}
            thousandSeparator={true}
            prefix={"₦"}
          />
          {/* <Typography>{`${getSymbolFromCurrency("NGN")}123290`}</Typography> */}
        </Box>
        <Divider />
        <Box
          paddingY={1}
          display="flex"
          flexDirection="row"
          justifyContent="space-between"
          alignItems="center"
        >
          <Typography>Tax</Typography>
          <CurrencyFormat
            value={2456}
            displayType={"text"}
            thousandSeparator={true}
            prefix={"₦"}
          />
        </Box>
        <Divider />
      </Box>
    </div>
  );
};

const SalesDashboard = () => {
  const [keyword, setKeyword] = React.useState(null);
  const [list, setList] = React.useState([]);
  const { productsData } = useSelector((state) => state.products);
  const { userData } = useSelector((state) => state.user);

  React.useEffect(() => {
    if (productsData) {
      setList(productsData);
    }
  }, [productsData]);

  const handleSearch = (e) => {
    let { value } = e?.target;
    setKeyword(value);
    if (productsData) {
      let filtered = productsData?.filter((item) =>
        item?.name.toLowerCase().includes(value?.toLowerCase())
      );
      setList(filtered);
    }
  };

  return (
    <Container disableGutters>
      <Box width="100%" height="96vh" paddingY={2}>
        <Grid container spacing={4}>
          <Grid item xs={12} sm={12} md={4}>
            <Card elevation={4}>
              <Box
                padding={2}
                display="flex"
                flexDirection="column"
                justifyContent="start"
                alignItems="start"
                height="100%"
              >
                <TextField
                  variant="outlined"
                  onChange={handleSearch}
                  value={keyword}
                  placeholder="Type product name here"
                />
                <Toolbar />
                <div
                  style={{
                    width: "100%",
                    height: 375,
                    overflow: "auto",
                  }}
                >
                  {list && (
                    <Grid
                      container
                      spacing={{ xs: 2, md: 2 }}
                      columns={{ xs: 4, sm: 8, md: 12 }}
                    >
                      {list?.map((item, index) => (
                        <Grid item xs={12} sm={6} md={4} key={index}>
                          <ItemCard
                            item={item}
                            userData={userData}
                            list={list}
                          />
                        </Grid>
                      ))}
                    </Grid>
                  )}
                </div>
              </Box>
            </Card>
          </Grid>
          <Grid item xs={12} sm={12} md={5}>
            <Card elevation={4}>
              <Box
                padding={2}
                display="flex"
                flexDirection="column"
                justifyContent="start"
                alignItems="start"
                height="100%"
              >
                <div
                  style={{
                    width: "100%",
                    height: 375,
                    overflow: "auto",
                  }}
                >
                  <POSTable />
                  {/* <StickyHeadTable /> */}
                  {/* {userData && (
                    <List sx={{ width: "100%" }}>
                      <SalesItem
                        hide={true}
                        item={{
                          name: "Name",
                          price: "Price",
                          quantity: "Quantity",
                          subtotal: "SubTotal",
                        }}
                      />
                      {userData?.sales?.map((item, index) => (
                        <ListItem key={index} disableGutters disablePadding>
                          <SalesItem item={item} />
                        </ListItem>
                      ))}
                    </List>
                  )} */}
                </div>
              </Box>
            </Card>
          </Grid>
          <Grid item xs={12} sm={12} md={3}>
            <Card elevation={4}>
              <Box
                padding={2}
                display="flex"
                flexDirection="column"
                justifyContent="start"
                alignItems="start"
                height="100%"
              >
                <div
                  style={{
                    width: "100%",
                    height: 375,
                    overflow: "auto",
                  }}
                >
                  <Receipt />
                </div>
              </Box>
            </Card>
          </Grid>
        </Grid>
      </Box>
    </Container>
  );
};

export default SalesDashboard;
