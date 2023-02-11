import React, { useState } from "react";
import HelperDataService from "../services/HelperService";
import Autocomplete from "@material-ui/lab/Autocomplete";
import TextField from "@material-ui/core/TextField";
import AvailabilityForm from "./AvailabilityForm"

const AddHelper = () => {
  const initialHelperState = {
    id: null,
    name: "",
    email: "",
    skills: [],
    available: []
  };
  const [helper, setHelper] = useState(initialHelperState);
  const [submitted, setSubmitted] = useState(false);


  const handleInputChange = event => {
    const { name, value } = event.target;
    setHelper({ ...helper, [name]: value });
  };

  const isEmail = val => {
    let regEmail = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if(!regEmail.test(val)){
      return false;
    }
    return true
}
  
  const saveHelper = () => {
   
    var data = {
      name: helper.name,
      email: helper.email,
      skills: helper.skills,
      available: JSON.stringify(helper.available)
    };
    if (isEmail(data.email)){

    HelperDataService.create(data)
      .then(response => {
        setHelper({
          id: response.data.id,
          name: response.data.name,
          email: response.data.email,
          skills: response.data.skills,
          available: response.data.available
        });
        setSubmitted(true);
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
    }
    else{
      alert('Invalid Email, please enter a correct email address')}
  };

  const newHelper = () => {
    setHelper(initialHelperState);
    setSubmitted(false);
  };

  return (
    <div className="submit-form">
      {submitted ? (
        <div>
          <h4>You submitted successfully!</h4>
          <button className="btn btn-success" onClick={newHelper}>
            Add
          </button>
        </div>
      ) : (
        <div>
          <div className="form-group">
            <label htmlFor="name">name</label>
            <input
              type="text"
              className="form-control"
              id="name"
              required
              value={helper.name}
              onChange={handleInputChange}
              name="name"
            />
          </div>

          <div className="form-group">
            <label htmlFor="name">email</label>
            <input
              type="text"
              className="form-control"
              id="email"
              required
              value={helper.email}
              onChange={handleInputChange}
              name="email"
            />
          </div>


         {/* <div className="form-group">
            <label htmlFor="skills">skills</label>
            <input
              type="text"
              className="form-control"
              id="skills"
              required
              value={helper.skills}
              onChange={handleInputChange}
              name="skills"
            />
      </div>*/}<div>
        <label htmlFor="name">skills</label>
                <Autocomplete
                  multiple
                  freeSolo
                  id="tags-outlined"
                  options={["skill1", "skill2", "skill3"]}
                  defaultValue={[]}
                  onChange={(e,v) => {setHelper({ ...helper, skills : v });}}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      variant="outlined"
                      label="skills"
                      placeholder="Favorites"
                    />
                  )}
                />

             </div>
             <div>
             
                <div>Availability Information</div>
                <div className='text-primary'>
                  <div>What Shifts Are You Available To Work?</div>
                </div>
                <AvailabilityForm  onChange={(a) => {setHelper({...helper, available: a})}
                                                  }
                                                   />

             </div>
      



          <button onClick={saveHelper} className="btn btn-success">
            Submit
          </button>
        </div>
      )}
    </div>
  );
};

export default AddHelper;

