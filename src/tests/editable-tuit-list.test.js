import EditableTuits from "../components/admin/tuits-manager/editable-tuits";
import {screen, render} from "@testing-library/react";
import {HashRouter} from "react-router-dom";
import {api, findAllTuits} from "../services/tuits-service";

const MOCKED_TUITS = [
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

test('editable tuit list renders static tuit array'
     + 'with edit buttons for each tuit', () => {
    render(
        <HashRouter>
            <EditableTuits allTuits={MOCKED_TUITS}/>
        </HashRouter>
    )
    MOCKED_TUITS.forEach(t => {
        let name = t.postedBy.username
        // substring match, ignore case, same as /alice/i
        const nameElements = screen.getAllByText(name, {exact: false});
        const tuitElements = screen.getAllByText(t.tuit, {exact: false});
        nameElements.forEach(e => expect(e).toBeInTheDocument());
        tuitElements.forEach(e => expect(e).toBeInTheDocument());

    })
    const editButtons = screen.getAllByTestId('edit-button', {exact: true});
    expect(editButtons.length).toBe(3);
});

test('tuit list renders mocked', async () => {
    const mock = jest.spyOn(api, 'get');
    mock.mockImplementation(() =>
                                Promise.resolve({data: {tuits: MOCKED_TUITS}}));
    const response = await findAllTuits();
    const tuits = response.tuits;

    mock.mockRestore();  // restore original implementation

    render(
        <HashRouter>
            <EditableTuits allTuits={tuits}/>
        </HashRouter>
    )

    MOCKED_TUITS.forEach(t => {
        let name = t.postedBy.username
        // substring match, ignore case, same as /alice/i
        const nameElements = screen.getAllByText(name, {exact: false});
        const tuitElements = screen.getAllByText(t.tuit, {exact: false});
        nameElements.forEach(e => expect(e).toBeInTheDocument());
        tuitElements.forEach(e => expect(e).toBeInTheDocument());

    })
    const editButtons = screen.getAllByTestId('edit-button', {exact: true});
    expect(editButtons.length).toBe(3);
});
