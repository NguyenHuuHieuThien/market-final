import BgUser from "../../component/BgUser";
import { Link } from "react-router-dom";
import Table from "react-bootstrap/Table";
import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useSnackbar } from "notistack";
import {
  faPlus,
  faTrash,
  faCheckDouble,
  faArrowLeft,
  faCheck,
} from "@fortawesome/free-solid-svg-icons";
import { axiosx as axios } from "../../Helper";
export default function SellerManager() {
  let user = JSON.parse(localStorage.getItem("token"));
  const { enqueueSnackbar } = useSnackbar();
  const [orderList, setOrderList] = useState([]);
  const [isCheckAll, setIsCheckAll] = useState(false);
  const [checkList, setCheckList] = useState([]);
  const [data, setData] = useState(orderList.length > 0 ? orderList : [])
  // useEffect
  useEffect(() => {
      axios
        .get(`/bill/selectByUser/${user.id}?status=pending`)
        .then((res) =>{
        console.log(res.data)
          setOrderList(res.data)
  })
        .catch((err) => console.log(err));
  }, [data]);
  // const checkAll = () => {
  //   setIsCheckAll(!isCheckAll);
  //   if (!isCheckAll) {
  //     setCheckList(orderList.map((item) => item.idProduct));
  //   } else {
  //     setCheckList([]);
  //   }
  // };
  // check many bill
//   const checked = (id) => {
//     if(checkList.length ===0){
//       setCheckList(checkList.push(id))
//     }else{
//       if(checkList.includes(id)){
//         setCheckList(checkList.splice(checkList.indexOf(id),1))
//       }else{
//         setCheckList(checkList.push(id))
//       }
//     }
//     orderList.map(item => {
//       item.checked = checkList.includes(id)
//       return item
//     })
// }
  // accept many bill
  const accept = (id) => {
    // let data = orderList.filter(item=> checkList.inculdes(item.idProduct))
    axios
      .put(`/bill/updateStatus/${id}?status=active`)
      .then(() =>{
        setData(data.filter(item=> item.idBill !== id))
        enqueueSnackbar("Đã xác nhận giao hàng", { variant: "success" })
      })
      .catch(() =>
        enqueueSnackbar("Xác nhận giao hàng thất bại", { variant: "error" })
      );
  };
  // delete many bill
  // const deleteAll = () => {
  //   console.log(checkList.toString());
  //   axios
  //     .put(`/product/deleteListProduct/${checkList}?status=deleted`)
  //     .then(() =>
  //       enqueueSnackbar("Xóa sản phẩm thành công", { variant: "success" })
  //     )
  //     .catch(() =>
  //       enqueueSnackbar("Xóa sản phẩm thất bại", { variant: "error" })
  //     );
  // };

// remove bill 
  const remove = (id) => {
    axios
      .put(`/bill/updateStatus/${id}?status=deleted`)
      .then(() =>{
        setData(data.filter(item=> item.idBill !== id))
        enqueueSnackbar("Đã bỏ đơn đặt của người mua", { variant: "success" })
      }
      )
      .catch(() =>
        enqueueSnackbar("Bỏ đơn đặt thất bại", { variant: "error" })
      );
  };
  return (
    <div>
      <BgUser>
        <h1 className=" bg-white py-5 rounded-3 border-underline">
          Quản lý đơn hàng
        </h1>
        <div className="col-6 d-flex">
          <button
            role="button"
            // onClick={checkAll}
            className={`border-0 me-1 py-1 text-white px-2 bg-success`}
          >
            <FontAwesomeIcon icon={faCheckDouble} className="mr-0" /> Chọn tất
            cả
          </button>
          <button
            role="button"
            className={`border-0 me-1 py-1 text-white px-2 bg-danger`}
            // onClick={deleteAll}
          >
            <FontAwesomeIcon icon={faTrash} className="mr-0" /> Xóa nhiều
          </button>
        </div>
        {/* table load data */}
        <div className="mt-3 bg-white rounded-3 shadow-sm">
          <Table striped bordered hover>
            <thead>
              <tr className="border-underline">
                <th></th>
                <th>Hình ảnh</th>
                <th>Tên</th>
                <th>Giá</th>
                <th>Số Lượng</th>
                <th>Người đặt</th>
                {/* <th>Ngày đặt</th> */}
                <th>Địa chỉ</th>
                <th>Thao Tác</th>
              </tr>
            </thead>
            <tbody>
              {orderList && orderList?.length > 0 ? (
                orderList.map((item, index) => (
                  <tr key={index}>
                    <td>
                      <input
                        className="form-check-input"
                        type="checkbox"
                        // onChange={() => checked(item.product.idProduct)}
                        // checked={item.checked}
                      />
                    </td>
                    <td className="col-1">
                      <img src={item.product.urlFile[0] } alt="" width="100px" />
                    </td>
                    <td>
                    <span className="limit-text">
                    {item.product.productName}
                      </span>
                    </td>
                    <td>{item.product.price}</td>
                    <td>{item.amount}</td>
                    <td>{item.user.username}</td>
                    {/* <td>{item.createDate}</td> */}
                    <td>
                      <span className="limit-text">
                      {item.address}
                      </span>
                    </td>
                    <td>
                      <button
                        type="button"
                        onClick={() => accept(item.idBill)}
                        className="btn btn-sm btn-outline-success me-2"
                      >
                        <FontAwesomeIcon icon={faCheck}/>
                      </button>
                      <button
                        type="button"
                        className="btn btn-sm btn-outline-danger"
                        onClick={() => remove(item.idBill)}
                      >
                        <FontAwesomeIcon icon={faTrash}/>
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="8">Chưa có đơn đặt hàng nào.</td>
                </tr>
              )}
            </tbody>
          </Table>
        </div>
      </BgUser>
    </div>
  );
}
