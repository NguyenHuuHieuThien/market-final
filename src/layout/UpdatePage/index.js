import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHome,
  faList,
  faCheck,
  faRightFromBracket,
  faChevronRight,
} from "@fortawesome/free-solid-svg-icons";
import { Link, useParams, useLocation } from "react-router-dom";
import React, { useState, useEffect } from 'react';
import axios from 'axios';
const profileMenu = [
  { name: "Trang chủ", link: "/", icon: faHome },
  { name: "Danh sách người dùng", link: "/admin/users", icon: faList },
  { name: "Phê duyệt bài đăng", link: "/admin/product-list", icon: faCheck },
  { name: "Đăng xuất", link: "/", icon: faRightFromBracket },
];
function NewUser() {
  let { id } = useParams();
  console.log(id);
  let [data, setData] = useState({});
  console.log(data);
  // let [loading, setLoading] = useState(false);
  let [dataUpdate, setDataUpdate] = useState({});
  let location = useLocation();
  let productPath = location.pathname.includes("product");
  const handle = e => {
    if (id) {
        let newData = { ...dataUpdate }
        newData[e.target.id] = e.target.value;
        if (e.target.id === "files") {
            newData[e.target.id] = e.target.files;
        }
        setDataUpdate(newData);
    } else {
        let newData = { ...data }
        newData[e.target.id] = e.target.value;
        if (e.target.id === "files") {
            newData[e.target.id] = e.target.files;
        }
        console.log(newData);
        setData(newData);
    }
}
const submit = e => {
  e.preventDefault();

  if (id) {
      axios.put(`http://localhost:8080/product/update/${id}`, dataUpdate)
          .then(res => {
              console.log('success');
          })
          .catch(err => {
              console.log(err);
          })
  } else {
      let formData = new FormData();
      formData.append("productName", data.productName)
      formData.append("price", data.price)
      formData.append("description", data.description)
      formData.append("tradePark", data.tradePark)
      if (data && data.files.length > 0) {
          for (let i = 0; i < data.files.length; i++) {
              formData.append('files', data.files[i])
          }
      }
      axios.post("http://localhost:8080/product/insertProductAndMulFile?idUser=1&idCategory=1", formData, {
          headers: {
              'Content-Type': 'multipart/form-data'
          }
      })
          .then(res => { console.log('success') })
          .catch(err => { console.log(err) })
  }
}
  return (
    <div className="d-flex justify-content-start bg-main">
      <div className="row ms-3">
        <div className="col-3 bg-white rounded-2 p-0 mt-3">
          <div className="w-100 sticky-top ">
            <div className="py-1 mb-3">
              {profileMenu.map((item, index) => {
                return (
                  <Link
                    to={item.link}
                    className="text-decoration-none text-black"
                  >
                    <div className="d-flex justify-content-between p-3 mb-3">
                      <span>
                        <FontAwesomeIcon icon={item.icon} className="me-2" />{" "}
                        {item.name}
                      </span>
                      <FontAwesomeIcon icon={faChevronRight} />
                    </div>
                  </Link>
                );
              })}
            </div>
          </div>
        </div>
        <div className="col-8 bg-white rounded-2 p-3 ms-3 border border-main mt-3 shadow-sm">
          <form onSubmit={e=> submit(e)}>
            <div className="px-5 py-3 text-start">
              <h1 className="mb-5 mt-5">Thêm người dùng</h1>
              <div className="row ">
                <div className="col-12 co-sm-12 col-md-12 col-lg-6 col-xl-6 pe-5">
                  <div class="mb-3">
                    <label for="email" class="form-label fw-bold">
                      Email
                    </label>
                    <input
                    onChange={e=>handle(e)}
                      type="text"
                      placeholder="Nhập email..."
                      class="form-control text-white"
                      id="email"
                    />
                  </div>
                  <div class="mb-3">
                    <label for="name" class="form-label fw-bold">
                      Tên Tài khoản
                    </label>
                    <input
                    onChange={e=>handle(e)}
                      type="text"
                      placeholder="Nhập tên tài khoản..."
                      class="form-control text-white"
                      id="name"
                    />
                  </div>
                  <div class="mb-3">
                    <label for="fullname" class="form-label fw-bold">
                      Họ tên
                    </label>
                    <input
                    onChange={e=>handle(e)}
                      type="text"
                      placeholder="Nhập họ tên..."
                      class="form-control text-white"
                      id="fullname"
                    />
                  </div>
                  <div class="mb-3">
                    <label for="sex" class="form-label fw-bold">
                      Giới tính
                    </label>
                    <div className=" border border-main p-2">
                      <div class="form-check form-check-inline me-3">
                        <input
                          class="form-check-input"
                          type="radio"
                          name="inlineRadioOptions"
                          id="male"
                          onChange={e=>handle(e)}
                          value="male"
                        />
                        <label class="form-check-label" for="male">
                          Nam
                        </label>
                      </div>
                      <div class="form-check form-check-inline me-3">
                        <input
                          class="form-check-input"
                          type="radio"
                          name="inlineRadioOptions"
                          id="female"
                          onChange={e=>handle(e)}
                          value="female"
                        />
                        <label class="form-check-label" for="female">
                          Nữ
                        </label>
                      </div>
                      <div class="form-check form-check-inline">
                        <input
                          class="form-check-input"
                          type="radio"
                          name="inlineRadioOptions"
                          id="orther"
                          value="3"
                        />
                        <label class="form-check-label" for="orther">
                          Khác
                        </label>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-12 co-sm-12 col-md-12 col-lg-6 col-xl-6 ps-5">
                  <div class="mb-3">
                    <label for="address" class="form-label fw-bold">
                      Địa chỉ
                    </label>
                    <input
                    onChange={e=>handle(e)}
                      type="text"
                      placeholder="Nhập địa chỉ..."
                      class="form-control text-white"
                      id="address"
                    />
                  </div>
                  <div class="mb-3">
                    <label for="phone" class="form-label fw-bold">
                      Số điện thoại
                    </label>
                    <input
                    onChange={e=>handle(e)}
                      type="text"
                      placeholder="Nhập số điện thoại.."
                      class="form-control text-white"
                      id="phone"
                    />
                  </div>
                  <div class="mb-3">
                    <label for="birthdate" class="form-label fw-bold">
                      Ngày sinh
                    </label>
                    <input
                    onChange={e=>handle(e)}
                      type="date"
                      class="form-control text-white"
                      id="birthdate"
                    />
                  </div>
                  <div class="mt-5 py-1">
                    {productPath ? (
                      <input
                        type="file"
                        onChange={e=>handle(e)}
                        class="form-control"
                        multiple
                        id="files"
                      />
                    ) : (
                      <input type="file" class="form-control" onChange={e=>handle(e)} id="files" />
                    )}
                  </div>
                </div>
              </div>
              <div className="mb-5 mt-5 col-12">
                <button className="btn btn-danger rounded-1 py-2 w-100">
                  Thêm
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default NewUser;
