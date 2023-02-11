import React, { useEffect, useState } from "react";
import HelperDataService from "../services/HelperService";


const MeetingPage = (props) => {
    const code = props.location.state
    const [helper, setHelper] = useState({"meetingcode":"empty","helpername":"empty","meetingdate":"empty","meetinglink":"empty"})

    useEffect(
        () => {getMeetingHelper(code)},
        []
      );


    const getMeetingHelper = (code) => {
        HelperDataService.getMeetingHelper(code)
                  .then(response => {
                    setHelper(response.data)
                    console.log(response.data);
                  })
                  .catch(e => {
                    console.log(e);
                  });

    }


    return(
        <div>
        <div>{code}</div>
        <div>Your helper</div>
        <div>{JSON.stringify(helper[0])}</div>
        {/*Object.entries(helper[0]).map(([key, value]) => (
          <li> 
              {key+': '+value}
          </li>
          ))
        */}
            
       


        </div>

    )


}

export default MeetingPage