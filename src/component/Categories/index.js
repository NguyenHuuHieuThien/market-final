import {useEffect, useState} from 'react'
import { axiosx as axios } from '../../Helper';
function Category({selectCategory, getCategories}) {
    const [categories, setCategories] = useState([])
    useEffect(()=>{
       if(axios){
        axios.get('/category/searchAll')
        .then(res=> setCategories(res.data))
        .catch(err=>console.log(err))
       }
    },[])
    const sendCategories = (() =>{
        getCategories(categories)
    })()
    return ( 
        <ul className='d-flex list-unstyled gap-2 mt-3'>
        {categories.length > 0 && categories.map((category, index) =>
            <li key={category.idCategory} onClick={() => selectCategory(category.idCategory)} className='border border-primary ' role="button">
                <a className='text-xs text-decoration-none p-2'>{category.categoryName}</a>
            </li>
        )}
    </ul>
     );
}

export default Category;