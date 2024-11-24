import React, { useEffect, useState } from "react";
import { auth, db } from "../services/firebaseConfig";
import { doc, getDoc } from "firebase/firestore";
import axios from "axios";

function Profile() {
  const [riotUsername, setRiotUsername] = useState("");
  const [riotTagline, setRiotTagline] = useState("");
  const [puuid, setPuuid] = useState("");
  const [playerStats, setPlayerStats] = useState(null);
  const [matchHistory, setMatchHistory] = useState(null);
  const [hoveredMatch, setHoveredMatch] = useState(null); // Track hovered match
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

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
            const statsResponse = await axios.get("http://localhost:5001/api/henrik-stats", {
              params: { username: riotUsername, tagline: riotTagline },
            });

            const { data } = statsResponse.data;
            setPuuid(data.puuid);

            // Fetch match history
            const matchHistoryResponse = await axios.get("http://localhost:5001/api/match-history", {
              params: { region: data.region, username: riotUsername, tagline: riotTagline },
            });

            setPlayerStats(data);
            setMatchHistory(matchHistoryResponse.data.data); // Assuming match data is in `.data`
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
  if (error) return <p style={{ color: "red" }}>{typeof error === "string" ? error : "An error occurred."}</p>;

  return (
    <div style={{ padding: "20px" }}>
      <h2>Welcome, {riotUsername}#{riotTagline}!</h2>
      <h3>Basic Information</h3>
      <p><strong>Game Name:</strong> {riotUsername}#{riotTagline}</p>
      <p><strong>Region:</strong> {playerStats?.region?.toUpperCase() || "N/A"}</p>
      <p><strong>PUUID:</strong> {puuid}</p>

      <h3>Player Card</h3>
      {playerStats?.card?.small && (
        <img src={playerStats.card.small} alt="Player Card" style={{ width: "150px", height: "auto" }} />
      )}

      <h3>Match History</h3>
      {matchHistory ? (
        <div
          style={{
            maxHeight: "300px",
            overflowY: "auto",
            border: "1px solid #ccc",
            borderRadius: "8px",
            padding: "10px",
            margin: "0 auto", 
          }}
        >
          <table style={{ width: "100%", borderCollapse: "collapse" }}>
            <thead>
              <tr>
                <th style={{ textAlign: "left", padding: "10px", borderBottom: "1px solid #ccc" }}>Map</th>
                <th style={{ textAlign: "left", padding: "10px", borderBottom: "1px solid #ccc" }}>Mode</th>
                <th style={{ textAlign: "left", padding: "10px", borderBottom: "1px solid #ccc" }}>Kills</th>
                <th style={{ textAlign: "left", padding: "10px", borderBottom: "1px solid #ccc" }}>Deaths</th>
                <th style={{ textAlign: "left", padding: "10px", borderBottom: "1px solid #ccc" }}>Assists</th>
                <th style={{ textAlign: "left", padding: "10px", borderBottom: "1px solid #ccc" }}>KDA</th>
              </tr>
            </thead>
            <tbody>
              {matchHistory.map((match, index) => (
                <tr
                  key={index}
                  onMouseEnter={() => setHoveredMatch(index)} // Set hovered match on mouse enter
                  onMouseLeave={() => setHoveredMatch(null)} // Reset on mouse leave
                  style={{
                    backgroundColor: hoveredMatch === index ? "#f0f8ff" : "transparent", // Highlight on hover
                  }}
                >
                  <td style={{ padding: "10px", borderBottom: "1px solid #ccc" }}>
                    {match.meta?.map?.name || "Unknown"}
                  </td>
                  <td style={{ padding: "10px", borderBottom: "1px solid #ccc" }}>
                    {match.meta?.mode || "Unknown"}
                  </td>
                  <td style={{ padding: "10px", borderBottom: "1px solid #ccc" }}>{match.stats?.kills || 0}</td>
                  <td style={{ padding: "10px", borderBottom: "1px solid #ccc" }}>{match.stats?.deaths || 0}</td>
                  <td style={{ padding: "10px", borderBottom: "1px solid #ccc" }}>{match.stats?.assists || 0}</td>
                  <td style={{ padding: "10px", borderBottom: "1px solid #ccc" }}>
                    {((match.stats?.kills + match.stats?.assists) / (match.stats?.deaths || 1)).toFixed(2)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <p>No match history available.</p>
      )}
    </div>
  );
}

export default Profile;