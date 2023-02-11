import React from "react";

/**
 * Props:
 * - disabled: boolean
 * - onClick: () => ()
 */
export default function StartButtonBis(props) {
  return (
    <button
      disabled={props.disabled}
      onClick={props.onClick}
    >
      Click to create call
    </button>
  );
}
