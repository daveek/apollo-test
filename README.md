# Apollo Test

* [Requirements](#requirements)
* [Setup](#setup)

## Requirements

* Build an Apollo test app which consumes a REST endpoint.
* The GraphQL queries should be unaware of REST dependencies and not be tainted in any way allowing for a clean break when our dependencies migrate to GraphQL.
* There should be minimal contained REST knowledge within the Apollo link chain.
* There should be no errors resulting from missing \_\_typename fields
* Any fields that are queried should be backfilled with null when the REST endpoint responds with undefined.

## Setup

First, ensure you have NodeJS (`^8.0.0` suggested) and [Yarn](https://yarnpkg.com/en/docs/install) installed.

This project is setup as a monorepo, and contains independent client and server applications. The dependencies for both of these applications can be installed from the root of this project via [Yarn workspaces](https://yarnpkg.com/lang/en/docs/workspaces/). Yarn workspaces offer much more than just dependency management, but that will be as far as we go with them for the purposes of this demo.

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
