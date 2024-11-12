import React, { useEffect, useState } from "react";
import { auth, db } from "../services/firebaseConfig";
import { doc, getDoc, updateDoc } from "firebase/firestore";

function Profile() {
  const [riotUsername, setRiotUsername] = useState("");
  const [riotTagline, setRiotTagline] = useState("");
  const [loading, setLoading] = useState(true);
  const [editMode, setEditMode] = useState(false);
  const [newRiotUsername, setNewRiotUsername] = useState("");
  const [newRiotTagline, setNewRiotTagline] = useState("");

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const user = auth.currentUser;

        if (user) {
          const userDocRef = doc(db, "users", user.uid);
          const userDoc = await getDoc(userDocRef);

          if (userDoc.exists()) {
            setRiotUsername(userDoc.data().riotUsername);
            setRiotTagline(userDoc.data().riotTagline);
            setNewRiotUsername(userDoc.data().riotUsername);
            setNewRiotTagline(userDoc.data().riotTagline);
          } else {
            console.log("No such document!");
          }
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, []);

  const handleEdit = () => {
    setEditMode(true);
  };

  const handleSave = async () => {
    try {
      const user = auth.currentUser;

      if (user) {
        const userDocRef = doc(db, "users", user.uid);

        await updateDoc(userDocRef, {
          riotUsername: newRiotUsername,
          riotTagline: newRiotTagline,
        });

        setRiotUsername(newRiotUsername);
        setRiotTagline(newRiotTagline);
        setEditMode(false);
      }
    } catch (error) {
      console.error("Error updating user data:", error);
    }
  };

  if (loading) {
    return <p>Loading...</p>;
  }

  return (
    <div>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <h2>Welcome, {riotUsername} #{riotTagline}!</h2>
        {editMode ? (
          <button className="login-signup-btn" onClick={handleSave}>Save</button>
        ) : (
          <button className="login-signup-btn" onClick={handleEdit}>Edit</button>
        )}
      </div>
      <p>This is the user's profile information.</p>
      {editMode && (
        <div style={{ marginTop: "20px" }}>
          <input
            type="text"
            placeholder="Riot Username"
            value={newRiotUsername}
            onChange={(e) => setNewRiotUsername(e.target.value)}
            style={{ marginBottom: "10px", width: "100%" }}
          />
          <input
            type="text"
            placeholder="Riot Tagline"
            value={newRiotTagline}
            onChange={(e) => setNewRiotTagline(e.target.value)}
            style={{ marginBottom: "10px", width: "100%" }}
          />
        </div>
      )}
    </div>
  );
}

export default Profile;