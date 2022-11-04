/* eslint-disable jsx-a11y/alt-text */
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBars,
  faHome,
  faUser,
  faBagShopping,
  faBell,
  faArrowRightToBracket,
  faCartShopping,
  faPenToSquare,
  faSearch,
  faEdit,
  faUserPlus,
} from "@fortawesome/free-solid-svg-icons";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import { useEffect, useState } from "react";
import Tippy from "@tippyjs/react/headless";
import "tippy.js/dist/tippy.css"; // optional
export default function Navbars() {
  const isUser = false;
  const menu = {
    menu1: [
      {
        name: "Trang chủ",
        link: "/",
        icon: faHome,
      },
      {
        name: "Sản phẩm",
        link: "/products",
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

  // {
  //     name: "Quản Lý",
  //     icon: faBars,
  //     more: [
  //         {
  //             name: "Bài viết",
  //             link: "/",
  //             icon: faUser

  //         },

  //         {
  //             name: "Đăng tin",
  //             link: "/",
  //             icon: faEdit

  //         },
  //     ]

  // },
  const [offset, setOffset] = useState(0);
  const [bg, setBg] = useState("bg-transparent");

  useEffect(() => {
    const onScroll = () => setOffset(window.pageYOffset);

    // clean up code
    window.removeEventListener("scroll", onScroll);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div>
      <div
        className='bg-nav'
        id="navbar-bg"
      >
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
                  {menu.menu1.map((item, index) => (
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
                  ))}
                </Nav>
                <Nav>
                  {/* {menu.menu2.map((item, index) => (
                                <Nav.Link key={index} href={item.link}>
                                    <FontAwesomeIcon icon={item.icon} />
                                    <span className="ms-2">{item.name}</span>
                                </Nav.Link>
                            ))} */}
                  <div className="nav-profile">
                    <Tippy
                      // interactive

                      placement="bottom-end"
                      render={(attrs) => (
                        <div
                          className="box bg-white text-center p-3 rounded-2"
                          style={{ position: "relative", right: "10%" }}
                          tabIndex="-1"
                          {...attrs}
                        >
                          <div className="nav-profile-detail-item py-2">
                            <i className="fas fa-user-circle"></i>
                            Profileasfasdfagsdfasdfasd
                          </div>
                          <div className="nav-profile-detail-item py-2">
                            <i className="fas fa-cog"></i>
                            Setting
                          </div>
                          <div className="nav-profile-detail-item py-2">
                            <i className="fas fa-comment-dots"></i>
                            Status
                          </div>
                          <div className="nav-profile-detail-item py-2">
                            <i className="fas fa-sign-out-alt"></i>
                            Sign out
                          </div>
                        </div>
                      )}
                    >
                      <div className="d-flex justify-content-center align-items-center">
                        <div className="me-3">
                          <img
                            src="https://upload.wikimedia.org/wikipedia/commons/c/cd/Jujingyi-_C%C3%BAc_T%E1%BB%B7.jpg"
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
                </Nav>
              </Navbar.Collapse>
            </Container>
          </Navbar>
      </div>
    </div>
  );
}
