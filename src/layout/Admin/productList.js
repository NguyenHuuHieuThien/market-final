import { axiosx as axios} from "../../Helper";
import Table from "react-bootstrap/Table";
import { Button} from "react-bootstrap";
import Spinner from "../../component/Spinner";
import React, { useEffect, useState } from "react";
import Modal from "react-bootstrap/Modal";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faTrash,
  faCheckDouble,
  faChevronRight,
  faArrowLeft,
  faRightFromBracket,
  faCheck,
  faList,
  faHome,
  faTelevision,
  faSearch,
  faArrowsRotate,
} from "@fortawesome/free-solid-svg-icons";
import { MDBInputGroup, MDBBtn } from "mdb-react-ui-kit";
import { Link } from "react-router-dom";
import { useSnackbar } from "notistack";
const profileMenu = [
  { name: "Trang chủ người dùng", link: "/", icon: faHome },
  { name: "Trang sản phẩm", link: "/product/list", icon: faTelevision },
  { name: "Danh sách người dùng", link: "/admin/users", icon: faList },
  { name: "Phê duyệt bài đăng", link: "/admin/product/manager", icon: faCheck },
  { name: "Quản lý sản phẩm", link: "/admin/products", icon: faList },
  { name: "Đăng xuất", link: "/", icon: faRightFromBracket },
];

export default function ProductList() { 
  const { enqueueSnackbar } = useSnackbar();
  const [show, setShow] = useState(false);
  const [products, setProducts] = useState([]);
  const [isCheckAll, setIsCheckAll] = useState(false);
  const [isLoading , setIsLoading] = useState(false);
  const [data, setData] = useState(products.length > 0 ? products: [])
  const [checkList, setCheckList] = useState([]);
  const [searchdata, setSearchdata] = useState("");
  const [id, setId] = useState();
  const handleClose = () => setShow(false);
  const handleShow = (id) => {
    setShow(true);
    setId(id);
  };

  // delete product
  const deleted = (id) => {
    axios
      .put(`/product/deleteListProduct/${id}?status=deleted`)
      .then(() => {
        handleClose();
        setProducts(products.filter(item => item.idProduct !== id))
        enqueueSnackbar("Đã bỏ bài đăng", { variant: "success" });
      })
      .catch((err) =>
        enqueueSnackbar("Đã bỏ bài đăng", { variant: "success" })
      );
  };

  // reload
  const reload =()=> {
    setData(products)
  }

  // search product
  const searchProduct = () => {
    axios
      .get(
        `/product/selectByParamProductPaging?param=${String(
          searchdata
        )}&pageNo=0&pageSize=10&status=active`
      )
      .then((res) => {
        setProducts(res.data);
        // setNumber(number+1)
      })
      .catch((err) => console.log(err)); 
  };
  
  // useEffect
  useEffect(() => {
    setIsLoading(true)
      axios
      .get("/product/selectAll")
      .then((res) => {
        setProducts(res.data.filter((item) => item.status === "active"));
        setIsLoading(false)
      })
      .catch((err) => {
        enqueueSnackbar("Không thể tải lên danh sách sản phẩm!!!", {variant: 'error'})

      });
  }, [data]);

  // check all product
  const checkAll = () => {
    setIsCheckAll(!isCheckAll);
    if (!isCheckAll) {
      setCheckList(products.map((item) => item.idProduct));
    } else {
      setCheckList([]);
    }
  };

  // check many product
  const checked = (id) => {
    if (checkList.includes(id)) {
      setCheckList(checkList.filter((item) => item !== id));
    } else {
      setCheckList([...checkList, id]);
    }
  };

  //delete all product has been checked
  const deleteAll = () => {
    axios
      .put(`/product/deleteListProduct/${checkList}?status=deleted`)
      .then(() => {
        handleClose();
        setData(products.filter(item=> !checkList.includes(item.idProduct)))
        enqueueSnackbar("Đã bỏ bài đăng", { variant: "success" });
      })
      .catch((err) =>
        enqueueSnackbar("Bỏ bài đăng không thành công", { variant: "error" })
      );
  };

  return (
    <div>
        <div className="mt-4 bg-main" style={{ minHeight: "100vh" }}>
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
                Quản lý sản phẩm
              </h1>
              <div className="bg-white rounded-3 shadow-sm">
                <div className="row p-3">
                  <div className="col-8 d-flex align-items-center justify-content-between w-100">
                    <div className="col-6 d-flex">
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
                      </button>
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
                      <button onClick={reload} className="btn btn-warning text-white">
                        <FontAwesomeIcon className="me-2" icon={faArrowsRotate}/>
                        Tải lại
                        </button>
                    </div>
                    <div className="col-6">
                      <MDBInputGroup className=" d-flex align-items-center">
                        <input
                        onChange={(e) => setSearchdata(e.target.value)}
                          className="form-control"
                          placeholder="Nhập điều kiện..."
                          type="text"
                        />
                        <button className="btn btn-outline-success" onClick = {searchProduct} outline>
                          <FontAwesomeIcon className="me-2" icon={faSearch}/>
                          Tìm kiếm
                          </button>
                      </MDBInputGroup>
                    </div>
                  </div>
                </div>
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
                      <th>Thao Tác</th>
                    </tr>
                  </thead>
                  <tbody>
                    {isLoading ? 
                    (<tr>
                      <td colSpan={6}><Spinner/></td>
                    </tr>)
                     : 
                     (products?.length > 0 ? (
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
                          <td>
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
                        <td colSpan="8">Không có sản phẩm nào.</td>
                      </tr>
                    ))}
                  </tbody>
                </Table>
              </div>
            </div>
          </div>
        </div>
    </div>
  );
}
