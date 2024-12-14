import React, { useEffect, useState, useRef } from "react"; 
import axios from "axios";
import CharacterCard from "./CharacterCard";
import Modal from "./Modal";
import "../index.css";
import backgroundMusic from "../assets/background-music.mp3";

const CharacterList = () => {
  const [characters, setCharacters] = useState([]);
  const [filteredCharacters, setFilteredCharacters] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [sortOrder, setSortOrder] = useState('asc');
  const [filter, setFilter] = useState({
    species: '',
    gender: '',
    status: ''
  });
  const [pageSize, setPageSize] = useState(5); // Sayfa boyutunu ayarlamak için state
  const [currentPage, setCurrentPage] = useState(1); // Geçerli sayfa numarası
  const [selectedCharacter, setSelectedCharacter] = useState(null); // Seçilen karakter için state
  const [showModal, setShowModal] = useState(false); // Modal gösterimi için state
  const [error, setError] = useState(null); 

  const audioRef = useRef(null); // Müzik elementi

  // API'den karakter çekme
  useEffect(() => {
    const fetchCharacters = async () => {
      try {
        let allCharacters = [];
        for (let page = 1; page <= 13; page++) { 
          const response = await axios.get(`https://rickandmortyapi.com/api/character?page=${page}`);
          if (response.data && response.data.results) {
            allCharacters = allCharacters.concat(response.data.results);
          }
        }
        setCharacters(allCharacters);
        setFilteredCharacters(allCharacters);
      } catch (error) {
        console.error("Karakterler alınamadı:", error);
        setError("Karakterler yüklenirken bir hata oluştu. Lütfen daha sonra tekrar deneyin."); 
      }
    };

    fetchCharacters();
  }, []);

  // Filtreleme ve arama işlemleri
  useEffect(() => {
    const filtered = characters.filter((character) => {
      return (
        character.name.toLowerCase().includes(searchQuery.toLowerCase()) &&
        (filter.species ? character.species === filter.species : true) &&
        (filter.gender ? character.gender === filter.gender : true) &&
        (filter.status ? character.status === filter.status : true)
      );
    });
    setFilteredCharacters(filtered);
  }, [searchQuery, filter, characters]);

  // Müzik çalma işlemi
  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.play().catch(error => {
        console.error("Oynatma hatası:", error);
      });
    }
  }, []);

  //Sıralama işlemi
  const handleSort = () => {
    const sorted = [...filteredCharacters].sort((a, b) => {
      if (sortOrder === 'asc') {
        return a.name.localeCompare(b.name);
      } else {
        return b.name.localeCompare(a.name);
      }
    });
    setFilteredCharacters(sorted);
    setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
  };

  // Filtre değişikliği işlemi
  const handleFilterChange = (key, value) => {
    setFilter((prevFilter) => ({
      ...prevFilter,
      [key]: value
    }));
    setCurrentPage(1); 
  };

  //Filtreleri temizleme
  const clearFilters = () => {
    setFilter({
      species: '',
      gender: '',
      status: ''
    });
    setCurrentPage(1); 
  };

  const handlePageSizeChange = (size) => {
    setPageSize(size);
    setCurrentPage(1); 
  };

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  // Karakter seçimi işlemi
  const handleCharacterClick = (character) => {
    setSelectedCharacter(character);
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setSelectedCharacter(null);
  };

  const getPageNumbers = () => {
    const totalPages = Math.ceil(filteredCharacters.length / pageSize);
    const pageNumbers = [];

    const startPage = Math.max(1, currentPage - 2);
    const endPage = Math.min(totalPages, currentPage + 2);

    for (let i = startPage; i <= endPage; i++) {
      pageNumbers.push(i);
    }

    return pageNumbers;
  };

  const startIndex = (currentPage - 1) * pageSize;
  const paginatedCharacters = filteredCharacters.slice(startIndex, startIndex + pageSize);
  const totalPages = Math.ceil(filteredCharacters.length / pageSize);

  return (
    <div>
      {/* Filtreler */}
      <div className="filters">
        <input
          type="text"
          placeholder="İsme göre filtrele"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <select onChange={(e) => handleFilterChange('species', e.target.value)} value={filter.species}>
          <option value="">Tür</option>
          <option value="Human">İnsan</option>
          <option value="Alien">Yabancı</option>
        </select>
        <select onChange={(e) => handleFilterChange('gender', e.target.value)} value={filter.gender}>
          <option value="">Cinsiyet</option>
          <option value="Male">Erkek</option>
          <option value="Female">Kadın</option>
          <option value="unknown">Bilinmiyor</option>
        </select>
        <select onChange={(e) => handleFilterChange('status', e.target.value)} value={filter.status}>
          <option value="">Durum</option>
          <option value="Alive">Canlı</option>
          <option value="Dead">Ölü</option>
          <option value="unknown">Bilinmiyor</option>
        </select>
        <select onChange={(e) => handlePageSizeChange(Number(e.target.value))} value={pageSize}>
          <option value={5}>5 Sonuç</option>
          <option value={10}>10 Sonuç</option>
          <option value={20}>20 Sonuç</option>
        </select>
      </div>
      {/* Karakter Listesi */}
      <div className="character-table-container">
        {error ? (
          <p>{error}</p>
        ) : (
          <>
            <div className="table-controls">
              <button className="sort-button" onClick={handleSort}>Sırala ({sortOrder === 'asc' ? 'A-Z' : 'Z-A'})</button>
              <button className="clear-button" onClick={clearFilters}>Filtreleri temizle</button>
            </div>
            <div className="character-list">
              {paginatedCharacters.length > 0 ? (
                paginatedCharacters.map((character) => (
                  <CharacterCard key={character.id} character={character} onClick={() => handleCharacterClick(character)} />
                ))
              ) : (
                <p>Filtreleme sonucunda hiçbir karakter bulunamadı.</p>
              )}
            </div>
            <div className="pagination">
              <button
                onClick={() => handlePageChange(Math.max(1, currentPage - 1))}
                disabled={currentPage === 1}
              >
                Önceki
              </button>
              {getPageNumbers().map((pageNumber) => (
                <button
                  key={pageNumber}
                  onClick={() => handlePageChange(pageNumber)}
                  className={pageNumber === currentPage ? 'active' : ''}
                >
                  {pageNumber}
                </button>
              ))}
              <button
                onClick={() => handlePageChange(Math.min(totalPages, currentPage + 1))}
                disabled={currentPage === totalPages}
              >
                Sonraki
              </button>
            </div>
          </>
        )}
      </div>
      <audio ref={audioRef} src={backgroundMusic} autoPlay loop />
      <Modal show={showModal} onClose={closeModal} character={selectedCharacter} />
    </div>
  );
};

export default CharacterList;
