import React, { useEffect, useState } from "react";
import { auth, db } from "../services/firebaseConfig";
import { doc, getDoc } from "firebase/firestore";
import axios from "axios";
import "./WeaponPerformance.css";

function WeaponPerformance() {
  const [weaponStats, setWeaponStats] = useState([]);
  const [playerLoadout, setPlayerLoadout] = useState(null); // State for loadout
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchWeaponStatsAndLoadout = async () => {
      try {
        const user = auth.currentUser;

        if (user) {
          // Fetch stored Riot info from Firestore
          const userDocRef = doc(db, "users", user.uid);
          const userDoc = await getDoc(userDocRef);

          if (userDoc.exists()) {
            const { riotUsername, riotTagline } = userDoc.data();

            // Fetch user stats to get puuid
            const statsResponse = await axios.get(
              "http://localhost:5001/api/henrik-stats",
              {
                params: { username: riotUsername, tagline: riotTagline },
              }
            );

            const { data } = statsResponse.data;
            const puuid = data.puuid;
            const region = data.region;

            // Fetch loadout
            const loadoutResponse = await axios.post(
              "http://localhost:5001/api/player-loadout",
              {
                puuid,
                shard: region,
              }
            );
            setPlayerLoadout(loadoutResponse.data);

            // Fetch match history
            const matchHistoryResponse = await axios.get(
              "http://localhost:5001/api/match-history",
              {
                params: {
                  region,
                  username: riotUsername,
                  tagline: riotTagline,
                },
              }
            );

            const matches = matchHistoryResponse.data.data;

            const weaponData = {};
            const limitedMatches = matches.slice(0, 5);

            for (const match of limitedMatches) {
              const matchId = match.meta.id;

              if (!matchId) {
                console.error("matchId is undefined for match:", match);
                continue;
              }

              const matchDetailsResponse = await axios.get(
                "http://localhost:5001/api/match-details",
                {
                  params: {
                    matchId,
                  },
                }
              );

              const matchDetails = matchDetailsResponse.data;

              // Find the player using puuid
              const player = matchDetails.players.all_players.find(
                (p) => p.puuid === puuid
              );

              if (player && player.stats && player.stats.damage_made) {
                player.stats.damage_made.forEach((damage) => {
                  const weaponName = damage.damage_weapon_name;

                  if (!weaponData[weaponName]) {
                    weaponData[weaponName] = {
                      kills: 0,
                      headshots: 0,
                      bodyshots: 0,
                      legshots: 0,
                    };
                  }

                  weaponData[weaponName].kills += damage.damage_kills || 0;
                  weaponData[weaponName].headshots +=
                    damage.damage_headshots || 0;
                  weaponData[weaponName].bodyshots +=
                    damage.damage_bodyshots || 0;
                  weaponData[weaponName].legshots +=
                    damage.damage_legshots || 0;
                });
              }
            }

            // Convert weaponData object to an array
            const weaponStatsArray = Object.entries(weaponData).map(
              ([name, stats]) => ({
                name,
                ...stats,
              })
            );

            setWeaponStats(weaponStatsArray);
          } else {
            throw new Error("User data does not exist in Firestore.");
          }
        } else {
          throw new Error("No authenticated user found.");
        }
      } catch (err) {
        console.error("Error fetching weapon stats or loadout:", err);
        setError(err.response?.data?.error || "Failed to load weapon stats.");
      } finally {
        setLoading(false);
      }
    };

    fetchWeaponStatsAndLoadout();
  }, []);

  if (loading) {
    return (
      <div className="loading-container">
        <div className="loading-spinner"></div>
        <p className="loading-text">Loading Weapon Performance...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="error-container">
        <h2>Error Loading Weapon Performance</h2>
        <p>{typeof error === "string" ? error : "An error occurred."}</p>
      </div>
    );
  }

  return (
    <div className="weapon-performance-container">
      <h2>Weapon Performance</h2>
      <div className="table-container">
        <table className="weapon-stats-table">
          <thead>
            <tr>
              <th>Weapon</th>
              <th>Kills</th>
              <th>Headshots</th>
              <th>Bodyshots</th>
              <th>Legshots</th>
            </tr>
          </thead>
          <tbody>
            {weaponStats.map((weapon, index) => (
              <tr key={index}>
                <td>{weapon.name}</td>
                <td>{weapon.kills}</td>
                <td>{weapon.headshots}</td>
                <td>{weapon.bodyshots}</td>
                <td>{weapon.legshots}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <h2>Player Loadout</h2>
      {playerLoadout ? (
        <div className="loadout-display">
          {playerLoadout.Guns.map((gun, index) => (
            <div key={index} className="gun-details">
              <p><strong>Gun:</strong> {gun.ID}</p>
              <p><strong>Skin:</strong> {gun.SkinID}</p>
              <p><strong>Chroma:</strong> {gun.ChromaID}</p>
            </div>
          ))}
        </div>
      ) : (
        <p>No loadout data available.</p>
      )}
    </div>
  );
}

export default WeaponPerformance;
