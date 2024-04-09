import { Link } from "react-router-dom"
import './navbar.css'
import UserMenu from "./userMenu"


export default function NavBarLogged()
{


    return <nav >

        
        <h1><Link className="LogoLink" to='/'>Find.ma</Link></h1>

        <div className="pagesLinks"> 
            <Link  className="NavLinks" to="/phone">Telephone</Link>               
            <Link  className="NavLinks" to="/Lost">Objets perdus</Link>           
            <Link  className="NavLinks" to="/found">Objets Trouvés</Link>

        </div>

    

        <UserMenu/>
           
     
    </nav>
}