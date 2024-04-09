
import { Link } from "react-router-dom"
import './footer.css'
export default function Footer()
{


    return <footer>

       
       <h1><Link className="FooterLogo" to='/'>Find.ma</Link></h1>

            <div className="copyright">
                <img src="media/copyright.png" width="20px" alt="" />
                <span className="copyrightText">2024 Find.ma</span>
            </div>

            <div className="contact" >
                <p className="contactLabel">Contact</p>
                <div className="contactInfo">
                    <p>Email:contact@find.ma</p>
                    <p>Telephone:06 00 01 02 03</p>
                </div>
            </div>
       
    </footer>
}