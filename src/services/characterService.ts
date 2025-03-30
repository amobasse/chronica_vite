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
            return null;
        }

        return data.character;
    } catch (error) {
        console.error(`Error creating a character: ${error}`);
        return null;
    }
};