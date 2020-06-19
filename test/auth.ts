import * as chai from 'chai'
import chaiHttp = require('chai-http')

import User, { IUser } from '../src/models/user'

chai.use(chaiHttp)

import server from '../src/index'

// Testing user
var user: IUser

describe('Auth API', () => {
  /**
   * POST request
   */
  describe('Login Test', () => {

    it('Login success', (done) => {
      chai.request(server)
        .post('/api/login')
        .send({email: 'testing2@testing.com', password: 'testing2'})
        .end((err, res) => {
          chai.expect(err).to.be.null
          chai.expect(res).to.have.status(200);
          chai.expect(res.body).to.have.property('token')
          done()
        })
    })

    it('Login failure: user not found', (done) => {
      chai.request(server)
        .post('/api/login')
        .send({email: 'testing2@testing.com', password: 'failPass'})
        .end((err, res) => {
          chai.expect(err).to.be.null
          chai.expect(res).to.have.status(404);
          done()
        })
    })
  })
})