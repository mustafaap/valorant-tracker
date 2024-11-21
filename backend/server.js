const express = require("express");
const axios = require("axios");
const cors = require("cors");

const app = express();
const PORT = 5001; // Choose any available port
const RIOT_API_KEY = "RGAPI-bb1ae8ac-8851-4db3-a4d6-0a20d48463f5"; 

app.use(cors());

app.get("/leaderboard", async (req, res) => {
  const actId = req.query.actId; // Pass actId as a query parameter
  try {
    const response = await axios.get(
      `https://na.api.riotgames.com/val/ranked/v1/leaderboards/by-act/${actId}?size=100`,
      {
        headers: {
          "X-Riot-Token": RIOT_API_KEY,
        },
      }
    );
    res.json(response.data);
  } catch (error) {
    console.error("Error fetching leaderboard:", error);
    res.status(500).send("Failed to fetch leaderboard");
  }
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});