import React, { useState, useEffect } from "react";
import HelperDataService from "../services/HelperService";

const Helper = props => {
  const initialHelperState = {
    id: null,
    name: "",
    skills: "",
    available: false
  };
  const [currentHelper, setCurrentHelper] = useState(initialHelperState);
  const [message, setMessage] = useState("");

  const getHelper = id => {
    HelperDataService.get(id)
      .then(response => {
        setCurrentHelper(response.data);
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  };

  useEffect(() => {
    getHelper(props.match.params.id);
  }, [props.match.params.id]);

  const handleInputChange = event => {
    const { name, value } = event.target;
    setCurrentHelper({ ...currentHelper, [name]: value });
  };

  const updateavailable = status => {
    var data = {
      id: currentHelper.id,
      name: currentHelper.name,
      skills: currentHelper.skills,
      available: status
    };

    HelperDataService.update(currentHelper.id, data)
      .then(response => {
        setCurrentHelper({ ...currentHelper, available: status });
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  };

  const updateHelper = () => {
    HelperDataService.update(currentHelper.id, currentHelper)
      .then(response => {
        console.log(response.data);
        setMessage("The Helper was updated successfully!");
      })
      .catch(e => {
        console.log(e);
      });
  };

  const deleteHelper = () => {
    HelperDataService.remove(currentHelper.id)
      .then(response => {
        console.log(response.data);
        props.history.push("/helpers");
      })
      .catch(e => {
        console.log(e);
      });
  };

  return (
    <div>
      {currentHelper ? (
        <div className="edit-form">
          <h4>Helper</h4>
          <form>
            <div className="form-group">
              <label htmlFor="name">name</label>
              <input
                type="text"
                className="form-control"
                id="name"
                name="name"
                value={currentHelper.name}
                onChange={handleInputChange}
              />
            </div>
            <div className="form-group">
              <label htmlFor="skills">skills</label>
              <input
                type="text"
                className="form-control"
                id="skills"
                name="skills"
                value={currentHelper.skills}
                onChange={handleInputChange}
              />
            </div>

            <div className="form-group">
              <label>
                <strong>Status:</strong>
              </label>
              {currentHelper.available ? "available" : "Pending"}
            </div>
          </form>

          {currentHelper.available ? (
            <button
              className="badge badge-primary mr-2"
              onClick={() => updateavailable(false)}
            >
              UnPublish
            </button>
          ) : (
            <button
              className="badge badge-primary mr-2"
              onClick={() => updateavailable(true)}
            >
              Publish
            </button>
          )}

          <button className="badge badge-danger mr-2" onClick={deleteHelper}>
            Delete
          </button>

          <button
            type="submit"
            className="badge badge-success"
            onClick={updateHelper}
          >
            Update
          </button>
          <p>{message}</p>
        </div>
      ) : (
        <div>
          <br />
          <p>Please click on a Helper...</p>
        </div>
      )}
    </div>
  );
};

export default Helper;