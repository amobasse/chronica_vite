import React, { useState, useEffect } from "react";
import CharacterCard from "../types/CharacterCard";

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
  const [characterName, setCharacterName] = useState(character.characterName);
  const [level, setLevel] = useState(character.level);
  const [race, setRace] = useState(character.race);
  const [charClass, setCharClass] = useState(character.charClass);

  const profilePic = `../../images/profilePictures/${character.avatar}`;

  useEffect(() => {
    if (isOpen) {
      setCharacterName(character.characterName);
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
      characterName,
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
          <div className="hover-pointer">
            <div className="profilePic">
              <img
                className="card-image"
                src={profilePic}
                alt="Profile picture for Cecilia"
              ></img>
              <label htmlFor="profile-upload" className="camera-icon">
                <svg viewBox="0 0 24 24" aria-hidden="true">
                  <g>
                    <path
                      d="M9.697 3H11v2h-.697l-3 2H5c-.276 0-.5.224-.5.5v11c0 .276.224.5.5.5h14c.276 0 .5-.224.5-.5V10h2v8.5c0 1.381-1.119 2.5-2.5 2.5H5c-1.381 0-2.5-1.119-2.5-2.5v-11C2.5 6.119 3.619 5 5 5h1.697l3-2zM12 10.5c-1.105 0-2 .895-2 2s.895 2 2 2 2-.895 2-2-.895-2-2-2zm-4 2c0-2.209 1.791-4 4-4s4 1.791 4 4-1.791 4-4 4-4-1.791-4-4zM17 2c0 1.657-1.343 3-3 3v1c1.657 0 3 1.343 3 3h1c0-1.657 1.343-3 3-3V5c-1.657 0-3-1.343-3-3h-1z"
                      fill="#FFFFFF"
                    ></path>
                  </g>
                </svg>
              </label>
              <input
                type="file"
                id="profile-upload"
                accept=".jpg,.jpeg,.png"
                style={{ display: "none" }}
              />
            </div>
          </div>
          <div className="form-group">
            <label htmlFor="name">Name:</label>
            <input
              id="name"
              type="text"
              value={characterName}
              onChange={(e) => setCharacterName(e.target.value)}
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
            <select
              id="race"
              value={race}
              onChange={(e) => setRace(e.target.value)}
              required
            >
              <option value="Aasimar">Aasimar</option>
              <option value="Dragonborn">Dragonborn</option>
              <option value="Drow">Drow</option>
              <option value="Forest Gnome">Forest Gnome</option>
              <option value="Goliath">Goliath</option>
              <option value="Human">Human</option>
              <option value="Half-elf">Half-elf</option>
              <option value="Half-orc">Half-orc</option>
              <option value="Hill Dwarf">Hill Dwarf</option>
              <option value="High Elf">High Elf</option>
              <option value="Lightfoot Halfling">Lightfoot Halfling</option>
              <option value="Mountain Dwarf">Mountain Dwarf</option>
              <option value="Rock Gnome">Rock Gnome</option>
              <option value="Stout Halfling">Stout Halfling</option>
              <option value="Tiefling">Tiefling</option>
              <option value="Wood Elf">Wood Elf</option>
            </select>
          </div>

          <div className="form-group">
            <label htmlFor="class">Class:</label>
            <select
              id="class"
              value={charClass}
              onChange={(e) => setCharClass(e.target.value)}
              required
            >
              <option value="Artificer">Artificer</option>
              <option value="Barbarian">Barbarian</option>
              <option value="Bard">Bard</option>
              <option value="Blood Hunter">Blood Hunter</option>
              <option value="Cleric">Cleric</option>
              <option value="Dark Knight">Dark Knight</option>
              <option value="Druid">Druid</option>
              <option value="Fighter">Fighter</option>
              <option value="Monk">Monk</option>
              <option value="Mystic">Mystic</option>
              <option value="Paladin">Paladin</option>
              <option value="Psion">Psion</option>
              <option value="Occultist">Occultist</option>
              <option value="Ranger">Ranger</option>
              <option value="Rogue">Rogue</option>
              <option value="Sorcerer">Sorcerer</option>
              <option value="Spellblade">Spellblade</option>
              <option value="Warden">Warden</option>
              <option value="Warlock">Warlock</option>
              <option value="Warlord">Warlord</option>
              <option value="Wizard">Wizard</option>
            </select>
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
