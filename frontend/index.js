import React from 'react';
import App from './App';
import 'semantic-ui-css/semantic.min.css'
import * as ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";

ReactDOM.render(
<>
<React.StrictMode>
  <BrowserRouter>
    <App />
  </BrowserRouter>
</React.StrictMode>, 


 </> ,
  document.getElementById('teachToMe')
);

