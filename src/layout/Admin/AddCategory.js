
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { axiosx as axios } from "../../Helper";

import BgUser from "../../component/BgUser";
export default function AddCatefory() {
  let { id } = useParams();
  let [dataUpdate, setDataUpdate] = useState({});
  const [data, setData] = useState({
    categoryName: "",
  });
  const [categories, setCategories] = useState([])
  useEffect(() => {
    if (axios) {
      axios.get('/category/searchAll')
      .then(res=>setCategories(res.data))
      .catch(err=>console.log(err))
     if(id){
      axios
      .get(`/product/selectById/${id}`)
      .then((res) => setDataUpdate(res.data))
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
        console.log(res);
      });
    } else {
      let formData = new FormData();
      formData.append("productName", data.productName);
      formData.append("price", data.price);
      formData.append("description", data.description);
      formData.append("tradePark", data.tradePark);
      if (data && data.files.length > 0) {
        for (let i = 0; i < data.files.length; i++) {
          formData.append("files", data.files[i]);
        }
      }

      axios
        .post(`/product/insertProductAndMulFile?idUser=1&idCategory=1`, formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        })
        .then((res) => {
          console.log(res);
        });
    }
  };
  return (
    <BgUser>
      <form onSubmit={(e) => submit(e)}>
        <div className="px-5 py-3 text-start">
          <h1 className="mb-5 mt-5"></h1>
          <div className="row">
            <div className="col-12 co-sm-12 col-md-12 col-lg-6 col-xl-6 pe-5 text-black">
              <div class="mb-3">
                <label for="productName" class="form-label fw-bold">
                  T??n s???n ph???m
                </label>
                <input
                required
                  onChange={(e) => handle(e)}
                  value={dataUpdate ? dataUpdate.productName : ""}
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
                required
                  onChange={(e) => handle(e)}
                  value={dataUpdate ? dataUpdate.price : 0}
                  type="number"
                  placeholder="Nh???p gi??..."
                  class="form-control"
                  id="price"
                />
              </div>
            </div>
            <div className="col-12 co-sm-12 col-md-12 col-lg-6 col-xl-6 ps-5">
              <div className="row">
                <div className="col-6">
                  <div class="mb-3">
                    <label for="amount" class="form-label fw-bold">
                      S??? l?????ng
                    </label>
                    <input
                    required
                      onChange={(e) => handle(e)}
                      type="text"
                      placeholder="Nh???p s??? l?????ng..."
                      class="form-control"
                      id="amount"
                    />
                  </div>
                </div>

                <div className="col-6">
                  <div class="mb-3">
                    <label for="tradePark" class="form-label fw-bold">
                      Trade Park
                    </label>
                    <input
                    required
                      onChange={(e) => handle(e)}
                      value={dataUpdate ? dataUpdate.tradePark : ""}
                      type="text"
                      placeholder="Nh???p trade park..."
                      class="form-control"
                      id="tradePark"
                    />
                  </div>
                </div>
              </div>
              <div class="mb-3">
                <label for="productName" class="form-label fw-bold">
                  Lo???i s???n ph???m
                </label>
                <select class="form-select">
                  {categories && categories.length> 0 && categories.map(item=>
                    <option key={item.idCategory} value={item.idCategory}>{item.categoryName}</option>)}
                </select>
              </div>
            </div>
          </div>
          <div class="mb-3">
          <label for="file" class="form-label fw-bold">
                  Th??m h??nh
                </label>
                <input
                required
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
              value={dataUpdate ? dataUpdate.description : ""}
              placeholder="Nh???p m?? t???..."
              id="description"
              rows="3"
            ></textarea>
          </div>
          <div className="mb-5 mt-5 col-12">
            <button className="btn btn-danger rounded-1 py-2 w-100">L??u</button>
          </div>
        </div>
      </form>
    </BgUser>
  );
}
