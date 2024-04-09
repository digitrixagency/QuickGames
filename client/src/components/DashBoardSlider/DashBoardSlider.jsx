
import "./DashBoardSlider.css"
import img1 from './game1.webp'
import img1small from './game1small.webp'

export const DashBoardSlider=()=>{

    return (

        // <!-- slider -->

        <div className="slider">
            {/* <!-- list Items --> */}
            <div className="list">
                <div className="item active">
                    <img src={img1}/>
                    <div className="content">
                       
                        <h2>Slider 01</h2>
                        <p>
                            Lorem ipsum dolor sit amet consectetur adipisicing elit. Labore, neque?
                            Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsum, ex.
                        </p>
                        <button id="play">Play</button>
                    </div>
                   
                </div>
                <div className="item">
                    <img src="image/img2.jpg"/>
                    <div className="content">
                        
                        <h2>Slider 02</h2>
                        <p>
                            Lorem ipsum dolor sit amet consectetur adipisicing elit. Labore, neque?
                            Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsum, ex.
                        </p>
                    </div>
                </div>
                <div className="item">
                    <img src="image/img3.jpg"/>
                    <div className="content">
                        
                        <h2>Slider 03</h2>
                        <p>
                            Lorem ipsum dolor sit amet consectetur adipisicing elit. Labore, neque?
                            Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsum, ex.
                        </p>
                    </div>
                </div>
                <div className="item">
                    <img src="image/img4.jpg"/>
                    <div className="content">
                        
                        <h2>Slider 04</h2>
                        <p>
                            Lorem ipsum dolor sit amet consectetur adipisicing elit. Labore, neque?
                            Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsum, ex.
                        </p>
                    </div>
                </div>
                <div className="item">
                    <img src="image/img5.jpg"/>
                    <div className="content">
                        <p>design</p>
                        <h2>Slider 05</h2>
                        <p>
                            Lorem ipsum dolor sit amet consectetur adipisicing elit. Labore, neque?
                            Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsum, ex.
                        </p>
                    </div>
                </div>
            </div>
          
            {/* <!-- thumbnail --> */}
            <div className="thumbnail">
                <div className="item active">
                    <img src={img1small}/>
                    <div className="content">
                        Name Slider
                    </div>
                </div>
                <div className="item">
                <img src={img1small}/>
                    <div className="content">
                        Name Slider
                    </div>
                </div>
                <div className="item">
                <img src={img1small}/>
                    <div className="content">
                        Name Slider
                    </div>
                </div>
                <div className="item">
                <img src={img1small}/>
                    <div className="content">
                        Name Slider
                    </div>
                </div>
                <div className="item">
                <img src={img1small}/>
                    <div className="content">
                        Name Slider
                    </div>
                </div>
            </div>
              {/* <!-- button arrows --> */}
              <div className="arrows">
                <button id="prev">{'<'}</button>
                <button id="next">{'>'}</button>
            </div>
        </div>
    
           
       
      
    
    );
}