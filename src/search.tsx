import * as React from "react";
import {
  Highlight,
  connectHits,
  connectSearchBox,
  connectRefinementList,
  connectCurrentRefinements
} from "react-instantsearch-dom";
import algoliasearch from "algoliasearch/lite";
import Button from "@material-ui/core/Button";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardHeader from "@material-ui/core/CardHeader";
import CardContent from "@material-ui/core/CardContent";
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import Typography from "@material-ui/core/Typography";
import Avatar from "@material-ui/core/Avatar";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import ListSubheader from "@material-ui/core/ListSubheader";
import Checkbox from "@material-ui/core/Checkbox";

const searchClient = algoliasearch(
  "8PKU4Z4I2H",
  "136ff869dfadbd2a7700076656c4648a"
);

interface HitProps {
  hit: any;
}

const Hit: React.FC<HitProps> = ({ hit }) => (
  <Card>
    <CardHeader
      avatar={<Avatar>H</Avatar>}
      title={<Highlight attribute="highlight_stat" hit={hit} />}
      subheader={`${hit.company}, ${hit.industry_detail}`}
    />
    <CardContent>
      <Typography variant="body2" color="textSecondary" component="p">
        <Highlight attribute="tools" hit={hit} />
      </Typography>
    </CardContent>
    <CardActions>
      <Button size="small" color="primary">
        Insert
      </Button>
    </CardActions>
  </Card>
);

interface HitsProps {
  hits: any[];
}

const MyHits: React.FC<HitsProps> = ({ hits }) => (
  <Grid container direction="column" spacing={2}>
    {hits.map(hit => (
      <Grid item key={hit.objectID}>
        <Hit hit={hit} />
      </Grid>
    ))}
  </Grid>
);

const CustomHits = connectHits(MyHits);

interface SearchBoxProps {
  currentRefinement: string;
  refine(term: string): void;
}

const MaterialUiSearchBox: React.FC<SearchBoxProps> = ({
  currentRefinement,
  refine
}) => (
  <form noValidate autoComplete="off">
    <TextField
      id="search"
      value={currentRefinement}
      onChange={e => refine(e.target.value)}
      label="Search"
      fullWidth={true}
    />
  </form>
);

const CustomSearchBox = connectSearchBox(MaterialUiSearchBox);

const CheckboxItem = ({ item, refine, ...others }) => (
  <ListItem>
    <ListItemIcon>
      <Checkbox
        edge="start"
        checked={item.isRefined}
        tabIndex={-1}
        disableRipple
        onChange={(e, checked) => {
          e.preventDefault();
          refine(item.value);
        }}
      />
    </ListItemIcon>
    <ListItemText primary={item.label} />
  </ListItem>
);

const MaterialUiCheckBoxRefinementList = ({
  items,
  attribute,
  refine,
  createURL
}) => (
  <List>
    <ListSubheader style={{ fontSize: 18 }}>
      {attribute.toUpperCase()}
    </ListSubheader>
    {items.map(item => (
      <CheckboxItem
        key={item.label}
        item={item}
        refine={refine}
        createURL={createURL}
      />
    ))}
  </List>
);

const CustomRefinementList = connectRefinementList(
  MaterialUiCheckBoxRefinementList
);

const MaterialUiClearAllFilters = ({ items, refine }) => (
  <Button size="small" variant="text" onClick={() => refine(items)} />
);

const ConnectedCurrentRefinements = connectCurrentRefinements(
  MaterialUiClearAllFilters
);

export {
  CustomHits,
  CustomSearchBox,
  CustomRefinementList,
  ConnectedCurrentRefinements,
  searchClient
};
