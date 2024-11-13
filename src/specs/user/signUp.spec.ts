import * as supertest from 'supertest'
const request = supertest('localhost:8001/api/v1')
import {user} from '../../data/user'
import {getUser} from '../../data/user'

describe('USER SIGNUP', () => {
    describe('POSITIVE TESTING', () => {
        it('Create a new user', async () => {
            const res = await request.post("/users/signup")
                .send({
                    "name": "Dany",
                    "email": "dany@gmail.com",
                    "password": "pass1234",
                    "passwordConfirm": "pass1234"
                }).expect(201)
            expect(res.body.data.user.name).toBe("Dany")
            console.log(res.body, 'res');
        })
        it('Create a new user', async () => {
            const res = await request.post("/users/signup")
                .send(user).expect(201)
            expect(res.body.data.user.name).toBe("Dany")
            expect(res.body.data.user.email).toBe("dany9@gmail.com")
            expect(res.body.data.status).toBe("success")
            console.log(res.body, 'res');
        })


        it('Create a new user using faker', async () => {
            const res = await request.post("/users/signup")
                .send(user).expect(201)
            console.log(res.body,'res');
            expect(res.body.data.user.name).toBe(user.name)
            expect(res.body.data.user.email).toBe(user.email.toLowerCase())
            //expect(res.body.data.status).toBe("success")
        })

        it('Create a new user using faker2', function (done) {
            let userImport = getUser()
            const res = request
                .post("/users/signup")
                .send(userImport)
                .expect(201)
                .end(function (err, res) {
                    if (err) return done(err)
                    console.log(res.body, 'res');
                    console.log(userImport, 'userImport')
                    expect(res.body.data.user.name).toBe(userImport.name)
                    expect(res.body.data.user.email).toBe(userImport.email.toLowerCase())
                    expect(res.body.status).toBe("success")
                    return done()
                })
        })

    })
    describe('NEGATIVE TESTING', () => {
        it('Should not create new user with existing email', async () => {
            const res = await request.post("/users/signup").send({
                "name": "Dany",
                "email": "dany@gmail.com",
                "password": "pass1234",
                "passwordConfirm": "pass1234"
            }).expect(500);
            expect(res.body.status).toBe("error")
            //expect(res.body.message).toBe("email already exists")
            console.log(res.body, 'res');

        })

        it('Should not create user without name', async () => {
            const res = await request.post("/users/signup")
                .send({
                    "name": "",
                    "email": "dany@gmail.com",
                    "password": "pass1234",
                    "passwordConfirm": "pass1234"
                }).expect(500)
            expect(res.body.status).toBe("error")
            expect(res.body.message).toBe('User validation failed: name: Please tell us your name!')
            console.log(res.body, 'res');
        })

        it('Should not create user without email', async () => {
            const res = await request.post("/users/signup")
                .send({
                    "name": "Dany",
                    "email": "",
                    "password": "pass1234",
                    "passwordConfirm": "pass1234"
                }).expect(500)
            expect(res.body.status).toBe("error")
            expect(res.body.message).toBe("User validation failed: email: Please provide your email")
            console.log(res.body, 'res');
        })

        it('Should not create user without matching password', async () => {
            const res = await request.post("/users/signup")
                .send({
                    "name": "Dany",
                    "email": "dany@gmail.com",
                    "password": "pass1234",
                    "passwordConfirm": "pass12345"
                }).expect(500)
            expect(res.body.status).toBe("error")
            expect(res.body.message).toBe("User validation failed: passwordConfirm: Passwords are not the same!")
            console.log(res.body, 'res');
        })

    })



})