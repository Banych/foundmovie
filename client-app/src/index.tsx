import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import {BrowserRouter} from 'react-router-dom';
import "mobx-react-lite/batchingForReactDom";
import "semantic-ui-css/semantic.min.css";  
import "react-alice-carousel/lib/alice-carousel.css";

ReactDOM.render(
  <BrowserRouter>
    <App />
  </BrowserRouter>,
  document.getElementById("root")
);
