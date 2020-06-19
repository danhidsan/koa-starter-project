import * as chai from 'chai'
import chaiHttp = require('chai-http')

chai.use(chaiHttp)

import server from '../src/index'
import User, { IUser } from '../src/models/user'

describe('User API', () => {

  // to use in all requests
  var userId: string 
  var token: string

  after((done) => {
    User.remove({username: 'testingUser'}).exec().then(() => {
      done()
    })
  })

  /**
   * POST user
   */
  describe('Create user', () => {
    
    it('Create user success', (done) => {

      // correct user
      var user = {
        username: 'testingUser',
        email: 'testing3@example.com',
        firstName: 'testing user',
        password: 'testing'
      }

      chai.request(server)
        .post('/api/user')
        .send(user)
        .end((err, res) => {
          chai.expect(res).to.be.status(200)
          chai.expect(res.body).to.be.instanceOf(Object)
          chai.expect(res.body).to.have.nested.property('user.username', 'testingUser')
          userId = res.body.user._id
          done()
        })
    })
    it('Create user bad request', (done) => {

      // user without username
      var user = {
        email: 'testing@example.com',
        firstName: 'testing',
        password: 'testing'
      }

      chai.request(server)
        .post('/api/user')
        .send(user)
        .end((err, res) => {
          chai.expect(res).to.be.status(400)
          done()
        })
    })
  })

  /**
   * GET all users
   */
  describe('Get all users', () => {
    it('Get all users success', (done) => {
      chai.request(server)
        .post('/api/login')
        .send({email: 'testing3@example.com', password: 'testing'})
        .end((err, authRes) => {
          chai.expect(authRes).to.have.status(200);
          chai.expect(authRes.body).to.have.property('token')

          // store token for future requests
          token = authRes.body.token

          chai.request(server)
            .get('/api/user')
            .set('Authorization', `Bearer ${token}`)
            .end((listErr, listRes) => {
              chai.expect(listRes).to.have.status(200)
              chai.expect(listRes.body).to.be.instanceOf(Array)
              done()
            })
        })
    })
    it('Get all users auth error', (done) => {
      chai.request(server)
        .get('/api/user')
        .set('Authorization', `Bearer failToken`)
        .end((listErr, listRes) => {
          chai.expect(listRes).to.have.status(401)
          done()
        })
    })
  })

  /**
   * GET by id
   */
  describe('Get user by id', () => {
    it('Get user by id success', (done) => {
      chai.request(server)
        .get(`/api/user/${userId}`)
        .set('Authorization', `Bearer ${token}`)
        .end((getErr, getRes) => {
          chai.expect(getRes).to.have.status(200)
          chai.expect(getRes.body).to.be.instanceOf(Object)
          chai.expect(getRes.body).to.have.nested.property('username', 'testingUser')
          done()
        })
    })

    it('Get user by id, user not found', (done) => {
      chai.request(server)
        .get(`/api/user/failId`)
        .set('Authorization', `Bearer ${token}`)
        .end((getErr, getRes) => {
          chai.expect(getRes).to.have.status(404)
          done()
        })
    })

    it('Get user by id auth error', (done) => {
      chai.request(server)
        .get(`/api/user/${userId}`)
        .set('Authorization', `Bearer failToken`)
        .end((err, res) => {
          chai.expect(res).to.have.status(401)
          done()
        })
    })
  })

  /**
   * PUT update user
   */
  describe('Update user by id', () => {
    it('Update user success', (done) => {
      chai.request(server)
        .put(`/api/user/${userId}`)
        .set('Authorization', `Bearer ${token}`)
        .send({email: 'newEmail@example.com'})
        .end((err, res) => {
          chai.expect(res).to.have.status(200)
          chai.expect(res.body).to.be.instanceOf(Object)
          chai.expect(res.body).to.have.nested.property('user')
          done()
        })
    })

    it('Update user not found', (done) => {
      chai.request(server)
        .put(`/api/user/failId`)
        .set('Authorization', `Bearer ${token}`)
        .send({email: 'newEmail@example.com'})
        .end((err, res) => {
          chai.expect(res).to.have.status(404)
          done()
        })
    })

    it('Update user by id auth error', (done) => {
      chai.request(server)
        .get(`/api/user/${userId}`)
        .set('Authorization', `Bearer failToken`)
        .end((err, res) => {
          chai.expect(res).to.have.status(401)
          done()
        })
    })
  })
})