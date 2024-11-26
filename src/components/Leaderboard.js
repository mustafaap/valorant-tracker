import React, { useEffect, useState } from "react";
import { getLeaderboard } from "../services/riotApi";

function Leaderboard() {
  const [leaderboard, setLeaderboard] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [hoveredPlayer, setHoveredPlayer] = useState(null);

  const currentActId = "dcde7346-4085-de4f-c463-2489ed47983b";

  useEffect(() => {
    const fetchLeaderboard = async () => {
      try {
        const data = await getLeaderboard(currentActId);
        setLeaderboard(data.players);
      } catch (err) {
        setError("Failed to load leaderboard. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    fetchLeaderboard();
  }, [currentActId]);

  if (loading) {
    return (
      <div className="loading-container">
        <div className="loading-spinner"></div>
        <p className="loading-text">Loading Leaderboard...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="error-message">
        <p>{error}</p>
      </div>
    );
  }

  return (
    <div className="leaderboard-container">
      <h2 className="leaderboard-title">TOP 100 VALORANT PLAYERS</h2>
      <div className="table-container">
        <table className="leaderboard-table">
          <thead>
            <tr>
              <th>RANK</th>
              <th>PLAYER</th>
              <th>RATING</th>
              <th>WINS</th>
            </tr>
          </thead>
          <tbody>
            {leaderboard.map((player, index) => (
              <tr
                key={player.puuid}
                onMouseEnter={() => setHoveredPlayer(player.puuid)}
                onMouseLeave={() => setHoveredPlayer(null)}
                className={hoveredPlayer === player.puuid ? "row-hovered" : ""}
              >
                <td className="rank-cell">
                  <span className="rank-number">{index + 1}</span>
                </td>
                <td className="player-cell">
                  {player.gameName || "Anonymous"}#{player.tagLine || ""}
                </td>
                <td className="rating-cell">{player.rankedRating}</td>
                <td className="wins-cell">{player.numberOfWins}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Leaderboard;
