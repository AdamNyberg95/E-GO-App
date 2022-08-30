import React, { useEffect, useState, useContext } from "react";
import { PlayerContext } from "../../App";
import "../Player/Player.css";

const Player = ({ id, name, picture, pickable, price }) => {
  const { players, team, setTeam, setBudget, budget } =
    React.useContext(PlayerContext);

  const removeHandler = (id) => {
    // Removes player with ID "id" from "team" state variable
    const newTeam = team.filter((player) => player.login.username !== id);
    setTeam(newTeam);
  };

  const pickHandler = (id) => {
    // Picks player with ID "id" from "team" state variable
    if (budget < price) return;
    if (team.length >= 5) return;
    const player = players.find((index) => {
      return index.login.username == id;
    });

    if (team.includes(player)) return;

    const newTeam = [...team, player];
    setTeam(newTeam);
  };

  return (
    <div
      className="player"
      style={{ opacity: budget < price && pickable ? 0.2 : 1 }}
    >
      <div style={{ display: "flex", gap: 15 }}>
        <img
          width={40}
          height={40}
          src={picture.thumbnail}
          style={{
            borderRadius: "100%",
          }}
        ></img>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
          }}
        >
          <span>{name.first}</span>
          <span style={{ fontSize: 11 }}>Team 2</span>
        </div>
      </div>
      <div style={{ display: "flex", gap: 20, alignItems: "center" }}>
        <div
          style={{
            fontSize: 18,
            color: "rgb(255, 213, 106)",
          }}
        >
          ${price}
        </div>
        {pickable ? (
          <button className="btn buy" onClick={() => pickHandler(id)}>
            Buy
          </button>
        ) : (
          <div>
            <button className="btn sell" onClick={() => removeHandler(id)}>
              Sell
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Player;
