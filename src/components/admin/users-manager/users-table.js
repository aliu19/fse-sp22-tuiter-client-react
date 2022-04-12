import React, {useEffect, useState} from "react";
import * as usersService from "../../../services/users-service";
import {Table} from "react-bootstrap";
import {Link} from "react-router-dom";

const UsersTable = ({users}) => {
    const [allUsers, setAllUsers] = useState(users);

    useEffect(() => {
        setAllUsers(users)
    }, [users])

    return (
        <div>
            <h2>Users</h2>
            <Table className="table">
                <thead>
                </thead>
                <tbody>
                {
                    allUsers.map(user =>
                                     <tr key={user._id}>
                                         <td>
                                             <Link to={`/admin/profile/${user._id}`}>
                                                 <h5>{user.username}</h5>
                                             </Link>
                                         </td>
                                         <td>
                                             <Link to={`/admin/${user._id}/tuits`}>
                                                 <h5>Tuits</h5>
                                             </Link>
                                         </td>
                                     </tr>
                    )
                }
                </tbody>
            </Table>
        </div>
    )
}

export default UsersTable