import React, { useEffect, useState } from "react";
import { auth, db } from "../services/firebaseConfig";
import { doc, getDoc } from "firebase/firestore";
import axios from "axios";
import { Line } from "react-chartjs-2";
import Chart from "chart.js/auto";

function Profile() {
  const [riotUsername, setRiotUsername] = useState("");
  const [riotTagline, setRiotTagline] = useState("");
  const [puuid, setPuuid] = useState("");
  const [playerStats, setPlayerStats] = useState(null);
  const [matchHistory, setMatchHistory] = useState(null);
  const [hoveredMatch, setHoveredMatch] = useState(null); // Track hovered match
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

            setPlayerStats(data);
            setMatchHistory(matchHistoryResponse.data.data); // Assuming match data is in `.data`
            setRank(mmrHistoryResponse.data);
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

  if (loading) return <p>Loading...</p>;
  if (error)
    return (
      <p style={{ color: "red" }}>
        {typeof error === "string" ? error : "An error occurred."}
      </p>
    );

  return (
    <div style={{ padding: "20px" }}>
      <h2>
        Welcome, {riotUsername}#{riotTagline}!
      </h2>
      <h3>Basic Information</h3>
      <p>
        <strong>Game Name:</strong> {riotUsername}#{riotTagline}
      </p>
      <p>
        <strong>Region:</strong> {playerStats?.region?.toUpperCase() || "N/A"}
      </p>
      <p>
        <strong>PUUID:</strong> {puuid}
      </p>
      <p>
        <strong>Current Rank:</strong>
        {rank?.currenttierpatched || "Unranked"}
      </p>
      <p>
        <strong>Highest Rank:</strong>
        {rank?.highest_rank?.patched_tier || "Unranked"}
      </p>
      <h3>Player Card</h3>
      {playerStats?.card?.small && (
        <img
          src={playerStats.card.small}
          alt="Player Card"
          style={{ width: "150px", height: "auto" }}
        />
      )}

      <div style={{ display: "flex", justifyContent: "space-between" }}>
        {/* Match History */}
        <div
          style={{
            maxHeight: "280px",
            overflowY: "auto",
            border: "1px solid #ccc",
            borderRadius: "8px",
            padding: "10px",
            margin: "0 auto",
            width: "48%",
          }}
        >
          <h3>Match History</h3>
          {matchHistory ? (
            <table style={{ width: "100%", borderCollapse: "collapse" }}>
              <thead>
                <tr>
                  <th style={{ textAlign: "left", padding: "10px" }}>Map</th>
                  <th style={{ textAlign: "left", padding: "10px" }}>Mode</th>
                  <th style={{ textAlign: "left", padding: "10px" }}>Kills</th>
                  <th style={{ textAlign: "left", padding: "10px" }}>Deaths</th>
                  <th style={{ textAlign: "left", padding: "10px" }}>Assists</th>
                  <th style={{ textAlign: "left", padding: "10px" }}>KDA</th>
                </tr>
              </thead>
              <tbody>
                {matchHistory.map((match, index) => {
                  const winningTeam =
                    match.teams.red > match.teams.blue ? "Red" : "Blue";
                  return (
                    <tr
                      key={index}
                      onMouseEnter={() => setHoveredMatch(index)} // Set hovered match on mouse enter
                      onMouseLeave={() => setHoveredMatch(null)} // Reset on mouse leave
                      style={{
                        backgroundColor:
                          winningTeam === match.stats.team
                            ? hoveredMatch === index
                              ? "#32cd32" // Lighter green for hover if won
                              : "#008000" // Green if won
                            : hoveredMatch === index
                            ? "#ffcccb" // Lighter red for hover if lost
                            : "#ff0000", // Red if lost
                      }}
                    >
                      <td style={{ padding: "10px" }}>
                        {match.meta?.map?.name || "Unknown"}
                      </td>
                      <td style={{ padding: "10px" }}>
                        {match.meta?.mode || "Unknown"}
                      </td>
                      <td style={{ padding: "10px" }}>
                        {match.stats?.kills || 0}
                      </td>
                      <td style={{ padding: "10px" }}>
                        {match.stats?.deaths || 0}
                      </td>
                      <td style={{ padding: "10px" }}>
                        {match.stats?.assists || 0}
                      </td>
                      <td style={{ padding: "10px" }}>
                        {(
                          (match.stats?.kills + match.stats?.assists) /
                          (match.stats?.deaths || 1)
                        ).toFixed(2)}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          ) : (
            <p>No match history available.</p>
          )}
        </div>

        {/* Line Graph */}
        <div style={{ width: "48%", height: "300px", overflow: "hidden" }}>
          <h3>MMR Change Over Matches</h3>
          <Line
            data={{
              labels: mmrLabels,
              datasets: [
                {
                  label: "MMR Change",
                  data: mmrValues,
                  borderColor: "blue",
                  backgroundColor: "rgba(0, 0, 255, 0.1)",
                  borderWidth: 2,
                },
              ],
            }}
            options={{
              responsive: true,
              maintainAspectRatio: false,
              scales: {
                y: {
                  beginAtZero: true,
                },
              },
            }}
            style={{ height: "100%", width: "100%" }}
          />
        </div>
      </div>
    </div>
  );
}

export default Profile;