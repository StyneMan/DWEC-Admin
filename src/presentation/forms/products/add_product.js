import React from "react";
import {
  ValidatorForm,
  TextValidator,
  SelectValidator,
} from "react-material-ui-form-validator";
import Avatar from "@mui/material/Avatar";
import { makeStyles } from "@mui/styles";
import Button from "@mui/material/Button";
import {
  db,
  ref,
  storage,
  setDoc,
  doc,
  uploadBytesResumable,
  getDownloadURL,
} from "../../../data/firebase";
import { useSnackbar } from "notistack";
import Backdrop from "@mui/material/Backdrop";
import Box from "@mui/system/Box";
import Typography from "@mui/material/Typography";
import placeholder from "../../../assets/images/placeholder.png";
import NumberFormat from "react-number-format";
import QuillEditor from "../../components/misc/richtext/quill";
import { useHistory } from "react-router-dom";
import ArrowBackIosNew from "@mui/icons-material/ArrowBackIosNew";
import CircularProgress from "@mui/material/CircularProgress";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import { useSelector } from "react-redux";
import { MenuItem } from "@mui/material";

const useStyles = makeStyles((theme) => ({
  image: {
    margin: "0px auto 15px auto",
    width: 120,
    height: 100,
  },
  mb: {
    marginBottom: 10,
  },
}));

const CircularProgressWithLabel = (props) => {
  return (
    <Box position="relative" display="inline-flex">
      <CircularProgress
        variant="determinate"
        {...props}
        size={90}
        thickness={3.0}
        style={{ color: "green" }}
      />
      <Box
        top={0}
        left={0}
        bottom={0}
        right={0}
        position="absolute"
        display="flex"
        alignItems="center"
        justifyContent="center"
      >
        <Typography
          variant="body1"
          component="div"
          style={{ color: "white", fontFamily: "roboto" }}
        >{`${Math.round(props.value)}%`}</Typography>
      </Box>
    </Box>
  );
};

const AddProductForm = () => {
  const classes = useStyles();
  const history = useHistory();

  const [formValues, setFormValues] = React.useState({
    name: "",
    category: "",
    quantity: "",
  });
  const [file, setFile] = React.useState(null);
  const [isUploading, setIsUploading] = React.useState(false);
  const [isLoading, setIsLoading] = React.useState(false);
  const [progress, setProgress] = React.useState(0);
  const [previewImage, setPreviewImage] = React.useState(placeholder);
  const [price, setPrice] = React.useState();
  const [description, setDescription] = React.useState(null);
  const { enqueueSnackbar } = useSnackbar();

  const { categoryData } = useSelector((state) => state.category);

  const handleChange = (e) => {
    const { id, name, value } = e.target;

    if (id === "image") {
      try {
        setFile(e.target.files[0]);
        if (e.target?.files[0]) {
          setPreviewImage(URL.createObjectURL(e.target?.files[0]));
        } else {
          setPreviewImage(placeholder);
        }
        setFormValues((prevData) => ({
          ...prevData,
          image: e.target.value,
        }));
      } catch (e) {}
    } else {
      setFormValues((prevData) => ({ ...prevData, [name]: value }));
    }
  };

  const createProduct = (e) => {
    setIsUploading(true);
    const timeNow = new Date();
    //First upload images to firebase storage then save to firestore
    let storageRef = ref(storage, "products/" + timeNow.getTime());
    let uploadTask = uploadBytesResumable(storageRef, file);

    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const uprogress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        setProgress(uprogress);
      },
      (error) => {
        setIsUploading(false);
        console.log(error);
        enqueueSnackbar(
          `${error?.message || "Check your internet connection"}`,
          { variant: "error" }
        );
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          setIsUploading(false);
          setIsLoading(true);
          setDoc(doc(db, "products", `${timeNow.getTime()}`), {
            id: timeNow.getTime(),
            name: formValues.name,
            image: downloadURL,
            category: formValues.category,
            description: description,
            price: price,
            quantity: formValues.quantity,
            createdAt: timeNow,
            updatedAt: timeNow,
          })
            .then((res) => {
              setIsLoading(false);
              enqueueSnackbar(`New product added successfully`, {
                variant: "success",
              });
              history.goBack();
            })
            .catch((error) => {
              setIsLoading(false);
              enqueueSnackbar(
                `${error?.message || "Check your internet connection"}`,
                {
                  variant: "error",
                }
              );
            });
        });
      }
    );
  };

  return (
    <div>
      <Backdrop style={{ zIndex: 1200 }} open={isUploading || isLoading}>
        {isUploading ? <CircularProgressWithLabel value={progress} /> : <div />}
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
      <ValidatorForm onSubmit={createProduct}>
        <Box
          display="flex"
          flexDirection="row"
          justifyContent={"start"}
          alignItems="start"
        >
          <Button
            startIcon={<ArrowBackIosNew />}
            onClick={() => history.goBack()}
          >
            Back
          </Button>
        </Box>
        <Grid container spacing={1} padding={1}>
          <Grid item xs={12} sm={6} md={6}>
            <TextValidator
              id="image"
              size="small"
              variant="outlined"
              value={formValues.image}
              name="image"
              type="file"
              fullWidth
              disabled={isLoading}
              accept=".png, .jpg, .jpeg"
              onChange={handleChange}
              validators={["required"]}
              errorMessages={["Image is required"]}
              helperText="Featured image"
            />
          </Grid>

          <Grid item xs={12} sm={6} md={6}>
            {previewImage && (
              <Avatar
                variant="rounded"
                alt="Passport"
                src={previewImage}
                className={classes.image}
              />
            )}
          </Grid>
        </Grid>

        <Grid
          container
          spacing={1}
          padding={1}
          display="flex"
          flexDirection="row"
          alignItems="center"
          justifyContent="space-between"
        >
          <Grid item xs={12} sm={6} md={6}>
            <TextValidator
              id="name"
              label="Name"
              size="small"
              variant="outlined"
              value={formValues.name}
              onChange={handleChange}
              name="name"
              fullWidth
              required
              validators={["required"]}
              errorMessages={["Product name is required"]}
            />
          </Grid>

          <Grid item xs={12} sm={6} md={6}>
            <SelectValidator
              margin="normal"
              value={formValues.category}
              onChange={handleChange}
              label="Select Product Category"
              name="category"
              fullWidth
              variant="outlined"
              size="small"
              validators={["required"]}
              errorMessages={["Product category is required"]}
            >
              {categoryData &&
                categoryData?.map((item, index) => (
                  <MenuItem key={index} value={item?.name}>
                    {item?.name}
                  </MenuItem>
                ))}
            </SelectValidator>
          </Grid>
        </Grid>

        <Grid container spacing={1} padding={1}>
          <Grid item xs={12} sm={6} md={6}>
            <NumberFormat
              customInput={TextField}
              onValueChange={(values) => setPrice(values.value)}
              value={price}
              thousandSeparator={true}
              prefix={"₦"}
              fullWidth
              size="small"
              placeholder="Enter price"
              variant="outlined"
              label="Price"
              required
            />
          </Grid>

          <Grid item xs={12} sm={6} md={6}>
            <TextValidator
              className={classes.mb}
              label="Stock Quantity"
              size="small"
              variant="outlined"
              value={formValues.quantity}
              onChange={handleChange}
              name="quantity"
              type="number"
              fullWidth={true}
              required={true}
              validators={["required"]}
              errorMessages={["Stock quantity is required"]}
            />
          </Grid>
        </Grid>

        <br />

        <QuillEditor
          setValue={setDescription}
          placeholder={"Type product description here..."}
        />
        <br />

        <Button
          type="submit"
          variant="contained"
          disabled={isLoading || isUploading}
          fullWidth
        >
          Save
        </Button>
      </ValidatorForm>
    </div>
  );
};

export default AddProductForm;
