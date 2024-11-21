import axios from "axios";

// Fetch leaderboard data
export const getLeaderboard = async (actId) => {
  try {
    // Fetch data from your backend server
    const response = await axios.get(`http://localhost:5001/leaderboard?actId=${actId}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching leaderboard data:", error);
    throw error;
  }
};