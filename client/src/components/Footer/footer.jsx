import "./footer.css"

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSquareFacebook, faInstagram, faYoutube, faSquareXTwitter, faLinkedin } from '@fortawesome/free-brands-svg-icons';

export const Footer1=()=>{
return (
    <footer>
    <div className="container">
    <div className="row">
          <div className="col" id="company">
              <img src="images/logo.png" alt="" className="logo"/>
              <p>
                We are specialized in designings, make your business a brand.
                Try our premium services.
              </p>
              <div className="social">
                {/*  <a href="#"><i><FontAwesomeIcon icon={faFacebook} /></i></a>
            <a href="#"><i><FontAwesomeIcon icon={faInstagram} /></i></a>
            <a href="#"><i><FontAwesomeIcon icon={faYoutube} /></i></a>
            <a href="#"><i><FontAwesomeIcon icon={faTwitter} /></i></a>
            <a href="#"><i><FontAwesomeIcon icon={faLinkedin} /></i></a> */}
             <a href="#"><i><FontAwesomeIcon icon={faSquareFacebook} size="lg" /></i></a>
            <a href="#"><i><FontAwesomeIcon icon={faInstagram}  size="lg"/></i></a>
            <a href="#"><i><FontAwesomeIcon icon={faYoutube} size="lg" /></i></a>
            <a href="#"><i><FontAwesomeIcon icon={faSquareXTwitter} size="lg" /></i></a>
            <a href="#"><i><FontAwesomeIcon icon={faLinkedin} size="lg" /></i></a>
              </div>
          </div>

        
          <div className="col" id="services">
             <h3>Services</h3>
             <div className="links">
                <a href="#">Illustration</a>
                <a href="#">Creatives</a>
                <a href="#">Poster Design</a>
                <a href="#">Card Design</a>
             </div>
          </div>

          <div className="col" id="useful-links">
             <h3>Links</h3>
             <div className="links">
                <a href="#">About</a>
                <a href="#">Services</a>
                <a href="#">Our Policy</a>
                <a href="#">Help</a>
             </div>
          </div>

          <div className="col" id="contact">
              <h3>Contact</h3>
              <div className="contact-details">
                 <i className="fa fa-location"></i>
                 <p>FF-42, Procube Avenue, <br/> NY, USA</p>
              </div>
              <div className="contact-details">
                 <i className="fa fa-phone"></i>
                 <p>+1-8755856858</p>
              </div>
          </div>
    </div>

   


</div>
</footer>
);
     
    
}