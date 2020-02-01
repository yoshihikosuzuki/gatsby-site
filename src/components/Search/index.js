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
  "1665612ac25b52d4734b5116002f1415"
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
