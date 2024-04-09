import { useState } from "react"



export default function LostList()
{


    const [cities,setCities] = useState(['Marrakech','Casablance','ElJadida',"Safi"]);
    const [categories,setCategories] = useState(['Document','Animal','Accessoire','Electronique','Affaires Enfants'])
    const [subCategories,setSubCategories] = useState(['Carte d \'identite' , 'PassePort', 'Permis de conduire','Carte grise','Carte d\'etudiant','Classeur'])

    return <>
        <h1>J'ai perdu</h1>


        <div className="search">
            <input type="text" name="" id="" placeholder="Rechercher un objet" />
            <button>Rechercher</button>
        </div>
        <div className="ajouterObjet">
            <img src="media/add.png" width='20px' alt="" />
            <button>Ajouter un objet</button>
        </div>

        <div>
            <label htmlFor="">Filtrer </label>

            {/* Selecting by city */}
           <div className="citiesList">
                <label htmlFor="Ville">Ville</label>
                <select name="Ville" id="Ville">
                    <option value="">Choisissez une ville</option>
                    {
                        cities.map((c,index) => {

                            return <option value={c}>{c}</option>
                        })
                    }

                </select>
           </div>



           <div className="categoriesList">
                <label htmlFor="categorie">Categorie</label>
                <select name="categorie" id="categorie">
                    <option value="">Choisissez une categorie</option>
                    {
                        categories.map((c,index) => {

                            return <option value={c}>{c}</option>
                        })
                    }

                </select>
           </div>


           <div className="sub-categoriesList">
                <label htmlFor="sub-categorie">sub-Categorie</label>
                <select name="sub-categorie" id="sub-categorie">
                    <option value="">Choisissez une categorie</option>
                    {
                        subCategories.map((c,index) => {

                            return <option value={c}>{c}</option>
                        })
                    }

                </select>
           </div>
        </div>
    </>
}