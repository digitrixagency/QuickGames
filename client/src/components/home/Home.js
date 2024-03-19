import React from "react";
import "./Home.css"
import Navbar from "../Navbar/Navbar";
import MiniDrawer from "../sideBar/Sidebar";

const Home =()=>{
    return (
        <>
            <div className="home">
                {/* <Navbar /> */}
                <MiniDrawer/>
            </div>
            
        </>
    );
}

export default Home;