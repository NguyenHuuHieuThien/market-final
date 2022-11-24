import ImageGallery from "react-image-gallery";
import { Row, Col } from "react-bootstrap";
import { useState} from "react";
import { axiosx as axios } from "../../Helper";

import Navbars from "../../component/Navbars";
import Footer from "../../component/Footer";
import { useParams } from "react-router-dom";
import province from "./../../Province/data.json";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faTruck,
  faPlus,
  faCirclePlus,
  faCircleCheck,
  faCircleMinus,
  faCartPlus,
} from "@fortawesome/free-solid-svg-icons";
import { useEffect } from "react";
// const images = [
//   {
//     original: "https://picsum.photos/id/1018/1000/600/",
//     thumbnail: "https://picsum.photos/id/1018/250/150/",
//   },
//   {
//     original: "https://picsum.photos/id/1015/1000/600/",
//     thumbnail: "https://picsum.photos/id/1015/250/150/",
//   },
//   {
//     original: "https://picsum.photos/id/1019/1000/600/",
//     thumbnail: "https://picsum.photos/id/1019/250/150/",
//   },
//   {
//     original: "https://picsum.photos/id/1019/1000/600/",
//     thumbnail: "https://picsum.photos/id/1019/250/150/",
//   },
// ];
export default function DetailProduct() {
  const [comment, setComment] = useState("");
  const [commentList, setCommentList] = useState([]);
  const [images, setImages] = useState([{original:'',thumbnail:'' }])
  const [products, setProducts] = useState([]);
  let provinces = Object.values(province);
  let [amount, setAmount] = useState(1);
  const [data, setData] = useState({});
  const [image, setImage] = useState()
  const [totalComment, setTotalComment] = useState(0)
  // console.log(commentList)
  let { id } = useParams();
  let user = JSON.parse(localStorage.getItem('token'))
  const submit = (e) => {
    e.preventDefault();
    let formData = new FormData()
    formData.append('commentContent', comment)
    formData.append("file1", image??new File([""], ""));
    axios
      .post(`/comment/insertCommentAndFile?idUser=${user.id}&idProduct=${id}`, formData,{
        headers: {
          "Content-Type": "multipart/form-data",
        }}
        )
      .then(() => {
        console.log('success')
        setTotalComment(totalComment+1)
      })
      .catch((err) => console.log(err));
  };
  const addToCart = () => {
    if(amount > data.amount){
      alert('amount not enough')
      return
    }
    axios
      .post(`/cart/insert?idUser=${user.id}&idProduct=${id}`, {amount:amount})
      .then(() => {
        console.log('success')
        axios.put(`/product/update/${id}`,{...data, amount: data.amount - amount})
        .then(()=>console.log('success'))
        .catch(err=>console.log(err))
      })
      .catch((err) => console.log(err));
  };
  useEffect(() => {
    if (axios) {
      axios
        .get(`/product/selectAll`)
        .then((res) => {
          console.log(res.data);
          setData(res.data.filter((item) => item.idProduct === Number(id))[0]);
          setProducts(res.data);
        })
        .catch((err) => console.log(err));

      axios
        .get(`/comment/selectById/${id}`)
        .then((res) => {
          setCommentList(res.data)
          setTotalComment(res.data.length)
        })
        .catch((err) => console.log(err));
    }
  }, [totalComment]);
  return (
    <div>
      <div className="bg-main">
        <Navbars />
        <div className="container shadow-sm bg-white p-3 mt-3 rounded-3 text-start">
          <Row>
            <Col md={6}>
              <ImageGallery items={images} />
            </Col>
            <Col md={6}>
              <h2 className="mb-4">{data.productName}</h2>
              <h3 className="mb-4">
                Giá:{data && data.price}
              </h3>
              <div className="d-flex mb-5">
                <div className="me-3">
                  <FontAwesomeIcon icon={faTruck} className="me-2" />
                  Vận chuyển tới
                </div>
                <select class="form-select" aria-label="Default select example">
                  <option selected>-- Nơi nhận --</option>
                  {provinces.map((item, index) => (
                    <option key={index} value={index}>
                      {item.name}
                    </option>
                  ))}
                </select>
              </div>
              <div className="mb-4 d-flex">
                <div className="me-5">Số lượng</div>
                <div>
                  <FontAwesomeIcon
                    icon={faCircleMinus}
                    role="button"
                    onClick={() => setAmount(amount - 1)}
                  />
                  <input
                    type="number"
                    value={amount}
                    className="w-25 text-center"
                  />
                  <FontAwesomeIcon
                    icon={faCirclePlus}
                    role="button"
                    onClick={() => setAmount(amount + 1)}
                  />
                </div>
                <div className="form-text">{data&&data.amount > 0?data.amount:0} Số lượng có sẵn</div>
              </div>
              <div className="mt-4">
                <button className="btn btn-primary me-3" onClick={addToCart}>
                  <FontAwesomeIcon icon={faCartPlus} className="me-2" />
                  Thêm vào giỏ hàng
                </button>
                <button className="btn btn-primary">Mua ngay</button>
              </div>
            </Col>
          </Row>
        </div>
        <div className="container d-flex align-items-center bg-white shadow-sm p-3 rounded-3 mt-3 text-start">
          <div className="col-4">
            <div className="d-flex justify-content-start align-items-center border-right border-danger">
              <div className="me-3">
                <img
                  className="rounded-full"
                  src="https://yt3.ggpht.com/XkcR_0_hNSF1QSORprbltUR23RyOSfnCUBYo0BEUwvAZrV2UVuY3ltSa5BukufP4oQEQ5cKN=s900-c-k-c0x00ffffff-no-rj"
                  width="80px"
                />
              </div>
              <div>
                <div>thiennhh</div>
                <div>Người bán</div>
              </div>
            </div>
          </div>
          <div className="col-8">
            <div className="row">
              <div className="col-4 mb-3">
                <div>
                  <span className="me-3">Đánh giá</span>
                  <span className="text-main">45,6k</span>
                </div>
              </div>
              <div className="col-4 mb-3">
                <div>
                  <span className="me-3">Đánh giá</span>
                  <span className="text-main">45,6k</span>
                </div>
              </div>
              <div className="col-4 mb-3">
                <div>
                  <span className="me-3">Đánh giá</span>
                  <span className="text-main">45,6k</span>
                </div>
              </div>
              <div className="col-4 mb-3">
                <div>
                  <span className="me-3">Đánh giá</span>
                  <span className="text-main">45,6k</span>
                </div>
              </div>
              <div className="col-4 mb-3">
                <div>
                  <span className="me-3">Đánh giá</span>
                  <span className="text-main">45,6k</span>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="container bg-white p-3 rounded-3 mt-3 mb-3 text-start">
          <div className="mt-4 ms-3">
            <h2 className="text-start mb-5">Mô tả sản phẩm</h2>
            <div>
              <div className="mb-5">
                <div>{data.productName}</div>
                <div className="mt-3">
                    {data.description && data.description.replace(/-/g, '').replace(/\r/g, '').split('\n').filter(item=> item !== "").map(item=>
                      <div className="mb-3">
                      <FontAwesomeIcon
                        icon={faCircleCheck}
                        className="me-2 text-success"
                      />
                      {item}
                    </div>)}
                </div>
              </div>
              <div>
                <div>
                  <div className="mb-3">
                    <FontAwesomeIcon
                      icon={faCircleCheck}
                      className="me-2 text-success"
                    />
                    Cam kết chất lượng và mẫu mã sản phẩm giống với hình ảnh.
                  </div>
                  <div className="mb-3">
                    <FontAwesomeIcon
                      icon={faCircleCheck}
                      className="me-2 text-success"
                    />
                    Hoàn tiền nếu sản phẩm không giống với mô tả.{" "}
                  </div>
                  <div className="mb-3">
                    <FontAwesomeIcon
                      icon={faCircleCheck}
                      className="me-2 text-success"
                    />
                    Cam kết được đổi trả hàng trong vòng 7 ngày.{" "}
                  </div>
                  <div className="mb-3">
                    <FontAwesomeIcon
                      icon={faCircleCheck}
                      className="me-2 text-success"
                    />
                    Chấp nhận đổi hàng khi size không vừa Giao hàng trên toàn
                    quốc,{" "}
                  </div>
                  <div className="mb-3">
                    <FontAwesomeIcon
                      icon={faCircleCheck}
                      className="me-2 text-success"
                    />
                    Nhận hàng trả tiền Hỗ trợ đổi trả theo quy định của hệ
                    thống.
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="container bg-white p-3 rounded-3 mt-3 mb-3 text-start">
          <div className="mt-4 ms-3">
            <h2>Đánh giá sản phẩm</h2>
            <div className="d-flex">
              <div className="me-3">
                <img
                  className="avt"
                  src="https://danviet.mediacdn.vn/296231569849192448/2021/6/28/huakhai4-1624835323234-1624835323406100909784.jpg"
                />
              </div>
              <form
                className="w-100"
                encType="multipart/form-data"
                onSubmit={(e) => submit(e)}
              >
                <div class="form-floating mb-3">
                  <input
                    class="form-control w-50"
                    id="floatingInput"
                    type="text"
                    // value={comment}
                    onChange={(e) => setComment(e.target.value)}
                    placeholder="name@example.com"
                  />
                  <label for="floatingInput">Nhập đánh giá...</label>
                </div>
                <div class="form-floating mb-3">
                  <input
                    type="file"
                    onChange={e => setImage(e.target.files[0])}
                  />
                </div>
                <div>
                  <button type="submit" className="btn btn-success rounded-1">
                    Bình luận
                  </button>
                </div>
              </form>
            </div>
            {commentList &&
              commentList.length > 0 &&
              commentList.map((item,index) => (
                <div key={index} className="mt-5">
                  <div className="d-flex">
                    <div className="me-3">
                      <img
                        className="avt"
                        src="https://danviet.mediacdn.vn/296231569849192448/2021/6/28/huakhai4-1624835323234-1624835323406100909784.jpg"
                      />
                    </div>
                    <div>
                      <div className="fw-bold">Hua Khai</div>
                      <div className="form-text">
                        2022-10-10 14:28 | Phân loại hàng: {data.category && data.category.categoryName}
                      </div>
                      <div className="w-50">
                        <span>{item.comment}</span>
                      </div>
                      <div className="d-flex">
                        <a
                          role="button"
                          className="form-text me-3 text-decoration-none"
                        >
                          Thích
                        </a>
                        <a
                          role="button"
                          className="form-text text-decoration-none"
                        >
                          Phản hồi
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
          </div>
          <div>
            <h2 className="mt-5">Các sản phẩm khác</h2>
            <div>
              <div>
                <div className="row mt-2 p-2">
                  {products &&
                    products.length > 0 &&
                    products.map((item) => (
                      <div
                        key={item.idProduct}
                        className="col-3 col-sm-3 col-md-4 col-lg-2 col-xl-2 mb-3"
                      >
                        <div className="bg-white border-main">
                          <div className="">
                            <img
                              src="https://cf.shopee.vn/file/8614a7dc701d14d3ca05527edee54a17"
                              width="100%"
                            />
                          </div>
                          <div className="px-3 pb-2 mt-2 text-start">
                            <div style={{ fontSize: "14px" }}>
                              {item.productName}
                            </div>
                            <div className="d-flex justify-content-between">
                              <div className="text-main">{item.price}</div>
                              <div className="form-text">đã bán 968</div>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                </div>
              </div>
            </div>
          </div>
        </div>
        <Footer />
      </div>
    </div>
  );
}
