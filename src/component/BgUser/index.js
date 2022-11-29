import React from "react";
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
} from "mdb-react-ui-kit";

import { useState, useEffect, useRef } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPenToSquare,
  faChevronRight,
  faBell,
  faCartShopping,
  faHome,
  faUser,
  faEdit,
  faList,
  faRightFromBracket,
  faTelevision,
  faBarsProgress,
  faListCheck,
} from "@fortawesome/free-solid-svg-icons";
import { Link,useLocation } from "react-router-dom";
import { Collapse } from "react-bootstrap";

import ModalReact from "../../component/Modal";

const profileMenu = [
  { name: "Trang chủ", link: "/", icon: faHome },
  { name: "Thông báo", link: "/", icon: faBell },
  { name: "Giỏ hàng", link: "/carts", icon: faCartShopping },
  { name: "Trang cá nhân", link: "/user/profile", icon: faUser },
  { name: "Xem sản phẩm", link: "/product/list", icon: faTelevision },
  { name: "Sản phẩm đã đăng", link: "/sell/list", icon: faListCheck },
  { name: "Quản lý sản phẩm", link: "/sell/manager", icon: faBarsProgress },
  { name: "Đăng bài", link: "/product/add", icon: faEdit },
  { name: "Đăng xuất", link: "/", icon: faRightFromBracket, logout: function(){localStorage.clear()} },
];
export default function BgUser({ children }) {
  const [open, setOpen] = useState(false);
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  let location  = useLocation()
  let path = location.pathname.includes('profile')
  let user = JSON.parse(localStorage.getItem('token'))
  return (
    <div className="bg-main">
      <ModalReact
        children={
          <div>
            <div class="form-floating mb-3">
              <input class="form-control" type="password" required id="currentPass" />
              <label for="currentPass">Mật khẩu hiện tại</label>
            </div>
            <div class="form-floating mb-3">
              <input class="form-control" required type="password" id="newPass" />
              <label for="newPass">Mật khẩu mới</label>
            </div>
            <div class="form-floating mb-3">
              <input class="form-control" required type="password" id="checkNewPass" />
              <label for="checkNewPass">Nhập lại mật khẩu</label>
            </div>
          </div>
        }
        handleClose={handleClose}
        show={show}
        title="Đổi mật khẩu"
      ></ModalReact>
      <div className="row">
        <div
          className="col-3 mt-3 bg-white sticky-top rounded-2 mb-3 ms-5 shadow-sm"
          style={{ height: "100vh" }}
        >
          <div className="w-100 ">
            <div className="py-1 mb-3">
              {profileMenu.map((item, index) => {
                return (
                  <Link
                    to={item.link}
                    key={index}
                    onClick={item?.logout}
                    className="text-decoration-none text-black"
                  >
                    <div className="d-flex justify-content-between p-3 hover mb-3">
                      <span>
                        <FontAwesomeIcon icon={item.icon} className="me-2" />{" "}
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
        <div className="col-8 mt-3 p-0">
          <MDBContainer className="ms-2">
            <div className="d-flex justify-content-between bg-white p-3 rounded-3 mb-3 shadow-sm  sticky-top">
              <div>
                <Link to="/product/add">
                  <button className="btn btn-primary me-2">Đăng tin</button>
                </Link>
                {path&& <Link to={`/user/update/${user.id}`}>
                  <button className="btn btn-success me-2">Sửa profile</button>
                </Link>}
                <button
                  className="btn btn-info me-2"
                  onClick={() => setShow(true)}
                >
                  Đổi mật khẩu
                </button>
              </div>
              <button className="btn btn-danger rounded-5">Đăng xuất</button>
            </div>
            <div className="p-3 mb-3 shadow-sm">{children}</div>
          </MDBContainer>
        </div>
      </div>
    </div>
  );
}
