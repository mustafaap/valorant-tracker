import React, { useEffect, useState } from "react";
import { auth, db } from "../services/firebaseConfig"; // Adjust this path if necessary
import { doc, getDoc } from "firebase/firestore";

function Profile() {
  const [riotUsername, setRiotUsername] = useState("");
  const [riotTagline, setRiotTagline] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Function to fetch the user data
    const fetchUserData = async () => {
      try {
        // Get the current logged-in user
        const user = auth.currentUser;

        if (user) {
          // Reference to the user's document in Firestore
          const userDocRef = doc(db, "users", user.uid);
          const userDoc = await getDoc(userDocRef);

          if (userDoc.exists()) {
            // Get 'riotUsername' and 'riotTagline' fields from the document
            setRiotUsername(userDoc.data().riotUsername);
            setRiotTagline(userDoc.data().riotTagline);
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

  if (loading) {
    return <p>Loading...</p>;
  }

  return (
    <div>
      <h2>Welcome, {riotUsername} #{riotTagline}!</h2>
      <p>This is the user's profile information.</p>
    </div>
  );
}

export default Profile;