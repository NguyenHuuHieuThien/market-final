import Navbars from "../../component/Navbars";
import Footer from "../../component/Footer";
import BgUser from "../../component/BgUser";
import { axiosx as axios } from "../../Helper";
import {useState, useEffect} from 'react'
export default function Posted() {
  const [data, setData] = useState([]);
  let user = JSON.parse(localStorage.getItem('token'))
  useEffect(()=>{
    axios.get(`/product/findByIdUserSalesman/${user.id}?status=active`)
    .then(res=>{
      setData(res.data)
      console.log(res.data)
    })
    .catch(err=> console.log(err))
  },[])
  return (
    <BgUser>
      <h1 className=" bg-white py-5 rounded-3 border-underline">
        Sản phẩm đã đăng
      </h1>
      <div className="mt-5">
        {data && data.length> 0 && data.map((item, index)=> 
          <div key={index} className="row mb-3 p-2 bg-white">
          <div className="col-3">
            <img
              src={item.urlFile[0]}
              className="w-100"
            />
          </div>
          <div className="col-9 text-start">
            <div className="fw-bold mb-2">
              {item.name}
            </div>
            <div className="limit-text">
              {item.description}
            </div>
          </div>
        </div>)}
      </div>
    </BgUser>
  );
}
