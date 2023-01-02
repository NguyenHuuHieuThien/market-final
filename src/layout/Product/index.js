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
import Spinner from "../../component/Spinner";

export default function ProductPage() {
  let navigate = useNavigate();
  let user = JSON.parse(localStorage.getItem("token"));
  const [productList, setProductList] = useState([]);
  const [productCategory, setProductCategory] = useState([]);
  const [data, setData] = useState(productList.length > 0 ? productList : []);
  const [isLoading, setIsLoading] = useState(true);
  const [searchdata, setSearchdata] = useState("");
  const [category, setCategory] = useState([]);

  console.log(isLoading);
  let { enqueueSnackbar } = useSnackbar();

  //useEffect
  useEffect(() => {
    setIsLoading(true);
    axios
      .get("http://localhost:8080/category/searchAll")
      .then((res) => {
        console.log(res.data);
        setCategory(res.data);
      })
      .catch((err) => console.log(err));
    axios
      .get(
        `http://localhost:8080/product/selectAllPaging?pageNo=0&pageSize=30&status=active`
      )
      .then((res) => {
        setProductList(res.data);
        setProductCategory(res.data);
      })
      .catch((err) => console.log(err));
    setIsLoading(false);
  }, [data]);

  //get all product when click all product
  const productAll = () => {
    setData(productList);
  };

  //select category to filter product
  const selectCategory = (id) => {
    console.log(id)
    setIsLoading(true);
    console.log(productCategory);
    setProductCategory(
      productList.filter((product) => product.idCategory === id && product.amount > 0)
    );
    console.log(productCategory);
    setIsLoading(false);
  };

  // search product
  const searchProduct = () => {
    axiosx
      .get(
        `/product/selectByParamProductPaging?param=${String(
          searchdata
        )}&pageNo=0&pageSize=10&status=active`
      )
      .then((res) => {
        setProductCategory(res.data);
        setIsLoading(false);
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
        {/* Load category list */}
        {productList.length > 0 && category.length > 0 ? (
          <div>
            <div className="row text-center">
              {category.map((item) => (
                <div
                  onClick={() => selectCategory(item.idCategory)}
                  key={item.idCategory}
                  className="col-6 col-sm-6 col-md-4 col-lg-2 col-xl-2 text-white mb-3"
                >
                  <div className="category-color pe-2">
                    <span>{item.categoryName}</span>
                  </div>
                </div>
              ))}
              <div
                onClick={productAll}
                className="col-6 col-sm-6 col-md-4 col-lg-2 col-xl-2 text-white mb-3"
              >
                <div className="category-color pe-2">
                  <span>Tất cả sản phẩm</span>
                </div>
              </div>
            </div>

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

            {/* Load product */}
            <Row>
              {isLoading ? (
                <Spinner/>
              ) : productCategory.length > 0 ? (
                <div className=" overflow-auto row"  style={{height: '500px'}}>
                  {productCategory.map(
                    (product, index) =>
                      product.amount > 0 && (
                        <div
                          className="col-12 col-sm-12 col-md-6 col-lg-3 col-xl-3"
                          key={index}
                        >
                          <div className="border border-primary mb-3">
                            <div className="w-100">
                              <Link
                                to={`/product/${product.idProduct}`}
                                className="text-decoration-none text-black"
                              >
                                <Card>
                                  <img
                                    src={product.urlFile[0]}
                                    style={{ width: "100%", height: "300px" }}
                                  />
                                  <CardContent>
                                    <Typography
                                      gutterBottom
                                      variant="h5"
                                      component="div"
                                      className="limit-text"
                                    >
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
                                        onClick={() =>
                                          selectCategory(product.idProduct)
                                        }
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
                                    {user.id === product.idUser ? (
                                      <CardActions>
                                        <Link
                                          to={`/product/update/${product.idProduct}`}
                                        >
                                          <span className="btn btn-outline-warning btn-sm rounded-1">
                                            Chỉnh sửa
                                          </span>
                                        </Link>
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
                                    ) : (
                                      <CardActions>
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
                                    )}
                                  </div>
                                </Card>
                              </Link>
                            </div>
                          </div>
                        </div>
                      )
                  )}
                </div>
              ) : (
                <div className="col-12">
                  <div className="alert alert-primary" role="alert">
                    Không có sản phẩm nào.
                  </div>
                </div>
              )}
            </Row>
          </div>
        ) : (
          <Spinner />
        )}
      </div>
      <Footer />
    </div>
  );
}
