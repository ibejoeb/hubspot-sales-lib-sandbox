import * as React from "react";
import { render } from "react-dom";
import { MuiSearchDialog } from "./search";
import algoliasearch from "algoliasearch/lite";

const searchClient = algoliasearch(
  "8PKU4Z4I2H",
  "136ff869dfadbd2a7700076656c4648a"
);

const App: React.FC = () => {
  return (
    <MuiSearchDialog
      indexName="sales_library"
      searchClient={searchClient}
      title="Hello"
      open={true}
    />
  );
};

const rootElement = document.getElementById("root");
render(<App />, rootElement);
