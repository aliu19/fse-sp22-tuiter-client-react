import React, {useEffect, useState} from "react";
import * as usersService from "../../../services/users-service";
import UsersTable from "./users-table";
import {adminCreateUser} from "../../../services/users-service";

const UsersTableManager = () => {
    const [allUsers, setAllUsers] = useState([]);
    const [newUser, setNewUser] = useState({
                                               role: 'GENERAL'
                                           });

    useEffect(() => {
        usersService.findAllUsers()
            .then(users => {
                setAllUsers(users);
            })
    }, [])

    const createANewUser = () => {
        if (newUser.username === undefined || newUser.username === ''
            || newUser.password === undefined || newUser.password === ''
            || newUser.email === undefined || newUser.email === '') {
            alert("Username, password and email cannot be empty!")
            return
        }
        try {
            usersService.adminCreateUser(newUser)
                .then((createdUser) => {
                    setAllUsers([...allUsers, createdUser])
                    setNewUser({role: 'GENERAL'})
                    alert("Created User successfully!")
                })
                .catch(e => alert("Please check if username is taken!"))
        } catch (e) {
            console.log(e)
            alert("Please try again!")
        }
    }

    return (
        <div>
            <div className='row col-10'>
                <input className="col mb-2 form-control"
                       value={newUser.username || ''}
                       onChange={(e) =>
                           setNewUser({...newUser, username: e.target.value})}
                       placeholder="username"/>
                <input className="col ms-4 mb-2 form-control"
                       value={newUser.password || ''}
                       onChange={(e) =>
                           setNewUser({...newUser, password: e.target.value})}
                       placeholder="password" type="password"/>
                <input className="col ms-4 mb-2 form-control"
                       value={newUser.email || ''}
                       onChange={(e) =>
                           setNewUser({...newUser, email: e.target.value})}
                       placeholder="email" type="email"/>
                <div className="form-group row">
                    <label className="col-sm-4 col-form-label">User role:</label>
                    <div className="col-sm-4 form-check">
                        <input className="form-check-input"
                               name='role'
                               type="radio"
                               value='GENERAL'
                               checked={newUser.role === 'GENERAL'}
                               onChange={(e) =>
                                   setNewUser({...newUser, role: e.target.value})}/>
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
                <button onClick={createANewUser}
                        className="btn btn-success mb-5">Create a new User
                </button>
            </div>
            <UsersTable users={allUsers}/>
        </div>
    )
}

export default UsersTableManager