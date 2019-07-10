import * as React from "react";
import {
  InstantSearch,
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
import ListItemText from "@material-ui/core/ListItemText";
import Checkbox from "@material-ui/core/Checkbox";
import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import Select from "@material-ui/core/Select";
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction";
import { makeStyles, createStyles, Theme } from "@material-ui/core/styles";

interface HitProps {
  hit: any;
}

const MuiHit: React.FC<HitProps> = ({ hit }) => (
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
      <Button
        size="small"
        color="primary"
        href={hit.url}
        target="_blank"
        rel="noreferrer">
        View
      </Button>
    </CardActions>
  </Card>
);

interface HitsProps {
  hits: any[];
}

const MuiHitsBase: React.FC<HitsProps> = ({ hits }) => (
  <Grid container direction="column" spacing={2}>
    {hits.map(hit => (
      <Grid item key={hit.objectID}>
        <MuiHit hit={hit} />
      </Grid>
    ))}
  </Grid>
);

const MuiHits = connectHits(MuiHitsBase);

interface MuiSearchBoxProps {
  currentRefinement: string;
  refine(term: string): void;
}

const MuiSearchBoxBase: React.FC<MuiSearchBoxProps> = ({
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

const MuiSearchBox = connectSearchBox(MuiSearchBoxBase);

const CheckboxItem = ({ item, refine }) => (
  <MenuItem key={item.label} value={item}>
    <Checkbox
      disableRipple
      edge="start"
      checked={item.isRefined}
      tabIndex={-1}
      inputProps={{ "aria-labelledby": `refine-${item.label}` }}
      onChange={e => {
        e.preventDefault();
        refine(item.value);
      }}
    />
    <ListItemText
      id={`refine-${item.label}`}
      primary={item.label.toLowerCase()}
    />
    <ListItemSecondaryAction>
      <Typography variant="caption">{item.count}</Typography>
    </ListItemSecondaryAction>
  </MenuItem>
);

interface MuiRefinementListProps {
  items: any[];
  currentRefinement: string[];
  attribute: string;
  isFromSearch: boolean;
  refine(term: string): void;
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display: "flex",
      flexWrap: "wrap"
    },
    formControl: {
      margin: theme.spacing(1),
      width: "100%"
    }
  })
);

const MuiCheckboxRefinementListBase: React.FC<MuiRefinementListProps> = ({
  items,
  attribute,
  refine,
  currentRefinement
}) => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <FormControl className={classes.formControl}>
        <InputLabel htmlFor="select-multiple">
          {attribute.toLowerCase()}
        </InputLabel>
        <Select
          multiple
          value={currentRefinement}
          renderValue={selected => (selected as string[]).join(", ")}>
          {items.map(item => (
            <CheckboxItem key={item.label} item={item} refine={refine} />
          ))}
        </Select>
      </FormControl>
    </div>
  );
};

const MuiCheckboxRefinementList = connectRefinementList(
  MuiCheckboxRefinementListBase
);

const MuiClearAllFiltersBase = ({ items, refine }) => (
  <Button size="small" variant="text" onClick={() => refine(items)} />
);

const MuiClearAllFilters = connectCurrentRefinements(MuiClearAllFiltersBase);

interface SearchDialogProps {
  title: string;
  indexName: string;
  searchClient: algoliasearch.Client;
  open: boolean;
}

const MuiSearchDialog: React.FC<SearchDialogProps> = ({
  title,
  indexName,
  searchClient,
  open
}) => (
  <InstantSearch indexName={indexName} searchClient={searchClient}>
    <Dialog
      open={open}
      aria-labelledby="scroll-dialog-title"
      scroll="paper"
      fullWidth={true}
      maxWidth="lg">
      <DialogTitle id="scroll-dialog-title">
        {title}
        <MuiSearchBox />
      </DialogTitle>
      <DialogContent dividers={false}>
        <Grid container direction="row" spacing={1}>
          <Grid item sm={3}>
            <MuiCheckboxRefinementList attribute="industry" />
          </Grid>
          <Grid item md>
            <MuiHits />
          </Grid>
        </Grid>
      </DialogContent>
    </Dialog>
  </InstantSearch>
);

export {
  MuiHits,
  MuiSearchBox,
  MuiCheckboxRefinementList,
  MuiClearAllFilters,
  MuiSearchDialog
};
