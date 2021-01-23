import React from 'react'
import {Link} from 'react-router-dom'
import {useAppState} from "../AppState.js"
import Jumbotron from 'react-bootstrap/Jumbotron';
import Button from 'react-bootstrap/Button';

const Nav =(props) => {

  const {state, dispatch} = useAppState()

  return <Jumbotron>
    <h1 className="title">Home<span>Maker</span></h1>
    <nav>
      <Link to="/"> <Button className="navbut" variant="outline-primary">Home</Button></Link>
      {!state.token ? (
        <>
          <Link to="/auth/signup"> <Button className="navbut" variant="outline-success">Signup</Button></Link>
          <Link to="/auth/login"> <Button className="navbut" variant="outline-success">Login</Button></Link>
        </>
      ) : null}
      {state.token ? (<><Link to="/dashboard"> <Button className="navbut" variant="outline-success">Projects</Button></Link>
      <Button className="navbut" variant="outline-success" onClick={() => {
        dispatch({type: "logout"})
        props.history.push("/")
      }}>Logout</Button></>) : null}
    </nav>
  </Jumbotron>
}

export default Nav