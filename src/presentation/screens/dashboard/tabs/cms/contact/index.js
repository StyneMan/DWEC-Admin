import React from "react";
import { makeStyles } from "@mui/styles";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import { Edit, Email, LocationOn, Phone, Web } from "@mui/icons-material";
import image from "../../../../../../assets/images/handshake.jpeg";
import Grid from "@mui/material/Grid";
import { useHistory } from "react-router-dom";
import CustomDialog from "../../../../../components/dashboard/dialogs/custom-dialog";
import UpdateContactUsForm from "../../../../../forms/contact-us";
import { useSelector } from "react-redux";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "stretch",
  },
  header: {
    height: 286,
    width: "100%",
    backgroundRepeat: "no-repeat",
    backgroundSize: "cover",
    backgroundPosition: "center",
  },
  row: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  rowStart: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "start",
    alignItems: "center",
  },
}));

const ContactUs = () => {
  const classes = useStyles();
  const history = useHistory();
  const [open, setOpen] = React.useState(false);

  const { contactData } = useSelector((state) => state.cms);

  return (
    <div>
      <CustomDialog
        title="Update Contact Info"
        open={open}
        handleClose={() => setOpen(false)}
        bodyComponent={
          <UpdateContactUsForm
            setOpen={setOpen}
            phone={contactData?.phone}
            email={contactData?.email}
            website={contactData?.website}
            facebook={contactData?.facebook}
            instagram={contactData?.instagram}
          />
        }
      />
      <div className={classes.row}>
        <Typography variant="h4" color="primary.main" fontWeight="700">
          Contact Us
        </Typography>
        <Button
          startIcon={<Edit />}
          variant="contained"
          onClick={() =>
            history.push({
              pathname: "/dashboard/dwec/cms/contact-us/update",
              state: {
                phone: contactData?.phone,
                email: contactData?.email,
                website: contactData?.website,
                address: contactData?.address,
              },
            })
          }
        >
          Edit
        </Button>
      </div>
      <br />
      <Grid container spacing={1}>
        <Grid item xs={12} sm={6} md={5}>
          {contactData && (
            <>
              <br />
              <div className={classes.rowStart}>
                <Phone fontSize="medium" color="primary" />
                <Typography sx={{ ml: 2 }} gutterBottom>
                  {contactData?.phone}
                </Typography>
              </div>

              <div className={classes.rowStart}>
                <Email fontSize="medium" color="primary" />
                <Typography sx={{ ml: 2 }} gutterBottom>
                  {contactData?.email}
                </Typography>
              </div>

              <div className={classes.rowStart}>
                <Web fontSize="medium" color="primary" />
                <Typography sx={{ ml: 2 }} gutterBottom align="justify">
                  {contactData?.website}
                </Typography>
              </div>

              <div className={classes.rowStart}>
                <LocationOn fontSize="medium" color="primary" />
                <Typography sx={{ ml: 2 }} gutterBottom align="justify">
                  {contactData?.address}
                </Typography>
              </div>
            </>
          )}
        </Grid>

        <Grid item xs={12} sm={6} md={7}>
          <div>
            <img src={image} alt="featured-img" width="100%" />
          </div>
        </Grid>
      </Grid>
    </div>
  );
};

export default ContactUs;
