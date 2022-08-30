import React, { useState, useEffect } from "react";
import "../Search/Search.css";
import { PlayerContext } from "../../App";

import Player from "../Player/Player";

const Search = () => {
  const { players, team, setTeam } = React.useContext(PlayerContext);
  const [shownPlayers, setShownPlayers] = useState();

  const renderPlayers = (array) => {
    let filteredArray = array.filter((player) => {
      return !team.includes(player);
    });
    const renderListOfPlayers = filteredArray.map((player, index) => (
      <Player
        key={index}
        id={player.login.username}
        name={player.name}
        picture={player.picture}
        price={player.budget}
        pickable={true}
      />
    ));

    setShownPlayers(renderListOfPlayers);
  };

  useEffect(() => {
    if (players) {
      renderPlayers(players);
    }
  }, [players, team]);

  return (
    <div className="search" style={{ gap: 5 }}>
      <h1 className="box-title">Pick Players</h1>
      <div>
        <input
          className="search-player"
          type="text"
          placeholder="Search"
          onChange={(e) => {
            const term = e.target.value.toLowerCase();
            const newListOfPlayers = players.filter(
              (user) =>
                user.name.first.toLowerCase().search(new RegExp(term)) === 0
            );
            renderPlayers(newListOfPlayers);
          }}
        />
      </div>
      <div className="player-list">{shownPlayers}</div>
    </div>
  );
};

export default Search;
