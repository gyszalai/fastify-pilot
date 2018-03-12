const schemas = require('./schemas.user')

const dummyUser = {
  id: 'dummy',
  name: 'Dummy User',
  email: 'dummyuser@dummysite.com',
  age: 35,
  state: 'ACTIVE'
}

module.exports = (fastify, options, next) => {
  fastify.get('/users/:id', {
    schema: {
      description: 'You can modify user data with this call',
      tags: ['user'],
      summary: 'Get the properties of the user identified by the id URI parameter',
      params: schemas.getParams,
      response: { 200: schemas.response },
      security: [ { 'api_key': [] } ]
    }
  }, async (req, reply) => {
    return dummyUser
  })

  fastify.put('/users/:id', {
    schema: {
      description: 'You can modify user data with this call',
      tags: ['user'],
      summary: 'Post the new properties of the user identified by the id URI parameter',
      params: schemas.modifyParams,
      body: schemas.modifyBody,
      response: { 200: schemas.response },
      security: [ { 'api_key': [] } ]
    }
  }, (req, reply) => {
    return req.body
  })

  fastify.post('/users', {
    schema: {
      description: 'You can create a new user with this call',
      tags: ['user'],
      summary: 'Post the properties of the new user you would like to create',
      body: schemas.createBody,
      response: { 201: schemas.response },
      security: [ { 'api_key': [] } ]
    }
  }, (req, reply) => {
    return req.body
  })

  next()
}
