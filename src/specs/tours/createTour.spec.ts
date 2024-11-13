import * as supertest from 'supertest';
import {signUp} from "../../data/helpers";
import {getUser} from "../../data/user";
import {tour} from "../../data/tour";
const request = supertest('localhost:8001/api/v1')






describe('TOURS', () => {
    it('Create tour', async () => {
        let userImport = getUser("admin");
        const res = await signUp(userImport)
        console.log(res.body, "res")
        expect(res.body.status).toBe("success")
        const cookie = res.headers["set-cookie"]
        await request
            .post("/tours")
            .set('Cookie', cookie)
            .send({
                name: "TourForn65",
                duration: 10,
                description: "Could be",
                maxGroupSize: 10,
                summary: "Test tour",
                difficulty: "easy",
                price: 100,
                rating: 4.8,
                imageCover: "tour-3-cover.jpg",
                ratingsAverage: 4.9,
                guides: [],
                startDates: ["2024-04-04"],
                startLocation: {
                    type: "Point",
                    coordinates: [-74.005974, 40.712776],
                }
            })
    })

    it('Create tour2', async () => {
        let userImport = getUser("admin");
        let tourImport = await tour()
        const res = await signUp(userImport)
        console.log(res.body, "res")
        expect(res.body.status).toBe("success")
        const cookie = res.headers["set-cookie"]
        await request
            .post("/tours")
            .set('Cookie', cookie)
            .send(tourImport)
            .then((el) => {
                console.log(el.body,"res")
                expect(res.body.status).toBe("success")
            })
    })

    it('Create tour with lead guide', async () => {
        let userImport = getUser("lead-guide");
        let tourImport = await tour()
        const res = await signUp(userImport)
        console.log(res.body, "res")
        expect(res.body.status).toBe("success")
        const cookie = res.headers["set-cookie"]
        await request
            .post("/tours")
            .set('Cookie', cookie)
            .send(tourImport)
            .then((el) => {
                console.log(el.body,"res")
                expect(res.body.status).toBe("success")
            })
    })

    it('Create tour using try and catch', async () => {
       try{
           let userImport = getUser("admin");
        let tourImport = await tour()
        const res = await signUp(userImport)
        console.log(res.body, "res")
        expect(res.body.status).toBe("success")
        const cookie = res.headers["set-cookie"]
        await request
            .post("/tours")
            .set('Cookie', cookie)
            .send(tourImport)
            .then((el) => {
                console.log(el.body, "res")
                expect(res.body.status).toBe("success")
            })
            }catch (error){
                console.error(error)
           }

    })


})
describe('NEGATIVE TESTING', () => {

    it.only('should not create tour with incorrect role', async () => {
        let userImport = getUser("user");
        let tourImport = await tour()
        const res = await signUp(userImport)
        console.log(res.body, "res")
        expect(res.body.status).toBe("success")
        const cookie = res.headers["set-cookie"]
        await request
            .post("/tours")
            .set('Cookie', cookie)
            .send(tourImport)
            .then((el) => {
                console.log(el.body, "res")
                expect(el.body.status).toBe('fail')
                expect(el.body.message).toEqual('You do not have permission to perform this action')
            })
    })
        it('cannot create tour without required fields', async () => {
            let userImport = getUser("admin");
            let tourImport = await tour()
            const res = await signUp(userImport)
            console.log(res.body, "res")
            // expect(res.body.status).toBe("success")
            const cookie = res.headers["set-cookie"]
            await request
                .post("/tours")
                .set('Cookie', cookie)
                .send({
                    name: " ",
                    duration: 10,
                    description: "Could be",
                    maxGroupSize: 10,
                    summary: "Test tour",
                    difficulty: "easy",
                    price: 100,
                    rating: 4.8,
                    imageCover: "tour-3-cover.jpg",
                    ratingsAverage: 4.9,
                    guides: [],
                    startDates: ["2024-04-04"],
                    startLocation: {
                        type: "Point",
                        coordinates: [-74.005974, 40.712776],
                    }
                })
                .then((el) => {
                    console.log(el.body, "res")
                    expect(el.body.status).toBe('error')
                    expect(el.body.error.message).toEqual('Tour validation failed: name: A tour must have a name')

                })
        })
    it('cannot create tour when validation is not met', async () => {

    })
})