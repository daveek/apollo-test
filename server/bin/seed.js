const Users = require('../src/models/user')
const Authors = require('../src/models/author')
const Books = require('../src/models/book')
const BookShelves = require('../src/models/book-shelf')

module.exports = async function seed() {
  // users
  const [David, Levi, Jackie, Amanda] = await Promise.all([
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
  ])

  // books
  const [
    InfiniteJest,
    KeepTheAspidistraFlying,
    NineteenEightyFour,
    TheGreatGatsby,
    HouseOfLeaves,
  ] = await Promise.all([
    Books.create({ title: 'Infinite Jest', authorId: DavidFosterWallace.id }),
    Books.create({
      title: 'Keep the Aspidistra Flying',
      authorId: GeorgeOrwell.id,
    }),
    Books.create({ title: '1984', authorId: GeorgeOrwell.id }),
    Books.create({ title: 'The Great Gatsby', authorId: FScottFitzgerald.id }),
    Books.create({ title: 'House of Leaves', authorId: MarkZDanielewski.id }),
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
  ])
}
