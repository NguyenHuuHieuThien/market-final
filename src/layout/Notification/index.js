import Navbars from "../../component/Navbars";
import Footer from "../../component/Footer";
import { axiosx as axios } from "../../Helper";
import { useEffect } from "react";
export default function Notification() {
  let user = JSON.parse(localStorage.getItem('token'))
  useEffect(()=>{
    axios.get(`/notification/findByIdUser/${user.id}`)
    .then(res=>console.log(res.data))
    .catch(err=> console.log(err))
  },[])
  return (
    <div>
      <Navbars />
      <div className="container">
        <div className="pt-5 mb-5">
          <h1>Bình luận về sản phẩm của bạn</h1>
        </div>
        <table className="table">
          <thead className="border-underline">
            <tr>
              <th scope="col" className="text-start">Tác giả</th>
              <th scope="col">Bình luận</th>
              <th scope="col" className="text-end">Thời gian thực hiện</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>
                <div className="d-flex justify-content-start">
                  <div>
                    <img
                      style={{
                        width: "50px",
                        height: "50px",
                        borderRadius: "50%",
                      }}
                      src="https://live.staticflickr.com/491/31818797506_41e52a8b36.jpg"
                    />
                  </div>
                  <div className="text-start ms-2">
                    <div>username</div>
                    <div>email@gmail.com</div>
                  </div>
                </div>
              </td>
              <td>Sản phẩm chất lượng tuyệt vời</td>
              <td className="text-end">2022-12-12 12:04:13</td>
            </tr>
          </tbody>
        </table>
        <div />
      </div>
        <Footer />
    </div>
  );
}
