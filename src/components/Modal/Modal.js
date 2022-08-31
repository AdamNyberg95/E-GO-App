import React, { useContext, useEffect } from "react";
import { PlayerContext } from "../../App";
import "../Modal/Modal.css";

const Modal = () => {
  const { openModal, setOpenModal } = React.useContext(PlayerContext);
  return (
    openModal && (
      <div
        style={{
          zIndex: 100,
          width: "100%",
          height: "100%",
          backgroundColor: "rgba(0,0,0,0.5)",
          position: "absolute",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <div
          style={{
            width: 400,
            height: 300,
            backgroundColor: "rgba(235,235,235)",
            borderRadius: 5,
            padding: 20,
            position: "absolute",
          }}
        >
          <button
            onClick={() => {
              setOpenModal(false);
            }}
            style={{ position: "absolute", top: 25, right: 25 }}
          >
            X
          </button>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: "20px",
            }}
          >
            <h1 style={{ margin: 0 }}>Submiting</h1>
            <p>Are you sure that you want to submit this team?</p>
          </div>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: "40px",
              marginTop: "20px",
            }}
          >
            <button className="btn yes">Yes</button>
            <button
              className="btn no"
              onClick={() => {
                setOpenModal(false);
              }}
            >
              No
            </button>
          </div>
        </div>
      </div>
    )
  );
};

export default Modal;
