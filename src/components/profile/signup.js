import {useEffect, useState} from "react";
import * as service from "../../services/auth-service";
import {useNavigate} from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.css'; 
import 'bootstrap/js/dist/dropdown';

const Signup = () => {
    const [newUser, setNewUser] = useState({});
    const navigate = useNavigate();
    // const [userName, setUsername] = useState("");
    // const [userRole, setUserRole] = useState("");

    const signup = () =>
        service.signup(newUser)
            .then(() => navigate('/home'))
            .catch(e => alert(e));

    return (
        <div>
            <h1>Signup</h1>
            <input className="mb-2 form-control"
                   onChange={(e) =>
                       setNewUser({...newUser, username: e.target.value})}
                   placeholder="username"/>
            <input className="mb-2 form-control"
                   onChange={(e) =>
                       setNewUser({...newUser, password: e.target.value})}
                   placeholder="password" type="password"/>
            <input className="mb-2 form-control"
                   onChange={(e) =>
                       setNewUser({...newUser, email: e.target.value})}
                   placeholder="email" type="email"/>
            {/* <input className="btn btn-secondary dropdown-toggle form-control"
                   onChange={(e) =>
                       setNewUser({...newUser, AccountType: e.target.value})}
                   placeholder="role"/> */}
            {/* <div className="dropdown">
                <button className="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="true">
                    User Role
                </button>
                <div className="dropdown-menu" aria-labelledby="dropdownMenuButton">
                    <a className="dropdown-item">Action</a>
                    <a className="dropdown-item">Another action</a>
                    <a className="dropdown-item">Something else here</a>
                </div>
            </div> */}
            <div className="form-group row">
                    <label className="col-sm-3 col-form-label">Sign up as:</label>
                    <div className="col-sm-3 form-check">
                        <input className="form-check-input" 
                            name='role'
                            type="radio"
                            value='PERSONAL'
                            onChange={(e) =>
                                setNewUser({...newUser, AccountType: e.target.value})}/>
                        <label className="form-check-label">
                            PERSONAL
                        </label>
                    </div>
                    <div className="col-sm-3 form-check">
                        <input className="form-check-input" 
                            name='role'
                            type="radio"
                            value='ACADEMIC'
                            onChange={(e) =>
                                setNewUser({...newUser, AccountType: e.target.value})}/>
                        <label className="form-check-label">
                            ACADEMIC
                        </label>
                    </div>
                    <div className="col-sm-3 form-check">
                        <input className="form-check-input" 
                            name='role'
                            type="radio"
                            value='PROFESSIONAL'
                            onChange={(e) =>
                                setNewUser({...newUser, AccountType: e.target.value})}/>
                        <label className="form-check-label">
                            PROFESSIONAL
                        </label>
                    </div>
                </div>
            <button onClick={signup}
                    className="btn btn-primary mb-5">Signup
            </button>
        </div>
    );
}
export default Signup