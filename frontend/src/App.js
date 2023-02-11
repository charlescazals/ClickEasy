import React from "react";
import { Switch, Route } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./btn.css";
import "./App.css"
import "./components/NavbarClickEasy.css";

import NavbarClickEasy from "./components/NavbarClickEasy";
import AddHelper from "./components/AddHelper";
import Helper from "./components/Helper";
import Home from "./components/Home";
import Calendar from "./components/Calendar";
import Issue from "./components/Issue";
import MeetingCode from "./components/MeetingCode";
import EnterCode from "./components/EnterCode"
import MeetingPage from "./components/MeetingPage"
import VideoApp from "./components/VideoApp/VideoApp"
import StripeApp from "./components/StripeApp"

function App() {
  return (

    <div>
      <NavbarClickEasy/>

      <div className="content">
        <Switch>
          <Route exact path={["/", "/helpers", "home"]} component={Home} />
          <Route exact path="/add" component={AddHelper} />
          <Route path="/issue" component={Issue} />
          <Route path="/meeting-code" component={MeetingCode} />
          <Route path="/calendar" component={Calendar} />
          <Route path="/helpers/:id" component={Helper} />
          <Route path="/enter-code" component={EnterCode} />
          <Route path="/meeting-page" component={MeetingPage} />
          <Route path="/video-app" component={VideoApp} />
          <Route path="/checkout" component={StripeApp} />

   


        </Switch>
      </div>

    </div>
  );
}

export default App