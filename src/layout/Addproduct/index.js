import { useEffect, useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { axiosx as axios } from "../../Helper";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { useSnackbar } from "notistack";
import BgUser from "../../component/BgUser";
export default function AddproductPage() {
  const { enqueueSnackbar } = useSnackbar();
  let { id } = useParams();
  let [dataUpdate, setDataUpdate] = useState({});
  const [data, setData] = useState({
    productName: "",
    category: "",
    price: "",
    amount: "",
    description: "",
    files: "",
    tradePark: "",
  });
  const [categories, setCategories] = useState([]);
  const [idcategory, setIdCategory] = useState(1);
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("token"));
  useEffect(() => {
    if (axios) {
      axios
        .get("/category/searchAll")
        .then((res) => {
          console.log(res.data);
          setCategories(res.data);
        })
        .catch((err) => console.log(err));
      if (id) {
        axios
          .get(`/product/selectByMulId/?mulId=${id}`)
          .then((res) => {
            console.log(res.data);
            setDataUpdate(res.data[0]);
          })
          .catch((err) => console.log(err));
      }
    }
  }, []);
  const handle = (e) => {
    if (id) {
      let newData = { ...dataUpdate };
      newData[e.target.id] = e.target.value;
      if (e.target.id === "files") {
        newData[e.target.id] = e.target.files;
      }
      setDataUpdate(newData);
    } else {
      let newData = { ...data };
      newData[e.target.id] = e.target.value;
      if (e.target.id === "files") {
        newData[e.target.id] = e.target.files;
      }
      setData(newData);
    }
  };

  const submit = (e) => {
    e.preventDefault();
    if (id) {
      axios.put(`/product/update/${id}`, dataUpdate).then((res) => {
        enqueueSnackbar("Sửa thành công", { variant: "success" });
      });
    } else {
      let formData = new FormData();
      formData.append("productName", data.productName);
      formData.append("price", data.price);
      formData.append("description", data.description);
      formData.append("tradePark", data.tradePark);
      formData.append("amount", data.amount);
      if (data && data.files.length > 0) {
        for (let i = 0; i < data.files.length; i++) {
          formData.append("files", data.files[i]);
        }
      }

      axios
        .post(
          `/product/insertProductAndMulFile?idUser=${user.id}&idCategory=${idcategory}`,
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        )
        .then((res) => {
          enqueueSnackbar("Thêm sản phẩm thành công", { variant: "success" });
          navigate("/product/list");
        })
        .catch(() =>
          enqueueSnackbar("Thêm sản phẩm thất bại", { variant: "error" })
        );
    }
  };
  return (
    <div>
      {!user|| user.roles[0] === "ROLE_USER"  ? (
        <div>
          <div class="alert alert-danger" role="alert">
            Bạn không có quyền truy cập. Để được đăng sản phẩm bạn hãy đăng ký
            một tài khoản mới với cấp độ người bán
          </div>
          <Link to="/">
            <button className="btn btn-warning text-white">
              <FontAwesomeIcon icon={faArrowLeft} className="me-2" />
              Quay lại
            </button>
          </Link>
        </div>
      ) : (
        <BgUser>
          <form onSubmit={(e) => submit(e)}>
            <div className="ms-3 me-3 py-3 text-start">
              <h1 className="mb-5">Đăng bán Sản phẩm</h1>
              {id ? (
                <div>
                  <div className="row">
                    <div className="col-12 co-sm-12 col-md-12 col-lg-6 col-xl-6 text-black">
                      <div class="mb-3">
                        <label for="productName" class="form-label fw-bold">
                          Tên sản phẩm
                        </label>
                        <input
                          disabled
                          onChange={(e) => handle(e)}
                          required
                          value={dataUpdate && dataUpdate.productName}
                          type="text"
                          placeholder="Nhập tên sản phẩm..."
                          class="form-control"
                          id="productName"
                        />
                      </div>
                      <div class="mb-3">
                        <label for="price" class="form-label fw-bold">
                          Giá
                        </label>
                        <input
                          disabled
                          onChange={(e) => handle(e)}
                          required
                          value={dataUpdate && dataUpdate.price}
                          type="number"
                          placeholder="Nhập giá..."
                          class="form-control disabled"
                          id="price"
                        />
                      </div>
                    </div>
                    <div className="col-12 co-sm-12 col-md-12 col-lg-6 col-xl-6">
                      <div className="row p-0">
                        <div className="col-12 co-sm-12 col-md-12 col-lg-6 col-xl-6">
                          <div class="mb-3">
                            <label for="amount" class="form-label fw-bold">
                              Số lượng
                            </label>
                            <input
                              onChange={(e) => handle(e)}
                              required
                              type="text"
                              value={dataUpdate.amount}
                              placeholder="Nhập số lượng..."
                              class="form-control"
                              id="amount"
                            />
                          </div>
                        </div>

                        <div className="col-12 co-sm-12 col-md-12 col-lg-6 col-xl-6">
                          <div class="mb-3">
                            <label for="tradePark" class="form-label fw-bold">
                              Trade Park
                            </label>
                            <input
                              disabled
                              onChange={(e) => handle(e)}
                              required
                              value={dataUpdate && dataUpdate.tradePark}
                              type="text"
                              placeholder="Nhập trade park..."
                              class="form-control"
                              id="tradePark"
                            />
                          </div>
                        </div>
                      </div>
                      <div class="mb-3">
                        <label for="productName" class="form-label fw-bold">
                          Loại sản phẩm
                        </label>
                        <select
                          disabled
                          class="form-select"
                          value={dataUpdate.idCategory}
                          onChange={(e) =>
                            setIdCategory(Number(e.target.value))
                          }
                        >
                          {categories &&
                            categories.length > 0 &&
                            categories.map((item) => (
                              <option
                                key={item.idCategory}
                                value={item.idCategory}
                              >
                                {item.categoryName}
                              </option>
                            ))}
                        </select>
                      </div>
                    </div>
                  </div>
                  <div class="mb-3">
                    <label for="file" class="form-label fw-bold">
                      Thêm hình
                    </label>
                    <input
                      type="file"
                      multiple
                      class="form-control"
                      onChange={(e) => handle(e)}
                      id="files"
                    />
                  </div>
                  <div class="mb-3">
                    <label for="description" class="form-label fw-bold">
                      Mô tả
                    </label>
                    <textarea
                      class="form-control"
                      onChange={(e) => handle(e)}
                      value={dataUpdate && dataUpdate.description}
                      placeholder="Nhập mô tả..."
                      id="description"
                      rows="5"
                    ></textarea>
                  </div>
                </div>
              ) : (
                <div>
                  <div className="row">
                    <div className="col-12 co-sm-12 col-md-12 col-lg-6 col-xl-6 text-black">
                      <div class="mb-3">
                        <label for="productName" class="form-label fw-bold">
                          Tên sản phẩm
                        </label>
                        <input
                          onChange={(e) => handle(e)}
                          required
                          type="text"
                          placeholder="Nhập tên sản phẩm..."
                          class="form-control"
                          id="productName"
                        />
                      </div>
                      <div class="mb-3">
                        <label for="price" class="form-label fw-bold">
                          Giá
                        </label>
                        <input
                          onChange={(e) => handle(e)}
                          required
                          type="number"
                          placeholder="Nhập giá..."
                          class="form-control disabled"
                          id="price"
                        />
                      </div>
                    </div>
                    <div className="col-12 co-sm-12 col-md-12 col-lg-6 col-xl-6">
                      <div className="row">
                        <div className="col-12 co-sm-12 col-md-12 col-lg-6 col-xl-6">
                          <div class="mb-3">
                            <label for="amount" class="form-label fw-bold">
                              Số lượng
                            </label>
                            <input
                              onChange={(e) => handle(e)}
                              required
                              type="text"
                              placeholder="Nhập số lượng..."
                              class="form-control"
                              id="amount"
                            />
                          </div>
                        </div>
                        <div className="col-12 co-sm-12 col-md-12 col-lg-6 col-xl-6">
                          <div class="mb-3">
                            <label for="tradePark" class="form-label fw-bold">
                              Trade Park
                            </label>
                            <input
                              onChange={(e) => handle(e)}
                              required
                              type="text"
                              placeholder="Nhập trade park..."
                              class="form-control"
                              id="tradePark"
                            />
                          </div>
                        </div>
                      </div>
                      <div class="mb-3">
                        <label for="productName" class="form-label fw-bold">
                          Loại sản phẩm
                        </label>
                        <select
                          class="form-select"
                          onChange={(e) =>
                            setIdCategory(Number(e.target.value))
                          }
                        >
                          {categories &&
                            categories.length > 0 &&
                            categories.map((item) => (
                              <option
                                key={item.idCategory}
                                value={item.idCategory}
                              >
                                {item.categoryName}
                              </option>
                            ))}
                        </select>
                      </div>
                    </div>
                  </div>
                  <div class="mb-3">
                    <label for="file" class="form-label fw-bold">
                      Thêm hình
                    </label>
                    <input
                      type="file"
                      required
                      multiple
                      class="form-control"
                      onChange={(e) => handle(e)}
                      id="files"
                    />
                  </div>
                  <div class="mb-3">
                    <label for="description" class="form-label fw-bold">
                      Mô tả
                    </label>
                    <textarea
                      class="form-control"
                      onChange={(e) => handle(e)}
                      placeholder="Nhập mô tả..."
                      id="description"
                      rows="5"
                    ></textarea>
                  </div>
                </div>
              )}
              <div className="mb-5 mt-5 col-12">
                <button className="btn btn-danger rounded-1 py-2 w-100">
                  Lưu
                </button>
              </div>
            </div>
          </form>
        </BgUser>
      )}
    </div>
  );
}
