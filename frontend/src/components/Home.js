import React from "react";
import { Link } from "react-router-dom";
import "./Home.css";
import FormIssue from "./FormIssue"
import "../App.css"


export default class Home extends React.Component {
  
  constructor(props) {
    super(props);

    this.state = { user_problem: "" };
    this.handleInputChange = this.handleInputChange.bind(this);
  }

  handleInputChange(e) {
    this.setState({
      user_problem: e.target.value
    })
  }

  render() {
    return (
      <div className="pale-blue-background">
        <div className="banner fullscreen">
          <div className="container banner-text">
            <h1>Un problème informatique ?</h1>
            <FormIssue 
              onChange={this.handleInputChange} 
              submitText="Obtenir de l'aide"
              minHeight="150px"
            />
            <Link
                className="btn btn-clickeasy"
                id="btn-get-help"
                to={{
                  pathname: "/calendar",
                  state: this.state
                }}
              >
                  Obtenir de l'aide
            </Link>
            <h2>Ou appelez-nous au 07&nbsp;07&nbsp;78&nbsp;77&nbsp;12</h2>
            <h3>(appel non surtaxé)</h3>
          </div>
        </div>
        <div className="company-presentation">
          <h2>
            ClickEasy accompagne les particuliers dans leurs problèmes informatiques du quotidien
          </h2>
          <a className="btn btn-clickeasy" id="btn-become-helper" href='/add'>
            Devenez assistant
          </a>
        </div>
      </div>

    );
  };
};