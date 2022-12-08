import * as React from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { Link } from "react-router-dom";
import FormGroup from "@mui/material/FormGroup";
import { useSnackbar } from "notistack";
import { faEye , faEyeSlash} from "@fortawesome/free-solid-svg-icons";

const theme = createTheme();

export default function SignUp() {
  const { enqueueSnackbar } = useSnackbar();
  const navigate = useNavigate();
  const [data, setData] = useState({});
  const [showpass, setShowPass] = useState(false)
  const [iconeye, setIconEye] = useState(faEye)
  const label = { inputProps: { "aria-label": "Switch demo" } };
  console.log(data);
  const handleData = (e) => {
    let newData = { ...data };
    newData[e.target.id] = e.target.value;
    console.log(newData)
    if (e.target.id === "file") {
      newData[e.target.id] = e.target.files[0];
    }
    console.log(data);
    setData(newData);
  };
//   const showPass = ()=>{
   
//     if(showpass){
//       setIconEye(faEyeSlash)
//     }else{
//         setIconEye(faEye)
//     }
//     setShowPass(!showpass)
// }
  const submit = (event) => {
    event.preventDefault();
    let formData = new FormData();
    formData.append("name", data.name);
    formData.append("username", data.username);
    formData.append("email", data.email);
    formData.append("password", data.password);
    formData.append("phoneNumber", data.phoneNumber);
    formData.append("address", data.address);
    formData.append("sex", data.sex);
    formData.append("birthday", data.birthday);
    formData.append("role", data.role);
    formData.append("file", data.file);

    axios
      .post("http://localhost:8080/api/auth/signup", formData)
      .then(() => {
        enqueueSnackbar("Đăng ký thành công", { variant: "success" });
        navigate("/sign-in");
      })
      .catch(() => enqueueSnackbar("Đăng ký thất bại", { variant: "error" }));
  };

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
                onSubmit={(e) => submit(e)}
                sx={{ mt: 3 }}
              >
                <Grid container spacing={2}>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      autoComplete="given-name"
                      name="username"
                      required
                      fullWidth
                      id="username"
                      onChange={(e) => handleData(e)}
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
                      onChange={(e) => handleData(e)}
                      name="name"
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <select
                      class="form-select"
                      aria-label="Default select example"
                       onChange={e=>handleData(e)}
                       id="role"        
                    >
                      <option value="mod" name="mode">Người bán</option>
                      <option value="user" name="user">Người mua</option>
                    </select>
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      required
                      fullWidth
                      id="email"
                      label="Email"
                      name="email"
                      onChange={(e) => handleData(e)}
                      autoComplete="email"
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      required
                      fullWidth
                      id="phoneNumber"
                      onChange={(e) => handleData(e)}
                      label="Số điện thoại"
                      name="phoneNumber"
                      autoComplete="Số điện thoại"
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      required
                      fullWidth
                      id="address"
                      onChange={(e) => handleData(e)}
                      label="Địa chỉ"
                      name="address"
                      autoComplete="Địa chỉ"
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <div className = 'd-flex justify-content-center align-items-center'>
                    <TextField
                      required
                      name="password"
                      onChange={(e) => handleData(e)}
                      label="Mật khẩu"
                      type={showpass ? "text" : "password"}
                      id="password"
                      className="w-100"
                      autoComplete="Mật khẩu"
                    />
                    <div onClick={()=> setShowPass(!showpass)} className="btn border border-main py-3 rounded-1"><FontAwesomeIcon className="px-2" icon={showpass? faEyeSlash: faEye}/></div>
                    </div>
                  </Grid>
                  <Grid item xs={12}>
                    <div class="form-check form-check-inline">
                      <input
                        class="form-check-input"
                        type="radio"
                        name="sex"
                        onChange={(e) => handleData(e)}
                        value="male"
                        id="sex"
                      />
                      <label class="form-check-label">Nam</label>
                    </div>
                    <div class="form-check form-check-inline">
                      <input
                        class="form-check-input"
                        type="radio"
                        name="sex"
                        onChange={(e) => handleData(e)}
                        value="female"
                        id="sex"
                      />
                      <label class="form-check-label">Nữ</label>
                    </div>
                  </Grid>

                  <Grid item xs={12}>
                    <TextField
                      required
                      fullWidth
                      label="Ngày sinh"
                      name="birthday"
                      onChange={(e) => handleData(e)}
                      type="date"
                      id="birthday"
                      placeholder=""
                    />
                  </Grid>

                  <Grid item xs={12}>
                    <TextField
                      required
                      fullWidth
                      name="file"
                      onChange={(e) => handleData(e)}
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
