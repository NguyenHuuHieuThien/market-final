import React from 'react';
import {
    MDBCol,
    MDBContainer,
    MDBRow,
    MDBCard,
    MDBCardText,
    MDBCardBody,
    MDBCardImage,
    MDBBtn,
    MDBTableBody,
    MDBTable,
    MDBTableHead,
} from 'mdb-react-ui-kit';

import { useState, useEffect, useRef } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPenToSquare, faChevronRight, faBell, faCartShopping, faHome, faUser, faEdit, faList, faRightFromBracket } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';
import { Collapse } from 'react-bootstrap';

import ModalReact from '../../component/Modal';
import Navbars from '../../component/Navbars';
import Footer from '../../component/Footer';
import MyCollapse from '../../component/Collapse';
const profileMenu = [
    { name: 'Trang chủ', link: '/', icon: faHome },
    { name: 'Thông báo', link: '/', icon: faBell },
    { name: 'Giỏ hàng', link: '/carts', icon: faCartShopping },
    { name: 'Profile', link: '/profile', icon: faUser },
    { name: 'Sản phẩm đã đăng', link: '/', icon: faList },
    { name: 'Đăng bài', link: '/product-add', icon: faEdit },
    { name: 'Đăng xuất', link: '/', icon: faRightFromBracket },
]
export default function ProfilePage() {
    const [open, setOpen] = useState(false);
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);

    return (
        <>
            <section className='bg-main'>
                <ModalReact children={
                <div>
                    <div class="form-floating mb-3">
                        <input class="form-control" type="password" id="currentPass" />
                        <label for="currentPass">Mật khẩu hiện tại</label>
                    </div>
                    <div class="form-floating mb-3">
                        <input class="form-control" type="password" id="newPass" />
                        <label for="newPass">Mật khẩu mới</label>
                    </div>
                    <div class="form-floating mb-3">
                        <input class="form-control" type="password" id="checkNewPass" />
                        <label for="checkNewPass">Nhập lại mật khẩu</label>
                    </div>
                </div>}
                    handleClose={handleClose}
                    show={show}
                    title="Đổi mật khẩu">

                </ModalReact>
                <div className='row'>
                    <div className='col-2 mt-3 bg-white sticky-top rounded-2 mb-3 ms-5 shadow-sm' style={{height: '100vh'}}>
                        <div className='w-100 '>
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
                    <div className='col-9  mt-3 p-0'>
                        <MDBContainer className="ms-2">
                            <MDBRow>
                                <MDBCol>

                                    <div className='d-flex justify-content-between bg-white p-3 rounded-3 mb-3 shadow-sm'>
                                        <div>
                                            <Link to="product-add"><button className='btn btn-primary me-2'>Đăng tin</button></Link>
                                            <Link to="/user/update/1"><button className='btn btn-success me-2'>Sửa profile</button></Link>
                                            <button className='btn btn-info me-2' onClick={() => setShow(true)}>Đổi mật khẩu</button>
                                        </div>
                                        <button className='btn btn-danger rounded-5'>Đăng xuất</button>
                                    </div>

                                </MDBCol>
                            </MDBRow>

                            <MDBRow>
                                <MDBCol lg="4">
                                    <MDBCard className="mb-4">
                                        <MDBCardBody className="text-center shadow-sm" >
                                            <div className='d-flex justify-content-center'>
                                                <MDBCardImage
                                                    src="https://cdnmedia.tinmoi.vn/upload/thanhxuanbtv/2021/08/06/luu-thi-thi-de-toc-ngan-khien-cnet-chan-dong-vi-kem-sac-va-tam-thuong-1628219036-3.jpg"
                                                    alt="avatar"
                                                    className="rounded-pill"
                                                    style={{ width: '150px', height: '150px' }}
                                                    fluid />
                                            </div>
                                            <div className='mt-3 mb-5'>
                                                <span className="text-muted mb-1 d-block ">Full Stack Developer</span>
                                                <span className="text-muted mb-4">Bay Area, San Francisco, CA</span>
                                            </div>
                                            <div className="d-flex justify-content-center mb-3 pb-5">
                                                <MDBBtn>Follow</MDBBtn>
                                                <MDBBtn outline className="ms-1">Message</MDBBtn>
                                            </div>
                                        </MDBCardBody>
                                    </MDBCard>
                                </MDBCol>
                                <MDBCol lg="8">
                                    <MDBCard className="mb-4">
                                        <MDBCardBody className='shadow-sm'>
                                            <MDBRow>
                                                <MDBCol sm="3">
                                                    <MDBCardText>Họ tên</MDBCardText>
                                                </MDBCol>
                                                <MDBCol sm="7">
                                                    <MDBCardText className="text-muted">Nguyễn Hữu Hiếu Thiên</MDBCardText>
                                                    <MyCollapse open={open} children='abc' />

                                                </MDBCol>
                                                <MDBCol sm="2">
                                                    <MDBCardText className="text-muted">
                                                        <FontAwesomeIcon role='button' aria-expanded={open} aria-controls="fullname" id='fullname' icon={faPenToSquare} />
                                                    </MDBCardText>
                                                </MDBCol>
                                            </MDBRow>
                                            <hr />
                                            <MDBRow>
                                                <MDBCol sm="3">
                                                    <MDBCardText>Email</MDBCardText>
                                                </MDBCol>
                                                <MDBCol sm="7">
                                                    <MDBCardText className="text-muted">nguyenthien3347@gmail.com</MDBCardText>
                                                    <MyCollapse open={open} children='bca' />

                                                </MDBCol>
                                                <MDBCol sm="2">
                                                    <MDBCardText className="text-muted">
                                                        <FontAwesomeIcon role='button' aria-expanded={open} aria-controls="email" icon={faPenToSquare} />
                                                    </MDBCardText>
                                                </MDBCol>
                                            </MDBRow>
                                            <hr />
                                            <MDBRow>
                                                <MDBCol sm="3">
                                                    <MDBCardText>Ngày sinh</MDBCardText>
                                                </MDBCol>
                                                <MDBCol sm="7">
                                                    <MDBCardText className="text-muted">17/07/2000</MDBCardText>
                                                    <MyCollapse open={open} children='bca' />

                                                </MDBCol>
                                                <MDBCol sm="2">
                                                    <MDBCardText className="text-muted">
                                                        <FontAwesomeIcon role='button' aria-expanded={open} aria-controls="birthdate" icon={faPenToSquare} />
                                                    </MDBCardText>
                                                </MDBCol>
                                            </MDBRow>
                                            <hr />
                                            <MDBRow>
                                                <MDBCol sm="3">
                                                    <MDBCardText>Giới tính</MDBCardText>
                                                </MDBCol>
                                                <MDBCol sm="7">
                                                    <MDBCardText className="text-muted">Nam</MDBCardText>
                                                    <MyCollapse open={open} children='bca' />

                                                </MDBCol>
                                                <MDBCol sm="2">
                                                    <MDBCardText className="text-muted">
                                                        <FontAwesomeIcon role='button' aria-expanded={open} aria-controls="gender" icon={faPenToSquare} />
                                                    </MDBCardText>
                                                </MDBCol>
                                            </MDBRow>
                                            <hr />
                                            <MDBRow>
                                                <MDBCol sm="3">
                                                    <MDBCardText>Số điện thoại</MDBCardText>
                                                </MDBCol>
                                                <MDBCol sm="7">
                                                    <MDBCardText className="text-muted">0941549525</MDBCardText>
                                                </MDBCol>
                                                <MDBCol sm="2">
                                                    <MDBCardText className="text-muted"><FontAwesomeIcon role='button' icon={faPenToSquare} /></MDBCardText>
                                                </MDBCol>
                                            </MDBRow>
                                            <hr />
                                            <MDBRow>
                                                <MDBCol sm="3">
                                                    <MDBCardText>Địa chỉ</MDBCardText>
                                                </MDBCol>
                                                <MDBCol sm="7">
                                                    <MDBCardText className="text-muted">71 Ngũ Hành Sơn, Q.Ngũ Hành Sơn, TP.Đà Nẵng</MDBCardText>
                                                </MDBCol>
                                                <MDBCol sm="2">
                                                    <MDBCardText className="text-muted"><FontAwesomeIcon role='button' icon={faPenToSquare} /></MDBCardText>
                                                </MDBCol>
                                            </MDBRow>
                                        </MDBCardBody>
                                    </MDBCard>

                                </MDBCol>
                            </MDBRow>
                            <div>
                                <div className='bg-white rounded-2 shadow-sm'>
                                    <h3 className='py-3 border-underline'>Lịch sử mua hàng</h3>
                                    <MDBTable>
                                        <MDBTableHead>
                                            <tr>
                                                <th scope='col'>#</th>
                                                <th scope='col'>First</th>
                                                <th scope='col'>Last</th>
                                                <th scope='col'>Handle</th>
                                            </tr>
                                        </MDBTableHead>
                                        <MDBTableBody>
                                            <tr>
                                                <th scope='row'>1</th>
                                                <td>Mark</td>
                                                <td>Otto</td>
                                                <td>@mdo</td>
                                            </tr>


                                        </MDBTableBody>
                                    </MDBTable>
                                </div>
                            </div>
                        </MDBContainer>
                    </div>
                </div>
            </section>
        </>
    );
}