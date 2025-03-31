import React, { useState, useEffect } from 'react';
import CharacterCard from '../types/CharacterCard';

type EditCharacterModalProps = {
  isOpen: boolean;
  onClose: () => void;
  onSave: (updatedCharacter: CharacterCard) => void;
  character: CharacterCard;
};

const EditCharacterModal = ({
  isOpen,
  onClose,
  onSave,
  character,
}: EditCharacterModalProps) => {
  const [name, setName] = useState(character.characterName);
  const [level, setLevel] = useState(character.level);
  const [race, setRace] = useState(character.race);
  const [charClass, setCharClass] = useState(character.charClass);

  useEffect(() => {
    if (isOpen) {
      setName(character.characterName);
      setLevel(character.level);
      setRace(character.race);
      setCharClass(character.charClass);
    }
  }, [character, isOpen]);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const updatedCharacter = {
      ...character,
      name,
      charClass,
      race,
      level,
    };

    onSave(updatedCharacter);
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content edit-character-modal">
        <h2>Edit Character</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="name">Name:</label>
            <input
              id="name"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="level">Level:</label>
            <input
              id="level"
              type="number"
              min="1"
              max="20"
              value={level}
              onChange={(e) => setLevel(e.target.value)}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="race">Race:</label>
            <input
              id="race"
              type="text"
              value={race}
              onChange={(e) => setRace(e.target.value)}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="class">Class:</label>
            <input
              id="class"
              type="text"
              value={charClass}
              onChange={(e) => setCharClass(e.target.value)}
              required
            />
          </div>

          <div className="modal-buttons">
            <button type="button" className="cancel-button" onClick={onClose}>
              Cancel
            </button>
            <button type="submit" className="save-button">
              Save Changes
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditCharacterModal;