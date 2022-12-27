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
} from "@fortawesome/free-solid-svg-icons";
import { axiosx as axios } from "../../Helper";
export default function SellerManager() {
  let user = JSON.parse(localStorage.getItem("token"));
  const { enqueueSnackbar } = useSnackbar();
  const [orderList, setOrderList] = useState([]);
  const [isCheckAll, setIsCheckAll] = useState(false);
  const [checkList, setCheckList] = useState([]);
  const [data, setData] = useState(orderList.length > 0 ? orderList : [])
  useEffect(() => {
      axios
        .get(`/bill/selectByUser/${user.id}?status=pending`)
        .then((res) =>{
        console.log(res.data)
          setOrderList(res.data)
  })
        .catch((err) => console.log(err));
  }, [data]);
  const checkAll = () => {
    setIsCheckAll(!isCheckAll);
    if (!isCheckAll) {
      setCheckList(orderList.map((item) => item.idProduct));
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
  const deleteAll = () => {
    console.log(checkList.toString());
    axios
      .put(`/product/deleteListProduct/${checkList.toString()}`)
      .then(() =>
        enqueueSnackbar("Xóa sản phẩm thành công", { variant: "success" })
      )
      .catch(() =>
        enqueueSnackbar("Xóa sản phẩm thất bại", { variant: "danger" })
      );
  };

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
          Phê duyệt đơn đặt hàng
        </h1>
        <div className="col-6 d-flex">
          <button
            role="button"
            onClick={checkAll}
            className={`border-0 me-1 py-1 text-white px-2 bg-success`}
          >
            <FontAwesomeIcon icon={faCheckDouble} className="mr-0" /> Chọn tất
            cả
          </button>
          <button
            role="button"
            className={`border-0 me-1 py-1 text-white px-2 bg-danger`}
            onClick={deleteAll}
          >
            <FontAwesomeIcon icon={faTrash} className="mr-0" /> Xóa nhiều
          </button>
        </div>
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
                <th>Ngày đặt</th>
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
                        onChange={() => checked(item.idProduct)}
                        checked={checkList.includes(item.idProduct)}
                      />
                    </td>
                    <td className="col-1">
                      <img src={item.product.urlFile[0] } alt="" width="100px" />
                    </td>
                    <td>{item.product.productName}</td>
                    <td>{item.product.price}</td>
                    <td>{item.amount}</td>
                    <td>{item.user.username}</td>
                    <td>{item.createDate}</td>
                    <td>
                      <button
                        type="button"
                        onClick={() => accept(item.idBill)}
                        className="btn btn-info me-2"
                      >
                        Giao hàng
                      </button>
                      <button
                        type="button"
                        className="btn btn-danger"
                        onClick={() => remove(item.idBill)}
                      >
                        Hủy
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
