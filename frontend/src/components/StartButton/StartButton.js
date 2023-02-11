import React from "react";
import "../../btn.css";

/**
 * Props:
 * - disabled: boolean
 * - onClick: () => ()
 */
export default function StartButton(props) {
  return (
    <button
      className="btn-clickeasy btn-start"
      disabled={props.disabled}
      onClick={props.onClick}
    >
      Démarrer le RDV
    </button>
  );
}
