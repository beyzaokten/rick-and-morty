import React from "react";
import "../index.css";

// Tıklanan karakterin bilgilerini içerir
const Modal = ({ show, onClose, character }) => {
  if (!show) {
    return null;
  }

  const getStatus = (status) => {
    switch (status) {
      case 'Alive':
        return 'Canlı';
      case 'Dead':
        return 'Ölü';
      case 'unknown':
        return 'Bilinmiyor';
      default:
        return status;
    }
  };

  const getGender = (gender) => {
    switch (gender) {
      case 'Male':
        return 'Erkek';
      case 'Female':
        return 'Kadın';
      case 'unknown':
        return 'Bilinmiyor';
      default:
        return gender;
    }
  };

  const getSpecies = (species) => {
    switch (species) {
      case 'Human':
        return 'İnsan';
      case 'Alien':
        return 'Yabancı';
      case 'unknown':
        return 'Bilinmiyor';
      default:
        return species;
    }
  };

  return (
    <div className="modal">
      <div className="modal-content">
        <span className="close-button" onClick={onClose}>&times;</span>
        <h2>{character.name}</h2>
        <img src={character.image} alt={character.name} className="character-modal-image" />
        <p><strong>Tür:</strong> {getSpecies(character.species)}</p>
        <p><strong>Cinsiyet:</strong> {getGender(character.gender)}</p>
        <p><strong>Durum:</strong> {getStatus(character.status)}</p>
        <p><strong>Konum:</strong> {character.location.name}</p>
      </div>
    </div>
  );
};

export default Modal;
