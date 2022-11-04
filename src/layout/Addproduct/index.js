import { useParams, useLocation } from 'react-router-dom'
import React, { useState, useEffect } from 'react';
import axios from 'axios';

function NewUser() {
    let { id } = useParams();
    console.log(id);
    let [data, setData] = useState({});
    let [loading, setLoading] = useState(false);
    let [dataUpdate, setDataUpdate] = useState({});
    useEffect(() => { 
        if (id) {
            setLoading(true);
            axios.get(`http://localhost:8080/product/selectById/${id}`)
                .then(res => {
                    console.log(res.data);
                    setDataUpdate(res.data);
                    setLoading(false);
                })
        }
    },[])
    const handle = e => {
        if (id) {
            let newData = { ...dataUpdate }
            newData[e.target.id] = e.target.value;
            if (e.target.id === "files") {
                newData[e.target.id] = e.target.files;
            }
            setDataUpdate(newData);
        } else {
            let newData = { ...data }
            newData[e.target.id] = e.target.value;
            if (e.target.id === "files") {
                newData[e.target.id] = e.target.files;
            }
            console.log(newData);
            setData(newData);
        }
    }
    const submit = e => {
        e.preventDefault();

        if (id) {
            axios.put(`http://localhost:8080/product/update/${id}`, dataUpdate)
                .then(res => {
                    console.log('success');
                })
                .catch(err => {
                    console.log(err);
                })
        } else {
            let formData = new FormData();
            formData.append("productName", data.productName)
            formData.append("price", data.price)
            formData.append("description", data.description)
            formData.append("tradePark", data.tradePark)
            // formData.append("category", data.category)
            if (data && data.files.length > 0) {
                for (let i = 0; i < data.files.length; i++) {
                    formData.append('files', data.files[i])
                }
            }
            axios.post("http://localhost:8080/product/insertProductAndMulFile?idUser=1&idCategory=1", formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            })
                .then(res => { console.log('success') })
                .catch(err => { console.log(err) })
        }
    }
    return (
        <div className="d-flex justify-content-center mt-5">
            <form encType='multipart/form-data' onSubmit={e=> submit(e)} className="col-7 border border-main">
                <div className="px-5 py-3 text-start">
                    <h1 className="mb-5">Thêm San pham</h1>
                    <div className="row ">
                        <div className="col-12 co-sm-12 col-md-12 col-lg-6 col-xl-6 pe-5">
                            <div class="mb-3">
                                <label for="productName" class="form-label fw-bold">Ten</label>
                                <input type="text" value={dataUpdate ? dataUpdate.productName:'' } onChange={e=> handle(e)} placeholder="Enter your name" class="form-control " id="productName" />
                            </div>
                            {/* <div class="mb-3">
                                <label for="fullname" class="form-label fw-bold">Danh muc</label>
                                <input type="text" placeholder="Enter your name" class="form-control " id="fullname" />
                            </div> */}
                            <div class="mb-3">
                                <label for="price" class="form-label fw-bold">Gia</label>
                                <input type="number" value={dataUpdate ? dataUpdate.price : ''} onChange={e => handle(e)} placeholder="Enter your name" class="form-control " id="price" />
                            </div>
                            <div class="mb-3">
                                <label for="description" class="form-label fw-bold">Mo ta</label>
                                <textarea type="text" value={dataUpdate ? dataUpdate.description : ''} onChange={e => handle(e)} placeholder="Enter your name" class="form-control " id="description"></textarea>
                            </div>
                            <div class="mb-3">
                                <label for="tradePark" class="form-label fw-bold">tradepark</label>
                                <input type="text" value={dataUpdate ? dataUpdate.tradePark : ''} onChange={e => handle(e)} placeholder="Enter your name" class="form-control " id="tradePark" />
                            </div>
                            <div class="mb-3 py-1">
                                <input type="file" multiple onChange={e => handle(e)} class="form-control" id="files" />
                            </div>
                        </div>
                    </div>
                    <div className="mb-5 mt-5 col-12">
                        <button type='submit' className="btn btn-danger rounded-1 py-2 w-100">Thêm</button>
                    </div>
                </div>
            </form>
        </div>
    );
}

export default NewUser;