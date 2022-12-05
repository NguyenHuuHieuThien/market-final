import Table from "react-bootstrap/Table";
import { useEffect, useState } from "react";
import { axiosx as axios } from "../../Helper";
import { Link } from "react-router-dom";

import Navbars from "../../component/Navbars";
import Footer from "../../component/Footer";
import ModalReact from "../../component/Modal";
import { useSnackbar } from "notistack";

export default function Carts() {
  const { enqueueSnackbar } = useSnackbar();
  const [show, setShow] = useState(false);
  const [toast, setToast] = useState(false);
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  console.log(data);
  let user = JSON.parse(localStorage.getItem("token"));
  const handleClose = () => {
    setShow(false);
    setToast(true);
  };
  useEffect(() => {
    if (axios) {
      axios
        .get(`/cart/findById/${user.id}`)
        .then((res) => {
          setData(res.data);
          setIsLoading(false);
        })
        .catch((error) => console.log(error));
    }
  }, []);
  const hanldeData = (e) => {
    let newData = { ...data };
    newData[e.target.id] = e.target.value;
    setData(newData);
  };
  const handleDelete = (id) => {
    axios
      .delete(`/cart/delete/${id}`)
      .then((res) => setData(data.filter((item) => item.idCart !== id)));
  };
  const order = (id) => {
    console.log(data);
    let _data = { ...data };
    delete _data.product;
    _data.totalPrice = data[0].amount * data[0].product.price;
    let date = new Date();
    _data.createDate = `${date.getFullYear()}-${
      date.getMonth() + 1
    }-${date.getDate()}`;
    _data.amount = data[0].amount;
    console.log(_data);
    axios
      .post(`/bill/save?idUser=${user.id}&idProduct=${id}`, _data)
      .then(() => enqueueSnackbar("Đã đặt đơn hàng", { variant: "success" }))
      .catch(() =>
        enqueueSnackbar("Đặt đơn hàng thất bại", { variant: "error" })
      );
  };
  return (
    <div>
      {user ? (
        <div className="bg-main shadow-sm">
          <Navbars />
          <div className="container mt-5 mb-5 position-relative bg-white p-3 rounded-3">
            <h1 className="mb-5">Giỏ hàng</h1>
            <div className="table-responsive">
              <Table striped bordered hover>
                <thead>
                  <tr className="border-underline">
                    <th>Hình ảnh</th>
                    <th>Tên sản phẩm</th>
                    <th>Số lượng</th>
                    <th>Giá</th>
                    <th>Thao tác</th>
                  </tr>
                </thead>
                <tbody>
                  {isLoading ? (
                    <tr>
                      <td colSpan={5}>
                        <div
                          className="spinner-border text-danger"
                          role="status"
                        >
                          <span className="visually-hidden">Loading...</span>
                        </div>
                      </td>
                    </tr>
                  ) : data.length > 0 ? (
                    data.map((item, index) => (
                      <tr key={index}>
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
                        <td>{item.amount}</td>
                        <td>{item.product.price}</td>
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
            </div>

            <div className="text-right mb-4">
              <h3 className="mt-4 mb-5 uppercase">
                Tổng sản phẩm: {data.length}
              </h3>
              <h3 className="mt-4 mb-5 uppercase">
                Tổng tiền:{" "}
                {data.length > 0 &&
                  data
                    .map((item) => item.amount * item.product.price)
                    .reduce((acc, cur) => acc + cur, 0)
                    .toLocaleString()}{" "}
                VND
              </h3>
              <button
                onClick={() => order(data[0].product.idProduct)}
                className="btn btn-outline-success px-5 rounded-5 mr-0"
              >
                Thanh Toán
              </button>
            </div>
          </div>
          <Footer />
        </div>
      ) : (
        <div>
          <div class="alert alert-danger" role="alert">
            Bạn cần phải đăng nhập mới có quyền truy cập
          </div>
          <div>
            <Link to="/" className="btn btn-warning">
              Quay lại
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}
