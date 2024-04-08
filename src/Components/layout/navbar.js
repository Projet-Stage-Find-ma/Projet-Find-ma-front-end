import { Link } from "react-router-dom"

export default function NavBar()
{


    return <nav>

        <h1><Link to='/'>Find.ma</Link></h1>
        <div>
            <Link to="/phone">Telephone</Link>
            <Link to="/Lost">Objets perdus</Link>
            <Link to="/found">Objets Trouvés</Link>
        </div>

        <div>
            
        </div>
    </nav>
}