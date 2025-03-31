import { useState, useEffect } from "react";
import { useAuth } from "../App.tsx";
import { User } from "../types/User";
import Card from "./Card.tsx";
import CharacterCard from "../types/CharacterCard.ts";
import {
  getUserCharacters,
  createCharacter,
  deleteCharacter,
  updateCharacter
} from "../services/characterService";

const Dashboard = () => {
  const { user, setUser, showLogin, setShowLogin } = useAuth();
  const [characters, setCharacters] = useState<CharacterCard[]>([]);
  const [loading, setLoading] = useState(true);

  const handleLogout = () => {
    setUser(null);
    setShowLogin(true);
  };

  const fetchCharacters = async () => {
      if (user?.id) {
        setLoading(true);
        const userCharacters = await getUserCharacters(user.id);
        setCharacters(userCharacters);
        setLoading(false);
      }
    };

  useEffect(() => {
    fetchCharacters();
  }, [user?.id]);

  const handleDeleteCharacter = async (characterId: string) => {
    console.log(`Dashboard: deleting character with ID ${characterId}`);
    const success = await deleteCharacter(characterId);
    if (success) {
      setCharacters((prevChar) =>
        prevChar.filter((char) => char.id !== characterId)
      );
    }
  };

  const handleEditCharacter = async (updatedCharacter: CharacterCard) => {
    console.log(`Dashboard: editing character: ${JSON.stringify(updatedCharacter)}`);
    const success = await updateCharacter(updatedCharacter);
    if (success) {
        console.log(`Edit successful!`);
      fetchCharacters();
    }
  };

  return (
    <div className="dashboard">
      <header className="dashboard-header">
        <h1>Welcome to Chronica, {user?.username}.</h1>
        <button onClick={handleLogout} className="logout-button">
          Logout
        </button>
      </header>

      <div className="user-info">
        <h2>Your Profile</h2>
        <p>
          <strong>Username:</strong> {user?.username}
        </p>
        <p>
          <strong>Email:</strong> {user?.email}
        </p>
      </div>

      <div className="dashboard-content">
        <div className="characters-header">
          <h2>Your Characters</h2>
          <button
            className="create-character-button"
            aria-label="Create new character"
          >
            +
          </button>
        </div>

        {loading ? (
          <p>Loading your characters...</p>
        ) : characters.length > 0 ? (
          <div className="character-cards">
            {characters.map((character) => (
              <Card
                key={character.id}
                character={character}
                onDelete={handleDeleteCharacter}
                onUpdate={handleEditCharacter}
              />
            ))}
          </div>
        ) : (
          <p>You don't have any characters yet. Create one to get started.</p>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
