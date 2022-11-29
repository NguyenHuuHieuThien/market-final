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
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPenToSquare } from "@fortawesome/free-solid-svg-icons";
import ModalReact from "../../component/Modal";
import { axiosx as axios } from "../../Helper";
import BgUser from "../../component/BgUser";
import { useSnackbar } from "notistack"
export default function ProfilePage() {
  const {enqueueSnackbar} = useSnackbar();
  const [open, setOpen] = useState(false);
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const [data, setdata] = useState();
  const [dataUpdate, setDataUpdate] = useState('')
  // console.log(dataUpdate)
  let user = JSON.parse(localStorage.getItem("token"));
  const handle = (e)=>{
      setDataUpdate(e.target.value);
      console.log(dataUpdate)
  }
  useEffect(()=> {
    axios.get(`/bill/select/${user.id}?status=active`)
    .then(res=> console.log(res.data))
    .catch(err=> console.log(err))
  })
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
                    src={user.fileList[0].fileDownloadUri}
                    alt="avatar"
                    className="rounded-pill"
                    style={{ width: "150px", height: "150px" }}
                    fluid
                  />
                </div>
                <div className="mt-3 mb-4">
                  <span className="text-muted mb-1 d-block ">
                    {user.username}
                  </span>
                  <span className="text-muted mb-4">{user.name}</span>
                </div>
                <div className="d-flex justify-content-center mb-3">
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
            <MDBCardBody>
                <MDBRow>
                  <MDBCol sm="3">
                    <MDBCardText>Họ tên</MDBCardText>
                  </MDBCol>
                  <MDBCol sm="9">
                    <MDBCardText className="text-muted">{user.name}</MDBCardText>
                  </MDBCol>
                </MDBRow>
                <hr />
                <MDBRow>
                  <MDBCol sm="3">
                    <MDBCardText>Email</MDBCardText>
                  </MDBCol>
                  <MDBCol sm="9">
                    <MDBCardText className="text-muted">{user.email}</MDBCardText>
                  </MDBCol>
                </MDBRow>
                <hr />
                <MDBRow>
                  <MDBCol sm="3">
                    <MDBCardText>Số điện thoại</MDBCardText>
                  </MDBCol>
                  <MDBCol sm="9">
                    <MDBCardText className="text-muted">{user.phoneNumber}</MDBCardText>
                  </MDBCol>
                </MDBRow>
                <hr />
                <MDBRow>
                  <MDBCol sm="3">
                    <MDBCardText>Ngày sinh</MDBCardText>
                  </MDBCol>
                  <MDBCol sm="9">
                    <MDBCardText className="text-muted">{user.birthday}</MDBCardText>
                  </MDBCol>
                </MDBRow>
                <hr />
                <MDBRow>
                  <MDBCol sm="3">
                    <MDBCardText>Giới tính</MDBCardText>
                  </MDBCol>
                  <MDBCol sm="9">
                    <MDBCardText className="text-muted">{user.sex=='male'? 'Nam': 'Nữ'}</MDBCardText>
                  </MDBCol>
                </MDBRow>
                <hr />
                <MDBRow>
                  <MDBCol sm="3">
                    <MDBCardText>Địa chỉ</MDBCardText>
                  </MDBCol>
                  <MDBCol sm="9">
                    <MDBCardText className="text-muted">{user.address}</MDBCardText>
                  </MDBCol>
                </MDBRow>
              </MDBCardBody>
            </MDBCard>
          </MDBCol>
        </MDBRow>
        {user.roles[0]==="ROLE_USER" && 
        <div>
        <div className="bg-white rounded-2 shadow-sm">
          <h3 className="py-3 border-underline">Lịch sử mua hàng</h3>
          <MDBTable>
            <MDBTableHead>
              <tr>
                <th scope="col">#</th>
                <th scope="col">Tên sản phẩm</th>
                <th scope="col">Giá</th>
                <th scope="col">Số lượng</th>
                <th scope="col">Ngày mua</th>
              </tr>
            </MDBTableHead>
            <MDBTableBody>
              <tr>
                <td></td>
                <td>Mark</td>
                <td>Otto</td>
                <td>@mdo</td>
              </tr>
            </MDBTableBody>
          </MDBTable>
        </div>
      </div>}
      </BgUser>
    </>
  );
}
