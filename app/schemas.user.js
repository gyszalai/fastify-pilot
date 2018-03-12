const id = { type: 'string', pattern: '^[a-z0-9]{10}$' }
const name = { type: 'string', minLength: 1, maxLength: 100 }
const email = { type: 'string', minLength: 3, maxLength: 50 }
const age = { type: 'integer', min: 18, max: 99 }
const state = { type: 'string', enum: ['ACTIVE', 'INACTIVE'] }

const getParams = {
  type: 'object',
  properties: { id },
  required: [ 'id' ]
}

const createBody = {
  type: 'object',
  properties: { name, email, age, state },
  required: [ 'name', 'email', 'age', 'state' ],
  example: {
    id: 'dummy',
    name: 'Dummy User',
    email: 'dummyuser@dummysite.com',
    age: 35,
    state: 'ACTIVE'
  }
}

const modifyBody = {
  type: 'object',
  properties: { name, email, age }
}

const modifyParams = {
  type: 'object',
  properties: { id },
  required: [ 'id' ]
}

const response = {
  description: 'User data',
  type: 'object',
  properties: { id, name, email, age, state }
}

module.exports = {
  getParams, createBody, modifyBody, modifyParams, response
}
