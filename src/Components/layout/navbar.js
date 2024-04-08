import { Link } from "react-router-dom"
import './navbar.css'



export default function NavBar()
{


    return <nav className="container-fluid">

        <div class="row">
            <h1 className="col-12 col-md-2 col-lg-2" ><Link className="Logo" to='/'>Find.ma</Link></h1>

            <div className="row col-12 col-md-10 col-lg-6 pagesLink">
                <Link className=" col-4 link" to="/phone">Telephone</Link>
                <Link className=" col-4 link" to="/Lost">Objets perdus</Link>
                <Link className=" col-4 link" to="/found">Objets Trouvés</Link>
            </div>

            <div  className=" row col-12 col-lg-4 connectionLinks">
                <Link className="col-6 connectionLink" to="/UserLogin">Se connecter</Link>
                <Link className="col-6 connectionLink" to="/UserSignUp">S'inscrire</Link>
            </div>
        </div>
    </nav>
}