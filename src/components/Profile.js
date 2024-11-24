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
        <div style={{ overflowX: "auto", maxHeight: "400px" }}>
          <table
            style={{
              width: "100%",
              marginTop: "20px",
              borderCollapse: "collapse",
              border: "1px solid #ccc",
            }}
          >
            <thead>
              <tr>
                <th style={{ border: "1px solid #ccc", textAlign: "left", padding: "8px" }}>Map</th>
                <th style={{ border: "1px solid #ccc", textAlign: "left", padding: "8px" }}>Mode</th>
                <th style={{ border: "1px solid #ccc", textAlign: "left", padding: "8px" }}>Kills</th>
                <th style={{ border: "1px solid #ccc", textAlign: "left", padding: "8px" }}>Deaths</th>
                <th style={{ border: "1px solid #ccc", textAlign: "left", padding: "8px" }}>Assists</th>
                <th style={{ border: "1px solid #ccc", textAlign: "left", padding: "8px" }}>KDA</th>
              </tr>
            </thead>
            <tbody>
              {matchHistory.map((match, index) => {
                const kills = match.stats.kills || 0;
                const deaths = match.stats.deaths || 1; 
                const assists = match.stats.assists || 0;
                const kda = ((kills + assists) / deaths).toFixed(2); // Calculate KDA

                return (
                  <tr key={index}>
                    <td style={{ padding: "8px", border: "1px solid #ccc" }}>{match.meta.map.name || "Unknown"}</td>
                    <td style={{ padding: "8px", border: "1px solid #ccc" }}>{match.meta.mode || "Unknown"}</td>
                    <td style={{ padding: "8px", border: "1px solid #ccc" }}>{kills}</td>
                    <td style={{ padding: "8px", border: "1px solid #ccc" }}>{deaths}</td>
                    <td style={{ padding: "8px", border: "1px solid #ccc" }}>{assists}</td>
                    <td style={{ padding: "8px", border: "1px solid #ccc" }}>{kda}</td>
                  </tr>
                );
              })}
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