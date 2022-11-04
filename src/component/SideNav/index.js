import React, { useState } from 'react';
import SideNav, {
    Toggle,
    Nav,
    NavItem,
    NavIcon,
    NavText
} from "@trendmicro/react-sidenav";
import "@trendmicro/react-sidenav/dist/react-sidenav.css";
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome, faListOl, faUsers, faUsersSlash, faTimes, faBars} from '@fortawesome/free-solid-svg-icons';
import { Routes, Route, BrowserRouter as Router } from 'react-router-dom';
import { publicRoutes } from '../../route';


export default function SideBars({ path, Element }) {
    const [show, setShow] = useState(false);
    const [isOpen, setIsOpen] = useState(false);

    const handleTrigger = () => setIsOpen(!isOpen);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    return (
        <>
            <div className="App">
                <div className="page">

                    <div className={`sidebar ${isOpen ? "sidebar--open" : ""}`}>
                        <div className="trigger" onClick={handleTrigger}>
                            <FontAwesomeIcon icon={isOpen ? faTimes : faBars} />
                        </div>

                       <Link to='/' style={{textDecoration: 'none'}}>
                       <div className="sidebar-position">
                            <FontAwesomeIcon icon={faHome} />
                            <span>Home</span>
                        </div>
                       </Link>
                       <Link to='/admin/product-list' style={{textDecoration: 'none'}}>
                       <div className="sidebar-position">
                            <FontAwesomeIcon icon={faListOl} />
                            <span>Product</span>
                        </div>
                       </Link>
                       <Link to='/admin/users' style={{textDecoration: 'none'}}>
                       <div className="sidebar-position">
                            <FontAwesomeIcon icon={faUsers} />
                            <span>Users</span>
                        </div>
                       </Link>
                       <Link to='/admin/trash' style={{textDecoration: 'none'}}>
                       <div className="sidebar-position">
                            <FontAwesomeIcon icon={faUsersSlash} />
                            <span>Trash</span>
                        </div>
                       </Link>
                        
                        
                    </div>
                </div>
            </div>

            {/* <SideNav
                onSelect={selected => {
                    // Add your code here
                }}
            >
                <SideNav.Toggle />
                <SideNav.Nav defaultSelected="home">
                    <NavItem eventKey="home">
                        <NavIcon>
                            <FontAwesomeIcon icon={faHome} />
                        </NavIcon>
                        <NavText>Home</NavText>
                    </NavItem>
                    <Link to='/admin/users' style={{ textDecoration: 'none',color:'white' }}>
                        <NavItem eventKey="users">
                            <NavIcon>
                                <FontAwesomeIcon icon={faUsers} />
                            </NavIcon>
                            <NavText>Users</NavText>
                        </NavItem>
                    </Link>
                    <Link to='/admin/product-list' style={{ textDecoration: 'none', color:'white' }}>
                        <NavItem eventKey="productlist">
                            <NavIcon>
                                <FontAwesomeIcon icon={faListOl} />
                            </NavIcon>
                            <NavText>Product List</NavText>
                        </NavItem>
                    </Link>
                    <Link to='/admin/trash' style={{ textDecoration: 'none', color:'white' }}>
                        <NavItem eventKey="trashUserlist">
                            <NavIcon>
                                <FontAwesomeIcon icon={faUsersSlash} />
                            </NavIcon>
                            <NavText>Trash User List</NavText>
                        </NavItem>
                    </Link>
                    <NavItem eventKey="charts">
                        <NavIcon>
                            <i
                                className="fa fa-fw fa-line-chart"
                                style={{ fontSize: "1.75em" }}
                            />
                        </NavIcon>
                        <NavText>Charts</NavText>
                        <NavItem eventKey="charts/linechart">
                            <NavText>Line Chart</NavText>
                        </NavItem>
                        <NavItem eventKey="charts/barchart">
                            <NavText>Bar Chart</NavText>
                        </NavItem>
                    </NavItem>
                </SideNav.Nav>
            </SideNav> */}


        </>

    );
}


