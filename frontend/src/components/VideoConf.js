import React from "react";
import ReactDOM from "react-dom";
import "./VideoConf.css";
import VideoApp from "./VideoApp/VideoApp";
import BrowserUnsupported from "./BrowserUnsupported/BrowserUnsupported";
import DailyIframe from "@daily-co/daily-js";

ReactDOM.render(
  DailyIframe.supportedBrowser().supported ? <VideoApp /> : <BrowserUnsupported />,
  document.getElementById("root")
);
