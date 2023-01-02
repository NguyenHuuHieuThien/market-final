import { useEffect, useState } from "react";
import { axiosx as axios } from "../../Helper";
import BgUser from "../../component/BgUser";
import { useFormik } from "formik";
import { useSnackbar } from "notistack";
import * as Yup from "yup";
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
  let [avt, setAvt] = useState();
  let [dataUpdate, setDataUpdate] = useState({});
  let birthdate;
  console.log(dataUpdate)
  if (dataUpdate && dataUpdate.birthday) {
    birthdate = dataUpdate.birthday.split(" ")[0];
  }
  console.log(JSON.parse(localStorage.getItem("userInfo")));
  let user = JSON.parse(localStorage.getItem("token"));
  const formik = useFormik({
    initialValues: {
      username: "",
      email: "",
      fullName: "",
      phoneNumber: "",
      password: "",
      address: "",
      birthday: "",
      sex: "",
      file: new File([""], "noavt.jpg", { type: "image/jpeg" }),
    },
    validationSchema: Yup.object({
      fullName: Yup.string()
        .required("*Bắt buộc")
        .min(4, "Tên phải lớn hơn 4 ký tự"),
      username: Yup.string()
        .required("*Bắt buộc")
        .min(4, "Tên phải lớn hơn 4 ký tự"),
      email: Yup.string()
        .required("*Bắt buộc")
        .matches(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/, "Email không hợp lệ"),
      // // password: Yup.string()
      // //   .required("*Bắt buộc")
      // //   .matches(
      // //     /^(?=.*[a-zA-Z])(?=.*\d)(?=.*[!@#$%^&*()_+])[A-Za-z\d][A-Za-z\d!@#$%^&*()_+]{7,19}$/,
      // //     "Mật khẩu phải có 7-19 ký tự và chứa ít nhất một chữ cái, một số và một ký tự đặc biệt"
      // //   ),
      phoneNumber: Yup.string()
        .required("*Bắt buộc")
        .matches(
          /^(\+\d{1,2}\s)?\(?\d{3}\)?[\s.-]?\d{3}[\s.-]?\d{4}$/,
          "Số điện thoại không hợp lệ"
        ),
      address: Yup.string()
        .required("*Bắt buộc")
        .min(4, "Địa chỉ phải lớn hơn 10 ký tự"),
      birthday: Yup.string().required("*Bắt buộc"),
      sex: Yup.string().required("*Bắt buộc"),
    }),
    onSubmit: (values) => {
      console.log(values)
      if(id){
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
        .put(`/user/updateUserFile/${id}`, formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        })
        .then((res) => {
          console.log(res.data);
          enqueueSnackbar("Cập nhật thành công", { variant: "success" });
          localStorage.setItem("userInfo", JSON.stringify(res.data));
        })
        .catch((err) => {
          console.log(err);
          enqueueSnackbar("Cập nhật thất bại", { variant: "error" });
        });
      }
      else{
        let formData = new FormData();
        formData.append("name", values.fullName);
        formData.append("username", values.username);
        formData.append("email", values.email);
        formData.append("password", values.password);
        formData.append("phoneNumber", values.phoneNumber);
        formData.append("address", values.address);
        formData.append("sex", values.sex);
        formData.append("birthday", values.birthday);
        formData.append("file", values.file);
        axios
          .post("/api/auth/signup", formData, {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          })
          .then(() => {
            enqueueSnackbar("Tạo người dùng thành công", { variant: "success" });
            navigate("/admin/users");
          })
          .catch((err) => {
            enqueueSnackbar(err.response.data.message, { variant: "error" });
          });
      }
    },
  });
  // useEffect
  useEffect(() => {
    if (id) {
      axios
        .get(`/user/selectById/${id}`)
        .then((res) => {
          setDataUpdate(res.data)
        })
        .catch((err) => console.log(err));
    }
  }, []);

  // handle data
  const handle = (e) => {
      let newData = { ...dataUpdate };
      delete newData.urlImageSet
      newData[e.target.id] = e.target.value;
      if (e.target.id === "file") {
        newData[e.target.id] = e.target.files[0];
      }
      formik.setValues(newData)
      setDataUpdate(newData);
      console.log(newData)
  };
  console.log(formik.values)

  // submit
  // const submit = (e) => {
  //   e.preventDefault();
  //   console.log(dataUpdate);

  //   if (id) {
  //     let formData = new FormData();
  //     formData.append("address", dataUpdate.address);
  //     formData.append("birthday", dataUpdate.birthday);
  //     formData.append("email", dataUpdate.email);
  //     formData.append("fullName", dataUpdate.fullName);
  //     formData.append("password", dataUpdate.password);
  //     formData.append("phoneNumber", dataUpdate.phoneNumber);
  //     formData.append("sex", dataUpdate.sex);
  //     formData.append("username", dataUpdate.username);
  //     formData.append("file", dataUpdate.file ?? new File([""], ""));
  //     axios
  //       .put(`/user/updateUserFile/${user.id}`, formData, {
  //         headers: {
  //           "Content-Type": "multipart/form-data",
  //         },
  //       })
  //       .then((res) => {
  //         console.log(res.data);

  //         enqueueSnackbar("Cập nhật thành công", { variant: "success" });
  //         localStorage.setItem("userInfo", JSON.stringify(res.data));
  //         navigate("/user/profile");
  //       })
  //       .catch((err) => {
  //         console.log(err);
  //         enqueueSnackbar("Cập nhật thất bại", { variant: "error" });
  //       });
  //   } else {
  //     let formData = new FormData();
  //     formData.append("address", data.address);
  //     formData.append("birthday", data.birthday);
  //     formData.append("email", data.email);
  //     formData.append("fullName", data.fullName);
  //     formData.append("password", data.password);
  //     formData.append("phoneNumber", data.phoneNumber);
  //     formData.append("sex", data.sex);
  //     formData.append("username", data.username);
  //     formData.append("file", data.file ?? new File([""], ""));
  //     axios
  //       .post(`/user/insertUserFile`, formData, {
  //         headers: {
  //           "Content-Type": "multipart/form-data",
  //         },
  //       })
  //       .then(() => {
  //         enqueueSnackbar("Tạo người dùng thành công", { variant: "success" });
  //         navigate("/admin/users");
  //       })
  //       .catch((error) => {
  //         enqueueSnackbar("Tạo người dùng thất bại", { variant: "error" });
  //       });
  //   }
  // };

  return (
    <div className="mt-3 bg-main" style={{ minHeight: "100vh" }}>
      <div className="row">
        <div
          className="col-3 bg-white rounded-2 p-0 ms-4"
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

        {/* add and update user */}
        <div className="col-8 bg-white rounded-2 p-3 ms-3">
          <form onSubmit={formik.handleSubmit}>
                {id ? (
                   <div className="px-5 py-3 text-start">
                   <h1 className="mb-5 mt-5">Chỉnh sửa người dùng</h1>
                  <div className="row">
                    <div className="col-12 co-sm-12 col-md-12 col-lg-6 col-xl-6 pe-5">
                      <div class="mb-3">
                        <label for="email" class="form-label fw-bold">
                          Email
                        </label>
                        <input
                          required
                          onChange={e=>handle(e)}
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
                           onChange={e=>handle(e)}
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
                           onChange={e=>handle(e)}
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
                              name="sex"
                              id="sex"
                              onChange={e=>handle(e)}
                              value="female"
                              checked={dataUpdate.sex === "female"}
                            />
                            <label class="form-check-label" for="male">
                              Nữ
                            </label>
                          </div>
                          <div class="form-check form-check-inline me-3">
                            <input
                              required
                              class="form-check-input"
                              type="radio"
                              name="sex"
                              id="sex"
                              onChange={e=>handle(e)}
                              value="male"
                              checked={dataUpdate.sex === "male"}
                            />
                            <label class="form-check-label" for="female">
                              Nam
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
                          onChange={e=>handle(e)}
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
                          onChange={e=>handle(e)}
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
                          onChange={e=>handle(e)}
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
                          onChange={e=>handle(e)}
                          id="file"
                        />
                      </div>
                      {avt && <img src={avt.preview} alt="" />}
                    </div>
                  </div>
                  </div>
                ) : (
                  <div className="px-5 py-3 text-start">
                  <h1 className="mb-5 mt-5">Thêm người dùng</h1>
                  <div className="row">
                    <div className="col-12 co-sm-12 col-md-12 col-lg-6 col-xl-6 pe-5">
                      <div class="mb-3">
                        <label for="email" class="form-label fw-bold">
                          Email
                        </label>
                        <input
                          required
                          onChange={formik.handleChange}
                          type="text"
                          placeholder="Nhập email..."
                          class="form-control "
                          id="email"
                        />
                        {formik.errors.email && (
                          <p className="errorMsg text-start mt-2">
                            {" "}
                            {formik.errors.email}{" "}
                          </p>
                        )}
                      </div>
                      <div class="mb-3">
                        <label for="username" class="form-label fw-bold">
                          Tên Tài khoản
                        </label>
                        <input
                          onChange={formik.handleChange}
                          required
                          type="text"
                          placeholder="Nhập tên tài khoản..."
                          class="form-control "
                          id="username"
                        />
                        {formik.errors.username && (
                          <p className="errorMsg text-start mt-2">
                            {" "}
                            {formik.errors.username}{" "}
                          </p>
                        )}
                      </div>
                      <div class="mb-3">
                        <label for="fullName" class="form-label fw-bold">
                          Họ tên
                        </label>
                        <input
                          onChange={formik.handleChange}
                          required
                          type="text"
                          placeholder="Nhập họ tên..."
                          class="form-control "
                          id="fullName"
                        />
                        {formik.errors.fullName && (
                          <p className="errorMsg text-start mt-2">
                            {" "}
                            {formik.errors.fullName}{" "}
                          </p>
                        )}
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
                              name="sex"
                              id="sex"
                              onChange={formik.handleChange}
                              value="male"
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
                              name="sex"
                              id="sex"
                              onChange={formik.handleChange}
                              value="female"
                            />
                            <label class="form-check-label" for="female">
                              Nữ
                            </label>
                          </div>
                          {formik.errors.sex && (
                            <p className="errorMsg text-start mt-2">
                              {" "}
                              {formik.errors.sex}{" "}
                            </p>
                          )}
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
                          onChange={formik.handleChange}
                          type="text"
                          placeholder="Nhập địa chỉ..."
                          class="form-control "
                          id="address"
                        />
                        {formik.errors.address && (
                          <p className="errorMsg text-start mt-2">
                            {" "}
                            {formik.errors.address}{" "}
                          </p>
                        )}
                      </div>
                      <div class="mb-3">
                        <label for="phoneNumber" class="form-label fw-bold">
                          Số điện thoại
                        </label>
                        <input
                          required
                          onChange={formik.handleChange}
                          type="text"
                          placeholder="Nhập số điện thoại.."
                          class="form-control "
                          id="phoneNumber"
                        />
                        {formik.errors.phoneNumber && (
                          <p className="errorMsg text-start mt-2">
                            {" "}
                            {formik.errors.phoneNumber}{" "}
                          </p>
                        )}
                      </div>
                      <div class="mb-3">
                        <label for="birthday" class="form-label fw-bold">
                          Ngày sinh
                        </label>
                        <input
                          required
                          onChange={formik.handleChange}
                          value={birthdate}
                          type="date"
                          class="form-control "
                          id="birthday"
                        />
                        {formik.errors.birthday && (
                          <p className="errorMsg text-start mt-2">
                            {" "}
                            {formik.errors.birthday}{" "}
                          </p>
                        )}
                      </div>
                      <div class="mb-3">
                        <label for="password" class="form-label fw-bold">
                          Mật khẩu
                        </label>
                        <input
                          required
                          onChange={formik.handleChange}
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
                        onChange={(e) =>
                          formik.setFieldValue("file", e.target.files[0])
                        }
                        id="file"
                      />
                      {avt && (
                        <img
                          src={avt.preview}
                          className="mt-3"
                          alt=""
                          style={{ width: "30%", heigth: "30%" }}
                        />
                      )}
                    </div>
                  </div>
                  </div>
                )}
                <div className="mb-5 mt-5 col-12">
                  <button
                    type="submit"
                    className="btn btn-danger rounded-1 py-2 w-100"
                  >
                    Thêm
                  </button>
                </div>
              {/* </div> */}
          </form>
        </div>
      </div>
    </div>
  );
}

export default Adduser;
