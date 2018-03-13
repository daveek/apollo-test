# Apollo Test

* [Project Requirements](#project-requirements)
* [Setup](#setup)
* [Structure](#structure)
* [Notes](#notes)
  * [Wrap REST API on Server](#wrap-rest-api-on-server)
  * [Query Batching](#query-batching)
  * [Client Services](#client-services)

## Project Requirements

* Build an Apollo test app which consumes a REST endpoint.

> A mock REST API has been implemented in `~/server`, you can reference `~/server/src/index.js` for a summary of the available resources. For each resource, the standard RESTful CRUD operations are provided.

* The GraphQL queries should be unaware of REST dependencies and not be tainted in any way allowing for a clean break when our dependencies migrate to GraphQL.

> All queries inside of the React application are 100% agnostic to the server implementation; they are just your typical GraphQL queries, nothing special. I noticed there were some GraphQL to REST bridges out in the wild, but these seemed to defeat much of the purpose of GraphQL since they leaked API details into the client (i.e., you had to specify resource locations/methods, or they made some assumption about your REST implementation [there's always _something_ different in the real world]).
>
> My solution took advantage of apollo-link-schema, which allowed you to define on the client what very closely resembles what would be implemented on a GraphQL server: custom resolvers for each field. My original implementation had the client using our own link which handled proxying queries to a schema instance. Upon more research, I discovered that this is _exactly_ what apollo-link-schema does, and so I have deferred to that since this project focuses on utilizing available Apollo links.

* There should be minimal contained REST knowledge within the Apollo link chain.

> See above for more. There is in fact no REST knowledge in the chain, ignoring of course our single link which handles resolving queries against our own schema. As soon as a GraphQL server is available, all the client has to do is replace the REST link with a simpler one; for example: apollo-link-http. No queries have to change whatsoever.

* There should be no errors resulting from missing \_\_typename fields

> There are none, hooray!

* Any fields that are queried should be backfilled with null when the REST endpoint responds with undefined.

> In trying to clarify to clarify the intention of this requirement, it sounds like it mandates that any fields specified in a GraphQL type should resolve to null if they are not provided by the REST API. If this understanding is correct, then you'll find the correct implementation here. If a node in the graph is unable to be resolved, an error is set as would be expected with GraphQL.

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

### Wrap REST API on Server

I understand that the inability to wrap the REST API with a server was part of the restrictions for this demo, but it's immediately where my mind went so I wanted to at least make a note of why it would be preferable if it were possible:

* Absolutely nothing would have to change on client after REST dependencies are migrated
* Fewer network calls, since server would be responsible for proxying REST API

Note that I considered whether to investigate the ability to intercept just a subset of queries and proxy those to the REST API, but concluded that the limitation of the REST interception is only necessary when we don't have any GraphQL implementation on the server (i.e., this exercise). As soon as a GraphQL server is available, it should assume all proxying responsibility. We could get fancy with [split](https://www.apollographql.com/docs/link/composition.html#directional) from Apollo Link, but I think it's best to make the link chain as homogoneous as possible for all queries.

### Query Batching

One of my biggest worries with wrapping a REST API in a GraphQL layer was that inefficient queries could hammer the network. Say, for example, you independently transform an array of identifiers into
individual GraphQL queries for those resources. Without any batching — and assuming none of those records live in cache yet — an http request will be made for each id.

> Aside!
>
> A traditional GraphQL server is no silver bullet here, but you're far less likely to run into issues at a smaller scale. One common thing to look out for with GraphQL queries is their size, since the whole query is wired to the server (unlike our REST wrapper which just resolved nodes locally).
>
> One workaround for this is to use a library such as `apollo-link-persisted-queries`, which will send a hash of your query to the server (a hash being much a much smaller payload). The server keeps track of a mapping of hashes --> queries, and if your hash is recognized it will respond with the result. If not, another request is made with the entire query, which will then be stored as a hash for future requests.

If I had more time for this demo I would have liked to look for ways to batch these types of requests (presumably with [apollo-link-batch](https://github.com/apollographql/apollo-link/tree/master/packages/apollo-link-batch)). For example, rather than retrieving `/boos/5`, `books/6`, `books/n`, those could be batched into a single request to the server, e.g. `/books?id[]=5&id[]=6&id[]=n`. I'm almost certain this is possible by using the aforementioned link and transforming/grouping similar operations.

### Client Services

The modules in `~/client/src/services` emulate how remote resources might already be wrapped in a real-world application. There's nothing special to them beyond their usual purpose of hiding implementation details (e.g. network fetching logic) in a sane interface; consumers simply receive promises and aren't considered about serialization, parsing, etc.
