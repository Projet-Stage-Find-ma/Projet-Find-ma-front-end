
import { Link,Routes,Route,useLocation } from "react-router-dom"
import AddLostItem from "./addLostItem"
import AddFoundItem from "./addFoundItem"
import './addItem.css';
export default function AddItem()
{

    const location = useLocation();
    
    return <div>
        <h1 id="AddItemTitle">{(location.pathname === "/addObject/addLostItem")?"J'ai perdue":"J'ai trouvé"}</h1>
    

        <div className="switchingBlock">
        <Link className={(location.pathname === "/addObject/addLostItem")?"switchingLinkOn":"switchingLinkOff"} to='/addObject/addLostItem'>Perdue</Link>
        <Link className={(location.pathname === "/addObject/addFoundItem")?"switchingLinkOn":"switchingLinkOff"} to='/addObject/addFoundItem'>Trouvée</Link>

        </div>



       <Routes>
       <Route path='addLostItem' element={<AddLostItem/>}></Route>
        <Route path='addFoundItem' element={<AddFoundItem/>}></Route>
       </Routes>
       
       

    </div>
}