import { useEffect, useState } from "react";
import { axiosx as axios } from "../../Helper";
import BgUser from "../../component/BgUser";
import { useSnackbar } from "notistack";
import { Link, useParams, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faRightFromBracket,
  faList,
  faCheck,
  faTelevision,
  faHome,
  faChevronRight,
} from "@fortawesome/free-solid-svg-icons";
const profileMenu = [
  { name: "Trang chủ người dùng", link: "/", icon: faHome },
  { name: "Trang sản phẩm", link: "/product/list", icon: faTelevision },
  { name: "Danh sách người dùng", link: "/admin/users", icon: faList },
  { name: "Phê duyệt bài đăng", link: "/admin/product/manager", icon: faCheck },
  { name: "Quản lý sản phẩm", link: "/admin/product/list", icon: faList },
  { name: "Đăng xuất", link: "/", icon: faRightFromBracket },
];
function Adduser() {
  let { enqueueSnackbar } = useSnackbar();
  let { id } = useParams();
  const navigate = useNavigate();
  let [avt, setAvt] = useState()
  let [data, setData] = useState({
    username: "",
    email: "",
    fullName: "",
    password: "",
    phoneNumber: "",
    address: "",
    file: "",
    sex: "",
    birthday: "",
  });
  let [dataUpdate, setDataUpdate] = useState({});
  let birthdate;
  if (dataUpdate && dataUpdate.birthday) {
    birthdate = dataUpdate.birthday.split(" ")[0];
  }
  console.log(JSON.parse(localStorage.getItem('userInfo')));
  let user = JSON.parse(localStorage.getItem("token"));
  useEffect(() => {
    if (axios) {
      axios
        .get(`/user/selectById/${id}`)
        .then((res) => setDataUpdate(res.data))
        .catch((err) => console.log(err));
    }
  }, []);
  console.log(id);
  const handle = (e) => {
    if (id) {
      let newData = { ...dataUpdate };
      delete newData.urlImageSet;
      newData[e.target.id] = e.target.value;
      if (e.target.id === "file") {
        newData[e.target.id] = e.target.files[0];
      }
      setDataUpdate(newData);
      console.log(newData);
    } else {
      let newData = { ...data };
      newData[e.target.id] = e.target.value;
      if (e.target.id === "file") {
        newData[e.target.id] = e.target.files[0];
        let file = e.target.files[0];
        file.preview = URL.createObjectURL(file)
        setAvt(file)
      }
      console.log(newData);
      setData(newData);
    }
  };
  const submit = (e) => {
    e.preventDefault();
    console.log(dataUpdate);

    if (id) {
      let formData = new FormData();
      formData.append("address", dataUpdate.address);
      formData.append("birthday", dataUpdate.birthday);
      formData.append("email", dataUpdate.email);
      formData.append("fullName", dataUpdate.fullName);
      formData.append("password", dataUpdate.password);
      formData.append("phoneNumber", dataUpdate.phoneNumber);
      formData.append("sex", dataUpdate.sex);
      formData.append("username", dataUpdate.username);
      formData.append("file", dataUpdate.file ?? new File([""], ""));
      axios
        .put(`/user/updateUserFile/${user.id}`, formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        })
        .then((res) => {
          console.log(res.data)
          
          enqueueSnackbar("Cập nhật thành công", { variant: "success" });
            localStorage.setItem("userInfo", JSON.stringify(res.data));
          navigate("/user/profile");
        })
        .catch((err) => {
          console.log(err)
          enqueueSnackbar("Cập nhật thất bại", { variant: "error" });
        });
    } else {
      let formData = new FormData();
      formData.append("address", data.address);
      formData.append("birthday", data.birthday);
      formData.append("email", data.email);
      formData.append("fullName", data.fullName);
      formData.append("password", data.password);
      formData.append("phoneNumber", data.phoneNumber);
      formData.append("sex", data.sex);
      formData.append("username", data.username);
      formData.append("file", data.file);
      axios
        .post(`/user/insertUserFile`, formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        })
        .then(() => {
          enqueueSnackbar("Tạo người dùng thành công", { variant: "success" });
          navigate("/admin/users");
        })
        .catch((error) => {
          enqueueSnackbar("Tạo người dùng thất bại", { variant: "error" });
        });
    }
  };
  const [show, setShow] = useState("false");

  return (
      <div className="row">
        <div
          className="col-3 bg-white rounded-2 p-0 ms-5"
          style={{ minHeight: "100vh" }}
        >
          <div className="w-100 sticky-top ">
            <div className="py-1 ps-3 mb-3">
              {profileMenu.map((item, index) => {
                return (
                  <Link
                    to={item.link}
                    key={index}
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
      <div className="col-8 bg-white rounded-2 p-3 ms-3">
        <form onSubmit={(e) => submit(e)}>
          <div className="px-5 py-3 text-start">
            <h1 className="mb-5 mt-5">Thêm người dùng</h1>
            <div className="row ">
              {id ? (
                <div className="row">
                  <div className="col-12 co-sm-12 col-md-12 col-lg-6 col-xl-6 pe-5">
                    <div class="mb-3">
                      <label for="email" class="form-label fw-bold">
                        Email
                      </label>
                      <input
                        required
                        onChange={(e) => handle(e)}
                        value={dataUpdate.email}
                        type="text"
                        placeholder="Nhập email..."
                        class="form-control"
                        readOnly
                        id="email"
                      />
                    </div>
                    <div class="mb-3">
                      <label for="username" class="form-label fw-bold">
                        Tên Tài khoản
                      </label>
                      <input
                        onChange={(e) => handle(e)}
                        required
                        value={dataUpdate.username}
                        type="text"
                        placeholder="Nhập tên tài khoản..."
                        class="form-control"
                        readOnly
                        id="username"
                      />
                    </div>
                    <div class="mb-3">
                      <label for="fullName" class="form-label fw-bold">
                        Họ tên
                      </label>
                      <input
                        onChange={(e) => handle(e)}
                        required
                        value={dataUpdate.fullName}
                        type="text"
                        placeholder="Nhập họ tên..."
                        class="form-control "
                        id="fullName"
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
                            required
                            type="radio"
                            name="inlineRadioOptions"
                            id="sex"
                            onChange={(e) => handle(e)}
                            value="female"
                            checked={dataUpdate.sex === "female"}
                          />
                          <label class="form-check-label" for="male">
                            Nam
                          </label>
                        </div>
                        <div class="form-check form-check-inline me-3">
                          <input
                            required
                            class="form-check-input"
                            type="radio"
                            name="inlineRadioOptions"
                            id="sex"
                            onChange={(e) => handle(e)}
                            value="male"
                            checked={dataUpdate.sex === "male"}
                          />
                          <label class="form-check-label" for="female">
                            Nữ
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
                        required
                        onChange={(e) => handle(e)}
                        value={dataUpdate ? dataUpdate.address : ""}
                        type="text"
                        placeholder="Nhập địa chỉ..."
                        class="form-control "
                        id="address"
                      />
                    </div>
                    <div class="mb-3">
                      <label for="phoneNumber" class="form-label fw-bold">
                        Số điện thoại
                      </label>
                      <input
                        required
                        onChange={(e) => handle(e)}
                        value={dataUpdate ? dataUpdate.phoneNumber : ""}
                        type="text"
                        placeholder="Nhập số điện thoại.."
                        class="form-control "
                        id="phoneNumber"
                      />
                    </div>
                    <div class="mb-3">
                      <label for="birthday" class="form-label fw-bold">
                        Ngày sinh
                      </label>
                      <input
                        required
                        onChange={(e) => handle(e)}
                        value={birthdate}
                        type="date"
                        class="form-control "
                        id="birthday"
                      />
                    </div>
                    {/* <div class="mb-3">
                      <label for="password" class="form-label fw-bold">
                        Mật khẩu
                      </label>
                      <input
                        required
                        onChange={(e) => handle(e)}
                        value={dataUpdate ? dataUpdate.password : ""}
                        type="password"
                        placeholder="Nhập mật khẩu.."
                        class="form-control "
                        id="password"
                      />
                    </div> */}
                    <div class="mb-3">
                    <label for="file" class="form-label fw-bold">
                        Hình đại diện
                      </label>
                    <input
                      type="file"
                      class="form-control"
                      onChange={(e) => handle(e)}
                      id="file"
                    />
                  </div>
                  {avt && (
                    <img src={avt.preview} alt="" />
                  )}
                  </div>

                </div>
              ) : (
                <div className="row">
                  <div className="col-12 co-sm-12 col-md-12 col-lg-6 col-xl-6 pe-5">
                    <div class="mb-3">
                      <label for="email" class="form-label fw-bold">
                        Email
                      </label>
                      <input
                        required
                        onChange={(e) => handle(e)}
                        type="text"
                        placeholder="Nhập email..."
                        class="form-control "
                        id="email"
                      />
                    </div>
                    <div class="mb-3">
                      <label for="username" class="form-label fw-bold">
                        Tên Tài khoản
                      </label>
                      <input
                        onChange={(e) => handle(e)}
                        required
                        type="text"
                        placeholder="Nhập tên tài khoản..."
                        class="form-control "
                        id="username"
                      />
                    </div>
                    <div class="mb-3">
                      <label for="fullName" class="form-label fw-bold">
                        Họ tên
                      </label>
                      <input
                        onChange={(e) => handle(e)}
                        required
                        type="text"
                        placeholder="Nhập họ tên..."
                        class="form-control "
                        id="fullName"
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
                            required
                            type="radio"
                            name="inlineRadioOptions"
                            id="sex"
                            onChange={(e) => handle(e)}
                            value="female"
                          />
                          <label class="form-check-label" for="male">
                            Nam
                          </label>
                        </div>
                        <div class="form-check form-check-inline me-3">
                          <input
                            required
                            class="form-check-input"
                            type="radio"
                            name="inlineRadioOptions"
                            id="sex"
                            onChange={(e) => handle(e)}
                            value="male"
                          />
                          <label class="form-check-label" for="female">
                            Nữ
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
                        required
                        onChange={(e) => handle(e)}
                        type="text"
                        placeholder="Nhập địa chỉ..."
                        class="form-control "
                        id="address"
                      />
                    </div>
                    <div class="mb-3">
                      <label for="phoneNumber" class="form-label fw-bold">
                        Số điện thoại
                      </label>
                      <input
                        required
                        onChange={(e) => handle(e)}
                        type="text"
                        placeholder="Nhập số điện thoại.."
                        class="form-control "
                        id="phoneNumber"
                      />
                    </div>
                    <div class="mb-3">
                      <label for="birthday" class="form-label fw-bold">
                        Ngày sinh
                      </label>
                      <input
                        required
                        onChange={(e) => handle(e)}
                        value={birthdate}
                        type="date"
                        class="form-control "
                        id="birthday"
                      />
                    </div>
                    <div class="mb-3">
                      <label for="password" class="form-label fw-bold">
                        Mật khẩu
                      </label>
                      <input
                        required
                        onChange={(e) => handle(e)}
                        type="password"
                        placeholder="Nhập mật khẩu.."
                        class="form-control "
                        id="password"
                      />
                    </div>
                  </div>
                  <div class="mt-3 col-12">
                    <input
                      type="file"
                      class="form-control"
                      onChange={(e) => handle(e)}
                      id="file"
                    />
                    {avt && (
                    <img src={avt.preview} className='mt-3' alt="" style={{width: '30%', heigth: '30%'}} />
                  )}
                  </div>
                </div>
              )}
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
  );
}

export default Adduser;
