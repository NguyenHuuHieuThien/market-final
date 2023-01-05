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
import ModalReact from "../../component/Modal";
import { axiosx as axios } from "../../Helper";
import BgUser from "../../component/BgUser";
import { Link } from "react-router-dom";
import { useSnackbar } from "notistack";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import Spinner from "../../component/Spinner";
export default function ProfilePage() {
  // const {enqueueSnackbar} = useSnackbar();
  // const [open, setOpen] = useState(false);
  let user = JSON.parse(localStorage.getItem("token"));
  let userInfo = JSON.parse(localStorage.getItem("userInfo"));
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState();
  const [dataUpdate, setDataUpdate] = useState("");
  const [userinfo, setUserInfo] = useState(user);
  let avatar;
  if (userInfo) {
    avatar = userInfo.urlImageSet[0];
  } else if (user) {
    console.log(user);
    avatar = user.fileList[0].fileDownloadUri;
  }

  const handle = (e) => {
    setDataUpdate(e.target.value);
    console.log(dataUpdate);
  };
  useEffect(() => {
    console.log(userInfo);
    setIsLoading(true);
    axios
      .get(`/bill/select/${user.id}?status=active`)
      .then((res) => {
        console.log(res.data);
        setData(res.data);
        setIsLoading(false);
      })
      .catch((err) => console.log(err));
  }, []);
  return (
    <div>
      {!user ? (
        <div>
          <div class="alert alert-danger" role="alert">
            Bạn không có quyền truy cập vào trang quản lý.
          </div>
          <Link to="/">
            <button className="btn btn-warning text-white">
              <FontAwesomeIcon icon={faArrowLeft} className="me-2" />
              Quay lại
            </button>
          </Link>
        </div>
      ) : (
        <BgUser>
          {/* <ModalReact
            children={
              <div>
                <div class="form-floating mb-3">
                  <input
                    class="form-control"
                    type="password"
                    id="currentPass"
                  />
                  <label for="currentPass">Mật khẩu hiện tại</label>
                </div>
                <div class="form-floating mb-3">
                  <input class="form-control" type="password" id="newPass" />
                  <label for="newPass">Mật khẩu mới</label>
                </div>
                <div class="form-floating mb-3">
                  <input
                    class="form-control"
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
          <MDBRow>
            <MDBCol lg="4">
              <MDBCard className="mb-4">
                <MDBCardBody className="text-center shadow-sm">
                  <div className="d-flex justify-content-center">
                    <MDBCardImage
                      src={avatar}
                      alt="avatar"
                      className="rounded-pill"
                      style={{ width: "150px", height: "150px" }}
                      fluid
                    />
                  </div>
                  <div className="mt-3 mb-4">
                    <span className="fw-bold mb-1 d-block ">
                      {userInfo?.username ?? user?.username}
                    </span>
                    <span className="text-muted mb-4">
                      {userInfo?.fullName ?? user?.name}
                    </span>
                  </div>
                </MDBCardBody>
              </MDBCard>
            </MDBCol>
            <MDBCol lg="8">
              <MDBCard className="mb-4">
                <MDBCardBody>
                  <MDBRow>
                    <MDBCol sm="3">
                      <MDBCardText>Họ tên</MDBCardText>
                    </MDBCol>
                    <MDBCol sm="9">
                      <MDBCardText className="text-muted">
                        {userInfo?.fullName ?? user?.name}
                      </MDBCardText>
                    </MDBCol>
                  </MDBRow>
                  <hr />
                  <MDBRow>
                    <MDBCol sm="3">
                      <MDBCardText>Email</MDBCardText>
                    </MDBCol>
                    <MDBCol sm="9">
                      <MDBCardText className="text-muted">
                        {userInfo?.email ?? user?.email}
                      </MDBCardText>
                    </MDBCol>
                  </MDBRow>
                  <hr />
                  <MDBRow>
                    <MDBCol sm="3">
                      <MDBCardText>Số điện thoại</MDBCardText>
                    </MDBCol>
                    <MDBCol sm="9">
                      <MDBCardText className="text-muted">
                        {userInfo?.phoneNumber ?? user?.phoneNumber}
                      </MDBCardText>
                    </MDBCol>
                  </MDBRow>
                  <hr />
                  <MDBRow>
                    <MDBCol sm="3">
                      <MDBCardText>Ngày sinh</MDBCardText>
                    </MDBCol>
                    <MDBCol sm="9">
                      <MDBCardText className="text-muted">
                        {userInfo?.birthday ?? user?.birthday}
                      </MDBCardText>
                    </MDBCol>
                  </MDBRow>
                  <hr />
                  <MDBRow>
                    <MDBCol sm="3">
                      <MDBCardText>Giới tính</MDBCardText>
                    </MDBCol>
                    <MDBCol sm="9">
                      <MDBCardText className="text-muted">
                        {userInfo?.sex === "male" ?? user?.sex === "male"
                          ? "Nam"
                          : "Nữ"}
                      </MDBCardText>
                    </MDBCol>
                  </MDBRow>
                  <hr />
                  <MDBRow>
                    <MDBCol sm="3">
                      <MDBCardText>Địa chỉ</MDBCardText>
                    </MDBCol>
                    <MDBCol sm="9">
                      <MDBCardText className="text-muted">
                        {userInfo?.address ?? user?.address}
                      </MDBCardText>
                    </MDBCol>
                  </MDBRow>
                </MDBCardBody>
              </MDBCard>
            </MDBCol>
          </MDBRow>
          {user.roles[0] === "ROLE_USER" && (
            <div>
              <div className="bg-white rounded-2 shadow-sm">
                <h3 className="py-3 border-underline">Lịch sử mua hàng</h3>
                <MDBTable>
                  <MDBTableHead>
                    <tr>
                      <th scope="col">Hình ảnh</th>
                      <th scope="col">Tên sản phẩm</th>
                      <th scope="col">Giá</th>
                      <th scope="col">Số lượng</th>
                      <th scope="col">Ngày mua</th>
                    </tr>
                  </MDBTableHead>
                  <MDBTableBody>
                    {isLoading ? (
                      <tr>
                        <td>
                          <Spinner />
                        </td>
                      </tr>
                    ) : data && data.length > 0 ? (
                      data.map((item, index) => (
                        <tr key={index}>
                          <td>
                           <Link to={`/product/${item?.product.idProduct}`}>
                           <img
                              style={{ width: "50px" }}
                              src={item.product.urlFile[0]}
                            /></Link>
                          </td>
                          <td>{item.product.productName}</td>
                          <td>
                            {new Intl.NumberFormat("vi-VN", {
                              style: "currency",
                              currency: "VND",
                            }).format(item.product.price)}
                          </td>
                          <td>{item.amount}</td>
                          <td>{item.createDate}</td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td>
                          <span>Bạn chưa mua sản phẩm nào.</span>
                          <Link to="/product/lít">
                            Bạn có thể mua sản phẩm tại đây!
                          </Link>
                        </td>
                      </tr>
                    )}
                  </MDBTableBody>
                </MDBTable>
              </div>
            </div>
          )}
        </BgUser>
      )}
    </div>
  );
}
