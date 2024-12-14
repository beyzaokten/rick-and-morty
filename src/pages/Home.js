import React, { useEffect, useState } from 'react';
import axios from 'axios';
import CharacterCard from '../components/CharacterCard';
import Pagination from '../components/Pagination';

const Home = () => {
  const [characters, setCharacters] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    fetchCharacters();
  }, [currentPage]);

  //API ile karakter çeker
  const fetchCharacters = async () => {
    try {
      const response = await axios.get(`https://rickandmortyapi.com/api/character?page=${currentPage}`);
      setCharacters(response.data.results);
      setTotalPages(response.data.info.pages);
    } catch (error) {
      console.error('Error fetching characters:', error);
    }
  };

  return (
    <div className="container">
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: '20px' }}>
        {characters.map((character) => (
          <CharacterCard key={character.id} character={character} />
        ))}
      </div>
      <Pagination currentPage={currentPage} totalPages={totalPages} setCurrentPage={setCurrentPage} />
    </div>
  );
};

export default Home;
