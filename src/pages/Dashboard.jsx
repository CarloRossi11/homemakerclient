import React from 'react'
import {useAppState} from "../AppState.js"
import {Route, Link} from "react-router-dom"
import Form from "../components/Form.js"
import Button from 'react-bootstrap/Button';
import Spinner from 'react-bootstrap/Spinner'

const Dashboard = (props) => {
  const { state, dispatch } = useAppState();
  const { token, url, projects, username } = state;

  const getProjects = async () => {
    const response = await fetch(url + "/projects/", {
      method: "get",
      headers: {
        Authorization: "bearer " + token,
      },
    });
    const fetchedProjects = await response.json();
    dispatch({ type: "getProjects", payload: fetchedProjects });
  };

  React.useEffect(() => {
    getProjects();
  }, []);

  const capitalStr = () => username.replace(/^\w/, function(c) {
    return c.toUpperCase();
  });
  const loaded = () => {
    return (
      <div className="dashboard">
        <h1 className="projectTitle">{capitalStr({username})}'s <span>Projects</span></h1>
        <Link to="/dashboard/new">
          <Button variant="success">New Project</Button>
        </Link>
        <Route
          path="/dashboard/:action"
          render={(rp) => <Form {...rp} getProjects={getProjects} />}
        />
        <ul className="projects">
          {state.projects.map((project) => (
            <div className="project" key={project.id}>
              <h2>{project.title}</h2>
              <h4>{project.description}</h4>
              <Button variant="primary" className="projectbuttons"
                onClick={() => {
                  dispatch({ type: "select", payload: project });
                  props.history.push("/dashboard/edit");
                }}
              >
                Edit Project
              </Button>
              <Button variant="outline-danger" className="projectbuttons"
                onClick={() => {
                  fetch(url + "/projects/" + project.id, {
                    method: "delete",
                    headers: {
                      Authorization: "bearer " + token,
                    },
                  }).then(() => getProjects());
                }}
              >
                Delete Project
              </Button>
            </div>
          ))}
        </ul>
      </div>
    );
  };
  return projects ? loaded() : <Spinner animation="border" variant="success" />;
};

export default Dashboard;