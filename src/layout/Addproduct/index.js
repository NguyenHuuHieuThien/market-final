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
  // useEffect
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
          .get(`/product/selectById/${id}`)
          .then((res) => {
            console.log(res.data);
            setDataUpdate(res.data);
          })
          .catch((err) => console.log(err));
      }
    }
  }, []);

  // handle data product
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

  // add and edit product
  const submit = (e) => {
    e.preventDefault();
    if (id) {
      let formData = new FormData();
      formData.append("productName", dataUpdate.productName);
      formData.append("price", dataUpdate.price);
      formData.append("status", dataUpdate.status);
      formData.append("description", dataUpdate.description);
      formData.append("tradePark", dataUpdate.tradePark);
      formData.append("amount", dataUpdate.amount);
      if (dataUpdate.files && dataUpdate.files.length > 0) {
        for (let i = 0; i < dataUpdate.files.length; i++) {
          formData.append("files", dataUpdate.files[i]);
        }
      }else{
        formData.append("files", new File([""], ""));
      }
      axios.put(`/product/update/${id}`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        }, }).then((res) => {
        enqueueSnackbar("S???a th??nh c??ng", { variant: "success" });
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
          enqueueSnackbar("Th??m s???n ph???m th??nh c??ng", { variant: "success" });
          navigate("/product/list");
        })
        .catch(() =>
          enqueueSnackbar("Th??m s???n ph???m th???t b???i", { variant: "error" })
        );
    }
  };
  return (
    <div>
        <BgUser>
          <form onSubmit={(e) => submit(e)}>
            <div className="ms-3 me-3 py-3 text-start">
              <h1 className="mb-5">????ng S???n ph???m</h1>
              {id && dataUpdate ? (
                <div>
                  <div className="row">
                    <div className="col-12 co-sm-12 col-md-12 col-lg-6 col-xl-6 text-black">
                      <div class="mb-3">
                        <label for="productName" class="form-label fw-bold">
                          T??n s???n ph???m
                        </label>
                        <input
                          disabled
                          onChange={(e) => handle(e)}
                          required
                          value={dataUpdate && dataUpdate.productName}
                          type="text"
                          placeholder="Nh???p t??n s???n ph???m..."
                          class="form-control"
                          id="productName"
                        />
                      </div>
                      <div class="mb-3">
                        <label for="price" class="form-label fw-bold">
                          Gi??
                        </label>
                        <input
                          disabled
                          onChange={(e) => handle(e)}
                          required
                          value={dataUpdate && dataUpdate.price}
                          type="number"
                          placeholder="Nh???p gi??..."
                          class="form-control disabled"
                          id="price"
                        />
                      </div>
                    </div>
                    <div className="col-12 co-sm-12 col-md-12 col-lg-6 col-xl-6">
                      <div class="mb-3">
                        <label for="amount" class="form-label fw-bold">
                          S??? l?????ng
                        </label>
                        <input
                          onChange={(e) => handle(e)}
                          required
                          type="text"
                          value={dataUpdate && dataUpdate.amount}
                          placeholder="Nh???p s??? l?????ng..."
                          class="form-control"
                          id="amount"
                        />
                      </div>
                      <div class="mb-3">
                        <label for="productName" class="form-label fw-bold">
                          Lo???i s???n ph???m
                        </label>
                        <select
                          disabled
                          class="form-select"
                          value={dataUpdate && dataUpdate.idCategory}
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
                      Th??m h??nh
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
                      M?? t???
                    </label>
                    <textarea
                      class="form-control"
                      onChange={(e) => handle(e)}
                      value={dataUpdate && dataUpdate.description}
                      placeholder="Nh???p m?? t???..."
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
                          T??n s???n ph???m
                        </label>
                        <input
                          onChange={(e) => handle(e)}
                          required
                          type="text"
                          placeholder="Nh???p t??n s???n ph???m..."
                          class="form-control"
                          id="productName"
                        />
                      </div>
                      <div class="mb-3">
                        <label for="price" class="form-label fw-bold">
                          Gi??
                        </label>
                        <input
                          onChange={(e) => handle(e)}
                          required
                          type="number"
                          placeholder="Nh???p gi??..."
                          class="form-control disabled"
                          id="price"
                        />
                      </div>
                    </div>
                    <div className="col-12 co-sm-12 col-md-12 col-lg-6 col-xl-6">
                      <div class="mb-3">
                        <label for="amount" class="form-label fw-bold">
                          S??? l?????ng
                        </label>
                        <input
                          onChange={(e) => handle(e)}
                          required
                          type="text"
                          placeholder="Nh???p s??? l?????ng..."
                          class="form-control"
                          id="amount"
                        />
                      </div>
                      <div class="mb-3">
                        <label for="productName" class="form-label fw-bold">
                          Lo???i s???n ph???m
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
                      Th??m h??nh
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
                      M?? t???
                    </label>
                    <textarea
                      class="form-control"
                      onChange={(e) => handle(e)}
                      placeholder="Nh???p m?? t???..."
                      id="description"
                      rows="5"
                    ></textarea>
                  </div>
                </div>
              )}
              <div className="mb-5 mt-5 col-12">
                <button className="btn btn-danger rounded-1 py-2 w-100">
                  L??u
                </button>
              </div>
            </div>
          </form>
        </BgUser>
    </div>
  );
}
