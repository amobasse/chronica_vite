import { useState, useEffect } from "react";
import { useAuth } from "../App";
import CharacterCard from "../types/CharacterCard";
import DeleteCharModal from "./DeleteCharModal";
import EditCharacterModal from "./EditCharacterModal";

type CardProps = {
  character: CharacterCard;
  onDelete: (characterId: string) => void;
  onUpdate: (updatedCharacter: CharacterCard) => void;
};

const Card = ({ character, onDelete, onUpdate }: CardProps) => {
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [cardCharacter, setCardCharacter] = useState(character);
  // TO DO: come back and clean up cardCharacter being used as state when other places use
  // character as state, its redundant

  const profilePic = `../../images/profilePictures/${character.avatar}`;

  const handleEditClick = () => {
    setShowEditModal(true);
  };

  const handleEditCancel = () => {
    setShowEditModal(false);
  };

  const handleEditConfirm = (updatedCharacter: CharacterCard) => {
    onUpdate(updatedCharacter);
    setCardCharacter(updatedCharacter);
    setShowEditModal(false);
  };

  const handleDeleteClick = () => {
    setShowDeleteModal(true);
  };

  const handleDeleteCancel = () => {
    setShowDeleteModal(false);
  };

  const handleDeleteConfirm = () => {
    onDelete(character.id);
    setShowDeleteModal(false);
  };

  useEffect(() => {

  }, [character]);

  return (
    // have image with border-radius being 50%
    // pull character data based on the user
    // there needs to be a data store for the characters
    // there has to be a type for the card
    // somewhere the card has to get the info, either in the card itself or passed in
    // it has to populate each card based on the user, likely a for loop or foreach
    // passed in via context...
    // also need a button to update the info
    // and a button to delete the card
    // as well as a button somewhere to add new cards
    <div className="card">
      <div className="card-actions">
        <button
          className="delete-button"
          aria-label="Delete character"
          onClick={handleDeleteClick}
        >
          <svg
            viewBox="0 0 24 24"
            width="14"
            height="14"
            stroke="currentColor"
            strokeWidth="3"
            fill="none"
          >
            <line x1="18" y1="6" x2="6" y2="18"></line>
            <line x1="6" y1="6" x2="18" y2="18"></line>
          </svg>
        </button>
        <button
          className="edit-button"
          aria-label="Edit character"
          onClick={handleEditClick}
        >
          ✎
        </button>
      </div>

      <img
        className="card-image"
        src={profilePic}
        alt="Profile picture for Cecilia"
      ></img>
      <h2 className="card-title">{cardCharacter.characterName}</h2>
      <div className="card-text">
        <p>
          <strong>Level:</strong> {cardCharacter.level}
        </p>
        <p>
          <strong>Race:</strong> {cardCharacter.race}
        </p>
        <p>
          <strong>Class:</strong> {cardCharacter.charClass}
        </p>
      </div>

      <DeleteCharModal
        isOpen={showDeleteModal}
        onClose={handleDeleteCancel}
        onConfirm={handleDeleteConfirm}
        title="Delete Character"
        message={`Are you sure you want to delete ${cardCharacter.characterName}? This action cannot be undone.`}
      />

      <EditCharacterModal
        isOpen={showEditModal}
        onClose={handleEditCancel}
        onSave={handleEditConfirm}
        character={cardCharacter}
      />
    </div>
  );
};

export default Card;
