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
import CreateCharacterModal from "./CreateCharacterModal.tsx";

const Dashboard = () => {
  const { user, setUser, showLogin, setShowLogin } = useAuth();
  const [characters, setCharacters] = useState<CharacterCard[]>([]);
  const [loading, setLoading] = useState(true);
  const [showCreateModal, setShowCreateModal] = useState(false);

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

  const handleCreateCharacter = async (newCharacterData: Omit<CharacterCard, 'id'>) => {
    if (!user?.id) return;

    console.log(`Preparing new character: ${JSON.stringify(newCharacterData)}`);

    const result = await createCharacter(newCharacterData);

    if (result && result.success && result.character) {
        setCharacters(prevChar => [...prevChar, result.character]);
        setShowCreateModal(false);
    } else {
        console.error(`Char creation failed.`);
    }
  };

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
            onClick={() => setShowCreateModal(true)}
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

      <CreateCharacterModal
        isOpen={showCreateModal}
        onClose={() => setShowCreateModal(false)}
        onSave={handleCreateCharacter}
        userId={"04d5ecf2-3dc2-40a7-985b-16d0942d184c"}
        username="mAc Chaos"
      />
    </div>
  );
};

export default Dashboard;
