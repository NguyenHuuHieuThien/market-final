import Table from "react-bootstrap/Table";
import { useEffect, useState } from "react";
import { axiosx as axios } from "../../Helper";
import Toast from "react-bootstrap/Toast";
import { Link } from "react-router-dom";

import Navbars from "../../component/Navbars";
import Footer from "../../component/Footer";
import ModalReact from "../../component/Modal";
import { ToastContainer } from "react-bootstrap";

export default function Carts() {
  const [show, setShow] = useState(false);
  const [toast, setToast] = useState(false);
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  console.log(data);
  const handleClose = () => {
    setShow(false);
    setToast(true);
  };
  useEffect(() => {
    if (axios) {
      axios
        .get(`/cart/findById/1`)
        .then((res) => {
          setData(res.data);
          setIsLoading(false);
        })
        .catch((error) => console.log(error));
    }
  }, []);
  const handleDelete = (id) => {
    axios
      .delete(`/cart/delete/${id}`)
      .then((res) => setData(data.filter((item) => item.idCart !== id)));
  };
  return (
    <div className="bg-main shadow-sm">
      {toast && (
        <ToastContainer position="middle-end">
          <Toast
            onClose={() => setToast(false)}
            bg="success"
            show={toast}
            delay={3000}
            autohide
          >
            <Toast.Body>
              Woohoo, you're reading this text in a Toast!
            </Toast.Body>
          </Toast>
        </ToastContainer>
      )}
      <ModalReact
        children={
          <table className="table">
            <thead className="text-center">
              <tr className="border-underline">
                <th scope="col">Tên</th>
                <th scope="col">Số lượng</th>
                <th scope="col">Đơn giá</th>
                <th scope="col">Thành tiền</th>
              </tr>
            </thead>
            <tbody className=" text-center">
              <tr>
                <td>Mark</td>
                <td>12</td>
                <td>10.000</td>
                <td>120.000</td>
              </tr>
              <tr>
                <th scope="row" className="text-start" colSpan={3}>
                  Tổng tiền
                </th>
                <td className="fw-bold">120.000</td>
              </tr>
            </tbody>
          </table>
        }
        show={show}
        handleClose={handleClose}
        title="Thanh toán"
      ></ModalReact>
      <Navbars />

      <div className="container mt-5 mb-5 position-relative bg-white p-3 rounded-3">
        <h1 className="mb-5">Giỏ hàng</h1>
        <Table striped bordered hover>
          <thead>
            <tr className="border-underline">
              <th>STT</th>
              <th>Hình ảnh</th>
              <th>Tên sản phẩm</th>
              <th>Giá</th>
              <th>Số lượng</th>
              <th>Thao tác</th>
            </tr>
          </thead>
          <tbody>
            {isLoading ? (
              <tr>
                <td>
                  <div className="spinner-border text-danger" role="status">
                    <span className="visually-hidden">Loading...</span>
                  </div>
                </td>
              </tr>
            ) : data.length > 0 ? (
              data.map((item, index) => (
                <tr key={index}>
                  <td>{item.id}</td>
                  <td>
                    <img
                      src={
                        item.file.length > 0
                          ? `http://localhost:8080/file/downloadFile/${item.file[0].id}`
                          : ""
                      }
                      style={{ width: "50px", height: "50px" }}
                    />
                  </td>
                  <td>{item.product.productName}</td>
                  <td>{item.product.price}</td>
                  <td>{item.product.amount}</td>
                  <td>
                    <button
                      onClick={() => handleDelete(item.idCart)}
                      className="btn btn-danger"
                    >
                      Bỏ
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <td colSpan={6}>
                Chưa có sản phẩm nào được thêm vào giỏ.
                <Link>Thêm sản phẩm vào giỏ</Link>
              </td>
            )}
          </tbody>
        </Table>

        <div className="text-right mb-4">
          <h3 className="mt-4 mb-5 uppercase">Tổng sản phẩm: 20</h3>
          <button
            onClick={() => setShow(true)}
            className="btn btn-outline-success px-5 rounded-5 mr-0"
          >
            Thanh Toắn
          </button>
        </div>
      </div>
      <Footer />
    </div>
  );
}
