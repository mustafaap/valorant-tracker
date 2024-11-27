import React, { useState } from 'react';
import axios from 'axios';
import './SearchAccounts.css';

function SearchAccounts() {
  const [searchType, setSearchType] = useState('player'); // 'player' or 'esports'
  const [searchName, setSearchName] = useState('');
  const [searchTag, setSearchTag] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [accountData, setAccountData] = useState(null);
  const [esportsData, setEsportsData] = useState([]);
  const [error, setError] = useState('');
  const [favoriteWeapon, setFavoriteWeapon] = useState('');
  const [averageDamage, setAverageDamage] = useState('');

  const weaponMapping = {
    a: 'Vandal',
    b: 'Phantom',
    c: 'Operator',
    d: 'Sheriff',
    e: 'Guardian',
    f: 'Judge',
    g: 'Marshal',
    h: 'Spectre',
    i: 'Stinger',
    j: 'Classic',
    k: 'Frenzy',
    l: 'Ghost',
    m: 'Bulldog',
    n: 'Ares',
    o: 'Odin',
    p: 'Shorty',
    q: 'Knife',
    r: 'Bucky',
    s: 'Headhunter',
    t: 'Tour De Force',
    u: 'Rendezvous',
    v: 'Sheriff',
    w: 'Classic',
    x: 'Vandal',
    y: 'Phantom',
    z: 'Operator',
  };

  const averageDamageMapping = {
    Vandal: 160,
    Phantom: 140,
    Operator: 200,
    Sheriff: 150,
    Guardian: 180,
    Judge: 90,
    Marshal: 100,
    Spectre: 120,
    Stinger: 80,
    Classic: 78,
    Frenzy: 90,
    Ghost: 105,
    Bulldog: 130,
    Ares: 95,
    Odin: 85,
    Shorty: 50,
    Knife: 30,
    Bucky: 70,
    Headhunter: 155,
    'Tour De Force': 250,
    Rendezvous: 300, 
  };

  const handleSearch = async () => {
    if (searchType === 'player') {
      if (!searchName || !searchTag) {
        setError('Please enter both name and tag.');
        return;
      }

      try {
        const response = await axios.get('http://localhost:5001/api/account-search', {
          params: {
            name: searchName,
            tag: searchTag,
          },
        });

        const accountData = response.data.data;

        // Assign a favorite weapon based on the first letter of the username
        const firstLetter = searchName[0].toLowerCase();
        const weapon = weaponMapping[firstLetter] || 'Unknown Weapon';

        // Assign average damage based on the weapon
        const damage = averageDamageMapping[weapon] || 'Unknown Damage';

        setAccountData(accountData);
        setFavoriteWeapon(weapon);
        setAverageDamage(damage);
        setEsportsData([]);
        setError('');
      } catch (err) {
        console.error('Error fetching account data:', err);
        setError('Account not found or error fetching data.');
        setAccountData(null);
        setFavoriteWeapon('');
        setAverageDamage('');
      }
    } else if (searchType === 'esports') {
      if (!searchQuery) {
        setError('Please enter a search query.');
        return;
      }

      try {
        const response = await axios.get('http://localhost:5001/api/esports-schedule', {
          params: {
            query: searchQuery,
          },
        });

        setEsportsData(response.data.data);
        setAccountData(null);
        setFavoriteWeapon('');
        setAverageDamage('');
        setError('');
      } catch (err) {
        console.error('Error fetching esports data:', err);
        setError('Failed to load esports data.');
        setEsportsData([]);
      }
    }
  };

  return (
    <div className="search-accounts-container">
      <h2>Search</h2>
      <div className="search-type-toggle">
        <label>
          <input
            type="radio"
            value="player"
            checked={searchType === 'player'}
            onChange={() => setSearchType('player')}
          />
          Player Search
        </label>
        <label>
          <input
            type="radio"
            value="esports"
            checked={searchType === 'esports'}
            onChange={() => setSearchType('esports')}
          />
          Esports Search
        </label>
      </div>

      {searchType === 'player' && (
        <div className="search-form">
          <input
            type="text"
            placeholder="Name"
            value={searchName}
            onChange={(e) => setSearchName(e.target.value)}
          />
          <input
            type="text"
            placeholder="Tag"
            value={searchTag}
            onChange={(e) => setSearchTag(e.target.value)}
          />
          <button onClick={handleSearch}>Search</button>
        </div>
      )}

      {searchType === 'esports' && (
        <div className="search-form">
          <input
            type="text"
            placeholder="Search Teams or Leagues"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <button onClick={handleSearch}>Search</button>
        </div>
      )}

      {error && <p className="error-message">{error}</p>}

      {accountData && (
        <div className="account-details">
          <img src={accountData.card.small} alt="Player Card" />
          <h3>
            {accountData.name}#{accountData.tag}
          </h3>
          <p><strong>Region:</strong> {accountData.region.toUpperCase()}</p>
          <p><strong>PUUID:</strong> {accountData.puuid}</p>
          <p><strong>Favorite Weapon:</strong> {favoriteWeapon}</p>
          <p><strong>Average Damage:</strong> {averageDamage}</p>
        </div>
      )}

      {esportsData.length > 0 && (
        <div className="esports-results">
          <h3>Esports Matches</h3>
          <div className="schedule-list">
            {esportsData.map((item, index) => (
              <div key={index} className="schedule-item">
                <h4>{item.league.name}</h4>
                <p><strong>Date:</strong> {new Date(item.date).toLocaleString()}</p>
                <p><strong>Region:</strong> {item.league.region}</p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default SearchAccounts;
