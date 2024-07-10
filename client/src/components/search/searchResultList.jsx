import { SearchResult } from "./searchResult";
import { useNavigate } from "react-router-dom";
import "./searchResultList.css";


export const SearchResultsList = ({ results ,setResults}) => {
  const navigate = useNavigate();
  const handleClick = (title) => {
    console.log(title);
    navigate(`/game/${title}`);
    // Optionally clear search results after navigation
    setResults([]);
};
  return (
    <div className="results-list bg-gray-800  w-[39ch]  ">
      {results.map((result, id) => {
      
       
        return <SearchResult title={result.title} imageurl={result.image_url}  key={id} click={() => handleClick(result.title)} />;
      })}
    </div>
  );
};