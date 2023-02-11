import React, {useState, useEffect, useCallback} from "react";
import HelperDataService from "../services/HelperService";
import ProgressBar from "./ProgressBar"
import {Link} from "react-router-dom";
import "./Home.css";
import "../App.css"
import "../btn.css"
import "./Calendar.css"


const Calendar = (props) => {
    const days = ['dimanche', 'lundi', 'mardi', 'mercredi', 'jeudi', 'vendredi', 'samedi'];
    const convertDayFormat = (day) => {
        if (day.length > 1){
            return day
        }
        return '0'+day
    }
        var today = new Date();
        var today1 = new Date(today)
      
        const date_clean=days[parseInt(today.getDay())]+" "+(today.getDate()+1).toString() + "/"+ parseInt(today.getMonth()+1)
      
        const temp = {}

        for (var i = 0; i<7; i++){
            const tomorrow = new Date()
            tomorrow.setDate(tomorrow.getDate() + i)
            const date_clean=days[parseInt(tomorrow.getDay())]+" "+convertDayFormat((tomorrow.getDate()).toString())+ "/"+ convertDayFormat(parseInt(tomorrow.getMonth()+1))
            temp[date_clean] = {}

        }

    const state = props.history.location.state;
    const user_problem = state.user_problem;
    const [chosenSlot, setChosenSlot] = useState({day: "-", shift: "", helperName: ""})
    const [meetingCode, setMeetingCode] = useState("");
    const [skills, setSkills] = useState("")
    const [availability, setAvailability] = useState(temp)
    const [slotsToShow, setSlotsToShow] = useState(6);
    console.log('Printing user_problem')
    console.log(typeof user_problem);
    console.log(user_problem)


    useEffect(
        () => {
            matchHelpers(state.user_problem)
        },
        []
    );

    const matchHelpers = (text) => {

        const data = {problem_description: text}

        /*  HelperDataService.matchHelpers(data) //add problem to dbase
            .then(response => {
              setHelpers(response.data);
              console.log(response.data);
            })
            .catch(e => {
              console.log(e);
            });*/

        HelperDataService.getCalendar(data) //get aggregated calendar of available qualified helpers
            .then(response => {
                console.log(response.data);
                convertCalendar(response.data);
            })
            .catch(e => {
                console.log(e);
            });

        generateCode() //generates meeting code


    };
    const convertDay = (day)=>{
        let d;
        switch (day) {
            case 'lundi':
                d = 1;
                break;
            case 'mardi':
                d = 2;
                break;
            case 'mercredi':
                d = 3;
                break;
            case 'jeudi':
                d = 4;
                break;
            case 'vendredi':
                d = 5;
                break;
            case 'samedi':
                d = 6;
                break;
            case 'dimanche':
                d = 7;
                break;
        }
        return d
    }

    

    const convertCalendar = (data) => {
        var days = ['dimanche', 'lundi', 'mardi', 'mercredi', 'jeudi', 'vendredi', 'samedi'];

       /* var today = new Date();
        var today1 = new Date(today)
      
        const date_clean=days[parseInt(today.getDay())]+" "+(today.getDate()+1).toString() + "/"+ parseInt(today.getMonth()+1)
      
        const temp = {}

        for (var i = 0; i<7; i++){
            const tomorrow = new Date(today)
            tomorrow.setDate(tomorrow.getDate() + i)
            const date_clean=days[parseInt(tomorrow.getDay())]+" "+(tomorrow.getDate()+1).toString() + "/"+ parseInt(tomorrow.getMonth()+1)
            temp[date_clean] = {}

        }*/

        let d
        for (const x of data) {
            const shift = x.date.split('_')[0]
            const day = parseInt(x.date.split('_')[1])
            
            
            for (const key in temp){ // on check le jour
                if (days[day] == key.split(' ')[0] || (day == 7 && key.split(' ')[0] == 'dimanche')){
                    d = key
                }
            }
            temp[d][shift] = x.names[0] //on chope le premier helper POUR l'instant

        }

        setAvailability(temp)
        setSkills(data[0].skills)
    }


    const generateCode = () => {
        let randomCode = "";
        let possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
        for (let i = 0; i < 5; i++) {
            randomCode += possible.charAt(Math.floor(Math.random() * possible.length));
        }
        setMeetingCode(randomCode)

    }

    const passState = useCallback(
        () => {
            return {
                ...state,
                chosenSlot: chosenSlot,
                skills: skills,
                availability: availability,
                slotsToShow: slotsToShow,
            }
        },
        [],
    );


    const sortShifts = function (a, b) {
        let timeA = a[0]
        let timeB = b[0]

        if (parseInt(timeA.split(":")[0]) - parseInt(timeB.split(":")[0]) === 0) {
            return parseInt(timeA.split(":")[1]) - parseInt(timeB.split(":")[1]);
        } else {
            return parseInt(timeA.split(":")[0]) - parseInt(timeB.split(":")[0]);
        }
    }

    const handleSlotClick = function (e) {
        const chosenDay = e.target.getAttribute('day');
        const chosenShift = e.target.getAttribute('shift');
        const chosenHelperName = e.target.getAttribute('helperName');
        setChosenSlot({day: chosenDay, shift: chosenShift, helperName: chosenHelperName})
    }

    const handleMoreSlotsClick = function () {
        let maxSlotsToShow = Math.max(...Object.values(availability).map(daySlots => Object.values(daySlots).length));
        setSlotsToShow(maxSlotsToShow)

    }
    let progressBar = (
        <ProgressBar
            active="calendar"
            passState={passState}
            previous='/issue'
            next='/checkout'
        />
    )

    const capitalizeFirstLetter = function (str) {
        return str.charAt(0).toUpperCase() + str.slice(1);
    }


    return (

        <div className="pale-blue-background fullscreen calendar">
            <div className="container">
                {progressBar}
            </div>

            <div className="container container-calendar">

                <h2>On a compris votre problème !</h2>
                <h3>Sélectionnez un rendez-vous en ligne</h3>

            </div>


            <div className="container calendar-card">
                <div className="calendar-element calendar-display">
                    <div style={{listStyleType: "none"}}>
                        {
                            Object.entries(availability)
                                .map(([day, shifts]) =>
                                    (<div className="calendar-day-col">
                                            <div className="day-title">
                                                <li>{day.split(' ')[0]}</li>
                                                <li>{day.split(' ')[1]}</li>
                                            </div>
                                            {Object.entries(shifts).sort(sortShifts).slice(0, slotsToShow).map(
                                                ([shift, helperName]) => (
                                                    <li className=
                                                            {"slot-space" +
                                                            (day + shift === chosenSlot.day + chosenSlot.shift ? " slot-space-selected" : "")
                                                            }>
                                                        <div className=
                                                                 {"available-slot" +
                                                                 (day + shift === chosenSlot.day + chosenSlot.shift ? " available-slot-selected" : "")
                                                                 }
                                                             day={day} shift={shift}
                                                             helperName={helperName} onClick={handleSlotClick}>
                                                            {shift}
                                                        </div>
                                                    </li>
                                                )
                                            )
                                            }
                                            {
                                                [...Array(Math.max(slotsToShow - Object.values(shifts).length, 0))]
                                                    .map((e, i) => (
                                                            <li className="empty-slot-space">
                                                                <div className="unavailable-slot">
                                                                    -
                                                                </div>
                                                            </li>
                                                        )
                                                    )
                                            }

                                        </div>
                                    )
                                )
                        }
                    </div>
                    <hr className="solid"/>
                    {
                        (Math.max(...Object.values(availability).map(daySlots => Object.values(daySlots).length)) > slotsToShow) &&
                        <div className="view-more" onClick={handleMoreSlotsClick}>
                            <h3> VOIR PLUS D’HORAIRES</h3>
                        </div>
                    }
                </div>

                <div className="calendar-element">

                    <div className="needed-skills">
                        <p>Votre assistant aura les <span style={{color: "#00CCC7"}}>compétences</span> suivantes: </p>
                        <div>
                            {skills.split("_").map(word =>
                                        (<div className="needed-skill">- {capitalizeFirstLetter(word)}</div>))
                               /* user_problem.split(" ")
                                    .map(word =>
                                        (<div className="needed-skill">- {capitalizeFirstLetter(word)}</div>)
                                    )*/
                            }
                        </div>
                    </div>

                    <div className="selected-date">
                        <p>{capitalizeFirstLetter(chosenSlot.day) + ' ' + chosenSlot.shift}</p>
                    </div>
                    <div className="confirm-meeting-btn">
                        <Link
                            className="btn btn-clickeasy"
                            id="btn-confirm-slot"
                            to={{
                                pathname: "/checkout",
                                state: {
                                    ...state,
                                    chosenSlot: chosenSlot,
                                    skills: skills,
                                    availability: availability,
                                    slotsToShow: slotsToShow,
                                    'meetingCode': meetingCode,
                                    //'meetingDate': chosenSlot.day.split(' ')[0]+' 2021/'+chosenSlot.day.split(' ')[1]+' '+ chosenSlot.shift+':00',
                                    'meetingDate': chosenSlot.shift+'_'+convertDay(chosenSlot.day.split(' ')[0]),
                                    'helperName': chosenSlot.helperName,
                                    'meetingdate_long': '2021/'+chosenSlot.day.split(' ')[1],
                                    'meetingLink': 'dummy_link_' + chosenSlot.name + chosenSlot.day + '_' + chosenSlot.shift + meetingCode
                                }
                            }}
                        >
                            Prenez rendez-vous
                        </Link>

                    </div>
                </div>
            </div>

        </div>


    );
};

export default Calendar;