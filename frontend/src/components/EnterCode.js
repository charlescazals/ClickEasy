import React from "react";
import "./Home.css";
import { Button, Form } from 'react-bootstrap';
import "../App.css"
import "./EnterCode.css"
import {Link} from "react-router-dom";
import HelperDataService from "../services/HelperService";


export default class EnterCode extends React.Component {

    constructor(props) {
        super(props);

        this.state = {code: "", path: "/video-app"};
        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleClick = this.handleClick.bind(this)
    }
   


    handleInputChange(e) {
        this.setState({
            code: e.target.value
        })
    }

   handleClick(){

       HelperDataService.getMeetingHelper(this.state.code)
        .then(response => {
            if (JSON.stringify(response.data)=="[]"){
            alert('wrong code')
            window.location.reload(false);

        }
            else{
                this.props.history.push({
                pathname: '/video-app',
                state: this.state.code
            })
            }
        })
        
    }

    handleKeyPress(event){
        if(event.key == "Enter"){
            this.handleClick()
        }
    }
    


    render() {
        return (
            <div className="pale-blue-background fullscreen enter-code">
                <div className="container enter-code-card">
                    <h1>Entrez votre code</h1>
                    <input
                                className="code-input-clickeasy"
                                type="text"
                                placeholder="Entrez votre code"
                                name="meeting_code"
                                onChange={this.handleInputChange}
                                onKeyPress = {event => this.handleKeyPress(event)}
                                
                                
                            />

                 {/*}  <Link 
                     onClick={event => this.checkValid(event)}
                        className="btn btn-clickeasy"
                        to={{
                            pathname: this.state.path,
                            state: this.state.code
                        }}
                        condition={false}
                        
                    >
                        Valider
                    </Link>
                 */}
              <div>   <Button className="btn btn-clickeasy" 
                 onClick = {event => this.handleClick(event)}
                 onKeyPress = {event => this.handleKeyPress(event)}>
                 
                 Valider</Button></div>
                </div>
            </div>

        );
    };
};