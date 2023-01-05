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
  faCheck,
  faClock,
  faBars,
  faUsers,
} from "@fortawesome/free-solid-svg-icons";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import Tippy from "@tippyjs/react/headless";
import "tippy.js/dist/tippy.css"; // optional
import logo from "../../assets/images/logo.png";
import { axiosx as axios } from "../../Helper";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
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
      name: "Đơn hàng đang chờ xác nhận",
      icon: faClock,
      link: "/user/await",
    },
    {
      name: "Sản phẩm đã mua",
      icon: faClipboardList,
      link: "/user/profile",
    },
    {
      name: "Đăng xuất",
      icon: faRightFromBracket,
      logout: function () {
        localStorage.clear();
        setTimeout(() => {
          window.location.href = "/";
        }, 1000);
      },
    },
  ];

  const sellerMenu = [
    {
      name: "Trang cá nhân",
      icon: faUser,
      link: "/user/profile",
    },
    {
      name: "Đăng sản phẩm",
      icon: faPenToSquare,
      link: "/product/add",
    },
    {
      name: "Quản lý đơn hàng",
      icon: faCheck,
      link: "/sell/manager",
    },
    {
      name: "Sản phẩm đã đăng bán",
      icon: faClipboardList,
      link: "/sell/list",
    },
    {
      name: "Đăng xuất",
      icon: faRightFromBracket,
      logout: function () {
        localStorage.clear();
        setTimeout(() => {
          window.location.href = "/";
        }, 1000);
      },
    },
  ];

  const adminMenu = [
    {
      name: "Đi tới Admin",
      icon: faBars,
      link: "/admin/users",
    },
    {
      name: "Trang cá nhân",
      icon: faUser,
      link: "/user/profile",
    },
    {
      name: "Quản lý sản phẩm",
      icon: faCheck,
      link: "/admin/products",
    },
    {
      name: "Quản lý tài khoản",
      icon: faUsers,
      link: "/admin/users",
    },
    {
      name: "Đăng xuất",
      icon: faRightFromBracket,
      logout: function () {
        localStorage.clear();
        setTimeout(() => {
          window.location.href = "/";
        }, 1000);
      },
    },
  ]


  const [data, setData] = useState([]);
  const [notireaded, setNotiReaded] = useState([]);
  const [notinumber, setNotiNumber] = useState(0);
  const [visibleNoti, setVisibleNoti] = useState(false);
  const [visibleUser, setVisibleUser] = useState(false);
  const showNoti = () => setVisibleNoti(true);
  const hideNoti = () => setVisibleNoti(false);
  const showUser = () => setVisibleUser(true);
  const hideUser = () => setVisibleUser(false);
  const [bg, setBg] = useState("bg-spotlight");
  let navigate = useNavigate();
  let user = JSON.parse(localStorage.getItem("token"));
  let userInfo = JSON.parse(localStorage.getItem("userInfo"));

  let avatar;
  if(userInfo){
    avatar = userInfo.urlImageSet[0]
  }else if(user){
    console.log(user)
    avatar = user.fileList[0].fileDownloadUri
  }

  let menuUser = [];
  if(user && user.roles[0] === "ROLE_MODERATOR"){
    menuUser = sellerMenu;
  }else if(user && user.roles[0] === "ROLE_USER"){
    menuUser = userMenu;
  }else{
    menuUser = adminMenu;
  }
  // useEffect
  useEffect(() => {
    if (axios) {
      axios
        .get(`/notification/findByIdUser/${user.id}`)
        .then((res) => {
          console.log(res.data)
          setNotiReaded(
            res.data.filter((item) => item.status === "1").map((e) => e.id)
          );
          setNotiNumber(res.data.filter((item) => item.status === "1").length);
          setData(res.data.reverse());
        })
        .catch((err) => console.log(err));
    }
  }, []);
  console.log(notinumber);

  // readNoti
  const readNoti = (id) => {
    let noti = data.filter(item => item.id === id)[0]
    console.log(noti)
    let notiComment;
    if(noti.type && noti.type.includes('comment')){
      notiComment =noti.type.split('-')[1]
    }
    axios
      .put(`/notification/updateStatus/${id}`)
      .then((res) => {
        console.log(res.data)
        setNotiReaded(notireaded.filter(item => item !== id))
        setNotiNumber(notireaded.filter(item => item !== id).length)
          switch (noti.type) {
            case 'bill':
              navigate("/sell/manager");
              break;
            case `comment-${notiComment}`:
              navigate(`/product/${notiComment}`);
              break;
            default:
              navigate("/user/profile");
              break;
          }
        }
      )
      .catch((err) => console.log(err));
  };
  return (
    <div>
      <div className="bg-nav" id="navbar-bg">
        <Navbar collapseOnSelect expand="lg" variant="dark">
          <Container>
            <Link to="/" className="d-flex justify-content-start">
              <img
                className="navbar-brand text-start w-75"
                src="https://static.chotot.com/storage/marketplace/transparent_logo.png"
              />
            </Link>
            <Navbar.Toggle aria-controls="responsive-navbar-nav" />
            <Navbar.Collapse id="responsive-navbar-nav" className="text-start">

              {/* menu */}
              <Nav className="me-auto ms-3">
                {menu.menu1.map((item, index) =>
                  item.name === "Thông báo" ? (
                    <div
                      className="mt-3 mt-sm-3 mt-md-3 mt-lg-0 mt-xl-0"
                      key={index}
                      onClick={visibleNoti ? hideNoti : showNoti}
                      role='button'
                    >
                      <Tippy
                        key={index}
                        visible={visibleNoti} 
                        onClickOutside={hideNoti}
                        interactive
                        placement="bottom"
                        render={(attrs) => (
                          <div
                            className="box bg-white py-2 sticky-top shadow-sm rounded-2"
                            style={{
                              width: "350px",
                              height: "300px",
                              overflow: "scroll",
                            }}
                            tabIndex="-1"
                            {...attrs}
                          >
                            <ul
                              className="px-2 text-start"
                              style={{ listStyle: "none" }}
                            >
                              {data.length > 0 ? (
                                data.map((item, index) => (
                                  <li
                                    onClick={() =>
                                      readNoti(item.id)
                                    }
                                    key={index}
                                    role="button"
                                    className={`mb-2 ${
                                      notireaded.includes(item.id)
                                        ? "bg-spotlight"
                                        : "bg-transparent"
                                    } hover p-3 py-1`}
                                  >
                                    <span>{item.message}</span>
                                  </li>
                                ))
                              ) : (
                                <li
                                  role="button"
                                  className="mb-2 hover px-3 py-1"
                                >
                                  <span>Không có thông báo nào</span>
                                </li>
                              )}
                            </ul>
                          </div>
                        )}
                      >
                        <div className="me-2 position-relative">
                          <FontAwesomeIcon
                            icon={item.icon}
                            className="text-white me-1 position-relative"
                          />
                          <span className="text-white">{item.name}</span>
                          <span class="position-absolute top-0 start-0 translate-middle badge badge-sm rounded-pill bg-danger">
                            {notinumber > 0 ? notinumber : ""}
                          </span>
                        </div>
                      </Tippy>
                    </div>
                  ) : (
                    <Link
                      key={index}
                      to={item.link}
                      style={{
                        textDecoration: "none",
                        color: "white",
                        marginRight: "10px",
                      }}
                      className="mt-3 mt-sm-3 mt-md-3 mt-lg-0 mt-xl-0"
                    >
                      <FontAwesomeIcon icon={item.icon} />
                      <span className="ms-2">{item.name}</span>
                    </Link>
                  )
                )}
              </Nav>

              {/* user menu */}
              <Nav>
                {user ? (
                  <div className="nav-profile" role='button' onClick={visibleUser ? hideUser : showUser} >
                    <Tippy
                      interactive
                      onClickOutside={hideUser}
                      visible={visibleUser}
                      placement="bottom-end"
                      render={(attrs) => (
                        <div
                          className="box bg-white  shadow-sm text-center p-3 rounded-2"
                          style={{ position: "relative", right: "10%" }}
                          tabIndex="-1"
                          {...attrs}
                        >
                          <div className="p-3  px-5 rounded-2 shadow-sm">
                            <Link to="/user/profile" className="text-decoration-none text-black">
                            <div className="d-flex">
                              <div className="me-2">
                                <img
                                  src={
                                    avatar}
                                  width="25px"
                                  height="25px"
                                  className="rounded-pill"
                                />
                              </div>
                              <div>
                                <span className="fw-bold">{user.username}</span>
                              </div>
                            </div>
                              <div>Xem trang cá nhân</div>
                              </Link>
                          </div>
                          {
                            menuUser.map(item =>
                              <Link
                              to={item.link}
                              style={{ textDecoration: "none" }}
                              onClick={item?.logout}
                            >
                              <div className="nav-profile-detail-item text-black py-2 text-start">
                                <FontAwesomeIcon
                                  icon={item.icon}
                                  className="me-4"
                                />
                                {item.name}
                              </div>
                            </Link> )
                          }
                        </div>
                      )}
                    >
                      <div className="d-flex ms-3 mt-3 mt-sm-3 mt-md-3 mt-lg-0 mt-xl-0 justify-content-sm-start justify-content-md-start justify-content-lg-center justify-content-xl-center align-items-center">
                        <div className="me-3">
                          <img
                            src={avatar}
                            width="50px"
                            height="50px"
                            className="rounded-pill"
                          />
                        </div>
                      </div>
                    </Tippy>
                  </div>
                ) : (
                  menu.menu2.map((item, index) => (
                    <Link
                      key={index}
                      style={{ textDecoration: "none" }}
                      className="text-white me-3"
                      to={item.link}
                    >
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
