import { useState } from 'react';
import { useAuth } from "../App";
import CharacterCard from '../types/CharacterCard';
import profilePic from "../../images/profilePictures/ceciliaprofile.png";

type CardProps = {
    character: CharacterCard;
};

const Card = ({ character }: CardProps) => {
    
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
            <img className="card-image" src={profilePic} alt='Profile picture for Cecilia'></img>
            <h2 className="card-title">{character.characterName}</h2>
            <div className="card-text">
                <p><strong>Level:</strong> {character.level}</p>
                <p><strong>Race:</strong> {character.race}</p>
                <p><strong>Class:</strong> {character.class}</p>
            </div>
        </div>
    );
}

export default Card;