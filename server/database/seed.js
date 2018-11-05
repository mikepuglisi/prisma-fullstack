const { Prisma } = require('prisma-binding')

const db = new Prisma({
    typeDefs: 'src/generated/prisma.graphql', // the auto-generated GraphQL schema of the Prisma API
    endpoint: 'http://localhost:4466', // the endpoint of the Prisma API
    debug: true, // log all GraphQL queries & mutations sent to the Prisma API
    // secret: 'mysecret123', // only needed if specified in `database/prisma.yml`
  })

const setup = async () => {
    const post = await db.mutation.createPost(
        {
            data: {
                title: "Hello World 👋",
                text: "I like turtles.",
                isPublished: true           
            }
        }
    )
}

setup();