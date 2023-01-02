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
  faCheck,
  faClock,
} from "@fortawesome/free-solid-svg-icons";
import { Link, useLocation } from "react-router-dom";
import { Collapse } from "react-bootstrap";

import ModalReact from "../../component/Modal";

const userMenu = [
  { name: "Trang chủ", link: "/", icon: faHome },
  { name: "Giỏ hàng", link: "/carts", icon: faCartShopping },
  { name: "Đơn hàng chờ", link: "/user/await", icon: faClock },
  { name: "Trang cá nhân", link: "/user/profile", icon: faUser },
  { name: "Xem sản phẩm", link: "/product/list", icon: faTelevision },
  {
    name: "Đăng xuất",
    link: "/",
    icon: faRightFromBracket,
    logout: function () {
      setTimeout(() => {
        window.location.href = "/";
      }, 1000);
    },
  },
];
const sellerMenu = [
  { name: "Trang chủ", link: "/", icon: faHome },
  { name: "Đăng sản phẩm", link: "/product/add", icon: faEdit },
  { name: "Trang cá nhân", link: "/user/profile", icon: faUser },
  { name: "Xem sản phẩm", link: "/product/list", icon: faTelevision },
  { name: "Sản phẩm đã đăng", link: "/sell/list", icon: faListCheck },
  { name: "Phê duyệt đơn hàng", link: "/sell/manager", icon: faCheck },
  {
    name: "Đăng xuất",
    link: "/",
    icon: faRightFromBracket,
    logout: function () {
      localStorage.clear();
      setTimeout(() => {
        window.location.href = "/";
      }, 1000);
    },
  },
];
export default function BgUser({ children }) {
  const [open, setOpen] = useState(false);
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  let location = useLocation();
  let path = location.pathname.includes("profile");
  let user = JSON.parse(localStorage.getItem("token"));
  const logout = () => {
    localStorage.clear();
    setTimeout(() => {
      window.location.href = "/";
    }, 1000);
  };
  return (
    <div className="bg-main">
      {/* <ModalReact
        children={
          <div>
            <div class="form-floating mb-3">
              <input
                class="form-control"
                type="password"
                required
                id="currentPass"
              />
              <label for="currentPass">Mật khẩu hiện tại</label>
            </div>
            <div class="form-floating mb-3">
              <input
                class="form-control"
                required
                type="password"
                id="newPass"
              />
              <label for="newPass">Mật khẩu mới</label>
            </div>
            <div class="form-floating mb-3">
              <input
                class="form-control"
                required
                type="password"
                id="checkNewPass"
              />
              <label for="checkNewPass">Nhập lại mật khẩu</label>
            </div>
          </div>
        }
        handleClose={handleClose}
        show={show}
        title="Đổi mật khẩu"
      ></ModalReact> */}
      <div className="row m-0">
        <div
          className="col-2 col-sm-2 col-md-2 col-lg-2 col-xl-2 mt-3 bg-white sticky-top rounded-2 mb-3 shadow-sm"
          style={{ height: "100vh" }}
        >
          <div className="w-100 ">
            <div className="py-1 mb-3">
              {user.roles[0] === "ROLE_MODERATOR"
                ? sellerMenu.map((item, index) => (
                    <Link
                      to={item.link}
                      key={index}
                      onClick={item?.logout}
                      className={`text-decoration-none text-black`}
                    >
                      <div className="d-block d-sm-block d-md-block d-lg-flex d-xl-flex justify-content-between py-3 hover mb-3">
                        <span>
                          <span>
                            <FontAwesomeIcon
                              icon={item.icon}
                              className="me-2"
                            />{" "}
                          </span>
                          <span className="d-none d-sm-none d-md-inline-block d-lg-inline-block d-xl-inline-block">
                            {item.name}
                          </span>
                        </span>
                        <FontAwesomeIcon
                          className="d-none d-sm-none d-md-inline-block d-lg-inline-block d-xl-inline-block"
                          icon={faChevronRight}
                        />
                      </div>
                    </Link>
                  ))
                : userMenu.map((item, index) => (
                    <Link
                      to={item.link}
                      key={index}
                      onClick={item?.logout}
                      className={`text-decoration-none text-black`}
                    >
                      <div className="d-block d-sm-block d-md-block d-lg-flex d-xl-flex justify-content-between py-3 hover mb-3">
                        <span>
                          <span>
                            <FontAwesomeIcon
                              icon={item.icon}
                              className="me-2"
                            />{" "}
                          </span>
                          <span className="d-none d-sm-none d-md-inline-block d-lg-inline-block d-xl-inline-block">
                            {item.name}
                          </span>
                        </span>
                        <FontAwesomeIcon
                          className="d-none d-sm-none d-md-inline-block d-lg-inline-block d-xl-inline-block"
                          icon={faChevronRight}
                        />
                      </div>
                    </Link>
                  ))}
            </div>
          </div>
        </div>
        <div className="col-10 mt-3 ps-3">
            <div className="d-none d-sm-none d-md-none d-lg-flex d-xl-flex justify-content-between p-3 bg-white rounded-3 mb-3 shadow-sm  sticky-top">
              <div>
                {user.roles[0] === "ROLE_MODERATOR" &&
                <Link to="/product/add">
                <button className="btn btn-primary me-2">
                  Đăng sản phẩm
                </button>
              </Link>}
                {path && (
                  <Link to={`/user/update/${user.id}`}>
                    <button className="btn btn-success me-2">
                      Sửa profile
                    </button>
                  </Link>
                )}
                {/* <button
                  className="btn btn-info me-2"
                  onClick={() => setShow(true)}
                >
                  Đổi mật khẩu
                </button> */}
              </div>
              <button onClick={logout} className="btn btn-danger rounded-5">
                Đăng xuất
              </button>
            </div>
            <div className="mb-3 shadow-sm">{children}</div>
        </div>
      </div>
    </div>
  );
}
