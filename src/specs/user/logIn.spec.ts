import * as supertest from 'supertest';
import {getUser} from "../../data/user"
import {signUp, signUp2, logIn, logIn2} from "../../data/helpers";
const request = supertest("localhost:8001/api/v1")

describe('LOGIN', () => {
    describe('POSITIVE TESTING', () => {
        let userImport = getUser('user');
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
            }).then(el=> {
                expect(el.body.status).toBe('success')
                console.log(el.body)// is el response?
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
        it("login user option 4 using then", () => {
            return signUp(userImport)
                .then((res) => {
                    expect(res.body.status).toBe("success");
                    return logIn({
                        email: userImport.email,
                        password: userImport.password,
                    });
                })
                .then((res2) => {
                    expect(res2.statusCode).toBe(201); // This line will fail if statusCode is not 201
                })
                .catch((err) => {
                    throw new Error(`Test failed due to unexpected response: ${err}`);
                });
        });
        it("login user option 5 using .end with Promise", (done) => {
            //signUp2(userImport)
            logIn2(userImport)
                .end((err, res)=>{
                if(err) return done(err);
                expect(res.body.status).toBe('success')
                console.log(res.body)
                done(); //How to apply hook here?
            })
        })
        })

    describe('NEGATIVE TESTING', () => {

        let userImport = getUser('user');
        beforeEach(async() => {
            await signUp(userImport)
        })

        it('get error when trying login without username', async () => {
            await logIn({
                email: '',
                password: userImport.password,
            }).then(el=> {
                expect(el.body.status).toBe('fail')
                expect(el.body.message).toBe('Please provide email and password!')
                console.log(el.body)
            })
        })


        it('get error when trying login without password', async () => {
            const logInRes = await logIn({
                email: userImport.email,
                password: '',
            })
            expect(logInRes.body.status).toBe('fail')
            expect(logInRes.body.message).toBe('Please provide email and password!')
            console.log(logInRes.body)
        })


        it('get error when trying login with wrong username', async () => {
            const logInRes = await logIn({
                email: 'userImport.email',
                password: userImport.password,
            })
            expect(logInRes.body.status).toBe('fail')
            expect(logInRes.body.message).toBe('Incorrect email or password')
            console.log(logInRes.body)
        })
        it('get error when trying login with wrong password', async () => {
            const logInRes = await logIn({
                email: userImport.email,
                password: 'userImport.password',
            })
            // expect(logInRes.body.status).toBe('fail')
            // expect(logInRes.body.message).toBe('Incorrect email or password')
            console.log(logInRes.body) // Why would test pass this way?
        })

    })
    })