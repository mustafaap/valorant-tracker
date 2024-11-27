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

  

        setAccountData(response.data.data);
        setEsportsData([]);
        setError('');
      } catch (err) {
        console.error('Error fetching account data:', err);
        setError('Account not found or error fetching data.');
        setAccountData(null);
      }
    } else if (searchType === 'esports') {
        if (!searchQuery) {
          setError('Please enter a search query.');
          return;
        }
  
        try {
          console.log('Making request to /api/esports-schedule with query:', searchQuery);
          const response = await axios.get('http://localhost:5001/api/esports-schedule', {
            params: {
              query: searchQuery,
            },
          });
          

          console.log('Esports Schedule Data Response:', response.data);


          setEsportsData(response.data.data);
          setAccountData(null);
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
        </div>
      )}

{esportsData.length > 0 && (
  <div className="esports-results">
    <h3>Esports Matches</h3>
    <div className="schedule-list">
      {esportsData.map((item, index) => (
        <div key={index} className="schedule-item">
          {/* League Details */}
          <div className="match-header">
            {item.league.icon && (
              <img
                src={item.league.icon}
                alt={`${item.league.name} Icon`}
                className="league-icon"
              />
            )}
            <div className="league-details">
              <h4>{item.league.name}</h4>
              <p className="league-region">{item.league.region}</p>
            </div>
          </div>

          {/* Match Details */}
          <p><strong>Date:</strong> {new Date(item.date).toLocaleString()}</p>
          {item.tournament && (
            <p><strong>Tournament:</strong> {item.tournament.name} ({item.tournament.season})</p>
          )}

          {/* Teams Details */}
          {item.match?.teams && (
            <div className="teams-container">
              {item.match.teams.map((team, idx) => (
                <div key={idx} className="team-info">
                  {team.icon && (
                    <img
                      src={team.icon}
                      alt={`${team.name} Logo`}
                      className="team-icon"
                    />
                  )}
                  <div>
                    <p className="team-name">{team.name}</p>
                    <p className="team-score">
                      <strong>Score:</strong> {team.game_wins}
                    </p>
                    <p className={`team-status ${team.has_won ? "winner" : "loser"}`}>
                      {team.has_won ? "Winner" : "Loser"}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Match Type */}
          {item.match?.game_type && (
            <p>
              <strong>Game Type:</strong> {item.match.game_type.type} (
              Best of {item.match.game_type.count})
            </p>
          )}

          {/* Match State */}
          <p><strong>Match State:</strong> {item.state}</p>

          {/* VOD Link */}
          {item.vod && (
            <p>
              <a
                href={item.vod}
                target="_blank"
                rel="noopener noreferrer"
                className="vod-link"
              >
                Watch VOD
              </a>
            </p>
          )}
        </div>
      ))}
    </div>
  </div>
)}

    </div>
  );
}

export default SearchAccounts;
