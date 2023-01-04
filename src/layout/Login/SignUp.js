import * as React from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import { useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { Link } from "react-router-dom";
import FormGroup from "@mui/material/FormGroup";
import { useSnackbar } from "notistack";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";

const theme = createTheme();
export default function SignUp() {
  const { enqueueSnackbar } = useSnackbar();
  const navigate = useNavigate();
  const [showpass, setShowPass] = useState(false);
  const formik = useFormik({
    initialValues: {
      username: "",
      email: "",
      name: "",
      role: "",
      phoneNumber: "",
      password: "",
      confirmedPassword: "",
      address: "",
      birthday: "",
      sex: "",
      file: new File([""], "")
    },
    validationSchema: Yup.object({
      name: Yup.string()
        .required("*Bắt buộc")
        .min(4, "Tên phải lớn hơn 4 ký tự"),
      username: Yup.string()
        .required("*Bắt buộc")
        .min(4, "Tên phải lớn hơn 4 ký tự"),
      email: Yup.string()
        .required("*Bắt buộc")
        .matches(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/, "Email không hợp lệ"),
      password: Yup.string()
        .required("*Bắt buộc")
        .matches(
          /^(?=.*[a-zA-Z])(?=.*\d)(?=.*[!@#$%^&*()_+])[A-Za-z\d][A-Za-z\d!@#$%^&*()_+]{7,19}$/,
          "Mật khẩu phải có 7-19 ký tự và chứa ít nhất một chữ cái, một số và một ký tự đặc biệt"
        ),
      confirmedPassword: Yup.string()
        .required("*Bắt buộc")
        .oneOf([Yup.ref("password"), null], "Mật khẩu phải khớp"),
      phoneNumber: Yup.string()
        .required("*Bắt buộc")
        .matches(
          /^(\+\d{1,2}\s)?\(?\d{3}\)?[\s.-]?\d{3}[\s.-]?\d{4}$/,
          "Số điện thoại không hợp lệ"
        ),
      role: Yup.string().required("*Bắt buộc"),
      address: Yup.string()
        .required("*Bắt buộc")
        .min(4, "Địa chỉ phải lớn hơn 10 ký tự"),
      birthday: Yup.string().required("*Bắt buộc"),
      sex: Yup.string().required("*Bắt buộc"),
    }),
    onSubmit: (values) => {
      console.log(values)
    let formData = new FormData();
    formData.append("name", values.name);
    formData.append("username", values.username);
    formData.append("email", values.email);
    formData.append("password", values.password);
    formData.append("phoneNumber", values.phoneNumber);
    formData.append("address", values.address);
    formData.append("sex", values.sex);
    formData.append("birthday", values.birthday);
    formData.append("role", values.role);
    formData.append("file", values.file);
      console.log('error')
    axios
      .post("http://localhost:8080/api/auth/signup", formData)
      .then(() => {
        enqueueSnackbar("Đăng ký thành công", { variant: "success" });
        navigate("/sign-in");
      })
      .catch((err) => {
        console.log(err)
        enqueueSnackbar(err.response.data.message, { variant: "error" });
      });
  }
  });
  console.log(formik.values)
  return (
    <ThemeProvider theme={theme}>
      <div className="d-flex justify-content-center mt-5 align-items-center ">
        <div className="bg-white col-4 rounded-3 shadow-sm pb-5">
          <Container component="main" maxWidth="xs">
            <CssBaseline />
            <Box
              sx={{
                marginTop: 3,
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}
            >
              <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}></Avatar>
              <Typography component="h1" variant="h5">
                Đăng ký
              </Typography>
              <Box
                component="form"
                noValidate
                onSubmit={formik.handleSubmit}
                sx={{ mt: 3 }}
              >
                <Grid container spacing={2}>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      name="username"
                      required
                      fullWidth
                      id="username"
                      onChange={formik.handleChange}
                      label="Tên tài khoản"
                      autoFocus
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      required
                      fullWidth
                      id="name"
                      label="Họ tên"
                      onChange={formik.handleChange}
                      name="name"
                    />
                    {formik.errors.name && (
                      <p className="errorMsg text-start mt-2">
                        {" "}
                        {formik.errors.name}{" "}
                      </p>
                    )}
                  </Grid>
                  <Grid item xs={12}>
                  <div class="form-floating">
                    <select
                      class="form-select"
                      aria-label="Default select example"
                      onChange={formik.handleChange}
                      id="role"
                    >
                      <option selected value="" name="">
                        Chọn tài khoản
                      </option>
                      <option value="user" name="user">
                        Người mua
                      </option>
                      <option value="mod" name="mode">
                        Người bán
                      </option>
                    </select>
                    <label for="floatingSelect">Loại tài khoản</label>
                    </div>
                    {formik.errors.role && (
                      <p className="errorMsg text-start mt-2">
                        {" "}
                        {formik.errors.role}{" "}
                      </p>
                    )}
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      required
                      fullWidth
                      id="email"
                      label="Email"
                      name="email"
                      onChange={formik.handleChange}
                    />
                    {formik.errors.email && (
                      <p className="errorMsg text-start mt-2">
                        {" "}
                        {formik.errors.email}{" "}
                      </p>
                    )}
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      required
                      fullWidth
                      id="phoneNumber"
                      onChange={formik.handleChange}
                      label="Số điện thoại"
                      name="phoneNumber"
                    />
                    {formik.errors.phoneNumber && (
                      <p className="errorMsg text-start mt-2">
                        {" "}
                        {formik.errors.phoneNumber}{" "}
                      </p>
                    )}
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      required
                      fullWidth
                      id="address"
                      onChange={formik.handleChange}
                      label="Địa chỉ"
                      name="address"
                    />
                    {formik.errors.address && (
                      <p className="errorMsg text-start mt-2">
                        {" "}
                        {formik.errors.address}{" "}
                      </p>
                    )}
                  </Grid>
                  <Grid item xs={12}>
                    <div className="d-flex justify-content-center align-items-center">
                      <TextField
                        required
                        name="password"
                        onChange={formik.handleChange}
                        label="Mật khẩu"
                        type={showpass ? "text" : "password"}
                        id="password"
                        className="w-100"
                      />
                      <div
                        onClick={() => setShowPass(!showpass)}
                        className="btn border border-main py-3 rounded-1"
                      >
                        <FontAwesomeIcon
                          className="px-2"
                          icon={showpass ? faEyeSlash : faEye}
                        />
                      </div>
                    </div>
                    {formik.errors.password && (
                      <p className="errorMsg text-start mt-2">
                        {" "}
                        {formik.errors.password}{" "}
                      </p>
                    )}
                  </Grid>
                  <Grid item xs={12}>
                    <div className="d-flex justify-content-center align-items-center">
                      <TextField
                        required
                        name="confirmedPassword"
                        onChange={formik.handleChange}
                        label="Nhập lại mật khẩu"
                        type={showpass ? "text" : "password"}
                        id="confirmedPassword"
                        className="w-100"
                      />
                      <div
                        onClick={() => setShowPass(!showpass)}
                        className="btn border border-main py-3 rounded-1"
                      >
                        <FontAwesomeIcon
                          className="px-2"
                          icon={showpass ? faEyeSlash : faEye}
                        />
                      </div>
                    </div>
                    {formik.errors.confirmedPassword && (
                      <p className="errorMsg text-start mt-2">
                        {" "}
                        {formik.errors.confirmedPassword}{" "}
                      </p>
                    )}
                  </Grid>
                  <Grid item xs={12}>
                    <div class="form-floating">
                      <select
                        class="form-select"
                        id="sex"
                        onChange={formik.handleChange}
                      >
                        <option selected>-- Chọn giới tính --</option>
                        <option value="male">Nam</option>
                        <option value="female">Nữ</option>
                      </select>
                      <label for="floatingSelect">Giới tính</label>
                    </div>
                    {formik.errors.sex && (
                      <p className="errorMsg text-start mt-2">
                        {" "}
                        {formik.errors.sex}{" "}
                      </p>
                    )}
                  </Grid>

                  <Grid item xs={12}>
                    <TextField
                      required
                      fullWidth
                      label="Ngày sinh"
                      name="birthday"
                      onChange={formik.handleChange}
                      type="date"
                      id="birthday"
                      placeholder=""
                    />
                    {formik.errors.birthday && (
                      <p className="errorMsg text-start mt-2">
                        {" "}
                        {formik.errors.birthday}{" "}
                      </p>
                    )}
                  </Grid>

                  <Grid item xs={12}>
                    <TextField
                      required
                      fullWidth
                      name="file"
                      onChange={e=>formik.setFieldValue("file", e.target.files[0])}
                      type="file"
                      id="file"
                    />
                  </Grid>
                </Grid>
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  sx={{ mt: 3, mb: 2 }}
                >
                  Đăng ký
                </Button>
                <Grid>
                  <Grid item>
                    <Link to="/sign-in" role="button" variant="body2">
                      Bạn đã có sẵn một tài khoản? Đăng nhập
                    </Link>
                  </Grid>
                </Grid>
              </Box>
            </Box>
          </Container>
        </div>
      </div>
    </ThemeProvider>
  );
}
