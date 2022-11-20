import axios from "axios";
let token = JSON.parse(localStorage.getItem("token"));
export const axiosx = (() => {
  if (token) {
    return axios.create({
      baseURL: "http://localhost:8080/",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: `Bearer ${token.token}`,
      },
    });
  }
})();
