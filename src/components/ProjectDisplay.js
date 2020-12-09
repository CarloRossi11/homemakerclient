import React from 'react'



const ProjectDisplay = () => {

    const getProjects = async () => {
        const response = await fetch("http://localhost:3000/projects")
        const data = await response.json()
        console.log(data)
    }

    React.useEffect(() => {
        getProjects()
    }, [])
  
    return (
        <>
          <h1>Projects Displayed Here</h1>
        </>
    )
}

export default ProjectDisplay