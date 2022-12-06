import { useEffect, useState } from "react";
import { axiosx as axios } from "../../Helper";
function Category({ selectCategory, allCategory, getCategories }) {
  const [categories, setCategories] = useState([]);
  useEffect(() => {
    if (axios) {
      axios
        .get("/category/searchAll")
        .then((res) => setCategories(res.data))
        .catch((err) => console.log(err));
    }
  }, []);
  const sendCategories = (() => {
    getCategories(categories);
  })();
  return (
    <div className="row">
    {categories &&
      categories.length > 0 &&
      categories.map((item,index) => (
        <div
         key={index}
          className="col-6 col-sm-6 col-md-4 col-lg-2 col-xl-2 text-white mb-3"
        >
          
          <div onClick={()=>selectCategory(item.idCategory)} className="category-color pe-2">
            <span>{item.categoryName}</span>
          </div>
        </div>
      ))}
  </div>
  );
}

export default Category;
