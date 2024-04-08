import { Link } from "react-router-dom"
import './navbar.css'



export default function NavBar()
{


    return <nav className="container-fluid">

        <div class="row align-item-center">
        <Link className="Logo col-md-2 col-sm-12 Logo " to='/'><h1 className="" >Find.ma</h1></Link>

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