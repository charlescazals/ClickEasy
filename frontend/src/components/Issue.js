import React from "react";
import ProgressBar from "./ProgressBar"
import FormIssue from './FormIssue'
import { Link } from "react-router-dom";
import "./Issue.css"
import "../App.css"

export default class Issue extends React.Component {
  
  constructor(props) {
    super(props);
    this.state = props.history.location.state;
    this.handleInputChange = this.handleInputChange.bind(this);
    this.passState = this.passState.bind(this);
  }

  handleInputChange(e) {
    this.setState({
      user_problem: e.target.value
    })
  }

  
  passState() {
    return {
      ...this.state,
      "user_problem": this.state.user_problem,
    }
  }

  render() {
    return (
      <div className="pale-blue-background fullscreen issue">
        <div className="container">
          <ProgressBar 
          active="issue"
          passState={this.passState}
          previous='/'
          next='/calendar'/>
        </div>
        
        <div className="container container-issue">
          <h2>
          Dites-nous tout !
          </h2>
          <h3>
          Expliquez-nous votre problème et/ou ce dont vous auriez besoin 
          </h3>
          <FormIssue 
            value={this.state.user_problem}
            onChange={this.handleInputChange} 
            submitText="Suivant"
            minHeight="250px"
          />
            <Link
                className="btn btn-clickeasy"
                id="btn-get-help"
                to={{
                  pathname: "/calendar",
                  state: {
                    ...this.state,
                    "user_problem": this.state.user_problem,

                  }
                }}
              >
                  Suivant
          </Link>          


        </div>

      </div>

    );
  };

}