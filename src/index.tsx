import * as React from "react";
import { render } from "react-dom";
import { InstantSearch } from "react-instantsearch-dom";
import {
  searchClient,
  CustomHits,
  CustomSearchBox,
  CustomRefinementList,
  ConnectedCurrentRefinements
} from "./search";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";

function App() {
  return (
    <InstantSearch indexName="sales_library" searchClient={searchClient}>
      <Grid container direction="row" spacing={2}>
        <Grid item xs={3}>
          <Paper>
            <ConnectedCurrentRefinements />
            <CustomRefinementList attribute="industry" />
          </Paper>
        </Grid>
        <Grid item md>
          <CustomSearchBox />
          <CustomHits />
        </Grid>
      </Grid>
    </InstantSearch>
  );
}

const rootElement = document.getElementById("root");
render(<App />, rootElement);
