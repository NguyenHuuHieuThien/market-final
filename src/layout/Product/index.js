import { Row, Col, Badge } from "react-bootstrap";
import * as React from "react";
import { axiosx as axios } from "./../../Helper";
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
// const categories = [
//     'table',
//     'motobike',
//     'chair',
//     'cabinet',
//     'bed',
//     'clother',
//     'shoes',
//     'watch',
//     'bag',
//     'phone',
//     'laptop',
//     'computer',
// ]
// export const products = [
//     { id: 1, name: 'Table', group: 'table', price: 100, image: 'https://cdn.popsww.com/blog/sites/2/2021/11/top-phim-co-trang-trung-quoc-moi.jpg', description: 'this is a table' },
//     { id: 2, name: 'Motobike', group: 'motobike', price: 100, image: 'https://cdn.popsww.com/blog/sites/2/2021/11/top-phim-co-trang-trung-quoc-moi.jpg', description: 'this is a motobike' },
//     { id: 3, name: 'Chair', group: 'chair', price: 100, image: 'https://cdn.popsww.com/blog/sites/2/2021/11/top-phim-co-trang-trung-quoc-moi.jpg', description: 'this is a chair' },
//     { id: 4, name: 'Cabinet', group: 'cabinet', price: 100, image: 'https://cdn.popsww.com/blog/sites/2/2021/11/top-phim-co-trang-trung-quoc-moi.jpg', description: 'this is a cabinet' },
//     { id: 5, name: 'Bed', group: 'bed', price: 100, image: 'https://cdn.popsww.com/blog/sites/2/2021/11/top-phim-co-trang-trung-quoc-moi.jpg', description: 'this is a bed' },
//     { id: 6, name: 'Desk', group: 'table', price: 100, image: 'https://cdn.popsww.com/blog/sites/2/2021/11/top-phim-co-trang-trung-quoc-moi.jpg', description: 'this is a bed' },
//     { id: 7, name: 'Desk', group: 'table', price: 100, image: 'https://cdn.popsww.com/blog/sites/2/2021/11/top-phim-co-trang-trung-quoc-moi.jpg', description: 'this is a bed' },
//     { id: 8, name: 'Desk', group: 'table', price: 100, image: 'https://cdn.popsww.com/blog/sites/2/2021/11/top-phim-co-trang-trung-quoc-moi.jpg', description: 'this is a bed' },
//     { id: 9, name: 'Desk', group: 'table', price: 100, image: 'https://cdn.popsww.com/blog/sites/2/2021/11/top-phim-co-trang-trung-quoc-moi.jpg', description: 'this is a bed' },
//     { id: 10, name: 'Desk', group: 'table', price: 100, image: 'https://cdn.popsww.com/blog/sites/2/2021/11/top-phim-co-trang-trung-quoc-moi.jpg', description: 'this is a bed' },
//     { id: 11, name: 'Desk', group: 'table', price: 100, image: 'https://cdn.popsww.com/blog/sites/2/2021/11/top-phim-co-trang-trung-quoc-moi.jpg', description: 'this is a bed' },
//     { id: 12, name: 'Desk', group: 'table', price: 100, image: 'https://cdn.popsww.com/blog/sites/2/2021/11/top-phim-co-trang-trung-quoc-moi.jpg', description: 'this is a bed' },
//     { id: 13, name: 'Desk', group: 'table', price: 100, image: 'https://cdn.popsww.com/blog/sites/2/2021/11/top-phim-co-trang-trung-quoc-moi.jpg', description: 'this is a bed' },
//     { id: 14, name: 'Desk', group: 'table', price: 100, image: 'https://cdn.popsww.com/blog/sites/2/2021/11/top-phim-co-trang-trung-quoc-moi.jpg', description: 'this is a bed' },
//     { id: 15, name: 'Desk', group: 'table', price: 100, image: 'https://cdn.popsww.com/blog/sites/2/2021/11/top-phim-co-trang-trung-quoc-moi.jpg', description: 'this is a bed' },
//     { id: 16, name: 'Desk', group: 'table', price: 100, image: 'https://cdn.popsww.com/blog/sites/2/2021/11/top-phim-co-trang-trung-quoc-moi.jpg', description: 'this is a bed' },

// ]

export default function ProductPage() {
  const [productList, setProductList] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [categoryName, setCategoryName] = useState([]);
  let token = JSON.parse(localStorage.getItem("token"));
  useEffect(() => {
    setIsLoading(true);
    if (axios) {
      axios
        .get("/product/selectAll")
        .then((res) => {
          setProductList(res.data);
          setIsLoading(false);
        })
        .catch((err) => console.log(err));
    }
  }, []);

  const selectCategory = (id) => {
    setIsLoading(true);
    axios
      .get(`http://localhost:8080/category/search/${id}`)
      .then((res) => {
        console.log(res.data);
        setProductList(
          productList.filter(
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
  return (
    <div className="bg-main">
      <Navbars />
      <div className="container mt-5 bg-white mb-5 shadow-sm p-3 rounded-3">
        <h1 className="text-uppercase me-5 mb-5 sticky-top border-underline w-100 py-3 bg-white">
          Sản phẩm
        </h1>
        <Category
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
            productList.map((product, index) => (
              <div
                className="col-12 col-sm-12 col-md-6 col-lg-3 col-xl-3"
                key={index}
              >
                <div className="border border-primary mb-3">
                  <div className="w-100">
                    <Card>
                      <CardMedia
                        component="img"
                        height="140"
                        image="https://startuanit.net/wp-content/uploads/2021/06/hinh-nen-hai-san-cho-may-tinh-10.jpg"
                        alt="green iguana"
                        className="p-2"
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
                        <Typography variant="body2" color="text.secondary">
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
