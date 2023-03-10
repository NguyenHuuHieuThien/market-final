import Table from "react-bootstrap/Table";
import { useEffect, useState } from "react";
import { axiosx as axios } from "../../Helper";
import { Link, Navigate } from "react-router-dom";

import Navbars from "../../component/Navbars";
import Footer from "../../component/Footer";
import province from "./../../Province/data.json";
import { useSnackbar } from "notistack";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faSubtract, faTruck } from "@fortawesome/free-solid-svg-icons";
import ModalReact from "../../component/Modal";
import Spinner from "../../component/Spinner";

export default function Carts() {
  const [ward, setWard] = useState([]);
  const [districtName, setDistrictName] = useState("");
  let provinces = Object.values(province);
  let district = Object.values(provinces[26]["quan-huyen"]);
  const { enqueueSnackbar } = useSnackbar();
  const [show, setShow] = useState(false);
  const [data, setData] = useState([]);
  const [address, setAddress] = useState("");
  const [wardName, setWardName] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [newamount, setNewAmount] = useState(0);
  const [checkList, setCheckList] = useState([]);
  const [ids, setIds] = useState(0);
  const handleClose = () => setShow(false);
  const handleShow = (id) => {
    setShow(true);
  };
  let user = JSON.parse(localStorage.getItem("token"));
  useEffect(() => {
    if (axios) {
      axios
        .get(`/cart/findById/${user.id}`)
        .then((res) => {
          setData(res.data);
          console.log(res.data)
          setIds(res.data.map(item => item.product.idProduct))
          setIsLoading(false);
        })
        .catch((error) => {
          console.log(error)
          setIsLoading(false)
        });
    }
  }, []);
  const handleDistrict = (value) => {
    setWard(
      Object.values(
        district.filter((item) => item.code === value)[0]["xa-phuong"]
      ).map((item) => item.name)
    );
    setDistrictName(
      district.filter((item) => item.code == value)[0].name + ", "
    );
  };
  // const select = id => {
  //   if(!checkList.includes(id)){
  //     setCheckList(data.filter(item => item.product.idProduct === id).map(e=> e.product.idProduct))
  //   }else{
  //     setCheckList(checkList.filter(item => item !==id))
  //   }
    
  // }
  // console.log(checkList)
  const handleDelete = (id) => {
    axios
      .delete(`/cart/delete/${id}`)
      .then((res) => {
        setData(data.filter((item) => item.idCart !== id))
        setIds(data.filter((item) => item.idCart !== id).map(e => e.product.idProduct))
      });
  };
  const order = () => {
    if (address.length === 0 || wardName.length === 0 || districtName.length === 0) {
      enqueueSnackbar('Vui lòng nhập địa chỉ giao hàng', { variant: 'error' })
      return
    }
    let date = new Date();
    let _data = {
      totalPrice: data[0].amount * data[0].product.price,
      createDate: `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`,
      amount: data[0].amount,
      address: document.getElementById('address').innerText,
      idProducts: ids
    }
    console.log(_data)
    axios
      .post(`/bill/save?idUser=${user.id}`, _data)
      .then(() => {
        enqueueSnackbar("Đã đặt đơn hàng", { variant: "success" });
        // axios.delete(`/delete/${idCart}`)
        handleClose();
      })
      .catch((err) => {
        console.log(err)
        enqueueSnackbar("Đặt đơn hàng thất bại", { variant: "error" })
      }
      );
  };

  const handleAmount = (id,e, productAmount) => {
      if (e.target.value > productAmount) {
        enqueueSnackbar("Số lượng sản phẩm hiện có không đủ", {
          variant: "error",
        });
        return;
      }
      if(e.target.value <= 0){
        enqueueSnackbar("Số lượng sản phẩm không được nhỏ hơn 1", {
          variant: "error",
        });
        return;
      }
      axios
        .put(`/cart/update/${id}?amount=${e.target.value}`)
        .then(() => {
          axios
        .get(`/cart/findById/${user.id}`)
        .then((res) => {
          setData(res.data);
          console.log(res.data)
          setIds(res.data.map(item => item.product.idProduct))
          setIsLoading(false);
        })
        .catch((error) => {
          console.log(error)
          setIsLoading(false)
        });
        })
  };
  return (
    <div>
      <div className="bg-main shadow-sm">
        <ModalReact
          show={show}
          title="Đặt sản phẩm"
          handleClose={handleClose}
          handleFunction={order}
          handleShow={handleShow}
        >
          <form>
            <div className="d-flex mb-2">
              <div className="me-3">
                <FontAwesomeIcon icon={faTruck} className="me-2" />
                Vận chuyển tới
              </div>
              <div className="row">
                <div className="col-12 col-sm-12 col-md-12 cl-lg-4 col-xl-4">
                  <select
                    class="form-select"
                    required
                    onChange={(e) => handleDistrict(e.target.value)}
                  >
                    <option>-- Chọn Quận/huyện --</option>
                    {district.map((item, index) => (
                      <option key={index} value={item.code}>
                        {item.name}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="col-12 col-sm-12 col-md-12 cl-lg-4 col-xl-4">
                  <select
                    class="form-select"
                    required
                    onChange={(e) => setWardName(e.target.value + ", ")}
                  >
                    <option>-- Chọn Xã/Phường --</option>
                    {ward.length > 0 &&
                      ward.map((item, index) => (
                        <option key={index} value={item}>
                          {item}
                        </option>
                      ))}
                  </select>
                </div>
                <div className="col-12 col-sm-12 col-md-12 cl-lg-4 col-xl-4">
                  <span>Đà Nẵng</span>
                </div>
              </div>
            </div>
            <div class="form-floating mb-3">
              <input
                type="text"
                required
                className="form-control"
                onChange={(e) => setAddress(e.target.value + ", ")}
                id="delivery"
                placeholder="name@example.com"
              />
              <label for="delivery">Nhập nơi nhận...</label>
            </div>
            <div className="mb-2 fw-bold" id="address">
              {address + wardName + districtName + " Đà Nẵng"}
            </div>
          </form>
        </ModalReact>
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
                      <Spinner />
                    </td>
                  </tr>
                ) : data.length > 0 ? (
                  data.map((item, index) => (
                    <tr key={index}>
                      <td>
                        <Link to={`/product/${item.product.idProduct}`}>
                          <img
                            src={
                              item.file.length > 0
                                ? `http://localhost:8080/file/downloadFile/${item.file[0].id}`
                                : ""
                            }
                            style={{ width: "50px", height: "50px" }}
                          />
                        </Link>
                      </td>
                      <td>{item.product.productName}</td>
                      <td>
                        <div className="d-flex gap-2 justify-content-center">
                        
                         <input value={item.amount} type='number' onChange = {e=>handleAmount(item.idCart, e, item.product.amount)}/>
                        
                        </div>
                      </td>
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
                  <tr>
                    <td colSpan={6}>
                      Chưa có sản phẩm nào được thêm vào giỏ.
                      <Link>Thêm sản phẩm vào giỏ</Link>
                    </td>
                  </tr>
                )}
              </tbody>
            </Table>
          </div>

          {data.length > 0 && (
            <div className="text-end mb-4">
              <div className="mt-4 mb-3 fw-bold uppercase">
                Tổng sản phẩm: {data.length}
              </div>
              <div className="mb-3 fw-bold uppercase">
                Tổng tiền:{" "}
                {data.length > 0 &&
                  new Intl.NumberFormat("vi-VN", {
                    style: "currency",
                    currency: "VND",
                  }).format(
                    data
                      .map((item) => item.amount * item.product.price)
                      .reduce((acc, cur) => acc + cur, 0)
                  )}
              </div>
              <button
                // onClick={() => order(data[0].product.idProduct)}
                onClick={handleShow}
                className="btn btn-outline-success px-5 rounded-5 mr-0"
              >
                Đặt hàng
              </button>
            </div>
          )}
        </div>
        <Footer />
      </div>
    </div>
  );
}
