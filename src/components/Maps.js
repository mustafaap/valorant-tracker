import React from "react";

const mapsData = [
  {
    name: "Ascent",
    description: "A two-site map set in Italy with an open mid area and destructible doors.",
    image: "/maps/Ascent.png",
  },
  {
    name: "Bind",
    description: "A map with two sites featuring teleporters for quick rotations.",
    image: "/maps/Bind.png",
  },
  {
    name: "Breeze",
    description: "A large open map with long sightlines and vibrant tropical settings.",
    image: "/maps/Breeze.png",
  },
  {
    name: "Fracture",
    description: "A uniquely shaped map split into two zones with interactive features.",
    image: "/maps/Fracture.png",
  },
  {
    name: "Haven",
    description: "A unique map with three bomb sites, encouraging diverse strategies.",
    image: "/maps/Haven.png",
  },
  {
    name: "Icebox",
    description: "A snowy map with vertical gameplay and zip lines.",
    image: "/maps/Icebox.png",
  },
  {
    name: "Lotus",
    description: "A scenic map with three sites and rotating doors.",
    image: "/maps/Lotus.png",
  },
  {
    name: "Pearl",
    description: "An underwater-themed map with traditional layout and two bomb sites.",
    image: "/maps/Pearl.png",
  },
  {
    name: "Split",
    description: "A map with two sites and elevated ropes for vertical plays.",
    image: "/maps/Split.png",
  },
  {
    name: "Sunset",
    description: "A vibrant map set in Los Angeles with a modern cityscape feel.",
    image: "/maps/Sunset.png",
  },
];

function Maps() {
  return (
    <div style={{ padding: "20px" }}>
      <h1 style={{ textAlign: "center", marginBottom: "30px" }}>Valorant Maps</h1>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
          gap: "20px",
        }}
      >
        {mapsData.map((map, index) => (
          <div
            key={index}
            style={{
              border: "1px solid #ccc",
              borderRadius: "10px",
              overflow: "hidden",
              boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
            }}
          >
            <img
              src={map.image}
              alt={map.name}
              style={{ width: "100%", height: "200px", objectFit: "cover" }}
            />
            <div style={{ padding: "15px" }}>
              <h3 style={{ margin: "0 0 10px 0" }}>{map.name}</h3>
              <p style={{ color: "#555" }}>{map.description}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Maps;