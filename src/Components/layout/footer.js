
import { Link } from "react-router-dom"
import './footer.css'
export default function Footer()
{


    return <footer className="container-fluid">

       <div class="row">
       <Link className="Logo col-md-2 col-sm-12 Logo " to='/'><h1 className="" >Find.ma</h1></Link>

            <div className=" col-md-6 col-sm-6 copyright">
                <img src="media/copyright.png" width="20px" alt="" />
                <span>2024 Find.ma</span>
            </div>

            <div className="col-md-4 col-sm-6 contact" >
                <p className="contactLabel">Contact</p>
                <div className="contactInfo">
                    <p>Email:contact@find.ma</p>
                    <p>Telephone:06 00 01 02 03</p>
                </div>
            </div>
       </div>
    </footer>
}