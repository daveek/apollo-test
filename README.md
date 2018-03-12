# Apollo Test

* [Project Requirements](#project-requirements)
* [Setup](#setup)
* [Structure](#structure)
* [Notes](#notes)
  * [Client Services](#client-services)

## Project Requirements

* Build an Apollo test app which consumes a REST endpoint.
* The GraphQL queries should be unaware of REST dependencies and not be tainted in any way allowing for a clean break when our dependencies migrate to GraphQL.
* There should be minimal contained REST knowledge within the Apollo link chain.
* There should be no errors resulting from missing \_\_typename fields
* Any fields that are queried should be backfilled with null when the REST endpoint responds with undefined.

## Setup

First, ensure you have NodeJS (`^8.0.0` suggested) and [Yarn](https://yarnpkg.com/en/docs/install) installed. With your environment setup, complete the following steps and you'll be up and running:

```sh
# Clone the project
git clone https://github.com/levithomason/apollo-test
cd apollo-test
git checkout feature/apollo-link

# Install dependencies
yarn

# Start both the client and server simultaneously
# Client: http://localhost:3000 (should automatically open)
# Server: http://localhost:4000
yarn start

# NOTE!
# On the off chance that this script does not work for you, you can
# still run each application individually. Simply cd into the desired
# directory {client,server} and run `yarn start`.
```

## Structure

This project is setup as a monorepo, and contains independent client and server applications. The dependencies for both of these applications can be installed from the root of this project via [Yarn workspaces](https://yarnpkg.com/lang/en/docs/workspaces/).

Workspaces provide first-class support for managing multiple packages in a single project, and are especially well-suited to npm libraries. However, they can also be utilized for applications, helping share libraries and modules, and manage common and per-package dependencies. For the purposes of this demo we won't be taking advantage of anything more than the dependency management, but it's worth noting that there's much more to them.

```
.
├── bin                       # global scripts
├── client                    # client application
│   ├── public                # static assets
│   └── src                   # client source code
│       ├── components        # general UI components
│       ├── graphql           # apollo client implementation
│       ├── services          # service abstractions for retrieving resources
│       └── utils             # client-specific utilities
└── server                    # server application
    ├── bin                   # server-specific scripts
    │   ├── seed.js           # seed the in-memory "db" with mock data
    │   └── start.js          # start the server
    └── src                   # server source code
        ├── api               # route definitions for API
        ├── models            # model definitions
        └── utils             # server-specific utilities
```

## Notes

* Would prefer to implement REST wrapper on server if possible in real world
  * Absolutely nothing would have to change on client after REST dependencies are migrated
  * Fewer network calls, since server would be responsible for proxying REST API
* Considered whether to investigate the ability to intercept just a subset of queries and proxy those to the REST API. Concluded that the limitation of the REST interception is only necessary when we don't have any GraphQL implementation on the server (i.e., this exercise); as soon as a GraphQL server is available, it should assume all proxying responsibility. We could get fancy with [split](https://www.apollographql.com/docs/link/composition.html#directional) from Apollo Link, but I think it's best to avoid mixing muddying the query logic too much.

### Client Services

* Emulate how remote resources might already be wrapped in a real-world application
* Hide implementation details (e.g. network fetching logic) in a sane interface; consumers simply receive promises and aren't considered about serialization, parsing, etc.
