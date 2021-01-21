import '../App.css';
import React from 'react';
import Layout from './Layout.js'
import Nav from './Nav.js'
import {Switch, Route} from "react-router-dom"
import Home from "../pages/Home.jsx"
import Auth from "../pages/Auth.jsx"
import Dashboard from "../pages/Dashboard.jsx"
import {useAppState} from "../AppState.js"

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
    <Layout>
    <div className="App">
      <Route path="/" component={Nav} />
      <Switch>
        <Route exact path="/" component={Home} />
        <Route  path="/auth/:form" component={Auth} />
        <Route  path="/dashboard" component={Dashboard} />
      </Switch>
    </div>
    </Layout>
  );
}

export default App;
