import * as React from "react";
import { styled, useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import { Button } from "@mui/material";
import MuiDrawer from "@mui/material/Drawer";
import MuiAppBar from "@mui/material/AppBar";
import GoogleButton from "react-google-button";
import { SearchBar } from "../search/searchbar";
import Toolbar from "@mui/material/Toolbar";
import List from "@mui/material/List";
import CssBaseline from "@mui/material/CssBaseline";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import MenuOpenIcon from "@mui/icons-material/MenuOpen";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import InboxIcon from "@mui/icons-material/MoveToInbox";
import MailIcon from "@mui/icons-material/Mail";
import InputBase from "@mui/material/InputBase";
import SearchIcon from "@mui/icons-material/Search";
import CloseIcon from "@mui/icons-material/Close";
import FavoriteIcon from "@mui/icons-material/Favorite";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Dashhboard from "../dashboard/Dashboard";
import Chip from "@mui/material/Chip";
import FaceIcon from "@mui/icons-material/Face";
import Paper from "@mui/material/Paper";
import LockIcon from "@mui/icons-material/Lock";

import Switch from "@mui/material/Switch";
import { useState,useRef,useEffect } from "react";
import Login from "../Authentication/Login";
import Signup from "../Authentication/SignUp";

import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { useAppContext } from "../Appcontext";
import Home from "../home/Home";

import "./Sidebar.css";
import { userState } from "../../slice/userSlice";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import AccountMenu from "../Authentication/SignOut";
import BasicPopover from "../Authentication/SignOut";
import { fetchUniqueCategories } from "../../middleware/category";

import { SearchResultsList } from "../search/searchResultList";

const drawerWidth = 240;

const openedMixin = (theme) => ({
  width: drawerWidth,
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: "hidden",
});

const closedMixin = (theme) => ({
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: "hidden",
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up("sm")]: {
    width: `calc(${theme.spacing(8)} + 1px)`,
  },
});

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "flex-end",
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
}));

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(["width", "margin"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    // marginLeft: drawerWidth,
    // width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const Drawer = styled(MuiDrawer, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  width: drawerWidth,
  flexShrink: 0,
  whiteSpace: "nowrap",
  boxSizing: "border-box",
  ...(open && {
    ...openedMixin(theme),
    "& .MuiDrawer-paper": openedMixin(theme),
  }),
  ...(!open && {
    ...closedMixin(theme),
    "& .MuiDrawer-paper": closedMixin(theme),
  }),
}));

const category = [
  {
    index: 1,
    text: "Arcade",
    icon: "https://images.crazygames.com/icon/Action.svg",
  },
  {
    index: 1,
    text: "Majhong",
    icon: "https://images.crazygames.com/icon/Card.svg",
  },
];
const Search = styled("div")(({ theme }) => ({
  position: "relative",

  borderRadius: "21px",
  backgroundColor: "rgba(255, 255, 255, 0.15)",
  "&:hover": {
    backgroundColor: "rgba(255, 255, 255, 0.25)",
  },
  margin: "auto",
  width: "100%",
  [theme.breakpoints.up("sm")]: {
    marginLeft: theme.spacing(1),
    width: "auto",
  },
}));

const SearchIconWrapper = styled("div")(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: "100%",
  position: "absolute",
  pointerEvents: "none",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: "inherit",
  width: "100%",
  "& .MuiInputBase-input": {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create("width"),
    [theme.breakpoints.up("sm")]: {
      width: "12ch",
      "&:focus": {
        width: "20ch",
      },
    },
  },
}));

export default function MiniDrawer() {
  const theme = useTheme();
  const [open, setOpen] = React.useState(false);
  const [openSideBar, setOpenSideBar] = React.useState(true);
  const [results, setResults] = useState([]);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const userStates = useSelector(userState);

  const searchBarRef = useRef(null);

  useEffect(() => {
    // Function to handle clicks outside the search bar
    const handleClickOutside = (event) => {
      if (searchBarRef.current && !searchBarRef.current.contains(event.target)) {
       
       
      }
      else{
        setResults([]);
        console.log(1);
      }
      
    };

    // Add event listener to handle clicks outside the search bar
    document.addEventListener('mousedown', handleClickOutside);

    // Cleanup the event listener
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

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

  const { loginchk, setLogin } = useAppContext();

  const handleCategory = (game) => {
    navigate(`games/${game.category_name}`);
  };

  const handleFavouriteGames = () => {
    navigate(`favourite/1/games`);
  };
  // console.log(userStates);

  const [auth, setAuth] = useState(false);
  const authclicked = () => {
    // navigate("/log-in")
    setAuth(true);
  };

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

          {loginchk ? (
            <Login auth={auth} setAuth={setAuth} />
          ) : (
            <Signup auth={auth} setAuth={setAuth} />
          )}
        </Paper>
      </div>
    );
  };

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <AppBar
        position="fixed"
        open={open}
      
        sx={{ backgroundColor: (theme) => "rgb(21, 21, 21)" }}
      >
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            sx={{
             marginRight: {
              lg:'5px',
              sm:'0px',
             },
              // ...(open && { display:'none',rotate:'90deg' }),
            }}
          >
            {open ? <MenuIcon /> : <MenuOpenIcon onClick={handleDrawerClose} />}
          </IconButton>
          <Typography sx={{
    fontSize: {
      xs: '1.0rem', // Smallest screens
      sm: '1.0rem',  // Small to medium screens
      md: '1.0rem',    // Medium to large screens
      lg: '1.5rem',  // Larger screens
      xl: '3rem'     // Extra large screens
    },
    marginLeft:'3px',
  }} noWrap component="div" classname="text-4xl">
            QuickGames
          </Typography>
          {/* <div style={{ marginLeft: "auto" }}> */}
            <div className="search-bar-container ml-auto  lg:block md:block sm:hidden xs:hidden  ">
              <SearchBar  setResults={setResults} />
              {results && results.length > 0 && (
          <SearchResultsList results={results} className="z-50" />
        )}
            </div>
            {/* 
            
            
            
            <Search >
              <SearchIconWrapper>
                <SearchIcon />
              </SearchIconWrapper>
              <StyledInputBase
                placeholder="Search…"
                inputProps={{ 'aria-label': 'search' }}
              />
            </Search> 
            
            
            */}
          {/* </div> */}
          {userStates.isLoggedIn ? (
            <IconButton
              sx={{ marginLeft: "auto" }}
              color="inherit"
              aria-label="favorite"
            >
              <FavoriteIcon
                onClick={() => handleFavouriteGames()}
              ></FavoriteIcon>
            </IconButton>
          ) : (
            ""
          )}

          {userStates?.isLoggedIn === true ? (
            <IconButton
              sx={{ marginLeft: "9px" }}
              color="inherit"
              aria-label="favorite"
            >
              {/* <AccountCircleIcon fontSize='medium'  /> */}
              {/* <AccountMenu/> */}
              <BasicPopover />
            </IconButton>
          ) : (
            <Button
              sx={{
                marginLeft: "auto",
                borderRadius: "50px",
                justifyContent: "center",
                backgroundColor: (theme) => "rgb(108, 0, 224)",
              }}
             
              onClick={authclicked}
              variant="contained"
            >
              Login
            </Button>
          )}
          {/* <Button sx={{marginLeft:'9px', borderRadius: '50px'}}variant='contained'>Sign Up</Button> */}
        </Toolbar>
      </AppBar>
      <Drawer
        variant="permanent"
        open={open}
        // sx={{ backgroundColor: (theme) => 'red', }}
        PaperProps={{
          sx: {
            backgroundColor: "rgb(21, 21, 21)",
          },
        }}
        onMouseEnter={handleDrawerOpen}
        onMouseLeave={handleDrawerClose}
      >
        <DrawerHeader>
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === "rtl" ? (
              <ChevronRightIcon />
            ) : (
              <ChevronLeftIcon />
            )}
          </IconButton>
        </DrawerHeader>
        <Divider />

        <List
          className="List-Sec"
          sx={{
            background: "#0C0D14",
            color: "white",
          }}
        >
          <ListItem disablePadding sx={{ display: "block" }}>
            <ListItemButton
              sx={{
                minHeight: 48,
                justifyContent: open ? "initial" : "center",
                px: 2.5,
                "&:hover": {
                  color: "rgb(108, 0, 224)",
                  paddingLeft: "5%",
                  transform: "2s",
                  transition: "0.3s",
                },
              }}
              onClick={() => navigate("/")}
            >
              <ListItemIcon
                sx={{
                  minWidth: 0,
                  mr: open ? 3 : "auto",
                  justifyContent: "center",
                }}
              >
                <i
                  class="fa fa-home"
                  style={{
                    fontSize: "24px",
                    color: "transparent",
                    backgroundImage: "linear-gradient(to top, blue, brown)",
                    WebkitBackgroundClip: "text",
                  }}
                ></i>
              </ListItemIcon>
              <ListItemText primary="Home" sx={{ opacity: open ? 1 : 0 }} />
            </ListItemButton>
          </ListItem>
          {userStates.uniqueCategories.map((data, index) => (
            <ListItem key={data} disablePadding sx={{ display: "block" }}>
              <ListItemButton
                sx={{
                  minHeight: 48,
                  justifyContent: open ? "initial" : "center",
                  px: 2.5,
                  "&:hover": {
                    color: "rgb(108, 0, 224)",
                    paddingLeft: "5%",
                    transform: "2s",
                    transition: "0.3s",
                  },
                }}
                onClick={() => handleCategory(data)}
              >
                <ListItemIcon
                  sx={{
                    minWidth: 0,
                    mr: open ? 3 : "auto",
                    justifyContent: "center",
                  }}
                >
                  <img src={data.icon}></img>
                  {/* {data.icon} */}
                </ListItemIcon>
                <ListItemText
                  primary={data.category_name}
                  sx={{ opacity: open ? 1 : 0 }}
                />
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

      <div className="mainScreen">
        <Dialog
          open={auth}
          onClose={() => {
            setAuth(false);
          }}
        >
          <DialogTitle>
            <IconButton
              edge="end"
              color="inherit"
              onClick={() => {
                setAuth(false);
              }}
              aria-label="close"
              style={{ position: "absolute", right: 18, top: 9 }}
            >
              <CloseIcon />
            </IconButton>
          </DialogTitle>

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
