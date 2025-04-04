import CharacterCard from '../types/CharacterCard';

const API_URL = 'http://localhost:3001/api';

export const getUserCharacters = async (userId: string): Promise<CharacterCard[]> => {
    try {
        const response = await fetch(`${API_URL}/characters/${userId}`);
        const data = await response.json();

        if (!response.ok) {
            console.error(`Fetching the characters failed: ${data.message}`);
            return [];
        }

        return data.characters;
    } catch (error) {
        console.error(`Error fetching characters: ${error}`);
        return [];
    }
};

export const createCharacter = async (character: Omit<CharacterCard, 'id'>) => {
    try {
        const response = await fetch(`${API_URL}/characters`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(character),
            
        });

        const data = await response.json();

        if (!response.ok) {
            console.error(`Something went wrong creating the character: ${data.message}`);
            return { success: false, message: data.message };
        }

        return { success: true, message: `Character created.`, character: data.character };
    } catch (error) {
        console.error(`Error creating a character: ${error}`);
        return null;
    }
};

export const deleteCharacter = async (characterId: string): Promise<boolean> => {
    try {
        console.log(`Deleting character ID with ID ${characterId}`);
        const response = await fetch(`${API_URL}/characters/${characterId}`, {
            method: 'DELETE'
        });

        const data = await response.json();

        if (!response.ok) {
            console.error(`Deletion failed: ${data.message}`);
            return false;   
        }

        return data.success;
    } catch (error) {
        console.error(`Sending delete to API failed.`);
        return false;
    }
};

export const updateCharacter = async (character: CharacterCard): Promise<boolean> => {
    try {
        const response = await fetch(`${API_URL}/characters/${character.id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(character)
        });

        const data = await response.json();

        if (!response.ok) {
            console.error(`Error updating character: ${data.message}`);
            return false;
        }

        return data.success;
    } catch (error) {
        console.error(`Updating the character failed: ${error}`);
        return false;
    }
};