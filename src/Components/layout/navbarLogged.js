import { Link } from "react-router-dom"
import './navbar.css'
import UserMenu from "./userMenu"


export default function NavBarLogged()
{


    return <nav >

        
        <h1><Link className="LogoLink" to='/'>Find.ma</Link></h1>

        <div className="pagesLinks"> 
            <Link  className="NavLinks" to="/phone">Téléphone</Link>               
            <Link  className="NavLinks" to="/itemsList/lost">J'ai perdus</Link>           
            <Link  className="NavLinks" to="/itemsList/found">J'ai trouvé</Link>
            

        </div>

    

        <UserMenu/>
           
     
    </nav>
}