const uuid = require('uuid')

// Require the framework and instantiate it
const fastify = require('fastify')({
  logger: {
    level: 'debug',
    genReqId: () => {
      return uuid.v4()
    },
    prettyPrint: process.env.NODE_ENV === 'dev' ? { forceColor: true } : undefined // pretty print in development mode
  }
})

// register swagger plugin
fastify.register(require('fastify-swagger'), {
  exposeRoute: true,
  swagger: {
    info: {
      title: 'Test swagger',
      description: 'testing the fastify swagger api',
      version: '0.1.0'
    },
    host: 'localhost',
    schemes: ['http'],
    consumes: ['application/json'],
    produces: ['application/json'],
    securityDefinitions: {
      apiKey: {
        type: 'apiKey',
        name: 'apiKey',
        in: 'header'
      }
    }
  }
})

// register simple middleware
fastify.use(async (request, reply, next) => {
  console.log('before: ', Date.now())
  await next()
  console.log('after: ', Date.now())
})

// register user routes
fastify.register(require('./routes.user'))

// Run the server!
const start = async () => {
  try {
    await fastify.ready()
    await fastify.swagger()
    await fastify.listen(3000)
    fastify.log.info(`server listening on`, fastify.server.address())
  } catch (err) {
    fastify.log.error(err)
    process.exit(1)
  }
}
start()

// console.log('>>>>>>>>>>>>>> ', fastify.log.levels.values)
