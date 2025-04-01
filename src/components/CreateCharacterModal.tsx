import { useState } from 'react';
import CharacterCard from '../types/CharacterCard';

type CreateCharacterModalProps = {
    isOpen: boolean;
    onClose: () => void;
    onSave: (newCharacter: Omit<CharacterCard, 'id'>) => void;
    userId: string;
    username: string;
}

const CreateCharacterModal = ({ isOpen, onClose, onSave, userId, username }: CreateCharacterModalProps) => {
    const [name, setName] = useState<string>('');
    const [level, setLevel] = useState("1");
    const [race, setRace] = useState<string>('Human');
    const [charClass, setCharClass] = useState<string>('Fighter');

    if (!isOpen) {
        return null;
    }

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        const newCharacter = {
            userId,
            characterName: name,
            level,
            race,
            charClass,
            username,
            avatar: '',
            charFC: ''
        };

        onSave(newCharacter);

        setName('');
        setLevel("1");
        setRace('');
        setCharClass('Fighter');
    };

    return (
        <div className="modal-overlay">
            <div className="modal-content create-character-modal">
                <h2>Create New Character</h2>
                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label htmlFor='name'>Name:</label>
                        <input
                            id='name'
                            type='text'
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            required
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor='level'>Level:</label>
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
                        <label htmlFor='class'>Class:</label>
                        <select id='class' value={charClass} onChange={(e) => setCharClass(e.target.value)}>
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

                    <div className="gorm-group">
                        <label htmlFor='race'>Race:</label>
                        <select id='race' value={race} onChange={(e) => setRace(e.target.value)}>
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

                    <div className="modal-buttons">
                        <button
                            type="button"
                            className="cancel-button"
                            onClick={onClose}
                            >
                                Cancel
                        </button>
                        
                        <button
                            type="submit"
                            className="create-button"
                        >
                            Create Character
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default CreateCharacterModal;