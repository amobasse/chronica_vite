import express from 'express';
import fs from 'fs';
import path from 'path';
import cors from 'cors';
import { fileURLToPath } from 'url';
import { v4 as uuidv4 } from 'uuid';

const app = express();

app.use(express.json());

const PORT = process.env.PORT || 3001;

// middleware
app.use(cors());
app.use(express.json());

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

console.log(`filename is ${__filename}`);
console.log(`dirname is ${__dirname}`);

const USERS_FILE = path.join(__dirname, 'data', 'users.json');

try {
    const testRead = fs.readFileSync(USERS_FILE, 'utf8');
    JSON.parse(testRead);
    console.log(`Data file read in.`);
} catch (error) {
    console.error(`Error reading in file: ${error}`);
}

console.log(`user data file path is ${USERS_FILE}`);

const getUsers = () => {
    try {
        const data = fs.readFileSync(USERS_FILE, 'utf8');
        return JSON.parse(data);    
    } catch (error) {
        console.error(`Error reading in user data.`);
        return [];
    }
};

const saveUsers = (users) => {
    try {
        fs.writeFileSync(USERS_FILE, JSON.stringify(users, null, 2));
        return true;
    } catch (error) {
        console.error(`Error saving user data.`);
        return false;
    }
}

app.get('/', (req, res) => {
    res.send(`Server is up!`);
})

app.get('/api/users', (req, res) => {
    const users = getUsers();
    res.json(users);
});

app.post('/api/users/register', (req, res) => {
    const users = getUsers();
    const { username, email, password } = req.body;

    if (!username || !email || !password) {
        return res.status(400).json({
            success: false,
            message: 'Username, email, and password are all required.'
        });
    }

    if (users.some(user => user.username == username)) {
        return res.status(400).json({
            success: false,
            message: 'Username already exists.'
        })
    }

    if (users.some(user => user.email == email)) {
        return res.status(400).json({
            success: false,
            message: 'Email already exists.'
        })
    }

    const newUser = {
        id: uuidv4(),
        username: username,
        email: email,
        password: password
    }

    users.push(newUser);

    if (saveUsers(users)) {
        res.status(200).json({
            success: true,
            message: 'Account successfully created!'
        });
    } else {
        res.status(400).json({
            success: false,
            message: 'An error prevented creating the account.'
        });
    }
});

app.post('/api/users/login', (req, res) => {
    const users = getUsers();
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({
            success: false,
            message: 'You need both the email and password.'
        });
    }

    const user = users.find(user => user.email == email && user.password == password);

    if (user) {
        const { password, ...userWithoutPassword } = user;
        res.json({
            success: true,
            user: userWithoutPassword
        });
    } else {
        res.status(401).json({
            success: false,
            message: 'Invalid email or password.'
        });
    }
});

app.listen(PORT, () => {
    console.log(`The server is listening on http://localhost:${PORT}`);
})