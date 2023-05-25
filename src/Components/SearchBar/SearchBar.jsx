import { useState } from "react";
import { TextField, FormControl, InputLabel, Select, MenuItem, Grid } from "@mui/material";

function SearchBar({ onSearch, venues, setVenues }) {
  const [query, setQuery] = useState("");
  const [sortType, setSortType] = useState("recentlyCreated");

  const handleSearch = (event) => {
    const newQuery = event.target.value;
    setQuery(newQuery);
    onSearch(newQuery);
  };

  const sortVenues = (venues, sortType) => {
    let sortedVenues = [...venues];
    if (sortType === "recentlyCreated") {
      sortedVenues.sort((a, b) => new Date(b.created) - new Date(a.created));
    } else if (sortType === "highestRated") {
      sortedVenues.sort((a, b) => b.rating - a.rating);
    } else if (sortType === "lowestPrice") {
      sortedVenues.sort((a, b) => a.price - b.price);
    } else if (sortType === "highestPrice") {
      sortedVenues.sort((a, b) => b.price - a.price);
    }
    return sortedVenues;
  };

  const handleSortChange = (event) => {
    const newSortType = event.target.value;
    setSortType(newSortType);
    const sortedVenues = sortVenues(venues, newSortType);
    setVenues(sortedVenues);
  };

  return (
    <Grid
      container={true}
      display="flex"
      justifyContent="end"
      alignItems="center"
      marginTop={2}
      marginBottom={2}
      component="form"
      aria-label="Venue Search and Sort"
    >
      <Grid item xs={12} sm={7} md={9}>
        <TextField
          variant="outlined"
          type="text"
          value={query}
          onChange={handleSearch}
          placeholder="Search by title or location..."
          fullWidth
          sx={{
            "&:focus": {
              borderColor: "primary.dark",
              boxShadow: (t) => `0 0 10px ${t.palette.primary.main}`,
            },
          }}
          inputProps={{
            "aria-label": "Search",
          }}
        />
      </Grid>
      <Grid item xs={12} sm={5} md={3}>
        <FormControl variant="outlined" fullWidth aria-label="Search/Sort Form">
          <InputLabel id="sort-type-label">Sort By</InputLabel>
          <Select
            labelId="sort-type-label"
            id="sort-type-select"
            value={sortType}
            onChange={handleSortChange}
            label="Sort By"
            inputProps={{
              "aria-label": "Sort By",
            }}
          >
            <MenuItem value="recentlyCreated">Recently Created</MenuItem>
            <MenuItem value="highestRated">Highest Rated</MenuItem>
            <MenuItem value="lowestPrice">Lowest Price</MenuItem>
            <MenuItem value="highestPrice">Highest Price</MenuItem>
          </Select>
        </FormControl>
      </Grid>
    </Grid>
  );
}

export default SearchBar;
