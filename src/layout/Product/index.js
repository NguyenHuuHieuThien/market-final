import { Row, Col, Badge } from 'react-bootstrap';
import * as React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { MDBInput } from 'mdb-react-ui-kit';
import { Link } from 'react-router-dom';
import { useState } from 'react'


import Navbars from "../../component/Navbars"
import Footer from "../../component/Footer"
import { useEffect } from 'react';
import { useCallback } from 'react';
const categories = [
    'table',
    'motobike',
    'chair',
    'cabinet',
    'bed',
    'clother',
    'shoes',
    'watch',
    'bag',
    'phone',
    'laptop',
    'computer',
]
export const products = [
    { id: 1, name: 'Table', group: 'table', price: 100, image: 'https://cdn.popsww.com/blog/sites/2/2021/11/top-phim-co-trang-trung-quoc-moi.jpg', description: 'this is a table' },
    { id: 2, name: 'Motobike', group: 'motobike', price: 100, image: 'https://cdn.popsww.com/blog/sites/2/2021/11/top-phim-co-trang-trung-quoc-moi.jpg', description: 'this is a motobike' },
    { id: 3, name: 'Chair', group: 'chair', price: 100, image: 'https://cdn.popsww.com/blog/sites/2/2021/11/top-phim-co-trang-trung-quoc-moi.jpg', description: 'this is a chair' },
    { id: 4, name: 'Cabinet', group: 'cabinet', price: 100, image: 'https://cdn.popsww.com/blog/sites/2/2021/11/top-phim-co-trang-trung-quoc-moi.jpg', description: 'this is a cabinet' },
    { id: 5, name: 'Bed', group: 'bed', price: 100, image: 'https://cdn.popsww.com/blog/sites/2/2021/11/top-phim-co-trang-trung-quoc-moi.jpg', description: 'this is a bed' },
    { id: 6, name: 'Desk', group: 'table', price: 100, image: 'https://cdn.popsww.com/blog/sites/2/2021/11/top-phim-co-trang-trung-quoc-moi.jpg', description: 'this is a bed' },
    { id: 7, name: 'Desk', group: 'table', price: 100, image: 'https://cdn.popsww.com/blog/sites/2/2021/11/top-phim-co-trang-trung-quoc-moi.jpg', description: 'this is a bed' },
    { id: 8, name: 'Desk', group: 'table', price: 100, image: 'https://cdn.popsww.com/blog/sites/2/2021/11/top-phim-co-trang-trung-quoc-moi.jpg', description: 'this is a bed' },
    { id: 9, name: 'Desk', group: 'table', price: 100, image: 'https://cdn.popsww.com/blog/sites/2/2021/11/top-phim-co-trang-trung-quoc-moi.jpg', description: 'this is a bed' },
    { id: 10, name: 'Desk', group: 'table', price: 100, image: 'https://cdn.popsww.com/blog/sites/2/2021/11/top-phim-co-trang-trung-quoc-moi.jpg', description: 'this is a bed' },
    { id: 11, name: 'Desk', group: 'table', price: 100, image: 'https://cdn.popsww.com/blog/sites/2/2021/11/top-phim-co-trang-trung-quoc-moi.jpg', description: 'this is a bed' },
    { id: 12, name: 'Desk', group: 'table', price: 100, image: 'https://cdn.popsww.com/blog/sites/2/2021/11/top-phim-co-trang-trung-quoc-moi.jpg', description: 'this is a bed' },
    { id: 13, name: 'Desk', group: 'table', price: 100, image: 'https://cdn.popsww.com/blog/sites/2/2021/11/top-phim-co-trang-trung-quoc-moi.jpg', description: 'this is a bed' },
    { id: 14, name: 'Desk', group: 'table', price: 100, image: 'https://cdn.popsww.com/blog/sites/2/2021/11/top-phim-co-trang-trung-quoc-moi.jpg', description: 'this is a bed' },
    { id: 15, name: 'Desk', group: 'table', price: 100, image: 'https://cdn.popsww.com/blog/sites/2/2021/11/top-phim-co-trang-trung-quoc-moi.jpg', description: 'this is a bed' },
    { id: 16, name: 'Desk', group: 'table', price: 100, image: 'https://cdn.popsww.com/blog/sites/2/2021/11/top-phim-co-trang-trung-quoc-moi.jpg', description: 'this is a bed' },

]


export default function ProductPage() {

    // const [data, setData] = useState({})
    // const [page, setPage] = useState(1)
    // console.log(data.posts);
    // useEffect(() => {
    //     const fetchData = async () => {
    //         try {
    //             const res = await axiosClient.get("posts", {params: {page, limit:9}})
    //             console.log(res);
    //             setData({ posts: res.data, totalPage: res.pagination.totalPage })

    //         } catch (error) {
    //             console.log(error)

    //         }
    //     }
    //     fetchData()
    // }, [page])


    const [productList, setProductList] = useState(products);
    const [isLoading, setIsLoading] = useState(false);

    const selectCategory = (category) => {
        setIsLoading(true);
        setProductList(products.filter((product) => product.group === category));
        // let categorySelect = productList.filter(item => item.group === category)
        // setProductList(categorySelect)
        setIsLoading(false);
        console.log(123);
    }
    // const handleChangePage = useCallback((page) => {
    //     setPage(page)
    // }, [])
    return (
        <div className='bg-main'>
            <Navbars />
            <div className='container mt-5 bg-white mb-5 shadow-sm p-3 rounded-3'>
                <h1 className='text-uppercase me-5 mb-5 sticky-top border-underline w-100 py-3 bg-white'>Products</h1>
                <ul className='d-flex list-unstyled gap-2 mt-3'>
                    {categories.map((category, index) =>
                        <li key={index} onClick={() => selectCategory(category)} className='border border-primary ' role="button">
                            <a className='text-xs text-decoration-none p-2'>{category}</a>
                        </li>
                    )}
                </ul>
                <Row>
                    <Col xs={6}>
                        <div className="input-group  mb-3">
                            <input type="text" className="form-control" placeholder="search..." />
                            <button className="btn btn-warning" type="button" id="button-addon2">Tìm Kiếm</button>
                        </div>
                    </Col>
                </Row>
                <Row>
                    {productList.map((product, index) =>
                        <Col md={3} key={index}>
                            <div className='border border-primary mb-3'>
                                <Card sx={{ maxWidth: 345 }}>
                                    <CardMedia
                                        component="img"
                                        height="140"
                                        image="https://startuanit.net/wp-content/uploads/2021/06/hinh-nen-hai-san-cho-may-tinh-10.jpg"
                                        alt="green iguana"
                                        className='p-2'
                                    />
                                    <CardContent>
                                        <Typography gutterBottom variant="h5" component="div">
                                            {product.name}
                                        </Typography>
                                        <Typography gutterBottom variant="body2" color="text.secondary" component="div">
                                            <Badge className='me-2' bg="danger" onClick={() => selectCategory(product.group)}>{product.group}</Badge>
                                            <Badge bg="warning">Price</Badge>{product.price}$

                                        </Typography>
                                        <Typography variant="body2" color="text.secondary">
                                            Here you can use rows and columns to organize your footer content. Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                                        </Typography>
                                    </CardContent>
                                    <div className='d-flex justify-content-center'>
                                        <CardActions>
                                            <Button size='small' variant="contained" color="success">Buy</Button>
                                            <Link to={`/product-detail/${product.id}`} className='ms-2'><Button size='small' variant="contained" color="info">Learn more</Button></Link>
                                        </CardActions>
                                    </div>
                                </Card>
                            </div>
                        </Col>
                    )}
                </Row>
                {/* {data.totalPage > 1 && <myPagination total={data.totalPage} current={page} onChange={handleChangePage} />} */}
            </div>
            <Footer />
        </div >
    )
}