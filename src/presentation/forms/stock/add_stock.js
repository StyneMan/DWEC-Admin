import React from "react";
import {
  ValidatorForm,
  TextValidator,
  SelectValidator,
} from "react-material-ui-form-validator";
import { makeStyles } from "@mui/styles";
import Button from "@mui/material/Button";
import { db, setDoc, doc } from "../../../data/firebase";
import { useSnackbar } from "notistack";
import Backdrop from "@mui/material/Backdrop";
import { Box } from "@mui/system";
import { CircularProgress, Grid, MenuItem } from "@mui/material";
import { Typography } from "@mui/material";
import QuillEditor from "../../components/misc/richtext/quill";
import { useHistory } from "react-router-dom";
import { ArrowBackIosNew } from "@mui/icons-material";
import { useSelector } from "react-redux";

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

const AddStockForm = (props) => {
  const classes = useStyles();
  const history = useHistory();
  const [formValues, setFormValues] = React.useState({
    product: "",
    supplier: "",
    warehouse: "",
    quantity: "",
  });
  const [isLoading, setIsLoading] = React.useState(false);
  const [summaryBody, setSummaryBody] = React.useState(null);
  const [wareh, setWareH] = React.useState([]);
  const { enqueueSnackbar } = useSnackbar();

  const { productsData } = useSelector((state) => state.products);
  const { suppliersData } = useSelector((state) => state.suppliers);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValues((prevData) => ({ ...prevData, [name]: value }));
    if (name === "supplier") {
      //   console.log(
      //     "DATALIZE::",
      //     suppliersData?.filter((item) => item.name === value)
      //   );
      const filter = suppliersData?.filter((item) => item?.name === value);
      console.log("KLJD::", filter[0]);
      let item = filter[0];
      setWareH(item?.warehouses);
    }
  };

  const createStock = (e) => {
    const timeNow = new Date();

    setDoc(doc(db, "stocks", `${timeNow.getTime()}`), {
      id: timeNow.getTime(),
      product: formValues.product,
      supplier: formValues.supplier,
      warehouse: formValues.warehouse,
      createdAt: timeNow,
      updatedAt: timeNow,
      quantity: formValues.quantity,
      summary: summaryBody,
    })
      .then((res) => {
        setIsLoading(false);
        enqueueSnackbar(`Stock added successfully`, {
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
      <ValidatorForm onSubmit={createStock}>
        <Box
          width={"100%"}
          display="flex"
          flexDirection="row"
          justifyContent="start"
          alignItems={"start"}
          paddingBottom={2}
        >
          <Button
            variant="contained"
            startIcon={<ArrowBackIosNew />}
            onClick={() => history.goBack()}
          >
            Back
          </Button>
          <Typography
            px={4}
            textTransform={"uppercase"}
            variant="h6"
            fontWeight="700"
            color="primary.main"
          >
            New Stock
          </Typography>
        </Box>

        <Grid container spacing={1} marginBottom={1}>
          <Grid item xs={12} sm={6} md={6}>
            <SelectValidator
              className={classes.mb}
              value={formValues.supplier}
              onChange={handleChange}
              label="Select supplier"
              name="supplier"
              fullWidth
              variant="outlined"
              size="small"
              validators={["required"]}
              errorMessages={["Supplier is required"]}
            >
              {suppliersData &&
                (suppliersData ?? [])?.map((item, index) => (
                  <MenuItem key={index} value={item?.name ?? ""}>
                    {item?.name ?? ""}
                  </MenuItem>
                ))}
            </SelectValidator>
          </Grid>

          <Grid item xs={12} sm={6} md={6}>
            <SelectValidator
              className={classes.mb}
              value={formValues.warehouse}
              onChange={handleChange}
              label="Select Warehouse"
              name="warehouse"
              fullWidth
              variant="outlined"
              size="small"
              validators={["required"]}
              errorMessages={["Warehouse is required"]}
            >
              {suppliersData &&
                formValues.supplier &&
                wareh?.map((item, index) => (
                  <MenuItem key={index} value={item ?? ""}>
                    {item ?? ""}
                  </MenuItem>
                ))}
            </SelectValidator>
          </Grid>
        </Grid>

        <br />

        <Grid container spacing={1} marginBottom={1}>
          <Grid item xs={12} sm={6} md={6}>
            <div>
              <SelectValidator
                className={classes.mb}
                value={formValues.product}
                onChange={handleChange}
                label="Select product"
                name="product"
                fullWidth
                variant="outlined"
                size="small"
                validators={["required"]}
                errorMessages={["Product is required"]}
              >
                {productsData &&
                  (productsData ?? [])?.map((item, index) => (
                    <MenuItem key={index} value={item?.id ?? ""}>
                      {item?.name ?? ""}
                    </MenuItem>
                  ))}
              </SelectValidator>
            </div>
          </Grid>

          <Grid item xs={12} sm={6} md={6}>
            <div>
              <TextValidator
                className={classes.mb}
                label="Quantity"
                size="small"
                variant="outlined"
                value={formValues.quantity}
                onChange={handleChange}
                name="quantity"
                fullWidth
                required
                type="number"
                validators={["required"]}
                errorMessages={["Quantity is required image is required"]}
              />
            </div>
          </Grid>
        </Grid>

        <QuillEditor
          setValue={setSummaryBody}
          placeholder={"Type stock summary here..."}
        />
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

export default AddStockForm;
