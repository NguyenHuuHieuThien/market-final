
import BgUser from "../../component/BgUser";
import Table from "react-bootstrap/Table";
import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {useSnackbar} from 'notistack'
import { useParams, Link } from "react-router-dom";
import {
  faPlus,
  faTrash,
  faCheckDouble,
} from "@fortawesome/free-solid-svg-icons";
import { axiosx as axios } from "../../Helper";
export default function SellBill() {
  let user = JSON.parse(localStorage.getItem('token'))
  let {id} = useParams();
    const {enqueueSnackbar}  = useSnackbar();
    const [productSell, setProductSell] = useState([])
    // const [product, setProduct]= useState();
    const [isCheckAll, setIsCheckAll] = useState(false);
    const [checkList, setCheckList] = useState([]);
    console.log(productSell)
    useEffect(()=>{
        if(axios){
            axios.get(`/bill/selectByUser/${user.id}?status=active`)
            .then(res=> setProductSell(res.data))
            .catch(err => console.log(err))

            // axios.get(`/product/selectById/${id}`)
            // .then(res=> setProduct(res.data))
            // .catch(err => console.log(err))
        }
    },[])
    const checkAll = () => {
        setIsCheckAll(!isCheckAll);
        if (!isCheckAll) {
          setCheckList(productSell.map((item) => item.idProduct));
        } else {
          setCheckList([]);
        }
      };
      const checked = (id) => {
        if (checkList.includes(id)) {
          setCheckList(checkList.filter((item) => item !== id));
        } else {
          setCheckList([...checkList, id]);
        }
      };
    const accept = ()=>{
        let data = productSell.filter(item=> checkList.inculdes(item.idProduct))
        axios.put('', data)
    }
    const deleteAll = () =>{
        console.log(checkList.toString())
        axios.put(`/product/deleteListProduct/${checkList.toString()}`)
        .then(()=>enqueueSnackbar('Xóa sản phẩm thành công', {variant: 'success'}))
        .catch(()=>enqueueSnackbar('Xóa sản phẩm thất bại', {variant: 'error'}))
      }

    const remove = (id) =>{
        setProductSell(productSell.filter(item => item.id !== id))
    }
  return (
    <BgUser>
      <h1 className=" bg-white py-5 rounded-3 border-underline">
        Sản phẩm đã bán
      </h1>
      {/* <div className="col-6 d-flex">
                  <button
                    role="button"
                    onClick={checkAll}
                    className={`border-0 me-1 py-1 text-white px-2 bg-success`}
                  >
                    <FontAwesomeIcon icon={faCheckDouble} className="mr-0" />{" "}
                    Chọn tất cả
                  </button>
                  <button
                    role="button"
                    className={`border-0 me-1 py-1 text-white px-2 bg-danger`}
                    onClick={deleteAll}
                  >
                    <FontAwesomeIcon icon={faTrash} className="mr-0" /> Xóa nhiều
                  </button>
                </div> */}
      <div className="mt-3 bg-white rounded-3 shadow-sm">
            <Table striped bordered hover>
              <thead>
                <tr className="border-underline">
                  {/* <th></th> */}
                  <th>Hình ảnh</th>
                  <th>Tên</th>
                  <th>Giá</th>
                  <th>Số Lượng</th>
                  <th>Người mua</th>
                  <th>Thao Tác</th>
                </tr>
              </thead>
              <tbody>
                {productSell && productSell?.length > 0 ? (
                  productSell.map((item, index) => (
                    <tr key={index}>
                      {/* <td>
                        <input
                          className="form-check-input"
                          type="checkbox"
                          onChange={() => checked(item.idProduct)}
                          checked={checkList.includes(item.idProduct)}
                        />
                      </td> */}
                      <td className="col-1">
                        {/* <img src={item.urlFile[0] } alt="" width="100px" /> */}
                      </td>
                      <td>{item.product.productName}</td>
                      <td>{item.product.price}</td>
                      <td>{item.amount}</td>
                      <td>{item.user.username}</td>
                      <td>
                        <button type="button" className="btn btn-info me-2">
                            Xem đơn hàng
                        </button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="8">
                      Chưa có bài đăng nào.
                      <Link to="/sign-up">Tạo mới một bài đăng người dùng</Link>
                    </td>
                  </tr>
                )}
              </tbody>
            </Table>
          </div>
    </BgUser>
  );
}
