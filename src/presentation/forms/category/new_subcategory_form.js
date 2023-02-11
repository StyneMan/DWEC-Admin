import React from "react";
import { ValidatorForm, TextValidator } from "react-material-ui-form-validator";

import Button from "@mui/material/Button";
import { db, doc, arrayUnion, updateDoc } from "../../../data/firebase/";
import { useSnackbar } from "notistack";
import Backdrop from "@mui/material/Backdrop";
import { CircularProgress } from "@mui/material";

const AddSubCategoryForm = (props) => {
  let { setOpen, id } = props;
  const [formValues, setFormValues] = React.useState({
    title: "",
  });
  const [isLoading, setIsLoading] = React.useState(false);

  const { enqueueSnackbar } = useSnackbar();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValues((prevData) => ({ ...prevData, [name]: value }));
  };

  const addSubcategory = async (e) => {
    setIsLoading(true);
    const mRef = doc(db, "categories", "" + id);
    try {
      await updateDoc(mRef, {
        subcategories: arrayUnion(...[formValues.title]),
      });
      setOpen(false);
      setIsLoading(false);
      enqueueSnackbar(`Subcategory added successfully`, {
        variant: "success",
      });
    } catch (error) {
      setIsLoading(false);
      enqueueSnackbar(`${error?.message || "Check your internet connection"}`, {
        variant: "error",
      });
    }
  };

  return (
    <div>
      <Backdrop style={{ zIndex: 1200 }} open={isLoading}>
        {isLoading ? (
          <CircularProgress
            size={90}
            thickness={3.0}
            style={{ color: "white" }}
          />
        ) : (
          <div />
        )}
      </Backdrop>
      <ValidatorForm onSubmit={addSubcategory}>
        <TextValidator
          id="title"
          label="Subcategory name"
          size="small"
          variant="outlined"
          value={formValues.title}
          onChange={handleChange}
          name="title"
          fullWidth
          validators={["required"]}
          errorMessages={["Subcategory name is required"]}
        />
        <br />
        <br />
        <Button
          type="submit"
          variant="contained"
          disabled={isLoading}
          fullWidth
        >
          Save
        </Button>
      </ValidatorForm>
    </div>
  );
};

export default AddSubCategoryForm;
