import SideBars from "../../component/SideNav"
import { Row, Col, Button } from 'react-bootstrap'
import Table from 'react-bootstrap/Table';
import React, { useEffect, useState } from 'react';
import Modal from 'react-bootstrap/Modal';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";   
import { faPlus, faTrash,faArrowsRotate, faCheckDouble, faChevronRight,faTrashCan, faRightFromBracket, faCheck,faList,faHome } from "@fortawesome/free-solid-svg-icons";
import {
    MDBInputGroup,
    MDBBtn,
    MDBBadge,
    MDBIcon
} from 'mdb-react-ui-kit';
import {Link} from 'react-router-dom'
import axios from "axios";
const profileMenu = [
    { name: 'Trang chủ', link: '/', icon: faHome },
    { name: 'Danh sách người dùng', link: '/admin/users', icon: faList },
    { name: 'Phê duyệt bài đăng', link: '/admin/product-list', icon: faCheck },
    { name: 'Đăng xuất', link: '/', icon: faRightFromBracket },
]
const actions = [
    { name: 'Nạp lại', icon: faArrowsRotate, bg: 'success' },
    { name: 'Tạo', link: '/add-user', icon: faPlus, bg: 'primary' },
    { name: 'Xóa', icon: faTrash, bg: 'danger' },
    { name: 'Thùng rác', icon: faTrashCan, bg: 'info' },

]
// const products = [
//     {
//         name: 'table',
//         price: 100,
//         image: 'https://cdn.popsww.com/blog/sites/2/2021/11/top-phim-co-trang-trung-quoc-moi.jpg',
//         description: 'this is a table',
//         date: '2021-11-11',
//         quantity: 10
//     },
//     {
//         name: 'motobike',
//         price: 100,
//         image: 'https://cdn.popsww.com/blog/sites/2/2021/11/top-phim-co-trang-trung-quoc-moi.jpg',
//         description: 'this is a motobike',
//         date: '2021-11-11',
//         quantity: 10
//     },
//     {
//         name: 'chair',
//         price: 100,
//         image: 'https://cdn.popsww.com/blog/sites/2/2021/11/top-phim-co-trang-trung-quoc-moi.jpg',
//         description: 'this is a chair',
//         date: '2021-11-11',
//         quantity: 10
//     },
//     {
//         name: 'cabinet',
//         price: 100,
//         image: 'https://cdn.popsww.com/blog/sites/2/2021/11/top-phim-co-trang-trung-quoc-moi.jpg',
//         description: 'this is a cabinet',
//         date: '2021-11-11',
//         quantity: 10
//     },
//     {
//         name: 'bed',
//         price: 100,
//         image: 'https://cdn.popsww.com/blog/sites/2/2021/11/top-phim-co-trang-trung-quoc-moi.jpg',
//         description: 'this is a bed',
//         date: '2021-11-11',
//         quantity: 10
//     },
// ]

export default function ProductList() {
    const [show, setShow] = useState(false);
    const [products, setProducts] = useState([]);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    useEffect(() => { 
        axios.get('http://localhost:8080/product/selectAll')
            .then(res => {
                console.log(res.data);
                setProducts(res.data)
            })
            .catch(err => { console.log(err) })
    },[])
    return (
        <div className="mt-4 bg-main">
            <Modal
                show={show}
                onHide={handleClose}
                backdrop="static"
                keyboard={false}
            >
                <Modal.Header closeButton>
                    <Modal.Title>Delete product</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    Are you sure you want to delete this product?
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                    <Button variant="danger" onClick={handleClose}>Xóa</Button>
                </Modal.Footer>
            </Modal>
            <div className="row">
            <div className='col-3 bg-white rounded-2 p-0 ms-5'>
                        <div className='w-100 sticky-top '>
                            <div className='py-1 ps-3 mb-3'>
                                {profileMenu.map((item, index) => {
                                    return (
                                        <Link to={item.link} className="text-decoration-none text-black">
                                            <div className='d-flex justify-content-between p-3 mb-3'>
                                                <span><FontAwesomeIcon icon={item.icon} className="me-2" /> {item.name}</span>
                                                <FontAwesomeIcon icon={faChevronRight} />
                                            </div>
                                        </Link>
                                    )
                                })}
                            </div>
                        </div>
                    </div>

                    <div className='col-8 bg-white rounded-2 p-3 ms-3'>
                    <h1 className="mb-5 mt-5 text-center text-uppercase">Duyệt sản phẩm</h1>
                    <div className='bg-white rounded-3 shadow-sm'>
                        <div className='row p-3'>
                            <div className='col-8 d-flex align-items-center justify-content-between w-100'>
                                <div className="col-6 d-flex">
                                    {actions.map((action, index) => (
                                        action.link ? <Link to={action.link} key={index}><button className="btn btn-primary me-1"><FontAwesomeIcon icon={action.icon} /> {action.name}</button></Link> :
                                            <button role="button" key={index} className={`border-0 me-1 text-white px-2 bg-${action.bg}`}>
                                                <FontAwesomeIcon icon={action.icon} className="mr-0" /> {action.name}
                                            </button>
                                    ))}
                                </div>
                                <div className="col-6">
                                    <MDBInputGroup className=' d-flex align-items-center'>
                                        <input className='form-control' placeholder="Nhập điều kiện..." type='text' />
                                        <MDBBtn outline>Tìm kiếm</MDBBtn>
                                    </MDBInputGroup>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="mt-3 bg-white rounded-3 shadow-sm">
                        <Table striped bordered hover>
                            <thead>
                                <tr className='border-underline'>
                                    <th>Hình ảnh</th>
                                    <th>Tên</th>
                                    <th>Giá</th>
                                    <th>Số Lượng</th>
                                    <th>Ngày Đăng</th>
                                    <th>Trade park</th>
                                    <th>Thao Tác</th>
                                </tr>
                            </thead>
                            <tbody>
                                {products.length > 0 ? products.map((product, index) => (
                                    <tr key={index}>
                                        <td className="col-1"><img src={product && product.file.length>0?`http://localhost:8080/file/downloadFile/${product.file[0].id}`:'no image'} alt="" width="100px" /></td>
                                        <td>{product.productName}</td>
                                        <td>{product.price}</td>
                                        <td>{product.quantity}</td>
                                        <td>{product.date}</td>
                                        <td>{product.tradePark}</td>
                                        <td>
                                            <button type="button" className="btn btn-info me-2"><Link style={{ textDecoration: 'none', color: 'white' }} to={`/update/product/${product.idUser}`}>Update</Link></button>
                                            <button type="button" className="btn btn-danger" onClick={() => handleShow(product.idUser)}>Delete</button>
                                        </td>
                                    </tr>
                                )) : <tr ><td colSpan="8">Chưa có bài đăng nào.<Link to='/sign-up'>Tạo mới một bài đăng người dùng</Link></td></tr>}


                            </tbody>
                        </Table>
                    </div>
                    </div>


            </div>
            
        </div>
    )
}