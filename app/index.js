const uuid = require('uuid')

const prettyPrint = process.env.PRETTY ? { forceColor: true } : undefined

// Require the framework and instantiate it
const fastify = require('fastify')({
  logger: {
    level: 'debug',
    genReqId: () => {
      return uuid.v4()
    },
    prettyPrint
  }
})

console.log('>>>>>>>>>>>>>> ', fastify.log.levels.values)

// // Declare a route
// fastify.get('/', async (request, reply) => {
//   return { hello: 'world' }
// })

fastify.use(async (request, reply, next) => {
  console.log('before: ', Date.now())
  await next()
  console.log('after: ', Date.now())
})

fastify.route({
  method: 'GET',
  url: '/greet',
  schema: {
    // request needs to have a querystring with a `name` parameter
    querystring: {
      type: 'object',
      required: ['name'],
      properties: {
        name: { type: 'string' }
      },
      additionalProperties: false
    },
    // the response needs to be an object with an `hello` property of type 'string'
    response: {
      200: {
        type: 'object',
        properties: {
          hello: { type: 'string' }
        }
      }
    },
    // this function is executed for every request before the handler is executed
    beforeHandler: async (request, reply) => {
      // E.g. check authentication
    }
  },
  handler: async (request, reply) => {
    request.log.debug('greeting name: ', request.query.name)
    return { hello: request.query.name }
  }
})

// Run the server!
const start = async () => {
  try {
    await fastify.listen(3000)
    fastify.log.info(`server listening on`, fastify.server.address())
  } catch (err) {
    fastify.log.error(err)
    process.exit(1)
  }
}
start()
