import React, { useEffect, useState } from "react";
import { getLeaderboard } from "../services/riotApi";

function Leaderboard() {
  const [leaderboard, setLeaderboard] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [hoveredPlayer, setHoveredPlayer] = useState(null); // New state to track hovered player

  const currentActId = "dcde7346-4085-de4f-c463-2489ed47983b"; // Replace with the actual Act ID

  useEffect(() => {
    const fetchLeaderboard = async () => {
      try {
        const data = await getLeaderboard(currentActId);
        setLeaderboard(data.players); // Assuming the API response has a `players` field
      } catch (err) {
        setError("Failed to load leaderboard. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    fetchLeaderboard();
  }, [currentActId]);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p style={{ color: "red" }}>{error}</p>;
  }

  return (
    <div style={{ padding: "20px" }}>
      <h2>Top 100 Players</h2>
      <div
        style={{
          maxHeight: "700px",
          overflowY: "auto",
          border: "1px solid #ccc",
          borderRadius: "8px",
          padding: "10px",
        }}
      >
        <table style={{ width: "100%", borderCollapse: "collapse" }}>
          <thead>
            <tr>
              <th style={{ textAlign: "left", padding: "10px", borderBottom: "1px solid #ccc" }}>Rank</th>
              <th style={{ textAlign: "left", padding: "10px", borderBottom: "1px solid #ccc" }}>Player Name</th>
              <th style={{ textAlign: "left", padding: "10px", borderBottom: "1px solid #ccc" }}>Ranked Rating</th>
              <th style={{ textAlign: "left", padding: "10px", borderBottom: "1px solid #ccc" }}>Wins</th>
            </tr>
          </thead>
          <tbody>
            {leaderboard.map((player, index) => (
              <tr
                key={player.puuid}
                onMouseEnter={() => setHoveredPlayer(player.puuid)} // Set hovered player on mouse enter
                onMouseLeave={() => setHoveredPlayer(null)} // Reset on mouse leave
                style={{
                  backgroundColor: hoveredPlayer === player.puuid ? "#f0f8ff" : "transparent", // Highlight on hover
                }}
              >
                <td
                  style={{
                    padding: "10px",
                    borderBottom: "1px solid #ccc",
                    color: hoveredPlayer === player.puuid ? "green" : "white", // Change text color to green on hover
                  }}
                >
                  {index + 1}
                </td>
                <td
                  style={{
                    padding: "10px",
                    borderBottom: "1px solid #ccc",
                    color: hoveredPlayer === player.puuid ? "green" : "white", // Change text color to green on hover
                  }}
                >
                  {player.gameName || "Anonymous"}#{player.tagLine || ""}
                </td>
                <td
                  style={{
                    padding: "10px",
                    borderBottom: "1px solid #ccc",
                    color: hoveredPlayer === player.puuid ? "green" : "white", // Change text color to green on hover
                  }}
                >
                  {player.rankedRating}
                </td>
                <td
                  style={{
                    padding: "10px",
                    borderBottom: "1px solid #ccc",
                    color: hoveredPlayer === player.puuid ? "green" : "white", // Change text color to green on hover
                  }}
                >
                  {player.numberOfWins}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Leaderboard;
