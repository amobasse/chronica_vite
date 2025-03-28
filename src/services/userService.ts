import { User } from '../types/User';
import { v4 as uuidv4 } from 'uuid';

const USER_STORAGE_KEY = 'app_users';

const getAllUsers = (): User[] => {
    const usersJSON = localStorage.getItem(USER_STORAGE_KEY);
    return usersJSON ? JSON.parse(usersJSON) : [];
};

const saveAllUsers = (users: User[]): void => {
    localStorage.setItem(USER_STORAGE_KEY, JSON.stringify(users));
};

export const registerUser = (username: string, email: string, password: string): { success: boolean, message?: string } => {

    //pull all existing users
    //check if user already exists
    //if so, throw an error? or just log them in?
    //if not, create new user
    //log to file

    const users: User[] = getAllUsers();

    //if email is in here?
    if (users.some(user => user.email == email)) {
        return { success: false, message: `Email already used.`};
    }

    if (users.some(user => user.username == username)) {
        return { success: false, message: `Username already taken.`};
    }

    const newUser: User = {
        id: uuidv4(),
        username: username,
        email: email,
        password: password
    }

    users.push(newUser);
    saveAllUsers(users);

    return ( { success: true } );
};

export const loginUser = (email: string, password: string) => {


};