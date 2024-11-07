import * as supertest from 'supertest';
import * as assert from "node:assert";
const request = supertest("localhost:8001/api/v1")

export function signUp2(user: object){
  return request.post("/users/signup").send(user)
} //simple

export function signUp(user:object):Promise<any>{
    return new Promise((resolve,reject) => {
        request.post("/users/signup")
            .send(user)
            .end((err, res) => {
                if (err) return reject(err);
                else resolve(res)
            })
    })
}//advance

export function deleteFunction(cookie:string):Promise<any>{
    return new Promise((resolve,reject) => {
        request
            .delete("/ussers/deleteMe")
            .set("cookie", cookie)
            .end((err, res) => {
                if (err) return reject(err);
                else resolve(res)
            })
    })
}

export async function deleteFunction2(cookie:string){
    return request.delete("/ussers/deleteMe").set("cookie", cookie)
}


export async function logIn (user: string | object | undefined) {
    return await request.post("/users/login").send(user)
}

export function logIn2 (user: string | object | undefined) {
    return request.post("/users/login").send(user)
}




