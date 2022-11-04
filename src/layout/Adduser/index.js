
import { useState, useEffect } from "react";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { useParams, useNavigate } from 'react-router-dom';


import Navbars from "../../component/Navbars";
import Footer from "../../component/Footer";
function Adduser() {
    const navigate = useNavigate();
    let { id } = useParams();
    let userId = parseInt(id);
    console.log(typeof userId);

    const [data, setData] = useState({
        username: "",
        email: "",
        fullName:"",
        password: "",
        phoneName: "",
        address: "",
        file: "",
        sex: "",
        birthday: "",
    });
    const [dataUpdate, setDataUpdate] = useState({
    });
    console.log(dataUpdate);
    const handle = e => {
        if (id) {
            let newDataUpdate = { ...dataUpdate }
            newDataUpdate[e.target.name] = e.target.value;
            if (e.target.name === "file") {
                e.target.files[0] !== dataUpdate.file && (newDataUpdate.file = e.target.files[0]);
                console.log(e.target.files[0]);
            }
            setDataUpdate(newDataUpdate);
            console.log(dataUpdate);
        } else {
            let newData = { ...data }
            newData[e.target.id] = e.target.value;
            if (e.target.id === "file") {
                newData[e.target.id] = e.target.files[0];
            }
            setData(newData);
        }
        
    }
    useEffect(() => { 
        axios.get(`http://localhost:8080/user/selectById/${userId}`)
            .then(res => {
                console.log(res.data);
                setDataUpdate(res.data)
            })
        
    }, []);
    const handleSubmit = async(e) => {
        e.preventDefault(); 
        let formData = new FormData();
        let publicData = id ? dataUpdate : data;
        console.log(publicData);
        formData.append("address", data.address)
        formData.append("birthday", data.birthday)
        formData.append("email", data.email)
        formData.append("fullName", data.fullName)
        formData.append("password", data.password)
        formData.append("phoneNumber", data.phoneNumber)
        formData.append("sex", data.sex)
        formData.append("username", data.username)
        formData.append("file", data.file)

        // if (id) { 
            
        // } else { 
        //     axios.post(`http://localhost:8080/user/insertUserFile`, formData, {
        //     }).then(res => {
        //         console.log(res)
        //     }).catch(error=>{
        //         console.log(error)
        //     })
        // }
        axios.put(`http://localhost:8080/user/update/${id}`, dataUpdate, {
        })
            .then(res => {
                alert("Update success");
                navigate("/admin/users")
            }).catch(err => {
                console.log(err);
            })
        
    }
    
    return ( 
        <div>
            <Navbars />
            <div className="container mt-5 mb-5">
                <h1 className="mb-5">New User</h1>
                <div>
                    <form  onSubmit={e=>handleSubmit(e)}>
                        <div className="row">
                            <div className="col-12 col-sm-12 col-md-12 col-lg-6 col-xl-6 pe-5">                             
                                <div className="mb-3 d-flex flex-column justify-content-center">
                                    <div className="me-5 mb-5 text-center">
                                        {dataUpdate && dataUpdate.file.length>0 ? <img src={`http://localhost:8080/file/downloadFile/${dataUpdate.file[0].id}`} alt="" className="img-fluid" style={{ width: "200px", height: "200px", borderRadius: "50%" }} /> : <img src="https://www.pngitem.com/pimgs/m/146-1468479_my-profile-icon-blank-profile-picture-circle-hd.png" alt="" className="img-fluid" style={{ width: "200px", height: "200px", borderRadius: "50%" }} />}
                                    </div>
                                    {/* <div>
                                        <label for="image" htmlFor="image" className="form-label upload p-2 px-3 text-white">
                                            <FontAwesomeIcon icon={faPlus} className="me-2" />
                                            Tải lên
                                        </label>
                                    </div> */}
                                    {/* value={dataUpdate ? dataUpdate.file[0].fileName : ''} */}
                                    <input type="file" name="file" onChange={e => handle(e)} className="form-control" id="file" accept="image/*" />
                                </div>
                               
                                <button type="submit" className="btn btn-primary rounded-1 px-5 mt-3">Submit</button>

                            </div>
                            <div className="col-12 col-sm-12 col-md-12 col-lg-6 col-xl-6 text-start">
                                <div className="mb-3">
                                    <label for="name" className="form-label">Tên tài khoản</label>
                                    <input type="text" value={dataUpdate.username} onChange={e => handle(e)} className="form-control" name="username" id="username" />
                                </div>
                                <div className="mb-3">
                                    <label for="full_name" className="form-label">Họ và tên</label>
                                    <input type="text" value={dataUpdate ? dataUpdate.fullName : ''} onChange={e => handle(e)} className="form-control" name="fullName" id="fullName" />
                                </div>
                                <div className="mb-3">
                                    <div className="form-floating">
                                        <select className="form-select" value={dataUpdate ? dataUpdate.sex : ''} onChange={e => handle(e)} id="sex" name="sex" aria-label="Floating label select example">
                                            <option selected>--Chọn giới tính--</option>
                                            <option value="male">Nam</option>
                                            <option value="female">Nữ</option>
                                        </select>
                                    </div>
                                </div>
                                <div className="mb-3">
                                    <input type="date" value={dataUpdate ? dataUpdate.birthday : ''} onChange={e => handle(e)} name="birthday" id="birthday"/>
                                </div>
                                <div className="mb-3">
                                    <label for="email" className="form-label">Email</label>
                                    <input type="email" value={dataUpdate ? dataUpdate.email : ''} onChange={e => handle(e)} name="email" className="form-control" id="email" />
                                </div>

                                <div className="mb-3">
                                    <label for="address" className="form-label">Địa chỉ</label>
                                    <input type="text" value={dataUpdate ? dataUpdate.address : ''} onChange={e => handle(e)} name="address" className="form-control w-50" id="address" />
                                </div>
                                <div className="mb-3">
                                    <label for="password" className="form-label">Mật khẩu</label>
                                    <input type="password" value={dataUpdate ? dataUpdate.password : ''} onChange={e => handle(e)} name="password" className="form-control" id="password" />
                                </div>
                                <div className="mb-3">
                                    <label for="phone_number" className="form-label">Số điện thoại</label>
                                    <input type="text" value={dataUpdate ? dataUpdate.phoneNumber : ''} onChange={e => handle(e)} name="phoneNumber" className="form-control w-50" id="phoneNumber" />
                                </div>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
            <Footer />
        </div>
    
     );
}

export default Adduser;