import { useEffect, useState } from "react"
import { useParams } from "react-router-dom";
import './ItemsSearchList.css'
import LostItem from "./lostItem";
import SearchFilter from "./filter";
import Pagination from "./pagination";

export default function ItemsSearchList()
{

    const type = useParams().type;

    const [cities,setCities] = useState(['Marrakech','Casablanca','ElJadida',"Safi"]);
    const [categories,setCategories] = useState(['Document','Animal','Accessoire','Electronique','Affaires Enfants'])
    const [subCategories,setSubCategories] = useState(['Carte d \'identite' , 'PassePort', 'Permis de conduire','Carte grise','Carte d\'étudiant','Classeur'])

   

    const [lostItems,setLostItems] = useState([
        {id:1,status:'lost',title:"Article 1",category:"Document",subCategory:'Carte d \'identite',city:"Marrakech",image:'item.png'},
        { id: 2, status:'found',title: "Article 2", category: "Animal", subCategory: 'Passeport', city: "Casablanca", image: 'item.png' },
        { id: 3, status:'lost',title: "Article 3", category: "Accessoire", subCategory: 'Permis de conduire', city: "El Jadida", image: 'item.png' },
        { id: 4, status:'found',title: "Article 4", category: "Électronique", subCategory: 'Carte grise', city: "Safi", image: 'item.png' },
        { id: 5, status:'lost',title: "Article 5", category: "Document", subCategory: 'Carte d\'étudiant', city: "Marrakech", image: 'item.png' },
        { id: 6, status:'found',title: "Article 6", category: "Électronique", subCategory: 'Carte d\'identité', city: "Casablanca", image: 'item.png' },
        { id: 7, status:'lost',title: "Article 7", category: "Affaires pour enfants", subCategory: 'Classeur', city: "El Jadida", image: 'item.png' },
        { id: 8, status:'lost',title: "Article 8", category: "Animal", subCategory: 'Passeport', city: "Safi", image: 'item.png' },
        { id: 9, status:'found',title: "Article 9", category: "Accessoire", subCategory: 'Permis de conduire', city: "Marrakech", image: 'item.png' },
        { id: 10,status:'lost',title: "Article 10", category: "Document", subCategory: 'Carte d\'identité', city: "Casablanca", image: 'item.png' },
        { id: 11,status:'lost',title: "Article 11", category: "Électronique", subCategory: 'Carte d\'étudiant', city: "El Jadida", image: 'item.png' },
        { id: 12,status:'found',title:"Article 12",category:"Document",subCategory:'Carte d \'identite',city:"Marrakech",image:'item.png'},
        { id: 13, status:'lost',title: "Article 13", category: "Animal", subCategory: 'Passeport', city: "Casablanca", image: 'item.png' },
        { id: 14, status:'lost',title: "Article 14", category: "Accessoire", subCategory: 'Permis de conduire', city: "El Jadida", image: 'item.png' },
        { id: 15, status:'lost',title: "Article 15", category: "Électronique", subCategory: 'Carte grise', city: "Safi", image: 'item.png' },
        { id: 16, status:'found',title: "Article 16", category: "Document", subCategory: 'Carte d\'étudiant', city: "Marrakech", image: 'item.png' },
        { id: 17, status:'lost',title: "Article 17", category: "Électronique", subCategory: 'Carte d\'identité', city: "Casablanca", image: 'item.png' },
        { id: 18, status:'lost',title: "Article 18", category: "Affaires pour enfants", subCategory: 'Classeur', city: "El Jadida", image: 'item.png' },
        { id: 19, status:'lost',title: "Article 19", category: "Animal", subCategory: 'Passeport', city: "Safi", image: 'item.png' },
        { id: 20, status:'lost',title: "Article 20", category: "Accessoire", subCategory: 'Permis de conduire', city: "Marrakech", image: 'item.png' },
        { id: 21, status:'lost',title: "Article 21", category: "Document", subCategory: 'Carte d\'identité', city: "Casablanca", image: 'item.png' },
        { id: 22, status:'found',title: "Article 22", category: "Électronique", subCategory: 'Carte d\'étudiant', city: "El Jadida", image: 'item.png' },
        { id: 23, status:'lost',title: "Article 23", category: "Document", subCategory: 'Carte d\'identité', city: "Marrakech", image: 'item.png' },
        { id: 24, status:'lost',title: "Article 24", category: "Animal", subCategory: 'Passeport', city: "Casablanca", image: 'item.png' },
        { id: 25, status:'lost',title: "Article 25", category: "Accessoire", subCategory: 'Permis de conduire', city: "El Jadida", image: 'item.png' },
        { id: 26, status:'lost',title: "Article 26", category: "Électronique", subCategory: 'Carte grise', city: "Safi", image: 'item.png' },
        { id: 27, status:'lost',title: "Article 27", category: "Document", subCategory: 'Carte d\'étudiant', city: "Marrakech", image: 'item.png' },
        { id: 28, status:'found',title: "Article 28", category: "Électronique", subCategory: 'Carte d\'identité', city: "Casablanca", image: 'item.png' },
        { id: 29, status:'lost',title: "Article 29", category: "Affaires pour enfants", subCategory: 'Classeur', city: "El Jadida", image: 'item.png' },
        { id: 30, status:'found',title: "Article 30", category: "Animal", subCategory: 'Passeport', city: "Safi", image: 'item.png' },
        { id: 31, status:'found',title: "Article 31", category: "Accessoire", subCategory: 'Permis de conduire', city: "Marrakech", image: 'item.png' },
        { id: 32, status:'lost',title: "Article 32", category: "Document", subCategory: 'Carte d\'identité', city: "Casablanca", image: 'item.png' },
        { id: 33, status:'lost',title: "Article 33", category: "Électronique", subCategory: 'Carte d\'étudiant', city: "El Jadida", image: 'item.png' },
        { id: 34, status:'lost',title: "Article 34", category: "Document", subCategory: 'Carte d\'identité', city: "Marrakech", image: 'item.png' },
        { id: 35, status:'lost',title: "Article 35", category: "Animal", subCategory: 'Passeport', city: "Casablanca", image: 'item.png' },
        { id: 36, status:'lost',title: "Article 36", category: "Accessoire", subCategory: 'Permis de conduire', city: "El Jadida", image: 'item.png' },
        { id: 37, status:'lost',title: "Article 37", category: "Électronique", subCategory: 'Carte grise', city: "Safi", image: 'item.png' },
        { id: 38, status:'lost',title: "Article 38", category: "Document", subCategory: 'Carte d\'étudiant', city: "Marrakech", image: 'item.png' },
        { id: 39, status:'lost',title: "Article 39", category: "Électronique", subCategory: 'Carte d\'identité', city: "Casablanca", image: 'item.png' },
        { id: 40, status:'lost',title: "Article 40", category: "Affaires pour enfants", subCategory: 'Classeur', city: "El Jadida", image: 'item.png' },
        { id: 41, status:'lost',title: "Article 41", category: "Animal", subCategory: 'Passeport', city: "Safi", image: 'item.png' },
        { id: 42, status:'lost',title: "USB 2.0", category: "Accessoire", subCategory: 'Permis de conduire', city: "Marrakech", image: 'item.png' },
        { id: 43, status:'lost',title: "USB 3.0", category: "Document", subCategory: 'Carte d\'identité', city: "Casablanca", image: 'item.png' },
                
    ])

    const [searchedList,setSearchedList] = useState([]);

    useEffect(() =>
{
    setSearchedList(lostItems.filter((i) => (i.status === type)))
},[type])


//Pagination variables
    // const [currentPage,setCurrentPage] = useState(1);
    // const [itemsPerPage,setItemsPerPage] = useState(20);

    // const lastItemIndex = currentPage * itemsPerPage;
    // const firstItemIndex = lastItemIndex - itemsPerPage;
    // const currentItems = lostItems.slice(firstItemIndex,lastItemIndex);


    function SearchFor(t,c,cat,sub)
    {   
        let T = lostItems.filter((i) => i.title.toLowerCase().includes(t.toLowerCase()) && i.city.includes(c) && i.category.includes(cat) && i.subCategory.includes(sub))
        setSearchedList(T);
    }
    console.log(type);

    return <>
        <h1>{(type === 'lost')?"J'ai perdu":"J'ai trouvé"}</h1>
        

        <SearchFilter SearchFor = {SearchFor}  citiesList={cities}  categoriesList = {categories} subCategoriesList = {subCategories}></SearchFilter>
        
        {/* <Pagination totalItems = {lostItems.length} itemPerPage = {itemsPerPage} setCurrentPage={setCurrentPage}></Pagination> */}
        <div className="items-section">
            {searchedList.map((i,index) => <LostItem key={index} data={i} />)}
        </div>

        {/* <Pagination totalItems = {lostItems.length} itemPerPage = {itemsPerPage} setCurrentPage={setCurrentPage}></Pagination> */}
    </>
}