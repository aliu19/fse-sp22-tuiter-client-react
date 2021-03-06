/**
 * @file Implements Signup component for displaying sign up page
 */
import {useEffect, useState} from "react";
import * as service from "../../services/auth-service";
import {useNavigate} from "react-router-dom";

/**
 * Sign up component that allow users to sign up with unsername, passeword, email, and role
 */

const Signup = () => {
    const [newUser, setNewUser] = useState({role: 'GENERAL'});
    const navigate = useNavigate();
    // const [userName, setUsername] = useState("");
    // const [userRole, setUserRole] = useState("");

    const signup = () => {
        if (newUser.username === '' || newUser.username === undefined
            || newUser.password === '' || newUser.password === undefined
            || newUser.email === '' || newUser.email === undefined) {
            alert("Username, password and email cannot be empty!")
            return
        }
        service.signup(newUser)
            .then(() => {
                alert('Account is successfully created!')
                navigate('/profile')
            })
            .catch(e => alert("Username is already taken, please try different username!"));
    }

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
            <div className="form-group row">
                    <label className="col-sm-4 col-form-label">Sign up as:</label>
                    <div className="col-sm-4 form-check">
                        <input className="form-check-input"
                            name='role'
                            type="radio"
                            value='GENERAL'
                               checked={newUser.role === 'GENERAL'}
                            onChange={(e) => {
                                setNewUser({...newUser, role: e.target.value})
                            }}/>
                        <label className="form-check-label">
                            GENERAL
                        </label>
                    </div>
                    <div className="col-sm-4 form-check">
                        <input className="form-check-input" 
                            name='role'
                            type="radio"
                            value='ADMIN'
                               checked={newUser.role === 'ADMIN'}
                            onChange={(e) =>
                                setNewUser({...newUser, role: e.target.value})}/>
                        <label className="form-check-label">
                            ADMIN
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