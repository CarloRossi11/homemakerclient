import React from 'react'
import {useAppState} from "../AppState.js"
import {Route, Link} from "react-router-dom"
import Form from "../components/Form.js"

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

  const loaded = () => {
    return (
      <div className="dashboard">
        <h1>{username}'s Projects</h1>
        <Link to="/dashboard/new">
          <button>New Project</button>
        </Link>
        <Route
          path="/dashboard/:action"
          render={(rp) => <Form {...rp} getProjects={getProjects} />}
        />
        <ul>
          {state.projects.map((project) => (
            <div className="project" key={project.id}>
              <h2>{project.title}</h2>
              <h4>{project.description}</h4>
              <button
                onClick={() => {
                  dispatch({ type: "select", payload: project });
                  props.history.push("/dashboard/edit");
                }}
              >
                Edit Project
              </button>
              <button
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
              </button>
            </div>
          ))}
        </ul>
      </div>
    );
  };
  return projects ? loaded() : <h1>Loading...</h1>;
};

export default Dashboard;