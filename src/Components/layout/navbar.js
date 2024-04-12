import { Link } from "react-router-dom"
import './navbar.css'
import UserMenu from "./userMenu"


export default function NavBar()
{


    return <nav >

        
        <h1><Link className="LogoLink" to='/'>Find.ma</Link></h1>

        <div className="pagesLinks"> 
            <Link  className="NavLinks" to="/phone">Telephone</Link>               
            <Link  className="NavLinks" to="/itemsList/lost">Objets perdus</Link>           
            <Link  className="NavLinks" to="/itemsList/found">Objets Trouvés</Link>

        </div>

       
        <div className="connectionLinks">
            <Link className="connectionLink" to="/UserLogin">Se connecter</Link>
            <Link className="connectionLink" to="/UserSignUp">S'inscrire</Link>
        </div>


       
           
     
    </nav>
}