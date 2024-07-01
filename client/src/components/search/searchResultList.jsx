import "./searchResultList.css";
import { SearchResult } from "./searchResult";

export const SearchResultsList = ({ results }) => {
  return (
    <div className="results-list bg-gray-800  w-[39ch]  ">
      {results.map((result, id) => {
        console.log(results);
        return <SearchResult title={result.title} imageurl={result.image_url}  key={id} />;
      })}
    </div>
  );
};