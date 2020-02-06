// @flow strict
import React from "react";
import algoliasearch from "algoliasearch/lite";
import {
  InstantSearch,
  SearchBox,
  connectHits,
  connectStateResults
} from "react-instantsearch-dom";
import styles from "./Search.module.scss";

const searchClient = algoliasearch(
  "WX370V53Q1",
  "1665612ac25b52d4734b5116002f1415"
);

const Search = () => (
  <InstantSearch indexName="gatsby" searchClient={searchClient}>
    <SearchBox
      autoFocus={false}
      translations={{
        placeholder: ""
      }}
    />
    <CustomStateResults />
  </InstantSearch>
);

const CustomStateResults = connectStateResults(({ searchState }) =>
  searchState && searchState.query ? <CustomHits /> : <div />
);

const CustomHits = connectHits(({ hits }) => (
  <div>
    {hits.map(hit => (
      <div className={styles["search"]}>
        <a href={hit.path} className={styles["search__title"]}>
          {hit.title}
        </a>
        <p className={styles["search__description"]}>{hit.description}</p>
      </div>
    ))}
  </div>
));

export default Search;
