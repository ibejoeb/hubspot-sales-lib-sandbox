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

function App() {
  return (
    <InstantSearch indexName="sales_library" searchClient={searchClient}>
      <Grid container direction="row">
        <Grid item xs={3}>
          <ConnectedCurrentRefinements />
          <CustomRefinementList attribute="industry" />
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
