import * as supertest from 'supertest';
import {signUp} from "./src/data/helpers";
import {getUser} from "./src/data/user";
const request =supertest("localhost:8001/api/v1")
const {MongoClient, ObjectId} = require('mongodb');



const DATABASE_URL = "mongodb+srv://DanyP:pass1234@cluster0.w1izgai.mongodb.net/"



describe("MONGO_DB", () => {

    let connection
    let db

    beforeAll( async () => {
        try {
        connection = await MongoClient.connect(DATABASE_URL, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });
        db = await connection.db()
    }catch(error){
            console.error("Error connection to MongoDB", error)
}
    })
    afterAll(async () => {
        await connection.close()
    })
    it("should find the document", async () => {
        const users = db.collection('users')
        console.log(users,"===============users");
        const user = await users.findOne({name: "Columbus61"})
        console.log(user,"===============user")
        expect(user.name).toBe("Columbus61")
    })

    it.only("Verify that user been deleted successfully", async () => {
        const userImport = getUser()
        try {
            const res = await signUp(userImport)
            //console.log(res,"===========res===========")
            expect(res.statusCode).toBe(201)
            const users = db.collection('users')
            const userData = await users.findOne({name: userImport.name})
            //console.log(userData,"=================userData===")
            if (!userData) {
                throw new Error("===========User not found=========")
            }
            expect(userData.name).toBe(userImport.name);
            expect(userData.email).toBe(userImport.email.toLowerCase());
            expect(userData.role).toBe("user");
            expect(userData._id.toString()).toEqual(res.body.data.user._id.toString())
            let deleteData = await users.deleteOne({
                _id: new ObjectId(userData._id)
            })
            console.log(deleteData, "===========deleteData=========");
            expect(deleteData.deletedCount).toBe(1)
            // let findUser = await users.findOne({_id:userData._id})
            // if(findUser === null){
            //     throw new Error("User not deleted from MongoDB")}
        } catch(error){
            console.error("Error in user creation")
        }
    })

})