/* eslint-disable jsx-a11y/alt-text */
import { Row, Col, Badge } from "react-bootstrap";
import * as React from "react";
import { axiosx } from "./../../Helper";
import axios from "axios";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { MDBInput } from "mdb-react-ui-kit";
import { Link, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";

import Navbars from "../../component/Navbars";
import Footer from "../../component/Footer";
import Category from "../../component/Categories";
import { useSnackbar } from "notistack";
import ModalReact from "../../component/Modal";
import { useCallback } from "react";

export default function ProductPage() {
  let navigate = useNavigate();
  let user = JSON.parse(localStorage.getItem("token"));
  const [productList, setProductList] = useState([]);
  const [productCategory, setProductCategory] = useState([]);
  const [datafull, setDataFull] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [categoryName, setCategoryName] = useState([]);
  const [searchdata, setSearchdata] = useState("");
  const [pagenumber, setPageNumber] = useState(0);
  const [number, setNumber] = useState(0);
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => {
    setShow(true);
  };
  let { enqueueSnackbar } = useSnackbar();
  useEffect(() => {
    setIsLoading(true);
    axios
      .get(
        `http://localhost:8080/product/selectAllPaging?pageNo=0&pageSize=10&status=active`
      )
      .then((res) => {
        setProductList(res.data);
        setProductCategory(res.data);
        setIsLoading(false);
      })
      .catch((err) => console.log(err));
  }, []);
  console.log(productCategory);
  const selectCategory = (id) => {
    setIsLoading(true);
    axios
      .get(`http://localhost:8080/category/search/${id}`)
      .then((res) => {
        console.log(res.data);
        setProductCategory(
          productList.filter(
            (product) => product.idCategory === res.data.idCategory
          )
        );
        setIsLoading(false);
      })
      .catch((err) => console.log(err));
  };
  const changePage = (type) => {
    if (type === "next") {
      setPageNumber(pagenumber + 1);
    } else {
      setPageNumber(pagenumber - 1);
    }
  };
  const addToCart = (id, amount) => {
    axiosx
      .post(`/cart/insert?idUser=${user.id}&idProduct=${id}`, {
        amount: amount,
      })
      .then(() => {
        enqueueSnackbar("Đã thêm vào giỏ", { variant: "success" });
        navigate("/carts");
      })
      .catch((err) => enqueueSnackbar("Lỗi", { variant: "error" }));
  };
  const allCategory = () => {
    setIsLoading(true);
    axiosx
      .get("/product/selectAll")
      .then((res) => {
        setProductCategory(res.data.filter((item) => item.status === "active"));
        setIsLoading(false);
      })
      .catch((err) => console.log(err));
  };

  const searchProduct = () => {
    axiosx
      .get(
        `/product/selectByParamProductPaging?param=${String(
          searchdata
        )}&pageNo=0&pageSize=10&status=active`
      )
      .then((res) => {
        setProductCategory(res.data);
        // setNumber(number+1)
      })
      .catch((err) => console.log(err));
  };
  return (
    <div className="bg-main">
      <Navbars />
      <div className="container mt-5 bg-white mb-5 shadow-sm p-3 rounded-3">
        <h1 className="text-uppercase me-5 mb-5 sticky-top border-underline w-100 py-3 bg-white">
          Sản phẩm
        </h1>
        <Category allCategory={allCategory} selectCategory={selectCategory} />
        <Row>
          <Col xs={6}>
            <div className="input-group  mb-3">
              <input
                onChange={(e) => setSearchdata(e.target.value)}
                type="text"
                className="form-control"
                placeholder="search..."
              />
              <button
                onClick={searchProduct}
                className="btn btn-warning"
                type="button"
                id="button-addon2"
              >
                Tìm Kiếm
              </button>
            </div>
          </Col>
        </Row>
        <Row>
          {isLoading ? (
            <div className="spinner-border text-danger" role="status">
              <span className="visually-hidden">Loading...</span>
            </div>
          ) : (
            productCategory.map((product, index) => (
              <div
                className="col-12 col-sm-12 col-md-6 col-lg-3 col-xl-3"
                key={index}
              >
                <div className="border border-primary mb-3">
                  <div className="w-100">
                    <Card>
                      <img
                        src={product.urlFile[0]}
                        style={{ width: "100%", height: "300px" }}
                      />
                      <CardContent>
                        <Typography gutterBottom variant="h5" component="div">
                          {product.productName}
                        </Typography>
                        <Typography
                          gutterBottom
                          variant="body2"
                          color="text.secondary"
                          component="div"
                        >
                          <Badge
                            className="me-2"
                            bg="danger"
                            onClick={() => selectCategory(product.idProduct)}
                          >
                            {product.categoryName}
                          </Badge>
                          <Badge bg="warning">Giá: </Badge>
                          {new Intl.NumberFormat("vi-VN", {
                            style: "currency",
                            currency: "VND",
                          }).format(product.price)}
                        </Typography>
                        <Typography
                          variant="body2"
                          className="limit-text fs-13"
                          color="text.secondary"
                        >
                          {product.description}
                        </Typography>
                      </CardContent>
                      <div className="d-flex justify-content-center">
                        <CardActions>
                          {product.amount == 0 ? (
                            <span className="btn btn-sm rounded-1 btn-danger disabled">
                              Hết hàng
                            </span>
                          ) : (
                            <Button 
                              onClick={() => addToCart(product.idProduct, product.amount)}
                              size="small"
                              variant="contained"
                              color="success"
                            >
                              Thêm vào giỏ
                            </Button>
                          )}
                          <Link
                            to={`/product/${product.idProduct}`}
                            className="ms-2"
                          >
                            <Button
                              size="small"
                              variant="contained"
                              color="info"
                            >
                              Chi tiết
                            </Button>
                          </Link>
                        </CardActions>
                      </div>
                    </Card>
                  </div>
                </div>
              </div>
            ))
          )}
        </Row>
        <nav aria-label="Page navigation example">
          <ul class="pagination">
            <li class="page-item">
              <a className="page-link" onClick={() => changePage("back")}>
                Previous
              </a>
            </li>
            <li class="page-item">
              <a className="page-link" href="#">
                1
              </a>
            </li>
            <li class="page-item">
              <a className="page-link" href="#">
                2
              </a>
            </li>
            <li class="page-item">
              <a className="page-link" href="#">
                3
              </a>
            </li>
            <li class="page-item">
              <a className="page-link" onClick={() => changePage("next")}>
                Next
              </a>
            </li>
          </ul>
        </nav>
        {/* {data.totalPage > 1 && <myPagination total={data.totalPage} current={page} onChange={handleChangePage} />} */}
      </div>
      <Footer />
    </div>
  );
}
