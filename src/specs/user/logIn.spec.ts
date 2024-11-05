import * as supertest from 'supertest';
import {getUser} from "../../data/user"
import {signUp, signUp2, logIn} from "../../data/helpers";
const request = supertest("localhost:8001/api/v1")

describe('POSITIVE TESTING', () => {
    describe('LOGIN', () => {
        let userImport = getUser();

        it('login user', async() => {
           // const res = await request.post("/users/signup").send(userImport).expect(201)
            const res = await signUp(userImport)
            console.log(res.body, `res`)
            // const loginRes = await request.post("/users/login")
            //     .send({
            //         email: userImport.email,
            //         password: userImport.password,
            //     }).expect(200)
            const logInRes = await logIn({
                email: userImport.email,
                password: userImport.password,
            })
        })
        it('login user option 2', async() => {
            await signUp(userImport).then((el)=>{
                expect(el.body.status).toBe('success')
                console.log(el.body,'res')
            })
            await logIn({
                email: userImport.email,
                password: userImport.password,
            }).then(el2=> {
                expect(el2.body.status).toBe('success')
            })
        })
        it('login user option 3 using try and catch', async() => {
            try{
                await signUp(userImport).then((el)=>{
                    expect(el.body.status).toBe('success')
                    console.log(el.body,'res')
                })
                await logIn({
                    email: userImport.email,
                    password: userImport.password,
                }).then(el2=> {
                    expect(el2.body.status).toBe('success')
                })
            } catch (error){
                console.log('Error during logIn process',error)
                //throw Error(error)
            }
        })
        it('login user option 4 using then', async() => {
            signUp(userImport)
                .then((res)=>{
                    expect(res.body.status).toBe('success')
                    return logIn({
                        email: userImport.email,
                        password: userImport.password,
                    })
                })
                .then((res2)=>{
                    expect(res2.statusCode).toBe(201)
                })
                .catch(err=>{
                    console.log(err)
                })
        })



        })
    })