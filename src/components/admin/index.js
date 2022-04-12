import React, {useEffect, useState} from "react";
import {Link, useNavigate} from "react-router-dom";
import * as authService from "../../services/auth-service";
import { Tab, Row, Col, Nav } from 'react-bootstrap';
import UsersTable from "./users-manager/users-table";
import SearchTuits from "./tuits-manager/search-tuits";
import SearchUsers from "./users-manager/search-users";
import AllTuits from "./tuits-manager/all-tuits";
import UsersTableManager from "./users-manager/users-table-manager";

const Admin = () => {
    const [key, setKey] = useState('users');
    const [admin, setAdmin] = useState({});
    const navigate = useNavigate();
    useEffect(() => {
        try {
            authService.profile()
                .then(admin => {
                    if (admin.role !== 'ADMIN') {
                        alert("Must logged in as an admin user.")
                        navigate('/login')
                    }
                    setAdmin(admin)
                })
        } catch (e) {
            alert("Must logged in as an admin user.")
            navigate('/login')
        }
    }, [])

    return (
        <div className='container-fluid'>
            <div className='row'>
                <Link to="/profile"><i className="fas fa-arrow-circle-left"/> Back to Profile</Link>
                <h2> Admin</h2>
            </div>
            <Tab.Container id="left-tabs-example" defaultActiveKey="users">
                <Row>
                    <Col sm={3}>
                        <Nav variant="pills" className="flex-column"
                             onSelect={k => {
                                 setKey(k)
                                 navigate(`/admin/${k}`)
                             }}>
                            <Nav.Item>
                                <Nav.Link eventKey="users">Users Table</Nav.Link>
                            </Nav.Item>
                            <Nav.Item>
                                <Nav.Link eventKey="tuits">Tuits List</Nav.Link>
                            </Nav.Item>
                            <Nav.Item>
                                <Nav.Link eventKey="search-users">Search Users</Nav.Link>
                            </Nav.Item>
                            <Nav.Item>
                                <Nav.Link eventKey="search-tuits">Search Tuits</Nav.Link>
                            </Nav.Item>
                        </Nav>
                    </Col>
                    <Col sm={9}>
                        <Tab.Content>
                            <Tab.Pane eventKey="users">
                                <UsersTableManager/>
                            </Tab.Pane>
                            <Tab.Pane eventKey="tuits">
                                <AllTuits/>
                            </Tab.Pane>
                            <Tab.Pane eventKey="search-users">
                                <SearchUsers/>
                            </Tab.Pane>
                            <Tab.Pane eventKey="search-tuits">
                                <SearchTuits/>
                            </Tab.Pane>
                        </Tab.Content>
                    </Col>
                </Row>
            </Tab.Container>
        </div>
    )
}

export default Admin