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
import ModalReact from "../../component/Modal";
export default function SellerManager() {
  let user = JSON.parse(localStorage.getItem("token"));
  const { enqueueSnackbar } = useSnackbar();
  const [orderList, setOrderList] = useState([]);
  const [isCheckAll, setIsCheckAll] = useState(false);
  const [checkList, setCheckList] = useState([]);
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [dataDetail, setDataDetail] = useState()
  const [data, setData] = useState(orderList.length > 0 ? orderList : [])
  // useEffect
  useEffect(() => {
    axios
      .get(`/bill/selectByUser/${user.id}?status=pending`)
      .then((res) => {
        console.log(res.data)
        setOrderList(res.data)
      })
      .catch((err) => console.log(err));
  }, [data]);
  const accept = (id) => {
    axios
      .put(`/bill/updateStatus/${id}?status=active`)
      .then(() => {
        setData(data.filter(item => item.idBill !== id))
        enqueueSnackbar("Đã xác nhận giao hàng", { variant: "success" })
      })
      .catch(() =>
        enqueueSnackbar("Xác nhận giao hàng thất bại", { variant: "error" })
      );
  };

  // detail bill
  const detail = (id) => {
    axios.get(`/bill/selectUserByIdBill/${id}`)
    .then(res=> {
      console.log(res.data)
      setDataDetail(res.data)
      handleShow()
    })
    .catch(err => console.log(err))
  }

  // remove bill 
  const remove = (id) => {
    axios
      .put(`/bill/updateStatus/${id}?status=deleted`)
      .then(() => {
        setData(data.filter(item => item.idBill !== id))
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
        <ModalReact
          show={show}
          title="Chi tiết đơn hàng"
          handleClose={handleClose}
          // handleFunction={order}
          handleShow={handleShow}
        >
          <div>
            <div>
              <div>
                <span className="me-5 fw-bold">Tên sản phẩm:</span>
                <span>{dataDetail?.product.productName}</span>
              </div>
              <div>
                <span  className="me-5 fw-bold">Tổng Giá:</span>
                <span>{dataDetail?.totalPrice}</span>
              </div>
              <div>
                <span className="me-5 fw-bold">Người đặt:</span>
                <span>{dataDetail?.user.username}</span>
              </div>
              <div>
                <span className="me-5 fw-bold">Số điện thoại:</span>
                <span>{dataDetail?.user.phoneNumber}</span>
              </div>
              <div>
                <span className="me-5 fw-bold">Ngày đặt:</span>
                <span>{dataDetail?.createDate}</span>
              </div>
              <div>
                <span className="me-5 fw-bold">Địa chỉ:</span>
                <span>{dataDetail?.user.address}</span>
              </div>
            </div>
          </div>
        </ModalReact>
        <h1 className=" bg-white py-5 rounded-3 border-underline">
          Quản lý đơn hàng
        </h1>
        {/* table load data */}
        <div className="mt-3 bg-white rounded-3 shadow-sm">
          <Table striped bordered hover>
            <thead>
              <tr className="border-underline">
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
                    <td className="col-1">
                      <span onClick={()=> detail(item.idBill)}><img src={item.product.urlFile[0]} alt="" width="100px" /></span>
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
                        <FontAwesomeIcon icon={faCheck} />
                      </button>
                      <button
                        type="button"
                        className="btn btn-sm btn-outline-danger"
                        onClick={() => remove(item.idBill)}
                      >
                        <FontAwesomeIcon icon={faTrash} />
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
