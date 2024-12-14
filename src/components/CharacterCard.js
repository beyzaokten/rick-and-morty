import React from "react";
// CharacterCard bileşeni, karakter bilgilerini ve görsellerini görüntüler
const CharacterCard = ({ character, onClick }) => {
  // getGender fonksiyonu, karakterin cinsiyetini Türkçeye çevirir
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

  // getSpecies fonksiyonu, karakterin türünü Türkçeye çevirir
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
    <div className="character-card" onClick={onClick}>
      <img src={character.image} alt={character.name} className="character-image" />
      <div className="character-info">
        <h3 className="creepster-regular">{character.name}</h3>
        <p><span>Tür:</span> {getSpecies(character.species)}</p>
        <p><span>Cinsiyet:</span> {getGender(character.gender)}</p>
      </div>
    </div>
  );
};

export default CharacterCard;
