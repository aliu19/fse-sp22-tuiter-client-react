import React from "react";
import {act, create} from "react-test-renderer";
import UsersTable from "../components/admin/users-manager/users-table";
import {HashRouter} from "react-router-dom";

const MOCKED_USERS = [
    {username: 'ellen_ripley', password: 'lv426', email: 'repley@weyland.com', _id: "123"},
    {username: 'sarah_conor', password: 'illbeback', email: 'sarah@bigjeff.com', _id: "234"},
    {username: 'dd', password: 'dd123', email: 'dd@123', _id: "345"}
]

describe('render delete-button with static users', () => {
    let users = MOCKED_USERS;

    let usersTable
    act(() => {
        usersTable = create(
            <HashRouter>
                <UsersTable users={users}/>
            </HashRouter>
        )
    })

    test("render delete-button for each user", () => {
        const root = usersTable.root;
        const deleteButtons = root.findAllByProps(
            {className: 'fa fa-times fa-2x admin-delete-button'})
        expect(deleteButtons.length).toBe(3);
        const userNameFields = root.findAllByProps({className: 'username-field'})
        expect(userNameFields.length).toBe(3);
    })
})

test('click delete-button to delete user from the users table', () => {
    let users = MOCKED_USERS;

    const deleteUser = () => {
        act(() => {
            // removes the first one
            users = users.slice(1, 3)
            usersTable.update(
                <HashRouter>
                    <UsersTable users={users}/>
                </HashRouter>
            )
        })
    }

    let usersTable
    act(() => {
        usersTable = create(
            <HashRouter>
                <UsersTable users={users}
                            deleteUser={deleteUser}/>
            </HashRouter>
        )
    })

    const root = usersTable.root;
    let deleteButtons = root.findAllByProps({className: 'fa fa-times fa-2x admin-delete-button'})
    expect(deleteButtons.length).toBe(3);
    let userNameFields = root.findAllByProps({className: 'username-field'})
    expect(userNameFields.length).toBe(3);

    act(() => {deleteButtons[0].props.onClick()})
    deleteButtons = root.findAllByProps({className: 'fa fa-times fa-2x admin-delete-button'})
    expect(deleteButtons.length).toBe(2);
    userNameFields = root.findAllByProps({className: 'username-field'})
    expect(userNameFields.length).toBe(2);
})