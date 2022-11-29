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
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";

import Navbars from "../../component/Navbars";
import Footer from "../../component/Footer";
import Category from "../../component/Categories";
import { useCallback } from "react";

export default function ProductPage() {
  const [productList, setProductList] = useState([]);
  const [productCategory, setProductCategory] = useState([])
  const [isLoading, setIsLoading] = useState(true);
  const [categoryName, setCategoryName] = useState([]);
  useEffect(() => {
    setIsLoading(true);
    if (axiosx) {
      axiosx
        .get("/product/selectAll")
        .then((res) => {
          setProductList(res.data.filter(item=> item.status === 'active'));
          setProductCategory(res.data.filter(item=> item.status === 'active'))
          setIsLoading(false);
        })
        .catch((err) => console.log(err));
    }
  }, []);
  console.log(productCategory);
  const selectCategory = (id) => {
    setIsLoading(true);
    axiosx
      .get(`http://localhost:8080/category/search/${id}`)
      .then((res) => {
        console.log(res.data);
        setProductCategory(productList.filter(
            (product) => product.idCategory === res.data.idCategory
          )
        );
        setIsLoading(false);
      })
      .catch((err) => console.log(err));
  };
  const getCategories = (category) => {
    // if (productList) {
    //   setProductList(
    //     productList.map((item) => {
    //       item.categoryName = category.filter(
    //         (e) => e.idCategory === item.idCategory
    //       ).categoryName;
    //       return item;
    //     })
    //   );
    // }
  };

  const allCategory =()=>{
    setIsLoading(true);
    axiosx
        .get("/product/selectAll")
        .then((res) => {
          setProductCategory(res.data.filter(item=> item.status === 'active'));
          setIsLoading(false);
        })
        .catch((err) => console.log(err));
  }


  const searchProduct = () => {
    axios.post("/product/selectByParamProductPaging");
  };
  return (
    <div className="bg-main">
      <Navbars />
      <div className="container mt-5 bg-white mb-5 shadow-sm p-3 rounded-3">
        <h1 className="text-uppercase me-5 mb-5 sticky-top border-underline w-100 py-3 bg-white">
          Sản phẩm
        </h1>
        <Category
        allCategory={allCategory}
          getCategories={getCategories}
          selectCategory={selectCategory}
        />
        <Row>
          <Col xs={6}>
            <div className="input-group  mb-3">
              <input
                type="text"
                className="form-control"
                placeholder="search..."
              />
              <button
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
            <div class="spinner-border text-danger" role="status">
              <span class="visually-hidden">Loading...</span>
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
                          <Badge bg="warning">Price</Badge>
                          {product.price}$
                        </Typography>
                        <Typography
                          variant="body2"
                          className="limit-text"
                          color="text.secondary"
                        >
                          {product.description}
                        </Typography>
                      </CardContent>
                      <div className="d-flex justify-content-center">
                        <CardActions>
                          <Button
                            size="small"
                            variant="contained"
                            color="success"
                          >
                            Thêm vào giỏ
                          </Button>
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
        {/* {data.totalPage > 1 && <myPagination total={data.totalPage} current={page} onChange={handleChangePage} />} */}
      </div>
      <Footer />
    </div>
  );
}
