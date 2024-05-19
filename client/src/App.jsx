import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import "./components/home/Home"
import Home from './components/home/Home';
import GamePage from './components/GamePage/GamePage';
import { group1 } from './editableFiles/gameHubs';
import { Footer1 } from './components/Footer/footer';
import MiniDrawer from './components/sideBar/Sidebar';
import GameCategoryPage from './components/GameCategory/gamecategorypage';

function App() {
  return (
    <div className="App">
    <Router>
    <MiniDrawer/>
      <Routes>
        <Route path="/" exact element={<Home/>} />
        <Route path='this-game-name/' element={<GamePage GameData={group1}/>} />
        <Route path='games/:categoryName' element={<GameCategoryPage />} />
        {/* <Route path='log-in/' element={</>} /> */}
      </Routes>
      <Footer1/>
    </Router>
    </div>
  );
}

export default App;

