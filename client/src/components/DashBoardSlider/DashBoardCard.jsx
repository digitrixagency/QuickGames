
import  banner_image  from './game1.webp';

import './DashBoardCard.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGamepad } from '@fortawesome/free-solid-svg-icons';


const DashBoardCard = (props) => {
  return (
    <div className="carousel">
      
        <div className="list">
            <div className="item">
                <img src={props.imageSrc}/>
                <div className="content">
                    <div className="author">#Spotlight {props.spotlightno} </div>
                    <div className="title">DESIGN SLIDER</div>
                    <div className="topic">Games</div>
                    <div className="des">
                      
                        Lorem ipsum dolor, sit amet consectetur adipisicing elit. Ut sequi, rem magnam nesciunt minima placeat, itaque eum neque officiis unde, eaque optio ratione aliquid assumenda facere ab et quasi ducimus aut doloribus non numquam. Explicabo, laboriosam nisi reprehenderit tempora at laborum natus unde. Ut, exercitationem eum aperiam illo illum laudantium?
                    </div>
                    <div className="buttons">
                        <button  key='asds' ><FontAwesomeIcon icon={faGamepad} className='mr-1'/>Play</button>
                        <button key='sdasd' >Details</button>
                    </div>
                </div>
            </div>
           
        </div>
      
     

      
       
        <div className="time"></div>
    </div>

  )
}

export default DashBoardCard;

