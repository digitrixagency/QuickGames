
import  banner_image  from './game1.webp';

import './DashBoardCard.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGamepad } from '@fortawesome/free-solid-svg-icons';


const DashBoardCard = (props) => {
    const lastSpaceIndex = props.title.lastIndexOf(' ');
    const firstParttitle = props.title.substring(0, lastSpaceIndex);
    const secondParttitle = props.title.substring(lastSpaceIndex + 1);
  return (
    <div className="carousel">
      
        <div className="list">
            <div className="item">
                <img src={props.imageSrc}/>
                <div className="content">
                    <div className="author">#Spotlight {props.spotlightno} </div>
                    <div className="title">{firstParttitle}</div>
                    <div className="topic">{secondParttitle}</div>
                    <div className="des">
                      
                      {props.des}
                    </div>
                    <div className="buttons">
                        <button  key='asds' onClick={props.submithandle}><FontAwesomeIcon icon={faGamepad} className='mr-1'/>Play</button>
                        <button key='sdasd'onClick={props.submithandle} >Details</button>
                    </div>
                </div>
            </div>
           
        </div>
      
     

      
       
        <div className="time"></div>
    </div>

  )
}

export default DashBoardCard;

