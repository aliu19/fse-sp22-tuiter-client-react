import {
  userTogglesTuitBookmarks,
  findAllTuitsBookmarkedByUser,
  findAllBookmarks
} from "../services/bookmarks-service"
import {createUser, deleteUsersByUsername} from "../services/users-service";
import {createTuitByUser, deleteTuitByContent} from "../services/tuits-service";

const adam = {
  username: 'adam_smith',
  password: 'not0sum',
  email: 'wealth@nations.com'
};

const sowell = {
  username: 'thommas_sowell',
  password: 'compromise',
  email: 'compromise@solutions.com'
};

const tuitContents = [
  "Sample 1", "Sample 2", "Sample 3"
]

describe("create a new bookmark", () => {
  beforeAll(() => {
    let promises = [];
    // delete the users we want to insert
    promises.push(deleteUsersByUsername(adam.username));
    promises.push(deleteUsersByUsername(sowell.username));
    // delete tuit we want to insert
    promises.push(deleteTuitByContent(tuitContents[0]))
    return Promise.all(promises);
  })

  afterAll(() => {
    // delete the users and bookmarks we inserted
    promises.push(deleteUsersByUsername(adam.username));
    promises.push(deleteUsersByUsername(sowell.username));
    // delete tuit we inserted
    promises.push(deleteTuitByContent(tuitContents[0]))
    return Promise.all(promises);
  })

  test("create a new bookmark", async () => {
    // create users and tuits
    const author = await createUser(adam);
    const bookmarker = await createUser(sowell)
    let insertedTuit = await createTuitByUser(author._id, {tuit: tuitContents[0], postedOn: "2022-03-09T00:00:00.000Z"})

    const beforeBookmarks = await findAllBookmarks()
    let bookmarkStatus = await userTogglesTuitBookmarks(bookmarker._id, insertedTuit._id)
    const afterBookmarks = await findAllBookmarks()

    expect(bookmarkStatus).toEqual(200)
    expect(afterBookmarks.length).toEqual(beforeBookmarks.length + 1)
  })
})

describe("delete a bookmark", () => {
  beforeAll(() => {
    let promises = [];
    // delete the users we want to insert
    promises.push(deleteUsersByUsername(adam.username));
    promises.push(deleteUsersByUsername(sowell.username));
    // delete tuit we want to insert
    promises.push(deleteTuitByContent(tuitContents[0]))
    return Promise.all(promises);
  })

  afterAll(() => {
    // delete the users and bookmarks we inserted
    promises.push(deleteUsersByUsername(adam.username));
    promises.push(deleteUsersByUsername(sowell.username));
    // delete tuit we inserted
    promises.push(deleteTuitByContent(tuitContents[0]))
    return Promise.all(promises);
  })

  test("delete a bookmark", async () => {
    // create users and tuits
    const author = await createUser(adam);
    const bookmarker = await createUser(sowell)
    let insertedTuit = await createTuitByUser(author._id, {tuit: tuitContents[0], postedOn: "2022-03-09T00:00:00.000Z"})

    // bookmark and unbookmark
    const beforeBookmarks = await findAllBookmarks()
    let bookmarkStatus = await userTogglesTuitBookmarks(bookmarker._id, insertedTuit._id)
    let unbookmarkStatus = await userTogglesTuitBookmarks(bookmarker._id, insertedTuit._id)
    const afterBookmarks = await findAllBookmarks()

    expect(bookmarkStatus).toEqual(200)
    expect(unbookmarkStatus).toEqual(200)
    expect(afterBookmarks.length).toEqual(beforeBookmarks.length)
  })
})

describe("find all tuits bookmarked by a user", () => {
  beforeAll(() => {
    let promises = [];
    // delete the users we want to insert
    promises.push(deleteUsersByUsername(adam.username));
    promises.push(deleteUsersByUsername(sowell.username));
    // delete tuits we want to insert
    tuitContents.map(content => {
      promises.push(deleteTuitByContent(content));
    })
    return Promise.all(promises);
  })

  afterAll(() => {
    let promises = [];
    // delete the users and bookmarks we inserted
    promises.push(deleteUsersByUsername(adam.username));
    promises.push(deleteUsersByUsername(sowell.username));
    // delete tuits we inserted
    tuitContents.map(content => {
      promises.push(deleteTuitByContent(content));
    })
    return Promise.all(promises);
  })

  test("find all tuits bookmarked by a user", async () => {
    // create users and tuits
    const author = await createUser(adam);
    const bookmarker = await createUser(sowell)
    let insertedTuits = tuitContents.map(content => {
      createTuitByUser(author._id, {tuit: content, postedOn: "2022-03-09T00:00:00.000Z"});
    })

    // user bookmarks tuits
    await userTogglesTuitBookmarks(bookmarker._id, insertedTuits[0]._id)
    await userTogglesTuitBookmarks(bookmarker._id, insertedTuits[1]._id)

    const bookmarkedTuits = await findAllTuitsBookmarkedByUser(bookmarker_id)

    expect(bookmarkedTuits.length).toEqual(2)
    expect(bookmarkedTuits[0].tuit).toEqual(tuitContents[0])
    expect(bookmarkedTuits[1].tuit).toEqual(tuitContents[1])
  })
})

