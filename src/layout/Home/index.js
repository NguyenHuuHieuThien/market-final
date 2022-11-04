import Navbars from "../../component/Navbars"
import Footer from "../../component/Footer"
import Products from "../../component/Product"
import SlideShow from "../../component/SlideShow"
import { faArrowRight } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
export default function HomePage() {
    return (
        <div className="bg-main">
            <Navbars position='sticky-top' />
            {/* <div className="bg-main ">
                <div className="container ">
                    <div className="mt-5 pt-5">
                        <h1 className="text-white animate__animated animate__bounceInDown">Chợ tốt Online</h1>
                    </div>
                    <div className="d-flex justify-content-center mt-5">
                        <div className="d-flex p-1 border border-white w-75">
                            <div className="border w-75">
                                <input type="text" className="w-100 h-100 border-0 outline-none p-2 z-index" />
                            </div>
                            <button onClick={() => console.log(123)} className="btn btn-warning w-25">Tìm kiếm</button>
                        </div>
                    </div>
                    <div className="d-flex justify-content-between mt-5">
                        <div className="col-4 mt-5">
                            <div className="animate__animated animate__fadeInLeft w-100">
                                <img src="https://subiz.com.vn/blog/wp-content/uploads/2015/12/Card-DanangShip-01-e1450144113271.png" />
                            </div>
                            <div className="text-white">
                                <div>Tiết kiệm thời gian</div>
                                <div>Mua sắm mọi nơi, mọi lúc</div>
                            </div>
                        </div>
                        <div className="col-4 mt-5">
                            <div className="animate__animated animate__fadeInUp text-center w-50">
                                <img src="https://cdn-icons-png.flaticon.com/512/602/602251.png" width='100%' />
                            </div>
                            <div className="text-white">
                                <div>Giao hàng tận nhà</div>
                                <div>Nhận được hàng từ 3-5 ngày</div>
                            </div>
                        </div>
                        <div className="col-4 mt-5">
                            <div className="animate__animated animate__fadeInRight w-50 d-flex justify-content-end">
                                <img className="" src="https://tamlytrilieunhc.com/wp-content/uploads/2021/07/thanh-toan-khi-nhan-hang.png" width='100%' />
                            </div>
                            <div className="text-white">
                                <div>Thanh toán khi nhận hàng</div>
                                <div>Kiểm tra hàng trước khi thanh toán</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div> */}
            <div className="container mt-4 bg-white shadow-sm rounded-3 p-4">
            <SlideShow />
                <div className="mt-5">
                    <h2>Danh mục</h2>
                    <div>
                        <div className="row">
                            <div className="col border border-primary m-2">
                                <div>
                                    <div>
                                        <img src="https://cf.shopee.vn/file/687f3967b7c2fe6a134a2c11894eea4b_tn" width='150px' />
                                    </div>
                                    <span>Thời trang nam</span>
                                </div>
                            </div>
                            <div className="col border border-primary m-2">
                                <div>
                                    <div>
                                        <img src="https://cf.shopee.vn/file/687f3967b7c2fe6a134a2c11894eea4b_tn" width='150px' />
                                    </div>
                                    <span>Thời trang nam</span>
                                </div>
                            </div>
                            <div className="col border border-primary m-2">
                                <div>
                                    <div>
                                        <img src="https://cf.shopee.vn/file/687f3967b7c2fe6a134a2c11894eea4b_tn" width='150px' />
                                    </div>
                                    <span>Thời trang nam</span>
                                </div>
                            </div>
                            <div className="col border border-primary m-2">
                                <div>
                                    <div>
                                        <img src="https://cf.shopee.vn/file/687f3967b7c2fe6a134a2c11894eea4b_tn" width='150px' />
                                    </div>
                                    <span>Thời trang nam</span>
                                </div>
                            </div>
                            <div className="col border border-primary m-2">
                                <div>
                                    <div>
                                        <img src="https://cf.shopee.vn/file/687f3967b7c2fe6a134a2c11894eea4b_tn" width='150px' />
                                    </div>
                                    <span>Thời trang nam</span>
                                </div>
                            </div>
                            <div className="col border border-primary m-2">
                                <div>
                                    <img src="https://cf.shopee.vn/file/687f3967b7c2fe6a134a2c11894eea4b_tn" width='150px' />
                                </div>
                                <span>Thời trang nam</span>
                            </div>
                            <div className="col border border-primary m-2">
                                <div>
                                    <div>
                                        <img src="https://cf.shopee.vn/file/687f3967b7c2fe6a134a2c11894eea4b_tn" width='150px' />
                                    </div>
                                    <span>Thời trang nam</span>
                                </div>
                            </div>
                            <div className="col border border-primary m-2">
                                <div>
                                    <div>
                                        <img src="https://cf.shopee.vn/file/687f3967b7c2fe6a134a2c11894eea4b_tn" width='150px' />
                                    </div>
                                    <span>Thời trang nam</span>
                                </div>
                            </div>
                            <div className="col border border-primary m-2">
                                <div>
                                    <div>
                                        <img src="https://cf.shopee.vn/file/687f3967b7c2fe6a134a2c11894eea4b_tn" width='150px' />
                                    </div>
                                    <span>Thời trang nam</span>
                                </div>
                            </div>
                            <div className="col border border-primary m-2">
                                <div>
                                    <div>
                                        <img src="https://cf.shopee.vn/file/687f3967b7c2fe6a134a2c11894eea4b_tn" width='150px' />
                                    </div>
                                    <span>Thời trang nam</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="container mt-3 mb-5  bg-white shadow-sm">
                <h2 className="border-underline py-3 sticky-top  bg-white">Gợi ý Hôm nay</h2>
                <div>
                    <div>
                        <div className="row mt-2 p-2">
                            <div className="col-3 col-sm-3 col-md-4 col-lg-2 col-xl-2 mb-3">
                                <div className="bg-white border-main">
                                    <div className="">
                                        <img src="https://cf.shopee.vn/file/8614a7dc701d14d3ca05527edee54a17" width="100%" />
                                    </div>
                                    <div className="px-3 pb-2 mt-2 text-start">
                                        <div style={{ fontSize: '14px' }}>áo khoác thể thao 3 sọc chất thun nỉ dày dặn</div>
                                        <div className="d-flex justify-content-between">
                                            <div className="text-main">45.000</div>
                                            <div className="form-text">đã bán 968</div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="col-3 col-sm-3 col-md-4 col-lg-2 col-xl-2 mb-3">
                                <div className="bg-white border-main">
                                    <div className="">
                                        <img src="https://cf.shopee.vn/file/8614a7dc701d14d3ca05527edee54a17" width="100%" />
                                    </div>
                                    <div className="px-3 pb-2 mt-2 text-start">
                                        <div style={{ fontSize: '14px' }}>áo khoác thể thao 3 sọc chất thun nỉ dày dặn</div>
                                        <div className="d-flex justify-content-between">
                                            <div className="text-main">45.000</div>
                                            <div className="form-text">đã bán 968</div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="col-3 col-sm-3 col-md-4 col-lg-2 col-xl-2 mb-3">
                                <div className="bg-white border-main">
                                    <div className="">
                                        <img src="https://cf.shopee.vn/file/8614a7dc701d14d3ca05527edee54a17" width="100%" />
                                    </div>
                                    <div className="px-3 pb-2 mt-2 text-start">
                                        <div style={{ fontSize: '14px' }}>áo khoác thể thao 3 sọc chất thun nỉ dày dặn</div>
                                        <div className="d-flex justify-content-between">
                                            <div className="text-main">45.000</div>
                                            <div className="form-text">đã bán 968</div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="col-3 col-sm-3 col-md-4 col-lg-2 col-xl-2 mb-3">
                                <div className="bg-white border-main">
                                    <div className="">
                                        <img src="https://cf.shopee.vn/file/8614a7dc701d14d3ca05527edee54a17" width="100%" />
                                    </div>
                                    <div className="px-3 pb-2 mt-2 text-start">
                                        <div style={{ fontSize: '14px' }}>áo khoác thể thao 3 sọc chất thun nỉ dày dặn</div>
                                        <div className="d-flex justify-content-between">
                                            <div className="text-main">45.000</div>
                                            <div className="form-text">đã bán 968</div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="col-3 col-sm-3 col-md-4 col-lg-2 col-xl-2 mb-3">
                                <div className="bg-white border-main">
                                    <div className="">
                                        <img src="https://cf.shopee.vn/file/8614a7dc701d14d3ca05527edee54a17" width="100%" />
                                    </div>
                                    <div className="px-3 pb-2 mt-2 text-start">
                                        <div style={{ fontSize: '14px' }}>áo khoác thể thao 3 sọc chất thun nỉ dày dặn</div>
                                        <div className="d-flex justify-content-between">
                                            <div className="text-main">45.000</div>
                                            <div className="form-text">đã bán 968</div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="col-3 col-sm-3 col-md-4 col-lg-2 col-xl-2 mb-3">
                                <div className="bg-white border-main">
                                    <div className="">
                                        <img src="https://cf.shopee.vn/file/8614a7dc701d14d3ca05527edee54a17" width="100%" />
                                    </div>
                                    <div className="px-3 pb-2 mt-2 text-start">
                                        <div style={{ fontSize: '14px' }}>áo khoác thể thao 3 sọc chất thun nỉ dày dặn</div>
                                        <div className="d-flex justify-content-between">
                                            <div className="text-main">45.000</div>
                                            <div className="form-text">đã bán 968</div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="col-3 col-sm-3 col-md-4 col-lg-2 col-xl-2 mb-3">
                                <div className="bg-white border-main">
                                    <div className="">
                                        <img src="https://cf.shopee.vn/file/8614a7dc701d14d3ca05527edee54a17" width="100%" />
                                    </div>
                                    <div className="px-3 pb-2 mt-2 text-start">
                                        <div style={{ fontSize: '14px' }}>áo khoác thể thao 3 sọc chất thun nỉ dày dặn</div>
                                        <div className="d-flex justify-content-between">
                                            <div className="text-main">45.000</div>
                                            <div className="form-text">đã bán 968</div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="mt-5 pb-5">
                    <button className="px-5 btn btn-success">
                        Xem thêm
                        <FontAwesomeIcon icon={faArrowRight} className="ms-2"/>
                    </button>
                </div>
            </div>

            <Footer />
        </div >
    )
}