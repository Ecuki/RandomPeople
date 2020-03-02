import React from "react";
import ReactDOM from "react-dom";
import "./style.scss";
import App from "./components/App";
import { SocialIcon } from "react-social-icons";

ReactDOM.render(<App />, document.getElementById("root"));
ReactDOM.render(
  <>
    <SocialIcon url="http://twitter.com/" />
    <SocialIcon url="https://www.facebook.com/" />
    <SocialIcon url="https://www.youtube.com/" />
  </>,
  document.getElementById("social")
);
