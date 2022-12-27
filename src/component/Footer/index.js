import React from "react";
import {
  MDBFooter,
  MDBContainer,
  MDBRow,
  MDBCol,
  MDBIcon,
} from "mdb-react-ui-kit";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faFacebook,
  faTelegram,
  faTwitter,
  faYoutube,
} from "@fortawesome/free-brands-svg-icons";
import { Link } from "react-router-dom";

const footerList1 = [
  { name: "Trang chủ", link: "/" },
  { name: "Sản phẩm", link: "/product/list" },
  { name: "Giỏ hàng", link: "/carts" },
];
const footerList2 = [
  { name: "Đăng sản phẩm", link: "/product/add" },
  { name: "Liên hệ", link: "/" },
  { name: "Tài khoản", link: "/user/profile" },
];
export default function Footer() {
  return (
    <div id="footer" className="mt-5 bg-footer">
      <div className="container">
        <div className="row pt-5 pb-5 border-bottom border-primary">
          <div className="col-12 col-sm-12 col-md-12 col-lg-6 col-xl-6 pb-5 text-center text-sm-center text-md-center text-lg-start text-xl-start">
            <div className="mb-4 d-flex d-sm-flex d-md-flex d-lg-block d-xl-block justify-content-center">
              <img
                src="https://static.chotot.com/storage/marketplace/transparent_logo.png"
                alt=""
              />
            </div>
            <div className="">
              <span className="text-white form-text fst-italic  text-center w-100">
                "Nơi cung cấp các mặt hàng được sử dụng phổ biến trong cuộc sống
                của sinh viên"
              </span>
            </div>
          </div>
          <div className="col-12 col-sm-12 col-md-12 col-lg-6 col-xl-6 pb-5">
            <div className="row">
              <div className="col-lg-6 col-xl-6">
                <div className="d-none d-sm-none d-md-none d-lg-flex d-xl-flex text-uppercase fw-bold">
                  <div className="me-5">
                    {footerList1.map((item, index) => (
                      <div className="mb-4" key={index}>
                        <Link to={item.link} style={{ textDecoration: "none" }}>
                          <span className="text-white text-hover">
                            {item.name}
                          </span>
                        </Link>
                      </div>
                    ))}
                  </div>
                  <div>
                    {footerList2.map((item, index) => (
                      <div key={index} className="mb-4">
                        <Link to={item.link} style={{ textDecoration: "none" }}>
                          <span className="text-white text-hover">
                            {item.name}
                          </span>
                        </Link>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
              <div className="col-12 text-center col-sm-12 text-sm-center col-md-12 text-md-center col-lg-6 text-lg-start col-xl-6 text-xl-start text-white">
                <div className="mb-4">
                  <i className="fa-solid fa-phone me-3"></i>
                  <a
                    href="tel:+941549525"
                    className="text-decoration-none text-white"
                  >
                    +(84)0941549525
                  </a>
                </div>
                <div className="mb-4">
                  <i className="fa-solid fa-envelope me-3"></i>
                  <a
                    href="mailto:oldmarket2022@gmail.com"
                    className="text-decoration-none text-white"
                  >
                    oldmarket2022@gmail.com
                  </a>
                </div>
                <div>
                  <i className="fa-solid fa-location-dot me-3"></i>
                  <a
                    className="text-decoration-none text-white"
                    href="https://www.facebook.com/hieuthien1770/"
                  >
                    Fanpage
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="d-block d-sm-block d-md-block d-lg-flex d-xl-flex justify-content-between text-white text-center py-5">
          <div className="d-block d-sm-block d-md-block d-lg-flex d-xl-flex">
            <div className="mb-3">
              <span className="me-3 form-text">
                @2022 Old Market. Đã đăng ký bản quyền
              </span>
            </div>
            <div className="mb-3">
              <a href="" className="text-decoration-none">
                <span className="me-3 form-text text-hover"></span>Dịch vụ
              </a>
            </div>
            <div className="mb-3">
              <a href="" className="text-decoration-none">
                <span className="me-3 form-text text-hover"></span>Bảo mật
              </a>
            </div>
          </div>
          <div className="d-flex justify-content-center">
            <div>
              <a
                href="https://www.facebook.com/antysoftware"
                className="text-white"
              >
                <span className="me-3">
                  <FontAwesomeIcon icon={faFacebook} />
                </span>
              </a>
            </div>
            <div>
              <a href="https://twitter.com/antyapp" className="text-white">
                <span className="me-3">
                  <FontAwesomeIcon icon={faTwitter} />
                </span>
              </a>
            </div>
            <div>
              <a href="https://t.me/antyapp" className="text-white">
                <span className="me-3">
                  <FontAwesomeIcon icon={faTelegram} />
                </span>
              </a>
            </div>
            <div>
              <a href="#" className="text-white">
                <span className="me-3">
                  <FontAwesomeIcon icon={faYoutube} />
                </span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
