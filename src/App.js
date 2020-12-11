// import ProjectDisplay from './components/ProjectDisplay.js'
import './App.css';
import Nav from './components/Nav.js'
import {Switch, Route} from "react-router-dom"
import Home from "./pages/Home.jsx"
import Auth from "./pages/Auth.jsx"
import Dashboard from "./pages/Dashboard.jsx"

const App = (props) => {
  return (
    <div className="App">
      {/* <ProjectDisplay/> */}
      <Nav />
      <Switch>
        <Route exact path="/" component={Home} />
        <Route exact path="/auth/:form" component={Auth} />
        <Route exact path="/dashboard" component={Dashboard} />
      </Switch>
    </div>
  );
}

export default App;
