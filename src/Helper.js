import axios from "axios";
export const axiosx = (() => {
  let token = JSON.parse(localStorage.getItem("token"));
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
