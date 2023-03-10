import SideBars from "../../component/SideNav";
import { Row, Col, Button } from "react-bootstrap";
import { axiosx as axios } from "../../Helper";
import Table from "react-bootstrap/Table";
import React, { useEffect, useState } from "react";
import Modal from "react-bootstrap/Modal";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPlus,
  faTrash,
  faArrowsRotate,
  faCheckDouble,
  faChevronRight,
  faTrashCan,
  faRightFromBracket,
  faCheck,
  faList,
  faArrowLeft,
  faHome,
  faTelevision,
} from "@fortawesome/free-solid-svg-icons";
import { MDBInputGroup, MDBBtn, MDBBadge, MDBIcon } from "mdb-react-ui-kit";
import { Link } from "react-router-dom";
import { useSnackbar } from "notistack";
import Spinner from "../../component/Spinner";
const profileMenu = [
  { name: "Trang chủ người dùng", link: "/", icon: faHome },
  { name: "Trang sản phẩm", link: "/product/list", icon: faTelevision },
  { name: "Danh sách người dùng", link: "/admin/users", icon: faList },
  { name: "Phê duyệt bài đăng", link: "/admin/product/manager", icon: faCheck },
  { name: "Quản lý sản phẩm", link: "/admin/products", icon: faList },
  { name: "Đăng xuất", link: "/", icon: faRightFromBracket },
];
const actions = [
  { name: "Nạp lại", icon: faArrowsRotate, bg: "success" },
  { name: "Tạo", link: "/add-user", icon: faPlus, bg: "primary" },
  { name: "Xóa", icon: faTrash, bg: "danger" },
  { name: "Thùng rác", icon: faTrashCan, bg: "info" },
];

export default function ProductManager() {
  const { enqueueSnackbar } = useSnackbar();
  const [show, setShow] = useState(false);
  const [products, setProducts] = useState([]);
  const [isCheckAll, setIsCheckAll] = useState(false);
  const [checkList, setCheckList] = useState([]);
  const [ids, setIds] = useState([products.length>0?products.map(item=> item.idProduct):[]])
  const [id, setId] = useState();
  const [isLoading, setIsLoading] = useState(false)
  const handleClose = () => setShow(false);
  let user = JSON.parse(localStorage.getItem("token"));
  const handleShow = (id) => {
    setShow(true);
    setId(id);
  };
  const accept = (id) => {
    axios
      .put(`/product/deleteListProduct/${id}?status=active`)
      .then(() => {
        setIds(ids.filter(item=> item.idProduct !== id))
        enqueueSnackbar("Đã phê duyệt", { variant: "success" })
      })
      .catch(() =>
        enqueueSnackbar("Không thể phê duyệt sản phẩm", { variant: "error" })
      );
  };
  const deleted = (id) => {
    axios
      .put(`/product/deleteListProduct/${id}?status=deleted`)
      .then(() => {
        handleClose();
        setIds(ids.filter(item=> item.idProduct !== id))
        enqueueSnackbar("Đã bỏ bài đăng", { variant: "success" });
      })
      .catch((err) =>
        enqueueSnackbar("Đã bỏ bài đăng", { variant: "success" })
      );
  };
  useEffect(() => {
    setIsLoading(true)
    axios
      .get("/product/selectPending")
      .then((res) => {
        setProducts(res.data.filter((item) => item.status === "pending"));
        setIsLoading(false)
      })
      .catch((err) => {
        console.log(err);
        setIsLoading(false)
      });
  }, [ids]);
  const checkAll = () => {
    setIsCheckAll(!isCheckAll);
    if (!isCheckAll) {
      setCheckList(products.map((item) => item.idProduct));
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

  const deleteAll = () => {
    axios
      .put(`/product/deleteListProduct/${checkList}?status=deleted`)
      .then(() => {
        handleClose();
        enqueueSnackbar("Đã bỏ bài đăng", { variant: "success" });
      })
      .catch((err) =>
        enqueueSnackbar("Đã bỏ bài đăng", { variant: "success" })
      );
  };

  const activeAll = () => {
    axios
      .put(`/product/deleteListProduct/${checkList}?status=active`)
      .then(() => {
        handleClose();
        setIds(ids.filter(item=> !checkList.includes(item)))
        setCheckList([])
        enqueueSnackbar("Đã phê duyệt bài đăng", { variant: "success" });
      })
      .catch((err) =>
        enqueueSnackbar("Không thể phê duyệt", { variant: "success" })
      );
  };
  return (
    <div>
        <div className="mt-4">
          <Modal
            show={show}
            onHide={handleClose}
            backdrop="static"
            keyboard={false}
          >
            <Modal.Header closeButton>
              <Modal.Title>Xóa sản phẩm</Modal.Title>
            </Modal.Header>
            <Modal.Body>Bạn có chắc rằng muốn xóa sản phẩm này?</Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onClick={handleClose}>
                Đóng
              </Button>
              <Button variant="danger" onClick={() => deleted(id)}>
                Xóa
              </Button>
            </Modal.Footer>
          </Modal>
          <div className="row">
            {/* profile menu */}
            <div
              className="col-3 bg-white rounded-2 p-0"
              style={{ minHeight: "100vh" }}
            >
              <div className="w-100 sticky-top ">
                <div className="py-1 ps-3 mb-3">
                  {profileMenu.map((item, index) => {
                    return (
                      <Link
                        to={item.link}
                        key={index}
                        className="text-decoration-none text-black"
                      >
                        <div className="d-flex justify-content-between p-3 mb-3">
                          <span>
                            <FontAwesomeIcon
                              icon={item.icon}
                              className="me-2"
                            />{" "}
                            {item.name}
                          </span>
                          <FontAwesomeIcon icon={faChevronRight} />
                        </div>
                      </Link>
                    );
                  })}
                </div>
              </div>
            </div>

            <div className="col-8 bg-white rounded-2 p-3 ms-3">
              <h1 className="mb-5 mt-5 text-center text-uppercase">
                Duyệt sản phẩm
              </h1>
              <div className="bg-white rounded-3 shadow-sm">
                {/* action */}
                <div className="row p-3">
                  <div className="col-8 d-flex align-items-center justify-content-between w-100">
                    <div className="col-6 d-flex">
                      {products.length > 0 && 
                      <button
                      role="button"
                      onClick={checkAll}
                      className={`border-0 me-1 py-1 text-white px-2 bg-success`}
                    >
                      <FontAwesomeIcon
                        icon={faCheckDouble}
                        className="mr-0"
                      />{" "}
                      Chọn tất cả
                    </button>}
                      {checkList.length > 0 && (
                        <button
                          role="button"
                          className={`border-0 me-1 py-1 text-white px-2 bg-danger`}
                          onClick={deleteAll}
                        >
                          <FontAwesomeIcon icon={faTrash} className="mr-0" />{" "}
                          Xóa nhiều
                        </button>
                      )}

                      {checkList.length > 0 && (
                        <button
                          role="button"
                          className={`border-0 me-1 py-1 text-white px-2 bg-success`}
                          onClick={activeAll}
                        >
                          <FontAwesomeIcon icon={faTrash} className="mr-0" />{" "}
                          Phê duyệt
                        </button>
                      )}
                    </div>
                    <div className="col-6">
                      <MDBInputGroup className=" d-flex align-items-center">
                        <input
                          className="form-control"
                          placeholder="Nhập điều kiện..."
                          type="text"
                        />
                        <MDBBtn outline>Tìm kiếm</MDBBtn>
                      </MDBInputGroup>
                    </div>
                  </div>
                </div>
              </div>

              {/* load data on table */}
              <div className="mt-3 bg-white rounded-3 shadow-sm">
                <Table striped bordered hover>
                  <thead>
                    <tr className="border-underline">
                      <th></th>
                      <th>Hình ảnh</th>
                      <th>Tên</th>
                      <th>Giá</th>
                      <th>Số Lượng</th>
                      <th>Ngày Đăng</th>
                      <th>Thao Tác</th>
                    </tr>
                  </thead>
                  <tbody>
                    {isLoading ? 
                    <tr>
                      <td colSpan={7}>
                        <Spinner/>
                      </td>
                    </tr>
                    :products && products?.length > 0 ? (
                      products.map((product, index) => (
                        <tr key={index}>
                          <td>
                            <input
                              className="form-check-input"
                              type="checkbox"
                              onChange={() => checked(product.idProduct)}
                              checked={
                                checkList.length > 0
                                  ? checkList.includes(product.idProduct)
                                  : false
                              }
                            />
                          </td>
                          <td className="col-1">
                            <img
                              src={product.urlFile[0]}
                              alt=""
                              width="100px"
                            />
                          </td>
                          <td>{product.productName}</td>
                          <td>{product.price}</td>
                          <td>{product.amount}</td>
                          <td>{product.date}</td>
                          <td>
                            <button
                              type="button"
                              onClick={() => accept(product.idProduct)}
                              className="btn btn-info me-2"
                            >
                              Phê duyệt
                            </button>
                            <button
                              type="button"
                              className="btn btn-danger"
                              onClick={() => handleShow(product.idProduct)}
                            >
                              Xóa
                            </button>
                          </td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan="8">Chưa có bài đăng nào.</td>
                      </tr>
                    )}
                  </tbody>
                </Table>
              </div>
            </div>
          </div>
        </div>
    </div>
  );
}
