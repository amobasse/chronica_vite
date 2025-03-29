const express = require('express');
const fs = require('fs');
const path = require('path');
const cors = require('cors');

const app = express();

app.use(express.json());

const PORT = process.env.PORT || 3001;

// middleware
app.use(cors());
app.use(express.json());

const USERS_FILE = path.join(__dirname, 'data', 'users.json');

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
    } catch (error) {
        console.error(`Error saving user data.`);
        return false;
    }
}

app.get('api/users', (req, res) => {
    const users = getUsers();
    res.json(users);
});

app.post('api/users/register', (req, res) => {
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

app.post('api/users/login'), (req, res) => {
    const users = getUsers();
    const { username, password } = req.body;

    if (!username || !password) {
        return res.status(400).json({
            success: false,
            message: 'You need both the username and password.'
        });
    }

    const user = users.find(user => user.username == username && user.password == password);

    if (user) {
        const { password, ...userWithoutPassword } = user;
        res.json({
            success: true,
            user: userWithoutPassword
        });
    } else {
        res.status(401).json({
            success: false,
            message: 'Invalid username or password.'
        });
    }
}

app.listen(PORT, () => {
    console.log(`The server is listening on http://localhost:${PORT}`);
})