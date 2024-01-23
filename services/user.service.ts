import { User } from '../models/User.model';
import { sequelize } from '../config/database';

interface UserRequest {
    name: string;
}

async function addUser(userRequest: UserRequest) {

    await sequelize.sync({ force: true }).then(() => {
        console.log('User table synced');
    }).catch((error) => {
        console.error('Error syncing User table:', error);
    });

    const user = await User.create({
        ...userRequest
    });

    console.log('User CREATED');
}

const getGreeting = async () => {
    return 'Hello World!'
}

export default {
    getGreeting, addUser
}