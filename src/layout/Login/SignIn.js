import * as React from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import {useSnackbar} from 'notistack'

import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";


const theme = createTheme();

export default function SignIn() {
  const {enqueueSnackbar} = useSnackbar();
  const navigate = useNavigate();
  const [data, setData] = useState({});
  const [userList, setUserList] = useState()
  const handleData = (e) => {
    let newData = { ...data };
    newData[e.target.id] = e.target.value;
    setData(newData);
  };
  console.log(userList)
  useEffect(()=>{
    axios.get('http://localhost:8080/user/user-full')
    .then(res=>setUserList(res.data))
    .catch(err=>console.log(err))

  },[])
  console.log(data);
  const submit = (event) => {
    event.preventDefault();
    axios
      .post("http://localhost:8080/api/auth/signin", data)
      .then((res) => {
        enqueueSnackbar('Đăng nhập thành công', {variant: 'success'})
        localStorage.setItem("token", JSON.stringify(res.data));
        setTimeout(() => {
          window.location.href = "/"
        }, 1000);
      })
      .catch(() =>  enqueueSnackbar('Đăng nhập thất bại', {variant: 'error'}));
  };

  return (
    <ThemeProvider theme={theme}>
      <div
        className="d-flex justify-content-center align-items-center "
        style={{ height: "100vh" }}
      >
        <div className="bg-white col-4 rounded-3 py-1 shadow-sm">
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
                Đăng nhập
              </Typography>
              <Box component="form" onSubmit={submit} noValidate sx={{ mt: 1 }}>
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  onChange={(e) => handleData(e)}
                  id="usernameOrEmail"
                  label="Email hoặc tên tài khoản"
                  name="usernameOrEmail"
                  autoFocus
                />
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  name="password"
                  onChange={(e) => handleData(e)}
                  label="Mật khẩu"
                  type="password"
                  id="password"
                  autoComplete="Mật khẩu"
                />
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  sx={{ mt: 3, mb: 2 }}
                >
                  Đăng nhập
                </Button>
                <Grid >
                  <Grid item>
                    <Link to="/sign-up" variant="body2">
                      {"Bạn chưa có tài khoản? Đăng ký"}
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
