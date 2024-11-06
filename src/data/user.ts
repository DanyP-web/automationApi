import { faker } from '@faker-js/faker';
let password = faker.internet.password()
import { User } from './interface';


export const user: User = {
    "name": faker.internet.userName(),
    "email": faker.internet.email(),
    "password": password,
    "passwordConfirm": password,
}

export function getUser():User {
    const raandomUser = createRandomUser();
    let password = faker.internet.password();
    return {
        "name": faker.internet.userName(),
        "email": faker.internet.email(),
        "password": password,
        "passwordConfirm": password,
    }
}


export function createRandomUser() {
    return {
        userId: faker.string.uuid(),
        username: faker.internet.userName(),
        email: faker.internet.email(),
        avatar: faker.image.avatar(),
        password: faker.internet.password(),
        birthdate: faker.date.birthdate(),
        registeredAt: faker.date.past(),
    }
}