import express from "express";
import fs from "fs";
import path from "path";
import cors from "cors";
import { fileURLToPath } from "url";
import { v4 as uuidv4 } from "uuid";

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

//create the dir and file if they aren't made yet

const USERS_FILE = path.join(__dirname, "data", "users.json");
const CHARACTERS_FILE = path.join(__dirname, "data", "characters.json");
const dataDir = path.join(__dirname, "data");

const initializeDataStorage = () => {
  try {
    // Check if data directory exists
    if (!fs.existsSync(dataDir)) {
      console.log(`Data directory does not exist. Creating: ${dataDir}`);
      fs.mkdirSync(dataDir, { recursive: true });
      console.log(`Data directory created successfully`);
    } else {
      console.log(`Data directory exists: ${dataDir}`);
    }

    // Check if users.json file exists
    if (!fs.existsSync(USERS_FILE)) {
      console.log(`Users file does not exist. Creating: ${USERS_FILE}`);
      fs.writeFileSync(USERS_FILE, JSON.stringify([], null, 2));
    } else {
      console.log(`Users file exists: ${USERS_FILE}`);

      // Validate if the file contains valid JSON
      try {
        const data = fs.readFileSync(USERS_FILE, "utf8");
        JSON.parse(data);
      } catch (parseError) {
        console.warn(`Users file contains invalid JSON.`);
      }
    }

    return true;
  } catch (error) {
    console.error(`Failed to initialize data storage:`, error);
    return false;
  }
};

const initializeCharacterStorage = () => {
  try {
    // Check if data directory exists
    if (!fs.existsSync(dataDir)) {
      console.log(`Data directory does not exist. Creating: ${dataDir}`);
      fs.mkdirSync(dataDir, { recursive: true });
      console.log(`Data directory created successfully`);
    } else {
      console.log(`Data directory exists: ${dataDir}`);
    }

    // Check if characters.json file exists
    if (!fs.existsSync(CHARACTERS_FILE)) {
      console.log(
        `Characters file does not exist. Creating: ${CHARACTERS_FILE}`
      );
      fs.writeFileSync(CHARACTERS_FILE, JSON.stringify([], null, 2));
    } else {
      console.log(`Characters file exists: ${CHARACTERS_FILE}`);

      // Validate if the file contains valid JSON
      try {
        const data = fs.readFileSync(CHARACTERS_FILE, "utf8");
        JSON.parse(data);
      } catch (parseError) {
        console.warn(`Characters file contains invalid JSON.`);
      }
    }

    return true;
  } catch (error) {
    console.error(`Failed to initialize character storage:`, error);
    return false;
  }
};

initializeDataStorage();
initializeCharacterStorage();

try {
  const testRead = fs.readFileSync(USERS_FILE, "utf8");
  JSON.parse(testRead);
  console.log(`Data file read in.`);
} catch (error) {
  console.error(`Error reading in file: ${error}`);
}

console.log(`user data file path is ${USERS_FILE}`);

const getUsers = () => {
  try {
    const data = fs.readFileSync(USERS_FILE, "utf8");
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
};

app.get("/", (req, res) => {
  res.send(`Server is up!`);
});

app.get("/api/users", (req, res) => {
  const users = getUsers();
  res.json(users);
});

app.post("/api/users/register", (req, res) => {
  const users = getUsers();
  const { username, email, password } = req.body;

  if (!username || !email || !password) {
    return res.status(400).json({
      success: false,
      message: "Username, email, and password are all required.",
    });
  }

  if (users.some((user) => user.username == username)) {
    return res.status(400).json({
      success: false,
      message: "Username already exists.",
    });
  }

  if (users.some((user) => user.email == email)) {
    return res.status(400).json({
      success: false,
      message: "Email already exists.",
    });
  }

  const newUser = {
    id: uuidv4(),
    username: username,
    email: email,
    password: password,
  };

  users.push(newUser);

  if (saveUsers(users)) {
    const { password, ...userWithoutPassword } = newUser;
    res.status(200).json({
      success: true,
      message: "Account successfully created!",
      user: userWithoutPassword,
    });
  } else {
    res.status(400).json({
      success: false,
      message: "An error prevented creating the account.",
    });
  }
});

app.post("/api/users/login", (req, res) => {
  const users = getUsers();
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({
      success: false,
      message: "You need both the email and password.",
    });
  }

  const user = users.find(
    (user) => user.email == email && user.password == password
  );

  if (user) {
    const { password, ...userWithoutPassword } = user;
    res.json({
      success: true,
      user: userWithoutPassword,
    });
  } else {
    res.status(401).json({
      success: false,
      message: "Invalid email or password.",
    });
  }
});

const getCharacters = () => {
  try {
    const data = fs.readFileSync(CHARACTERS_FILE, "utf8");
    return JSON.parse(data);
  } catch (error) {
    console.error(`An error happened: ${error}`);
    return [];
  }
};

const saveCharacters = (characters) => {
  try {
    fs.writeFileSync(CHARACTERS_FILE, JSON.stringify(characters, null, 2));
    return true;
  } catch (error) {
    console.error(`An error happened saving characters: ${error}`);
    return false;
  }
};

// get all characters for a specific username
app.get("/api/characters/:userId", (req, res) => {
  try {
    const { userId } = req.params;
    const characters = getCharacters();
    const userCharacters = characters.filter((char) => char.userId === userId);
    res.json({ success: true, characters: userCharacters });
  } catch (error) {
    console.error(`An arror occurred getting the characters: ${error}`);
    res.status(500).json({ success: false, message: "Server error" });
  }
});

app.post("/api/characters", (req, res) => {
  try {
    const {
      username,
      characterName,
      race,
      charClass,
      level,
      userId,
      avatar,
      charFC,
    } = req.body;

    if (!userId || !characterName) {
      return res
        .status(400)
        .json({
          success: false,
          message: `Character name and user ID are required.`,
        });
    }

    const characters = getCharacters();
    const newCharacter = {
      id: uuidv4(),
      characterName: characterName,
      charClass: charClass,
      level: level,
      race: race,
      avatar: "../../images/profilePictures/Twitter_default_profile_400x400.png",
      charFC: charFC,
      username: username,
      userId: userId,
    };

    characters.push(newCharacter);
    saveCharacters(characters); // currently rewrites file, i want it to append later

    res.status(201).json({ success: true, message: `Character created: ${newCharacter}`, character: newCharacter});
  } catch (error) {
    console.error(`Error occurred: ${error}`);
    res
      .status(500)
      .json({ success: false, message: "Character creation failed." });
  }
});

app.delete('/api/characters/:id', (req, res) => {
    try {
        const { id } = req.params;
        console.log(`API receiving character id ${id}`);
        const characters = getCharacters();
        const initialLength = characters.length;

        const newCharacters = characters.filter(char => char.id != id);

        if (newCharacters.length === initialLength) {
            return res.status(404).json({ success: false, message: `Character notfound.`});
        }
        saveCharacters(newCharacters);

        res.status(201).json({ success: true, message: `Character deleted.`});
    } catch (error) {
        console.error(`Error occurred during deletion: ${error}`);
        res.status(500).json({ success: false, message: "Deletion failed." });
    }
});

//update character
app.put('/api/characters/:id', (req, res) => {
    try {
        const { id } = req.params;
        const updatedCharacter = req.body;

        if (!updatedCharacter || !id ) {
            return res.status(400).json({ success: false, message: `Missing character or ID for update.`});    
        }

        if (updatedCharacter.id !== id) {
            return res.status(400).json({ success: false, message: `Given ID doesn't match character's`});
        }

        const characters = getCharacters();

        const characterIndex = characters.findIndex(char => char.id === id);

        if (characterIndex === -1) {
            return res.status(404).json({ success: false, message: "Character not found in data store."});
        }

        characters[characterIndex] = {
            ...characters[characterIndex],
            ...updatedCharacter,
            id,
            userId: characters[characterIndex].userId
        };

        console.log(`Updated character is ${JSON.stringify(characters[characterIndex])}`);

        const saveUsers = saveCharacters(characters);

        if (!saveUsers) {
            return res.status(500).json({ success: false, message: `Saving update to character failed.`});
        }

        return res.json({ sucess: true, character: characters[characterIndex]});
    } catch (error) {
        console.error(`API character update failed: ${error}`);
        return res.status(500).json({ success: false, message: `Server error when updating character: ${error}`});
    }
});

app.listen(PORT, () => {
  console.log(`The server is listening on http://localhost:${PORT}`);
});
