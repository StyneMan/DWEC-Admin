import React from "react";
import { makeStyles } from "@mui/styles";
import Button from "@mui/material/Button";
import Divider from "@mui/material/Divider";
import Typography from "@mui/material/Typography";
import Add from "@mui/icons-material/Add";
import CustomDialog from "../../../../components/dashboard/dialogs/custom-dialog";
import DeleteDialog from "../../../../components/dashboard/dialogs/custom-dialog";
import CategoryForm from "../../../../forms/category/new_category_form";
import EditCategoryForm from "../../../../forms/category/update_category";
import Card from "@mui/material/Card";
import CardMedia from "@mui/material/CardMedia";
import IconButton from "@mui/material/IconButton";
import Edit from "@mui/icons-material/Edit";
import Delete from "@mui/icons-material/Delete";
import Grid from "@mui/material/Grid";
import List from "@mui/material/List";
import Box from "@mui/system/Box";
import {
  db,
  doc,
  ref,
  deleteObject,
  storage,
  deleteDoc,
  updateDoc,
  arrayRemove,
} from "../../../../../data/firebase";
import { useSnackbar } from "notistack";
import { useSelector } from "react-redux";
import AddSubCategoryForm from "../../../../forms/category/new_subcategory_form";

const useStyles = makeStyles((theme) => ({
  row: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  main: {
    display: "flex",
    flex: 1,
    flexDirection: "column",
    margin: "auto",
    minHeight: 512,
    alignItems: "center",
  },
  cardMedia: {
    height: 156,
    width: "100%",
  },
  subRow: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "end",
    alignItems: "center",
  },
  lhsRow: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "start",
    alignItems: "center",
  },
}));

const CategoryItem = (props) => {
  const { image, color, name, id, item } = props;
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);
  const [openSub, setOpenSub] = React.useState(false);
  const [openDelete, setOpenDelete] = React.useState(false);
  const { enqueueSnackbar } = useSnackbar();

  const deleteCategory = () => {
    const fileRef = ref(storage, "categories/" + id);

    deleteObject(fileRef)
      .then(async () => {
        // File deleted now delete from firestore,
        try {
          await deleteDoc(doc(db, "categories", "" + id));
          setOpenDelete(false);
          enqueueSnackbar(`Item deleted successfully`, { variant: "success" });
        } catch (error) {
          setOpenDelete(false);
          enqueueSnackbar(
            `${error?.message || "Check your internet connection"}`,
            { variant: "error" }
          );
        }
      })
      .catch((error) => {
        enqueueSnackbar(
          `${error?.message || "Check your internet connection"}`,
          { variant: "error" }
        );
        // console.log("ErR: ", error);
      });
  };

  const deleteSubCategory = async (item) => {
    try {
      await updateDoc(doc(db, "categories", "" + id), {
        subcategories: arrayRemove(...[item]),
      });
      enqueueSnackbar(`Item deleted successfully`, { variant: "success" });
    } catch (error) {
      enqueueSnackbar(`${error?.message || "Check your internet connection"}`, {
        variant: "error",
      });
    }
  };

  const deleteBody = (
    <div>
      <Typography variant="body2" gutterBottom>
        {`Are you sure you want to delete ${name} ?`}
      </Typography>
      <br />
      <div className={classes.subRow}>
        <Button
          size="small"
          variant="contained"
          style={{ marginRight: 4 }}
          onClick={() => setOpenDelete(false)}
        >
          Cancel
        </Button>

        <Button
          size="small"
          variant="contained"
          color="error"
          onClick={deleteCategory}
        >
          Delete
        </Button>
      </div>
    </div>
  );

  return (
    <>
      <CustomDialog
        open={open}
        title="Update Category"
        handleClose={() => setOpen(false)}
        bodyComponent={
          <EditCategoryForm
            setOpen={setOpen}
            img={image}
            name={name}
            id={id}
            color={color}
          />
        }
      />
      <DeleteDialog
        open={openDelete}
        title="Delete Category"
        handleClose={() => setOpenDelete(false)}
        bodyComponent={deleteBody}
      />
      <CustomDialog
        open={openSub}
        title="Add Subcategory"
        handleClose={() => setOpenSub(false)}
        bodyComponent={<AddSubCategoryForm setOpen={setOpenSub} id={id} />}
      />
      <Card elevation={3}>
        <CardMedia image={image} className={classes.cardMedia} />
        <Divider />
        <div className={classes.row}>
          <Typography fontSize={18} color="black" padding={1}>
            {name}
          </Typography>
          <div className={classes.subRow}>
            <IconButton
              aria-label="edit"
              color="primary"
              onClick={() => setOpen(true)}
            >
              <Edit />
            </IconButton>
            <IconButton
              aria-label="delete"
              color="error"
              onClick={() => setOpenDelete(true)}
            >
              <Delete />
            </IconButton>
          </div>
        </div>
        <Box
          padding={1}
          display="flex"
          flexDirection="column"
          justifyContent="start"
        >
          <div className={classes.row}>
            <Box display="flex" flexDirection="column" justifyContent="start">
              <Typography fontSize={16} color="black">
                Subcategories
              </Typography>
              {!item?.subcategories ? (
                <Typography>No subcategories</Typography>
              ) : (
                <List sx={{ width: "100%" }}>
                  {item?.subcategories?.map((item, index) => (
                    <Box
                      key={index}
                      width="100%"
                      display="flex"
                      flexDirection="row"
                      justifyContent="space-between"
                      alignItems="center"
                    >
                      <Typography fontSize={11} align="left">
                        {item}
                      </Typography>
                      <Button
                        startIcon={<Delete />}
                        size="small"
                        disableElevation={true}
                        variant="text"
                        sx={{ textTransform: "capitalize" }}
                        onClick={() => deleteSubCategory(item)}
                      >
                        Delete
                      </Button>
                    </Box>
                  ))}
                </List>
              )}
            </Box>
            <Button
              startIcon={<Add />}
              size="small"
              disableElevation={true}
              variant="text"
              sx={{ textTransform: "capitalize" }}
              onClick={() => setOpenSub(true)}
            >
              Add
            </Button>
          </div>
        </Box>
      </Card>
    </>
  );
};

const Category = () => {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);
  const { categoryData } = useSelector((state) => state.category);

  return (
    <div>
      <CustomDialog
        open={open}
        title="Create New Category"
        handleClose={() => setOpen(false)}
        bodyComponent={<CategoryForm setOpen={setOpen} />}
      />
      <div className={classes.row}>
        <div className={classes.lhsRow}>
          <Typography
            textTransform={"uppercase"}
            variant="h6"
            paddingX={4}
            color="primary.main"
          >
            Category
          </Typography>
        </div>
        <Button
          startIcon={<Add />}
          color="primary"
          variant="contained"
          onClick={() => setOpen(true)}
        >
          Add Category
        </Button>
      </div>
      <br />
      <div className={classes.main}>
        {categoryData && (
          <Grid
            container
            spacing={{ xs: 2, md: 2 }}
            columns={{ xs: 4, sm: 8, md: 12 }}
          >
            {categoryData?.map((_, index) => (
              <Grid item xs={2} sm={4} md={4} key={index}>
                <CategoryItem
                  item={categoryData[index]}
                  id={categoryData[index]?.id}
                  image={categoryData[index]?.image}
                  name={categoryData[index].name}
                  color={categoryData[index].color}
                />
              </Grid>
            ))}
          </Grid>
        )}
      </div>
    </div>
  );
};

export default Category;
