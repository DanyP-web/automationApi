import * as supertest from 'supertest';
import {getUser} from "../../data/user"
import {signUp, signUp2, logIn} from "../../data/helpers";
const request = supertest("localhost:8001/api/v1")

describe('LOGIN', () => {
    describe('POSITIVE TESTING', () => {
        let userImport = getUser();
        beforeEach(async() => {
            await signUp(userImport)
        })

        it('login user', async() => {
           // const res = await request.post("/users/signup").send(userImport).expect(201)

            // const loginRes = await request.post("/users/login")
            //     .send({
            //         email: userImport.email,
            //         password: userImport.password,
            //     }).expect(200)
            const logInRes = await logIn({
                email: userImport.email,
                password: userImport.password,
            })
            console.log(logInRes)
        })
        it('login user option 2', async() => {
            await logIn({
                email: userImport.email,
                password: userImport.password,
            }).then(el2=> {
                expect(el2.body.status).toBe('success')
                console.log(el2.body)
            })
        })
        it('login user option 3 using try and catch', async() => {
            try{
                // await signUp(userImport).then((el)=>{
                //     expect(el.body.status).toBe('success')
                //     console.log(el.body,'res')
                // })
                await logIn({
                    email: userImport.email,
                    password: userImport.password,
                }).then(el2=> {
                    expect(el2.body.status).toBe('success')
                    console.log(el2.body)
                })
            } catch (error){
                console.log('Error during logIn process',error)
                //throw Error(error)
            }
        })
        it('login user option 4 using then', async() => {
            // signUp(userImport)
            //     .then((res)=>{
            //         expect(res.body.status).toBe('success')
                    return logIn({
                        email: userImport.email,
                        password: userImport.password,
                    })
            //     })
                .then((res2)=>{
                    expect(res2.statusCode).toBe(200)
                    console.log(res2.body)
                })
                .catch(err=>{
                    console.log(err)
                })
        })
        it.only("login user option 5 using .end with Promise", (done) => {
            //signUp2(userImport)
            signUp2(userImport).end((err, res)=>{
                if(err) return done(err);
                expect(res.body.status).toBe('success')
                console.log(res.body)
                done();
            })
        })
        })

    describe('NEGATIVE TESTING', () => {

        let userImport = getUser();
        beforeEach(async() => {
            await signUp(userImport)
        })

        it('get error when trying login without username', async () => {

        })
        it('get error when trying login without password', async () => {

        })
        it('get error when trying login with wrong username', async () => {

        })
        it('get error when trying login with wrong password', async () => {

        })

    })
    })