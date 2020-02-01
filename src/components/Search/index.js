import React from "react";
import algoliasearch from "algoliasearch/lite";
import {
  InstantSearch,
  SearchBox,
  connectHits,
  connectStateResults
} from "react-instantsearch-dom";
import "./Search.scss";

const searchClient = algoliasearch(
  "WX370V53Q1",
  "a007fbe3467b9fae337237fa0c0b1be8"
);

const Search = () => (
  <InstantSearch indexName="gatsby" searchClient={searchClient}>
    <SearchBox />
    <CustomStateResults />
  </InstantSearch>
);

const CustomStateResults = connectStateResults(({ searchState }) =>
  searchState && searchState.query ? <CustomHits /> : <div />
);

const CustomHits = connectHits(({ hits }) => (
  <div>
    {hits.map(hit => (
      <div className="search">
        <a href={hit.path}>{hit.title}</a>
        <p>{hit.description}</p>
      </div>
    ))}
  </div>
));

export default Search;
