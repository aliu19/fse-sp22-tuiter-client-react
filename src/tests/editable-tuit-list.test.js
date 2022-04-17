import EditableTuits from "../components/admin/tuits-manager/editable-tuits";
import {screen, render} from "@testing-library/react";
import {HashRouter} from "react-router-dom";
import {api, createTuitByUser, deleteTuitByContent, findAllTuits} from "../services/tuits-service";
import {createUser, deleteUsersByUsername} from "../services/users-service";

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

describe('editable tuit list renders async'
         + 'with edit-button', ()=> {
    // samples tuits we'll insert to then retrieve
    const tuitContents = [
        "adam's Tuit 1", "adam's Tuit 2", "adam's Tuit 3"
    ]

    // sample user to insert as the author of tuits
    const user = {
        username: 'adam_smith',
        password: 'adam123',
        email: 'wealth@nations.com'
    };

    // setup data before test
    beforeAll(() => {
        let promises = [];
        // delete the user we inserted
        promises.push(deleteUsersByUsername(user.username));
        // delete tuits we inserted
        tuitContents.map(content => {
            promises.push(deleteTuitByContent(content));
        })
        return Promise.all(promises);
    })

    // clean up after test runs
    afterAll(()=> {
        let promises = []
        // delete the user we inserted
        promises.push(deleteUsersByUsername(user.username));
        // delete tuits we inserted
        tuitContents.map((content) => {
            let deletePromise = deleteTuitByContent(content);
            promises.push(deletePromise)
        })
        return Promise.all(promises)
    })

    test('editable tuit list renders async'
         + 'with edit-button', async () => {
        const author = await createUser(user);
        let promises = [];
        tuitContents.map(content => {
            promises.push(createTuitByUser(author._id, {tuit: content, postedOn: "2022-03-09T00:00:00.000Z"}));
        })
        await Promise.all(promises);
        const tuits = await findAllTuits();
        render(
            <HashRouter>
                <EditableTuits allTuits={tuits}/>
            </HashRouter>
        )

        // Knowing there are 3 tuits by adam
        tuitContents.forEach(content => {
            const tuitElements = screen.getAllByText(content, {exact: false});
            tuitElements.forEach(e => expect(e).toBeInTheDocument());
        })
        // knowing there is adman names
        let nameElements = screen.getAllByText(user.username, {exact: false});
        nameElements.forEach((e) => expect(e).toBeInTheDocument());
        const editButtons = screen.getAllByTestId('edit-button', {exact: true});
        expect(editButtons.length).toBeGreaterThanOrEqual(3);
    })
})

test('editable tuit list renders mocked', async () => {
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
