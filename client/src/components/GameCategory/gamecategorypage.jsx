import * as React from 'react';
import { useEffect } from 'react';

import { useParams } from 'react-router-dom';

import MenuItem from '@mui/material/MenuItem';

import Select from '@mui/material/Select';

import Pagination from '@mui/material/Pagination';
import { useDispatch, useSelector } from "react-redux";
import { userState } from "../../slice/userSlice";
import { useNavigate } from "react-router-dom";

import { fetchcategory } from "../../middleware/category";
  // const [age, setAge] = React.useState('');

  const handleChange = (event) => {
    // setAge(event.target.value);
  };

const Card = ({ imageUrl ,gameid }) => {
    return (
      <div className="relative overflow-hidden rounded-lg hover:transition-transform hover:scale-110 hover:z-10  ">
      <div
        className="bg-cover bg-center h-24 sm:h-32 rounded-lg transition-transform transform-gpu scale-100 hover:scale-100 "
        style={{ backgroundImage: `url(${imageUrl})` }}
      ></div>
      <div className="absolute inset-0 rounded-lg  hover:border-[5px] opacity-0 hover:opacity-100 transition-opacity hover:border-custom-purple"></div>
    </div>
    );
  };
  
const GameCategoryPage=()=>{
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { categoryName } = useParams();
  const [page, setPage] = React.useState(1);
  const [filter, setfilter] = React.useState('new');

  const userStates = useSelector(userState);
    const { selectedGames } = useSelector((state) => state.user); 

  const handlepageChange = async(event, value) => {
    setPage(value);
    setfilter('new');
  };

  const handlefilterChange = async(event,value) => {
    setfilter(value.props.value);
    
    setPage(1);
  };



  useEffect(() => {
    
    const fetchData = async () => {
      const data = {
        category: categoryName,
        limit: 63,
        page: page,
        filter: filter,
      };
  
      await fetchcategory(data, dispatch);
    };
  
    fetchData(); // Call the async function immediately
  }, [dispatch, categoryName, filter, page]);

console.log("selectedgames");
  console.log(selectedGames);
  console.log("category name");
  console.log(categoryName);

  const handleGameSelection = (game) => {
    const gameTitle = game.title.replace(/\s+/g, '-').toLowerCase(); // Convert title to URL-friendly format
    navigate(`/game/${gameTitle}`, { state: { game: game, GameData: selectedGames } });
};

return (
    <div className="flex flex-col">

      <div className="flex flex-row justify-between mt-3">
      <h1 className="font-bold font-sans ml-20 mt-1 text-4xl text-white  ">{categoryName}</h1>

     
      <Select
      value={filter}
      onChange={handlefilterChange}
      displayEmpty
      inputProps={{ 'aria-label': 'Without label' }}
      className='mr-3'
      
      sx={{
        color: 'white', // Text color
        '& .MuiSelect-icon': {
          color: 'white', // Arrow color
        },
        '&:hover .MuiOutlinedInput-notchedOutline': {
          borderColor: 'purple', // Change this to the purple color you prefer
        },
        '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
          borderColor: 'white', // Change this to the purple color you prefer
        },
        height: '45px',
        borderRadius: '4px', // Optional: you can adjust this value
        borderWidth: '1px', // Optional: you can adjust this value
        borderStyle: 'solid', // Optional: you can adjust this value
      }}
    >
      
      <MenuItem value={"new"}>New</MenuItem>
      <MenuItem value={"mostPlayed"}>Most Played</MenuItem>
      <MenuItem value={"mostLiked"}>Most Liked</MenuItem>
    </Select>
       
  
     
      </div>
        
      {selectedGames && selectedGames.length > 0 ?
     (
    <div className="grid grid-cols-6  gap-1  mt-[-12px] p-8 ml-12">
   
                    {   selectedGames?.map((game,index) => (
                            <div key={game.id} onClick={() => handleGameSelection(game)}>

                            <Card imageUrl={game.image_url} gameid={game.id}/>
    
                            </div>
                        ))

                      }
                     
                   

    </div> ) 
    : (
      <h1 className="font-bold font-sans ml-40 text-3xl text-white  ">No games</h1>
  )}

    <Pagination size='large' className="mx-auto mb-12 mt-7"count={20} page={page} onChange={handlepageChange}  
   sx={{
        '& .MuiPaginationItem-page': {
          backgroundColor: '#FFFFFF', // Non-selected background color
          color: '#000000', // Non-selected text color
          '&:hover': {
            backgroundColor: '#f0f0f0', // Light grey background on hover for non-selected pages
          },
        },
        '& .MuiPaginationItem-page.Mui-selected': {
          backgroundColor: 'rgb(108, 0, 224)', // Selected background color
          color: '#FFFFFF', // Selected text color
          '&:hover, &:focus': {
            backgroundColor: 'rgb(108, 0, 224)', // Keep the background color the same on hover and focus
            outline: 'none', // Remove the default outline
          },
        },
        '& .MuiPaginationItem-ellipsis': {
          color: '#FFFFFF', // Color for ellipsis
        },
        '& .MuiPaginationItem-previousNext': {
          color: '#FFFFFF', // Color for arrows
        },
        '& .MuiPaginationItem-previousNext.Mui-disabled': {
          color: 'rgba(255, 255, 255, 0.5)', // Color for disabled arrows
        },
      }}
      
      
      />

  </div>
);
}



export default GameCategoryPage;