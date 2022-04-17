import UsersTable from "../components/admin/users-manager/users-table";
import {screen, render} from "@testing-library/react";
import {HashRouter} from "react-router-dom";
import {createUser, deleteUsersByUsername, findAllUsers} from "../services/users-service";
import axios from "axios";
import {UserList} from "../components/profile/user-list";

const MOCKED_USERS = [
    {username: 'ellen_ripley', password: 'lv426', email: 'repley@weyland.com', _id: "123"},
    {username: 'sarah_conor', password: 'illbeback', email: 'sarah@bigjeff.com', _id: "234"},
    {username: 'dd', password: 'dd123', email: 'dd@123', _id: "345"}
]

test("User table renders static user array", () => {
    render(
        <HashRouter>
            <UsersTable users={MOCKED_USERS}/>
        </HashRouter>
    )
    MOCKED_USERS.forEach(u => {
        const userElement = screen.getByText(u.username, {exact: false})
        expect(userElement).toBeInTheDocument();
    })
})

describe('user table renders async', () => {
    // sample user to insert
    const ripley = {
        username: 'ellenripley',
        password: 'lv426',
        email: 'ellenripley@aliens.com',
        role: 'ADMIN'
    };

    beforeAll(() => {
        return deleteUsersByUsername(ripley.username);
    })

    afterAll(() => {
        return deleteUsersByUsername(ripley.username);
    })

    test('user table renders async', async () => {
        const newUser = await createUser(ripley);
        const users = await findAllUsers();
        render(
            <HashRouter>
                <UserList users={users}/>
            </HashRouter>);
        const userElement = screen.getByText(newUser.username);
        expect(userElement).toBeInTheDocument();
    })
})

test("User table renders mocked", async () => {
    const mock = jest.spyOn(axios, 'get')
    mock.mockImplementation(() => Promise.resolve({data: {users: MOCKED_USERS}}))

    const response = await findAllUsers();
    const users = response.users;

    mock.mockRestore();
    render(
        <HashRouter>
            <UsersTable users={users}/>
        </HashRouter>
    )

    MOCKED_USERS.forEach(u => {
        const userElement = screen.getByText(u.username, {exact: false})
        expect(userElement).toBeInTheDocument();
    })
})
