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
  doc,
  updateDoc,
  deleteObject,
  uploadBytesResumable,
  getDownloadURL,
} from "../../../data/firebase";
import { useSnackbar } from "notistack";
import Backdrop from "@mui/material/Backdrop";
import Box from "@mui/system/Box";
import Typography from "@mui/material/Typography";
import placeholder from "../../../assets/images/placeholder.png";
import NumberFormat from "react-number-format";
import { useHistory, useLocation } from "react-router-dom";
import ArrowBackIosNew from "@mui/icons-material/ArrowBackIosNew";
import CircularProgress from "@mui/material/CircularProgress";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import { useSelector } from "react-redux";
import MenuItem from "@mui/material/MenuItem";
import QuillEditable from "../../components/misc/richtext/edit_quill";

const useStyles = makeStyles((theme) => ({
  image: {
    margin: "0px auto 15px auto",
    width: 144,
    height: 144,
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

const EditProductForm = () => {
  const classes = useStyles();
  const location = useLocation();
  const history = useHistory();

  let { id, name, category, desc, amnt, quantity, img } = location.state;

  const [formValues, setFormValues] = React.useState({
    name: name,
    image: "",
    category: category,
    quantity: quantity,
  });
  const [file, setFile] = React.useState(null);
  const [isUploading, setIsUploading] = React.useState(false);
  const [isLoading, setIsLoading] = React.useState(false);
  const [progress, setProgress] = React.useState(0);
  const [previewImage, setPreviewImage] = React.useState("");
  const [price, setPrice] = React.useState(amnt);
  const [description, setDescription] = React.useState(desc);
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

  const uploadNew = (e) => {
    setIsUploading(true);
    const timeNow = new Date();

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
        enqueueSnackbar(`${error.message}`, { variant: "error" });
      },
      () => {
        setIsUploading(false);
        setIsLoading(true);
        getDownloadURL(uploadTask.snapshot.ref).then(async (downloadURL) => {
          const mRef = doc(db, "products", `${id}`);
          try {
            await updateDoc(mRef, {
              name: formValues.name,
              image: downloadURL,
              category: formValues.category,
              description: description,
              price: parseInt(`${price}`),
              quantity: formValues.quantity,
            });
            setIsLoading(false);
            enqueueSnackbar(`Product updated successfully`, {
              variant: "success",
            });
            history.goBack();
          } catch (error) {
            setIsLoading(false);
            enqueueSnackbar(`Error updating product`, {
              variant: "error",
            });
          }
        });
      }
    );
  };

  const updateProduct = async (e) => {
    setIsLoading(true);

    if (!previewImage) {
      // console.log("ID: ", id);
      const mRef = doc(db, "products", "" + id);
      try {
        await updateDoc(mRef, {
          name: formValues.name,
          category: formValues.category,
          description: description,
          price: parseInt(`${price}`),
          quantity: formValues.quantity,
        });

        setIsLoading(false);
        enqueueSnackbar(`Product updated successfully`, {
          variant: "success",
        });
        history.goBack();
      } catch (error) {
        setIsLoading(false);
        enqueueSnackbar(`Error updating product`, {
          variant: "error",
        });
      }
    } else {
      const fileRef = ref(storage, "products/" + id);

      deleteObject(fileRef)
        .then(() => {
          // File deleted now upload new file,
          //get download url and save to firestore
          setIsLoading(false);
          uploadNew();
        })
        .catch((error) => {
          setIsLoading(false);
          console.log("ErR: ", error);
        });
    }
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
      <ValidatorForm onSubmit={updateProduct}>
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
        <Grid
          container
          spacing={1}
          padding={1}
          display="flex"
          flexDirection="row"
          justifyContent="space-between"
          alignItems="center"
        >
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
              helperText="Featured image"
            />
          </Grid>

          <Grid item xs={12} sm={6} md={6}>
            <Avatar
              variant="rounded"
              alt="Passport"
              src={previewImage ? previewImage : img}
              className={classes.image}
            />
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
              disabled={true}
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

        <QuillEditable value={description} setValue={setDescription} />
        <br />

        <Button
          type="submit"
          variant="contained"
          disabled={isLoading || isUploading}
          fullWidth
        >
          Update Now
        </Button>
      </ValidatorForm>
    </div>
  );
};

export default EditProductForm;
