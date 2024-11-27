import React from "react";
import './Agents.css';

const agentsData = [
  {
    name: "Brimstone",
    role: "Controller",
    description:
      "Joining from the U.S.A., Brimstone's orbital arsenal ensures his squad always has the advantage. His ability to deliver utility precisely and safely make him the unmatched boots-on-the-ground commander.",
    image: "/agents/Brimstone.webp",
  },
  {
    name: "Viper",
    role: "Controller",
    description:
      "The American Chemist, Viper deploys an array of poisonous chemical devices to control the battlefield and choke the enemy's vision. If the toxins don't kill her prey, her mindgames surely will.",
    image: "/agents/Viper.webp",
  },
  {
    name: "Omen",
    role: "Controller",
    description:
      "A phantom of a memory, Omen hunts in the shadows. He renders enemies blind, teleports across the field, then lets paranoia take hold as his foe scrambles to learn where he might strike next.",
    image: "/agents/Omen.webp",
  },
  {
    name: "Killjoy",
    role: "Sentinel",
    description:
      "The genius of Germany. Killjoy secures the battlefield with ease using her arsenal of inventions. If the damage from her gear doesn't stop her enemies, her robots' debuff will help make short work of them.",
    image: "/agents/Killjoy.webp",
  },
  {
    name: "Cypher",
    role: "Sentinel",
    description:
      "The Moroccan information broker, Cypher is a one-man surveillance network who keeps tabs on the enemy's every move. No secret is safe. No maneuver goes unseen. Cypher is always watching.",
    image: "/agents/Cypher.webp",
  },
  {
    name: "Sova",
    role: "Initiator",
    description:
      "Born from the eternal winter of Russia's tundra, Sova tracks, finds, and eliminates enemies with ruthless efficiency and precision. His custom bow and incredible scouting abilities ensure that even if you run, you cannot hide.",
    image: "/agents/Sova.webp",
  },
  {
    name: "Sage",
    role: "Sentinel",
    description:
      "The stronghold of China, Sage creates safety for herself and her team wherever she goes. Able to revive fallen friends and stave off aggressive pushes, she provides a calm center to a hellish fight.",
    image: "/agents/Sage.webp",
  },
  {
    name: "Phoenix",
    role: "Duelist",
    description:
      "Hailing from the U.K., Phoenix's star power shines through in his fighting style, igniting the battlefield with flash and flare. Whether he's got backup or not, he'll rush into a fight on his own terms.",
    image: "/agents/Phoenix.webp",
  },
  {
    name: "Jett",
    role: "Duelist",
    description:
      "Representing her home country of South Korea, Jett's agile and evasive fighting style lets her take risks no one else can. She runs circles around every skirmish, cutting enemies before they even know what hit them.",
    image: "/agents/Jett.webp",
  },
  {
    name: "Reyna",
    role: "Duelist",
    description:
      "Forged in the heart of Mexico, Reyna dominates single combat, popping off with each kill she scores. Her capability is only limited by her raw skill, making her highly dependent on performance.",
    image: "/agents/Reyna.webp",
  },
  {
    name: "Raze",
    role: "Duelist",
    description:
      "Raze explodes out of Brazil with her big personality and big guns. With her blunt-force-trauma playstyle, she excels at flushing entrenched enemies and clearing tight spaces with a generous dose of 'boom.'",
    image: "/agents/Raze.webp",
  },
  {
    name: "Breach",
    role: "Initiator",
    description:
      "Breach, the bionic Swede, fires powerful, targeted kinetic blasts to aggressively clear a path through enemy ground. The damage and disruption he inflicts ensures no fight is ever fair.",
    image: "/agents/Breach.webp",
  },
  {
    name: "Skye",
    role: "Initiator",
    description:
      "Hailing from Australia, Skye and her band of beasts trail-blaze the way through hostile territory. With her creations hampering the enemy, and her power to heal others, the team is strongest and safest by Skye’s side.",
    image: "/agents/Skye.webp",
  },
  {
    name: "Yoru",
    role: "Duelist",
    description:
      "Japanese native, Yoru, rips holes straight through reality to infiltrate enemy lines unseen. Using deception and aggression in equal measure, he gets the drop on each target before they know where to look.",
    image: "/agents/Yoru.webp",
  },
  {
    name: "Astra",
    role: "Controller",
    description:
      "Ghanaian Agent Astra harnesses the energies of the cosmos to reshape battlefields to her whim. With full command of her astral form and a talent for deep strategic foresight, she's always eons ahead of her enemy's next move.",
    image: "/agents/Astra.webp",
  },
  {
    name: "KAY/O",
    role: "Initiator",
    description:
      "KAY/O is a machine of war built for a single purpose: neutralizing radiants. His power to Suppress enemy abilities dismantles his opponents' capacity to fight back, securing him and his allies the ultimate edge.",
    image: "/agents/KAYO.webp",
  },
  {
    name: "Chamber",
    role: "Sentinel",
    description:
      "Well-dressed and well-armed, French weapons designer Chamber expels aggressors with deadly precision. He leverages his custom arsenal to hold the line and pick off enemies from afar, with a contingency built for every plan.",
    image: "/agents/Chamber.webp",
  },
  {
    name: "Neon",
    role: "Duelist",
    description:
      "Filipino Agent Neon surges forward at shocking speeds, discharging bursts of bioelectric radiance as fast as her body generates it. She races ahead to catch enemies off guard, then strikes them down quicker than lightning.",
    image: "/agents/Neon.webp",
  },
  {
    name: "Fade",
    role: "Initiator",
    description:
      "Turkish bounty hunter, Fade, unleashes the power of raw nightmares to seize enemy secrets. Attuned with terror itself, she hunts targets and reveals their deepest fears—before crushing them in the dark.",
    image: "/agents/Fade.webp",
  },
  {
    name: "Harbor",
    role: "Controller",
    description:
      "Hailing from India’s coast, Harbor storms the field wielding ancient technology with dominion over water. He unleashes frothing rapids and crushing waves to shield his allies, or pummel those that oppose him.",
    image: "/agents/Harbor.webp",
  },
  {
    name: "Gekko",
    role: "Initiator",
    description:
      "Gekko the Angeleno leads a tight-knit crew of calamitous creatures. His buddies bound forward, scattering enemies out of the way, with Gekko chasing them down to regroup and go again.",
    image: "/agents/Gekko.webp",
  },
  {
    name: "Deadlock",
    role: "Sentinel",
    description:
      "Norwegian operative Deadlock deploys an array of cutting-edge nanowire to secure the battlefield from even the most lethal assault. No one escapes her vigilant watch, nor survives her unyielding ferocity.",
    image: "/agents/Deadlock.webp",
  },
  {
    name: "Iso",
    role: "Duelist",
    description:
      "Chinese fixer for hire, Iso falls into a flow state to dismantle the opposition. Reconfiguring ambient energy into bulletproof protection, he advances with focus towards his next duel to the death.",
    image: "/agents/Iso.webp",
  },
  {
    name: "Clove",
    role: "Controller",
    description:
      "Scottish troublemaker Clove makes mischief for enemies in both the heat of combat and the cold of death. The young immortal keeps foes guessing, even from beyond the grave, their return to the living only ever a moment away.",
    image: "/agents/Clove.webp",
  },
  {
    name: "Vyse",
    role: "Sentinel",
    description:
      "Metallic mastermind Vyse unleashes liquid metal to isolate, trap, and disarm her enemies. Through cunning and manipulation, she forces all who oppose her to fear the battlefield itself.",
    image: "/agents/Vyse.webp",
  },
];

function Agents() {
  return (
    <div style={{ padding: "20px" }}>
      <h1 style={{ textAlign: "center", marginBottom: "30px" }}>Valorant Agents</h1>
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
                <h1>{agent.name}</h1>
                <hr style={{ width: "100%", border: "1px solid #FF4655" }}></hr>
                <p style={{ fontStyle: "italic", color: "#888", marginBottom: "10px", marginTop: "10px", fontSize: "20px" }}>{agent.role}</p>
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
