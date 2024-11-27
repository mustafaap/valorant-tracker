import React from "react";
import './Agents.css';

const agentsData = [
    {
      name: "Brimstone",
      description:
        "Brimstone is a strategic Controller in Valorant who uses smokes, incendiaries, and powerful orbital strikes to control the battlefield and support his team's objectives.",
      image: "/agents/Brimstone.webp",
    },
    {
      name: "Viper",
      description:
        "Viper is a lethal Controller in Valorant who wields toxic gas and chemical abilities to control sightlines, deny areas, and weaken enemies within her poisonous zone of influence.",
      image: "/agents/Viper.webp",
    },
    {
      name: "Omen",
      description:
        "Omen is a shadowy Controller in Valorant who manipulates vision, teleports across the map, and sows confusion with his smokes and paranoia-inducing abilities.",
      image: "/agents/Omen.webp",
    },
    {
      name: "Killjoy",
      description:
        "Killjoy is a genius Sentinel in Valorant who uses advanced technology, including turrets and traps, to lock down sites, gather intel, and disrupt enemy movements.",
      image: "/agents/Killjoy.webp",
    },
    {
      name: "Cypher",
      description:
        "Cypher is a stealthy Sentinel in Valorant who specializes in gathering intelligence and controlling the battlefield with his spy gadgets, tripwires, and camera surveillance.",
      image: "/agents/Cypher.webp",
    },
    {
      name: "Sova",
      description:
        "Sova is a Recon Agent in Valorant who uses his bow and arrows, equipped with scanning and revealing abilities, to gather intel on enemy positions and help his team secure crucial information.",
      image: "/agents/Sova.webp",
    },
    {
      name: "Sage",
      description:
        "Sage is a Healer in Valorant who uses her healing abilities and resurrection powers to support her team, while also providing area control with her barriers and slows.",
      image: "/agents/Sage.webp",
    },
    {
      name: "Phoenix",
      description:
        "Phoenix is a Duelist in Valorant who uses fire-based abilities to heal himself, deny enemy vision, and deal damage, while also being able to revive himself using his ultimate.",
      image: "/agents/Phoenix.webp",
    },
    {
      name: "Jett",
      description:
        "Jett is a highly mobile Duelist in Valorant who excels at evasive maneuvers, using wind-based abilities to dash, float, and quickly reposition herself in the midst of combat.",
      image: "/agents/Jett.webp",
    },
    {
      name: "Reyna",
      description:
        "Reyna is a Duelist in Valorant who thrives on fragging, using her abilities to heal, become invulnerable, and enhance her power by consuming the souls of defeated enemies.",
      image: "/agents/Reyna.webp",
    },
    {
      name: "Raze",
      description:
        "Raze is an explosive Duelist in Valorant who uses grenades, blast packs, and a rocket launcher to deal massive area damage and control space on the map.",
      image: "/agents/Raze.webp",
    },
    {
      name: "Breach",
      description:
        "Breach is an Initiator in Valorant who uses seismic abilities to clear enemies from cover, disrupt their vision, and create openings for his team to push forward.",
      image: "/agents/Breach.webp",
    },
    {
      name: "Skye",
      description:
        "Skye is a versatile support Agent in Valorant, using healing, blinding, and scouting abilities to help her team while maintaining a strong presence on the battlefield.",
      image: "/agents/Skye.webp",
    },
    {
      name: "Yoru",
      description:
        "Yoru is a stealthy Duelist in Valorant who uses abilities to create false illusions, teleport, and confuse enemies to get the drop on his opponents.",
      image: "/agents/Yoru.webp",
    },
    {
      name: "Astra",
      description:
        "Astra is a Controller in Valorant who uses her cosmic abilities to manipulate space and time, controlling key areas of the map with her stars, smokes, and gravitational pulls.",
      image: "/agents/Astra.webp",
    },
    {
      name: "KAY/O",
      description:
        "KAY/O is an Initiator in Valorant who suppresses enemy abilities, making him a valuable asset in disabling enemies and enabling his team to execute strategies more effectively.",
      image: "/agents/KAYO.webp",
    },
    {
      name: "Chamber",
      description:
        "Chamber is a Sentinel in Valorant who uses his arsenal of high-tech gadgets, including teleportation and heavy firepower, to control areas and eliminate threats with precision.",
      image: "/agents/Chamber.webp",
    },
    {
      name: "Neon",
      description:
        "Neon is a fast-moving Duelist in Valorant who uses her speed and electricity-based abilities to overwhelm enemies and quickly traverse the battlefield.",
      image: "/agents/Neon.webp",
    },
    {
      name: "Fade",
      description:
        "Fade is a Controller in Valorant who uses abilities to gather information and disrupt enemy positioning with her haunting and unsettling powers.",
      image: "/agents/Fade.webp",
    },
    {
      name: "Harbor",
      description:
        "Harbor is a Controller in Valorant who manipulates water to create barriers, block vision, and slow enemies, making him an excellent support for his team's control of space.",
      image: "/agents/Harbor.webp",
    },
    {
      name: "Gekko",
      description:
        "Gekko is an Initiator in Valorant who uses his unique, animal-based abilities to blind, slow, and disorient enemies, creating opportunities for his team to push and control the map.",
      image: "/agents/Gekko.webp",
    },
    {
      name: "Deadlock",
      description:
        "Deadlock is a Controller in Valorant who uses her advanced tech and energy shields to lock down key areas and slow enemy movements, offering strong control in critical situations.",
      image: "/agents/Deadlock.webp",
    },
    {
      name: "Iso",
      description:
        "Iso is a potential future agent in Valorant, rumored to use energy-based abilities to create shockwaves and disrupt enemy plans. More details about her abilities are yet to be revealed.",
      image: "/agents/Iso.webp",
    },
    {
      name: "Clove",
      description:
        "Clove is another rumored future agent, speculated to wield plant-based abilities to trap, heal, or buff her team. Her potential role and abilities are still under speculation.",
      image: "/agents/Clove.webp",
    },
    {
      name: "Vyse",
      description:
        "Vyse is a highly anticipated agent with rumored abilities related to manipulating gravity, using pull and push forces to disrupt enemy positions and control areas.",
      image: "/agents/Vyse.webp",
    },
  ];
  

function Agents() {
    return (
      <div style={{ padding: "20px" }}>
        <h2 style={{ textAlign: "center", marginBottom: "20px" }}>Valorant Agents</h2>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
            gap: "20px",
          }}
        >
          {agentsData.map((agent, index) => (
            <div
              key={index}
              style={{
                width: "380px",
                height: "400px",
                perspective: "1000px", // Depth for 3D flip
              }}
            >
              <div className="card-container">
                {/* Front of the card */}
                <div className="card-front">
                  <img
                    src={agent.image}
                    alt={agent.name}
                    style={{
                      width: "100%",
                      height: "100%",
                      objectFit: "cover",
                      borderRadius: "10px",
                    }}
                  />
                </div>
                {/* Back of the card */}
                <div className="card-back">
                  <h3>{agent.name}</h3>
                  <p style={{ color: "#555" }}>{agent.description}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }
  
  export default Agents;
