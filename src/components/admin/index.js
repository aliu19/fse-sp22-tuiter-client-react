import React, {useEffect, useState} from "react";
import {useNavigate, useParams} from "react-router-dom";
import * as authService from "../../services/auth-service";
import { Tab, Row, Col, Nav } from 'react-bootstrap';

const Admin = () => {
    const {currentPage} = useParams();
    const [key, setKey] = useState('users');
    const [admin, setAdmin] = useState({});
    const navigate = useNavigate();
    useEffect(() => {
        try {
            authService.profile()
                .then(admin => {
                    setAdmin(admin)
                })
        } catch (e) {
            alert("Must logged in as an admin user.")
            navigate('/login')
        }
    })

    return (
        <div className='container-fluid'>
            <h2> Admin</h2>
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
                                <Nav.Link eventKey="tuits">Tuits Table</Nav.Link>
                            </Nav.Item>
                            <Nav.Item>
                                <Nav.Link eventKey="search-users">Search User</Nav.Link>
                            </Nav.Item>
                        </Nav>
                    </Col>
                    <Col sm={9}>
                        <Tab.Content>

                            <Tab.Pane eventKey="users">

                                {/*<ProductsInstock />*/}
                            </Tab.Pane>

                            <Tab.Pane eventKey="tuits">
                                {/*<SellerTable />*/}
                            </Tab.Pane>
                            <Tab.Pane eventKey="search-user">
                                {/*<BuyerTable />*/}
                            </Tab.Pane>
                        </Tab.Content>
                    </Col>
                </Row>
            </Tab.Container>
        </div>
    )
}

export default Admin