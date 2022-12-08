import BgUser from "../../component/BgUser";
import { Link } from "react-router-dom";
import Table from "react-bootstrap/Table";
import React, { useEffect, useState } from "react";
import { axiosx as axios } from "../../Helper";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useSnackbar } from "notistack";
export default function AwaitAccept() {
    let [data, setData] = useState([])
    let {enqueueSnackbar} = useSnackbar()
    let user = JSON.parse(localStorage.getItem('token'))
    useEffect(()=> {
        axios.get(`/bill/select/${user.id}?status=pending`)
        .then(res=>{
            console.log(res.data)
            setData(res.data)
        })
        .catch(err=> console.log(err))
    },[])
    const cancel = id=>{
        axios.put(`/bill/updateStatus/${id}?status=deleted`)
        .then(()=>enqueueSnackbar('Đã hủy đơn hàng', {variant:'success'}))
        .catch(()=>enqueueSnackbar('Không thể hủy', {variant:'error'}))
    }
    return ( 
        <div>
        {user.roles[0] !== "ROLE_USER" ? (
          <div class="alert alert-danger" role="alert">
            Bạn không có quyền truy cập
          </div>
        ) : (
          <BgUser>
            <h1 className=" bg-white py-5 rounded-3 border-underline">
              Đang chờ xác nhận
            </h1>
            <div className="mt-3 bg-white rounded-3 shadow-sm">
              <Table striped bordered hover>
                <thead>
                  <tr className="border-underline">
                    {/* <th></th> */}
                    <th>Hình ảnh</th>
                    <th>Tên</th>
                    <th>Giá</th>
                    <th>Số Lượng</th>
                    <th>Ngày đặt</th>
                    <th>Trạng thái</th>
                    <th>Thao Tác</th>
                  </tr>
                </thead>
                <tbody>
                  {data && data?.length > 0 ? (
                    data.map((item, index) => (
                      <tr key={index}>
                        {/* <td>
                          <input
                            className="form-check-input"
                            type="checkbox"
                            onChange={() => checked(item.idProduct)}
                            checked={checkList.includes(item.idProduct)}
                          />
                        </td> */}
                        <td className="col-1">
                          <img src={item.product?.urlFile[0]} alt="" width="100px" />
                        </td>
                        <td>{item.product?.productName}</td>
                        <td>{item.product?.price}</td>
                        <td>{item.amount}</td>
                        <td>{item.createDate}</td>
                        <td>Đang chờ</td>
                        <td>
                            <button type="button" onClick={()=>cancel(item.idBill)} className="btn btn-danger me-2">
                              Hủy đơn
                            </button>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="8">
                        Chưa có bài đăng nào.
                        <Link to="/sign-up">Tạo mới một bài đăng người dùng</Link>
                      </td>
                    </tr>
                  )}
                </tbody>
              </Table>
            </div>
          </BgUser>
        )}
      </div>
    );
  }
  