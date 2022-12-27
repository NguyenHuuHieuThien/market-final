import { MDBInputGroup, MDBBtn, MDBBadge } from "mdb-react-ui-kit";
import Table from "react-bootstrap/Table";
import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPlus,
  faChevronRight,
  faArrowLeft,
  faHome,
  faList,
  faCheck,
  faRightFromBracket,
  faTelevision,
  faArrowsRotate,
} from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import ModalReact from "../../component/Modal";
import { axiosx as axios } from "../../Helper";
import {useSnackbar} from 'notistack'

const profileMenu = [
  { name: "Trang chủ người dùng", link: "/", icon: faHome },
  { name: "Trang sản phẩm", link: "/product/list", icon: faTelevision },
  { name: "Danh sách người dùng", link: "/admin/users", icon: faList },
  { name: "Phê duyệt bài đăng", link: "/admin/product/manager", icon: faCheck },
  { name: "Quản lý sản phẩm", link: "/admin/products", icon: faList },
  { name: "Đăng xuất", link: "/", icon: faRightFromBracket },
];

export default function OrderList() {
  let {enqueueSnackbar} = useSnackbar();
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = (id) => {
    setShow(true);
    setUserId(id);
  };
  const [userid, setUserId] = useState();
  const [isCheckAll, setIsCheckAll] = useState(false);
  const [checkList, setCheckList] = useState([]);
  const [searchData, setSearchData] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  console.log(checkList);
  const [data, setData] = useState([]);
  const [ids, setIds] = useState([data.length>0?data.map(item=> item.idProduct):[]])
  let user = JSON.parse(localStorage.getItem("token"));
  const checkAll = () => {
    setIsCheckAll(!isCheckAll);
    if (!isCheckAll) {
      setCheckList(data.map((item) => item.idUser));
    } else {
      setCheckList([]);
    }
  };
  const checked = (id) => {
    if (checkList.includes(id)) {
      setCheckList(checkList.filter((item) => item !== id));
    } else {
      setCheckList([...checkList, id]);
    }
  };


  console.log(data);
  useEffect(() => {
    // setIsLoading(true);
    if (axios) {
      axios
        .get("/user/user-full")
        .then((res) => {
          setData(res.data.filter((item) => item.status === "active"));
          // setIsLoading(false);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, [ids]);
  const reload =()=> {
    setIds(data.map(item=>item.idUser))
  }
  const deleteUser = () => {
    axios
      .delete(`/user/delete/${userid}`)
      .then(() => {
        setIds(ids.filter(item=> item.idUser !== userid))
        enqueueSnackbar('Đã xóa người dùng', {variant: 'success'})
        setShow(false);
      })
      .catch((err) => {
        enqueueSnackbar('Không thể xóa người dùng', {variant: 'danger'})
      });
  };
  const deleteAll = () => {
    // console.log(checkList.toString())
    console.log(123);
  };
  const search = () => {
    axios
      .get(`/user/userBy?param=${searchData}`)
      .then((res) => {
        setData(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div>
      {!user||user.roles[0] !== "ROLE_ADMIN" ? (
       <div>
       <div class="alert alert-danger" role="alert">
         Bạn không có quyền truy cập vào trang quản lý.
       </div>
       <Link to="/">
         <button className="btn btn-warning text-white">
           <FontAwesomeIcon icon={faArrowLeft} className="me-2" />
           Quay lại
         </button>
       </Link>
     </div>
      ) : (
        <div className="mt-4 bg-main">
          <ModalReact
            show={show}
            handleClose={handleClose}
            handleFunction={deleteUser}
            handleShow={handleShow}
          >
            Bạn chắc chắn muốn xóa người dùng này?
          </ModalReact>

          <div className="row m-0">
            <div className="col-2 col-sm-2 col-md-2 col-lg-3 col-xl-3 bg-white rounded-2 p-0 ms-3 ms-sm-3 ms-md-3 ms-lg-5 ms-xl-5">
              <div className="w-auto sticky-top ">
                <div className="py-1 ps-1 ps-sm-1 ps-md-1ps-lg-3 ps-xl-3 mb-3">
                  {profileMenu.map((item, index) => {
                    return (
                      <Link
                        to={item.link}
                        key={index}
                        className="text-decoration-none text-black"
                      >
                        <div className="d-flex justify-content-between p-3 mb-3">
                          <span>
                            <span>
                               <FontAwesomeIcon
                              icon={item.icon}
                              className="me-2"
                            />
                            
                            </span>
                            <span className="d-none d-sm-none d-md-none d-lg-inline-block d-xl-inline-block">{item.name}</span>
                           
                          </span>
                          <FontAwesomeIcon icon={faChevronRight} className='d-none d-sm-none d-md-none d-lg-inline-block d-xl-inline-block'/>
                        </div>
                      </Link>
                    );
                  })}
                </div>
              </div>
            </div>
            <div className="col-8 bg-white rounded-2 p-3 ms-3">
              <h1 className="mb-5 mt-5 text-center text-uppercase">
                Danh sách người dùng
              </h1>
              <div className="bg-white rounded-3 shadow-sm">
                <div className="row p-3">
                  <div className="col-12 col-sm-12 col-md-12 col-lg-8 col-xl-8 d-block d-sm-block d-md-block d-lg-flex d-xl-flex  align-items-center justify-content-between w-100">
                    <div className="col-12 col-sm-12 text-start col-md-12 col-lg-6 col-xl-6">
                      <Link to="/admin/user/create" style={{ textDecoration: "none" }}>
                        <button
                          role="button"
                          className={`border-0 me-1 py-1 text-white btn btn-success`}
                        >
                          <FontAwesomeIcon icon={faPlus} className="mr-0" /> Tạo
                          mới
                        </button>
                      </Link>
                        <button className="btn btn-warning py-1 text-white" onClick={reload}>
                          <FontAwesomeIcon className='me-2' icon={faArrowsRotate}/>
                          Tải lại
                          </button>
                    </div>
                    <div className="col-12 col-sm-12 col-md-12 col-lg-6 col-xl-6">
                      <MDBInputGroup className=" d-block d-sm-block d-md-block d-lg-flex d-xl-flex align-items-center">
                        <input
                          className="form-control"
                          placeholder="Nhập điều kiện..."
                          type="text"
                        />
                        <button className="btn btn-outline-secondary"onClick={search}>Tìm kiếm</button>
                      </MDBInputGroup>
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-3 bg-white table-responsive rounded-3 shadow-sm">
                <Table>
                  <thead className="">
                    <tr className="border-underline">
                      <th>Avatar</th>
                      <th>Tên</th>
                      <th>Email</th>
                      {/* <th>SDT</th>
                                      <th>Địa chỉ</th>
                                      <th>Role</th> */}
                      <th className="text-end">Thao tác</th>
                    </tr>
                  </thead>
                  <tbody>
                    {" "}
                    {isLoading ? (
                      <tr>
                        <td colSpan={5}>
                          <div
                            className="spinner-border text-danger"
                            role="status"
                          >
                            <span className="visually-hidden">Loading...</span>
                          </div>
                        </td>
                      </tr>
                    ) : data.length > 0 ? (
                      data.map((user, index) => (
                        <tr key={index}>
                          <td className="col-1">
                            <img
                              style={{
                                width: "50px",
                                height: "50px",
                                borderRadius: "50%",
                              }}
                              src={user.urlImageSet[0]}
                            />
                          </td>
                          <td>{user.username}</td>
                          <td>{user.email}</td>
                          <td className="text-end">
                            <button type="button" className="btn btn-info me-0 me-sm-0 me-md-0 me-lg-2 me-xl-2 mb-2 mb-sm-2 mb-md-2 md-lg-0 mb-xl-0 text-start">
                              <Link
                                style={{
                                  textDecoration: "none",
                                  color: "white",
                                }}
                                to={`/admin/user/edit/${user.idUser}`}
                              >
                                Sửa
                              </Link>
                            </button>
                            <button
                              type="button"
                              className="btn btn-danger text-start"
                              onClick={() => handleShow(user.idUser)}
                            >
                              Xóa
                            </button>
                          </td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan="8">
                          Chưa có người dùng nào.
                          <Link to="/sign-up">Tạo mới một người dùng</Link>
                        </td>
                      </tr>
                    )}
                  </tbody>
                </Table>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
