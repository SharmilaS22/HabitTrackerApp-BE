import { User } from '../models/User.model';
import { sequelize } from '../config/database';

interface UserRequest {
    name: string;
}

async function addUser(userRequest: UserRequest) {
    const user = await User.create({
        ...userRequest
    });
    console.log('User Created');
}

async function getUser(userid: string) {
    try {
        return await User.findByPk(userid);
    } catch (err) {
        return null;
    }
}

async function updateUser(userid: string, userRequest: UserRequest): Promise<{ success: boolean }> {

    return await User.update({
        name: userRequest.name
    }, {
        where: {
            id: userid
        }
    }).then(count => {
        if (count[0] === 1) {
            console.log("User updated successfully");
            return { success: true };
        }
        console.log("No User found")
        return { success: false };
    }).catch(err => {
        console.log("Error updating user: ", err);
        return { success: false }
    });
}

async function deleteUser(userid: string): Promise<{ success: boolean }> {
    const user = await User.findByPk(userid);
    try {
        if (user) {
            await user.destroy();
            return { success: true }
        }
    } catch (err) {
        console.log("Error deleting user: ", err);
        return { success: false }
    }
    return { success: false }
}

const getGreeting = async () => {
    return 'Hello World!'
}

export default {
    getGreeting, addUser, getUser, updateUser, deleteUser
}