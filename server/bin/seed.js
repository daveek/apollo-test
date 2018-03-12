/* eslint-disable no-unused-vars */
const Users = require('../src/models/user')
const Authors = require('../src/models/author')
const Books = require('../src/models/book')
const BookShelves = require('../src/models/book-shelf')

// Super naive seeding function to get running quickly.
module.exports = async function seed() {
  // users
  const [David, Levi, Jackie, Kyle] = await Promise.all([
    Users.create({ firstName: 'David', lastName: 'Zukowski' }),
    Users.create({ firstName: 'Levi', lastName: 'Thomason' }),
    Users.create({ firstName: 'Jackie', lastName: 'Kutcher' }),
    Users.create({ firstName: 'Kyle', lastName: 'Turco' }),
  ])

  // authors
  const [
    DavidFosterWallace,
    GeorgeOrwell,
    FScottFitzgerald,
    MarkZDanielewski,
    KurtVonnegut,
    CormacMcCarthy,
  ] = await Promise.all([
    Authors.create({
      firstName: 'David',
      middleName: 'Foster',
      lastName: 'Wallace',
    }),
    Authors.create({
      firstName: 'George',
      lastName: 'Orwell',
    }),
    Authors.create({
      firstName: 'Francis',
      middleName: 'Scott',
      lastName: 'Fitzgerald',
    }),
    Authors.create({
      firstName: 'Mark',
      middleName: 'Z',
      lastName: 'Danielewski',
    }),
    Authors.create({
      firstName: 'Kurt',
      lastName: 'Vonnegut',
    }),
    Authors.create({
      firstName: 'Cormac',
      lastName: 'McCarthy',
    }),
  ])

  // books
  const [
    InfiniteJest,
    KeepTheAspidistraFlying,
    NineteenEightyFour,
    TheGreatGatsby,
    HouseOfLeaves,
    CatsCradle,
    NoCountryForOldMen,
  ] = await Promise.all([
    Books.create({ title: 'Infinite Jest', authorId: DavidFosterWallace.id }),
    Books.create({
      title: 'Keep the Aspidistra Flying',
      authorId: GeorgeOrwell.id,
    }),
    Books.create({ title: '1984', authorId: GeorgeOrwell.id }),
    Books.create({ title: 'The Great Gatsby', authorId: FScottFitzgerald.id }),
    Books.create({ title: 'House of Leaves', authorId: MarkZDanielewski.id }),
    Books.create({ title: "Cat's Cradle", authorId: KurtVonnegut.id }),
    Books.create({
      title: 'No Country for Old Men',
      authorId: CormacMcCarthy.id,
    }),
  ])

  // book shelves
  await Promise.all([
    BookShelves.create({
      title: 'Favorites',
      createdBy: David.id,
      bookIds: [
        InfiniteJest,
        KeepTheAspidistraFlying,
        NineteenEightyFour,
        TheGreatGatsby,
        HouseOfLeaves,
      ].map(book => book.id),
    }),
    BookShelves.create({
      title: 'Classics',
      createdBy: Kyle.id,
      bookIds: [CatsCradle, NoCountryForOldMen].map(book => book.id),
    }),
  ])
}
