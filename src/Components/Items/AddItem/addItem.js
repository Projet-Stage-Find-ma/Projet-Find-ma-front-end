
import { Link,Routes,Route,useLocation } from "react-router-dom"
import AddLostItem from "./addLostItem"
import AddFoundItem from "./addFoundItem"
import './addItem.css';
export default function AddItem()
{

    const location = useLocation();
    
    return <div>
        <h1 id="AddItemTitle">{(location.pathname === "/addObject/lost")?"J'ai perdue":"J'ai trouvé"}</h1>
    

        <div className="switchingBlock">
        <Link className={(location.pathname === "/addObject/lost")?"switchingLinkOn":"switchingLinkOff"} to='/addObject/lost'>Perdue</Link>
        <Link className={(location.pathname === "/addObject/found")?"switchingLinkOn":"switchingLinkOff"} to='/addObject/found'>Trouvée</Link>

        </div>



       <Routes>
       <Route path='lost' element={<AddLostItem/>}></Route>
        <Route path='found' element={<AddFoundItem/>}></Route>
       </Routes>
       
       

    </div>
}