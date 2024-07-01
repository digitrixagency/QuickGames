import "./searchResult.css";
import { useNavigate } from "react-router-dom";
export const SearchResult = ({ title ,imageurl}) => {
  const navigate = useNavigate();
  const handleClick = () => {
    navigate(`/game/${title}`); // Navigate to the game page with encoded title
  };
  return (
    <div className="search-result z-50  bg-gray-900 rounded-lg  flex items-center justify-start hover:bg-gray-700 hover:cursor-pointer" onClick={handleClick}>
      <img src={imageurl} alt={title} className="w-12 h-12 object-cover rounded mr-4" />
      <div className="text-white">{title}</div>
    </div>
  );
};