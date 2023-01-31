import React from "react";
import { Grid } from "@mui/material";
import Container from "@mui/material/Container";

const FormContainer = ({ children }) => {
  return (
    <Container maxWidth='xl'>
      <Grid container spacing={2}>
        <Grid item xs={12} md={12}>
          {children}
        </Grid>
      </Grid>
    </Container>
  );
};

export default FormContainer;
