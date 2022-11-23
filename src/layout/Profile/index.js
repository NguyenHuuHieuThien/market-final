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
import { axiosx as axios } from "../../Helper";
import { useState, useEffect, useRef } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPenToSquare } from "@fortawesome/free-solid-svg-icons";
import ModalReact from "../../component/Modal";
import MyCollapse from "../../component/Collapse";
import BgUser from "../../component/BgUser";
export default function ProfilePage() {
  const [open, setOpen] = useState(false);
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  let user = JSON.parse(localStorage.getItem("token"));
  console.log(user);
  return (
    <>
      <BgUser>
        <ModalReact
          children={
            <div>
              <div class="form-floating mb-3">
                <input class="form-control" type="password" id="currentPass" />
                <label for="currentPass">Mật khẩu hiện tại</label>
              </div>
              <div class="form-floating mb-3">
                <input class="form-control" type="password" id="newPass" />
                <label for="newPass">Mật khẩu mới</label>
              </div>
              <div class="form-floating mb-3">
                <input class="form-control" type="password" id="checkNewPass" />
                <label for="checkNewPass">Nhập lại mật khẩu</label>
              </div>
            </div>
          }
          handleClose={handleClose}
          show={show}
          title="Đổi mật khẩu"
        ></ModalReact>
        <MDBRow>
          <MDBCol lg="4">
            <MDBCard className="mb-4">
              <MDBCardBody className="text-center shadow-sm">
                <div className="d-flex justify-content-center">
                  <MDBCardImage
                    src="https://cdnmedia.tinmoi.vn/upload/thanhxuanbtv/2021/08/06/luu-thi-thi-de-toc-ngan-khien-cnet-chan-dong-vi-kem-sac-va-tam-thuong-1628219036-3.jpg"
                    alt="avatar"
                    className="rounded-pill"
                    style={{ width: "150px", height: "150px" }}
                    fluid
                  />
                </div>
                <div className="mt-3 mb-5">
                  <span className="text-muted mb-1 d-block ">
                    {user.username}
                  </span>
                  <span className="text-muted mb-4">{user.name}</span>
                </div>
                <div className="d-flex justify-content-center mb-3 pb-5">
                  <MDBBtn>Follow</MDBBtn>
                  <MDBBtn outline className="ms-1">
                    Message
                  </MDBBtn>
                </div>
              </MDBCardBody>
            </MDBCard>
          </MDBCol>
          <MDBCol lg="8">
            <MDBCard className="mb-4">
              <MDBCardBody className="shadow-sm">
                <MDBRow>
                  <MDBCol sm="3">
                    <MDBCardText>Họ tên</MDBCardText>
                  </MDBCol>
                  <MDBCol sm="7">
                    <MDBCardText className="text-muted">
                      {user.name}
                    </MDBCardText>
                    <MyCollapse open={open} children="abc" />
                  </MDBCol>
                  <MDBCol sm="2">
                    <MDBCardText className="text-muted">
                      <FontAwesomeIcon
                        role="button"
                        aria-expanded={open}
                        aria-controls="fullname"
                        id="fullname"
                        icon={faPenToSquare}
                      />
                    </MDBCardText>
                  </MDBCol>
                </MDBRow>
                <hr />
                <MDBRow>
                  <MDBCol sm="3">
                    <MDBCardText>Email</MDBCardText>
                  </MDBCol>
                  <MDBCol sm="7">
                    <MDBCardText className="text-muted">
                      {user.email}
                    </MDBCardText>
                    <MyCollapse open={open} children="bca" />
                  </MDBCol>
                  <MDBCol sm="2">
                    <MDBCardText className="text-muted">
                      <FontAwesomeIcon
                        role="button"
                        aria-expanded={open}
                        aria-controls="email"
                        icon={faPenToSquare}
                      />
                    </MDBCardText>
                  </MDBCol>
                </MDBRow>
                <hr />
                <MDBRow>
                  <MDBCol sm="3">
                    <MDBCardText>Ngày sinh</MDBCardText>
                  </MDBCol>
                  <MDBCol sm="7">
                    <MDBCardText className="text-muted">{user.birthday}</MDBCardText>
                    <MyCollapse open={open} children="bca" />
                  </MDBCol>
                  <MDBCol sm="2">
                    <MDBCardText className="text-muted">
                      <FontAwesomeIcon
                        role="button"
                        aria-expanded={open}
                        aria-controls="birthdate"
                        icon={faPenToSquare}
                      />
                    </MDBCardText>
                  </MDBCol>
                </MDBRow>
                <hr />
                <MDBRow>
                  <MDBCol sm="3">
                    <MDBCardText>Giới tính</MDBCardText>
                  </MDBCol>
                  <MDBCol sm="7">
                    <MDBCardText className="text-muted">{user.sex ==='male'?'Nam': 'Nữ'}</MDBCardText>
                    <MyCollapse open={open} children="bca" />
                  </MDBCol>
                  <MDBCol sm="2">
                    <MDBCardText className="text-muted">
                      <FontAwesomeIcon
                        role="button"
                        aria-expanded={open}
                        aria-controls="gender"
                        icon={faPenToSquare}
                      />
                    </MDBCardText>
                  </MDBCol>
                </MDBRow>
                <hr />
                <MDBRow>
                  <MDBCol sm="3">
                    <MDBCardText>Số điện thoại</MDBCardText>
                  </MDBCol>
                  <MDBCol sm="7">
                    <MDBCardText className="text-muted">{user.phoneNumber}</MDBCardText>
                  </MDBCol>
                  <MDBCol sm="2">
                    <MDBCardText className="text-muted">
                      <FontAwesomeIcon role="button" icon={faPenToSquare} />
                    </MDBCardText>
                  </MDBCol>
                </MDBRow>
                <hr />
                <MDBRow>
                  <MDBCol sm="3">
                    <MDBCardText>Địa chỉ</MDBCardText>
                  </MDBCol>
                  <MDBCol sm="7">
                    <MDBCardText className="text-muted">
                      {user.address}
                    </MDBCardText>
                  </MDBCol>
                  <MDBCol sm="2">
                    <MDBCardText className="text-muted">
                      <FontAwesomeIcon role="button" icon={faPenToSquare} />
                    </MDBCardText>
                  </MDBCol>
                </MDBRow>
              </MDBCardBody>
            </MDBCard>
          </MDBCol>
        </MDBRow>
        <div>
          <div className="bg-white rounded-2 shadow-sm">
            <h3 className="py-3 border-underline">Lịch sử mua hàng</h3>
            <MDBTable>
              <MDBTableHead>
                <tr>
                  <th scope="col">#</th>
                  <th scope="col">First</th>
                  <th scope="col">Last</th>
                  <th scope="col">Handle</th>
                </tr>
              </MDBTableHead>
              <MDBTableBody>
                <tr>
                  <th scope="row">1</th>
                  <td>Mark</td>
                  <td>Otto</td>
                  <td>@mdo</td>
                </tr>
                <tr>
                  <th scope="row">1</th>
                  <td>Mark</td>
                  <td>Otto</td>
                  <td>@mdo</td>
                </tr>
                <tr>
                  <th scope="row">1</th>
                  <td>Mark</td>
                  <td>Otto</td>
                  <td>@mdo</td>
                </tr>
                <tr>
                  <th scope="row">1</th>
                  <td>Mark</td>
                  <td>Otto</td>
                  <td>@mdo</td>
                </tr>
                <tr>
                  <th scope="row">1</th>
                  <td>Mark</td>
                  <td>Otto</td>
                  <td>@mdo</td>
                </tr>
                <tr>
                  <th scope="row">1</th>
                  <td>Mark</td>
                  <td>Otto</td>
                  <td>@mdo</td>
                </tr>
                <tr>
                  <th scope="row">1</th>
                  <td>Mark</td>
                  <td>Otto</td>
                  <td>@mdo</td>
                </tr>
                <tr>
                  <th scope="row">1</th>
                  <td>Mark</td>
                  <td>Otto</td>
                  <td>@mdo</td>
                </tr>
                <tr>
                  <th scope="row">1</th>
                  <td>Mark</td>
                  <td>Otto</td>
                  <td>@mdo</td>
                </tr>
                <tr>
                  <th scope="row">1</th>
                  <td>Mark</td>
                  <td>Otto</td>
                  <td>@mdo</td>
                </tr>
                <tr>
                  <th scope="row">1</th>
                  <td>Mark</td>
                  <td>Otto</td>
                  <td>@mdo</td>
                </tr>
                <tr>
                  <th scope="row">1</th>
                  <td>Mark</td>
                  <td>Otto</td>
                  <td>@mdo</td>
                </tr>
                <tr>
                  <th scope="row">1</th>
                  <td>Mark</td>
                  <td>Otto</td>
                  <td>@mdo</td>
                </tr>
                <tr>
                  <th scope="row">1</th>
                  <td>Mark</td>
                  <td>Otto</td>
                  <td>@mdo</td>
                </tr>
                <tr>
                  <th scope="row">1</th>
                  <td>Mark</td>
                  <td>Otto</td>
                  <td>@mdo</td>
                </tr>
                <tr>
                  <th scope="row">1</th>
                  <td>Mark</td>
                  <td>Otto</td>
                  <td>@mdo</td>
                </tr>
                <tr>
                  <th scope="row">1</th>
                  <td>Mark</td>
                  <td>Otto</td>
                  <td>@mdo</td>
                </tr>
                <tr>
                  <th scope="row">1</th>
                  <td>Mark</td>
                  <td>Otto</td>
                  <td>@mdo</td>
                </tr>
                <tr>
                  <th scope="row">1</th>
                  <td>Mark</td>
                  <td>Otto</td>
                  <td>@mdo</td>
                </tr>
                <tr>
                  <th scope="row">1</th>
                  <td>Mark</td>
                  <td>Otto</td>
                  <td>@mdo</td>
                </tr>
                <tr>
                  <th scope="row">1</th>
                  <td>Mark</td>
                  <td>Otto</td>
                  <td>@mdo</td>
                </tr>
                <tr>
                  <th scope="row">1</th>
                  <td>Mark</td>
                  <td>Otto</td>
                  <td>@mdo</td>
                </tr>
                <tr>
                  <th scope="row">1</th>
                  <td>Mark</td>
                  <td>Otto</td>
                  <td>@mdo</td>
                </tr>
              </MDBTableBody>
            </MDBTable>
          </div>
        </div>
      </BgUser>
    </>
  );
}
