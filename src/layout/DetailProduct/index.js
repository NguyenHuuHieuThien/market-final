import ImageGallery from "../../component/ImageGalery";
import { Row, Col } from "react-bootstrap";
import { useState, useRef } from "react";
import { axiosx } from "../../Helper";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

import Navbars from "../../component/Navbars";
import Footer from "../../component/Footer";
import { useParams } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useSnackbar } from "notistack";
import ModalReact from "../../component/Modal";
import {
  faCirclePlus,
  faCircleCheck,
  faCircleMinus,
  faCartPlus,
} from "@fortawesome/free-solid-svg-icons";
import { useEffect } from "react";
import Spinner from "../../component/Spinner";
export default function DetailProduct() {
  const navigate = useNavigate();
  const inputRef = useRef(null);
  const { enqueueSnackbar } = useSnackbar();
  const [comment, setComment] = useState("");
  const [commentList, setCommentList] = useState([]);
  const [products, setProducts] = useState([]);
  const [amount, setAmount] = useState(1);
  const [data, setData] = useState();
  const [image, setImage] = useState([]);
  const [totalComment, setTotalComment] = useState(0);
  const [show, setShow] = useState(false);
  const [imgComment, setImgComment] = useState([]);
  const [sellerInfo, setSellerInfo] = useState();
  const [commentEdit, setCommentEdit] = useState();
  const [isEdit, setIsEdit] = useState(false);
  const [idComment, setIdComment] = useState()
  let { id } = useParams();
  const handleClose = () => setShow(false);
  const handleShow = () => {
    setShow(true);
  };
  console.log(data);
  let user = JSON.parse(localStorage.getItem("token"));
  let userInfo = JSON.parse(localStorage.getItem("userInfo"));
  const handleChangeImage = (e) => {
    setImage([...e.target.files]);
    const selectedFiles = e.target.files;
    const selectedFilesArr = Array.from(selectedFiles);
    const imagesArr = selectedFilesArr.map((item) => URL.createObjectURL(item));
    console.log(imagesArr);
    setImgComment(imagesArr);
  };
  const handleDeleteImage = (item, idex) => {
    setImage(image.filter((image, index) => index !== idex));
    setImgComment(imgComment.filter((e) => e !== item));
  };
  console.log(imgComment);
  console.log(image);
  let avatar;
  if (userInfo) {
    avatar = userInfo.urlImageSet[0];
  } else if (user) {
    console.log(user);
    avatar = user.fileList[0].fileDownloadUri;
  }
  // handle Comment
  const handleComment = (e) => {
    if (isEdit) {
      let newData = { ...commentEdit };
      console.log(newData);
      newData[e.target.id] = e.target.value;
      console.log("isEdit");
      setCommentEdit(newData);
      console.log(newData);
    } else {
      console.log("noEdit");
      setComment(e.target.value);
    }
  };
  // comment
  const submit = (e) => {
    e.preventDefault();
    if (isEdit) {
      let formData = new FormData();
      formData.append("commentContent", commentEdit.comment);
      if (image && image.length > 0) {
        for (let i = 0; i < image.length; i++) {
          console.log(image[i]);
          formData.append("files", image[i]);
        }
      } else {
        formData.append("files", new File([""], ""));
      }
      axiosx
        .put(`/comment/update/${idComment}`, formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        })
        .then(() => {
          enqueueSnackbar("Bình luận đã được chỉnh sửa", {
            variant: "success",
          });
          setTotalComment(totalComment + 1);
          document.getElementById("submitComment").reset();
          setComment("");
          setImage(new File([""], ""));
          setImgComment([]);
        })
        .catch((err) => enqueueSnackbar("Lỗi", { variant: "error" }));
    } else {
      if (comment.length === 0) {
        enqueueSnackbar("Bình luận không thể để trống", { variant: "error" });
        return;
      }
      let formData = new FormData();
      formData.append("commentContent", comment);
      if (image && image.length > 0) {
        for (let i = 0; i < image.length; i++) {
          console.log(image[i]);
          formData.append("files", image[i]);
        }
      } else {
        formData.append("files", new File([""], ""));
      }

      axiosx
        .post(
          `/comment/insertCommentAndMulFile?idUser=${user.id}&idProduct=${id}`,
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        )
        .then(() => {
          enqueueSnackbar("Đã thêm bình luận", { variant: "success" });
          setTotalComment(totalComment + 1);
          document.getElementById("submitComment").reset();
          setComment("");
          setImage(new File([""], ""));
          setImgComment([]);
        })
        .catch((err) => enqueueSnackbar("Lỗi", { variant: "error" }));
    }
  };

  // get comment
  const getComment = (id) => {
    axiosx
      .get(`/comment/selectByIdComment/${id}`)
      .then((res) => {
        setCommentEdit(res.data);
        setIdComment(id)
        setIsEdit(true);
      })
      .catch((err) => console.log(err));
    // setCommentEdit
  };
  //add to cart
  const addToCart = () => {
    if (amount > data.amount) {
      enqueueSnackbar("Số lượng sản phẩm còn lại không đủ", {
        variant: "error",
      });
      return;
    }
    axiosx
      .post(`/cart/insert?idUser=${user.id}&idProduct=${id}`, {
        amount: amount,
      })
      .then(() => {
        enqueueSnackbar("Đã thêm vào giỏ", { variant: "success" });
        handleClose();
      })
      .catch((err) => enqueueSnackbar("Lỗi", { variant: "error" }));
  };

  //delete comment
  const deleteComment = (id) => {
    axiosx
      .delete(`/comment/delete/${id}`)
      .then(() => {
        enqueueSnackbar("Đã xóa bình luận", { variant: "success" });
        setCommentList(commentList.filter((item) => item.idComment !== id));
      })
      .catch(() => enqueueSnackbar("Đã xảy ra lỗi", { variant: "error" }));
  };

  //useEffect
  useEffect(() => {
    axios
      .get(`http://localhost:8080/product/selectAll`)
      .then((res) => {
        setData(res.data.filter((item) => item.idProduct === Number(id))[0]);
        let userId = res.data.filter((item) => item.idProduct === Number(id))[0]
          .idUser;
        axiosx
          .get(`/user/selectById/${userId}`)
          .then((res) => {
            setSellerInfo(res.data);
            console.log(res.data);
          })
          .catch((err) => console.log(err));

        setProducts(res.data);
      })
      .catch((err) => console.log(err));
    axios
      .get(`http://localhost:8080/comment/selectById/${id}`)
      .then((res) => {
        setCommentList([...res.data].reverse());
        setTotalComment(res.data.length);
      })
      .catch((err) => console.log(err));
  }, [totalComment]);

  //order
  const order = () => {
    if (amount > data.amount) {
      enqueueSnackbar("Số lượng sản phẩm còn lại không đủ", {
        variant: "error",
      });
      return;
    }
    let _data = { ...data };
    delete _data.product;
    _data.totalPrice = amount * data.price;
    let date = new Date();
    _data.createDate = `${date.getFullYear()}-${
      date.getMonth() + 1
    }-${date.getDate()}`;
    _data.amount = amount;
    axiosx
      .post(`/bill/save?idUser=${user.id}&idProduct=${id}`, _data)
      .then(() => {
        handleClose();
        enqueueSnackbar("Đã đặt đơn hàng", { variant: "success" });
        navigate("/user/await");
      })
      .catch(() =>
        enqueueSnackbar("Đặt đơn hàng thất bại", { variant: "error" })
      );
  };

  // convert image to file object
  // const toDataURL = (url) =>
  //   fetch(url)
  //     .then((response) => response.blob())
  //     .then(
  //       (blob) =>
  //         new Promise((resolve, reject) => {
  //           const reader = new FileReader();
  //           reader.onloadend = () => resolve(reader.result);
  //           reader.onerror = reject;
  //           reader.readAsDataURL(blob);
  //         })
  //     );

  // const dataURLtoFile = (dataurl, filename) => {
  //   var arr = dataurl.split(","),
  //     mime = arr[0].match(/:(.*?);/)[1],
  //     bstr = atob(arr[1]),
  //     n = bstr.length,
  //     u8arr = new Uint8Array(n);
  //   while (n--) {
  //     u8arr[n] = bstr.charCodeAt(n);
  //   }
  //   return new File([u8arr], filename, { type: mime });
  // };

  // toDataURL(url)
  // .then(dataUrl => {
  //    console.log('Here is Base64 Url', dataUrl)
  //    var fileData = dataURLtoFile(dataUrl, "imageName.jpg");
  //    console.log("Here is JavaScript File Object",fileData)
  //    fileArr.push(fileData)
  //  })
  return (
    <div>
      <div className="bg-main">
        {/* Modal React */}
        <ModalReact
          show={show}
          title="Đặt sản phẩm"
          handleClose={handleClose}
          handleFunction={order}
          handleShow={handleShow}
        >
          Bạn muốn đặt sản phẩm này?
        </ModalReact>
        <Navbars />

        <div className="container shadow-sm bg-white p-3 mt-3 rounded-3 text-start">
          {data ? (
            <Row>
              <Col md={6}>
                <ImageGallery images={data.urlFile ? data.urlFile : []} />
              </Col>
              <Col md={6}>
                <h2 className="mb-4">{data.productName}</h2>
                <h3 className="mb-4">
                  Giá:
                  {new Intl.NumberFormat("vi-VN", {
                    style: "currency",
                    currency: "VND",
                  }).format(data.price)}
                </h3>
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
                  <div className="form-text">
                    {data.amount > 0 ? data.amount : 0} Số lượng có sẵn
                  </div>
                </div>
                {user && user.roles[0] === "ROLE_MODERATOR" ? (
                  <Link to="/sign-in">
                    <span className="btn btn-success" role="button">
                      Sửa sản phẩm
                    </span>
                  </Link>
                ) : (
                  <div
                    className={`mt-4 ${
                      user.roles[0] === "ROLE_USER" ? "d-block" : "d-none"
                    }`}
                  >
                    <button
                      className="btn bg-spotlight me-3"
                      onClick={addToCart}
                    >
                      <FontAwesomeIcon icon={faCartPlus} className="me-2" />
                      Thêm vào giỏ hàng
                    </button>
                    <button
                      onClick={handleShow}
                      className="btn btn-buy text-white"
                    >
                      Mua ngay
                    </button>
                  </div>
                )}
              </Col>
            </Row>
          ) : (
            <Spinner />
          )}
        </div>
        {/* seller Info */}
        {sellerInfo && (
          <div className="container d-flex align-items-center bg-spotlight shadow-sm p-3 rounded-3 mt-3 text-start">
            <div className="col-4">
              <div className="d-flex justify-content-start align-items-center border-right border-danger">
                <div className="me-3">
                  <img
                    className="rounded-pill"
                    src={sellerInfo.urlImageSet[0]}
                    width="80px"
                    height="80px"
                  />
                </div>
                <div>
                  <div className="fw-bold fs-5">{sellerInfo.username}</div>
                  <div>Người bán</div>
                </div>
              </div>
            </div>
            <div className="col-8 d-none d-sm-none d-md-none d-lg-block d-xl-block">
              <div className="row">
                <div className="col-12 col-sm-12 col-md-12 col-lg-4 col-xl-4 mb-3">
                  <div>
                    <span className="me-3 fw-bold">Email</span>
                    <span className="text-main">{sellerInfo.email}</span>
                  </div>
                </div>
                <div className="col-12 col-sm-12 col-md-12 col-lg-4 col-xl-4 mb-3">
                  <div>
                    <span className="me-3 fw-bold">Tên</span>
                    <span className="text-main">{sellerInfo.fullName}</span>
                  </div>
                </div>
                <div className="col-12 col-sm-12 col-md-12 col-lg-4 col-xl-4 mb-3">
                  <div>
                    <span className="me-3 fw-bold">SĐT</span>
                    <span className="text-main">{sellerInfo.phoneNumber}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* product description */}
        <div className="container bg-white p-3 rounded-3 mt-3 mb-3 text-start">
          <div className="mt-4 ms-3">
            <h2 className="text-start mb-5">Mô tả sản phẩm</h2>
            {data ? (
              <div>
                <div className="mb-5">
                  <div className="fs-4 fw-bold">{data.productName}</div>
                  <div className="mt-3">
                    {data.description &&
                      data.description
                        .replace(/-/g, "")
                        .replace(/\r/g, "")
                        .split("\n")
                        .filter((item) => item !== "")
                        .map((item) => (
                          <div className="mb-3">
                            <FontAwesomeIcon
                              icon={faCircleCheck}
                              className="me-2 text-success"
                            />
                            {item}
                          </div>
                        ))}
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
            ) : (
              <Spinner />
            )}
          </div>
        </div>

        {/* comment product */}
        <div className="container bg-white p-3 rounded-3 mt-3 mb-3 text-start">
          <div className="mt-4 ms-3">
            <h2>Đánh giá sản phẩm</h2>
            {user && (
              <div className="d-flex">
                <div className="me-3">
                  <img className="avt" src={avatar} />
                </div>
                <form
                  className="w-50"
                  encType="multipart/form-data"
                  id="submitComment"
                  onSubmit={(e) => submit(e)}
                >
                  <div class="input-group mb-3">
                    <input
                      type="text"
                      onChange={(e) => handleComment(e)}
                      value={commentEdit ? commentEdit.comment : comment}
                      id="comment"
                      class="form-control"
                      placeholder="Nhập đánh giá..."
                      aria-describedby="button-addon2"
                    />
                    <label className="btn btn-outline-success" htmlFor="files">
                      <span>Thêm hình</span>
                    </label>
                  </div>
                  <input
                    ref={inputRef}
                    accept="image/*"
                    style={{ display: "none" }}
                    id="files"
                    multiple
                    type="file"
                    onChange={(e) => {
                      // setImage(e.target.files);
                      handleChangeImage(e);
                    }}
                  />
                  <div className="d-flex gap-2 mb-3">
                    {imgComment.length > 0 &&
                      imgComment.map((item, index) => (
                        <div className="w-25">
                          <img src={item} alt="" className="w-100 h-75" />
                          <span
                            className="btn btn-sm btn-danger"
                            onClick={() => handleDeleteImage(item, index)}
                          >
                            bỏ chọn
                          </span>
                        </div>
                      ))}
                  </div>
                  <div>
                    <button type="submit" className="btn btn-success rounded-1">
                      Bình luận
                    </button>
                  </div>
                </form>
              </div>
            )}
            {commentList.length > 0 && (
              <div className=" overflow-auto row" style={{ height: "500px" }}>
                {commentList.map((item, index) => (
                  <div key={index} className="mt-5">
                    <div className="d-flex">
                      <div className="me-3">
                        <img
                          className="avt"
                          src={item.userDTO?.urlImageSet[0]}
                        />
                      </div>
                      <div>
                        <div className="fw-bold">{item.userDTO?.username}</div>
                        <div className="form-text">
                          2022-10-10 14:28 | Phân loại hàng:{" "}
                          {data && data.category && data.category.categoryName}
                        </div>
                        <div className="w-100">
                          <span>{item.comment}</span>
                        </div>
                        <div className="d-flex">
                          {item.urlFile.map((item) => (
                            <div
                              style={{ width: "100px", height: "100px" }}
                              className="me-2"
                            >
                              <img src={item} width="100%" height="100%" />
                            </div>
                          ))}
                        </div>
                        <div className="d-flex gap-3">
                          {user &&
                            (user.id == item.idUser ||
                              (data && user.id == data.idUser)) && (
                              <div className="d-flex">
                                <a
                                  onClick={() =>
                                    deleteComment(item.idComment, item.comment)
                                  }
                                  role="button"
                                  className="form-text me-3 text-decoration-none"
                                >
                                  Xóa
                                </a>
                              </div>
                            )}
                          {user && user.id == item.idUser && (
                            <div className="d-flex">
                              <a
                                onClick={() => getComment(item.idComment)}
                                role="button"
                                className="form-text me-3 text-decoration-none"
                              >
                                Sửa
                              </a>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
          <div>
            <h2 className="mt-4 ms-3">Các sản phẩm khác</h2>
            <div>
              <div>
                <div className="row mt-2 p-2">
                  {products && products.length > 0 ? (
                    products.map((item) => (
                      <div
                        key={item.idProduct}
                        className="col-3 col-sm-3 col-md-4 col-lg-2 col-xl-2 mb-3"
                      >
                        <a
                          href={`/product/${item.idProduct}`}
                          className="text-decoration-none text-black"
                        >
                          <div className="bg-white border-main">
                            <div className="">
                              <img
                                src={item?.urlFile[0]}
                                style={{ width: "100%", height: "155px" }}
                              />
                            </div>
                            <div className="px-3 text-center pb-2 mt-2 text-start">
                              <div style={{ fontSize: "12px" }}>
                                {item.productName}
                              </div>
                              {/* <div className="d-flex justify-content-between"> */}
                              <div style={{ fontSize: "12px" }}>
                                Giá:{" "}
                                <span className="text-main text-xs">
                                  {item.price.toLocaleString()} VND
                                </span>
                              </div>
                              <div
                                className="form-text"
                                style={{ fontSize: "12px" }}
                              >
                                <span
                                  className={
                                    item.amount == 0 ? "text-danger" : ""
                                  }
                                >
                                  {item.amount > 0
                                    ? `Còn lại: ${item.amount}`
                                    : "Hết Hàng"}
                                </span>
                              </div>
                              {/* </div> */}
                            </div>
                          </div>
                        </a>
                      </div>
                    ))
                  ) : (
                    <div className="spinner-border text-danger" role="status">
                      <span className="visually-hidden">Loading...</span>
                    </div>
                  )}
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
