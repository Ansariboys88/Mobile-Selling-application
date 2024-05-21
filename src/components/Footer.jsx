import { Link } from 'react-router-dom';
import './Footer.css';
function Footer() {
    return(
 
        <div className="footer-body">
                <p>&copy;MobiShop</p>
                <a href="https://github.com/Ansariboys88" >GitHub</a>
            
                <p>Contact number +0129 675432 </p>
                <div className='footer-links'>
                    <Link>
                    Terms and conditions</Link>
                    <Link>Privacy policy</Link>
                </div>
        </div>
 
    )
}
 
 
export default Footer