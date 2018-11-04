const { GraphQLServer } = require('graphql-yoga')
const { Prisma } = require('prisma-binding')

const resolvers = {
  Query: {
    rentals(parent, args, ctx, info) {      
      return ctx.db.query.rentals({}, info)
    },  
    platforms(parent, args, ctx, info) {      
      return ctx.db.query.platforms({}, info)
    },  
    bookings(parent, args, ctx, info) {      
      return ctx.db.query.bookings({}, info)
    },          
    rental(parent, { id } , ctx, info) {
      return ctx.db.query.rental({ where: { id } } , info)
    },  
    platform(parent, { id } , ctx, info) {
      return ctx.db.query.platform({ where: { id } } , info)
    },    
    booking(parent, { id } , ctx, info) {
      return ctx.db.query.booking({ where: { id } } , info)
    },  
    rentalChannels(parent, args, ctx, info) {      
      return ctx.db.query.rentalChannels({}, info)
    },                       
    feed(parent, args, ctx, info) {
      return ctx.db.query.posts({ where: { isPublished: true } }, info)
    },
    drafts(parent, args, ctx, info) {
      return ctx.db.query.posts({ where: { isPublished: false } }, info)
    },
    post(parent, { id }, ctx, info) {
      return ctx.db.query.post({ where: { id } }, info)
    },
  },
  Mutation: {
    createDraft(parent, { title, text }, ctx, info) {
      return ctx.db.mutation.createPost(
        {
          data: {
            title,
            text,
          },
        },
        info,
      )
    },
    deletePost(parent, { id }, ctx, info) {
      return ctx.db.mutation.deletePost({ where: { id } }, info)
    },
    publish(parent, { id }, ctx, info) {
      return ctx.db.mutation.updatePost(
        {
          where: { id },
          data: { isPublished: true },
        },
        info,
      )
    },
  },
}

const server = new GraphQLServer({
  typeDefs: './src/schema.graphql',
  resolvers,
  context: req => ({
    ...req,
    db: new Prisma({
      typeDefs: 'src/generated/prisma.graphql', // the auto-generated GraphQL schema of the Prisma API
      endpoint: 'http://localhost:4466', // the endpoint of the Prisma API
      debug: true, // log all GraphQL queries & mutations sent to the Prisma API
      // secret: 'mysecret123', // only needed if specified in `database/prisma.yml`
    }),
  }),
})

server.start(() => console.log('Server is running on http://localhost:4000'))
