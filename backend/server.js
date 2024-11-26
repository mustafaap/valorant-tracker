const express = require("express");
const axios = require("axios");
const cors = require("cors");
require("dotenv").config();

const app = express();
const PORT = 5001; // Choose any available port

// Riot and Henrik API keys
const RIOT_API_KEY = "RGAPI-ddcc30f9-0121-4012-8ac3-218263998e48";
const HENRIK_API_KEY = process.env.HENRIK_API_KEY;

app.use(cors());

// Riot API: Leaderboard endpoint
app.get("/leaderboard", async (req, res) => {
  const actId = req.query.actId; // Pass actId as a query parameter
  if (!actId) {
    return res
      .status(400)
      .json({ error: "Missing actId in query parameters." });
  }

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
    console.error(
      "Error fetching leaderboard:",
      error.response?.data || error.message
    );
    res.status(500).json({ error: "Failed to fetch leaderboard." });
  }
});

// Henrik Dev API: Fetch user stats endpoint
app.get("/api/henrik-stats", async (req, res) => {
  const { username, tagline } = req.query;

  if (!username || !tagline) {
    return res
      .status(400)
      .json({ error: "Missing username or tagline in query parameters." });
  }

  try {
    const response = await axios.get(
      `https://api.henrikdev.xyz/valorant/v1/account/${username}/${tagline}`,

      {
        headers: {
          Authorization: HENRIK_API_KEY,
        },
      }
    );
    res.json(response.data); // Send the response data back to the frontend
  } catch (error) {
    console.error(
      "Error fetching user stats from Henrik API:",
      error.response?.data || error.message
    );
    res.status(error.response?.status || 500).json({
      error: error.response?.data || "Failed to fetch user stats.",
    });
  }
});

// Henrik Dev API: Match history endpoint
app.get("/api/match-history", async (req, res) => {
  const { region, username, tagline } = req.query;

  if (!region || !username || !tagline) {
    return res.status(400).json({
      error: "Missing region, username, or tagline in query parameters.",
    });
  }

  try {
    const response = await axios.get(
      `https://api.henrikdev.xyz/valorant/v1/stored-matches/${region}/${username}/${tagline}`,
      {
        headers: {
          Authorization: HENRIK_API_KEY,
        },
      }
    );
    res.json(response.data); // Return match history data to the frontend
  } catch (error) {
    console.error(
      "Error fetching match history from Henrik API:",
      error.response?.data || error.message
    );
    res.status(error.response?.status || 500).json({
      error: error.response?.data || "Failed to fetch match history.",
    });
  }
});

// Henrik Dev API: Fetch MMR data (Rank and Rating)
app.get("/api/rank", async (req, res) => {
  const { region, username, tagline } = req.query;

  if (!region || !username || !tagline) {
    return res.status(400).json({
      error: "Missing region, username, or tagline in query parameters.",
    });
  }

  try {
    const response = await axios.get(
      `https://api.henrikdev.xyz/valorant/v2/mmr/${region}/${username}/${tagline}`,
      {
        headers: {
          Authorization: HENRIK_API_KEY,
        },
      }
    );
    res.json(response.data);
  } catch (error) {
    console.error(
      "Error fetching MMR data from Henrik API:",
      error.response?.data || error.message
    );
    res.status(error.response?.status || 500).json({
      error: error.response?.data || "Failed to fetch MMR data.",
    });
  }
});

// Henrik Dev API: Fetch MMR history
app.get("/api/mmr-history", async (req, res) => {
  const { region, username, tagline } = req.query;

  if (!region || !username || !tagline) {
    return res.status(400).json({
      error: "Missing region, username, or tagline in query parameters.",
    });
  }

  try {
    const response = await axios.get(
      `https://api.henrikdev.xyz/valorant/v1/mmr-history/${region}/${username}/${tagline}`,
      {
        headers: {
          Authorization: HENRIK_API_KEY,
        },
      }
    );
    res.json(response.data); // Return MMR history to the frontend
  } catch (error) {
    console.error(
      "Error fetching MMR history from Henrik API:",
      error.response?.data || error.message
    );
    res.status(error.response?.status || 500).json({
      error: error.response?.data || "Failed to fetch MMR history.",
    });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
