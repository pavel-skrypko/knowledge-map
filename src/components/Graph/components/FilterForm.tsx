import { Grid } from "@mui/material";
import { FieldText } from "../../ui/Field/FieldText";

export const FilterForm = () => {
  return (
    <Grid container direction="column" xs={4} sx={{ width: "10vw" }}>
      <Grid item xs={12} rowGap={6} display="grid" sx={{ width: "10vw" }}>
        <FieldText name="category" label="Category" />
      </Grid>
    </Grid>
  );
};
