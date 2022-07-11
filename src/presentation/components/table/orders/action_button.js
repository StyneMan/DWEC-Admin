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
import { Cancel } from "@mui/icons-material";
import OrdersPreview from "./preview";

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

const ActionButton = ({ selected }) => {
  const classes = useStyles();

  const [anchorEl, setAnchorEl] = React.useState(null);
  const [openPreviewModal, setOpenPreviewModal] = React.useState(false);
  const [openCompleted, setOpenCompleted] = React.useState(false);
  const [openCancel, setOpenCancel] = React.useState(false);

  const openAction = Boolean(anchorEl);
  const { enqueueSnackbar } = useSnackbar();
  const { userData } = useSelector((state) => state.user);
  const handleMoreAction = (e) => setAnchorEl(e.currentTarget);

  const handleCloseMoreAction = () => {
    setAnchorEl(null);
    setOpenCompleted(false);
    setOpenPreviewModal(false);
  };
  const handlePreview = () => {
    setOpenPreviewModal(true);
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
        <MenuItem onClick={handlePreview}>
          <ListItemIcon>
            <VisibilityIcon fontSize="small" />
          </ListItemIcon>
          <ListItemText primary="Preview" />
        </MenuItem>
        <CustomDialog
          title="Preview Data"
          bodyComponent={
            <OrdersPreview item={selected?.row} setOpen={setOpenPreviewModal} />
          }
          open={openPreviewModal}
          handleClose={handleCloseMoreAction}
        />
        {((userData && userData?.userType === "Admin") ||
          (userData && userData?.userType === "Manager")) &&
        selected?.row ? (
          <>
            {(selected?.row?.status === "Pending" ||
              selected?.row?.status === "In Shipping") && (
              <div>
                {selected.row?.status !== "Cancelled" && (
                  <>
                    <MenuItem onClick={handleCompleted}>
                      <ListItemIcon>
                        <DoneAll fontSize="small" color="success" />
                      </ListItemIcon>
                      <ListItemText primary="Completed" />
                    </MenuItem>
                    <CustomDialog
                      title="Mark As Completed"
                      bodyComponent={renderCompletedConfirm}
                      open={openCompleted}
                      handleClose={() => setOpenCompleted(false)}
                    />
                  </>
                )}

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
