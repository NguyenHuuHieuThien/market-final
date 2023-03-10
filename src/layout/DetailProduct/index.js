import ImageGallery from "../../component/ImageGalery";
import { Row, Col } from "react-bootstrap";
import { useState, useRef } from "react";
import { axiosx } from "../../Helper";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

import Navbars from "../../component/Navbars";
import province from "./../../Province/data.json";
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
  faTruck
} from "@fortawesome/free-solid-svg-icons";
import { useEffect } from "react";
import Spinner from "../../component/Spinner";
export default function DetailProduct() {
  const navigate = useNavigate();
  const inputRef = useRef(null);
  const { enqueueSnackbar } = useSnackbar();
  const [comment, setComment] = useState({
    comment: "",
    files: ""
  });
  const [ward, setWard] = useState([]);
  const [districtName, setDistrictName] = useState("");
  let provinces = Object.values(province);
  let district = Object.values(provinces[26]["quan-huyen"]);
  const [address, setAddress] = useState("");
  const [wardName, setWardName] = useState("");
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
  const [idComment, setIdComment] = useState();
  let { id } = useParams();
  const handleClose = () => setShow(false);
  const handleShow = () => {
    setShow(true);
  };
  console.log(data);
  let user = JSON.parse(localStorage.getItem("token"));
  let userInfo = JSON.parse(localStorage.getItem("userInfo"));

  const handleDeleteImage = (item, idex) => {
    setImage(image.filter((image, index) => index !== idex));
    setImgComment(imgComment.filter((e) => e !== item));
  };
  const handleDistrict = (value) => {
    setWard(
      Object.values(
        district.filter((item) => item.code === value)[0]["xa-phuong"]
      ).map((item) => item.name)
    );
    setDistrictName(
      district.filter((item) => item.code == value)[0].name + ", "
    );
  };
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
      newData[e.target.id] = e.target.value;
      if(e.target.id === 'files'){
        newData[e.target.id] = e.target.files;
        const selectedFiles = e.target.files;
        const selectedFilesArr = Array.from(selectedFiles);
        const imagesArr = selectedFilesArr.map((item) => URL.createObjectURL(item));
        setImgComment(imagesArr);
      }
      setCommentEdit(newData);
    } else {
      let newData = { ...comment };
      newData[e.target.id] = e.target.value;
      if(e.target.id === 'files'){
        newData[e.target.id] = e.target.files;
        const selectedFiles = e.target.files;
        const selectedFilesArr = Array.from(selectedFiles);
        const imagesArr = selectedFilesArr.map((item) => URL.createObjectURL(item));
        setImgComment(imagesArr);
      }
      setComment(newData);
    }
  };
  // comment
  const submit = (e) => {
    e.preventDefault();
    if (isEdit) {
      let formData = new FormData();
      formData.append("commentContent", commentEdit.comment);
      if (commentEdit.files && commentEdit.files.length > 0) {
        for (let i = 0; i < commentEdit.files.length; i++) {
          console.log(commentEdit.files[i]);
          formData.append("files", commentEdit.files[i]);
        }
      } else {
        console.log('no files')
        formData.append("files", new File([""], ""));
      }
      axiosx
        .put(`/comment/update/${idComment}`, formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        })
        .then(() => {
          enqueueSnackbar("B??nh lu???n ???? ???????c ch???nh s???a", {
            variant: "success",
          });
          setTotalComment(totalComment + 1);
          document.getElementById("submitComment").reset();
          setCommentEdit("");
          setIsEdit(false)
          setImage(new File([""], ""));
          setImgComment([]);
        })
        .catch((err) => enqueueSnackbar("L???i", { variant: "error" }));
    } else {
      if (comment.length === 0) {
        enqueueSnackbar("B??nh lu???n kh??ng th??? ????? tr???ng", { variant: "error" });
        return;
      }
      let formData = new FormData();
      formData.append("commentContent", comment.comment);
      if (comment.files && comment.files.length > 0) {
        for (let i = 0; i < comment.files.length; i++) {
          console.log(comment.files[i]);
          formData.append("files", comment.files[i]);
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
          enqueueSnackbar("???? th??m b??nh lu???n", { variant: "success" });
          setTotalComment(totalComment + 1);
          document.getElementById("submitComment").reset();
          setComment("");
          setImage(new File([""], ""));
          setImgComment([]);
        })
        .catch((err) => enqueueSnackbar("L???i", { variant: "error" }));
    }
  };

  const handleAmount = (action) => {
    if(action === 'increase'){
      setAmount(amount + 1)
    }else{
      if(amount === 0){
        setAmount(0)
        return;
      }
      setAmount(amount - 1)
    }
  }
  // get comment
  const getComment = (id) => {
    axiosx
      .get(`/comment/selectByIdComment/${id}`)
      .then((res) => {
        setCommentEdit(res.data);
        setIdComment(id);
        setIsEdit(true);
      })
      .catch((err) => console.log(err));
    // setCommentEdit
  };
  //add to cart
  const addToCart = () => {
    if (amount > data.amount) {
      enqueueSnackbar("S??? l?????ng s???n ph???m c??n l???i kh??ng ?????", {
        variant: "error",
      });
      return;
    }
    axiosx
      .post(`/cart/insert?idUser=${user.id}&idProduct=${id}`, {
        amount: amount,
      })
      .then(() => {
        enqueueSnackbar("???? th??m v??o gi???", { variant: "success" });
        handleClose();
      })
      .catch((err) => enqueueSnackbar("L???i", { variant: "error" }));
  };

  //delete comment
  const deleteComment = (id) => {
    axiosx
      .delete(`/comment/delete/${id}`)
      .then(() => {
        enqueueSnackbar("???? x??a b??nh lu???n", { variant: "success" });
        setCommentList(commentList.filter((item) => item.idComment !== id));
      })
      .catch(() => enqueueSnackbar("???? x???y ra l???i", { variant: "error" }));
  };

  //useEffect
  useEffect(() => {
    axios
      .get(`http://localhost:8080/product/selectAll`)
      .then(res => {
        console.log(res.data)
        setData(res.data.filter((item) => item.idProduct === Number(id))[0]);
        let userId = res.data.filter((item) => item.idProduct === Number(id))[0].idUser;
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
    if(address.length === 0 || wardName.length === 0 || districtName.length === 0 ){
      enqueueSnackbar('Vui l??ng nh???p ?????a ch??? giao h??ng', {variant: 'error'})
      return
     }
    if (amount > data.amount) {
      enqueueSnackbar("S??? l?????ng s???n ph???m c??n l???i kh??ng ?????", {
        variant: "error",
      });
      return;
    }
    let date = new Date();
    let _data = {
      totalPrice : amount * data.price,
      createDate : `${date.getFullYear()}-${
        date.getMonth() + 1
      }-${date.getDate()}`,
      amount,
      address: document.getElementById('address').innerText,
      idProducts : [parseInt(id)]
    }
    console.log(_data)
    axiosx
      .post(`/bill/save?idUser=${user.id}`, _data)
      .then(() => {
        handleClose();
        enqueueSnackbar("???? ?????t ????n h??ng", { variant: "success" });
        navigate("/user/await");
      })
      .catch(() =>
        enqueueSnackbar("?????t ????n h??ng th???t b???i", { variant: "error" })
      );
  };

  return (
    <div>
      <div className="bg-main">
        {/* Modal React */}
        <ModalReact
            show={show}
            title="?????t s???n ph???m"
            handleClose={handleClose}
            handleFunction={order}
            handleShow={handleShow}
          >
            <form>
            <div className="d-flex mb-2">
              <div className="me-3">
                <FontAwesomeIcon icon={faTruck} className="me-2" />
                V???n chuy???n t???i
              </div>
              <div className="row">
                <div className="col-12 col-sm-12 col-md-12 cl-lg-4 col-xl-4">
                  <select
                    class="form-select"
                    required
                    onChange={(e) => handleDistrict(e.target.value)}
                  >
                    <option>-- Ch???n Qu???n/huy???n --</option>
                    {district.map((item, index) => (
                      <option key={index} value={item.code}>
                        {item.name}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="col-12 col-sm-12 col-md-12 cl-lg-4 col-xl-4">
                  <select
                    class="form-select"
                    required
                    onChange={(e) => setWardName(e.target.value + ", ")}
                  >
                    <option>-- Ch???n X??/Ph?????ng --</option>
                    {ward.length > 0 &&
                      ward.map((item, index) => (
                        <option key={index} value={item}>
                          {item}
                        </option>
                      ))}
                  </select>
                </div>
                <div className="col-12 col-sm-12 col-md-12 cl-lg-4 col-xl-4">
                  <span>???? N???ng</span>
                </div>
              </div>
            </div>
            <div class="form-floating mb-3">
              <input
                type="text"
                required
                className="form-control"
                onChange={(e) => setAddress(e.target.value + ", ")}
                id="delivery"
                placeholder="name@example.com"
              />
              <label for="delivery">Nh???p n??i nh???n...</label>
            </div>
            <div className="mb-2 fw-bold" id="address">
              {address + wardName + districtName + " ???? N???ng"}
            </div>
            </form>
          </ModalReact>
        <Navbars />

        <div className="container shadow-sm bg-white p-3 mt-3 rounded-3 text-start">
          {data ? (
            // product info
            <Row>
              <Col md={6}>
                <ImageGallery images={data.urlFile ? data.urlFile : []} />
              </Col>
              <Col md={6}>
                <h2 className="mb-4">{data.productName}</h2>
                <h3 className="mb-4">
                  Gi??:
                  {new Intl.NumberFormat("vi-VN", {
                    style: "currency",
                    currency: "VND",
                  }).format(data.price)}
                </h3>
                <div className="mb-4 d-flex">
                  <div className="me-5">S??? l?????ng</div>
                  <div>
                    <FontAwesomeIcon
                      icon={faCircleMinus}
                      role="button"
                      onClick={() => handleAmount('decrease')}
                    />
                    <input
                      type="number"
                      value={amount}
                      className="w-25 text-center"
                    />
                    <FontAwesomeIcon
                      icon={faCirclePlus}
                      role="button"
                      onClick={() =>handleAmount('increase') }
                    />
                  </div>
                  <div className="form-text">
                    {data.amount > 0
                      ? `${data.amount} S??? l?????ng c?? s???n`
                      : "H???t h??ng"}
                  </div>
                </div>
                {user && user.roles[0] === "ROLE_MODERATOR" ? (
                  <Link to={`/product/update/${data.idProduct}`}>
                    <span className="btn btn-success" role="button">
                      S???a s???n ph???m
                    </span>
                  </Link>
                ) : (
                  <div
                    className={`mt-4 ${
                      user.roles[0] === "ROLE_USER" ? "d-block" : "d-none"
                    }`}
                  >
                    {data.amount > 0 ? (
                      <div>
                        <button
                          className="btn bg-spotlight me-3"
                          onClick={addToCart}
                        >
                          <FontAwesomeIcon icon={faCartPlus} className="me-2" />
                          Th??m v??o gi??? h??ng
                        </button>
                        <button
                          onClick={handleShow}
                          className="btn btn-buy text-white"
                        >
                          Mua ngay
                        </button>
                      </div>
                    ) : (
                      <div class="alert alert-warning text-center" role="alert">
                        H???t h??ng
                      </div>
                    )}
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
                  <div>Ng?????i b??n</div>
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
                    <span className="me-3 fw-bold">T??n</span>
                    <span className="text-main">{sellerInfo.fullName}</span>
                  </div>
                </div>
                <div className="col-12 col-sm-12 col-md-12 col-lg-4 col-xl-4 mb-3">
                  <div>
                    <span className="me-3 fw-bold">S??T</span>
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
            <h2 className="text-start mb-5">M?? t??? s???n ph???m</h2>
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
                      Cam k???t ch???t l?????ng v?? m???u m?? s???n ph???m gi???ng v???i h??nh ???nh.
                    </div>
                    <div className="mb-3">
                      <FontAwesomeIcon
                        icon={faCircleCheck}
                        className="me-2 text-success"
                      />
                      Ho??n ti???n n???u s???n ph???m kh??ng gi???ng v???i m?? t???.{" "}
                    </div>
                    <div className="mb-3">
                      <FontAwesomeIcon
                        icon={faCircleCheck}
                        className="me-2 text-success"
                      />
                      Cam k???t ???????c ?????i tr??? h??ng trong v??ng 7 ng??y.{" "}
                    </div>
                    <div className="mb-3">
                      <FontAwesomeIcon
                        icon={faCircleCheck}
                        className="me-2 text-success"
                      />
                      Ch???p nh???n ?????i h??ng khi size kh??ng v???a Giao h??ng tr??n to??n
                      qu???c,{" "}
                    </div>
                    <div className="mb-3">
                      <FontAwesomeIcon
                        icon={faCircleCheck}
                        className="me-2 text-success"
                      />
                      Nh???n h??ng tr??? ti???n H??? tr??? ?????i tr??? theo quy ?????nh c???a h???
                      th???ng.
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
            <h2>????nh gi?? s???n ph???m</h2>
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
                      value={commentEdit ? commentEdit.comment : comment.comment}
                      id="comment"
                      class="form-control"
                      placeholder="Nh???p ????nh gi??..."
                      aria-describedby="button-addon2"
                    />
                    <label className="btn btn-outline-success" htmlFor="files">
                      <span>Th??m h??nh</span>
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
                      handleComment(e);
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
                            b??? ch???n
                          </span>
                        </div>
                      ))}
                  </div>
                  <div>
                    <button type="submit" className="btn btn-success rounded-1">
                      B??nh lu???n
                    </button>
                  </div>
                </form>
              </div>
            )}
            {commentList.length > 0 && (
              <div className=" overflow-auto row" style={{ maxHeight: "500px" }}>
                {commentList.map((item, index) => (
                  <div key={index} className="mt-3">
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
                          2022-10-10 14:28 | Ph??n lo???i h??ng:{" "}
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
                                  X??a
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
                                S???a
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
            <h2 className="mt-4 ms-3">C??c s???n ph???m kh??c</h2>
            <div>
              <div>
                <div className="row mt-2 p-2">
                  {products && products.length > 0 ? (
                    products.map((item) => (
                      item.amount > 0 && (
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
                                Gi??:{" "}
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
                                    ? `C??n l???i: ${item.amount}`
                                    : "H???t H??ng"}
                                </span>
                              </div>
                              {/* </div> */}
                            </div>
                          </div>
                        </a>
                      </div>
                      )
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
