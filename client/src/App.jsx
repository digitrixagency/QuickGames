import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import "./components/home/Home"
import Home from './components/home/Home';
import GamePage from './components/GamePage/GamePage';
import { group1 } from './editableFiles/gameHubs';
import { Footer1 } from './components/Footer/footer';
import MiniDrawer from './components/sideBar/Sidebar';


function App() {
  return (
    <div className="App">
    <Router>
    <MiniDrawer/>
      <Routes>
        <Route path="/" exact element={<Home/>} />
        <Route path='this-game-name/' element={<GamePage GameData={group1}/>} />
      </Routes>
      <Footer1/>
    </Router>
    </div>
  );
}

export default App;

