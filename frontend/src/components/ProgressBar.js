import React from "react";
import "./ProgressBar.css";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faAngleDoubleLeft } from '@fortawesome/free-solid-svg-icons'

export default function ProgressBar(props) {
    return (
        <div className="progress-row">
            <Link to={{ pathname: props.previous, state: props.passState() }}>
                <div className={"nav-arrow" + (props.active === "issue" ? " is-hidden" : "")}>
                  <FontAwesomeIcon icon={faAngleDoubleLeft} />
                </div>  
            </Link>
            <div className={"block" + (props.active === "issue" ? " active" : "")}>1. dites-nous tout</div>
            <div className={"block" + (props.active === "calendar" ? " active" : "")}>></div>
            <div className={"block" + (props.active === "calendar" ? " active" : "")}>2. réservation créneau</div>
            <div className={"block" + (props.active === "checkout" ? " active" : "")}>></div>
            <div className={"block" + (props.active === "checkout" ? " active" : "")}>3. infos paiement</div>
            <div className={"block" + (props.active === "meeting-code" ? " active" : "")}>></div>
            <div className={"block" + (props.active === "meeting-code" ? " active" : "")}>4. code RDV</div>
        </div>
    )
};

