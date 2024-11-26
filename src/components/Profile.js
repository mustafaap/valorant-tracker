import React, { useEffect, useState } from "react";
import { auth, db } from "../services/firebaseConfig";
import { doc, getDoc } from "firebase/firestore";
import axios from "axios";
import { Line } from "react-chartjs-2";
import './Profile.css';

function Profile() {
  const [riotUsername, setRiotUsername] = useState("");
  const [riotTagline, setRiotTagline] = useState("");
  const [puuid, setPuuid] = useState("");
  const [playerStats, setPlayerStats] = useState(null);
  const [matchHistory, setMatchHistory] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [rank, setRank] = useState(null);
  const [mmrLabels, setMmrLabels] = useState([]);
  const [mmrValues, setMmrValues] = useState([]);

  useEffect(() => {
    const fetchProfileData = async () => {
      try {
        const user = auth.currentUser;

        if (user) {
          // Fetch stored Riot info from Firestore
          const userDocRef = doc(db, "users", user.uid);
          const userDoc = await getDoc(userDocRef);

          if (userDoc.exists()) {
            const { riotUsername, riotTagline } = userDoc.data();
            setRiotUsername(riotUsername);
            setRiotTagline(riotTagline);

            // Fetch user stats
            const statsResponse = await axios.get(
              "http://localhost:5001/api/henrik-stats",
              {
                params: { username: riotUsername, tagline: riotTagline },
              }
            );

            const { data } = statsResponse.data;
            setPuuid(data.puuid);

            // Fetch match history
            const matchHistoryResponse = await axios.get(
              "http://localhost:5001/api/match-history",
              {
                params: {
                  region: data.region,
                  username: riotUsername,
                  tagline: riotTagline,
                },
              }
            );

            const mmrHistoryResponse = await axios.get(
              "http://localhost:5001/api/mmr-history",
              {
                params: {
                  region: data.region,
                  username: riotUsername,
                  tagline: riotTagline,
                },
              }
            );

            // Extract MMR data for the last 10 games
            const mmrHistory = mmrHistoryResponse.data.data || [];
            const limitedMmrHistory = mmrHistory.slice(0, 10); // Limit to 10 games

            setMmrLabels(
              limitedMmrHistory.map((entry, index) => `Game ${index + 1}`)
            );
            setMmrValues(
              limitedMmrHistory.map((entry) => entry.mmr_change_to_last_game || 0)
            );

            // Fetch rank
            const rankResponse = await axios.get(
              "http://localhost:5001/api/rank",
              {
                params: {
                  region: data.region,
                  username: riotUsername,
                  tagline: riotTagline,
                },
              }
            );

            setPlayerStats(data);
            setMatchHistory(matchHistoryResponse.data.data); // Assuming match data is in `.data`
            setRank(rankResponse.data);
          } else {
            throw new Error("User data does not exist in Firestore.");
          }
        } else {
          throw new Error("No authenticated user found.");
        }
      } catch (err) {
        console.error("Error fetching profile data:", err);
        setError(err.response?.data?.error || "Failed to load profile data.");
      } finally {
        setLoading(false);
      }
    };

    fetchProfileData();
  }, []);

  if (loading) {
    return (
      <div className="loading-container">
        <div className="loading-spinner"></div>
        <p className="loading-text">Loading Profile...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="error-container">
        <h2>Error Loading Profile</h2>
        <p>{typeof error === "string" ? error : "An error occurred."}</p>
      </div>
    );
  }

  console.log("Rank Data:", rank); // Debugging to ensure correct rank data

  const data = {
    labels: mmrLabels,
    datasets: [
      {
        label: "MMR Change",
        data: mmrValues,
        borderColor: "blue",
        backgroundColor: "rgba(0, 0, 255, 0.1)",
        borderWidth: 2,
        pointHoverRadius: 5,
        pointHoverBackgroundColor: "red",
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: true,
    scales: {
      y: {
        beginAtZero: true,
      },
    },
    plugins: {
      tooltip: {
        enabled: true,
        mode: 'index',
        intersect: false,
      },
    },
  };

  return (
    <div className="profile-container">
      <div className="profile-header">
        <div className="player-card-container">
          {playerStats?.card?.small && (
            <img src={playerStats.card.small} alt="Player Card" />
          )}
        </div>
        
        <div className="player-info">
          <h1 className="player-name">
            {riotUsername}
            <span className="player-tagline">#{riotTagline}</span>
          </h1>
          
          <div className="rank-display">
  <div className="current-rank">
    <img 
      src={`/rank_png/${rank?.data?.current_data?.currenttierpatched?.replace(' ', '_')}_Rank.png`}
      alt={rank?.data?.current_data?.currenttierpatched}
      className="rank-icon"
      onError={(e) => {
        e.target.src = '/rank_png/Unranked_Rank.png'; // Update fallback image path
        e.target.onerror = null;
      }}
    />
    <div className="rank-info">
      <span className="rank-label">Current Rank</span>
      <span className="rank-name">{rank?.data?.current_data?.currenttierpatched || "Unranked"}</span>
    </div>
  </div>
  
  <div className="highest-rank">
    <img 
      src={`/rank_png/${rank?.data?.highest_rank?.patched_tier?.replace(' ', '_')}_Rank.png`}
      alt={rank?.data?.highest_rank?.patched_tier}
      className="rank-icon"
      onError={(e) => {
        e.target.src = '/rank_png/Unranked_Rank.png'; // Update fallback image path
        e.target.onerror = null;
      }}
    />
    <div className="rank-info">
      <span className="rank-label">Peak Rank</span>
      <span className="rank-name">{rank?.data?.highest_rank?.patched_tier || "Unknown"}</span>
    </div>
  </div>
</div>
        </div>
      </div>

      <div className="stats-grid">
        <div className="stats-card">
          <h3>Player Details</h3>
          <p><strong>Region:</strong> {playerStats?.region?.toUpperCase() || "N/A"}</p>
          <p><strong>PUUID:</strong> {puuid}</p>
        </div>
        
        <div className="stats-card">
          <h3>MMR History</h3>
          <Line data={data} options={options} />
        </div>
      </div>

      <div className="match-history-container">
  <h2 className="leaderboard-title">Match History</h2>
  <div className="table-container">
    <table className="match-history-table">
      <thead>
        <tr>
          <th>MAP</th>
          <th>MODE</th>
          <th>KILLS</th>
          <th>DEATHS</th>
          <th>ASSISTS</th>
          <th>KDA</th>
        </tr>
      </thead>
      <tbody>
        {matchHistory?.map((match, index) => {
          const winningTeam = match.teams.red > match.teams.blue ? "Red" : "Blue";
          const isWin = winningTeam === match.stats.team;
          
          return (
            <tr 
              key={index}
              className={`match-row ${isWin ? 'match-row-win' : 'match-row-loss'}`}
            >
              <td>{match.meta?.map?.name || "Unknown"}</td>
              <td>{match.meta?.mode || "Unknown"}</td>
              <td>{match.stats?.kills || 0}</td>
              <td>{match.stats?.deaths || 0}</td>
              <td>{match.stats?.assists || 0}</td>
              <td>
                {((match.stats?.kills + match.stats?.assists) / 
                  (match.stats?.deaths || 1)).toFixed(2)}
              </td>
            </tr>
          );
        })}
          </tbody>
        </table>
      </div>
    </div>
  </div>
  );
}


export default Profile;