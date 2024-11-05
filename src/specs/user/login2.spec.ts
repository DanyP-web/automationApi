import * as supertest from 'supertest';
import {getUser} from "../../data/user"
import {signUp,signUp2, logIn} from "../../data/helpers";
const request =supertest("localhost:8001/api/v1")

describe('POSITIVE TESTING', () => {
    describe('LOGIN', () => {
        let userImport = getUser();
        beforeEach(async() => {
            await signUp(userImport)
        })

        it('login user', async() => {
        await logIn({
            email: userImport.email,
            password: userImport.password,
        })
            .then((response)=>{
                console.log(response.body)
                expect(response.body.status).toBe('success')
                expect(response.body.data.user.role).toBe('user');
            })
        })


    })
})