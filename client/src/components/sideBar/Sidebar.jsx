import * as React from 'react';
import { styled, useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import MuiDrawer from '@mui/material/Drawer';
import MuiAppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import CssBaseline from '@mui/material/CssBaseline';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import MenuOpenIcon from '@mui/icons-material/MenuOpen';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import MailIcon from '@mui/icons-material/Mail';
import InputBase from '@mui/material/InputBase';
import SearchIcon from '@mui/icons-material/Search';
import FavoriteIcon from '@mui/icons-material/Favorite';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Dashhboard from "../dashboard/Dashboard"
import { Button } from '@mui/material';
import Chip from "@mui/material/Chip";
import FaceIcon from "@mui/icons-material/Face";
import Paper from "@mui/material/Paper";
import LockIcon from "@mui/icons-material/Lock";

import Switch from "@mui/material/Switch";
import { useState } from "react";
import Login from "../Authentication/Login";
import Signup from "../Authentication/SignUp";

import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { useAppContext } from "../Appcontext";
import Home from '../home/Home';


import "./Sidebar.css";
import { userState } from '../../slice/userSlice';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import AccountMenu from '../Authentication/SignOut';
import BasicPopover from '../Authentication/SignOut';
import { fetchUniqueCategories } from '../../middleware/category';



const drawerWidth = 240;

const openedMixin = (theme) => ({
  width: drawerWidth,
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: 'hidden',
});

const closedMixin = (theme) => ({
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: 'hidden',
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up('sm')]: {
    width: `calc(${theme.spacing(8)} + 1px)`,
  },
});

const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'flex-end',
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
}));

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== 'open',
})(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(['width', 'margin'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    // marginLeft: drawerWidth,
    // width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const Drawer = styled(MuiDrawer, { shouldForwardProp: (prop) => prop !== 'open' })(
  ({ theme, open }) => ({
    width: drawerWidth,
    flexShrink: 0,
    whiteSpace: 'nowrap',
    boxSizing: 'border-box',
    ...(open && {
      ...openedMixin(theme),
      '& .MuiDrawer-paper': openedMixin(theme),
    }),
    ...(!open && {
      ...closedMixin(theme),
      '& .MuiDrawer-paper': closedMixin(theme),
    }),
  }),
);

const category = [
  {
    index: 1,
    text: "Arcade",
    icon: "https://images.crazygames.com/icon/Action.svg"
  },
  {
    index: 1,
    text: "Majhong",
    icon: "https://images.crazygames.com/icon/Card.svg"
  }
]

// const sideBarData = [
//   {
//     icon: <i class="fa fa-home" style={{
//       fontSize: '24px',
//       color: 'transparent', // Make the icon color transparent to show the gradient
//       backgroundImage: 'linear-gradient(to top, blue, brown)', // Specify your gradient colors here
//       WebkitBackgroundClip: 'text', // Clip the gradient to the text (icon)
//       // display: 'inline-block', // Ensure the icon behaves as an inline-block element
//       // lineHeight: '24px', // Adjust line height to center the icon vertically
//     }}></i>,
//     text: "Dashboard",
//     index: 1
//   },
//   {
//     icon: <i class='fa fa-history' style={{
//       fontSize: '24px',
//       color: 'transparent', // Make the icon color transparent to show the gradient
//       backgroundImage: 'linear-gradient(to top, black, brown)', // Specify your gradient colors here
//       WebkitBackgroundClip: 'text',
//     }}></i>,
//     text: "Speed up",
//     index: 2
//   },
//   {
//     icon: <i className='fa fa-play-circle' style={{
//       fontSize: '24px',
//       color: 'transparent', // Make the icon color transparent to show the gradient
//       backgroundImage: 'linear-gradient(to top, blue, blue)', // Specify your gradient colors here
//       WebkitBackgroundClip: 'text',
//     }}></i>,
//     text: "Recently played",
//     index: 3
//   },
//   {
//     icon: <i className='fa fa-plus-circle' style={{
//       fontSize: '24px',
//       color: 'transparent', // Make the icon color transparent to show the gradient
//       backgroundImage: 'linear-gradient(to top, lightGreen, green)', // Specify your gradient colors here
//       WebkitBackgroundClip: 'text',
//     }}></i>,
//     text: "New",
//     index: 4
//   },
//   {
//     icon: <i className='fa fa-trophy' style={{
//       fontSize: '24px',
//       color: 'transparent', // Make the icon color transparent to show the gradient
//       backgroundImage: 'linear-gradient(to top, lightGreen, orange)', // Specify your gradient colors here
//       WebkitBackgroundClip: 'text',
//     }}></i>,
//     text: "Trending now",
//     index: 5
//   },
//   {
//     icon: <i className='fa fa-refresh' style={{
//       fontSize: '24px',
//       color: 'transparent', // Make the icon color transparent to show the gradient
//       backgroundImage: 'linear-gradient(to top, brown, black)', // Specify your gradient colors here
//       WebkitBackgroundClip: 'text',
//     }}></i>,
//     text: "Updated",
//     index: 6
//   },
//   {
//     icon: <i className='fa fa-film' style={{
//       fontSize: '24px',
//       color: 'transparent', // Make the icon color transparent to show the gradient
//       backgroundImage: 'linear-gradient(to top, wheat, red)', // Specify your gradient colors here
//       WebkitBackgroundClip: 'text',
//     }}></i>,
//     text: "Originals",
//     index: 7
//   },
//   {
//     icon: <i className='fa fa-random' style={{
//       fontSize: '24px',
//       color: 'transparent', // Make the icon color transparent to show the gradient
//       backgroundImage: 'linear-gradient(to top, 	lightcoral, coral)', // Specify your gradient colors here
//       WebkitBackgroundClip: 'text',
//     }}></i>,
//     text: "Random",
//     index: 8
//   },
//   {
//     icon: <i className='fa fa-users' style={{
//       fontSize: '24px',
//       color: 'transparent', // Make the icon color transparent to show the gradient
//       backgroundImage: 'linear-gradient(to top, lightsalmon, orangered)', // Specify your gradient colors here
//       WebkitBackgroundClip: 'text',
//     }}></i>,
//     text: "2 Player",
//     index: 9
//   },
//   {
//     icon: <i className='fa fa-fighter-jet' style={{
//       fontSize: '24px',
//       color: 'transparent', // Make the icon color transparent to show the gradient
//       backgroundImage: 'linear-gradient(to top, indianred, firebrick)', // Specify your gradient colors here
//       WebkitBackgroundClip: 'text',
//     }}></i>,
//     text: "Action",
//     index: 10
//   },
//   {
//     icon: <i className='fa fa-compass' style={{
//       fontSize: '24px',
//       color: 'transparent', // Make the icon color transparent to show the gradient
//       backgroundImage: 'linear-gradient(to top, lightpink, 	deeppink)', // Specify your gradient colors here
//       WebkitBackgroundClip: 'text',
//     }}></i>,
//     text: "Adventure",
//     index: 11
//   },
//   // {
//   //   icon: <i className='fa fa-basketball-ball' style={{ fontSize: '24px' }}></i>,
//   //   text: "Basketball",
//   //   index: 12
//   // },
//   {
//     icon: <i className='fa fa-female' style={{
//       fontSize: '24px',
//       color: 'transparent', // Make the icon color transparent to show the gradient
//       backgroundImage: 'linear-gradient(to top, palevioletred, 	mediumvioletred)', // Specify your gradient colors here
//       WebkitBackgroundClip: 'text',
//     }}></i>,
//     text: "Beauty",
//     index: 13
//   },
//   {
//     icon: <i className='fa fa-motorcycle' style={{
//       fontSize: '24px',
//       color: 'transparent', // Make the icon color transparent to show the gradient
//       backgroundImage: 'linear-gradient(to top, mediumorchid, 	purple)', // Specify your gradient colors here
//       WebkitBackgroundClip: 'text',
//     }}></i>,
//     text: "Bike",
//     index: 14
//   },
//   {
//     icon: <i className='fa fa-car' style={{
//       fontSize: '24px',
//       color: 'transparent', // Make the icon color transparent to show the gradient
//       backgroundImage: 'linear-gradient(to top, royalblue, 	indigo)', // Specify your gradient colors here
//       WebkitBackgroundClip: 'text',
//     }}></i>,
//     text: "Car",
//     index: 15
//   },
//   {
//     icon: <i className='fa fa-id-card' style={{
//       fontSize: '24px',
//       color: 'transparent', // Make the icon color transparent to show the gradient
//       backgroundImage: 'linear-gradient(to top, dodgerblue, 	mediumblue)', // Specify your gradient colors here
//       WebkitBackgroundClip: 'text',
//     }}></i>,
//     text: "Card",
//     index: 16
//   },
//   {
//     icon: <i className='fa fa-users' style={{
//       fontSize: '24px',
//       color: 'transparent', // Make the icon color transparent to show the gradient
//       backgroundImage: 'linear-gradient(to top, steelblue, black)', // Specify your gradient colors here
//       WebkitBackgroundClip: 'text',
//     }}></i>,
//     text: "Casual",
//     index: 17
//   },
//   {
//     icon: <i className='fa fa-mouse-pointer' style={{
//       fontSize: '24px',
//       color: 'transparent', // Make the icon color transparent to show the gradient
//       backgroundImage: 'linear-gradient(to top, rosybrown, 		saddlebrown)', // Specify your gradient colors here
//       WebkitBackgroundClip: 'text',
//     }}></i>,
//     text: "Clicker",
//     index: 18
//   },
//   {
//     icon: <i className='fa fa-gamepad' style={{
//       fontSize: '24px',
//       color: 'transparent', // Make the icon color transparent to show the gradient
//       backgroundImage: 'linear-gradient(to top, blanchedalmond, 		maroon)', // Specify your gradient colors here
//       WebkitBackgroundClip: 'text',
//     }}></i>,
//     text: "Controller",
//     index: 19
//   },
//   // {
//   //   icon: <i className='fa fa-tshirt' style={{ fontSize: '24px' }}></i>,
//   //   text: "Dress Up",
//   //   index: 20
//   // },
//   {
//     icon: <i className='fa fa-car' style={{
//       fontSize: '24px',
//       color: 'transparent', // Make the icon color transparent to show the gradient
//       backgroundImage: 'linear-gradient(to top, blanchedalmond, 		saddlebrown)', // Specify your gradient colors here
//       WebkitBackgroundClip: 'text',
//     }}></i>,
//     text: "Driving",
//     index: 21
//   },
//   // {
//   //   icon: <i className='fa fa-door-open' style={{ fontSize: '24px' }}></i>,
//   //   text: "Escape",
//   //   index: 22
//   // },
//   {
//     icon: <i className='fa fa-bolt' style={{
//       fontSize: '24px',
//       color: 'transparent', // Make the icon color transparent to show the gradient
//       backgroundImage: 'linear-gradient(to top, mistyrose,chocolate)', // Specify your gradient colors here
//       WebkitBackgroundClip: 'text',
//     }}></i>,
//     text: "Flash",
//     index: 23
//   },
//   {
//     icon: <i className='fa fa-crosshairs' style={{
//       fontSize: '24px',
//       color: 'transparent', // Make the icon color transparent to show the gradient
//       backgroundImage: 'linear-gradient(to top, maroon, 		maroon)', // Specify your gradient colors here
//       WebkitBackgroundClip: 'text',
//     }}></i>,
//     text: "FPS",
//     index: 24
//   },
//   // {
//   //   icon: <i className='fa fa-skull' style={{ fontSize: '24px' }}></i>,
//   //   text: "Horror",
//   //   index: 25
//   // },
//   {
//     icon: <i className='fa fa-globe' style={{
//       fontSize: '24px',
//       color: 'transparent', // Make the icon color transparent to show the gradient
//       backgroundImage: 'linear-gradient(to top, green, 		green)', // Specify your gradient colors here
//       WebkitBackgroundClip: 'text',
//     }}></i>,
//     text: ".io",
//     index: 26
//   },
//   {
//     icon: <i className='fa fa-building' style={{
//       fontSize: '24px',
//       color: 'transparent', // Make the icon color transparent to show the gradient
//       backgroundImage: 'linear-gradient(to top, black, 		white)', // Specify your gradient colors here
//       WebkitBackgroundClip: 'text',
//     }}></i>,
//     text: "Mahjong",
//     index: 27
//   },
//   {
//     icon: <i className='fa fa-cube' style={{
//       fontSize: '24px',
//       color: 'transparent', // Make the icon color transparent to show the gradient
//       backgroundImage: 'linear-gradient(to top, black, 		lightblue)', // Specify your gradient colors here
//       WebkitBackgroundClip: 'text',
//     }}></i>,
//     text: "Minecraft",
//     index: 28
//   },
//   // {
//   //   icon: <i className='fa fa-users' style={{ 
//   //     fontSize: '24px',
//   //   color: 'transparent', // Make the icon color transparent to show the gradient
//   //   backgroundImage: 'linear-gradient(to top, cadetblue, 		royalblue)', // Specify your gradient colors here
//   //   WebkitBackgroundClip: 'text',
//   //    }}></i>,
//   //   text: "Multiplayer",
//   //   index: 29
//   // },
//   // {
//   //   icon: <i className='fa fa-billiards' style={{ fontSize: '24px' }}></i>,
//   //   text: "Pool",
//   //   index: 30
//   // },
//   {
//     icon: <i className='fa fa-puzzle-piece' style={{
//       fontSize: '24px',
//       color: 'transparent', // Make the icon color transparent to show the gradient
//       backgroundImage: 'linear-gradient(to top, cadetblue, 		purple)', // Specify your gradient colors here
//       WebkitBackgroundClip: 'text'
//     }}></i>,
//     text: "Puzzle",
//     index: 31
//   },
//   {
//     icon: <i className='fa fa-bomb' style={{
//       fontSize: '24px',
//       color: 'transparent', // Make the icon color transparent to show the gradient
//       backgroundImage: 'linear-gradient(to top, indigo, 		indigo)', // Specify your gradient colors here
//       WebkitBackgroundClip: 'text'
//     }}></i>,
//     text: "Shooting",
//     index: 32
//   },
//   // {
//   //   icon: <i className='fa fa-futbol' style={{ fontSize: '24px' }}></i>,
//   //   text: "Soccer",
//   //   index: 33
//   // },
//   // {
//   //   icon: <i className='fa-solid fa-basketball' style={{ fontSize: '24px' }}></i>,
//   //   text: "Sports",
//   //   index: 34
//   // },
//   {
//     icon: <i className='fa fa-sticky-note' style={{
//       fontSize: '24px',
//       color: 'transparent', // Make the icon color transparent to show the gradient
//       backgroundImage: 'linear-gradient(to top, darkslategray, 		black)', // Specify your gradient colors here
//       WebkitBackgroundClip: 'text'
//     }}></i>,
//     text: "Stickman",
//     index: 35
//   },
//   // {
//   //   icon: <i className='fa fa-shield-alt' style={{ fontSize: '24px' }}></i>,
//   //   text: "Tower Defense",
//   //   index: 36
//   // }
// ];

const Search = styled('div')(({ theme }) => ({
  position: 'relative',

  borderRadius: '21px',
  backgroundColor: 'rgba(255, 255, 255, 0.15)',
  '&:hover': {
    backgroundColor: 'rgba(255, 255, 255, 0.25)',
  },
  margin: 'auto',
  width: '100%',
  [theme.breakpoints.up('sm')]: {
    marginLeft: theme.spacing(1),
    width: 'auto',
  },
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: '100%',
  position: 'absolute',
  pointerEvents: 'none',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: 'inherit',
  width: '100%',
  '& .MuiInputBase-input': {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create('width'),
    [theme.breakpoints.up('sm')]: {
      width: '12ch',
      '&:focus': {
        width: '20ch',
      },
    },
  },
}));




export default function MiniDrawer() {
  const theme = useTheme();
  const [open, setOpen] = React.useState(false);
  const [openSideBar, setOpenSideBar] = React.useState(true);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const userStates = useSelector(userState);

  React.useEffect(() => {
    dispatch(fetchUniqueCategories());
  }, [dispatch]);



  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  const handleSideBarOpen = () => {
    setOpenSideBar(true);
  };

  const handleSideBarClose = () => {
    setOpenSideBar(false);
  };

  const { loginchk, setLogin
  } = useAppContext()

const handleCategory = (game) => {
    navigate(`games/${game.category_name}`);
};


  const [auth, setAuth] = useState(false);
  const authclicked = () => {
    // navigate("/log-in")
    setAuth(true);
  }

  const AuthForm = () => {
    return (
      <div className="App">

        <Paper elevation={0} style={{ padding: "10px", paddingBottom: "50px" }}>
          <div align="center">
            {loginchk ? (
              <Chip
                icon={<LockIcon />}
                label="Log In"
                variant="outlined"
                color="info"
              />
            ) : (
              <Chip
                icon={<FaceIcon />}
                label="Sign Up"
                variant="outlined"
                color="info"
              />
            )}
            <br />


          </div>

          {loginchk ? <Login /> : <Signup />}
        </Paper>
      </div>
    );
  }



  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <AppBar position="fixed" open={open} sx={{ backgroundColor: (theme) => 'rgb(21, 21, 21)' }}>
        <Toolbar >
          <IconButton
            color="inherit"
            aria-label="open drawer"

            onClick={handleDrawerOpen}
            edge="start"
            sx={{
              marginRight: 5,
              // ...(open && { display:'none',rotate:'90deg' }),
            }}
          >
            {open ? <MenuIcon
            /> :
              <MenuOpenIcon
                onClick={handleDrawerClose}
              />}
          </IconButton>
          <Typography variant="h6" noWrap component="div" >
            QuickGames
          </Typography>
          <div style={{ marginLeft: 'auto' }}>
            <Search >
              <SearchIconWrapper>
                <SearchIcon />
              </SearchIconWrapper>
              <StyledInputBase
                placeholder="Search…"
                inputProps={{ 'aria-label': 'search' }}
              />
            </Search>
          </div>

          <IconButton sx={{ marginLeft: '9px' }} color="inherit" aria-label="favorite">
            <FavoriteIcon />
          </IconButton>


          {userStates?.isLoggedIn === true ?
            <IconButton sx={{ marginLeft: '9px' }} color="inherit" aria-label="favorite">
              {/* <AccountCircleIcon fontSize='medium'  /> */}
              {/* <AccountMenu/> */}
              <BasicPopover />
            </IconButton>
            :
            <Button sx={{
              marginLeft: '9px', borderRadius: '50px', justifyContent: 'center', backgroundColor: (theme) => 'rgb(108, 0, 224)',

            }} onClick={authclicked} variant='contained'>Login</Button>
          }
          {/* <Button sx={{marginLeft:'9px', borderRadius: '50px'}}variant='contained'>Sign Up</Button> */}


        </Toolbar>
      </AppBar>
      <Drawer variant="permanent"
        open={open}
        sx={{ backgroundColor: (theme) => 'red', }}
        onMouseEnter={handleDrawerOpen}
        onMouseLeave={handleDrawerClose}
      >
        <DrawerHeader >
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === 'rtl' ? <ChevronRightIcon /> : <ChevronLeftIcon />}
          </IconButton>
        </DrawerHeader>
        <Divider />

        <List
          className='List-Sec'
          sx={{
            background: '#0C0D14',
            color: 'white',
          }}>
          <ListItem disablePadding sx={{ display: 'block' }}>
            <ListItemButton
              sx={{
                minHeight: 48,
                justifyContent: open ? 'initial' : 'center',
                px: 2.5,
                '&:hover': {
                  color: 'rgb(108, 0, 224)',
                  paddingLeft: '5%',
                  transform: '2s',
                  transition: '0.3s'
                }
              }}
              onClick={() => navigate("/")}
            >
            
            <ListItemIcon
              sx={{
                minWidth: 0,
                mr: open ? 3 : 'auto',
                justifyContent: 'center',
              }}
            >
              <i class="fa fa-home" style={{
                fontSize: '24px',
                color: 'transparent',
                backgroundImage: 'linear-gradient(to top, blue, brown)',
                WebkitBackgroundClip: 'text',
              }}></i></ListItemIcon>
            <ListItemText primary="Home" sx={{ opacity: open ? 1 : 0 }} />
            </ListItemButton>
          </ListItem>
          {userStates.uniqueCategories.map((data, index) => (
            <ListItem key={data} disablePadding sx={{ display: 'block' }}>
              <ListItemButton
                sx={{
                  minHeight: 48,
                  justifyContent: open ? 'initial' : 'center',
                  px: 2.5,
                  '&:hover': {
                    color: 'rgb(108, 0, 224)',
                    paddingLeft: '5%',
                    transform: '2s',
                    transition: '0.3s'
                  }
                }}
                
              onClick={() => handleCategory(data)}
              >
                <ListItemIcon
                  sx={{
                    minWidth: 0,
                    mr: open ? 3 : 'auto',
                    justifyContent: 'center',
                  }}
                >
                  <img src={data.icon}></img>
                  {/* {data.icon} */}
                </ListItemIcon>
                <ListItemText primary={data.category_name} sx={{ opacity: open ? 1 : 0 }} />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
        {/* <Divider />*/}
      </Drawer>

      {/* <Box component="main" sx={{ flexGrow: 1, p: 3 }}>


        <DrawerHeader />
<Dialog open={auth} onClose={()=>{setAuth(false);}}>
        


        <DialogContent>
         <AuthForm/>
        </DialogContent>
        </Dialog>
        <Dashhboard/>
      </Box> */}

      <div className='mainScreen'>
        <Dialog open={auth} onClose={() => { setAuth(false); }}>



          <DialogContent>
            <AuthForm />
          </DialogContent>
        </Dialog>

        <DrawerHeader />
        <Dashhboard />
      </div>

    </Box>
  );
}