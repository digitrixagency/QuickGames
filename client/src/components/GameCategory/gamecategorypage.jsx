import * as React from 'react';
import game1 from "../DashBoardSlider/game1.webp"
import game2 from "../DashBoardSlider/game2.webp"
import game3 from "../DashBoardSlider/game3.webp"
import game4 from "../DashBoardSlider/game4.webp"
import game5 from "./game5.webp"
import game6 from "./game6.webp"
import game7 from "./game7.webp"

import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormHelperText from '@mui/material/FormHelperText';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import Typography from '@mui/material/Typography';
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';


  // const [age, setAge] = React.useState('');

  const handleChange = (event) => {
    // setAge(event.target.value);
  };

const Card = ({ imageUrl }) => {
    return (
      <div className="relative overflow-hidden rounded-lg hover:transition-transform hover:scale-110 hover:z-10 ">
      <div
        className="bg-cover bg-center h-24 sm:h-32 rounded-lg transition-transform transform-gpu scale-100 hover:scale-100"
        style={{ backgroundImage: `url(${imageUrl})` }}
      ></div>
      <div className="absolute inset-0 rounded-lg  border-2 opacity-0 hover:opacity-100 transition-opacity"></div>
    </div>
    );
  };
  
const GameCategoryPage=()=>{
  const [page, setPage] = React.useState(1);
  const [filter, setfilter] = React.useState('new');

  const handlepageChange = (event, value) => {
    console.log(value)
    setPage(value);
  };

  const handlefilterChange = (event,value) => {
  console.log(value.props.value)
    setfilter(value.props.value);
  };

return (
    <div className="flex flex-col">

      <div className="flex flex-row justify-between mt-3">
      <h1 className="font-bold font-sans ml-20 text-3xl  ">Card Game</h1>

     
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
      <MenuItem value={"mostLiked"}>Trending</MenuItem>
    </Select>
       
  
     
      </div>
        

    
    <div className="grid grid-cols-6  gap-1   p-8 ml-12">
    <Card imageUrl={game1}/>
    <Card imageUrl={game2}/>
    <Card imageUrl={game3}/>
    <Card imageUrl={game5}/>
    <Card imageUrl={game1}/>
    <Card imageUrl={game6}/>
    <Card imageUrl={game2}/>
    <Card imageUrl={game4}/>
    <Card imageUrl={game7}/>
    <Card imageUrl={game1}/>
    <Card imageUrl={game3}/>

    <Card imageUrl={game2}/>
    <Card imageUrl={game1}/>
    <Card imageUrl={game3}/>

    <Card imageUrl={game5}/>
    <Card imageUrl={game4}/>
    <Card imageUrl={game7}/>
    <Card imageUrl={game1}/>
    <Card imageUrl={game3}/>
    <Card imageUrl={game6}/>
    <Card imageUrl={game1}/>
    <Card imageUrl={game5}/>
    <Card imageUrl={game2}/>
    <Card imageUrl={game1}/>
    <Card imageUrl={game7}/>

    <Card imageUrl={game1}/>
    <Card imageUrl={game3}/>
    <Card imageUrl={game4}/>

    </div>

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