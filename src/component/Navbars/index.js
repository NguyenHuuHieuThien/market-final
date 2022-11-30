/* eslint-disable jsx-a11y/alt-text */

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHome,
  faUser,
  faBagShopping,
  faBell,
  faArrowRightToBracket,
  faCartShopping,
  faPenToSquare,
  faUserPlus,
  faClipboardList,
  faRightFromBracket,
  faCheck
} from "@fortawesome/free-solid-svg-icons";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import Tippy from "@tippyjs/react/headless";
import "tippy.js/dist/tippy.css"; // optional
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
export default function Navbars() {
  const menu = {
    menu1: [
      {
        name: "Trang chủ",
        link: "/",
        icon: faHome,
      },
      {
        name: "Sản phẩm",
        link: "/product/list",
        icon: faBagShopping,
      },
      {
        name: "Thông báo",
        link: "/",
        icon: faBell,
      },
      {
        name: "Giỏ hàng",
        link: "/carts",
        icon: faCartShopping,
      },
    ],
    menu2: [
      {
        name: "Đăng nhập",
        link: "/sign-in",
        icon: faArrowRightToBracket,
      },
      {
        name: "Đăng ký",
        link: "/sign-up",
        icon: faUserPlus,
      },
    ],
  };
  const userMenu = [
    {
      name: "Trang cá nhân",
      icon: faUser,
      link: "/user/profile",
    },
    {
      name: "Đăng bài",
      icon: faPenToSquare,
      link: "/product/add",
    },
    {
      name: "Phê duyệt đơn hàng",
      icon: faCheck,
      link: "/sell/manager",
    },
    {
      name: "Bài viết đã đăng",
      icon: faClipboardList,
      link: "/user/poster",
    },
    {
      name: "Đăng xuất",
      icon: faRightFromBracket,
      logout: function () {
        localStorage.clear();
        setTimeout(() => {
          window.location.href = "/"
        }, 1000);
      },
    },
  ];
  let user = JSON.parse(localStorage.getItem('token'))

  return (
    <div>
      <div className="bg-nav" id="navbar-bg">
        <Navbar collapseOnSelect expand="lg" variant="dark">
          <Container>
            <Link to="/">
              <img
                className="w-75 navbar-brand"
                src="https://static.chotot.com/storage/marketplace/transparent_logo.png"
              />
            </Link>
            <Navbar.Toggle aria-controls="responsive-navbar-nav" />
            <Navbar.Collapse id="responsive-navbar-nav">
              <Nav className="me-auto">
                {menu.menu1.map((item, index) =>
                  item.name === "Thông báo" ? (
                    <Tippy
                    key={index}
                      interactive
                      placement="bottom"  
                      render={(attrs) => (
                        <div
                          className="box bg-white py-2 sticky-top shadow-sm rounded-2"
                          style={{ width: "350px" }}
                          tabIndex="-1"
                          {...attrs}
                        >
                          <ul className="p-0 text-start">
                            <li role="button" className="mb-2 hover px-3 py-1">
                              <div className="d-flex align-items-center justify-content-between">
                                <div className="me-2">
                                  <img
                                    src="https://yt3.ggpht.com/ytc/AMLnZu9iJXDiUSZ9az5rgL2JOIGSfRpZmjHSGQia6Ks5hA=s900-c-k-c0x00ffffff-no-rj"
                                    width="60px"
                                    height="60px"
                                    className="rounded-5"
                                  />
                                </div>
                                <div>
                                  <span
                                    className="fw-bold me-1"
                                    style={{ fontSize: "14px" }}
                                  >
                                    Hiếu Thiên
                                  </span>
                                  <span style={{ fontSize: "14px" }}>
                                    Đã bình luận về bài viết của bạn trên hệ
                                    thống
                                  </span>
                                </div>
                              </div>
                            </li>
                            <li role="button" className="mb-2 hover px-3 py-1">
                              <div className="d-flex align-items-center justify-content-between">
                                <div className="me-2">
                                  <img
                                    src="https://yt3.ggpht.com/ytc/AMLnZu9iJXDiUSZ9az5rgL2JOIGSfRpZmjHSGQia6Ks5hA=s900-c-k-c0x00ffffff-no-rj"
                                    width="60px"
                                    height="60px"
                                    className="rounded-5"
                                  />
                                </div>
                                <div>
                                  <span
                                    className="fw-bold me-1"
                                    style={{ fontSize: "14px" }}
                                  >
                                    Hiếu Thiên
                                  </span>
                                  <span style={{ fontSize: "14px" }}>
                                    Đã bình luận về bài viết của bạn trên hệ
                                    thống
                                  </span>
                                </div>
                              </div>
                            </li>
                            <li role="button" className="hover px-3 py-1">
                              <div className="d-flex align-items-center justify-content-between">
                                <div className="me-2">
                                  <img
                                    src="https://yt3.ggpht.com/ytc/AMLnZu9iJXDiUSZ9az5rgL2JOIGSfRpZmjHSGQia6Ks5hA=s900-c-k-c0x00ffffff-no-rj"
                                    width="60px"
                                    height="60px"
                                    className="rounded-5"
                                  />
                                </div>
                                <div>
                                  <span
                                    className="fw-bold me-1"
                                    style={{ fontSize: "14px" }}
                                  >
                                    Hiếu Thiên
                                  </span>
                                  <span style={{ fontSize: "14px" }}>
                                    Đã bình luận về bài viết của bạn trên hệ
                                    thống
                                  </span>
                                </div>
                              </div>
                            </li>
                          </ul>
                        </div>
                      )}
                    >
                      <div className="me-2">
                        <FontAwesomeIcon
                          icon={item.icon}
                          className="text-white"
                        />
                        <span className="text-white ms-2">{item.name}</span>
                      </div>
                    </Tippy>
                  ) : (
                    <Link
                      key={index}
                      to={item.link}
                      style={{
                        textDecoration: "none",
                        color: "white",
                        marginRight: "10px",
                      }}
                    >
                      <FontAwesomeIcon icon={item.icon} />
                      <span className="ms-2">{item.name}</span>
                    </Link>
                  )
                )}
              </Nav>
              <Nav>
                {user ? (
                  <div className="nav-profile">
                    <Tippy
                      interactive
                      placement="bottom-end"
                      render={(attrs) => (
                        <div
                          className="box bg-white text-center p-3 rounded-2"
                          style={{ position: "relative", right: "10%" }}
                          tabIndex="-1"
                          {...attrs}
                        >

                            {user.roles[0]==="ROLE_ADMIN"&& 
                            <Link to="/admin/users"
                            style={{ textDecoration: "none" }}
                          >
                            <div className="nav-profile-detail-item text-black py-2 text-start">
                              <FontAwesomeIcon
                                icon={faHome}
                                className="me-4"
                              />
                              Đi tới Admin
                            </div>
                          </Link>}
                          {userMenu.map((item, index)=>
                            <Link                            
                              to={item.link}
                              onClick={item?.logout}
                              style={{ textDecoration: "none"}}
                              key={index}
                            >
                              <div className="nav-profile-detail-item py-2 text-black text-start">
                                <FontAwesomeIcon
                                  icon={item.icon}
                                  className="me-4"
                                />
                                {item.name}
                              </div>
                            </Link>)}                                          
                        </div>
                      )}
                    >
                      <div className="d-flex justify-content-center align-items-center">
                        <div className="me-3">
                          <img
                            src={user.fileList[0].fileDownloadUri}
                            width="50px"
                            height="50px"
                            className="rounded-pill"
                          />
                        </div>
                        {/* <div>
                        <span>Hiếu Thiên</span>
                      </div> */}
                      </div>
                    </Tippy>
                  </div>
                ) : (
                  menu.menu2.map((item, index) => (
                    <Link key={index} style={{ textDecoration: "none"}} className="text-white me-3" to={item.link}>
                      <FontAwesomeIcon icon={item.icon} />
                      <span className="ms-2">{item.name}</span>
                    </Link>
                  ))
                )}
              </Nav>
            </Navbar.Collapse>
          </Container>
        </Navbar>
      </div>
    </div>
  );
}
