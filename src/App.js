import React from 'react';
import './App.css';
import About from './pages/About';
import Map from './pages/Map';
import Contacts from './pages/Contacts';
import Text from './pages/Text';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Drawer from './components/Navbar/Drawer';
import { render } from "react-dom";
import { positions, Provider } from "react-alert";
import AlertTemplate from "react-alert-template-basic";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles({
  container: {
    display: 'flex',
    justifyContent: 'center'
  }
})
const options = {
  timeout: 5000,
  position: positions.BOTTOM_CENTER
};
function App() {
  const classes = useStyles();
  return (
    <BrowserRouter>
      <Provider template={AlertTemplate} {...options}>
        <div className={classes.container}>
          <Drawer />
          <Switch>
            <Route exact from="/" render={props => <Map {...props} />} />
            <Route exact path="/about" render={props => <About {...props} />} />
            <Route exact path="/text" render={props => <Text {...props} />} />
            <Route exact path="/contacts" render={props => <Contacts {...props} />} />
          </Switch>
        </div>
      </Provider>
    </BrowserRouter>
  );
}

export default App;
