import "./searchResult.css";

export const SearchResult = ({ title ,imageurl,click}) => {

  return (
    <div className="search-result z-50  bg-gray-900 rounded-lg  flex items-center justify-start hover:bg-gray-700 hover:cursor-pointer"  onClick={click}>
      <img src={imageurl} alt={title} className="w-12 h-12 object-cover rounded mr-4" />
      <div className="text-white">{title}</div>
    </div>
  );
};