import React, { useState, useEffect } from "react";
import "./App.css";
import Search from "./components/Search/Search";
import Player from "./components/Player/Player";
import Modal from "./components/Modal/Modal";
export const PlayerContext = React.createContext();

const MAX_PLAYERS = 100;

const getFiveRandomNumbers = () => {
  var arr = [];
  while (arr.length < 5) {
    var r = Math.floor(Math.random() * (MAX_PLAYERS - 1)) + 1;
    if (arr.indexOf(r) === -1) arr.push(r);
  }
  return arr;
};

function App() {
  const [players, setPlayers] = useState(null);
  const [team, setTeam] = useState([]);
  const [budget, setBudget] = useState(1000);
  const [openModal, setOpenModal] = useState(false);

  useEffect(() => {
    console.log(players);
  }, [players]);

  useEffect(() => {
    setBudget(
      team?.reduce((a, b) => {
        return a - b.budget;
      }, 1000)
    );
  }, [team]);

  const renderTeam = (team) => {
    const teamToBeRendered = team.map((player, index) => (
      <Player
        id={player.login.username}
        name={player.name}
        picture={player.picture}
        price={player.budget}
        pickable={false}
      />
    ));

    return teamToBeRendered;
  };

  const clear = () => {
    // TODO: Reset money
    setTeam([]);
  };

  function randomIntFromInterval(min, max) {
    // min and max included
    return Math.floor(Math.random() * (max - min + 1) + min);
  }

  const getFiveRandomPlayers = (allPlayers) => {
    const fiveRandomNumbers = getFiveRandomNumbers();
    const randomTeam = fiveRandomNumbers.map((number) => allPlayers[number]);
    setTeam(randomTeam);
  };

  useEffect(() => {
    fetch("https://randomuser.me/api/?results=" + MAX_PLAYERS)
      .then((res) => res.json())
      .then((data) => {
        setPlayers(
          data.results.map((player) => {
            return {
              ...player,
              budget: Math.floor(Math.random() * (300 - 100 + 1) + 100),
            };
          })
        );
      });
  }, []);

  return (
    <PlayerContext.Provider
      value={{
        players,
        team,
        setTeam,
        budget,
        setBudget,
        openModal,
        setOpenModal,
      }}
    >
      <Modal />
      <div className="App">
        <div className="box">
          <h1 className="box-title">Your dream team</h1>
          <div className="box-team-buttons">
            <div style={{ display: "flex", gap: 5 }}>
              <button
                className="btn random"
                onClick={() => getFiveRandomPlayers(players)}
              >
                Randomize
              </button>
              <button
                className="btn clear"
                onClick={() => {
                  clear();
                }}
              >
                Clear
              </button>
            </div>
            <span className="budget">{budget}</span>
          </div>
          <div className="picked-players">{renderTeam(team)}</div>
          {team.length < 5 && (
            <div style={{ color: "white" }}>Must have 5 players</div>
          )}
          {budget < 0 && (
            <div style={{ color: "white" }}>You can't afford this team</div>
          )}
          <button
            className="btn submit"
            onClick={() => {
              setOpenModal(true);
            }}
            style={{
              display: team.length < 5 || budget < 0 ? "none" : "block",
            }}
          >
            Submit Team
          </button>
        </div>
        <div className="box">
          <Search />
        </div>
      </div>
    </PlayerContext.Provider>
  );
}

export default App;
