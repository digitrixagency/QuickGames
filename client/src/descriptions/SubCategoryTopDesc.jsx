import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchCategoryDescriptions } from "../middleware/category";
import { userState } from "../slice/userSlice";
import './desc.css'

function SubCatTopDesc({categoryName}) {
    const [show, setShow] = useState(false);
    const dispatch = useDispatch();;
    const { categoryDescriptions, categoryDescriptionsFetching, categoryDescriptionsError } = useSelector(userState);
    // const data = "Our free online action games include classic 2D platform games, cartoony adventures, and a range of strategy and 3D titles. Have fun playing hundreds of the best action games for free. Sort by 'most played' for the most popular action games.";

    useEffect(() => {
        if(categoryName){
            
            dispatch(fetchCategoryDescriptions(categoryName));
        }
    },[categoryName, dispatch]);

    const data = categoryDescriptions[0]?.description1 || "No description available.";

    return (
        <>
            <div className="AdminDesc">
                    {show ? data : `${data.substring(0, 220)}`}
                    <button onClick={()=> setShow(!show)}>{show ? "Read Less" : "Read More"}</button>
            </div>
        </>
    );
}

function SubCatDownDesc({categoryName}) {
    const [show, setShow] = useState(false);
    const dispatch = useDispatch();;
    const { categoryDescriptions, categoryDescriptionsFetching, categoryDescriptionsError } = useSelector(userState);
    useEffect(() => {
        if(categoryName){
            
            dispatch(fetchCategoryDescriptions(categoryName));
        }
    },[categoryName, dispatch]);

    const data = categoryDescriptions[0]?.description2 || "No description available.";

    // const data = [
    //     {
    //         title: "Get Ready for Action",
    //         content: "CrazyGames features a wide variety of action-packed titles to keep you immersed in the game. Whether you enjoy fast-paced shooting games in all their forms - or the nail-biting urgency of a hot police pursuit, you’ll find it all here to play in your web browser."
    //     },
    //     {
    //         title: "Challenging Action Games",
    //         content: "Action games involve overcoming challenges, often physically. There’s usually an element of reaction time and hand-eye coordination, so you need to think fast to perform well in the game. Some action games add a layer of problem-solving to these basic elements with difficult challenges and puzzles. Games like 1v1 Battle and Jacksmith require quick-thinking, great technique, and coordination to get through increasingly complex level structures that are riddled with deadly traps. Other action games are less about the challenge, and more about casual fun, like Cuphead and Duck Life."
    //     },
    //     {
    //         title: "Action-Packed Games",
    //         content: "There are plenty of simple action games too. Maybe you just want to release some steam and have a good time playing games. Maybe you feel like unleashing carnage and chaos in thrilling 2D battles. If so, Super Auto Pets and House of Hazards might be the kind of mayhem you’re looking for."
    //     },
    //     {
    //         title: "Action/Adventure Games",
    //         content: "Action is a frequent feature in adventure games. What would an adventure be without some explosive action? Check out our adventure games for immersive journeys and exploration, with or without action. Browse through the entire selection or try out some of the recommended games. Our games are HTML5 and instantly playable in most web browsers."
    //     }
    // ];

    return (
        <>
            <div className="AdminDesc">
                {show ? (
                    data.map((item, index) => (
                        <div key={index}>
                            <h2>{item.header}</h2>
                            <p>{item.content}</p>
                        </div>
                    ))
                ) : (
                    <>
                        <div>
                            <h2>{data[0].header}</h2>
                            <p>{data[0].content}</p>
                        </div>
                    </>
                )}
                <button onClick={() => setShow(!show)}>{show ? "Read Less" : "Read More"}</button>
            </div>
        </>
    );
}

export {SubCatDownDesc, SubCatTopDesc};