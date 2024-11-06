import * as supertest from 'supertest';
import {getUser} from "../../data/user"
import {signUp, signUp2, logIn, deleteFunction} from "../../data/helpers";
const request =supertest("localhost:8001/api/v1")

describe('POSITIVE TESTING', () => {
    describe('LOGIN', () => {
        let userImport = getUser();
        let cookie:string;
        beforeEach(async() => {
            await signUp(userImport)
        })

        it.only('login user', async() => {
        await logIn({
            email: userImport.email,
            password: userImport.password,
        })
            .then((response)=>{
                console.log(response.body)
                expect(response.body.status).toBe('success')
                expect(response.body.data.user.role).toBe('user')
            })

        })
        it('login user', async() => {
           let resLogin = await logIn({
                email: userImport.email,
                password: userImport.password,
            })

                    console.log(resLogin)
                    expect(resLogin.body.status).toBe('success')
                    expect(resLogin.body.data.user.role).toBe('user')
            cookie = resLogin.headers['set-cookie']
            const deleteData = await deleteFunction(cookie[0])
            expect(deleteData.body.status).toBe('success')

            //let resDelete = request.delete("/users/login")

        })

    })
})
describe('NEGATIVE TESTING', () => {
    it('cannot delete user with wrong token',  () => {


    })
    it('cannot delete user without token',  () => {


    })
})