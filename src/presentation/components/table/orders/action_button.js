import React from "react";
import IconButton from "@mui/material/IconButton";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
// import EmptyModal from "../modal/EmptyModal";
import MoreVertIcon from "@mui/icons-material/MoreVertRounded";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import VisibilityIcon from "@mui/icons-material/VisibilityOutlined";
import Fade from "@mui/material/Fade";
// import DataPreview from "../miscellaneous/DataPreview";
import { useSnackbar } from "notistack";
import { useSelector } from "react-redux";
import { makeStyles } from "@mui/styles";
import CustomDialog from "../../dashboard/dialogs/custom-dialog";
import DoneAll from "@mui/icons-material/DoneAll";
import { db, doc, updateDoc } from "../../../../data/firebase";
import { BikeScooter, Cancel, PrintRounded } from "@mui/icons-material";
// import OrdersPreview from "./preview";
import Box from "@mui/system/Box";
import { Divider, Grid } from "@mui/material";
import logo from "../../../../assets/images/dwec_round.png";
import { useHistory } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  awardRoot: {
    display: "flex",
    flexDirection: "column",
  },
  awardRow: {
    display: "flex",
    flexDirection: "row",
    marginLeft: "auto",
  },
  button: {
    margin: theme.spacing(1),
  },
}));

const Receipt = (props) => {
  let { orderNo, orderDate } = props;
  return (
    <Box
      display="flex"
      flexDirection={"column"}
      justifyContent="start"
      alignItems="start"
    >
      <Typography
        textAlign="center"
        variant="h3"
        fontWeight="700"
        color="primary.main"
        textTransform="uppercase"
      >
        Order Invoice
      </Typography>
      <br />
      <Divider sx={{ color: "primary.main", padding: 1 }} />
      <Divider sx={{ color: "primary.main", padding: 1 }} />
      <br />
      <Grid
        container
        spacing={2}
        display="flex"
        flexDirection="row"
        justifyContent="space-between"
        alignItems="center"
      >
        <Grid item xs={12} sm={6} md={6}>
          <Box
            display="flex"
            flexDirection="row"
            justifyContent="start"
            alignItems="center"
          >
            <img src={logo} alt="" width={128} />
            <Typography variant="h4" color="primary.main" fontWeight="600">
              DWEC Winery
            </Typography>
          </Box>
        </Grid>
        <Grid item xs={12} sm={6} md={6}>
          <Box
            display="flex"
            flexDirection="column"
            justifyContent="end"
            alignItems="end"
          >
            <Typography
              gutterBottom={true}
              variant="h5"
              color="secondary.main"
              fontWeight="600"
            >
              {`Order No:  ${orderNo}`}
            </Typography>
            <Typography>{`Order Created On  ${orderDate}`}</Typography>
          </Box>
        </Grid>
      </Grid>
      <Box
        display="flex"
        flexDirection="column"
        justifyContent="start"
        alignItems="stretch"
      ></Box>
    </Box>
  );
};

const ActionButton = ({ selected }) => {
  const classes = useStyles();
  const history = useHistory();

  const [anchorEl, setAnchorEl] = React.useState(null);
  const [openCompleted, setOpenCompleted] = React.useState(false);
  const [openCancel, setOpenCancel] = React.useState(false);

  const openAction = Boolean(anchorEl);
  const { enqueueSnackbar } = useSnackbar();
  const { userData } = useSelector((state) => state.user);
  const handleMoreAction = (e) => setAnchorEl(e.currentTarget);

  const handleCloseMoreAction = () => {
    setAnchorEl(null);
    setOpenCompleted(false);
  };

  const handleCompleted = () => {
    setOpenCompleted(true);
  };

  const handleCancelled = () => {
    setOpenCancel(true);
  };

  const performCompleted = async () => {
    try {
      const mRef = doc(db, "orders", "" + selected?.row?.id);
      await updateDoc(mRef, {
        status: "Completed",
      });
      enqueueSnackbar(`${"Delivery status updated successfully!"}`, {
        variant: "success",
      });
    } catch (error) {
      enqueueSnackbar(`${error?.message || "Check your internet connection"}`, {
        variant: "error",
      });
    }
  };

  const cancelOrder = async () => {
    try {
      const mRef = doc(db, "orders", "" + selected?.row?.id);
      await updateDoc(mRef, {
        status: "Cancelled",
      });
      enqueueSnackbar(`${"Order cancelled successfully!"}`, {
        variant: "success",
      });
    } catch (error) {
      enqueueSnackbar(`${error?.message || "Check your internet connection"}`, {
        variant: "error",
      });
    }
  };

  const renderCompletedConfirm = (
    <div className={classes.awardRoot}>
      <Typography>
        {`Are you sure you want to mark order as 'completed' ?`}
      </Typography>
      <div className={classes.awardRow}>
        <Button
          className={classes.button}
          variant="contained"
          color="error"
          onClick={() => setOpenCompleted(false)}
        >
          Cancel
        </Button>
        <Button
          className={classes.button}
          variant="contained"
          color="success"
          onClick={performCompleted}
        >
          Confirm
        </Button>
      </div>
    </div>
  );

  const renderCancelConfirm = (
    <div className={classes.awardRoot}>
      <Typography>
        {`Are you sure you want to cancel this order ${selected?.row?.orderNo}? Action cannot be undone`}
      </Typography>
      <div className={classes.awardRow}>
        <Button
          className={classes.button}
          variant="contained"
          color="error"
          onClick={() => setOpenCancel(false)}
        >
          Cancel
        </Button>
        <Button
          className={classes.button}
          variant="contained"
          color="success"
          onClick={cancelOrder}
        >
          Confirm
        </Button>
      </div>
    </div>
  );

  return (
    <>
      <IconButton
        aria-label="actions"
        aria-controls="fade-menu"
        aria-haspopup="true"
        onClick={handleMoreAction}
      >
        <MoreVertIcon />
      </IconButton>
      <Menu
        id="fade-menu"
        anchorEl={anchorEl}
        keepMounted
        open={openAction}
        onClose={handleCloseMoreAction}
        TransitionComponent={Fade}
        elevation={1}
      >
        <MenuItem
          onClick={() =>
            history.push({
              pathname: "/dashboard/dwec/orders/" + selected?.row?.orderNo,
              state: {
                item: selected?.row,
              },
            })
          }
        >
          <ListItemIcon>
            <VisibilityIcon fontSize="small" />
          </ListItemIcon>
          <ListItemText primary="Preview" />
        </MenuItem>

        <MenuItem>
          <ListItemIcon>
            <PrintRounded fontSize="small" />
          </ListItemIcon>
          <ListItemText primary="Print Receipt" />
        </MenuItem>
        {((userData && userData?.userType === "Admin") ||
          (userData && userData?.userType === "Manager")) &&
        selected?.row ? (
          <>
            {(selected?.row?.status === "Pending" ||
              selected?.row?.status === "In Shipping") && (
              <div>
                {selected.row?.status !== "Cancelled" &&
                  (selected?.row?.deliveryType === "Pickup" ? (
                    <>
                      <MenuItem onClick={handleCompleted}>
                        <ListItemIcon>
                          <DoneAll fontSize="small" color="success" />
                        </ListItemIcon>
                        <ListItemText primary="Mark As Completed" />
                      </MenuItem>
                      <CustomDialog
                        title="Mark As Completed"
                        bodyComponent={renderCompletedConfirm}
                        open={openCompleted}
                        handleClose={() => setOpenCompleted(false)}
                      />
                    </>
                  ) : (
                    <>
                      <MenuItem
                        onClick={() =>
                          history.push({
                            pathname:
                              "/dashboard/dwec/orders/" +
                              selected?.row?.orderNo +
                              "/shipping",
                            state: {
                              item: selected?.row,
                            },
                          })
                        }
                      >
                        <ListItemIcon>
                          <BikeScooter fontSize="small" />
                        </ListItemIcon>
                        <ListItemText primary="Send For Shipping" />
                      </MenuItem>
                    </>
                  ))}

                {selected?.row?.status !== "Completed" && (
                  <>
                    <MenuItem onClick={handleCancelled}>
                      <ListItemIcon>
                        <Cancel fontSize="small" color="error" />
                      </ListItemIcon>
                      <ListItemText primary="Cancel" />
                    </MenuItem>
                    <CustomDialog
                      title="Cancel Order"
                      bodyComponent={renderCancelConfirm}
                      open={openCancel}
                      handleClose={() => setOpenCancel(false)}
                    />
                  </>
                )}
              </div>
            )}
          </>
        ) : null}
      </Menu>
    </>
  );
};

export default ActionButton;
