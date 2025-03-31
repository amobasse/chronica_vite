import { useState } from "react";
import { useAuth } from "../App";
import CharacterCard from "../types/CharacterCard";
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
      <div className="card-actions">
        <button className="delete-button" aria-label="Delete character">
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
        <button className="edit-button" aria-label="Edit character">
          ✎
        </button>
      </div>

      <img
        className="card-image"
        src={profilePic}
        alt="Profile picture for Cecilia"
      ></img>
      <h2 className="card-title">{character.characterName}</h2>
      <div className="card-text">
        <p>
          <strong>Level:</strong> {character.level}
        </p>
        <p>
          <strong>Race:</strong> {character.race}
        </p>
        <p>
          <strong>Class:</strong> {character.charClass}
        </p>
      </div>
    </div>
  );
};

export default Card;
