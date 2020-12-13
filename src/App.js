import './App.css';
import React from 'react';
import Nav from './components/Nav.js'
import {Switch, Route} from "react-router-dom"
import Home from "./pages/Home.jsx"
import Auth from "./pages/Auth.jsx"
import Dashboard from "./pages/Dashboard.jsx"
import {useAppState} from "./AppState.js"

const App = (props) => {

  const {dispatch} = useAppState()
  React.useState(() => {
    const auth = JSON.parse(window.localStorage.getItem("auth"))
    if (auth){
      dispatch({type: "auth", payload: auth})
      props.history.push("/dashboard")
    }else{
      props.history.push("/")
    }
  }, [])

  return (
    <div className="App">
      <Route path="/" component={Nav} />
      <Switch>
        <Route exact path="/" component={Home} />
        <Route exact path="/auth/:form" component={Auth} />
        <Route exact path="/dashboard" component={Dashboard} />
      </Switch>
    </div>
  );
}

export default App;
