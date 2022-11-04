import {
    MDBInputGroup,
    MDBBtn,
    MDBBadge,
    MDBIcon,
    MDBTable, MDBTableHead, MDBTableBody
} from 'mdb-react-ui-kit';
import { Row, Col, Button, Form  } from 'react-bootstrap'
import Table from 'react-bootstrap/Table';
import React, { useEffect, useState } from 'react';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faTrash,faArrowsRotate, faCheckDouble,faChevronRight, faTrashCan,faHome, faList, faCheck,faRightFromBracket } from "@fortawesome/free-solid-svg-icons";
import { Link } from 'react-router-dom';



import ModalReact from "../../component/Modal";
import SideBars from "../../component/SideNav"
import axios from 'axios';

const actions = [
    { name: 'Nạp lại', icon: faArrowsRotate, bg: 'success' },
    { name: 'Tạo', link: '/add-user', icon: faPlus, bg: 'primary' },
    { name: 'Xóa', icon: faTrash, bg: 'danger' },
    { name: 'Thùng rác', icon: faTrashCan, bg: 'info' },

]
const Users = [
    {
        id: 1,
        name: 'thiennhh',
        avt: 'https://znews-photo.zingcdn.me/w660/Uploaded/kbd_pilk/2021_06_27/hua_khai5.jpg',
        email: 'nguyenthienn3347@gmail.com',
        phone: '0123456789',
        address: 'Hanoi',
        role: 'admin',
        badge: 'success'
    },
    {
        id: 2,
        name: 'anhdd',
        avt: 'https://znews-photo.zingcdn.me/w660/Uploaded/kbd_pilk/2021_06_27/hua_khai5.jpg',
        email: 'ducanh81@gmail.com',
        phone: '0123456789',
        address: 'Gia Lai',
        role: 'user',
        badge: 'warning'
    },
    {
        id: 3,
        name: 'namnc',
        avt: 'https://znews-photo.zingcdn.me/w660/Uploaded/kbd_pilk/2021_06_27/hua_khai5.jpg',
        email: 'congnam43@gmail.com',
        phone: '0123456789',
        address: 'Đà Nẵng',
        role: 'user',
        badge: 'warning'
    },
    {
        id: 4,
        name: 'chiennd',
        avt: 'https://znews-photo.zingcdn.me/w660/Uploaded/kbd_pilk/2021_06_27/hua_khai5.jpg',
        email: 'dangchien43@gmail.com',
        phone: '0123456789',
        address: 'Đà Nẵng',
        role: 'user',
        badge: 'warning'
    },

]
const profileMenu = [
    { name: 'Trang chủ', link: '/', icon: faHome },
    { name: 'Danh sách người dùng', link: '/admin/users', icon: faList },
    { name: 'Phê duyệt bài đăng', link: '/admin/product-list', icon: faCheck },
    { name: 'Đăng xuất', link: '/', icon: faRightFromBracket },
]
 
export default function UserList() {
    const [show, setShow] = useState(false);
    const [users, setUsers] = useState(Users);
    const handleClose = () => setShow(false);
    const [userid, setUserId] = useState();
    const [ischecked, setIsChecked] = useState(false);
    const [searchData, setSearchData] = useState("");
    const handleShow = (id) => {
        setShow(true);
        setUserId(id)
    }
    console.log(userid);
    const [data, setData] = useState([]);
    useEffect(() => {
        axios.get('http://localhost:8080/user/user-full')
            .then(res => {
                setData(res.data);
            })
            .catch(err => {
                console.log(err);
            })
    }, [users])
    console.log(data);
    const selectAll = () => {
        setIsChecked(!ischecked);
        users.map((user) => {
            user.isChecked = ischecked;
        })
    }
const checkId = (id) => {
    let a =[...id]
    console.log(a);
}
    const deleteUser = () => {
        axios.delete(`http://localhost:8080/user/delete/${userid}`)
            .then(res => {
                console.log(res);
                setData(data.filter(user => user.id !== userid));
            })
            .catch(err => {
                console.log(err);
            })
    }
    const search = () => {
        axios.get(`http://localhost:8080/user/userBy?param=${searchData}`)
            .then(res => {
                setData(res.data);
            })
            .catch(err => {
                console.log(err);
            })
     }

    return (
        <div className='mt-4 bg-main'>
            <ModalReact show={show} handleClose={handleClose} deleteUser={deleteUser} handleShow={handleShow}>Do you want delete user?</ModalReact>

            <div className="row">
                <div className='col-3 bg-white rounded-2 p-0 ms-5'>
                        <div className='w-100 sticky-top '>
                            <div className='py-1 ps-3 mb-3'>
                                {profileMenu.map((item, index) => {
                                    return (
                                        <Link to={item.link} className="text-decoration-none text-black">
                                            <div className='d-flex justify-content-between p-3 mb-3'>
                                                <span><FontAwesomeIcon icon={item.icon} className="me-2" /> {item.name}</span>
                                                <FontAwesomeIcon icon={faChevronRight} />
                                            </div>
                                        </Link>
                                    )
                                })}
                            </div>
                        </div>
                    </div>
                <div className='col-8 bg-white rounded-2 p-3 ms-3'>
                <h1 className="mb-5 mt-5 text-center text-uppercase">Danh sách người dùng</h1>
                    <div className='bg-white rounded-3 shadow-sm'>
                        <div className='row p-3'>
                            <div className='col-8 d-flex align-items-center justify-content-between w-100'>
                                <div className="col-6 d-flex">
                                    {actions.map((action, index) => (
                                        action.link ? <Link to={action.link} key={index}><button className="btn btn-primary me-1"><FontAwesomeIcon icon={action.icon} /> {action.name}</button></Link> :
                                            <button role="button" key={index} className={`border-0 me-1 text-white px-2 bg-${action.bg}`}>
                                                <FontAwesomeIcon icon={action.icon} className="mr-0" /> {action.name}
                                            </button>
                                    ))}
                                </div>
                                <div className="col-6">
                                    <MDBInputGroup className=' d-flex align-items-center'>
                                        <input className='form-control' placeholder="Nhập điều kiện..." type='text' />
                                        <MDBBtn outline>Tìm kiếm</MDBBtn>
                                    </MDBInputGroup>
                                </div>
                            </div>
                        </div>
                    </div>


                    <div className="mt-3 bg-white rounded-3 shadow-sm">
                        <Table>
                            <thead className=''>
                                <tr className='border-underline'>
                                    <th>STT</th>
                                    <th>Avatar</th>
                                    <th>Tên</th>
                                    <th>Email</th>
                                    <th>SDT</th>
                                    <th>Địa chỉ</th>
                                    <th>Role</th>
                                    <th>Thao tác</th>
                                </tr>
                            </thead>
                            <tbody>
                                {users.length > 0 ? users.map((user, index) => (
                                    <tr key={index}>
                                        <td>{index + 1}</td>
                                        <td className='col-1'><img style={{ width: '50px', height: '50px', borderRadius: '50%' }} src={user.avt} /></td>
                                        <td>{user.name}</td>
                                        <td>{user.email}</td>
                                        <td>{user.phone}</td>
                                        <td>{user.address}</td>
                                        <td>
                                            <MDBBadge color={user.badge} pill>
                                                {user.role}
                                            </MDBBadge>
                                        </td>
                                        <td>
                                            <button type="button" className="btn btn-info me-2"><Link style={{ textDecoration: 'none', color: 'white' }} to={`/update/${user.idUser}`}>Update</Link></button>
                                            <button type="button" className="btn btn-danger" onClick={() => handleShow(user.idUser)}>Delete</button>
                                        </td>
                                    </tr>
                                )) : <tr ><td colSpan="8">Chưa có người dùng nào.<Link to='/sign-up'>Tạo mới một người dùng</Link></td></tr>}


                            </tbody>
                        </Table>
                    </div>
                </div>
            </div>



        </div>

    )

}  