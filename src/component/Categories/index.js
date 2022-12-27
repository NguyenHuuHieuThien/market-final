import { useEffect, useState } from "react";
import { axiosx as axios } from "../../Helper";
function Category({ selectCategory, allCategory, done}) {
  const [categories, setCategories] = useState([]);
  const [isdone, setIsDone] = useState(false)
  const setDone = (isDone) => {
    done(isDone)
  }
  useEffect(() => {
    if (axios) {
      axios
        .get("/category/searchAll")
        .then((res) => {
          setCategories(res.data)
          setDone(true)
        })
        .catch((err) => console.log(err));
    }
  }, []);
  return (
    <>
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
  </>
  );
}

export default Category;
