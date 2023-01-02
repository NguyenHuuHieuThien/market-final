import { useState, useEffect } from "react";
import { axiosx } from "./../../Helper";
import Navbars from "../../component/Navbars";
import Footer from "../../component/Footer";
import Spinner from "../../component/Spinner";
import SlideShow from "../../component/SlideShow";
import { faArrowRight } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "react-router-dom";

import axios from "axios";
export default function HomePage() {
  const [category, setCategory] = useState([]);
  const [product, setProduct] = useState();
  const [productCategory, setProductCategory] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [data, setData] = useState(
    productCategory.length > 0 ? productCategory : []
  );

// useEffect 
  useEffect(() => {
    axios
      .get("http://localhost:8080/category/searchAll")
      .then((res) => {
        console.log(res.data);
        setCategory(res.data);
      })
      .catch((err) => console.log(err));
    axios
      .get("http://localhost:8080/product/selectAll")
      .then((res) => {
        console.log(res.data);
        setProduct(res.data.filter((item) => item.status === "active" && item.amount >0));
        setProductCategory(res.data.filter((item) => item.status === "active" && item.amount >0));
        setIsLoading(false);
      })
      .catch((err) => {
        setIsLoading(false);
        console.log(err)
      });
      
  }, [data]);

  //get all product
  const productAll = () => {
    setIsLoading(true);
    setData(productCategory);
    setIsLoading(false);

  };

  //select category to filter product 
  const selectCategory = (id) => {
    // setIsLoading(true);
    axios
      .get(`http://localhost:8080/category/search/${id}`)
      .then((res) => {
        console.log(res.data);
        setProductCategory(
          product.filter(
            (product) => product.idCategory === res.data.idCategory
          )
        );
        // setIsLoading(false);
      })
      .catch((err) => console.log(err));
  };
  return (
    <div>
      <Navbars position="sticky-top" />
      <div className="container mt-4 bg-white shadow-sm rounded-3 p-4">
        <div>
          <SlideShow />
        </div>
        <div className="mt-5">
          <h2>Danh mục</h2>
          <div>
            <div>
              {/* load category list */}
              {category.length > 0 ?
                <div className="row">
                {category.map((item) => (
                    <div
                      onClick={() => selectCategory(item.idCategory)}
                      key={item.idCategory}
                      className="col-6 col-sm-6 col-md-4 col-lg-2 col-xl-2 text-white mb-3"
                    >
                      <div className="category-color pe-2">
                        <span>{item.categoryName}</span>
                      </div>
                    </div>
                  ))}
                <div
                  onClick={productAll}
                  className="col-6 col-sm-6 col-md-4 col-lg-2 col-xl-2 text-white mb-3"
                >
                  <div className="category-color pe-2">
                    <span>Tất cả sản phẩm</span>
                  </div>
                </div>
              </div>
              :
              <Spinner/>
              }
            </div>
          </div>
        </div>
      </div>

      {/* load new product */}
      <div className="container mt-3  bg-white shadow-sm">
        <h2 className="border-underline py-3 sticky-top  bg-white">
          Sản phẩm mới
        </h2>
        <div>
          <div>
            <div className="row mt-2 p-1">
              {isLoading ? <Spinner/> :
              productCategory && productCategory.length > 0 ? (
                productCategory.map((item, index) => (
                  <div
                  key={index}
                  className="col-6 col-sm-6 col-md-4 col-lg-2 col-xl-2 mb-3"
                >
                  <div className="bg-white border-main">
                    <Link
                      to={`/product/${item.idProduct}`}
                      style={{ textDecoration: "none" }}
                    >
                      <div className="">
                        <img
                          src={item.urlFile[0]}
                          style={{ width: "100%", height: "155px" }}
                        />
                      </div>
                      <div className="px-3 pb-2 mt-2 text-center">
                        <div className="fs-13 limit-text">
                          {item.productName}
                        </div>
                        <div className="text-main fs-13"> {new Intl.NumberFormat("vi-VN", {
                            style: "currency",
                            currency: "VND",
                          }).format(item.price)}</div>
                        <div className="form-text">Còn {item.amount}</div>
                      </div>
                    </Link>
                  </div>
                </div>
                ))
              ) : (
                <div className="col-12">
                <div className="alert alert-primary" role="alert">
                  Không có sản phẩm nào.
                </div>
              </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* load product */}
      <div className="container mt-3 mb-5  bg-white shadow-sm">
        <h2 className="border-underline py-3 sticky-top  bg-white">
          Gợi ý Hôm nay
        </h2>
        <div>
          <div>
            <div className="row mt-2 p-1">
              {product && product.length > 0 ? (
                product.map((item, index) => (
                  <div
                    key={index}
                    className="col-6 col-sm-6 col-md-4 col-lg-2 col-xl-2 mb-3"
                  >
                    <div className="bg-white border-main">
                      <Link
                        to={`/product/${item.idProduct}`}
                        style={{ textDecoration: "none" }}
                      >
                        <div className="">
                          <img
                            src={item.urlFile[0]}
                            style={{ width: "100%", height: "155px" }}
                          />
                        </div>
                        <div className="px-3 pb-2 mt-2 text-center">
                          <div style={{ fontSize: "12px" }}>
                            {item.productName}
                          </div>
                          <div className="text-main fs-13"> {new Intl.NumberFormat("vi-VN", {
                              style: "currency",
                              currency: "VND",
                            }).format(item.price)}</div>
                          <div className="form-text">Còn {item.amount}</div>
                        </div>
                      </Link>
                    </div>
                  </div>
                ))
              ) : (
                <Spinner />
              )}
            </div>
          </div>
        </div>
        <div className="mt-5 pb-5">
          <Link to="/product/list" className="px-5 btn btn-success">
            Xem thêm
            <FontAwesomeIcon icon={faArrowRight} className="ms-2" />
          </Link>
        </div>
      </div>

      {/* system description */}
      <div className="container mt-3 mb-5 text-start">
        <div className="p-3">
          <div className="text-uppercase fw-bold mb-3">
            Chợ cũ - Mua bán đồ cũ giá rẻ, chất lượng
          </div>
          <p className="form-text">
            Chợ cũ - ứng dụng mua sắm đồ cũ trực tuyến thú vị, tin cậy, an toàn
            và miễn phí! chợ cũ là nền tảng giao dịch trực tuyến chất lượng ở Đà
            Nẵng , . Với sự đảm bảo của chợ cũ, bạn sẽ mua hàng trực tuyến an
            tâm và nhanh chóng hơn bao giờ hết!
          </p>
        </div>
        <div className="p-3">
          <div className="text-uppercase fw-bold mb-3">
            Mua sắm và bán hàng online đơn giản, nhanh chóng và an toàn
          </div>
          <p className="form-text">
            Nếu bạn đang tìm kiếm một trang web để mua và bán hàng trực tuyến
            thì chợ cũ là một sự lựa chọn tuyệt vời dành cho bạn. chợ cũ là
            trang thương mại điện tử cho phép người mua và người bán tương tác
            và trao đổi dễ dàng thông tin về sản phẩm và chương trình khuyến mãi
            của shop. Do đó, việc mua bán trên chợ cũ trở nên nhanh chóng và đơn
            giản hơn. Bạn có thể trò chuyện trực tiếp với nhà bán hàng để hỏi
            trực tiếp về mặt hàng cần mua. Còn nếu bạn muốn tìm mua những dòng
            sản phẩm chính hãng, uy tín,chợ cũ Mall chính là sự lựa chọn lí
            tưởng dành cho bạn. Để bạn có thể dễ dàng khi tìm hiểu và sử dụng
            sản phẩm,chợ cũ Blog - trang blog thông tin chính thức của chợ cũ -
            sẽ giúp bạn có thể tìm được cho mình các kiến thức về xu hướng thời
            trang, review công nghệ, mẹo làm đẹp, tin tức tiêu dùng và deal giá
            tốt bất ngờ.
          </p>
          <p className="form-text">
            Đến với chợ cũ, cơ hội để trở thành một nhà bán hàng dễ dàng hơn bao
            giờ hết. Chỉ với vài thao tác trên ứng dụng, bạn đã có thể 
            ngay những sản phẩm của mình. Không những thế, các nhà bán hàng có
            thể tự tạo chương trình khuyến mãi trên chợ cũ để thu hút người mua
            với những sản phẩm có mức giá hấp dẫn. Khi đăng nhập tại chợ cũ Kênh
            người bán, bạn có thể dễ dàng phân loại sản phẩm và cập nhập ngay
            các hoạt động của shop.
          </p>
        </div>
        <div className="p-3">
          <div className="text-uppercase fw-bold mb-3">MUA HÀNG VỚI CHỢ CŨ</div>
          <div>
            <p className="form-text">
              Mua hàng trên chợ cũ luôn là một trải nghiệm ấn tượng. Là một kênh
              bán hàng uy tín, chợ cũ luôn cam kết mang lại cho khách hàng những
              trải nghiệm mua sắm online giá rẻ, an toàn và tin cậy. Mọi thông
              tin về người bán và người mua đều được bảo mật tuyệt đối. Các hoạt
              động giao dịch thanh toán tại chợ cũ luôn được đảm bảo diễn ra
              nhanh chóng, an toàn.
            </p>
            <p className="form-text">
              Chợ cũ bảo vệ người mua và người bán bằng cách giữ số tiền giao
              dịch đến khi người mua xác nhận đồng ý với đơn hàng và không có
              yêu cầu khiếu nại, trả hàng hay hoàn tiền nào. Thanh toán sau đó
              sẽ được chuyển đến cho người bán. Đến với chợ cũ ngay hôm nay để
              mua hàng online giá rẻ và trải nghiệm dịch vụ chăm sóc khách hàng
              tuyệt vời tại đây. Đặc biệt khi mua sắm trên chợ cũ, bạn sẽ được
              miễn phí vận chuyển, giao hàng tận nơi và 7 ngày miễn phí trả
              hàng.
            </p>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
