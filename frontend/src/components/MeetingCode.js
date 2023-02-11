import React, {useEffect, useCallback} from "react";
import HelperDataService from "../services/HelperService";

import ProgressBar from "./ProgressBar"
import "../App.css"
import "./MeetingCode.css"

const MeetingCode = (props) => {
    const state= props.history.location.state

    useEffect(
        () => {
            createRoom(state)}
        ,
        []
    )


    const createRoom = (state) => {
        HelperDataService.createRoom( {"meetingcode": state.meetingCode} )
        .then(response => {HelperDataService.updateMeetingTable({
                                meetingcode: state.meetingCode, //pas de camel case pour le back
                                meetingdate: state.meetingDate, //pas de camel case pour le back
                                helpername: state.helperName, //pas de camel case pour le back
                                meetingdate_long: state.meetingdate_long,
                                meetinglink: JSON.parse(response.data).url })} //pas de camel case pour le back
                                )
        .then(response => {
            console.log(response.data);
            })
            .catch(e => {
            console.log(e)});

} 

    const passState = useCallback(
        () => {
            return {
                ...state,
            }
        },
        [],
    );


    return (

        <div className="pale-blue-background fullscreen meeting-code">
            <div className="container">
            <ProgressBar
            active="meeting-code"
            passState={passState}
            previous='/calendar'
            next='/'/>
            </div>
            <div className="container meeting-code-card">
                <div className="meeting-code-display">
                    <h3>
                        Félicitations &nbsp; &#10004;
                    </h3>

                    <h5>
                        Rendez-vous confirmé le <span style={{fontWeight: "500"}} >{state.meetingdate_long} à  {state.meetingDate.split('_')[0]} </span> (UTC +1, Paris)
                    </h5>

                    <h2>
                        Votre code RDV:
                    </h2>

                    <div className={"btn-meeting-code"}>
                        <h1>
                            {state.meetingCode}
                        </h1>
                    </div>

                    <h4>
                        Notez-le précieusement, il sera demandé pour le rendez-vous.
                    </h4>

                    <h6>
                        Il vous a également été envoyé par email.
                    </h6>

                    <h6>
                        Pour rejoindre le rdv avec ce code, cliquez sur <span style={{fontWeight: "500"}} >"J’ai un code RDV"</span> en haut à droite de la page.
                    </h6>

                </div>

            </div>


        </div>

    )
}

export default MeetingCode