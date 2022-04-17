import SearchTuits from "../components/admin/tuits-manager/search-tuits";
import {screen, render, waitFor} from "@testing-library/react";
import {api} from "../services/tuits-service";
import {HashRouter} from "react-router-dom";

const searchResult = [
    {
        tuit: "alice's tuit",
        postedBy: {
            username: "Alice",
            password: "alice123",
            email: "alice@weyland.com",
            _id: "123"
        },
        _id: "12"
    },
    {
        tuit: "bob's tuit",
        postedBy: {
            username: "Bob",
            password: "bob123",
            email: "bob@123.com",
            _id: "234"
        },
        _id: "34"
    },
    {
        tuit: "charlie's tuit",
        postedBy: {
            username: "Charlie",
            password: "charlie123",
            email: "charlie@123.com",
            _id: "345"
        },
        _id: "45"
    }
];

describe('search tuit renders search result mocked', () => {
    const mock = jest.spyOn(api, 'get');

    afterAll(() => {
        mock.mockRestore();
    })

    test('search tuit renders search result mocked', async () => {
        mock.mockImplementation(() => Promise.resolve({data: {tuits: searchResult}}))

        render(
            <HashRouter>
                <SearchTuits/>
            </HashRouter>
        )

        await waitFor(() => {
            searchResult.map(eachTuit => {
                let name = eachTuit.postedBy.username
                // substring match, ignore case, same as /alice/i
                // check if all tuits are rendered
                const nameElements =  screen.getAllByText(name, {exact: false});
                const tuitElements =  screen.getAllByText(eachTuit.tuit, {exact: false});
                nameElements.forEach(e => expect(e).toBeInTheDocument());
                tuitElements.forEach(e => expect(e).toBeInTheDocument());
            })
            const editButtons = screen.getAllByTestId('edit-button', {exact: true});
            expect(editButtons.length).toBe(3);
        })
    })
})