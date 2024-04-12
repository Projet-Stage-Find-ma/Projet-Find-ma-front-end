import React from 'react'
import './pagination.css';

export default function Pagination ({totalItems,itemPerPage,setCurrentPage})
{

    let pages = [];



    for( let i=1; i <= Math.ceil(totalItems/itemPerPage); i++)
    {
        pages.push(i);
    }
  return (
    <div className='container'>
        {pages.map((x,index) => {
            return <button className='page-button' key={index} onClick={() => setCurrentPage(x) }>{x}</button>
        })}
    </div>
  )
}
