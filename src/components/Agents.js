import React from "react";

const agentsData = [
    {
        name: "Brimstone",
        description: "Brimstone is a strategic Controller in Valorant who uses smokes, incendiaries, and powerful orbital strikes to control the battlefield and support his team's objectives.",
        image:"/agents/Brimstone.webp"
    },
    {
        name: "Viper",
        description: "Viper is a lethal Controller in Valorant who wields toxic gas and chemical abilities to control sightlines, deny areas, and weaken enemies within her poisonous zone of influence.",
        image:"/agents/Viper.webp",
    },
    {
        name: "Omen",
        description: "Omen is a shadowy Controller in Valorant who manipulates vision, teleports across the map, and sows confusion with his smokes and paranoia-inducing abilities.",
        image:"/agents/Omen.webp",
    },
    {
        name: "Killjoy", 
        description:"Killjoy is a genius Sentinel in Valorant who uses advanced technology, including turrets and traps, to lock down sites, gather intel, and disrupt enemy movements.",
        image:"/agents/Killjoy.webp",
    },
    {
        name: "Cypher",
        description:"Cypher is a stealthy Sentinel in Valorant who specializes in gathering intelligence and controlling the battlefield with his spy gadgets, tripwires, and camera surveillance.",
        image:"/agents/Cypher.webp",
    },
    {
        name:"Sova",
        description: "",
        image:"/agents/Sova.webp",
    },
    {
        name:"Sage",
        description: "",
        image:"/agents/Sage.webp",
    },
    {
        name:"Phoenix",
        description:"",
        image:"/agents/Phoenix.webp",
    },
    {
        name: "Jett",
        description: "",
        image:"/agents/Jett.webp",
    },
    {
        name: "Reyna",
        description: "",
        image:"/agents/Reyna.webp",
    },
    {
        name: "Raze", 
        description: "",
        image: "/agents/Raze.webp",
    },
    {
        name: "Breach",
        description: "",
        image: "/agents/Breach.webp",
    },
    {
        name: "Skye",
        description: "",
        image:"/agents/Skye.webp",
    },
    {
        name: "Yoru",
        description: "",
        image:"/agents/Yoru.webp",
    },
    {
        name: "Astra",
        description:"",
        image:"/agents/Astra.webp",
    },
    {
        name: "KAY/O",
        description: "",
        image: "/agents/KAYO.webp",
    },
    {
        name: "Chamber",
        description: "",
        image: "/agents/Chamber.webp",
    },
    {
        name: "Neon",
        description: "",
        image: "/agents/Neon.webp",
    },
    {
        name: "Fade",
        description: "",
        image:"/agents/Fade.webp",
    },
    {
        name: "Harbor",
        description: "",
        image:"/agents/Harbor.webp",
    },
    {
        name: "Gekko",
        description: "",
        image:"/agents/Gekko.webp",
    },
    {
        name: "Deadlock",
        description: "",
        image: "/agents/Deadlock.webp",
    },
    {
        name: "Iso",
        description: "",
        image: "/agents/Iso.webp",
    },
    {
        name: "Clove",
        description: "",
        image: "/agents/Clove.webp",
    },
    {
        name: "Vyse",
        description: "",
        image: "/agents/Vyse.webp",
    },
];

function Agents() {
    return (
        <div style = {{padding: "20px"}}>
            <h2 style = {{textAlign: "center", marginBottom: "20px"}}>Valorant Agents</h2>
            <div
                style = {{
                    display: "grid", 
                    gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
                    gap: "20px",
                }}
            >
                {agentsData.map((agent, index) => (
                    <div
                      key = {index}
                      style = {{
                        border: "1px solid #ccc",
                        borderRadius: "10px", 
                        overflow: "hidden", 
                        boxShadow: "0 4px 8px rgba (0 , 0 , 0 , 0.1)",
                      }}
                    >
                      <img
                        src = {agent.image}
                        alt = {agent.name}
                        style = {{width: "100%", height: "100%", objectFit: "cover" }}
                      />
                      <div style = {{padding: "15px"}}>
                        <h3 style = {{margin: "0 0 10px 0"}}>{agent.name}</h3> 
                        <p style = {{color: "#555"}}>{agent.description}</p>
                      </div>
                    </div>
                ))}   
            </div>
        </div>
    )
}

export default Agents; 