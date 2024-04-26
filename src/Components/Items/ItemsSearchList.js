import { useEffect, useState } from "react"
import { useParams } from "react-router-dom";
import './ItemsSearchList.css'
import LostItem from "./lostItem";
import SearchFilter from "./filter";
import Pagination from "./pagination";
import axios from "axios";

export default function ItemsSearchList()
{

    const type = useParams().type;


    const [lostItems,setLostItems] = useState([]);

    const [searchedList,setSearchedList] = useState(lostItems);

 

    useEffect(  () =>
    {
         axios.get("http://localhost:3002/api/data/objects")
        .then( res => 
        {
            setLostItems(res.data);
           
            
        })
        .catch(error => console.error(error))
    },[])


    useEffect(() =>
{
    setSearchedList(lostItems.filter((i) => (i.type === type)))
},[lostItems,type])

//Pagination variables
    // const [currentPage,setCurrentPage] = useState(1);
    // const [itemsPerPage,setItemsPerPage] = useState(20);

    // const lastItemIndex = currentPage * itemsPerPage;
    // const firstItemIndex = lastItemIndex - itemsPerPage;
    // const currentItems = lostItems.slice(firstItemIndex,lastItemIndex);


    function SearchFor(itemName, itemCity, itemCategory) {   

        let filteredItems = lostItems.filter((item) => {
            const nameMatch = itemName ? item.details.Designation.toLowerCase().includes(itemName.toLowerCase()) : true;
            const cityMatch = itemCity ? item.city === itemCity : true;
            const categoryMatch = itemCategory ? item.subCategory === itemCategory.subCategory : true;
    
            return nameMatch && cityMatch && categoryMatch && item.type === type;
        });
    
        setSearchedList(filteredItems);
    }

    return <>
        <h1>{(type === 'lost')?"J'ai perdu":"J'ai trouvé"}</h1>
        

        <SearchFilter SearchFor = {SearchFor}  ></SearchFilter>
        
        {/* <Pagination totalItems = {lostItems.length} itemPerPage = {itemsPerPage} setCurrentPage={setCurrentPage}></Pagination> */}
        <div className="items-section">
            {searchedList.map((i,index) => <LostItem key={index} data={i} />)}
        </div>

        {/* <Pagination totalItems = {lostItems.length} itemPerPage = {itemsPerPage} setCurrentPage={setCurrentPage}></Pagination> */}
    </>
}