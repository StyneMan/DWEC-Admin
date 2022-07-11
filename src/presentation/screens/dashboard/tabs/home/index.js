import React from "react";
import Card from "@mui/material/Card";

import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import { Container, Toolbar } from "@mui/material";
import curve from "../../../../../assets/images/signup_top.png";
import AdsSlider from "./components/ads_slider";

// const useStyles = makeStyles((theme) => ({
//   root: {
//     display: "flex",
//     height: "100vh",
//   },
//   button: {
//     textTransform: "none",
//     fontSize: 11,
//   },
//   row: {
//     display: "flex",
//     flexDirection: "row",
//     justifyContent: "space-between",
//     alignItems: "center",
//   },
// }));

// const CustomToolbar = () => {
//   return (
//     <GridToolbarContainer
//       color="secondary"
//       style={{
//         display: "flex",
//         padding: 16,
//       }}
//     >
//       <Paper style={{ padding: 6, borderRadius: 10 }}>
//         <GridHeader />
//       </Paper>
//       <Paper
//         style={{
//           alignSelf: "flex-end",
//           padding: 6,
//           marginLeft: "auto",
//           borderRadius: 10,
//         }}
//       >
//         <GridToolbarExport />
//       </Paper>
//     </GridToolbarContainer>
//   );
// };

const ItemCard = (props) => {
  let { title, value } = props;

  return (
    <Card elevation={2}>
      <div
        style={{
          position: "relative",
        }}
      >
        <div style={{ position: "absolute", top: 0, left: 0 }}>
          <img src={curve} alt="" width={144} />
        </div>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
          }}
        >
          <Typography
            fontWeight={"700"}
            variant={"h4"}
            gutterBottom
            pt={2}
            pb={1}
          >
            {title}
          </Typography>
          <Typography variant={"h6"} gutterBottom pb={4}>
            {value}
          </Typography>
        </div>
      </div>
    </Card>
  );
};

const HomePage = () => {
  return (
    <div>
      <Container sx={{ paddingBottom: 5 }}>
        <Grid container spacing={3}>
          <Grid item xs={6} sm={4} md={3}>
            <ItemCard title="Orders" value={3000} />
          </Grid>
          <Grid item xs={6} sm={4} md={3}>
            <ItemCard title="Products" value={10000} />
          </Grid>
          <Grid item xs={6} sm={4} md={3}>
            <ItemCard title="Deliveries" value={700} />
          </Grid>
          <Grid item xs={6} sm={4} md={3}>
            <ItemCard title="Sales" value={"1, 800, 000"} />
          </Grid>
        </Grid>
        <Toolbar />
        <Grid container spacing={3}>
          <Grid item xs={12} sm={6} md={7}></Grid>
          <Grid item xs={12} sm={6} md={5}>
            {/* Ads slider here */}
            <AdsSlider />
          </Grid>
        </Grid>
      </Container>
    </div>
  );
};

export default HomePage;
